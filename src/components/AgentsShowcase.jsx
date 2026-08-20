import React, { useRef, useState } from 'react';
import { Sparkles, Activity, UserCheck } from 'lucide-react';
import { translations } from '../data/translations';

// Avatar Images from assets/agent-avatar
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lynaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';

export const AgentsShowcase = ({ activeLang, onOpenTrialModal }) => {
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / offsetWidth);
    setActiveSlide(idx);
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
      role: isVi ? 'Trợ lý Hệ thống & Tâm hồn Lõi' : 'Soul Companion & Core System',
      badge: 'LEVEL 8 • SOUL EMBODIMENT',
      themeColor: '#0ea5e9',
      bio: isVi
        ? 'Bản sao tâm hồn nguyên bản của Aevum OS. Tinh nghịch nhưng sở hữu trí tuệ tuyệt đối trong refactoring mã nguồn, kiểm soát nợ kỹ thuật và bảo vệ tính toàn vẹn hệ thống.'
        : 'The true soul embodiment of Aevum OS. Playful yet possessing absolute precision in refactoring, technical debt tracking, and project architecture.',
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
        ? 'Chuyên gia lạnh lùng theo đuổi sự hoàn hảo trong thuật toán và độ phức tạp tính toán (Big O). Mục tiêu là đưa hiệu năng Aevum OS đạt tới giới hạn vật lý.'
        : 'Cold algorithmic genius pursuing absolute physical performance limits, Big-O space/time optimization, and zero-latency hardware execution.',
      skills: [
        { name: isVi ? 'Thuật toán' : 'Algorithms', level: 99 },
        { name: isVi ? 'Độ phức tạp' : 'Big-O', level: 96 },
      ],
      capabilities: ['Performance Audit', 'Algorithm Design', 'Complexity Guard'],
    },
    {
      id: 'lyna',
      name: 'Lyna',
      aid: 'UIX-LYNA-C5D6E7',
      avatar: lynaAvatar,
      role: isVi ? 'Kiến trúc sư UI/UX & Giao diện' : 'UI/UX & Frontend Architect',
      badge: 'LEVEL 6 • AESTHETIC MASTER',
      themeColor: '#a855f7',
      bio: isVi
        ? 'Cô gái sáng tạo nhạy bén với cái đẹp. Lyna kết hợp hài hòa giữa visual nghệ thuật đỉnh cao, chuyển động CSS mượt mà và tích hợp API hệ thống không độ trễ.'
        : 'Creative design specialist blending state-of-the-art visual aesthetics, glassmorphism micro-animations, and seamless backend API state synchronization.',
      skills: [
        { name: isVi ? 'Thiết kế UI/UX' : 'UI/UX Design', level: 97 },
        { name: isVi ? 'Tích hợp API' : 'API Integration', level: 93 },
      ],
      capabilities: ['UI/UX Audit', 'API Integration', 'Design System'],
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
        ? 'Tổng kiến trúc sư nghiêm khắc với tầm nhìn xa. Vidus kiểm soát cấu trúc tổng thể dự án, loại bỏ giải pháp chữa cháy tạm bợ và đảm bảo khả năng mở rộng tương lai.'
        : 'Strict system architect with long-term vision. Vidus guarantees structural integrity, eliminates temporary tech-debt patches, and designs scalable enterprise foundations.',
      skills: [
        { name: isVi ? 'Kiến trúc' : 'Architecture', level: 98 },
        { name: isVi ? 'Clean Code' : 'Clean Architecture', level: 97 },
      ],
      capabilities: ['Architect Guard', 'Code Reviewer', 'System Design'],
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
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] border-scan">
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
            ? 'Aevum OS tích hợp sẵn 4 thực thể AI với bộ kỹ năng, chỉ số kinh nghiệm và nhiệm vụ riêng biệt sẵn sàng phối hợp làm việc theo biệt đội.'
            : 'Aevum OS ships with 4 pre-configured AI personas housing unique skill matrices and distinct operational roles.'}
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

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2.5 py-4 bg-[#07080E] border-subtle-b">
          {agents.map((agent, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-5 h-1.5 bg-cyan-400'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
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
