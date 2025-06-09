import { CSSProperties } from 'react';
/**
 * Buat gaya untuk mode debug
 */
export declare const getDebugStyles: (active?: boolean, name?: string) => CSSProperties;
/**
 * Buat atribut data untuk mode debug
 */
export declare const getDebugAttributes: (active?: boolean, name?: string) => {
    [key: string]: string;
};
/**
 * Cetak informasi debug ke konsol
 */
export declare const debugLog: (active: boolean, message: string, ...args: any[]) => void;
