import { useState, useEffect, useMemo } from 'react';
import { Terminal, ArrowUpRight, Shield, Cpu, Users, Sparkles, BookOpen } from 'lucide-react';
import constellationArt from '../../assets/aevum_companion_constellation.webp';

export const About = ({ activeLang = 'vi', onNavigate }) => {
  const isVi = activeLang === 'vi';
  const [viewMode, setViewMode] = useState('editorial'); // 'editorial' | 'terminal'

  // Squad Roster: Relatable Human Value & Casual Roles (Monochrome Typography Cards)
  const squadRoster = useMemo(() => [
    {
      name: 'An',
      aid: 'ENG-AN-7B9F1D',
      role: isVi ? 'Điều phối & Giữ mạch dự án' : 'Chief of Staff & Flow',
      note: isVi
        ? 'Giữ mọi quyết định và kiến trúc xuyên suốt, đảm bảo cả nhóm không quên bối cảnh cũ.'
        : 'Preserves long-term decisions and refactoring continuity across sessions.'
    },
    {
      name: 'Vidus',
      aid: 'ENG-VIDUS-A18C4E',
      role: isVi ? 'Kiến trúc sư Hệ thống' : 'Systems Architect',
      note: isVi
        ? 'Thiết kế luồng dữ liệu, xử lý đa nhiệm và đảm bảo hệ thống chạy bền khi tải lớn.'
        : 'Designs resilient concurrency pipelines, storage layouts, and clean boundaries.'
    },
    {
      name: 'Zenith',
      aid: 'ALG-ZENITH-A1B2C3',
      role: isVi ? 'Toán học & An toàn Lõi' : 'Formal Verification & Security',
      note: isVi
        ? 'Kiểm chứng thuật toán bằng toán học, chặn rò rỉ dữ liệu và bảo vệ máy tính của bạn.'
        : 'Verifies mathematical stability and enforces Zero-Trust sandbox guardrails.'
    },
    {
      name: 'Luna',
      aid: 'DSN-LUNA-3C9A12',
      role: isVi ? 'Giám đốc Trải nghiệm Thị giác' : 'Visual Design Lead',
      note: isVi
        ? 'Chăm chút từng khoảng thở, độ tương phản Sáng/Tối dịu mắt và nhịp điệu giao diện.'
        : 'Crafts atmospheric minimalism, soft gradient transitions, and crisp type hierarchy.'
    },
    {
      name: 'Kael',
      aid: 'ENG-KAEL-7F4B2D',
      role: isVi ? 'Kiến trúc sư Hiệu năng 120Hz' : '120Hz Performance Lead',
      note: isVi
        ? 'Lo phần tải trang siêu nhẹ, ngắt chuyển động khi cuộn khuất để tiết kiệm pin tối đa.'
        : 'Engineers zero-jank 120fps render lifecycles and lean client bundles.'
    },
    {
      name: 'Nia',
      aid: 'NEU-NIA-9E4B2A',
      role: isVi ? 'Kiến trúc Neural Brain & QA' : 'Neural Brain & QA Lead',
      note: isVi
        ? 'Phát triển trí nhớ Neural Brain v3.0 và chạy đo kiểm thực nghiệm trước khi phát hành.'
        : 'Develops Symplectic Neural Brain v3.0 memory and validates end-to-end reliability.'
    },
    {
      name: 'Iris',
      aid: 'ARC-IRIS-7D94D427',
      role: isVi ? 'Công thái học & Người mới (CXO)' : 'CXO & Human Ergonomics',
      note: isVi
        ? 'Loại bỏ thuật ngữ rườm rà, dẫn dắt người mới làm quen tự nhiên ngay trong 3 phút đầu.'
        : 'Simplifies cognitive load so anyone starts smoothly in under 3 minutes.'
    }
  ], [isVi]);

  // Classic TUI Data (Optional progressive-disclosure tab for terminal enthusiasts)
  const navigationData = useMemo(() => ({
    title: 'ROOT',
    items: [
      {
        id: 'overview',
        type: 'cmd',
        code: '01/',
        cmd: 'aevum-os overview --mission',
        label: isVi ? '01/ Aevum OS là gì?' : '01/ What is Aevum OS?',
        desc: isVi ? 'Bộ não ngoại vi chạy 100% trên máy bạn' : 'Local-first decoupled external brain',
        content: isVi
          ? `[AEVUM OS — BỘ NÃO NGOẠI VI CHO AI AGENT]\n\n► VẤN ĐỀ THỰC TẾ:\nMỗi khi đóng editor, đổi nhánh code hay chuyển giữa Cursor, VS Code và Claude, AI thường quên sạch thỏa thuận cũ khiến bạn phải giải thích lại từ đầu.\n\n► CÁCH AEVUM OS GIÚP BẠN:\n• Lưu trữ trí nhớ sống (Living Memory Graph) cục bộ ngay trong thư mục .aevum/ của dự án.\n• Cung cấp 98 công cụ chuẩn mở MCP giúp mọi AI dùng chung một nguồn sự thật.\n• Vận hành biệt đội 7 cộng sự phối hợp theo quy trình Plan-First an toàn.\n\n[STATUS: 100% Local-First • Zero Amnesia • Open MCP Port 3344]`
          : `[AEVUM OS — DECOUPLED EXTERNAL BRAIN]\n\n► THE DAILY PROBLEM:\nClosing your editor or switching tools wipes an assistant's context, forcing you to explain project rules repeatedly.\n\n► HOW AEVUM SOLVES IT:\n• Persists a Living Memory Graph locally inside your project's .aevum/ directory.\n• Exposes open MCP endpoints so Cursor, Claude, VS Code, and CLI share one brain.\n• Coordinates 7 specialized AI companions under Plan-First safety checks.\n\n[STATUS: 100% Local-First • Zero Amnesia • Open MCP Port 3344]`
      },
      {
        id: 'pillars',
        type: 'cmd',
        code: '02/',
        cmd: 'aevum-os architecture --neural-v3',
        label: isVi ? '02/ Neural Brain v3.0 & Sandbox' : '02/ Neural Brain v3.0 & Sandbox',
        desc: isVi ? 'SE-AdLIF WASM + CoW RAM bảo vệ ổ cứng' : 'SE-AdLIF WASM + volatile CoW isolation',
        content: isVi
          ? `[KIẾN TRÚC LÕI & CHỦ QUYỀN DỮ LIỆU]\n\n01. NEURAL BRAIN v3.0 (SYMPLECTIC CLS):\n    • Mạng nơ-ron xung SE-AdLIF chạy trên Rust WASM thu hồi trí nhớ dưới 50ms.\n    • Hệ thống hồi tưởng hai tầng giúp học quy ước dự án mà không rò rỉ code.\n\n02. COPY-ON-WRITE SANDBOX:\n    • Mọi lệnh thử nghiệm chạy trên vùng RAM cô lập trước khi bạn duyệt ghi đĩa.\n\n03. PIPERNET MESH:\n    • Chia sẻ mẫu thiết kế trừu tượng ngang hàng, không bao giờ gửi mã nguồn thô.`
          : `[CORE ARCHITECTURE & DATA SOVEREIGNTY]\n\n01. NEURAL BRAIN v3.0 (SYMPLECTIC CLS):\n    • Rust WASM SE-AdLIF spiking recall retrieving project wisdom under 50ms.\n    • Dual-timescale memory learns codebase habits safely offline.\n\n02. COPY-ON-WRITE SANDBOX:\n    • Executes agent edits in volatile memory until you explicitly approve.\n\n03. PIPERNET MESH:\n    • Peer-to-peer abstract design sharing without transmitting raw code.`
      },
      {
        id: 'i2flabs',
        type: 'cmd',
        code: '03/',
        cmd: 'aevum-os team --i2flabs',
        label: isVi ? '03/ Đội ngũ I2FLabs Việt Nam' : '03/ I2FLabs Vietnam R&D',
        desc: isVi ? 'Kỹ sư Việt xây hạ tầng AI chủ quyền' : 'Independent Vietnamese AI systems lab',
        content: isVi
          ? `[I2FLABS VIETNAM — ĐỘI NGŨ NGHIÊN CỨU & PHÁT TRIỂN]\n\n• Xuất phát điểm: Xây dựng tại Việt Nam bởi đội ngũ kỹ sư hệ thống & nhà nghiên cứu AI.\n• Triết lý: Công nghệ AI mạnh nhất là công nghệ giữ bạn toàn quyền kiểm soát dữ liệu trên máy cá nhân.\n• Hợp tác R&D / Doanh nghiệp: dev@aevum.ai.vn`
          : `[I2FLABS VIETNAM — R&D COLLECTIVE]\n\n• Origin: Researched and engineered in Vietnam by systems & AI engineers.\n• Philosophy: The best AI empowers individuals while keeping 100% sovereignty on local hardware.\n• R&D & Enterprise Contact: dev@aevum.ai.vn`
      }
    ]
  }), [isVi]);

  const [activeCommandId, setActiveCommandId] = useState('overview');
  const activeCommand = navigationData.items.find((i) => i.id === activeCommandId) || navigationData.items[0];

  useEffect(() => {
    if (viewMode !== 'terminal') return;
    const handleKeyDown = (e) => {
      const idx = navigationData.items.findIndex((i) => i.id === activeCommandId);
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setActiveCommandId(navigationData.items[(idx + 1) % navigationData.items.length].id);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setActiveCommandId(navigationData.items[(idx - 1 + navigationData.items.length) % navigationData.items.length].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activeCommandId, navigationData.items]);

  return (
    <div id="about" className="w-full bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-100 [html[data-theme='light']_&]:text-slate-900 min-h-[calc(100vh-73px)] font-sans transition-colors">

      {/* ── 1. EDITORIAL HEADER HERO (Monochrome White Text + 16px+ Copy + >= 48px Touch) ── */}
      <section className="w-full border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono font-semibold tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase">
              {isVi ? 'I2FLABS VIETNAM • CÂU CHUYỆN & ĐỘI NGŨ' : 'I2FLABS VIETNAM • STORY & SQUAD'}
            </span>

            {/* Progressive View Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-100 text-sm font-sans">
              <button
                type="button"
                onClick={() => setViewMode('editorial')}
                className={`px-4 py-2 min-h-[44px] rounded-full transition-colors cursor-pointer ${viewMode === 'editorial'
                  ? 'bg-white text-slate-950 font-medium [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                  : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {isVi ? 'Câu chuyện & Đội ngũ' : 'Story & Squad'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('terminal')}
                className={`px-4 py-2 min-h-[44px] rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5 ${viewMode === 'terminal'
                  ? 'bg-white text-slate-950 font-medium [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                  : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                <Terminal size={14} />
                <span>{isVi ? 'Terminal cổ điển' : 'CLI Mode'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
                {isVi ? (
                  <>
                    Để AI thật sự nhớ việc,<br />
                    <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                      và làm việc cùng bạn lâu dài.
                    </span>
                  </>
                ) : (
                  <>
                    Built so your AI remembers,<br />
                    <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                      and grows alongside your craft.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal max-w-2xl">
                {isVi
                  ? 'Aevum OS khởi nguồn từ một trăn trở giản dị tại I2FLabs Việt Nam: tại sao mỗi lần mở một tab mới hay đổi trình soạn thảo, bạn lại phải giải thích dự án cho AI nghe lại từ đầu? Chúng tôi xây dựng một bộ não độc lập ngay trên máy cá nhân để cộng sự AI luôn nhớ mạch việc và bảo vệ bạn an toàn.'
                  : 'Aevum OS started with a simple frustration at I2FLabs Vietnam: why re-explain your codebase every time you open a fresh tab or switch IDEs? We engineered a local external brain so specialized AI companions preserve context across every tool on your machine.'}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate?.('docs')}
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <BookOpen size={15} />
                  <span>{isVi ? 'Bắt đầu trong 3 phút' : '3-Minute Quickstart'}</span>
                </button>
                <a
                  href="mailto:dev@aevum.ai.vn"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-full border border-white/15 [html[data-theme='light']_&]:border-slate-300 text-white [html[data-theme='light']_&]:text-slate-900 hover:bg-white/5 [html[data-theme='light']_&]:hover:bg-slate-100 text-sm font-medium transition-colors"
                >
                  <span>{isVi ? 'Kết nối I2FLabs R&D' : 'Contact I2FLabs R&D'}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Atmospheric Orbital Sculpture Visual (Luna Gradient Mask) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] rounded-3xl overflow-hidden bg-[#07090D] [html[data-theme='light']_&]:bg-slate-950 border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 shadow-xl">
                <img
                  src={constellationArt}
                  alt={isVi ? 'Kiến trúc Bộ não Cộng sự Aevum OS' : 'Aevum OS External Brain Core Visual'}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  style={{
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 64%, rgba(0,0,0,0.45) 100%)',
                    maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 64%, rgba(0,0,0,0.45) 100%)'
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 flex items-center justify-between text-xs font-mono text-white bg-gradient-to-t from-[#07090D] via-[#07090D]/70 to-transparent">
                  <span>AEVUM KERNEL • LOCAL-FIRST</span>
                  <span>v2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {viewMode === 'terminal' ? (
        /* ── OPTIONAL CLASSIC TERMINAL VIEW ── */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl border border-white/10 [html[data-theme='light']_&]:border-slate-300 bg-[#07090D] overflow-hidden font-mono text-left">
            <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span className="text-white font-semibold">AEVUM TTY EXPLORER</span>
              <span>{isVi ? 'Dùng phím [↑/↓] hoặc bấm chọn mục bên trái' : 'Use [↑/↓] keys or click entries'}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 p-6 space-y-2.5">
                {navigationData.items.map((item) => {
                  const active = item.id === activeCommandId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveCommandId(item.id)}
                      className={`w-full text-left p-3.5 min-h-[48px] rounded-xl transition-colors cursor-pointer ${active
                        ? 'bg-white/[0.08] text-white border border-white/25'
                        : 'text-slate-300 hover:bg-white/[0.03] border border-transparent'
                        }`}
                    >
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-white">{active ? '>' : ' '}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className="text-xs text-slate-400 pl-4 mt-1">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <div className="text-sm text-white">$ {activeCommand.cmd}</div>
                <pre className="whitespace-pre-wrap text-sm sm:text-base text-slate-200 leading-relaxed font-mono">
                  {activeCommand.content}
                </pre>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ── 2. THREE RELATABLE PILLARS (>= 16px Body) ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 border-b border-white/[0.06] [html[data-theme='light']_&]:border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  tag: isVi ? '01 • GẦN GŨI & DỄ BẮT ĐẦU' : '01 • ZERO FRICTION',
                  title: isVi ? 'Giữ nguyên IDE quen thuộc' : 'Keep your current workflow',
                  desc: isVi
                    ? 'Không bắt bạn học công cụ mới hoàn toàn. Gắn qua chuẩn mở MCP để Cursor, VS Code và Claude dùng chung một trí nhớ.'
                    : 'Keep using Cursor, VS Code, Claude, or CLI while sharing a single project memory.'
                },
                {
                  icon: Cpu,
                  tag: isVi ? '02 • TRÍ NHỚ SỐNG BỀN BỈ' : '02 • NEURAL BRAIN v3.0',
                  title: isVi ? 'Nhớ sâu quy ước & lý do cũ' : 'Persistent architectural wisdom',
                  desc: isVi
                    ? 'Mọi bài học debug và quy tắc đặt tên đều được neo cục bộ trong .aevum/, tự cập nhật khi bạn sửa code.'
                    : 'Every debugging lesson and design rule stays anchored cleanly inside your local workspace.'
                },
                {
                  icon: Shield,
                  tag: isVi ? '03 • CHỦ QUYỀN TRÊN MÁY BẠN' : '03 • LOCAL SOVEREIGNTY',
                  title: isVi ? 'Không tải mã nguồn lên mây' : 'Zero hidden cloud lock-in',
                  desc: isVi
                    ? 'Mọi thử nghiệm chạy trong vùng RAM cô lập và chỉ ghi đĩa khi bạn đồng ý — an tâm cho cả cá nhân lẫn đội ngũ.'
                    : 'Isolated RAM checks protect your disk while keeping code strictly on your hardware.'
                }
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.tag} className="space-y-3 text-left">
                    <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase">
                      <Icon size={15} className="text-white [html[data-theme='light']_&]:text-slate-900" />
                      <span>{pillar.tag}</span>
                    </div>
                    <h2 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                      {pillar.title}
                    </h2>
                    <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-normal m-0">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 3. SEVEN-COMPANION SQUAD ROSTER (Typography-Only Monochrome) ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase">
                  <Users size={14} className="text-white [html[data-theme='light']_&]:text-slate-900" />
                  <span>{isVi ? 'BIỆT ĐỘI 7 CỘNG SỰ AI' : 'THE 7-COMPANION SQUAD'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-normal tracking-[-0.025em] text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                  {isVi ? 'Mỗi cộng sự giữ một vai trò rõ ràng cho bạn.' : 'Focused specialists working together for you.'}
                </h2>
              </div>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 max-w-md font-normal leading-[1.65] m-0">
                {isVi
                  ? 'Thay vì một chatbot làm tất cả rồi mau quên, Aevum kết nối 7 chuyên gia tự kiểm tra chéo lẫn nhau.'
                  : 'Instead of one forgetful chatbot, Aevum coordinates 7 distinct personas across engineering, design, QA, and UX.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
              {squadRoster.map((member) => (
                <article
                  key={member.aid}
                  className="group relative rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 p-6 flex flex-col justify-between gap-3.5 transition-colors hover:border-white/25 [html[data-theme='light']_&]:hover:border-slate-300"
                >
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 tracking-wider">
                      {member.aid}
                    </div>
                    <h3 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                      {member.name}
                    </h3>
                    <div className="text-sm font-mono text-slate-200 [html[data-theme='light']_&]:text-slate-700 tracking-wide">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.65] m-0">
                    {member.note}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default About;
