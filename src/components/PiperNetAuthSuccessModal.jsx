import React, { useEffect } from 'react';
import { X, ArrowRight, ExternalLink, Radio, CheckCircle2 } from 'lucide-react';

/**
 * Dedicated Authentication Success Modal for PiperNet Hub
 * Designed with PiperNet Cyberpunk & Electronic Cyan aesthetic (#00e5ff)
 */
export const PiperNetAuthSuccessModal = ({ 
  isOpen, 
  onClose, 
  activeLang = 'vi', 
  user, 
  userProfile, 
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

  if (!isOpen) return null;

  const [countdown, setCountdown] = React.useState(2);

  const handleReturnToHub = () => {
    // 1. Nếu mở từ tab khác qua window.open, gửi tín hiệu và focus lại tab Chrome đó
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage({ type: 'PIPERNET_AUTH_SUCCESS' }, '*');
        window.opener.focus();
        window.close();
        return;
      } catch (e) {
        console.warn('[PiperNetAuth] Failed to focus opener:', e);
      }
    }

    // 2. Chuyển hướng tab về returnUrl của PiperNet Hub
    if (returnUrl) {
      try {
        const decoded = decodeURIComponent(returnUrl);
        window.location.href = decoded;
        return;
      } catch (e) {
        window.location.href = returnUrl;
        return;
      }
    }

    // 3. Fallback: tự đóng tab hiện tại
    try {
      window.close();
    } catch (e) {}
    onClose();
  };

  // Tự động quay lại tab PiperNet Hub sau thời gian đếm ngược
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleReturnToHub();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, returnUrl]);

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
    <div className="fixed inset-0 z-[99999] pipernet-auth-modal-backdrop flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-[560px] pipernet-auth-modal-container rounded-2xl p-6 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with PiperNet Badge & Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-2">
              <span className="pipernet-auth-tag flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase">
                <Radio size={12} className="animate-pulse text-[#00e5ff]" />
                PiperNet Hub Mesh
              </span>
              <span className="pipernet-auth-mesh-ready flex items-center gap-1 text-[11px] font-mono text-[#10b981]">
                <CheckCircle2 size={12} />
                Synced
              </span>
            </div>

            <h3 className="text-2xl font-bold pipernet-auth-modal-title tracking-tight leading-snug transition-colors">
              {isVi ? 'Xác thực thành công với PiperNet!' : 'Successfully Connected to PiperNet!'}
            </h3>
            <p className="text-sm pipernet-auth-modal-desc leading-relaxed transition-colors">
              {isVi 
                ? 'Phiên làm việc Aevum và API Key của bạn đã được kết nối an toàn với PiperNet Hub. Đang tự động quay lại tab PiperNet Hub...'
                : 'Your Aevum session and API Key credentials have been securely synced to PiperNet Hub. Returning to PiperNet Hub tab...'}
            </p>
            <span className="text-xs font-mono text-[#00e5ff] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              {isVi ? `Tự động chuyển về PiperNet sau ${countdown} giây` : `Auto redirecting to PiperNet in ${countdown}s`}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg pipernet-auth-modal-close flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Profile Summary Card */}
        <div className="pipernet-auth-modal-card rounded-xl p-4 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#00e5ff] via-[#0284c7] to-[#1e1b4b] font-semibold text-xs flex items-center justify-center flex-shrink-0 overflow-hidden pipernet-auth-avatar shadow-sm">
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
                <span className="pipernet-auth-initials font-bold text-white">{getInitials(displayName, displayEmail)}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0 gap-0.5">
              <span className="text-sm font-semibold pipernet-auth-user-name truncate transition-colors">{displayName}</span>
              <span className="text-xs font-mono pipernet-auth-user-email truncate transition-colors">{displayEmail}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-md pipernet-auth-tier-badge whitespace-nowrap uppercase tracking-wider transition-colors">
              {getTierDisplay(tier)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-5 rounded-lg pipernet-auth-btn-cancel font-medium text-sm transition-colors text-center"
          >
            {isVi ? 'Đóng' : 'Close'}
          </button>

          <button
            type="button"
            onClick={handleReturnToHub}
            className="flex-[1.4] py-2.5 px-6 rounded-lg pipernet-auth-btn-action font-semibold text-sm flex items-center justify-center gap-2 transition-all text-center"
          >
            <span>{isVi ? `Quay lại PiperNet ngay (${countdown}s)` : `Back to PiperNet Now (${countdown}s)`}</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiperNetAuthSuccessModal;
