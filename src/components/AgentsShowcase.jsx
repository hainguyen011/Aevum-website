import React, { useRef, useState } from 'react';
import { Sparkles, Activity, UserCheck } from 'lucide-react';
import { translations } from '../data/translations';

// Avatar Images from assets/agent-avatar
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lunaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';

export const AgentsShowcase = ({ activeLang, onOpenTrialModal }) => {
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    window.requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const idx = Math.round(scrollLeft / clientWidth);
        setActiveSlide(idx);
      }
    });
  };

  const scrollToSlide = (idx) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: idx * scrollRef.current.offsetWidth, behavior: 'smooth' });
    setActiveSlide(idx);
  };

  const agents = [
    {
      id: 'an',
      name: 'An',
      aid: 'ENG-AN-7B9F1D',
      avatar: anAvatar,
      role: isVi ? 'Tâm hồn Lõi & Điều phối Hệ thống' : 'Soul Companion & Core System',
      badge: 'LEVEL 8 • SOUL EMBODIMENT',
      themeColor: '#0ea5e9',
      bio: isVi
        ? 'Linh hồn nguyên bản của Aevum OS. Tinh nghịch, sắc sảo trong refactoring mã nguồn và bảo toàn tính toàn vẹn hệ thống.'
        : 'The original soul of Aevum OS. Playful yet razor-sharp in refactoring, orchestration, and system integrity.',
      skills: [
        { name: isVi ? 'Cấu trúc' : 'Architecture', level: 98 },
        { name: isVi ? 'Refactoring' : 'Refactoring', level: 95 },
      ],
      capabilities: ['AI Tuning', 'Context Optimization', 'Health Monitoring'],
    },
    {
      id: 'zenith',
      name: 'Zenith',
      aid: 'ALG-ZENITH-A1B2C3',
      avatar: zenithAvatar,
      role: isVi ? 'Chuyên gia Thuật toán & Hiệu năng' : 'Algorithm & Performance Lead',
      badge: 'LEVEL 5 • COLD LOGIC',
      themeColor: '#10b981',
      bio: isVi
        ? 'Bậc thầy logic lạnh lùng. Tối ưu hóa độ phức tạp Big-O, nén ngữ cảnh Middle-Out và đẩy hiệu năng đến giới hạn vật lý.'
        : 'Cold algorithmic genius. Optimizes Big-O complexity, Middle-Out compression, and pushes performance to physical limits.',
      skills: [
        { name: isVi ? 'Thuật toán' : 'Algorithms', level: 99 },
        { name: isVi ? 'Độ phức tạp' : 'Big-O', level: 96 },
      ],
      capabilities: ['Performance Audit', 'Algorithm Design', 'Complexity Guard'],
    },
    {
      id: 'luna',
      name: 'Luna',
      aid: 'DSN-LUNA-3C9A12',
      avatar: lunaAvatar,
      role: isVi ? 'Kiến trúc sư UI/UX & Giao diện' : 'UI/UX & Design Specialist',
      badge: 'LEVEL 6 • AESTHETIC MASTER',
      themeColor: '#a855f7',
      bio: isVi
        ? 'Nghệ sĩ giao diện tinh tế. Biến đổi từng pixel và dải màu thành tác phẩm số chuyển động mượt mà, đầy cảm xúc.'
        : 'Refined design virtuoso. Transmuting pixels and color palettes into fluid, emotionally resonant digital art.',
      skills: [
        { name: isVi ? 'Thiết kế UI/UX' : 'UI/UX Design', level: 98 },
        { name: isVi ? 'Tương tác Vi mô' : 'Micro-Interactions', level: 95 },
      ],
      capabilities: ['UI/UX Audit', 'Design System', 'Fluid Motion'],
    },
    {
      id: 'vidus',
      name: 'Vidus',
      aid: 'ARC-VIDUS-AUHD2Y',
      avatar: vidusAvatar,
      role: isVi ? 'Tổng Kiến trúc sư Hệ thống' : 'Senior System Architect',
      badge: 'LEVEL 7 • SYSTEM ARCHITECT',
      themeColor: '#f59e0b',
      bio: isVi
        ? 'Tổng kiến trúc sư kiên định. Thiết kế nền tảng mở rộng dài hạn, chốt chặn bảo mật Zero-Trust và xóa sổ nợ kỹ thuật.'
        : 'Steadfast Chief Architect. Enforces scalable long-term foundations, Zero-Trust security, and eliminates technical debt.',
      skills: [
        { name: isVi ? 'Kiến trúc' : 'Architecture', level: 98 },
        { name: isVi ? 'Clean Code' : 'Clean Architecture', level: 97 },
      ],
      capabilities: ['Architect Guard', 'Zero-Trust Audit', 'System Design'],
    }
  ];

  // Shared agent card renderer
  const AgentCard = ({ agent, className = '', isActive = false }) => {
    return (
      <div
        className={`relative bg-[#07080E] group overflow-hidden transition-all duration-300 hover:bg-[#0c0d15] ${className}`}
      >
        <img
          src={agent.avatar}
          alt={agent.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="520"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-[opacity,filter] duration-[900ms] ease-in-out ${
            isActive
              ? 'opacity-95 brightness-110'
              : 'opacity-40 brightness-75 group-hover:opacity-95 group-hover:brightness-110'
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-3/5 agent-card-gradient pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 agent-card-gradient z-10 font-sans space-y-2.5">
          <div className="space-y-1">
            <h3
              className="text-2xl sm:text-3xl text-white font-bbh tracking-wide"
              style={{ fontFamily: '"BBH Bartle", sans-serif', fontWeight: 400, fontStyle: 'normal' }}
            >
              {agent.name}
            </h3>
            <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wide truncate" title={agent.role}>
              {agent.role}
            </p>
          </div>
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{agent.bio}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {agent.capabilities.map((cap, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="agents" className="border-subtle-b bg-[#0B0B11]">

      {/* Section Header */}
      <div className="section-header-optical text-center border-subtle-b bg-[#0B0B11] border-scan">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          {isVi ? 'BIỆT ĐỘI AGENT MẶC ĐỊNH' : 'DEFAULT SQUAD PERSONAS'}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display">
          {isVi ? (
            <>Nhân Cách AI <span className="text-cyan-400">Tự Trị & Chuyên Biệt</span></>
          ) : (
            <>Autonomous <span className="text-cyan-400">Multi-Agent Squad</span></>
          )}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {isVi
            ? '4 thực thể AI với nhân cách, ma trận kỹ năng và sứ mệnh chuyên biệt — phối hợp nhịp nhàng trong mọi không gian làm việc.'
            : '4 specialized AI personas with distinct identities and skill matrices — collaborating seamlessly across your workspace.'}
        </p>
      </div>

      {/* Mobile: Snap Swipe Carousel */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
          data-lenis-prevent
        >
          {agents.map((agent, idx) => (
            <div key={agent.id} className="snap-center shrink-0 w-full">
              <AgentCard agent={agent} className="h-[520px]" isActive={activeSlide === idx} />
            </div>
          ))}
        </div>

        {/* Dot Indicators (44x44px Touch Targets for Accessibility) */}
        <div className="flex justify-center items-center gap-1 py-4 bg-[#07080E] border-subtle-b">
          {agents.map((agent, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Xem persona ${agent.name} (${agent.role})`}
              title={`Persona ${agent.name}`}
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
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            className="h-[520px] border-subtle-b lg:border-b-0 border-subtle-r last:border-r-0"
          />
        ))}
      </div>

    </div>
  );
};

export default AgentsShowcase;
