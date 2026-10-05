import { useState, useEffect } from 'react';
import {
  User, Mail, Shield, Key, Laptop, Cpu, CheckCircle2,
  Copy, Check, ArrowLeft, ArrowRight, RefreshCw, Zap, Sparkles,
  Clock, Calendar, Globe, AlertCircle, LogOut, Terminal,
  ExternalLink, Layers, ShieldCheck, HeartHandshake, Facebook,
  CreditCard, Receipt, Landmark
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import { MembershipBadge } from './ui/MembershipBadge';
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lunaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import unikornLogo from '../../assets/unikorn-logo.webp';
import unikornLogoDark from '../../assets/unikorn-logo-dark.webp';


export const Profile = ({
  activeLang = 'vi',
  user,
  userProfile,
  onNavigate,
  onOpenTrialModal,
  onOpenPaymentModal
}) => {
  const isVi = activeLang === 'vi';
  const [entitlements, setEntitlements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview | workstations | security | billing
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [cancellingRenewal, setCancellingRenewal] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

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

  // Fetch user invoices when switching to billing tab
  useEffect(() => {
    if (activeTab === 'billing') {
      const fetchInvoices = async () => {
        setInvoicesLoading(true);
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            const list = await MembershipService.getMyInvoices(session.access_token);
            setInvoices(list);
          }
        } catch (err) {
          console.warn('[Profile] Error loading invoices:', err);
        } finally {
          setInvoicesLoading(false);
        }
      };
      fetchInvoices();
    }
  }, [activeTab]);

  const handleCancelRenewal = async () => {
    if (!window.confirm(isVi ? 'Bạn có chắc chắn muốn hủy tự động gia hạn gói cước?' : 'Are you sure you want to cancel auto-renewal?')) return;
    setCancellingRenewal(true);
    setCancelMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await MembershipService.cancelRenewal(session.access_token);
        setCancelMessage(isVi ? 'Đã hủy tự động gia hạn thành công. Bạn vẫn giữ đặc quyền Pro cho tới hết chu kỳ.' : 'Auto-renewal cancelled successfully. Your Pro access remains active until the end of this billing cycle.');
      }
    } catch (err) {
      setCancelMessage(err.message || 'Lỗi hủy tự động gia hạn');
    } finally {
      setCancellingRenewal(false);
    }
  };


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
  const isTrial = entitlements ? Boolean(entitlements.isTrial) : (tierSlug === 'pro' && !entitlements);
  const trialDaysRemaining = entitlements?.trialDaysRemaining ?? 30;

  // Calculate Next Billing / Renewal Cycle information
  const expiryIso = entitlements?.expiresAt || entitlements?.currentPeriodEnd || userProfile?.membership_expiry;
  const startIso = entitlements?.currentPeriodStart || user.created_at;

  let safeDaysRemaining = entitlements?.daysRemaining;
  let formattedExpiryDate = null;
  let formattedStartDate = null;

  if (expiryIso) {
    const expiryDate = new Date(expiryIso);
    formattedExpiryDate = expiryDate.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: isVi ? 'numeric' : 'short',
      day: 'numeric'
    });
    if (safeDaysRemaining === undefined || safeDaysRemaining === null) {
      const diff = expiryDate.getTime() - Date.now();
      safeDaysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
  } else if (tierSlug === 'pro' && !isWaitlist) {
    // If user is Pro but has no explicit expiryIso stored, compute monthly anniversary from creation or now
    const baseDate = user.created_at ? new Date(user.created_at) : new Date();
    const nextDate = new Date(baseDate);
    while (nextDate.getTime() <= Date.now()) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
    formattedExpiryDate = nextDate.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: isVi ? 'numeric' : 'short',
      day: 'numeric'
    });
    const diff = nextDate.getTime() - Date.now();
    safeDaysRemaining = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  if (startIso) {
    formattedStartDate = new Date(startIso).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: isVi ? 'numeric' : 'short',
      day: 'numeric'
    });
  }

  const isAutoRenew = !entitlements?.cancelAtPeriodEnd;

  // Compute billing cycle percentage for progress bar (remaining / 30 days)
  let cyclePercentRemaining = 100;
  if (safeDaysRemaining !== undefined && safeDaysRemaining !== null) {
    cyclePercentRemaining = Math.max(5, Math.min(100, Math.round((safeDaysRemaining / 30) * 100)));
  }

  const mockApiKey = `ae_live_${user.id.replace(/-/g, '').slice(0, 24)}_sec`;
  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  }) : '2026';

  return (
    <div className="profile-page relative min-h-screen w-full font-mono text-zinc-300 select-text overflow-x-hidden">

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isVi ? 'Trang chủ' : 'Home'}</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isVi ? 'Hồ sơ người dùng' : 'User Profile'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-zinc-400 hover:text-white text-xs font-mono font-medium uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isVi ? 'Đăng xuất' : 'Sign Out'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Identity Card & Navigation (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Identity Bento Card */}
            <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar Frame */}
                <div className="relative w-20 h-20 rounded-[8px] overflow-hidden flex items-center justify-center shrink-0 border border-white/15 shadow-lg bg-zinc-900">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white text-xl font-bold font-mono">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name & Badges */}
                <div className="space-y-1.5 w-full">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider truncate">
                    {displayName}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">{user.email}</p>

                  {/* Badges: Transparent, no background, text only */}
                  <div className="flex items-center justify-center gap-2 pt-1 flex-wrap font-mono select-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      {isWaitlist ? 'AEVUM PRO (BETA WAITLIST)' : (isTrial ? 'AEVUM PRO BETA' : 'AEVUM PRO')}
                    </span>

                    {role === 'admin' && (
                      <>
                        <span className="text-zinc-600 text-xs">•</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                          ADMIN
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* UID & Metadata Pill */}
                <div className="w-full pt-4 border-t border-white/5 space-y-2 text-left text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-zinc-500">{isVi ? 'Mã UID' : 'User ID'}:</span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-300">
                      <span>{user.id.slice(0, 8)}...{user.id.slice(-4)}</span>
                      <button
                        onClick={() => copyToClipboard(user.id, 'uid')}
                        className="text-zinc-400 hover:text-white transition-colors p-1"
                        title="Copy UID"
                      >
                        {copiedField === 'uid' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-zinc-500">{isVi ? 'Tham gia' : 'Joined'}:</span>
                    <span className="text-zinc-300">{createdAt}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-zinc-500">{isVi ? 'Xác thực qua' : 'Provider'}:</span>
                    <span className="text-zinc-300 capitalize">{user.app_metadata?.provider || 'Email/OAuth'}</span>
                  </div>

                  {tierSlug === 'pro' && formattedExpiryDate && !isWaitlist && (
                    <div className="flex items-center justify-between text-zinc-400 pt-2 border-t border-white/5">
                      <span className="text-zinc-500">{isVi ? 'Chu kỳ tới' : 'Next Billing'}:</span>
                      <div className="text-right">
                        <span className="text-white font-bold block">{formattedExpiryDate}</span>
                        <span className="text-[10px] text-zinc-500">({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining}d left`})</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Sub-navigation */}
            <div className="p-1.5 rounded-[6px] bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 space-y-1 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${activeTab === 'overview'
                  ? 'bg-white/[0.08] text-white border-white/20 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04] font-medium'
                  }`}
              >
                <span>{isVi ? 'Tổng quan Quyền hạn' : 'Entitlements Overview'}</span>
              </button>

              <button
                onClick={() => setActiveTab('workstations')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${activeTab === 'workstations'
                  ? 'bg-white/[0.08] text-white border-white/20 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04] font-medium'
                  }`}
              >
                <span>{isVi ? 'Máy trạm (Workstations)' : 'Linked Workstations'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${activeTab === 'security'
                  ? 'bg-white/[0.08] text-white border-white/20 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04] font-medium'
                  }`}
              >
                <span>{isVi ? 'External Brain & Token' : 'External Brain & Token'}</span>
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-[4px] text-xs font-mono uppercase tracking-wider text-left transition-all duration-150 cursor-pointer border ${activeTab === 'billing'
                  ? 'bg-white/[0.08] text-white border-white/20 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white bg-transparent border-transparent hover:bg-white/[0.04] font-medium'
                  }`}
              >
                <span>{isVi ? 'Hóa đơn & Thanh toán' : 'Invoices & Billing'}</span>
              </button>
            </div>

            {/* AI Companion An Note */}
            <div className="p-4 rounded-[8px] bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 text-xs space-y-2 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="flex items-center gap-2.5">
                <img src={anAvatar} alt="An" className="w-7 h-7 rounded-full border border-white/15 object-cover" />
                <div>
                  <span className="font-bold text-white text-xs">An (Core Companion)</span>
                  <span className="block text-[9px] text-zinc-500">ENG-AN-7B9F1D</span>
                </div>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed pt-1">
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

                {/* Membership Status Banner (Grainy Gradient Banner Archetype) */}
                <div className="profile-card relative p-6 rounded-[12px] overflow-hidden border border-white/15 backdrop-blur-md shadow-2xl bg-[#07090D]">
                  {/* Internal Grainy Gradient Atmosphere (Cyan-Blue Glow like Hero Banner) */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
                    {/* Primary Linear Gradient Flow (Top luminous cyan-blue fading down to dark) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.42) 0%, rgba(2, 132, 199, 0.25) 22%, rgba(15, 23, 42, 0.55) 52%, rgba(7, 9, 13, 0.88) 78%, #07090D 100%)',
                      }}
                    />
                    {/* Ethereal Top Horizon Wash (Curved ambient light crest) */}
                    <div
                      className="absolute -top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[280px]"
                      style={{
                        background: 'radial-gradient(ellipse 75% 65% at 50% 0%, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.16) 45%, transparent 100%)',
                        filter: 'blur(35px)',
                      }}
                    />
                    {/* Precision Top Hairline Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-10" />
                    
                    {/* Authentic Grainy Noise Texture Layer */}
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-overlay z-[1]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseBannerMem'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseBannerMem)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '160px 160px',
                      }}
                    />
                    {/* Micro-Grain Color Dodge Highlight Layer */}
                    <div
                      className="absolute inset-0 opacity-15 mix-blend-color-dodge z-[1]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseBannerMem2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseBannerMem2)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px 200px',
                      }}
                    />
                    {/* Subtle Neural Constellation Particles */}
                    <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full overflow-hidden opacity-30 z-[2]">
                      <svg className="w-full h-full object-cover" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.65">
                          <circle cx="550" cy="80" r="1.5" fill="#38bdf8" opacity="0.8" />
                          <circle cx="580" cy="110" r="1" fill="#ffffff" opacity="0.6" />
                          <circle cx="610" cy="95" r="2" fill="#38bdf8" opacity="0.9" />
                          <circle cx="640" cy="130" r="1.5" fill="#ffffff" opacity="0.7" />
                          <circle cx="670" cy="105" r="1" fill="#38bdf8" opacity="0.5" />
                          <circle cx="700" cy="150" r="2" fill="#ffffff" opacity="0.8" />
                          <circle cx="520" cy="130" r="1" fill="#ffffff" opacity="0.5" />
                          <circle cx="560" cy="160" r="2" fill="#38bdf8" opacity="0.8" />
                          <circle cx="590" cy="140" r="1.5" fill="#ffffff" opacity="0.7" />
                          <circle cx="620" cy="190" r="1" fill="#38bdf8" opacity="0.6" />
                          <circle cx="650" cy="165" r="2" fill="#ffffff" opacity="0.9" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                          {isVi ? 'GÓI THÀNH VIÊN HIỆN TẠI' : 'CURRENT MEMBERSHIP PLAN'}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-mono">
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
                          className="px-4 py-2 rounded-[5px] bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 self-start sm:self-center font-mono"
                        >
                          <Sparkles className="w-3.5 h-3.5 shrink-0 text-black" />
                          <span className="whitespace-nowrap">{isVi ? 'Ghi Danh 1 Tháng Pro' : 'Join 1-Month Pro Waitlist'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigate && onNavigate('pricing')}
                          className="profile-action-link group flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center bg-transparent border-none p-1"
                        >
                          <span className="whitespace-nowrap">{isVi ? 'Xem Bảng Giá & Chi Tiết' : 'Manage Subscription'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-zinc-400 group-hover:text-white" />
                        </button>
                      )}
                    </div>

                    {/* Active Pro / Enterprise Subscription Next Billing Cycle */}
                    {(tierSlug === 'pro' || tierSlug === 'enterprise') && !isWaitlist && !isTrial && (
                      <div className="profile-progress-box -mx-6 -mb-6 mt-6 px-6 py-4 bg-white/[0.02] border-t border-white/10 space-y-2.5 rounded-b-[12px]">
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                            <span className="text-zinc-400 font-medium">
                              {isVi ? 'Chu kỳ thanh toán tiếp theo:' : 'Next Billing / Renewal Cycle:'}
                            </span>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                              {isAutoRenew
                                ? (isVi ? 'Tự động gia hạn' : 'Auto-renew')
                                : (isVi ? 'Hết hạn sau chu kỳ' : 'Expires at period end')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">
                              {formattedExpiryDate || (isVi ? '30 Ngày (Kỳ 1 Tháng)' : '30 Days (1-Month)')}
                            </span>
                            <span className="text-zinc-400 font-medium text-xs font-mono">
                              ({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining} days left`})
                            </span>
                          </div>
                        </div>

                        {/* Detailed cycle meta & quick links */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400 pt-1.5 border-t border-white/5">
                          <div className="flex flex-wrap items-center gap-4">
                            {formattedStartDate && (
                              <span>
                                {isVi ? 'Bắt đầu kỳ:' : 'Period Start:'} <span className="text-zinc-200 font-medium">{formattedStartDate}</span>
                              </span>
                            )}
                            <span>
                              {isVi ? 'Ngày gia hạn tiếp theo:' : 'Next Renewal:'} <span className="text-white font-bold">{formattedExpiryDate}</span>
                            </span>
                            <span className="text-zinc-300 flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                              <span>{isVi ? 'Hoạt động liên tục' : 'Active Subscription'}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActiveTab('billing')}
                              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                            >
                              <Receipt className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{isVi ? 'Xem Hóa Đơn & Quản Lý' : 'View Invoices & Billing'}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pro Beta Trial Sprint Cycle */}
                    {isTrial && !isWaitlist && (
                      <div className="profile-progress-box -mx-6 -mb-6 mt-6 px-6 py-4 bg-white/[0.02] border-t border-white/10 space-y-2.5 rounded-b-[12px]">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                            <span className="text-zinc-400">
                              {isVi ? 'Thời hạn chu kỳ Trải nghiệm Pro Beta:' : 'Pro Beta Trial Validity:'}
                            </span>
                          </div>
                          <span className="text-white font-semibold">
                            {trialDaysRemaining} {trialDaysRemaining === 1 ? 'Day left' : 'Days left'} (1-Month Cycle)
                          </span>
                        </div>

                        {entitlements?.expiresAt && (
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1.5 border-t border-white/5">
                            <span>{isVi ? 'Hạn chót quốc tế (UTC):' : 'Expiry Deadline (UTC):'}</span>
                            <span className="text-white font-bold">
                              {new Date(entitlements.expiresAt).toUTCString().replace('GMT', 'UTC')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Beta Waitlist Reserved Cycle */}
                    {isWaitlist && (
                      <div className="profile-progress-box -mx-6 -mb-6 mt-6 px-6 py-4 bg-white/[0.02] border-t border-white/10 space-y-2.5 rounded-b-[12px]">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">
                            {isVi ? 'Trạng thái bảo lưu ngày trải nghiệm:' : 'Reserved Pro Trial Status:'}
                          </span>
                          <span className="text-white font-semibold">
                            {isVi ? '30 Ngày (Đã bảo lưu - Chờ kích hoạt)' : '30 Days (Reserved - On Standby)'}
                          </span>
                        </div>

                        <div className="space-y-2 pt-1.5 border-t border-white/5">
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                            {isVi
                              ? '💡 Lưu ý: Thời hạn 30 ngày (1 tháng) Pro Beta sẽ tự động kích hoạt đếm ngược khi bạn tải Aevum OS và liên kết máy trạm đầu tiên.'
                              : '💡 Note: Your 1-month (30-day) Pro Beta trial will automatically start counting down once you download Aevum OS and link your first device.'}
                          </p>

                          {/* Direct Team Contacts */}
                          <div className="flex flex-wrap items-center gap-2.5 pt-2">
                            <span className="text-[10px] font-mono text-zinc-500">
                              {isVi ? 'Liên hệ đội ngũ Aevum:' : 'Contact Aevum team:'}
                            </span>
                            <div className="flex items-center gap-2">
                              <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="profile-contact-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all text-[10px] font-mono"
                                title="Facebook Community"
                              >
                                <Facebook size={12} className="text-white" />
                                <span>Facebook</span>
                              </a>

                              <a
                                href="https://unikorn.vn/p/aevum"
                                target="_blank"
                                rel="noreferrer"
                                className="profile-contact-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all text-[10px] font-mono"
                                title="Unikorn Agency"
                              >
                                <img src={unikornLogo} alt="Unikorn" className="w-3 h-3 object-contain unikorn-header-light" />
                                <img src={unikornLogoDark} alt="Unikorn" className="w-3 h-3 object-contain unikorn-header-dark" />
                                <span>Unikorn</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Unlocked Capabilities Matrix */}
                <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {isVi ? 'Đặc quyền Kiến trúc & Tính năng Kỹ thuật' : 'Architectural & Engineering Capabilities'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2">

                    {/* Perk 1: Squad Mode */}
                    <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">
                          Multi-Agent Squad Mode
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider select-none">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {isVi
                          ? 'Kích hoạt 4 Persona chuyên sâu: An (Companion & AI Tuning), Luna (UI/UX Architect), Vidus (System Architect), Zenith (QA & Performance).'
                          : 'Access to 4 specialized Personas: An (Companion & AI Tuning), Luna (UI/UX Architect), Vidus (System Architect), Zenith (QA & Performance).'}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <img src={anAvatar} alt="An" className="w-5 h-5 rounded-full border border-white/20" title="An (AI Tuning)" />
                        <img src={lunaAvatar} alt="Luna" className="w-5 h-5 rounded-full border border-white/20" title="Luna (UI/UX Architect)" />
                        <img src={vidusAvatar} alt="Vidus" className="w-5 h-5 rounded-full border border-white/20" title="Vidus (System Architect)" />
                        <img src={zenithAvatar} alt="Zenith" className="w-5 h-5 rounded-full border border-white/20" title="Zenith (QA & Performance)" />
                      </div>
                    </div>

                    {/* Perk 2: Living Memory Cloud */}
                    <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">
                          Living Memory Graph
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider select-none">
                          SYNCED
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {isVi
                          ? 'Ký ức dài hạn được mã hóa AES-256 lưu cục bộ và đồng bộ tự động qua Aevum Cloud Vault.'
                          : 'AES-256 encrypted persistent memory graphs synced continuously across devices via Cloud Vault.'}
                      </p>
                    </div>

                    {/* Perk 3: Deep Research Engine */}
                    <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">
                          Deep Research Engine
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider select-none">
                          READY
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {isVi
                          ? 'Tự động trích xuất Whitepaper, phân tích Root-cause và lập kế hoạch Plan-First trước khi viết code.'
                          : 'Autonomous Whitepaper synthesis, Root-cause audits, and Plan-First pipeline enforcement.'}
                      </p>
                    </div>

                    {/* Perk 4: Workstation Limits */}
                    <div className="profile-perk-card bg-transparent border-none p-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">
                          Linked Workstations
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider select-none">
                          {tierSlug === 'pro' ? `${entitlements?.activeMachinesCount || 1} / 5 MACHINES` : `${entitlements?.activeMachinesCount || 1} / 1 MACHINE`}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
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
              <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      {isVi ? 'DANH SÁCH MÁY TRẠM ĐÃ KẾT NỐI' : 'LINKED WORKSTATIONS'}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {isVi ? 'Quản lý các thiết bị máy tính chạy Aevum OS Daemon cục bộ' : 'Manage devices running local Aevum OS Daemons'}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-300 font-mono font-bold select-none">
                    {isVi ? `${entitlements?.activeMachinesCount || 1}/${entitlements?.maxMachines || 5} ĐANG HOẠT ĐỘNG` : `${entitlements?.activeMachinesCount || 1}/${entitlements?.maxMachines || 5} ACTIVE`}
                  </span>
                </div>

                {/* Workstation List */}
                {entitlements?.workstations && entitlements.workstations.length > 0 ? (
                  entitlements.workstations.map((ws, idx) => (
                    <div key={ws.id || ws.machine_id || idx} className="profile-perk-card p-4 rounded-[6px] bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[5px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                            <Laptop className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{ws.machine_name || ws.os_info?.hostname || `Workstation-${idx + 1}`}</span>
                              {idx === 0 && (
                                <span className="text-[9px] text-zinc-400 font-bold uppercase font-mono select-none">
                                  {isVi ? 'GẦN NHẤT' : 'RECENT'}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {ws.os_info?.platform || 'OS'} {ws.os_info?.arch || ''} {ws.os_info?.cpuModel ? `• ${ws.os_info.cpuModel.slice(0, 28)}` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold font-mono flex items-center gap-1.5 ${ws.is_active ? 'text-white' : 'text-zinc-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${ws.is_active ? 'bg-white' : 'bg-zinc-500'}`} />
                            {ws.is_active ? 'ONLINE' : 'INACTIVE'}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5 flex items-center justify-between">
                        <span>Machine ID: <span className="text-white font-bold">{ws.machine_id}</span></span>
                        <span className="text-zinc-500">
                          {isVi ? 'Xác minh:' : 'Verified:'} {ws.last_verified_at ? new Date(ws.last_verified_at).toLocaleDateString('vi-VN') : 'Mới'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="profile-perk-card p-4 rounded-[6px] bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[5px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                          <Laptop className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">Workstation-Primary</span>
                            <span className="text-[9px] text-zinc-400 font-bold uppercase font-mono select-none">
                              {isVi ? 'MÁY HIỆN TẠI' : 'THIS DEVICE'}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-mono">Windows 11 x64 • SSE Daemon Port: 3344</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white font-bold font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          ONLINE
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Instructions on adding machines */}
                <div className="profile-perk-card p-4 rounded-[6px] bg-white/[0.01] border border-white/10 space-y-2 text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isVi ? 'Cách liên kết máy trạm mới:' : 'How to link a new workstation:'}</span>
                  </span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed font-mono">
                    {isVi
                      ? 'Chạy lệnh sau trên Terminal máy trạm mới để tự động kết nối và đồng bộ Living Memory Graph:'
                      : 'Execute the following command in the terminal of your new machine to pair and synchronize:'}
                  </p>
                  <div className="profile-code-box p-2.5 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-zinc-200 flex items-center justify-between">
                    <code>aevum-os pair --token {mockApiKey.slice(0, 16)}...</code>
                    <button
                      onClick={() => copyToClipboard(`aevum-os pair --token ${mockApiKey}`, 'pair-cmd')}
                      className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                    >
                      {copiedField === 'pair-cmd' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EXTERNAL BRAIN & API TOKEN */}
            {activeTab === 'security' && (
              <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <div className="pb-4 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    {isVi ? 'EXTERNAL BRAIN INTEGRATION & TOKEN' : 'EXTERNAL BRAIN INTEGRATION & TOKEN'}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    {isVi ? 'Giao thức MCP và mã xác thực kết nối IDE' : 'MCP protocol credentials and IDE connection tokens'}
                  </p>
                </div>

                {/* Token Display */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 flex items-center justify-between font-mono">
                    <span>PiperNet Agent Access Token</span>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-[10px] text-zinc-400 hover:text-white hover:underline cursor-pointer font-mono"
                    >
                      {showApiKey ? (isVi ? 'Ẩn token' : 'Hide token') : (isVi ? 'Hiện token' : 'Show token')}
                    </button>
                  </label>

                  <div className="flex items-center gap-2">
                    <div className="profile-code-box flex-1 p-2.5 rounded bg-black/40 border border-white/10 font-mono text-xs text-zinc-200 truncate">
                      {showApiKey ? mockApiKey : `${mockApiKey.slice(0, 12)}••••••••••••••••••••`}
                    </div>
                    <button
                      onClick={() => copyToClipboard(mockApiKey, 'api-token')}
                      className="px-3 py-2.5 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                      title="Copy Token"
                    >
                      {copiedField === 'api-token' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    {isVi
                      ? 'Token này được dùng để xác thực các công cụ (Cursor, VS Code, Claude Desktop, Antigravity IDE) với Aevum External Brain.'
                      : 'This token authorizes external clients (Cursor, VS Code, Claude Desktop, Antigravity IDE) to interact with your Aevum External Brain.'}
                  </p>
                </div>

                {/* MCP Configuration Snippet */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-zinc-300 block font-mono">mcpServers Config (mcp.json)</span>
                  <div className="profile-code-box p-3 rounded bg-black/50 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto">
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

            {/* TAB 4: BILLING & INVOICES */}
            {activeTab === 'billing' && (
              <div className="space-y-6">

                {/* Payment Quick Action Header */}
                <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                      {isVi ? 'QUẢN LÝ ĐĂNG KÝ & THANH TOÁN' : 'SUBSCRIPTION & BILLING'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2 font-mono">
                      <span>{effectiveTier}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 text-zinc-300 font-normal">
                        Napas 24/7 Direct
                      </span>
                    </h3>
                    {tierSlug === 'pro' && formattedExpiryDate && !isWaitlist && (
                      <p className="text-xs text-zinc-400 font-mono pt-1">
                        {isVi ? 'Chu kỳ thanh toán tiếp theo:' : 'Next billing cycle:'} <span className="text-white font-bold">{formattedExpiryDate}</span>
                        <span className="text-zinc-500 ml-2">({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining}d remaining`})</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenPaymentModal ? onOpenPaymentModal('monthly') : onOpenTrialModal()}
                      className="px-4 py-2 rounded-[5px] bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap font-mono"
                    >
                      <Zap className="w-3.5 h-3.5 text-black" />
                      <span>{isVi ? 'Nâng Cấp Pro (VietQR)' : 'Upgrade Pro (VietQR)'}</span>
                    </button>

                    {tierSlug === 'pro' && (
                      <button
                        onClick={handleCancelRenewal}
                        disabled={cancellingRenewal}
                        className="px-3.5 py-2 rounded-[5px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-zinc-400 hover:text-white font-mono text-[11px] font-bold uppercase transition-all cursor-pointer disabled:opacity-50"
                      >
                        {cancellingRenewal ? 'Đang xử lý...' : (isVi ? 'Hủy Tự Gia Hạn' : 'Cancel Renewal')}
                      </button>
                    )}
                  </div>
                </div>

                {cancelMessage && (
                  <div className="p-3 rounded-lg bg-white/[0.04] border border-white/15 text-zinc-300 text-xs font-mono">
                    {cancelMessage}
                  </div>
                )}

                {/* Direct Bank Account Information Banner */}
                <div className="p-4 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-3 font-mono text-xs relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Landmark className="w-4 h-4 text-zinc-400" />
                      <span>Tài Khoản Nhận Chuyển Khoản Trực Tiếp</span>
                    </div>
                    <span className="text-[10px] text-zinc-300 font-bold bg-white/[0.06] px-2 py-0.5 rounded border border-white/15">
                      MBBank Napas 24/7 (SePAY)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-zinc-300">
                    <div className="p-2.5 rounded bg-black/30 border border-white/5">
                      <span className="text-[10px] text-zinc-500 block">Ngân hàng:</span>
                      <span className="font-bold text-white">MBBank (Quân Đội)</span>
                    </div>
                    <div className="p-2.5 rounded bg-black/30 border border-white/5">
                      <span className="text-[10px] text-zinc-500 block">Số tài khoản:</span>
                      <span className="font-bold text-white tracking-wider">0879299627</span>
                    </div>
                    <div className="p-2.5 rounded bg-black/30 border border-white/5">
                      <span className="text-[10px] text-zinc-500 block">Chủ tài khoản:</span>
                      <span className="font-bold text-white uppercase">NGUYEN HUY HAI</span>
                    </div>
                  </div>
                </div>

                {/* Invoices List Table */}
                <div className="profile-card p-6 rounded-[8px] bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                      <Receipt className="w-4 h-4 text-zinc-400" />
                      <span>{isVi ? 'Lịch Sử Hóa Đơn & Đơn Hàng' : 'Invoices & Orders History'}</span>
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {invoices.length} {isVi ? 'hóa đơn' : 'invoices'}
                    </span>
                  </div>

                  {invoicesLoading ? (
                    <div className="py-8 text-center text-xs text-zinc-400 font-mono">
                      <RefreshCw className="w-5 h-5 mx-auto animate-spin mb-2 text-zinc-400" />
                      <span>Đang tải lịch sử hóa đơn...</span>
                    </div>
                  ) : invoices.length === 0 ? (
                    <div className="py-8 text-center text-xs text-zinc-500 font-mono space-y-2">
                      <Receipt className="w-8 h-8 mx-auto text-zinc-600" />
                      <p>{isVi ? 'Chưa có lịch sử giao dịch nào.' : 'No invoices found.'}</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-zinc-500 text-[10px] uppercase">
                            <th className="py-2.5 px-3">Mã đơn / ID</th>
                            <th className="py-2.5 px-3">Gói</th>
                            <th className="py-2.5 px-3">Số tiền</th>
                            <th className="py-2.5 px-3">Kênh</th>
                            <th className="py-2.5 px-3">Trạng thái</th>
                            <th className="py-2.5 px-3">Ngày tạo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {invoices.map((inv) => {
                            const isCompleted = inv.status === 'completed';
                            const isPending = inv.status === 'pending';
                            return (
                              <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-3 text-zinc-300 font-bold">
                                  {inv.metadata?.orderCode || inv.id.slice(0, 8)}
                                </td>
                                <td className="py-3 px-3 text-white uppercase">
                                  {inv.tier_slug || 'PRO'}
                                </td>
                                <td className="py-3 px-3 text-white font-bold">
                                  {Number(inv.amount || 0).toLocaleString('vi-VN')} {inv.currency || 'VND'}
                                </td>
                                <td className="py-3 px-3 text-zinc-400 text-[11px]">
                                  {inv.metadata?.providerName || inv.provider || 'VietQR'}
                                </td>
                                <td className="py-3 px-3">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${isCompleted
                                    ? 'bg-white/[0.08] text-white border border-white/20'
                                    : isPending
                                      ? 'bg-white/[0.03] text-zinc-400 border border-dashed border-white/20'
                                      : 'bg-zinc-900 text-zinc-500 border border-white/10'
                                    }`}>
                                    {inv.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-zinc-500 text-[10px]">
                                  {new Date(inv.created_at).toLocaleDateString('vi-VN')}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
