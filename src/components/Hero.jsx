import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Shield, ArrowRight } from 'lucide-react';
const logoImg = '/assets/logos/AevumOS-transparent.webp';

export const Hero = ({ onNavigate, onOpenTrialModal, activeLang }) => {
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  const [activeNode, setActiveNode] = useState('an');

  return (
    <div className="relative w-full overflow-hidden bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 py-20 sm:py-28 lg:py-32">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN: EDITORIAL TYPOGRAPHY & CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow kicker */}
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'HỆ ĐIỀU HÀNH TÁC TỬ LOCAL-FIRST' : 'LOCAL-FIRST AGENTIC RUNTIME'}</span>
            </div>

            {/* Master Headline: Large, Clean, Airy Editorial Grotesque */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.08] font-sans">
              {isVi ? (
                <>
                  Giữ trọn mã nguồn.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Kết nối biệt đội.</span>
                </>
              ) : (
                <>
                  Keep your systems.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Connect the work.</span>
                </>
              )}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-xl leading-relaxed font-sans font-light">
              {isVi
                ? 'Hệ điều hành cục bộ hợp nhất mọi IDE, terminal và quy trình kỹ thuật. Điều phối biệt đội tự hành với bộ nhớ sống và sandbox CoW an toàn tuyệt đối.'
                : 'The local-first agentic OS unifying your IDEs, terminal, and workflows. Orchestrates autonomous swarms with living memory and zero-trust CoW sandboxes.'}
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenTrialModal || (() => onNavigate('changelog'))}
                className="px-6 py-3 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-sm transition-colors cursor-pointer"
              >
                {isVi ? 'Dùng thử Aevum' : 'Try Aevum'}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('interactive-canvas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-black font-medium text-sm transition-colors cursor-pointer"
              >
                <span>{isVi ? 'Xem cách vận hành' : 'See how it works'}</span>
                <span>→</span>
              </button>
            </div>

            {/* Micro Note */}
            <p className="text-xs font-mono text-slate-500 [html[data-theme='light']_&]:text-slate-500 pt-1">
              {isVi ? 'Không cần server / Chạy cục bộ 100%' : 'No server required / 100% Local-first'}
            </p>

          </div>

          {/* ── RIGHT COLUMN: CORALOS SIGNATURE ORCHESTRATION CARD ── */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 p-6 sm:p-7 relative overflow-hidden">

              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/5 [html[data-theme='light']_&]:border-slate-200">
                <span className="text-sm font-medium text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-sans">
                  {isVi ? 'Điều phối tác tử thời gian thực' : 'Respond to developer requests.'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Daemon Online
                </span>
              </div>

              {/* Row 1: System Connectors (White Rounded Pills with Brand Logos) */}
              <div className="grid grid-cols-3 gap-3 py-6">
                {[
                  { name: 'Cursor', badge: 'Active IDE' },
                  { name: 'Claude Code', badge: 'CLI Terminal' },
                  { name: 'VS Code', badge: 'MCP Bridge' },
                ].map((conn, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white text-slate-900 border border-white/80 flex flex-col items-center text-center select-none"
                  >
                    <span className="text-xs font-bold font-sans tracking-tight">{conn.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">{conn.badge}</span>
                  </div>
                ))}
              </div>

              {/* Connected Lines Visual */}
              <div className="relative py-2 flex justify-center">
                <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Row 2: Specialized Agent Nodes */}
              <div className="grid grid-cols-3 gap-3 pt-3 pb-6">
                {[
                  { id: 'an', name: 'An (Core Soul)', role: isVi ? 'Ký ức sống' : 'Living Memory', status: 'Syncing LTM' },
                  { id: 'kai', name: 'Kai (Architect)', role: isVi ? 'Kiểm soát O-DDD' : 'Clean Guard', status: 'Q0 Quantum' },
                  { id: 'hawl', name: 'Hawl (Security)', role: isVi ? 'Ranh giới CoW' : 'Zero-Trust', status: 'Locked' },
                ].map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${
                      activeNode === node.id
                        ? "bg-white/10 border-white/30 text-white"
                        : "bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans truncate">
                      {node.name}
                    </span>
                    <span className="block text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-sans truncate mt-0.5">
                      {node.role}
                    </span>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 [html[data-theme='light']_&]:bg-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                      {node.status}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 3: Target Foundation (CoW Virtual RAM Sandbox Layer) */}
              <div className="p-3.5 rounded-xl bg-[#090A0E] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <Shield size={15} className="text-slate-300" />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-medium">
                    CoW Virtual Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>RAM: <strong className="text-slate-200 [html[data-theme='light']_&]:text-slate-800">+12.4 MB</strong></span>
                  <span>DISK DRIFT: <strong className="text-slate-200 [html[data-theme='light']_&]:text-slate-800">0 B</strong></span>
                </div>
              </div>

              {/* Card Footer: AevumOS Logo + Telemetry status */}
              <div className="mt-5 pt-4 border-t border-white/5 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <img src={logoImg} alt="AevumOS" className="w-4 h-4 object-contain" />
                  <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-medium">
                    AevumOS
                  </span>
                </div>
                <span>Port: 3344 (MCP SSE)</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Hero;
