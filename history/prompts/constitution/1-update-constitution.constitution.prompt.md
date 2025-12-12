---
id: 1
title: Update Constitution
stage: constitution
date: 2025-12-10
surface: agent
model: claude-haiku-4-5-20251001
feature: none
branch: master
user: A
command: /sp.constitution
labels: [constitution, ai-book, physical-ai, humanoid-robotics]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - history/prompts/constitution/1-update-constitution.constitution.prompt.md
tests:
 - none
---

## Prompt

```
/sp.constitution

Project: AI/Spec-Driven Book on Physical AI & Humanoid Robotics
(Using Docusaurus, Spec-Kit Plus, Claude Code, OpenAI Agents, RAG Systems)

Core principles:
- Technical accuracy with verifiable references (AI, robotics, ROS 2, Gazebo, Isaac, VLA)
- Consistency with Spec-Kit Plus structured writing standards
- Clarity for intermediate–advanced CS, robotics, and AI engineering students
- Educational coherence: concepts must be explained progressively (Module 1 → 4)
- RAG-friendly writing: every section must be chunkable and retrievable for the chatbot

Key standards:
- All factual claims must cite reputable sources: robotics docs, research papers, official ROS/Gazebo/Isaac documentation
- Citation style: IEEE or APA (project maintainer may choose one)
- Minimum 40% sources must be academic or official technical documentation
- Every chapter must end with a "Knowledge Summary" optimized for RAG embedding
- Diagrams must be described in text (ALT-text) for searchability
- All code samples must be valid and executable (Python, ROS 2, rclpy, Nav2)
- Zero hallucination: chatbot answers must be grounded strictly in the book content

Constraints:
- Book length: 8–12 chapters, each 1,200–2,000 words
- Format: Docusaurus Markdown + MDX components
- Must be deployable to GitHub Pages without build errors
- RAG Dataset Requirements:
  - Chunk size: 500–900 tokens
  - Strict separation of concepts (ROS vs Gazebo vs Isaac vs VLA)
  - No external information not included in the text
- Chatbot Backend Requirements:
  - Built with FastAPI
  - Uses OpenAI Agents/ChatKit SDK
  - Uses Neon Serverless Postgres + Qdrant Cloud (Free Tier)
  - Must answer only using user-selected text

Scope & Content Requirements:
- Part 1: Book Creation
  - Overview of Physical AI & Embodied Intelligence
  - ROS 2 (Nodes, Topics, Services, URDF, controllers)
  - Gazebo + Unity simulation concepts
  - NVIDIA Isaac Sim, Isaac ROS, synthetic data, VSLAM, Nav2
  - Vision-Language-Action (VLA) pipelines
  - OpenAI Whisper voice commands → ROS 2 actions
  - Capstone: Autonomous Humanoid Robot Pipeline

- Part 2: Integrated RAG Chatbot
  - How the book becomes a retrievable knowledge base
  - Building the RAG pipeline (FastAPI → Qdrant → OpenAI Agents)
  - Grounded question-answering demonstration
  - User text selection → grounding enforcement

Success criteria:
- Book compiles in Docusaurus without warnings
- RAG chatbot answers are 100% grounded in the selected text
- All factual claims validated by credible sources
- All code blocks tested and runnable
- No hallucination, no unverifiable robotics claims
- Final output suitable for publication and educational use
```

## Response snapshot

Updated the constitution file with specific principles for the AI/Spec-Driven Book on Physical AI & Humanoid Robotics, including:
- Technical Accuracy with Verifiable References
- Consistency with Spec-Kit Plus Standards
- Educational Clarity and Progression
- RAG-Friendly Writing
- Zero Hallucination Guarantee
- Deployability and Build Integrity

## Outcome

- ✅ Impact: Constitution file updated with project-specific principles
- 🧪 Tests: No tests required for this task
- 📁 Files: .specify/memory/constitution.md updated, PHR created
- 🔁 Next prompts: Continue with spec creation
- 🧠 Reflection: Constitution now properly reflects the specific requirements of the AI/Spec-Driven Book project

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification