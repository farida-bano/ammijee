import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';

import '../css/chatbot.css'; // Import the chatbot-specific CSS

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

function ChatbotPage(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I\'m Farida Bot. Ask me anything about Physical AI.' },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // For translation
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const query = userInput.trim();
    if (!query) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: query }]);
    setUserInput('');
    setIsLoading(true); // Show loading indicator

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', { // Use full URL for the backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          language: selectedLanguage // Include language for translation
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
      } else {
        const errorData = await response.json();
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: `Error: ${errorData.message || response.statusText}` }]);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: Could not connect to the server. Make sure the backend is running at http://127.0.0.1:8000.' }]);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hello! I\'m Farida Bot. Ask me anything about Physical AI.' }]);
    setUserInput('');
  };

  // Language options for translation
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ur', name: 'Urdu' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];

  return (
    <Layout
      title="Farida Bot"
      description="Chat with Farida Bot about Physical AI"
    >
      <main className="chatbot-main-content">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-content">
              <h2>🤖 Farida Bot</h2>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-selector"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <button onClick={clearChat} className="clear-chat-button">Clear Chat</button>
          </div>
          <div className="chat-box" id="chat-box" ref={chatBoxRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}-message`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              id="user-input"
              placeholder="Type your message..."
              autoComplete="off"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
            />
            <button type="submit" onClick={sendMessage}>Send</button>
          </div>
          {isLoading && (
            <div id="loading-indicator" className="loading-indicator visible">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default ChatbotPage;
