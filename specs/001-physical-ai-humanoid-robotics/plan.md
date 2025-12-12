# Implementation Plan: Physical AI & Humanoid Robotics — Book with RAG Chatbot

**Branch**: `001-physical-ai-humanoid-robotics` | **Date**: 2025-12-10 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-physical-ai-humanoid-robotics/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a 4-module educational book (ROS 2 → Simulation → Perception → VLA) in Docusaurus with integrated Retrieval-Augmented Generation (RAG) chatbot that answers questions strictly from book content. The book will cover ROS 2 fundamentals, Digital Twin simulation, AI-Robot Brain (NVIDIA Isaac), and Vision-Language-Action systems. The RAG chatbot will use FastAPI backend with Qdrant vector storage and Neon Serverless Postgres for metadata.

## Technical Context

**Language/Version**: Python 3.11, JavaScript/TypeScript for frontend, Markdown/MDX for content
**Primary Dependencies**: Docusaurus, FastAPI, Qdrant, Neon Postgres, OpenAI Agents/ChatKit SDKs, ROS 2, NVIDIA Isaac
**Storage**: Docusaurus static files for book content, Qdrant Cloud for embeddings, Neon Serverless Postgres for metadata
**Testing**: pytest for backend, Docusaurus build tests for book compilation
**Target Platform**: Web (GitHub Pages for book hosting, cloud deployment for RAG backend)
**Project Type**: web - book content with integrated chatbot backend
**Performance Goals**: FastAPI backend <200ms response time for queries, Docusaurus book builds in <60 seconds
**Constraints**: RAG chatbot answers must be 100% grounded in book content, no hallucination, chunk size 500-900 tokens
**Scale/Scope**: Book for CS/AI/robotics students, 4 modules with 3 chapters each, RAG chatbot for content retrieval

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the constitution file, this plan must ensure:
- All factual claims cite reputable sources (ROS/Gazebo/Isaac documentation)
- Content follows Spec-Kit Plus standards and Docusaurus MDX format
- Educational clarity for intermediate-advanced students
- RAG-friendly writing with 500-900 token chunks
- Zero hallucination guarantee - chatbot answers only from book content
- Deployability to GitHub Pages without build errors
- All code samples valid and executable

## Project Structure

### Documentation (this feature)
```text
specs/001-physical-ai-humanoid-robotics/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
docs/
├── modules/
│   ├── module-1-ros2/
│   │   ├── chapter-1-nodes-topics-services.mdx
│   │   ├── chapter-2-rclpy-python-agent.mdx
│   │   └── chapter-3-urdf-humanoid.mdx
│   ├── module-2-digital-twin/
│   │   ├── chapter-1-gazebo-physics.mdx
│   │   ├── chapter-2-sensor-simulation.mdx
│   │   └── chapter-3-unity-rendering.mdx
│   ├── module-3-ai-brain/
│   │   ├── chapter-1-isaac-sim.mdx
│   │   ├── chapter-2-isaac-ros-pipelines.mdx
│   │   └── chapter-3-nav2-bipedal.mdx
│   └── module-4-vla/
│       ├── chapter-1-whisper-voice-action.mdx
│       ├── chapter-2-llm-cognitive-planning.mdx
│       └── chapter-3-autonomous-humanoid.mdx
├── components/
│   └── rag-chatbot/
│       ├── chatbot.jsx
│       ├── chatbot-api.js
│       └── rag-summary.jsx
└── docusaurus.config.js

backend/
├── src/
│   ├── main.py              # FastAPI application
│   ├── models/
│   │   ├── document.py      # Document data models
│   │   └── query.py         # Query request/response models
│   ├── services/
│   │   ├── embedding.py     # Embedding services
│   │   ├── rag.py           # RAG retrieval services
│   │   └── storage.py       # Storage services (Qdrant + Neon)
│   └── api/
│       └── v1/
│           └── rag.py       # RAG API endpoints
├── requirements.txt
└── tests/
    └── test_rag.py

.history/
└── prompts/
    └── 001-physical-ai-humanoid-robotics/
        └── [PHR files]
```

**Structure Decision**: Web application structure chosen with separate backend for RAG services and frontend Docusaurus book. This allows for clear separation of concerns between static book content and dynamic chatbot functionality while maintaining compliance with all constitution requirements.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |