import os
from typing import List, Dict
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import PointStruct
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()

class StorageService:
    def __init__(self):
        # Initialize Qdrant client
        self.qdrant_client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY")
        )
        print(f"DEBUG: QDRANT_URL = {os.getenv('QDRANT_URL')}")

        # Initialize PostgreSQL connection
        self.pg_conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
        print(f"DEBUG: Connected to PostgreSQL")

        # Initialize Qdrant collection
        self._init_qdrant_collection()

    def _init_qdrant_collection(self):
        """
        Initialize Qdrant collection for document embeddings safely
        """
        try:
            self.qdrant_client.get_collection("documents")
            print("DEBUG: Qdrant collection 'documents' already exists")
        except Exception:
            print("DEBUG: Creating Qdrant collection 'documents'")
            try:
                self.qdrant_client.create_collection(
                    collection_name="documents",
                    vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE),
                )
                print("DEBUG: Collection 'documents' created successfully")
            except Exception as e:
                # If collection already exists, ignore conflict
                if "already exists" in str(e):
                    print("DEBUG: Collection 'documents' already exists, skipping creation")
                else:
                    raise e

    async def store_document_embeddings(self, document_id: str, embeddings: List[float], metadata: Dict):
        point = PointStruct(
            id=str(uuid.uuid4()),
            vector=embeddings,
            payload={
                "document_id": document_id,
                "title": metadata.get("title", ""),
                "module": metadata.get("module", ""),
                "chapter": metadata.get("chapter", ""),
                "content": metadata.get("content", ""),
                "chunk_id": metadata.get("chunk_id", ""),
                "chunk_index": metadata.get("chunk_index", 0)
            }
        )
        self.qdrant_client.upsert(collection_name="documents", points=[point])

    async def search_similar_documents(self, query_embedding: List[float], limit: int = 5) -> List[Dict]:
        search_result = self.qdrant_client.search(
            collection_name="documents",
            query_vector=query_embedding,
            limit=limit
        )
        results = []
        for hit in search_result:
            results.append({
                "document_id": hit.payload.get("document_id"),
                "title": hit.payload.get("title"),
                "module": hit.payload.get("module"),
                "chapter": hit.payload.get("chapter"),
                "content": hit.payload.get("content"),
                "chunk_id": hit.payload.get("chunk_id"),
                "chunk_index": hit.payload.get("chunk_index"),
                "similarity_score": hit.score
            })
        return results

    async def store_session_data(self, session_id: str, query: str, response: str, sources: List[Dict]):
        cursor = self.pg_conn.cursor()
        try:
            # Ensure sessions table exists
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS sessions (
                    id SERIAL PRIMARY KEY,
                    session_id VARCHAR(255),
                    query TEXT,
                    response TEXT,
                    sources TEXT,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)
            self.pg_conn.commit()

            # Insert session data
            cursor.execute("""
                INSERT INTO sessions (session_id, query, response, sources, created_at)
                VALUES (%s, %s, %s, %s, NOW())
            """, (session_id, query, response, str(sources)))
            self.pg_conn.commit()
        except Exception as e:
            self.pg_conn.rollback()
            print(f"Error storing session data: {e}")
            raise
        finally:
            cursor.close()
