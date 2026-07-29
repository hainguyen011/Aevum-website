import React, { useState } from 'react';
import { translations } from '../data/translations';

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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-subtle-b bg-[#0B0B11]">
      {rawTabs.map((tab) => {
        const isActive = activeTabKey === tab.key;
        const displayName = t.subNavTabs[tab.key] || tab.default;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTabKey(tab.key)}
            className={`py-4 px-4 flex items-center justify-center text-xs font-mono font-medium transition-colors border-r border-white/5 last:border-r-0 ${
              isActive
                ? 'bg-cyan-500/10 text-cyan-300 font-bold border-b-2 border-b-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
            }`}
          >
            <span>{displayName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SubNavTabs;
