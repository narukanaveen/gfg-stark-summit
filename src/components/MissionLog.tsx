import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, MapPin, Clock, Trophy, Cpu, Plus } from 'lucide-react';

interface MissionLogProps {
  onAssemble: () => void;
}

const TARGET_DATE = new Date('2026-10-15T09:00:00').getTime();

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function CornerMarks() {
  return (
    <>
      <Plus className="absolute top-2 left-2 w-3 h-3 text-white/15" />
      <Plus className="absolute top-2 right-2 w-3 h-3 text-white/15" />
      <Plus className="absolute bottom-2 left-2 w-3 h-3 text-white/15" />
      <Plus className="absolute bottom-2 right-2 w-3 h-3 text-white/15" />
    </>
  );
}

export default function MissionLog({ onAssemble }: MissionLogProps) {
  const t = useCountdown();

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-red-500 to-transparent" />
          <span className="tactical-sm text-red-400">02 — MISSION LOG</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl tracking-wide leading-none"
        >
          THE DIRECTIVE
        </motion.h2>
      </div>

      {/* Bento grid — asymmetric */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[minmax(180px,auto)]">
        {/* Large directive card — spans 2 cols, crimson border */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:col-span-2 bg-[#0a0b0e] border border-red-500/20 rounded-sm p-8 flex flex-col justify-end group relative overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(237,29,36,0.12)] transition-all duration-150 ease-out"
        >
          <CornerMarks />
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-red-600/8 blur-3xl group-hover:bg-red-600/15 transition-colors duration-150 ease-out" />
          <div className="flex items-start justify-between relative mb-6">
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-red-400" />
              <span className="tactical-xs text-red-400/70">DIRECTIVE 01 // PRIMARY</span>
            </div>
            <span className="tactical-xs text-zinc-600">REF: SD-2026-001</span>
          </div>
          <div className="relative">
            <h3 className="font-display text-3xl sm:text-4xl tracking-wide mb-3 leading-none">
              THE HACKATHON DIRECTIVE
            </h3>
            <p className="font-cond font-light text-zinc-400 leading-relaxed text-sm sm:text-base max-w-lg">
              Assemble a team of up to 4 developers. You have 24 hours to build a solution
              across Web3, AI, or App Development. Deploy something worthy of Stark Industries.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {['24 HRS', 'TEAM OF 4', '3 TRACKS', '₹50K POOL'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 tactical-xs bg-white/5 border border-white/8 text-zinc-400 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Countdown timer card — 1 col, 2 rows tall, emerald border (CTA color) */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:row-span-2 bg-[#0a0b0e] border border-emerald-500/20 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden hover:border-emerald-500/45 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] transition-all duration-150 ease-out"
        >
          <CornerMarks />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="flex items-center gap-2.5 relative">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="tactical-xs text-emerald-400/70">T-MINUS</span>
          </div>

          <div className="relative mt-4 flex-1 flex flex-col justify-center">
            <p className="tactical-xs text-zinc-600 mb-4">COUNTDOWN TO LAUNCH</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'DAYS', value: t.days },
                { label: 'HRS', value: t.hours },
                { label: 'MIN', value: t.minutes },
                { label: 'SEC', value: t.seconds },
              ].map((unit) => (
                <div key={unit.label} className="rounded-sm bg-black/40 border border-emerald-500/12 p-3 text-center">
                  <div className="text-3xl font-mono font-bold text-emerald-300 text-glow-emerald tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="tactical-xs text-zinc-600 mt-1">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-4 flex items-center gap-2 tactical-xs text-emerald-400/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 arc-pulse" />
            [ STATUS: ARMED ]
          </div>
        </motion.div>

        {/* Date & Location card — 1 col, neutral border */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="bg-[#0a0b0e] border border-white/10 rounded-sm p-6 group relative overflow-hidden hover:border-red-500/45 hover:shadow-[0_0_30px_rgba(237,29,36,0.12)] transition-all duration-150 ease-out flex flex-col justify-end"
        >
          <CornerMarks />
          <div className="flex items-center gap-2.5 mb-4">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="tactical-xs text-red-400/70">COORDINATES</span>
          </div>
          <h3 className="font-display text-2xl tracking-wide leading-none">BENNETT UNIVERSITY</h3>
          <p className="font-cond font-light text-zinc-500 text-sm mt-1">Greater Noida, UP — India</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <div className="tactical-xs text-zinc-600">DATE</div>
              <div className="font-mono text-xs text-zinc-300 mt-0.5">OCT 15–16 / 2026</div>
            </div>
            <span className="tactical-xs text-zinc-700">28.4744°N 77.4834°E</span>
          </div>
        </motion.div>

        {/* Prize card — 1 col */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="bg-[#0a0b0e] border border-white/10 rounded-sm p-5 group relative overflow-hidden hover:border-amber-500/45 hover:shadow-[0_0_30px_rgba(248,232,37,0.1)] transition-all duration-150 ease-out flex flex-col"
        >
          <CornerMarks />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="tactical-xs text-amber-400/70">REWARD</span>
            </div>
            <span className="tactical-xs text-zinc-700">R-01</span>
          </div>
          <h3 className="font-display text-2xl tracking-wide leading-none">₹50,000 POOL</h3>
          <p className="font-cond font-light text-zinc-500 text-sm mt-1 mb-3">Plus intern referrals & Stark-tier swag.</p>
          <button
            onClick={onAssemble}
            className="self-start tactical-xs text-red-400 hover:text-red-300 transition-colors duration-150 ease-out"
          >
            VIEW ALL REWARDS →
          </button>
        </motion.div>

        {/* Systems / tech stack bar — spans 2 cols */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:col-span-2 bg-[#0a0b0e] border border-white/10 rounded-sm p-5 relative overflow-hidden hover:border-white/20 transition-all duration-150 ease-out flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <CornerMarks />
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-zinc-500" />
            <div>
              <h3 className="font-cond font-medium text-sm tracking-wide">STARK-GRADE INFRASTRUCTURE</h3>
              <p className="tactical-xs text-zinc-600 mt-0.5">GEEKSFORGEEKS × BENNETT TECH CHAPTER</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['REACT', 'SOLIDITY', 'PYTORCH', 'FLUTTER'].map((tech) => (
              <span key={tech} className="px-2.5 py-1 tactical-xs bg-white/5 border border-white/8 text-zinc-500 rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
