import React, { memo } from 'react';

/**
 * Aevum OS Signature Hero Banner Cyan-Blue Atmosphere
 * Replicates the exact homepage Hero banner visual aesthetic:
 * 1. Top-to-bottom luminous Cyan-Blue gradient flow (#0ea5e9 -> #0284c7 -> deep space)
 * 2. Ethereal curved top horizon wash (ambient radial crest)
 * 3. Authentic studio film grain noise texture layer
 */
export const ExploreCardAtmosphere = memo(function ExploreCardAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full rounded-2xl overflow-hidden z-0 select-none transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* ── 1. Primary Linear Gradient Flow (Signature Cyan-Blue Banner) ── */}
      {/* Dark Theme Base */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 opacity-90 group-hover:opacity-100 [html[data-theme='light']_&]:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(14, 165, 233, 0.34) 0%, rgba(2, 132, 199, 0.20) 24%, rgba(15, 23, 42, 0.40) 60%, transparent 100%)',
        }}
      />

      {/* Light Theme Base */}
      <div
        className="hidden [html[data-theme='light']_&]:block absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 opacity-90 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(180deg, rgba(14, 165, 233, 0.20) 0%, rgba(56, 189, 248, 0.10) 30%, transparent 85%)',
        }}
      />

      {/* ── 2. Ethereal Top Horizon Wash (Curved ambient light crest matching Hero Banner) ── */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[140%] h-44 pointer-events-none transition-opacity duration-500 opacity-85 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.16) 48%, transparent 100%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ── 3. Authentic Grainy Noise Texture Layer (Fractal Noise via SVG data-uri) ── */}
      <div
        className="absolute inset-0 select-none opacity-[0.24] [html[data-theme='light']_&]:opacity-[0.09] mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterExploreBanner'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterExploreBanner)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
});

export const getExploreCategoryTheme = () => ({
  accentDot: 'bg-cyan-400',
});

/**
 * ExploreCardSkeleton Component
 * High-end Skeleton Card matching exact card layout & Hero banner atmosphere
 */
export const ExploreCardSkeleton = memo(function ExploreCardSkeleton() {
  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl bg-[#090d14]/75 [html[data-theme='light']_&]:bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── 1. Hero Banner Grainy Gradient Atmosphere ── */}
      <ExploreCardAtmosphere />

      {/* ── 2. Top Specular Rim Glow ── */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 [html[data-theme='light']_&]:via-cyan-500/25 to-transparent pointer-events-none z-10" />

      {/* ── 3. Body Skeleton Section ── */}
      <div className="relative z-10 flex-1 p-6 pb-5 flex flex-col justify-between rounded-b-2xl border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-900/[0.08] bg-white/[0.015] [html[data-theme='light']_&]:bg-white/60 overflow-hidden">
        <div>
          {/* Category & Read Time Skeleton */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="h-3 w-28 rounded-md bg-white/10 [html[data-theme='light']_&]:bg-slate-300/70 animate-pulse" />
            <div className="h-3 w-12 rounded-md bg-white/10 [html[data-theme='light']_&]:bg-slate-300/70 animate-pulse" />
          </div>

          {/* Title Skeleton (2 lines) */}
          <div className="space-y-2 mb-3.5">
            <div className="h-4.5 w-11/12 rounded-md bg-white/15 [html[data-theme='light']_&]:bg-slate-300/90 animate-pulse" />
            <div className="h-4.5 w-3/5 rounded-md bg-white/15 [html[data-theme='light']_&]:bg-slate-300/90 animate-pulse" />
          </div>

          {/* Summary Skeleton (2 lines) */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded-md bg-white/5 [html[data-theme='light']_&]:bg-slate-200/80 animate-pulse" />
            <div className="h-3 w-4/5 rounded-md bg-white/5 [html[data-theme='light']_&]:bg-slate-200/80 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── 4. Footer Dock Layer Skeleton ── */}
      <div className="relative z-10 px-6 py-3.5 bg-black/20 [html[data-theme='light']_&]:bg-slate-900/[0.025] flex items-center justify-between rounded-b-2xl overflow-hidden">
        {/* Author Skeleton */}
        <div className="h-3 w-16 rounded-md bg-white/10 [html[data-theme='light']_&]:bg-slate-300/70 animate-pulse" />
        {/* CTA Button Skeleton */}
        <div className="h-3 w-14 rounded-md bg-white/10 [html[data-theme='light']_&]:bg-slate-300/70 animate-pulse" />
      </div>
    </div>
  );
});

export default ExploreCardAtmosphere;
