import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, SkipForward, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function AudioWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showPanel, setShowPanel] = useState(false);

  const tracks = soundEngine.tracks;

  const toggleMusic = () => {
    soundEngine.playChime(660);
    const playing = soundEngine.toggleMusic();
    setIsPlaying(playing);
  };

  const nextTrack = () => {
    soundEngine.playChime(880);
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      soundEngine.stopMusic();
      soundEngine.startMusic(nextIdx);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  useEffect(() => {
    return () => {
      soundEngine.stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Expanded Track Info & Controls */}
      {showPanel && (
        <div
          className="glass-panel p-4 flex items-center gap-4 transition-all duration-300 animate-float"
          style={{
            background: 'rgba(20, 10, 30, 0.85)',
            boxShadow: '0 8px 32px rgba(255, 51, 102, 0.35)',
            border: '1px solid rgba(255, 143, 171, 0.3)'
          }}
        >
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-pink-300 font-semibold flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-400" /> Romantic Soundtrack
            </span>
            <span className="text-sm font-serif font-bold text-white max-w-[150px] truncate">
              {tracks[currentTrackIndex].title}
            </span>
            <span className="text-xs text-white/60">
              {tracks[currentTrackIndex].artist}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={nextTrack}
              title="Next Track"
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <SkipForward size={16} />
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
              title="Volume"
            />
          </div>
        </div>
      )}

      {/* Main floating music toggle button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowPanel(true)}
        className="relative group p-3.5 rounded-full glass-panel flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(255, 51, 102, 0.9), rgba(192, 132, 252, 0.9))'
            : 'rgba(30, 15, 45, 0.85)',
          boxShadow: isPlaying ? '0 0 25px rgba(255, 51, 102, 0.6)' : '0 4px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}
        title={isPlaying ? "Pause Music" : "Play Romantic Music"}
      >
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-5 px-0.5">
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '85%', animationDelay: '75ms' }} />
          </div>
        ) : (
          <Music size={20} className="text-pink-300 group-hover:text-white transition-colors" />
        )}

        {/* Pulsing ring indicator when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-pink-400/50 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
}
