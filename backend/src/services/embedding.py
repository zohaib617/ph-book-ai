import os
from typing import List
import openai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class EmbeddingService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "text-embedding-ada-002"

    async def create_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Create embeddings for a list of texts
        """
        try:
            response = self.client.embeddings.create(
                input=texts,
                model=self.model
            )

            embeddings = []
            for item in response.data:
                embeddings.append(item.embedding)

            return embeddings
        except Exception as e:
            print(f"Error creating embeddings: {e}")
            raise

    async def create_embedding(self, text: str) -> List[float]:
        """
        Create embedding for a single text
        """
        return (await self.create_embeddings([text]))[0]