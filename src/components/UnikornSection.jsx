import React from 'react';
import topSimpleBadge from '../../assets/top-simple.svg';

export const UnikornSection = () => {
  return (
    <div id="unikorn" className="border-subtle-b bg-[#0B0B11]">
      <div className="p-8 sm:p-12 lg:p-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Wording & Architectural Deep Dive Callout */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              FEATURED ON UNIKORN VIETNAM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Voted Product of the Day on <span className="text-cyan-400">Unikorn.vn</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              Explore the detailed architectural deep dive, feature analysis, and community discussion of Aevum OS on Unikorn Vietnam — the premier platform celebrating Vietnamese technology innovations.
            </p>
            <div className="pt-2">
              <a 
                href="https://unikorn.vn/p/aevum?ref=embed-aevum" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-ghost text-xs font-mono"
              >
                Read Deep Dive Article on Unikorn.vn →
              </a>
            </div>
          </div>

          {/* Right Column: Unikorn Top Simple SVG Graphic (Slightly larger size) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-center lg:pr-6">
            <a href="https://unikorn.vn/p/aevum?ref=embed-aevum" target="_blank" rel="noreferrer" className="inline-block">
              <img 
                src={topSimpleBadge} 
                alt="Aevum Product of the Day - Unikorn.vn" 
                className="max-h-48 sm:max-h-60 lg:max-h-64 w-auto object-contain" 
              />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
