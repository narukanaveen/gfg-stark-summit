// Advanced Web Audio API synthesizer for Stark Industries soundscape & theme loop

class SoundEffects {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private heartbeatInterval: number | null = null;
  private ambientInterval: number | null = null;
  private isAmbientPlaying = false;
  private muted = false;

  constructor() {
    // Handle tab visibility to auto-suspend audio engine
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!this.ctx) return;
        if (document.hidden) {
          if (this.ctx.state === 'running') this.ctx.suspend();
        } else {
          if (this.ctx.state === 'suspended' && !this.muted) this.ctx.resume();
        }
      });
    }
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended' && !this.muted) {
      this.ctx.resume();
    }
  }

  // Master Mute Toggle for Evaluators
  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 1, this.ctx.currentTime);
    }
    if (this.ctx && this.muted && this.ctx.state === 'running') {
      this.ctx.suspend();
    } else if (this.ctx && !this.muted && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  private getDestination(): AudioNode | null {
    this.init();
    return this.masterGain || this.ctx?.destination || null;
  }

  // Deep cinematic sub-bass heartbeat thump (Lub-dub)
  playHeartbeat() {
    if (this.muted) return;
    try {
      this.init();
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;

      const now = this.ctx.currentTime;
      [0, 0.16].forEach((delay, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(70 - index * 15, now + delay);
        osc.frequency.exponentialRampToValueAtTime(20, now + delay + 0.3);

        gain.gain.setValueAtTime(0.25, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now + delay);
        osc.stop(now + delay + 0.35);
      });
    } catch {}
  }

  startHeartbeatLoop(intervalMs = 3500) {
    if (this.heartbeatInterval) return;
    this.playHeartbeat();
    this.heartbeatInterval = window.setInterval(() => {
      this.playHeartbeat();
    }, intervalMs);
  }

  stopHeartbeatLoop() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  startAmbientTheme() {
    if (this.isAmbientPlaying) return;
    this.init();
    this.isAmbientPlaying = true;

    const playDroneLayer = () => {
      if (this.muted) return;
      try {
        const dest = this.getDestination();
        if (!this.ctx || !this.isAmbientPlaying || !dest) return;
        const now = this.ctx.currentTime;

        const chords = [110, 130.81, 164.81, 196];
        const chord = chords[Math.floor(Math.random() * chords.length)];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(chord, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 1.5);
        gain.gain.linearRampToValueAtTime(0.001, now + 5.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(now);
        osc.stop(now + 5.0);
      } catch {}
    };

    playDroneLayer();
    this.ambientInterval = window.setInterval(playDroneLayer, 4500);
  }

  stopAmbientTheme() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  playHover() {
    if (this.muted) return;
    try {
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {}
  }

  playActivate() {
    if (this.muted) return;
    try {
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'square';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playSuccess() {
    if (this.muted) return;
    try {
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;

      const now = this.ctx.currentTime;
      const chords = [110.0, 164.81, 220.0];

      chords.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
        filter.frequency.exponentialRampToValueAtTime(100, now + 1.5);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.1 + index * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch {}
  }

  playTick() {
    if (this.muted) return;
    try {
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.01);

      osc.connect(gain);
      gain.connect(dest);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.01);
    } catch {}
  }

  playDirectiveSelect() {
    if (this.muted) return;
    try {
      const dest = this.getDestination();
      if (!this.ctx || !dest) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }
}

export const soundFx = new SoundEffects();