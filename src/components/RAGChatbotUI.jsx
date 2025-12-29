import React, { useState, useEffect, useRef } from 'react';
import './RAGChatbotUI.css';

// ==========================================
// CONFIGURATION: Centralized Backend URL
// ==========================================
const BACKEND_BASE_URL = 'https://zohaib617-book-backend.hf.space';
const CHAT_API_ENDPOINT = `${BACKEND_BASE_URL}/api/v1/chat`;
// ==========================================

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
  }, [isOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send query to Hugging Face backend
  const sendQuery = async (query, selectedTextContext = '') => {
    setIsLoading(true);

    try {
      console.log('[RAG Chat] Sending request to:', CHAT_API_ENDPOINT);

      const response = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: Hugging Face Spaces might sometimes require additional headers 
          // if it's set to private, but for public spaces this works fine.
        },
        body: JSON.stringify({
          question: query,
          selected_text: selectedTextContext || null,
          top_k: 5
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Error: ${response.status}. ${errorText}`);
      }

      const data = await response.json();

      if (!data.answer) {
        throw new Error('No answer received from the AI model.');
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.answer,
          sender: 'bot',
          sources: data.sources || [],
          mode: data.mode || 'normal_rag'
        }
      ]);
    } catch (error) {
      console.error('[RAG Chat] Error:', error);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `Connection Error: Could not reach the AI service. Please ensure the backend at Hugging Face is "Running".`,
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

    const queryText = inputValue.trim();
    const contextText = selectedText ? selectedText.trim() : '';

    const userMessage = {
      id: Date.now(),
      text: queryText,
      sender: 'user',
      selectedText: contextText
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    if (contextText) {
      setSelectedText('');
    }

    sendQuery(queryText, contextText);
  };

  const toggleChat = () => setIsOpen(!isOpen);
  const clearChat = () => {
    setMessages([]);
    setSelectedText('');
  };

  return (
    <>
      {/* Floating icon */}
      {!isOpen && (
        <div className="chatbot-float" onClick={toggleChat} style={{ cursor: 'pointer' }}>
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
              <h3>Humanoid Robotics AI</h3>
              <p className="chatbot-disclaimer">Hugging Face Backend Active</p>
            </div>
            <div className="chatbot-controls">
              <button onClick={clearChat} className="clear-btn" title="Clear">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
              <button onClick={toggleChat} className="close-btn" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>Connected to <b>Hugging Face Space</b>.</p>
                <p>Ask me anything about the Robotics book or select text to analyze it.</p>
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
                      <small>
                        Sources: {message.sources.map(s => s?.page_title || 'Ref').join(', ')}
                      </small>
                    </div>
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <p className="typing-effect">Analyzing book content...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {selectedText && (
            <div className="selected-text-preview">
              <small><b>Context:</b> "{selectedText.substring(0, 80)}..."</small>
            </div>
          )}

          <form onSubmit={handleSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
            />
            <button type="submit" disabled={!inputValue.trim() || isLoading}>
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