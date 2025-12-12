# Feature Specification: Physical AI & Humanoid Robotics Book with RAG Chatbot

## Overview
Create a 4-module educational book (ROS 2 → Simulation → Perception → VLA) in Docusaurus, and integrate a Retrieval-Augmented Generation (RAG) chatbot that answers questions strictly from book content or user-selected text.

## Modules Structure

### Module 1 — ROS 2 Fundamentals
**Target audience**: CS/AI/robotics students
**Focus**: End-to-end robotics pipeline (ROS 2 → Simulation → Perception → VLA) + Integrated RAG Chatbot

**Chapters**:
1. ROS 2 Nodes, Topics, Services
2. rclpy: Bridging Python Agents to ROS 2
3. URDF basics for humanoid robots

**Success**: Clear ROS 2 communication flow, correct concepts, no deep code.

### Module 2 — Digital Twin (Gazebo & Unity)
**Focus**: Simulation, physics, sensors

**Chapters**:
1. Gazebo physics: gravity, collisions
2. Environment + sensor simulation (LiDAR, Depth, IMU)
3. Unity: high-fidelity rendering & interaction

**Success**: Accurate simulation fundamentals; no game-dev depth.

### Module 3 — AI-Robot Brain (NVIDIA Isaac™)
**Focus**: Perception, VSLAM, navigation

**Chapters**:
1. Isaac Sim photorealistic simulation + synthetic data
2. Isaac ROS pipelines: VSLAM, navigation
3. Nav2 for bipedal humanoid movement

**Success**: Clear perception → SLAM → navigation flow.

### Module 4 — Vision-Language-Action (VLA)
**Focus**: Whisper + LLM planning + robot actions

**Chapters**:
1. Voice-to-Action (Whisper)
2. Cognitive Planning (LLMs → ROS 2 actions)
3. Capstone: Autonomous Humanoid pipeline

**Success**: Correct VLA workflow, realistic capabilities.

## RAG Integration Requirements (applies to all modules)

- Each chapter must end with a **RAG Summary** (short, factual)
- Sections must be chunkable (clean headings, no long paragraphs)
- No hallucinated or unverifiable claims
- Content must be structured so the RAG chatbot can answer questions accurately
- No information outside the text should be required to answer queries

## Technical Requirements

### Backend
- FastAPI service
- Document embeddings stored in Qdrant (Free Tier)
- Metadata + user selections stored in Neon Serverless Postgres
- OpenAI Agents/ChatKit SDKs for response generation

### Frontend Integration
- Docusaurus MD/MDX book content
- Chatbot UI inside Docusaurus (sidebar + floating icon)
- Enable streaming answers with citations
- Enable "answer only from selected text" grounding mode

### Content Requirements
- 1,500–3,000 words per module
- Docusaurus MD/MDX format
- ALT-text for diagrams
- No hardware-specific code or full robotic implementations
- No multi-robot systems

## Success Criteria
- Chatbot answers **only** from book content
- Selected-text mode strictly enforced
- FastAPI + Qdrant + Neon pipeline fully functional
- Book builds with zero errors
- All factual claims validated by credible sources
- Zero hallucination guarantee

## Acceptance Tests

### Book Content Tests
1. All 4 modules with 3 chapters each are created
2. Each chapter has 1,500-3,000 words of content
3. Each chapter ends with a RAG Summary
4. Book compiles without errors in Docusaurus
5. All code samples are valid and executable

### RAG Chatbot Tests
1. Chatbot successfully retrieves relevant content from book
2. "Selected text only" mode works correctly
3. Responses are grounded only in book content (no hallucination)
4. API responds within 200ms for queries
5. All sources are properly cited in responses

### Integration Tests
1. Book deploys successfully to GitHub Pages
2. RAG backend connects to Qdrant and Neon Postgres
3. Frontend chatbot connects to backend API
4. All links and navigation work correctly