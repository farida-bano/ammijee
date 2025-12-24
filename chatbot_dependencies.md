# Farida Bot (FB Chatbot) - Dependencies and Environment Requirements

## 1. System Architecture Overview

The Farida Bot system consists of:
- **Backend**: Python-based RAG system using FastAPI and Google Generative AI
- **Frontend**: React/Docusaurus-based chat interface
- **Data Layer**: Vector storage for document embeddings
- **External Services**: Google Gemini API for LLM interactions

## 2. Backend Dependencies

### 2.1 Python Runtime Requirements
```
Python version: 3.8 or higher
Package manager: pip
Virtual environment recommended: venv or conda
```

### 2.2 Core Python Libraries
```json
{
  "fastapi": ">=0.104.1",
  "uvicorn": ">=0.24.0",
  "google-generativeai": ">=0.3.1",
  "langchain": ">=0.0.335",
  "langchain-community": ">=0.0.28",
  "langchain-core": ">=0.1.16",
  "langchain-text-splitters": ">=0.0.1",
  "sentence-transformers": ">=2.2.2",
  "numpy": ">=1.24.3",
  "chromadb": ">=0.4.15",
  "python-dotenv": ">=1.0.0",
  "pydantic": ">=2.5.0"
}
```

### 2.3 Optional/Development Dependencies
```json
{
  "pytest": ">=7.4.0",
  "black": ">=23.0.0",
  "flake8": ">=6.0.0",
  "mypy": ">=1.4.0",
  "types-python-dotenv": ">=1.0.0"
}
```

## 3. Frontend Dependencies

### 3.1 JavaScript/Node.js Runtime Requirements
```
Node.js version: 18.x or higher
npm version: 8.x or higher (or yarn/pnpm equivalent)
```

### 3.2 Core Frontend Libraries
```json
{
  "@docusaurus/core": ">=3.0.0",
  "@docusaurus/preset-classic": ">=3.0.0",
  "@docusaurus/router": ">=3.0.0",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "@types/react": ">=18.0.0",
  "@types/react-dom": ">=18.0.0"
}
```

## 4. External Service Dependencies

### 4.1 Google Gemini API
- **Service**: Google AI Studio or Google Cloud Vertex AI
- **Required API Key**: GEMINI_API_KEY environment variable
- **Supported Models**: gemini-1.5-flash (current implementation), with capability for other Gemini models
- **Quotas**: Dependent on Google Cloud billing plan

### 4.2 Network Connectivity
- **Outbound HTTPS**: Port 443 to Google AI services
- **Port Configuration**: Default backend runs on port 8001, frontend typically on port 3000

## 5. System Resource Requirements

### 5.1 Minimum Hardware Recommendations
- **CPU**: 2 cores or higher
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB available space (includes vector database and temporary files)
- **Bandwidth**: Stable internet connection for API calls

### 5.2 Recommended Production Specifications
- **CPU**: 4+ cores
- **RAM**: 16GB+ minimum
- **Storage**: SSD storage for faster vector operations
- **Network**: Low latency connection to Google services

## 6. Environment Configuration

### 6.1 Required Environment Variables
```bash
# Google Gemini API key
GEMINI_API_KEY="your_api_key_here"

# Optional: Server configuration
SERVER_HOST="0.0.0.0"  # Default: localhost
SERVER_PORT=8001       # Default: 8001
DEBUG_MODE=false       # Default: false
LOG_LEVEL="INFO"       # Default: INFO
```

### 6.2 File System Permissions
- Read access to `book/manuscript/` directory
- Read/write access to `vectorstore.pkl` location
- Read access to `configs/data_config.json`
- Read access to `.env` file

## 7. Configuration Files

### 7.1 `data_config.json` Structure
```json
{
  "data_sources": [
    {
      "type": "directory",
      "path": "book/summaries"  // Path to markdown files
    }
  ],
  "text_splitter": {
    "chunk_size": 500,
    "chunk_overlap": 50
  },
  "embeddings": {
    "type": "HuggingFaceEmbeddings",
    "model_name": "sentence-transformers/all-MiniLM-L6-v2"
  },
  "vectorstore": {
    "type": "InMemoryVectorStore",
    "path": "vectorstore.pkl"
  }
}
```

### 7.2 Project Directory Structure
```
ammi/
├── book/
│   ├── manuscript/           # Source markdown files
│   └── summaries/           # Processed content (currently empty)
├── configs/
│   └── data_config.json     # Configuration file
├── website/
│   ├── backend/
│   │   ├── main.py         # FastAPI server
│   │   ├── rag_system.py   # Core RAG logic
│   │   ├── rag_utils.py    # Vector store utilities
│   │   └── data_preprocessing.py  # Data pipeline
│   └── frontend/
│       ├── src/components/ChatBot/  # React components
│       └── src/theme/Root.tsx      # Global chat integration
├── vectorstore.pkl         # Persistent vector storage
└── .env                   # Environment variables
```

## 8. Startup Sequence Dependencies

### 8.1 Backend Initialization Process
1. Load environment variables from `.env`
2. Initialize Google Generative AI client
3. Load vector store from `vectorstore.pkl` (create if missing)
4. Start FastAPI server on specified port
5. Begin accepting requests

### 8.2 Frontend Initialization Process
1. Load React application
2. Register global chat component via Docusaurus theme
3. Establish WebSocket/rest connection to backend
4. Initialize UI components and event handlers

## 9. Health Check Dependencies

### 9.1 Backend Health Checks
- FastAPI `/health` endpoint (when implemented)
- Vector store accessibility
- Google API connectivity
- Model loading status

### 9.2 Frontend Health Checks
- Backend API connectivity
- WebSocket/streaming capability
- UI component rendering

## 10. Backup and Recovery Dependencies

### 10.1 Data Persistence
- Vector store file (vectorstore.pkl) backup recommended
- Source markdown files backup
- Configuration files backup

### 10.2 Recovery Procedures
- Restore vectorstore.pkl from backup if corrupted
- Re-run data preprocessing if needed
- Re-deploy configuration files

## 11. Security Considerations

### 11.1 Secrets Management
- GEMINI_API_KEY should never be committed to version control
- Use environment variables or secure vault systems
- Restrict file system access to `.env` file

### 11.2 Network Security
- Use HTTPS for API communications
- Validate all input parameters
- Implement proper authentication when needed

## 12. Monitoring and Logging Dependencies

### 12.1 Logging Requirements
- Python logging module for backend
- Console and file-based logging
- Structured logging for debugging
- Error tracking and reporting

### 12.2 Performance Metrics
- Response time tracking
- API call volume monitoring
- Vector store query performance
- Memory usage monitoring

---
*Document Version: 1.0*  
*Last Updated: December 19, 2025*