import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Volume2 } from 'lucide-react';
import { soundFx } from '../audio';

interface HeroProps {
  onAssemble: () => void;
}

export default function Hero({ onAssemble }: HeroProps) {
  useEffect(() => {
    // Start continuous loop immediately
    soundFx.startHeartbeatLoop(3500); 
    soundFx.startAmbientTheme();

    const handleFirstInteraction = () => {
      soundFx.startHeartbeatLoop(3500);
      soundFx.startAmbientTheme();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      soundFx.stopHeartbeatLoop();
      soundFx.stopAmbientTheme();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern radial-fade" />

      {/* Radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/8 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px]" />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent scan-line" />
      </div>

      {/* Corner HUD brackets */}
      <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-red-500/25" />
      <Plus className="absolute top-4 left-4 w-3 h-3 text-red-500/40" />
      <div className="absolute top-5 right-5 w-14 h-14 border-r border-t border-red-500/25" />
      <Plus className="absolute top-4 right-4 w-3 h-3 text-red-500/40" />

      {/* Top status bar */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center gap-3 tactical-xs text-red-400/70">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 arc-pulse" />
        [ SYS: STARK-IND-AUDIO LINK // ACTIVE ] <Volume2 className="w-3 h-3 text-red-400 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          {/* Badge */}
          <div className="bg-[#ED1D24] px-5 py-1.5 shadow-[0_0_25px_rgba(237,29,36,0.4)] relative mb-1">
            <span className="font-display text-base sm:text-lg tracking-[0.15em] text-white leading-none">
              MARVEL <span className="text-zinc-300 font-cond text-sm">×</span> GFG
            </span>
          </div>

          {/* Title with exact 3.5s synchronized pulse */}
          <motion.h1
            className="font-display text-6xl sm:text-8xl md:text-9xl tracking-wide leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#ED1D24] to-[#F8E825]"
            animate={{
              opacity: [1, 1, 0.4, 1, 0.2, 1, 1, 1],
              scale: [1, 1, 1.01, 1, 0.99, 1, 1, 1],
              filter: [
                "drop-shadow(0 0 15px rgba(237,29,36,0.6))",
                "drop-shadow(0 0 30px rgba(237,29,36,0.9))",
                "drop-shadow(0 0 5px rgba(237,29,36,0.3))",
                "drop-shadow(0 0 15px rgba(237,29,36,0.6))"
              ]
            }}
            transition={{
              duration: 3.5,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            STARK DEVELOPER
            <br />
            SUMMIT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-cond font-light text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            A 24-hour hackathon where developers assemble to build the future.
            Web3, AI, and App Dev — choose your directive.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={() => {
              soundFx.playActivate();
              onAssemble();
            }}
            onMouseEnter={() => soundFx.playHover()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative mt-2 px-8 py-3.5 font-cond font-semibold text-sm uppercase tracking-widest text-white
              bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-sm
              shadow-[0_0_30px_rgba(16,185,129,0.4)]
              hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transition-all duration-150 ease-out cursor-pointer"
          >
            Assemble Your Team
            <span className="absolute inset-0 rounded-sm bg-emerald-400 opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-150 ease-out" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
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