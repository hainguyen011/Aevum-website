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
      title="Lên đầu trang (Scroll to top)"
      className="fixed bottom-4 sm:bottom-6 docked-right-seam z-40 w-[38px] h-[38px] bg-[#07080E]/95 [html[data-theme='light']_&]:bg-white/95 backdrop-blur-md border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 hover:border-cyan-400/50 [html[data-theme='light']_&]:hover:border-cyan-500/60 text-slate-300 [html[data-theme='light']_&]:text-slate-600 hover:text-cyan-400 [html[data-theme='light']_&]:hover:text-cyan-600 rounded-md shadow-2xl [html[data-theme='light']_&]:shadow-md transition-all duration-200 group cursor-pointer flex items-center justify-center active:scale-95"
    >
      {/* Pure SVG Chevron Up Arrow */}
      <svg 
        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" 
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
