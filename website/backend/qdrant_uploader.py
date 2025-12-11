"""
Module for uploading embeddings to Qdrant vector database.
"""

import uuid
from typing import List, Dict, Any
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import Distance, VectorParams, PointStruct
from dotenv import load_dotenv
import os


class QdrantUploader:
    """
    A class to handle uploading embeddings to Qdrant vector database.
    """
    
    def __init__(self, collection_name: str = "documents"):
        """
        Initialize the Qdrant uploader.
        
        Args:
            collection_name: Name of the collection to store vectors
        """
        load_dotenv()
        
        # Get Qdrant configuration from environment
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")
        
        if qdrant_url and qdrant_api_key:
            # Connect to cloud Qdrant instance
            self.client = QdrantClient(
                url=qdrant_url,
                api_key=qdrant_api_key,
                timeout=10
            )
        elif os.getenv("QDRANT_HOST"):
            # Connect to local Qdrant instance
            self.client = QdrantClient(
                host=os.getenv("QDRANT_HOST", "localhost"),
                port=int(os.getenv("QDRANT_PORT", 6333))
            )
        else:
            # Use local in-memory storage for development
            self.client = QdrantClient(":memory:")
        
        self.collection_name = collection_name
        self._ensure_collection_exists()
    
    def _ensure_collection_exists(self):
        """
        Ensure the collection exists in Qdrant, create it if it doesn't.
        """
        try:
            # Try to get collection info to check if it exists
            self.client.get_collection(self.collection_name)
            print(f"Collection '{self.collection_name}' already exists")
        except:
            # Collection doesn't exist, create it
            # We'll get the embedding dimension dynamically when we add the first point
            print(f"Creating collection '{self.collection_name}'")
            
            # For now, we'll create with default params - we'll update later based on actual embeddings
            # Actually, it's better to create the collection when we know the embedding dimensions
            # So we'll handle this in the upload method below
    
    def upload_vectors(self, 
                      embeddings: List[List[float]], 
                      payloads: List[Dict[str, Any]] = None,
                      ids: List[str] = None) -> bool:
        """
        Upload embeddings to Qdrant collection.
        
        Args:
            embeddings: List of embedding vectors
            payloads: List of metadata for each vector
            ids: List of IDs for each vector (optional, will generate UUIDs if not provided)
            
        Returns:
            True if upload successful, False otherwise
        """
        if not embeddings:
            print("No embeddings to upload")
            return False
        
        # Generate IDs if not provided
        if ids is None:
            ids = [str(uuid.uuid4()) for _ in range(len(embeddings))]
        else:
            # Ensure IDs are strings
            ids = [str(id_) for id_ in ids]
        
        # Prepare payloads if not provided
        if payloads is None:
            payloads = [{}] * len(embeddings)
        
        # Ensure consistent lengths
        if len(embeddings) != len(payloads) or len(embeddings) != len(ids):
            raise ValueError("Embeddings, payloads, and ids must have the same length")
        
        # Determine embedding dimension from the first embedding
        embedding_dim = len(embeddings[0])
        
        # Check if collection exists
        collection_exists = True
        try:
            collection_info = self.client.get_collection(self.collection_name)
            existing_dim = collection_info.config.params.vectors.size
            if existing_dim != embedding_dim:
                raise ValueError(f"Embedding dimension mismatch: expected {existing_dim}, got {embedding_dim}")
        except:
            # Collection doesn't exist, create it
            collection_exists = False
            print(f"Creating collection '{self.collection_name}' with dimension {embedding_dim}")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=embedding_dim, distance=Distance.COSINE),
            )
        
        # Prepare points for upload
        points = []
        for i in range(len(embeddings)):
            points.append(PointStruct(
                id=ids[i],
                vector=embeddings[i],
                payload=payloads[i]
            ))
        
        # Upload points to Qdrant
        try:
            self.client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            print(f"Successfully uploaded {len(points)} vectors to Qdrant collection '{self.collection_name}'")
            return True
        except Exception as e:
            print(f"Error uploading vectors to Qdrant: {str(e)}")
            return False
    
    def search_similar(self, 
                      query_embedding: List[float], 
                      top_k: int = 5,
                      filters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """
        Search for similar vectors in Qdrant.
        
        Args:
            query_embedding: Query embedding vector
            top_k: Number of similar results to return
            filters: Optional filters for the search
            
        Returns:
            List of similar results with scores and payloads
        """
        try:
            search_result = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=top_k,
                with_payload=True,
                score_threshold=0.1  # Minimum similarity threshold
            )
            
            results = []
            for hit in search_result:
                results.append({
                    'id': hit.id,
                    'score': hit.score,
                    'payload': hit.payload,
                    'vector': hit.vector
                })
            
            return results
        except Exception as e:
            print(f"Error searching in Qdrant: {str(e)}")
            return []
    
    def count_points(self) -> int:
        """
        Count the number of points in the collection.
        
        Returns:
            Number of points in the collection
        """
        try:
            collection_info = self.client.get_collection(self.collection_name)
            return collection_info.points_count
        except Exception as e:
            print(f"Error counting points in Qdrant: {str(e)}")
            return 0
    
    def delete_collection(self) -> bool:
        """
        Delete the entire collection.
        
        Returns:
            True if deletion successful, False otherwise
        """
        try:
            self.client.delete_collection(collection_name=self.collection_name)
            print(f"Collection '{self.collection_name}' deleted")
            return True
        except Exception as e:
            print(f"Error deleting collection: {str(e)}")
            return False
    
    def recreate_collection(self):
        """
        Delete and recreate the collection.
        """
        self.delete_collection()
        print(f"Collection '{self.collection_name}' recreated")
        # Note: The collection will be recreated automatically when the first vector is uploaded


# Example usage
if __name__ == "__main__":
    # Initialize the uploader
    uploader = QdrantUploader(collection_name="test_docs")
    
    # Sample data
    sample_embeddings = [
        [0.1, 0.2, 0.3, 0.4],
        [0.5, 0.6, 0.7, 0.8],
        [0.9, 0.1, 0.2, 0.3]
    ]
    
    sample_payloads = [
        {"text": "This is the first document", "source": "doc1.txt"},
        {"text": "This is the second document", "source": "doc2.txt"},
        {"text": "This is the third document", "source": "doc3.txt"}
    ]
    
    # Upload vectors
    success = uploader.upload_vectors(
        embeddings=sample_embeddings,
        payloads=sample_payloads
    )
    
    if success:
        print(f"Uploaded {uploader.count_points()} points to Qdrant")
        
        # Search with a sample query
        query_embedding = [0.15, 0.25, 0.35, 0.45]
        results = uploader.search_similar(query_embedding, top_k=2)
        
        print(f"Found {len(results)} similar results:")
        for i, result in enumerate(results):
            print(f"  Result {i+1}: Score={result['score']:.3f}, Payload={result['payload']}")