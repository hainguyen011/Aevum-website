import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Lock, User, Eye, EyeOff, Sparkles, LogOut, CheckCircle, 
  AlertTriangle, ArrowRight, Zap, ShieldCheck 
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import { MembershipBadge } from './ui/MembershipBadge';
import logoImg from '../../assets/logos/AevumOS-transparent.png';

import earthImg from '../../assets/earth2.png';

export const AuthModal = ({ isOpen, onClose, activeLang, user, userProfile }) => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'profile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [entitlements, setEntitlements] = useState(null);

  const isVi = activeLang === 'vi';

  // Password strength rules
  const pwdRules = [
    { id: 'len',   label: isVi ? 'Ít nhất 8 ký tự'         : 'At least 8 characters',      test: (p) => p.length >= 8 },
    { id: 'upper', label: isVi ? 'Có chữ hoa (A-Z)'         : 'Uppercase letter (A-Z)',      test: (p) => /[A-Z]/.test(p) },
    { id: 'lower', label: isVi ? 'Có chữ thường (a-z)'      : 'Lowercase letter (a-z)',      test: (p) => /[a-z]/.test(p) },
    { id: 'num',   label: isVi ? 'Có chữ số (0-9)'          : 'Number (0-9)',                 test: (p) => /[0-9]/.test(p) },
    { id: 'sym',   label: isVi ? 'Có ký tự đặc biệt (!@#$)' : 'Special character (!@#$...)', test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];
  const pwdStrength = pwdRules.filter(r => r.test(password)).length;
  const isPwdValid  = pwdStrength === pwdRules.length;

  // Synchronize modal mode with user session
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError('');
      setMessage('');
      if (user) {
        setMode('profile');
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.access_token) {
            MembershipService.getCurrentEntitlements(session.access_token).then(data => {
              if (data) setEntitlements(data);
            });
          }
        });
      } else {
        setMode('signin');
      }
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen, user]);


  if (!isOpen) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      const desktopNonce = sessionStorage.getItem('aevum_desktop_nonce');
      if (desktopNonce) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            const channel = supabase.channel(`auth-handoff:${desktopNonce}`);
            channel.subscribe((status) => {
              if (status === 'SUBSCRIBED') {
                channel.send({
                  type: 'broadcast',
                  event: 'session',
                  payload: {
                    access_token: session.access_token,
                    refresh_token: session.refresh_token,
                    user: session.user,
                  },
                });
                setTimeout(() => channel.unsubscribe(), 5000);
              }
            });
          }
        });
      }

      setMessage(isVi ? 'Đăng nhập thành công! Đang kết nối...' : 'Successfully signed in! Connecting...');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || (isVi ? 'Đăng nhập thất bại. Vui lòng kiểm tra lại.' : 'Sign in failed. Please check credentials.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!isPwdValid) {
      setError(isVi ? 'Mật khẩu chưa đáp ứng yêu cầu bảo mật.' : 'Password does not meet security requirements.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (signUpError) throw signUpError;

      if (data?.user && data.user.identities?.length === 0) {
        setError(isVi ? 'Email này đã được đăng ký.' : 'This email is already registered.');
      } else {
        setMessage(isVi 
          ? 'Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác nhận tài khoản.' 
          : 'Registration successful! Please check your email to confirm your account.'
        );
      }
    } catch (err) {
      setError(err.message || (isVi ? 'Đăng ký thất bại. Vui lòng thử lại.' : 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (resetError) throw resetError;

      setMessage(isVi 
        ? 'Email thiết lập lại mật khẩu đã được gửi.' 
        : 'Password reset email has been sent.'
      );
    } catch (err) {
      setError(err.message || (isVi ? 'Gửi email thất bại.' : 'Failed to send password reset email.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err.message || (isVi ? 'Kết nối Google thất bại.' : 'Failed to connect Google.'));
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      onClose();
    } catch (err) {
      setError(err.message || 'Error signing out.');
    } finally {
      setLoading(false);
    }
  };

  const isProfileMode = mode === 'profile';

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-6 overflow-y-auto animate-fadeIn font-mono"
      onClick={onClose}
    >
      {/* Outer Modal — Sharp Corners, No Box Shadow, Flat Architecture */}
      <div 
        className={`w-full ${isProfileMode ? 'max-w-md' : 'max-w-4xl'} bg-[#07080c] border border-white/10 rounded-none flex flex-col md:flex-row overflow-hidden relative text-slate-100 transition-all duration-200 my-auto`}
        style={{ minHeight: isProfileMode ? 'auto' : '580px' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ━━━━━━━ LEFT BRANDING PANEL (COSMIC EARTH THEME) ━━━━━━━ */}
        {!isProfileMode && (
          <div className="auth-cosmic-panel hidden md:flex flex-col justify-between w-[44%] shrink-0 relative overflow-hidden bg-[#04060d] border-r border-white/10 p-7 select-none rounded-none">
            
            {/* Background Earth Image Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={earthImg} 
                alt="Earth Horizon" 
                className="w-full h-full object-cover object-bottom opacity-85 scale-105"
              />
              {/* Gradients to blend Earth into the dark space and edges */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#04060d] via-[#04060d]/50 to-[#04060d]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(14,165,233,0.25)_0%,transparent_70%)]" />
              {/* Cyber Grid */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(14,165,233,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(14,165,233,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '28px 28px',
                }}
              />
            </div>

            {/* Top Branding */}
            <div className="relative z-10 flex items-center gap-3">
              <img src={logoImg} alt="Aevum OS" className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold text-white uppercase tracking-[0.22em]">Aevum OS</span>
            </div>

            {/* Center Branding Headline & Value Props */}
            <div className="relative z-10 my-auto py-5 flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">
                  {mode === 'signin' && (isVi ? 'Không gian Kỹ sư\nAgentic AI.' : 'Next-Gen Agentic\nEngineering.')}
                  {mode === 'signup' && (isVi ? 'Khởi tạo\nBiệt đội Agent.' : 'Forge Your\nAgent Swarm.')}
                  {mode === 'forgot' && (isVi ? 'Khôi phục\nQuyền truy cập.' : 'Access\nRecovery.')}
                </h2>
                <p className="mt-2.5 text-xs text-slate-300/80 leading-relaxed">
                  {mode === 'signin' && (isVi ? 'Đăng nhập để đồng bộ Living Memory Vault và điều phối mạng lưới AI Agent xuyên suốt dự án.' : 'Sign in to access your Living Memory Vault and orchestrate autonomous AI Agent swarms.')}
                  {mode === 'signup' && (isVi ? 'Mở khóa toàn diện hệ sinh thái Aevum OS — từ cấu trúc Plan tự động đến suy luận đa tác nhân.' : 'Unlock the full Aevum OS ecosystem — from automated plan governance to multi-agent intelligence.')}
                  {mode === 'forgot' && (isVi ? 'Nhận liên kết khôi phục bảo mật để tiếp tục phiên làm việc trên Aevum OS.' : 'Receive a secure reset link to resume your mission on Aevum OS.')}
                </p>
              </div>
            </div>

            {/* Bottom Footer Tag */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-widest pt-3 border-t border-white/[0.08]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-400" />
                BUILD 2026 · SYSTEM ONLINE
              </span>
              <span className="text-slate-400">I2FLABS VIETNAM</span>
            </div>
          </div>
        )}

        {/* ━━━━━━━ RIGHT FORM PANEL (HIGH-TECH AUTH TERMINAL) ━━━━━━━ */}
        <div className="flex-1 flex flex-col relative z-10 min-w-0 bg-[#07080c] rounded-none">
          
          {/* Top Titlebar & Controls - Transparent */}
          <div className="w-full py-4 px-6 sm:px-8 flex items-center justify-between select-none shrink-0 bg-transparent">
            {/* Segmented Mode Switcher (Sign in / Sign up) */}
            {!isProfileMode && mode !== 'forgot' ? (
              <div className="flex items-center p-0.5 bg-white/[0.04] border border-white/10 rounded-none">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setError(''); setMessage(''); }}
                  className={`px-4 py-1.5 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    mode === 'signin'
                      ? 'auth-tab-active bg-[#0284c7] !text-white hover:bg-[#0369a1]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isVi ? 'Đăng nhập' : 'Sign in'}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                  className={`px-4 py-1.5 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    mode === 'signup'
                      ? 'auth-tab-active bg-[#0284c7] !text-white hover:bg-[#0369a1]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isVi ? 'Tạo tài khoản' : 'Sign up'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">
                <span className="w-2 h-2 rounded-none bg-cyan-400" />
                {isProfileMode 
                  ? (isVi ? 'Tài khoản người dùng' : 'User Profile') 
                  : (isVi ? 'Khôi phục mật khẩu' : 'Password Reset')}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="w-7 h-7 rounded-none bg-white/[0.04] hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all duration-150 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Form Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            
            {/* Header Titles */}
            {!isProfileMode && (
              <div className="mb-5">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {mode === 'signin' && (isVi ? 'Đăng nhập Aevum OS' : 'Sign in to Aevum OS')}
                  {mode === 'signup' && (isVi ? 'Tạo tài khoản mới' : 'Create an Account')}
                  {mode === 'forgot' && (isVi ? 'Đặt lại mật khẩu' : 'Reset your password')}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'signin' && (isVi ? 'Nhập thông tin đăng nhập của bạn để tiếp tục.' : 'Enter your credentials to access the workspace.')}
                  {mode === 'signup' && (isVi ? 'Điền đầy đủ thông tin để khởi tạo tài khoản kỹ sư.' : 'Fill in your details to start engineering with AI agents.')}
                  {mode === 'forgot' && (isVi ? 'Chúng tôi sẽ gửi liên kết bảo mật để đặt lại mật khẩu.' : 'We will send a secure reset link to your email.')}
                </p>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="mb-4 bg-red-950/30 border border-red-500/40 rounded-none p-3 flex items-start gap-2.5 text-xs text-red-300 animate-fadeIn">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {message && (
              <div className="mb-4 bg-emerald-950/30 border border-emerald-500/40 rounded-none p-3 flex items-start gap-2.5 text-xs text-emerald-300 animate-fadeIn">
                <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{message}</span>
              </div>
            )}

            {/* ━━━━━━━━━━━ PROFILE MODE ━━━━━━━━━━━ */}
            {isProfileMode && user && (() => {
              const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
              const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0];
              const initials = displayName?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

              const tierSlug = (entitlements?.tier || (entitlements?.isPro ? 'pro' : 'community')).toLowerCase();
              return (
                <div className="flex flex-col items-center gap-5 py-3">
                  {/* Clean Soft Rounded Avatar */}
                  <div className="w-20 h-20 rounded-[8px] overflow-hidden flex items-center justify-center shrink-0">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-white text-xl font-bold tracking-wider font-mono">
                        {initials}
                      </div>
                    )}
                  </div>







                  {/* User Information Card */}
                  <div className="w-full bg-white/[0.03] border border-white/10 rounded-none p-4 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-base font-bold text-white tracking-wide">{displayName}</p>
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-semibold uppercase bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        {userProfile?.role === 'admin' ? 'Admin' : 'Developer'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{user.email}</p>

                    {/* Membership Tier Badge */}
                    <div className="pt-1 flex flex-col items-center gap-1.5">
                      <MembershipBadge
                        tier={entitlements?.tier || (entitlements?.isPro ? 'pro' : 'community')}
                        isTrial={entitlements?.isTrial}
                        trialDaysRemaining={entitlements?.trialDaysRemaining}
                        size="md"
                      />

                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-none uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                        {isVi ? 'Đã liên kết Aevum Cloud' : 'Linked to Aevum Cloud'}
                      </span>
                    </div>
                  </div>



                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 border border-red-500/40 bg-red-950/20 hover:bg-red-500 hover:text-white text-red-400 py-3 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer"
                  >
                    <LogOut size={14} />
                    {isVi ? 'Đăng xuất tài khoản' : 'Sign Out Account'}
                  </button>
                </div>
              );
            })()}

            {/* ━━━━━━━━━━━ FORGOT PASSWORD MODE ━━━━━━━━━━━ */}
            {mode === 'forgot' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.16em] block">
                    {isVi ? 'Email đăng ký' : 'Registered Email'}
                  </label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/10 focus-within:border-[#0284c7] rounded-none overflow-hidden transition-all duration-150">
                    <Mail size={14} className="absolute left-3.5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="developer@aevum.ai"
                      className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn-submit w-full bg-[#0284c7] hover:bg-[#0369a1] active:brightness-75 !text-white py-3 px-4 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (isVi ? 'Đang gửi link...' : 'Sending Link...') : (isVi ? 'Gửi liên kết khôi phục' : 'Send Reset Link')}
                  <ArrowRight size={14} />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-xs text-slate-400 hover:text-sky-400 transition-colors uppercase tracking-wider font-mono cursor-pointer"
                  >
                    ← {isVi ? 'Quay lại đăng nhập' : 'Back to sign in'}
                  </button>
                </div>
              </form>
            )}

            {/* ━━━━━━━━━━━ SIGN IN / SIGN UP MODE ━━━━━━━━━━━ */}
            {(mode === 'signin' || mode === 'signup') && (
              <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">

                {/* Google OAuth Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:brightness-95 text-slate-200 hover:text-white py-3 px-4 rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-3"
                >
                  {/* Official Google 4-color SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.39 7.36 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.29 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>{isVi ? 'Tiếp tục với Google' : 'Continue with Google'}</span>
                </button>

                {/* Divider with Tech Label */}
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    {isVi ? 'hoặc email' : 'or email'}
                  </span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Full Name Input (Sign up only) */}
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.16em] block">
                      {isVi ? 'Họ và tên' : 'Full Name'}
                    </label>
                      <div className="relative flex items-center bg-white/[0.03] border border-white/10 focus-within:border-[#0284c7] rounded-none overflow-hidden transition-all duration-150">
                      <User size={14} className="absolute left-3.5 text-slate-500" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.16em] block">
                    Email
                  </label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/10 focus-within:border-[#0284c7] rounded-none overflow-hidden transition-all duration-150">
                    <Mail size={14} className="absolute left-3.5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="developer@aevum.ai"
                      className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.16em] block">
                      {isVi ? 'Mật khẩu' : 'Password'}
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] font-mono text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        {isVi ? 'Quên mật khẩu?' : 'Forgot?'}
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/10 focus-within:border-[#0284c7] rounded-none overflow-hidden transition-all duration-150">
                    <Lock size={14} className="absolute left-3.5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 pl-10 pr-10 py-3 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator (Sign up only) */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="mt-2.5 p-3 rounded-none bg-white/[0.02] border border-white/10 space-y-2">
                      {/* Strength Bar */}
                      <div className="flex gap-1.5 h-1">
                        {pwdRules.map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-none transition-all duration-200"
                            style={{
                              background: i < pwdStrength
                                ? pwdStrength <= 2 ? '#ef4444'
                                  : pwdStrength <= 3 ? '#f59e0b'
                                  : pwdStrength <= 4 ? '#0ea5e9'
                                  : '#10b981'
                                : 'rgba(255,255,255,0.08)'
                            }}
                          />
                        ))}
                      </div>
                      {/* Rules Checklist */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1 font-mono">
                        {pwdRules.map((rule) => {
                          const passed = rule.test(password);
                          return (
                            <div key={rule.id} className="flex items-center gap-1.5">
                              <span className={`text-[10px] transition-colors duration-150 ${passed ? 'text-emerald-400' : 'text-slate-600'}`}>
                                {passed ? '✓' : '○'}
                              </span>
                              <span className={`text-[9px] tracking-wide transition-colors duration-150 ${passed ? 'text-slate-300' : 'text-slate-500'}`}>
                                {rule.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Submit Action Button - Soothing Electron Blue */}
                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn-submit w-full bg-[#0284c7] hover:bg-[#0369a1] active:brightness-75 !text-white py-3.5 px-5 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isVi ? 'Đang xử lý...' : 'Processing...'}</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {mode === 'signin'
                            ? (isVi ? 'Đăng nhập hệ thống' : 'Sign In to System')
                            : (isVi ? 'Tạo tài khoản Aevum' : 'Create Aevum Account')}
                        </span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </span>
                </button>

                {/* Mode Switcher Link at Bottom */}
                <div className="text-center pt-2 text-xs">
                  {mode === 'signin' ? (
                    <span className="text-slate-400">
                      {isVi ? 'Chưa có tài khoản? ' : "Don't have an account? "}
                      <button
                        type="button"
                        onClick={() => { setMode('signup'); setError(''); setMessage(''); }}
                        className="text-sky-400 hover:text-sky-300 font-semibold hover:underline transition-colors cursor-pointer"
                      >
                        {isVi ? 'Đăng ký ngay' : 'Sign up now'}
                      </button>
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      {isVi ? 'Đã có tài khoản? ' : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={() => { setMode('signin'); setError(''); setMessage(''); }}
                        className="text-sky-400 hover:text-sky-300 font-semibold hover:underline transition-colors cursor-pointer"
                      >
                        {isVi ? 'Đăng nhập' : 'Sign in'}
                      </button>
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
