'use client';

import { useState } from 'react';
import { MotionValue, motion, useReducedMotion, useTransform } from 'framer-motion';

import { ContactItem } from './ContactItem';

interface HeroTextProps {
  scrollY: MotionValue<number>;
}

type FocusedItem = 'phone' | 'email' | 'insta' | null;

export function HeroText({ scrollY }: HeroTextProps) {
  const reduceMotion = useReducedMotion();
  const [focusedItem, setFocusedItem] = useState<FocusedItem>(null);
  const scale = useTransform(scrollY, [0, 300], [1, reduceMotion ? 1 : 0.85]);
  const y = useTransform(scrollY, [0, 300], [0, reduceMotion ? 0 : -16]);
  const hasFocus = focusedItem !== null;
  const staticTextColor = hasFocus ? 'text-white/12' : 'text-white';

  return (
    <motion.section
      aria-label="Contato principal de Jhonatan Henrique"
      className="pointer-events-none w-[min(88vw,1120px)] text-white"
      style={{ scale, y, transformOrigin: 'center' }}
    >
      <div className="font-display uppercase leading-[0.92] text-white">
        <p className={`whitespace-nowrap text-[clamp(2.72rem,6.7vw,6.65rem)] tracking-[0.11em] transition-colors duration-300 ease-expo-out md:tracking-[0.18em] ${staticTextColor}`}>
          Jhonatan
        </p>

        <p className={`mt-1 whitespace-nowrap text-[clamp(2.28rem,6.25vw,6.2rem)] tracking-[0.075em] transition-colors duration-300 ease-expo-out md:tracking-[0.155em] ${staticTextColor}`}>
          Full-Stack
        </p>

        <ContactItem
          ariaLabel="Conversar com Jhonatan Henrique pelo WhatsApp"
          className="mt-1 text-[clamp(1.18rem,4.9vw,4.72rem)] tracking-[0.045em] md:tracking-[0.12em]"
          displayText="+55 69 99389 7171"
          href="https://wa.me/5569993897171?text=Gostaria%20de%20me%20informar%20sobre%20seu%20trabalho"
          isActive={focusedItem === 'phone'}
          isDimmed={hasFocus}
          label="(69) 99389-7171"
          onFocusChange={(active) => setFocusedItem(active ? 'phone' : null)}
        />

        <nav
          aria-label="Links de contato"
          className="mt-2 flex flex-col gap-y-0 text-white md:flex-row md:items-baseline md:gap-x-16"
        >
          <ContactItem
            ariaLabel="Enviar email para Jhonatan Henrique"
            className="text-[clamp(2.02rem,5.9vw,5.95rem)] tracking-[0.075em] md:tracking-[0.145em]"
            displayText="→EMAIL"
            href="mailto:jhonatanhrcomercial@gmail.com"
            isActive={focusedItem === 'email'}
            isDimmed={hasFocus}
            label="jhonatanhrcomercial@gmail.com"
            onFocusChange={(active) => setFocusedItem(active ? 'email' : null)}
          />
          <ContactItem
            ariaLabel="Abrir Instagram de Jhonatan Henrique"
            className="text-[clamp(2.02rem,5.9vw,5.95rem)] tracking-[0.075em] md:tracking-[0.145em]"
            displayText="→INSTA"
            href="https://www.instagram.com/jh.rique/"
            isActive={focusedItem === 'insta'}
            isDimmed={hasFocus}
            label="Instagram"
            onFocusChange={(active) => setFocusedItem(active ? 'insta' : null)}
          />
        </nav>
      </div>
    </motion.section>
  );
}
