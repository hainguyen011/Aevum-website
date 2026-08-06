import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, LogOut, CheckCircle, AlertTriangle, ArrowRight, Terminal, Cpu, Layers } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import logoImg from '../../assets/logos/AevumOS-transparent.png';

export const AuthModal = ({ isOpen, onClose, activeLang, user, userProfile }) => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'profile'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const isVi = activeLang === 'vi';

  // Password strength rules
  const pwdRules = [
    { id: 'len',     label: isVi ? 'Ít nhất 8 ký tự'         : 'At least 8 characters',      test: (p) => p.length >= 8 },
    { id: 'upper',  label: isVi ? 'Có chữ hoa (A-Z)'         : 'Uppercase letter (A-Z)',      test: (p) => /[A-Z]/.test(p) },
    { id: 'lower',  label: isVi ? 'Có chữ thường (a-z)'      : 'Lowercase letter (a-z)',      test: (p) => /[a-z]/.test(p) },
    { id: 'num',    label: isVi ? 'Có chữ số (0-9)'          : 'Number (0-9)',                 test: (p) => /[0-9]/.test(p) },
    { id: 'sym',    label: isVi ? 'Có ký tự đặc biệt (!@#$)' : 'Special character (!@#$...)', test: (p) => /[^A-Za-z0-9]/.test(p) },
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
      
      setMessage(isVi ? 'Đăng nhập thành công!' : 'Successfully signed in!');
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
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-mono"
      onClick={onClose}
    >
      {/* Outer Modal — wide split layout */}
      <div 
        className={`w-full ${isProfileMode ? 'max-w-md' : 'max-w-3xl'} bg-[#07080c] border border-white/10 flex overflow-hidden relative text-slate-100 transition-all duration-300`}
        style={{ minHeight: isProfileMode ? 'auto' : '520px' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ━━━━━━━ LEFT BRANDING PANEL ━━━━━━━ */}
        {!isProfileMode && (
          <div className="hidden md:flex flex-col justify-between w-[42%] shrink-0 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #050610 0%, #070c1a 40%, #030810 100%)',
              borderRight: '1px solid rgba(6,182,212,0.12)',
            }}
          >
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
            />
            {/* Grid pattern */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Top corner mark */}
            <div className="relative z-10 p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="Aevum OS" className="w-10 h-10 object-contain opacity-90" />
                <span className="text-sm text-white font-bold uppercase tracking-[0.2em]">Aevum OS</span>
              </div>
              <div className="w-8 h-px bg-cyan-500/30" />
            </div>

            {/* Center branding content */}
            <div className="relative z-10 px-7 py-4 flex flex-col gap-5">
              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">
                  {mode === 'signin'
                    ? (isVi ? 'Chào mừng\ntrở lại.' : 'Welcome\nback.')
                    : (isVi ? 'Tham gia\ncùng chúng tôi.' : 'Join\nthe system.')}
                </h2>
                <p className="mt-3 text-[11px] text-slate-500 leading-relaxed tracking-wide">
                  {mode === 'signin'
                    ? (isVi ? 'Đăng nhập để truy cập vào hệ sinh thái Aevum OS và đồng bộ thiết bị của bạn.' : 'Sign in to access the Aevum OS ecosystem and sync your devices.')
                    : (isVi ? 'Tạo tài khoản để mở khóa trải nghiệm đầy đủ trên nền tảng Aevum OS.' : 'Create an account to unlock the full Aevum OS platform experience.')}
                </p>
              </div>

            </div>

            {/* Bottom build tag */}
            <div className="relative z-10 px-7 py-5">
              <div className="text-[9px] text-slate-600 uppercase tracking-widest">
                BUILD 2025 · RESTRICTED ACCESS
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━ RIGHT FORM PANEL ━━━━━━━ */}
        <div className="flex-1 flex flex-col relative z-10 min-w-0">
          {/* Titlebar */}
          <div className="w-full bg-white text-black py-2 px-4 text-left text-[11px] font-bold uppercase tracking-widest flex items-center justify-between select-none shrink-0">
            <span className="flex items-center gap-2">
              {isProfileMode
                ? (isVi ? 'Tài khoản' : 'User Profile')
                : (isVi ? 'Hệ thống xác thực' : 'Auth Terminal')}
            </span>
            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="text-black hover:text-red-600 transition-colors cursor-pointer flex items-center justify-center p-0.5"
            >
              <X size={15} />
            </button>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-7">
            {/* Header */}
            {!isProfileMode && (
              <div className="mb-7">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {mode === 'signin' && (isVi ? 'Đăng nhập' : 'Sign in')}
                  {mode === 'signup' && (isVi ? 'Tạo tài khoản' : 'Create account')}
                  {mode === 'forgot' && (isVi ? 'Quên mật khẩu' : 'Reset password')}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 tracking-wider">
                  {mode === 'signin' && (isVi ? 'Nhập thông tin đăng nhập của bạn bên dưới.' : 'Enter your credentials below.')}
                  {mode === 'signup' && (isVi ? 'Điền đầy đủ thông tin để tạo tài khoản.' : 'Fill in your details to get started.')}
                  {mode === 'forgot' && (isVi ? 'Chúng tôi sẽ gửi link đặt lại mật khẩu.' : 'We\'ll send a password reset link.')}
                </p>
              </div>
            )}

            {/* Profile header */}
            {isProfileMode && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {isVi ? 'Tài khoản của bạn' : 'Your Account'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 tracking-wider">
                  {isVi ? 'Thông tin phiên làm việc hiện tại' : 'Active session details'}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 bg-red-950/20 border border-red-500/30 p-3 flex items-start gap-2.5 text-xs text-red-400">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="mb-5 bg-emerald-950/20 border border-emerald-500/30 p-3 flex items-start gap-2.5 text-xs text-emerald-400">
                <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {/* ── PROFILE MODE ── */}
            {isProfileMode && user && (() => {
              const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
              const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0];
              const initials = displayName?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

              return (
                <div className="flex flex-col items-center gap-5 py-2">
                  {/* Avatar */}
                  <div className="relative">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 text-xl font-bold tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        {initials}
                      </div>
                    )}
                    {/* Online indicator */}
                    <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07080c]" />
                  </div>

                  {/* Name & email */}
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <p className="text-base font-bold text-white tracking-wide">{displayName}</p>
                      <span className="text-xs text-white/70 font-mono font-normal">
                        ({userProfile?.role === 'admin' ? 'Admin' : 'user'})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      <span className="text-[9px] text-emerald-400 uppercase tracking-widest">
                        {isVi ? 'Đang hoạt động' : 'Active session'}
                      </span>
                    </div>
                  </div>

                  {/* Sign out */}
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 border border-red-500/40 bg-transparent hover:bg-red-500 hover:text-white text-red-400 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer mt-2"
                  >
                    <LogOut size={14} />
                    {isVi ? 'Đăng xuất' : 'Sign Out'}
                  </button>
                </div>
              );
            })()}


            {/* ── FORGOT MODE ── */}
            {mode === 'forgot' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-[0.18em] block">{isVi ? 'Email đăng ký' : 'Registered Email'}</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@aevum.ai.vn"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0c0d14] border border-white/10 focus:border-cyan-500/60 outline-none text-slate-200 placeholder-slate-700 pl-10 pr-4 py-3 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (isVi ? 'Đang gửi...' : 'Sending...') : (isVi ? 'Gửi yêu cầu' : 'Send Reset Link')}
                  <ArrowRight size={13} />
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                  >
                    ← {isVi ? 'Quay lại đăng nhập' : 'Back to sign in'}
                  </button>
                </div>
              </form>
            )}

            {/* ── SIGN IN / SIGN UP MODE ── */}
            {(mode === 'signin' || mode === 'signup') && (
              <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">

                {/* Google OAuth — shown first for easier access */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-white py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.568 0-6.46-2.892-6.46-6.46s2.892-6.46 6.46-6.46c1.635 0 3.125.6 4.28 1.583l3.07-3.07C19.16 2.183 15.89 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.468-.22-2.21H12.24z" />
                  </svg>
                  {isVi ? 'Tiếp tục với Google' : 'Continue with Google'}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px bg-white/[0.06] flex-1" />
                  <span className="text-[9px] text-slate-600 uppercase tracking-widest">{isVi ? 'hoặc dùng email' : 'or use email'}</span>
                  <div className="h-px bg-white/[0.06] flex-1" />
                </div>

                {/* Full name (Sign up only) */}
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.18em] block">{isVi ? 'Họ và tên' : 'Full Name'}</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0c0d14] border border-white/10 focus:border-cyan-500/60 outline-none text-slate-200 placeholder-slate-700 pl-10 pr-4 py-3 text-xs transition-all duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-[0.18em] block">Email</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@domain.com"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0c0d14] border border-white/10 focus:border-cyan-500/60 outline-none text-slate-200 placeholder-slate-700 pl-10 pr-4 py-3 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.18em] block">{isVi ? 'Mật khẩu' : 'Password'}</label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[9px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                      >
                        {isVi ? 'Quên mật khẩu?' : 'Forgot?'}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-[#0c0d14] border border-white/10 focus:border-cyan-500/60 outline-none text-slate-200 placeholder-slate-700 pl-10 pr-10 py-3 text-xs transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>

                  {/* Password strength — signup only */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {/* Strength bar */}
                      <div className="flex gap-1 h-0.5">
                        {pwdRules.map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-full transition-all duration-300"
                            style={{
                              background: i < pwdStrength
                                ? pwdStrength <= 2 ? '#ef4444'
                                  : pwdStrength <= 3 ? '#f59e0b'
                                  : pwdStrength <= 4 ? '#06b6d4'
                                  : '#10b981'
                                : 'rgba(255,255,255,0.06)'
                            }}
                          />
                        ))}
                      </div>
                      {/* Checklist */}
                      <ul className="space-y-1 pt-1">
                        {pwdRules.map((rule) => {
                          const passed = rule.test(password);
                          return (
                            <li key={rule.id} className="flex items-center gap-1.5">
                              <span className={`text-[9px] transition-colors duration-200 ${passed ? 'text-emerald-400' : 'text-slate-600'}`}>
                                {passed ? '✓' : '○'}
                              </span>
                              <span className={`text-[9px] tracking-wide transition-colors duration-200 ${passed ? 'text-slate-400' : 'text-slate-600'}`}>
                                {rule.label}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-black py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (isVi ? 'Đang xử lý...' : 'Processing...') : (
                    mode === 'signin'
                      ? (isVi ? 'Đăng nhập' : 'Sign In')
                      : (isVi ? 'Tạo tài khoản' : 'Create Account')
                  )}
                  <ArrowRight size={13} />
                </button>

                {/* Switch mode link */}
                <div className="text-center pt-1 text-xs">
                  {mode === 'signin' ? (
                    <span className="text-slate-500">
                      {isVi ? 'Chưa có tài khoản? ' : "Don't have an account? "}
                      <button
                        type="button"
                        onClick={() => setMode('signup')}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors cursor-pointer"
                      >
                        {isVi ? 'Đăng ký' : 'Sign up'}
                      </button>
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      {isVi ? 'Đã có tài khoản? ' : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={() => setMode('signin')}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors cursor-pointer"
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
