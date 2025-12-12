import React from 'react';
import clsx from 'clsx';
import styles from './Cards.module.css';

const FeatureList = [
  {
    title: 'Introduction to Physical AI',
    description: (
      <>
        Understanding the fundamentals of artificial intelligence applied to physical systems,
        including sensors, actuators, and real-world interaction challenges.
      </>
    ),
    link: '/docs/intro',
  },
  {
    title: 'Humanoid Robotics Design',
    description: (
      <>
        Exploring the principles of designing humanoid robots, including kinematics,
        dynamics, and biomechanical considerations.
      </>
    ),
    link: '/docs/modules/basics',
  },
  {
    title: 'Control Systems',
    description: (
      <>
        Advanced control algorithms for humanoid robots, including balance, locomotion,
        and manipulation strategies.
      </>
    ),
    link: '/docs/modules/control',
  },
  {
    title: 'Machine Learning for Robotics',
    description: (
      <>
        Applying modern machine learning techniques to robotic systems, including
        reinforcement learning and neural networks.
      </>
    ),
    link: '/docs/modules/ml',
  },
  {
    title: 'Hardware Integration',
    description: (
      <>
        Practical implementation of robotic systems, including component selection,
        assembly, and testing procedures.
      </>
    ),
    link: '/docs/modules/hardware',
  },
  {
    title: 'Ethics and Safety',
    description: (
      <>
        Addressing ethical considerations and safety protocols in humanoid robotics
        development and deployment.
      </>
    ),
    link: '/docs/modules/ethics',
  },
];

function FeatureCard({ title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="card">
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <a href={link} className="button button--secondary button--block">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}