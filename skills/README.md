# Reusable Intelligence Skills for Physical AI & Humanoid Robotics Textbook

This directory contains reusable Claude Code Skills for implementing the Physical AI & Humanoid Robotics textbook project with Docusaurus, including authentication, RAG chatbot, and multilingual support.

## Available Skills

### 1. `docusaurus_auth_form_generator`
**Description:** Generates Better-Auth.com compatible signup and signin forms with custom user profiling fields.

**Features:**
- Standard email/password authentication
- Custom fields for "Software Background" and "Hardware Background"
- React components ready for Docusaurus integration

**Files Generated:**
- `SignupForm.jsx` - Complete signup form with background collection
- `SigninForm.jsx` - Standard signin form

### 2. `rag_chatbot_ui_embedder`
**Description:** Generates a persistent, floating RAG chatbot UI component with user-selected text grounding.

**Features:**
- Floating chat icon in bottom-right corner
- User-selected text grounding functionality
- Integration with FastAPI backend
- "Answers strictly from book content" disclaimer
- Source citations in responses

**Files Generated:**
- `RAGChatbotUI.jsx` - Main chatbot component
- `RAGChatbotUI.css` - Styling for the chatbot

### 3. `docusaurus_lang_toggle_injector`
**Description:** Generates a language toggle component for English/Urdu switching.

**Features:**
- Toggle button between "اردو ترجمہ کریں" and "Switch to English"
- Theme override for global injection
- Placeholder translation logic

**Files Generated:**
- `UrduToggle.jsx` - Language toggle component
- `UrduToggle.css` - Styling for the toggle
- Theme override example for Docusaurus

## Integration Instructions

### Authentication Integration
1. Install Better Auth in your Docusaurus project:
```bash
npm install better-auth
```

2. Generate auth forms using the skill:
```bash
# Use the docusaurus_auth_form_generator skill
```

3. Create pages for signup and signin:
```javascript
// src/pages/signup.js
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="container margin-vert--lg">
      <SignupForm />
    </div>
  );
}
```

### RAG Chatbot Integration
1. Generate the chatbot component using the skill:
```bash
# Use the rag_chatbot_ui_embedder skill
```

2. Add to your Docusaurus layout:
```javascript
// src/theme/Layout/index.js
import RAGChatbotUI from '../components/RAGChatbotUI';

export default function Layout(props) {
  return (
    <div>
      <OriginalLayout {...props} />
      <RAGChatbotUI />
    </div>
  );
}
```

### Language Toggle Integration
1. Generate the toggle component using the skill:
```bash
# Use the docusaurus_lang_toggle_injector skill
```

2. Create the theme override in `src/theme/DocItem/Content/index.js` as shown in the skill documentation.

## Project Structure
```
skills/
├── docusaurus_auth_form_generator.md     # Skill for auth forms
├── rag_chatbot_ui_embedder.md            # Skill for RAG chatbot
├── docusaurus_lang_toggle_injector.md    # Skill for language toggle
└── README.md                             # This file
```

## Next Steps
1. Use each skill individually based on your needs
2. Integrate the generated components into your Docusaurus project
3. Configure backend services (FastAPI for RAG, authentication provider, translation API)
4. Test functionality across all components
5. Deploy the complete solution