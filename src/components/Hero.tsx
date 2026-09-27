import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';

interface HeroProps {
  onAssemble: () => void;
}

export default function Hero({ onAssemble }: HeroProps) {
  const [phase, setPhase] = useState<'boot' | 'reveal'>('boot');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 2800);
    return () => clearTimeout(timer);
  }, []);

  const bootLines = [
    '> ESTABLISHING SECURE CONNECTION...',
    '> ARC REACTOR CORE... ONLINE',
    '> JARVIS INTERFACE INITIALIZED',
    '> LOADING SUMMIT PROTOCOLS...',
  ];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Grid background — faint red */}
      <div className="absolute inset-0 grid-pattern radial-fade" />

      {/* Radial glows — red and gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/8 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px]" />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent scan-line" />
      </div>

      {/* Corner HUD brackets with + markers */}
      <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-red-500/25" />
      <Plus className="absolute top-4 left-4 w-3 h-3 text-red-500/40" />
      <div className="absolute top-5 right-5 w-14 h-14 border-r border-t border-red-500/25" />
      <Plus className="absolute top-4 right-4 w-3 h-3 text-red-500/40" />
      <div className="absolute bottom-5 left-5 w-14 h-14 border-l border-b border-amber-500/25" />
      <Plus className="absolute bottom-4 left-4 w-3 h-3 text-amber-500/40" />
      <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-amber-500/25" />
      <Plus className="absolute bottom-4 right-4 w-3 h-3 text-amber-500/40" />

      {/* Top status bar */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center gap-3 tactical-xs text-red-400/70">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 arc-pulse" />
        [ SYS: STARK-IND-LINK // SECURE ]
      </div>

      {/* Side coordinate labels */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 -rotate-90 tactical-xs text-zinc-600 hidden sm:block">
        28.4744° N / 77.4834° E
      </div>
      <div className="absolute top-1/2 right-5 -translate-y-1/2 rotate-90 tactical-xs text-zinc-600 hidden sm:block">
        SECTOR 7G // OP: SUMMIT
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {phase === 'boot' ? (
            <motion.div
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/20" />
                <div className="absolute inset-2 rounded-full border border-red-500/40 arc-pulse" />
                <div className="absolute inset-6 rounded-full border-2 border-amber-400/60 arc-pulse" />
                <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_30px_rgba(237,29,36,0.8)] arc-pulse" />
              </div>
              <motion.p
                className="font-mono text-red-300 text-base sm:text-lg tracking-[0.3em] uppercase text-glow-red"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                INITIALIZING PROTOCOL...
              </motion.p>
              <div className="flex flex-col items-start gap-1 font-mono text-[11px] text-red-400/50 min-h-[80px]">
                {bootLines.map((line, i) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5, duration: 0.3 }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5"
            >
              {/* Marvel-style red rectangular badge */}
              <motion.div
                initial={{ opacity: 0, y: 10, scaleX: 0.8 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-1"
              >
                <div className="bg-[#ED1D24] px-5 py-1.5 shadow-[0_0_25px_rgba(237,29,36,0.4)] relative">
                  <span className="font-display text-base sm:text-lg tracking-[0.15em] text-white leading-none">
                    MARVEL <span className="text-zinc-300 font-cond text-sm">×</span> GFG
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="font-display text-6xl sm:text-8xl md:text-9xl tracking-wide leading-[0.85] text-glow-red flicker"
              >
                STARK DEVELOPER
                <br />
                <span className="gradient-text-marvel">SUMMIT</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="font-cond font-light text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
              >
                A 24-hour hackathon where developers assemble to build the future.
                Web3, AI, and App Dev — choose your directive.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                onClick={onAssemble}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative mt-2 px-8 py-3.5 font-cond font-semibold text-sm uppercase tracking-widest text-white
                  bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-sm
                  shadow-[0_0_30px_rgba(16,185,129,0.4)]
                  hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transition-all duration-150 ease-out"
              >
                Assemble Your Team
                <span className="absolute inset-0 rounded-sm bg-emerald-400 opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-150 ease-out" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'reveal' ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="tactical-xs text-zinc-600">SCROLL TO ENGAGE</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-red-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
