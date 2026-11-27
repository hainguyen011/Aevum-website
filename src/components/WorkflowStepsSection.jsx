import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { DualDownloadButtons } from './DualDownloadButtons';

export const WorkflowStepsSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const steps = [
    {
      num: '01',
      title: isVi ? 'Chọn cộng sự phù hợp' : 'Pick your companion',
      desc: isVi
        ? 'Cài app trong 1 phút và chọn nhóm vai trò có sẵn cho công việc của bạn.'
        : 'Install in 1 minute and select ready-to-help companion roles.'
    },
    {
      num: '02',
      title: isVi ? 'Mở ngay trong công cụ quen thuộc' : 'Plug into your current tools',
      desc: isVi
        ? 'Giữ nguyên Cursor, Claude Code hay VS Code — Aevum tự đồng bộ ngầm qua Open MCP.'
        : 'Keep coding inside Cursor, Claude, or VS Code with automatic Open MCP sync.'
    },
    {
      num: '03',
      title: isVi ? 'Nhớ sâu & làm tốt hơn mỗi ngày' : 'Grow smarter together',
      desc: isVi
        ? 'Mọi quy ước dự án và bài học sửa lỗi được giữ lại cục bộ để lần sau nhanh hơn nữa.'
        : 'Completed work automatically enriches your local memory for faster future tasks.'
    }
  ];

  return (
    <section id="workflow" className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Heading & Action */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Bắt đầu nhẹ nhàng từ<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">một việc nhỏ.</span>
                </>
              ) : (
                <>
                  Start gently with<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">one simple step.</span>
                </>
              )}
            </h2>

            <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal">
              {isVi
                ? 'Không cần đổi thói quen hay học lệnh mới. Cứ dùng IDE hàng ngày, Aevum hỗ trợ thầm lặng phía sau.'
                : 'No workflow upheaval required. Keep your everyday editor while Aevum works quietly behind the scenes.'}
            </p>

            <div className="pt-1">
              <DualDownloadButtons
                activeLang={activeLang}
                onNavigate={onNavigate}
              />
            </div>
          </div>

          {/* Right Column: Staggered 2+1 Masonry Flow (Zero Dividing Lines) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80 space-y-2.5 ${idx === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-widest">
                    STEP {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WorkflowStepsSection;

