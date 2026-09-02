"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
};

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 24 },
  left: { x: -24 },
  right: { x: 24 },
};

// children aldığı için içine konan Server Component'ler sunucuda kalır.
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-animated
        className={className}
        initial={{ opacity: 0, ...offsets[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
