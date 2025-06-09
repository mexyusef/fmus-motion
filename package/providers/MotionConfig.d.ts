import React from 'react';
import { MotionConfigProps } from '../types';
export declare const useFMUSMotion: () => {
    debug: boolean;
    reducedMotion: "user-preference" | "always" | "never";
};
/**
 * Komponen untuk mengonfigurasi animasi secara global
 */
export declare const MotionConfig: React.FC<MotionConfigProps>;
