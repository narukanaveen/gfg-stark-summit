import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Plus, Volume2 } from 'lucide-react';
import { soundFx } from '../audio';

interface HeroProps {
  onAssemble: () => void;
}

export default function Hero({ onAssemble }: HeroProps) {
  // 3D Parallax Tracking Setup
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const mouseX = useMotionValue(windowSize.width / 2);
  const mouseY = useMotionValue(windowSize.height / 2);

  // Map mouse position to 3D rotation (-20 to 20 degrees) with mechanical spring physics
  const rotateX = useSpring(useTransform(mouseY, [0, windowSize.height], [20, -20]), { damping: 40, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [0, windowSize.width], [-20, 20]), { damping: 40, stiffness: 150 });

  useEffect(() => {
    // Set exact window size on mount
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    // Audio Init Loop
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
      window.removeEventListener('resize', handleResize);
      soundFx.stopHeartbeatLoop();
      soundFx.stopAmbientTheme();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center"
      style={{ perspective: '1200px' }} // Gives 3D depth to the section
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern radial-fade z-0" />

      {/* Radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/8 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none z-0" />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent scan-line" />
      </div>

      {/* Corner HUD brackets */}
      <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-red-500/25 z-10" />
      <Plus className="absolute top-4 left-4 w-3 h-3 text-red-500/40 z-10" />
      <div className="absolute top-5 right-5 w-14 h-14 border-r border-t border-red-500/25 z-10" />
      <Plus className="absolute top-4 right-4 w-3 h-3 text-red-500/40 z-10" />

      {/* Top status bar */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center gap-3 tactical-xs text-red-400/70 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 arc-pulse" />
        [ SYS: STARK-IND-AUDIO LINK // ACTIVE ] <Volume2 className="w-3 h-3 text-red-400 animate-pulse" />
      </div>

      {/* ==============================================================
          3D INTERACTIVE ARC REACTOR CORE (Layered behind text)
          ============================================================== */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center opacity-70"
        style={{ rotateX, rotateY }}
      >
        {/* Outer ambient reactor glow */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-cyan-500/20 blur-[50px]"
        />

        {/* Outer Structural Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)_inset]" />

        {/* Medium Dashed Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-6 rounded-full border-[4px] border-cyan-400/30 border-dashed"
        />

        {/* Inner Mechanical Ring (Spins counter-clockwise) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-12 rounded-full border-[8px] border-t-cyan-300/60 border-r-cyan-400/20 border-b-cyan-500/10 border-l-cyan-400/20"
        />

        {/* THE CORE: Synchronized to the 3.5s sub-bass heartbeat */}
        <motion.div
          animate={{
            scale: [1, 1, 1.05, 1, 0.95, 1, 1, 1],
            opacity: [0.6, 0.6, 1, 0.6, 0.5, 0.8, 0.6, 0.6],
            boxShadow: [
              "0 0 40px 10px rgba(6,182,212,0.3)",
              "0 0 40px 10px rgba(6,182,212,0.3)",
              "0 0 80px 20px rgba(6,182,212,0.8)",
              "0 0 30px 5px rgba(6,182,212,0.3)",
              "0 0 20px 5px rgba(6,182,212,0.2)",
              "0 0 50px 15px rgba(6,182,212,0.5)",
              "0 0 40px 10px rgba(6,182,212,0.3)",
              "0 0 40px 10px rgba(6,182,212,0.3)"
            ]
          }}
          transition={{
            duration: 3.5, // Perfect sync with audio heartbeat
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-white shadow-[0_0_50px_rgba(255,255,255,0.8)] flex items-center justify-center"
        >
          {/* Intense center hot-spot */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white blur-[4px]" />
        </motion.div>
      </motion.div>
      {/* ============================================================== */}


      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-12 sm:mt-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          {/* Badge */}
          <div className="bg-[#ED1D24] px-5 py-1.5 shadow-[0_0_25px_rgba(237,29,36,0.4)] relative mb-1 pointer-events-auto">
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
                "drop-shadow(0 0 15px rgba(237,29,36,0.6))",
                "drop-shadow(0 0 30px rgba(237,29,36,0.9))",
                "drop-shadow(0 0 5px rgba(237,29,36,0.3))",
                "drop-shadow(0 0 0px rgba(237,29,36,0.1))",
                "drop-shadow(0 0 20px rgba(237,29,36,0.7))",
                "drop-shadow(0 0 15px rgba(237,29,36,0.6))",
                "drop-shadow(0 0 15px rgba(237,29,36,0.6))"
              ]
            }}
            transition={{
              duration: 3.5, // Perfect sync with audio heartbeat
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
            className="font-cond font-light text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed drop-shadow-md bg-black/20 rounded-lg p-2 backdrop-blur-[2px]"
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
              shadow-[0_0_30px_rgba(16,185,129,0.4)] pointer-events-auto
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="tactical-xs text-zinc-500 font-semibold bg-black/40 px-2 py-1 rounded">SCROLL TO ENGAGE</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-red-400/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}