import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({ children, delay = 0, className, direction = 'up' }: FadeInProps) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionBadgeProps {
  children: ReactNode;
}

export function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-(--color-main)/30 bg-(--color-main)/10 px-4 py-1.5 text-sm font-medium text-(--color-main)">
      <span className="h-1.5 w-1.5 rounded-full bg-(--color-main)" />
      {children}
    </span>
  );
}
