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
  const lenisRef = useSmoothScroll(scrollRef, contentRef);

  const resetToDefault = useCallback(() => {
    const root = scrollRef.current;

    if (!root || loopLockRef.current) {
      return;
    }

    loopLockRef.current = true;
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
    const lastItem = lastItemRef.current;
    const lastImage = lastItem?.querySelector<HTMLElement>('[data-gallery-image]');
    const resetTarget = lastImage ?? lastItem;

    if (!root || !resetTarget || loopLockRef.current) {
      return;
    }

    const rootTop = root.getBoundingClientRect().top;
    const lastItemTop = resetTarget.getBoundingClientRect().top;

    if (lastItemTop <= rootTop + 1) {
      resetToDefault();
    }
  }, [resetToDefault, scrollRef]);

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
