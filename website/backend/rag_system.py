import os
import google.generativeai as genai
from rag_utils import get_embedding_model, InMemoryVectorStore
from data_preprocessing import vector_store, initialize_vector_store
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API key
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Load the Gemini Pro model
# Ensure 'gemini-pro' is available for text generation
try:
    generation_model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    print(f"Error loading Gemini model initially: {e}") # Changed message for clarity
    generation_model = None

def get_llm_response(prompt):
    """
    Integrate with a Large Language Model (LLM) for generating responses using Gemini API.
    """
    if not generation_model:
        return "LLM not available. Please check API key and model configuration."
    
    try:
        response = generation_model.generate_content(prompt)
        # Access the text from the candidate if available
        if response.candidates:
            # Check if parts exist before accessing
            if hasattr(response.candidates[0].content, 'parts') and response.candidates[0].content.parts:
                return response.candidates[0].content.parts[0].text
            else:
                return "LLM response has no text content."
        else:
            return "No response candidates from LLM."
    except Exception as e:
        print(f"Error generating LLM response: {e}")
        return "Error generating response from LLM."

def generate_rag_response(query_text, k=3):
    """
    Combines retrieval and generation for RAG.
    """
    # 1. Retrieve relevant documents
    retrieved_documents = vector_store.similarity_search(query_text, k=k)

    if not retrieved_documents:
        return "I could not find any relevant information in the documents."

    # 2. Prepare context for LLM
    context = "\n\n".join([doc.page_content for doc in retrieved_documents])
    
    # You might want to format the context more explicitly for the LLM
    llm_prompt = (
        f"Based on the following context, answer the question:\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {query_text}\n"
        f"Answer:"
    )

    # 3. Generate response using LLM
    response = get_llm_response(llm_prompt)
    return response

# Initialize the vector store when the module is loaded or explicitly called
# This ensures data is loaded before any RAG queries are made
# In a production setup, you might want a more sophisticated loading mechanism
# initialize_vector_store() # Call this once when the application starts

if __name__ == "__main__":
    # --- Debugging: List available models ---
    print("\n--- Listing available Gemini models ---")
    try:
        for m in genai.list_models():
            # Check if the model supports generateContent and list its name
            if "generateContent" in m.supported_generation_methods:
                print(f"  Model Name: {m.name}")
            else:
                print(f"  Model Name: {m.name} (Does NOT support generateContent)")
    except Exception as e:
        print(f"Error listing models: {e}")
    print("--------------------------------------\n")
    # --- End Debugging ---

    print("Initializing RAG system (loading data and model)...")
    initialize_vector_store()
    print("RAG system initialized.")

    # Example RAG query
    test_query = "Who coined the term Artificial Intelligence?"
    print(f"\nQuery: {test_query}")
    response = generate_rag_response(test_query)
    print(f"RAG Response: {response}")

    test_query_2 = "Tell me about the hardware components for physical AI development."
    print(f"\nQuery: {test_query_2}")
    response_2 = generate_rag_response(test_query_2)
    print(f"RAG Response: {response_2}")

    test_query_3 = "What are the key features of ROS 2?"
    print(f"\nQuery: {test_query_3}")
    response_3 = generate_rag_response(test_query_3)
    print(f"RAG Response: {response_3}")