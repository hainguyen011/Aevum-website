import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ReleaseService } from '../services/ReleaseService';

export const AnnouncementBanner = ({ onNavigate, activeLang, isScrolled: propIsScrolled }) => {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;
  const [latestVersion, setLatestVersion] = useState('v1.0.0-beta.6');
  const isVi = activeLang === 'vi';

  useEffect(() => {
    ReleaseService.getReleases()
      .then((releases) => {
        if (releases && releases.length > 0) {
          const newest = releases[0];
          const tag = newest.tag_name || newest.name || 'v1.0.0-beta.6';
          setLatestVersion(tag);
        }
      })
      .catch((err) => {
        console.error('[AnnouncementBanner] Failed to fetch latest release:', err);
      });
  }, []);

  const badgeText = latestVersion;
  const mainMessage = isVi
    ? `Bản cập nhật ${latestVersion} đã chính thức phát hành cho macOS & Windows`
    : `Aevum OS ${latestVersion} is now available for macOS & Windows`;
  const ctaText = isVi ? 'Tải xuống ngay' : 'Download now';

  useEffect(() => {
    if (propIsScrolled !== undefined) return;

    let ticking = false;
    const updateScroll = () => {
      const scrollY = Math.max(0, window.pageYOffset ?? window.scrollY ?? document.documentElement.scrollTop ?? 0);
      setInternalScrolled(scrollY > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [propIsScrolled]);

  return (
    <div
      role="button"
      tabIndex={isScrolled ? -1 : 0}
      onClick={() => onNavigate && onNavigate('changelog')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate && onNavigate('changelog');
        }
      }}
      className={`announcement-banner group relative w-full overflow-hidden cursor-pointer select-none transition-all duration-300 ease-in-out border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 ${
        isScrolled
          ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          : 'max-h-12 opacity-100 py-2.5 bg-white/[0.02] hover:bg-white/[0.05] [html[data-theme="light"]_&]:bg-slate-100 [html[data-theme="light"]_&]:hover:bg-slate-200/80 pointer-events-auto'
      }`}
      title={isVi ? "Bấm để xem nhật ký cập nhật & tải về" : "Click to view changelog & download"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-sans">
        {/* Version Badge Pill */}
        <span className="announcement-badge inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-400/25 tracking-wide shrink-0 [html[data-theme='light']_&]:bg-cyan-50 [html[data-theme='light']_&]:text-cyan-700 [html[data-theme='light']_&]:border-cyan-300">
          {badgeText}
        </span>

        {/* Main Release Message */}
        <span className="announcement-text text-slate-200/90 [html[data-theme='light']_&]:text-slate-700 font-normal truncate">
          {mainMessage}
        </span>

        <span className="announcement-divider text-slate-500 [html[data-theme='light']_&]:text-slate-400 hidden sm:inline select-none">·</span>

        {/* CTA Link */}
        <span className="announcement-cta text-cyan-400 [html[data-theme='light']_&]:text-cyan-600 font-medium inline-flex items-center gap-1 group-hover:text-cyan-300 [html[data-theme='light']_&]:group-hover:text-cyan-700 transition-colors shrink-0">
          <span>{ctaText}</span>
          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
