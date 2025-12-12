import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import UrduToggle from '@site/src/components/UrduToggle';
import Cards from '@site/src/components/Cards';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <UrduToggle />
        </div>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Read the Book
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Book">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>Physical AI</h3>
                  <p>Exploring the intersection of artificial intelligence and physical systems.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>Humanoid Robotics</h3>
                  <p>Advanced robotics focusing on human-like form and functionality.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>End-to-End Pipeline</h3>
                  <p>Complete educational journey from theory to practical implementation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Book Content</h2>
            <Cards />
          </div>
        </section>
      </main>
    </Layout>
  );
}