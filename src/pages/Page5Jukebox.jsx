import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Music,
  Sparkles,
  Heart,
  ArrowRight,
  Laptop,
  Share2,
  MoreHorizontal,
  Disc3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function Page5Jukebox({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(48);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const tracks = [
    {
      id: 0,
      title: "Golden Hour Glow",
      tempo: "Gentle & Warm",
      vibe: "Acoustic Piano & Sunset Warmth",
      quote: "When the golden sun hits your eyes, time ceases to exist.",
      duration: "3:42",
      totalSeconds: 222
    },
    {
      id: 1,
      title: "Starlight Lullaby",
      tempo: "Dreamy & Soft",
      vibe: "Midnight Chimes & Cozy Whispers",
      quote: "Under a blanket of stars, counting my blessings — starting and ending with you.",
      duration: "4:15",
      totalSeconds: 255
    },
    {
      id: 2,
      title: "Forever Our Song",
      tempo: "Romantic & Deep",
      vibe: "Tender Waltz & Infinite Devotion",
      quote: "I'd dance with you in the rain, in the kitchen, and across lifetimes.",
      duration: "3:58",
      totalSeconds: 238
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Track progress live timer when music is playing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev >= currentTrack.totalSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.totalSeconds]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayToggle = () => {
    soundEngine.playHeartPop();
    const playing = soundEngine.toggleMusic();
    setIsPlaying(playing);
  };

  const handleSelectTrack = (index) => {
    soundEngine.playChime(600 + index * 100);
    setCurrentTrackIndex(index);
    setTrackProgress(0);
    soundEngine.stopMusic();
    soundEngine.startMusic(index);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    soundEngine.playChime(750);
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    setTrackProgress(0);
    soundEngine.stopMusic();
    soundEngine.startMusic(nextIdx);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    soundEngine.playChime(650);
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    setTrackProgress(0);
    soundEngine.stopMusic();
    soundEngine.startMusic(prevIdx);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setTrackProgress(Math.floor(pct * currentTrack.totalSeconds));
  };

  const toggleLike = () => {
    soundEngine.playHeartPop();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    if (nextLiked) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1db954', '#ff3366', '#ffffff']
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 pb-24 overflow-hidden max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-3 border border-pink-400/30">
          <Disc3 size={14} className="text-pink-300" />
          <span className="text-xs uppercase tracking-wider text-pink-200 font-semibold">Chapter V</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          Our Love <span className="text-gradient">Soundtrack</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          Every love story has its own rhythm. Turn on our special playlist and soak in the music of our hearts.
        </p>
      </div>

      {/* Spotify Player & Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center mb-12">
        {/* Left Column: Spotify Music Player Card */}
        <div className="md:col-span-6 flex flex-col items-center w-full">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-b from-neutral-900/95 via-neutral-950 to-black">
            {/* Spotify Player Top Header */}
            <div className="flex items-center justify-between mb-4 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center shadow-sm">
                  <Music size={11} className="text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Playing From Playlist</span>
                  <span className="text-xs font-semibold text-white">Boobuuu's Birthday Mix 💕</span>
                </div>
              </div>
              <button className="text-white/40 hover:text-white transition-colors" title="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Album Artwork: boobuu.jpeg */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl mb-5 group border border-white/10 bg-neutral-900">
              <img
                src="/assets/boobuu.jpeg"
                alt="Boobuuu"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center 20%' }}
              />
              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Playing Live Badge */}
              {isPlaying && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#1DB954]/50 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                  <span className="text-[10px] font-bold text-[#1DB954] tracking-wider uppercase">Live</span>
                </div>
              )}
            </div>

            {/* Track Info & Like Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="overflow-hidden pr-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white truncate mb-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-medium flex items-center gap-1.5">
                  <span>Boobuuu</span>
                  <span className="text-[#1DB954] text-[8px]">●</span>
                  <span>My Queen ❤️</span>
                </p>
              </div>
              <button
                onClick={toggleLike}
                className="p-2 rounded-full hover:bg-white/10 transition-transform active:scale-125"
                title={isLiked ? "Saved to your library" : "Save to library"}
              >
                <Heart
                  size={22}
                  className={isLiked ? "text-[#1DB954] fill-[#1DB954] transition-colors" : "text-white/50 hover:text-white transition-colors"}
                />
              </button>
            </div>

            {/* Progress Bar & Timestamps */}
            <div className="mb-4">
              <div
                onClick={handleProgressClick}
                className="w-full h-1.5 bg-white/15 rounded-full cursor-pointer relative group overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#1DB954] to-emerald-300 rounded-full transition-all duration-300"
                  style={{ width: `${(trackProgress / currentTrack.totalSeconds) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5 font-mono">
                <span>{formatTime(trackProgress)}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Spotify Playback Controls */}
            <div className="flex items-center justify-between px-2 mb-4">
              <button
                onClick={() => {
                  soundEngine.playHeartPop();
                  setIsShuffle(!isShuffle);
                }}
                className={`p-1.5 transition-colors ${isShuffle ? 'text-[#1DB954]' : 'text-white/50 hover:text-white'}`}
                title="Shuffle"
              >
                <Shuffle size={18} />
              </button>

              <button
                onClick={handlePrevTrack}
                className="p-1.5 text-white/70 hover:text-white transition-transform active:scale-90"
                title="Previous track"
              >
                <SkipBack size={22} />
              </button>

              <button
                onClick={handlePlayToggle}
                className="w-12 h-12 rounded-full bg-white text-black hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center transition-all p-3 cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={22} className="fill-black text-black" />
                ) : (
                  <Play size={22} className="fill-black text-black translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-1.5 text-white/70 hover:text-white transition-transform active:scale-90"
                title="Next track"
              >
                <SkipForward size={22} />
              </button>

              <button
                onClick={() => {
                  soundEngine.playHeartPop();
                  setIsRepeat(!isRepeat);
                }}
                className={`p-1.5 transition-colors ${isRepeat ? 'text-[#1DB954]' : 'text-white/50 hover:text-white'}`}
                title="Repeat"
              >
                <Repeat size={18} />
              </button>
            </div>

            {/* Bottom Spotify Device Connect Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#1DB954]">
              <div className="flex items-center gap-1.5 font-medium">
                <Laptop size={14} className="text-[#1DB954]" />
                <span>Listening on Boobuuu's Heart</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Share2 size={13} className="hover:text-white cursor-pointer transition-colors" title="Share" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Player Insights & Track List */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="glass-panel p-6 sm:p-8 border border-white/10 mb-6">
            <span className="text-xs uppercase tracking-widest text-pink-300 font-bold flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-yellow-400" /> Melody Insights
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {currentTrack.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mb-4">{currentTrack.vibe}</p>

            {/* Animated sound wave bars */}
            <div className="flex items-end gap-1 h-8 mb-6 py-1">
              {[40, 75, 55, 95, 60, 85, 45, 100, 65, 80, 50, 90, 70, 85].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 bg-gradient-to-t from-[#1DB954] to-pink-400 rounded-full transition-all ${isPlaying ? 'animate-pulse' : 'opacity-40'}`}
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    animationDuration: `${0.4 + (i % 5) * 0.15}s`
                  }}
                />
              ))}
            </div>

            {/* Romantic Quote */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 font-cursive text-xl text-pink-200">
              "{currentTrack.quote}"
            </div>

            {/* Quick playback control buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayToggle}
                className="btn-romantic text-base px-6 py-3 flex items-center gap-2"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                <span>{isPlaying ? "Pause Melody" : "Play Melody"}</span>
              </button>

              <button
                onClick={handleNextTrack}
                className="btn-glass text-sm px-4 py-3 text-white/80 hover:text-white flex items-center gap-1.5"
                title="Next Track"
              >
                <SkipForward size={18} />
                <span>Next</span>
              </button>
            </div>
          </div>

          {/* Track playlist */}
          <div className="flex flex-col gap-2">
            {tracks.map((t, idx) => {
              const isCurrent = currentTrackIndex === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`glass-panel p-3 px-4 flex items-center justify-between cursor-pointer transition-all rounded-xl ${isCurrent
                      ? 'border-[#1DB954]/60 bg-[#1DB954]/10 text-white'
                      : 'border-white/5 hover:bg-white/5 text-white/70'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Music size={16} className={isCurrent ? 'text-[#1DB954]' : 'text-white/40'} />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.title}</h4>
                      <p className="text-xs text-white/50">{t.tempo}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/40 font-mono">{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <button
        onClick={() => {
          soundEngine.playChime(850);
          onNext();
        }}
        className="btn-romantic text-base px-8 py-3.5 shadow-xl"
      >
        <span>Our Forever Promises & Bucket List</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
