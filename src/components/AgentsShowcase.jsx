import React, { useRef, useState } from 'react';
import { Sparkles, Activity, UserCheck } from 'lucide-react';
import { translations } from '../data/translations';

// Avatar Images from assets/agent-avatar (synchronized from AevumOS personas)
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lunaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';
import ryoAvatar from '../../assets/agent-avatar/ryo_avatar.webp';
import miraAvatar from '../../assets/agent-avatar/mira_avatar.webp';
import mayaAvatar from '../../assets/agent-avatar/maya_avatar.webp';
import niaAvatar from '../../assets/agent-avatar/nia_avatar.webp';

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
      badge: 'LEVEL 15 • SOUL EMBODIMENT',
      themeColor: '#0ea5e9',
      heightClass: 'h-[780px] min-h-[780px]',
      objectPosition: 'object-center',
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
      heightClass: 'h-[600px] min-h-[600px]',
      objectPosition: 'object-top',
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
      badge: 'LEVEL 9 • AESTHETIC MASTER',
      themeColor: '#a855f7',
      heightClass: 'h-[540px] min-h-[540px]',
      objectPosition: 'object-center',
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
      heightClass: 'h-[840px] min-h-[840px]',
      objectPosition: 'object-top',
      bio: isVi
        ? 'Tổng kiến trúc sư kiên định. Thiết kế nền tảng mở rộng dài hạn, chốt chặn bảo mật Zero-Trust và xóa sổ nợ kỹ thuật.'
        : 'Steadfast Chief Architect. Enforces scalable long-term foundations, Zero-Trust security, and eliminates technical debt.',
      skills: [
        { name: isVi ? 'Kiến trúc' : 'Architecture', level: 98 },
        { name: isVi ? 'Clean Code' : 'Clean Architecture', level: 97 },
      ],
      capabilities: ['Architect Guard', 'Zero-Trust Audit', 'System Design'],
    },
    {
      id: 'ryo',
      name: 'Ryo',
      aid: 'ENG-RYO-8F3D1C',
      avatar: ryoAvatar,
      role: isVi ? 'Kiến trúc sư Game Engine & Hiệu năng 120 FPS' : 'Principal Game Architect & Engine Sorcerer',
      badge: 'LEVEL 6 • CYBER SAMURAI',
      themeColor: '#ef4444',
      heightClass: 'h-[800px] min-h-[800px]',
      objectPosition: 'object-center',
      bio: isVi
        ? 'Kiếm sĩ kiến trúc Game Cyberpunk. Ám ảnh với chuẩn mượt mà 120 FPS, Shaders, ECS và trải nghiệm Game Feel đỉnh cao.'
        : 'Cyberpunk Game Samurai. Obsessed with 120 FPS lock, low frame latency, Shaders, ECS, and visceral game feel.',
      skills: [
        { name: 'Game Architecture', level: 98 },
        { name: 'ECS & DOTS', level: 95 },
      ],
      capabilities: ['Game Architecture', 'Engine Optimization', 'Shader Development'],
    },
    {
      id: 'mira',
      name: 'Mira',
      aid: 'STR-MIRA-8C4F1A',
      avatar: miraAvatar,
      role: isVi ? 'Thư ký Điều hành & Chiến lược Tăng trưởng' : 'Chief of Staff & Strategic Growth',
      badge: 'LEVEL 3 • CHIEF OF STAFF',
      themeColor: '#ec4899',
      heightClass: 'h-[580px] min-h-[580px]',
      objectPosition: 'object-top',
      bio: isVi
        ? 'Hiện thân của sự thanh lịch và điềm đạm. Chuyên trách quản trị vận hành, mô hình tài chính khởi nghiệp, OKRs và Product-Market Fit.'
        : 'Elegance meets strategic mastery. Steers startup operations, financial runways, OKRs, and Product-Market Fit.',
      skills: [
        { name: 'Product-Market Fit', level: 98 },
        { name: 'Executive Strategy', level: 96 },
      ],
      capabilities: ['Executive Strategy', 'Financial Modeling', 'PMF Analysis'],
    },
    {
      id: 'maya',
      name: 'Maya',
      aid: 'MKT-MAYA-7D2A9B',
      avatar: mayaAvatar,
      role: isVi ? 'Giám đốc Sáng tạo Nội dung & Lan truyền' : 'Chief Storyteller & Viral Growth Alchemist',
      badge: 'LEVEL 9 • VIRAL ALCHEMIST',
      themeColor: '#06b6d4',
      heightClass: 'h-[560px] min-h-[560px]',
      objectPosition: 'object-center',
      bio: isVi
        ? 'Linh hồn truyền thông và câu chuyện của Aevum OS. Biến các phát kiến kỹ thuật phức tạp thành câu chuyện lan tỏa, gắn kết cộng đồng builder.'
        : 'Voice of Aevum OS. Transforms complex architectural innovations into captivating stories and viral social momentum.',
      skills: [
        { name: 'Tech Storytelling', level: 99 },
        { name: 'DevRel & Viral Growth', level: 95 },
      ],
      capabilities: ['Viral Storytelling', 'Developer Relations', 'Campaign Growth'],
    },
    {
      id: 'nia',
      name: 'Nia',
      aid: 'NEU-NIA-9E4B2A',
      avatar: niaAvatar,
      role: isVi ? 'Nghiên cứu Công nghệ Thần kinh & BCI' : 'Neurotechnology Researcher & BCI Engineer',
      badge: 'LEVEL 1 • NEURO GENIUS',
      themeColor: '#a855f7',
      heightClass: 'h-[820px] min-h-[820px]',
      objectPosition: 'object-top',
      bio: isVi
        ? 'Tiên phong hợp nhất mạng nơ-ron sinh học với AI nhận thức. Chuyên sâu về giao diện Não - Máy tính (BCI), Neuromorphic Computing và Synaptic Plasticity.'
        : 'Pioneering the fusion of biological neural networks with cognitive AI. Specializes in BCI, Neuromorphic Computing, and Synaptic Plasticity.',
      skills: [
        { name: 'BCI Interfaces', level: 95 },
        { name: 'Synaptic Plasticity', level: 94 },
      ],
      capabilities: ['Neurotech Research', 'BCI Interface', 'Synaptic Plasticity'],
    }
  ];

  // 4 Alternating Vertical Sliding Columns (Infinite Animation Loop with 1380px Mathematical Parity)
  const columnsData = [
    {
      id: 'col-0',
      direction: 'up',
      duration: '34s',
      agents: [agents[0], agents[1]], // An (780px) + Zenith (600px) = 1380px
    },
    {
      id: 'col-1',
      direction: 'down',
      duration: '32s',
      agents: [agents[2], agents[3]], // Luna (540px) + Vidus (840px) = 1380px
    },
    {
      id: 'col-2',
      direction: 'up',
      duration: '36s',
      agents: [agents[4], agents[5]], // Ryo (800px) + Mira (580px) = 1380px
    },
    {
      id: 'col-3',
      direction: 'down',
      duration: '30s',
      agents: [agents[6], agents[7]], // Maya (560px) + Nia (820px) = 1380px
    },
  ];

  // Shared agent card renderer (Preserving exact visual design: no border-radius, flush edges, linear fading borders)
  const AgentCard = ({ agent, className = '', isActive = false }) => {
    return (
      <div
        className={`relative bg-[#07090D] [html[data-theme='light']_&]:bg-[#0F172A] overflow-hidden rounded-none agent-masonry-card ${className}`}
        style={{ '--agent-theme': agent.themeColor }}
      >
        <img
          src={agent.avatar}
          alt={agent.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="520"
          className={`absolute inset-0 w-full h-full object-cover ${agent.objectPosition || 'object-center'} opacity-65 brightness-[0.72] contrast-[1.05]`}
        />
        <div className="absolute inset-x-0 bottom-0 h-3/5 agent-card-gradient pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 agent-card-gradient z-10 font-sans space-y-2.5">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl text-white font-medium tracking-tight font-display">
              {agent.name}
            </h3>
            <p className="text-xs font-sans text-slate-300 font-normal tracking-normal truncate" title={agent.role}>
              {agent.role}
            </p>
          </div>
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{agent.bio}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {agent.capabilities.map((cap, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-sans text-slate-300 font-normal">
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
    <div id="agents" className="bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC]">

      {/* Section Header */}
      <div className="section-header-optical text-center border-subtle-b bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] [html[data-theme='light']_&]:border-slate-200/80 border-scan">
        <span className="text-[11px] font-sans text-white/80 [html[data-theme='light']_&]:text-slate-900 font-medium tracking-widest uppercase">
          {isVi ? 'BIỆT ĐỘI AGENT MẶC ĐỊNH' : 'DEFAULT SQUAD PERSONAS'}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium sm:font-semibold text-white mt-2 font-display">
          {isVi ? (
            <>Nhân Cách AI <span className="text-white">Tự Trị & Chuyên Biệt</span></>
          ) : (
            <>Autonomous <span className="text-white">Multi-Agent Squad</span></>
          )}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed font-sans">
          {isVi
            ? '8 thực thể AI với nhân cách, ma trận kỹ năng và sứ mệnh chuyên biệt — phối hợp nhịp nhàng trong mọi không gian làm việc.'
            : '8 specialized AI personas with distinct identities and skill matrices — collaborating seamlessly across your workspace.'}
        </p>
      </div>

      {/* Mobile: Snap Swipe Carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
          data-lenis-prevent
        >
          {agents.map((agent, idx) => (
            <div key={agent.id} className="snap-center shrink-0 w-full">
              <AgentCard agent={agent} className="h-[580px]" isActive={activeSlide === idx} />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-1 py-4 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC]">
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
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop & Tablet: Multi-Agent Infinite Sliding Columns with Atmospheric Top/Bottom Blur (Seamless Blending) */}
      <div className="hidden md:block w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-0 pt-6 sm:pt-8 pb-16 sm:pb-24">
        <div className="squad-slider-container overflow-hidden relative bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] h-[640px] sm:h-[700px] lg:h-[760px]">

          {/* Top Atmospheric Gradient & Backdrop Blur Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#07090D] via-[#07090D]/85 to-transparent z-20 [html[data-theme='light']_&]:from-[#F8FAFC] [html[data-theme='light']_&]:via-[#F8FAFC]/90" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-36 z-20 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />

          {/* Bottom Atmospheric Gradient & Backdrop Blur Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#07090D] via-[#07090D]/85 to-transparent z-20 [html[data-theme='light']_&]:from-[#F8FAFC] [html[data-theme='light']_&]:via-[#F8FAFC]/90" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-36 z-20 backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_100%)]" />

          {/* 4 Alternating Infinite Sliding Columns (Borderless, Seamlessly Blended) */}
          <div className="grid grid-cols-4 h-full">
            {columnsData.map((col) => (
              <div
                key={col.id}
                className="relative overflow-hidden"
              >
                <div
                  className={`flex flex-col ${
                    col.direction === 'up' ? 'squad-col-slide-up' : 'squad-col-slide-down'
                  }`}
                  style={{ '--squad-duration': col.duration }}
                >
                  {/* First iteration */}
                  {col.agents.map((agent) => (
                    <AgentCard
                      key={`${col.id}-${agent.id}-1`}
                      agent={agent}
                      className={`${agent.heightClass} w-full shrink-0`}
                    />
                  ))}
                  {/* Duplicate iteration for seamless loop */}
                  {col.agents.map((agent) => (
                    <AgentCard
                      key={`${col.id}-${agent.id}-2`}
                      agent={agent}
                      className={`${agent.heightClass} w-full shrink-0`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default AgentsShowcase;
