import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';

import '../css/chatbot.css'; // Import the chatbot-specific CSS

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

function ChatbotPage(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! Ask me anything about Physical AI.' },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
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
        body: JSON.stringify({ query: query }),
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
    setMessages([{ sender: 'bot', text: 'Hello! Ask me anything about Physical AI.' }]);
    setUserInput('');
  };

  return (
    <Layout
      title="Chatbot"
      description="Chat with your book about Physical AI"
    >
      <main className="chatbot-main-content">
        <div className="chat-container">
          <div className="chat-header">
            <h2>RAG Chatbot</h2>
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
