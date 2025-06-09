import React, { createContext, useContext, ReactNode } from 'react';
import { MotionConfig as FramerMotionConfig } from 'framer-motion';
import { MotionConfigProps } from '../types';
import { usePrefersReducedMotion } from '../utils/accessibility';
import { getEasing } from '../utils/animations';

// Buat konteks untuk konfigurasi motion
const FMUSMotionContext = createContext<{
  debug: boolean;
  reducedMotion: 'user-preference' | 'always' | 'never';
}>({
  debug: false,
  reducedMotion: 'user-preference',
});

// Hook untuk mengakses konteks motion
export const useFMUSMotion = () => useContext(FMUSMotionContext);

/**
 * Komponen untuk mengonfigurasi animasi secara global
 */
export const MotionConfig: React.FC<MotionConfigProps> = ({
  children,
  reducedMotion = 'user-preference',
  defaults = {},
  debug = false,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Menentukan apakah animasi harus dikurangi
  const shouldReduceMotion =
    reducedMotion === 'always' ||
    (reducedMotion === 'user-preference' && prefersReducedMotion);

  // Use type assertion to work around type limitations
  const transition = {
    type: 'tween' as const,
  } as any;

  if (defaults.transition) {
    Object.assign(transition, defaults.transition);
  }

  transition.duration = shouldReduceMotion
    ? 0
    : defaults.transition?.duration || 0.3;

  if (defaults.transition?.ease) {
    transition.ease = getEasing(defaults.transition.ease);
  }

  return (
    <FMUSMotionContext.Provider
      value={{
        debug,
        reducedMotion,
      }}
    >
      <FramerMotionConfig
        reducedMotion={shouldReduceMotion ? 'always' : 'never'}
        transition={transition}
      >
        {children}
      </FramerMotionConfig>
    </FMUSMotionContext.Provider>
  );
};
