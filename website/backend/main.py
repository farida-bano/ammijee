from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from rag_system import generate_rag_response, get_llm_streaming_response
from data_preprocessing import vector_store
from data_preprocessing import initialize_vector_store
import uvicorn
from pathlib import Path
from datetime import datetime, timedelta
from typing import Optional
import jwt
from passlib.context import CryptContext


# Authentication configuration
import os
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")  # Should be in environment variables
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security scheme for API
security = HTTPBearer()



def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        return username
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("FastAPI app starting up: Initializing vector store...")
    initialize_vector_store()
    print("Vector store initialized for FastAPI app.")
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

# Define the base directory for the project (two levels up from backend)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
FRONTEND_DIR = BASE_DIR / "website" / "frontend"

# Mount static files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory=FRONTEND_DIR / "static"), name="static")


# Authentication routes
@app.post("/auth/token")
async def login(username: str, password: str):
    # In a real application, you would verify the user against a database
    # For this example, we'll just accept any non-empty username/password
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")

    # Create a token (in real app, verify against database)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/me")
async def read_users_me(current_user: str = Depends(get_current_user)):
    return {"username": current_user}


# Translation function - Placeholder implementation
def translate_text(text: str, target_language: str = "en") -> str:
    """Placeholder translation function - returns original text"""
    # In a production environment, you would integrate with a translation API
    # such as Google Cloud Translation API, Azure Translator, etc.
    # For now, we return the original text to avoid dependency conflicts
    if target_language == "en":
        return text
    else:
        # If target language is not English, return original text
        # as we don't have translation capability without googletrans
        return text


@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open(FRONTEND_DIR / "index.html") as f:
        return HTMLResponse(content=f.read())


# Optional: Public chat endpoint without authentication (for demo purposes)
@app.post("/chat-public")
async def chat_public_endpoint(request: Request):
    data = await request.json()
    user_query = data.get("query")
    target_language = data.get("language", "en")  # Default to English

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    # Translate query to English if needed for processing
    if target_language != "en":
        processed_query = translate_text(user_query, "en")
    else:
        processed_query = user_query

    rag_response = generate_rag_response(processed_query)

    # Translate response to target language if needed
    if target_language != "en":
        rag_response = translate_text(rag_response, target_language)

    return JSONResponse(status_code=200, content={"response": rag_response})


@app.post("/chat")
async def chat_endpoint(request: Request, current_user: str = Depends(get_current_user)):
    data = await request.json()
    user_query = data.get("query")
    target_language = data.get("language", "en")  # Default to English

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    # Translate query to English if needed for processing
    if target_language != "en":
        processed_query = translate_text(user_query, "en")
    else:
        processed_query = user_query

    rag_response = generate_rag_response(processed_query)

    # Translate response to target language if needed
    if target_language != "en":
        rag_response = translate_text(rag_response, target_language)

    return JSONResponse(status_code=200, content={"response": rag_response, "user": current_user})


@app.post("/chat-stream")
async def chat_stream_endpoint(request: Request, current_user: str = Depends(get_current_user)):
    """Endpoint that returns streaming responses for a more interactive chat experience."""
    data = await request.json()
    user_query = data.get("query")
    target_language = data.get("language", "en")  # Default to English

    if not user_query:
        return JSONResponse(status_code=400, content={"message": "Query parameter is required."})

    # Translate query to English if needed for processing
    if target_language != "en":
        processed_query = translate_text(user_query, "en")
    else:
        processed_query = user_query

    # For streaming, we'll construct the context and stream the response
    # 1. Retrieve relevant documents
    retrieved_documents = vector_store.similarity_search(processed_query, k=3)

    if not retrieved_documents:
        # Translate response if needed
        response = "I could not find any relevant information in the documents."
        if target_language != "en":
            response = translate_text(response, target_language)
        return JSONResponse(status_code=200, content={"response": response})

    # 2. Prepare context for LLM
    context = "\n\n".join([doc.page_content for doc in retrieved_documents])

    llm_prompt = (
        "Based on the following context, answer the question:\n\n"
        "Context:\n{}\n\n"
        "Question: {}\n"
        "Answer:"
    ).format(context, processed_query)

    # Stream the response
    import json
    from fastapi.responses import StreamingResponse

    def generate():
        response_parts = []
        for chunk in get_llm_streaming_response(llm_prompt):
            response_parts.append(chunk)
            # Translate chunk if needed
            if target_language != "en":
                chunk = translate_text(chunk, target_language)
            yield json.dumps({"token": chunk}) + "\n"

        # Optionally return the full response at the end
        full_response = "".join(response_parts)
        if target_language != "en":
            full_response = translate_text(full_response, target_language)
        yield json.dumps({"done": True, "full_response": full_response}) + "\n"

    return StreamingResponse(generate(), media_type="application/x-ndjson")


if __name__ == "__main__":
    # This block is typically for local development run.
    # In production, a WSGI server like Gunicorn would manage the app.
    print("Running FastAPI application with Uvicorn.")
    uvicorn.run(app, host="0.0.0.0", port=8001)