import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';

import './chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  
  const location = useLocation();

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: inputValue.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await fetch('/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let botMessageId = Date.now() + 1;
        let botMessage = { sender: 'bot', text: '', id: botMessageId };

        // Add empty bot message to start streaming
        setMessages(prev => [...prev, botMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop(); // Keep last incomplete line in buffer

          for (const line of lines) {
            if (line.trim() === '') continue;
            try {
              const data = JSON.parse(line);

              if (data.token !== undefined) {
                // Update bot message with streamed token
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: msg.text + data.token } 
                    : msg
                ));
              } else if (data.done) {
                break;
              }
            } catch (e) {
              console.error('Error parsing streaming response:', e);
            }
          }
        }
      } else {
        const errorData = await response.json();
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Error: ${errorData.message || response.statusText}`, 
          id: Date.now() + 2 
        }]);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Error: Could not connect to the server.', 
        id: Date.now() + 3 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([{
      sender: 'bot',
      text: 'Hello! I\'m Farida Bot, your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
      id: Date.now()
    }]);
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize with welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: 'Hello! I\'m Farida Bot, your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
        id: Date.now()
      }]);
    }
  }, [isOpen]);

  // Close chat when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <BrowserOnly fallback={<div>Loading chat...</div>}>
      {() => (
        <>
          {/* Floating chat button */}
          {!isOpen && (
            <button 
              className="chat-float-btn" 
              onClick={toggleChat}
              aria-label="Open Farida Bot"
            >
              <div className="chat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <circle cx="9" cy="10" r="1" fill="white"/>
                  <circle cx="15" cy="10" r="1" fill="white"/>
                  <path d="M8 13c0 2.5 2.5 3 5 3s5-.5 5-3" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="chat-badge">FB</span>
            </button>
          )}

          {/* Chat Window */}
          {isOpen && (
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-title-section">
                  <div className="chat-icon-large">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      <circle cx="9" cy="10" r="1" fill="white"/>
                      <circle cx="15" cy="10" r="1" fill="white"/>
                      <path d="M8 13c0 2.5 2.5 3 5 3s5-.5 5-3" fill="none" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Farida Bot</h3>
                    <p className="chat-subtitle">AI Assistant for Physical AI & Humanoid Robotics</p>
                  </div>
                </div>
                <div className="chat-controls">
                  <button onClick={clearChat} className="clear-chat-btn" title="Clear Chat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </button>
                  <button onClick={toggleChat} className="close-chat-btn" title="Close Chat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="chat-body" ref={chatBoxRef}>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender}-message`}
                  >
                    {message.text}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="message bot-message">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSend} className="chat-input-form">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about Physical AI..."
                  disabled={isLoading}
                  className="chat-input"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isLoading}
                  className="chat-send-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </BrowserOnly>
  );
};

export default ChatBot;