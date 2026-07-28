import React from 'react';

export const Sponsors = () => {
  const basePlatforms = [
    { name: 'Cursor IDE', desc: 'Full SSE Context Sync', tag: 'AI EDITOR' },
    { name: 'Claude Desktop', desc: 'Multi-Agent Handoff', tag: 'AGENT HOST' },
    { name: 'Antigravity IDE', desc: 'Native OS Integration', tag: 'IDE BRAIN' },
    { name: 'Open VSX Registry', desc: 'Verified Publisher', tag: 'EXTENSION HUB' },
    { name: 'Unikorn Vietnam', desc: 'Product of the Day #2', tag: 'COMMUNITY' },
    { name: 'Ollama AI', desc: 'Local LLM Persistence', tag: 'LOCAL INFERENCE' },
  ];

  const baseTechnologies = [
    { name: 'Model Context Protocol', type: 'MCP Standard 2026' },
    { name: 'TypeScript Daemon', type: 'Strict Type Kernel' },
    { name: 'Node.js Engine', type: 'Async Event Loop' },
    { name: 'Electron Desktop', type: 'Cross-Platform GUI' },
    { name: 'Vite Ecosystem', type: 'Instant HMR Runtime' },
    { name: 'PiperNet IoA', type: 'Mesh Protocol' },
  ];

  // Duplicate for seamless 100% infinite marquee looping
  const platformsLoop = [...basePlatforms, ...basePlatforms, ...basePlatforms];
  const techLoop = [...baseTechnologies, ...baseTechnologies, ...baseTechnologies];

  return (
    <div id="ecosystem" className="border-subtle-b bg-[#0B0B11]">
      
      {/* Header Row */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11]">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          INTEGRATED PLATFORMS & TECH ECOSYSTEM
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          Supported <span className="text-cyan-400">Platforms & Technologies</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          Aevum OS seamlessly bridges top-tier AI agent hosts, developer platforms, and foundational protocols.
        </p>
      </div>

      {/* Row 1: Supported Platforms Infinite Marquee Slider (Left Aligned Header) */}
      <div className="border-subtle-b">
        <div className="flex items-center text-left px-8 py-3.5 font-mono text-[11px] text-slate-400 font-semibold uppercase tracking-widest border-subtle-b bg-[#0B0B11]">
          Platform & Agent Host Ecosystem
        </div>
        
        {/* Infinite Slider Track Wrapper */}
        <div className="relative overflow-hidden bg-[#0B0B11] py-4 group">
          {/* Gradient Masks on Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B11] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B11] to-transparent z-10" />

          {/* Marquee Track (Left Direction) */}
          <div className="animate-marquee gap-6 px-4">
            {platformsLoop.map((item, idx) => (
              <div 
                key={idx}
                className="w-64 p-5 border-subtle bg-[#0e0f17] hover:bg-[#131520] hover:border-cyan-500/40 rounded-md flex-shrink-0 flex flex-col justify-between transition-all duration-200"
              >
                <span className="text-[9px] font-mono font-bold text-cyan-400/90 tracking-wider">
                  {item.tag}
                </span>
                <div className="my-2">
                  <h4 className="text-sm font-extrabold text-white font-display">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Core Technologies Infinite Marquee Slider (Right Aligned Header) */}
      <div>
        <div className="flex items-center justify-end text-right px-8 py-3.5 font-mono text-[11px] text-slate-400 font-semibold uppercase tracking-widest border-subtle-b bg-[#0B0B11]">
          Core Infrastructure & Technologies
        </div>

        {/* Infinite Slider Track Wrapper */}
        <div className="relative overflow-hidden bg-[#0B0B11] py-4 group">
          {/* Gradient Masks on Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B11] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B11] to-transparent z-10" />

          {/* Marquee Track (Right Direction) */}
          <div className="animate-marquee-reverse gap-6 px-4">
            {techLoop.map((tech, idx) => (
              <div 
                key={idx}
                className="w-64 p-5 border-subtle bg-[#0e0f17] hover:bg-[#131520] hover:border-cyan-500/40 rounded-md flex-shrink-0 flex flex-col justify-between transition-all duration-200"
              >
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  {tech.type}
                </span>
                <h4 className="text-xs font-bold text-slate-200 font-mono mt-2">
                  {tech.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
