import React from 'react';
import {
  useScrollReveal,
  useScrollRevealControls,
  MotionConfig
} from '../src';

/**
 * Example component to demonstrate useScrollReveal hooks
 */
export const ScrollRevealDemo: React.FC = () => {
  // Basic scroll reveal hook
  const fadeInRef = useScrollReveal({
    threshold: 0.2,
    once: true,
    animation: {
      opacity: [0, 1],
      y: [20, 0]
    }
  });

  // Advanced scroll reveal hook with controls
  const [slideInRef, controls, isVisible] = useScrollRevealControls({
    threshold: 0.3,
    once: false,
    animation: {
      opacity: [0, 1],
      x: [-50, 0]
    }
  });

  // Staggered elements with scroll reveal
  const card1Ref = useScrollReveal({
    threshold: 0.2,
    once: true,
    animation: {
      opacity: [0, 1],
      scale: [0.9, 1]
    },
    transition: {
      duration: 0.5,
      delay: 0
    }
  });

  const card2Ref = useScrollReveal({
    threshold: 0.2,
    once: true,
    animation: {
      opacity: [0, 1],
      scale: [0.9, 1]
    },
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  });

  const card3Ref = useScrollReveal({
    threshold: 0.2,
    once: true,
    animation: {
      opacity: [0, 1],
      scale: [0.9, 1]
    },
    transition: {
      duration: 0.5,
      delay: 0.4
    }
  });

  return (
    <MotionConfig
      reducedMotion="user-preference"
      defaults={{
        transition: {
          duration: 0.5,
          ease: 'gentle'
        }
      }}
    >
      <div className="scroll-reveal-demo">
        <section className="hero">
          <div className="container">
            <h1>Scroll Reveal Demo</h1>
            <p>Scroll down to see animations trigger as elements enter the viewport</p>
          </div>
        </section>

        <section className="fade-in-section">
          <div className="container" ref={fadeInRef}>
            <h2>Fade In on Scroll</h2>
            <p>This section fades in when scrolled into view</p>
          </div>
        </section>

        <section className="slide-in-section">
          <div className="container" ref={slideInRef}>
            <h2>Slide In with Controls</h2>
            <p>This section slides in and can be controlled with the useScrollRevealControls hook</p>
            <p>Current visibility state: {isVisible ? 'Visible' : 'Hidden'}</p>
            <button onClick={() => controls.start('visible')}>
              Show
            </button>
            <button onClick={() => controls.start('hidden')}>
              Hide
            </button>
          </div>
        </section>

        <section className="staggered-cards">
          <div className="container">
            <h2>Staggered Reveal</h2>
            <div className="cards">
              <div className="card" ref={card1Ref}>
                <h3>Card 1</h3>
                <p>I appear first</p>
              </div>
              <div className="card" ref={card2Ref}>
                <h3>Card 2</h3>
                <p>I appear second</p>
              </div>
              <div className="card" ref={card3Ref}>
                <h3>Card 3</h3>
                <p>I appear third</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};
