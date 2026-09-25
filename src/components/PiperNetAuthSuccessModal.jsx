import React, { useEffect } from 'react';

/**
 * Minimalist Authentication Success Modal for PiperNet Hub
 * Clean, flat, elegant dark theme without icons, box-shadows, or flashy glow.
 * User manually clicks "Quay lại PiperNet" to focus Hub and close tab.
 */
export const PiperNetAuthSuccessModal = ({ 
  isOpen, 
  onClose, 
  activeLang = 'vi', 
  user, 
  userProfile, 
  userSession = null,
  returnUrl = null 
}) => {
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

  // Gửi session ngay lập tức tới opener khi modal mở
  useEffect(() => {
    if (!isOpen) return;
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage({
          type: 'PIPERNET_AUTH_SUCCESS',
          payload: {
            access_token: userSession?.access_token,
            refresh_token: userSession?.refresh_token,
            user: user,
          },
        }, '*');
      } catch (e) {
        console.warn('[PiperNetAuth] Direct postMessage error:', e);
      }
    }
  }, [isOpen, user, userSession]);

  if (!isOpen) return null;

  const handleReturnToHub = () => {
    // 1. Gửi tín hiệu và focus lại tab PiperNet Hub ban đầu
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage({
          type: 'PIPERNET_AUTH_SUCCESS',
          payload: {
            access_token: userSession?.access_token,
            refresh_token: userSession?.refresh_token,
            user: user,
          },
        }, '*');
        window.opener.focus();
      } catch (e) {
        console.warn('[PiperNetAuth] Failed to focus opener:', e);
      }
    }

    // 2. Đóng tab aevum.ai.vn này để quay lại PiperNet Hub
    try {
      window.close();
    } catch (e) {
      console.warn('[PiperNetAuth] window.close() failed:', e);
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
    return 'PN';
  };

  const getTierDisplay = (tier) => {
    if (tier === 'ENTERPRISE') return 'Enterprise Founder';
    if (tier === 'PRO') return 'Pro Developer';
    if (tier === 'PIONEER') return 'Pioneer';
    return 'Community Starter';
  };

  const displayName = userProfile?.full_name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'PiperNet Node');
  const displayEmail = user?.email || userProfile?.email || '';
  const tier = userProfile?.membership_tier || 'ENTERPRISE';

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Container: Flat, Minimalist, No Shadow */}
      <div 
        className="relative w-full max-w-[480px] bg-[#121316] border border-white/10 rounded-xl p-6 flex flex-col gap-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {isVi ? 'Xác thực thành công với PiperNet' : 'Successfully Connected to PiperNet'}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {isVi 
              ? 'Tài khoản Aevum của bạn đã được kết nối với PiperNet Hub.'
              : 'Your Aevum account has been connected to PiperNet Hub.'}
          </p>
        </div>

        {/* User Profile Summary Card: Flat Minimalist */}
        <div className="bg-[#18191d] border border-white/5 rounded-lg p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-xs font-semibold flex items-center justify-center text-white overflow-hidden flex-shrink-0">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span>{getInitials(displayName, displayEmail)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">{displayName}</span>
              <span className="text-xs text-zinc-400 truncate">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs text-zinc-400 border border-white/10 px-2.5 py-1 rounded bg-white/[0.02]">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons: Clean Minimalist, Zero Glow */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleReturnToHub}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            {isVi ? 'Quay lại PiperNet' : 'Return to PiperNet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiperNetAuthSuccessModal;

