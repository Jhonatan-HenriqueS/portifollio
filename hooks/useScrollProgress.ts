'use client';

import { useCallback } from 'react';
import { useMotionValue } from 'framer-motion';

export function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const progress = useMotionValue(0);

  const updateFromElement = useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const maxScroll = Math.max(element.scrollHeight - element.clientHeight, 1);
    const nextScrollY = element.scrollTop;

    scrollY.set(nextScrollY);
    progress.set(nextScrollY / maxScroll);
  }, [progress, scrollY]);

  return {
    progress,
    scrollY,
    updateFromElement,
  };
}
