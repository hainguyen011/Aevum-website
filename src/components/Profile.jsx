import { useState, useEffect } from 'react';
import { 
  User, Mail, Shield, Key, Laptop, Cpu, CheckCircle2, 
  Copy, Check, ArrowLeft, ArrowRight, RefreshCw, Zap, Sparkles, 
  Clock, Calendar, Globe, AlertCircle, LogOut, Terminal,
  ExternalLink, Layers, ShieldCheck, HeartHandshake, Facebook
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import { MembershipBadge } from './ui/MembershipBadge';
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lunaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import unikornLogo from '../../assets/unikorn-logo.png';
import unikornLogoDark from '../../assets/unikorn-logo-dark.png';


export const Profile = ({ 
  activeLang = 'vi', 
  user, 
  userProfile, 
  onNavigate, 
  onOpenTrialModal 
}) => {
  const isVi = activeLang === 'vi';
  const [entitlements, setEntitlements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview | workstations | security

  // Fetch real-time entitlements from Aevum Cloud Backend
  useEffect(() => {
    let isMounted = true;
    const fetchEntitlements = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const data = await MembershipService.getCurrentEntitlements(session.access_token);
          if (isMounted && data) {
            setEntitlements(data);
          }
        }
      } catch (err) {
        console.warn('[Profile] Error loading entitlements:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEntitlements();
    return () => { isMounted = false; };
  }, [user]);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (onNavigate) onNavigate('landing');
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
          {isVi ? 'Yêu cầu Đăng nhập' : 'Authentication Required'}
        </h2>
        <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
          {isVi 
            ? 'Vui lòng đăng nhập tài khoản Aevum để xem và quản lý hồ sơ kỹ thuật, máy trạm và quyền hạn Hạng Member của bạn.' 
            : 'Please sign in to your Aevum account to inspect your engineering profile, connected workstations, and tier entitlements.'}
        </p>
        <button
          onClick={() => onNavigate && onNavigate('landing')}
          className="px-5 py-2.5 rounded-[5px] bg-[#0ea5e9] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#38bdf8] transition-all cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
        </button>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0];
  const initials = displayName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'AE';
  const role = userProfile?.role || 'member';
  const effectiveTier = (userProfile?.membership_tier || entitlements?.tier || (entitlements?.isPro ? 'PRO' : 'COMMUNITY')).toUpperCase();
  const tierSlug = effectiveTier.toLowerCase();
  const isWaitlist = entitlements?.isWaitlist || entitlements?.status === 'beta_waitlist';
  const isTrial = entitlements?.isTrial ?? (tierSlug === 'pro');
  const trialDaysRemaining = entitlements?.trialDaysRemaining ?? 30;


  const mockApiKey = `ae_live_${user.id.replace(/-/g, '').slice(0, 24)}_sec`;
  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : '2026';

  return (
    <div className="profile-page w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-mono text-slate-200">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 mb-6">

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="profile-breadcrumb-btn flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isVi ? 'Trang chủ' : 'Home'}</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {isVi ? 'Hồ sơ người dùng' : 'User Profile'}
          </span>

        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] border border-red-500/30 bg-red-500/[0.05] hover:bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isVi ? 'Đăng xuất' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Identity Card & Navigation (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Identity Bento Card (Top-Left Electron Corner Beam) */}
          <div className="border-beam-card p-6 rounded-[8px] relative overflow-hidden backdrop-blur-sm">


            <div className="flex flex-col items-center text-center space-y-4">
              {/* Avatar Frame */}
              <div className="relative w-20 h-20 rounded-[8px] overflow-hidden flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-white text-xl font-bold font-mono">
                    {initials}
                  </div>
                )}
              </div>

              {/* Name & Badges */}
              <div className="space-y-1.5 w-full">
                <h3 className="text-base font-bold text-white uppercase tracking-wider truncate">
                  {displayName}
                </h3>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>

                <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                  <MembershipBadge 
                    tier={tierSlug} 
                    isTrial={isTrial} 
                    isWaitlist={isWaitlist}
                    trialDaysRemaining={trialDaysRemaining} 
                    size="sm" 
                  />

                  {role === 'admin' && (
                    <span className="admin-badge inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] border border-white/20 text-slate-300">
                      ADMIN
                    </span>
                  )}
                </div>
              </div>

              {/* UID & Metadata Pill */}
              <div className="w-full pt-4 border-t border-white/5 space-y-2 text-left text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>{isVi ? 'Mã UID' : 'User ID'}:</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                    <span>{user.id.slice(0, 8)}...{user.id.slice(-4)}</span>
                    <button
                      onClick={() => copyToClipboard(user.id, 'uid')}
                      className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                      title="Copy UID"
                    >
                      {copiedField === 'uid' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>{isVi ? 'Tham gia' : 'Joined'}:</span>
                  <span className="text-slate-300">{createdAt}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>{isVi ? 'Xác thực qua' : 'Provider'}:</span>
                  <span className="text-slate-300 capitalize">{user.app_metadata?.provider || 'Email/OAuth'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sub-navigation */}
          <div className="profile-card p-1.5 rounded-[6px] bg-white/[0.02] border border-white/10 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono font-bold uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${
                activeTab === 'overview'
                  ? 'profile-tab-active bg-sky-950/40 text-sky-200 border-sky-500/30'
                  : 'profile-tab-inactive text-slate-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04]'
              }`}
            >
              <span>{isVi ? 'Tổng quan Quyền hạn' : 'Entitlements Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('workstations')}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono font-bold uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${
                activeTab === 'workstations'
                  ? 'profile-tab-active bg-sky-950/40 text-sky-200 border-sky-500/30'
                  : 'profile-tab-inactive text-slate-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04]'
              }`}
            >
              <span>{isVi ? 'Máy trạm (Workstations)' : 'Linked Workstations'}</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono font-bold uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${
                activeTab === 'security'
                  ? 'profile-tab-active bg-sky-950/40 text-sky-200 border-sky-500/30'
                  : 'profile-tab-inactive text-slate-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04]'
              }`}
            >
              <span>{isVi ? 'External Brain & Token' : 'External Brain & Token'}</span>
            </button>
          </div>



          {/* AI Companion An Note */}
          <div className="profile-companion-box p-4 rounded-[8px] bg-sky-950/30 border border-sky-500/20 text-xs space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <img src={anAvatar} alt="An" className="w-7 h-7 rounded-full border border-sky-400/30 object-cover" />
              <div>
                <span className="font-bold text-sky-200 text-xs">An (Core Companion)</span>
                <span className="block text-[9px] text-sky-400/60">ENG-AN-7B9F1D</span>
              </div>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
              {isVi 
                ? 'Em luôn sẵn sàng đồng hành cùng Master trên mọi máy trạm. Living Memory Graph sẽ tự động đồng bộ ký ức dài hạn mỗi khi Master hoàn thành nhiệm vụ!'
                : 'I am ready to accompany you across all workstations. The Living Memory Graph automatically synchronizes long-term memory upon every sprint task!'}
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Tab Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* TAB 1: OVERVIEW & MEMBERSHIP ENTITLEMENTS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Membership Status Banner */}
              <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      {isVi ? 'GÓI THÀNH VIÊN HIỆN TẠI' : 'CURRENT MEMBERSHIP PLAN'}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      {tierSlug === 'pro' 
                        ? (isWaitlist ? 'AEVUM PRO (BETA WAITLIST)' : (isTrial ? 'AEVUM PRO BETA' : 'AEVUM PRO')) 
                        : tierSlug === 'enterprise' 
                        ? 'AEVUM ENTERPRISE' 
                        : 'AEVUM COMMUNITY'}
                    </h2>
                  </div>


                  {tierSlug !== 'pro' && tierSlug !== 'enterprise' ? (
                    <button
                      onClick={onOpenTrialModal}
                      className="px-4 py-2 rounded-[5px] bg-[#0ea5e9] hover:bg-[#38bdf8] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 whitespace-nowrap shrink-0 self-start sm:self-center"
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{isVi ? 'Ghi Danh 1 Tháng Pro' : 'Join 1-Month Pro Waitlist'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate && onNavigate('pricing')}
                      className="profile-action-link group flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-400/90 hover:text-sky-300 transition-all cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center bg-transparent border-none p-1 hover:underline"
                    >
                      <span className="whitespace-nowrap">{isVi ? 'Xem Bảng Giá & Chi Tiết' : 'Manage Subscription'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>


                {/* Sprint Cycle Progress (Docked edge-to-edge footer) */}
                {(isTrial || isWaitlist) && (
                  <div className="profile-progress-box -mx-6 -mb-6 mt-6 px-6 py-6 bg-white/[0.02] border-t border-white/10 space-y-3.5 rounded-t-[8px] rounded-b-[8px]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">
                        {isWaitlist 
                          ? (isVi ? 'Trạng thái bảo lưu ngày trải nghiệm:' : 'Reserved Pro Trial Status:') 
                          : (isVi ? 'Thời hạn chu kỳ Trải nghiệm Pro Beta:' : 'Pro Beta Trial Validity:')}
                      </span>
                      <span className="text-white font-semibold">
                        {isWaitlist 
                          ? (isVi ? '30 Ngày (Đã bảo lưu - Chờ kích hoạt)' : '30 Days (Reserved - On Standby)') 
                          : `${trialDaysRemaining} ${trialDaysRemaining === 1 ? 'Day left' : 'Days left'} (1-Month Cycle)`}
                      </span>
                    </div>
                    <div className="profile-progress-track w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 rounded-full transition-all duration-500"
                        style={{ width: isWaitlist ? '100%' : `${Math.min(100, Math.max(5, (trialDaysRemaining / 30) * 100))}%` }}
                      />
                    </div>
                    {isWaitlist && (
                      <div className="space-y-2 pt-0.5">
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {isVi 
                            ? '💡 Lưu ý: Thời hạn 30 ngày (1 tháng) Pro Beta sẽ tự động kích hoạt đếm ngược khi bạn tải Aevum OS và liên kết máy trạm đầu tiên.' 
                            : '💡 Note: Your 1-month (30-day) Pro Beta trial will automatically start counting down once you download Aevum OS and link your first device.'}
                        </p>

                        {/* Direct Team Contacts */}
                        <div className="flex flex-wrap items-center gap-2.5 pt-2">
                          <span className="text-[10px] font-mono text-slate-400">
                            {isVi ? 'Liên hệ đội ngũ Aevum:' : 'Contact Aevum team:'}
                          </span>
                          <div className="flex items-center gap-2">
                            <a 
                              href="https://facebook.com" 
                              target="_blank" 
                              rel="noreferrer"
                              className="profile-contact-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-[10px] font-mono"
                              title="Facebook Community"
                            >
                              <Facebook size={12} className="text-white" />
                              <span>Facebook</span>
                            </a>

                            <a 
                              href="https://unikorn.vn/p/aevum" 
                              target="_blank" 
                              rel="noreferrer"
                              className="profile-contact-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-[10px] font-mono"
                              title="Unikorn Agency"
                            >
                              <img src={unikornLogo} alt="Unikorn" className="w-3 h-3 object-contain unikorn-header-light" />
                              <img src={unikornLogoDark} alt="Unikorn" className="w-3 h-3 object-contain unikorn-header-dark" />
                              <span>Unikorn</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>




              {/* Unlocked Capabilities Matrix */}
              <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isVi ? 'Đặc quyền Kiến trúc & Tính năng Kỹ thuật' : 'Architectural & Engineering Capabilities'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                  
                  {/* Perk 1: Squad Mode */}
                  <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Multi-Agent Squad Mode
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {isVi 
                        ? 'Kích hoạt 4 Persona chuyên sâu: An (Companion), Vidus (Architect), Zenith (Tester), Luna (Security).'
                        : 'Access to 4 specialized Personas: An (Companion), Vidus (Architect), Zenith (Tester), Luna (Security).'}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <img src={anAvatar} alt="An" className="w-5 h-5 rounded-full border border-sky-400/40" title="An" />
                      <img src={vidusAvatar} alt="Vidus" className="w-5 h-5 rounded-full border border-purple-400/40" title="Vidus" />
                      <img src={zenithAvatar} alt="Zenith" className="w-5 h-5 rounded-full border border-sky-400/40" title="Zenith" />
                      <img src={lunaAvatar} alt="Luna" className="w-5 h-5 rounded-full border border-emerald-400/40" title="Luna" />
                    </div>
                  </div>

                  {/* Perk 2: Living Memory Cloud */}
                  <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Living Memory Graph
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        SYNCED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {isVi 
                        ? 'Ký ức dài hạn được mã hóa AES-256 lưu cục bộ và đồng bộ tự động qua Aevum Cloud Vault.'
                        : 'Long-term engineering memory encrypted with AES-256 and synced seamlessly with Aevum Cloud Vault.'}
                    </p>
                  </div>

                  {/* Perk 3: Deep Research Engine */}
                  <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Deep Research Engine
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        READY
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {isVi 
                        ? 'Tự động trích xuất Whitepaper, phân tích Root-cause và lập kế hoạch Plan-First trước khi viết code.'
                        : 'Autonomous Whitepaper synthesis, Root-cause audits, and Plan-First pipeline enforcement.'}
                    </p>
                  </div>

                  {/* Perk 4: Workstation Limits */}
                  <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Linked Workstations
                      </span>
                      <span className="text-[10px] text-sky-300 font-bold">
                        {tierSlug === 'pro' ? '1 / 5 MACHINES' : '1 / 1 MACHINE'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {isVi 
                        ? 'Liên kết tối đa 5 máy trạm Ed25519 cho phép chuyển đổi mượt mà giữa máy bàn, laptop và cloud VM.'
                        : 'Link up to 5 Ed25519 devices for effortless context roaming between desktop, laptop, and cloud VMs.'}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LINKED WORKSTATIONS */}
          {activeTab === 'workstations' && (
            <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {isVi ? 'DANH SÁCH MÁY TRẠM ĐÃ KẾT NỐI' : 'LINKED WORKSTATIONS'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isVi ? 'Quản lý các thiết bị máy tính chạy Aevum OS Daemon cục bộ' : 'Manage devices running local Aevum OS Daemons'}
                  </p>
                </div>
                <span className="text-xs text-sky-300 font-bold px-2.5 py-1 rounded bg-sky-950/40 border border-sky-500/30">
                  {isVi ? '1/5 ĐANG HOẠT ĐỘNG' : '1/5 ACTIVE'}
                </span>
              </div>

              {/* Workstation Row 1 (Current Active Machine) */}
              <div className="profile-perk-card p-4 rounded-[6px] bg-white/[0.03] border border-sky-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[5px] bg-sky-950/40 border border-sky-500/30 flex items-center justify-center text-sky-300">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">DevWorkstation-Primary</span>
                        <span className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold uppercase">
                          {isVi ? 'MÁY HIỆN TẠI' : 'THIS DEVICE'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Windows 11 x64 • Node v20 • SSE Daemon Port: 3344</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>Machine Fingerprint: <span className="text-slate-300 font-bold">ed25519_9f8a...3e1c</span></span>
                  <span className="text-slate-500">{isVi ? 'Đồng bộ lúc: Vừa xong' : 'Last sync: Just now'}</span>
                </div>
              </div>

              {/* Instructions on adding machines */}
              <div className="profile-perk-card p-4 rounded-[6px] bg-white/[0.01] border border-white/5 space-y-2 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span>{isVi ? 'Cách liên kết máy trạm mới:' : 'How to link a new workstation:'}</span>
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {isVi 
                    ? 'Chạy lệnh sau trên Terminal máy trạm mới để tự động kết nối và đồng bộ Living Memory Graph:'
                    : 'Execute the following command in the terminal of your new machine to pair and synchronize:'}
                </p>
                <div className="profile-code-box p-2.5 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-sky-300 flex items-center justify-between">
                  <code>aevum-os pair --token {mockApiKey.slice(0, 16)}...</code>
                  <button
                    onClick={() => copyToClipboard(`aevum-os pair --token ${mockApiKey}`, 'pair-cmd')}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    {copiedField === 'pair-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXTERNAL BRAIN & API TOKEN */}
          {activeTab === 'security' && (
            <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {isVi ? 'EXTERNAL BRAIN INTEGRATION & TOKEN' : 'EXTERNAL BRAIN INTEGRATION & TOKEN'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isVi ? 'Giao thức MCP và mã xác thực kết nối IDE' : 'MCP protocol credentials and IDE connection tokens'}
                </p>
              </div>

              {/* Token Display */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>PiperNet Agent Access Token</span>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[10px] text-sky-400 hover:underline cursor-pointer"
                  >
                    {showApiKey ? (isVi ? 'Ẩn token' : 'Hide token') : (isVi ? 'Hiện token' : 'Show token')}
                  </button>
                </label>

                <div className="flex items-center gap-2">
                  <div className="profile-code-box flex-1 p-2.5 rounded bg-black/40 border border-white/10 font-mono text-xs text-slate-200 truncate">
                    {showApiKey ? mockApiKey : `${mockApiKey.slice(0, 12)}••••••••••••••••••••`}
                  </div>
                  <button
                    onClick={() => copyToClipboard(mockApiKey, 'api-token')}
                    className="px-3 py-2.5 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
                    title="Copy Token"
                  >
                    {copiedField === 'api-token' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  {isVi 
                    ? 'Token này được dùng để xác thực các công cụ (Cursor, VS Code, Claude Desktop, Antigravity IDE) với Aevum External Brain.' 
                    : 'This token authorizes external clients (Cursor, VS Code, Claude Desktop, Antigravity IDE) to interact with your Aevum External Brain.'}
                </p>
              </div>

              {/* MCP Configuration Snippet */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 block">mcpServers Config (mcp.json)</span>
                <div className="profile-code-box p-3 rounded bg-black/50 border border-white/10 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  <pre>{`{
  "mcpServers": {
    "aevum-os": {
      "command": "aevum",
      "args": ["daemon", "--transport", "sse", "--port", "3344"],
      "env": {
        "AEVUM_TOKEN": "${showApiKey ? mockApiKey : 'ae_live_YOUR_TOKEN_HERE'}"
      }
    }
  }
}`}</pre>
                </div>
              </div>
            </div>
          )}


        </div>

      </div>

    </div>
  );
};

export default Profile;
