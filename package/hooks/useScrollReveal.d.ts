import { TargetAndTransition, Transition } from 'framer-motion';
/**
 * Options for scroll reveal animation
 */
export interface ScrollRevealOptions {
    /** Threshold untuk menentukan kapan elemen dianggap terlihat (0-1) */
    threshold?: number;
    /** Apakah animasi hanya dijalankan sekali */
    once?: boolean;
    /** Konfigurasi animasi yang akan dijalankan */
    animation?: TargetAndTransition;
    /** Konfigurasi transisi untuk animasi */
    transition?: Transition;
    /** Root element untuk pengamatan */
    root?: Element | null;
    /** Margin root untuk pengamatan */
    rootMargin?: string;
}
/**
 * Hook untuk membuat elemen muncul saat di-scroll ke dalam viewport
 */
export declare const useScrollReveal: (options?: ScrollRevealOptions) => (node?: Element | null) => void;
/**
 * Hook untuk membuat elemen muncul saat di-scroll dengan kontrol yang lebih detail
 */
export declare const useScrollRevealControls: (options?: ScrollRevealOptions) => readonly [(node?: Element | null) => void, import("framer-motion").AnimationControls, boolean];
