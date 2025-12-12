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