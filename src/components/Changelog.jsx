import React, { useEffect, useState, useMemo } from 'react';
import {
  Download,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Lock,
  CheckCircle2,
  ArrowLeft,
  X,
  ExternalLink,
  ChevronRight,
  FileText,
  ChevronDown
} from 'lucide-react';
import { ReleaseService } from '../services/ReleaseService';
import { marked } from 'marked';
import { sanitizeHtml } from '../utils/sanitize.js';

marked.setOptions({
  gfm: true,
  breaks: true,
});

// OS SVG Icons
const WindowsIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const AppleIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.8 1.45-.6.71-1.13 1.87-.99 2.98 1.07.08 2.14-.51 2.8-1.33z" />
  </svg>
);

const LinuxIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.504 0c-.155 0-.315.008-.48.021-3.165.263-5.32 2.454-5.352 5.441-.013 1.21.373 2.438.932 3.49-1.066.862-2.28 2.172-2.738 3.89-.533 2.003-.186 4.053.953 5.626-1.03.65-1.854 1.576-2.327 2.625-.79 1.75-.688 3.513.284 4.58.647.711 1.58 1.053 2.696.988 1.834-.108 3.99-1.182 5.926-2.95 1.547.464 3.19.467 4.733.008 1.934 1.764 4.086 2.835 5.918 2.942 1.115.065 2.048-.277 2.695-.988.972-1.067 1.074-2.83.284-4.58-.473-1.05-1.297-1.975-2.327-2.625 1.14-1.573 1.486-3.623.953-5.626-.458-1.718-1.672-3.028-2.738-3.89.56-1.052.945-2.28.932-3.49-.032-2.987-2.187-5.178-5.352-5.441-.165-.013-.325-.021-.48-.021z" />
  </svg>
);

const getOSIcon = (item) => {
  if (!item) return <Download size={13} className="shrink-0" />;
  if (item.id.startsWith('win')) return <WindowsIcon size={13} className="shrink-0" />;
  if (item.id.startsWith('mac')) return <AppleIcon size={13} className="shrink-0" />;
  return <LinuxIcon size={13} className="shrink-0" />;
};

const resolveReleaseStatus = (release, isVi = true) => {
  const tag = (release?.tag_name || release?.name || '').trim().toLowerCase();
  const body = (release?.body || '').toLowerCase();
  const name = (release?.name || '').toLowerCase();

  if (
    tag.includes('fix') ||
    tag.includes('patch') ||
    tag.includes('hotfix') ||
    name.includes('sửa lỗi') ||
    name.includes('bug') ||
    name.includes('fix') ||
    body.includes('### sửa lỗi') ||
    body.includes('### fixes')
  ) {
    return { type: 'fix', label: isVi ? 'Sửa lỗi' : 'Bugfix' };
  }

  if (
    tag.includes('refactor') ||
    tag.includes('perf') ||
    name.includes('chỉnh sửa') ||
    name.includes('cải tiến') ||
    name.includes('tối ưu') ||
    body.includes('### cải tiến') ||
    body.includes('### improvements')
  ) {
    return { type: 'improvement', label: isVi ? 'Cải tiến' : 'Improvement' };
  }

  return { type: 'upgrade', label: isVi ? 'Nâng cấp' : 'Upgrade' };
};

// Clean summary snippet extractor
const extractSummary = (bodyText) => {
  if (!bodyText) return '';
  const lines = bodyText.split('\n');
  const cleanLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#') || trimmed.startsWith('---') || trimmed.startsWith('===')) continue;
    cleanLines.push(trimmed.replace(/^[*\-+]\s+/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, ''));
    if (cleanLines.length >= 2) break;
  }
  return cleanLines.join(' ');
};

export function Changelog({ activeLang, onNavigate, userProfile, user }) {
  const [rawReleases, setRawReleases] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'community' | 'developer'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvedTags, setApprovedTags] = useState(new Set());
  const [isApproving, setIsApproving] = useState(false);
  const [detectedOS, setDetectedOS] = useState(null);
  const [activeModalRelease, setActiveModalRelease] = useState(null);
  const [openMacMenuId, setOpenMacMenuId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const isVi = activeLang === 'vi';

  // Role Checks
  const isAdmin = Boolean(
    userProfile?.role === 'admin' ||
    user?.email === 'hainguyen011@gmail.com' ||
    userProfile?.email === 'hainguyen011@gmail.com' ||
    user?.email?.includes('admin') ||
    userProfile?.preferences?.is_admin === true
  );

  const isDevUser = Boolean(
    isAdmin ||
    userProfile?.role === 'developer' ||
    userProfile?.role === 'beta_tester'
  );

  // OS Detection
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
      const ua = (navigator.userAgent || '').toLowerCase();
      const platform = (navigator.platform || '').toLowerCase();

      if (platform.includes('win') || ua.includes('windows')) {
        setDetectedOS(ua.includes('arm64') || ua.includes('aarch64') ? 'win-arm64' : 'win-x64');
        return;
      }

      if (platform.includes('mac') || ua.includes('mac os') || ua.includes('macintosh')) {
        let isAppleSilicon = true;
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl');
          if (gl) {
            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (ext) {
              const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
              if (/intel/i.test(renderer)) {
                isAppleSilicon = false;
              }
            }
          }
        } catch (e) {
          // Default Apple Silicon
        }
        setDetectedOS(isAppleSilicon ? 'mac-arm64-dmg' : 'mac-x64-dmg');
        return;
      }

      if (platform.includes('linux') || ua.includes('linux')) {
        setDetectedOS('linux');
        return;
      }
    } catch (err) {
      console.warn('[Changelog] OS detection error:', err);
    }
  }, []);

  // Fetch Releases & Approved Tags
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([
      ReleaseService.getReleases(),
      ReleaseService.getApprovedTags()
    ])
      .then(([data, approvedSet]) => {
        setApprovedTags(approvedSet);

        const allReleases = Array.isArray(data)
          ? [...data].sort((a, b) => {
            const timeA = new Date(a.published_at || a.created_at || 0).getTime();
            const timeB = new Date(b.published_at || b.created_at || 0).getTime();
            if (timeB !== timeA) return timeB - timeA;
            return (b.tag_name || b.name || '').localeCompare(a.tag_name || a.name || '', undefined, { numeric: true });
          })
          : [];

        // Exclude legacy v1 beta, enforce dev build authorization
        const authorized = allReleases.filter((release) => {
          const tag = (release.tag_name || release.name || '').toLowerCase();
          const rawTag = release.tag_name || release.name || '';

          const isV1Beta =
            (tag.includes('beta') || (release.name || '').toLowerCase().includes('beta')) &&
            (tag.startsWith('v1.') || tag.startsWith('1.') || tag.includes('1.0.0') || !tag.includes('v2'));
          if (isV1Beta) return false;

          const isDev = tag.includes('-dev') || tag.includes('.dev') || (release.prerelease && tag.includes('dev'));
          if (!isDev) return true;
          if (isAdmin) return true;
          if (isDevUser) return approvedSet.has(rawTag);
          return false;
        });

        setRawReleases(authorized);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [isAdmin, isDevUser]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModalRelease) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalRelease(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModalRelease]);

  // Close Mac download popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = () => setOpenMacMenuId(null);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMacMenuId(null);
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset pagination when switching tabs
  useEffect(() => {
    setVisibleCount(3);
  }, [activeTab]);

  const isDevBuildRelease = (release) => {
    if (!release) return false;
    const tag = (release.tag_name || release.name || '').toLowerCase();
    const name = (release.name || '').toLowerCase();
    return Boolean(
      tag.includes('-dev') ||
      tag.includes('.dev') ||
      tag.includes('dev.') ||
      name.includes('dev test') ||
      name.includes('bản test nội bộ') ||
      (release.prerelease && tag.includes('dev'))
    );
  };

  const tabCounts = useMemo(() => {
    const commCount = rawReleases.filter(r => !isDevBuildRelease(r)).length;
    const devCount = isDevUser ? rawReleases.filter(r => isDevBuildRelease(r)).length : 0;
    return {
      all: isDevUser ? rawReleases.length : commCount,
      community: commCount,
      developer: devCount
    };
  }, [rawReleases, isDevUser]);

  const releases = useMemo(() => {
    if (activeTab === 'community') {
      return rawReleases.filter(r => !isDevBuildRelease(r));
    }
    if (activeTab === 'developer') {
      return isDevUser ? rawReleases.filter(r => isDevBuildRelease(r)) : [];
    }
    if (!isDevUser) {
      return rawReleases.filter(r => !isDevBuildRelease(r));
    }
    return rawReleases;
  }, [rawReleases, activeTab, isDevUser]);

  // Handle Admin Dev Build Approval
  const handleToggleApproval = async (release) => {
    if (!isAdmin || !release) return;
    const tagName = release.tag_name || release.name;
    const currentlyApproved = approvedTags.has(tagName);
    setIsApproving(true);
    try {
      await ReleaseService.setReleaseApproved(tagName, !currentlyApproved, userProfile || user);
      const updated = new Set(approvedTags);
      if (!currentlyApproved) {
        updated.add(tagName);
      } else {
        updated.delete(tagName);
      }
      setApprovedTags(updated);
    } catch (err) {
      console.error('[Changelog] Failed to toggle approval:', err);
    } finally {
      setIsApproving(false);
    }
  };

  // Parse download items for a release
  const getDownloadItems = (release) => {
    if (!release || !release.assets) return [];
    const items = [];

    // Windows
    const exeAssets = release.assets.filter(a => a.name.endsWith('.exe'));
    const winArm = exeAssets.find(a => /arm64|aarch64/i.test(a.name));
    const winX64 = exeAssets.find(a => !/arm64|aarch64/i.test(a.name));

    if (winX64) {
      items.push({
        id: 'win-x64',
        label: 'Windows x64 (.exe)',
        shortLabel: 'Windows x64',
        url: winX64.browser_download_url,
        name: winX64.name
      });
    }
    if (winArm) {
      items.push({
        id: 'win-arm64',
        label: 'Windows ARM64 (.exe)',
        shortLabel: 'Windows ARM64',
        url: winArm.browser_download_url,
        name: winArm.name
      });
    }

    // macOS DMG
    const dmgAssets = release.assets.filter(a => a.name.endsWith('.dmg'));
    const macArmDmg = dmgAssets.find(a => /arm64|apple|m1|m2/i.test(a.name));
    const macX64Dmg = dmgAssets.find(a => /x64|intel/i.test(a.name));
    const macUniversalDmg = dmgAssets.find(a => !/arm64|x64/i.test(a.name));

    if (macArmDmg) {
      items.push({
        id: 'mac-arm64-dmg',
        label: 'Apple Silicon (.dmg)',
        shortLabel: 'Apple Silicon (.dmg)',
        url: macArmDmg.browser_download_url,
        name: macArmDmg.name
      });
    }
    if (macX64Dmg) {
      items.push({
        id: 'mac-x64-dmg',
        label: 'Mac Intel (.dmg)',
        shortLabel: 'Mac Intel (.dmg)',
        url: macX64Dmg.browser_download_url,
        name: macX64Dmg.name
      });
    } else if (macUniversalDmg && !macArmDmg) {
      items.push({
        id: 'mac-universal-dmg',
        label: 'macOS Universal (.dmg)',
        shortLabel: 'macOS (.dmg)',
        url: macUniversalDmg.browser_download_url,
        name: macUniversalDmg.name
      });
    }

    // Linux
    const linuxAssets = release.assets.filter(a => a.name.endsWith('.AppImage') || a.name.endsWith('.deb'));
    linuxAssets.forEach(l => {
      items.push({
        id: `linux-${l.name}`,
        label: `Linux (${l.name.split('.').pop()})`,
        shortLabel: `Linux (${l.name.split('.').pop()})`,
        url: l.browser_download_url,
        name: l.name
      });
    });

    return items;
  };

  // Extract prominent card-level download actions (Windows & Combined macOS)
  const getCardActions = (release) => {
    if (!release || !release.assets) return { windows: null, mac: null, linux: [] };

    // 1. Windows: pick x64 or arm64
    const exeAssets = release.assets.filter(a => a.name.endsWith('.exe'));
    const winArm = exeAssets.find(a => /arm64|aarch64/i.test(a.name));
    const winX64 = exeAssets.find(a => !/arm64|aarch64/i.test(a.name));
    const winSelected = (detectedOS === 'win-arm64' && winArm) ? winArm : (winX64 || winArm);

    const windows = winSelected ? {
      id: 'win',
      label: winSelected === winArm ? 'Windows ARM64 (.exe)' : 'Windows x64 (.exe)',
      url: winSelected.browser_download_url,
      name: winSelected.name
    } : null;

    // 2. macOS: Combined into one group with Silicon & Intel options
    const dmgAssets = release.assets.filter(a => a.name.endsWith('.dmg'));
    const macArmDmg = dmgAssets.find(a => /arm64|apple|m1|m2|aarch64/i.test(a.name));
    const macX64Dmg = dmgAssets.find(a => /x64|intel/i.test(a.name));
    const macUniversalDmg = dmgAssets.find(a => !/arm64|x64|intel/i.test(a.name));

    const macOptions = [];
    if (macArmDmg) {
      macOptions.push({
        id: 'mac-arm64',
        label: 'Apple Silicon (.dmg)',
        chip: 'Chip M1 / M2 / M3 / M4 / M5',
        url: macArmDmg.browser_download_url,
        name: macArmDmg.name
      });
    }
    if (macX64Dmg) {
      macOptions.push({
        id: 'mac-x64',
        label: 'Mac Intel (.dmg)',
        chip: 'Chip Intel Core x86_64',
        url: macX64Dmg.browser_download_url,
        name: macX64Dmg.name
      });
    }
    if (macUniversalDmg && macOptions.length === 0) {
      macOptions.push({
        id: 'mac-universal',
        label: 'macOS Universal (.dmg)',
        chip: 'Universal Binary',
        url: macUniversalDmg.browser_download_url,
        name: macUniversalDmg.name
      });
    }

    let mac = null;
    if (macOptions.length > 0) {
      const isIntelUser = detectedOS === 'mac-x64-dmg';
      const defaultOption = (isIntelUser && macX64Dmg)
        ? (macOptions.find(o => o.id === 'mac-x64') || macOptions[0])
        : macOptions[0];

      mac = {
        label: 'macOS (.dmg)',
        primaryUrl: defaultOption.url,
        primaryName: defaultOption.name,
        options: macOptions
      };
    }

    // 3. Linux (if present)
    const linuxAssets = release.assets.filter(a => a.name.endsWith('.AppImage') || a.name.endsWith('.deb'));
    const linux = linuxAssets.map(l => ({
      id: `linux-${l.name}`,
      label: `Linux (${l.name.split('.').pop()})`,
      url: l.browser_download_url,
      name: l.name
    }));

    return { windows, mac, linux };
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatReleaseNotes = (notes) => {
    if (!notes) return null;
    try {
      const rawHtml = marked.parse(notes);
      const safeHtml = sanitizeHtml(rawHtml);
      return (
        <div
          className="github-markdown-body"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      );
    } catch (e) {
      console.error('[Changelog] Markdown parsing error:', e);
      return <div className="text-slate-300 font-mono text-xs">{notes}</div>;
    }
  };

  return (
    <div id="changelog" className="relative min-h-screen w-full bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-sans select-text overflow-x-hidden">

      {/* Main Single-Page Editorial Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">

        {/* Top Breadcrumb & Home Link */}
        <div className="flex items-center justify-between pb-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-transparent hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-100 text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-700 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? 'Trang chủ' : 'Home'}</span>
            </button>
            <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-300">/</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-semibold">
              {isVi ? 'Nhật ký phát hành' : 'Changelog'}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500">
            {releases.length} {isVi ? 'bản cập nhật' : 'releases'}
          </span>
        </div>

        {/* Editorial Header Section */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500">
            <span>AEVUM OS</span>
            <span>•</span>
            <span>RELEASES & CHANGELOG</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12]">
                {isVi ? 'Nhật ký cập nhật' : 'Changelog'}
              </h1>
              <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-xl font-light leading-relaxed">
                {isVi
                  ? 'Theo dõi tiến trình phát triển, các tính năng mới và cải tiến hiệu năng của Aevum OS.'
                  : 'Explore new features, architectural improvements, and bug fixes across Aevum OS releases.'}
              </p>
            </div>

            {/* Segmented Filter Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-xs font-mono shrink-0 self-start sm:self-end">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`py-1.5 px-3.5 rounded-full transition-colors cursor-pointer ${activeTab === 'all'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                  : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900 font-normal'
                  }`}
              >
                {isVi ? `Tất cả (${tabCounts.all})` : `All (${tabCounts.all})`}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('community')}
                className={`py-1.5 px-3.5 rounded-full transition-colors cursor-pointer ${activeTab === 'community'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                  : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900 font-normal'
                  }`}
              >
                {isVi ? `Cộng đồng (${tabCounts.community})` : `Community (${tabCounts.community})`}
              </button>

              {isDevUser && (
                <button
                  type="button"
                  onClick={() => setActiveTab('developer')}
                  className={`py-1.5 px-3.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'developer'
                    ? 'bg-white text-slate-950 font-semibold shadow-sm [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                    : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900 font-normal'
                    }`}
                >
                  <Lock size={10} />
                  <span>Dev ({tabCounts.developer})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Stream: Compact Release Cards */}
        {isLoading ? (
          <div className="py-24 text-center font-mono text-xs text-slate-400 space-y-3">
            <RefreshCw className="w-6 h-6 mx-auto animate-spin text-slate-400" />
            <p>{isVi ? 'Đang tải nhật ký cập nhật...' : 'Loading release changelog...'}</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-xs font-mono text-red-400 text-center">
            {error}
          </div>
        ) : releases.length === 0 ? (
          <div className="py-24 text-center font-mono text-xs text-slate-500 space-y-2">
            <p>{isVi ? 'Không có bản cập nhật nào trong danh mục này.' : 'No releases found in this channel.'}</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {releases.slice(0, visibleCount).map((release, idx) => {
              const tag = release.tag_name || release.name;
              const status = resolveReleaseStatus(release, isVi);
              const isDev = isDevBuildRelease(release);
              const summarySnippet = extractSummary(release.body);
              const actions = getCardActions(release);
              const isMacUser = Boolean(detectedOS?.startsWith('mac'));
              const releaseKey = release.id || tag;

              // Render Windows prominent pill
              const renderWindowsButton = () => {
                if (!actions.windows) return null;
                return (
                  <a
                    key="win-btn"
                    href={actions.windows.url}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs transition-colors cursor-pointer shadow-sm select-none"
                    title={actions.windows.name}
                  >
                    <WindowsIcon size={13} className="shrink-0" />
                    <span>{actions.windows.label}</span>
                    <Download size={12} className="opacity-70 shrink-0" />
                  </a>
                );
              };

              // Render macOS unified prominent pill with Apple Silicon & Intel dropdown
              const renderMacButton = () => {
                if (!actions.mac) return null;
                const hasMultipleOptions = actions.mac.options.length > 1;
                return (
                  <div key="mac-btn" className="relative inline-flex items-center">
                    <div className="inline-flex items-center rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs shadow-sm transition-colors select-none">
                      {/* Direct Download Trigger */}
                      <a
                        href={actions.mac.primaryUrl}
                        className={`inline-flex items-center gap-1.5 py-1.5 cursor-pointer ${hasMultipleOptions ? 'pl-3.5 pr-2' : 'px-3.5'}`}
                        title={actions.mac.primaryName}
                      >
                        <AppleIcon size={13} className="shrink-0" />
                        <span>{actions.mac.label}</span>
                        <Download size={12} className="opacity-70 shrink-0" />
                      </a>

                      {/* Dropdown Options Toggle Chevron */}
                      {hasMultipleOptions && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMacMenuId(openMacMenuId === releaseKey ? null : releaseKey);
                          }}
                          className="pr-2.5 pl-1.5 py-1.5 border-l border-slate-950/15 [html[data-theme='light']_&]:border-white/20 hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
                          aria-label="Chọn bản macOS Intel hoặc Apple Silicon"
                          title="Tùy chọn: Apple Silicon (.dmg) hoặc Mac Intel (.dmg)"
                        >
                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-150 ${openMacMenuId === releaseKey ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Popover Dropdown for macOS Options */}
                    {openMacMenuId === releaseKey && hasMultipleOptions && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-full mt-2 left-0 w-72 rounded-2xl bg-[#0F1118] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 shadow-2xl z-40 p-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 text-left"
                      >
                        <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 border-b border-white/5 [html[data-theme='light']_&]:border-slate-100 flex items-center justify-between">
                          <span>macOS Releases</span>
                          <span>.dmg</span>
                        </div>
                        <div className="py-1 space-y-1">
                          {actions.mac.options.map((opt) => (
                            <a
                              key={opt.id}
                              href={opt.url}
                              onClick={() => setOpenMacMenuId(null)}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors flex items-center justify-between text-white [html[data-theme='light']_&]:text-slate-800 cursor-pointer group/opt"
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-semibold truncate">{opt.label}</span>
                                <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate">{opt.chip}</span>
                              </div>
                              <Download size={13} className="text-slate-400 group-hover/opt:text-white [html[data-theme='light']_&]:group-hover/opt:text-slate-900 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              };

              return (
                <div
                  key={releaseKey}
                  className="rounded-3xl bg-transparent border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 p-5 sm:p-7 space-y-4 hover:border-white/20 [html[data-theme='light']_&]:hover:border-slate-300 transition-all text-left group"
                >
                  {/* Card Header: Version, Badges & Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => setActiveModalRelease(release)}
                        className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight hover:underline cursor-pointer text-left flex items-center gap-2 group-hover:text-cyan-300 [html[data-theme='light']_&]:group-hover:text-cyan-700 transition-colors"
                      >
                        <span>{tag}</span>
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      {idx === 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-200 text-white [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300">
                          {isVi ? 'MỚI NHẤT' : 'LATEST'}
                        </span>
                      )}

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                        {status.label}
                      </span>

                      {isDev && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium uppercase tracking-wider bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-slate-400 [html[data-theme='light']_&]:text-slate-600 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                          DEV BUILD
                        </span>
                      )}
                    </div>

                    <time className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 shrink-0">
                      {formatDate(release.published_at)}
                    </time>
                  </div>

                  {/* Summary Snippet Preview (Compact, Doesn't Bloat the Page) */}
                  {summarySnippet && (
                    <p
                      onClick={() => setActiveModalRelease(release)}
                      className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 line-clamp-2 font-light leading-relaxed cursor-pointer hover:text-slate-300 [html[data-theme='light']_&]:hover:text-slate-800 transition-colors"
                    >
                      {summarySnippet}
                    </p>
                  )}

                  {/* Action Bar: Download Buttons + "Xem chi tiết" Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {isMacUser ? (
                        <>
                          {renderMacButton()}
                          {renderWindowsButton()}
                        </>
                      ) : (
                        <>
                          {renderWindowsButton()}
                          {renderMacButton()}
                        </>
                      )}

                      {/* Linux (if present) */}
                      {actions.linux.map((item) => (
                        <a
                          key={item.id}
                          href={item.url}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-black font-semibold text-xs transition-colors cursor-pointer shadow-sm select-none"
                          title={item.name}
                        >
                          <LinuxIcon size={13} className="shrink-0" />
                          <span>{item.label}</span>
                          <Download size={12} className="opacity-70 shrink-0" />
                        </a>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveModalRelease(release)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 border border-white/15 [html[data-theme='light']_&]:border-slate-300 text-xs text-white [html[data-theme='light']_&]:text-slate-900 font-semibold transition-colors cursor-pointer select-none"
                    >
                      <FileText size={13} className="text-slate-300 [html[data-theme='light']_&]:text-slate-700" />
                      <span>{isVi ? 'Xem chi tiết update' : 'View Release Notes'}</span>
                      <ChevronRight size={13} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* "Xem thêm" (Load More) Button */}
            {releases.length > visibleCount && (
              <div className="pt-4 sm:pt-6 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 border border-white/15 [html[data-theme='light']_&]:border-slate-300 text-xs font-semibold text-white [html[data-theme='light']_&]:text-slate-900 transition-colors cursor-pointer select-none shadow-sm"
                >
                  <span>
                    {isVi
                      ? `Xem thêm (${releases.length - visibleCount} bản)`
                      : `Load more (${releases.length - visibleCount} more)`}
                  </span>
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── RELEASE DETAILS MODAL POPUP ── */}
      {activeModalRelease && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md transition-all duration-200"
          onClick={() => setActiveModalRelease(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-[#0A0B0F] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 shadow-2xl flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-2xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 font-mono tracking-tight">
                    {activeModalRelease.tag_name || activeModalRelease.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-100 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                    {resolveReleaseStatus(activeModalRelease, isVi).label}
                  </span>
                  {isDevBuildRelease(activeModalRelease) && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium uppercase tracking-wider bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 text-slate-400 border border-white/10">
                      DEV TEST
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                  {isVi ? 'Phát hành ngày' : 'Published on'}: {formatDate(activeModalRelease.published_at)}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveModalRelease(null)}
                className="w-9 h-9 rounded-full bg-transparent hover:bg-white/[0.08] [html[data-theme='light']_&]:hover:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                aria-label="Đóng popup"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Downloads Bar + Markdown Notes */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 scrollbar-thin">

              {/* Downloads Strip inside modal */}
              {(() => {
                const downloadItems = getDownloadItems(activeModalRelease);
                if (downloadItems.length === 0) return null;

                return (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 block">
                      {isVi ? 'GÓI CÀI ĐẶT CHÍNH THỨC' : 'OFFICIAL INSTALLATION PACKAGES'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {downloadItems.map(item => (
                        <a
                          key={item.id}
                          href={item.url}
                          className="flex items-center justify-between p-3 rounded-2xl bg-transparent hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 transition-colors group/item"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700 shrink-0">
                              {getOSIcon(item)}
                            </div>
                            <div className="min-w-0 truncate text-left">
                              <span className="text-xs font-semibold text-white [html[data-theme='light']_&]:text-slate-900 block truncate">
                                {item.label}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 truncate block">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <Download size={14} className="text-slate-400 group-hover/item:text-white [html[data-theme='light']_&]:group-hover/item:text-slate-900 shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Admin Dev Build Approval Controls if applicable */}
              {isAdmin && isDevBuildRelease(activeModalRelease) && (
                <div className="p-4 rounded-2xl bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-600">Trạng thái duyệt Dev Test:</span>
                      <span className="font-semibold text-white [html[data-theme='light']_&]:text-slate-900">
                        {approvedTags.has(activeModalRelease.tag_name || activeModalRelease.name) ? 'ĐÃ DUYỆT' : 'CHỜ DUYỆT'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {approvedTags.has(activeModalRelease.tag_name || activeModalRelease.name)
                        ? 'Developer đã có quyền thấy và tải bản test này.'
                        : 'Chỉ Admin mới có thể thấy bản build này.'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleApproval(activeModalRelease)}
                    disabled={isApproving}
                    className="px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer bg-white text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:text-white disabled:opacity-50"
                  >
                    {isApproving ? 'Đang lưu...' : (approvedTags.has(activeModalRelease.tag_name || activeModalRelease.name) ? 'Hủy duyệt' : 'Duyệt bản test')}
                  </button>
                </div>
              )}

              {/* Release Notes Markdown Body */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500 block">
                  {isVi ? 'NỘI DUNG CHI TIẾT BẢN CẬP NHẬT' : 'RELEASE NOTES & HIGHLIGHTS'}
                </span>
                <div className="text-sm text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-relaxed font-sans">
                  {formatReleaseNotes(activeModalRelease.body)}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] [html[data-theme='light']_&]:border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <button
                onClick={() => {
                  setActiveModalRelease(null);
                  if (onNavigate) onNavigate('discussions');
                }}
                className="inline-flex items-center gap-1.5 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 transition-colors cursor-pointer"
              >
                <MessageSquare size={13} />
                <span>{isVi ? 'Góp ý cho phiên bản này' : 'Send Feedback'}</span>
              </button>

              <a
                href={`https://github.com/hainguyen011/aevum-os-releases/releases/tag/${activeModalRelease.tag_name || activeModalRelease.name}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white [html[data-theme='light']_&]:hover:text-slate-950 transition-colors"
              >
                <span>GitHub Release</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Changelog;
