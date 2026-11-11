import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Shield, Cpu, Layers, Network, Activity, HardDrive, GitBranch, Zap, CheckCircle2, HeartPulse, Terminal } from 'lucide-react';

// Sticker Imports from Agent Collections (Optimized WebP)
import anHiSticker from '../../assets/stickers/An_Collection/An_Hi.webp';
import zenithCuriosSticker from '../../assets/stickers/Zenith_Collection/Zenith_Curios.webp';
import lunaLoverSticker from '../../assets/stickers/Luna_Collection/Luna_Lover.webp';
import vidusHipeSticker from '../../assets/stickers/Vidus_Collection/Vidus_Hipe.webp';

export const BentoGrid = ({ activeLang = 'vi' }) => {
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';

  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      id: 'cow-sandbox',
      colSpan: 'lg:col-span-8',
      tag: isVi ? 'ẢO HÓA BỘ NHỚ CÔ LẬP' : 'COPY-ON-WRITE VIRTUALIZATION',
      title: isVi ? 'CoW Virtual Sandbox: An Toàn 100% Cho Đĩa Cứng' : 'CoW Virtual Sandbox: Zero-Risk Ephemeral Isolation',
      desc: isVi
        ? 'Mỗi cửa sổ agent hoạt động trong một phân vùng RAM ảo hóa Copy-on-Write riêng biệt. Toàn bộ thao tác ghi file, thực thi lệnh CLI và thay đổi tạm thời đều được cô lập hoàn toàn, tự động dọn dẹp trong 4ms khi hoàn tất tác vụ.'
        : 'Every agent window runs in an isolated Copy-on-Write volatile RAM partition. All file modifications, CLI command executions, and state diffs are 100% sandboxed with instant 4ms rollback.',
      agentName: 'Hawl & Vidus • Zero-Trust Gate',
      sticker: vidusHipeSticker,
      icon: Shield,
      accent: '#00C8F0',
      badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-400/30',
      widget: (
        <div className="mt-4 p-4 rounded-xl bg-[#08090D] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-[11px] pb-2 border-b border-white/5 [html[data-theme='light']_&]:border-slate-200">
            <span>ISOLATION PROTOCOL: CoW-V2</span>
            <span className="text-emerald-400 font-semibold">HOST DISK: UNTOUCHED</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">RAM DIFF</span>
              <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-bold text-sm">+12.4 MB</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">DISK DRIFT</span>
              <span className="text-emerald-400 font-bold text-sm">0 BYTES</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">TEARDOWN</span>
              <span className="text-cyan-400 font-bold text-sm">3.8 ms</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mlfq-scheduler',
      colSpan: 'lg:col-span-4',
      tag: isVi ? 'LẬP LỊCH ĐA HÀNG ĐỢI' : 'PREEMPTIVE MLFQ SCHEDULER',
      title: isVi ? 'MLFQ Preemptive Scheduling' : 'MLFQ Preemptive Scheduler',
      desc: isVi
        ? 'Phân luồng ưu tiên 3 cấp (Q0 Realtime Voice/UI, Q1 Squad Handoff, Q2 Background LTM) loại bỏ hoàn toàn hiện tượng nghẽn đơn luồng và zombie processes.'
        : 'Multi-Level Feedback Queue with 3 tiers (Q0 Realtime, Q1 Handoff, Q2 Background) completely eliminating thread starvation and zombie processes.',
      agentName: 'Zenith • Algorithm Lead',
      sticker: zenithCuriosSticker,
      icon: Layers,
      accent: '#10B981',
      badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-400/30',
      widget: (
        <div className="mt-4 p-3.5 rounded-xl bg-[#08090D] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-[11px] space-y-2">
          <div className="flex items-center justify-between text-slate-300 [html[data-theme='light']_&]:text-slate-700">
            <span>Q0 • Realtime UI (2ms)</span>
            <span className="text-cyan-400 font-semibold">Priority High</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-400 h-1.5 rounded-full w-[92%]" />
          </div>

          <div className="flex items-center justify-between text-slate-300 [html[data-theme='light']_&]:text-slate-700 pt-1">
            <span>Q1 • Inter-Agent IACP</span>
            <span className="text-emerald-400 font-semibold">&lt; 0.4ms</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-1.5 rounded-full w-[78%]" />
          </div>

          <div className="flex items-center justify-between text-slate-300 [html[data-theme='light']_&]:text-slate-700 pt-1">
            <span>Q2 • Deep LTM Reflex</span>
            <span className="text-purple-400 font-semibold">Yielding</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-400 h-1.5 rounded-full w-[45%]" />
          </div>
        </div>
      )
    },
    {
      id: 'pipernet-mesh',
      colSpan: 'lg:col-span-5',
      tag: isVi ? 'MẠNG LƯỚI TOÀN CẦU' : 'DECENTRALIZED IOA MESH',
      title: isVi ? 'PiperNet & Internet of Agents' : 'PiperNet & Internet of Agents (IoA)',
      desc: isVi
        ? 'Giao thức mạng lưới P2P phi tập trung kết nối hàng ngàn biệt đội tác tử trên khắp thế giới. Trao đổi và chưng cất giải pháp kiến trúc đã mã hóa trừu tượng mà không rò rỉ mã nguồn dự án.'
        : 'Decentralized peer-to-peer mesh connecting thousands of autonomous swarms globally. Shares abstract DDD architectural patterns without leaking proprietary code.',
      agentName: 'Kai • IoA Protocol Lead',
      sticker: anHiSticker,
      icon: Network,
      accent: '#38BDF8',
      badgeClass: 'text-sky-400 bg-sky-500/10 border-sky-400/30',
      widget: (
        <div className="mt-4 p-3.5 rounded-xl bg-[#08090D] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600 pb-1 border-b border-white/5 [html[data-theme='light']_&]:border-slate-200">
            <span>TOPOLOGY: P2P KADEMLIA</span>
            <span className="text-cyan-400">1,428 PEERS</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-slate-300 [html[data-theme='light']_&]:text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Singapore Mesh Node</span>
            </span>
            <span className="text-emerald-400 font-semibold">18ms</span>
          </div>
          <div className="flex items-center justify-between text-slate-300 [html[data-theme='light']_&]:text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Tokyo Mesh Node</span>
            </span>
            <span className="text-emerald-400 font-semibold">32ms</span>
          </div>
          <div className="flex items-center justify-between text-slate-300 [html[data-theme='light']_&]:text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Frankfurt Mesh Node</span>
            </span>
            <span className="text-emerald-400 font-semibold">84ms</span>
          </div>
        </div>
      )
    },
    {
      id: 'living-organs',
      colSpan: 'lg:col-span-7',
      tag: isVi ? 'KIẾN TRÚC SINH HỌC O-DDD' : 'ORGANISMIC DOMAIN ARCHITECTURE',
      title: isVi ? '7 Living Organs: Cấu Trúc Cơ Quan Sống' : '7 Living Organs: Bio-Architectural System',
      desc: isVi
        ? 'Aevum OS cấu trúc 18 miền vật lý thành 7 cơ quan sinh học sống: Kernel Tuần hoàn, Vỏ não Nhận thức, Lưới Đa tác tử, Hệ Chuyển hóa Đám mây, Vùng Cảm giác Workspace, Hệ Miễn dịch Zero-Trust và Phòng Đo kiểm Chất lượng.'
        : 'Aevum OS maps 18 physical domains into 7 living organs: Circulatory Kernel, Cerebral Cortex, Swarm Mesh, Metabolic Cloud, Sensory Presentation, Phagocytic Immune Defense, and Evolutionary Audit Lab.',
      agentName: 'Bé An & Luna • Core Architects',
      sticker: lunaLoverSticker,
      icon: HeartPulse,
      accent: '#A855F7',
      badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-400/30',
      widget: (
        <div className="mt-4 p-4 rounded-xl bg-[#08090D] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-[11px] pb-2 border-b border-white/5 [html[data-theme='light']_&]:border-slate-200">
            <span>VITALITY INDEX: APEX 96.8%</span>
            <span className="text-emerald-400 font-semibold">ALL ORGANS OPTIMAL</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 text-center">
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">KERNEL</span>
              <span className="text-cyan-400 font-bold text-xs">97% Vital</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">REFLEX</span>
              <span className="text-purple-400 font-bold text-xs">96% Vital</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">SWARM</span>
              <span className="text-emerald-400 font-bold text-xs">95% Vital</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white border border-white/5 [html[data-theme='light']_&]:border-slate-200">
              <span className="block text-[10px] text-slate-500">IMMUNE</span>
              <span className="text-amber-400 font-bold text-xs">100% Guard</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="breakthroughs" className="relative w-full py-20 sm:py-28 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">

      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C0E14] border border-white/10 [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:border-slate-300 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-semibold">
            {isVi ? 'ĐỘT PHÁ CÔNG NGHỆ CỐT LÕI' : 'CORE ARCHITECTURAL BREAKTHROUGHS'}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight font-display">
          {isVi ? 'Kiến Trúc Đột Phá Chuẩn Enterprise' : 'Enterprise-Grade Architectural Pillars'}
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
          {isVi
            ? 'Thiết kế theo triết lý O-DDD đỉnh cao, trao cho mỗi tác tử không gian ảo hóa an toàn tuyệt đối và khả năng hiệp đồng phi tập trung.'
            : 'Engineered on Tier-5 O-DDD principles, providing zero-trust isolation and sovereign decentralized swarm coordination.'}
        </p>
      </div>

      {/* Bento Grid 4 Asymmetric Modules */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className={`${mod.colSpan} bento-card-coral rounded-2xl p-6 sm:p-8 bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300 shadow-md`}
              >
                <div>
                  {/* Top Bar with Tag and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${mod.badgeClass}`}>
                      <Icon size={12} />
                      <span>{mod.tag}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      {mod.agentName}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans">
                    {mod.desc}
                  </p>
                </div>

                {/* Subsystem Live Interactive Widget */}
                {mod.widget}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default BentoGrid;
