import React from 'react';

export const CoralCtaSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section className="w-full py-20 sm:py-28 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-16 lg:p-20 bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-left space-y-6 relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.08] font-sans max-w-3xl">
            {isVi ? (
              <>
                Đưa cộng sự số vào<br />
                <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">quy trình làm việc của bạn.</span>
              </>
            ) : (
              <>
                Connect the work<br />
                <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">your team needs done.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-xl leading-relaxed font-sans font-light">
            {isVi
              ? 'Trải nghiệm cảm giác làm việc cùng một cộng sự hiểu mã nguồn, có trí nhớ bền bỉ và luôn bảo vệ an toàn cho dự án của bạn ngay hôm nay.'
              : 'Take control of autonomous multi-agent engineering with zero-trust security and persistent living memory. Experience it locally on your machine.'}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenTrialModal || (() => onNavigate('changelog'))}
              className="px-7 py-3.5 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-sm transition-colors cursor-pointer"
            >
              {isVi ? 'Dùng thử Aevum miễn phí' : 'Try Aevum for Free'}
            </button>

            <button
              onClick={() => onNavigate('docs')}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-black font-medium text-sm transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Đọc tài liệu hướng dẫn' : 'Read Docs'}</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoralCtaSection;

