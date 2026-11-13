import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ExternalLink, Download } from 'lucide-react';
import { ReleaseService } from '../services/ReleaseService';

// Crisp SVG Icons for Windows & Apple
export const WindowsIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

export const AppleIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.8 1.45-.6.71-1.13 1.87-.99 2.98 1.07.08 2.14-.51 2.8-1.33z" />
  </svg>
);

export const DualDownloadButtons = ({
  activeLang = 'vi',
  onNavigate,
  size = 'normal', // 'normal' | 'compact'
  className = ''
}) => {
  const isVi = activeLang === 'vi';
  const [downloads, setDownloads] = useState(null);
  const [userOS, setUserOS] = useState('windows');
  const [openMenu, setOpenMenu] = useState(null); // 'windows' | 'mac' | null
  const [menuDirection, setMenuDirection] = useState('down'); // 'down' | 'up'
  const containerRef = useRef(null);

  // Toggle menu with viewport collision detection (Dropup if near bottom)
  const toggleMenu = (menuName, e) => {
    e.stopPropagation();
    if (openMenu === menuName) {
      setOpenMenu(null);
      return;
    }
    const btn = e.currentTarget;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 300px below and sufficient room above, open upwards
      if (spaceBelow < 300 && rect.top > 250) {
        setMenuDirection('up');
      } else {
        setMenuDirection('down');
      }
    }
    setOpenMenu(menuName);
  };

  // Detect user operating system
  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes('mac') || ua.includes('darwin')) {
        setUserOS('mac');
      } else {
        setUserOS('windows');
      }
    }
  }, []);

  // Fetch latest downloads from GitHub releases via ReleaseService
  useEffect(() => {
    let mounted = true;
    ReleaseService.getLatestDownloads()
      .then((data) => {
        if (mounted && data) {
          setDownloads(data);
        }
      })
      .catch((err) => {
        console.warn('[DualDownloadButtons] Failed to fetch latest downloads:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerDownload = (url, filename) => {
    if (!url) return;
    setOpenMenu(null);
    const link = document.createElement('a');
    link.href = url;
    if (filename) link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const winUrl = downloads?.windows?.url || 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.9/Aevum-OS-Setup-2.0.0-dev.9.exe';
  const winName = downloads?.windows?.name || 'Aevum-OS-Setup-2.0.0-dev.9.exe';
  const winOptions = downloads?.windows?.options || [];

  const macUrl = downloads?.mac?.url || 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.6/Aevum-OS-2.0.0-dev.6-mac-arm64.dmg';
  const macName = downloads?.mac?.name || 'Aevum-OS-2.0.0-dev.6-mac-arm64.dmg';
  const macOptions = downloads?.mac?.options || [];

  const isMacUser = userOS === 'mac';

  // Primary Pill Styles (Swiss Editorial Tone)
  const primaryPillClass = "bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:hover:bg-black [html[data-theme='light']_&]:text-white shadow-sm";
  const secondaryPillClass = "bg-white/[0.08] hover:bg-white/[0.14] text-white [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 [html[data-theme='light']_&]:text-slate-900 border border-white/10 [html[data-theme='light']_&]:border-slate-300";

  const paddingClass = size === 'compact'
    ? 'px-3.5 py-1.5 text-xs'
    : 'px-5 py-3 text-sm';

  const iconSize = size === 'compact' ? 13 : 15;

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap items-center gap-3 relative select-none ${className}`}>
      
      {/* ── 1. WINDOWS DOWNLOAD BUTTON ── */}
      <div className="relative inline-flex items-center">
        <div className={`inline-flex items-center rounded-full transition-all duration-150 ${isMacUser ? secondaryPillClass : primaryPillClass}`}>
          {/* Main Action Trigger */}
          <button
            onClick={() => triggerDownload(winUrl, winName)}
            className={`inline-flex items-center gap-2 font-semibold cursor-pointer ${paddingClass} ${winOptions.length > 1 ? 'pr-2' : ''}`}
            title={downloads?.windows?.version ? `Windows Installer (${downloads.windows.version})` : 'Download for Windows'}
          >
            <WindowsIcon size={iconSize} className="shrink-0" />
            <span>Download for Windows</span>
          </button>

          {/* Optional Options Toggle Chevron */}
          {winOptions.length > 1 && (
            <button
              onClick={(e) => toggleMenu('windows', e)}
              className="px-2 py-3 hover:opacity-75 transition-opacity cursor-pointer border-l border-current/20"
              aria-label="Windows download options"
            >
              <ChevronDown size={13} className={`transition-transform duration-200 ${openMenu === 'windows' ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Windows Architecture Popover Menu */}
        {openMenu === 'windows' && (
          <div className={`absolute ${menuDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-72 rounded-2xl bg-[#0F1118] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 shadow-2xl z-[100] p-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150`}>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 [html[data-theme='light']_&]:border-slate-100 flex items-center justify-between">
              <span>Windows Releases</span>
              <span>{downloads?.windows?.version || 'Latest'}</span>
            </div>
            <div className="py-1 space-y-1">
              {winOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => triggerDownload(opt.url, opt.name)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors flex items-center justify-between text-white [html[data-theme='light']_&]:text-slate-800 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{opt.label}</span>
                    {opt.sublabel && <span className="text-[10px] text-slate-400">{opt.sublabel}</span>}
                  </div>
                  <Download size={13} className="text-slate-400" />
                </button>
              ))}
            </div>
            {onNavigate && (
              <div className="pt-1 border-t border-white/5 [html[data-theme='light']_&]:border-slate-100">
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    onNavigate('changelog');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-black transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{isVi ? 'Xem tất cả phiên bản' : 'View all releases'}</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 2. MACOS DOWNLOAD BUTTON ── */}
      <div className="relative inline-flex items-center">
        <div className={`inline-flex items-center rounded-full transition-all duration-150 ${isMacUser ? primaryPillClass : secondaryPillClass}`}>
          {/* Main Action Trigger */}
          <button
            onClick={() => triggerDownload(macUrl, macName)}
            className={`inline-flex items-center gap-2 font-semibold cursor-pointer ${paddingClass} ${macOptions.length > 0 ? 'pr-2' : ''}`}
            title={downloads?.mac?.version ? `macOS Installer (${downloads.mac.version})` : 'Download for macOS'}
          >
            <AppleIcon size={iconSize} className="shrink-0" />
            <span>Download for macOS</span>
          </button>

          {/* Options Toggle Chevron */}
          {macOptions.length > 0 && (
            <button
              onClick={(e) => toggleMenu('mac', e)}
              className="px-2.5 py-3 hover:opacity-75 transition-opacity cursor-pointer border-l border-current/20"
              aria-label="macOS download options"
            >
              <ChevronDown size={13} className={`transition-transform duration-200 ${openMenu === 'mac' ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* macOS Architecture Popover Menu */}
        {openMenu === 'mac' && (
          <div className={`absolute ${menuDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-72 rounded-2xl bg-[#0F1118] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 shadow-2xl z-[100] p-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150`}>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 [html[data-theme='light']_&]:border-slate-100 flex items-center justify-between">
              <span>macOS Releases</span>
              <span>{downloads?.mac?.version || 'Latest'}</span>
            </div>
            <div className="py-1 space-y-1">
              {macOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => triggerDownload(opt.url, opt.name)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors flex items-center justify-between text-white [html[data-theme='light']_&]:text-slate-800 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{opt.label}</span>
                    {opt.sublabel && <span className="text-[10px] text-slate-400">{opt.sublabel}</span>}
                  </div>
                  <Download size={13} className="text-slate-400" />
                </button>
              ))}
            </div>
            {onNavigate && (
              <div className="pt-1 border-t border-white/5 [html[data-theme='light']_&]:border-slate-100">
                <button
                  onClick={() => {
                    setOpenMenu(null);
                    onNavigate('changelog');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-black transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{isVi ? 'Xem tất cả phiên bản' : 'View all releases'}</span>
                  <ExternalLink size={11} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default DualDownloadButtons;
