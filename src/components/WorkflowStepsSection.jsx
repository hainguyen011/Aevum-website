import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const WorkflowStepsSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const steps = [
    {
      num: '01',
      title: isVi ? 'Chọn biệt đội tác tử' : 'Choose the squad',
      desc: isVi
        ? 'Bắt đầu với các Persona cốt lõi (An, Kai, Hawl) hoặc tự do tạo chuyên gia nghiệp vụ riêng qua agentu.'
        : 'Select core personas (An, Kai, Hawl) or create custom domain specialists via agentu.'
    },
    {
      num: '02',
      title: isVi ? 'Kết nối môi trường làm việc' : 'Connect your tools',
      desc: isVi
        ? 'Cắm nối tức thì vào Cursor, Claude Code, hay VS Code thông qua giao thức chuẩn Open MCP.'
        : 'Plug seamlessly into Cursor, Claude Code, or VS Code using the universal Open MCP protocol.'
    },
    {
      num: '03',
      title: isVi ? 'Tác tử tự động giải quyết' : 'Agent to the next step',
      desc: isVi
        ? 'Quan sát biệt đội tự động luân chuyển tác vụ, thực thi trong CoW sandbox và đúc kết tri thức tái sử dụng.'
        : 'Watch autonomous handoffs resolve tasks, run inside CoW sandboxes, and harvest reusable wisdom.'
    }
  ];

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Heading & Pill Action */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Bắt đầu với<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">một tác vụ duy nhất.</span>
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
                ? 'Tiếp cận Aevum OS theo từng bước linh hoạt. Bắt đầu với một cộng sự số trong IDE ưa thích của bạn, sau đó mở rộng thành biệt đội tự hành khi dự án lớn mạnh.'
                : 'Adopt Aevum OS incrementally. Start with a single companion in your favourite IDE, then expand to a full autonomous swarm as your codebase scales.'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenTrialModal || (() => onNavigate('changelog'))}
                className="px-6 py-3 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-sm transition-colors cursor-pointer"
              >
                {isVi ? 'Dùng thử Aevum' : 'Try Aevum'}
              </button>
              <p className="mt-3 text-xs font-mono text-slate-500">
                {isVi ? 'Không cần thiết lập phức tạp / Khởi động trong 1 giây' : 'No complex setup / Boots in 1 second'}
              </p>
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

