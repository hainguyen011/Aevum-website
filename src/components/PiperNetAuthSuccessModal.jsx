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
    <div className="fixed inset-0 z-[99999] bg-black/75 [html[data-theme='light']_&]:bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      {/* Modal Container: Flat Obsidian Minimalist */}
      <div 
        className="relative w-full max-w-[520px] bg-[#07090D] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col gap-5 text-white [html[data-theme='light']_&]:text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white [html[data-theme='light']_&]:text-slate-900 font-display">
            {isVi ? 'Xác thực thành công với PiperNet' : 'Successfully Connected to PiperNet'}
          </h3>
          <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-[1.65]">
            {isVi 
              ? 'Tài khoản Aevum của bạn đã được kết nối với PiperNet Hub.'
              : 'Your Aevum account has been connected to PiperNet Hub.'}
          </p>
        </div>

        {/* User Profile Summary Card: Flat Minimalist */}
        <div className="bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white/10 [html[data-theme='light']_&]:bg-slate-900 text-xs font-semibold font-mono flex items-center justify-center text-white overflow-hidden flex-shrink-0">
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
              <span className="text-base font-medium text-white [html[data-theme='light']_&]:text-slate-900 truncate">{displayName}</span>
              <span className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 truncate">{displayEmail}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs font-mono text-white [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300 px-3 py-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-white">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons: Clean Minimalist Pills */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] px-5 py-3 rounded-full text-sm font-medium text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleReturnToHub}
            className="min-h-[48px] px-6 py-3 rounded-full text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black transition-colors cursor-pointer"
          >
            {isVi ? 'Quay lại PiperNet' : 'Return to PiperNet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiperNetAuthSuccessModal;

