import React, { useEffect, useState, useMemo } from 'react';
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  MessageSquare, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  List 
} from 'lucide-react';
import { TranslationService } from '../services/TranslationService';
import { ReleaseService } from '../services/ReleaseService';
import { CustomSelect } from './ui/CustomSelect';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true,
});

// Verified status mappings for established releases
const KNOWN_RELEASE_STATUS = {
  'v1.0.0-beta.6': 'upgrade',     // Fastify v5 Core, OpenAPI 3.1 & Zero-Copy WebSocket (Nâng cấp)
  'v1.0.0-beta.5': 'upgrade',     // Masonry Grid & Inset Box-Shadow Cyberpunk UI (Nâng cấp)
  'v1.0.0-beta.4': 'upgrade',     // Major Hub & Squad Presence additions (Nâng cấp)
  'v1.0.0-beta.3': 'improvement', // Tiered Plan & Canvas refactoring / optimization (Chỉnh sửa)
  'v1.0.0-beta.2': 'improvement', // Auto-updater & packaging enhancements (Chỉnh sửa)
  'v1.0.0-beta.0': 'fix',         // Initial beta with multiple engine bugfixes & stability patches (Sửa lỗi)
};

export const resolveReleaseStatus = (release, isVi = true) => {
  const tag = (release?.tag_name || release?.name || '').trim();
  const lowerTag = tag.toLowerCase();
  const body = (release?.body || '').toLowerCase();
  const name = (release?.name || '').toLowerCase();

  let statusKey = KNOWN_RELEASE_STATUS[tag];

  if (!statusKey) {
    if (
      lowerTag.includes('fix') ||
      lowerTag.includes('patch') ||
      lowerTag.includes('hotfix') ||
      name.includes('sửa lỗi') ||
      name.includes('bug') ||
      name.includes('fix') ||
      body.includes('### sửa lỗi') ||
      body.includes('### fixes') ||
      body.includes('### bug fixes')
    ) {
      statusKey = 'fix';
    } else if (
      lowerTag.includes('refactor') ||
      lowerTag.includes('perf') ||
      name.includes('chỉnh sửa') ||
      name.includes('cải tiến') ||
      name.includes('tối ưu') ||
      body.includes('### cải tiến') ||
      body.includes('### improvements') ||
      body.includes('### refactor')
    ) {
      statusKey = 'improvement';
    } else if (
      lowerTag.includes('feat') ||
      name.includes('nâng cấp') ||
      name.includes('tính năng') ||
      name.includes('feature') ||
      body.includes('### tính năng mới') ||
      body.includes('### new features') ||
      body.includes('### features')
    ) {
      statusKey = 'upgrade';
    } else {
      statusKey = 'upgrade';
    }
  }

  const config = {
    upgrade: {
      type: 'upgrade',
      label: isVi ? 'Nâng cấp' : 'Upgrade',
      formattedText: isVi ? '[Nâng cấp]' : '[Upgrade]',
      className: 'text-slate-400 font-mono text-xs'
    },
    improvement: {
      type: 'improvement',
      label: isVi ? 'Chỉnh sửa' : 'Improvement',
      formattedText: isVi ? '[Chỉnh sửa]' : '[Improvement]',
      className: 'text-slate-400 font-mono text-xs'
    },
    fix: {
      type: 'fix',
      label: isVi ? 'Sửa lỗi' : 'Bugfix',
      formattedText: isVi ? '[Sửa lỗi]' : '[Bugfix]',
      className: 'text-slate-400 font-mono text-xs'
    },
    release: {
      type: 'release',
      label: isVi ? 'Phát hành' : 'Release',
      formattedText: isVi ? '[Phát hành]' : '[Release]',
      className: 'text-slate-400 font-mono text-xs'
    }
  };

  return config[statusKey] || config.upgrade;
};

export const getDisplayTitle = (release) => {
  if (!release) return '';
  const rawTitle = (release.name && release.name.trim()) || release.tag_name || '';
  if (rawTitle.toLowerCase().startsWith('aevum')) {
    return rawTitle;
  }
  const formattedTag = rawTitle.startsWith('v') || rawTitle.startsWith('V')
    ? rawTitle
    : `v${rawTitle}`;
  return `AevumOS ${formattedTag}`;
};

export function Changelog({ activeLang, onNavigate }) {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translatedNotes, setTranslatedNotes] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' | 'flat'
  const isVi = activeLang === 'vi';

  // Categorize a release into a semantic group (e.g. Aevum-Beta-Test)
  const categorizeRelease = (release) => {
    if (!release) {
      return {
        groupId: 'aevum-releases',
        groupName: 'AevumOS Releases',
        groupBadge: isVi ? 'Bản phát hành' : 'Releases',
        channel: 'general'
      };
    }

    const tag = (release.tag_name || release.name || '').toLowerCase();
    const name = (release.name || '').toLowerCase();

    // 1. Beta test channel (e.g. v1.0.0-beta.4, beta.3, etc.)
    if (tag.includes('beta') || name.includes('beta')) {
      return {
        groupId: 'aevum-beta-test',
        groupName: 'Aevum-Beta-Test',
        groupBadge: isVi ? 'Bản Thử Nghiệm' : 'Public Beta',
        channel: 'beta'
      };
    }

    // 2. Alpha test channel
    if (tag.includes('alpha') || name.includes('alpha')) {
      return {
        groupId: 'aevum-alpha-test',
        groupName: 'Aevum-Alpha-Test',
        groupBadge: isVi ? 'Nội Bộ' : 'Alpha',
        channel: 'alpha'
      };
    }

    // 3. Stable / Official series (e.g. v1.0.0, v2.1.0)
    const stableMatch = tag.match(/^v?(\d+\.\d+)(?:\.(\d+))?/i);
    if (stableMatch) {
      const majorMinor = stableMatch[1];
      return {
        groupId: `aevum-v${majorMinor}`,
        groupName: `AevumOS v${majorMinor} (Official)`,
        groupBadge: isVi ? 'Chính Thức' : 'Official',
        channel: 'stable'
      };
    }

    // 4. Fallback general group
    return {
      groupId: 'aevum-releases',
      groupName: 'AevumOS Releases',
      groupBadge: isVi ? 'Phát Hành' : 'Release',
      channel: 'general'
    };
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    ReleaseService.getReleases()
      .then((data) => {
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => {
              const timeA = new Date(a.published_at || a.created_at || 0).getTime();
              const timeB = new Date(b.published_at || b.created_at || 0).getTime();
              if (timeB !== timeA) return timeB - timeA;
              return (b.tag_name || b.name || '').localeCompare(a.tag_name || a.name || '', undefined, { numeric: true });
            })
          : [];
        setReleases(sorted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [activeLang]);

  // Compute grouped releases with update numbering (e.g. Bản update 4, 3, 2, 1)
  const groupedReleases = useMemo(() => {
    const groupsMap = new Map();

    releases.forEach((release, flatIdx) => {
      const cat = categorizeRelease(release);
      if (!groupsMap.has(cat.groupId)) {
        groupsMap.set(cat.groupId, {
          id: cat.groupId,
          name: cat.groupName,
          badge: cat.groupBadge,
          channel: cat.channel,
          items: []
        });
      }
      groupsMap.get(cat.groupId).items.push({
        release,
        flatIdx
      });
    });

    return Array.from(groupsMap.values()).map(group => {
      const total = group.items.length;
      const itemsWithLabels = group.items.map((item, itemIdx) => {
        const tag = (item.release.tag_name || item.release.name || '').toLowerCase();
        const betaMatch = tag.match(/beta\.?(\d+)/i);
        let updateNum;

        if (betaMatch && parseInt(betaMatch[1], 10) > 0) {
          updateNum = parseInt(betaMatch[1], 10);
        } else {
          // Chronological fallback: earliest is 1, newest is total
          updateNum = total - itemIdx;
        }

        const status = resolveReleaseStatus(item.release, isVi);

        return {
          ...item,
          updateNum,
          status
        };
      });

      return {
        ...group,
        items: itemsWithLabels
      };
    });
  }, [releases, isVi]);

  // Options for Version Select dropdown
  const selectOptions = useMemo(() => {
    return releases.map((release, idx) => {
      const status = resolveReleaseStatus(release, isVi);
      const displayTitle = getDisplayTitle(release);
      const isLatest = idx === 0;

      return {
        value: idx,
        label: `${displayTitle}  ${status.formattedText}${isLatest ? (isVi ? ' (Mới nhất)' : ' (Latest)') : ''}`
      };
    });
  }, [releases, isVi]);

  const toggleGroup = (groupId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Keyboard navigation [↑/↓]
  useEffect(() => {
    if (!releases.length) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(releases.length - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [releases.length]);

  // Auto-expand group if active release is inside a collapsed group
  useEffect(() => {
    if (!releases.length || selectedIndex < 0 || selectedIndex >= releases.length) return;
    const activeRelease = releases[selectedIndex];
    if (!activeRelease) return;
    const cat = categorizeRelease(activeRelease);
    if (collapsedGroups[cat.groupId]) {
      setCollapsedGroups(prev => ({
        ...prev,
        [cat.groupId]: false
      }));
    }
  }, [selectedIndex, releases]);

  const selectedRelease = useMemo(() => {
    return releases[selectedIndex] || releases[0] || null;
  }, [releases, selectedIndex]);

  // Selected release group & update metadata
  const selectedMeta = useMemo(() => {
    if (!selectedRelease) return null;
    const cat = categorizeRelease(selectedRelease);
    const status = resolveReleaseStatus(selectedRelease, isVi);
    for (const g of groupedReleases) {
      const match = g.items.find(i => i.flatIdx === selectedIndex);
      if (match) {
        return {
          groupName: g.name,
          status: match.status
        };
      }
    }
    return {
      groupName: cat.groupName,
      status
    };
  }, [selectedRelease, groupedReleases, selectedIndex, isVi]);

  // Auto-translate release notes dynamically using TranslationService
  useEffect(() => {
    if (!selectedRelease || !selectedRelease.body) {
      setTranslatedNotes('');
      return;
    }

    let isMounted = true;
    setIsTranslating(true);

    TranslationService.translateMarkdown(selectedRelease.body, isVi ? 'vi' : 'en')
      .then((translated) => {
        if (isMounted) {
          setTranslatedNotes(translated || selectedRelease.body);
          setIsTranslating(false);
        }
      })
      .catch((err) => {
        console.error('[Changelog] Translation failed:', err);
        if (isMounted) {
          setTranslatedNotes(selectedRelease.body);
          setIsTranslating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedRelease?.id, activeLang, isVi]);


  const getDownloadItems = (release) => {
    if (!release || !release.assets) return [];
    const items = [];

    // 1. Windows Installers (.exe)
    const exeAssets = release.assets.filter(a => a.name.endsWith('.exe'));
    const winArm = exeAssets.find(a => /arm64|aarch64/i.test(a.name));
    const winX64 = exeAssets.find(a => !/arm64|aarch64/i.test(a.name));

    if (winX64) {
      items.push({
        id: 'win-x64',
        label: 'Windows x64 (.exe)',
        url: winX64.browser_download_url,
        name: winX64.name
      });
    }
    if (winArm) {
      items.push({
        id: 'win-arm64',
        label: 'Windows ARM64 (.exe)',
        url: winArm.browser_download_url,
        name: winArm.name
      });
    }

    // 2. macOS Installers (.dmg)
    const dmgAssets = release.assets.filter(a => a.name.endsWith('.dmg'));
    const macArmDmg = dmgAssets.find(a => /arm64|apple|m1|m2/i.test(a.name));
    const macX64Dmg = dmgAssets.find(a => /x64|intel/i.test(a.name));
    const macUniversalDmg = dmgAssets.find(a => !/arm64|x64/i.test(a.name));

    if (macArmDmg) {
      items.push({
        id: 'mac-arm64-dmg',
        label: 'macOS Apple Silicon (.dmg)',
        url: macArmDmg.browser_download_url,
        name: macArmDmg.name
      });
    }
    if (macX64Dmg) {
      items.push({
        id: 'mac-x64-dmg',
        label: 'macOS Intel (.dmg)',
        url: macX64Dmg.browser_download_url,
        name: macX64Dmg.name
      });
    }
    if (!macArmDmg && !macX64Dmg && macUniversalDmg) {
      items.push({
        id: 'mac-dmg',
        label: 'macOS (.dmg)',
        url: macUniversalDmg.browser_download_url,
        name: macUniversalDmg.name
      });
    }

    // 3. macOS Portable Archives (.zip)
    const zipAssets = release.assets.filter(a => a.name.endsWith('.zip') && !a.name.includes('.blockmap'));
    const macArmZip = zipAssets.find(a => /mac/i.test(a.name) && /arm64|apple/i.test(a.name));
    const macX64Zip = zipAssets.find(a => /mac/i.test(a.name) && /x64|intel/i.test(a.name));

    if (macArmZip) {
      items.push({
        id: 'mac-arm64-zip',
        label: 'macOS Apple Silicon (.zip)',
        url: macArmZip.browser_download_url,
        name: macArmZip.name
      });
    }
    if (macX64Zip) {
      items.push({
        id: 'mac-x64-zip',
        label: 'macOS Intel (.zip)',
        url: macX64Zip.browser_download_url,
        name: macX64Zip.name
      });
    }

    // 4. Linux Installers (.AppImage / .deb)
    const linuxAssets = release.assets.filter(a => a.name.endsWith('.AppImage') || a.name.endsWith('.deb'));
    linuxAssets.forEach(l => {
      items.push({
        id: `linux-${l.name}`,
        label: `Linux (${l.name.split('.').pop()})`,
        url: l.browser_download_url,
        name: l.name
      });
    });

    return items;
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
      return (
        <div
          className="github-markdown-body"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      );
    } catch (e) {
      console.error('[Changelog] Markdown parsing error:', e);
      return <div className="text-slate-300 font-mono text-xs">{notes}</div>;
    }
  };

  return (
    <div id="changelog" className="w-full bg-[#07090D] text-slate-100 min-h-[calc(100vh-73px)] font-sans flex flex-col">
      {/* Authentic Transparent Terminal UI (TUI) Screen */}
      <div className="border-subtle-b bg-[#07090D] text-left font-mono relative overflow-hidden flex-1 flex flex-col w-full">

        {/* Full-width Terminal Header Bar */}
        <div className="w-full border-b border-white/10 py-5 px-6 lg:px-10 bg-[#07090D] relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold tracking-wider">AEVUM TTY CHANGELOG SHELL v1.0.0</span>
            </div>
            <div className="flex items-center text-[11px] text-slate-500 font-mono">
              <span>Use [↑/↓] arrows or click options</span>
            </div>
          </div>
        </div>

        {/* Main Terminal Shell Body Container - 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full text-left font-mono flex-1 min-h-[500px]">
          
          {/* Column 1: Interactive Drill-down Menu / Version Selector (5 Cols) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-4 font-mono lg:border-r border-b lg:border-b-0 border-white/10 px-6 lg:px-10 py-8 h-full">
            
            {/* Current Directory Breadcrumb */}
            <div className="flex items-center justify-between text-[11px] text-white font-mono font-bold tracking-wide uppercase pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-white">~/RELEASES</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {releases.length} {isVi ? 'phiên bản' : 'releases'}
              </span>
            </div>

            {/* Version Selector (Dạng Select - Default là bản mới nhất) */}
            {isLoading ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-4 font-mono">
                <RefreshCw size={14} className="animate-spin text-cyan-400" />
                <span>{isVi ? 'Đang tải danh sách...' : 'Fetching release list...'}</span>
              </div>
            ) : error ? (
              <div className="text-xs text-red-400 py-4 font-mono">
                [ERROR] {error}
              </div>
            ) : releases.length === 0 ? (
              <div className="text-xs text-slate-500 py-4 font-mono">
                [EMPTY] No releases available.
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                {/* Select Dropdown Control */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    <span>{isVi ? 'Chọn phiên bản:' : 'Select Version:'}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {isVi ? 'Mặc định: mới nhất' : 'Default: latest'}
                    </span>
                  </div>

                  <CustomSelect
                    options={selectOptions}
                    value={selectedIndex}
                    onChange={(val) => setSelectedIndex(Number(val))}
                    className="w-full"
                    buttonClassName="bg-white/[0.02] border-white/15 hover:border-white/30 text-white py-2.5 px-3.5 rounded-lg backdrop-blur-sm"
                  />
                </div>

                {/* Selected Version Overview Card */}
                {selectedRelease && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.015] backdrop-blur-sm p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <Folder size={14} className="text-white shrink-0" />
                        <span className="font-bold text-white truncate text-xs sm:text-sm">
                          {getDisplayTitle(selectedRelease)}
                        </span>
                      </div>
                      {selectedMeta?.status && (
                        <span className="text-slate-400 text-xs font-mono shrink-0">
                          {selectedMeta.status.formattedText}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-400">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">PHÁT HÀNH:</span>
                        <span className="text-slate-300">{formatDate(selectedRelease.published_at)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">KÊNH:</span>
                        <span className="text-slate-300">{selectedMeta?.groupName || 'Aevum-Beta-Test'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">TAG:</span>
                        <span className="text-white font-bold">{selectedRelease.tag_name || selectedRelease.name}</span>
                      </div>
                    </div>

                    {/* Quick Stepper Navigation between releases */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <button
                        type="button"
                        disabled={selectedIndex >= releases.length - 1}
                        onClick={() => setSelectedIndex(prev => Math.min(releases.length - 1, prev + 1))}
                        className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer flex items-center gap-1 transition-colors"
                      >
                        <span>&larr; {isVi ? 'Bản cũ hơn' : 'Older'}</span>
                      </button>
                      <span className="text-slate-600">|</span>
                      <button
                        type="button"
                        disabled={selectedIndex <= 0}
                        onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
                        className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer flex items-center gap-1 transition-colors"
                      >
                        <span>{isVi ? 'Bản mới hơn' : 'Newer'} &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Version List (Pure text badges, transparent, zero box-shadow) */}
                <div className="pt-2 space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1">
                    {isVi ? 'Tất cả các bản cập nhật:' : 'All releases:'}
                  </div>
                  {releases.map((release, idx) => {
                    const isFocused = selectedIndex === idx;
                    const displayTitle = getDisplayTitle(release);
                    const status = resolveReleaseStatus(release, isVi);

                    return (
                      <div
                        key={release.id}
                        onClick={() => setSelectedIndex(idx)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex items-center justify-between py-2 px-2.5 rounded cursor-pointer transition-colors font-mono text-xs ${
                          isFocused
                            ? 'text-white font-medium bg-white/[0.04]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-cyan-400 font-bold w-3 text-center shrink-0">
                            {isFocused ? '>' : ' '}
                          </span>
                          <span className="text-slate-500 font-mono text-[11px] shrink-0">
                            {status.formattedText}
                          </span>
                          <span className={`truncate ${isFocused ? 'text-white' : 'text-slate-300'}`}>
                            {displayTitle}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 shrink-0 pl-2">
                          {formatDate(release.published_at)}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>

          {/* Column 2: Terminal Output Render (7 Cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7 space-y-4 font-mono px-6 lg:px-10 py-8">
            
            {selectedRelease ? (
              <>
                {/* Command Line */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-white pb-1">
                  <span className="text-slate-400 font-bold">$</span>
                  <span className="font-bold text-white">aevum-os help --release={selectedRelease.tag_name}</span>
                </div>

                {/* Output Display */}
                <div className="pt-1 space-y-4 min-h-[300px]">
                  <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono">
                    [{getDisplayTitle(selectedRelease).toUpperCase()}]
                  </div>

                  <div className="text-xs text-slate-400 font-mono space-y-1">
                    {selectedMeta && (
                      <div className="text-slate-300 font-semibold flex items-center gap-2">
                        <span>► SERIES: {selectedMeta.groupName}</span>
                        {selectedMeta.status && (
                          <span className="text-slate-400 text-xs font-mono">
                            {selectedMeta.status.formattedText}
                          </span>
                        )}
                      </div>
                    )}
                    <div>► PUBLISHED: {formatDate(selectedRelease.published_at)}</div>
                    <div>► REPO: hainguyen011/aevum-os-releases</div>
                  </div>

                  {/* Download Action */}
                  <div className="pt-2">
                    {(() => {
                      const downloadItems = getDownloadItems(selectedRelease);
                      return downloadItems.length > 0 ? (
                        <div className="flex flex-col gap-2.5">
                          {downloadItems.map((item) => (
                            <a
                              key={item.id}
                              href={item.url}
                              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors font-mono cursor-pointer w-fit"
                              title={item.name}
                            >
                              <Download size={14} />
                              <span>{item.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <RefreshCw size={12} className="animate-spin text-slate-500" />
                          <span>{isVi ? 'Đang đóng gói bản Windows (.exe)...' : 'Packaging Windows build (.exe)...'}</span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Discussion & Bug Hunter Link Button */}
                  <div className="pt-1">
                    <button
                      onClick={() => onNavigate && onNavigate('discussions')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors font-mono cursor-pointer border border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 px-3.5 py-2 rounded-md"
                    >
                      <MessageSquare size={13} />
                      <span>{isVi ? `Báo lỗi / Gửi phản hồi cho ${selectedRelease.tag_name}` : `Report Bug / Discuss ${selectedRelease.tag_name}`}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="pt-3 border-t border-white/10 text-xs sm:text-sm leading-relaxed text-slate-200">
                    {isTranslating ? (
                      <div className="flex items-center gap-2 py-2 text-slate-400 font-mono text-xs">
                        <RefreshCw size={12} className="animate-spin text-cyan-400" />
                        <span>{isVi ? 'Đang tự động dịch nội dung cập nhật...' : 'Translating release notes...'}</span>
                      </div>
                    ) : (
                      formatReleaseNotes(translatedNotes || selectedRelease.body)
                    )}
                    <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse align-middle" />
                  </div>

                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 font-mono text-xs">
                {isLoading ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
                ) : (
                  <span>[ NO RELEASE SELECTED ]</span>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Changelog;
