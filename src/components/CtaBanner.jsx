import React from 'react';
import nasaHubbleBg from '../../assets/nasa-hubble-space-telescope-k20fpgVfoPE-unsplash.jpg';
import { translations } from '../data/translations';

export const CtaBanner = ({ onNavigate, onOpenTrialModal, activeLang }) => {
  const t = translations[activeLang] || translations.en;

  // Programmatically highlight On Your System / Trên Hệ thống của bạn
  const titleText = t.ctaBanner.title;
  let title1 = "Deploy Aevum OS";
  let title2 = "On Your System";
  if (titleText.includes("Trên Hệ thống của bạn")) {
    title1 = "Triển khai Aevum OS";
    title2 = "Trên Hệ thống của bạn";
  }

  return (
    <div className="w-full relative bg-[#0B0B11] border-subtle-b border-subtle-t overflow-hidden">
      {/* Banner Card - NASA Hubble Space Telescope Background (Full Width & Height) */}
      <div 
        className="relative w-full py-20 sm:py-28 px-6 sm:px-12 text-center overflow-hidden bg-cover bg-center rounded-none"
        style={{ backgroundImage: `url(${nasaHubbleBg})` }}
      >
        
        {/* Dark Overlay for Cosmic Glow & Ultra Readability */}
        <div className="absolute inset-0 bg-[#0B0B11]/60 backdrop-blur-[0.5px]" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
            {t.ctaBanner.tag}
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            {title1} <br />
            <span className="text-cyan-400">{title2}</span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base max-w-md mx-auto">
            {t.ctaBanner.desc}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={onOpenTrialModal}
              className="btn-electron"
            >
              <span>{t.ctaBanner.downloadBtn}</span>
            </button>
            <button 
              onClick={() => onNavigate('docs')} 
              className="btn-ghost"
            >
              <span>{t.ctaBanner.docsBtn}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
 
export default CtaBanner;
