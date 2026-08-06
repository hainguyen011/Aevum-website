import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, Download, RefreshCw, AlertCircle, MessageSquare } from 'lucide-react';
import { TranslationService } from '../services/TranslationService';
import { ReleaseService } from '../services/ReleaseService';

export function Changelog({ activeLang, onNavigate }) {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translatedNotes, setTranslatedNotes] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const isVi = activeLang === 'vi';

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    ReleaseService.getReleases()
      .then((data) => {
        setReleases(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [activeLang]);

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

  const selectedRelease = useMemo(() => {
    return releases[selectedIndex] || releases[0] || null;
  }, [releases, selectedIndex]);

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

  const getDisplayTitle = (release) => {
    if (!release) return '';
    const rawTitle = (release.name && release.name.trim()) || release.tag_name || '';
    if (rawTitle.toLowerCase().startsWith('aevum')) {
      return rawTitle;
    }
    const formattedTag = rawTitle.startsWith('v') || rawTitle.startsWith('V')
      ? rawTitle
      : `v${rawTitle}`;
    return `Aevum ${formattedTag}`;
  };

  const getDownloadItems = (release) => {
    if (!release || !release.assets) return [];
    const exeAssets = release.assets.filter(a => a.name.endsWith('.exe'));
    if (!exeAssets.length) return [];

    // Prioritize assets containing "setup" in their names
    const setupAssets = exeAssets.filter(a => a.name.toLowerCase().includes('setup'));
    const targetAssets = setupAssets.length ? setupAssets : exeAssets;

    const armAsset = targetAssets.find(a => a.name.toLowerCase().includes('arm'));
    const x64Asset = targetAssets.find(a => !a.name.toLowerCase().includes('arm')) || targetAssets[0];

    return [
      {
        id: 'x64',
        label: 'Windows x64 (.exe)',
        url: x64Asset.browser_download_url,
        name: x64Asset.name
      },
      {
        id: 'arm64',
        label: 'Windows ARM64 (.exe)',
        url: armAsset ? armAsset.browser_download_url : x64Asset.browser_download_url,
        name: armAsset ? armAsset.name : x64Asset.name
      }
    ];
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
    if (!notes) return '';
    return notes
      .split('\n')
      .map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) {
          return <h4 key={idx} className="text-xs sm:text-sm font-bold text-cyan-300 mt-4 mb-1.5 first:mt-0 font-mono">{trimmed.replace(/^###\s*/, '')}</h4>;
        }
        if (trimmed.startsWith('##')) {
          return <h3 key={idx} className="text-sm sm:text-base font-bold text-white mt-5 mb-2 first:mt-0 font-mono border-b border-white/10 pb-1">{trimmed.replace(/^##\s*/, '')}</h3>;
        }
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const text = trimmed.replace(/^[-*]\s*/, '');
          return (
            <li key={idx} className="text-slate-300 ml-4 list-disc pl-1 mb-1.5 leading-relaxed text-xs sm:text-sm font-mono">
              {parseBoldText(text)}
            </li>
          );
        }
        if (trimmed === '---') {
          return <hr key={idx} className="my-4 border-white/10" />;
        }
        if (trimmed) {
          return <p key={idx} className="text-slate-400 mb-2 leading-relaxed text-xs sm:text-sm font-mono">{parseBoldText(trimmed)}</p>;
        }
        return <div key={idx} className="h-1.5" />;
      });
  };

  const parseBoldText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index} className="text-white font-semibold">{part}</strong> : part
    );
  };

  return (
    <div id="changelog" className="w-full bg-[#0B0B11] text-slate-100 min-h-[calc(100vh-73px)] font-sans flex flex-col">
      {/* Authentic Transparent Terminal UI (TUI) Screen */}
      <div className="border-subtle-b bg-[#0B0B11] text-left font-mono relative overflow-hidden flex-1 flex flex-col w-full">

        {/* Full-width Terminal Header Bar */}
        <div className="w-full border-b border-white/10 py-5 px-6 lg:px-10 bg-[#0B0B11] relative z-10">
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
          
          {/* Column 1: Interactive Drill-down Menu (5 Cols) */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-3 font-mono lg:border-r border-b lg:border-b-0 border-white/10 px-6 lg:px-10 py-8 h-full">
            
            {/* Current Directory Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] text-white font-mono font-bold tracking-wide uppercase">
              <span className="text-slate-400">LOCATION:</span>
              <span className="text-white">~/RELEASES</span>
            </div>

            {/* Releases Menu List */}
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
              <div className="space-y-1 font-mono text-xs sm:text-sm pt-1">
                {releases.map((release, idx) => {
                  const isFocused = selectedIndex === idx;
                  const displayTitle = getDisplayTitle(release);

                  return (
                    <div
                      key={release.id}
                      onClick={() => setSelectedIndex(idx)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex flex-col py-2 px-2.5 rounded cursor-pointer transition-colors font-mono ${
                        isFocused
                          ? 'text-white font-bold bg-white/[0.06]'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold w-4 text-center">
                          {isFocused ? '>' : ' '}
                        </span>

                        <span className={`flex-1 ${
                          isFocused ? 'text-white font-bold' : 'text-slate-200'
                        }`}>
                          {idx + 1}./ {displayTitle}
                        </span>

                        <span className="text-slate-400 text-xs font-mono font-bold">
                          &gt;
                        </span>
                      </div>

                      <span className="text-slate-400 text-xs pl-6 pt-0.5 font-normal">
                        {formatDate(release.published_at)}
                      </span>
                    </div>
                  );
                })}
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
