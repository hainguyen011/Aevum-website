import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProofMetricsSection = ({ onNavigate, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top 2-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Những gì Aevum<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">mang lại cho các đội ngũ.</span>
                </>
              ) : (
                <>
                  See what Aevum<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">helps teams achieve.</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2 text-left">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Đã được kiểm chứng trong môi trường thực chiến qua các kho mã nguồn phức tạp, các đợt tái cấu trúc quy mô lớn và điều phối đa tác tử.'
                : 'Proven in production across complex codebases, multi-turn architecture refactoring, and autonomous squad coordination.'}
            </p>
          </div>
        </div>

        {/* 2 Big Metric Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-left">
          
          {/* Card 1: 99% */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                {isVi ? 'BẢO TOÀN TRÍ NHỚ' : 'CONTEXT RETENTION'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {isVi ? 'Câu trả lời trọn vẹn hơn. Không phải giải thích lại.' : 'More complete answers. Less follow-up.'}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
                {isVi
                  ? 'Đồ thị tri thức sống lưu giữ 100% bối cảnh kiến trúc qua hàng trăm lượt hội thoại, chấm dứt hoàn toàn hội chứng mất trí nhớ của AI.'
                  : 'Living Memory Graph preserves 100% of architectural context across long sessions, ending AI context amnesia once and for all.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 [html[data-theme='light']_&]:border-slate-200 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-light font-sans text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight">
                  99<span className="text-3xl sm:text-4xl font-light text-slate-400">%</span>
                </span>
                <span className="text-xs sm:text-sm font-sans text-slate-400 [html[data-theme='light']_&]:text-slate-600 pl-2">
                  {isVi ? 'Ngữ cảnh được bảo toàn khi handoff' : 'Context fidelity preserved across handoffs'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('docs')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-black pt-2 cursor-pointer"
              >
                <span>{isVi ? 'Khám phá kiến trúc bộ nhớ' : 'Explore memory architecture'}</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Card 2: 66% */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                {isVi ? 'TỐI ƯU HÓA TÀI NGUYÊN' : 'RESOURCE EFFICIENCY'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {isVi ? 'Kế hoạch hoàn chỉnh trước khi viết code.' : 'Find a better plan before committing.'}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
                {isVi
                  ? 'Quy trình Plan-First và CoW sandbox ảo hóa giúp loại trừ các lệnh sai sót, tiết kiệm tối đa ngân sách token và xóa sổ nợ kỹ thuật.'
                  : 'Plan-First protocols and CoW RAM sandboxes prevent erroneous code churn, slashing token consumption and eliminating technical debt.'}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 [html[data-theme='light']_&]:border-slate-200 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-light font-sans text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight">
                  66<span className="text-3xl sm:text-4xl font-light text-slate-400">%</span>
                </span>
                <span className="text-xs sm:text-sm font-sans text-slate-400 [html[data-theme='light']_&]:text-slate-600 pl-2">
                  {isVi ? 'Giảm lãng phí token & context drift' : 'Reduction in token waste & context drift'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('explore')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-black pt-2 cursor-pointer"
              >
                <span>{isVi ? 'Xem báo cáo đo kiểm hiệu năng' : 'Explore benchmark report'}</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProofMetricsSection;

