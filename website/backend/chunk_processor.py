"""
Module for processing documents into chunks for RAG system.
"""

import os
import re
from typing import List, Dict, Any
from pathlib import Path


class ChunkProcessor:
    """
    A class to handle document chunking for RAG systems.
    """
    
    def __init__(self, chunk_size: int = 512, overlap: int = 50):
        """
        Initialize the chunk processor.
        
        Args:
            chunk_size: Maximum size of each chunk in tokens/words
            overlap: Number of overlapping tokens/words between chunks
        """
        self.chunk_size = chunk_size
        self.overlap = overlap
    
    def process_document(self, text: str) -> List[str]:
        """
        Process a document into chunks.
        
        Args:
            text: Input document text
            
        Returns:
            List of text chunks
        """
        # Clean the text
        cleaned_text = self._clean_text(text)
        
        # Split the text into chunks
        chunks = self._create_chunks(cleaned_text)
        
        return chunks
    
    def _clean_text(self, text: str) -> str:
        """
        Clean the input text by removing extra whitespaces and normalizing.
        
        Args:
            text: Raw input text
            
        Returns:
            Cleaned text
        """
        # Remove extra whitespaces
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters that might interfere with processing
        text = re.sub(r'[^\x00-\x7F]+', '', text)  # Remove non-ASCII characters
        
        return text.strip()
    
    def _create_chunks(self, text: str) -> List[str]:
        """
        Create chunks from the input text using a sliding window approach.
        
        Args:
            text: Cleaned input text
            
        Returns:
            List of text chunks
        """
        # For simplicity, we'll split by sentences first
        sentences = self._split_sentences(text)
        
        chunks = []
        current_chunk = ""
        
        for sentence in sentences:
            # Check if adding the next sentence would exceed chunk size
            if len(current_chunk.split()) + len(sentence.split()) <= self.chunk_size:
                current_chunk += " " + sentence
            else:
                # Save current chunk if it's not empty
                if current_chunk.strip():
                    chunks.append(current_chunk.strip())
                
                # Start a new chunk
                # To maintain overlap, we can take some words from the end of the previous chunk
                current_chunk = sentence
        
        # Add the last chunk
        if current_chunk.strip():
            chunks.append(current_chunk.strip())
        
        return chunks
    
    def _split_sentences(self, text: str) -> List[str]:
        """
        Split text into sentences.
        
        Args:
            text: Input text
            
        Returns:
            List of sentences
        """
        # Simple sentence splitting using common sentence endings
        sentences = re.split(r'[.!?]+\s+', text)
        
        # Clean up any remaining punctuation issues
        sentences = [sentence.strip() for sentence in sentences if sentence.strip()]
        
        return sentences
    
    def process_documents_from_directory(self, directory_path: str) -> List[Dict[str, Any]]:
        """
        Process all documents in a directory.
        
        Args:
            directory_path: Path to directory containing documents
            
        Returns:
            List of dictionaries with document info and chunks
        """
        chunks_with_metadata = []
        
        for filename in os.listdir(directory_path):
            filepath = os.path.join(directory_path, filename)
            
            if os.path.isfile(filepath) and self._is_supported_file_type(filename):
                # Read the file
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Process the content into chunks
                chunks = self.process_document(content)
                
                # Store chunks with metadata
                for i, chunk in enumerate(chunks):
                    chunks_with_metadata.append({
                        'chunk_id': f"{filename}_chunk_{i}",
                        'content': chunk,
                        'source_file': filename,
                        'chunk_index': i
                    })
        
        return chunks_with_metadata
    
    def _is_supported_file_type(self, filename: str) -> bool:
        """
        Check if the file type is supported.
        
        Args:
            filename: Name of the file
            
        Returns:
            True if file type is supported, False otherwise
        """
        supported_extensions = ['.txt', '.md', '.pdf', '.docx', '.html']
        return any(filename.lower().endswith(ext) for ext in supported_extensions)


# Example usage
if __name__ == "__main__":
    processor = ChunkProcessor(chunk_size=512, overlap=50)
    
    sample_text = """
    This is a sample document. It contains multiple sentences. 
    Each sentence provides different information. 
    The chunk processor will split this text into smaller pieces.
    These pieces should maintain semantic meaning.
    Processing documents into chunks is important for RAG systems.
    """
    
    chunks = processor.process_document(sample_text)
    print(f"Generated {len(chunks)} chunks:")
    for i, chunk in enumerate(chunks):
        print(f"\nChunk {i+1}: {chunk[:100]}...")