import os
from typing import List, Dict
from openai import OpenAI
from dotenv import load_dotenv
from .embedding import EmbeddingService
from .storage import StorageService

load_dotenv()

class RAGService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.storage_service = StorageService()
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def process_query(self, question: str, grounding_mode: str = "full_book", selected_text: str = None) -> Dict:
        """
        Process a query using RAG approach
        """
        # Create embedding for the question
        query_embedding = await self.embedding_service.create_embedding(question)

        # Search for relevant documents
        if grounding_mode == "selected_text" and selected_text:
            # If selected text mode, search specifically for that content
            context = selected_text
        else:
            # Search in the entire document collection
            search_results = await self.storage_service.search_similar_documents(
                query_embedding, limit=5
            )

            # Combine content from search results
            context = "\n".join([result["content"] for result in search_results])

        # Generate response using OpenAI
        response = self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant for the Physical AI & Humanoid Robotics book. Answer questions based strictly on the provided context. Do not make up information that is not in the context."
                },
                {
                    "role": "user",
                    "content": f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
                }
            ],
            max_tokens=500,
            temperature=0.3
        )

        answer = response.choices[0].message.content

        # Return response with sources if in full book mode
        if grounding_mode == "full_book" and not selected_text:
            # Get search results for sources
            search_results = await self.storage_service.search_similar_documents(
                query_embedding, limit=3
            )
            sources = search_results
        else:
            # In selected text mode, source is the selected text
            sources = [{
                "title": "User Selected Text",
                "content": selected_text[:200] + "..." if len(selected_text) > 200 else selected_text,
                "module": "N/A",
                "chapter": "N/A",
                "similarity_score": 1.0
            }] if selected_text else []

        return {
            "answer": answer,
            "sources": sources
        }

    async def index_document(self, document_data: Dict):
        """
        Index a document for RAG retrieval
        """
        # Create embedding for the document content
        content_embedding = await self.embedding_service.create_embedding(document_data["content"])

        # Store in vector database
        await self.storage_service.store_document_embeddings(
            document_data["id"],
            content_embedding,
            document_data
        )

        return {"status": "indexed", "document_id": document_data["id"]}