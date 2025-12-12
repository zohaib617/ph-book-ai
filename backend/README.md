# Physical AI & Humanoid Robotics RAG Backend

This is the FastAPI backend for the Physical AI & Humanoid Robotics textbook's RAG (Retrieval-Augmented Generation) system.

## Features

- FastAPI-based REST API for RAG operations
- Integration with OpenAI for response generation
- Qdrant vector database for document embeddings
- Neon Postgres for session data storage
- Support for user-selected text grounding

## Technology Stack

- **Framework**: FastAPI
- **Vector Database**: Qdrant Cloud
- **Relational Database**: Neon Serverless Postgres
- **AI Integration**: OpenAI API
- **Language**: Python 3.11+

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

3. Run the application:
```bash
python -m src.main
# or
uvicorn src.main:app --reload
```

## API Endpoints

- `POST /api/v1/rag/query` - Process queries using RAG
- `POST /api/v1/rag/index` - Index documents for RAG retrieval
- `GET /api/v1/rag/status` - Get RAG service status
- `GET /health` - Health check endpoint

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key
- `QDRANT_URL` - Qdrant Cloud URL
- `QDRANT_API_KEY` - Qdrant API key
- `NEON_DATABASE_URL` - Neon Postgres connection string

## RAG Architecture

The RAG system works as follows:

1. **Indexing**: Documents are chunked, embedded, and stored in Qdrant
2. **Query Processing**: User queries are embedded and searched against document vectors
3. **Response Generation**: Relevant documents are used as context for OpenAI response generation
4. **Grounding**: Supports both full-book and user-selected text grounding modes

## Security Considerations

- API keys should be stored securely and never committed to version control
- In production, implement proper authentication and rate limiting
- Use HTTPS for all API communications
- Validate and sanitize all user inputs