import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw, Heart, ArrowRight, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import lottie from 'lottie-web/build/player/lottie_light';
import { soundEngine } from '../utils/audio';

export default function Page4BirthdayCake({ onNext }) {
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [userWish, setUserWish] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const lottieContainerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (lottieContainerRef.current) {
      animRef.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/Happy%20Birthday.json'
      });

      animRef.current.addEventListener('DOMLoaded', () => {
        setIsLoaded(true);
      });
    }

    return () => {
      animRef.current?.destroy();
    };
  }, []);

  const handleMakeWish = () => {
    soundEngine.playCandleBlow();
    setTimeout(() => {
      soundEngine.playCelebrationFanfare();

      // Grand celebration fireworks & confetti
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 45 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
          colors: ['#ff3366', '#fcd34d', '#ffe5ec', '#c084fc']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
          colors: ['#ff8fab', '#fbbf24', '#ffffff']
        });
      }, 250);

      setIsCelebrated(true);
    }, 600);
  };

  const handleRelight = () => {
    soundEngine.playHeartPop();
    setIsCelebrated(false);
    animRef.current?.goToAndPlay(0, true);
  };

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-start px-3 sm:px-4 pt-20 sm:pt-28 pb-20 sm:pb-24 overflow-hidden max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-2 sm:mb-3 border border-pink-400/30">
          <PartyPopper size={13} className="text-pink-300" />
          <span className="text-[11px] sm:text-xs uppercase tracking-wider text-pink-200 font-semibold">
            Chapter IV
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
          Make a <span className="text-gradient">Birthday Wish</span>
        </h2>
        <p className="text-white/70 text-xs sm:text-base leading-relaxed px-2">
          Close your eyes, think of the sweetest wish in your heart, and blow out the candles.
        </p>
      </div>

      {/* Main Lottie Birthday Showcase Card */}
      <div className="relative w-full max-w-2xl glass-panel p-4 sm:p-6 md:p-8 border border-pink-500/30 mb-8 flex flex-col items-center shadow-2xl">
        {/* Ambient Glow behind Lottie */}
        <div
          className="absolute -top-10 w-52 sm:w-80 h-52 sm:h-80 rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: isCelebrated
              ? 'radial-gradient(circle, rgba(255, 143, 171, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(252, 211, 77, 0.35) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        {/* Lottie Animation Display Container */}
        <div className="relative rounded-2xl overflow-hidden w-full max-w-md sm:max-w-lg mb-5 sm:mb-6 flex items-center justify-center min-h-[280px] sm:min-h-[380px] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 shadow-inner">
          <div
            ref={lottieContainerRef}
            className="w-full h-full max-w-[340px] sm:max-w-[420px] max-h-[360px] flex items-center justify-center p-2"
          />

          {/* Indicator Badge */}
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 glass-panel px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 flex items-center gap-1.5 border border-white/15">
            {isCelebrated ? (
              <>
                <Sparkles size={11} className="text-pink-400 animate-spin-slow" /> Wish Dispatched ✨
              </>
            ) : (
              <>
                <PartyPopper size={11} className="text-amber-400 animate-pulse" /> Birthday Celebration
              </>
            )}
          </div>
        </div>

        {/* Wish Typing & Action Section */}
        {!isCelebrated ? (
          <div className="w-full max-w-md flex flex-col items-center gap-3 sm:gap-4 px-1">
            <input
              type="text"
              placeholder="Whisper your wish here (or in your heart)..."
              value={userWish}
              onChange={(e) => setUserWish(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 text-xs sm:text-sm text-center shadow-inner"
            />

            <button
              onClick={handleMakeWish}
              className="btn-romantic text-sm sm:text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto shadow-xl group"
            >
              <Wind size={18} className="group-hover:translate-x-1 transition-transform" />
              <span>Blow Out The Candles & Make A Wish! 🎂</span>
            </button>
          </div>
        ) : (
          /* Wish Granted Reveal Parchment */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-pink-500/10 to-purple-500/10 border border-amber-300/30 text-center"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-2.5 sm:mb-3">
              <Sparkles size={20} className="animate-spin-slow" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200 mb-1.5">
              May All Your Dreams Come True! 🌟
            </h3>

            {userWish ? (
              <p className="font-cursive text-lg sm:text-xl text-pink-200 mb-3">
                "Wish sealed: {userWish}"
              </p>
            ) : (
              <p className="font-cursive text-lg sm:text-xl text-pink-200 mb-3">
                "Your heart's secret wish has flown to the stars."
              </p>
            )}

            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
              I promise to do everything in my power to bring joy, warmth, comfort, and silly laughter into your life every single day. You deserve the entire world and all the sweetest happiness in it!
            </p>

            <button
              onClick={handleRelight}
              className="btn-glass text-xs px-4 py-2 text-white/70 hover:text-white"
            >
              <RotateCcw size={13} />
              <span>Make Another Wish</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Next Step CTA */}
      <button
        onClick={() => {
          soundEngine.playChime(850);
          onNext();
        }}
        className="btn-romantic text-sm sm:text-base px-6 sm:px-8 py-3.5 shadow-xl w-full sm:w-auto"
      >
        <span>Listen To Our Love Jukebox</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
