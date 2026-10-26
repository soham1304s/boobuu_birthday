import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Clock, ArrowRight, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function Page1Gateway({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const loveQuotes = [
    "You are my favorite place to go when my mind searches for peace.",
    "In a sky full of stars, my eyes will always search for you.",
    "Every love story is special, but our crazy, gentle, sweet love is my favorite.",
    "Loving you is the easiest and most magical thing I've ever done."
  ];

  // Relationship duration counter (live updates starting from 158 days, 11 hours, 57 minutes, 0 seconds)
  const [timeTogether, setTimeTogether] = useState({
    days: 158,
    hours: 11,
    minutes: 57,
    seconds: 0
  });

  useEffect(() => {
    // Live ticking timer
    const timer = setInterval(() => {
      setTimeTogether((prev) => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        let hr = prev.hours;
        let d = prev.days;

        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        if (min >= 60) {
          min = 0;
          hr += 1;
        }
        if (hr >= 24) {
          hr = 0;
          d += 1;
        }
        return { days: d, hours: hr, minutes: min, seconds: sec };
      });
    }, 1000);

    // Quote rotation
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const handleOpenEnvelope = () => {
    soundEngine.playHeartPop();
    soundEngine.playChime(720);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff8fab', '#fcd34d', '#ffffff']
    });
    setIsOpen(true);
  };

  const handleProceed = () => {
    soundEngine.playChime(880);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff8fab', '#fcd34d', '#ff3366']
    });
    onNext();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Royal Love Envelope */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-lg w-full text-center"
          >
            {/* Ambient Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border border-pink-500/30">
              <Sparkles size={16} className="text-yellow-300 animate-spin-slow" />
              <span className="text-sm font-medium tracking-wide text-pink-200">
                A Special Delivery For My Favorite Person
              </span>
            </div>

            {/* Interactive Envelope Card */}
            <div
              onClick={handleOpenEnvelope}
              className="glass-panel w-full p-8 md:p-12 cursor-pointer group transition-all duration-500 hover:scale-[1.02] relative"
              style={{
                background: 'linear-gradient(135deg, rgba(35, 15, 55, 0.7), rgba(15, 6, 25, 0.85))',
                border: '1px solid rgba(255, 143, 171, 0.35)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 51, 102, 0.25)'
              }}
            >
              {/* Wax Seal / Heart Emblem */}
              <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-1 flex items-center justify-center shadow-lg shadow-pink-500/40 group-hover:shadow-pink-500/70 transition-shadow">
                <div className="w-full h-full rounded-full bg-neutral-900/80 flex items-center justify-center backdrop-blur-md">
                  <Heart size={44} className="text-pink-400 fill-pink-500/60 animate-pulse-glow" />
                </div>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
                To My Dearest <span className="text-gradient">Boobuuu</span>
              </h2>

              <p className="text-white/70 font-sans text-sm md:text-base mb-8 max-w-sm mx-auto">
                Today is all about celebrating the most radiant, wonderful, and lovable human in the universe.
              </p>

              <button className="btn-romantic w-full sm:w-auto text-base">
                <Mail size={18} />
                <span>Tap to Open Your Birthday Letter</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Opened Grand Reveal */
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-4xl w-full text-center"
          >
            {/* Floating Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 border border-pink-400/30"
            >
              <Stars size={16} className="text-amber-300 animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-pink-200 uppercase">
                Happy Birthday, Queen of My Heart
              </span>
            </motion.div>

            {/* Grand Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-none">
              Happy Birthday, <br />
              <span className="text-gradient drop-shadow-lg">My Precious Boobuuu</span> ❤️
            </h1>

            {/* Rotating Romantic Quotes */}
            <div className="h-16 flex items-center justify-center mb-8 px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="font-cursive text-2xl md:text-3xl text-pink-200 max-w-2xl"
                >
                  "{loveQuotes[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Main Visual & Counter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-center mb-10 text-left">
              {/* Romantic Hero Artwork */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="md:col-span-7 rounded-2xl overflow-hidden glass-panel border border-pink-500/20 relative group shadow-2xl shadow-pink-900/30"
              >
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src="/assets/hero_romance.jpg"
                    alt="Under The Stars Together"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-serif text-lg font-bold flex items-center gap-2">
                      <Heart size={18} className="text-rose-500 fill-rose-500" />
                      Two Souls, One Universe
                    </p>
                    <p className="text-xs text-white/80">Every day with you is my sweetest adventure.</p>
                  </div>
                </div>
              </motion.div>

              {/* Relationship Counter & Stats Card */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="glass-panel p-6 border border-white/10">
                  <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm mb-3">
                    <Clock size={16} />
                    <span>Time Spent Adoring You</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <div className="font-serif text-2xl md:text-3xl font-bold text-white">{timeTogether.days}</div>
                      <div className="text-[10px] uppercase tracking-wider text-pink-200/70">Days</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <div className="font-serif text-2xl md:text-3xl font-bold text-white">{timeTogether.hours}</div>
                      <div className="text-[10px] uppercase tracking-wider text-pink-200/70">Hours</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <div className="font-serif text-2xl md:text-3xl font-bold text-white">{timeTogether.minutes}</div>
                      <div className="text-[10px] uppercase tracking-wider text-pink-200/70">Mins</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <div className="font-serif text-2xl md:text-3xl font-bold text-rose-400 animate-pulse">{timeTogether.seconds}</div>
                      <div className="text-[10px] uppercase tracking-wider text-pink-200/70">Secs</div>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 mt-3 text-center">
                    ...and I'd choose you in every single lifetime.
                  </p>
                </div>

                {/* Romantic Highlights Badge */}
                <div className="glass-panel p-5 border border-white/10 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-rose-500/20 text-rose-400">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">A Year of Joy Ahead</h4>
                    <p className="text-xs text-white/70">Here's to laughter, endless hugs, and making your wildest wishes come true.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleProceed}
                className="btn-romantic text-base px-8 py-4 shadow-xl"
              >
                <span>Walk Down Memory Lane</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
