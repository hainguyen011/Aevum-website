import React from 'react';
import { translations } from '../data/translations';

export const BentoGrid = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  // Render title with cyan highlight span programmatically
  const titleText = t.bentoGrid.title;
  let titleNode = titleText;
  if (titleText.includes("Aevum OS")) {
    const parts = titleText.split("Aevum OS");
    titleNode = (
      <>
        {parts[0]}<span className="text-cyan-400">Aevum OS</span>{parts[1]}
      </>
    );
  }

  return (
    <div id="breakthroughs" className="border-subtle-b bg-[#0B0B11]">

      {/* Section Header Cell */}
      <div data-reveal className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] border-scan">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          {t.bentoGrid.tag}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          {titleNode}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          {t.bentoGrid.desc}
        </p>
      </div>

      {/* 2x2 Grid Layout with Staggered Scroll Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Breakthrough 1: Row 1 Left */}
        <div
          data-reveal
          data-reveal-delay="100"
          className="p-8 sm:p-10 lg:border-subtle-r flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">{t.bentoGrid.b1Title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              {t.bentoGrid.b1Desc}
            </p>
          </div>

          <div className="bg-[#030407] p-3.5 rounded-md border-subtle font-mono text-xs space-y-2">
            <div className="text-cyan-400 text-[11px] font-bold">
              {t.bentoGrid.b1Active}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">submit_ack</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">init_persona</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">resonance_trail</span>
            </div>
          </div>
        </div>

        {/* Breakthrough 2: Row 1 Right */}
        <div
          data-reveal
          data-reveal-delay="200"
          className="p-8 sm:p-10 border-subtle-b flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">{t.bentoGrid.b2Title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              {t.bentoGrid.b2Desc}
            </p>
          </div>

          <div className="code-box">
            <div className="code-header">
              <span className="text-[11px] font-mono text-slate-500">.aevum/domains/identity/config.json</span>
              <span className="text-[10px] text-slate-500">DDD OS Kernel</span>
            </div>
            <div className="p-3 text-[11px] font-mono leading-relaxed">
              <p className="text-slate-500">// External Brain Architecture</p>
              <p className="text-cyan-400">export const <span className="text-slate-200">identityDomain</span> = &#123;</p>
              <p className="pl-4 text-emerald-400">features: <span className="text-slate-300">["auth_flow", "sso_provider"],</span></p>
              <p className="pl-4 text-emerald-400">activePlan: <span className="text-slate-300">"PLAN_AUTH_V2.md"</span></p>
              <p className="text-cyan-400">&#125;;</p>
            </div>
          </div>
        </div>

        {/* Breakthrough 3: Row 2 Left */}
        <div
          data-reveal
          data-reveal-delay="300"
          className="p-8 sm:p-10 border-subtle-b lg:border-b-0 lg:border-subtle-r flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">{t.bentoGrid.b3Title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              {t.bentoGrid.b3Desc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            {t.bentoGrid.b3Pillars.map((pillar, idx) => (
              <div key={idx} className="p-2 rounded bg-white/[0.02] border-subtle text-slate-300">
                {pillar}
              </div>
            ))}
          </div>
        </div>

        {/* Breakthrough 4: Row 2 Right */}
        <div
          data-reveal
          data-reveal-delay="400"
          className="p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors"
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">{t.bentoGrid.b4Title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              {t.bentoGrid.b4Desc}
            </p>
          </div>

          <div className="bg-[#030407] p-3 rounded-md border-subtle font-mono text-xs space-y-1 text-[11px]">
            <div className="text-emerald-400 font-bold">{t.bentoGrid.b2Active}</div>
            <div className="text-slate-400 flex justify-between">
              <span>Proactive Thought Stream</span>
              <span className="text-cyan-400">{t.bentoGrid.b2Live}</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span>{t.bentoGrid.b2Connectivity}</span>
              <span className="text-slate-300">{t.bentoGrid.b2Verified}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BentoGrid;
