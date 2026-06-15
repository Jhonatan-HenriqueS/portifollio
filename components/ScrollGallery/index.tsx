'use client';

import { RefObject, useCallback, useEffect, useRef } from 'react';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

import { GalleryItem } from './GalleryItem';

interface ScrollGalleryProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  onColorChange: (color: string) => void;
  onScrollProgress: () => void;
}

const rowLayouts = [
  'justify-start md:pl-[4vw]',
  'justify-end md:pr-[8vw]',
  'justify-center md:translate-x-[12vw]',
  'justify-start md:pl-[16vw]',
  'justify-end md:pr-[3vw]',
];

const galleryItemSize =
  'w-[calc(100vw-2rem)] sm:w-[min(72vw,680px)] lg:w-[min(44vw,720px)] xl:w-[min(40vw,760px)]';

export function ScrollGallery({
  scrollRef,
  onColorChange,
  onScrollProgress,
}: ScrollGalleryProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const loopLockRef = useRef(false);
  const checkFrameRef = useRef<number | null>(null);
  const checkTimeoutRef = useRef<number | null>(null);
  const touchStateRef = useRef({
    active: false,
    startScrollTop: 0,
    startX: 0,
    startY: 0,
  });
  const lenisRef = useSmoothScroll(scrollRef, contentRef);

  const getLastImageResetScrollTop = useCallback(() => {
    const root = scrollRef.current;
    const lastItem = lastItemRef.current;
    const lastImage = lastItem?.querySelector<HTMLElement>('[data-gallery-image]');
    const resetTarget = lastImage ?? lastItem;

    if (!root || !resetTarget) {
      return null;
    }

    return root.scrollTop
      + resetTarget.getBoundingClientRect().top
      - root.getBoundingClientRect().top;
  }, [scrollRef]);

  const resetToDefault = useCallback(() => {
    const root = scrollRef.current;

    if (!root || loopLockRef.current) {
      return;
    }

    loopLockRef.current = true;
    touchStateRef.current.active = false;
    onColorChange('#0a0a0a');

    const unlock = () => {
      onScrollProgress();
      window.setTimeout(() => {
        loopLockRef.current = false;
      }, 120);
    };

    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        lock: true,
        onComplete: unlock,
      });
    } else {
      root.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(unlock, 1500);
    }
  }, [lenisRef, onColorChange, onScrollProgress, scrollRef]);

  const checkLastImagePosition = useCallback(() => {
    const root = scrollRef.current;
    const resetScrollTop = getLastImageResetScrollTop();

    if (!root || resetScrollTop === null || loopLockRef.current) {
      return;
    }

    if (root.scrollTop >= resetScrollTop - 1) {
      resetToDefault();
    }
  }, [getLastImageResetScrollTop, resetToDefault, scrollRef]);

  const scheduleLastImageCheck = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (checkFrameRef.current !== null) {
      window.cancelAnimationFrame(checkFrameRef.current);
    }

    if (checkTimeoutRef.current !== null) {
      window.clearTimeout(checkTimeoutRef.current);
    }

    checkFrameRef.current = window.requestAnimationFrame(() => {
      checkFrameRef.current = null;
      checkLastImagePosition();
    });

    checkTimeoutRef.current = window.setTimeout(() => {
      checkTimeoutRef.current = null;
      checkLastImagePosition();
    }, 220);
  }, [checkLastImagePosition]);

  const handleScroll = useCallback(() => {
    onScrollProgress();
    scheduleLastImageCheck();
  }, [onScrollProgress, scheduleLastImageCheck]);

  useEffect(() => () => {
    if (checkFrameRef.current !== null) {
      window.cancelAnimationFrame(checkFrameRef.current);
    }

    if (checkTimeoutRef.current !== null) {
      window.clearTimeout(checkTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const coarsePointer = window.matchMedia('(pointer: coarse)');

    const shouldUseTouchScroll = () => coarsePointer.matches;

    const handleTouchStart = (event: TouchEvent) => {
      const root = scrollRef.current;
      const touch = event.touches[0];

      if (!root || !touch || event.touches.length !== 1 || !shouldUseTouchScroll()) {
        touchStateRef.current.active = false;
        return;
      }

      touchStateRef.current = {
        active: true,
        startScrollTop: root.scrollTop,
        startX: touch.clientX,
        startY: touch.clientY,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const root = scrollRef.current;
      const state = touchStateRef.current;
      const touch = event.touches[0];

      if (!root || !state.active || !touch || !shouldUseTouchScroll()) {
        return;
      }

      const deltaX = state.startX - touch.clientX;
      const deltaY = state.startY - touch.clientY;

      if (Math.abs(deltaY) < 4 || Math.abs(deltaX) > Math.abs(deltaY)) {
        return;
      }

      const maxScroll = Math.max(root.scrollHeight - root.clientHeight, 0);
      const nextScrollTop = Math.min(
        maxScroll,
        Math.max(0, state.startScrollTop + deltaY),
      );
      const resetScrollTop = getLastImageResetScrollTop();

      if (
        resetScrollTop !== null
        && nextScrollTop >= resetScrollTop - 1
        && root.scrollTop > 0
      ) {
        root.scrollTop = Math.max(0, resetScrollTop);
        onScrollProgress();
        resetToDefault();

        if (event.cancelable) {
          event.preventDefault();
        }

        return;
      }

      if (root.scrollTop !== nextScrollTop) {
        root.scrollTop = nextScrollTop;
        onScrollProgress();
        scheduleLastImageCheck();
      }

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      touchStateRef.current.active = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [
    getLastImageResetScrollTop,
    onScrollProgress,
    resetToDefault,
    scheduleLastImageCheck,
    scrollRef,
  ]);

  return (
    <section
      aria-label="Galeria de projetos"
      className="pointer-events-none fixed inset-0 z-[25] overflow-y-auto overflow-x-hidden portfolio-scrollbar"
      onScroll={handleScroll}
      ref={scrollRef}
    >
      <div
        className="min-h-[420vh] px-4 pb-[70vh] pt-[112vh] md:px-8 md:pb-[82vh] md:pt-[108vh]"
        data-lenis-content
        ref={contentRef}
      >
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-[18vh] md:gap-[26vh]">
          {projects.map((project, index) => {
            const isLast = index === projects.length - 1;

            return (
              <div
                className={cn('flex w-full', rowLayouts[index % rowLayouts.length])}
                key={project.id}
              >
                <GalleryItem
                  className={galleryItemSize}
                  index={index}
                  isLast={isLast}
                  onColorChange={onColorChange}
                  project={project}
                  ref={isLast ? lastItemRef : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
