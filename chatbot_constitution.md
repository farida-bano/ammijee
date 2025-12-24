# Chatbot System Constitution: Farida Bot (FB Chatbot)

## Preamble

This constitution establishes the foundational principles, architecture, and operational guidelines for the Farida Bot (FB Chatbot) - a Retrieval-Augmented Generation (RAG) system designed to provide intelligent assistance for the Physical AI & Humanoid Robotics documentation. This document serves as the authoritative reference for the system's design, implementation, and governance.

## Article I: Purpose and Mission

### Section 1: Mission Statement
The Farida Bot exists to:
- Provide instant, contextual answers to user queries about Physical AI and humanoid robotics topics
- Serve as an intelligent interface to the comprehensive documentation repository
- Enhance user experience by offering conversational access to complex technical information
- Support educational objectives of the Physical AI project

### Section 2: Core Values
- Accessibility: Making complex information available to all users
- Accuracy: Providing factually correct and contextually relevant responses
- Responsiveness: Delivering timely responses to user queries
- Transparency: Clearly indicating sources and limitations of information

## Article II: System Architecture

### Section 1: Backend Components
#### 2.1 RAG Core (`rag_system.py`)
- Implements Retrieval-Augmented Generation logic
- Integrates with Google Gemini LLM for response generation
- Manages the flow from query to response with context awareness

#### 2.2 Data Pipeline (`data_preprocessing.py`)
- Extracts content from markdown files in `book/manuscript/` directory
- Processes documents using RecursiveCharacterTextSplitter (500 chars, 50 overlap)
- Handles vector store initialization and persistence

#### 2.3 Vector Storage (`rag_utils.py`)
- Custom InMemoryVectorStore implementation using SentenceTransformer embeddings
- Persists vector store to `vectorstore.pkl` file
- Uses cosine similarity for semantic search

#### 2.4 API Server (`main.py`)
- FastAPI-based RESTful server
- Provides `/chat` and `/chat-stream` endpoints
- Manages startup initialization of vector store

### Section 2: Frontend Components
#### 2.1 Chat Interface (`ChatBot.tsx`)
- React component with floating button and expandable chat window
- Real-time streaming responses from backend
- Integrated globally via `Root.tsx` theme component

#### 2.2 User Experience Elements
- Typing indicators during processing
- Conversation history management
- Responsive design for various screen sizes

### Section 3: Configuration Management
#### 3.1 Data Configuration (`data_config.json`)
- Defines data sources, text splitting parameters, embedding model, and vector store settings
- Currently configured to use `book/summaries` directory with InMemoryVectorStore

## Article III: Data Flow and Processing

### Section 1: Information Lifecycle
The system follows this process:

1. **Ingestion**: Extracts markdown files from `book/manuscript/` directory
2. **Preprocessing**: Splits documents into overlapping chunks (500/50 ratio)
3. **Embedding**: Creates vector representations using `all-MiniLM-L6-v2` model
4. **Storage**: Persists vectorized content in memory and on disk
5. **Retrieval**: Performs semantic search on user queries against vector store
6. **Generation**: Constructs context from retrieved documents and generates response using Gemini LLM
7. **Delivery**: Streams responses to frontend in real-time

### Section 2: API Specifications
#### 3.1 Endpoint: `/chat`
- Method: POST
- Input: JSON `{ "query": "user question" }`
- Output: JSON `{ "response": "generated answer" }`

#### 3.2 Endpoint: `/chat-stream`
- Method: POST  
- Input: JSON `{ "query": "user question" }`
- Output: Streaming NDJSON with `{ "token": "text chunk" }` format

## Article IV: Technology Stack and Dependencies

### Section 1: Backend Technologies
- **Python 3.8+**: Core runtime environment
- **FastAPI**: Web framework for API server
- **Google Generative AI**: LLM integration for response generation
- **LangChain**: Framework for RAG implementations
- **Sentence Transformers**: Embedding model management
- **NumPy**: Mathematical computations for similarity calculations

### Section 2: Frontend Technologies
- **React 18+**: Component-based UI framework
- **TypeScript**: Type-safe JavaScript superset
- **Docusaurus**: Documentation website platform
- **Modern Browsers**: Supports streaming APIs for real-time responses

### Section 3: Environment Dependencies
- **GEMINI_API_KEY**: Google Gemini API access token
- **Python Packages**: Listed in project requirements
- **Local File System**: Access to documentation directories

## Article V: Operational Guidelines

### Section 1: Initialization Process
Upon startup, the system performs:
1. Environment variable validation
2. Vector store loading from persistent storage
3. Fallback creation if storage file doesn't exist
4. LLM model loading and validation
5. API server readiness confirmation

### Section 2: Query Processing Standards
- Validate user input before processing
- Perform semantic search in vector store
- Limit retrieved documents to top 3 matches
- Construct contextual prompts for LLM
- Stream responses for improved user experience
- Handle errors gracefully with informative messages

### Section 3: Error Handling Protocols
- Network connectivity issues: Inform users of connection problems
- LLM unavailability: Return appropriate error messages
- Empty query results: Indicate when no relevant information is found
- System overload: Implement graceful degradation

## Article VI: Quality Assurance

### Section 1: Response Quality Standards
- Responses must be contextually relevant to user queries
- Generated content should be factually consistent with source materials
- Citations should be provided when possible
- Uncertainty should be appropriately communicated to users

### Section 2: Performance Benchmarks
- Query response time should not exceed 5 seconds under normal load
- Vector store initialization should complete within 30 seconds
- System should maintain 99% uptime during operational hours

## Article VII: Future Development

### Section 1: Planned Enhancements
- Advanced conversation memory and context
- Improved citation and source tracking
- Multi-language support
- Enhanced authentication and authorization

### Section 2: Evolution Principles
- Maintain backward compatibility where possible
- Preserve core functionality during upgrades
- Ensure data migration paths for persistent storage
- Follow security-first development practices

## Article VIII: Governance and Maintenance

### Section 1: Maintenance Responsibilities
- Regular testing of API connectivity and response quality
- Monitoring of system performance and error rates
- Updating of underlying documentation content
- Security updates for all dependencies

### Section 2: Change Management
- All architectural changes require review and approval
- Version control should capture all modifications
- Documentation must be updated with system changes
- Testing protocols must be followed for deployments

## Conclusion

This constitution represents the foundational framework for the Farida Bot chatbot system. It shall serve as the guiding document for all future development, maintenance, and enhancement activities related to the system. Any amendments to this constitution require formal approval and documentation.

---
*Document Version: 1.0*  
*Effective Date: December 19, 2025*  
*Approved By: Project Governance Committee*