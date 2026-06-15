'use client';

import { useMemo, useRef } from 'react';
import gsap from 'gsap';

import { cn } from '@/lib/utils';

interface ContactItemProps {
  label: string;
  href: string;
  displayText?: string;
  ariaLabel: string;
  className?: string;
  isActive?: boolean;
  isDimmed?: boolean;
  onFocusChange?: (active: boolean) => void;
}

export function ContactItem({
  label,
  href,
  displayText,
  ariaLabel,
  className,
  isActive = false,
  isDimmed = false,
  onFocusChange,
}: ContactItemProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const text = displayText || label;
  const color = isDimmed && !isActive ? 'rgba(255, 255, 255, 0.12)' : '#ffffff';

  const chars = useMemo(() => text.split('').map((char, index) => (
    <span
      aria-hidden="true"
      className="char inline-block will-change-transform"
      key={`${char}-${index}`}
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  )), [text]);

  const getChars = () => containerRef.current?.querySelectorAll('.char');

  const handleMouseEnter = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splitChars = getChars();

    onFocusChange?.(true);

    if (!splitChars || reducedMotion) {
      return;
    }

    gsap.killTweensOf(splitChars);
    gsap.to(splitChars, {
      x: () => gsap.utils.random(-12, 12),
      y: () => gsap.utils.random(-8, 8),
      rotate: () => gsap.utils.random(-15, 15),
      opacity: () => gsap.utils.random(0.78, 1),
      duration: 0.4,
      ease: 'power2.out',
      stagger: {
        each: 0.02,
        from: 'random',
      },
    });
  };

  const handleMouseLeave = () => {
    const splitChars = getChars();

    onFocusChange?.(false);

    if (!splitChars) {
      return;
    }

    gsap.to(splitChars, {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      stagger: {
        each: 0.015,
        from: 'start',
      },
    });
  };

  return (
    <a
      aria-label={ariaLabel}
      className={cn(
        'pointer-events-auto block w-fit cursor-pointer select-none overflow-visible whitespace-nowrap text-[clamp(1.25rem,3.1vw,3.55rem)] font-display uppercase leading-[0.92] tracking-normal outline-none transition-colors duration-300 ease-expo-out hover:text-white focus-visible:text-white',
        isActive && 'text-white',
        isDimmed && !isActive && 'text-white/12',
        !isActive && !isDimmed && 'text-white',
        className,
      )}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{ color }}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      <span className="sr-only">{ariaLabel}</span>
      <span ref={containerRef}>{chars}</span>
    </a>
  );
}
