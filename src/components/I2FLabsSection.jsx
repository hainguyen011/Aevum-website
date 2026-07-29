import React from 'react';
import i2fLabsLogo from '../../assets/I2FLabs-logo.png';
import { translations } from '../data/translations';

export const I2FLabsSection = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  const pillars = [
    {
      title: t.i2flabs.p1Title,
      desc: t.i2flabs.p1Desc,
      tag: t.i2flabs.p1Tag,
    },
    {
      title: t.i2flabs.p2Title,
      desc: t.i2flabs.p2Desc,
      tag: t.i2flabs.p2Tag,
    },
    {
      title: t.i2flabs.p3Title,
      desc: t.i2flabs.p3Desc,
      tag: t.i2flabs.p3Tag,
    },
    {
      title: t.i2flabs.p4Title,
      desc: t.i2flabs.p4Desc,
      tag: t.i2flabs.p4Tag,
    },
  ];

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
    <div id="i2flabs" className="bg-[#0B0B11] border-t border-white/10">

      {/* === SOLE Hero Header: Content Left / Logo Right === */}
      <div className="border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">

          {/* LEFT: Hero Content */}
          <div className="px-8 sm:px-12 py-10 sm:py-14 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
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
          <div className="flex items-center justify-center px-8 sm:px-12 py-10 sm:py-14 bg-[#0B0B11]">
            <img
              src={i2fLabsLogo}
              alt="I2FLabs Viet Nam Logo"
              className="max-h-[140px] sm:max-h-[180px] w-auto object-contain select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>

        </div>
      </div>

      {/* === 4 Pillars Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between hover:bg-[#0e0f17] transition-colors border-b border-r border-white/10 last:border-r-0 [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(2n)]:lg:border-r [&:nth-child(4n)]:border-r-0"
          >
            {/* Top Content Area */}
            <div className="p-8 space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                {pillar.tag}
              </span>
              <h3 className="text-sm font-bold text-white font-display leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            {/* Bottom Label */}
            <div className="border-t border-white/10 px-8 py-3.5 text-[10px] font-mono text-slate-500 tracking-wider uppercase">
              I2FLabs Core R&D
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default I2FLabsSection;
