'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FolderKanban, Plus } from 'lucide-react';

import { projects } from '@/lib/projects';

import { ProjectCard } from './ProjectCard';
import { ProjectsOverlay } from './ProjectsOverlay';

export function ProjectsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const featuredProject = projects[0];

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <motion.button
        aria-expanded={isOpen}
        aria-label="Abrir lista de projetos"
        className="fixed right-4 top-4 z-30 flex size-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.075] text-white shadow-2xl shadow-black/45 outline-none backdrop-blur-[22px] transition-colors duration-300 ease-expo-out hover:border-white/25 focus-visible:border-white/45 sm:hidden"
        onClick={() => setIsOpen(true)}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_45%,transparent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.2),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
        />
        <FolderKanban aria-hidden="true" className="size-4" />
        <Plus aria-hidden="true" className="absolute right-2.5 top-2.5 size-3 text-white/70" />
      </motion.button>

      <motion.button
        aria-expanded={isOpen}
        aria-label="Abrir lista de projetos"
        className="fixed right-3 top-3 z-30 hidden w-[min(340px,calc(100vw-1.5rem))] overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.075] p-3 text-left shadow-2xl shadow-black/45 outline-none backdrop-blur-[22px] transition-colors duration-300 ease-expo-out hover:border-white/25 focus-visible:border-white/45 sm:block md:right-6 md:top-6"
        onClick={() => setIsOpen(true)}
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_45%,transparent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
        />
        <span className="relative mb-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-white/46">
          <span className="inline-flex items-center gap-2">
            <FolderKanban aria-hidden="true" className="size-3.5" />
            +{projects.length} projetos
          </span>
          <span>abrir</span>
        </span>
        <span className="relative block">
          <ProjectCard compact project={featuredProject} />
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen ? <ProjectsOverlay onClose={() => setIsOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
