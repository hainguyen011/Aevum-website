import React from 'react';
import i2fLabsLogo from '../../assets/I2FLabs-logo.png';
import { translations } from '../data/translations';

export const I2FLabsSection = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  // Programmatically highlight I2FLabs in title
  const titleText = t.i2flabs.title;
  let titleNode = titleText;
  if (titleText.includes('I2FLabs')) {
    const parts = titleText.split('I2FLabs');
    titleNode = (
      <>
        {parts[0]}<span className="text-cyan-400">I2FLabs</span>{parts[1]}
      </>
    );
  }

  return (
    <div id="i2flabs" className="bg-[#0B0B11] border-b border-white/10">

      {/* === Hero Header: Content Left / Logo Right === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

        {/* LEFT: Hero Content */}
        <div className="px-8 sm:px-12 py-10 sm:py-14 space-y-4 lg:border-r border-white/10 flex flex-col justify-center order-2 lg:order-1">
          {/* Label */}
          <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase select-none">
            ENGINEERED BY I2FLABS VIET NAM
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
            {titleNode}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
            {t.i2flabs.desc}
          </p>

          {/* Subtle Accent Line */}
          <div className="flex items-center gap-3 pt-2">
            <div className="h-[1px] w-8 bg-cyan-400/50"></div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              I2FLabs Core R&D — Hanoi / Saigon, Vietnam
            </span>
          </div>
        </div>

        {/* RIGHT: Logo Display */}
        <div className="flex items-center justify-center px-8 sm:px-12 py-10 sm:py-14 bg-[#0B0B11] order-1 lg:order-2">
          <img
            src={i2fLabsLogo}
            alt="I2FLabs Viet Nam Logo"
            className="max-h-[140px] sm:max-h-[180px] w-auto object-contain select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

      </div>

    </div>
  );
};

export default I2FLabsSection;
