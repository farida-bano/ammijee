# Running the AMMI Project

This project consists of three main services:
1. Authentication Service (Node.js/Express) - runs on port 3001
2. Website Backend (Python/FastAPI) - runs on port 8001
3. Frontend (React/Docusaurus) - runs on port 3000

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Python 3.8 or higher
- pip

## Quick Start

The easiest way to run the project is using the provided script:

```bash
./run_project.sh
```

This script will start all services in the correct order.

## Manual Setup

### 1. Authentication Service

```bash
cd auth-service
npm install
npm run dev
```

The auth service will be available at `http://localhost:3001`

### 2. Website Backend

In a new terminal:

```bash
cd website/backend
pip install -r requirements.txt
python main.py
```

The backend will be available at `http://localhost:8001`

### 3. Frontend

In another terminal:

```bash
cd website/frontend
npm install
npm run start
```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Auth Service
Make sure your `auth-service/.env` file has the necessary variables:
```
AUTH_SECRET=your-super-secret-key-change-in-production
AUTH_DOMAIN=localhost
PORT=3001
DATABASE_URL=file:./ammi_auth.db
```

### Website Backend
Make sure your `website/backend/.env` file has:
```
GEMINI_API_KEY=your_api_key_here
```

Note: You need a valid Google Gemini API key to run the RAG (Retrieval-Augmented Generation) features.

## Services Overview

- **Auth Service**: Handles user authentication, registration, and session management
- **Backend**: FastAPI server with RAG capabilities, processes queries against documentation
- **Frontend**: Docusaurus-based documentation site with integrated chatbot

## Troubleshooting

1. If you get dependency errors in the backend, try:
   ```bash
   pip install -r website/backend/requirements.txt
   ```

2. If the auth service fails to start, make sure you've run:
   ```bash
   npm install
   ```

3. If the chatbot doesn't work, ensure your GEMINI_API_KEY is valid and properly set in the environment.

## Project Structure

- `auth-service/` - Authentication service with user management
- `website/backend/` - Python FastAPI backend with RAG system
- `website/frontend/` - Docusaurus frontend with documentation and chatbot