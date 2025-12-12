# Research: Physical AI & Humanoid Robotics Book with RAG Chatbot

## Overview
This research document covers the technical decisions, architecture, and implementation approach for the Physical AI & Humanoid Robotics educational book with integrated RAG chatbot.

## Decision: Docusaurus as Documentation Framework
**Rationale**: Docusaurus is the optimal choice for technical documentation with built-in features for:
- MDX support for interactive components
- Versioning capabilities
- Search functionality
- GitHub Pages deployment
- Plugin ecosystem for custom components
- Responsive design suitable for educational content

**Alternatives considered**:
- GitBook: Less customizable, limited interactivity
- Hugo: More complex setup, less focused on documentation
- Custom React app: More development overhead

## Decision: FastAPI for RAG Backend
**Rationale**: FastAPI provides:
- High performance (ASGI-based like Starlette)
- Built-in async support for concurrent queries
- Automatic API documentation (Swagger/OpenAPI)
- Strong typing with Pydantic models
- Easy integration with ML/AI libraries
- Excellent for serving embeddings and retrieval operations

**Alternatives considered**:
- Flask: Slower performance, less async support
- Django: Overkill for simple API service
- Express.js: Would require switching to Node.js ecosystem

## Decision: Qdrant for Vector Storage
**Rationale**: Qdrant offers:
- Free tier suitable for educational project
- High-performance vector similarity search
- Python SDK with good integration
- Cloud-hosted option with minimal setup
- Good documentation and community support
- Supports metadata storage alongside vectors

**Alternatives considered**:
- Pinecone: More expensive, vendor lock-in
- Weaviate: Self-hosting complexity
- FAISS: Requires more infrastructure management

## Decision: Neon Serverless Postgres for Metadata
**Rationale**: Neon Postgres provides:
- Serverless scaling with minimal cost
- Full PostgreSQL compatibility
- Branching and isolation features
- Free tier for development
- Easy connection management
- JSON support for metadata storage

**Alternatives considered**:
- Supabase: Additional abstraction layer not needed
- AWS RDS: More complex setup and cost
- SQLite: Less scalable for concurrent access

## Decision: OpenAI Agents/ChatKit SDKs for Chatbot
**Rationale**: These SDKs offer:
- Integration with OpenAI models for high-quality responses
- Conversation management capabilities
- Streaming response support
- Grounding mechanisms for RAG
- Well-documented APIs

**Alternatives considered**:
- LangChain: More complex, multiple dependency requirements
- Custom implementation: Higher development overhead

## Decision: ROS 2 Humble Hawksbill as Base Distribution
**Rationale**: ROS 2 Humble is:
- LTS (Long Term Support) version with 5-year support
- Widely adopted in educational and industrial contexts
- Good documentation and community support
- Compatible with NVIDIA Isaac ROS
- Stable APIs for learning purposes

**Alternatives considered**:
- Rolling Ridley: Less stable for educational use
- Galactic Geochelone: Older LTS, less feature-complete

## Decision: NVIDIA Isaac ROS for AI Components
**Rationale**: Isaac ROS provides:
- Optimized perception and navigation pipelines
- Hardware acceleration for robotics
- Integration with ROS 2 ecosystem
- Pre-built perception algorithms
- Good documentation for educational purposes

**Alternatives considered**:
- Custom ROS nodes: More development time
- Other robotics frameworks: Less ROS integration

## Decision: Chunk Size 500-900 Tokens for RAG
**Rationale**: This range provides:
- Good context for LLM understanding
- Balance between precision and coverage
- Optimal for OpenAI models' context windows
- Compliant with constitution requirements
- Tested effectiveness for technical documentation

**Alternatives considered**:
- Smaller chunks: Less context for understanding
- Larger chunks: Reduced precision in retrieval

## Decision: Content Structure (4 Modules)
**Rationale**: The 4-module progression (ROS 2 → Simulation → Perception → VLA) provides:
- Logical learning progression from fundamentals to advanced topics
- Clear separation of concepts for RAG chunking
- Modular content that can be learned independently
- Alignment with robotics engineering pipeline
- Suitable for CS/AI/robotics students

**Alternatives considered**:
- Different ordering: Would break logical progression
- More/less modules: Would either fragment or overwhelm learning