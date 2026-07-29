import React from 'react';
import { translations } from '../data/translations';

export const Testimonials = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  const reviews = [
    {
      name: 'Richard Hendricks',
      handle: '@richard_pp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      text: t.testimonials.r1Text,
      role: 'Founder & CEO, Pied Piper',
    },
    {
      name: 'Bertram Gilfoyle',
      handle: '@gilfoyle_laVey',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      text: t.testimonials.r2Text,
      role: 'Systems Architect, Pied Piper',
    },
    {
      name: 'Dinesh Chugtai',
      handle: '@dinesh_pp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      text: t.testimonials.r3Text,
      role: 'Senior Engineer, Pied Piper',
    },
    {
      name: 'Jared Dunn',
      handle: '@jared_pp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      text: t.testimonials.r4Text,
      role: 'Chief Operating Officer, Pied Piper',
    },
  ];

  // Programmatically highlight Pied Piper & Community
  const titleText = t.testimonials.title;
  let titleNode = titleText;
  if (titleText.includes("Pied Piper & Community")) {
    const parts = titleText.split("Pied Piper & Community");
    titleNode = (
      <>
        {parts[0]}<span className="gradient-text">Pied Piper & Community</span>{parts[1]}
      </>
    );
  } else if (titleText.includes("Pied Piper & Cộng đồng")) {
    const parts = titleText.split("Pied Piper & Cộng đồng");
    titleNode = (
      <>
        {parts[0]}<span className="gradient-text">Pied Piper & Cộng đồng</span>{parts[1]}
      </>
    );
  }

  return (
    <div className="border-subtle-b bg-[#0B0B11]">
      
      {/* Header & Metrics Section */}
      <div className="p-8 sm:p-12 border-subtle-b">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-2">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
              {t.testimonials.tag}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {titleNode}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.testimonials.desc}
            </p>
          </div>

          {/* Metric Stats */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-8 sm:gap-10">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                5k+
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.installs}</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                99.9%
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.score}</p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                0.0s
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.bootTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Monolithic Grid Cells (Edge-to-edge horizontal divider lines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((rev, idx) => (
          <div 
            key={idx} 
            className="border-subtle-r last:border-r-0 flex flex-col justify-between hover:bg-[#0e0f17] transition-colors group"
          >
            {/* Top Review Content Area */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white leading-none font-display">{rev.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono">{rev.handle}</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {rev.text}
              </p>
            </div>

            {/* Edge-to-Edge Divider Line & Role Label */}
            <div className="border-subtle-t px-8 py-4 text-[11px] text-cyan-300/80 font-mono">
              {rev.role}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Testimonials;
