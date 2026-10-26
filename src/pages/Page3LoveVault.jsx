import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock, Sparkles, Smile, MessageCircle, Star, ArrowRight, Flame, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function Page3LoveVault({ onNext }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [lovePercentage, setLovePercentage] = useState(100);
  const [secretAnswer, setSecretAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [vaultError, setVaultError] = useState(false);

  const reasons = [
    {
      id: 1,
      frontIcon: Smile,
      frontTitle: "Your Radiant Smile",
      backTitle: "It Lights Up My Entire Universe",
      backDesc: "No matter how dark or exhausting the day was, one glance at your genuine smile instantly melts every worry away."
    },
    {
      id: 2,
      frontIcon: Heart,
      frontTitle: "Your Pure Heart",
      backTitle: "The Gentlest Soul I Know",
      backDesc: "The immense empathy, kindness, and love you pour into everyone around you inspires me to be a better person every single day."
    },
    {
      id: 3,
      frontIcon: MessageCircle,
      frontTitle: "Our Late-Night Talks",
      backTitle: "Time Disappears With You",
      backDesc: "From talking about deep life philosophies to giggling over silly memes at 2:00 AM, every second with you feels like home."
    },
    {
      id: 4,
      frontIcon: Star,
      frontTitle: "Your Fierce Support",
      backTitle: "My Number One Believer",
      backDesc: "Even in moments when I doubt myself, your unwavering belief in me gives me wings. You are my safe harbor."
    },
    {
      id: 5,
      frontIcon: Eye,
      frontTitle: "Your Innocent Eyes",
      backTitle: "The Purest Windows to Your Soul",
      backDesc: "Whenever you look at me with those sweet, innocent eyes, my heart completely melts. There is so much warmth, gentle softness, and magic in your gaze that I could happily get lost in them forever."
    },
    {
      id: 6,
      frontIcon: Sparkles,
      frontTitle: "Simply Being YOU",
      backTitle: "My Once In A Lifetime",
      backDesc: "You don't need to try or pretend. Just you existing, breathing, and loving me is the greatest gift fate has ever given me."
    }
  ];

  const toggleFlip = (id) => {
    soundEngine.playHeartPop();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setLovePercentage(val);
    if (val === 1000) {
      soundEngine.playCelebrationFanfare();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#fcd34d', '#ff8fab']
      });
    }
  };

  const getLoveLevelText = () => {
    if (lovePercentage < 300) return "More than all the stars in our galaxy! 🌌";
    if (lovePercentage < 700) return "To the edge of the universe and back ten thousand times! 🚀";
    if (lovePercentage < 1000) return "Beyond human comprehension! Pure unconditional devotion! 🔥";
    return "INFINITE ERROR: LOVE SYSTEM OVERLOAD! ❤️ (Infinity & Beyond)";
  };

  const handleUnlockVault = (e) => {
    e.preventDefault();
    const clean = secretAnswer.trim().toLowerCase();
    if (clean === 'boobuu' || clean === 'boobuuu' || clean === 'me' || clean === 'you' || clean === 'us') {
      soundEngine.playCelebrationFanfare();
      setIsUnlocked(true);
      setVaultError(false);
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ff3366', '#fcd34d', '#ffe5ec', '#c084fc']
      });
    } else {
      soundEngine.playChime(300);
      setVaultError(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 pb-24 overflow-hidden max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-3 border border-pink-400/30">
          <Heart size={14} className="text-rose-400 fill-rose-400" />
          <span className="text-xs uppercase tracking-wider text-pink-200 font-semibold">Chapter III</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          Why You Have <span className="text-gradient">My Whole Heart</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          There are a billion reasons, but here are just a few. Tap each card to uncover the truth behind it.
        </p>
      </div>

      {/* 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16">
        {reasons.map((item) => {
          const Icon = item.frontIcon;
          const isFlipped = flippedCards[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front glass-panel border border-white/10 group hover:border-pink-500/40">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300 mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{item.frontTitle}</h3>
                  <span className="text-xs text-white/50 flex items-center gap-1 mt-4">
                    <Sparkles size={12} className="text-yellow-400" /> Tap to reveal note
                  </span>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <Heart size={28} className="text-rose-400 fill-rose-400 mb-3" />
                  <h4 className="font-serif text-lg font-bold text-pink-200 mb-2">{item.backTitle}</h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">{item.backDesc}</p>
                  <span className="text-[10px] text-white/40 mt-4">Tap to flip back</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Love Percentage Meter */}
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 mb-16 border border-pink-500/30 text-center">
        <h3 className="font-serif text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Heart size={22} className="text-rose-500 fill-rose-500 animate-pulse" />
          The Official "How Much I Love You" Meter
        </h3>
        <p className="text-xs text-white/60 mb-6">Drag the slider to calculate our emotional magnitude:</p>

        {/* Big percentage display */}
        <div className="flex justify-center items-center">
          <div className="love-meter-number">
            {lovePercentage}%
          </div>
        </div>
        <div className="text-lg sm:text-xl font-semibold text-pink-200 mb-6 font-cursive">
          {getLoveLevelText()}
        </div>

        <input
          type="range"
          min="100"
          max="1000"
          step="25"
          value={lovePercentage}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, #ff3366 0%, #ff758f ${((lovePercentage - 100) / 900) * 100}%, rgba(255, 255, 255, 0.2) ${((lovePercentage - 100) / 900) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
          }}
          className="love-range-slider mb-2"
        />
        <div className="flex justify-between text-[11px] text-white/50 mt-2 font-medium">
          <span>100% (A lot)</span>
          <span>500% (Galaxy)</span>
          <span>1000% (Infinite Love)</span>
        </div>
      </div>

      {/* Secret Love Vault */}
      <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 border border-white/10 text-center relative overflow-hidden">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
          {isUnlocked ? <Unlock size={26} className="text-yellow-400" /> : <Lock size={26} />}
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          {isUnlocked ? "The Vault Has Opened!" : "Secret Love Vault"}
        </h3>
        <p className="text-xs sm:text-sm text-white/70 mb-6 max-w-md mx-auto">
          {isUnlocked
            ? "Your birthday whisper letter has been decrypted from the heart."
            : "Answer this question to unlock an exclusive classified birthday message:"}
        </p>

        {!isUnlocked ? (
          <form onSubmit={handleUnlockVault} className="max-w-md mx-auto flex flex-col gap-3">
            <p className="text-sm font-semibold text-pink-200 mb-1">
              "Who is the prettiest, sweetest, most adored person alive?"
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter nickname or answer..."
                value={secretAnswer}
                onChange={(e) => setSecretAnswer(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 text-sm text-center"
              />
              <button type="submit" className="btn-romantic text-xs px-5 py-2.5">
                Unlock
              </button>
            </div>
            {vaultError && (
              <p className="text-xs text-rose-400 mt-1">Hint: Type "Boobuu" or "Me" 😉</p>
            )}
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl bg-white/5 border border-pink-500/30 text-left font-serif"
          >
            <p className="text-xs uppercase tracking-widest text-pink-300 font-sans font-bold mb-2">Classified Birthday Whisper:</p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans mb-4">
              "My dearest Boobuu, when I look back at my life before you, everything was in black and white. You brought vibrant color, sweet warmth, and peace into my world. Thank you for choosing to share your precious life with me. I promise to cherish, protect, and make you laugh every single day of this new year."
            </p>
            <p className="text-right font-cursive text-2xl text-pink-300">Forever & Always Yours ❤️</p>
          </motion.div>
        )}
      </div>

      {/* Next Page CTA */}
      <div className="mt-12">
        <button
          onClick={() => {
            soundEngine.playChime(800);
            onNext();
          }}
          className="btn-romantic text-base px-8 py-3.5 shadow-xl"
        >
          <span>Time for Birthday Cake & Wishing Ceremony</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
