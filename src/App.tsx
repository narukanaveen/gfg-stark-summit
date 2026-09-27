import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Embers from '@/components/Embers';
import Hero from '@/components/Hero';
import MissionLog from '@/components/MissionLog';
import TheRoster from '@/components/TheRoster';
import Registration from '@/components/Registration';

/* =========================================================================
   CINEMATIC BOOT SEQUENCE COMPONENT
   ========================================================================= */
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Rapid Terminal Progress Counter
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 5;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
      }
      setProgress(count);
    }, 60);

    // 2. Sequence Timers
    const t1 = setTimeout(() => setPhase(1), 1800); // 1.8s: Clear terminal, show dark helmet
    const t2 = setTimeout(() => setPhase(2), 2400); // 2.4s: System Ignite (Brighten + Cyan Glow)
    const t3 = setTimeout(() => setPhase(3), 3400); // 3.4s: Rush camera & Flash bang
    const t4 = setTimeout(() => onComplete(), 4200); // 4.2s: Destroy preloader, reveal site

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden font-mono">
      
      {/* PHASE 0: Terminal Boot */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 p-8 text-center"
          >
            <motion.div 
              animate={{ opacity: [1, 0.4, 1, 1, 0.2, 1] }} 
              transition={{ repeat: Infinity, duration: 0.4 }} 
              className="mb-6 text-sm sm:text-base tracking-widest leading-relaxed"
            >
              INITIALIZING STARK PROTOCOL...<br />
              BYPASSING MAINFRAME SECURITY...
            </motion.div>
            <div className="text-3xl sm:text-5xl font-bold tracking-widest text-emerald-300 text-glow-emerald">
              [ {progress}% ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 1-3: The Helmet Ignition & Rush */}
      {phase > 0 && (
        <motion.div
          initial={{ 
            scale: 0.8, 
            filter: 'brightness(0.05) drop-shadow(0px 0px 0px rgba(0,255,255,0))' 
          }}
          animate={
            phase === 1 
              ? { scale: 0.9, filter: 'brightness(0.05) drop-shadow(0px 0px 0px rgba(0,255,255,0))' } // Dark silhouette
              : phase === 2 
              ? { scale: 1.05, filter: 'brightness(1.2) drop-shadow(0px 0px 60px rgba(0, 255, 255, 0.7))' } // Ignite!
              : { scale: 35, opacity: 0, filter: 'brightness(3) drop-shadow(0px 0px 100px rgba(255,255,255,1))' } // Camera Rush
          }
          transition={{
            duration: phase === 3 ? 0.7 : 0.6,
            ease: phase === 3 ? [0.64, 0, 0.78, 0] : "easeOut" // Custom acceleration for the rush
          }}
          className="relative w-72 h-72 sm:w-96 sm:h-96"
        >
          <img 
            src="/helmet.png" 
            alt="Stark Helmet Boot" 
            className="w-full h-full object-contain pointer-events-none" 
          />
        </motion.div>
      )}

      {/* PHASE 3: White-Out Flash Bang */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
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

      {/* 2. Main App Content (Hidden until boot sequence clears) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooted ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative min-h-screen bg-[#0a0b0e] text-zinc-200 antialiased overflow-x-hidden"
      >
        {/* Halftone dot pattern — comic book texture */}
        <div 
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.5] halftone-dots" 
          style={{ 
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)', 
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)' 
          }} 
        />

        {/* Film grain texture overlay */}
        <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.035] film-grain mix-blend-overlay" />

        {/* Global ambient glow — Marvel red */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-600/4 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-[150px]" />
        </div>

        {/* Global floating embers — spans entire page behind content */}
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
