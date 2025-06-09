import React, { useState } from 'react';
import {
  FadeIn,
  Slide,
  Bop,
  AnimationSequence,
  MotionConfig,
  useScrollReveal,
  useScrollRevealControls
} from 'fmus-motion';

/**
 * Example showcasing advanced usage of FMUS-Motion
 */
export const AdvancedExample: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  // Use scroll reveal hooks with different configurations
  const heroRef = useScrollReveal({
    threshold: 0.1,
    once: true,
    animation: {
      opacity: [0, 1],
      scale: [0.9, 1]
    }
  });

  const [featuresRef, controls, isVisible] = useScrollRevealControls({
    threshold: 0.2,
    once: false
  });

  return (
    <MotionConfig
      reducedMotion="user-preference"
      debug={false}
      defaults={{
        transition: {
          duration: 0.4,
          ease: 'woosh'
        }
      }}
    >
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <FadeIn duration={0.8}>
          <h1>FMUS-Motion Demo</h1>
        </FadeIn>

        <Slide from="right" distance={100} delay={0.2}>
          <p className="tagline">Human-centric animations for delightful interfaces</p>
        </Slide>

        <Bop scale={1.05} rotate={1}>
          <button
            className="cta-button"
            onClick={() => setIsActive(!isActive)}
          >
            Get Started
          </button>
        </Bop>
      </section>

      {/* Features Section */}
      <section className="features" ref={featuresRef}>
        <h2>Our Features</h2>

        {isVisible && (
          <AnimationSequence stagger={0.15} delayChildren={0.2}>
            <div className="feature-card">
              <FadeIn>
                <h3>Memorable APIs</h3>
                <p>Fun names that are easy to remember and use</p>
              </FadeIn>
            </div>

            <div className="feature-card">
              <FadeIn>
                <h3>Accessibility First</h3>
                <p>Respects user preferences for reduced motion</p>
              </FadeIn>
            </div>

            <div className="feature-card">
              <FadeIn>
                <h3>Powerful Composition</h3>
                <p>Combine components for complex animations</p>
              </FadeIn>
            </div>
          </AnimationSequence>
        )}
      </section>

      {/* Demo of conditional animations */}
      {isActive && (
        <section className="demo-section">
          <AnimationSequence stagger={0.1}>
            <Slide from="left" distance={50}>
              <div className="demo-card">Animation 1</div>
            </Slide>

            <Slide from="bottom" distance={50}>
              <div className="demo-card">Animation 2</div>
            </Slide>

            <Slide from="right" distance={50}>
              <div className="demo-card">Animation 3</div>
            </Slide>
          </AnimationSequence>
        </section>
      )}
    </MotionConfig>
  );
};
