import React from 'react';
import { DualDownloadButtons } from './DualDownloadButtons';

export const CoralCtaSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section className="w-full py-12 sm:py-16 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-100 text-left space-y-5 relative overflow-visible">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.08] font-sans max-w-3xl">
            {isVi ? (
              <>
                Đưa cộng sự số vào<br />
                <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">công việc của bạn hôm nay.</span>
              </>
            ) : (
              <>
                Bring digital companions<br />
                <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">into your daily flow.</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 max-w-xl leading-[1.7] font-sans font-normal">
            {isVi
              ? 'Cài nhanh trên máy cá nhân, giữ nguyên công cụ bạn đang dùng và để Aevum giữ trọn bộ nhớ dự án cho bạn.'
              : 'Install locally in minutes, keep your current IDE, and let Aevum protect your workspace memory.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <DualDownloadButtons
              activeLang={activeLang}
              onNavigate={onNavigate}
            />

            <button
              type="button"
              onClick={() => onNavigate('docs')}
              className="inline-flex items-center gap-1.5 min-h-[48px] px-3 text-slate-200 hover:text-white [html[data-theme='light']_&]:text-slate-800 [html[data-theme='light']_&]:hover:text-black font-medium text-sm sm:text-base transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Hướng dẫn cài đặt 3 phút' : '3-Min Guide'}</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoralCtaSection;

