# Skill: rag_chatbot_ui_embedder

## Description
A skill to generate a persistent, floating UI component for the RAG Chatbot, ready for external API connection.

## Functionality
1. Generates a **React Chatbot Component** (`RAGChatbotUI.jsx`).
2. Designs a minimal, bottom-right floating icon UI.
3. Includes logic to handle user input and send queries to a **FastAPI backend** (e.g., `http://localhost:8000/rag_query`).
4. Implements the **User-Selected Text Grounding** feature: Detects selected text on the page and includes it as context in the API request.
5. Includes a prominent disclaimer: **"Answers strictly from book content"**.

## Implementation

### RAGChatbotUI.jsx
```jsx
import React, { useState, useEffect, useRef } from 'react';
import './RAGChatbotUI.css';

const RAGChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Function to get selected text from the page
  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection.toString().trim();
  };

  // Function to handle text selection
  const handleTextSelection = () => {
    const text = getSelectedText();
    if (text && text.length > 0) {
      setSelectedText(text);
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  // Add event listeners for text selection
  useEffect(() => {
    const handleMouseUp = () => {
      handleTextSelection();
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send query to backend
  const sendQuery = async (query, groundingMode = 'full_book', context = '') => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/rag/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query,
          grounding_mode: groundingMode,
          selected_text: context,
          session_id: 'session_' + Date.now() // Simple session ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to messages
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.answer,
          sender: 'bot',
          sources: data.sources || []
        }
      ]);
    } catch (error) {
      console.error('Error sending query:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Sorry, I encountered an error processing your request. Please try again.',
          sender: 'bot'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      selectedText: selectedText
    };

    setMessages(prev => [...prev, userMessage]);

    // Determine grounding mode based on whether text is selected
    const groundingMode = selectedText ? 'selected_text' : 'full_book';
    const context = selectedText ? selectedText : '';

    // Clear input and selected text
    setInputValue('');
    if (selectedText) {
      setSelectedText('');
    }

    // Send query to backend
    sendQuery(inputValue, groundingMode, context);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedText('');
  };

  return (
    <>
      {/* Floating chat icon */}
      {!isOpen && (
        <div className="chatbot-float" onClick={toggleChat}>
          <div className="chatbot-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-container" ref={chatContainerRef}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <h3>Physical AI & Humanoid Robotics RAG Chatbot</h3>
              <p className="chatbot-disclaimer">Answers strictly from book content</p>
            </div>
            <div className="chatbot-controls">
              <button onClick={clearChat} className="clear-btn" title="Clear chat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
              <button onClick={toggleChat} className="close-btn" title="Close chat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>Hello! I'm your RAG chatbot for the Physical AI & Humanoid Robotics book.</p>
                <p>You can ask me questions about the book content, or select text on the page to ask specific questions about it.</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.sender === 'bot' && message.sources && message.sources.length > 0 && (
                    <div className="message-sources">
                      <small>Sources: {message.sources.map(source => source.title).join(', ')}</small>
                    </div>
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <p>Thinking...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {selectedText && (
            <div className="selected-text-preview">
              <small>Selected text: "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"</small>
            </div>
          )}

          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedText ? "Ask about selected text..." : "Ask about the book content..."}
              disabled={isLoading}
            />
            <button type="submit" disabled={inputValue.trim() === '' || isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20px" height="20px">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RAGChatbotUI;
```

### RAGChatbotUI.css
```css
.chatbot-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
}

.chatbot-icon {
  width: 60px;
  height: 60px;
  background-color: #4361ee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  background-color: #3a56d4;
}

.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chatbot-header {
  background-color: #4361ee;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chatbot-disclaimer {
  margin: 4px 0 0 0;
  font-size: 12px;
  opacity: 0.9;
}

.chatbot-controls {
  display: flex;
  gap: 8px;
}

.chatbot-controls button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.chatbot-controls button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f9f9f9;
}

.welcome-message {
  padding: 8px 0;
  color: #666;
  font-size: 14px;
}

.message {
  margin-bottom: 16px;
  max-width: 85%;
}

.user-message {
  margin-left: auto;
}

.bot-message {
  margin-right: auto;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.user-message .message-content {
  background-color: #4361ee;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot-message .message-content {
  background-color: #e9ecef;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-sources {
  margin-bottom: 8px;
  font-size: 11px;
  color: #6c757d;
}

.selected-text-preview {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 8px 16px;
  font-size: 12px;
  text-align: center;
}

.chatbot-input-form {
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e9ecef;
}

.chatbot-input-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
}

.chatbot-input-form input:focus {
  border-color: #4361ee;
}

.chatbot-input-form button {
  background-color: #4361ee;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-input-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.chatbot-input-form button:hover:not(:disabled) {
  background-color: #3a56d4;
}

/* Responsive design */
@media (max-width: 480px) {
  .chatbot-container {
    width: calc(100% - 40px);
    height: 50vh;
    bottom: 10px;
    right: 10px;
  }
}
```

## Usage
1. Save the component and CSS file to your Docusaurus project
2. Import and add the component to your layout (e.g., in `src/theme/Layout/index.js`)
3. The chatbot will appear as a floating icon in the bottom-right corner
4. It will automatically detect text selection on the page
5. Configure the backend API endpoint as needed
```