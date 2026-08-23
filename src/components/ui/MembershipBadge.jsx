import React from 'react';

/**
 * Premium Minimalist Membership Badge
 * - No box shadow
 * - No emojis / icons
 * - Gradient transparent text (bg-clip-text)
 * - Electron Blue Beam border style
 * - Full Dark & Light mode synchronized
 * 
 * @param {string} tier 'community' | 'pro' | 'enterprise'
 * @param {boolean} isTrial boolean
 * @param {number} trialDaysRemaining number
 * @param {'xs' | 'sm' | 'md'} size
 * @param {string} className
 */
export const MembershipBadge = ({ 
  tier = 'community', 
  isTrial = false, 
  isWaitlist = false,
  trialDaysRemaining, 
  size = 'sm',
  className = '' 
}) => {
  const normalizedTier = (tier || 'community').toLowerCase();

  // Size specifications
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[9px]',
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs'
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.sm;

  // 1. PRO & PRO TRIAL / WAITLIST TIER
  if (normalizedTier === 'pro') {
    const days = trialDaysRemaining !== undefined && trialDaysRemaining !== null ? trialDaysRemaining : 30;
    return (
      <span
        className={`membership-badge-pro inline-flex items-center select-none font-mono font-bold uppercase tracking-wider rounded-[4px] transition-all duration-200 whitespace-nowrap flex-nowrap shrink-0 ${currentSizeClass} ${className}`}
      >
        <span className="badge-text whitespace-nowrap">
          {isWaitlist ? 'BETA WAITLIST' : (isTrial ? 'PRO BETA' : 'AEVUM PRO')}
        </span>
        {(isTrial || isWaitlist) && (
          <span 
            className="badge-text badge-divider ml-1.5 pl-1.5 border-l text-[9px] font-semibold whitespace-nowrap"
          >
            {isWaitlist ? '30 Days reserved' : `${days} ${days === 1 ? 'Day left' : 'Days left'}`}
          </span>
        )}
      </span>
    );
  }

  // 2. ENTERPRISE TIER
  if (normalizedTier === 'enterprise') {
    return (
      <span
        className={`membership-badge-enterprise inline-flex items-center select-none font-mono font-bold uppercase tracking-wider rounded-[4px] transition-all duration-200 whitespace-nowrap flex-nowrap shrink-0 ${currentSizeClass} ${className}`}
      >
        <span className="badge-text whitespace-nowrap">
          ENTERPRISE
        </span>
      </span>
    );
  }

  // 3. COMMUNITY TIER
  return (
    <span
      className={`membership-badge-community inline-flex items-center select-none font-mono font-semibold uppercase tracking-wider rounded-[4px] transition-all duration-200 whitespace-nowrap flex-nowrap shrink-0 ${currentSizeClass} ${className}`}
    >
      <span className="badge-text whitespace-nowrap">
        COMMUNITY
      </span>
    </span>
  );
};


export default MembershipBadge;
