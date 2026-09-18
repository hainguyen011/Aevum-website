import React from 'react';
import { Heart } from 'lucide-react';

import anHi from '../../assets/stickers/An_Collection/An_Hi.webp';
import anLover from '../../assets/stickers/An_Collection/An_Lover.webp';
import anLover2 from '../../assets/stickers/An_Collection/An_Lover2.webp';
import anHipe from '../../assets/stickers/An_Collection/An_Hipe.webp';
import anCurios from '../../assets/stickers/An_Collection/An_Curios.webp';
import anAngry from '../../assets/stickers/An_Collection/An_Angry.webp';
import anLoading from '../../assets/stickers/An_Collection/An_Loading.webp';
import anByebye from '../../assets/stickers/An_Collection/An_byebye.webp';

// --- Pure Vector Monochrome Brand Logos (Matte, Crisp, Zero Shadows) ---

const LogoUnikorn = () => (
  <div className="flex items-center gap-2.5 font-display font-extrabold tracking-wider">
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v11a6 6 0 0 0 12 0V3" />
      <path d="M12 3v9" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
    <span className="text-xs sm:text-sm tracking-widest font-mono">UNIKORN</span>
  </div>
);

const LogoI2FLabs = () => (
  <div className="flex items-center gap-2.5 font-display font-black tracking-wider">
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31M14 2v7.31" />
      <path d="M8.5 2h7" />
      <path d="M14 9.31 18.35 18a2 2 0 0 1-1.79 2.89H7.44A2 2 0 0 1 5.65 18L10 9.31" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
    <span className="text-xs sm:text-sm tracking-widest font-mono">I2FLABS</span>
  </div>
);

const LogoAntigravity = () => (
  <div className="flex items-center gap-2.5 font-display font-bold">
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider font-mono">ANTIGRAVITY</span>
  </div>
);

const LogoCursor = () => (
  <div className="flex items-center gap-2.5 font-display font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 2l7.5 19 3-6.5L20 11.5 3 2z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider font-sans font-extrabold">Cursor</span>
  </div>
);

const LogoClaude = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5V6a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 14a1.5 1.5 0 0 1 1.5 1.5V20.5a1.5 1.5 0 0 1-3 0V17.5A1.5 1.5 0 0 1 12 16zM4.93 4.93a1.5 1.5 0 0 1 2.12 0l1.77 1.77a1.5 1.5 0 0 1-2.12 2.12L4.93 7.05a1.5 1.5 0 0 1 0-2.12zm11.31 11.31a1.5 1.5 0 0 1 2.12 0l1.77 1.77a1.5 1.5 0 0 1-2.12 2.12l-1.77-1.77a1.5 1.5 0 0 1 0-2.12zM2 12a1.5 1.5 0 0 1 1.5-1.5H6a1.5 1.5 0 0 1 0 3H3.5A1.5 1.5 0 0 1 2 12zm14 0a1.5 1.5 0 0 1 1.5-1.5H20.5a1.5 1.5 0 0 1 0 3H17.5A1.5 1.5 0 0 1 16 12zm-8.95 4.93a1.5 1.5 0 0 1 2.12 2.12l-1.77 1.77a1.5 1.5 0 0 1-2.12-2.12l1.77-1.77zm11.31-11.31a1.5 1.5 0 0 1 2.12 2.12l-1.77 1.77a1.5 1.5 0 0 1-2.12-2.12l1.77-1.77z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-serif">Claude</span>
  </div>
);

const LogoMCP = () => (
  <div className="flex items-center gap-2 font-mono font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 10v1.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V10" />
      <path d="M12 13.5V14" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider">MCP PROTOCOL</span>
  </div>
);

const LogoOllama = () => (
  <div className="flex items-center gap-2 font-display font-black">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4h-2V2h-4v2H8c-1.1 0-2 .9-2 2v6c0 .55.45 1 1 1h1v7c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-7h1c.55 0 1-.45 1-1V6c0-1.1-.9-2-2-2zm-6 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v-3h4v3z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans">Ollama</span>
  </div>
);

const LogoGemini = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 7.52 7.52 12 2 12c5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide">Google Gemini</span>
  </div>
);

const LogoAnthropic = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 3L7.7 21h3.1l1.5-4.2h5.4l1.5 4.2h3.1L15.5 3h-1zm-.1 3.5l1.9 5.3h-3.8l1.9-5.3zM3 18.5l4-10.5h2.5L5.5 21H3v-2.5z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-widest font-mono">ANTHROPIC</span>
  </div>
);

const LogoOpenAI = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 9.5a5.5 5.5 0 0 0-.5-3.3 5.4 5.4 0 0 0-4.3-2.6 5.5 5.5 0 0 0-4.7 1.5 5.4 5.4 0 0 0-5.2 2.2 5.5 5.5 0 0 0-.8 5.1 5.4 5.4 0 0 0 2.2 5.2 5.5 5.5 0 0 0 4.7 1.5 5.4 5.4 0 0 0 4.3 2.6 5.5 5.5 0 0 0 5.2-2.2 5.4 5.4 0 0 0 .8-5.1 5.4 5.4 0 0 0-1.7-4.9zm-7.6 11.2a3.8 3.8 0 0 1-2.4-.9l2.8-1.6a.8.8 0 0 0 .4-.7v-3.8l2.6 1.5v3.2a3.9 3.9 0 0 1-3.4 2.3zm-7.2-3.8a3.8 3.8 0 0 1-.5-2.5l2.8 1.6a.8.8 0 0 0 .8 0l3.3-1.9v3l-2.6 1.5a3.9 3.9 0 0 1-3.8-1.7zm-1.8-7.8a3.8 3.8 0 0 1 1.9-1.6v3.2a.8.8 0 0 0 .4.7l3.3 1.9-2.6 1.5-2.8-1.6a3.9 3.9 0 0 1-.2-4.1zm11.8-1.3l-3.3 1.9-2.6-1.5 2.8-1.6a3.9 3.9 0 0 1 4.1.2 3.8 3.8 0 0 1 1.6 2.3l-2.6 1.5v-2.8zm3.4 4.5a3.8 3.8 0 0 1 .5 2.5l-2.8-1.6a.8.8 0 0 0-.8 0l-3.3 1.9v-3l2.6-1.5a3.9 3.9 0 0 1 3.8 1.7zm-6.1 1.3l-1.5-.9 1.5-.9 1.5.9-1.5.9z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans">OpenAI</span>
  </div>
);

const LogoDeepSeek = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C7.03 3 3 7.03 3 12c0 3.12 1.6 5.86 4.02 7.45l-.7 2.1c-.13.39.24.73.61.57l3.07-1.35c.64.15 1.31.23 2 .23 4.97 0 9-4.03 9-9s-4.03-9-9-9zm-2 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans">deepseek</span>
  </div>
);

const LogoSupabase = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.36 15.33l-9.74 7.91a.84.84 0 0 1-1.37-.65v-6.95H3.64a.84.84 0 0 1-.65-1.37l9.74-7.91a.84.84 0 0 1 1.37.65v6.95h6.61a.84.84 0 0 1 .65 1.37z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-tight font-sans lowercase">supabase</span>
  </div>
);

const LogoGitHub = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-tight font-sans">GitHub</span>
  </div>
);

const LogoOpenVSX = () => (
  <div className="flex items-center gap-2 font-mono font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
      <path d="M12 11l8-4.5" />
      <path d="M12 11v9" />
      <path d="M12 11L4 6.5" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider">OPEN VSX</span>
  </div>
);

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

  const sponsorsList = [
    { id: 'unikorn', component: <LogoUnikorn />, url: 'https://unikorn.vn' },
    { id: 'i2flabs', component: <LogoI2FLabs />, url: '#' },
    { id: 'antigravity', component: <LogoAntigravity />, url: '#' },
    { id: 'cursor', component: <LogoCursor />, url: 'https://cursor.com' },
    { id: 'claude', component: <LogoClaude />, url: 'https://claude.ai' },
    { id: 'mcp', component: <LogoMCP />, url: 'https://modelcontextprotocol.io' },
    { id: 'ollama', component: <LogoOllama />, url: 'https://ollama.ai' },
    { id: 'gemini', component: <LogoGemini />, url: 'https://deepmind.google/technologies/gemini/' },
    { id: 'anthropic', component: <LogoAnthropic />, url: 'https://anthropic.com' },
    { id: 'openai', component: <LogoOpenAI />, url: 'https://openai.com' },
    { id: 'deepseek', component: <LogoDeepSeek />, url: 'https://deepseek.com' },
    { id: 'supabase', component: <LogoSupabase />, url: 'https://supabase.com' },
    { id: 'github', component: <LogoGitHub />, url: 'https://github.com' },
    { id: 'openvsx', component: <LogoOpenVSX />, url: 'https://open-vsx.org' },
    { 
      id: 'sponsor_callout', 
      isCallout: true, 
      url: 'https://github.com/hainguyen011' 
    },
  ];

  const antonStickers = [
    { sticker: anHi, name: 'Anton Hi' },
    { sticker: anLover, name: 'Anton Lover' },
    { sticker: anLover2, name: 'Anton Heart' },
    { sticker: anHipe, name: 'Anton Hipe' },
    { sticker: anCurios, name: 'Anton Curios' },
    { sticker: anAngry, name: 'Anton Angry' },
    { sticker: anLoading, name: 'Anton Loading' },
    { sticker: anByebye, name: 'Anton ByeBye' },
  ];

  const stickersLoop = [...antonStickers, ...antonStickers];

  return (
    <div id="orchestration" className="border-subtle-b bg-[#0B0B11]">
      
      {/* 1. Header Row (Optical Golden Ratio Balance) */}
      <div className="section-header-optical text-center border-subtle-b bg-[#0B0B11] border-scan">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          {isVi ? 'ĐỒNG HÀNH & HỆ SINH THÁI' : 'SPONSORS & ECOSYSTEM'}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          {isVi ? (
            <>Đồng Hành <span className="text-cyan-400">Phát Triển</span></>
          ) : (
            <>Ecosystem <span className="text-cyan-400">& Partners</span></>
          )}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {isVi
            ? 'Aevum OS liên kết các mô hình AI hàng đầu, IDE thông minh và chuẩn giao thức Model Context Protocol mã nguồn mở.'
            : 'Aevum OS bridges premier LLMs, intelligent developer platforms, and open Model Context Protocols.'}
        </p>
      </div>

      {/* 2. Precision Hairline Logo Wall (Flat, Matte, Zero Glare, Zero Loud Shadows) */}
      <div>
        {/* Tier Label Strip */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-3 border-subtle-b bg-[#0B0B11]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 inline-block" />
            {isVi ? 'ĐỐI TÁC & NHÀ TÀI TRỢ CHIẾN LƯỢC' : 'GOLD SPONSORS & STRATEGIC BACKERS'}
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline-block">
            {isVi ? 'HỆ THỐNG MÃ NGUỒN MỞ' : 'OPEN ECOSYSTEM'}
          </span>
        </div>

        {/* 5-Column Precision Hairline Grid (Vite Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-subtle bg-[#0B0B11]">
          {sponsorsList.map((item, idx) => {
            if (item.isCallout) {
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trở thành nhà tài trợ Aevum OS"
                  className="h-24 sm:h-28 flex flex-col items-center justify-center p-4 border-r border-b lg:border-b-0 border-subtle text-slate-400 hover:text-cyan-400 hover:bg-white/[0.02] transition-colors duration-200 group text-center select-none"
                >
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider group-hover:text-cyan-400 transition-colors">
                    <Heart size={14} className="text-pink-400/80 group-hover:text-pink-400 transition-colors" />
                    <span>{isVi ? '+ Tài trợ dự án' : '+ Sponsor Us'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    {isVi ? 'GitHub Sponsors' : 'Open Collective'}
                  </span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.id}
                aria-label={`Đối tác ${item.id}`}
                className="h-24 sm:h-28 flex items-center justify-center p-5 border-r border-b sm:border-b border-subtle text-slate-400/60 hover:text-slate-200 hover:bg-white/[0.02] transition-colors duration-200 select-none group"
              >
                <div className="transition-transform duration-200 group-hover:scale-[1.03]">
                  {item.component}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. Infinite Ticker Bar (Matte, Running Text Quotes) */}
      <div className="relative overflow-hidden border-subtle-b bg-[#0B0B11] py-3">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 marquee-fade-left z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 marquee-fade-right z-10" />

        <div className="animate-marquee gap-12 flex whitespace-nowrap items-center">
          {quotesLoop.map((q, idx) => (
            <span 
              key={idx}
              className="font-mono text-[11px] text-slate-300 font-medium uppercase tracking-widest flex items-center shrink-0"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Infinite Running Stickers (Matte Flat Stickers of An, Zero Shadow) */}
      <div className="relative overflow-hidden bg-[#0B0B11] py-8 group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 marquee-fade-left z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 marquee-fade-right z-10" />

        <div className="animate-marquee-reverse gap-12 sm:gap-16 px-4 items-center flex">
          {stickersLoop.map((item, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 flex items-center justify-center py-2 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <img 
                src={item.sticker} 
                alt={item.name} 
                loading="lazy"
                decoding="async"
                width="144"
                height="144"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain shadow-none"
                style={{ boxShadow: 'none', filter: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sponsors;
