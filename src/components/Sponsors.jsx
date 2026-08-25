import React from 'react';

import anHi from '../../assets/stickers/An_Collection/An_Hi.png';
import anLover from '../../assets/stickers/An_Collection/An_Lover.png';
import anLover2 from '../../assets/stickers/An_Collection/An_Lover2.png';
import anHipe from '../../assets/stickers/An_Collection/An_Hipe.png';
import anCurios from '../../assets/stickers/An_Collection/An_Curios.png';
import anAngry from '../../assets/stickers/An_Collection/An_Angry.png';
import anLoading from '../../assets/stickers/An_Collection/An_Loading.png';
import anByebye from '../../assets/stickers/An_Collection/An_byebye.png';

export const Sponsors = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const quotesVi = [
    '⚡ ANTON SQUAD: CHẠY BẰNG CÀ PHÊ & KHÔNG BAO GIỜ MẤT TRÍ NHỚ!',
    '🚀 DECOUPLED BRAIN: TÁCH BIỆT KHỎI IDE SANDBOX VỚI 0% MEMORY LOSS!',
    '🛠️ PLAN-FIRST ENGINEERING: LẬP KẾ HOẠCH CHUẨN XÁC TRƯỚC KHI CODE!',
    '🤖 AGENTIC PIPERNET: SQUAD PHỐI HỢP TỰ ĐỘNG CHUẨN KẾT NỐI MCP!',
  ];

  const quotesEn = [
    '⚡ ANTON SQUAD: POWERED BY COFFEE & ZERO CONTEXT AMNESIA!',
    '🚀 DECOUPLED BRAIN: INDEPENDENT DAEMON WITH 0% MEMORY LOSS!',
    '🛠️ PLAN-FIRST ENGINEERING: RIGOROUS PIPELINES BEFORE SYNTHESIS!',
    '🤖 AGENTIC PIPERNET: AUTONOMOUS SQUAD MESH OVER OPEN MCP!',
  ];

  const quotes = isVi ? quotesVi : quotesEn;
  const quotesLoop = [...quotes, ...quotes, ...quotes, ...quotes];

  const basePlatforms = [
    { name: 'Cursor IDE', desc: 'Full SSE Context Sync', tag: 'AI EDITOR' },
    { name: 'Claude Desktop', desc: 'Multi-Agent Handoff', tag: 'AGENT HOST' },
    { name: 'Antigravity IDE', desc: 'Native OS Integration', tag: 'IDE BRAIN' },
    { name: 'Open VSX Registry', desc: 'Verified Publisher', tag: 'EXTENSION HUB' },
    { name: 'Unikorn Vietnam', desc: 'Product of the Day #2', tag: 'COMMUNITY' },
    { name: 'Ollama AI', desc: 'Local LLM Persistence', tag: 'LOCAL INFERENCE' },
  ];

  const antonStickers = [
    { sticker: anHi, name: 'Anton Hi' },
    { sticker: anLover, name: 'Anton Lover' },
    { sticker: anLover2, name: 'Anton Heart' },
    { sticker: anLover2, name: 'Anton Hipe' },
    { sticker: anCurios, name: 'Anton Curios' },
    { sticker: anAngry, name: 'Anton Angry' },
    { sticker: anLoading, name: 'Anton Loading' },
    { sticker: anByebye, name: 'Anton ByeBye' },
  ];

  // Duplicate for seamless 100% infinite marquee looping
  const platformsLoop = [...basePlatforms, ...basePlatforms, ...basePlatforms];
  const stickersLoop = [...antonStickers, ...antonStickers, ...antonStickers, ...antonStickers];

  return (
    <div id="orchestration" className="border-subtle-b bg-[#0B0B11]">
      
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

      {/* Row 1: Supported Platforms Infinite Marquee Slider (Clean Text Cards) */}
      <div className="border-subtle-b">
        <div className="flex items-center text-left px-8 py-3.5 font-mono text-[11px] text-slate-400 font-semibold uppercase tracking-widest border-subtle-b bg-[#0B0B11]">
          Platform & Agent Host Ecosystem
        </div>
        
        {/* Infinite Slider Track Wrapper */}
        <div className="relative overflow-hidden bg-[#0B0B11] py-4 group">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 marquee-fade-left z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 marquee-fade-right z-10" />

          {/* Marquee Track (Left Direction) */}
          <div className="animate-marquee gap-6 px-4">
            {platformsLoop.map((item, idx) => (
              <div 
                key={idx}
                className="w-64 p-5 border-subtle bg-[#0e0f17] hover:bg-[#131520] hover:border-cyan-500/40 rounded-xl flex-shrink-0 flex flex-col justify-between transition-all duration-200 group/card relative overflow-hidden"
              >
                <span className="text-[9px] font-mono font-bold text-[#0ea5e9] tracking-wider">
                  {item.tag}
                </span>
                <div className="my-2">
                  <h4 className="text-sm font-extrabold text-white font-display group-hover/card:text-cyan-400 transition-colors">
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

      {/* Row 2: Pure Anton Stickers Running Marquee Slider with Infinite Right-to-Left Text Ticker Header */}
      <div>
        {/* Infinite Ticker Bar Running Right to Left */}
        <div className="relative overflow-hidden border-subtle-b bg-[#0B0B11] py-3">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 marquee-fade-left z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 marquee-fade-right z-10" />

          <div className="animate-marquee gap-12 flex whitespace-nowrap items-center">
            {quotesLoop.map((q, idx) => (
              <span 
                key={idx}
                className="font-mono text-[11px] text-white font-bold uppercase tracking-widest flex items-center shrink-0"
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Infinite Slider Track Wrapper (Stickers) */}
        <div className="relative overflow-hidden bg-[#0B0B11] py-8 group">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 marquee-fade-left z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 marquee-fade-right z-10" />

          {/* Marquee Track (Right Direction) */}
          <div className="animate-marquee-reverse gap-12 sm:gap-16 px-4 items-center">
            {stickersLoop.map((item, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 flex items-center justify-center py-2 transition-transform duration-300 hover:scale-120 cursor-pointer"
              >
                <img 
                  src={item.sticker} 
                  alt={item.name} 
                  loading="lazy"
                  decoding="async"
                  width="144"
                  height="144"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain shadow-none"
                  style={{ boxShadow: 'none', filter: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
