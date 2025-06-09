import { Transition, Variants } from 'framer-motion';
import { FMUSDirection, FMUSEasing } from '../types';
/**
 * Easing presets with memorable names
 */
export declare const easings: {
    pop: number[];
    snap: number[];
    woosh: number[];
    gentle: number[];
};
/**
 * Get easing function from preset name or custom easing
 */
export declare const getEasing: (ease?: FMUSEasing) => number[] | string | undefined;
/**
 * Create transition config
 */
export declare const createTransition: (duration?: number, ease?: FMUSEasing, delay?: number, repeat?: number | "infinite") => Transition;
/**
 * Get offset for slide animations based on direction
 */
export declare const getSlideOffset: (direction: FMUSDirection, distance?: number) => {
    [key: string]: number;
};
/**
 * Create spring transition
 */
export declare const createSpring: (bounce?: number, duration?: number) => Transition;
/**
 * Create fade variants
 */
export declare const createFadeVariants: (from?: number, to?: number, transition?: Transition) => Variants;
/**
 * Create slide variants
 */
export declare const createSlideVariants: (direction: FMUSDirection, distance?: number, transition?: Transition) => Variants;
/**
 * Create bop (scale) variants
 */
export declare const createBopVariants: (scale?: number, rotate?: number, tapScale?: number, transition?: Transition) => Variants;
