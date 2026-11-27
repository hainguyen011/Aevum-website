import React from 'react';
import { HeroCompanionMotion } from './HeroCompanionMotion';
import { DualDownloadButtons } from './DualDownloadButtons';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section id="hero" className="relative w-full overflow-visible z-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-12 lg:pb-20">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">

          {/* ── LEFT COLUMN: EDITORIAL STATEMENT, CTAs & INTERACTIVE SCENARIO PREVIEW ── */}
          <div className="lg:col-span-6 space-y-6 text-left">

            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none">
              <span>{isVi ? 'BỘ NÃO CỘNG SỰ AI TRÊN MÁY BẠN' : 'LOCAL-FIRST AI COMPANION OS'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.1] font-sans">
              {isVi ? (
                <>
                  Cộng sự AI nhớ việc.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Đồng hành trọn dự án.</span>
                </>
              ) : (
                <>
                  AI companions that remember.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Working seamlessly with you.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 [html[data-theme='light']_&]:text-slate-700 max-w-xl leading-[1.7] font-sans font-normal">
              {isVi
                ? 'Không còn cảnh nhắc lại ngữ cảnh mỗi lần mở tab mới. Aevum OS kết nối thẳng vào IDE bạn đang dùng, ghi nhớ dài hạn trên máy cá nhân và phối hợp cùng bạn làm trọn vẹn mọi đầu việc.'
                : 'Stop re-explaining your project in every new chat. Aevum OS plugs directly into your existing IDEs, keeps durable memory on your machine, and helps deliver complex work effortlessly.'}
            </p>

            {/* Primary Download & Quick Orientation (WCAG >= 48px Touch Target) */}
            <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-6">
              <DualDownloadButtons
                activeLang={activeLang}
                onNavigate={onNavigate}
              />

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('workflow') || document.getElementById('mission');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 min-h-[48px] px-3 text-white hover:text-slate-200 [html[data-theme='light']_&]:text-slate-900 [html[data-theme='light']_&]:hover:text-black font-medium text-sm sm:text-base transition-colors cursor-pointer"
              >
                <span>{isVi ? 'Xem cách vận hành' : 'See how it works'}</span>
                <span>→</span>
              </button>
            </div>

            {/* Iris ZPD Situation-Awareness Micro-Reassurance */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-sans">
              <span>{isVi ? '100% Local-First · Giữ nguyên IDE đang dùng' : '100% Local-First · Keep your favorite IDE'}</span>
              <span className="text-slate-500 [html[data-theme='light']_&]:text-slate-300">·</span>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('docs')}
                className="inline-flex items-center min-h-[44px] text-white hover:text-slate-200 [html[data-theme='light']_&]:text-slate-900 underline underline-offset-4 decoration-white/30 [html[data-theme='light']_&]:decoration-slate-400 transition-colors cursor-pointer bg-transparent border-0 p-0 text-sm font-medium"
              >
                {isVi ? 'Hướng dẫn cài đặt 3 phút →' : '3-minute quickstart →'}
              </button>
            </div>

          </div>

          {/* ── RIGHT COLUMN: HERO PIXEL AGENT COMPANION CANVAS ── */}
          <div className="lg:col-span-6 min-h-[480px] sm:min-h-[520px] flex items-center justify-center relative select-none">
            <HeroCompanionMotion activeLang={activeLang} />
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
