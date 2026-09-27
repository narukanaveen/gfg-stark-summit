import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Github, Twitter, Instagram, Linkedin, Plus } from 'lucide-react';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3500);
    }, 1200);
  };

  return (
    <footer className="relative pt-24 sm:pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Ambient glow — red and gold */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-red-600/6 blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/4 blur-[100px]" />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern radial-fade opacity-40" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-500" />
          <span className="tactical-sm text-red-400">04 — REGISTRATION</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wide leading-[0.85] mb-5 text-glow-red"
        >
          THE INITIATIVE
          <br />
          <span className="gradient-text-marvel">AWAITS.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-cond font-light text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10"
        >
          Transmit your credentials. Receive summit intel, track assignments, and early-access protocols.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full pl-11 pr-4 py-3.5 rounded-sm bg-black/50 border border-white/8 font-mono text-xs tracking-wide text-zinc-200 placeholder:text-zinc-700 uppercase
                  focus:outline-none focus:border-red-500/40 focus:shadow-[0_0_15px_rgba(237,29,36,0.12)] transition-all duration-150 ease-out"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              whileHover={{ scale: status === 'idle' ? 1.04 : 1 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-6 py-3.5 rounded-sm font-cond font-semibold text-sm uppercase tracking-widest whitespace-nowrap flex items-center gap-2 transition-all duration-150 ease-out
                ${status === 'done'
                  ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]'
                }`}
            >
              {status === 'loading' && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {status === 'done' && <Check className="w-4 h-4" />}
              {status === 'idle' && <Send className="w-4 h-4" />}
              {status === 'idle' ? 'Register' : status === 'loading' ? 'Transmitting' : 'Registered'}
            </motion.button>
          </div>
        </motion.form>

        {/* Status message */}
        {status === 'done' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="tactical-sm text-emerald-400 mt-4 text-glow-emerald"
          >
            ✓ CREDENTIALS RECEIVED // WELCOME TO THE INITIATIVE
          </motion.p>
        )}

        {/* Divider */}
        <div className="mt-20 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Footer links — asymmetric */}
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
