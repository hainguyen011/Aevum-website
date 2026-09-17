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
    <div className="fixed inset-0 z-[99999] desktop-auth-modal-backdrop flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-[560px] desktop-auth-modal-container rounded-2xl p-6 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 pr-6">
            <h3 className="text-2xl font-bold desktop-auth-modal-title tracking-tight leading-snug transition-colors">
              {isVi ? 'Xác thực thành công với Aevum OS!' : 'Successfully Authenticated with Aevum OS!'}
            </h3>
            <p className="text-sm desktop-auth-modal-desc leading-relaxed transition-colors">
              {isVi 
                ? 'Phiên làm việc và quyền lợi gói thành viên đã được đồng bộ hóa an toàn về ứng dụng máy tính. Bạn có thể quay trở lại Aevum OS để tiếp tục làm việc.'
                : 'Your session and membership tier have been securely synced to your desktop application. You can return to Aevum OS to continue.'}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg desktop-auth-modal-close flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Profile Summary Card */}
        <div className="desktop-auth-modal-card rounded-xl p-4 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-600 font-semibold text-xs flex items-center justify-center flex-shrink-0 overflow-hidden desktop-auth-avatar shadow-sm">
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
                <span className="desktop-auth-initials font-bold">{getInitials(displayName, displayEmail)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0 gap-0.5">
              <span className="text-sm font-semibold desktop-auth-user-name truncate transition-colors">{displayName}</span>
              <span className="text-xs font-mono desktop-auth-user-email truncate transition-colors">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-md desktop-auth-tier-badge whitespace-nowrap uppercase tracking-wider transition-colors">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons - Squircle Rounded without Box-Shadow */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-5 rounded-lg desktop-auth-btn-cancel font-medium text-sm transition-colors text-center"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleLetsGo}
            className="flex-[1.3] py-2.5 px-6 rounded-lg desktop-auth-btn-action font-semibold text-sm flex items-center justify-center gap-2 transition-all text-center"
          >
            <span>Let's Go</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopAuthSuccessModal;
