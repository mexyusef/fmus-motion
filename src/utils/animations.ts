import { Transition, Variants } from 'framer-motion';
import { FMUSDirection, FMUSEasing } from '../types';

/**
 * Easing presets with memorable names
 */
export const easings = {
  // Bouncy animations
  pop: [0.16, 1.44, 0.3, 1.01],
  // Fast start, gentle finish
  snap: [0.05, 0.7, 0.1, 1],
  // Steady acceleration
  woosh: [0.25, 0.1, 0.25, 1],
  // Subtle motion
  gentle: [0.4, 0, 0.2, 1],
};

/**
 * Get easing function from preset name or custom easing
 */
export const getEasing = (ease?: FMUSEasing): number[] | string | undefined => {
  if (!ease) return undefined;
  return easings[ease as keyof typeof easings] || ease;
};

/**
 * Create transition config
 */
export const createTransition = (
  duration?: number,
  ease?: FMUSEasing,
  delay?: number,
  repeat?: number | 'infinite'
): Transition => {
  return {
    type: 'tween',
    duration,
    ease: getEasing(ease),
    delay,
    repeat: repeat === 'infinite' ? Infinity : repeat,
  };
};

/**
 * Get offset for slide animations based on direction
 */
export const getSlideOffset = (
  direction: FMUSDirection,
  distance: number = 50
): { [key: string]: number } => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return { x: 0 };
  }
};

/**
 * Create spring transition
 */
export const createSpring = (
  bounce: number = 0.25,
  duration: number = 0.5
): Transition => {
  return {
    type: 'spring',
    bounce,
    duration,
  };
};

/**
 * Create fade variants
 */
export const createFadeVariants = (
  from: number = 0,
  to: number = 1,
  transition?: Transition
): Variants => {
  return {
    hidden: {
      opacity: from,
      transition,
    },
    visible: {
      opacity: to,
      transition,
    },
  };
};

/**
 * Create slide variants
 */
export const createSlideVariants = (
  direction: FMUSDirection,
  distance: number = 50,
  transition?: Transition
): Variants => {
  const offset = getSlideOffset(direction, distance);

  return {
    hidden: {
      ...offset,
      opacity: 0,
      transition,
    },
    visible: {
      ...Object.keys(offset).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
      opacity: 1,
      transition,
    },
  };
};

/**
 * Create bop (scale) variants
 */
export const createBopVariants = (
  scale: number = 1.05,
  rotate: number = 0,
  tapScale: number = 0.95,
  transition?: Transition
): Variants => {
  const tapTransition = transition ? {
    ...transition,
    type: 'tween',
    duration: transition.type === 'tween' && 'duration' in transition ?
      (transition.duration as number / 2) : 0.15,
  } : { type: 'tween', duration: 0.15 };

  return {
    initial: {
      scale: 1,
      rotate: 0,
      transition,
    },
    hover: {
      scale,
      rotate: rotate,
      transition,
    },
    tap: {
      scale: tapScale,
      transition: tapTransition,
    },
  };
};
