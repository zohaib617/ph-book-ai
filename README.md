# Physical AI & Humanoid Robotics Textbook

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.1.0-blue)](https://docusaurus.io/)
[![ROS 2](https://img.shields.io/badge/ROS2-Humble-informational)](https://docs.ros.org/en/humble/)

A comprehensive educational book on Physical AI & Humanoid Robotics with integrated RAG chatbot, authentication, and multilingual support.

## 🚀 Features

- **4 Comprehensive Modules**: Complete end-to-end robotics pipeline
- **Interactive RAG Chatbot**: Ask questions and get answers from book content
- **Multilingual Support**: English/Urdu toggle functionality
- **User Authentication**: Sign up/login with user profiling
- **Complete Backend**: FastAPI + Qdrant + Neon stack
- **Reusable Skills**: Claude Code Skills for future development

## 📚 Modules

### Module 1: ROS 2 Fundamentals
- ROS 2 Nodes, Topics, Services
- rclpy: Bridging Python Agents to ROS 2
- URDF basics for humanoid robots

### Module 2: Digital Twin (Gazebo & Unity)
- Gazebo physics: gravity, collisions
- Environment + sensor simulation (LiDAR, Depth, IMU)
- Unity: high-fidelity rendering & interaction

### Module 3: AI-Robot Brain (NVIDIA Isaac™)
- Isaac Sim photorealistic simulation + synthetic data
- Isaac ROS pipelines: VSLAM, navigation
- Nav2 for bipedal humanoid movement

### Module 4: Vision-Language-Action (VLA)
- Voice-to-Action (Whisper)
- Cognitive Planning (LLMs → ROS 2 actions)
- Capstone: Autonomous Humanoid pipeline

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Docusaurus](https://docusaurus.io/) v3.1.0
- **Language**: React/JavaScript
- **Styling**: CSS Modules, custom components

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Integration**: OpenAI API
- **Vector Database**: [Qdrant](https://qdrant.tech/) Cloud
- **Relational DB**: [Neon](https://neon.tech/) Postgres

### Authentication
- **Library**: [Better Auth](https://better-auth.com/)

## 📁 Project Structure

```
├── docs/                     # Docusaurus frontend
│   ├── src/                  # Custom components and pages
│   │   ├── components/       # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   └── RAGChatbotUI.jsx  # RAG chatbot component
│   │   ├── pages/            # Signup/login pages
│   │   └── theme/            # Theme overrides
│   ├── modules/              # Book content by module
│   └── ...
├── backend/                  # FastAPI RAG backend
│   ├── src/                  # Application source
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Business logic
│   │   └── api/              # API endpoints
│   └── ...
├── skills/                   # Reusable Claude Code Skills
├── specs/                    # Project specifications
├── history/                  # Prompt History Records
└── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- npm or yarn
- Access to OpenAI API key
- Access to Qdrant Cloud (free tier)
- Access to Neon Serverless Postgres (free tier)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the book in the browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create environment file:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

4. Start the backend server:
```bash
uvicorn src.main:app --reload
```

## 🔐 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DATABASE_URL=your_neon_postgres_connection_string
```

## 🤖 RAG Chatbot Integration

The RAG chatbot is integrated into every page with:
- Floating UI component in bottom-right corner
- User-selected text grounding functionality
- "Answers strictly from book content" disclaimer
- Source citations in responses

## 🌐 Multilingual Support

The book includes English/Urdu toggle functionality:
- Toggle button appears at the top of each chapter
- Content translation through theme override
- RTL text support for Urdu

## 🏗️ Architecture

### Frontend Architecture
- Docusaurus-based documentation site
- Custom authentication forms with Better Auth
- Persistent RAG chatbot with user-selected text grounding
- Theme overrides for language toggle

### Backend Architecture
- FastAPI REST API for RAG operations
- OpenAI integration for response generation
- Qdrant vector database for document embeddings
- Neon Postgres for session data storage

## 🧪 Testing

### Frontend
```bash
npm run build  # Build the site
npm run serve  # Serve the built site locally
```

### Backend
```bash
# Run backend tests
python -m pytest tests/
```

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Update `docusaurus.config.js` with your repository details
2. Run `npm run build`
3. Deploy the `build/` directory to GitHub Pages

### Backend
Deploy to any cloud provider that supports Python applications (AWS, GCP, Azure, Railway, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have questions or need help:
- Check the [documentation](./docs/)
- Open an issue in this repository
- Refer to the original project specifications in `specs/`

## 🙏 Acknowledgments

- [Docusaurus](https://docusaurus.io/) for the excellent documentation framework
- [ROS 2](https://docs.ros.org/) for the robotics framework
- [OpenAI](https://openai.com/) for the language models
- [Qdrant](https://qdrant.tech/) for the vector database
- [Neon](https://neon.tech/) for the serverless Postgres

---

**Made with ❤️ for the Physical AI & Humanoid Robotics Community**