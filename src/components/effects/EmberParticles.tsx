import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Ember {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function EmberParticles({ count = 18 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(24 100% 50%)',
      'hsl(354 79% 46%)',
      'hsl(38 100% 55%)',
      'hsl(14 100% 55%)',
    ];
    const h = window.innerHeight;
    setEmbers(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2.5,
        delay: Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        travelY: h * 0.7,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${ember.x}%`,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 2}px ${ember.color}`,
          }}
          animate={{
            y: [0, -400],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 1, 0.8, 0],
            scale: [1, 1.2, 0.4],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
