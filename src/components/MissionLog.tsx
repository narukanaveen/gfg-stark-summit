import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, MapPin, Clock, Trophy, Cpu, Plus } from 'lucide-react';
import { soundFx } from '../audio';

interface MissionLogProps {
  onAssemble: () => void;
}

const TARGET_DATE = new Date('2026-10-15T09:00:00').getTime();

// Isolated Countdown Component with ultra-fast recurring glitch effect
function CountdownCard() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Audio will ONLY play when this card is in the viewport
  const isInView = useInView(cardRef, { margin: '-50px' });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });

      // Sound triggers only if the user is looking at the countdown
      if (isInView) {
        soundFx.playTick();
      }
    };
    
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={cardRef} className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2.5 relative">
        <Clock className="w-4 h-4 text-emerald-400 group-hover:-rotate-12 transition-transform" />
        <span className="tactical-xs text-emerald-400/80 tracking-widest">T-MINUS</span>
      </div>

      <div className="relative mt-4 flex-1 flex flex-col justify-center">
        <p className="tactical-xs text-zinc-400 mb-4 tracking-widest">COUNTDOWN TO LAUNCH</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'DAYS', value: time.days },
            { label: 'HRS', value: time.hours },
            { label: 'MIN', value: time.minutes },
            { label: 'SEC', value: time.seconds },
          ].map((unit, i) => (
            <div key={unit.label} className="rounded-md bg-black/60 border border-emerald-500/20 p-4 text-center group-hover:border-emerald-500/40 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]">
              {/* Restored: Ultra-fast recurring glitch effect */}
              <motion.div 
                animate={{ 
                  opacity: [1, 0.2, 1, 0.5, 1, 0.3, 1],
                  x: [0, -3, 3, -2, 2, 0, 0],
                  filter: [
                    "drop-shadow(0 0 0px rgba(16,185,129,0))",
                    "drop-shadow(2px 0 8px rgba(16,185,129,0.8))",
                    "drop-shadow(-2px 0 8px rgba(237,29,36,0.8))",
                    "drop-shadow(0 0 0px rgba(16,185,129,0))"
                  ]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  repeatDelay: 0.5,
                  delay: i * 0.15 
                }}
                className="text-4xl font-mono font-bold text-emerald-400 text-glow-emerald tabular-nums tracking-tight"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
              <div className="tactical-xs text-zinc-500 mt-2 tracking-widest">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2 tactical-xs text-emerald-400/80 tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 arc-pulse" />
        [ STATUS: ARMED ]
      </div>
    </div>
  );
}

const bootUp3D = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      delay: i * 0.08, 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1]
    },
  }),
};

function CornerMarks() {
  return (
    <>
      <Plus className="absolute top-2 left-2 w-3 h-3 text-white/20 z-20" />
      <Plus className="absolute top-2 right-2 w-3 h-3 text-white/20 z-20" />
      <Plus className="absolute bottom-2 left-2 w-3 h-3 text-white/20 z-20" />
      <Plus className="absolute bottom-2 right-2 w-3 h-3 text-white/20 z-20" />
    </>
  );
}

function BentoCard({ children, className, glowColor, custom }: { children: React.ReactNode, className: string, glowColor: string, custom: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={bootUp3D}
      custom={custom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden bg-[#07080a] border border-white/[0.08] rounded-md transition-all duration-300 ease-out cursor-pointer ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

export default function MissionLog({ onAssemble }: MissionLogProps) {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-red-500 to-transparent" />
          <span className="tactical-sm text-red-400 tracking-widest">02 — MISSION LOG</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl tracking-wide leading-none text-white"
        >
          THE DIRECTIVE
        </motion.h2>
      </div>

      {/* Bento grid */}
      <div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]"
        style={{ perspective: '1200px' }}
      >
        
        {/* CARD 1: PRIMARY DIRECTIVE */}
        <BentoCard 
          custom={0} 
          glowColor="rgba(237, 29, 36, 0.05)"
          className="md:col-span-2 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(237,29,36,0.1)] p-8 justify-end"
        >
          <CornerMarks />
          
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[1px] bg-red-500/15 shadow-[0_0_10px_rgba(237,29,36,0.5)] z-0 pointer-events-none"
          />

          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-colors duration-500 pointer-events-none" />
          
          <div className="flex items-start justify-between relative mb-8">
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="tactical-xs text-red-400/80 tracking-widest">DIRECTIVE 01 // PRIMARY</span>
            </div>
            <span className="tactical-xs text-zinc-500 tracking-widest">REF: SD-2026-001</span>
          </div>
          
          <div className="relative">
            <h3 className="font-display text-3xl sm:text-5xl tracking-wide mb-4 leading-none text-zinc-100 group-hover:text-white transition-colors">
              THE HACKATHON DIRECTIVE
            </h3>
            <p className="font-cond font-light text-zinc-400 leading-relaxed text-sm sm:text-base max-w-lg mb-6">
              Assemble a team of up to 4 developers. You have 24 hours to build a solution
              across Web3, AI, or App Development. Deploy something worthy of Stark Industries.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {['24 HRS', 'TEAM OF 4', '3 TRACKS', '₹50K POOL'].map((tag) => (
                <motion.span 
                  key={tag} 
                  whileHover={{ scale: 1.05 }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    soundFx.playDirectiveSelect();
                  }}
                  className="px-3 py-1.5 tactical-xs tracking-widest bg-black/60 border border-white/10 text-zinc-300 rounded-sm hover:border-red-500/40 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* CARD 2: COUNTDOWN TIMER */}
        <BentoCard 
          custom={1}
          glowColor="rgba(16, 185, 129, 0.05)"
          className="md:row-span-2 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] p-8 justify-between"
        >
          <CornerMarks />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
          <CountdownCard />
        </BentoCard>

        {/* CARD 3: LOCATION */}
        <BentoCard 
          custom={2}
          glowColor="rgba(237, 29, 36, 0.05)"
          className="hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(237,29,36,0.1)] p-8 justify-end"
        >
          <CornerMarks />
          <div className="flex items-center gap-2.5 mb-5">
            <MapPin className="w-4 h-4 text-red-400 group-hover:-translate-y-1 transition-transform" />
            <span className="tactical-xs text-red-400/80 tracking-widest">COORDINATES</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-wide leading-none text-zinc-100 group-hover:text-white transition-colors">BENNETT UNIVERSITY</h3>
          <p className="font-cond font-light text-zinc-400 text-sm mt-2">Greater Noida, UP — India</p>
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="tactical-xs text-zinc-500 tracking-widest">DATE</div>
              <div className="font-mono text-xs text-zinc-300 mt-1 group-hover:text-red-300 transition-colors">OCT 15–16 / 2026</div>
            </div>
            <span className="tactical-xs text-zinc-600 tracking-widest">28.4744°N 77.4834°E</span>
          </div>
        </BentoCard>

        {/* CARD 4: REWARDS */}
        <BentoCard 
          custom={3}
          glowColor="rgba(248, 232, 37, 0.05)"
          className="hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(248,232,37,0.1)] p-8 flex-col"
        >
          <CornerMarks />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="tactical-xs text-amber-400/80 tracking-widest">REWARD</span>
            </div>
            <span className="tactical-xs text-zinc-600 tracking-widest">R-01</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-wide leading-none text-zinc-100 group-hover:text-amber-300 transition-colors">₹50,000 POOL</h3>
          <p className="font-cond font-light text-zinc-400 text-sm mt-2 mb-4">Plus intern referrals & Stark-tier swag.</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playActivate();
              onAssemble();
            }}
            className="self-start mt-auto tactical-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 group/btn cursor-pointer tracking-widest"
          >
            VIEW ALL REWARDS <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block">→</motion.span>
          </button>
        </BentoCard>

        {/* CARD 5: TECH STACK */}
        <BentoCard 
          custom={4}
          glowColor="rgba(255, 255, 255, 0.03)"
          className="md:col-span-2 hover:border-white/20 p-8 flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <CornerMarks />
          <div className="flex items-center gap-4">
            <Cpu className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <div>
              <h3 className="font-cond font-semibold text-base tracking-widest text-zinc-200 group-hover:text-white transition-colors">STARK-GRADE INFRASTRUCTURE</h3>
              <p className="tactical-xs text-zinc-500 mt-1 tracking-widest">GEEKSFORGEEKS × BENNETT TECH CHAPTER</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['REACT', 'SOLIDITY', 'PYTORCH', 'FLUTTER'].map((tech) => (
              <motion.span 
                key={tech}
                whileHover={{ scale: 1.05 }}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  soundFx.playDirectiveSelect();
                }}
                className="px-3 py-1.5 tactical-xs tracking-widest bg-black/60 border border-white/10 text-zinc-400 rounded-sm hover:border-white/30 hover:text-white transition-colors cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </BentoCard>

      </div>
    </section>
  );
}