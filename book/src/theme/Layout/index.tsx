import React, { useState } from 'react'; // Import useState
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import styles from './styles.module.css';
import ChatPopup from '@site/src/components/ChatPopup'; // Import ChatPopup

export default function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    title,
    description,
  } = props;
  useKeyboardNavigation();

  const [isChatPopupVisible, setIsChatPopupVisible] = useState(false); // State for popup visibility

  const toggleChatPopup = () => {
    setIsChatPopupVisible((prev) => !prev);
  };

  const closeChatPopup = () => {
    setIsChatPopupVisible(false);
  };

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.layout.main.container,
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}

      {/* Floating Button */}
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1001, // Above the chat popup
          backgroundColor: '#6a11cb',
          backgroundImage: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onClick={toggleChatPopup}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        }}
        aria-label="Open Farida Bot"
      >
        <span title="Farida Bot">🤖</span>
      </button>

      {/* Chat Popup Component */}
      <ChatPopup isVisible={isChatPopupVisible} onClose={closeChatPopup} />
    </LayoutProvider>
  );
}