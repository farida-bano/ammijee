import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function NotFound() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`Page Not Found | ${siteConfig.title}`} description="Page not found">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <Heading as="h1" className="hero__title text--center margin-bottom--lg">
              404
            </Heading>
            <p className="text--center text--large margin-bottom--lg">
              Page Not Found
            </p>
            <div className="text--center margin-vert--lg">
              <Link to="/" className="button button--primary button--lg">
                Go to Homepage
              </Link>
            </div>
            <div className="text--center margin-vert--lg">
              <Link to="/intro" className="button button--secondary button--lg">
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}