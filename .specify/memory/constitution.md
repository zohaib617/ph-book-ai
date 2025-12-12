# AI/Spec-Driven Book on Physical AI & Humanoid Robotics Constitution

## Core Principles

### Technical Accuracy with Verifiable References
All factual claims must cite reputable sources: robotics docs, research papers, official ROS/Gazebo/Isaac documentation; Minimum 40% sources must be academic or official technical documentation

### Consistency with Spec-Kit Plus Standards
All content must follow Spec-Kit Plus structured writing standards and Docusaurus Markdown + MDX components format

### Educational Clarity and Progression
Content must be clear for intermediate–advanced CS, robotics, and AI engineering students; concepts must be explained progressively (Module 1 → 4)

### RAG-Friendly Writing
Every section must be chunkable and retrievable for the chatbot; Chunk size: 500–900 tokens; Strict separation of concepts (ROS vs Gazebo vs Isaac vs VLA)

### Zero Hallucination Guarantee
All code samples must be valid and executable (Python, ROS 2, rclpy, Nav2); chatbot answers must be grounded strictly in the book content; No hallucination, no unverifiable robotics claims

### Deployability and Build Integrity
Book must compile in Docusaurus without warnings; Must be deployable to GitHub Pages without build errors

## Content and Format Requirements
Book length: 8–12 chapters, each 1,200–2,000 words; Format: Docusaurus Markdown + MDX components; All code samples must be valid and executable; Every chapter must end with a 'Knowledge Summary' optimized for RAG embedding; Diagrams must be described in text (ALT-text) for searchability

## RAG Dataset and Chatbot Requirements
RAG Dataset Requirements: Chunk size: 500–900 tokens; Strict separation of concepts (ROS vs Gazebo vs Isaac vs VLA); No external information not included in the text; Chatbot Backend Requirements: Built with FastAPI; Uses OpenAI Agents/ChatKit SDK; Uses Neon Serverless Postgres + Qdrant Cloud (Free Tier); Must answer only using user-selected text

## Governance
All content must adhere to citation standards (IEEE or APA); All factual claims validated by credible sources; Success criteria: Book compiles in Docusaurus without warnings; RAG chatbot answers are 100% grounded in the selected text; All factual claims validated by credible sources; All code blocks tested and runnable; No hallucination, no unverifiable robotics claims; Final output suitable for publication and educational use

**Version**: 1.0.0 | **Ratified**: 2025-12-10 | **Last Amended**: 2025-12-10
