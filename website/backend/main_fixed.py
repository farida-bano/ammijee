from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from rag_system import generate_rag_response, get_llm_streaming_response
from data_preprocessing import initialize_vector_store
import uvicorn
import os  # For environment variables


app = FastAPI()

# Mount static files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")


# Initialize the vector store when the application starts
@app.on_event("startup")
def sync_startup_event():
    print("FastAPI app starting up: Initializing vector store...")
    initialize_vector_store()
    print("Vector store initialized for FastAPI app.")


@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("../frontend/index.html") as f:
        return HTMLResponse(content=f.read())


@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_query = data.get("query")

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    rag_response = generate_rag_response(user_query)
    return JSONResponse(status_code=200, content={"response": rag_response})


@app.post("/chat-stream")
async def chat_stream_endpoint(request: Request):
    """Endpoint that returns streaming responses for a more interactive chat experience."""
    data = await request.json()
    user_query = data.get("query")

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    # For streaming, we'll construct the context and stream the response
    from rag_system import vector_store

    # 1. Retrieve relevant documents
    retrieved_documents = vector_store.similarity_search(user_query, k=3)

    if not retrieved_documents:
        return JSONResponse(status_code=200, content={"response": "I could not find any relevant information in the documents."})

    # 2. Prepare context for LLM
    context = "\n\n".join([doc.page_content for doc in retrieved_documents])

    llm_prompt = (
        f"Based on the following context, answer the question:\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {user_query}\n"
        f"Answer:"
    )

    # Stream the response
    import json
    from fastapi.responses import StreamingResponse

    def generate():
        response_parts = []
        for chunk in get_llm_streaming_response(llm_prompt):
            response_parts.append(chunk)
            yield json.dumps({"token": chunk}) + "\n"

        # Optionally return the full response at the end
        full_response = "".join(response_parts)
        yield json.dumps({"done": True, "full_response": full_response}) + "\n"

    return StreamingResponse(generate(), media_type="application/x-ndjson")


if __name__ == "__main__":
    # This block is typically for local development run.
    # In production, a WSGI server like Gunicorn would manage the app.
    print("Running FastAPI application with Uvicorn.")
    uvicorn.run(app, host="0.0.0.0", port=8001)