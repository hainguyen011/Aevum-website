import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Laptop } from 'lucide-react';
import aevumLogo from '../../assets/logos/AevumOS-transparent.png';

/**
 * Modern Desktop Authentication Success Modal for Aevum Website
 * Replaces old toast notification with a sleek, glassmorphic modal popup
 */
export const DesktopAuthSuccessModal = ({ isOpen, onClose, activeLang, user, userProfile }) => {
  const isVi = activeLang === 'vi';

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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

  const handleLetsGo = () => {
    // Attempt to invoke deep link protocol if registered
    try {
      window.location.href = 'aevum://auth-success';
    } catch (e) {
      // Ignored
    }
    onClose();
  };

  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) return email.substring(0, 2).toUpperCase();
    return 'AE';
  };

  const getTierDisplay = (tier) => {
    if (tier === 'ENTERPRISE') return 'Enterprise Founder';
    if (tier === 'PRO') return 'Pro Developer';
    if (tier === 'PIONEER') return 'Pioneer';
    return 'Community Starter';
  };

  const displayName = userProfile?.full_name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Developer');
  const displayEmail = user?.email || userProfile?.email || '';
  const tier = userProfile?.membership_tier || 'ENTERPRISE';

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)] flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <ShieldCheck size={22} className="text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/90 font-semibold">
                {isVi ? 'Đồng bộ Aevum OS' : 'Aevum OS Handoff'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[12px] text-slate-400 font-medium">
                  {isVi ? 'Đã kết nối an toàn' : 'Securely Connected'}
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/5"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Headline & Description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isVi ? 'Xác thực thành công với Aevum OS!' : 'Successfully Authenticated with Aevum OS!'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isVi
              ? 'Phiên làm việc và quyền lợi tài khoản đã được đồng bộ hóa an toàn về ứng dụng máy tính. Bạn có thể quay trở lại Aevum OS để tiếp tục trải nghiệm.'
              : 'Your session and membership tier have been securely synced to your desktop application. You can return to Aevum OS to continue.'}
          </p>
        </div>

        {/* User Profile Summary Card */}
        <div className="bg-[#181818] border border-white/5 rounded-xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-600 text-white font-semibold text-xs flex items-center justify-center flex-shrink-0 shadow-sm border border-white/15">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={displayName}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span>{getInitials(displayName, displayEmail)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">{displayName}</span>
              <span className="text-xs text-slate-400 font-mono truncate">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 whitespace-nowrap uppercase tracking-wider">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs border border-white/10 transition-all duration-150 text-center"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleLetsGo}
            className="flex-[1.4] py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Let's Go</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
