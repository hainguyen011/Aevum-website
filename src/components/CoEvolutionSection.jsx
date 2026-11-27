import React from 'react';
import { CoEvolutionMotion } from './CoEvolutionMotion';

export const CoEvolutionSection = ({ activeLang = 'vi', onNavigate }) => {
  const isVi = activeLang === 'vi';

  return (
    <section id="co-evolution" className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Concise Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8 sm:mb-10 text-left">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none">
              <span>{isVi ? 'CỘNG TÁC ĐA VAI TRÒ' : 'INTERDISCIPLINARY SQUAD'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Không làm việc đơn độc.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Cộng sự số chia sẻ cùng bạn.
                  </span>
                </>
              ) : (
                <>
                  Never build alone.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Digital specialists moving with you.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
              {isVi
                ? 'Từ viết code, thiết kế trải nghiệm đến đo kiểm chất lượng — các cộng sự tự trao đổi trên cùng một bộ nhớ dự án để giảm gánh nặng cho bạn.'
                : 'From implementation and UX craft to QA auditing, specialized companions coordinate over one shared workspace memory.'}
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center min-h-[44px] text-sm font-sans font-medium text-white hover:text-slate-200 [html[data-theme='light']_&]:text-slate-900 [html[data-theme='light']_&]:hover:text-black underline underline-offset-4 decoration-white/30 [html[data-theme='light']_&]:decoration-slate-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                {isVi ? 'Tìm hiểu câu chuyện & đội ngũ →' : 'Read team story →'}
              </button>
            )}
          </div>
        </div>

        {/* Subtle Elevated Interactive Motion Stage (Zero Border Lines) */}
        <div className="w-full relative min-h-[440px] sm:min-h-[480px] rounded-3xl bg-[#0C0E14]/45 [html[data-theme='light']_&]:bg-slate-50/75 flex items-center justify-center select-none overflow-hidden">
          <CoEvolutionMotion activeLang={activeLang} />
        </div>

      </div>
    </section>
  );
};

export default CoEvolutionSection;
