// Advanced Web Audio API synthesizer for Stark Industries soundscape & theme loop

class SoundEffects {
  private ctx: AudioContext | null = null;
  private heartbeatInterval: number | null = null;
  private ambientInterval: number | null = null;
  private isAmbientPlaying = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Single deep sub-bass heartbeat thump (Lub-dub)
  playHeartbeat() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.16].forEach((delay, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65 - index * 12, now + delay);
        osc.frequency.exponentialRampToValueAtTime(22, now + delay + 0.28);

        gain.gain.setValueAtTime(0.18, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.32);
      });
    } catch {
      // Audio context restricted
    }
  }

  // Start continuous rhythmic heartbeat loop (synced to visual pulse)
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

  // Continuous Cinematic Sci-Fi Ambient Theme (Generative low drone pad)
  startAmbientTheme() {
    if (this.isAmbientPlaying) return;
    this.init();
    this.isAmbientPlaying = true;

    const playDroneLayer = () => {
      try {
        if (!this.ctx || !this.isAmbientPlaying) return;
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
        gain.gain.linearRampToValueAtTime(0.025, now + 1.5);
        gain.gain.linearRampToValueAtTime(0.001, now + 5.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

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

  // UI hover click
  playHover() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  // UI activate click
  playActivate() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  // Success chime when ticket is granted
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);

        gain.gain.setValueAtTime(0.03, now + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.18);
      });
    } catch {}
  }
}

export const soundFx = new SoundEffects();