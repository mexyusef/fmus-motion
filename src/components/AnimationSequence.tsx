import React, { Children, cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { AnimationSequenceProps } from '../types';
import { getDebugStyles, getDebugAttributes, debugLog } from '../utils/debug';
import { useFMUSMotion } from '../providers/MotionConfig';
import { usePrefersReducedMotion, getAccessibleDuration } from '../utils/accessibility';

/**
 * AnimationSequence - Komponen untuk membuat animasi bertahap untuk elemen-elemen anak
 */
export const AnimationSequence = React.forwardRef<HTMLDivElement, AnimationSequenceProps>(
  (
    {
      children,
      stagger = 0.1,
      delayChildren = 0,
      duration = 0.5,
      ease = 'gentle',
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
      `AnimationSequence rendering with stagger: ${stagger}s, disabled: ${isDisabled}`,
      { delayChildren, duration: accessibleDuration, ease }
    );

    // Hitung total anak
    const childCount = Children.count(children);

    // Buat konfigurasi variants untuk container
    const containerVariants = {
      hidden: {
        opacity: 1
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isDisabled ? 0 : stagger,
          delayChildren: isDisabled ? 0 : delayChildren,
        },
      },
    };

    // Komponen yang di-render (div, section, dsb)
    const MotionComponent = motion[as as keyof typeof motion];

    return (
      <MotionComponent
        ref={ref}
        variants={containerVariants}
        initial={isDisabled ? 'visible' : 'hidden'}
        animate="visible"
        className={className}
        style={{
          ...style,
          ...getDebugStyles(isDebugActive, 'AnimationSequence'),
        }}
        {...getDebugAttributes(isDebugActive, 'AnimationSequence')}
        {...rest}
      >
        {Children.map(children, (child, index) => {
          // Jika child bukan elemen React yang valid, kembalikan apa adanya
          if (!isValidElement(child)) {
            return child;
          }

          // Jika animasi dinonaktifkan, jangan tambahkan delay untuk anak-anak
          if (isDisabled) {
            return child;
          }

          // Clone elemen dengan prop tambahan (initial dan animate)
          return cloneElement(child, {
            ...child.props,
            'data-sequence-index': index,
          });
        })}
      </MotionComponent>
    );
  }
);

AnimationSequence.displayName = 'AnimationSequence';
