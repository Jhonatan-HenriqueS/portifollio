'use client';

import { RefObject, useEffect, useRef } from 'react';
import Lenis from 'lenis';

type ScrollElementRef = RefObject<HTMLElement | null>;

export function useSmoothScroll(
  wrapperRef?: ScrollElementRef,
  contentRef?: ScrollElementRef,
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const wrapper = wrapperRef?.current ?? window;
    const content = contentRef?.current ?? document.documentElement;

    const lenis = new Lenis({
      wrapper,
      content,
      eventsTarget: window,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [contentRef, wrapperRef]);

  return lenisRef;
}
