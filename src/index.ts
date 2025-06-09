// Components
export { FadeIn } from './components/FadeIn';
export { Slide } from './components/Slide';
export { Bop } from './components/Bop';

// Hooks
export { useScrollReveal, useScrollRevealControls } from './hooks/useScrollReveal';

// Providers
export { MotionConfig, useFMUSMotion } from './providers/MotionConfig';

// Animation utilities
export {
  createTransition,
  createFadeVariants,
  createSlideVariants,
  createBopVariants,
  createSpring,
  getEasing
} from './utils/animations';

// Accessibility utilities
export {
  usePrefersReducedMotion,
  getAccessibleDuration,
  shouldDisableAnimation
} from './utils/accessibility';

// Types
export * from './types';
