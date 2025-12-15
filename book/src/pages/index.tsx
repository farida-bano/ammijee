import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg margin-right--md"
                to="/intro">
                Start Reading
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/chatbot">
                <img
                  src="/img/robot.png"
                  alt="Chatbot"
                  style={{width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle'}}
                />
                Explore with Farida Bot
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.bookCover}>
              <div className={styles.bookSpine}></div>
              <div className={styles.bookFront}>
                <div className={styles.bookTitle}>Physical AI</div>
                <div className={styles.bookAuthor}>By Farida Bano</div>
                <div className={styles.bookIcon}>🤖</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Interactive Features Section
function InteractiveFeatures(): ReactNode {
  const features = [
    {
      title: 'Interactive Reading',
      description: 'Engage with the content through quizzes, examples, and hands-on exercises.',
      icon: '📚',
    },
    {
      title: 'AI-Powered Assistance',
      description: 'Get instant answers to your questions with our smart chatbot feature.',
      icon: '🤖',
    },
    {
      title: 'Visual Learning',
      description: 'Rich diagrams, videos, and interactive elements to enhance understanding.',
      icon: '📊',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container padding-horiz--md">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className={styles.featureCard}>
                <h3>{feature.icon} {feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Book Preview Section
function BookPreview(): ReactNode {
  return (
    <section className={styles.bookPreview}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.previewTitle}>What You'll Learn</Heading>
            <p className={styles.previewSubtitle}>A comprehensive guide to Physical AI concepts and applications</p>
          </div>
        </div>
        <div className="row">
          <div className="col col--4">
            <div className={styles.previewCard}>
              <div className={styles.previewIcon}>🔬</div>
              <Heading as="h3" className={styles.previewCardTitle}>Foundations of Physical AI</Heading>
              <p>Understand the core principles and theoretical foundations that underpin all Physical AI applications.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.previewCard}>
              <div className={styles.previewIcon}>⚙️</div>
              <Heading as="h3" className={styles.previewCardTitle}>Implementation Techniques</Heading>
              <p>Learn practical implementation strategies and best practices for building Physical AI systems.</p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.previewCard}>
              <div className={styles.previewIcon}>🚀</div>
              <Heading as="h3" className={styles.previewCardTitle}>Real-World Applications</Heading>
              <p>Explore case studies and examples of Physical AI in action across various industries.</p>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '2rem', justifyContent: 'center'}}>
          <Link className="button button--primary button--lg" to="/intro">
            Dive Into the Book
          </Link>
        </div>
      </div>
    </section>
  );
}
// Book Highlights Section
function BookHighlights(): ReactNode {
  const highlights = [
    { icon: '🎓', title: '15 Chapters', description: 'Comprehensive coverage of Physical AI topics' },
    { icon: '⏱️', title: '20+ Hours', description: 'Of interactive learning content' },
    { icon: '🔧', title: 'Code Samples', description: 'Practical implementations and examples' },
    { icon: '🧠', title: 'AI Assistance', description: '24/7 access to Farida Bot' },
    { icon: '📚', title: 'Quizzes', description: 'Test your knowledge as you learn' },
    { icon: '🚀', title: 'Projects', description: 'Real-world applications and case studies' }
  ];

  return (
    <section className={styles.highlights}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.sectionTitle}>Book Highlights</Heading>
          </div>
        </div>
        <div className="row">
          {highlights.map((highlight, index) => (
            <div key={index} className="col col--2 text--center">
              <div className={styles.highlightIcon}>{highlight.icon}</div>
              <div className={styles.highlightTitle}>{highlight.title}</div>
              <div className={styles.highlightDesc}>{highlight.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials(): ReactNode {
  const testimonials = [
    {
      quote: "This book transformed my understanding of Physical AI. The interactive elements made complex concepts easy to grasp.",
      author: "Sarah Johnson",
      role: "AI Researcher"
    },
    {
      quote: "Farida Bot made learning so much easier! I could get instant answers to my questions without interrupting my flow.",
      author: "Michael Chen",
      role: "Software Engineer"
    },
    {
      quote: "The practical examples and projects helped me apply Physical AI concepts in my own work immediately.",
      author: "Priya Sharma",
      role: "Robotics Specialist"
    }
  ];

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <Heading as="h2" className={styles.sectionTitle}>What Readers Say</Heading>
          </div>
        </div>
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col col--4 margin-bottom--lg">
              <div className={styles.testimonialCard}>
                <div className={styles.quoteIcon}>❝</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="An interactive learning experience powered by AI">
      <HomepageHeader />
      <main>
        <InteractiveFeatures />
        <BookPreview />
        <BookHighlights />
        <Testimonials />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
