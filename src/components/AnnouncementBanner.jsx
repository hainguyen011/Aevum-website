import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AnnouncementBanner = ({ onNavigate, activeLang }) => {
  const isVi = activeLang === 'vi';

  const badgeText = isVi ? 'BẢN TEST CÔNG KHAI' : 'PUBLIC BETA';
  const mainMessage = isVi
    ? 'Bản test đầu tiên của Aevum OS (v1.0.0-beta.0) đã chính thức được công khai cho cả macOS & Windows!'
    : 'Aevum OS first beta release (v1.0.0-beta.0) is now officially public for macOS & Windows!';
  const ctaText = isVi ? 'Tải xuống ngay' : 'Download now';

  const itemContent = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center gap-5 px-6 shrink-0">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-cyan-400/30 tracking-wider">
          {badgeText}
        </span>
      </div>

      <span className="text-xs font-mono text-slate-200 flex items-center gap-1.5">
        <Sparkles size={12} className="text-cyan-400 shrink-0" />
        <span className="text-white font-medium">{mainMessage}</span>
      </span>

      <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1 underline decoration-cyan-400/50 underline-offset-4 group-hover:text-white transition-colors">
        <span>{ctaText}</span>
        <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform" />
      </span>

      <span className="text-cyan-500/30 text-xs font-mono select-none pl-2">✦</span>
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
      className="group relative w-full overflow-hidden bg-gradient-to-r from-[#031526] via-[#072a4a] to-[#031526] border-b border-cyan-500/30 cursor-pointer py-1.5 transition-colors hover:bg-[#083359] select-none"
      title={isVi ? "Bấm để xem nhật ký cập nhật & tải về" : "Click to view changelog & download"}
    >
      {/* Left/Right Edge Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0B0B11] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0B0B11] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Marquee Slider */}
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
