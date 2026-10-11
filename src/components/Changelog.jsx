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
  List,
  Lock,
  Users,
  Terminal,
  Tag,
  CheckCircle2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles
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
      formattedText: isVi ? 'Nâng cấp' : 'Upgrade',
      className: 'text-slate-400 font-mono text-xs'
    },
    improvement: {
      type: 'improvement',
      label: isVi ? 'Chỉnh sửa' : 'Improvement',
      formattedText: isVi ? 'Chỉnh sửa' : 'Improvement',
      className: 'text-slate-400 font-mono text-xs'
    },
    fix: {
      type: 'fix',
      label: isVi ? 'Sửa lỗi' : 'Bugfix',
      formattedText: isVi ? 'Sửa lỗi' : 'Bugfix',
      className: 'text-slate-400 font-mono text-xs'
    },
    release: {
      type: 'release',
      label: isVi ? 'Phát hành' : 'Release',
      formattedText: isVi ? 'Phát hành' : 'Release',
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

export function Changelog({ activeLang, onNavigate, userProfile, user }) {
  const [rawReleases, setRawReleases] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'community' | 'developer'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translatedNotes, setTranslatedNotes] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' | 'flat'
  const [approvedTags, setApprovedTags] = useState(new Set());
  const [isApproving, setIsApproving] = useState(false);
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

  // Categorize a release into a semantic group (e.g. Aevum-Beta-Test, Aevum-Dev-Test)
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
    const rawTag = release.tag_name || release.name || '';
    const name = (release.name || '').toLowerCase();

    // 0. Dev test channel (e.g. v2.2.0-dev.1)
    if (tag.includes('-dev') || tag.includes('.dev') || name.includes('dev test') || tag.includes('dev.')) {
      const isApproved = approvedTags.has(rawTag);
      return {
        groupId: 'aevum-dev-test',
        groupName: isVi ? 'AevumOS Bản Test Nội Bộ (Dev Channel)' : 'AevumOS Dev Test Builds',
        groupBadge: isApproved ? (isVi ? 'Đã duyệt' : 'Approved') : (isVi ? 'Chờ duyệt' : 'Pending'),
        channel: 'dev',
        isDevBuild: true,
        isApproved
      };
    }

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

        // Strict Role-based filtering at source:
        // - Admin: see all public + all dev releases
        // - Dev: see all public + approved dev releases
        // - Guest / Normal user: only see public releases (Dev releases are NEVER loaded into memory!)
        const authorized = allReleases.filter((release) => {
          const tag = (release.tag_name || release.name || '').toLowerCase();
          const rawTag = release.tag_name || release.name || '';
          const isDev = tag.includes('-dev') || tag.includes('.dev') || (release.prerelease && tag.includes('dev'));

          if (!isDev) {
            return true;
          }

          if (isAdmin) {
            return true;
          }

          if (isDevUser) {
            return approvedSet.has(rawTag);
          }

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
  }, [activeLang, isAdmin, isDevUser]);

  // Security Guard: Fallback to 'all' if non-dev user somehow tries to access 'developer' tab
  useEffect(() => {
    if (activeTab === 'developer' && !isDevUser) {
      setActiveTab('all');
      setSelectedIndex(0);
    }
  }, [activeTab, isDevUser]);

  // Helper check for dev build
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

  // Tab Item Counts
  const tabCounts = useMemo(() => {
    const commCount = rawReleases.filter(r => !isDevBuildRelease(r)).length;
    const devCount = isDevUser ? rawReleases.filter(r => isDevBuildRelease(r)).length : 0;
    const allCount = isDevUser ? rawReleases.length : commCount;
    return {
      all: allCount,
      community: commCount,
      developer: devCount
    };
  }, [rawReleases, isDevUser]);

  // Filter releases dynamically based on active channel tab
  const releases = useMemo(() => {
    if (activeTab === 'community') {
      return rawReleases.filter(r => !isDevBuildRelease(r));
    }
    if (activeTab === 'developer') {
      return isDevUser ? rawReleases.filter(r => isDevBuildRelease(r)) : [];
    }
    // 'all' tab
    if (!isDevUser) {
      return rawReleases.filter(r => !isDevBuildRelease(r));
    }
    return rawReleases;
  }, [rawReleases, activeTab, isDevUser]);

  // Ensure selectedIndex is within valid range after switching tabs
  useEffect(() => {
    if (selectedIndex >= releases.length && releases.length > 0) {
      setSelectedIndex(0);
    }
  }, [releases.length, selectedIndex]);

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

  // Admin approval toggle handler
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
      console.error('Failed to toggle approval:', err);
    } finally {
      setIsApproving(false);
    }
  };

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
          status: match.status,
          isDevBuild: Boolean(cat.isDevBuild),
          isApproved: Boolean(cat.isApproved)
        };
      }
    }
    return {
      groupName: cat.groupName,
      status,
      isDevBuild: Boolean(cat.isDevBuild),
      isApproved: Boolean(cat.isApproved)
    };
  }, [selectedRelease, groupedReleases, selectedIndex, isVi, approvedTags]);

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
    <div id="changelog" className="w-full bg-[#07090D] text-slate-100 min-h-[calc(100vh-73px)] font-sans flex flex-col relative overflow-hidden">
      {/* Top Ambient Grain Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[450px] pointer-events-none z-0 opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% -20%, rgba(56, 189, 248, 0.16), rgba(168, 85, 247, 0.1), transparent 75%)'
        }}
      />
      {/* Authentic Transparent Terminal UI (TUI) Screen */}
      <div className="bg-[#07090D]/80 text-left font-mono relative overflow-hidden flex-1 flex flex-col w-full z-10 backdrop-blur-sm">

        {/* Main Terminal Shell Body Container - 3-Column Grid (Transparent, Minimalist, No Inner Lines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full text-left font-mono flex-1 min-h-[500px]">

          {/* ══════════════════════════════════════════════════════════════════
              CỘT 1 (lg:col-span-4): DANH SÁCH BẢN UPDATE & SWITCH CHUYỂN ĐỔI
              Mở rộng width, Minimalist, Transparent, Text màu trắng, Hỗ trợ Light Mode
              ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-3 font-mono p-4 lg:p-5 pt-3.5 lg:pt-4 h-full flex flex-col justify-start bg-transparent group/col1">

            {/* Header Cột 1: Switch chuyển đổi 3-tab bên trái & Tổng số bản bên phải */}
            <div className="flex items-center justify-between gap-2 px-0.5">
              <div
                role="tablist"
                aria-label={isVi ? "Kênh phát hành" : "Release Channels"}
                className="inline-flex items-center p-1 rounded-full bg-white/[0.02] border border-white/10 gap-1 backdrop-blur-sm changelog-tab-pill-container w-fit max-w-full"
              >
                {/* Tab 1: Tất cả */}
                <button
                  type="button"
                  role="tab"
                  id="tab-channel-all"
                  aria-selected={activeTab === 'all'}
                  onClick={() => {
                    setActiveTab('all');
                    setSelectedIndex(0);
                  }}
                  className={`py-1.5 px-3.5 rounded-full text-xs text-center flex items-center justify-center transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-white text-slate-950 font-medium shadow-sm changelog-tab-active'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04] changelog-tab-inactive'
                  }`}
                >
                  {isVi ? 'Tất cả' : 'All'}
                </button>

                {/* Tab 2: Cộng đồng */}
                <button
                  type="button"
                  role="tab"
                  id="tab-channel-community"
                  aria-selected={activeTab === 'community'}
                  onClick={() => {
                    setActiveTab('community');
                    setSelectedIndex(0);
                  }}
                  className={`py-1.5 px-3.5 rounded-full text-xs text-center flex items-center justify-center transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                    activeTab === 'community'
                      ? 'bg-white text-slate-950 font-medium shadow-sm changelog-tab-active'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04] changelog-tab-inactive'
                  }`}
                >
                  {isVi ? 'Cộng đồng' : 'Community'}
                </button>

                {/* Tab 3: Developer (Chỉ Admin & Dev, user thường bị disable) */}
                <button
                  type="button"
                  role="tab"
                  id="tab-channel-developer"
                  aria-selected={activeTab === 'developer'}
                  disabled={!isDevUser}
                  onClick={() => {
                    if (!isDevUser) return;
                    setActiveTab('developer');
                    setSelectedIndex(0);
                  }}
                  title={
                    !isDevUser
                      ? (isVi ? '🔒 Chỉ dành cho Admin & Developer (Bạn không có quyền truy cập)' : '🔒 Restricted to Admin & Developers (Access Denied)')
                      : (isVi ? 'Kênh thử nghiệm nội bộ Developer' : 'Developer Internal Test Channel')
                  }
                  className={`py-1.5 px-3.5 rounded-full text-xs transition-colors duration-150 flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    !isDevUser
                      ? 'opacity-40 cursor-not-allowed text-white/40 select-none'
                      : activeTab === 'developer'
                      ? 'bg-white text-slate-950 font-medium shadow-sm cursor-pointer changelog-tab-active'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04] cursor-pointer changelog-tab-inactive'
                  }`}
                >
                  {!isDevUser && <Lock size={11} className="text-white/50 shrink-0" />}
                  <span>Dev</span>
                </button>
              </div>

              {/* Tổng số bản bên phải switch */}
              <span className="text-[11px] text-white/70 font-mono uppercase tracking-wider shrink-0 pr-1">
                {releases.length} {isVi ? 'bản' : 'tags'}
              </span>
            </div>

            {/* Loading / Error / Empty States */}
            {isLoading ? (
              <div className="flex items-center gap-2 text-xs text-white/80 py-4 font-mono">
                <RefreshCw size={14} className="animate-spin text-white" />
                <span>{isVi ? 'Đang tải danh sách...' : 'Fetching release list...'}</span>
              </div>
            ) : error ? (
              <div className="text-xs text-rose-400 py-4 font-mono">
                Lỗi: {error}
              </div>
            ) : releases.length === 0 ? (
              <div className="text-xs text-white/60 py-8 font-mono text-center">
                {activeTab === 'developer'
                  ? (isVi ? 'Chưa có bản test nội bộ nào.' : 'No internal test builds available.')
                  : (isVi ? 'Chưa có phiên bản nào trong kênh này.' : 'No releases available in this channel.')}
              </div>
            ) : (
              /* Minimalist Interactive Version List theo từng Kênh (Hover Scrollbar, Hỗ trợ Light Mode) */
              <div className="space-y-4 flex-1 flex flex-col min-h-0 pt-1">
                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-1 scrollbar-hover-only">
                  {groupedReleases.map((group) => (
                    <div key={group.id} className="space-y-1">
                      {/* Tiêu đề của Kênh phía trên các Version */}
                      <div className="flex items-center justify-between px-2 pt-1 pb-1">
                        <span className="text-[11px] font-mono text-white font-semibold tracking-wider uppercase">
                          {group.name}
                        </span>
                        <span className="text-[10px] text-white/50 font-mono">
                          {group.items.length} {isVi ? 'bản' : 'builds'}
                        </span>
                      </div>

                      {/* Danh sách các version thuộc Kênh */}
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const isFocused = selectedIndex === item.flatIdx;
                          const displayTitle = getDisplayTitle(item.release);
                          const status = item.status;

                          return (
                            <div
                              key={item.release.id}
                              onClick={() => setSelectedIndex(item.flatIdx)}
                              className={`group flex items-center justify-between py-2 px-2.5 rounded-xl cursor-pointer transition-all font-mono text-xs ${
                                isFocused
                                  ? 'text-white font-medium bg-white/[0.08] changelog-row-active'
                                  : 'text-white/80 hover:text-white hover:bg-white/[0.03] changelog-row-inactive'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-white font-bold w-3 text-center shrink-0">
                                  {isFocused ? '>' : ' '}
                                </span>
                                <span className="text-white/70 font-mono text-[10px] shrink-0">
                                  {status.label}
                                </span>
                                <span className="truncate text-xs text-white">
                                  {displayTitle}
                                </span>
                              </div>
                              <span className="text-[10px] text-white/60 shrink-0 pl-1 font-mono">
                                {formatDate(item.release.published_at)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ══════════════════════════════════════════════════════════════════
              CỘT 2 (lg:col-span-4): BẢNG THÔNG TIN UPDATE & CÁC LINK TẢI XUỐNG
              Style Grainy Gradient bg từ trên xuống, Text màu trắng toàn bộ
              ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-3 font-mono p-4 lg:p-5 pt-3.5 lg:pt-4 relative overflow-hidden flex flex-col justify-start min-h-[500px] bg-transparent">

            {/* ── GRAINY GRADIENT ATMOSPHERE (Top to bottom Cyan-Blue like TesterLeaderboard.jsx) ── */}
            <div
              className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0 select-none"
              aria-hidden="true"
            >
              {/* 1. Soft Vertical Linear Flow */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.25) 0%, rgba(14, 165, 233, 0.10) 22%, rgba(14, 165, 233, 0.02) 48%, transparent 74%)',
                }}
              />

              {/* 2. Top Aura Glow Wash */}
              <div
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-[120%] h-48 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 75% 65% at 50% 0%, rgba(56, 189, 248, 0.32) 0%, rgba(14, 165, 233, 0.08) 55%, transparent 100%)',
                  filter: 'blur(36px)',
                }}
              />

              {/* 3. Authentic Grainy Noise Texture Layer */}
              <div
                className="absolute inset-0 select-none opacity-[0.14] mix-blend-overlay pointer-events-none z-[1]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterLeaderboard'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterLeaderboard)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '140px 140px',
                  WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 24%, rgba(0,0,0,0.12) 50%, transparent 78%)',
                  maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 24%, rgba(0,0,0,0.12) 50%, transparent 78%)',
                }}
              />
            </div>

            {/* Content Container (Column 2) */}
            <div className="relative z-10 space-y-4">
              {selectedRelease ? (
                <>
                  {/* Bảng Thông Tin Update (Transparent, Không viền hộp, Hỗ trợ Light Mode) */}
                  <div className="p-1 space-y-3 bg-transparent">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm sm:text-base font-bold text-white tracking-wide font-mono truncate">
                        {getDisplayTitle(selectedRelease).toUpperCase()}
                      </div>
                      {selectedMeta?.status && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono shrink-0">
                          {selectedMeta.status.label}
                        </span>
                      )}
                    </div>

                    {/* Quick Stats Grid 3 ô (Transparent, Không viền, Không nền, Hỗ trợ Light Mode) */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-1.5 bg-transparent">
                        <div className="text-[10px] text-white/60 uppercase">KÊNH</div>
                        <div className="text-white font-bold truncate text-[11px] mt-0.5">
                          {selectedMeta?.groupName ? selectedMeta.groupName.split(' ')[0] : 'Beta'}
                        </div>
                      </div>
                      <div className="p-1.5 bg-transparent">
                        <div className="text-[10px] text-white/60 uppercase">PHÁT HÀNH</div>
                        <div className="text-white font-bold truncate text-[11px] mt-0.5">
                          {formatDate(selectedRelease.published_at)}
                        </div>
                      </div>
                      <div className="p-1.5 bg-transparent">
                        <div className="text-[10px] text-white/60 uppercase">TỆP TẢI</div>
                        <div className="text-white font-bold text-[11px] mt-0.5">
                          {getDownloadItems(selectedRelease).length} {isVi ? 'tệp' : 'files'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] text-white pt-0.5 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">TAG:</span>
                        <span className="text-white font-bold">{selectedRelease.tag_name || selectedRelease.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">REPO:</span>
                        <span className="text-white/80 font-mono">hainguyen011/aevum-os-releases</span>
                      </div>
                    </div>
                  </div>

                  {/* Dev Test Admin Approval & Gating Banner */}
                  {selectedMeta?.isDevBuild && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-3.5 space-y-2">
                      {isAdmin ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white font-mono">
                                {isVi ? 'BẢN DEV TEST' : 'DEV TEST BUILD'}
                              </span>
                              <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full font-mono bg-white/10 text-white"
                              >
                                {selectedMeta.isApproved
                                  ? (isVi ? 'ĐÃ DUYỆT' : 'APPROVED')
                                  : (isVi ? 'CHỜ DUYỆT' : 'PENDING')}
                              </span>
                            </div>
                            <button
                              onClick={() => handleToggleApproval(selectedRelease)}
                              disabled={isApproving}
                              className="px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-white/10"
                            >
                              {isApproving
                                ? (isVi ? 'Đang lưu...' : 'Saving...')
                                : selectedMeta.isApproved
                                  ? (isVi ? 'Hủy duyệt' : 'Revoke')
                                  : (isVi ? 'Duyệt bản test' : 'Approve')}
                            </button>
                          </div>
                          <p className="text-[10px] text-white/70 leading-normal font-sans">
                            {selectedMeta.isApproved
                              ? (isVi ? 'Developer đã có quyền thấy và tải bản test này.' : 'Developers can now see and download this build.')
                              : (isVi ? 'Chỉ Admin mới có thể thấy bản build này.' : 'Only Admin can currently see this build.')}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-mono text-white">
                          <CheckCircle2 size={14} className="text-white shrink-0" />
                          <span className="text-[11px] text-white/80">{isVi ? 'Đã được Admin duyệt cho Developer.' : 'Approved by Admin for internal testing.'}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bảng Các Link Tải Xuống (Transparent, No Border, No Bg, Hỗ trợ Light Mode) */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono text-white uppercase tracking-wider flex items-center justify-between px-1">
                      <span>{isVi ? 'Link tải xuống:' : 'Download Links:'}</span>
                      <span className="text-[10px] text-white/60 font-normal">
                        {isVi ? 'Mọi nền tảng' : 'All platforms'}
                      </span>
                    </div>

                    {(() => {
                      const downloadItems = getDownloadItems(selectedRelease);
                      return downloadItems.length > 0 ? (
                        <div className="space-y-1.5 pt-0.5">
                          {downloadItems.map((item) => (
                            <a
                              key={item.id}
                              href={item.url}
                              className="group flex items-center justify-between py-2 px-1.5 rounded-lg bg-transparent hover:bg-transparent transition-colors duration-150 cursor-pointer download-item"
                              title={item.name}
                            >
                              <div className="truncate text-left min-w-0 flex-1">
                                <div className="text-xs font-semibold text-white/70 group-hover:text-white truncate transition-colors duration-150 download-title">
                                  {item.label}
                                </div>
                                <div className="text-[10px] text-white/40 group-hover:text-white/80 truncate font-mono transition-colors duration-150 download-filename">
                                  {item.name}
                                </div>
                              </div>
                              <Download size={13} className="text-white/40 group-hover:text-white transition-colors duration-150 shrink-0 ml-2 download-icon" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs text-white/60 font-mono py-2">
                          <RefreshCw size={12} className="animate-spin text-white/60" />
                          <span>{isVi ? 'Đang chuẩn bị gói cài đặt...' : 'Preparing installers...'}</span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Nút Báo lỗi & Gửi phản hồi (Transparent, Pill, Hỗ trợ Light Mode) */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate && onNavigate('discussions')}
                      className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white hover:text-white transition-colors font-mono cursor-pointer border border-white/10 hover:border-white/20 bg-transparent hover:bg-white/[0.03] px-4 py-2 rounded-full"
                    >
                      <MessageSquare size={13} className="text-white" />
                      <span className="truncate">{isVi ? `Báo lỗi cho ${selectedRelease.tag_name || selectedRelease.name}` : `Report Bug for ${selectedRelease.tag_name || selectedRelease.name}`}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-white/60 font-mono text-xs text-center space-y-3">
                  {isLoading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-white mb-2" />
                  ) : (
                    <span>Chưa chọn phiên bản</span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════════
              CỘT 3 (lg:col-span-4): THÔNG TIN BẢN CẬP NHẬT (RELEASE NOTES)
              Render markdown chi tiết, Transparent, Bỏ các line bên trong, Hỗ trợ Light Mode
              ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-2.5 font-mono p-4 lg:p-5 pt-3.5 lg:pt-4 pr-8 lg:pr-14 xl:pr-16 relative flex flex-col justify-start min-h-[500px] bg-transparent group/col3">

            {/* Header Cột 3 (Không line gạch chân, Không icon thừa, Tinh gọn chiều cao, Hỗ trợ Light Mode) */}
            <div className="flex items-center justify-between py-0.5 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  {isVi ? 'Thông tin bản cập nhật' : 'Release Notes'}
                </span>
                {selectedRelease && (
                  <span className="text-[11px] text-white/80 font-mono">
                    {selectedRelease.tag_name || selectedRelease.name}
                  </span>
                )}
              </div>

              {/* Status Translation Badge */}
              {isTranslating ? (
                <div className="flex items-center gap-1.5 text-[10px] text-white font-mono">
                  <RefreshCw size={11} className="animate-spin text-white" />
                  <span>{isVi ? 'Đang dịch...' : 'Translating...'}</span>
                </div>
              ) : (
                <span className="text-[10px] text-white/70 font-mono">
                  {isVi ? 'Tiếng Việt (Auto)' : 'English'}
                </span>
              )}
            </div>

            {/* Markdown Body Content Container (Scrollable, Hover-only Scrollbar) */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-2 scrollbar-hover-only">
              {selectedRelease ? (
                <div className="text-xs leading-relaxed text-white font-sans">
                  {isTranslating ? (
                    <div className="flex items-center gap-2 py-8 text-white/70 font-mono text-xs justify-center">
                      <RefreshCw size={14} className="animate-spin text-white" />
                      <span>{isVi ? 'Đang tự động dịch nội dung cập nhật...' : 'Translating release notes...'}</span>
                    </div>
                  ) : (
                    formatReleaseNotes(translatedNotes || selectedRelease.body)
                  )}
                  <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse align-middle" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-white/60 font-mono text-xs text-center space-y-3">
                  {isLoading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-white mb-2" />
                  ) : activeTab === 'developer' ? (
                    <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 max-w-sm backdrop-blur-md">
                      <Terminal className="w-7 h-7 text-white mx-auto opacity-75" />
                      <div className="text-white font-bold">{isVi ? 'KÊNH DEVELOPER NỘI BỘ' : 'DEVELOPER CHANNEL'}</div>
                      <p className="text-white/70 text-[11px] leading-relaxed">
                        {isVi
                          ? 'Hiện chưa có bản build test dev nào hoặc bạn chưa được cấp phép truy cập.'
                          : 'No developer test builds are currently active or authorized.'}
                      </p>
                    </div>
                  ) : (
                    <span>Chưa có thông tin cập nhật</span>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Changelog;
