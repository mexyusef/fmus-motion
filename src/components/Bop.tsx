import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BopProps } from '../types';
import { createBopVariants, createTransition } from '../utils/animations';
import { getDebugStyles, getDebugAttributes, debugLog } from '../utils/debug';
import { useFMUSMotion } from '../providers/MotionConfig';
import { usePrefersReducedMotion, getAccessibleDuration } from '../utils/accessibility';

/**
 * Bop - Komponen untuk membuat elemen yang membesar/mengecil saat interaksi
 */
export const Bop = forwardRef<HTMLDivElement, BopProps>(
  (
    {
      children,
      scale = 1.05,
      rotate = 0,
      tapScale = 0.95,
      duration = 0.15,
      ease = 'snap',
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
      `Bop rendering with scale: ${scale}, rotate: ${rotate}deg, disabled: ${isDisabled}`,
      { tapScale, duration: accessibleDuration, ease }
    );

    // Buat transisi
    const transition = createTransition(accessibleDuration, ease);

    // Buat variants untuk animasi
    const variants = createBopVariants(scale, rotate, tapScale, transition);

    // Komponen yang di-render (div, button, dsb)
    const MotionComponent = motion[as as keyof typeof motion];

    return (
      <MotionComponent
        ref={ref}
        initial="initial"
        whileHover={isDisabled ? undefined : "hover"}
        whileTap={isDisabled ? undefined : "tap"}
        variants={variants}
        className={className}
        style={{
          ...style,
          ...getDebugStyles(isDebugActive, 'Bop'),
        }}
        {...getDebugAttributes(isDebugActive, 'Bop')}
        {...rest}
      >
        {children}
      </MotionComponent>
    );
  }
);

Bop.displayName = 'Bop';
