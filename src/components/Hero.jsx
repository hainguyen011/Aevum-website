import React from 'react';
import { translations } from '../data/translations';
import { Button } from './ui/Button';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang }) => {
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';

  const kickerText = isVi
    ? "Kỷ nguyên mới của hệ điều hành AI Agent"
    : "Our next era of frontier agentic intelligence";

  return (
    <div className="relative w-full overflow-hidden border-subtle-b bg-[#07090D] -mt-[104px] pt-16 sm:pt-20 min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center">

      {/* ── 1. Top-to-Bottom Grainy Linear Gradient Atmosphere ── */}
      {/* Primary Linear Gradient Flow (Top luminous cyan-blue fading down to #07090D) */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.42) 0%, rgba(2, 132, 199, 0.25) 22%, rgba(15, 23, 42, 0.55) 52%, rgba(7, 9, 13, 0.88) 78%, #07090D 100%)',
        }}
      />

      {/* Ethereal Top Horizon Wash (Curved ambient light crest) */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[320px] select-none"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 0%, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.16) 45%, transparent 100%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Precision Top Hairline Glow Line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent select-none z-10" />

      {/* Authentic Grainy Noise Texture Layer (Fractal Noise via SVG data-uri) */}
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-30 mix-blend-overlay z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />

      {/* Micro-Grain Color Dodge Highlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-15 mix-blend-color-dodge z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* DeepMind Neural Particle / Dot Constellation (Top Right Flowing Particles) */}
      <div className="pointer-events-none absolute top-0 right-0 w-full sm:w-2/3 h-full overflow-hidden opacity-35 select-none z-[2]">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.6">
            {/* Soft dot clusters mimicking Google DeepMind particle flow */}
            <circle cx="550" cy="80" r="1.5" fill="#38bdf8" opacity="0.8" />
            <circle cx="580" cy="110" r="1" fill="#ffffff" opacity="0.6" />
            <circle cx="610" cy="95" r="2" fill="#38bdf8" opacity="0.9" />
            <circle cx="640" cy="130" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="670" cy="105" r="1" fill="#38bdf8" opacity="0.5" />
            <circle cx="700" cy="150" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="730" cy="120" r="1.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="760" cy="170" r="1" fill="#ffffff" opacity="0.5" />

            <circle cx="520" cy="130" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="560" cy="160" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="590" cy="140" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="620" cy="190" r="1" fill="#38bdf8" opacity="0.6" />
            <circle cx="650" cy="165" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="690" cy="210" r="1.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="720" cy="185" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="750" cy="230" r="2" fill="#38bdf8" opacity="0.8" />

            <circle cx="540" cy="210" r="1.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="570" cy="240" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="610" cy="225" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="640" cy="270" r="1.5" fill="#ffffff" opacity="0.7" />
            <circle cx="680" cy="250" r="1" fill="#38bdf8" opacity="0.5" />
            <circle cx="710" cy="295" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="740" cy="275" r="1.5" fill="#38bdf8" opacity="0.6" />

            <circle cx="600" cy="310" r="1" fill="#ffffff" opacity="0.5" />
            <circle cx="630" cy="340" r="1.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="660" cy="320" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="700" cy="370" r="1" fill="#38bdf8" opacity="0.5" />
            <circle cx="730" cy="350" r="1.5" fill="#ffffff" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Subtle Bottom Horizon Vignette */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent select-none z-[2]" />

      {/* ── 2. Minimalist Center Spotlight Hero Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 sm:py-24 lg:py-32 flex flex-col items-center text-center">

        {/* Eyebrow / Kicker */}
        <p className="text-slate-300 font-sans text-sm sm:text-base md:text-lg font-normal tracking-tight mb-3 sm:mb-4 select-none opacity-90">
          {kickerText}
        </p>

        {/* Master Headline: Huge, Cinematic, Pure White Display */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-white tracking-[0.01em] leading-[1.05] font-display select-none">
          Aevum OS
        </h1>

        {/* Google DeepMind Style Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          <Button
            onClick={() => onNavigate('changelog')}
            variant="primary"
            arrow
          >
            {t.hero.downloadBtn}
          </Button>

          <Button
            onClick={() => onNavigate('docs')}
            variant="secondary"
          >
            {t.hero.docsBtn}
          </Button>
        </div>

      </div>

    </div>
  );
};

export default Hero;
