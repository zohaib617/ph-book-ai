# Data Model: Physical AI & Humanoid Robotics Book with RAG Chatbot

## Document Entity
**Description**: Represents a book chapter or section that will be indexed for RAG retrieval

**Fields**:
- `id` (string, required): Unique identifier for the document (e.g., "module-1/chapter-1")
- `title` (string, required): Title of the chapter/section
- `module` (string, required): Module identifier (e.g., "module-1-ros2")
- `chapter` (string, required): Chapter identifier within module
- `content` (string, required): The text content of the document chunk
- `chunk_id` (string, required): Unique identifier for this specific chunk
- `chunk_index` (integer, required): Position of this chunk within the full document
- `token_count` (integer, required): Number of tokens in this chunk
- `created_at` (datetime, required): Timestamp when document was indexed
- `updated_at` (datetime, required): Timestamp when document was last updated
- `metadata` (object, optional): Additional metadata (author, tags, difficulty level)

**Validation Rules**:
- `token_count` must be between 500-900 tokens
- `id` must follow format: `{module}/{chapter}/{chunk_index}`
- `content` must not exceed 1500 words to maintain quality

## Embedding Entity
**Description**: Represents vector embeddings for document chunks used in similarity search

**Fields**:
- `id` (string, required): Unique identifier matching the document chunk
- `document_id` (string, required): Reference to the source document
- `vector` (array of floats, required): The embedding vector (typically 1536 dimensions for text-embedding-ada-002)
- `model` (string, required): The embedding model used
- `created_at` (datetime, required): Timestamp when embedding was generated

**Validation Rules**:
- `vector` length must match the expected dimension for the embedding model
- `document_id` must reference an existing document

## Query Entity
**Description**: Represents a user query for the RAG system

**Fields**:
- `id` (string, required): Unique identifier for the query
- `question` (string, required): The user's question
- `user_id` (string, optional): Identifier for the user (for analytics)
- `session_id` (string, optional): Identifier for the conversation session
- `grounding_mode` (enum, required): "full_book" or "selected_text" - determines retrieval scope
- `selected_text` (string, optional): Text selected by user when in selected_text mode
- `created_at` (datetime, required): Timestamp when query was submitted

**Validation Rules**:
- `question` must be at least 5 characters
- When `grounding_mode` is "selected_text", `selected_text` must not be empty
- `grounding_mode` must be one of the allowed values

## RetrievalResult Entity
**Description**: Represents the results of a document retrieval operation

**Fields**:
- `query_id` (string, required): Reference to the original query
- `document_id` (string, required): Reference to the retrieved document
- `chunk_id` (string, required): Reference to the specific chunk
- `similarity_score` (float, required): Similarity score between 0 and 1
- `content` (string, required): The retrieved content chunk
- `rank` (integer, required): Rank of this result in the retrieval (0-indexed)

**Validation Rules**:
- `similarity_score` must be between 0 and 1
- `rank` must be non-negative

## ChatSession Entity
**Description**: Represents a user's chat session with the RAG chatbot

**Fields**:
- `id` (string, required): Unique identifier for the session
- `user_id` (string, optional): Identifier for the user
- `created_at` (datetime, required): Timestamp when session was created
- `updated_at` (datetime, required): Timestamp when session was last updated
- `metadata` (object, optional): Additional session metadata

**Validation Rules**:
- `id` must be unique
- `created_at` must not be in the future

## ChatMessage Entity
**Description**: Represents a single message in a chat session

**Fields**:
- `id` (string, required): Unique identifier for the message
- `session_id` (string, required): Reference to the chat session
- `role` (enum, required): "user" or "assistant"
- `content` (string, required): The message content
- `timestamp` (datetime, required): When the message was created
- `sources` (array of objects, optional): Source documents used in response generation
- `grounding_mode` (enum, required): "full_book" or "selected_text"

**Validation Rules**:
- `role` must be one of the allowed values
- `sources` items must have `document_id` and `relevance_score` fields if provided

## BookModule Entity
**Description**: Represents a module in the Physical AI & Humanoid Robotics book

**Fields**:
- `id` (string, required): Unique identifier for the module (e.g., "module-1-ros2")
- `title` (string, required): Title of the module
- `description` (string, required): Brief description of the module
- `order` (integer, required): Order of the module in the book (0-indexed)
- `chapters_count` (integer, required): Number of chapters in the module
- `estimated_duration` (string, required): Estimated time to complete the module
- `learning_objectives` (array of strings, required): List of learning objectives
- `prerequisites` (array of strings, optional): Prerequisites for this module

**Validation Rules**:
- `order` must be non-negative
- `chapters_count` must be positive
- `learning_objectives` must not be empty

## BookChapter Entity
**Description**: Represents a chapter within a module of the book

**Fields**:
- `id` (string, required): Unique identifier for the chapter (e.g., "module-1-ros2/chapter-1")
- `module_id` (string, required): Reference to the parent module
- `title` (string, required): Title of the chapter
- `description` (string, required): Brief description of the chapter
- `order` (integer, required): Order of the chapter within the module (0-indexed)
- `word_count` (integer, required): Number of words in the chapter
- `estimated_duration` (string, required): Estimated time to read the chapter
- `learning_objectives` (array of strings, required): Learning objectives for this chapter
- `rag_summary` (string, required): Summary optimized for RAG retrieval

**Validation Rules**:
- `order` must be non-negative
- `word_count` must be between 1200-2000 as per constitution
- `module_id` must reference an existing module

## State Transitions

### Document State Transitions
1. **Created**: Document is initially created from MDX content
2. **Chunked**: Document is split into 500-900 token chunks per constitution
3. **Embedded**: Each chunk gets a vector embedding generated
4. **Indexed**: Embeddings are stored in Qdrant for retrieval
5. **Available**: Document is ready for RAG queries

### Query Processing Flow
1. **Received**: Query is received from the frontend
2. **Embedded**: Question is converted to embedding vector
3. **Retrieved**: Similar documents are retrieved from Qdrant
4. **Grounded**: Retrieved content is used to ground the response
5. **Generated**: Response is generated using OpenAI model
6. **Returned**: Response is sent back to user with citations