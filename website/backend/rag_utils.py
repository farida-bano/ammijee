from langchain_community.vectorstores import Chroma
from langchain_core.embeddings import Embeddings
from sentence_transformers import SentenceTransformer
import numpy as np
import os
import pickle

class InMemoryVectorStore:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model
        self.documents = []

    def add_documents(self, docs):
        self.documents.extend(docs)

    def similarity_search(self, query, k=4):
        query_embedding = self.embedding_model.encode(query, convert_to_tensor=False)
        scores = []
        for doc in self.documents:
            doc_embedding = self.embedding_model.encode(doc.page_content, convert_to_tensor=False)
            score = np.dot(query_embedding, doc_embedding) / (np.linalg.norm(query_embedding) * np.linalg.norm(doc_embedding))
            scores.append((score, doc))
        
        scores.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scores[:k]]

    def save(self, path):
        with open(path, 'wb') as f:
            pickle.dump(self, f)

    @staticmethod
    def load(path):
        with open(path, 'rb') as f:
            return pickle.load(f)

def get_embedding_model():
    return SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def extract_chapters(directory_path):
    import os
    chapters = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".md"):
            with open(os.path.join(directory_path, filename), 'r', encoding='utf-8') as f:
                chapters.append(f.read())
    return chapters

vector_store = None