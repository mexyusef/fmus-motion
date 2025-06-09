import { TargetAndTransition, Transition } from 'framer-motion';
import { CSSProperties, ReactNode, ComponentType } from 'react';
/**
 * Core animation type that extends Framer Motion's TargetAndTransition
 */
export type FMUSAnimation = TargetAndTransition & {
    transition?: FMUSTransition;
};
/**
 * Extends Framer Motion's Transition
 */
export type FMUSTransition = Transition & {
    direction?: 'normal' | 'reverse' | 'alternate';
};
/**
 * Easing options with memorable names
 */
export type FMUSEasing = 'pop' | 'snap' | 'woosh' | 'gentle' | string;
/**
 * Direction options for animations
 */
export type FMUSDirection = 'up' | 'down' | 'left' | 'right';
/**
 * Base props for all FMUS components
 */
export interface FMUSComponentProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
    as?: string | ComponentType<any>;
    delay?: number;
    duration?: number;
    ease?: FMUSEasing;
    repeat?: number | 'infinite';
    debug?: boolean;
    [key: string]: any;
}
/**
 * Props for Fade components
 */
export interface FadeProps extends FMUSComponentProps {
    from?: number;
    to?: number;
}
/**
 * Props for Slide components
 */
export interface SlideProps extends FMUSComponentProps {
    from: FMUSDirection;
    distance?: number;
    spring?: boolean;
    bounce?: number;
}
/**
 * Props for Bop (scale) components
 */
export interface BopProps extends FMUSComponentProps {
    scale?: number;
    rotate?: number;
    tapScale?: number;
}
/**
 * Props for AnimationSequence
 */
export interface AnimationSequenceProps extends FMUSComponentProps {
    stagger?: number;
    delayChildren?: number;
}
/**
 * Options for useScrollReveal hook
 */
export interface ScrollRevealOptions {
    threshold?: number;
    once?: boolean;
    animation?: FMUSAnimation;
    root?: Element | null;
    rootMargin?: string;
}
/**
 * Options for useHoverFlip hook
 */
export interface HoverFlipOptions {
    perspective?: number;
    rotateX?: number;
    rotateY?: number;
    duration?: number;
}
/**
 * Options for useDragToDismiss hook
 */
export interface DragToDismissOptions {
    threshold?: number;
    onDismiss?: () => void;
    snapBack?: boolean;
    axis?: 'x' | 'y' | 'both';
}
/**
 * Options for useParallax hook
 */
export interface ParallaxOptions {
    speed?: number;
    axis?: 'x' | 'y';
    reverse?: boolean;
    easing?: FMUSEasing;
}
/**
 * Configuration for MotionConfig provider
 */
export interface MotionConfigProps {
    children: ReactNode;
    reducedMotion?: 'user-preference' | 'always' | 'never';
    defaults?: FMUSAnimation & {
        transition?: FMUSTransition;
    };
    debug?: boolean;
}
