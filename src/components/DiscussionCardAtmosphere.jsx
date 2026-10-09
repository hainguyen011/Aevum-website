import React, { memo } from 'react';

/**
 * Type-specific color palette for Discussion Card Seamless Grainy Gradient
 * (Flowing from Left to Right, borderless, fading effortlessly into background)
 */
export const getDiscussionTheme = (type) => {
  switch (type) {
    case 'bug':
      return {
        type: 'bug',
        nameVi: 'Báo lỗi',
        // Crimson / Rose (Flowing from Left to Right)
        linearFlow: 'linear-gradient(90deg, rgba(244, 63, 94, 0.16) 0%, rgba(244, 63, 94, 0.06) 26%, rgba(244, 63, 94, 0.015) 52%, transparent 78%)',
        auraWash: 'radial-gradient(ellipse 60% 85% at 0% 50%, rgba(244, 63, 94, 0.22) 0%, rgba(225, 29, 72, 0.05) 50%, transparent 100%)',
      };
    case 'feature':
      return {
        type: 'feature',
        nameVi: 'Ý tưởng',
        // Radiant Developer Orange (Flowing from Left to Right)
        linearFlow: 'linear-gradient(90deg, rgba(249, 115, 22, 0.20) 0%, rgba(249, 115, 22, 0.08) 28%, rgba(249, 115, 22, 0.02) 54%, transparent 80%)',
        auraWash: 'radial-gradient(ellipse 60% 85% at 0% 50%, rgba(249, 115, 22, 0.28) 0%, rgba(234, 88, 12, 0.07) 50%, transparent 100%)',
      };
    case 'feedback':
      return {
        type: 'feedback',
        nameVi: 'Phản hồi',
        // Soft Emerald / Sage Green (Flowing from Left to Right)
        linearFlow: 'linear-gradient(90deg, rgba(16, 185, 129, 0.16) 0%, rgba(16, 185, 129, 0.06) 26%, rgba(16, 185, 129, 0.015) 52%, transparent 78%)',
        auraWash: 'radial-gradient(ellipse 60% 85% at 0% 50%, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.05) 50%, transparent 100%)',
      };
    default:
      return {
        type: 'discussion',
        nameVi: 'Thảo luận',
        // Cyan / Sky / Electric Blue (Flowing from Left to Right)
        linearFlow: 'linear-gradient(90deg, rgba(14, 165, 233, 0.16) 0%, rgba(14, 165, 233, 0.06) 26%, rgba(14, 165, 233, 0.015) 52%, transparent 78%)',
        auraWash: 'radial-gradient(ellipse 60% 85% at 0% 50%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 100%)',
      };
  }
};

/**
 * DiscussionCardAtmosphere Component
 * Renders a borderless, soft Grainy Gradient that flows horizontally
 * from LEFT to RIGHT, fading out and blending seamlessly into the background canvas.
 */
export const DiscussionCardAtmosphere = memo(function DiscussionCardAtmosphere({ type }) {
  const theme = getDiscussionTheme(type);

  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full rounded-2xl overflow-hidden z-0 select-none transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* ── 1. Soft Horizontal Linear Flow (From Left to Right, fading into background) ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 opacity-90 group-hover:opacity-100"
        style={{
          background: theme.linearFlow,
        }}
      />

      {/* ── 2. Ethereal Left Flank Aura Wash (Soft ambient radial glow anchored on the left) ── */}
      <div
        className="absolute -left-14 top-1/2 -translate-y-1/2 w-[70%] h-[130%] pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100"
        style={{
          background: theme.auraWash,
          filter: 'blur(36px)',
        }}
      />

      {/* ── 3. Authentic Grainy Noise Texture Layer (Fades horizontally from Left to Right) ── */}
      <div
        className="absolute inset-0 select-none opacity-[0.11] [html[data-theme='light']_&]:opacity-[0.05] mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterCardFine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterCardFine)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '140px 140px',
          WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.12) 62%, transparent 85%)',
          maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.12) 62%, transparent 85%)',
        }}
      />
    </div>
  );
});
