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

export const Pricing = ({ activeLang = 'vi', onOpenTrialModal, onOpenAuthModal, showDetails = true, onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState(0); // 1st FAQ open by default
  const isVi = activeLang === 'vi';

  const faqs = [
    {
      q: isVi ? "Chương trình 1 tháng (30 ngày) Pro Beta hoạt động như thế nào?" : "How does the 1-Month (30-Day) Pro Beta Trial work?",
      a: isVi 
        ? "Mọi tài khoản khi đăng ký trên Aevum OS đều được tự động kích hoạt bảo lưu Hạng PRO trong 1 tháng (30 ngày). Hoàn toàn không cần thẻ tín dụng."
        : "Every new account registered on Aevum OS automatically gets full PRO access for 1 month (30 days). No credit card required."
    },
    {
      q: isVi ? "Hết 1 tháng dùng thử, dữ liệu .aevum/ của tôi có bị mất không?" : "Will I lose my .aevum/ data after the trial ends?",
      a: isVi
        ? "Hoàn toàn KHÔNG! Aevum OS là Local-First. Toàn bộ mã nguồn, cấu trúc DDD và ký ức trong .aevum/ trên máy trạm của bạn vẫn được giữ nguyên 100% và tiếp tục dùng trên Hạng Community."
        : "Never! Aevum OS is strictly Local-First. All code, DDD structure, and local memory in .aevum/ stay completely intact on your machine on the Community tier."
    },

    {
      q: isVi ? "Cơ chế BYOK hỗ trợ những nhà cung cấp LLM và mô hình nào?" : "Which LLM providers and models are supported via BYOK?",
      a: isVi
        ? "Aevum OS hỗ trợ toàn diện các nền tảng LLM hàng đầu thông qua API Key cá nhân của bạn: Google Gemini (1.5 Flash/Pro), Anthropic Claude (3.5 Sonnet), OpenAI (GPT-4o), DeepSeek, OpenRouter và các Local LLM chạy cục bộ qua Ollama / LM Studio hoàn toàn offline."
        : "Aevum OS comprehensively supports all major LLM providers via your own API Keys: Google Gemini (1.5 Flash/Pro), Anthropic Claude (3.5 Sonnet), OpenAI (GPT-4o), DeepSeek, OpenRouter, and offline local LLMs via Ollama / LM Studio."
    },
    {
      q: isVi ? "Biệt đội Đa Agent (Multi-Agent Squad Mode) hoạt động ra sao?" : "How does Multi-Agent Squad Mode work in practice?",
      a: isVi
        ? "Thay vì chỉ tương tác đơn lẻ, Squad Mode cho phép bạn triệu tập đồng thời nhiều Persona chuyên biệt (An - Kiến trúc sư, Vidus - Kỹ sư Backend, Zenith - Reviewer, Luna - UI/UX). Các Persona tự động chia nhỏ task, phối hợp giải quyết vấn đề và đồng bộ qua bộ nhớ chung."
        : "Instead of single-threaded chat, Squad Mode orchestrates multiple specialized Personas simultaneously (An - Architect, Vidus - Backend, Zenith - Reviewer, Luna - UI/UX). They break down complex features, collaborate in real-time, and sync state through shared memory."
    },
    {
      q: isVi ? "Tôi có thể liên kết bao nhiêu máy trạm (Machine ID Binding)?" : "How many workstations can I link?",
      a: isVi
        ? "Hạng Community hỗ trợ 1 máy trạm cố định. Hạng Pro hỗ trợ tối đa 5 máy tính đồng thời (Laptop, PC văn phòng, Mac) với cơ chế đồng bộ Ký ức đám mây. Gói Enterprise hỗ trợ số lượng máy trạm linh hoạt theo thỏa thuận hợp đồng."
        : "Community supports 1 linked workstation. Pro supports up to 5 concurrent machines (Laptop, Desktop, Mac) with Living Memory cloud roaming. Enterprise offers custom workstation bindings tailored to your agreement."
    },
    {
      q: isVi ? "Mã nguồn và dữ liệu dự án của tôi được bảo mật thế nào?" : "How is my project source code and data secured?",
      a: isVi
        ? "Aevum OS tuân thủ triết lý Sovereign Security: Không telemetry theo dõi, không gửi mã nguồn của bạn về máy chủ bên thứ ba. Mọi chữ ký phần cứng đều được xác thực cục bộ bằng mật mã Ed25519 bất đối xứng tiêu chuẩn quân sự."
        : "Aevum OS enforces Sovereign Security: Zero telemetry tracking, zero unauthorized source code leaks. All hardware-bound licenses and actions are validated locally using military-grade Ed25519 asymmetric cryptography."
    },
    {
      q: isVi ? "Tôi có thể hủy gia hạn hoặc đổi gói bất kỳ lúc nào không?" : "Can I cancel or change my subscription at any time?",
      a: isVi
        ? "Có, bạn có toàn quyền quản lý gói cước tự phục vụ (Self-serve). Nếu hủy gói Pro, bạn vẫn được sử dụng toàn bộ tính năng Pro cho đến hết chu kỳ đã thanh toán và sau đó tự động chuyển về gói Community vĩnh viễn."
        : "Yes, you have full self-serve control over your subscription. If you cancel Pro, you retain full Pro access until the end of your billing cycle, then automatically transition to the free lifetime Community tier."
    },
    {
      q: isVi ? "Gói Enterprise được triển khai và hỗ trợ như thế nào?" : "How is the Enterprise tier deployed and supported?",
      a: isVi
        ? "Đội ngũ kỹ sư I2FLabs sẽ làm việc trực tiếp cùng doanh nghiệp để triển khai Private Cloud hoặc On-Premise hoàn toàn cô lập (Air-gapped VPC), tích hợp Single Sign-On (SSO), RBAC và đào tạo Persona theo quy chuẩn kỹ thuật nội bộ."
        : "The I2FLabs engineering team works directly with your company to deploy isolated Private Cloud or Air-Gapped On-Premise VPC clusters, integrating SSO, Enterprise RBAC, and bespoke fine-tuned model adapters."
    }
  ];

  return (
    <div id="pricing" className="border-subtle-b bg-[#0B0B11] text-slate-100 transition-colors">
      
      {/* ── 1. SECTION HEADER (ALIGN LEFT & SINGLE-LINE TITLE) ── */}
      <div className="p-6 sm:p-10 lg:p-14 border-subtle-b bg-[#0B0B11] relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left Side: Tag + Title + Subtitle */}
        <div className="text-left space-y-1.5 max-w-2xl">
          <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase block">
            {isVi ? 'ĐỒNG HÀNH CÙNG BUILDER' : 'EMPOWERING BUILDERS'}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-[-0.035em] font-display leading-tight">
            {isVi ? (
              <>Làm chủ công cụ. <span className="text-cyan-400">Hiện thực hóa ý tưởng.</span></>
            ) : (
              <>Master your craft. <span className="text-cyan-400">Bring ideas to life.</span></>
            )}
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed pt-1">
            {isVi 
              ? 'Khởi đầu hoàn toàn miễn phí trên máy của bạn. Khi ý tưởng lớn dần, hãy để các Persona AI đồng hành cùng bạn bứt phá mọi giới hạn sáng tạo.' 
              : 'Start 100% free on your local machine. As your vision grows, let autonomous AI Personas accelerate your creative journey.'}
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
                className="pricing-details-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              >
                <span>{isVi ? 'Xem so sánh tính năng chi tiết & FAQ' : 'Compare Detailed Features & FAQ'}</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Fixed-Width Zero-Jitter Segmented Switcher */}
        <div className="relative inline-grid grid-cols-2 w-[248px] p-1 rounded-lg border border-white/10 bg-white/[0.03] shrink-0 self-start md:self-end select-none">
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
            <span className={`text-[10px] px-1 py-0.5 rounded font-mono font-bold leading-none ${
              billingCycle === 'yearly' 
                ? 'bg-white/25 text-white' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* ── 2. THREE-COLUMN OVERLAPPING PRICING GRID (PRO SITS ON TOP LAYER) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch py-10 px-4 sm:px-6">
        
        {/* COLUMN 1: COMMUNITY TIER (TUCKED UNDER PRO ON RIGHT) */}
        <div className="pricing-card-subtle relative z-10 p-8 sm:p-10 space-y-6 flex flex-col justify-between lg:mr-[-16px] lg:my-3 lg:pr-10">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                {isVi ? 'BUILDER KHÁM PHÁ' : 'EXPLORER BUILDER'}
              </span>
              <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400 shrink-0">
                LOCAL FIRST
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1">
              Aevum Community
            </h3>

            <p className="text-xs text-slate-400 min-h-[36px]">
              {isVi 
                ? 'Miễn phí trọn đời cho cá nhân. Chạy 100% cục bộ với API Key riêng của bạn.' 
                : 'Free forever for individual builders. 100% Local-First with your own API Keys.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight whitespace-nowrap">
                  0 VNĐ
                </span>
                <span className="text-xs text-slate-300 font-mono whitespace-nowrap">
                  {isVi ? '/ Trọn đời' : '/ Forever'}
                </span>
              </div>
              <div className="pricing-sub-community pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono block whitespace-nowrap leading-none font-semibold">
                  {isVi ? 'Tự do dùng API Key riêng (BYOK)' : 'Bring your own API keys (BYOK)'}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                {isVi ? 'ĐẶC QUYỀN CỐT LÕI' : 'CORE PRIVILEGES'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-300">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? '100% Tính năng cốt lõi Local-First' : 'Full Local-First Core OS features'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'BYOK: Dùng API Key (Gemini, Claude, GPT, Ollama)' : 'BYOK API Keys (Gemini, Claude, GPT, Ollama)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Chat tương tác 1-1 với Persona độc lập' : '1-on-1 Persona Interactive Chat'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Lưu trữ Ký ức & Phản xạ DDD trong .aevum/' : 'Local Memory & Reflex Storage (.aevum/)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Tối đa 1 máy trạm liên kết' : 'Max 1 linked Workstation'}</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-300">
                  <X size={14} className="text-slate-400 shrink-0" />
                  <span>{isVi ? 'Multi-Agent Squad Mode (Khóa)' : 'Multi-Agent Squad Mode (Locked)'}</span>
                </p>
                <p className="flex items-center gap-2.5 text-slate-300">
                  <X size={14} className="text-slate-400 shrink-0" />
                  <span>{isVi ? 'Living Memory Cloud Sync (Khóa)' : 'Living Memory Cloud Sync (Locked)'}</span>
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="pricing-btn-community w-full py-3.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span className="whitespace-nowrap">{isVi ? 'Tải Về & Dùng Ngay' : 'Download & Get Started'}</span>
            <ArrowRight size={14} className="text-slate-400 shrink-0" />
          </button>
        </div>

        {/* COLUMN 2: PRO TIER (PROMINENT CENTER LAYER OVERLAPPING SIDE CARDS) */}
        <div className="pricing-pro-column relative z-20 p-8 sm:p-10 space-y-6 flex flex-col justify-between overflow-hidden lg:-my-1">
          {/* Top Floating Laser Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div>
            {/* Top Cyber Ribbon */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                {isVi ? 'BUILDER CHUYÊN NGHIỆP' : 'PRO BUILDER'}
              </span>
              <span className="px-2.5 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                {isVi ? 'PHỔ BIẾN' : 'POPULAR'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2 mb-1">
              <span>Aevum Pro</span>
              <Zap size={18} className="text-cyan-400 fill-cyan-400 shrink-0" />
            </h3>

            <p className="text-xs text-slate-300 min-h-[36px]">
              {isVi 
                ? 'Mở khóa Biệt đội Đa Agent (Squad Mode), Đồng bộ Ký ức đám mây và Nghiên cứu sâu đa bước.' 
                : 'Autonomous Squad Orchestration, Cloud Living Memory Sync, and Deep Research.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                {billingCycle === 'monthly' ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight whitespace-nowrap">
                      249.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                      {isVi ? '/ Tháng' : '/ Month'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight whitespace-nowrap">
                      1.990.000 VNĐ
                    </span>
                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
                      {isVi ? '/ Năm' : '/ Year'}
                    </span>
                  </>
                )}
              </div>
              <div className="pricing-sub-pro pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono font-bold block whitespace-nowrap leading-none">
                  {billingCycle === 'monthly' 
                    ? (isVi ? 'Tặng 1 tháng (30 ngày) dùng thử PRO' : '1-month (30-day) free trial included')
                    : (isVi ? 'Tiết kiệm 20% (~165k/tháng)' : 'Save 20% (~$7/mo)')}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                {isVi ? 'ĐẶC QUYỀN CHUYÊN NGHIỆP' : 'PRO PRIVILEGES'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-200">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span className="text-white font-semibold">{isVi ? 'Bao gồm toàn bộ tính năng Community' : 'Includes everything in Community'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span className="text-cyan-400 font-bold">{isVi ? 'Multi-Agent Squad Mode: Điều phối đa Persona' : 'Multi-Agent Squad Mode (Multi-Personas)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Living Memory Cloud Sync: Đồng bộ Ký ức đa máy' : 'Living Memory Cloud Sync & Roaming'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Ed25519 Machine ID: Tối đa 5 máy trạm liên kết' : 'Ed25519 Machine ID (Up to 5 Devices)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Deep Research Engine: Nghiên cứu sâu đa bước' : 'Deep Research Engine & Whitepapers'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Technical Debt Radar & Báo cáo Tiến hóa Persona' : 'Technical Debt Radar & Evolution'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Ưu tiên kết nối PiperNet Mesh & Hỗ trợ VIP' : 'Priority PiperNet Mesh & VIP Support'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full pt-4">
            {/* Tag tab peeking clearly from behind the button on the right side with transparent bg */}
            <div className="absolute -top-3.5 right-3 z-0 pointer-events-none">
              <span className="pricing-pro-tag inline-flex items-center px-2.5 pt-1 pb-4 rounded-t-[5px] text-[9px] font-mono font-bold uppercase tracking-wider bg-transparent border border-cyan-400 text-cyan-300 whitespace-nowrap select-none">
                {isVi ? 'Dành cho Beta Tester' : 'For Beta Testers'}
              </span>
            </div>


            <button
              onClick={onOpenTrialModal}
              className="pricing-btn-pro relative z-10 w-full py-3.5 px-3 rounded-lg text-[11px] sm:text-xs font-mono font-black uppercase tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{isVi ? 'Đăng Ký Trải Nghiệm' : 'Register Early Access'}</span>
              <ArrowRight size={14} className="stroke-[2.5] shrink-0" />
            </button>
          </div>




        </div>

        {/* COLUMN 3: ENTERPRISE TIER (PREMIUM CYBER AMETHYST & DEDICATED BESPOKE CTA) */}
        <div className="pricing-card-enterprise relative z-10 p-8 sm:p-10 space-y-6 flex flex-col justify-between overflow-hidden lg:ml-[-16px] lg:my-3 lg:pl-10">
          {/* Top Subtle Luxury Laser Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                {isVi ? 'DOANH NGHIỆP & TỔ CHỨC' : 'ENTERPRISE & TEAMS'}
              </span>
              <span className="px-2.5 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-[10px] font-mono text-purple-300 font-bold tracking-wider shrink-0">
                ON-PREM / CLOUD
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1">
              Aevum Enterprise
            </h3>

            <p className="text-xs text-slate-400 min-h-[36px]">
              {isVi 
                ? 'Triển khai On-Premise hoặc Private Cloud hoàn toàn cô lập, bảo mật tối đa cho doanh nghiệp.' 
                : 'Isolated On-Premise or Private Cloud deployment with customized governance & security.'}
            </p>

            {/* Price (100% Single-Line & Uniform Baseline Alignment) */}
            <div className="my-5 min-h-[56px] flex flex-col justify-start">
              <div className="flex items-baseline gap-1.5 flex-nowrap">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight whitespace-nowrap">
                  {isVi ? 'Tùy Chỉnh' : 'Custom'}
                </span>
                <span className="text-xs text-slate-300 font-mono whitespace-nowrap">
                  {isVi ? '/ Đội ngũ' : '/ Tailored'}
                </span>
              </div>
              <div className="pricing-sub-enterprise pl-2 mt-1.5 py-0.5">
                <span className="text-[11px] font-mono font-bold block whitespace-nowrap leading-none">
                  {isVi ? 'Triển khai On-Premise / Private VPC' : 'Isolated On-Premise / Private VPC'}
                </span>
              </div>
            </div>

            {/* Clean Open Feature List */}
            <div className="space-y-3 mb-6">
              <div className="text-[11px] font-mono font-bold tracking-wider text-purple-400 uppercase">
                {isVi ? 'ĐẶC QUYỀN DOANH NGHIỆP' : 'ENTERPRISE CAPABILITIES'}
              </div>
              <div className="space-y-2.5 text-xs font-mono text-slate-300">
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span className="text-white font-semibold">{isVi ? 'Toàn bộ quyền lợi của Hạng Pro' : 'Includes everything in Pro'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Triển khai On-Premise / Private Cloud cô lập 100%' : '100% Air-gapped On-Premise or Private VPC'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Số lượng máy trạm & Seats theo thỏa thuận' : 'Custom Workstation Bindings & Seats (Customizable)'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Tùy biến Custom Personas & Fine-tuned LLM riêng' : 'Custom Personas & Fine-Tuned Model Adapters'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Quản trị phân quyền tổ chức (RBAC) & Audit Logs' : 'Enterprise RBAC, SSO & Security Audit Logs'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Cam kết SLA 99.99% & Hỗ trợ kỹ thuật 24/7' : '99.99% SLA Guarantee & 24/7 Tech Support'}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Check size={14} className="text-purple-400 shrink-0 stroke-[2.5]" />
                  <span>{isVi ? 'Đội ngũ kỹ sư I2FLabs đồng hành triển khai' : 'Dedicated I2FLabs Solutions Engineering Team'}</span>
                </p>
              </div>
            </div>
          </div>

          <a
            href="mailto:hainguyen011238@gmail.com?subject=Aevum%20OS%20Enterprise%20Deployment%20Inquiry"
            className="pricing-btn-enterprise w-full py-3.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span className="whitespace-nowrap">{isVi ? 'Liên Hệ Đội Ngũ Phát Triển' : 'Contact Development Team'}</span>
            <ArrowRight size={14} className="shrink-0" />
          </a>
        </div>

      </div>

      {/* ── 3. FEATURE COMPARISON MATRIX TABLE ── */}
      {showDetails ? (
        <div className="p-8 sm:p-12 border-subtle-b bg-[#0B0B11]">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-6">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
                {isVi ? 'MA TRẬN ĐỐI CHIẾU' : 'FEATURE MATRIX'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                {isVi ? 'So Sánh Tính Năng Chi Tiết' : 'Detailed Entitlement Breakdown'}
              </h3>
            </div>

            <div className="code-box">
              <div className="code-header">
                <span className="text-[11px] font-mono text-slate-400">AEVUM OS ENTITLEMENTS</span>
                <span className="text-[10px] text-cyan-400 font-mono">ED25519 VERIFIED</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono text-slate-300">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                      <th className="py-3 px-4">{isVi ? 'TÍNH NĂNG HỆ THỐNG' : 'CAPABILITY'}</th>
                      <th className="py-3 px-4 text-center">{isVi ? 'COMMUNITY' : 'COMMUNITY'}</th>
                      <th className="py-3 px-4 text-center text-cyan-400 font-bold">PRO</th>
                      <th className="py-3 px-4 text-center text-purple-400 font-bold">{isVi ? 'ENTERPRISE' : 'ENTERPRISE'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Mô hình chi phí' : 'Pricing Model'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">0 VNĐ / Trọn đời</td>
                      <td className="py-3 px-4 text-center text-cyan-400 font-bold">{isVi ? '249.000 VNĐ / Tháng' : '249,000 VND / Mo'}</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">Tùy chỉnh theo quy mô</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Cơ chế API Key & LLM' : 'BYOK LLM API Keys'}</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✓ 100% BYOK</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✓ 100% BYOK</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">✓ BYOK + Private LLM VPC</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Giới hạn máy trạm (Machine ID)' : 'Max Workstations'}</td>
                      <td className="py-3 px-4 text-center">1 Thiết bị</td>
                      <td className="py-3 px-4 text-center text-cyan-400 font-bold">5 Thiết bị (Đổi máy linh hoạt)</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">{isVi ? 'Theo thỏa thuận' : 'Custom Agreement'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Multi-Agent Squad Mode' : 'Multi-Agent Squad Mode'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">—</td>
                      <td className="py-3 px-4 text-center text-cyan-400 font-bold">✓ Không giới hạn</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">✓ Đa Biệt đội Song song</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Living Memory Cloud Sync' : 'Living Memory Cloud Sync'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">—</td>
                      <td className="py-3 px-4 text-center text-cyan-400 font-bold">✓ Tự động đồng bộ Đám mây</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">✓ Private Cluster Sync</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Mô hình triển khai' : 'Deployment Model'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">Desktop Cục bộ</td>
                      <td className="py-3 px-4 text-center text-slate-300">Desktop + Cloud Sync</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">On-Premise / Private Cloud</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-white">{isVi ? 'Hỗ trợ kỹ thuật & SLA' : 'Tech Support & SLA'}</td>
                      <td className="py-3 px-4 text-center text-slate-400">Cộng đồng</td>
                      <td className="py-3 px-4 text-center text-cyan-400 font-bold">Ưu tiên VIP</td>
                      <td className="py-3 px-4 text-center text-purple-400 font-bold">24/7 SLA 99.99% + 1-on-1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Call-To-Action Button to view details on the dedicated page */
        <div className="py-14 text-center bg-[#0B0B11] border-subtle-b">
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-cyan-500/10"
          >
            <span>{isVi ? 'Xem So Sánh Tính Năng Chi Tiết & FAQ' : 'Compare Detailed Features & FAQs'}</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* ── 4. FAQS ACCORDION DROPDOWN ── */}
      {showDetails && (
        <div className="p-8 sm:p-12 lg:p-14 bg-[#0B0B11]">
          <div className="max-w-4xl mx-auto">
            <div className="text-left mb-8">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase block">
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
