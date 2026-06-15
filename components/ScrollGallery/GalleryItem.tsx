'use client';

import { forwardRef, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { motion, useReducedMotion } from 'framer-motion';

import { useDominantColor } from '@/hooks/useDominantColor';
import { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface GalleryItemProps {
  project: Project;
  className?: string;
  index: number;
  isLast?: boolean;
  onColorChange: (color: string) => void;
}

export const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  function GalleryItem({ project, className, index, isLast = false, onColorChange }, ref) {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const { extractColor } = useDominantColor();

    const handleMouseEnter = () => {
      onColorChange(project.hoverColor ?? extractColor(imageRef.current, project.color));
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduceMotion || !imageWrapRef.current) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(imageWrapRef.current, {
        rotateX: -y * 15,
        rotateY: x * 15,
        scale: 0.96,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      onColorChange('#0a0a0a');

      if (!imageWrapRef.current) {
        return;
      }

      gsap.to(imageWrapRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: reduceMotion ? 0 : 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    return (
      <motion.div
        className={cn('pointer-events-auto', className)}
        initial={{ opacity: 0, y: isLast ? 0 : 80 }}
        ref={ref}
        transition={{
          delay: index * 0.03,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: false, margin: '-10%' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <a
          aria-label={`Abrir projeto ${project.title} em nova aba`}
          className="group block outline-none [perspective:1200px]"
          href={project.url}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="relative overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/35 will-change-transform [transform-style:preserve-3d]"
            data-gallery-image
            ref={imageWrapRef}
          >
            <div className="relative aspect-[1512/786] w-full">
              <Image
                alt={project.title}
                className="object-cover"
                fill
                priority={index < 2}
                ref={imageRef}
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 72vw, (max-width: 1280px) 44vw, 760px"
                src={project.image}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 ease-expo-out group-hover:text-white/70">
            <span>{project.title}</span>
            <span>{project.category}</span>
          </div>
        </a>
      </motion.div>
    );
  },
);
