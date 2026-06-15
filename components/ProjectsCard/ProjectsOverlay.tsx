'use client';

import { X } from 'lucide-react';
import { motion } from 'framer-motion';

import { projects } from '@/lib/projects';

import { ProjectCard } from './ProjectCard';

interface ProjectsOverlayProps {
  onClose: () => void;
}

export function ProjectsOverlay({ onClose }: ProjectsOverlayProps) {
  return (
    <motion.div
      aria-label="Projetos de Jhonatan Henrique"
      aria-modal="true"
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-7 backdrop-blur-[12px]"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative w-full max-w-[900px]"
        exit={{ opacity: 0, scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          aria-label="Fechar projetos"
          className="mb-4 ml-auto flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white outline-none backdrop-blur-xl transition-colors duration-300 ease-expo-out hover:bg-white/12 focus-visible:border-white/50"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div className="grid max-h-[78vh] grid-cols-1 gap-4 overflow-y-auto pr-1 portfolio-scrollbar sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
