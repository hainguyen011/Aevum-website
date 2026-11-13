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
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';
import vidusAvatar from '../../assets/agent-avatar/vidus_avatar.webp';
import zenithAvatar from '../../assets/agent-avatar/zenith_avatar.webp';
import lunaAvatar from '../../assets/agent-avatar/luna_avatar.webp';
import kaiAvatar from '../../assets/agent-avatar/kai_avatar.webp';
import niaAvatar from '../../assets/agent-avatar/nia_avatar.webp';
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
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-sans">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center mx-auto text-slate-200 [html[data-theme='light']_&]:text-slate-800">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900">
              {isVi ? 'Yêu cầu Đăng nhập' : 'Authentication Required'}
            </h2>
            <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
              {isVi
                ? 'Vui lòng đăng nhập tài khoản Aevum để xem và quản lý hồ sơ kỹ thuật, máy trạm và quyền hạn Hạng Member của bạn.'
                : 'Please sign in to your Aevum account to inspect your engineering profile, connected workstations, and tier entitlements.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
          </button>
        </div>
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
  const mockApiKey = `ae_live_${user.id.replace(/-/g, '').slice(0, 24)}_sec`;
  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  }) : '2026';

  const mcpConfigSnippet = `{
  "mcpServers": {
    "aevum-os": {
      "command": "aevum",
      "args": ["daemon", "--transport", "sse", "--port", "3344"],
      "env": {
        "AEVUM_TOKEN": "${showApiKey ? mockApiKey : 'ae_live_YOUR_TOKEN_HERE'}"
      }
    }
  }
}`;

  return (
    <div className="relative min-h-screen w-full bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] text-slate-100 [html[data-theme='light']_&]:text-slate-900 select-text overflow-x-hidden font-sans">
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-700 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? 'Trang chủ' : 'Home'}</span>
            </button>
            <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-300">/</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-semibold">
              {isVi ? 'Hồ sơ người dùng' : 'User Profile'}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-950 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isVi ? 'Đăng xuất' : 'Sign Out'}</span>
          </button>
        </div>

        {/* Page Title & Editorial Lead */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500">
            <span>{isVi ? 'KHÔNG GIAN LÀM VIỆC & ĐỊNH DANH' : 'WORKSPACE & IDENTITY'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12]">
            {isVi ? 'Hồ sơ & Không gian làm việc' : 'Profile & Connected Workspaces'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-2xl font-light leading-relaxed">
            {isVi
              ? 'Quản lý máy trạm cục bộ, trạng thái đồng bộ Living Memory Graph và giao thức MCP External Brain của bạn.'
              : 'Inspect your active workstations, Living Memory Graph synchronization, and MCP External Brain protocol credentials.'}
          </p>
        </div>

        {/* Main 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (4 Cols): Identity, Nav, and Companion Card */}
          <div className="lg:col-span-4 space-y-6">

            {/* Identity Card (Transparent Editorial) */}
            <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-7 space-y-5">
              <div className="flex flex-col items-center text-center space-y-4">
                
                {/* Avatar Frame with 3D Squircle */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 border border-white/10 [html[data-theme='light']_&]:border-slate-300 bg-slate-900/60 [html[data-theme='light']_&]:bg-slate-100">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white [html[data-theme='light']_&]:text-slate-900 text-xl font-bold font-mono">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name & Tier Pill */}
                <div className="space-y-1.5 w-full">
                  <h2 className="text-lg font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight truncate">
                    {displayName}
                  </h2>
                  <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate">{user.email}</p>

                  <div className="flex items-center justify-center gap-2 pt-1 flex-wrap select-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-100 text-white [html[data-theme='light']_&]:text-slate-900 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                      {isWaitlist ? 'PRO (BETA WAITLIST)' : (isTrial ? 'PRO BETA' : effectiveTier)}
                    </span>

                    {role === 'admin' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                        ADMIN
                      </span>
                    )}
                  </div>
                </div>

                {/* Metadata List without internal dividing lines */}
                <div className="w-full pt-3 space-y-3 text-left text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                    <span className="text-slate-500">{isVi ? 'Mã UID' : 'User ID'}:</span>
                    <div className="flex items-center gap-1.5 text-slate-200 [html[data-theme='light']_&]:text-slate-800">
                      <span>{user.id.slice(0, 8)}...{user.id.slice(-4)}</span>
                      <button
                        onClick={() => copyToClipboard(user.id, 'uid')}
                        className="text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 p-1 cursor-pointer transition-colors"
                        title="Copy UID"
                      >
                        {copiedField === 'uid' ? <Check className="w-3.5 h-3.5 text-white [html[data-theme='light']_&]:text-slate-900" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                    <span className="text-slate-500">{isVi ? 'Tham gia' : 'Joined'}:</span>
                    <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800">{createdAt}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                    <span className="text-slate-500">{isVi ? 'Xác thực qua' : 'Provider'}:</span>
                    <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 capitalize">
                      {user.app_metadata?.provider || 'Email/OAuth'}
                    </span>
                  </div>

                  {tierSlug === 'pro' && formattedExpiryDate && !isWaitlist && (
                    <div className="flex items-center justify-between text-slate-400 [html[data-theme='light']_&]:text-slate-600 pt-1">
                      <span className="text-slate-500">{isVi ? 'Chu kỳ tới' : 'Next Billing'}:</span>
                      <div className="text-right">
                        <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-bold block">{formattedExpiryDate}</span>
                        <span className="text-[10px] text-slate-500">({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining}d left`})</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Navigation Tabs (Transparent Segmented Menu) */}
            <div className="p-1.5 rounded-2xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-sans transition-all duration-150 cursor-pointer ${activeTab === 'overview'
                  ? "bg-white text-slate-950 font-semibold shadow-sm [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white"
                  : "text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100 font-normal"
                  }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{isVi ? 'Tổng quan Đặc quyền' : 'Entitlements Overview'}</span>
              </button>

              <button
                onClick={() => setActiveTab('workstations')}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-sans transition-all duration-150 cursor-pointer ${activeTab === 'workstations'
                  ? "bg-white text-slate-950 font-semibold shadow-sm [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white"
                  : "text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100 font-normal"
                  }`}
              >
                <Laptop className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{isVi ? 'Máy trạm (Workstations)' : 'Linked Workstations'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-sans transition-all duration-150 cursor-pointer ${activeTab === 'security'
                  ? "bg-white text-slate-950 font-semibold shadow-sm [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white"
                  : "text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100 font-normal"
                  }`}
              >
                <Key className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{isVi ? 'External Brain & Token' : 'External Brain & Token'}</span>
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-sans transition-all duration-150 cursor-pointer ${activeTab === 'billing'
                  ? "bg-white text-slate-950 font-semibold shadow-sm [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white"
                  : "text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100 font-normal"
                  }`}
              >
                <Receipt className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{isVi ? 'Hóa đơn & Thanh toán' : 'Invoices & Billing'}</span>
              </button>
            </div>

            {/* AI Companion Card (An & Biệt đội - Transparent) */}
            <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={anAvatar} alt="An" className="w-10 h-10 rounded-2xl border border-white/10 [html[data-theme='light']_&]:border-slate-300 object-cover shadow-sm" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900">An (Core Companion)</h3>
                  <span className="text-[10px] font-mono text-slate-500">ENG-AN-7B9F1D</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                {isVi
                  ? '“Em luôn sẵn sàng đồng hành cùng Master trên mọi máy trạm. Living Memory Graph sẽ tự động đồng bộ ký ức dài hạn mỗi khi Master hoàn thành nhiệm vụ!”'
                  : '“I am always ready to accompany you across your workstations. Living Memory Graph automatically syncs long-term memory upon every sprint task!”'}
              </p>

              {/* Swarm Agents Mini Avatars */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Biệt đội 5 Tác tử</span>
                <div className="flex items-center -space-x-1.5">
                  <img src={kaiAvatar} alt="Kai" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Kai (Fullstack)" />
                  <img src={zenithAvatar} alt="Zenith" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Zenith (Architect)" />
                  <img src={niaAvatar} alt="Nia" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Nia (Benchmark)" />
                  <img src={vidusAvatar} alt="Vidus" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Vidus (Security)" />
                  <img src={lunaAvatar} alt="Luna" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Luna (UI/UX)" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (8 Cols): Dynamic Tab Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* TAB 1: OVERVIEW & MEMBERSHIP ENTITLEMENTS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Hero Membership Banner (Transparent Swiss Editorial Archetype) */}
                <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 block">
                        {isVi ? 'GÓI THÀNH VIÊN HIỆN TẠI' : 'CURRENT MEMBERSHIP PLAN'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
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
                        className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 self-start sm:self-center"
                      >
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{isVi ? 'Ghi Danh 1 Tháng Pro' : 'Join 1-Month Pro Waitlist'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate && onNavigate('pricing')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 font-medium text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center"
                      >
                        <span>{isVi ? 'Bảng giá & Chi tiết gói' : 'Pricing & Subscription'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Pro / Enterprise Active Subscription Detail Box */}
                  {(tierSlug === 'pro' || tierSlug === 'enterprise') && !isWaitlist && !isTrial && (
                    <div className="pt-4 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400 [html[data-theme='light']_&]:text-slate-500 shrink-0" />
                          <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-medium">
                            {isVi ? 'Chu kỳ thanh toán tiếp theo:' : 'Next Billing / Renewal Cycle:'}
                          </span>
                          <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-white [html[data-theme='light']_&]:text-slate-900">
                            {isAutoRenew
                              ? (isVi ? 'Tự động gia hạn' : 'Auto-renew')
                              : (isVi ? 'Hết hạn sau chu kỳ' : 'Expires at period end')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-bold text-sm">
                            {formattedExpiryDate || (isVi ? '30 Ngày (Kỳ 1 Tháng)' : '30 Days (1-Month)')}
                          </span>
                          <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono text-xs">
                            ({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining} days left`})
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 pt-2 font-mono">
                        <div className="flex flex-wrap items-center gap-4">
                          {formattedStartDate && (
                            <span>
                              {isVi ? 'Bắt đầu kỳ:' : 'Start:'} <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-medium">{formattedStartDate}</span>
                            </span>
                          )}
                          <span>
                            {isVi ? 'Gia hạn:' : 'Renewal:'} <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-bold">{formattedExpiryDate}</span>
                          </span>
                          <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700 flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 [html[data-theme='light']_&]:text-slate-600 shrink-0" />
                            <span>{isVi ? 'Hoạt động liên tục' : 'Active'}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => setActiveTab('billing')}
                          className="text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer font-sans font-medium"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Xem Hóa đơn' : 'View Invoices'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pro Beta Trial Sprint Cycle */}
                  {isTrial && !isWaitlist && (
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{isVi ? 'Thời hạn chu kỳ Trải nghiệm Pro Beta:' : 'Pro Beta Trial Validity:'}</span>
                        </div>
                        <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-semibold font-mono">
                          {trialDaysRemaining} {trialDaysRemaining === 1 ? 'Day left' : 'Days left'} (1-Month Cycle)
                        </span>
                      </div>

                      {entitlements?.expiresAt && (
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 pt-2">
                          <span>{isVi ? 'Hạn chót quốc tế (UTC):' : 'Expiry Deadline (UTC):'}</span>
                          <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-bold">
                            {new Date(entitlements.expiresAt).toUTCString().replace('GMT', 'UTC')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Beta Waitlist Reserved Cycle */}
                  {isWaitlist && (
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-600">
                          {isVi ? 'Trạng thái bảo lưu ngày trải nghiệm:' : 'Reserved Pro Trial Status:'}
                        </span>
                        <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-semibold font-mono">
                          {isVi ? '30 Ngày (Đã bảo lưu - Chờ kích hoạt)' : '30 Days (Reserved - Standby)'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                        {isVi
                          ? '💡 Lưu ý: Thời hạn 30 ngày (1 tháng) Pro Beta sẽ tự động kích hoạt đếm ngược khi bạn tải Aevum OS và liên kết máy trạm đầu tiên.'
                          : '💡 Note: Your 1-month (30-day) Pro Beta trial will automatically start counting down once you download Aevum OS and link your first device.'}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <span className="text-[11px] font-mono text-slate-500">
                          {isVi ? 'Liên hệ đội ngũ Aevum:' : 'Contact Aevum team:'}
                        </span>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 transition-colors text-xs font-sans"
                        >
                          <Facebook size={12} />
                          <span>Facebook</span>
                        </a>
                        <a
                          href="https://unikorn.vn/p/aevum"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 transition-colors text-xs font-sans"
                        >
                          <img src={unikornLogo} alt="Unikorn" className="w-3 h-3 object-contain [html[data-theme='light']_&]:hidden" />
                          <img src={unikornLogoDark} alt="Unikorn" className="w-3 h-3 object-contain hidden [html[data-theme='light']_&]:block" />
                          <span>Unikorn</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Unlocked Capabilities Matrix (Transparent 2x2 Grid) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider font-mono">
                      {isVi ? 'Đặc quyền Kiến trúc & Năng lực Kỹ thuật' : 'Architectural & Engineering Capabilities'}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">4 / 4 UNLOCKED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Perk 1: Multi-Agent Squad */}
                    <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                          Multi-Agent Squad Mode
                        </span>
                        <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono font-medium uppercase tracking-wider">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                        {isVi
                          ? 'Kích hoạt 5 Persona chuyên sâu: Kai (Fullstack Swarm), Zenith (Architect Big-O), Nia (Benchmark QA), Vidus (Security Zero-Trust), Luna (UI/UX).'
                          : 'Full access to 5 specialized Personas: Kai (Fullstack Swarm), Zenith (Architect Big-O), Nia (Benchmark QA), Vidus (Security Zero-Trust), Luna (UI/UX).'}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <img src={kaiAvatar} alt="Kai" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Kai" />
                        <img src={zenithAvatar} alt="Zenith" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Zenith" />
                        <img src={niaAvatar} alt="Nia" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Nia" />
                        <img src={vidusAvatar} alt="Vidus" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Vidus" />
                        <img src={lunaAvatar} alt="Luna" className="w-6 h-6 rounded-full border border-white/20 [html[data-theme='light']_&]:border-slate-300 object-cover" title="Luna" />
                      </div>
                    </div>

                    {/* Perk 2: Living Memory Graph */}
                    <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                          Living Memory Graph (99%)
                        </span>
                        <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono font-medium uppercase tracking-wider">
                          SYNCED
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                        {isVi
                          ? 'Ký ức dài hạn được mã hóa AES-256 lưu cục bộ và đồng bộ tự động qua Aevum Cloud Vault, bảo tồn 99% ngữ cảnh kiến trúc dự án.'
                          : 'AES-256 encrypted persistent memory graphs synced continuously across devices via Cloud Vault, preserving 99% context.'}
                      </p>
                    </div>

                    {/* Perk 3: Plan-First Pipeline */}
                    <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                          Kỷ luật Plan-First (66%)
                        </span>
                        <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono font-medium uppercase tracking-wider">
                          READY
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                        {isVi
                          ? 'Buộc Agent tính toán kỹ lộ trình thay đổi trước khi gõ dòng code đầu tiên, giảm 66% hao phí token và triệt tiêu nợ kỹ thuật.'
                          : 'Mandatory Plan-First reasoning cuts token waste by 66% and prevents technical debt before editing source files.'}
                      </p>
                    </div>

                    {/* Perk 4: Linked Workstations */}
                    <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                          Linked Workstations
                        </span>
                        <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-mono font-medium uppercase tracking-wider">
                          {tierSlug === 'pro' ? `${entitlements?.activeMachinesCount || 1} / 5 MACHINES` : `${entitlements?.activeMachinesCount || 1} / 1 MACHINE`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                        {isVi
                          ? 'Liên kết tối đa 5 máy trạm mã hóa Ed25519 cho phép chuyển đổi mượt mà giữa máy bàn, laptop và cloud VM.'
                          : 'Link up to 5 Ed25519 devices for effortless context roaming between desktop, laptop, and cloud VMs.'}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: LINKED WORKSTATIONS */}
            {activeTab === 'workstations' && (
              <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                      {isVi ? 'Danh sách Máy trạm Đã kết nối' : 'Linked Workstations'}
                    </h3>
                    <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light">
                      {isVi ? 'Quản lý các thiết bị máy tính chạy Aevum OS Daemon cục bộ qua giao thức Ed25519' : 'Manage devices running local Aevum OS Daemons authenticated via Ed25519'}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-transparent text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                    {isVi ? `${entitlements?.activeMachinesCount || 1}/${entitlements?.maxMachines || 5} ĐANG HOẠT ĐỘNG` : `${entitlements?.activeMachinesCount || 1}/${entitlements?.maxMachines || 5} ACTIVE`}
                  </span>
                </div>

                {/* Workstation List */}
                <div className="space-y-3">
                  {entitlements?.workstations && entitlements.workstations.length > 0 ? (
                    entitlements.workstations.map((ws, idx) => (
                      <div key={ws.id || ws.machine_id || idx} className="p-5 rounded-2xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                              <Laptop className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                                  {ws.machine_name || ws.os_info?.hostname || `Workstation-${idx + 1}`}
                                </span>
                                {idx === 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium uppercase tracking-wider bg-white/[0.05] [html[data-theme='light']_&]:bg-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-300">
                                    {isVi ? 'GẦN NHẤT' : 'RECENT'}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono">
                                {ws.os_info?.platform || 'OS'} {ws.os_info?.arch || ''} {ws.os_info?.cpuModel ? `• ${ws.os_info.cpuModel.slice(0, 32)}` : ''}
                              </span>
                            </div>
                          </div>

                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider ${ws.is_active ? "bg-white/[0.06] text-white [html[data-theme='light']_&]:bg-slate-200 [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300" : "bg-white/[0.02] text-slate-500 border border-white/5 [html[data-theme='light']_&]:border-slate-200"}`}>
                            {ws.is_active ? 'ONLINE' : 'INACTIVE'}
                          </span>
                        </div>

                        <div className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 pt-2 flex flex-wrap items-center justify-between gap-2">
                          <span>Machine ID: <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-bold">{ws.machine_id}</span></span>
                          <span>{isVi ? 'Xác minh:' : 'Verified:'} {ws.last_verified_at ? new Date(ws.last_verified_at).toLocaleDateString('vi-VN') : 'Mới'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 rounded-2xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                            <Laptop className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                                Workstation-Primary
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium uppercase tracking-wider bg-white/[0.05] [html[data-theme='light']_&]:bg-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-300">
                                {isVi ? 'MÁY HIỆN TẠI' : 'THIS DEVICE'}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-mono">
                              Windows / macOS • SSE Daemon Port: 3344
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-white/[0.06] text-white [html[data-theme='light']_&]:bg-slate-200 [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300">
                          ONLINE
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Linking Guide */}
                <div className="p-5 rounded-2xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                    <Terminal className="w-4 h-4 text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
                    <span>{isVi ? 'Cách liên kết máy trạm mới:' : 'How to link a new workstation:'}</span>
                  </div>
                  <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-light">
                    {isVi
                      ? 'Chạy lệnh sau trên Terminal máy trạm mới để tự động kết nối và đồng bộ Living Memory Graph:'
                      : 'Execute the following command in your new machine terminal to pair and synchronize:'}
                  </p>
                  <div className="p-3 rounded-xl bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-xs text-slate-200 [html[data-theme='light']_&]:text-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
                    <code>aevum-os pair --token {mockApiKey.slice(0, 16)}...</code>
                    <button
                      onClick={() => copyToClipboard(`aevum-os pair --token ${mockApiKey}`, 'pair-cmd')}
                      className="text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 p-1 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedField === 'pair-cmd' ? <Check className="w-4 h-4 text-white [html[data-theme='light']_&]:text-slate-900" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: EXTERNAL BRAIN & API TOKEN */}
            {activeTab === 'security' && (
              <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-6">
                <div className="pb-2 space-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                    {isVi ? 'External Brain Integration & Token' : 'External Brain Integration & Token'}
                  </h3>
                  <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-light">
                    {isVi ? 'Giao thức MCP và mã xác thực kết nối Cursor, VS Code, Claude Desktop, Antigravity IDE' : 'MCP protocol credentials and IDE connection tokens'}
                  </p>
                </div>

                {/* Token Display */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-sans">
                    <span>PiperNet Agent Access Token</span>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-xs text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-950 underline cursor-pointer font-sans transition-colors"
                    >
                      {showApiKey ? (isVi ? 'Ẩn token' : 'Hide token') : (isVi ? 'Hiện token' : 'Show token')}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 rounded-xl bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-xs text-slate-200 [html[data-theme='light']_&]:text-slate-800 truncate">
                      {showApiKey ? mockApiKey : `${mockApiKey.slice(0, 12)}••••••••••••••••••••`}
                    </div>
                    <button
                      onClick={() => copyToClipboard(mockApiKey, 'api-token')}
                      className="px-4 py-3 rounded-xl bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-slate-200 [html[data-theme='light']_&]:text-slate-900 transition-colors cursor-pointer shrink-0"
                      title="Copy Token"
                    >
                      {copiedField === 'api-token' ? <Check className="w-4 h-4 text-white [html[data-theme='light']_&]:text-slate-900" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    {isVi
                      ? 'Token này được dùng để xác thực các công cụ lập trình ngoại vi với Aevum External Brain chạy ngầm trên máy trạm của bạn.'
                      : 'This token authorizes external clients (Cursor, VS Code, Claude Desktop, Antigravity IDE) to interact with your Aevum External Brain.'}
                  </p>
                </div>

                {/* MCP Configuration Snippet */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-mono">
                    <span>mcpServers Config (mcp.json)</span>
                    <button
                      onClick={() => copyToClipboard(mcpConfigSnippet, 'mcp-config')}
                      className="text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 flex items-center gap-1 font-sans text-xs transition-colors cursor-pointer"
                    >
                      {copiedField === 'mcp-config' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white [html[data-theme='light']_&]:text-slate-900" />
                          <span className="text-white [html[data-theme='light']_&]:text-slate-900">{isVi ? 'Đã sao chép' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Sao chép cấu hình' : 'Copy Config'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 font-mono text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-800 overflow-x-auto leading-relaxed">
                    <pre>{mcpConfigSnippet}</pre>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: BILLING & INVOICES */}
            {activeTab === 'billing' && (
              <div className="space-y-6">

                {/* Subscription & Quick Action Header (Transparent) */}
                <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 block">
                        {isVi ? 'QUẢN LÝ ĐĂNG KÝ & THANH TOÁN' : 'SUBSCRIPTION & BILLING'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 font-sans flex items-center gap-2.5">
                        <span>{effectiveTier}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-normal font-sans">
                          Napas 24/7 Direct
                        </span>
                      </h3>
                      {tierSlug === 'pro' && formattedExpiryDate && !isWaitlist && (
                        <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-mono pt-1">
                          {isVi ? 'Chu kỳ thanh toán tiếp theo:' : 'Next billing cycle:'} <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-bold">{formattedExpiryDate}</span>
                          <span className="text-slate-500 ml-2">({isVi ? `Còn ${safeDaysRemaining} ngày` : `${safeDaysRemaining}d remaining`})</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenPaymentModal ? onOpenPaymentModal('monthly') : onOpenTrialModal()}
                        className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{isVi ? 'Nâng Cấp Pro (VietQR)' : 'Upgrade Pro (VietQR)'}</span>
                      </button>

                      {tierSlug === 'pro' && (
                        <button
                          onClick={handleCancelRenewal}
                          disabled={cancellingRenewal}
                          className="px-4 py-2.5 rounded-full bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-950 text-xs font-medium uppercase transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {cancellingRenewal ? 'Đang xử lý...' : (isVi ? 'Hủy Tự Gia Hạn' : 'Cancel Renewal')}
                        </button>
                      )}
                    </div>
                  </div>

                  {cancelMessage && (
                    <div className="p-3.5 rounded-2xl bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-800 text-xs font-mono">
                      {cancelMessage}
                    </div>
                  )}
                </div>

                {/* Direct Bank Account Card */}
                <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                      <Landmark className="w-4 h-4 text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
                      <span>{isVi ? 'Tài Khoản Nhận Chuyển Khoản Trực Tiếp' : 'Direct Payment Account'}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-medium bg-transparent px-2.5 py-1 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                      MBBank Napas 24/7 (SePAY)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-transparent border border-white/[0.06] [html[data-theme='light']_&]:border-slate-200/60 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Ngân hàng</span>
                      <span className="font-semibold text-white [html[data-theme='light']_&]:text-slate-900 text-xs">MBBank (Quân Đội)</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-transparent border border-white/[0.06] [html[data-theme='light']_&]:border-slate-200/60 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Số tài khoản</span>
                      <span className="font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-mono text-sm tracking-wider">0879299627</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-transparent border border-white/[0.06] [html[data-theme='light']_&]:border-slate-200/60 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Chủ tài khoản</span>
                      <span className="font-semibold text-white [html[data-theme='light']_&]:text-slate-900 text-xs uppercase">NGUYEN HUY HAI</span>
                    </div>
                  </div>
                </div>

                {/* Invoices List Table */}
                <div className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <h4 className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                      <Receipt className="w-4 h-4 text-slate-400" />
                      <span>{isVi ? 'Lịch Sử Hóa Đơn & Đơn Hàng' : 'Invoices & Orders History'}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {invoices.length} {isVi ? 'hóa đơn' : 'invoices'}
                    </span>
                  </div>

                  {invoicesLoading ? (
                    <div className="py-12 text-center text-xs text-slate-400 font-mono space-y-2">
                      <RefreshCw className="w-5 h-5 mx-auto animate-spin text-slate-400" />
                      <span>{isVi ? 'Đang tải lịch sử hóa đơn...' : 'Loading invoices...'}</span>
                    </div>
                  ) : invoices.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500 font-mono space-y-2">
                      <Receipt className="w-8 h-8 mx-auto text-slate-600 [html[data-theme='light']_&]:text-slate-400" />
                      <p>{isVi ? 'Chưa có lịch sử giao dịch nào.' : 'No invoices found.'}</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="text-slate-500 text-[10px] uppercase">
                            <th className="py-3 px-3">Mã đơn / ID</th>
                            <th className="py-3 px-3">Gói</th>
                            <th className="py-3 px-3">Số tiền</th>
                            <th className="py-3 px-3">Kênh</th>
                            <th className="py-3 px-3">Trạng thái</th>
                            <th className="py-3 px-3">Ngày tạo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((inv) => {
                            const isCompleted = inv.status === 'completed';
                            const isPending = inv.status === 'pending';
                            return (
                              <tr key={inv.id} className="hover:bg-white/[0.02] [html[data-theme='light']_&]:hover:bg-slate-50 transition-colors">
                                <td className="py-3.5 px-3 text-slate-200 [html[data-theme='light']_&]:text-slate-900 font-bold">
                                  {inv.metadata?.orderCode || inv.id.slice(0, 8)}
                                </td>
                                <td className="py-3.5 px-3 text-white [html[data-theme='light']_&]:text-slate-900 uppercase">
                                  {inv.tier_slug || 'PRO'}
                                </td>
                                <td className="py-3.5 px-3 text-white [html[data-theme='light']_&]:text-slate-900 font-bold">
                                  {Number(inv.amount || 0).toLocaleString('vi-VN')} {inv.currency || 'VND'}
                                </td>
                                <td className="py-3.5 px-3 text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-[11px]">
                                  {inv.metadata?.providerName || inv.provider || 'VietQR'}
                                </td>
                                <td className="py-3.5 px-3">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider ${isCompleted
                                    ? "bg-white/[0.08] text-white [html[data-theme='light']_&]:bg-slate-200 [html[data-theme='light']_&]:text-slate-900 border border-white/20 [html[data-theme='light']_&]:border-slate-300"
                                    : isPending
                                      ? "bg-white/[0.03] text-slate-400 [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:text-slate-600 border border-dashed border-white/20 [html[data-theme='light']_&]:border-slate-300"
                                      : "bg-transparent text-slate-500 border border-white/10"
                                    }`}>
                                    {inv.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-3 text-slate-500 text-[10px]">
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
