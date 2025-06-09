import { CSSProperties } from 'react';

/**
 * Buat gaya untuk mode debug
 */
export const getDebugStyles = (
  active: boolean = false,
  name: string = 'component'
): CSSProperties => {
  if (!active) return {};

  return {
    outline: '2px dashed rgba(255, 0, 0, 0.5)',
    position: 'relative',
  };
};

/**
 * Buat atribut data untuk mode debug
 */
export const getDebugAttributes = (
  active: boolean = false,
  name: string = 'component'
): { [key: string]: string } => {
  if (!active) return {};

  return {
    'data-fmus-debug': name,
  };
};

/**
 * Cetak informasi debug ke konsol
 */
export const debugLog = (
  active: boolean = false,
  message: string,
  ...args: any[]
): void => {
  if (!active) return;

  console.log(`[FMUS] ${message}`, ...args);
};
