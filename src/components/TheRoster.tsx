import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

interface TrackCard {
  id: string;
  hero: string;
  heroClass: string;
  track: string;
  image: string;
  tagline: string;
  description: string;
  accent: 'red' | 'gold' | 'emerald';
  tech: string[];
  coord: string;
  auraColor: string;
  imgScale: number;
  imgHoverScale: number;
  imgY: number;
  imgHoverY: number;
}

const tracks: TrackCard[] = [
  {
    id: 'web3',
    hero: 'IRON MAN',
    heroClass: 'Tony Stark',
    track: 'Web3',
    image: '/ironman.png',
    tagline: 'Decentralize the impossible.',
    description: 'Build dApps, smart contracts, and on-chain experiences. Forge the next era of the decentralized web.',
    accent: 'red',
    tech: ['SOLIDITY', 'FOUNDRY', 'IPFS', 'REACT'],
    coord: 'TRACK-01 / 33.9°N',
    auraColor: 'rgba(237, 29, 36, 0.45)',
    // Bigger native scale, pushed slightly down to stay in border, massive pop on hover
    imgScale: 0.85,
    imgHoverScale: 1.05,
    imgY: 15,
    imgHoverY: -30,
  },
  {
    id: 'ai',
    hero: 'DR. STRANGE',
    heroClass: 'Stephen Strange',
    track: 'AI',
    image: '/strange.png',
    tagline: 'See across dimensions of data.',
    description: 'Train models, craft LLM agents, and build ML pipelines that bend reality through intelligence.',
    accent: 'gold',
    tech: ['PYTORCH', 'LANGCHAIN', 'HUGGINGFACE', 'RAG'],
    coord: 'TRACK-02 / 40.7°N',
    auraColor: 'rgba(248, 232, 37, 0.4)',
    imgScale: 0.85,
    imgHoverScale: 1.05,
    imgY: 15,
    imgHoverY: -30,
  },
  {
    id: 'app',
    hero: 'SPIDER-MAN',
    heroClass: 'Peter Parker',
    track: 'App Dev',
    image: '/spiderman.png',
    tagline: 'With great code comes great impact.',
    description: 'Ship cross-platform apps that swing across devices. Mobile-first, performance-obsessed.',
    accent: 'emerald',
    tech: ['FLUTTER', 'KOTLIN', 'SWIFT', 'FIREBASE'],
    coord: 'TRACK-03 / 28.4°N',
    auraColor: 'rgba(16, 185, 129, 0.45)',
    imgScale: 1.40,
    imgHoverScale: 1.60,
    imgY: 15,
    imgHoverY: -30,
  },
];

const accentMap = {
  red: {
    text: 'text-red-400',
    glow: 'text-glow-red',
    border: 'hover:border-red-500/50',
    shadow: 'hover:shadow-[0_0_35px_rgba(237,29,36,0.18)]',
    bg: 'hover:bg-red-950/[0.06]',
    badge: 'bg-red-500/10 border-red-500/30 text-red-300 shadow-[0_0_12px_rgba(237,29,36,0.2)]',
    gradient: 'from-red-600/20 via-red-900/5 to-transparent',
    ring: 'border-red-500/30',
    blur: 'bg-red-500/15',
    dot: 'bg-red-500 shadow-[0_0_8px_#ED1D24]',
    specular: 'rgba(237, 29, 36, 0.15)',
  },
  gold: {
    text: 'text-amber-400',
    glow: 'text-glow-gold',
    border: 'hover:border-amber-400/50',
    shadow: 'hover:shadow-[0_0_35px_rgba(248,232,37,0.16)]',
    bg: 'hover:bg-amber-950/[0.06]',
    badge: 'bg-amber-500/10 border-amber-400/30 text-amber-300 shadow-[0_0_12px_rgba(248,232,37,0.2)]',
    gradient: 'from-amber-500/20 via-amber-900/5 to-transparent',
    ring: 'border-amber-400/30',
    blur: 'bg-amber-500/15',
    dot: 'bg-amber-400 shadow-[0_0_8px_#F8E825]',
    specular: 'rgba(248, 232, 37, 0.15)',
  },
  emerald: {
    text: 'text-emerald-400',
    glow: 'text-glow-emerald',
    border: 'hover:border-emerald-500/50',
    shadow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]',
    bg: 'hover:bg-emerald-950/[0.06]',
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    gradient: 'from-emerald-500/20 via-emerald-900/5 to-transparent',
    ring: 'border-emerald-500/30',
    blur: 'bg-emerald-500/15',
    dot: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    specular: 'rgba(16, 185, 129, 0.15)',
  },
};

function RosterCard({ track, index }: { track: TrackCard; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const a = accentMap[track.accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative pt-16 sm:pt-20 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY, y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
        transition={{
          default: { duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] },
          rotateX: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
          rotateY: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
          y: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
          scale: { type: 'spring', stiffness: 280, damping: 24, mass: 0.8 },
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className={`group relative rounded-sm bg-[#0a0b0e] border border-white/10 ${a.border} ${a.shadow} ${a.bg} transition-colors duration-300 cursor-pointer flex flex-col min-h-[520px] sm:min-h-[540px] md:min-h-[560px] overflow-visible`}
      >
        <Plus className="absolute top-2 left-2 w-3 h-3 text-white/20 z-20" />
        <Plus className="absolute top-2 right-2 w-3 h-3 text-white/20 z-20" />
        <Plus className="absolute bottom-2 left-2 w-3 h-3 text-white/20 z-20" />
        <Plus className="absolute bottom-2 right-2 w-3 h-3 text-white/20 z-20" />

        <div className={`absolute inset-0 rounded-sm bg-gradient-to-b ${a.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10`} />

        <div className="relative h-[260px] w-full flex items-end justify-center rounded-t-sm z-20" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute inset-0 grid-pattern-fine opacity-25 overflow-hidden rounded-t-sm" />
          
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border ${a.ring} arc-pulse`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${a.blur} blur-2xl`} />

          {/* DYNAMIC CHARACTER SCALING */}
          <motion.img
            src={track.image}
            alt={track.hero}
            animate={{ 
              y: isHovered ? track.imgHoverY : track.imgY, 
              scale: isHovered ? track.imgHoverScale : track.imgScale 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-0 w-[95%] h-[135%] object-contain object-bottom origin-bottom z-30 pointer-events-none"
            style={{ filter: `drop-shadow(0 -10px 20px ${track.auraColor}) drop-shadow(0 10px 20px rgba(0,0,0,0.8))` }}
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/90 to-transparent pointer-events-none z-40" />

          <div className="absolute top-4 left-4 z-40">
            <span className={`px-2.5 py-1 tactical-xs border ${a.badge} rounded-sm font-semibold tracking-wider`}>
              {track.track}
            </span>
          </div>
          <div className="absolute top-4 right-4 z-40 tactical-xs text-zinc-500 font-mono tracking-widest">
            {track.coord}
          </div>
        </div>

        <div className="relative p-6 sm:p-7 flex flex-col flex-1 justify-between z-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
              <span className="tactical-xs text-zinc-500 tracking-widest font-mono">
                HERO_CLASS // {track.heroClass.toUpperCase()}
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl tracking-wide leading-none mb-2 text-zinc-100 group-hover:text-white transition-colors duration-150">
              {track.hero}
            </h3>
            <p className={`font-cond font-normal text-sm sm:text-base ${a.text} ${a.glow} mb-3 italic tracking-wide`}>
              "{track.tagline}"
            </p>
            <p className="font-cond font-light text-zinc-400 text-sm leading-relaxed mb-5">
              {track.description}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {track.tech.map((tech) => (
                <span key={tech} className="px-2 py-0.5 tactical-xs bg-white/5 border border-white/10 text-zinc-400 rounded-sm hover:border-white/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
            <div className={`absolute top-5 right-5 w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 ${a.text} group-hover:border-white/25 transition-all duration-200 group-hover:rotate-0 -rotate-45`}>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TheRoster() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-red-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-emerald-500/4 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-amber-400 to-transparent" />
            <span className="tactical-sm text-amber-400">03 — THE ROSTER</span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl sm:text-6xl tracking-wide leading-none">
              CHOOSE YOUR HERO
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.2 }} className="font-cond font-light text-zinc-400 text-sm sm:text-base max-w-md">
              Three tracks. Three heroes. One mission. Select your directive and assemble your squad for the Stark Developer Summit.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 sm:gap-y-24 md:gap-y-6 md:gap-x-5 lg:gap-x-6">
          {tracks.map((track, i) => (
            <RosterCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}