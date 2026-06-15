'use client';

import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export function ScrollHint() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1 text-white/35 sm:bottom-7">
      <span className="text-[10px] font-medium uppercase tracking-[0.24em]">
        Deslize
      </span>
      <motion.span
        animate={reduceMotion ? { y: 0 } : { y: [0, 7, 0] }}
        aria-hidden="true"
        className="flex size-5 items-center justify-center"
        transition={{
          duration: reduceMotion ? 0 : 1.15,
          ease: [0.16, 1, 0.3, 1],
          repeat: reduceMotion ? 0 : Infinity,
        }}
      >
        <ChevronDown className="size-5 stroke-[1.5]" />
      </motion.span>
    </div>
  );
}
