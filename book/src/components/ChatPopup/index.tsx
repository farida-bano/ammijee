import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styles from './ChatPopup.module.css';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! I\'m Farida Bot. Ask me anything about Physical AI.' },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // For translation
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const query = inputMessage.trim();
    if (query) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: query }]);
      setInputMessage('');
      setIsLoading(true);

      try {
        // This endpoint needs to point to your FastAPI backend
        const response = await fetch('http://127.0.0.1:8000/chat', {
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
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: `Error: ${errorData.message || response.statusText}` },
          ]);
        }
      } catch (error) {
        console.error('Network or server error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error: Could not connect to the server.' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hello! I\'m Farida Bot. Ask me anything about Physical AI.' }]);
    setInputMessage('');
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
    <div className={`${styles.chatPopup_wrapper} ${isVisible ? styles.chatPopup_visible : ''}`}>
      <div className={styles.chatPopup_container}>
        <div className={styles.chatPopup_header}>
          <div className={styles.chatPopup_headerContent}>
            <h2>🤖 Farida Bot</h2>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={styles.languageSelector}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <button className={styles.chatPopup_clearChatButton} onClick={clearChat}>
            Clear Chat
          </button>
        </div>
        <div className={styles.chatPopup_box} ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.chatPopup_message} ${
                msg.sender === 'user' ? styles.chatPopup_userMessage : styles.chatPopup_botMessage
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.chatPopup_loadingIndicator} ${styles.chatPopup_visible}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <div className={styles.chatPopup_inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
