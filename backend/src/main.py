from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # <-- add this
import os
import uvicorn

# Load .env variables
load_dotenv()  # <-- add this

# DEBUG prints to check if env is loaded
print("DEBUG: NEON_DATABASE_URL =", os.getenv("NEON_DATABASE_URL"))
print("DEBUG: OPENAI_API_KEY =", os.getenv("OPENAI_API_KEY"))
print("DEBUG: QDRANT_URL =", os.getenv("QDRANT_URL"))

from .api.v1.rag import router as rag_router

# Create FastAPI app
app = FastAPI(
    title="Physical AI & Humanoid Robotics RAG API",
    description="API for Retrieval-Augmented Generation for the Physical AI & Humanoid Robotics textbook",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(rag_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics RAG API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "RAG API"}

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
