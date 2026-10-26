import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicBackground from './components/CosmicBackground';
import Navigation from './components/Navigation';
import AudioWidget from './components/AudioWidget';
import Page1Gateway from './pages/Page1Gateway';
import Page2Memories from './pages/Page2Memories';
import Page3LoveVault from './pages/Page3LoveVault';
import Page4BirthdayCake from './pages/Page4BirthdayCake';
import Page5Jukebox from './pages/Page5Jukebox';
import Page6Promises from './pages/Page6Promises';

const TOTAL_PAGES = 6;

// Animation variants for smooth page transitions
const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.98,
    filter: 'blur(8px)'
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.98,
    filter: 'blur(8px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToPage = (newPage) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < TOTAL_PAGES - 1) {
        goToPage(currentPage + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPage(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-white selection:bg-rose-500 selection:text-white">
      {/* Background with stars, nebula glows, and heart embers */}
      <CosmicBackground />

      {/* Floating Navigation Header */}
      <Navigation
        currentPage={currentPage}
        setCurrentPage={goToPage}
        totalPages={TOTAL_PAGES}
      />

      {/* Main Animated Page Content */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex flex-col items-center flex-1"
          >
            {currentPage === 0 && (
              <Page1Gateway onNext={() => goToPage(1)} />
            )}
            {currentPage === 1 && (
              <Page2Memories onNext={() => goToPage(2)} />
            )}
            {currentPage === 2 && (
              <Page3LoveVault onNext={() => goToPage(3)} />
            )}
            {currentPage === 3 && (
              <Page4BirthdayCake onNext={() => goToPage(4)} />
            )}
            {currentPage === 4 && (
              <Page5Jukebox onNext={() => goToPage(5)} />
            )}
            {currentPage === 5 && (
              <Page6Promises onRestart={() => goToPage(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Romantic Music Widget */}
      <AudioWidget />

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-white/40 pointer-events-none">
        <p className="font-cursive text-lg text-pink-300/80 mb-1">
          Made with infinite love for Boobuuu ❤️
        </p>
        <p className="font-sans text-[11px] tracking-wider uppercase">
          Happy Birthday • Forever & Always
        </p>
      </footer>
    </div>
  );
}
