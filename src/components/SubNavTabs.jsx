import { useState } from 'react';
import { translations } from '../data/translations';
import { Copy, Check, Terminal } from 'lucide-react';

export const SubNavTabs = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  const rawTabs = [
    { key: 'tab1', default: 'Standalone OS Kernel' },
    { key: 'tab2', default: 'Handshake Ritual' },
    { key: 'tab3', default: 'Domain DDD Brain' },
    { key: 'tab4', default: 'Squad Orchestration' },
    { key: 'tab5', default: 'Plan-First Pipeline' },
    { key: 'tab6', default: 'PiperNet (IoA)' },
  ];

  const [activeTabKey, setActiveTabKey] = useState('tab1');
  const [copied, setCopied] = useState(false);

  const activeDetail = t.subNavDetails?.[activeTabKey];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-subtle-b bg-[#0B0B11]">
      {/* 6 Grid Tab Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-subtle-b bg-[#0B0B11]">
        {rawTabs.map((tab) => {
          const isActive = activeTabKey === tab.key;
          const displayName = t.subNavTabs?.[tab.key] || tab.default;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTabKey(tab.key);
                setCopied(false);
              }}
              className={`py-4 px-3 flex items-center justify-center text-xs font-mono font-medium transition-all duration-200 border-r border-white/5 last:border-r-0 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
              }`}
            >
              <span className="truncate">{displayName}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Interactive Detail Panel for Selected Tab */}
      {activeDetail && (
        <div className="p-6 sm:p-8 bg-[#07080e] transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Subsystem Overview & Feature Pills */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {activeDetail.title}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                {activeDetail.desc}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeDetail.pills.map((pill, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-[11px] font-mono text-slate-300"
                  >
                    ✓ {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Code Sandbox / Command Execution */}
            <div className="lg:col-span-5">
              <div className="bg-[#030407] rounded-md border border-white/10 overflow-hidden font-mono shadow-xl">
                {/* Code Window Header */}
                <div className="px-3.5 py-2 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px] text-white">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="text-white" />
                    <span className="text-white">Aevum OS Terminal</span>
                  </div>
                  <button
                    onClick={() => handleCopy(activeDetail.cmd)}
                    className="flex items-center gap-1 text-[10px] text-white hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} className="text-white" />
                        <span className="text-white">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 text-xs leading-relaxed overflow-x-auto text-white bg-[#030407]">
                  <div className="text-slate-500 text-[10px] pb-1">// Executing subsystem command</div>
                  <code className="text-white font-mono font-semibold break-all">
                    {activeDetail.cmd}
                  </code>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SubNavTabs;

