import React, { useState, useEffect } from 'react';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isPast = window.scrollY > 400;
          setVisible((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-9 h-9 sm:w-11 sm:h-11 bg-[#0B0B11]/90 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/15 rounded-sm shadow-2xl transition-all duration-200 group cursor-pointer flex items-center justify-center active:scale-95"
    >
      {/* Pure SVG Chevron Up Arrow */}
      <svg 
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
