import React from 'react';
import i2fLabsLogo from '../../assets/I2FLabs-logo.png';

export const I2FLabsSection = () => {
  const pillars = [
    {
      title: 'Core Kernel Architecture',
      desc: 'High-throughput SSE & Stdio daemon engine running locally with zero editor lock-in and instant startup.',
      tag: 'KERNEL ENGINE',
    },
    {
      title: 'Living Memory System',
      desc: 'Domain-Driven External Brain persisting structured architectural memory, features, and plan evidence.',
      tag: 'DDD LIVING MEMORY',
    },
    {
      title: 'Squad Orchestration',
      desc: 'Autonomous multi-agent task handoff and persona huddles maintaining 100% context integrity.',
      tag: 'MULTI-AGENT SQUAD',
    },
    {
      title: 'PiperNet IoA Protocol',
      desc: 'Distributed Internet of Agents network enabling cross-agent procedural intelligence sharing.',
      tag: 'PIPERNET IOA MESH',
    },
  ];

  return (
    <div id="i2flabs" className="border-subtle-b bg-[#0B0B11]">
      
      {/* Header Row with Absolute Subtle Watermark I2FLabs Logo */}
      <div className="p-8 sm:p-12 border-subtle-b bg-[#0B0B11] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-8 space-y-3 z-10 relative">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              ENGINEERED BY I2FLABS VIET NAM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Built by the Innovation Team at <span className="text-cyan-400">I2FLabs</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              We are a specialized engineering collective pioneering sovereign Agentic Operating Systems, living context memory, and next-generation autonomous software infrastructure.
            </p>
          </div>

        </div>

        {/* Absolute Subtle Watermark I2FLabs Logo (opacity-30) */}
        <img 
          src={i2fLabsLogo} 
          alt="I2FLabs Viet Nam Logo" 
          className="absolute right-12 lg:right-24 top-1/2 -translate-y-1/2 h-[220px] sm:h-[260px] lg:h-[290px] w-auto object-contain opacity-30 pointer-events-none" 
        />
      </div>

      {/* 4 Pillars Grid (Edge-to-edge horizontal divider lines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, idx) => (
          <div 
            key={idx} 
            className="border-subtle-r last:border-r-0 flex flex-col justify-between hover:bg-[#0e0f17] transition-colors group"
          >
            {/* Top Content Area */}
            <div className="p-8 space-y-3">
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                {pillar.tag}
              </span>
              <h3 className="text-base font-bold text-white font-display">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            {/* Edge-to-Edge Divider Line & Footer Label */}
            <div className="border-subtle-t px-8 py-4 text-[11px] font-mono text-slate-500">
              I2FLabs Core R&D
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
