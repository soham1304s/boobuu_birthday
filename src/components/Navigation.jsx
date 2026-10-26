import React from 'react';
import { Sparkles, Image, Heart, Cake, Disc3, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function Navigation({ currentPage, setCurrentPage, totalPages }) {
  const navItems = [
    { id: 0, title: "Gateway", icon: Sparkles, tag: "Cosmic Intro" },
    { id: 1, title: "Memories", icon: Image, tag: "Our Moments" },
    { id: 2, title: "Love Vault", icon: Heart, tag: "Why I Love You" },
    { id: 3, title: "The Cake", icon: Cake, tag: "Make a Wish" },
    { id: 4, title: "Jukebox", icon: Disc3, tag: "Our Melody" },
    { id: 5, title: "Promises", icon: Compass, tag: "Forever Ours" },
  ];

  const handleNavClick = (idx) => {
    soundEngine.playChime(500 + idx * 80);
    setCurrentPage(idx);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      soundEngine.playChime(600);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      soundEngine.playChime(800);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <header className="fixed top-2 sm:top-5 left-0 right-0 z-50 flex justify-center items-center px-2 sm:px-4 pointer-events-none">
      <nav 
        className="glass-panel pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 p-1.5 sm:p-2 max-w-2xl w-full"
        style={{
          background: 'rgba(15, 8, 25, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 51, 102, 0.2)'
        }}
      >
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="nav-arrow-btn p-2 rounded-full flex items-center justify-center shrink-0"
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-tab-btn ${isActive ? 'active' : ''} px-2.5 sm:px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-medium shrink-0`}
                aria-label={item.title}
              >
                <Icon
                  size={15}
                  className={isActive ? 'text-yellow-300 animate-pulse' : 'text-pink-300'}
                />
                <span className="nav-item-title">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="nav-arrow-btn p-2 rounded-full flex items-center justify-center shrink-0"
          title="Next Page (Right Arrow)"
          aria-label="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </header>
  );
}
