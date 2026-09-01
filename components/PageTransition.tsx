"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

// Door FadeIn-Up&Down: navbar'dan sayfa değişince içerik dikey eksende girer.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-animated
        className="flex flex-1 flex-col"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
