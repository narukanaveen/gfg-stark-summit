import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Ember {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
}

const EMBER_COLORS = ['#ED1D24', '#FF6B35', '#F8E825', '#FF4438'];

export default function Embers() {
  const embers = useMemo<Ember[]>(() => {
    if (typeof window === 'undefined') return [];
    const vh = window.innerHeight;
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 7,
      duration: Math.random() * 5 + 5,
      drift: (Math.random() - 0.5) * 100,
      color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
      vh,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[0]">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: `${ember.x}%`,
            bottom: '-10px',
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.color}`,
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 50 : 1000)],
            x: [0, ember.drift],
            opacity: [0, 0.85, 0.25, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
