import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../data/translations';

// Sticker Imports from Agent Collections (Optimized WebP)
import anHiSticker from '../../assets/stickers/An_Collection/An_Hi.webp';
import zenithCuriosSticker from '../../assets/stickers/Zenith_Collection/Zenith_Curios.webp';
import lunaLoverSticker from '../../assets/stickers/Luna_Collection/Luna_Lover.webp';
import vidusHipeSticker from '../../assets/stickers/Vidus_Collection/Vidus_Hipe.webp';

export const BentoGrid = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  // Typewriter Speech State
  const [typedSpeech, setTypedSpeech] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, children } = scrollRef.current;
    const cardWidth = children[0]?.offsetWidth ?? scrollRef.current.offsetWidth;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(0, idx), items.length - 1));
  };

  const scrollToSlide = (idx) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.offsetWidth ?? scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveSlide(idx);
  };

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

  const items = [
    {
      id: "01",
      tag: "HANDSHAKE & SOUL SYNC",
      num: "01",
      title: t.bentoGrid.b1Title,
      desc: t.bentoGrid.b1Desc,
      agentName: "An • Soul Companion",
      speech: t.bentoGrid.b1Speech,
      sticker: anHiSticker,
      badgeColor: "border-cyan-400/40 text-cyan-400 bg-cyan-500/10",
      glowColor: "from-cyan-500/20 to-blue-600/10"
    },
    {
      id: "02",
      tag: "DOMAIN-DRIVEN BRAIN (DDD)",
      num: "02",
      title: t.bentoGrid.b2Title,
      desc: t.bentoGrid.b2Desc,
      agentName: "Zenith • System Architect",
      speech: t.bentoGrid.b2Speech,
      sticker: zenithCuriosSticker,
      badgeColor: "border-indigo-400/40 text-indigo-400 bg-indigo-500/10",
      glowColor: "from-indigo-500/20 to-purple-600/10"
    },
    {
      id: "03",
      tag: "AUTONOMOUS SQUAD OS",
      num: "03",
      title: t.bentoGrid.b3Title,
      desc: t.bentoGrid.b3Desc,
      agentName: "Luna • UI/UX Specialist",
      speech: t.bentoGrid.b3Speech,
      sticker: lunaLoverSticker,
      badgeColor: "border-pink-400/40 text-pink-400 bg-pink-500/10",
      glowColor: "from-pink-500/20 to-rose-600/10"
    },
    {
      id: "04",
      tag: "PIPERNET IOA MESH",
      num: "04",
      title: t.bentoGrid.b4Title,
      desc: t.bentoGrid.b4Desc,
      agentName: "Vidus • Security Auditor",
      speech: t.bentoGrid.b4Speech,
      sticker: vidusHipeSticker,
      badgeColor: "border-emerald-400/40 text-emerald-400 bg-emerald-500/10",
      glowColor: "from-emerald-500/20 to-teal-600/10"
    }
  ];

  // Trigger typewriter effect on slide switch or language change
  useEffect(() => {
    const fullSpeech = items[activeSlide]?.speech || '';
    setTypedSpeech('');
    setIsTyping(true);
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullSpeech.length) {
        currentIdx++;
        setTypedSpeech(fullSpeech.slice(0, currentIdx));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activeSlide, activeLang]);

  return (
    <div id="breakthroughs" className="border-subtle-b bg-[#0B0B11]">

      {/* Section Header Cell */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] border-scan">
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

      {/* Mobile Carousel View (lg:hidden) */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory py-0"
          data-lenis-prevent
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-full p-6 sm:p-8 flex flex-col justify-between group bg-[#07080d]/60 border-b border-white/10"
            >
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-white/20">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Cloud Speech Bubble & Sticker for Mobile */}
              <div className="flex flex-col items-center space-y-4 pt-2">
                <div className="relative bg-white text-slate-900 p-4 rounded-xl border border-white/40 shadow-none text-center max-w-xs transition-all duration-300 animate-pop-in">
                  <div className="text-[10px] font-mono font-bold text-cyan-700 mb-1">
                    {item.agentName}
                  </div>
                  <p className="text-slate-900 text-xs leading-relaxed font-sans font-semibold">
                    "{activeSlide === idx ? typedSpeech : item.speech}"
                    {activeSlide === idx && isTyping && (
                      <span className="inline-block w-1 h-3 ml-0.5 bg-cyan-600 animate-pulse align-middle"></span>
                    )}
                  </p>
                  {/* Cloud Tail Pointing Down to Agent with matching border */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-inherit rotate-45"></div>
                </div>
                <img
                  src={item.sticker}
                  alt={item.agentName}
                  loading="lazy"
                  decoding="async"
                  width="128"
                  height="128"
                  className="h-32 w-auto object-contain select-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex justify-center items-center gap-2.5 py-3 border-subtle-t">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1} - ${items[idx].title}`}
              className={`transition-all duration-300 rounded-full cursor-pointer p-1 ${
                activeSlide === idx
                  ? 'w-5 h-2 bg-cyan-400'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Interactive Carousel Showcase (lg:block) */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8 py-12">
        {/* Main Stage Grid */}
        <div className="relative p-10 sm:p-12 rounded-3xl bg-[#07080d]/80 border border-white/10 overflow-hidden shadow-none transition-all duration-500">
          
          {/* Ambient Background Radial Glow */}
          <div className={`absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-br ${items[activeSlide].glowColor} blur-3xl opacity-50 pointer-events-none transition-all duration-700`}></div>

          <div className="grid grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Title & Feature Details (5 cols) */}
            <div className="col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${items[activeSlide].badgeColor}`}>
                  {items[activeSlide].tag}
                </span>
                <span className="text-xs font-mono font-extrabold text-white/30">
                  {items[activeSlide].num} / 04
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                {items[activeSlide].title}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {items[activeSlide].desc}
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-cyan-500/20 hover:border-cyan-400/50 text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-cyan-500/20 hover:border-cyan-400/50 text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Column: Cloud Speech Bubble & Agent Sticker Stage (7 cols) */}
            <div className="col-span-7 flex flex-col items-center justify-center space-y-6">
              
              {/* Cloud Speech Bubble with Pop-In Animation & Live Typewriter Effect */}
              <div
                key={`bubble-${activeSlide}`}
                className="relative bg-white text-slate-900 p-6 rounded-2xl border border-white/40 shadow-none max-w-lg transition-all duration-300 animate-pop-in"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-extrabold text-cyan-700 uppercase tracking-wider">
                    {items[activeSlide].agentName}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">VOICE STREAM</span>
                </div>
                
                <p className="text-slate-900 text-sm sm:text-base font-semibold leading-relaxed font-sans min-h-[52px]">
                  "{typedSpeech}"
                  {isTyping && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-600 animate-pulse align-middle"></span>
                  )}
                </p>

                {/* Cloud Tail Pointing Down to Agent with matching border */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-inherit rotate-45"></div>
              </div>

              {/* Floating Agent Sticker */}
              <div className="relative pt-2">
                <img
                  key={activeSlide}
                  src={items[activeSlide].sticker}
                  alt={items[activeSlide].agentName}
                  loading="lazy"
                  decoding="async"
                  width="208"
                  height="208"
                  className="h-44 sm:h-52 w-auto object-contain transition-all duration-500 animate-pulse-slow select-none"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Thumbnail Selector Bar */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? 'bg-cyan-500/10 border-cyan-400/60 shadow-none'
                  : 'bg-[#090b14]/60 border-white/10 hover:bg-white/[0.03] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400">{item.num}</span>
              </div>
              <p className="text-xs font-bold text-white truncate font-display">{item.title}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BentoGrid;
