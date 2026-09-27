import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Twitter, Instagram, Linkedin, Plus, Ticket, ShieldCheck } from 'lucide-react';
import { soundFx } from '../audio';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [badgeId, setBadgeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    
    soundFx.playActivate();
    setStatus('loading');
    
    setTimeout(() => {
      const randomId = 'STARK-PASS-' + Math.floor(100000 + Math.random() * 900000);
      setBadgeId(randomId);
      setStatus('done');
      soundFx.playSuccess();
    }, 1400);
  };

  const resetForm = () => {
    soundFx.playHover();
    setStatus('idle');
    setEmail('');
    setBadgeId('');
  };

  return (
    <footer className="relative pt-20 sm:pt-32 pb-12 px-3 sm:px-6 overflow-hidden bg-[#050608]">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] h-[250px] rounded-full bg-red-600/10 blur-[100px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
        >
          <div className="h-px w-8 sm:w-10 bg-gradient-to-r from-transparent to-red-500" />
          <span className="tactical-sm text-red-400">04 — VIP ADMISSION PASS</span>
          <div className="h-px w-8 sm:w-10 bg-gradient-to-l from-transparent to-amber-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-7xl md:text-8xl tracking-wide leading-[0.9] mb-4 sm:mb-5 text-glow-red px-2"
        >
          SECURE YOUR
          <br />
          <span className="gradient-text-marvel">ACCESS PASS.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-cond font-light text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto mb-10 sm:mb-14 px-4"
        >
          Claim your official Stark Developer Summit credential ticket. Enter your clearance channel below to generate your pass.
        </motion.p>

        {/* Interactive Marvel Ticket Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto relative group px-2 sm:px-0"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', letterSpacing: '-0.01em' }}
        >
          {/* Main Red Ticket Body */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-5 sm:p-10 text-white shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-red-500/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Background Ticket Watermark Pattern */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Ticket className="w-48 sm:w-64 h-48 sm:h-64 text-white" />
            </div>

            {/* Left Ticket Section with 3D Perspective */}
            <div className="flex-1 text-left z-10 w-full" style={{ perspective: '1000px' }}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-black/30 text-[10px] sm:text-[11px] font-medium tracking-widest text-amber-300 uppercase border border-amber-400/30">
                  STARK SUMMIT '26
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-red-200 tracking-wider">BENNETT UNIV</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
                VIP ADMIT ONE
              </h3>

              <AnimatePresence mode="wait">
                {status !== 'done' ? (
                  <motion.form
                    key="ticket-form"
                    initial={{ opacity: 0, rotateX: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -90, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] sm:text-[12px] font-semibold text-red-100 tracking-wide uppercase mb-1.5">
                        Authorized Email Terminal:
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-3 rounded-lg bg-white text-zinc-900 text-xs sm:text-sm font-medium border-2 border-red-400 placeholder:text-zinc-400 shadow-inner
                          focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30 transition-all"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status !== 'idle'}
                      onMouseEnter={() => soundFx.playHover()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-lg bg-black text-white font-semibold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-zinc-900 transition-all cursor-pointer border border-white/10"
                    >
                      {status === 'loading' ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 text-red-400" />
                      )}
                      {status === 'loading' ? 'Processing Pass...' : 'Generate Ticket'}
                    </motion.button>
                  </motion.form>
                ) : (
                  /* Success Ticket State with Terminal Output */
                  <motion.div
                    key="ticket-success"
                    initial={{ opacity: 0, rotateX: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -90, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="bg-black/60 p-3.5 sm:p-4 rounded-lg border border-emerald-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-2 border-b border-emerald-500/20 pb-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" /> SECURE CHANNEL OPEN
                      </div>
                      <div className="text-xs text-amber-300 font-mono font-semibold tracking-wider">
                        {badgeId}
                      </div>
                    </div>
                    
                    <div className="text-[11px] sm:text-xs text-emerald-100/70 font-mono flex flex-col gap-1 mb-4 text-left">
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <span className="text-emerald-500">&gt;</span> AUTH_NODE: {email}
                      </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <span className="text-emerald-500">&gt;</span> SYNCING DEVELOPER IDENTITY... <span className="text-amber-300">[OK]</span>
                      </motion.span>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                        <span className="text-emerald-500">&gt;</span> CLEARANCE: LEVEL 9 GRANTED
                      </motion.span>
                    </div>

                    <button
                      type="button"
                      onClick={resetForm}
                      onMouseEnter={() => soundFx.playHover()}
                      className="mt-auto self-start text-[10px] sm:text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded bg-zinc-900/50 uppercase font-semibold tracking-wider cursor-pointer transition-colors"
                    >
                      Issue New Pass
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:flex flex-col items-center justify-center self-stretch px-2">
              <div className="h-full border-r-2 border-dashed border-red-400/40" />
            </div>

            {/* Right Ticket Stub Section with Synchronized 3D Perspective */}
            <div className="z-10 w-full md:w-48 border-t md:border-t-0 pt-4 md:pt-0 border-red-500/30 relative" style={{ perspective: '1000px' }}>
              <AnimatePresence mode="wait">
                {status !== 'done' ? (
                  /* Locked / Classified State */
                  <motion.div
                    key="stub-locked"
                    initial={{ opacity: 0, rotateX: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -90, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center md:text-right flex flex-col justify-center items-center md:items-end w-full h-full gap-3"
                  >
                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full gap-2 md:gap-4">
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-red-200/40 tracking-widest uppercase">LOCATION</div>
                        <div className="text-base sm:text-xl font-black tracking-tight text-white/30 blur-[2px]">CLASSIFIED</div>
                      </div>

                      <div className="my-0 md:my-1">
                        <div className="text-[10px] sm:text-[11px] font-bold text-red-200/40 tracking-widest uppercase">ACCESS DATE</div>
                        <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-300/30 blur-[2px]">ENCRYPTED</div>
                      </div>

                      <div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-red-200/40 tracking-widest uppercase hidden md:block">SECURITY</div>
                        <div className="text-[11px] sm:text-xs font-bold text-white/50 tracking-widest bg-black/20 py-1 px-2 rounded-md inline-block mt-1 border border-white/5">
                          PENDING
                        </div>
                      </div>
                    </div>
                    
                    {/* AESTHETIC PROMPT TO FILL OUT FORM */}
                    <div className="mt-2 text-[9px] sm:text-[10px] font-mono text-amber-300/80 tracking-widest uppercase animate-pulse border border-amber-300/20 px-2 py-1 rounded bg-black/40">
                      [ AWAITING CREDENTIALS TO DECRYPT ]
                    </div>
                  </motion.div>
                ) : (
                  /* Revealed State */
                  <motion.div
                    key="stub-revealed"
                    initial={{ opacity: 0, rotateX: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateX: -90, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-center md:text-right flex flex-row md:flex-col justify-between items-center md:items-end w-full h-full gap-2 md:gap-4"
                  >
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-red-200 tracking-widest uppercase">LOCATION</div>
                      <div className="text-base sm:text-xl font-black tracking-tight text-white">BENNETT UNIV</div>
                    </div>

                    <div className="my-0 md:my-1">
                      <div className="text-[10px] sm:text-[11px] font-bold text-red-200 tracking-widest uppercase">ACCESS DATE</div>
                      <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-300">2026.10.15</div>
                    </div>

                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-red-200 tracking-widest uppercase hidden md:block">SECURITY</div>
                      <div className="text-[11px] sm:text-xs font-bold text-white tracking-widest bg-emerald-500/20 py-1 px-2 rounded-md inline-block mt-1 border border-emerald-500/30 text-emerald-400">
                        LEVEL 9 VIP
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-16 sm:mt-20 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left px-2 sm:px-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-red-600 to-amber-400 flex items-center justify-center font-display text-lg text-white tracking-wide">
              S
            </div>
            <div>
              <div className="font-cond font-medium text-sm text-zinc-300 tracking-wide">STARK DEVELOPER SUMMIT</div>
              <div className="tactical-xs text-zinc-600 mt-0.5">MARVEL × GEEKSFORGEEKS × BENNETT UNIV</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {[
              { icon: Github, label: 'GitHub' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                onMouseEnter={() => soundFx.playHover()}
                className="w-9 h-9 rounded-sm bg-[#0a0b0e] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(237,29,36,0.1)] transition-all duration-150 ease-out"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tactical footer line */}
        <div className="mt-8 flex items-center justify-center gap-2 tactical-xs text-zinc-700 px-2">
          <Plus className="w-3 h-3" />
          © 2026 STARK INDUSTRIES // ALL DIRECTIVES CLASSIFIED
          <Plus className="w-3 h-3" />
        </div>
      </div>
    </footer>
  );
}