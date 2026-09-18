import { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from '../data/translations';
import { Copy, Check, Terminal, ChevronRight } from 'lucide-react';

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

  // Desktop indicator positions
  const desktopContainerRef = useRef(null);
  const desktopTabRefs = useRef({});
  const [desktopPill, setDesktopPill] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverPill, setHoverPill] = useState({ left: 0, width: 0, opacity: 0 });

  // Mobile indicator positions
  const mobileContainerRef = useRef(null);
  const mobileTabRefs = useRef({});
  const [mobilePill, setMobilePill] = useState({ left: 0, width: 0, opacity: 0 });

  // Measure and update active indicator coordinates
  const updateIndicators = useCallback(() => {
    // 1. Desktop indicator update
    const dContainer = desktopContainerRef.current;
    const dActiveEl = desktopTabRefs.current[activeTabKey];
    if (dContainer && dActiveEl) {
      const cRect = dContainer.getBoundingClientRect();
      const elRect = dActiveEl.getBoundingClientRect();
      setDesktopPill({
        left: elRect.left - cRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }

    // 2. Mobile indicator update
    const mContainer = mobileContainerRef.current;
    const mActiveEl = mobileTabRefs.current[activeTabKey];
    if (mContainer && mActiveEl) {
      setMobilePill({
        left: mActiveEl.offsetLeft,
        width: mActiveEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeTabKey]);

  useEffect(() => {
    // Initial and responsive measurements
    updateIndicators();
    const handleResize = () => {
      requestAnimationFrame(updateIndicators);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicators]);

  // Handle Desktop Hover Ghost Pill
  const handleDesktopTabHover = (key) => {
    if (key === activeTabKey) {
      setHoverPill(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const dContainer = desktopContainerRef.current;
    const targetEl = desktopTabRefs.current[key];
    if (dContainer && targetEl) {
      const cRect = dContainer.getBoundingClientRect();
      const elRect = targetEl.getBoundingClientRect();
      setHoverPill({
        left: elRect.left - cRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  };

  const handleDesktopTabLeave = () => {
    setHoverPill(prev => ({ ...prev, opacity: 0 }));
  };

  const handleTabClick = (key) => {
    setActiveTabKey(key);
    setCopied(false);
    setHoverPill(prev => ({ ...prev, opacity: 0 }));

    // Smooth scroll mobile tab into center view
    const mActiveEl = mobileTabRefs.current[key];
    if (mActiveEl && typeof mActiveEl.scrollIntoView === 'function') {
      mActiveEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const activeDetail = t.subNavDetails?.[activeTabKey];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="cli" className="border-subtle-b bg-[#0B0B11] relative">
      
      {/* Mobile: Sharp Horizontal Scroll Tabs Bar with Fluid Morphing Indicator */}
      <div className="relative md:hidden border-subtle-b bg-[#0B0B11]">
        <div 
          ref={mobileContainerRef}
          className="relative flex overflow-x-auto no-scrollbar scroll-smooth" 
          data-lenis-prevent
        >
          {/* Mobile Fluid Morphing Indicator Pill */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
            style={{
              transform: `translate3d(${mobilePill.left}px, 0, 0)`,
              width: `${mobilePill.width}px`,
              opacity: mobilePill.opacity,
            }}
          >
            <div className="w-full h-full bg-transparent border-b-2 border-cyan-400" />
          </div>

          {rawTabs.map((tab) => {
            const isActive = activeTabKey === tab.key;
            const displayName = t.subNavTabs?.[tab.key] || tab.default;
            return (
              <button
                key={tab.key}
                ref={(el) => (mobileTabRefs.current[tab.key] = el)}
                onClick={() => handleTabClick(tab.key)}
                className={`relative z-10 whitespace-nowrap py-3.5 px-4 text-xs font-mono transition-colors shrink-0 cursor-pointer rounded-none border-r border-white/5 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {/* Right Fade + Chevron Swipe Hint Overlay */}
        <div 
          className="pointer-events-none absolute right-0 top-0 h-full w-12 flex items-center justify-end pr-1 z-20" 
          style={{ background: 'linear-gradient(to right, transparent, var(--bg-dark) 80%)' }}
        >
          <ChevronRight size={14} className="text-slate-500 animate-bounce-x" />
        </div>
      </div>

      {/* Desktop: 6-Grid Tab Buttons Bar with Fluid Morphing Indicator */}
      <div 
        ref={desktopContainerRef}
        onMouseLeave={handleDesktopTabLeave}
        className="hidden md:grid md:grid-cols-6 border-subtle-b bg-[#0B0B11] relative overflow-hidden"
      >
        {/* Hover Ghost Pill (Follows cursor smoothly between inactive tabs) */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none transition-all duration-200 ease-out z-0"
          style={{
            transform: `translate3d(${hoverPill.left}px, 0, 0)`,
            width: `${hoverPill.width}px`,
            opacity: hoverPill.opacity,
          }}
        >
          <div className="w-full h-full bg-white/[0.02]" />
        </div>

        {/* Active Fluid Indicator (100% Transparent BG, Flat Crisp Bottom Border, Zero Glare) */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
          style={{
            transform: `translate3d(${desktopPill.left}px, 0, 0)`,
            width: `${desktopPill.width}px`,
            opacity: desktopPill.opacity,
          }}
        >
          {/* 100% Transparent Background */}
          <div className="w-full h-full bg-transparent" />

          {/* Flat Crisp Bottom Active Underline (No Glow, No Shadow) */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />
        </div>

        {/* Tab Buttons */}
        {rawTabs.map((tab) => {
          const isActive = activeTabKey === tab.key;
          const displayName = t.subNavTabs?.[tab.key] || tab.default;
          return (
            <button
              key={tab.key}
              ref={(el) => (desktopTabRefs.current[tab.key] = el)}
              onClick={() => handleTabClick(tab.key)}
              onMouseEnter={() => handleDesktopTabHover(tab.key)}
              className={`relative z-10 py-4 px-3 flex items-center justify-center text-xs font-mono font-medium transition-colors duration-200 border-r border-white/5 last:border-r-0 cursor-pointer select-none ${
                isActive
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="truncate">{displayName}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Interactive Detail Panel for Selected Tab */}
      {activeDetail && (
        <div key={activeTabKey} className="p-6 sm:p-8 bg-[#07080e] transition-all duration-300 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Subsystem Overview & Feature Pills */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {activeDetail.title}
              </h2>

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
                    <span className="text-cyan-400 font-bold mr-1">✓</span>{pill}
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
                  <div className="text-slate-400 text-[10px] pb-1">// Executing subsystem command</div>
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
