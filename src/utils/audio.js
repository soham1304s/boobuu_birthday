// Web Audio Synthesizer for Romantic Soundscapes & Micro-Interactions

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.currentTrackIndex = 0;
    this.musicInterval = null;
    this.gainNode = null;
    this.volume = 0.5;

    this.tracks = [
      {
        title: "Golden Hour Glow",
        artist: "For My Boobuuu ❤️",
        notes: [
          { f: 523.25, d: 0.8 }, // C5
          { f: 659.25, d: 0.8 }, // E5
          { f: 783.99, d: 0.8 }, // G5
          { f: 987.77, d: 1.2 }, // B5
          { f: 880.00, d: 0.8 }, // A5
          { f: 659.25, d: 0.8 }, // E5
          { f: 783.99, d: 1.4 }, // G5
          { f: 587.33, d: 0.8 }, // D5
          { f: 698.46, d: 0.8 }, // F5
          { f: 880.00, d: 1.2 }, // A5
          { f: 783.99, d: 1.6 }  // G5
        ]
      },
      {
        title: "Starlight Lullaby",
        artist: "Under the Midnight Sky ✨",
        notes: [
          { f: 440.00, d: 0.9 }, // A4
          { f: 554.37, d: 0.9 }, // C#5
          { f: 659.25, d: 0.9 }, // E5
          { f: 830.61, d: 1.4 }, // G#5
          { f: 739.99, d: 0.9 }, // F#5
          { f: 554.37, d: 0.9 }, // C#5
          { f: 659.25, d: 1.4 }, // E5
          { f: 493.88, d: 0.9 }, // B4
          { f: 659.25, d: 1.5 }  // E5
        ]
      },
      {
        title: "Forever Our Song",
        artist: "Hand in Hand Together 💍",
        notes: [
          { f: 587.33, d: 0.8 }, // D5
          { f: 739.99, d: 0.8 }, // F#5
          { f: 880.00, d: 1.0 }, // A5
          { f: 1046.50, d: 1.4 }, // C6
          { f: 987.77, d: 0.8 }, // B5
          { f: 739.99, d: 0.8 }, // F#5
          { f: 880.00, d: 1.2 }, // A5
          { f: 659.25, d: 1.6 }  // E5
        ]
      }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  // Play a soft bell/chime
  playChime(frequency = 880, duration = 0.6) {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  // Heart pop sound
  playHeartPop() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {}
  }

  // Candle blow sound
  playCandleBlow() {
    try {
      this.init();
      // White noise buffer for breath/wind
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.gainNode);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.8);
    } catch {}
  }

  // Birthday Fanfare
  playCelebrationFanfare() {
    try {
      this.init();
      const melody = [
        { f: 523.25, time: 0.0, dur: 0.25 }, // C
        { f: 523.25, time: 0.28, dur: 0.25 }, // C
        { f: 587.33, time: 0.55, dur: 0.45 }, // D
        { f: 523.25, time: 1.05, dur: 0.45 }, // C
        { f: 698.46, time: 1.55, dur: 0.5 },  // F
        { f: 659.25, time: 2.1, dur: 0.9 },   // E
        { f: 523.25, time: 3.1, dur: 0.25 },  // C
        { f: 523.25, time: 3.38, dur: 0.25 }, // C
        { f: 587.33, time: 3.65, dur: 0.45 }, // D
        { f: 523.25, time: 4.15, dur: 0.45 }, // C
        { f: 783.99, time: 4.65, dur: 0.5 },  // G
        { f: 698.46, time: 5.2, dur: 1.1 }    // F
      ];

      melody.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime + note.time);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + note.time);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, this.ctx.currentTime + note.time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.time + note.dur);

        osc.connect(gain);
        gain.connect(this.gainNode);

        osc.start(this.ctx.currentTime + note.time);
        osc.stop(this.ctx.currentTime + note.time + note.dur);
      });
    } catch {}
  }

  // Play romantic acoustic piano loop
  startMusic(trackIndex = null) {
    this.init();
    if (trackIndex !== null) {
      this.currentTrackIndex = trackIndex;
    }
    this.isPlayingMusic = true;

    const currentTrack = this.tracks[this.currentTrackIndex];
    let noteIdx = 0;

    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const note = currentTrack.notes[noteIdx];
      
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      // Subtle octave warmth
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.f / 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.35, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + note.d);
      osc2.stop(this.ctx.currentTime + note.d);

      noteIdx = (noteIdx + 1) % currentTrack.notes.length;
      this.musicInterval = setTimeout(playNext, note.d * 900);
    };

    playNext();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isPlayingMusic;
  }
}

export const soundEngine = new SoundEngine();
