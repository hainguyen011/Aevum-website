import React from 'react';

export const AnnouncementBanner = ({ onNavigate, activeLang }) => {
  const isVi = activeLang === 'vi';

  const badgeText = 'AEVUM OS v1.0.0-BETA.0';
  const mainMessage = isVi
    ? 'Bản test đầu tiên đã chính thức được công khai cho cả macOS & Windows'
    : 'First public beta is now officially available for macOS & Windows';
  const ctaText = isVi ? 'Tải xuống ngay' : 'Download now';

  const itemContent = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center gap-4 px-8 shrink-0">
      <span className="text-cyan-400 font-mono text-[11px] font-bold tracking-wider uppercase">
        {badgeText}
      </span>

      <span className="text-slate-600 font-mono text-xs select-none">/</span>

      <span className="text-xs font-mono text-slate-300">
        {mainMessage}
      </span>

      <span className="text-xs font-mono font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
        {ctaText} &rarr;
      </span>

      <span className="text-slate-700 font-mono text-xs select-none pl-4">—</span>
    </div>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate && onNavigate('changelog')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate && onNavigate('changelog');
        }
      }}
      className="group relative w-full overflow-hidden bg-[#060b13] border-b border-cyan-500/25 cursor-pointer py-2 transition-colors hover:bg-[#09121f] select-none"
      title={isVi ? "Bấm để xem nhật ký cập nhật & tải về" : "Click to view changelog & download"}
    >
      {/* Edge Fade Gradients for smooth infinite sliding */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060b13] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060b13] to-transparent z-10 pointer-events-none" />

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
