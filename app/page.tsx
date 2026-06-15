'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { CopyrightMark } from '@/components/CopyrightMark';
import { HeroFixed } from '@/components/HeroFixed';
import { PageNav } from '@/components/PageNav';
import { ProjectsCard } from '@/components/ProjectsCard';
import { ScrollGallery } from '@/components/ScrollGallery';
import { ScrollHint } from '@/components/ScrollHint';
import { SocialDock } from '@/components/SocialDock';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState('#0a0a0a');
  const reduceMotion = useReducedMotion();
  const { scrollY, updateFromElement } = useScrollProgress();

  const handleScrollProgress = useCallback(() => {
    updateFromElement(galleryRef.current);
  }, [updateFromElement]);

  const handleColorChange = useCallback((color: string) => {
    setBackgroundColor(color);
  }, []);

  const handleProjectsClick = useCallback(() => {
    const gallery = galleryRef.current;
    const firstImage = gallery?.querySelector<HTMLElement>('[data-gallery-image]');

    if (!gallery || !firstImage || typeof window === 'undefined') {
      return;
    }

    const topOffset = window.matchMedia('(min-width: 640px)').matches ? 92 : 76;
    const targetScroll = gallery.scrollTop
      + firstImage.getBoundingClientRect().top
      - gallery.getBoundingClientRect().top
      - topOffset;

    gallery.scrollTop = Math.max(0, targetScroll);
    gallery.dispatchEvent(new Event('scroll', { bubbles: true }));
    updateFromElement(gallery);
  }, [updateFromElement]);

  return (
    <main className="relative h-svh min-h-svh overflow-hidden bg-black text-white">
      <motion.div
        aria-hidden="true"
        animate={{ backgroundColor }}
        className="fixed inset-0 z-0"
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: 'easeOut',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.05),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]"
      />

      <ScrollGallery
        onColorChange={handleColorChange}
        onScrollProgress={handleScrollProgress}
        scrollRef={galleryRef}
      />
      <HeroFixed scrollY={scrollY} />
      <PageNav onProjectsClick={handleProjectsClick} />
      <ProjectsCard />
      <CopyrightMark />
      <ScrollHint />
      <SocialDock />
    </main>
  );
}
