import React from 'react';
import computerGif from '../../assets/computer.gif';
import { translations } from '../data/translations';

export const CtaBanner = ({ onNavigate, activeLang }) => {
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
    <div className="py-16 relative bg-[#0B0B11] border-subtle-b">
      <div className="w-full px-6 lg:px-12">
        
        {/* Banner Card - Computer GIF Background with Subtle Dark Overlay */}
        <div 
          className="relative p-10 sm:p-14 text-center border border-cyan-500/30 rounded-md overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${computerGif})` }}
        >
          
          {/* Dark Overlay for Ultra Readability */}
          <div className="absolute inset-0 bg-[#0B0B11]/80 backdrop-blur-[1px]" />
 
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
              <a 
                href="/downloads/aevum-os-desktop.zip" 
                download
                className="btn-electron"
              >
                <span>{t.ctaBanner.downloadBtn}</span>
              </a>
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
    </div>
  );
};
 
export default CtaBanner;
