import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FadeIn } from '../src/components/FadeIn';

describe('FadeIn component', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div data-testid="test-content">Test Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });

  it('applies initial and animate props', () => {
    const { container } = render(
      <FadeIn data-testid="fade-container">
        <div>Test Content</div>
      </FadeIn>
    );

    const fadeElement = container.firstChild;

    // Check if it has Framer Motion's data attribute
    expect(fadeElement).toHaveAttribute('data-framer-motion-initial-animation');
  });

  it('respects disabled prop', () => {
    const { container } = render(
      <FadeIn disabled data-testid="fade-container">
        <div>Test Content</div>
      </FadeIn>
    );

    const fadeElement = container.firstChild;

    // When disabled, it should start with visible state immediately
    expect(fadeElement).toHaveAttribute('initial', 'visible');
  });

  it('accepts custom component via "as" prop', () => {
    const { container } = render(
      <FadeIn as="section" data-testid="fade-container">
        <div>Test Content</div>
      </FadeIn>
    );

    // Should be a section element
    expect(container.firstChild?.nodeName.toLowerCase()).toBe('section');
  });

  it('passes additional props to the motion component', () => {
    render(
      <FadeIn data-testid="fade-container" aria-label="Animated content">
        <div>Test Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('fade-container')).toHaveAttribute('aria-label', 'Animated content');
  });
});
