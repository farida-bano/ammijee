from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from rag_system import generate_rag_response
from data_preprocessing import initialize_vector_store
import uvicorn
import os # For environment variables

app = FastAPI()

# Mount static files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory="website/frontend"), name="static")

# Initialize the vector store when the application starts
@app.on_event("startup")
async def startup_event():
    print("FastAPI app starting up: Initializing vector store...")
    initialize_vector_store()
    print("Vector store initialized for FastAPI app.")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("website/frontend/index.html") as f:
        return HTMLResponse(content=f.read())

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_query = data.get("query")

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    rag_response = generate_rag_response(user_query)
    return JSONResponse(status_code=200, content={"response": rag_response})

if __name__ == "__main__":
    # This block is typically for local development run.
    # In production, a WSGI server like Gunicorn would manage the app.
    print("Running FastAPI application with Uvicorn.")
    uvicorn.run(app, host="0.0.0.0", port=8001)
