import React from 'react';
import {
  FadeIn,
  Slide,
  Bop,
  MotionConfig,
  useScrollReveal
} from 'fmus-motion';

/**
 * Example showing how to use FMUS Motion components
 */
export const BasicExample: React.FC = () => {
  // Create a ref for scroll reveal animation
  const cardRef = useScrollReveal({
    threshold: 0.2,
    once: true
  });

  return (
    <MotionConfig
      reducedMotion="user-preference"
      debug={false}
      defaults={{
        transition: {
          duration: 0.4,
          ease: 'gentle'
        }
      }}
    >
      <div className="container">
        <header>
          {/* Simple fade in animation */}
          <FadeIn delay={0.1} duration={0.5}>
            <h1>Welcome to FMUS-Motion</h1>
          </FadeIn>

          {/* Sliding animation from the left */}
          <Slide from="right" distance={50} delay={0.3}>
            <p>Delightful animations made simple</p>
          </Slide>
        </header>

        <main>
          {/* Card that appears on scroll */}
          <div className="card" ref={cardRef}>
            <h2>Scroll Reveal Demo</h2>
            <p>This element animates when scrolled into view</p>
          </div>

          {/* Interactive button with scale effect */}
          <Bop scale={1.1} rotate={2} tapScale={0.95}>
            <button className="action-button">
              Click Me
            </button>
          </Bop>
        </main>
      </div>
    </MotionConfig>
  );
};
