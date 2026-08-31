import React, { useRef, useState } from 'react';
import { translations } from '../data/translations';

export const Testimonials = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const reviews = [
    {
      name: 'Richard Hendricks',
      handle: '@richard_pp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=75&fm=webp',
      text: t.testimonials.r1Text,
      role: 'Founder & CEO, Pied Piper',
    },
    {
      name: 'Bertram Gilfoyle',
      handle: '@gilfoyle_laVey',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=75&fm=webp',
      text: t.testimonials.r2Text,
      role: 'Systems Architect, Pied Piper',
    },
    {
      name: 'Dinesh Chugtai',
      handle: '@dinesh_pp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=75&fm=webp',
      text: t.testimonials.r3Text,
      role: 'Senior Engineer, Pied Piper',
    },
    {
      name: 'Jared Dunn',
      handle: '@jared_pp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=75&fm=webp',
      text: t.testimonials.r4Text,
      role: 'Chief Operating Officer, Pied Piper',
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    window.requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, children, clientWidth } = scrollRef.current;
      const cardWidth = children[0]?.clientWidth ?? clientWidth ?? 300;
      if (cardWidth > 0) {
        const idx = Math.round(scrollLeft / cardWidth);
        setActiveSlide(Math.min(Math.max(0, idx), reviews.length - 1));
      }
    });
  };

  const scrollToSlide = (idx) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth ?? scrollRef.current.clientWidth ?? 300;
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveSlide(idx);
  };

  // Highlight Community in title
  const titleText = t.testimonials.title;
  let titleNode = titleText;
  if (titleText.includes('Community')) {
    const parts = titleText.split('Community');
    titleNode = <>{parts[0]}<span className="text-cyan-400">Community</span>{parts[1]}</>;
  } else if (titleText.includes('Cộng đồng')) {
    const parts = titleText.split('Cộng đồng');
    titleNode = <>{parts[0]}<span className="text-cyan-400">Cộng đồng</span>{parts[1]}</>;
  }

  const ReviewCard = ({ rev, className = '' }) => (
    <div className={`flex flex-col justify-between bg-transparent hover:bg-white/[0.02] transition-colors group shadow-none ${className}`}>
      <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <img
            src={rev.avatar}
            alt={rev.name}
            loading="lazy"
            decoding="async"
            width="40"
            height="40"
            className="w-10 h-10 rounded-full object-cover border border-[#0ea5e9]/40"
          />
          <div>
            <h3 className="text-xs font-bold text-white leading-none font-display">{rev.name}</h3>
            <span className="text-[11px] text-slate-400 font-mono">{rev.handle}</span>
          </div>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">
          {rev.text}
        </p>
      </div>
      <div className="border-subtle-t px-6 sm:px-8 py-4 text-[11px] text-white font-mono flex items-center font-semibold">
        {rev.role}
      </div>
    </div>
  );

  return (
    <div id="testimonials" className="border-subtle-b bg-[#0B0B11]">

      {/* Header & Metrics */}
      <div data-reveal className="p-8 sm:p-12 border-subtle-b border-scan">
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

          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-8 sm:gap-10">
            <div data-reveal data-reveal-delay="100" className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">5k+</div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.installs}</p>
            </div>
            <div data-reveal data-reveal-delay="200" className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">-85%</div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.score}</p>
            </div>
            <div data-reveal data-reveal-delay="300" className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">0.0s</div>
              <p className="text-xs text-slate-400 font-medium">{t.testimonials.bootTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full Width Single Card Carousel */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory py-0"
          data-lenis-prevent
        >
          {reviews.map((rev, idx) => (
            <div key={idx} className="snap-start shrink-0 w-full">
              <ReviewCard rev={rev} className="border-0 shadow-none h-full" />
            </div>
          ))}
        </div>

        {/* Dot Indicators (44x44px Touch Targets for Accessibility) */}
        <div className="flex justify-center items-center gap-1 py-3 border-subtle-t">
          {reviews.map((rev, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Xem nhận xét từ ${rev.name} (${rev.role})`}
              title={`Nhận xét của ${rev.name}`}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer p-2"
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? 'w-6 h-2 bg-cyan-400'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: 4-Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-4">
        {reviews.map((rev, idx) => (
          <ReviewCard
            key={idx}
            rev={rev}
            className="border-subtle-r last:border-r-0"
          />
        ))}
      </div>

    </div>
  );
};

export default Testimonials;
