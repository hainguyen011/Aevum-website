import React from 'react';
import topSimpleBadge from '../../assets/top-simple.svg';
import { translations } from '../data/translations';

export const UnikornSection = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  // Programmatically highlight Unikorn.vn
  const titleText = t.unikorn.title;
  let titleNode = titleText;
  if (titleText.includes("Unikorn.vn")) {
    const parts = titleText.split("Unikorn.vn");
    titleNode = (
      <>
        {parts[0]}<span className="text-cyan-400">Unikorn.vn</span>{parts[1]}
      </>
    );
  }

  return (
    <div id="unikorn" data-unikorn-zone="true" className="border-subtle-b bg-[#0B0B11]">
      <div className="p-8 sm:p-12 lg:p-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Wording & Architectural Deep Dive Callout */}
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              {t.unikorn.tag}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {titleNode}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              {t.unikorn.desc}
            </p>
            <div className="pt-2">
              <a 
                href="https://unikorn.vn/p/aevum?ref=embed-aevum" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-ghost text-xs font-mono"
              >
                {t.unikorn.btn}
              </a>
            </div>
          </div>

          {/* Right Column: Unikorn Top Simple SVG Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-center lg:pr-6 order-1 lg:order-2">
            <a href="https://unikorn.vn/p/aevum?ref=embed-aevum" target="_blank" rel="noreferrer" className="inline-block">
              <img 
                src={topSimpleBadge} 
                alt="Aevum Product of the Day - Unikorn.vn" 
                loading="lazy"
                decoding="async"
                width="250"
                height="150"
                className="max-h-48 sm:max-h-60 lg:max-h-64 w-auto object-contain" 
              />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UnikornSection;
