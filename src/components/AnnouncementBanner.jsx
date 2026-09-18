import React, { useState, useEffect } from 'react';

export const AnnouncementBanner = ({ onNavigate, activeLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isVi = activeLang === 'vi';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || (window.lenis ? window.lenis.scroll : 0);
      setIsScrolled(scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  const badgeText = 'AEVUM OS v1.0.0-BETA.0';
  const mainMessage = isVi
    ? 'Bản test đầu tiên đã chính thức được công khai cho cả macOS & Windows'
    : 'First public beta is now officially available for macOS & Windows';
  const ctaText = isVi ? 'Tải xuống ngay' : 'Download now';

  const itemContent = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center gap-4 px-8 shrink-0">
      <span className="announcement-badge text-cyan-400 font-mono text-[11px] font-bold tracking-wider uppercase">
        {badgeText}
      </span>

      <span className="announcement-divider text-slate-600 font-mono text-xs select-none">/</span>

      <span className="announcement-text text-xs font-mono text-slate-300">
        {mainMessage}
      </span>

      <span className="announcement-cta text-xs font-mono font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
        {ctaText} &rarr;
      </span>

      <span className="announcement-emdash text-slate-700 font-mono text-xs select-none pl-4">—</span>
    </div>
  );

  return (
    <div
      role="button"
      tabIndex={isScrolled ? -1 : 0}
      onClick={() => onNavigate && onNavigate('changelog')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate && onNavigate('changelog');
        }
      }}
      className={`announcement-banner group relative w-full overflow-hidden bg-[#060b13] cursor-pointer select-none transition-all duration-300 ease-in-out hover:bg-[#09121f] ${
        isScrolled
          ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          : 'max-h-12 opacity-100 py-2 border-b border-cyan-500/25 pointer-events-auto'
      }`}
      title={isVi ? "Bấm để xem nhật ký cập nhật & tải về" : "Click to view changelog & download"}
    >
      {/* Edge Fade Gradients for smooth infinite sliding */}
      <div className="announcement-fade-left absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060b13] to-transparent z-10 pointer-events-none" />
      <div className="announcement-fade-right absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060b13] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Running Marquee */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {itemContent('item-1')}
        {itemContent('item-2')}
        {itemContent('item-3')}
        {itemContent('item-4')}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
