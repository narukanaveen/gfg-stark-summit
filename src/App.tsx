import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Embers from '@/components/Embers';
import Hero from '@/components/Hero';
import MissionLog from '@/components/MissionLog';
import TheRoster from '@/components/TheRoster';
import Registration from '@/components/Registration';

/* =========================================================================
   AVENGERS LOADING SEQUENCE
   ========================================================================= */
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'flash'

  useEffect(() => {
    // Rapid Progress Counter
    let count = 0;
    const interval = setInterval(() => {
      // Randomize the loading speed for a realistic terminal feel
      count += Math.floor(Math.random() * 12) + 3; 
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        
        // Trigger the flash and transition out when hitting 100%
        setTimeout(() => setPhase('flash'), 400);
        setTimeout(() => onComplete(), 1200);
      }
      setProgress(count);
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden">
      
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-2xl px-6"
          >
            {/* The Logo Reveal */}
            <div className="relative w-full aspect-[16/9] mb-8">
              {/* Dimmed background version (optional, keeps the space reserved) */}
              <img 
                src="/avengers.png" 
                alt="Avengers Logo Outline" 
                className="absolute inset-0 w-full h-full object-contain opacity-10 grayscale"
              />
              
              {/* The bright red reveal version */}
              <img 
                src="/avengers.png" 
                alt="Avengers Logo Reveal" 
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  // Starts at 28% (showing the 'A') and wipes to 100% based on progress
                  clipPath: `polygon(0 0, ${28 + (progress * 0.72)}% 0, ${28 + (progress * 0.72)}% 100%, 0 100%)`,
                  transition: 'clip-path 0.1s linear'
                }}
              />
            </div>

            {/* Initialization Text & Counter */}
            <div className="flex flex-col items-center text-red-500 font-mono tracking-widest text-center">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }} 
                className="text-xs sm:text-sm mb-2"
              >
                INITIALIZING STARK PROTOCOL // ASSEMBLING ASSETS
              </motion.div>
              <div className="text-3xl sm:text-4xl font-bold text-red-500 text-glow-red">
                {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The White-Out Flash Bang Transition */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>

    </div>
  );
}

/* =========================================================================
   MAIN APP WRAPPER
   ========================================================================= */
export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const registrationRef = useRef<HTMLDivElement>(null);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Render the cinematic pre-loader until finished */}
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}

      {/* 2. Main App Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isBooted ? 1 : 0, scale: isBooted ? 1 : 1.05 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen bg-[#0a0b0e] text-zinc-200 antialiased overflow-x-hidden"
      >
        <div 
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.5] halftone-dots" 
          style={{ 
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)', 
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)' 
          }} 
        />
        <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.035] film-grain mix-blend-overlay" />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/4 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-[150px]" />
        </div>
        <Embers />

        <div className="relative z-10">
          <Hero onAssemble={scrollToRegistration} />
          <MissionLog onAssemble={scrollToRegistration} />
          <TheRoster />
          <div ref={registrationRef}>
            <Registration />
          </div>
        </div>
      </motion.div>
    </>
  );
}