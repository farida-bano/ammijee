import React from 'react';
import Navbar from '@theme-original/Navbar';

export default function NavbarWrapper(props) {
  return (
    <>
      <div 
        style={{
          height: '8px',
          background: 'linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899)',
          width: '100%',
        }}
      />
      <Navbar {...props} />
    </>
  );
}