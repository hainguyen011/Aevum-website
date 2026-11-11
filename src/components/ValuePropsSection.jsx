import React from 'react';
import { Zap, Shield, Network } from 'lucide-react';

export const ValuePropsSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const items = [
    {
      icon: Zap,
      title: isVi ? 'Thu thập ngữ cảnh thời gian thực' : 'Gather context in real time',
      desc: isVi
        ? 'Tự động trích xuất ranh giới kiến trúc, tệp domain và ma trận quy tắc mà không cần sao chép thủ công.'
        : 'Extracts architectural constraints, domain boundaries, and rule sets without tedious copy-pasting across tools.'
    },
    {
      icon: Shield,
      title: isVi ? 'Thực thi trong sandbox an toàn' : 'Execute in zero-risk sandboxes',
      desc: isVi
        ? 'Lớp ảo hóa RAM Copy-on-Write cô lập hoàn toàn mọi lệnh CLI và mã sinh ra, cam kết đĩa cứng nguyên vẹn.'
        : 'Copy-on-Write volatile RAM virtualization isolates all CLI commands and generated code, protecting host disks.'
    },
    {
      icon: Network,
      title: isVi ? 'Hiệp đồng biệt đội đa tác tử' : 'Coordinate multi-agent swarms',
      desc: isVi
        ? 'Luân chuyển tác vụ tự động giữa các Persona chuyên biệt (Kiến trúc sư, Lập trình viên, Bảo mật) với 100% ngữ cảnh.'
        : 'Autonomous handoffs between specialized personas (Architect, Dev, QA) preserving 100% context fidelity.'
    }
  ];

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20">
          
          {/* Left Title: Clean, Large, Editorial font */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Đừng làm cầu nối<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">thủ công giữa các hệ thống.</span>
                </>
              ) : (
                <>
                  Stop being the link<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">between every system.</span>
                </>
              )}
            </h2>
          </div>

          {/* Right Description */}
          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Các trợ lý AI thông thường bị xóa sạch ngữ cảnh ngay khi bạn đóng cửa sổ. Aevum OS kết nối các IDE, công cụ terminal và đồ thị tri thức sống thành một thực thể duy nhất.'
                : 'AI assistants forget context the moment you close a tab. Aevum OS connects your IDEs, terminal CLI tools, and living memory graphs into one unified cognitive substrate.'}
            </p>
          </div>

        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ValuePropsSection;

