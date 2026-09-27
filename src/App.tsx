import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Embers from '@/components/Embers';
import Hero from '@/components/Hero';
import MissionLog from '@/components/MissionLog';
import TheRoster from '@/components/TheRoster';
import Registration from '@/components/Registration';
import CustomCursor from '@/components/CustomCursor';
import { soundFx } from '@/audio';

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('flash'), 400);
        setTimeout(() => onComplete(), 1200);
      }
      setProgress(count);
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none">
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center w-full max-w-2xl px-6"
          >
            <div className="relative w-full aspect-[16/9] mb-8">
              <img
                src="/avengers.png"
                alt="Avengers Logo Outline"
                className="absolute inset-0 w-full h-full object-contain opacity-10 grayscale"
              />
              <img
                src="/avengers.png"
                alt="Avengers Logo Reveal"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  clipPath: `polygon(0 0, ${28 + progress * 0.72}% 0, ${28 + progress * 0.72}% 100%, 0 100%)`,
                  transition: 'clip-path 0.1s linear',
                }}
              />
            </div>
            <div className="flex flex-col items-center text-red-500 font-mono tracking-widest text-center">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-xs sm:text-sm mb-2"
              >
                INITIALIZING STARK PROTOCOL // ASSEMBLING ASSETS
              </motion.div>
              <div className="text-3xl sm:text-4xl font-bold text-red-500 text-glow-red tracking-tight">
                {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white z-50 mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const registrationRef = useRef<HTMLDivElement>(null);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAudioToggle = () => {
    const mutedState = soundFx.toggleMute();
    setIsMuted(mutedState);
  };

  return (
    <>
      <CustomCursor />

      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooted ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="relative min-h-screen bg-[#0a0b0e] text-zinc-200 antialiased overflow-x-hidden selection:bg-red-500/30"
      >
        {/* HARDWARE ACCELERATED STATIC BACKGROUNDS (ZERO JS PARALLAX LAG) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          
          {/* Base Halftone Pattern - Removed heavy SVG mask */}
          <div className="absolute inset-0 opacity-[0.25] halftone-dots" />
          
          {/* Radial overlay to fake the mask (Costs 0 CPU) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-[#0a0b0e]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0e] via-transparent to-[#0a0b0e]" />
          
          {/* Film grain */}
          <div className="absolute inset-0 opacity-[0.04] film-grain" />

          {/* Static Background Glows - Using Pure CSS Gradients instead of heavy blurs */}
          <div 
            className="absolute top-0 left-1/4 w-[800px] h-[800px] -translate-y-1/3"
            style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 60%)' }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[800px] h-[800px] translate-y-1/3"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)' }}
          />
        </div>

        {/* Embers locked to fixed position */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Embers />
        </div>

        {/* Floating Master Audio HUD Toggle */}
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => soundFx.playHover()}
            aria-label="Toggle Audio Engine"
            className="flex items-center gap-2 px-3 py-2 rounded-sm bg-black/80 border border-white/10 hover:border-red-500/50 backdrop-blur-md text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-zinc-500">[ AUDIO // MUTED ]</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 arc-pulse" />
                <span className="text-emerald-400">[ AUDIO // ACTIVE ]</span>
              </>
            )}
          </button>
        </div>

        {/* Main Content Payload */}
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