'use client';

import { MotionValue } from 'framer-motion';

import { HeroText } from './HeroText';

interface HeroFixedProps {
  scrollY: MotionValue<number>;
}

export function HeroFixed({ scrollY }: HeroFixedProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-5 py-24 md:px-10">
      <HeroText scrollY={scrollY} />
    </div>
  );
}
