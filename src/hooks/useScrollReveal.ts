import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, TargetAndTransition, Transition } from 'framer-motion';
import { useFMUSMotion } from '../providers/MotionConfig';
import { usePrefersReducedMotion } from '../utils/accessibility';
import { debugLog } from '../utils/debug';

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
export const useScrollReveal = (options?: ScrollRevealOptions) => {
  const {
    threshold = 0.1,
    once = true,
    animation = { opacity: [0, 1], y: [10, 0] },
    transition,
    root,
    rootMargin,
  } = options || {};

  const { debug } = useFMUSMotion();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Gunakan intersection observer
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    root,
    rootMargin,
  });

  // Animasi otomatis saat elemen terlihat
  useEffect(() => {
    // Jika pengguna lebih suka mengurangi gerakan, jangan animasikan
    if (prefersReducedMotion) {
      return;
    }

    // Log debug jika diaktifkan
    debugLog(
      debug,
      `ScrollReveal element is ${inView ? 'visible' : 'hidden'}`,
      { threshold, once, animation }
    );

    if (inView) {
      const element = ref.current;
      if (element) {
        // Animasikan dengan framer-motion
        const keyframes = animation;

        // Tambahkan transisi jika disediakan
        const config = transition ? { ...keyframes, transition } : keyframes;

        // Set animasi dengan atribut data untuk dukungan framer-motion
        Object.entries(config).forEach(([key, value]) => {
          // Lewati properti transition
          if (key === 'transition') return;

          // Handle array values (keyframes)
          if (Array.isArray(value) && value.length > 0) {
            element.style.setProperty(key, String(value[value.length - 1]));
          }
          // Handle single values
          else if (value !== undefined) {
            element.style.setProperty(key, String(value));
          }
        });
      }
    }
  }, [inView, animation, transition, ref, debug, prefersReducedMotion, once, threshold]);

  return ref;
};

/**
 * Hook untuk membuat elemen muncul saat di-scroll dengan kontrol yang lebih detail
 */
export const useScrollRevealControls = (options?: ScrollRevealOptions) => {
  const {
    threshold = 0.1,
    once = true,
    animation = { opacity: [0, 1], y: [10, 0] },
    transition,
    root,
    rootMargin,
  } = options || {};

  const { debug } = useFMUSMotion();
  const prefersReducedMotion = usePrefersReducedMotion();
  const controls = useAnimation();

  // Gunakan state untuk melacak visibilitas
  const [isVisible, setIsVisible] = useState(false);

  // Gunakan intersection observer
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    root,
    rootMargin,
  });

  // Animasi otomatis saat elemen terlihat
  useEffect(() => {
    // Jika pengguna lebih suka mengurangi gerakan, jangan animasikan
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Log debug jika diaktifkan
    debugLog(
      debug,
      `ScrollRevealControls element is ${inView ? 'visible' : 'hidden'}`,
      { threshold, once, animation }
    );

    if (inView) {
      // Animasikan dengan framer-motion
      const keyframes = animation;

      // Tambahkan transisi jika disediakan
      const config = transition ? { ...keyframes, transition } : keyframes;

      controls.start(config);
      setIsVisible(true);
    } else if (!once) {
      controls.start({ opacity: 0, y: 10 });
      setIsVisible(false);
    }
  }, [inView, animation, transition, controls, debug, prefersReducedMotion, once, threshold]);

  return [ref, controls, isVisible] as const;
};
