import React, { useState } from 'react';
import VietnamInfraImg from "../../assets/aevum_vietnam_ai_infra.jpg";
import { VietnamAsciiFlag } from './VietnamAsciiFlag';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Globe, Sparkles } from 'lucide-react';

export const FrameworkFlow = ({ activeLang }) => {
  const [viewMode, setViewMode] = useState('ascii'); // 'ascii' | 'mesh'
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';

  const titleText = t.frameworkFlow?.title || '';
  let title1 = isVi ? "Hạ Tầng AI Agent Độc Lập" : "Pioneering Sovereign AI Agent Infrastructure";
  let title2 = isVi ? "& Bộ Não Ngoại Vi Tiên Phong Tại Việt Nam" : "& Sovereign Innovation in Vietnam";

  if (titleText.includes("&")) {
    const parts = titleText.split("&");
    title1 = parts[0].trim();
    title2 = "& " + parts[1].trim();
  }

  return (
    <div id="framework-flow" className="border-subtle-b bg-[#0B0B11] relative overflow-hidden">

      {/* Section Header */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] relative z-10 border-scan">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{t.frameworkFlow.tag}</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 font-display">
          {title1} <span className="text-gradient block sm:inline">{title2}</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base mt-3 font-normal leading-relaxed">
          {t.frameworkFlow.desc}
        </p>
      </div>

      {/* High-Tech Vietnam AI Infrastructure & 3D ASCII Sovereign Flag Container */}
      <div className="relative flex items-center justify-center bg-transparent py-8 sm:py-12 px-4 sm:px-8 overflow-hidden">
        {/* Subtle glowing ambient backdrop */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[420px] sm:w-[680px] h-[300px] sm:h-[450px] bg-red-500/10 rounded-full blur-[120px] -z-10" />
        </div>

        <div className="max-w-4xl w-full relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#07080e] group">
          {/* Interactive Mode Switcher */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 backdrop-blur-md bg-black/80 border border-white/15 p-1 rounded-lg flex items-center gap-1 shadow-2xl">
            <button
              onClick={() => setViewMode('ascii')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'ascii' 
                  ? 'bg-red-600/90 text-white shadow-lg shadow-red-500/30' 
                  : 'text-slate-400 hover:text-white bg-transparent'
              }`}
            >
              <span>🇻🇳 Cờ ASCII 3D</span>
            </button>
            <button
              onClick={() => setViewMode('mesh')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'mesh' 
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white bg-transparent'
              }`}
            >
              <span>📡 Lưới Hạ Tầng</span>
            </button>
          </div>

          {viewMode === 'ascii' ? (
            <VietnamAsciiFlag height={480} defaultTheme="national" />
          ) : (
            <div className="relative">
              <img
                src={VietnamInfraImg}
                alt="Aevum OS - Ha Tang AI Agent Tien Phong Viet Nam (Hanoi - Da Nang - Ho Chi Minh City)"
                loading="lazy"
                decoding="async"
                width="1280"
                height="720"
                className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-[1.015]"
              />

              {/* Floating Glass HUD Overlay Badges */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 backdrop-blur-md bg-black/65 border border-white/15 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-slate-200 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">VIETNAM AI MESH</span>
                <span className="hidden sm:inline text-slate-400">• HANOI • DA NANG • HCM CITY</span>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 backdrop-blur-md bg-black/65 border border-white/15 px-3.5 py-1.5 rounded-lg hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300 shadow-lg">
                <Sparkles size={14} className="text-cyan-400" />
                <span>I2FLABS SOVEREIGN CORE</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Infrastructure Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-subtle-t">
        {/* Pillar 1 */}
        <div className="p-6 sm:p-8 border-subtle-b md:border-subtle-b-0 md:border-subtle-r space-y-2.5 bg-[#0B0B11] hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
              {t.frameworkFlow.pillar1Tag || 'CHỦ QUYỀN DỮ LIỆU'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck size={16} />
            </div>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            {t.frameworkFlow.pillar1Title || '100% Tự chủ Cục bộ & Bảo mật'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            {t.frameworkFlow.pillar1Desc}
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 sm:p-8 border-subtle-b md:border-subtle-b-0 md:border-subtle-r space-y-2.5 bg-[#0B0B11] hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
              {t.frameworkFlow.pillar2Tag || 'CHUẨN MỰC QUỐC TẾ'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu size={16} />
            </div>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            {t.frameworkFlow.pillar2Title || '98 Công cụ MCP Đỉnh cao'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            {t.frameworkFlow.pillar2Desc}
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 sm:p-8 space-y-2.5 bg-[#0B0B11] hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              {t.frameworkFlow.pillar3Tag || 'MẠNG LƯỚI TRI THỨC'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe size={16} />
            </div>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            {t.frameworkFlow.pillar3Title || 'PiperNet IoA Mesh Toàn cầu'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            {t.frameworkFlow.pillar3Desc}
          </p>
        </div>
      </div>

    </div>
  );
};

export default FrameworkFlow;
