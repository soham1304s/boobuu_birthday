import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2, Circle, Plus, Heart, Sparkles, Printer, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function Page6Promises({ onRestart }) {
  const [bucketList, setBucketList] = useState([
    { id: 1, text: "Watch the Northern Lights wrapped in a fluffy blanket together", completed: true },
    { id: 2, text: "Travel to Japan during cherry blossom season and eat street ramen", completed: false },
    { id: 3, text: "Bake a chaotic midnight pizza from scratch with flour on our noses", completed: true },
    { id: 4, text: "Rent a secluded cabin in the woods with a fireplace and zero phone service", completed: false },
    { id: 5, text: "Adopt a cute fluffy golden puppy and take him on beach walks", completed: false },
    { id: 6, text: "Grow old together, tell silly dad jokes, and love each other more every day", completed: true },
  ]);

  const [newWish, setNewWish] = useState('');
  const [isCertificateSealed, setIsCertificateSealed] = useState(false);

  const toggleItem = (id) => {
    soundEngine.playHeartPop();
    setBucketList(prev => prev.map(item => {
      if (item.id === id) {
        if (!item.completed) {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#ff3366', '#fcd34d']
          });
        }
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newWish.trim()) return;
    soundEngine.playChime(700);
    setBucketList(prev => [
      ...prev,
      { id: Date.now(), text: newWish.trim(), completed: false }
    ]);
    setNewWish('');
  };

  const handleSealCertificate = () => {
    soundEngine.playCelebrationFanfare();
    setIsCertificateSealed(true);
    // Grand fireworks burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff3366', '#fcd34d', '#ff8fab', '#ffffff']
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleLaunchFireworks = () => {
    soundEngine.playCelebrationFanfare();
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff3366', '#fcd34d'] });
    fire(0.2, { spread: 60, colors: ['#ff8fab', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#c084fc', '#fcd34d'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ff3366'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 pb-24 overflow-hidden max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-3 border border-pink-400/30">
          <Compass size={14} className="text-pink-300" />
          <span className="text-xs uppercase tracking-wider text-pink-200 font-semibold">Final Chapter</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          Our Future & <span className="text-gradient">Forever Promises</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          The best days of our lives are still ahead of us. Here are our dreams, forever written in the stars.
        </p>
      </div>

      {/* Grid: Bucket list and Future Artwork */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-14">
        {/* Bucket List Items */}
        <div className="md:col-span-7 glass-panel p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" />
              Our Couple's Dream Bucket List
            </h3>
            <p className="text-xs text-white/60 mb-6">Tap any item to mark it as completed or add your own:</p>

            <div className="flex flex-col gap-3 mb-6">
              {bucketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${item.completed
                      ? 'bg-rose-500/15 border-rose-500/40 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {item.completed ? (
                    <CheckCircle2 size={20} className="text-rose-400 shrink-0" />
                  ) : (
                    <Circle size={20} className="text-white/40 shrink-0" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${item.completed ? 'line-through text-white/60' : ''}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add a wish input */}
          <form onSubmit={handleAddWish} className="flex gap-2 pt-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Add another dream to our list..."
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 text-xs sm:text-sm"
            />
            <button type="submit" className="btn-romantic text-xs px-4 py-2.5 shrink-0">
              <Plus size={16} />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Future Visual Artwork */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="rounded-3xl overflow-hidden glass-panel border border-pink-500/30 relative group shadow-2xl">
            <img
              src="/assets/lanterns_future.jpg"
              alt="Releasing Lanterns into Future"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="font-cursive text-2xl text-pink-200 mb-1">
                "Where you go, I go. Forever."
              </p>
              <p className="text-xs text-white/70 font-sans">
                No matter where this journey takes us, having your hand in mine is all I will ever need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate of Eternal Love */}
      <div
        className="w-full max-w-2xl glass-panel p-8 sm:p-12 border-2 border-amber-300/40 relative text-center rounded-3xl shadow-2xl mb-12"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 15, 45, 0.9), rgba(12, 6, 22, 0.95))',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(252, 211, 77, 0.15)'
        }}
      >
        {/* Ornate Gold Border Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300/60 rounded-tl" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300/60 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/60 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/60 rounded-br" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles size={14} /> Official Certificate of Eternal Devotion
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Forever Awarded to <span className="text-gradient">Boobuuu</span> ❤️
        </h3>

        <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto mb-8 font-sans leading-relaxed">
          This document certifies that the bearer is undeniably the most loved, cherished, and treasured soul in this entire universe. Guaranteed lifetime affection, endless forehead kisses, midnight snacks, and unconditional warmth.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs mb-8 p-4 rounded-xl bg-white/5 border border-white/10 font-sans">
          <div>
            <span className="text-white/50 block text-[10px] uppercase">Issued By:</span>
            <span className="font-bold text-white">Your Biggest Admirer</span>
          </div>
          <div>
            <span className="text-white/50 block text-[10px] uppercase">Valid Until:</span>
            <span className="font-bold text-pink-300">End of Time & Eternity</span>
          </div>
        </div>

        {/* Wax Seal / Signature */}
        <div className="flex flex-col items-center justify-center gap-3">
          {!isCertificateSealed ? (
            <button
              onClick={handleSealCertificate}
              className="btn-romantic text-sm px-6 py-3"
            >
              <Heart size={16} className="fill-white" />
              <span>Seal Certificate With A Heart</span>
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-300 p-1 flex items-center justify-center shadow-lg shadow-rose-500/50">
                <div className="w-full h-full rounded-full bg-neutral-900 flex flex-col items-center justify-center text-center">
                  <Heart size={28} className="text-rose-400 fill-rose-500" />
                  <span className="text-[8px] font-bold uppercase text-amber-200">SEALED</span>
                </div>
              </div>
              <span className="font-cursive text-2xl text-pink-300 mt-2">Forever & Always Yours</span>
            </motion.div>
          )}

          {isCertificateSealed && (
            <button
              onClick={handlePrintCertificate}
              className="btn-glass text-xs px-4 py-2 mt-4 text-white/70 hover:text-white"
            >
              <Printer size={14} />
              <span>Print / Save Keepsake</span>
            </button>
          )}
        </div>
      </div>

      {/* Grand Finale Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleLaunchFireworks}
          className="btn-romantic text-base px-8 py-4 shadow-2xl"
        >
          <Sparkles size={20} className="text-yellow-300" />
          <span>Launch Celebration Fireworks! 🎆</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime(600);
            onRestart();
          }}
          className="btn-glass text-sm px-6 py-4"
        >
          <RotateCcw size={16} />
          <span>Replay From Beginning</span>
        </button>
      </div>
    </div>
  );
}
