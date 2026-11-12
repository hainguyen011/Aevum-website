import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const WorkflowStepsSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const steps = [
    {
      num: '01',
      title: isVi ? 'Chọn cộng sự số phù hợp' : 'Choose your companion',
      desc: isVi
        ? 'Dùng ngay các vai trò sẵn có (kiến trúc, lập trình, kiểm thử) hoặc tự tạo cộng sự am hiểu nghiệp vụ riêng của bạn.'
        : 'Select ready-to-use roles (Architect, Dev, QA) or create custom specialists tailored to your codebase.'
    },
    {
      num: '02',
      title: isVi ? 'Gắn vào công cụ bạn đang dùng' : 'Connect your tools',
      desc: isVi
        ? 'Kết nối tức thì với Cursor, Claude Code, VS Code hay terminal chỉ qua một chuẩn Open MCP duy nhất.'
        : 'Plug seamlessly into Cursor, Claude Code, VS Code, or terminal via standard Open MCP.'
    },
    {
      num: '03',
      title: isVi ? 'Để cộng sự giải quyết trọn vẹn' : 'Let companions deliver',
      desc: isVi
        ? 'Theo dõi công việc được xử lý an toàn trong sandbox, tự động lưu lại bài học kinh nghiệm để lần sau làm tốt hơn.'
        : 'Watch tasks resolve safely inside sandboxes, continuously harvesting reusable wisdom for future workflows.'
    }
  ];

  return (
    <section id="workflow" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Heading & Pill Action */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Bắt đầu dễ dàng từ<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">một việc nhỏ.</span>
                </>
              ) : (
                <>
                  Start with<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">one workflow.</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Bạn không cần thay đổi thói quen làm việc. Cứ tiếp tục dùng IDE quen thuộc, Aevum sẽ âm thầm hỗ trợ phía sau và đồng hành lớn dần cùng dự án.'
                : 'Adopt Aevum OS incrementally. Keep your favorite IDE, while Aevum silently operates in the background and scales alongside your project.'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenTrialModal || (() => onNavigate('changelog'))}
                className="px-6 py-3 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-sm transition-colors cursor-pointer"
              >
                {isVi ? 'Dùng thử Aevum miễn phí' : 'Try Aevum for Free'}
              </button>

            </div>
          </div>

          {/* Right Column: 3 Clean Numbered Steps matching screenshot */}
          <div className="lg:col-span-7 space-y-8 text-left lg:pl-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="pb-8 border-b border-white/10 [html[data-theme='light']_&]:border-slate-200 last:border-b-0 space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-slate-400">
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light pl-7">
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

