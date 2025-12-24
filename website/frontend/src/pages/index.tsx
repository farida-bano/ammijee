import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Layout from '@theme/Layout';

function Home() {
  return (
    <Layout
      title={`Book`}
      description="Book educational content">
      <div className="hero hero--primary" style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #ec4899 100%)',
        color: 'white',
        padding: '4rem 0',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h1 className="hero__title" style={{color: 'white'}}>Physical AI & Humanoid Robotics</h1>
              <p className="hero__subtitle" style={{color: 'rgba(255, 255, 255, 0.9)'}}>A comprehensive guide to building intelligent, human-like robots</p>
              <div className="margin-top--lg">
                <a className="button button--secondary button--lg" href={useBaseUrl('/chapter-01')}>
                  Start Reading
                </a>
                <a className="button button--outline button--lg margin-left--md" href={useBaseUrl('/chapter-01')}>
                  Explore Chapters
                </a>
              </div>
            </div>
            <div className="col col--6">
              <ThemedImage
                className="hero__image"
                alt="Humanoid Robot"
                sources={{
                  light: useBaseUrl('/img/robot.png'),
                  dark: useBaseUrl('/img/robot.png'),
                }}
                style={{borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', width: '100%', maxHeight: '300px', objectFit: 'cover'}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-top--lg">
        <div className="row">
          <div className="col col--4 margin-bottom--lg">
            <div className="text--center padding-horiz--md">
              <div style={{fontSize: '2.5rem', marginBottom: '1rem', color: '#2563eb'}}>🤖</div>
              <h3>Advanced Control Systems</h3>
              <p>Learn about sophisticated control algorithms that enable humanoid robots to move with human-like agility.</p>
            </div>
          </div>
          <div className="col col--4 margin-bottom--lg">
            <div className="text--center padding-horiz--md">
              <div style={{fontSize: '2.5rem', marginBottom: '1rem', color: '#2563eb'}}>🧠</div>
              <h3>Physical AI Integration</h3>
              <p>Discover how artificial intelligence is combined with physical systems to create intelligent robots.</p>
            </div>
          </div>
          <div className="col col--4 margin-bottom--lg">
            <div className="text--center padding-horiz--md">
              <div style={{fontSize: '2.5rem', marginBottom: '1rem', color: '#2563eb'}}>🔧</div>
              <h3>Hardware Design</h3>
              <p>Explore the mechanical and electronic components that make up modern humanoid robotics platforms.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-top--lg">
        <div className="row">
          <div className="col">
            <h2 className="text--center">Featured Chapters</h2>
            <div className="row margin-top--lg">
              <div className="col col--3 margin-bottom--lg">
                <div className="card book-chapter-card">
                  <div className="card__header">
                    <h3 className="card__title">Chapter 1</h3>
                  </div>
                  <div className="card__body">
                    <p>Physics Simulators in Robotics</p>
                    <a href={useBaseUrl('/chapter-01')} className="button button--primary button--block">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col col--3 margin-bottom--lg">
                <div className="card book-chapter-card">
                  <div className="card__header">
                    <h3 className="card__title">Chapter 2</h3>
                  </div>
                  <div className="card__body">
                    <p>Hardware Components</p>
                    <a href={useBaseUrl('/chapter-02')} className="button button--primary button--block">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col col--3 margin-bottom--lg">
                <div className="card book-chapter-card">
                  <div className="card__header">
                    <h3 className="card__title">Chapter 3</h3>
                  </div>
                  <div className="card__body">
                    <p>Control Systems</p>
                    <a href={useBaseUrl('/chapter-03')} className="button button--primary button--block">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col col--3 margin-bottom--lg">
                <div className="card book-chapter-card">
                  <div className="card__header">
                    <h3 className="card__title">Chapter 4</h3>
                  </div>
                  <div className="card__body">
                    <p>Sensing and Perception</p>
                    <a href={useBaseUrl('/chapter-04')} className="button button--primary button--block">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-top--lg">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card__header">
                <h2>Get Help from Farida Bot</h2>
              </div>
              <div className="card__body">
                <p>Our integrated AI assistant is here to help you understand complex concepts in Physical AI & Humanoid Robotics. Ask questions, get explanations, and explore the book content interactively.</p>
                <p style={{margin: '1rem 0'}}>Just click the <strong>FB</strong> button in the bottom right corner to start chatting with Farida Bot!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;