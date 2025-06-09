import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';
import { createSlideVariants, createSpring, createTransition } from '../utils/animations';
import { getDebugStyles, getDebugAttributes, debugLog } from '../utils/debug';
import { useFMUSMotion } from '../providers/MotionConfig';
import { usePrefersReducedMotion, getAccessibleDuration } from '../utils/accessibility';

/**
 * Slide - Komponen untuk membuat elemen muncul dengan efek slide
 */
export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  (
    {
      children,
      from = 'left',
      distance = 50,
      duration = 0.5,
      delay = 0,
      ease = 'woosh',
      repeat = 0,
      spring = false,
      bounce = 0.25,
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
      `Slide rendering with direction: ${from}, distance: ${distance}px, disabled: ${isDisabled}`,
      { duration: accessibleDuration, delay, ease, repeat, spring, bounce }
    );

    // Buat transisi berdasarkan jenis (spring atau biasa)
    const transition = spring
      ? createSpring(bounce, accessibleDuration)
      : createTransition(accessibleDuration, ease, delay, repeat);

    // Buat variants untuk animasi
    const variants = createSlideVariants(from, distance, transition);

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
          ...getDebugStyles(isDebugActive, 'Slide'),
        }}
        {...getDebugAttributes(isDebugActive, 'Slide')}
        {...rest}
      >
        {children}
      </MotionComponent>
    );
  }
);

Slide.displayName = 'Slide';
