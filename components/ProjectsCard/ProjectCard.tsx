'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number;
  compact?: boolean;
}

export function ProjectCard({ project, index = 0, compact = false }: ProjectCardProps) {
  if (compact) {
    return (
      <div className="grid grid-cols-[74px_1fr] gap-3">
        <div className="relative h-[54px] overflow-hidden rounded-[8px] bg-white/5">
          <Image
            alt={project.title}
            className="object-cover"
            fill
            sizes="74px"
            src={project.image}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold uppercase leading-tight text-white">
            {project.title}
          </p>
          <p className="mt-1 project-line-clamp text-xs leading-snug text-white/50">
            {project.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.a
      aria-label={`Abrir projeto ${project.title} em nova aba`}
      className={cn(
        'group block overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.045] p-2 outline-none backdrop-blur-xl transition-colors duration-300 ease-expo-out',
        'hover:border-white/35 focus-visible:border-white/50',
      )}
      href={project.url}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      rel="noopener noreferrer"
      target="_blank"
      transition={{
        delay: index * 0.05,
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.03 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-[8px] bg-white/5">
        <Image
          alt={project.title}
          className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 82vw, 280px"
          src={project.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/38">
              {project.category}
            </p>
            <h3 className="mt-1 text-base font-semibold leading-tight text-white">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-4 shrink-0 text-white/45 transition-transform duration-300 ease-expo-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>
        <p className="mt-2 project-line-clamp text-sm leading-relaxed text-white/52">
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}
