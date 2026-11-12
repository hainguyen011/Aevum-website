import React from 'react';
import { translations } from '../data/translations';
import { HeroCompanionMotion } from './HeroCompanionMotion';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-10 lg:pb-20">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: EDITORIAL TYPOGRAPHY & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Eyebrow kicker */}
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'HỆ ĐIỀU HÀNH CỘNG SỰ SỐ LOCAL-FIRST' : 'LOCAL-FIRST DIGITAL COMPANION OS'}</span>
            </div>

            {/* Master Headline: Large, Clean, Airy Editorial Grotesque */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.08] font-sans">
              {isVi ? (
                <>
                  Giữ trọn mã nguồn.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Cộng sự số.</span>
                </>
              ) : (
                <>
                  Keep your systems.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Connect the work.</span>
                </>
              )}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-xl leading-relaxed font-sans font-light">
              {isVi
                ? 'Hệ điều hành AI cục bộ kết nối mọi IDE, terminal và quy trình bạn đang dùng. Biến AI thành cộng sự số thực thụ với trí nhớ dài hạn và môi trường thực thi an toàn tuyệt đối.'
                : 'The local-first agentic OS unifying your IDEs, terminal, and workflows. Orchestrates autonomous swarms with living memory and zero-trust CoW sandboxes.'}
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenTrialModal || (() => onNavigate('changelog'))}
                className="px-6 py-3 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-sm transition-colors cursor-pointer"
              >
                {isVi ? 'Dùng thử Aevum' : 'Try Aevum'}
              </button>

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

            {/* Micro Note */}
            <p className="text-xs font-mono text-slate-500 [html[data-theme='light']_&]:text-slate-500 pt-1">
              {isVi ? 'Không cần server / Chạy cục bộ 100%' : 'No server required / 100% Local-first'}
            </p>

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
