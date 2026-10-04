import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const SubNavTabs = ({ activeLang = 'en', onNavigate }) => {
  const isVi = activeLang === 'vi';
  const [activeId, setActiveId] = useState('kernel-mcp');
  const [activeCategory, setActiveCategory] = useState('all');

  // 6 Foundational Architectural Subsystems (Google DeepMind Card Format)
  const subsystems = [
    {
      id: 'kernel-mcp',
      categoryKey: 'core',
      title: isVi
        ? 'Aevum Kernel: Lõi daemon MCP cho mọi AI IDE'
        : 'Aevum Kernel: Decoupled local MCP daemon for AI IDEs',
      category: isVi ? 'Kiến Trúc Cốt Lõi' : 'Core Architecture',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'docs',
      gradient: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 28%, #0c4a6e 62%, #07090D 100%)',
    },
    {
      id: 'handshake-ritual',
      categoryKey: 'core',
      title: isVi
        ? 'Handshake Ritual: Nghi thức 5 bước bảo toàn ngữ cảnh code'
        : 'Handshake Ritual: 5-step protocol preventing AI context amnesia',
      category: isVi ? 'Giao Thức Ngữ Cảnh' : 'Context Protocol',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'docs',
      gradient: 'linear-gradient(180deg, #22d3ee 0%, #0284c7 28%, #0f2b48 62%, #07090D 100%)',
    },
    {
      id: 'living-memory',
      categoryKey: 'core',
      title: isVi
        ? 'Living Memory: Đồ thị tri thức tự chữa lành & lưu trữ vĩnh cửu'
        : 'Living Memory: Self-healing knowledge graph & permanent memory',
      category: isVi ? 'Đồ Thị Nhận Thức' : 'Cognitive Graph',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'explore',
      gradient: 'linear-gradient(180deg, #c084fc 0%, #9333ea 30%, #4c1d95 65%, #07090D 100%)',
    },
    {
      id: 'autonomous-squads',
      categoryKey: 'mesh',
      title: isVi
        ? 'Autonomous Squads: Biệt đội đa tác tử với cơ chế handoff tự trị'
        : 'Autonomous Squads: Multi-agent coordination with proactive handoffs',
      category: isVi ? 'Mạng Lưới Đa Tác Tử' : 'Multi-Agent Mesh',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'about',
      gradient: 'linear-gradient(180deg, #34d399 0%, #059669 30%, #064e3b 65%, #07090D 100%)',
    },
    {
      id: 'plan-first',
      categoryKey: 'mesh',
      title: isVi
        ? 'Plan-First Engineering: Bản vẽ kiến trúc DDD trước khi sinh code'
        : 'Plan-First Engineering: Domain-driven architectural blueprints',
      category: isVi ? 'Quy Chuẩn Kiến Trúc' : 'Architecture Specs',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'docs',
      gradient: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 30%, #1e3a8a 65%, #07090D 100%)',
    },
    {
      id: 'pipernet-mesh',
      categoryKey: 'mesh',
      title: isVi
        ? 'PiperNet Mesh: Mạng lưới P2P chia sẻ tri thức IoA toàn cầu'
        : 'PiperNet Mesh: Global peer-to-peer decentralized wisdom mesh',
      category: isVi ? 'Hạ Tầng Phân Tán' : 'Decentralized IoA',
      date: isVi ? 'Tháng 10, 2026' : 'October 2026',
      target: 'docs',
      gradient: 'linear-gradient(180deg, #38bdf8 0%, #1d4ed8 30%, #172554 65%, #07090D 100%)',
    },
  ];

  // Active Featured Subsystem (Left Column)
  const activeSubsystem = subsystems.find((s) => s.id === activeId) || subsystems[0];

  // Filtered Side List
  const candidateList = subsystems.filter((s) => {
    if (activeCategory === 'core') return s.categoryKey === 'core';
    if (activeCategory === 'mesh') return s.categoryKey === 'mesh';
    return true;
  });

  // Ensure side list doesn't include the active featured item
  const sideSubsystems = candidateList.filter((s) => s.id !== activeSubsystem.id);

  const handleSelectSubsystem = (id) => {
    setActiveId(id);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#07090D] border-subtle-b">
      <span id="architecture" className="absolute -top-20" />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="text-[11px] font-sans text-white/80 font-medium tracking-widest uppercase block">
              {isVi ? 'HỆ ĐIỀU HÀNH BỘ NÃO NGOẠI VI' : 'AEVUM OS SUBSYSTEMS'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium sm:font-semibold text-white tracking-[0.01em] font-display">
              {isVi ? (
                <>Khám phá các trụ cột kiến trúc của <span className="text-white">Aevum OS</span></>
              ) : (
                <>Explore the Frontier <span className="text-white">Subsystems</span></>
              )}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans pt-1">
              {isVi
                ? '6 thành phần kiến trúc nền tảng tách biệt bộ não AI khỏi IDE sandbox, duy trì ký ức sống và điều phối biệt đội tự trị.'
                : '6 foundational architectural subsystems decoupling AI memory from IDE sandboxes into a persistent living brain.'}
            </p>
          </div>

          {/* Filter Pill Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-sans">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-white text-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isVi ? 'Tất cả (6)' : 'All (6)'}
              </button>
              <button
                onClick={() => {
                  setActiveCategory('core');
                  if (activeSubsystem.categoryKey !== 'core') {
                    setActiveId('kernel-mcp');
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  activeCategory === 'core'
                    ? 'bg-white text-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isVi ? 'Kiến trúc cốt lõi' : 'Core Engine'}
              </button>
              <button
                onClick={() => {
                  setActiveCategory('mesh');
                  if (activeSubsystem.categoryKey !== 'mesh') {
                    setActiveId('autonomous-squads');
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  activeCategory === 'mesh'
                    ? 'bg-white text-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isVi ? 'Mạng lưới phân tán' : 'Distributed Mesh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Google DeepMind 2-Column Grid Layout with Sticky Left Panel ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start relative">
          
          {/* ════════════ LEFT COLUMN: Main Featured Subsystem (Sticky & Vertically Centered) ════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-[max(5.5rem,calc(50vh-280px))] self-start flex flex-col text-left z-10">
            {/* Main Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-medium text-white tracking-[0.01em] leading-[1.2] font-display">
              {activeSubsystem.title}
            </h3>

            {/* Meta Row: Date • Category */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 font-sans mt-3 sm:mt-4">
              <span>{activeSubsystem.date}</span>
              <span>{activeSubsystem.category}</span>
            </div>

            {/* Learn More Action Link */}
            <div className="mt-2.5 sm:mt-3 mb-6 sm:mb-8">
              <button
                onClick={() => onNavigate?.(activeSubsystem.target)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-white font-medium transition-colors cursor-pointer group"
              >
                <span>{isVi ? 'Tìm hiểu thêm' : 'Learn more'}</span>
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Pure Linear Grainy Gradient Hero Canvas (Centered Vertically in Viewport) */}
            <div className="relative w-full aspect-square rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/10 select-none">
              {/* Luminous Smooth Linear Gradient Flow */}
              <div
                className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
                style={{ background: activeSubsystem.gradient }}
              />

              {/* Precision Top Hairline Glow Line */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-[1]" />

              {/* Authentic Grainy Noise Texture Layer (Fractal Noise via SVG data-uri) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay z-[2]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseHero'\u003E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseHero)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '160px 160px',
                }}
              />

              {/* Micro-Grain Color Dodge Highlight Layer */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-color-dodge z-[2]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseHero2'\u003E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseHero2)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '200px 200px',
                }}
              />
            </div>
          </div>

          {/* ════════════ RIGHT COLUMN: Stacked Rounded Cards (Exact Image 1 Archetype) ════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 sm:gap-5 pt-2 lg:pt-0">
            {sideSubsystems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectSubsystem(item.id)}
                className="group cursor-pointer rounded-[24px] sm:rounded-[28px] bg-[#14151b] hover:bg-[#1a1c24] border border-white/[0.08] hover:border-white/20 p-6 sm:p-7 md:p-8 flex flex-row items-center justify-between gap-5 sm:gap-7 transition-all duration-300 text-left"
              >
                {/* Left Side: Title, Meta & Learn More */}
                <div className="flex-1 pr-2 sm:pr-4 flex flex-col justify-between">
                  <h4 className="text-lg sm:text-xl lg:text-[22px] font-medium text-white tracking-[0.01em] leading-snug group-hover:text-cyan-200 transition-colors duration-200 font-display">
                    {item.title}
                  </h4>

                  {/* Meta row: Date and Category */}
                  <div className="mt-4 sm:mt-5 text-xs sm:text-sm text-slate-400 font-sans flex items-center gap-3.5">
                    <span>{item.date}</span>
                    <span>{item.category}</span>
                  </div>

                  {/* Learn More link below */}
                  <div className="mt-2.5 sm:mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate?.(item.target);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 group-hover:text-white font-medium transition-colors cursor-pointer"
                    >
                      <span>{isVi ? 'Tìm hiểu thêm' : 'Learn more'}</span>
                      <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Rounded Grainy Gradient Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 shrink-0 rounded-[18px] sm:rounded-[20px] overflow-hidden relative border border-white/10 select-none group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Background Linear Gradient */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    style={{ background: item.gradient }}
                  />

                  {/* Top Hairline */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-[1]" />

                  {/* Grainy Noise Texture Layer */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay z-[2]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseThumb'\u003E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseThumb)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '160px 160px',
                    }}
                  />

                  {/* Micro-Grain Color Dodge */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-color-dodge z-[2]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseThumb2'\u003E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseThumb2)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '200px 200px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SubNavTabs;
