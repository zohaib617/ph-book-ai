# Quickstart: Physical AI & Humanoid Robotics Book with RAG Chatbot

## Prerequisites

- Node.js 18+ (for Docusaurus)
- Python 3.11+ (for FastAPI backend)
- Git
- Access to OpenAI API key
- Access to Qdrant Cloud (free tier)
- Access to Neon Serverless Postgres (free tier)

## Local Development Setup

### 1. Clone and Initialize the Repository

```bash
git clone <repository-url>
cd ai-book
```

### 2. Set up the Book (Docusaurus Frontend)

```bash
# Navigate to the project root
cd D:\my-working-files\ph_book\ai-book

# Install Docusaurus dependencies
npm install

# Create the docs directory structure
mkdir -p docs/modules/module-1-ros2 docs/modules/module-2-digital-twin docs/modules/module-3-ai-brain docs/modules/module-4-vla

# Start the development server
npm start
```

The book will be available at `http://localhost:3000`

### 3. Set up the RAG Backend

```bash
# Create and navigate to backend directory
mkdir -p backend/src/{models,services,api,api/v1}
cd backend

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn python-dotenv openai qdrant-client psycopg2-binary python-multipart

# Create requirements.txt
cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
openai==1.3.7
qdrant-client==1.7.0
psycopg2-binary==2.9.9
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
EOF
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DATABASE_URL=your_neon_postgres_connection_string
EOF
```

### 5. Run the Backend Server

```bash
cd backend
# Activate virtual environment if not already done
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the FastAPI server
uvicorn src.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`

## Project Structure Overview

```
ai-book/
├── docs/                           # Docusaurus book content
│   ├── modules/                    # Book modules
│   │   ├── module-1-ros2/          # ROS 2 fundamentals
│   │   ├── module-2-digital-twin/  # Simulation with Gazebo & Unity
│   │   ├── module-3-ai-brain/      # NVIDIA Isaac perception/navigation
│   │   └── module-4-vla/           # Vision-Language-Action systems
│   ├── components/                 # Custom Docusaurus components
│   │   └── rag-chatbot/            # RAG chatbot React component
│   └── docusaurus.config.js        # Docusaurus configuration
├── backend/                        # FastAPI RAG backend
│   ├── src/
│   │   ├── main.py                 # FastAPI application entrypoint
│   │   ├── models/                 # Pydantic models
│   │   ├── services/               # Business logic
│   │   └── api/                    # API route definitions
│   ├── requirements.txt            # Python dependencies
│   └── .env                        # Environment variables
├── specs/                          # Specification files
│   └── 001-physical-ai-humanoid-robotics/
│       ├── plan.md                 # Implementation plan
│       ├── research.md             # Research findings
│       ├── data-model.md           # Data models
│       └── quickstart.md           # This file
└── history/                        # Prompt History Records
    └── prompts/
```

## Running the Complete System

### 1. Start the Backend

```bash
cd backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8000
```

### 2. In a separate terminal, start the Book

```bash
cd D:\my-working-files\ph_book\ai-book
npm start
```

## Indexing Book Content for RAG

To index the book content for the RAG system:

```bash
# In the backend directory
cd backend
source venv/bin/activate

# Run the indexing script (you'll need to create this)
python -c "
import os
import asyncio
from dotenv import load_dotenv
from src.services.embedding import EmbeddingService
from src.services.storage import StorageService

load_dotenv()

async def index_book_content():
    embedding_service = EmbeddingService()
    storage_service = StorageService()

    # This is a simplified example - you'll need to implement the actual indexing logic
    # based on your MDX content structure
    print('Indexing book content for RAG...')
    # Implementation would read MDX files, chunk them, generate embeddings, and store in Qdrant
    print('Book content indexed successfully!')

if __name__ == '__main__':
    asyncio.run(index_book_content())
"
```

## Deploying to Production

### Deploying the Book to GitHub Pages

1. Update the `docusaurus.config.js` with your repository details
2. Run the build command:
```bash
npm run build
```
3. The static site will be in the `build/` directory and can be deployed to GitHub Pages

### Deploying the Backend

The backend can be deployed to any cloud provider that supports Python applications (AWS, GCP, Azure, Railway, etc.). Ensure that environment variables are properly configured in the deployment environment.

## Testing the System

### Backend Tests

```bash
cd backend
source venv/bin/activate
pip install pytest httpx
pytest tests/
```

### Frontend Tests

```bash
cd D:\my-working-files\ph_book\ai-book
npm test
```

### Integration Test

1. Ensure both backend and frontend are running
2. Navigate to the book in your browser
3. Test the RAG chatbot functionality
4. Verify that queries return relevant results from the book content
5. Test the "selected text only" grounding mode