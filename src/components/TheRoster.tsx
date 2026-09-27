import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

interface TrackCard {
  id: string;
  hero: string;
  heroClass: string;
  track: string;
  tagline: string;
  description: string;
  accent: 'red' | 'gold' | 'emerald';
  tech: string[];
  placeholderIcon: string;
  coord: string;
}

const tracks: TrackCard[] = [
  {
    id: 'web3',
    hero: 'IRON MAN',
    heroClass: 'Tony Stark',
    track: 'Web3',
    tagline: 'Decentralize the impossible.',
    description: 'Build dApps, smart contracts, and on-chain experiences. Forge the next era of the decentralized web.',
    accent: 'red',
    tech: ['SOLIDITY', 'FOUNDRY', 'IPFS', 'REACT'],
    placeholderIcon: '♂',
    coord: 'TRACK-01 / 33.9°N',
  },
  {
    id: 'ai',
    hero: 'DR. STRANGE',
    heroClass: 'Stephen Strange',
    track: 'AI',
    tagline: 'See across dimensions of data.',
    description: 'Train models, craft LLM agents, and build ML pipelines that bend reality through intelligence.',
    accent: 'gold',
    tech: ['PYTORCH', 'LANGCHAIN', 'HUGGINGFACE', 'RAG'],
    placeholderIcon: '✶',
    coord: 'TRACK-02 / 40.7°N',
  },
  {
    id: 'app',
    hero: 'SPIDER-MAN',
    heroClass: 'Peter Parker',
    track: 'App Dev',
    tagline: 'With great code comes great impact.',
    description: 'Ship cross-platform apps that swing across devices. Mobile-first, performance-obsessed.',
    accent: 'emerald',
    tech: ['FLUTTER', 'KOTLIN', 'SWIFT', 'FIREBASE'],
    placeholderIcon: '◆',
    coord: 'TRACK-03 / 28.4°N',
  },
];

const accentMap = {
  red: {
    text: 'text-red-400',
    glow: 'text-glow-red',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(237,29,36,0.12)]',
    bg: 'group-hover:bg-red-500/[0.03]',
    badge: 'bg-red-500/8 border-red-500/20 text-red-300',
    gradient: 'from-red-500/15',
    ring: 'border-red-500/25',
    blur: 'bg-red-500/8',
    dashed: 'border-red-500/25',
    dot: 'bg-red-400',
  },
  gold: {
    text: 'text-amber-400',
    glow: 'text-glow-gold',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(248,232,37,0.1)]',
    bg: 'group-hover:bg-amber-500/[0.03]',
    badge: 'bg-amber-500/8 border-amber-500/20 text-amber-300',
    gradient: 'from-amber-500/15',
    ring: 'border-amber-500/25',
    blur: 'bg-amber-500/8',
    dashed: 'border-amber-500/25',
    dot: 'bg-amber-400',
  },
  emerald: {
    text: 'text-emerald-400',
    glow: 'text-glow-emerald',
    shadow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
    bg: 'group-hover:bg-emerald-500/[0.03]',
    badge: 'bg-emerald-500/8 border-emerald-500/20 text-emerald-300',
    gradient: 'from-emerald-500/15',
    ring: 'border-emerald-500/25',
    blur: 'bg-emerald-500/8',
    dashed: 'border-emerald-500/25',
    dot: 'bg-emerald-400',
  },
};

export default function TheRoster() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-red-600/4 blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/4 blur-[120px]" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-12 bg-gradient-to-r from-amber-400 to-transparent" />
            <span className="tactical-sm text-amber-400">03 — THE ROSTER</span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl tracking-wide leading-none"
            >
              CHOOSE YOUR HERO
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-cond font-light text-zinc-500 text-sm max-w-md"
            >
              Three tracks. Three heroes. One mission. Select your directive and assemble your squad.
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track, i) => {
            const a = accentMap[track.accent];
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative rounded-sm bg-[#0a0b0e] border border-white/10 ${a.bg} ${a.shadow} hover:border-white/20 transition-all duration-150 ease-out overflow-hidden cursor-pointer flex flex-col h-[540px]`}
              >
                {/* Corner markers */}
                <Plus className="absolute top-2 left-2 w-3 h-3 text-white/15 z-20" />
                <Plus className="absolute top-2 right-2 w-3 h-3 text-white/15 z-20" />
                <Plus className="absolute bottom-2 left-2 w-3 h-3 text-white/15 z-20" />
                <Plus className="absolute bottom-2 right-2 w-3 h-3 text-white/15 z-20" />

                {/* Top gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${a.gradient} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out`} />

                {/* Character placeholder area */}
                <div className="relative h-[290px] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 grid-pattern-fine opacity-30" />
                  {/* Glowing ring behind character */}
                  <div className={`absolute w-40 h-40 rounded-full border ${a.ring} arc-pulse`} />
                  <div className={`absolute w-28 h-28 rounded-full ${a.blur} blur-2xl`} />

                  {/* Character PNG placeholder */}
                  <div className={`relative z-10 w-32 h-32 rounded-sm border border-dashed ${a.dashed} flex flex-col items-center justify-center`}>
                    <span className={`text-4xl ${a.text} ${a.glow} font-bold`}>
                      {track.placeholderIcon}
                    </span>
                    <span className="tactical-xs text-zinc-700 mt-2">CHAR PNG</span>
                  </div>

                  {/* Track badge — top left */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 tactical-xs border ${a.badge} rounded-sm`}>
                    {track.track}
                  </div>

                  {/* Coordinate — top right */}
                  <div className="absolute top-3 right-3 tactical-xs text-zinc-600">
                    {track.coord}
                  </div>
                </div>

                {/* Info area */}
                <div className="relative p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-1 h-1 rounded-full ${a.dot}`} />
                    <span className="tactical-xs text-zinc-600">
                      {track.heroClass.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl tracking-wide leading-none mb-2">
                    {track.hero}
                  </h3>
                  <p className={`font-cond font-light text-sm ${a.text} mb-3 italic`}>
                    "{track.tagline}"
                  </p>
                  <p className="font-cond font-light text-zinc-400 text-sm leading-relaxed mb-4">
                    {track.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {track.tech.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 tactical-xs bg-white/5 border border-white/8 text-zinc-500 rounded-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div className={`absolute top-5 right-5 w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 ${a.text} transition-all duration-150 ease-out group-hover:rotate-0 -rotate-45`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
