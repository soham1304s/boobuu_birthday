import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, MapPin, X, Sparkles, ArrowRight, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

export default function Page2Memories({ onNext }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalMemory, setActiveModalMemory] = useState(null);
  const [likes, setLikes] = useState({});

  const categories = ['All', 'Sweet Dates', 'Adventures', 'Little Moments'];

  const memories = [
    {
      id: 1,
      title: "Our Railway Station Meeting",
      category: "Sweet Dates",
      date: "May 21",
      location: "Railway Station Platform",
      image: "/assets/memories_cafe.jpg",
      caption: "Crowded trains, noisy announcements, and my eyes only on you 🚂💖",
      story: "The station was buzzing with the rush of trains and moving crowds, but the second you walked onto the platform, everything turned into slow motion. You had that shy, adorable smile, and my heart skipped every single beat. Standing close under the station shed, taking this cute selfie together, and feeling your warmth made that noisy platform feel like our own quiet little world. No journey could ever be as magical as being with you.",
      rotation: -2
    },
    {
      id: 2,
      title: "Our First Hangout",
      category: "Sweet Dates",
      date: "July 22",
      location: "Cozy Warm Corner",
      image: "/assets/memories_beach.jpg",
      caption: "Warm amber lights, shy giggles, and time flying way too fast ✨",
      story: "I still remember the happy butterflies in my stomach before we met up. Sitting together under the cozy glowing lights, all my shyness melted into effortless laughter, endless stories, and sweet glances. Hours felt like mere minutes because being around you just felt so natural and warm. Taking this cute selfie together sealed a day that will forever hold the softest place in my heart.",
      rotation: 3
    },
    {
      id: 3,
      title: "Our First Meet Up",
      category: "Sweet Dates",
      date: "November 05",
      location: "Where It All Began",
      image: "/assets/hero_romance.jpg",
      caption: "The sunny afternoon when my favorite love story began ☀️💖",
      story: "I will never forget the exact moment our eyes met for the very first time. The sun was shining bright, cars were passing by, but the entire world paused just for us. Walking side by side, putting my arm around your shoulder for the first time, and seeing your adorable shy smile made my heart melt completely. That was the day my life got infinitely sweeter.",
      rotation: -3
    },
    {
      id: 4,
      title: "Another Sweet Meet Up",
      category: "Sweet Dates",
      date: "September 29",
      location: "Together Again",
      image: "/assets/lanterns_future.jpg",
      caption: "Every time I see you, I fall in love all over again 💑✨",
      story: "By this meet up, all the initial shyness had turned into pure comfort and warmth. Leaning our heads together, sharing quiet whispers, and smiling without any reason at all... being close to you felt like the safest and sweetest place in the world. No matter how many times we meet, my heart still does that little flutter every single time you look at me.",
      rotation: 2
    }
  ];

  const filteredMemories = selectedCategory === 'All'
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  const handleOpenMemory = (memory) => {
    soundEngine.playChime(640);
    setActiveModalMemory(memory);
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    soundEngine.playHeartPop();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff8fab']
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 pt-28 pb-24 overflow-hidden max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-3 border border-pink-400/30">
          <Sparkles size={14} className="text-yellow-300" />
          <span className="text-xs uppercase tracking-wider text-pink-200 font-semibold">Chapter II</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
          Our Constellation of <span className="text-gradient">Memories</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          Every single second with you is a treasure I hold close to my chest. Tap any polaroid to revisit the memory.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundEngine.playChime(500);
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === cat
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 border border-rose-400'
                : 'glass-panel text-white/70 hover:text-white hover:bg-white/10'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Polaroid Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-12"
      >
        <AnimatePresence>
          {filteredMemories.map((mem) => {
            const count = likes[mem.id] || 0;
            return (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpenMemory(mem)}
                className="polaroid-card group relative"
                style={{ transform: `rotate(${mem.rotation}deg)` }}
              >
                {/* Vintage Tape / Pin decoration */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/40 backdrop-blur-sm border border-white/60 rotate-2 rounded-sm shadow-sm z-10" />

                <div className="polaroid-img-wrapper relative">
                  <img src={mem.image} alt={mem.title} />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                    <span className="glass-panel px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                      <Eye size={14} /> Relive Memory
                    </span>
                  </div>
                </div>

                <div className="polaroid-caption">{mem.title}</div>

                <div className="flex items-center justify-between mt-3 px-1 text-xs text-neutral-600 font-sans border-t border-neutral-200/80 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-rose-500" /> {mem.date}
                  </span>

                  {/* Like button */}
                  <button
                    onClick={(e) => handleLike(mem.id, e)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
                  >
                    <Heart size={14} className={count > 0 ? "fill-rose-500 text-rose-500" : ""} />
                    <span className="font-semibold">{count > 0 ? count : ""}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Next Step CTA */}
      <button
        onClick={() => {
          soundEngine.playChime(750);
          onNext();
        }}
        className="btn-romantic text-base px-8 py-3.5 shadow-xl"
      >
        <span>Unlock My Secret Love Vault</span>
        <ArrowRight size={18} />
      </button>

      {/* Intimate Memory Lightbox Modal */}
      <AnimatePresence>
        {activeModalMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel max-w-2xl w-full p-6 md:p-8 relative border border-white/20 bg-neutral-950/90 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundEngine.playChime(400);
                  setActiveModalMemory(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-xl overflow-hidden shadow-lg aspect-square">
                  <img
                    src={activeModalMemory.image}
                    alt={activeModalMemory.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-pink-300 font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {activeModalMemory.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {activeModalMemory.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-white mb-3">
                      {activeModalMemory.title}
                    </h3>

                    <p className="font-cursive text-xl text-pink-200 mb-4">
                      "{activeModalMemory.caption}"
                    </p>

                    <p className="text-white/80 text-sm leading-relaxed">
                      {activeModalMemory.story}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/50">Stored in our forever heart 💫</span>
                    <button
                      onClick={(e) => handleLike(activeModalMemory.id, e)}
                      className="btn-romantic text-xs px-4 py-2"
                    >
                      <Heart size={14} className="fill-white" />
                      <span>Send Love</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
