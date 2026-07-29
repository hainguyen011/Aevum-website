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

  // Programmatically highlight I2FLabs
  const titleText = t.i2flabs.title;
  let titleNode = titleText;
  if (titleText.includes("I2FLabs")) {
    const parts = titleText.split("I2FLabs");
    titleNode = (
      <>
        {parts[0]}<span className="text-cyan-400">I2FLabs</span>{parts[1]}
      </>
    );
  }

  return (
    <div id="i2flabs" className="border-subtle-b bg-[#0B0B11]">
      
      {/* Header Row with Absolute Subtle Watermark I2FLabs Logo */}
      <div className="p-8 sm:p-12 border-subtle-b bg-[#0B0B11] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-8 space-y-3 z-10 relative">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              {t.i2flabs.tag}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {titleNode}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {t.i2flabs.desc}
            </p>
          </div>

        </div>

        {/* Absolute Subtle Watermark I2FLabs Logo (opacity-30) */}
        <img 
          src={i2fLabsLogo} 
          alt="I2FLabs Viet Nam Logo" 
          className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 h-[220px] sm:h-[260px] lg:h-[290px] w-auto object-contain opacity-30 pointer-events-none" 
        />
      </div>

      {/* 4 Pillars Grid (Edge-to-edge horizontal divider lines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, idx) => (
          <div 
            key={idx} 
            className="border-subtle-r last:border-r-0 flex flex-col justify-between hover:bg-[#0e0f17] transition-colors group"
          >
            {/* Top Content Area */}
            <div className="p-8 space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                {pillar.tag}
              </span>
              <h3 className="text-base font-bold text-white font-display">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            {/* Edge-to-Edge Divider Line & Footer Label */}
            <div className="border-subtle-t px-8 py-4 text-[11px] font-mono text-slate-500">
              I2FLabs Core R&D
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default I2FLabsSection;
