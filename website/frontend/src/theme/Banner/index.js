import React from 'react';
import clsx from 'clsx';
import {Container, Heading} from '@theme-original';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HeroBannerWrapper(props) {
  const {siteConfig} = useDocusaurusContext();
  
  // Check if this is the home page
  const isHomePage = typeof window !== 'undefined' 
    ? window.location.pathname === '/' || window.location.pathname === '/index.html' 
    : false;
  
  if (!isHomePage) {
    return <div className="hero hero--primary">{props.children}</div>;
  }
  
  return (
    <div 
      className="hero hero--primary"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #ec4899 100%)',
        backgroundImage: 'url(/img/hero-bg.jpg), linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #ec4899 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        color: 'white',
        padding: '4rem 0',
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      
      <Container>
        {props.children}
      </Container>
    </div>
  );
}