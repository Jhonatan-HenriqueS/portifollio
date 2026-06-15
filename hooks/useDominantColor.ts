'use client';

import { useCallback } from 'react';

import { darkenHexColor } from '@/lib/utils';

export function useDominantColor() {
  const extractColor = useCallback((imgElement: HTMLImageElement | null, fallback = '#0a0a0a') => {
    if (!imgElement || typeof window === 'undefined') {
      return darkenHexColor(fallback);
    }

    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        return darkenHexColor(fallback);
      }

      const width = 32;
      const height = 32;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(imgElement, 0, 0, width, height);

      const data = context.getImageData(0, 0, width, height).data;
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;

      for (let i = 0; i < data.length; i += 16) {
        const alpha = data[i + 3] ?? 0;

        if (alpha < 180) {
          continue;
        }

        r += data[i] ?? 0;
        g += data[i + 1] ?? 0;
        b += data[i + 2] ?? 0;
        count += 1;
      }

      if (!count) {
        return darkenHexColor(fallback);
      }

      return `rgb(${Math.floor((r / count) * 0.38)}, ${Math.floor((g / count) * 0.38)}, ${Math.floor((b / count) * 0.38)})`;
    } catch {
      return darkenHexColor(fallback);
    }
  }, []);

  return { extractColor };
}
