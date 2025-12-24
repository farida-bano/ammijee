import json
import os
from pathlib import Path
from rag_utils import get_embedding_model, extract_chapters, InMemoryVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Global instance of the vector store
vector_store = None

def initialize_vector_store():
    """
    Loads the vector store from disk if it exists, otherwise creates it from the source documents.
    """
    global vector_store

    # Define the base directory for the project (two levels up from backend)
    BASE_DIR = Path(__file__).resolve().parent.parent.parent

    config_path = BASE_DIR / "configs" / "data_config.json"
    with open(config_path, 'r') as f:
        config = json.load(f)

    vector_store_path = config['vectorstore']['path']
    # Adjust the data sources path to be relative to the root directory
    data_sources_path = BASE_DIR / config['data_sources'][0]['path']

    # Adjust the vector store path to be relative to the root directory
    full_vector_store_path = BASE_DIR / vector_store_path
    if os.path.exists(full_vector_store_path):
        print("Loading vector store from {}...".format(full_vector_store_path))
        embedding_model = get_embedding_model()
        vector_store = InMemoryVectorStore.load(full_vector_store_path)
        vector_store.embedding_model = embedding_model
        print("Vector store loaded.")
    else:
        print("Vector store not found. Initializing from source documents...")
        embedding_model = get_embedding_model()
        vector_store = InMemoryVectorStore(embedding_model)

        print("Extracting chapters from {}...".format(data_sources_path))
        chapters = extract_chapters(str(data_sources_path))

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        documents = text_splitter.create_documents(chapters)

        vector_store.add_documents(documents)

        print("Saving vector store to {}...".format(full_vector_store_path))
        vector_store.save(full_vector_store_path)
        print("Vector store saved.")

if __name__ == "__main__":
    print("Starting data preprocessing and vector store initialization...")
    initialize_vector_store()
    print("Data preprocessing and vector store initialization complete.")

    # Optional: Verify by querying
    if vector_store:
        print("\nVerifying InMemoryVectorStore by querying...")
        query_text = "What is a physics simulator in robotics?"
        results = vector_store.similarity_search(query_text, k=1)

        print("Query Results:")
        for res in results:
            print("  Content: {}...".format(res.page_content[:500]))
            print("-" * 20)
