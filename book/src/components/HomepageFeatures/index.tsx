import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  to?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Coverage',
    icon: '📖',
    description: (
      <>
        Explore all aspects of Physical AI from foundational concepts to advanced implementations.
        Our book provides in-depth coverage of both theoretical and practical elements.
      </>
    ),
    to: "/intro"
  },
  {
    title: 'Interactive Learning',
    icon: '🎯',
    description: (
      <>
        Engage with interactive examples, code snippets, and hands-on exercises that reinforce
        key concepts in Physical AI. Learn by doing with practical applications.
      </>
    ),
    to: "/intro"
  },
  {
    title: 'Expert Guidance',
    icon: '🧠',
    description: (
      <>
        Benefit from expert insights and best practices developed by leading researchers in
        Physical AI. Gain knowledge from real-world applications and case studies.
      </>
    ),
    to: "/intro"
  },
];

function Feature({title, icon, description, to}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureIcon}>
          <span style={{fontSize: '3rem'}}>{icon}</span>
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {to && (
          <Link to={to} className="button button--primary button--sm margin-top--md">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
