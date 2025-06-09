import { useEffect, useState } from 'react';

/**
 * Periksa apakah pengguna memilih preferensi reduced motion di sistem operasi mereka
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Cek apakah browser mendukung query media ini
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set nilai awal berdasarkan preferensi pengguna
    setPrefersReducedMotion(mediaQuery.matches);

    // Buat fungsi handler untuk perubahan preferensi
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Daftarkan listener untuk perubahan preferensi
    mediaQuery.addEventListener('change', handleChange);

    // Bersihkan listener saat komponen unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Ambil nilai durasi animasi yang sesuai berdasarkan preferensi reduced motion
 */
export const getAccessibleDuration = (
  duration: number = 0.3,
  reducedMotion: 'user-preference' | 'always' | 'never' = 'user-preference',
  prefersReducedMotion: boolean = false
): number => {
  // Jika reduced motion selalu dinyalakan, kembali 0
  if (reducedMotion === 'always') {
    return 0;
  }

  // Jika reduced motion tidak pernah dinyalakan, kembali durasi asli
  if (reducedMotion === 'never') {
    return duration;
  }

  // Jika menggunakan preferensi pengguna, cek nilai preferensi
  return prefersReducedMotion ? 0 : duration;
};

/**
 * Tentukan apakah animasi harus dinonaktifkan berdasarkan preferensi reduced motion
 */
export const shouldDisableAnimation = (
  reducedMotion: 'user-preference' | 'always' | 'never' = 'user-preference',
  prefersReducedMotion: boolean = false
): boolean => {
  // Jika reduced motion selalu dinyalakan, nonaktifkan animasi
  if (reducedMotion === 'always') {
    return true;
  }

  // Jika reduced motion tidak pernah dinyalakan, aktifkan animasi
  if (reducedMotion === 'never') {
    return false;
  }

  // Jika menggunakan preferensi pengguna, tergantung pada preferensi
  return prefersReducedMotion;
};
