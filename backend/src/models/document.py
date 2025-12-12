from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Document(BaseModel):
    id: str
    title: str
    module: str
    chapter: str
    content: str
    chunk_id: str
    chunk_index: int
    token_count: int
    created_at: datetime
    updated_at: datetime
    metadata: Optional[dict] = None

class QueryRequest(BaseModel):
    question: str
    grounding_mode: str  # 'full_book' or 'selected_text'
    selected_text: Optional[str] = None
    session_id: Optional[str] = None

class QueryResponse(BaseModel):
    id: str
    question: str
    answer: str
    sources: List[dict]
    session_id: str
    timestamp: datetime

class IndexRequest(BaseModel):
    documents: List[Document]