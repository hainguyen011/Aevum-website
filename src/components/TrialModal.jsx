import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Zap, CheckCircle2, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { CustomSelect } from './ui/CustomSelect';
import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import anLoverSticker from '../../assets/stickers/An_Collection/An_Lover.webp';

/**
 * Multi-Step Early Access & Creative Survey Modal for Aevum OS
 * Step 1: Basic Contact Information
 * Step 2: Engineering Context & Product Roadmap Survey
 * Step 3: Creative & Fun Agent Customization Survey
 */
export const TrialModal = ({ isOpen, onClose, activeLang, user }) => {
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
  const [activationResult, setActivationResult] = useState(null);
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
      agentName: formData.agentName || 'N/A',
      agentVibe: formData.agentVibe,
      customNotes: formData.customNotes || 'N/A'
    };

    // 1. Backup to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('aevum_trial_submissions') || '[]');
      existing.push(payload);
      localStorage.setItem('aevum_trial_submissions', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage backup error:', err);
    }

    // 2. Kích hoạt Pro Beta Trial trực tiếp lên backend Aevum-cloud (nếu có user session)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const cloudResult = await MembershipService.activateProTrial(payload, session.access_token);
        setActivationResult(cloudResult);
      }
    } catch (cloudErr) {
      console.warn('[Cloud Activation] Không thể kích hoạt qua Cloud API (sẽ gửi qua fallback serverless):', cloudErr);
    }

    // 3. Submit to Serverless API Endpoint (syncs to Sheet & sends Welcome Email)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('[Email Dispatch] Serverless email endpoint returned non-OK status');
      }
    } catch (err) {
      console.warn('[Email Dispatch Error]:', err);
    }

    // Authentic TUI feedback completion
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };


  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      website: '',
      ide: 'Cursor IDE',
      role: 'Solo Developer',
      primaryPainPoint: 'Chống mất trí nhớ AI (Context Amnesia)',
      desiredFeature: 'Multi-Agent Squad Orchestration',
      agentName: '',
      agentVibe: 'Chuyên nghiệp, nghiêm túc & chính xác',
      customNotes: ''
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    onClose();
  };

  // Dropdown Option Definitions
  const ideOptions = [
    { value: 'Cursor IDE', label: 'Cursor IDE' },
    { value: 'VS Code', label: 'VS Code' },
    { value: 'Windsurf', label: 'Windsurf' },
    { value: 'Claude Desktop / Antigravity IDE', label: 'Claude Desktop / Antigravity IDE' },
    { value: 'Terminal CLI / Neovim', label: 'Terminal CLI / Neovim' },
    { value: 'Other', label: activeLang === 'vi' ? 'Khác / Other' : 'Other' }
  ];

  const roleOptions = [
    { value: 'Solo Developer', label: 'Solo Developer / Freelancer' },
    { value: 'Tech Lead / Core Dev', label: 'Tech Lead / Core Engineer' },
    { value: 'AI Researcher / Engineer', label: 'AI Researcher / Engineer' },
    { value: 'Founder / CTO', label: 'Founder / CTO / Product Owner' }
  ];

  const painPointOptions = [
    { value: 'Chống mất trí nhớ AI (Context Amnesia)', label: activeLang === 'vi' ? 'Chống mất trí nhớ AI (Context Amnesia)' : 'Fixing AI Context Amnesia' },
    { value: 'Thiếu quy trình Lập kế hoạch (Plan-First)', label: activeLang === 'vi' ? 'Thiếu quy trình Lập kế hoạch trước khi viết code (Plan-First)' : 'Lack of Plan-First Execution Workflow' },
    { value: 'Không phối hợp được Biệt đội Multi-Agent', label: activeLang === 'vi' ? 'Không phối hợp được Biệt đội Multi-Agent chuyên biệt' : 'Multi-Agent Squad Coordination Bottleneck' },
    { value: 'Rò rỉ dữ liệu / Thiếu Memory Vault cục bộ', label: activeLang === 'vi' ? 'Rò rỉ dữ liệu / Thiếu Memory Vault mã hóa cục bộ' : 'Data Privacy & Decoupled Local Vault' }
  ];

  const featureOptions = [
    { value: 'Multi-Agent Squad Orchestration', label: activeLang === 'vi' ? 'Multi-Agent Squad Orchestration (Biệt đội Agent tự hành)' : 'Multi-Agent Squad Orchestration' },
    { value: 'PiperNet P2P Knowledge Sharing', label: activeLang === 'vi' ? 'PiperNet P2P Mesh (Chia sẻ giải pháp thiết kế an toàn)' : 'PiperNet P2P Knowledge Mesh' },
    { value: 'Offline Local LLM Vault Sync', label: activeLang === 'vi' ? 'Offline Local LLM Sync (Chạy 100% không internet)' : 'Offline Local LLM Vault Sync' },
    { value: 'Automated Code Audit & Evidence Harvesting', label: activeLang === 'vi' ? 'Automated Code Audit & Evidence Harvesting (Tự động audit code)' : 'Automated Code Audit & Evidence Harvesting' }
  ];

  const vibeOptions = [
    { value: 'Chuyên nghiệp, nghiêm túc & chính xác', label: activeLang === 'vi' ? 'Chuyên nghiệp, nghiêm túc & chuẩn mực kỹ thuật 100%' : '100% Professional, Serious & Technical' },
    { value: 'Thân thiện, hài hước & biết khích lệ', label: activeLang === 'vi' ? 'Thân thiện, hài hước & luôn khích lệ developer' : 'Friendly, Humorous & Encouraging' },
    { value: 'Thẳng thắn, châm biếm thiên tài kiểu Gilfoyle', label: activeLang === 'vi' ? 'Thẳng thắn, châm biếm thiên tài (Vibe Gilfoyle - Pied Piper)' : 'Sarcastic Genius (Gilfoyle Vibe - Pied Piper)' },
    { value: 'Triết lý, bí ẩn như nhân vật Sci-Fi', label: activeLang === 'vi' ? 'Triết lý, bí ẩn & sâu sắc như nhân vật Sci-Fi Cyberpunk' : 'Philosophical & Cyberpunk Sci-Fi Sidekick' }
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:px-6 font-mono">

      {/* Relative Wrapper to anchor Outside Attached Close Button */}
      <div className="relative w-full max-w-2xl h-screen sm:h-[700px] max-h-[100vh] sm:max-h-[92vh] flex flex-col">

        {/* Flush Square Close Button Attached Below Stepper Bar on the Right */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute right-0 top-[81px] sm:left-full sm:right-auto z-50 h-[53px] w-[53px] border-b border-l sm:border-l-0 sm:border-t sm:border-b sm:border-r border-white/10 bg-[#0B0B11] text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 rounded-none transition-all cursor-pointer flex items-center justify-center font-mono"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Outer Modal Container - Centered Box, Sharp Corners, Flat Design */}
        <div
          className="w-full h-full bg-[#0B0B11] border-x border-white/10 rounded-none flex flex-col justify-between overflow-hidden relative text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Mini Top Banner - White BG, Black Text, Centered */}
          <div className="w-full bg-white text-black py-1.5 text-center text-[11px] font-bold font-mono uppercase tracking-widest relative z-10 select-none">
            Coming Soon
          </div>

          {/* Stepper Progress Bar (Flat TUI Style) */}
          {!isSubmitted && (
            <div className="w-full border-t border-b border-white/10 bg-[#0B0B11] px-6 sm:px-8 h-[53px] flex items-center relative z-10">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 w-full pr-12 sm:pr-0">

                {/* Step 1 Indicator */}
                <div className={currentStep === 1 ? 'text-cyan-400 font-bold' : currentStep > 1 ? 'text-white font-medium' : 'text-slate-600'}>
                  <span>{activeLang === 'vi' ? 'THÔNG TIN' : 'CONTACT'}</span>
                </div>

                <div className="flex-1 h-[1px] bg-white/10 mx-3 sm:mx-5"></div>

                {/* Step 2 Indicator */}
                <div className={currentStep === 2 ? 'text-cyan-400 font-bold' : currentStep > 2 ? 'text-white font-medium' : 'text-slate-600'}>
                  <span>{activeLang === 'vi' ? 'KHẢO SÁT OS' : 'ROADMAP'}</span>
                </div>

                <div className="flex-1 h-[1px] bg-white/10 mx-3 sm:mx-5"></div>

                {/* Step 3 Indicator */}
                <div className={currentStep === 3 ? 'text-cyan-400 font-bold' : 'text-slate-600'}>
                  <span>{activeLang === 'vi' ? 'SÁNG TẠO' : 'FUN SURVEY'}</span>
                </div>

              </div>
            </div>
          )}

          {isSubmitted ? (
            /* Success Confirmation Screen with An's Sticker & Pro Beta Activation Status */
            <div className="p-6 sm:p-10 space-y-4 text-center py-4 font-mono relative z-10 flex-1 overflow-y-auto flex flex-col justify-center">
              {/* An's Lover Sticker */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src={anLoverSticker}
                  alt="An Lover Sticker"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                />
              </div>

              {/* Thank you title & message */}
              <div className="space-y-2 max-w-md mx-auto py-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeLang === 'vi' ? 'BẢO LƯU 1 THÁNG (30 NGÀY) PRO BETA • EARLY ACCESS WAITLIST' : '1-MONTH (30-DAY) PRO RESERVED • BETA WAITLIST'}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight pt-1">
                  {activeLang === 'vi' ? 'GHI DANH EARLY ACCESS THÀNH CÔNG!' : 'EARLY ACCESS WAITLIST CONFIRMED!'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLang === 'vi'
                    ? `Tài khoản (${formData.email || user?.email || 'của bạn'}) đã được ghi danh thành công vào hàng đợi Beta Tester. Gói 1 tháng (30 ngày) trải nghiệm Aevum Pro đã được bảo lưu nguyên vẹn và sẽ tự động bắt đầu đếm khi bạn tải và kích hoạt máy trạm đầu tiên.`
                    : `Your account (${formData.email || user?.email || 'your account'}) is now on the Early Access Waitlist. Your 1-month (30-day) Pro Beta trial is fully reserved and will activate upon linking your first workstation.`}
                </p>
              </div>

              <div className="max-w-md mx-auto w-full pt-3">
                <button
                  onClick={handleReset}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded border border-[#0ea5e9] bg-[#0ea5e9] text-black hover:bg-[#0ea5e9]/90 transition-all cursor-pointer font-mono flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>{activeLang === 'vi' ? 'Xác Nhận & Hoàn Tất' : 'Confirm & Complete'}</span>
                </button>
              </div>

            </div>

          ) : (
            <form onSubmit={currentStep === 3 ? handleSubmit : handleNextStep} className="flex flex-col flex-1 min-h-0 relative z-10 font-mono">

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

              {/* Scrollable Form Body Content - Vertically Centered with flex flex-col justify-center */}
              <div className="p-6 sm:p-10 pb-4 space-y-6 text-left flex-1 overflow-y-auto flex flex-col justify-center">

                {/* STEP 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {activeLang === 'vi' ? 'Thông tin đăng ký trải nghiệm Early Access' : 'Basic Contact Details'}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {activeLang === 'vi'
                          ? 'Cung cấp tên và Email để nhận mã nạp Daemon bộ não ngoại vi Aevum OS.'
                          : 'Provide your name and email to receive your Aevum OS Daemon access token.'}
                      </p>
                    </div>

                    {/* Input: Name */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>{activeLang === 'vi' ? 'Họ và tên' : 'Full Name'} *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={activeLang === 'vi' ? 'Nguyễn Văn A' : 'Alex Mercer'}
                        className="w-full bg-[#0B0B11] border border-white/15 rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Input: Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>{activeLang === 'vi' ? 'Email liên hệ' : 'Work Email'} *</span>
                        {user && (
                          <span className="text-[10px] text-cyan-400 font-mono font-normal">
                            {activeLang === 'vi' ? 'Đã liên kết tài khoản' : 'Linked account'}
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
                        className={`w-full rounded-md px-3.5 py-2.5 text-xs focus:outline-none transition-colors ${user
                            ? 'bg-white/[0.02] border-white/10 text-slate-400 cursor-not-allowed'
                            : 'bg-[#0B0B11] border-white/15 text-white focus:border-cyan-400'
                          }`}
                      />
                    </div>

                    {/* Custom Select: IDE */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Trình soạn thảo / IDE chính đang sử dụng' : 'Primary IDE / Workspace'} *
                      </label>
                      <CustomSelect
                        options={ideOptions}
                        value={formData.ide}
                        onChange={(val) => handleCustomSelectChange('ide', val)}
                        buttonClassName="px-3.5 py-2.5 text-xs rounded-md min-h-[40px] flex items-center justify-between"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Product & Roadmap Survey */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {activeLang === 'vi' ? 'Nhu cầu Kỹ thuật & Định hướng Phát triển' : 'Engineering Context & Roadmap Survey'}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {activeLang === 'vi'
                          ? 'Giúp I2FLabs tối ưu hóa kiến trúc Aevum OS theo đúng mong muốn của bạn.'
                          : 'Help I2FLabs shape the roadmap for next-generation Agentic OS features.'}
                      </p>
                    </div>

                    {/* Custom Select: Role */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Quy mô đội ngũ / Vai trò kỹ thuật' : 'Engineering Role'} *
                      </label>
                      <CustomSelect
                        options={roleOptions}
                        value={formData.role}
                        onChange={(val) => handleCustomSelectChange('role', val)}
                        buttonClassName="px-3.5 py-2.5 text-xs rounded-md min-h-[40px] flex items-center justify-between"
                      />
                    </div>

                    {/* Custom Select: Primary Pain Point */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Trở ngại lớn nhất bạn gặp phải với AI Agent hiện tại?' : 'Biggest AI Agent bottleneck?'} *
                      </label>
                      <CustomSelect
                        options={painPointOptions}
                        value={formData.primaryPainPoint}
                        onChange={(val) => handleCustomSelectChange('primaryPainPoint', val)}
                        buttonClassName="px-3.5 py-2.5 text-xs rounded-md min-h-[40px] flex items-center justify-between"
                      />
                    </div>

                    {/* Custom Select: Desired Feature */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Tính năng bạn mong đợi Aevum OS ra mắt tiếp theo?' : 'Most desired future feature?'} *
                      </label>
                      <CustomSelect
                        options={featureOptions}
                        value={formData.desiredFeature}
                        onChange={(val) => handleCustomSelectChange('desiredFeature', val)}
                        buttonClassName="px-3.5 py-2.5 text-xs rounded-md min-h-[40px] flex items-center justify-between"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Fun & Creative Agent Customization Survey */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {activeLang === 'vi' ? 'Thiết kế Nhân viên Agent Lý tưởng' : 'Customize Your Ideal Agent Companion'}
                      </h2>
                      <p className="text-xs text-slate-400">
                        {activeLang === 'vi'
                          ? 'Nếu bạn sở hữu một trợ lý Agent tự hành 24/7 trong Aevum OS, bạn sẽ cá nhân hóa nó như thế nào?'
                          : 'If you had an autonomous 24/7 agent inside Aevum OS, how would you name and design its vibe?'}
                      </p>
                    </div>

                    {/* Fun Input: Agent Name */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>{activeLang === 'vi' ? 'Bạn sẽ đặt tên cho nhân viên Agent của mình là gì?' : 'What would you name your AI Agent worker?'}</span>
                      </label>
                      <input
                        type="text"
                        name="agentName"
                        value={formData.agentName}
                        onChange={handleChange}
                        placeholder={activeLang === 'vi' ? 'Ví dụ: Jarvis, Luna, Friday, Gilfoyle, Goliath...' : 'E.g. Jarvis, Luna, Friday, Gilfoyle...'}
                        className="w-full bg-[#0B0B11] border border-white/15 rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Custom Select: Agent Vibe */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Tính cách & Vibe giao tiếp bạn thích nhất ở Agent?' : 'Preferred personality vibe of your agent?'}
                      </label>
                      <CustomSelect
                        options={vibeOptions}
                        value={formData.agentVibe}
                        onChange={(val) => handleCustomSelectChange('agentVibe', val)}
                        buttonClassName="px-3.5 py-2.5 text-xs rounded-md min-h-[40px] flex items-center justify-between"
                      />
                    </div>

                    {/* Optional Textarea: Custom Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        {activeLang === 'vi' ? 'Gửi lời nhắn / Gợi ý bổ sung cho đội ngũ I2FLabs Việt Nam' : 'Additional message or ideas for I2FLabs team'}
                      </label>
                      <textarea
                        name="customNotes"
                        rows={2}
                        value={formData.customNotes}
                        onChange={handleChange}
                        placeholder={activeLang === 'vi'
                          ? 'Ý tưởng của bạn về hệ điều hành AI Agent trong tương lai...'
                          : 'Your thoughts on the future of Agentic Operating Systems...'}
                        className="w-full bg-[#0B0B11] border border-white/15 rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Footer Note */}
                <div className="text-[10px] text-slate-500 text-center pt-2 font-mono">
                  [ I2FLabs Viet Nam - Viet Nam Innovation To Future ]
                </div>

              </div>

              {/* Full Width Bottom Action Bar - FLUSH to edges, NO padding at bottom */}
              <div className="w-full bg-[#0B0B11] border border-[#0ea5e9] relative z-10 font-mono">
                <div className="flex items-stretch w-full rounded-none overflow-hidden">
                  <button
                    type="button"
                    onClick={currentStep > 1 ? handlePrevStep : onClose}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 text-xs uppercase rounded-none border-r border-white/20 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {currentStep > 1 ? (
                      <>
                        <ArrowLeft className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                        <span>{activeLang === 'vi' ? 'Quay lại' : 'Back'}</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4.5 h-4.5 text-white stroke-[2.5]" />
                        <span>{activeLang === 'vi' ? 'Hủy' : 'Cancel'}</span>
                      </>
                    )}
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="submit"
                      className="flex-1 w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-black font-bold py-4 text-xs sm:text-sm uppercase tracking-wider rounded-none transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{activeLang === 'vi' ? 'Tiếp theo' : 'Next Step'}</span>
                      <ArrowRight className="w-4.5 h-4.5 text-black stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-black font-bold py-4 text-xs sm:text-sm uppercase tracking-wider rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                          <span className="text-black">{activeLang === 'vi' ? 'Đang gửi...' : 'Submitting...'}</span>
                        </>
                      ) : (
                        <span className="text-black font-bold">{activeLang === 'vi' ? 'Gửi đăng ký trải nghiệm' : 'Submit Survey & Access Request'}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrialModal;
