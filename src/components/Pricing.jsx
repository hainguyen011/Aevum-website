import React, { useState } from 'react';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
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
  const [showMatrix, setShowMatrix] = useState(false); // Meta System-Card Progressive Disclosure
  const isVi = activeLang === 'vi';

  const faqs = [
    {
      q: isVi ? "Chương trình 30 ngày dùng thử Pro v2.0 miễn phí hoạt động như thế nào?" : "How does the 30-Day Pro v2.0 Free Trial work?",
      a: isVi
        ? "Mọi tài khoản mới khi tải và kích hoạt Aevum OS đều được tự động tặng 30 ngày trải nghiệm trọn vẹn sức mạnh của Hạng Aevum Pro v2.0 (Live Voice ↔ Coding Space, CoW Sandbox, Squad 6 Agent, CoResearch Cockpit). Hoàn toàn không yêu cầu thẻ tín dụng."
        : "Every new account on Aevum OS automatically receives a 30-day full Aevum Pro v2.0 trial (Symbiotic Live Voice, CoW Sandbox, 6-Agent Squad, CoResearch Cockpit). Zero credit card required."
    },
    {
      q: isVi ? "Điểm khác biệt cốt lõi giữa Aevum Pro và Aevum Pioneer (Ultra) là gì?" : "What is the key difference between Aevum Pro and Aevum Pioneer (Ultra)?",
      a: isVi
        ? "Aevum OS vận hành 100% BYOK — không bán hay cộng thêm phụ phí token AI. Aevum Pro (ưu đãi 199.000 VNĐ/tháng, giá gốc 249.000 VNĐ) mang đến trọn bộ công cụ v2.0: Live Voice ↔ Coding Space cộng sinh, CoW RAM Sandbox, Multi-CLI, Biệt đội 6 Agent, CoResearch 5 tầng và 5 máy trạm. Aevum Pioneer Ultra (ưu đãi 399.000 VNĐ/tháng, giá gốc 499.000 VNĐ) dành cho Kiến trúc sư trưởng & Tech Lead cần tự trị tối đa: Swarm Council 10 Agent, Blackboard Debate, RDD 10 tầng xuất IEEE/ACM Whitepaper, Tự động hóa 24/7 (Scheduler/Cron), Chưng cất Skill + PiperNet IoA, Phòng Lab Não Bộ 3D (Neural Lab), Local DPO Fine-Tuning và 10 máy trạm."
        : "Aevum OS is 100% BYOK with zero AI token markup. Aevum Pro (launch promo 199,000 VND/mo, list 249,000 VND) unlocks the full v2.0 builder toolkit: Symbiotic Live Voice ↔ Coding Space, CoW RAM Sandbox, Multi-CLI orchestration, 6-Agent Squad, 5-level CoResearch, and 5 workstations. Aevum Pioneer Ultra (launch promo 399,000 VND/mo, list 499,000 VND) is crafted for Principal Architects & Tech Leads: 10-Agent Swarm Council, Blackboard Debate, 10-level RDD with IEEE/ACM Whitepaper compiler, 24/7 Autonomous Scheduler/Cron, Skill Distillation + PiperNet IoA, 3D Neural Brain Lab, Local DPO Fine-Tuning, and 10 workstations."
    },
    {
      q: isVi ? "Hết 30 ngày dùng thử, mã nguồn và dữ liệu của tôi có bị mất không?" : "Will I lose my projects and memory after the trial ends?",
      a: isVi
        ? "Hoàn toàn KHÔNG! Aevum OS hoạt động ưu tiên trên máy của bạn (Local-First). Toàn bộ mã nguồn, ghi chú và bộ nhớ dự án trên máy tính của bạn vẫn giữ nguyên 100% và bạn tiếp tục sử dụng miễn phí vĩnh viễn trên gói Community."
        : "Never! Aevum OS is strictly Local-First. All your code, local memory, and project context remain 100% intact on your machine, transitioning seamlessly to the free lifetime Community tier."
    },
    {
      q: isVi ? "Tôi có thể kết nối những mô hình AI & CLI nào (Cơ chế BYOK & Multi-CLI)?" : "Which AI models and CLI engines can I connect (BYOK & Multi-CLI)?",
      a: isVi
        ? "Aevum OS hỗ trợ toàn diện BYOK cho Anthropic Claude, Google Gemini, OpenAI, DeepSeek, OpenRouter và Ollama / LM Studio chạy offline. Từ gói Pro v2.0 trở lên, bạn có thể điều phối đồng thời đa động cơ CLI (Antigravity, Claude Code, Codex, Cursor, Ollama) với nhiều tài khoản cô lập."
        : "Aevum OS supports full BYOK across Anthropic Claude, Google Gemini, OpenAI, DeepSeek, OpenRouter, and offline Ollama / LM Studio. Starting at Pro v2.0, you can orchestrate multiple CLI engines (Antigravity, Claude Code, Codex, Cursor, Ollama) across isolated accounts."
    },
    {
      q: isVi ? "Tôi có thể sử dụng Aevum OS trên bao nhiêu máy tính?" : "How many computers can I use Aevum OS on?",
      a: isVi
        ? "Gói Community hỗ trợ 1 máy tính cá nhân. Gói Pro hỗ trợ linh hoạt tối đa 5 máy tính. Gói Pioneer (Ultra) mở rộng tới 10 máy tính cùng lúc kèm ưu tiên Early Access Cloud Sync. Gói Enterprise hỗ trợ 20+ máy trạm tùy chỉnh theo quy mô đội ngũ."
        : "Community covers 1 personal computer. Pro covers up to 5 concurrent workstations. Pioneer (Ultra) expands to 10 concurrent machines with priority Early Access Cloud Sync. Enterprise scales to 20+ custom seats."
    },
    {
      q: isVi ? "Mã nguồn và dữ liệu dự án của tôi được bảo mật như thế nào?" : "How is my project source code and data kept secure?",
      a: isVi
        ? "Aevum OS tuân thủ triết lý Sovereign Security: Zero-Trust Capability Guard, màng lọc Rust/WASM PBCE ContextFence, chứng chỉ ngoại tuyến Ed25519 chống can thiệp, không gửi mã nguồn lên máy chủ bên thứ ba. Mọi thao tác tự trị đều chạy trong CoW RAM Sandbox có thể hoàn tác 0ms."
        : "Aevum OS enforces Sovereign Security: Zero-Trust Capability Guards, Rust/WASM PBCE ContextFence, tamper-proof Ed25519 offline licenses, zero third-party source exposure, and 0ms rollback CoW RAM Sandboxing."
    },
    {
      q: isVi ? "Tôi có thể hủy gói hoặc nâng cấp từ Pro lên Pioneer bất kỳ lúc nào không?" : "Can I cancel or upgrade from Pro to Pioneer anytime?",
      a: isVi
        ? "Có, bạn hoàn toàn chủ động quản lý gói dịch vụ. Khi nâng cấp lên Pioneer Ultra, thời hạn còn lại của bạn luôn được bảo toàn nguyên vẹn. Nếu hủy gia hạn, bạn vẫn dùng trọn chu kỳ đã thanh toán rồi tự động chuyển êm ái về gói Community miễn phí vĩnh viễn."
        : "Yes, you have complete self-serve control. Upgrading to Pioneer Ultra preserves your remaining period. If you cancel renewal, you retain full paid features until period end before reverting smoothly to lifetime-free Community."
    },
    {
      q: isVi ? "Gói Enterprise dành cho doanh nghiệp được triển khai ra sao?" : "How is the Enterprise tier deployed for organizations?",
      a: isVi
        ? "Đội ngũ kỹ sư I2FLabs đồng hành trực tiếp triển khai Private Cloud hoặc On-Premise cô lập 100% (Air-gapped), tích hợp SSO, phân quyền RBAC, nhật ký bảo mật và huấn luyện Cộng sự AI theo đúng quy chuẩn mã nguồn nội bộ."
        : "I2FLabs engineers partner directly with your organization to deploy isolated Private Cloud or 100% Air-Gapped On-Premise clusters with SSO, RBAC, audit logs, and custom AI Personas fine-tuned to internal standards."
    }
  ];

  return (
    <div id="pricing" className="pricing-section bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-100 [html[data-theme='light']_&]:text-slate-900 transition-colors">

      {/* ── 1. SECTION HEADER (ALIGN LEFT & SINGLE-LINE TITLE) ── */}
      <div className="p-6 sm:p-10 lg:p-14 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] relative flex flex-col md:flex-row md:items-end justify-between gap-6">

        {/* Left Side: Tag + Title + Subtitle */}
        <div className="text-left space-y-1.5 max-w-2xl">
          <span className="text-xs sm:text-[13px] font-sans text-white [html[data-theme='light']_&]:text-slate-900 font-semibold tracking-widest uppercase block">
            {isVi ? 'AEVUM OS v2.0 • ĐỒNG HÀNH CÙNG BUILDER' : 'AEVUM OS v2.0 • EMPOWERING BUILDERS'}
          </span>

          {showDetails ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium sm:font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[0.01em] font-display leading-tight">
              {isVi ? (
                <>Làm chủ công cụ. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Hiện thực hóa ý tưởng.</span></>
              ) : (
                <>Master your craft. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Bring ideas to life.</span></>
              )}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium sm:font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[0.01em] font-display leading-tight">
              {isVi ? (
                <>Làm chủ công cụ. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Hiện thực hóa ý tưởng.</span></>
              ) : (
                <>Master your craft. <span className="text-white [html[data-theme='light']_&]:text-slate-900">Bring ideas to life.</span></>
              )}
            </h2>
          )}

          <p className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 text-base font-normal leading-[1.7] pt-1">
            {isVi
              ? 'Khởi đầu miễn phí trọn đời trên máy của bạn. Nâng cấp lên Pro v2.0 với Live Voice Cộng Sinh & CoW Sandbox, hoặc bứt phá tối đa cùng Pioneer Ultra.'
              : 'Start 100% free locally forever. Upgrade to Pro v2.0 for Symbiotic Live Voice & CoW Sandbox, or unlock full swarm autonomy with Pioneer Ultra.'}
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
                className="pricing-details-btn inline-flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:hover:bg-slate-200 text-white [html[data-theme='light']_&]:text-slate-900 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Xem so sánh tính năng chi tiết & FAQ' : 'Compare Detailed Features & FAQ'}</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Fixed-Width Zero-Jitter Segmented Switcher */}
        <div className="relative inline-grid grid-cols-2 w-[248px] p-1 rounded-lg border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-200/70 shrink-0 self-start md:self-end select-none">
          {/* Sliding Pill Indicator */}
          <div
            className={`pricing-switch-pill absolute top-1 bottom-1 rounded-md transition-all duration-200 ease-out shadow-sm ${billingCycle === 'monthly'
              ? 'left-1 w-[calc(50%-4px)]'
              : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'
              }`}
          />

          <button
            onClick={() => setBillingCycle('monthly')}
            className={`relative z-10 py-1.5 text-center text-xs font-mono font-bold transition-colors cursor-pointer ${billingCycle === 'monthly'
              ? 'pricing-switch-btn-active font-extrabold'
              : 'pricing-switch-btn-inactive'
              }`}
          >
            {isVi ? 'Hàng tháng' : 'Monthly'}
          </button>

          <button
            onClick={() => setBillingCycle('yearly')}
            className={`relative z-10 py-1.5 flex items-center justify-center gap-1.5 text-xs font-mono font-bold transition-colors cursor-pointer ${billingCycle === 'yearly'
              ? 'pricing-switch-btn-active font-extrabold'
              : 'pricing-switch-btn-inactive'
              }`}
          >
            <span>{isVi ? 'Hàng năm' : 'Yearly'}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${billingCycle === 'yearly'
              ? 'bg-white/25 text-white'
              : 'bg-white/10 text-white border border-white/20'
              }`}>
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* ── 2. THREE-COLUMN SELF-SERVE GRID (COMMUNITY | PRO v2.0 | PIONEER ULTRA) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch pt-8 pb-6 px-4 sm:px-6">

        {/* COLUMN 1: COMMUNITY TIER */}
        <div className="pricing-card-subtle relative z-10 p-7 sm:p-9 space-y-6 flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-lg lg:mr-[-14px] lg:my-3 lg:pr-10 bg-[#0A0B0F]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 [html[data-theme='light']_&]:via-slate-200 to-transparent z-10" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-widest">
                {isVi ? 'DÀNH CHO CÁ NHÂN' : 'FOR INDIVIDUALS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-600 shrink-0 font-medium">
                {isVi ? 'MIỄN PHÍ TRỌN ĐỜI' : 'FREE FOREVER'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display mb-1">
              Aevum Community
            </h3>

            <p className="text-sm sm:text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 min-h-[48px] leading-relaxed">
              {isVi
                ? 'Local-First trọn đời trên máy của bạn. Tự do dùng API Key riêng, giữ kín 100% mã nguồn.'
                : 'Lifetime Local-First daemon on your machine. Bring your own API keys with 100% private code.'}
            </p>

            {/* Price */}
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
                <span className="text-xs font-mono block whitespace-nowrap leading-none font-normal text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                  {isVi ? '1 máy trạm • Tự do BYOK (Gemini, Claude, GPT, Ollama)' : '1 workstation • Full BYOK (Gemini, Claude, GPT, Ollama)'}
                </span>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono font-medium tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase">
                {isVi ? 'TÍNH NĂNG CỐT LÕI' : 'CORE CAPABILITIES'}
              </div>
              <div className="space-y-2.5 text-sm font-sans text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2] mt-1" />
                  <span>{isVi ? 'Chạy 100% cục bộ (Local-First) + MCP Stdio & SSE' : '100% Local-First daemon + MCP Stdio & SSE'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2] mt-1" />
                  <span>{isVi ? 'Ký ức Sống cục bộ & Quy hoạch O-DDD (7 Cơ quan)' : 'Local Living Memory Graph & O-DDD Governance'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2] mt-1" />
                  <span>{isVi ? '1 Cộng sự AI đồng hành 1-1 & Phản xạ kiến trúc cục bộ' : '1-on-1 AI Companion & Local Architectural Reflexes'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white/80 [html[data-theme='light']_&]:text-slate-700 shrink-0 stroke-[2] mt-1" />
                  <span>{isVi ? 'Kết nối không giới hạn BYOK & Ollama offline' : 'Unlimited BYOK API keys & offline Ollama models'}</span>
                </p>
                <p className="flex items-start gap-2.5 text-slate-400 [html[data-theme='light']_&]:text-slate-400 opacity-60">
                  <X size={14} className="text-slate-500 [html[data-theme='light']_&]:text-slate-400 shrink-0 mt-1" />
                  <span className="line-through [html[data-theme='light']_&]:text-slate-400">{isVi ? 'Live Voice ↔ Coding Space & CoW Sandbox' : 'Symbiotic Live Voice & CoW Sandbox'}</span>
                </p>
                <p className="flex items-start gap-2.5 text-slate-400 [html[data-theme='light']_&]:text-slate-400 opacity-60">
                  <X size={14} className="text-slate-500 [html[data-theme='light']_&]:text-slate-400 shrink-0 mt-1" />
                  <span className="line-through [html[data-theme='light']_&]:text-slate-400">{isVi ? 'Biệt đội Đa AI (Squad) & Đồng bộ đám mây' : 'Multi-Agent Squad & Cloud Sync'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              onClick={onOpenTrialModal}
              className="pricing-btn-community w-full min-h-[48px] py-3.5 px-4 rounded-full font-mono text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{isVi ? 'Tải Về & Dùng Ngay' : 'Download & Get Started'}</span>
              <ArrowRight size={14} className="text-slate-300 [html[data-theme='light']_&]:text-slate-800 shrink-0" />
            </button>
          </div>
        </div>

        {/* COLUMN 2: AEVUM PRO v2.0 (PROMINENT CENTER LAYER) */}
        <div className="pricing-pro-column relative z-20 p-7 sm:p-9 space-y-6 flex flex-col justify-between overflow-hidden lg:-my-1 rounded-2xl sm:rounded-3xl border border-white/25 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-2xl [html[data-theme='light']_&]:shadow-slate-900/10 bg-[#0A0B0F]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110%] h-[180px]"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.09) 0%, transparent 100%)',
                filter: 'blur(28px)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 [html[data-theme='light']_&]:via-slate-400/50 to-transparent z-10" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono font-bold text-slate-300 [html[data-theme='light']_&]:text-slate-700 uppercase tracking-widest">
                {isVi ? 'BUILDER CHUYÊN NGHIỆP' : 'PRO BUILDERS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 bg-white/10 [html[data-theme='light']_&]:bg-slate-100 text-xs font-mono text-white [html[data-theme='light']_&]:text-slate-900 font-bold shrink-0">
                {isVi ? 'PHỔ BIẾN NHẤT' : 'MOST POPULAR'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display flex items-center gap-2 mb-1">
              <span>Aevum Pro</span>
              <Zap size={18} className="text-white [html[data-theme='light']_&]:text-slate-800 fill-white/20 [html[data-theme='light']_&]:fill-slate-200 shrink-0" />
            </h3>

            <p className="text-sm sm:text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 min-h-[48px] leading-relaxed">
              {isVi
                ? 'Bộ vũ khí v2.0 toàn diện: Live Voice Cộng Sinh, CoW Sandbox, Multi-CLI & Biệt đội 6 Agent.'
                : 'Complete v2.0 toolkit: Symbiotic Live Voice, CoW Sandbox, Multi-CLI & 6-Agent Squad.'}
            </p>

            {/* Price (Launch Promo Discount Anchor) */}
            <div className="my-5 min-h-[68px] flex flex-col justify-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 line-through">
                  {billingCycle === 'monthly' ? '249.000 VNĐ' : '2.388.000 VNĐ'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 [html[data-theme='light']_&]:bg-emerald-100 border border-emerald-400/30 text-[10px] font-mono font-bold text-emerald-300 [html[data-theme='light']_&]:text-emerald-700 uppercase">
                  {billingCycle === 'monthly' ? (isVi ? 'Ưu đãi -20%' : 'Promo -20%') : (isVi ? 'Tiết kiệm 21%' : 'Save 21%')}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                {billingCycle === 'monthly' ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      199.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Tháng' : '/ Month'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      1.890.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Năm' : '/ Year'}
                    </span>
                  </>
                )}
              </div>
              <div className="pricing-sub-pro pl-2 mt-1.5 py-0.5">
                <span className="text-xs font-mono font-medium text-slate-200 [html[data-theme='light']_&]:text-slate-700 block whitespace-nowrap leading-none">
                  {billingCycle === 'monthly'
                    ? (isVi ? 'Tặng 30 ngày dùng thử PRO — Không cần thẻ' : '30-day free PRO trial — No card required')
                    : (isVi ? 'Chỉ ~157k/tháng • 5 máy trạm • 0đ phụ phí token' : 'Only ~157k/mo • 5 PCs • Zero token markup')}
                </span>
              </div>
            </div>

            {/* Pro v2.0 Superpowers List */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono font-medium tracking-wider text-slate-300 [html[data-theme='light']_&]:text-slate-700 uppercase">
                {isVi ? 'ĐẶC QUYỀN PRO v2.0' : 'PRO v2.0 SUPERPOWERS'}
              </div>
              <div className="space-y-2.5 text-sm font-sans text-slate-200 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">
                    {isVi ? 'Live Voice ↔ Coding Space Cộng Sinh (Talk+Paste, ASCP v1, HITL)' : 'Symbiotic Live Voice ↔ Coding Space (Talk+Paste, ASCP v1, HITL)'}
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">
                    {isVi ? 'Autonomous Mode + Super-Harness AST/LSP & CoW Sandbox 0ms' : 'Autonomous Mode + AST/LSP Super-Harness & 0ms CoW Sandbox'}
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Đa động cơ CLI & Multi-Account (Antigravity, Claude, Codex, Cursor)' : 'Multi-CLI Engine & Isolated Accounts (Antigravity, Claude, Codex, Cursor)'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Biệt đội 6 Agent (Squad Mode) + CoResearch Cockpit & RDD 5 tầng' : '6-Agent Squad Mode + In-Chat CoResearch & 5-Level RDD'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Generative UI 120Hz, Browser Automation Card & Debt Radar' : '120Hz Generative UI, Browser Automation Card & Debt Radar'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-white [html[data-theme='light']_&]:text-slate-900 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Tối đa 5 máy tính + Early Access Cloud Sync & Không giới hạn BYOK' : 'Up to 5 PCs + Early Access Cloud Sync & Unlimited BYOK (0% token fee)'}</span>
                </p>
                <p className="flex items-start gap-2.5 pt-1">
                  <Sparkles size={14} className="text-emerald-400 [html[data-theme='light']_&]:text-emerald-600 shrink-0 mt-1" />
                  <span className="text-emerald-300 [html[data-theme='light']_&]:text-emerald-700 font-medium">
                    {isVi
                      ? 'Ưu đãi Beta: Tặng trải nghiệm Neural Lab 3D & Huấn luyện Agent (DPO)'
                      : 'Beta Preview Perk: Try 3D Neural Brain Lab & Agent Training (DPO)'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full pt-4 z-10">
            <div className="absolute -top-3.5 right-3 z-0 pointer-events-none">
              <span className="pricing-pro-tag inline-flex items-center px-2.5 pt-1 pb-4 rounded-t-[5px] text-xs font-mono font-medium uppercase tracking-wider bg-white/10 [html[data-theme='light']_&]:bg-slate-100 border border-white/20 [html[data-theme='light']_&]:border-slate-300 text-white [html[data-theme='light']_&]:text-slate-800 whitespace-nowrap select-none">
                {isVi ? 'Khuyên dùng' : 'Recommended'}
              </span>
            </div>

            <button
              onClick={() => onOpenPaymentModal ? onOpenPaymentModal(billingCycle, 'pro') : onOpenTrialModal()}
              className="pricing-btn-pro relative z-10 w-full min-h-[48px] py-3.5 sm:py-4 px-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-none"
            >
              <span className="whitespace-nowrap">
                {isVi ? 'Nâng Cấp Pro (VietQR 24/7)' : 'Upgrade to Pro (VietQR)'}
              </span>
              <ArrowRight size={14} className="stroke-[2.5] shrink-0 text-black [html[data-theme='light']_&]:text-white" />
            </button>
          </div>
        </div>

        {/* COLUMN 3: AEVUM PIONEER (ULTRA) TIER */}
        <div className="pricing-card-enterprise relative z-10 p-7 sm:p-9 space-y-6 flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-400/30 [html[data-theme='light']_&]:border-amber-500/40 [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-lg lg:ml-[-14px] lg:my-3 lg:pl-10 bg-[#0A0B0F]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="pricing-card-gradient pricing-gradient-layer absolute inset-0" />
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110%] h-[160px]"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 158, 11, 0.14) 0%, transparent 100%)',
                filter: 'blur(26px)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent z-10" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono font-bold text-amber-300 [html[data-theme='light']_&]:text-amber-700 uppercase tracking-widest">
                {isVi ? 'ARCHITECT & TECH LEAD' : 'ARCHITECTS & LEADS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-amber-400/35 [html[data-theme='light']_&]:border-amber-500/40 bg-amber-500/15 [html[data-theme='light']_&]:bg-amber-50 text-xs font-mono text-amber-300 [html[data-theme='light']_&]:text-amber-800 font-bold tracking-wider shrink-0 uppercase">
                ULTRA
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display flex items-center gap-2 mb-1">
              <span>Aevum Pioneer</span>
              <Crown size={18} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0" />
            </h3>

            <p className="text-sm sm:text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 min-h-[48px] leading-relaxed">
              {isVi
                ? 'Hiệu năng tự trị tối đa: Swarm Council 10 Agent, Automation 24/7, Neural Lab & Local DPO.'
                : 'Peak autonomous power: 10-Agent Swarm Council, 24/7 Cron, 3D Neural Lab & Local DPO.'}
            </p>

            {/* Price (Launch Promo Discount Anchor) */}
            <div className="my-5 min-h-[68px] flex flex-col justify-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 line-through">
                  {billingCycle === 'monthly' ? '499.000 VNĐ' : '4.788.000 VNĐ'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 [html[data-theme='light']_&]:bg-amber-100 border border-amber-400/35 text-[10px] font-mono font-bold text-amber-300 [html[data-theme='light']_&]:text-amber-800 uppercase">
                  {billingCycle === 'monthly' ? (isVi ? 'Ưu đãi -20%' : 'Promo -20%') : (isVi ? 'Tiết kiệm ~1 triệu' : 'Save ~1M VND')}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                {billingCycle === 'monthly' ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      399.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Tháng' : '/ Month'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight whitespace-nowrap">
                      3.790.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-500 font-mono whitespace-nowrap">
                      {isVi ? '/ Năm' : '/ Year'}
                    </span>
                  </>
                )}
              </div>
              <div className="pricing-sub-enterprise pl-2 mt-1.5 py-0.5">
                <span className="text-xs font-mono font-medium text-amber-300/90 [html[data-theme='light']_&]:text-amber-700 block whitespace-nowrap leading-none">
                  {billingCycle === 'monthly'
                    ? (isVi ? '10 máy trạm • 10 Agent song song • Không giới hạn BYOK' : '10 PCs • 10 Concurrent Agents • Unlimited BYOK')
                    : (isVi ? 'Chỉ ~315k/tháng • Huy hiệu Pioneer • 0đ phụ phí token' : 'Only ~315k/mo • Pioneer Badge • Zero token markup')}
                </span>
              </div>
            </div>

            {/* Pioneer Ultra Capabilities */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono font-medium tracking-wider text-amber-300/90 [html[data-theme='light']_&]:text-amber-700 uppercase">
                {isVi ? 'ĐẶC QUYỀN PIONEER ULTRA' : 'PIONEER ULTRA EXCLUSIVES'}
              </div>
              <div className="space-y-2.5 text-sm font-sans text-slate-200 [html[data-theme='light']_&]:text-slate-700">
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">{isVi ? 'Toàn bộ đặc quyền của Aevum Pro v2.0' : 'Everything included in Aevum Pro v2.0'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium">{isVi ? 'Swarm Council 10 Agent + Blackboard Debate' : '10-Agent Swarm Council + Blackboard Debate'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'RDD 10 tầng & Xuất bản IEEE/ACM Living Whitepaper' : '10-Level RDD & IEEE/ACM Living Whitepaper Compiler'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Tự động hóa 24/7 (Scheduler/Cron) + Skill Distill + PiperNet IoA' : '24/7 Scheduler/Cron + Skill Distillation + PiperNet IoA'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? 'Sở hữu chính thức Neural Lab 3D & Huấn luyện Agent (Local DPO)' : 'Permanent 3D Neural Brain Lab & Agent Training (Local DPO)'}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Check size={14} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600 shrink-0 stroke-[2.5] mt-1" />
                  <span>{isVi ? '10 máy tính, Huy hiệu Pioneer & ưu tiên Early Access Cloud' : '10 PCs, Pioneer Founder Badge & Priority Cloud Early Access'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => onOpenPaymentModal ? onOpenPaymentModal(billingCycle, 'pioneer') : onOpenTrialModal()}
              className="w-full min-h-[48px] py-3.5 px-4 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap bg-amber-400 hover:bg-amber-300 text-black"
            >
              <span className="whitespace-nowrap">{isVi ? 'Mở Khóa Pioneer Ultra' : 'Unlock Pioneer Ultra'}</span>
              <ArrowRight size={14} className="shrink-0 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2.5. ENTERPRISE BESPOKE FULL-WIDTH STRIP ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/12 [html[data-theme='light']_&]:border-slate-200/90 bg-[#0C0E14] [html[data-theme='light']_&]:bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-widest">
                {isVi ? 'DOANH NGHIỆP & TỔ CHỨC' : 'ENTERPRISE & ORGANIZATIONS'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/15 [html[data-theme='light']_&]:border-slate-300 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-[11px] font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 uppercase">
                {isVi ? 'AIR-GAPPED • PRIVATE VPC' : 'AIR-GAPPED • PRIVATE VPC'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display">
              Aevum Enterprise — {isVi ? 'Triển Khai Cô Lập Toàn Diện' : 'Sovereign Isolated Deployment'}
            </h3>
            <p className="text-sm text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-relaxed">
              {isVi
                ? 'Toàn bộ đặc quyền Pioneer Ultra + Cài đặt On-Premise / Private Cloud cô lập 100%, 20+ máy trạm, 32+ Agent song song, SSO, phân quyền RBAC, nhật ký bảo mật, huấn luyện Persona nội bộ & SLA 99.99%.'
                : 'Everything in Pioneer Ultra + 100% Air-Gapped On-Premise / Private VPC, 20+ workstations, 32+ parallel agents, SSO, RBAC, audit logs, custom trained Personas, and 99.99% SLA.'}
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="mailto:hainguyen011238@gmail.com?subject=Aevum%20OS%20Enterprise%20Deployment%20Inquiry"
              className="pricing-btn-enterprise min-h-[48px] py-3.5 px-6 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>{isVi ? 'Liên Hệ Đội Ngũ Enterprise' : 'Contact Enterprise Team'}</span>
              <ArrowRight size={14} className="shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 3. FEATURE COMPARISON MATRIX TABLE (4-TIER SYSTEM CARD) ── */}
      {showDetails ? (
        <div className="px-6 sm:px-12 py-8 sm:py-10 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-[#0C0E14] [html[data-theme='light']_&]:bg-white p-5 sm:p-6">
              <div className="text-left">
                <span className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-semibold tracking-widest uppercase">
                  {isVi ? 'MA TRẬN ĐỐI CHIẾU 4 HẠNG • SYSTEM CARD' : '4-TIER FEATURE MATRIX • SYSTEM CARD'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display mt-1">
                  {isVi ? 'So Sánh Chi Tiết Quyền Lợi Aevum OS v2.0' : 'Detailed Aevum OS v2.0 Entitlement Breakdown'}
                </h2>
              </div>

              <button
                type="button"
                aria-expanded={showMatrix}
                onClick={() => setShowMatrix((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full border border-white/15 [html[data-theme='light']_&]:border-slate-300 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 hover:bg-white/10 text-xs font-mono font-medium text-white [html[data-theme='light']_&]:text-slate-900 transition-colors cursor-pointer shrink-0"
              >
                <span>
                  {showMatrix
                    ? (isVi ? 'Thu gọn bảng so sánh' : 'Hide comparison table')
                    : (isVi ? 'Mở bảng so sánh 10 nhóm quyền lợi' : 'Expand 10-row feature matrix')}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showMatrix ? 'rotate-180 text-white [html[data-theme="light"]_&]:text-slate-900' : ''}`} />
              </button>
            </div>

            {showMatrix && (
              <div className="code-box mt-4 animate-in fade-in duration-200">
                <div className="code-header">
                  <span className="text-[11px] font-mono text-slate-400">AEVUM OS v2.0 ENTITLEMENTS</span>
                  <span className="text-[10px] text-slate-400 font-mono">ED25519 + MCP GUARD VERIFIED</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono text-slate-300">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                        <th className="py-3 px-4">{isVi ? 'NĂNG LỰC HỆ THỐNG' : 'CAPABILITY'}</th>
                        <th className="py-3 px-4 text-center">COMMUNITY</th>
                        <th className="py-3 px-4 text-center text-white font-bold">PRO v2.0</th>
                        <th className="py-3 px-4 text-center text-amber-400 font-bold">PIONEER ULTRA</th>
                        <th className="py-3 px-4 text-center text-white font-bold">ENTERPRISE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Chi phí ưu đãi (Tháng / Năm)' : 'Launch Promo Pricing (Mo / Yr)'}</td>
                        <td className="py-3 px-4 text-center text-slate-400">{isVi ? '0 VNĐ / Trọn đời' : '0 VND / Forever'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '199k / 1.890k (Gốc 249k)' : '199k / 1,890k (List 249k)'}</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '399k / 3.790k (Gốc 499k)' : '399k / 3,790k (List 499k)'}</td>
                        <td className="py-3 px-4 text-center text-slate-300">{isVi ? 'Tùy chỉnh' : 'Custom'}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Số máy trạm (Ed25519 Roaming)' : 'Workstations (Ed25519)'}</td>
                        <td className="py-3 px-4 text-center">1 PC</td>
                        <td className="py-3 px-4 text-center text-white font-medium">5 PCs</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">10 PCs</td>
                        <td className="py-3 px-4 text-center text-slate-300">20+ / Custom</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Biệt đội Đa Agent (Squad / Swarm)' : 'Concurrent AI Agents'}</td>
                        <td className="py-3 px-4 text-center text-slate-400">1 Agent</td>
                        <td className="py-3 px-4 text-center text-white font-medium">6 Agents</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">10 Agents (Swarm Council)</td>
                        <td className="py-3 px-4 text-center text-white font-medium">32+ Parallel</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Live Voice ↔ Coding Space Cộng Sinh' : 'Symbiotic Live Voice ↔ Coding'}</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ Talk+Paste, ASCP v1, HITL' : '✓ Talk+Paste, ASCP v1, HITL'}</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '✓ Toàn quyền ưu tiên' : '✓ Full Priority'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Custom Voice</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Super-Harness AST/LSP & CoW Sandbox' : 'Super-Harness & 0ms CoW Sandbox'}</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ 0ms Rollback</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">✓ 0ms Rollback</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Isolated Enclave</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Đa động cơ CLI & BYOK (0đ phụ phí Token)' : 'Multi-CLI & Unlimited BYOK (0% Markup)'}</td>
                        <td className="py-3 px-4 text-center text-slate-400">BYOK Single</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Antigravity, Claude, Codex, Cursor</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '✓ Toàn hệ Multi-CLI • Tiết kiệm 85% Token' : '✓ Full Multi-CLI • Save 85% Tokens'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Private LLM VPC</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'CoResearch Cockpit & Độ sâu RDD' : 'CoResearch & RDD Depth'}</td>
                        <td className="py-3 px-4 text-center text-slate-400">{isVi ? 'Cơ bản (1 tầng)' : 'Depth 1'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">{isVi ? '✓ 5 tầng + Promote Plan' : '✓ Depth 5 + Promote Plan'}</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '✓ 10 tầng + IEEE Whitepaper' : '✓ Depth 10 + IEEE Whitepaper'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Depth 25+</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Generative UI 120Hz & Browser Card' : '120Hz Generative UI & Browser Ops'}</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">✓</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Automation 24/7, Skill Distill & PiperNet' : '24/7 Cron, Skill Distill & PiperNet'}</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '✓ Toàn quyền tự trị' : '✓ Full Autonomy'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Private Mesh</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Phòng Lab Não Bộ 3D & Huấn luyện Agent (DPO)' : '3D Neural Brain Lab & Agent Training (DPO)'}</td>
                        <td className="py-3 px-4 text-center text-slate-500">—</td>
                        <td className="py-3 px-4 text-center text-emerald-300 font-medium">{isVi ? '✦ Beta Preview (Ưu đãi tạm thời)' : '✦ Beta Preview (Limited Perk)'}</td>
                        <td className="py-3 px-4 text-center text-amber-300 font-bold">{isVi ? '✓ Sở hữu vĩnh viễn + Pioneer Badge' : '✓ Permanent + Pioneer Badge'}</td>
                        <td className="py-3 px-4 text-center text-white font-medium">✓ Dedicated Cluster</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-14 text-center bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC]">
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
        <div className="p-8 sm:p-12 lg:p-14 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto">
            <div className="text-left mb-8">
              <span className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-semibold tracking-widest uppercase block">
                {isVi ? 'HỎI ĐÁP & HỖ TRỢ' : 'FAQS & KNOWLEDGE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-display mt-1">
                {isVi ? 'Câu Hỏi Thường Gặp' : 'Frequently Asked Questions'}
              </h3>
            </div>

            <div className="pricing-faq-container rounded-xl border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-[#080812] [html[data-theme='light']_&]:bg-white divide-y divide-white/5 [html[data-theme='light']_&]:divide-slate-200 overflow-hidden">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full min-h-[48px] p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer hover:bg-white/[0.02] [html[data-theme='light']_&]:hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono font-bold text-white [html[data-theme='light']_&]:text-slate-900 shrink-0">
                          0{idx + 1}
                        </span>
                        <h4 className="text-base font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                          {faq.q}
                        </h4>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white [html[data-theme="light"]_&]:text-slate-900' : ''
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-[1.7] font-sans pl-11 sm:pl-14 animate-in fade-in duration-200">
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
