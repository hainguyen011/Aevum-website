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

  // HARD GUARDRAIL: Never render desktop modal if client is pipernet
  const isPiperNet = typeof window !== 'undefined' && (
    window.location.search.includes('pipernet') ||
    window.location.search.includes('pip_') ||
    window.location.href.includes('pipernet') ||
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aevum_auth_client') === 'pipernet')
  );

  if (!isOpen || isPiperNet) return null;

  const handleLetsGo = () => {
    if (isPiperNet) {
      onClose();
      return;
    }
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
    <div className="fixed inset-0 z-[99999] desktop-auth-modal-backdrop flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-[560px] desktop-auth-modal-container rounded-3xl p-6 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 pr-4">
            <h3 className="text-xl sm:text-2xl font-semibold desktop-auth-modal-title tracking-tight leading-snug transition-colors font-display">
              {isVi ? 'Xác thực thành công với Aevum OS!' : 'Successfully Authenticated with Aevum OS!'}
            </h3>
            <p className="text-base desktop-auth-modal-desc leading-[1.65] transition-colors">
              {isVi 
                ? 'Phiên làm việc và quyền lợi gói thành viên đã được đồng bộ hóa an toàn về ứng dụng máy tính. Bạn có thể quay trở lại Aevum OS để tiếp tục làm việc.'
                : 'Your session and membership tier have been securely synced to your desktop application. You can return to Aevum OS to continue.'}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full desktop-auth-modal-close flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Profile Summary Card */}
        <div className="desktop-auth-modal-card rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 [html[data-theme='light']_&]:bg-slate-900 font-semibold text-sm flex items-center justify-center flex-shrink-0 overflow-hidden desktop-auth-avatar">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt={displayName}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span className="desktop-auth-initials font-bold font-mono">{getInitials(displayName, displayEmail)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0 gap-0.5">
              <span className="text-base font-semibold desktop-auth-user-name truncate transition-colors">{displayName}</span>
              <span className="text-xs sm:text-sm font-mono desktop-auth-user-email truncate transition-colors">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full desktop-auth-tier-badge whitespace-nowrap uppercase tracking-wider transition-colors">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons — Ergonomic Rounded Pills */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-[48px] py-3 px-5 rounded-full desktop-auth-btn-cancel font-medium text-sm transition-colors text-center cursor-pointer"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleLetsGo}
            className="flex-[1.3] min-h-[48px] py-3 px-6 rounded-full desktop-auth-btn-action font-semibold text-sm flex items-center justify-center gap-2 transition-colors text-center cursor-pointer"
          >
            <span>Let's Go</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopAuthSuccessModal;
