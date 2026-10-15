import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Cloud, 
  ArrowRight, 
  Flame, 
  Users, 
  Laptop,
  Mail,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/Button';

export const Pricing = ({ 
  activeLang = 'vi', 
  onOpenTrialModal, 
  onOpenPaymentModal,
  onOpenAuthModal, 
  showDetails = true, 
  onNavigate 
}) => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState(0); // 1st FAQ open by default
  const isVi = activeLang === 'vi';

  const faqs = [
    {
      q: isVi ? "Chương trình 30 ngày dùng thử Pro miễn phí hoạt động như thế nào?" : "How does the 30-Day Pro Free Trial work?",
      a: isVi 
        ? "Mọi tài khoản mới khi tải và kích hoạt Aevum OS đều được tự động tặng 30 ngày trải nghiệm trọn vẹn sức mạnh của Hạng PRO. Hoàn toàn không yêu cầu thẻ tín dụng."
        : "Every new account on Aevum OS automatically receives a 30-day full PRO trial. Zero credit card required."
    },
    {
      q: isVi ? "Hết 30 ngày dùng thử, mã nguồn và dữ liệu của tôi có bị mất không?" : "Will I lose my projects and memory after the trial ends?",
      a: isVi
        ? "Hoàn toàn KHÔNG! Aevum OS hoạt động ưu tiên trên máy của bạn (Local-First). Toàn bộ mã nguồn, ghi chú và bộ nhớ dự án trên máy tính của bạn vẫn giữ nguyên 100% và bạn tiếp tục sử dụng miễn phí vĩnh viễn trên gói Community."
        : "Never! Aevum OS is strictly Local-First. All your code, local memory, and project context remain 100% intact on your machine, transitioning seamlessly to the free lifetime Community tier."
    },
    {
      q: isVi ? "Tôi có thể kết nối những mô hình AI nào (Cơ chế BYOK)?" : "Which AI models can I connect with my own API keys?",
      a: isVi
        ? "Aevum OS hỗ trợ toàn diện các nền tảng AI hàng đầu: Google Gemini (1.5 Flash/Pro), Anthropic Claude (3.5 Sonnet), OpenAI (GPT-4o), DeepSeek, OpenRouter và các mô hình chạy offline trực tiếp trên máy qua Ollama / LM Studio. Bạn chỉ trả tiền trực tiếp cho nhà cung cấp AI theo nhu cầu mà không lo bị đội phí."
        : "Aevum OS natively supports all leading AI providers via your own API Keys: Google Gemini (1.5 Flash/Pro), Anthropic Claude (3.5 Sonnet), OpenAI (GPT-4o), DeepSeek, OpenRouter, and offline local models via Ollama / LM Studio with zero markup."
    },
    {
      q: isVi ? "Biệt đội Đa AI (Multi-Agent Squad Mode) giúp tôi làm việc thế nào?" : "How does the Multi-Agent AI Squad help me build faster?",
      a: isVi
        ? "Thay vì bạn phải tự chat qua lại với một con bot đơn lẻ, Squad Mode cho phép bạn triệu tập đồng thời cả một nhóm AI chuyên trách: Kiến trúc sư (lên kế hoạch), Lập trình viên (viết mã), Luna (thiết kế UI/UX) và Tester (rà soát lỗi). Các AI tự động thảo luận, chia nhỏ công việc và cùng nhau hoàn thiện tính năng cho bạn."
        : "Instead of single-threaded chatting, Squad Mode lets you deploy a full coordinated AI team: Architect (system planning), Fullstack Engineer (coding), UI/UX Specialist, and QA Tester. They autonomously debate, break down tasks, and execute together."
    },
    {
      q: isVi ? "Tôi có thể sử dụng Aevum OS trên bao nhiêu máy tính?" : "How many computers can I use Aevum OS on?",
      a: isVi
        ? "Gói Community hỗ trợ sử dụng trên 1 máy tính cá nhân. Gói Pro cho phép bạn sử dụng linh hoạt trên tối đa 5 máy tính cùng lúc (ví dụ: Laptop công ty, PC ở nhà, máy Mac di động) với ký ức dự án được tự động đồng bộ xuyên suốt. Gói Enterprise hỗ trợ số lượng tùy chỉnh theo thỏa thuận đội ngũ."
        : "Community is dedicated to 1 personal computer. Pro lets you roam seamlessly across up to 5 concurrent machines (e.g. Work laptop, Home desktop, Mac) with instant cloud memory sync. Enterprise offers custom seat allocations."
    },
    {
      q: isVi ? "Mã nguồn và dữ liệu dự án của tôi được bảo mật như thế nào?" : "How is my project source code and data kept secure?",
      a: isVi
        ? "Aevum OS tuân thủ triết lý Sovereign Security: Không theo dõi telemetry ngầm, tuyệt đối không gửi mã nguồn của bạn về máy chủ bên thứ ba. Mọi dữ liệu nhạy cảm đều được mã hóa cục bộ an toàn ngay trên máy tính của bạn."
        : "Aevum OS strictly enforces Sovereign Security: Zero covert telemetry, zero third-party source code exposure. All sensitive operations and cryptographic signatures remain private on your local machine."
    },
    {
      q: isVi ? "Tôi có thể hủy gói Pro hoặc thay đổi bất kỳ lúc nào không?" : "Can I cancel or switch my plan at any time?",
      a: isVi
        ? "Có, bạn hoàn toàn chủ động quản lý gói dịch vụ. Nếu hủy gia hạn Pro, bạn vẫn được sử dụng toàn bộ tính năng Pro cho đến hết chu kỳ đã thanh toán và sau đó tự động chuyển về gói Community vĩnh viễn mà không phát sinh thêm bất kỳ chi phí nào."
        : "Yes, you have complete self-serve control. If you cancel Pro, you retain full Pro features until the end of your current billing period, then automatically revert to the lifetime free Community tier."
    },
    {
      q: isVi ? "Gói Enterprise dành cho doanh nghiệp được triển khai ra sao?" : "How is the Enterprise tier deployed for organizations?",
      a: isVi
        ? "Đội ngũ kỹ sư I2FLabs sẽ đồng hành trực tiếp cùng doanh nghiệp để triển khai Private Cloud hoặc On-Premise hoàn toàn cô lập (Air-gapped), tích hợp đăng nhập tập trung (SSO), phân quyền thành viên và tinh chỉnh Cộng sự AI theo đúng quy chuẩn mã nguồn nội bộ."
        : "The I2FLabs engineering team works directly with your company to deploy isolated Private Cloud or Air-Gapped On-Premise clusters, integrating SSO, enterprise RBAC, and bespoke AI Personas fine-tuned to your internal standards."
    }
  ];

  return (
    <div id="pricing" className="pricing-section border-subtle-b bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-100 [html[data-theme='light']_&]:text-slate-900 transition-colors">
      
      {/* ── 1. SECTION HEADER (ALIGN LEFT & SINGLE-LINE TITLE) ── */}
      <div className="p-6 sm:p-10 lg:p-14 border-subtle-b bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] [html[data-theme='light']_&]:border-slate-200/80 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left Side: Tag + Title + Subtitle */}
        <div className="text-left space-y-1.5 max-w-2xl">
          <span className="text-xs sm:text-[13px] font-sans text-white [html[data-theme='light']_&]:text-slate-900 font-semibold tracking-widest uppercase block">
            {isVi ? 'ĐỒNG HÀNH CÙNG BUILDER' : 'EMPOWERING BUILDERS'}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium sm:font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[0.01em] font-display leading-tight">
            {isVi ? (
              <>Làm chủ công cụ. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Hiện thực hóa ý tưởng.</span></>
            ) : (
              <>Master your craft. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Bring ideas to life.</span></>
            )}
          </h2>
          
          <p className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-xs sm:text-sm font-normal leading-relaxed pt-1">
            {isVi 
              ? 'Khởi đầu miễn phí với cộng sự AI chạy trực tiếp trên máy của bạn. Khi dự án lớn dần, hãy mở khóa cả một biệt đội AI cùng phối hợp và đồng bộ đa thiết bị.' 
              : 'Start 100% free with your personal AI companion on your machine. Scale up to a full collaborative AI team with seamless multi-device sync.'}
          </p>

          {!showDetails && (
            <div className="pt-3.5">
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('pricing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="pricing-details-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/5 [html[data-theme='light']_&]:bg-cyan-50 [html[data-theme='light']_&]:border-cyan-200 text-cyan-400 [html[data-theme='light']_&]:text-cyan-700 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              >
                <span>{isVi ? 'Xem so sánh tính năng chi tiết & FAQ' : 'Compare Detailed Features & FAQ'}</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Fixed-Width Zero-Jitter Segmented Switcher */}
        <div className="relative inline-grid grid-cols-2 w-[248px] p-1 rounded-lg border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-200/70 shrink-0 self-start md:self-end select-none">
          {/* Sliding Pill Indicator */}
          <div 
            className={`pricing-switch-pill absolute top-1 bottom-1 rounded-md transition-all duration-200 ease-out shadow-sm ${
              billingCycle === 'monthly'
                ? 'left-1 w-[calc(50%-4px)]'
                : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'
            }`}
          />

          <button
            onClick={() => setBillingCycle('monthly')}
            className={`relative z-10 py-1.5 text-center text-xs font-mono font-bold transition-colors cursor-pointer ${
              billingCycle === 'monthly'
                ? 'pricing-switch-btn-active font-extrabold'
                : 'pricing-switch-btn-inactive'
              }`}
          >
            {isVi ? 'Hàng tháng' : 'Monthly'}
          </button>
          
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`relative z-10 py-1.5 flex items-center justify-center gap-1.5 text-xs font-mono font-bold transition-colors cursor-pointer ${
              billingCycle === 'yearly'
                ? 'pricing-switch-btn-active font-extrabold'
                : 'pricing-switch-btn-inactive'
            }`}
          >
            <span>{isVi ? 'Hàng năm' : 'Yearly'}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${
              billingCycle === 'yearly' 
                ? 'bg-white/25 text-white' 
                : 'bg-white/10 text-white border border-white/20'
            }`}>
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* ── 2. THREE-COLUMN OVERLAPPING PRICING GRID (PRO SITS ON TOP LAYER) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch py-10 px-4 sm:px-6">
        
        {/* COLUMN 1: COMMUNITY TIER (TUCKED UNDER PRO ON RIGHT) */}
        <div className="pricing-card-subtle relative z-10 p-8 sm:p-10 space-y-6 flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-lg lg:mr-[-16px] lg:my-3 lg:pr-10 bg-[#07090D]">
          {/* Subtle Grainy Gradient Atmosphere Layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 [html[data-theme='light']_&]:via-slate-200 to-transparent z-10" />
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterCom'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterCom)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-widest">
                {isVi ? 'DÀNH CHO CÁ NHÂN' : 'FOR INDIVIDUALS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-[10px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 shrink-0 font-medium">
                {isVi ? 'MIỄN PHÍ TRỌN ĐỜI' : 'FREE FOREVER'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display mb-1">
              Aevum Community
            </h3>

            <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 min-h-[36px] leading-relaxed">
              {isVi 
                ? 'Trải nghiệm trọn đời trên máy tính của bạn. Tự do kết nối AI yêu thích, giữ kín 100% mã nguồn.' 
                : 'Free forever on your computer. Connect your favorite AI models while keeping all code 100% private.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                  0 VNĐ
                </span>
                <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                  {isVi ? '/ Trọn đời' : '/ Lifetime'}
                </span>
              </div>
              <div className="pricing-sub-community pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono block whitespace-nowrap leading-none font-normal text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                  {isVi ? 'Tự do dùng API Key riêng (Gemini, Claude, GPT...)' : 'Use your own API keys (Gemini, Claude, GPT...)'}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-medium tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase">
                {isVi ? 'TÍNH NĂNG CỐT LÕI' : 'CORE CAPABILITIES'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span>{isVi ? 'Chạy 100% trên máy (Local-First), bảo mật tuyệt đối' : 'Runs 100% locally on your machine with total privacy'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span>{isVi ? 'Kết nối mọi mô hình: Gemini, Claude, GPT, Ollama...' : 'Connect any AI: Gemini, Claude, GPT, Ollama...'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span>{isVi ? '1 Cộng sự AI đồng hành: Viết code & giải đáp 1-1' : '1-on-1 AI Companion: Real-time code & chat'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span>{isVi ? 'Ghi nhớ bối cảnh dự án: AI hiểu code không cần nhắc lại' : 'Smart Project Memory: AI remembers your codebase context'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span>{isVi ? 'Cài đặt và sử dụng trên 1 máy tính cá nhân' : 'Installed and active on 1 personal computer'}</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-400 [html[data-theme='light']_&]:text-slate-400 opacity-60">
                  <X size={14} className="text-slate-500 [html[data-theme='light']_&]:text-slate-400 shrink-0" />
                  <span className="line-through [html[data-theme='light']_&]:text-slate-400">{isVi ? 'Biệt đội Đa AI phối hợp nhóm (Squad Mode)' : 'Multi-Agent Squad Mode'}</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-400 [html[data-theme='light']_&]:text-slate-400 opacity-60">
                  <X size={14} className="text-slate-500 [html[data-theme='light']_&]:text-slate-400 shrink-0" />
                  <span className="line-through [html[data-theme='light']_&]:text-slate-400">{isVi ? 'Đồng bộ ký ức & dự án giữa nhiều máy tính' : 'Cloud sync across multiple devices'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              onClick={onOpenTrialModal}
              className="pricing-btn-community w-full py-3.5 px-4 rounded-full font-mono text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{isVi ? 'Tải Về & Dùng Ngay' : 'Download & Get Started'}</span>
              <ArrowRight size={14} className="text-slate-300 [html[data-theme='light']_&]:text-slate-800 shrink-0" />
            </button>
          </div>
        </div>

        {/* COLUMN 2: PRO TIER (PROMINENT CENTER LAYER OVERLAPPING SIDE CARDS) */}
        <div className="pricing-pro-column relative z-20 p-8 sm:p-10 space-y-6 flex flex-col justify-between overflow-hidden lg:-my-1 rounded-2xl sm:rounded-3xl border border-white/20 [html[data-theme='light']_&]:border-cyan-300/80 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-2xl [html[data-theme='light']_&]:shadow-cyan-500/10 bg-[#07090D]">
          {/* Refined High-Contrast Grainy Gradient Atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            {/* Primary Gradient Flow - Soft ambient cyan fading quickly into deep black */}
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />

            {/* Ethereal Top Horizon Crest (Gentle ambient glow focused at very top edge) */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110%] h-[180px]"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56, 189, 248, 0.18) 0%, transparent 100%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Precision Top Hairline Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 [html[data-theme='light']_&]:via-cyan-400/60 to-transparent z-10" />

            {/* Ultra-Fine Luxury Film Grain (Low opacity, fine pitch - NO harsh pixel noise) */}
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterProFine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterProFine)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
              }}
            />

            {/* Subtle DeepMind Particle Dots in Top Right */}
            <div className="absolute top-0 right-0 w-2/3 h-48 overflow-hidden opacity-20 [html[data-theme='light']_&]:opacity-35 z-[2]">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="260" cy="30" r="1.5" fill="#38bdf8" opacity="0.7" />
                <circle cx="295" cy="50" r="1" fill="#0284c7" opacity="0.5" />
                <circle cx="330" cy="35" r="1.5" fill="#38bdf8" opacity="0.8" />
                <circle cx="365" cy="65" r="1.2" fill="#0284c7" opacity="0.6" />
                <circle cx="280" cy="85" r="1.5" fill="#38bdf8" opacity="0.6" />
                <circle cx="320" cy="75" r="1" fill="#0284c7" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="relative z-10">
            {/* Top Monochrome Ribbon */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-300 [html[data-theme='light']_&]:text-cyan-800 uppercase tracking-widest">
                {isVi ? 'LẬP TRÌNH VIÊN & CREATOR' : 'DEVELOPERS & CREATORS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/20 [html[data-theme='light']_&]:border-cyan-300 bg-white/10 [html[data-theme='light']_&]:bg-cyan-50 text-[10px] font-mono text-white [html[data-theme='light']_&]:text-cyan-800 font-bold shrink-0">
                {isVi ? 'PHỔ BIẾN NHẤT' : 'MOST POPULAR'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display flex items-center gap-2 mb-1">
              <span>Aevum Pro</span>
              <Zap size={18} className="text-white [html[data-theme='light']_&]:text-cyan-600 fill-white/20 [html[data-theme='light']_&]:fill-cyan-100 shrink-0" />
            </h3>

            <p className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-600 min-h-[36px] leading-relaxed">
              {isVi 
                ? 'Biệt đội Đa AI làm việc nhóm: Tự động chia việc, viết code, kiểm thử và đồng bộ mượt mà đa thiết bị.' 
                : 'Full AI squad working together: Auto-decompose tasks, code, test, and sync across all your devices.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                {billingCycle === 'monthly' ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      249.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Tháng' : '/ Month'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      1.990.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Năm' : '/ Year'}
                    </span>
                  </>
                )}
              </div>
              <div className="pricing-sub-pro pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono font-medium text-slate-200 [html[data-theme='light']_&]:text-cyan-700 block whitespace-nowrap leading-none">
                  {billingCycle === 'monthly' 
                    ? (isVi ? 'Tặng 30 ngày dùng thử PRO — Không cần thẻ' : '30-day free trial — No credit card required')
                    : (isVi ? 'Tiết kiệm 20% (~165k/tháng)' : 'Save 20% (~$7/mo)')}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-medium tracking-wider text-slate-300 [html[data-theme='light']_&]:text-cyan-800 uppercase">
                {isVi ? 'ĐẶC QUYỀN CHUYÊN NGHIỆP' : 'PRO SUPERPOWERS'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-200 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">{isVi ? 'Bao gồm toàn bộ tính năng của gói Community' : 'Includes everything in Community'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">{isVi ? 'Biệt đội Đa AI (Squad): Kiến trúc sư, Coder & QA tự phối hợp' : 'Multi-Agent Squad: Architect, Coder & QA collaborate'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Đồng bộ mây thông suốt: Đổi máy tiếp tục dự án ngay' : 'Cloud Sync: Seamlessly roam project context across PCs'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Sử dụng linh hoạt trên tối đa 5 máy tính (Mac, Windows)' : 'Active on up to 5 devices (Mac, Windows, Linux)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Nghiên cứu chuyên sâu: Tự đọc tài liệu dài & công nghệ mới' : 'Deep Research: Auto-digest long docs & whitepapers'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Rà soát lỗi tồn đọng & tự động đề xuất tối ưu code' : 'Technical Debt Radar: Detect bugs & optimize code quality'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-cyan-600 shrink-0 stroke-[2.5]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Kênh hỗ trợ kỹ thuật ưu tiên 1-1 từ đội ngũ phát triển' : 'Priority 1-on-1 direct support from core engineers'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full pt-4 z-10">
            {/* Tag tab peeking clearly from behind the button on the right side */}
            <div className="absolute -top-3.5 right-3 z-0 pointer-events-none">
              <span className="pricing-pro-tag inline-flex items-center px-2.5 pt-1 pb-4 rounded-t-[5px] text-[9px] font-mono font-medium uppercase tracking-wider bg-white/10 [html[data-theme='light']_&]:bg-cyan-50 border border-white/20 [html[data-theme='light']_&]:border-cyan-300 text-white [html[data-theme='light']_&]:text-cyan-800 whitespace-nowrap select-none">
                {isVi ? 'Dành cho Beta Tester' : 'For Beta Testers'}
              </span>
            </div>

            <button
              onClick={() => onOpenPaymentModal ? onOpenPaymentModal(billingCycle) : onOpenTrialModal()}
              className="pricing-btn-pro relative z-10 w-full py-3.5 sm:py-4 px-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-none"
            >
              <span className="whitespace-nowrap">
                {isVi ? 'Nâng Cấp Pro (VietQR 24/7)' : 'Upgrade to Pro (VietQR)'}
              </span>
              <ArrowRight size={14} className="stroke-[2.5] shrink-0 text-black [html[data-theme='light']_&]:text-white" />
            </button>
          </div>
        </div>

        {/* COLUMN 3: ENTERPRISE TIER (PREMIUM BESPOKE CTA) */}
        <div className="pricing-card-enterprise relative z-10 p-8 sm:p-10 space-y-6 flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-lg lg:ml-[-16px] lg:my-3 lg:pl-10 bg-[#07090D]">
          {/* Subtle Grainy Gradient Atmosphere Layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 [html[data-theme='light']_&]:via-slate-200 to-transparent z-10" />
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterEnt'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterEnt)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-widest">
                {isVi ? 'DOANH NGHIỆP & ĐỘI NGŨ' : 'ENTERPRISE & TEAMS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-[10px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-medium tracking-wider shrink-0 uppercase">
                {isVi ? 'BẢO MẬT TUYỆT ĐỐI' : 'AIR-GAPPED'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display mb-1">
              Aevum Enterprise
            </h3>

            <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 min-h-[36px]">
              {isVi 
                ? 'Hệ thống AI cô lập hoàn toàn cho công ty. Không rò rỉ mã nguồn, tùy biến mô hình & quản trị tập trung.' 
                : 'Fully isolated AI OS for enterprises. Zero code leakage, custom LLMs, and centralized team governance.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                  {isVi ? 'Tùy Chỉnh' : 'Custom'}
                </span>
                <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                  {isVi ? '/ Quy mô' : '/ Tailored'}
                </span>
              </div>
              <div className="pricing-sub-enterprise pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono font-normal text-slate-400 [html[data-theme='light']_&]:text-slate-500 block whitespace-nowrap leading-none">
                  {isVi ? 'Cài đặt On-Premise hoặc Private Cloud riêng' : 'Deployed On-Premise or Private VPC'}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-medium tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase">
                {isVi ? 'ĐẶC QUYỀN DOANH NGHIỆP' : 'ENTERPRISE CAPABILITIES'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">{isVi ? 'Toàn bộ quyền lợi của Hạng Pro' : 'Includes everything in Pro'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Cài đặt nội bộ 100% cô lập (On-Premise / Private Cloud)' : '100% Air-gapped On-Premise or Private VPC'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Mã nguồn dự án không bao giờ ra khỏi mạng nội bộ' : 'Zero data leakage: Code never leaves company network'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Tùy chỉnh số lượng máy tính & thành viên theo nhu cầu' : 'Flexible seats & workstation allocation'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Huấn luyện Cộng sự AI riêng theo quy chuẩn mã công ty' : 'Custom AI Personas trained on internal codebase standards'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Quản trị phân quyền (RBAC), SSO & Nhật ký bảo mật' : 'Role-based access (RBAC), SSO & audit logs'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2]" />
                  <span className="[html[data-theme='light']_&]:text-slate-700">{isVi ? 'Cam kết SLA 99.99% & Kỹ sư đồng hành triển khai tận nơi' : '99.99% SLA guarantee & dedicated deployment engineers'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <a
              href="mailto:hainguyen011238@gmail.com?subject=Aevum%20OS%20Enterprise%20Deployment%20Inquiry"
              className="pricing-btn-enterprise w-full py-3.5 px-4 rounded-full font-mono text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{isVi ? 'Liên Hệ Đội Ngũ Phát Triển' : 'Contact Development Team'}</span>
              <ArrowRight size={14} className="shrink-0 text-slate-300 [html[data-theme='light']_&]:text-slate-800" />
            </a>
          </div>
        </div>

      </div>

      {/* ── 3. FEATURE COMPARISON MATRIX TABLE ── */}
      {showDetails ? (
        <div className="p-8 sm:p-12 border-subtle-b bg-[#07090D]">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-6">
              <span className="text-[11px] font-mono text-white font-semibold tracking-widest uppercase">
                {isVi ? 'MA TRẬN ĐỐI CHIẾU' : 'FEATURE MATRIX'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                {isVi ? 'So Sánh Tính Năng Chi Tiết' : 'Detailed Entitlement Breakdown'}
              </h3>
            </div>

            <div className="code-box">
              <div className="code-header">
                <span className="text-[11px] font-mono text-slate-400">AEVUM OS ENTITLEMENTS</span>
                <span className="text-[10px] text-slate-400 font-mono">ED25519 VERIFIED</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono text-slate-300">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                      <th className="py-3 px-4">{isVi ? 'TÍNH NĂNG HỆ THỐNG' : 'CAPABILITY'}</th>
                      <th className="py-3 px-4 text-center">{isVi ? 'COMMUNITY' : 'COMMUNITY'}</th>
                      <th className="py-3 px-4 text-center text-white font-bold">PRO</th>
                      <th className="py-3 px-4 text-center text-white font-bold">{isVi ? 'ENTERPRISE' : 'ENTERPRISE'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Mô hình chi phí' : 'Pricing Model'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{isVi ? '0 VNĐ / Trọn đời' : '0 VND / Forever'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '249.000 VNĐ / Tháng' : '249,000 VND / Mo'}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'Tùy chỉnh theo quy mô' : 'Custom Tailored'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Cơ chế kết nối AI (BYOK)' : 'AI Model Connectivity'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Tự do dùng API Key riêng' : '✓ Full BYOK API Keys'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Tự do dùng API Key riêng' : '✓ Full BYOK API Keys'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ API Key + Cụm AI Private VPC' : '✓ BYOK + Private LLM VPC'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Số máy tính sử dụng' : 'Supported Devices'}</td>
                      <td className="py-3 px-4 text-center">{isVi ? '1 Máy tính cá nhân' : '1 Personal Computer'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? 'Tối đa 5 máy (Mac, Windows, Linux)' : 'Up to 5 Computers (Mac, PC)'}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'Linh hoạt theo thỏa thuận' : 'Custom Agreement'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Làm việc nhóm Đa AI (Squad Mode)' : 'Multi-Agent Squad Mode'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">—</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Tự động phối hợp không giới hạn' : '✓ Unlimited Squad Coordination'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Đa Biệt đội Song song' : '✓ Parallel Enterprise Squads'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Đồng bộ ký ức & bối cảnh dự án' : 'Project Context & Memory Sync'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{isVi ? 'Lưu cục bộ trên máy' : 'Local Only'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Đồng bộ đám mây tức thì giữa các máy' : '✓ Real-time Multi-Device Cloud Sync'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Đồng bộ cụm Private Cluster nội bộ' : '✓ Private Cluster Enterprise Sync'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Môi trường hoạt động' : 'Deployment Environment'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{isVi ? 'Cài đặt trực tiếp trên máy (Desktop)' : 'Local Desktop App'}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'Desktop + Đồng bộ đám mây' : 'Desktop + Cloud Roaming'}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'On-Premise / Private Cloud cô lập 100%' : '100% Air-Gapped / Private VPC'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Hỗ trợ kỹ thuật & SLA' : 'Tech Support & SLA'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{isVi ? 'Cộng đồng Discord & GitHub' : 'Community Support'}</td>
                      <td className="py-3 px-4 text-center text-white font-medium">{isVi ? 'Kênh hỗ trợ ưu tiên 1-1 từ đội ngũ phát triển' : 'Priority 1-on-1 Core Team Support'}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'Cam kết SLA 99.99% & Kỹ sư hỗ trợ 24/7' : '24/7 SLA 99.99% + Dedicated Lead'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Call-To-Action Button to view details on the dedicated page */
        <div className="py-14 text-center bg-[#07090D] border-subtle-b">
          <Button
            onClick={() => {
              if (onNavigate) {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            variant="secondary"
            arrow
          >
            {isVi ? 'Xem So Sánh Tính Năng Chi Tiết & FAQ' : 'Compare Detailed Features & FAQs'}
          </Button>
        </div>
      )}

      {/* ── 4. FAQS ACCORDION DROPDOWN ── */}
      {showDetails && (
        <div className="p-8 sm:p-12 lg:p-14 bg-[#07090D]">
          <div className="max-w-4xl mx-auto">
            <div className="text-left mb-8">
              <span className="text-[11px] font-mono text-white font-semibold tracking-widest uppercase block">
                {isVi ? 'HỎI ĐÁP & HỖ TRỢ' : 'FAQS & KNOWLEDGE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                {isVi ? 'Câu Hỏi Thường Gặp' : 'Frequently Asked Questions'}
              </h3>
            </div>

            <div className="pricing-faq-container rounded-xl border border-white/10 bg-[#080812] divide-y divide-white/5 overflow-hidden">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">
                          0{idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-semibold text-white font-sans tracking-tight">
                          {faq.q}
                        </h4>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-cyan-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans pl-11 sm:pl-14 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pricing;
