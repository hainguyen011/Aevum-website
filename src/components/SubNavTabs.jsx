import React, { useState } from 'react';

export const SubNavTabs = () => {
  const [activeTab, setActiveTab] = useState('Standalone OS Kernel');

  const tabs = [
    'Standalone OS Kernel',
    'Handshake Ritual',
    'Domain DDD Brain',
    'Squad Orchestration',
    'Plan-First Pipeline',
    'PiperNet (IoA)',
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-subtle-b bg-[#0B0B11]">
      {tabs.map((tabName) => {
        const isActive = activeTab === tabName;
        return (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`py-4 px-4 flex items-center justify-center text-xs font-mono font-medium transition-colors border-r border-white/5 last:border-r-0 ${
              isActive
                ? 'bg-cyan-500/10 text-cyan-300 font-bold border-b-2 border-b-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
            }`}
          >
            <span>{tabName}</span>
          </button>
        );
      })}
    </div>
  );
};
