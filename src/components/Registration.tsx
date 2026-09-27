import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Twitter, Instagram, Linkedin, Plus, Ticket, ShieldCheck } from 'lucide-react';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [badgeId, setBadgeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('loading');
    
    setTimeout(() => {
      const randomId = 'STARK-PASS-' + Math.floor(100000 + Math.random() * 900000);
      setBadgeId(randomId);
      setStatus('done');
    }, 1400);
  };

  const resetForm = () => {
    setStatus('idle');
    setEmail('');
    setBadgeId('');
  };

  return (
    <footer className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-[#050608]">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-500" />
          <span className="tactical-sm text-red-400">04 — VIP ADMISSION PASS</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wide leading-[0.85] mb-5 text-glow-red"
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
          className="font-cond font-light text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-14"
        >
          Claim your official Stark Developer Summit credential ticket. Enter your clearance channel below to generate your pass.
        </motion.p>

        {/* Interactive Marvel Ticket Container with Scoped Apple-grade Font */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
          className="max-w-2xl mx-auto relative group perspective-1000"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif', letterSpacing: '-0.01em' }}
        >
          {/* Ticket Shadow Glow */}
          <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Main Red Ticket Body */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-6 sm:p-10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-red-500/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Background Ticket Watermark Pattern */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Ticket className="w-64 h-64 text-white" />
            </div>

            {/* Left Ticket Section: Header & Inputs */}
            <div className="flex-1 text-left z-10 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-black/30 text-[11px] font-medium tracking-widest text-amber-300 uppercase border border-amber-400/30">
                  STARK SUMMIT '26
                </span>
                <span className="text-[11px] font-medium text-red-200 tracking-wider">BENNETT UNIV</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 text-white drop-shadow-md">
                VIP ADMIT ONE
              </h3>

              <AnimatePresence mode="wait">
                {status !== 'done' ? (
                  <motion.form
                    key="ticket-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[12px] font-semibold text-red-100 tracking-wide uppercase mb-1.5">
                        Authorized Email Terminal:
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3.5 rounded-lg bg-white text-zinc-900 text-sm font-medium tracking-normal border-2 border-red-400 placeholder:text-zinc-400 shadow-inner
                          focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-300/30 transition-all duration-200"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status !== 'idle'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-lg bg-black text-white font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-zinc-900 transition-all cursor-pointer border border-white/10"
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
                  /* Success Ticket State */
                  <motion.div
                    key="ticket-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/40 p-4 rounded-lg border border-emerald-400/40 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                      <ShieldCheck className="w-4 h-4" /> PASS GRANTED & LOGGED
                    </div>
                    <div className="text-xs text-amber-300 font-semibold tracking-wider mb-2">
                      ID: {badgeId}
                    </div>
                    <div className="text-xs text-zinc-200 truncate mb-3">
                      NODE: {email}
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-red-200 hover:text-white underline uppercase font-semibold tracking-wider cursor-pointer"
                    >
                      Issue New Pass
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Ticket Perforation Divider */}
            <div className="hidden md:flex flex-col items-center justify-center self-stretch px-2">
              <div className="h-full border-r-2 border-dashed border-red-400/40" />
            </div>

            {/* Right Ticket Stub Section */}
            <div className="z-10 w-full md:w-48 text-center md:text-right flex flex-col justify-between border-t md:border-t-0 pt-4 md:pt-0 border-red-500/30">
              <div>
                <div className="text-[11px] font-bold text-red-200 tracking-widest uppercase">LOCATION</div>
                <div className="text-xl font-black tracking-tight text-white">BENNETT UNIV</div>
              </div>

              <div className="my-4">
                <div className="text-[11px] font-bold text-red-200 tracking-widest uppercase">ACCESS DATE</div>
                <div className="text-sm font-bold tracking-wider text-amber-300">2026.09.27</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-red-200 tracking-widest uppercase">SECURITY</div>
                <div className="text-xs font-bold text-white tracking-widest bg-black/40 py-1 px-2.5 rounded-md inline-block mt-1 border border-white/10">
                  LEVEL 9 VIP
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-20 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
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
                className="w-9 h-9 rounded-sm bg-[#0a0b0e] border border-white/10 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(237,29,36,0.1)] transition-all duration-150 ease-out"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tactical footer line */}
        <div className="mt-8 flex items-center justify-center gap-2 tactical-xs text-zinc-700">
          <Plus className="w-3 h-3" />
          © 2026 STARK INDUSTRIES // ALL DIRECTIVES CLASSIFIED
          <Plus className="w-3 h-3" />
        </div>
      </div>
    </footer>
  );
}