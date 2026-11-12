import React from 'react';
import { translations } from '../data/translations';
import { HeroCompanionMotion } from './HeroCompanionMotion';
import { DualDownloadButtons } from './DualDownloadButtons';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  return (
    <section id="hero" className="relative w-full overflow-visible z-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-24">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: EDITORIAL TYPOGRAPHY & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Eyebrow kicker */}
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'HỆ ĐIỀU HÀNH AGENT TIÊN PHONG' : 'PIONEERING AGENTIC OS'}</span>
            </div>

            {/* Master Headline: Large, Clean, Airy Editorial Grotesque */}
            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.10] font-sans">
              {isVi ? (
                <>
                  Hệ điều hành Agent tiên phong.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Cộng sự số đồng hành.</span>
                </>
              ) : (
                <>
                  Pioneering Agentic OS.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Autonomous companions.</span>
                </>
              )}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-xl leading-relaxed font-sans font-light">
              {isVi
                ? 'Nền tảng hệ điều hành Agent tiên phong kết nối mọi IDE, terminal và quy trình bạn đang dùng. Trao cho bạn các cộng sự số tự hành có khả năng ghi nhớ dài hạn, tự động làm việc và tiến hóa cùng hành trình của bạn.'
                : 'The pioneering local-first agentic OS connecting your IDEs, terminal, and workflows. Empowering you with autonomous digital companions that remember, execute independently, and evolve with your journey.'}
            </p>

            {/* Action Row: Dual Download Buttons (Windows & macOS) & Guide */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <DualDownloadButtons
                activeLang={activeLang}
                onNavigate={onNavigate}
              />

              <button
                onClick={() => {
                  const el = document.getElementById('ioa-roadmap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else {
                    const canvas = document.getElementById('interactive-canvas');
                    if (canvas) canvas.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-black font-medium text-sm transition-colors cursor-pointer"
              >
                <span>{isVi ? 'Xem cách vận hành' : 'See how it works'}</span>
                <span>→</span>
              </button>
            </div>



          </div>

          {/* ── RIGHT COLUMN: HERO PIXEL AGENT COMPANION CANVAS ── */}
          <div className="lg:col-span-6 min-h-[520px] sm:min-h-[540px] flex items-center justify-center relative select-none">
            <HeroCompanionMotion activeLang={activeLang} />
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
