import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

/**
 * Modern Desktop Authentication Success Modal for Aevum Website
 * Flat matte design with widened layout, squircle buttons and zero box-shadows.
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
      {/* Widened Modal Container without Box-Shadow */}
      <div 
        className="relative w-full max-w-[560px] bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 pr-6">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {isVi ? 'Xác thực thành công với Aevum OS!' : 'Successfully Authenticated with Aevum OS!'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isVi 
                ? 'Phiên làm việc và quyền lợi gói thành viên đã được đồng bộ hóa an toàn về ứng dụng máy tính. Bạn có thể quay trở lại Aevum OS để tiếp tục làm việc.'
                : 'Your session and membership tier have been securely synced to your desktop application. You can return to Aevum OS to continue.'}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/5 flex-shrink-0"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Profile Summary Card */}
        <div className="bg-[#181818] border border-white/5 rounded-lg p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-600 text-white font-semibold text-xs flex items-center justify-center flex-shrink-0 border border-white/10 overflow-hidden">
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
            <div className="flex flex-col min-w-0 gap-0.5">
              <span className="text-sm font-semibold text-white truncate">{displayName}</span>
              <span className="text-xs text-slate-400 font-mono truncate">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 whitespace-nowrap uppercase tracking-wider">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons - Squircle Rounded without Box-Shadow */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm border border-white/10 transition-colors text-center"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleLetsGo}
            className="flex-[1.3] py-2.5 px-6 rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>Let's Go</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
