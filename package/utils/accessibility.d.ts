/**
 * Periksa apakah pengguna memilih preferensi reduced motion di sistem operasi mereka
 */
export declare const usePrefersReducedMotion: () => boolean;
/**
 * Ambil nilai durasi animasi yang sesuai berdasarkan preferensi reduced motion
 */
export declare const getAccessibleDuration: (duration?: number, reducedMotion?: "user-preference" | "always" | "never", prefersReducedMotion?: boolean) => number;
/**
 * Tentukan apakah animasi harus dinonaktifkan berdasarkan preferensi reduced motion
 */
export declare const shouldDisableAnimation: (reducedMotion?: "user-preference" | "always" | "never", prefersReducedMotion?: boolean) => boolean;
