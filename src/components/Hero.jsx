import React, { useState } from 'react';
import asciiAsset from '../../assets/logos/Aevum-ascii.png';
import { translations } from '../data/translations';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang }) => {
  const [copied, setCopied] = useState(false);
  const commandText = "aevum --workspace ./ --transport sse --port 3344";
  const t = translations[activeLang] || translations.en;

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Programmatically split title around '&' to preserve styling
  const titleParts = t.hero.title.split('&');
  const title1 = titleParts[0]?.trim();
  const title2 = titleParts[1] ? `& ${titleParts[1].trim()}` : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      
      {/* Left Cell: Text Content */}
      <div 
        className="relative overflow-hidden lg:col-span-7 p-8 sm:p-12 lg:p-14 lg:border-subtle-r flex flex-col justify-between space-y-8 bg-[#0B0B11]"
      >
        {/* Mobile Ambient ASCII Watermark (lg:hidden) */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-15 max-w-[260px] sm:max-w-[320px] pointer-events-none mix-blend-screen select-none lg:hidden z-0">
          <img 
            src={asciiAsset} 
            alt="Aevum ASCII Watermark" 
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-6 relative z-10">
          
          {/* Sub-brand / Tagline */}
          <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
            {t.hero.badge}
          </div>
          
          {/* Main Title - Refined Elegant Cyan Text */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] leading-[1.15] font-display">
            {title1} <br />
            {title2 && (
              <span className="text-[#38bdf8] inline-block font-extrabold mt-1.5">
                {title2}
              </span>
            )}
          </h1>

          {/* Description - Standalone OS Positioning */}
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl font-normal">
            {t.hero.desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={onOpenTrialModal}
              className="btn-electron"
            >
              {t.hero.downloadBtn}
            </button>
            <button 
              onClick={() => onNavigate('docs')} 
              className="btn-ghost"
            >
              {t.hero.docsBtn}
            </button>
          </div>

        </div>

        {/* CLI Exec Command Strip */}
        <div className="pt-4 font-mono text-xs space-y-2 relative z-10">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] text-slate-500 uppercase">{t.hero.startKernel}</span>
            <button onClick={handleCopy} className="text-cyan-400 hover:text-cyan-300 text-[11px]">
              {copied ? "✓ " + (activeLang === 'vi' ? "Đã chép" : "Copied") : t.hero.copyCmd}
            </button>
          </div>
          <div className="bg-[#030407] border-subtle p-3 rounded-md text-slate-200 text-xs overflow-x-auto flex items-center justify-between">
            <span className="text-cyan-400 font-bold mr-2">$</span>
            <span className="flex-1 select-all">{commandText}</span>
          </div>
        </div>

      </div>

      {/* Right Cell: Raw Aevum ASCII Graphic (Desktop only: hidden lg:flex) */}
      <div 
        className="hidden lg:flex lg:col-span-5 p-6 sm:p-8 items-center justify-center relative min-h-[460px] bg-[#0B0B11]"
      >
        <img 
          src={asciiAsset} 
          alt="Aevum ASCII Graphic" 
          className="w-full max-w-[440px] h-auto object-contain mix-blend-screen opacity-95"
        />
      </div>

    </div>
  );
};

export default Hero;
