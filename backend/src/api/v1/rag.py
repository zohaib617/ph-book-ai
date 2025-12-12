from fastapi import APIRouter, HTTPException
from typing import Dict
import uuid
from datetime import datetime
from ...models.document import QueryRequest, QueryResponse, IndexRequest
from ...services.rag import RAGService

router = APIRouter(prefix="/rag", tags=["rag"])

# Initialize RAG service
rag_service = RAGService()

@router.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    """
    Process a query using the RAG system
    """
    try:
        # Generate a session ID if not provided
        session_id = request.session_id or f"session_{uuid.uuid4()}"

        # Process the query using RAG service
        result = await rag_service.process_query(
            request.question,
            request.grounding_mode,
            request.selected_text
        )

        # Create response object
        response = QueryResponse(
            id=f"response_{uuid.uuid4()}",
            question=request.question,
            answer=result["answer"],
            sources=result["sources"],
            session_id=session_id,
            timestamp=datetime.now()
        )

        # Store session data
        await rag_service.storage_service.store_session_data(
            session_id,
            request.question,
            result["answer"],
            result["sources"]
        )

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@router.post("/index")
async def index_documents(request: IndexRequest):
    """
    Index documents for RAG retrieval
    """
    try:
        results = []
        for doc in request.documents:
            result = await rag_service.index_document(doc.dict())
            results.append(result)

        return {"indexed_count": len(results), "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error indexing documents: {str(e)}")

@router.get("/status")
async def get_status():
    """
    Get the status of the RAG service
    """
    try:
        # This would check the actual status of connected services
        # For now, return a basic status
        return {
            "status": "healthy",
            "indexed_documents": "unknown",  # Would connect to actual count
            "model": "text-embedding-ada-002",
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting status: {str(e)}")