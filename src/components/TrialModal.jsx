import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Zap, CheckCircle2, Sparkles, Check } from 'lucide-react';
import { CustomSelect } from './ui/CustomSelect';
import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import anLoverSticker from '../../assets/stickers/An_Collection/An_Lover.webp';

/**
 * Multi-Step Early Access & Creative Survey Modal for Aevum OS
 * Redesigned to match the New Minimalist Swiss Editorial Dark Theme:
 * - Rounded-3xl floating card with frosted matte glass backdrop.
 * - Minimalist pill stepper (01 Thông tin • 02 Nhu cầu • 03 Tùy biến).
 * - Airy editorial typography and sleek rounded-xl input fields.
 * - High-contrast pill CTA button (matching the hero #ECEEFE style).
 */
export const TrialModal = ({ isOpen, onClose, activeLang = 'vi', user }) => {
  const isVi = activeLang === 'vi';
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    website: '', // Honeypot field (anti-spam)
    // Step 2: Product & Engineering Context
    ide: 'Cursor IDE',
    role: 'Solo Developer',
    primaryPainPoint: 'Chống mất trí nhớ AI (Context Amnesia)',
    desiredFeature: 'Multi-Agent Squad Orchestration',
    // Step 3: Creative & Fun Survey
    agentName: '',
    agentVibe: 'Chuyên nghiệp, nghiêm túc & chính xác',
    customNotes: ''
  });

  // Automatically prefill user metadata from Supabase
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || prev.name || '',
        email: user.email || prev.email || ''
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage('');
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomSelectChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.name || !formData.email) return;
    }
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      website: formData.website || '',
      ide: formData.ide,
      role: formData.role,
      primaryPainPoint: formData.primaryPainPoint,
      desiredFeature: formData.desiredFeature,
      agentName: formData.agentName || 'Chưa đặt tên',
      agentVibe: formData.agentVibe,
      customNotes: formData.customNotes || '',
      source: 'aevum_early_access_modal'
    };

    try {
      let isWaitlistConfirmed = false;

      // 1. Ghi nhận Waitlist vào Supabase
      if (user) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            const result = await MembershipService.activateTrial(session.access_token, user.id);
            if (result && result.success) {
              isWaitlistConfirmed = true;
            }
          }
        } catch (supabaseErr) {
          console.warn('[EarlyAccess] Supabase reservation notice:', supabaseErr);
        }
      }

      // 2. Gửi Webhook lưu trữ hồ sơ
      const WEBHOOK_URL = 'https://n8n.quanly.i2f.vn/webhook/aevum-beta-trial';
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            isWaitlistConfirmed
          })
        });
      } catch (webhookErr) {
        console.warn('[EarlyAccess] Webhook dispatch notice:', webhookErr);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('[EarlyAccess] Submission failed:', err);
      setErrorMessage(isVi ? 'Không thể gửi đăng ký lúc này. Vui lòng thử lại sau.' : 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  // Options
  const ideOptions = [
    { value: 'Cursor IDE', label: 'Cursor IDE (AI-First Editor)' },
    { value: 'VS Code + Claude Code', label: 'VS Code + Claude Code / Antigravity' },
    { value: 'Windsurf / Cascade', label: 'Windsurf / Codeium Cascade' },
    { value: 'Zed Editor', label: 'Zed Editor (Rust-Powered)' },
    { value: 'Neovim / CLI Terminal', label: 'Neovim / Pure Terminal CLI' },
    { value: 'JetBrains IDEs', label: 'JetBrains (IntelliJ / WebStorm / PyCharm)' },
    { value: 'Other', label: isVi ? 'Khác / Other' : 'Other' }
  ];

  const roleOptions = [
    { value: 'Solo Developer', label: 'Solo Developer / Freelancer' },
    { value: 'Tech Lead / Core Dev', label: 'Tech Lead / Core Engineer' },
    { value: 'AI Researcher / Engineer', label: 'AI Researcher / Engineer' },
    { value: 'Founder / CTO', label: 'Founder / CTO / Product Owner' }
  ];

  const painPointOptions = [
    { value: 'Chống mất trí nhớ AI (Context Amnesia)', label: isVi ? 'Chống mất trí nhớ AI (Context Amnesia)' : 'Fixing AI Context Amnesia' },
    { value: 'Thiếu quy trình Lập kế hoạch (Plan-First)', label: isVi ? 'Thiếu quy trình Lập kế hoạch trước khi viết code (Plan-First)' : 'Lack of Plan-First Execution Workflow' },
    { value: 'Không phối hợp được Biệt đội Multi-Agent', label: isVi ? 'Không phối hợp được Biệt đội Multi-Agent chuyên biệt' : 'Multi-Agent Squad Coordination Bottleneck' },
    { value: 'Rò rỉ dữ liệu / Thiếu Memory Vault cục bộ', label: isVi ? 'Rò rỉ dữ liệu / Thiếu Memory Vault mã hóa cục bộ' : 'Data Privacy & Decoupled Local Vault' }
  ];

  const featureOptions = [
    { value: 'Multi-Agent Squad Orchestration', label: isVi ? 'Multi-Agent Squad Orchestration (Biệt đội Agent tự hành)' : 'Multi-Agent Squad Orchestration' },
    { value: 'PiperNet P2P Knowledge Sharing', label: isVi ? 'PiperNet P2P Mesh (Chia sẻ giải pháp thiết kế an toàn)' : 'PiperNet P2P Knowledge Mesh' },
    { value: 'Offline Local LLM Vault Sync', label: isVi ? 'Offline Local LLM Sync (Chạy 100% không internet)' : 'Offline Local LLM Vault Sync' },
    { value: 'Automated Code Audit & Evidence Harvesting', label: isVi ? 'Automated Code Audit & Evidence Harvesting (Tự động audit code)' : 'Automated Code Audit & Evidence Harvesting' }
  ];

  const vibeOptions = [
    { value: 'Chuyên nghiệp, nghiêm túc & chính xác', label: isVi ? 'Chuyên nghiệp, nghiêm túc & chuẩn mực kỹ thuật 100%' : '100% Professional, Serious & Technical' },
    { value: 'Thân thiện, hài hước & biết khích lệ', label: isVi ? 'Thân thiện, hài hước & luôn khích lệ developer' : 'Friendly, Humorous & Encouraging' },
    { value: 'Thẳng thắn, châm biếm thiên tài kiểu Gilfoyle', label: isVi ? 'Thẳng thắn, châm biếm thiên tài (Vibe Gilfoyle - Pied Piper)' : 'Sarcastic Genius (Gilfoyle Vibe - Pied Piper)' },
    { value: 'Triết lý, bí ẩn như nhân vật Sci-Fi', label: isVi ? 'Triết lý, bí ẩn & sâu sắc như nhân vật Sci-Fi Cyberpunk' : 'Philosophical & Cyberpunk Sci-Fi Sidekick' }
  ];

  const stepLabels = [
    { number: '01', title: isVi ? 'Thông tin' : 'Contact' },
    { number: '02', title: isVi ? 'Nhu cầu' : 'Roadmap' },
    { number: '03', title: isVi ? 'Tùy biến' : 'Vibe' }
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">

      {/* Floating Rounded Editorial Modal Container */}
      <div 
        className="relative w-full max-w-xl bg-[#0B0D13] [html[data-theme='light']_&]:bg-[#FFFFFF] border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden text-slate-100 transition-all max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── TOP HEADER: KICKER BADGE & CLEAN CLOSE BUTTON ── */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-white/[0.06] [html[data-theme='light']_&]:border-slate-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700 text-[10px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {isVi ? 'EARLY ACCESS • SỐ LƯỢNG CÓ HẠN' : 'EARLY ACCESS • LIMITED SEATS'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/10 [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── STEPPER PILLS ── */}
        {!isSubmitted && (
          <div className="px-6 sm:px-8 py-3.5 border-b border-white/[0.06] [html[data-theme='light']_&]:border-slate-100 bg-white/[0.01]">
            <div className="flex items-center justify-between gap-2">
              {stepLabels.map((s, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep > stepNum;

                return (
                  <React.Fragment key={s.number}>
                    <div 
                      className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                        isActive 
                          ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' 
                          : isCompleted 
                          ? 'text-cyan-400 font-medium' 
                          : 'text-slate-500'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isActive 
                          ? 'bg-white text-black font-bold' 
                          : isCompleted 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                          : 'bg-white/5 text-slate-500'
                      }`}>
                        {isCompleted ? <Check size={10} strokeWidth={3} /> : stepNum}
                      </span>
                      <span className="hidden sm:inline font-sans text-xs tracking-tight">{s.title}</span>
                    </div>

                    {idx < stepLabels.length - 1 && (
                      <div className={`flex-1 h-[1px] transition-colors ${
                        isCompleted ? 'bg-cyan-500/40' : 'bg-white/10 [html[data-theme="light"]_&]:bg-slate-200'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {isSubmitted ? (
          /* ── SUCCESS SCREEN WITH AN STICKER ── */
          <div className="p-6 sm:p-10 space-y-5 text-center flex-1 overflow-y-auto flex flex-col justify-center items-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <img
                src={anLoverSticker}
                alt="An Lover Sticker"
                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]"
              />
            </div>

            <div className="space-y-2.5 max-w-md mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-semibold uppercase tracking-wider">
                <Sparkles size={12} className="text-cyan-400" />
                <span>{isVi ? 'BẢO LƯU 30 NGÀY AEVUM PRO' : '30-DAY PRO TRIAL RESERVED'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                {isVi ? 'Ghi danh Early Access thành công!' : 'Early Access Confirmed!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light leading-relaxed font-sans">
                {isVi
                  ? `Tài khoản (${formData.email || user?.email || 'của bạn'}) đã được ghi nhận vào danh sách ưu tiên. Quyền lợi 1 tháng Aevum Pro được bảo lưu và tự động kích hoạt khi bạn kết nối máy trạm đầu tiên.`
                  : `Your account (${formData.email || user?.email || 'your account'}) is officially on the priority waitlist. Your 30-day Pro trial is reserved and activates upon connecting your workstation.`}
              </p>
            </div>

            <div className="pt-2 w-full max-w-xs">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap size={14} className="fill-current" />
                <span>{isVi ? 'Xác nhận & Hoàn tất' : 'Confirm & Complete'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={currentStep === 3 ? handleSubmit : handleNextStep} className="flex flex-col flex-1 min-h-0">

            {/* Honeypot field - anti-spam */}
            <input
              type="text"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Form Body Content */}
            <div className="p-6 sm:p-8 space-y-5 text-left flex-1 overflow-y-auto font-sans">

              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900">
                      {isVi ? 'Thông tin đăng ký trải nghiệm Early Access' : 'Basic Contact Details'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light leading-relaxed">
                      {isVi
                        ? 'Cung cấp tên và Email để nhận mã nạp Daemon bộ não ngoại vi Aevum OS.'
                        : 'Provide your name and email to receive your Aevum OS Daemon access token.'}
                    </p>
                  </div>

                  {/* Input: Name */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase flex items-center justify-between">
                      <span>{isVi ? 'Họ và tên' : 'Full Name'} *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isVi ? 'Nguyễn Văn A' : 'Alex Mercer'}
                      className="w-full bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 focus:border-white/40 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white [html[data-theme='light']_&]:text-slate-900 placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>

                  {/* Input: Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase flex items-center justify-between">
                      <span>{isVi ? 'Email liên hệ' : 'Work Email'} *</span>
                      {user && (
                        <span className="text-[10px] text-cyan-400 font-mono font-normal">
                          {isVi ? 'Đã liên kết tài khoản' : 'Linked account'}
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={!!user}
                      placeholder="dev@company.com"
                      className={`w-full rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm transition-all ${
                        user
                          ? 'bg-white/[0.02] border border-white/5 text-slate-500 cursor-not-allowed'
                          : 'bg-white/[0.03] [html[data-theme=\'light\']_&]:bg-slate-50 border border-white/10 [html[data-theme=\'light\']_&]:border-slate-200 hover:border-white/20 focus:border-white/40 text-white [html[data-theme=\'light\']_&]:text-slate-900 placeholder:text-slate-600 outline-none'
                      }`}
                    />
                  </div>

                  {/* Custom Select: IDE */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Trình soạn thảo / IDE chính đang sử dụng' : 'Primary IDE / Workspace'} *
                    </label>
                    <CustomSelect
                      options={ideOptions}
                      value={formData.ide}
                      onChange={(val) => handleCustomSelectChange('ide', val)}
                      buttonClassName="px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl min-h-[42px] bg-white/[0.03] border-white/10 hover:border-white/25 flex items-center justify-between"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Product & Roadmap Survey */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900">
                      {isVi ? 'Nhu cầu Kỹ thuật & Định hướng Phát triển' : 'Engineering Context & Roadmap Survey'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light leading-relaxed">
                      {isVi
                        ? 'Giúp I2FLabs tối ưu hóa kiến trúc Aevum OS theo đúng mong muốn của bạn.'
                        : 'Help I2FLabs shape the roadmap for next-generation Agentic OS features.'}
                    </p>
                  </div>

                  {/* Custom Select: Role */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Quy mô đội ngũ / Vai trò kỹ thuật' : 'Engineering Role'} *
                    </label>
                    <CustomSelect
                      options={roleOptions}
                      value={formData.role}
                      onChange={(val) => handleCustomSelectChange('role', val)}
                      buttonClassName="px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl min-h-[42px] bg-white/[0.03] border-white/10 hover:border-white/25 flex items-center justify-between"
                    />
                  </div>

                  {/* Custom Select: Primary Pain Point */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Trở ngại lớn nhất bạn gặp phải với AI Agent hiện tại?' : 'Biggest AI Agent bottleneck?'} *
                    </label>
                    <CustomSelect
                      options={painPointOptions}
                      value={formData.primaryPainPoint}
                      onChange={(val) => handleCustomSelectChange('primaryPainPoint', val)}
                      buttonClassName="px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl min-h-[42px] bg-white/[0.03] border-white/10 hover:border-white/25 flex items-center justify-between"
                    />
                  </div>

                  {/* Custom Select: Desired Feature */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Tính năng bạn mong đợi Aevum OS ra mắt tiếp theo?' : 'Most desired future feature?'} *
                    </label>
                    <CustomSelect
                      options={featureOptions}
                      value={formData.desiredFeature}
                      onChange={(val) => handleCustomSelectChange('desiredFeature', val)}
                      buttonClassName="px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl min-h-[42px] bg-white/[0.03] border-white/10 hover:border-white/25 flex items-center justify-between"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Fun & Creative Agent Customization Survey */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900">
                      {isVi ? 'Thiết kế Nhân viên Agent Lý tưởng' : 'Customize Your Ideal Agent Companion'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light leading-relaxed">
                      {isVi
                        ? 'Nếu bạn sở hữu một trợ lý Agent tự hành 24/7 trong Aevum OS, bạn sẽ cá nhân hóa nó như thế nào?'
                        : 'If you had an autonomous 24/7 agent inside Aevum OS, how would you name and design its vibe?'}
                    </p>
                  </div>

                  {/* Fun Input: Agent Name */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase flex items-center justify-between">
                      <span>{isVi ? 'Tên gọi nhân viên Agent của bạn' : 'What would you name your AI Agent?'}</span>
                    </label>
                    <input
                      type="text"
                      name="agentName"
                      value={formData.agentName}
                      onChange={handleChange}
                      placeholder={isVi ? 'Ví dụ: Jarvis, Luna, Friday, Gilfoyle...' : 'E.g. Jarvis, Luna, Friday, Gilfoyle...'}
                      className="w-full bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 focus:border-white/40 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white [html[data-theme='light']_&]:text-slate-900 placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>

                  {/* Custom Select: Agent Vibe */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Tính cách & Vibe giao tiếp ưa thích' : 'Preferred personality vibe of your agent?'}
                    </label>
                    <CustomSelect
                      options={vibeOptions}
                      value={formData.agentVibe}
                      onChange={(val) => handleCustomSelectChange('agentVibe', val)}
                      buttonClassName="px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl min-h-[42px] bg-white/[0.03] border-white/10 hover:border-white/25 flex items-center justify-between"
                    />
                  </div>

                  {/* Optional Textarea: Custom Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700 tracking-wider uppercase">
                      {isVi ? 'Gợi ý bổ sung cho đội ngũ phát triển' : 'Additional message for I2FLabs team'}
                    </label>
                    <textarea
                      name="customNotes"
                      rows={2}
                      value={formData.customNotes}
                      onChange={handleChange}
                      placeholder={isVi
                        ? 'Ý tưởng của bạn về hệ điều hành AI Agent trong tương lai...'
                        : 'Your thoughts on the future of Agentic Operating Systems...'}
                      className="w-full bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 focus:border-white/40 rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white [html[data-theme='light']_&]:text-slate-900 placeholder:text-slate-600 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Error Message if any */}
              {errorMessage && (
                <div className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                  {errorMessage}
                </div>
              )}

            </div>

            {/* ── FOOTER ACTIONS: SLEEK EDITORIAL PILL BUTTONS ── */}
            <div className="px-6 sm:px-8 py-4 sm:py-5 border-t border-white/[0.06] [html[data-theme='light']_&]:border-slate-100 bg-black/20 [html[data-theme='light']_&]:bg-slate-50 flex items-center justify-between gap-4 font-sans">
              <button
                type="button"
                onClick={currentStep > 1 ? handlePrevStep : onClose}
                className="px-4 py-2 rounded-full text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/5 [html[data-theme='light']_&]:hover:bg-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {currentStep > 1 ? (
                  <>
                    <ArrowLeft size={14} />
                    <span>{isVi ? 'Quay lại' : 'Back'}</span>
                  </>
                ) : (
                  <span>{isVi ? 'Hủy' : 'Cancel'}</span>
                )}
              </button>

              {currentStep < 3 ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>{isVi ? 'Tiếp theo' : 'Next Step'}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>{isVi ? 'Đang gửi...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <span>{isVi ? 'Gửi đăng ký trải nghiệm' : 'Submit Survey & Request'}</span>
                  )}
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default TrialModal;
