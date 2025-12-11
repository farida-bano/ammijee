import React from 'react';
import ChatBot from '../components/ChatBot/ChatBot';

// Root component that wraps the entire app
export default function Root({children}) {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}