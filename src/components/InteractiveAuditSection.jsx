import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2, ArrowRight, Layers, Cpu, Network } from 'lucide-react';

export const InteractiveAuditSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [activeTab, setActiveTab] = useState('topology');

  return (
    <section id="interactive-canvas" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top 2-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 sm:mb-16">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Phát hiện sai lệch trước<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">khi biến thành nợ kỹ thuật.</span>
                </>
              ) : (
                <>
                  Catch the gap before<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">it becomes a commitment.</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2 text-left">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Aevum OS liên tục đo kiểm ranh giới kiến trúc và tính toàn vẹn phụ thuộc giữa 7 cơ quan sống trước khi cho phép ghi mã nguồn xuống đĩa cứng.'
                : 'Aevum OS continuously audits boundaries and verifies dependencies across the 7 Living Organs before committing changes.'}
            </p>
          </div>
        </div>

        {/* Giant CoralOS Signature Inspection Card */}
        <div className="bento-card-coral rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 overflow-hidden">
          
          {/* Card Top Chrome Navigation */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#08090D] [html[data-theme='light']_&]:bg-slate-100 border-b border-white/10 [html[data-theme='light']_&]:border-slate-200 gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'topology', label: isVi ? 'Sơ đồ đa tác tử' : 'Multi-Agent Topology', icon: Network },
                { id: 'cow', label: isVi ? 'Ảo hóa CoW Sandbox' : 'CoW Virtual Sandbox', icon: Shield },
                { id: 'mlfq', label: isVi ? 'Lập lịch MLFQ' : 'MLFQ Preemptive Queues', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-white border border-white/20 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:text-slate-900 [html[data-theme='light']_&]:border-slate-300"
                        : "text-slate-400 hover:text-slate-200 [html[data-theme='light']_&]:text-slate-600"
                    }`}
                  >
                    <Icon size={13} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600">
              <span>{isVi ? 'Chốt chặn Zero-Trust đang chạy' : 'Live Boundary Guard Active'}</span>
            </div>
          </div>

          {/* Card Body: 2 Columns (Flow Diagram on Left, Human-in-the-loop Insight on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 text-left items-center">
            
            {/* Left Column: Visual Node Topology */}
            <div className="lg:col-span-7 space-y-6">
              {/* Connectors */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Cursor', type: 'Active IDE' },
                  { name: 'Claude Code', type: 'CLI Terminal' },
                  { name: 'Terminal', type: 'Bash / Zsh' }
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white text-slate-900 border border-white/90 text-center select-none">
                    <span className="block text-xs font-bold font-sans">{c.name}</span>
                    <span className="block text-[10px] text-slate-500 font-mono mt-0.5">{c.type}</span>
                  </div>
                ))}
              </div>

              {/* Connecting lines */}
              <div className="flex justify-center">
                <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Agents layer */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-center">
                  <span className="block text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900">An</span>
                  <span className="text-[10px] text-slate-400 font-sans">Orchestrator</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border border-white/25 text-center">
                  <span className="block text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900">Kai</span>
                  <span className="text-[10px] text-slate-400 font-sans">Architecture</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-center">
                  <span className="block text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900">Hawl</span>
                  <span className="text-[10px] text-slate-400 font-sans">Security Guard</span>
                </div>
              </div>

              {/* Target substrate */}
              <div className="p-4 rounded-xl bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-sans font-medium">Living Knowledge Substrate</span>
                <span className="text-[11px] text-slate-400 font-normal">Verified Clean</span>
              </div>
            </div>

            {/* Right Column: Exact CoralOS Insight Card */}
            <div className="lg:col-span-5 space-y-5 lg:pl-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-600 block">
                {isVi ? 'PHÂN TÍCH RỦI RO KIẾN TRÚC' : 'ARCHITECTURAL RISK AUDIT'}
              </span>

              <h3 className="text-2xl sm:text-3xl font-normal text-white [html[data-theme='light']_&]:text-slate-900 font-sans leading-tight">
                {isVi ? (
                  <>Bản vẽ hợp lệ.<br /><span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Nhưng chưa bao quát toàn bộ ranh giới.</span></>
                ) : (
                  <>The document is valid.<br /><span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">But not for the whole job.</span></>
                )}
              </h3>

              <p className="text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
                {isVi
                  ? 'Chốt chặn Zero-Trust phát hiện tác vụ yêu cầu sửa đổi ngoài phạm vi activeFiles. Hệ thống tự động dừng và yêu cầu sự phê duyệt của lập trình viên.'
                  : 'The boundary guard detected modification attempts outside activeFiles scope. Execution was automatically suspended for human review.'}
              </p>

              {/* Understated Neutral Audit Box */}
              <div className="p-4 rounded-xl bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-slate-300 [html[data-theme='light']_&]:text-slate-800 space-y-1 text-xs font-sans">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle size={15} className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 shrink-0" />
                  <span>{isVi ? '1 tác vụ cần người dùng xác nhận (Human-in-the-loop)' : '1 task requiring human verification'}</span>
                </div>
                <p className="text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono pl-6">
                  Boundary check: core/auth/session.ts
                </p>
              </div>

              {/* Citation Footer */}
              <div className="pt-2 text-xs font-mono text-slate-500 [html[data-theme='light']_&]:text-slate-500">
                {isVi ? 'UAC Security Engine / Nghi thức O-DDD Guard' : 'UAC Security Engine / O-DDD Protocol Guard'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveAuditSection;
