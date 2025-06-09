import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FadeProps } from '../types';
import { createFadeVariants, createTransition } from '../utils/animations';
import { getDebugStyles, getDebugAttributes, debugLog } from '../utils/debug';
import { useFMUSMotion } from '../providers/MotionConfig';
import { usePrefersReducedMotion, getAccessibleDuration } from '../utils/accessibility';

/**
 * FadeIn - Komponen untuk membuat elemen muncul dengan efek fade
 */
export const FadeIn = forwardRef<HTMLDivElement, FadeProps>(
  (
    {
      children,
      from = 0,
      to = 1,
      duration = 0.5,
      delay = 0,
      ease = 'gentle',
      repeat = 0,
      className = '',
      style = {},
      disabled = false,
      as = 'div',
      debug: componentDebug = false,
      ...rest
    },
    ref
  ) => {
    // Ambil konfigurasi motion global
    const { debug: globalDebug, reducedMotion } = useFMUSMotion();
    const prefersReducedMotion = usePrefersReducedMotion();

    // Debug aktif jika di komponen atau global
    const isDebugActive = componentDebug || globalDebug;

    // Hitung durasi yang memperhatikan preferensi aksesibilitas
    const accessibleDuration = getAccessibleDuration(
      duration,
      reducedMotion,
      prefersReducedMotion
    );

    // Cek apakah animasi dinonaktifkan
    const isDisabled = disabled || accessibleDuration === 0;

    // Cetak log debug
    debugLog(
      isDebugActive,
      `FadeIn rendering with duration: ${accessibleDuration}s, disabled: ${isDisabled}`,
      { from, to, delay, ease, repeat }
    );

    // Buat transisi
    const transition = createTransition(
      accessibleDuration,
      ease,
      delay,
      repeat
    );

    // Buat variants untuk animasi
    const variants = createFadeVariants(from, to, transition);

    // Komponen yang di-render (div, section, dsb)
    const MotionComponent = motion[as as keyof typeof motion];

    return (
      <MotionComponent
        ref={ref}
        initial={isDisabled ? 'visible' : 'hidden'}
        animate="visible"
        variants={variants}
        className={className}
        style={{
          ...style,
          ...getDebugStyles(isDebugActive, 'FadeIn'),
        }}
        {...getDebugAttributes(isDebugActive, 'FadeIn')}
        {...rest}
      >
        {children}
      </MotionComponent>
    );
  }
);

FadeIn.displayName = 'FadeIn';
