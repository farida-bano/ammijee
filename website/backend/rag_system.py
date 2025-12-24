import os
import google.generativeai as genai
from rag_utils import get_embedding_model, InMemoryVectorStore
from data_preprocessing import initialize_vector_store

# Import vector_store as a function to get the current value
def get_vector_store():
    from data_preprocessing import vector_store
    return vector_store
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
    print("Error loading Gemini model initially: {}".format(e)) # Changed message for clarity
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
        print("Error generating LLM response: {}".format(e))
        return "Error generating response from LLM."

def get_llm_streaming_response(prompt):
    """
    Integrate with a Large Language Model (LLM) for generating streaming responses using Gemini API.
    """
    if not generation_model:
        yield "LLM not available. Please check API key and model configuration."
        return

    try:
        response = generation_model.generate_content(prompt, stream=True)

        for chunk in response:
            if chunk.candidates and chunk.candidates[0].content.parts:
                yield chunk.candidates[0].content.parts[0].text
            else:
                yield " "
    except Exception as e:
        print("Error generating streaming LLM response: {}".format(e))
        yield "Error generating response from LLM."

def generate_rag_response(query_text, k=3):
    """
    Combines retrieval and generation for RAG.
    """
    # 1. Retrieve relevant documents
    current_vector_store = get_vector_store()
    if current_vector_store is None:
        initialize_vector_store()
        current_vector_store = get_vector_store()

    retrieved_documents = current_vector_store.similarity_search(query_text, k=k)

    if not retrieved_documents:
        return "I could not find any relevant information in the documents."

    # 2. Prepare context for LLM
    context = "\n\n".join([doc.page_content for doc in retrieved_documents])

    # You might want to format the context more explicitly for the LLM
    llm_prompt = (
        "Based on the following context, answer the question:\n\n"
        "Context:\n{}\n\n"
        "Question: {}\n"
        "Answer:"
    ).format(context, query_text)

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
                print("  Model Name: {}".format(m.name))
            else:
                print("  Model Name: {} (Does NOT support generateContent)".format(m.name))
    except Exception as e:
        print("Error listing models: {}".format(e))
    print("--------------------------------------\n")
    # --- End Debugging ---

    print("Initializing RAG system (loading data and model)...")
    initialize_vector_store()
    print("RAG system initialized.")

    # Example RAG query
    test_query = "Who coined the term Artificial Intelligence?"
    print("\nQuery: {}".format(test_query))
    response = generate_rag_response(test_query)
    print("RAG Response: {}".format(response))

    test_query_2 = "Tell me about the hardware components for physical AI development."
    print("\nQuery: {}".format(test_query_2))
    response_2 = generate_rag_response(test_query_2)
    print("RAG Response: {}".format(response_2))

    test_query_3 = "What are the key features of ROS 2?"
    print("\nQuery: {}".format(test_query_3))
    response_3 = generate_rag_response(test_query_3)
    print("RAG Response: {}".format(response_3))