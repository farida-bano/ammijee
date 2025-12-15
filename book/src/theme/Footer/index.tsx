import React, { useState } from 'react';
import OriginalFooter from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

export default function Footer(props) {
  const { siteConfig } = useDocusaurusContext();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Enhanced footer with interactive elements
  const enhancedFooter = (
    <footer className="footer-enhanced">
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <h4>{siteConfig.title}</h4>
            <p>{siteConfig.tagline}</p>
          </div>

          <div className="col col--3">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/docs/intro">Start Reading</Link></li>
              <li><Link to="/chatbot">Chatbot</Link></li>
              <li><Link to="/docs/tutorial-basics/congratulations">Tutorials</Link></li>
            </ul>
          </div>

          <div className="col col--3">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li><a href="https://x.com/FaridaBano12" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=100010806577148" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.linkedin.com/in/farida-bano-1b3b282b6/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/farida-bano" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.tiktok.com/@farida9177" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="https://www.instagram.com/faridabano159/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="col col--3">
            <h4>Stay Updated</h4>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
            {subscribed && (
              <p className="subscription-success">Thank you for subscribing!</p>
            )}
            <div className="social-icons">
              <Link to="/chatbot" className="chatbot-icon" aria-label="Chat with our bot">
                <img src="/img/robot.png" alt="Chatbot" width="24" height="24" />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.title}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/docs/intro">Documentation</Link>
            <Link to="/chatbot">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      {enhancedFooter}
      <OriginalFooter {...props} />
    </>
  );
}