import React, { useEffect, useState } from 'react';
import { Calendar, Download, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function Changelog({ activeLang }) {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedReleases, setExpandedReleases] = useState({});
  const isVi = activeLang === 'vi';

  const toggleExpand = (id) => {
    setExpandedReleases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {};

    console.log('[Changelog] Fetching releases from GitHub...');
    console.log('[Changelog] Token exists:', !!token, 'Token prefix:', token ? token.substring(0, 4) + '...' : 'none');

    if (token && token !== 'your_read_only_token_here') {
      headers['Authorization'] = `Bearer ${token}`;
      headers['Accept'] = 'application/vnd.github+json';
    }

    fetch('https://api.github.com/repos/hainguyen011/Aevum-OS/releases', { headers })
      .then((res) => {
        console.log('[Changelog] Response status:', res.status, res.statusText);
        if (!res.ok) {
          throw new Error(isVi
            ? `Không thể tải danh sách cập nhật từ GitHub (Lỗi ${res.status}).`
            : `Failed to fetch releases from GitHub (Status ${res.status}).`
          );
        }
        return res.json();
      })
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
          return <h4 key={idx} className="text-base sm:text-lg font-semibold text-white mt-5 mb-2 first:mt-0">{trimmed.replace(/^###\s*/, '')}</h4>;
        }
        if (trimmed.startsWith('##')) {
          return <h3 key={idx} className="text-lg sm:text-xl font-bold text-white mt-7 mb-3 first:mt-0">{trimmed.replace(/^##\s*/, '')}</h3>;
        }
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const text = trimmed.replace(/^[-*]\s*/, '');
          return (
            <li key={idx} className="text-slate-300 ml-5 list-disc pl-1 mb-2 leading-relaxed text-sm sm:text-base">
              {parseBoldText(text)}
            </li>
          );
        }
        if (trimmed === '---') {
          return <hr key={idx} className="my-5 border-white/10" />;
        }
        if (trimmed) {
          return <p key={idx} className="text-slate-400 mb-2.5 leading-relaxed text-sm sm:text-base">{parseBoldText(trimmed)}</p>;
        }
        return <div key={idx} className="h-2" />;
      });
  };

  const parseBoldText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index} className="text-white font-semibold">{part}</strong> : part
    );
  };

  return (
    <div className="w-full min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8 xl:px-10 max-w-3xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          {isVi ? 'Nhật ký Cập nhật' : 'Changelog'}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {isVi
            ? 'Theo dõi tất cả các bản phát hành, nâng cấp hiệu năng và tính năng mới từ hệ điều hành Aevum OS.'
            : 'Track all official releases, performance updates, and new features from Aevum OS.'}
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-sm text-slate-400 font-mono">
            {isVi ? 'Đang tải bản cập nhật...' : 'Fetching releases...'}
          </span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-red-950/20 border border-red-500/20 rounded-xl max-w-xl mx-auto space-y-4 text-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-200 border border-red-500/30 rounded-lg text-xs font-semibold font-mono transition-colors"
          >
            {isVi ? 'Thử lại' : 'Retry'}
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12">
          {releases.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-sm">
              {isVi ? 'Hiện tại chưa có bản phát hành nào được đăng tải.' : 'No releases found.'}
            </div>
          ) : (
            releases.map((release, index) => {
              const exeAsset = release.assets?.find(asset => asset.name.endsWith('.exe'));
              const baseVersion = release.tag_name.replace(/^v/i, '').split('-')[0];
              const displayTitle = release.prerelease 
                ? `Aevum v${baseVersion}-beta` 
                : `Aevum v${baseVersion}-stable`;

              // Split body into short description and details
              const lines = release.body ? release.body.split('\n') : [];
              let shortDesc = '';
              let detailLines = [];
              let foundDesc = false;

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) {
                  if (foundDesc) {
                    detailLines.push(lines[i]);
                  }
                  continue;
                }
                if (line.startsWith('#')) {
                  continue;
                }
                if (!foundDesc && !line.startsWith('-') && !line.startsWith('*') && !line.startsWith('##') && !line.startsWith('###')) {
                  shortDesc = line;
                  foundDesc = true;
                } else {
                  detailLines.push(lines[i]);
                }
              }
              const detailsBody = detailLines.join('\n').trim();
              const isExpanded = expandedReleases[release.id] !== undefined 
                ? expandedReleases[release.id] 
                : index === 0;

              return (
                <div key={release.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07080c] border border-white/20 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-cyan-400 transition-colors" />
                  </div>

                  <div className="p-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight leading-none">
                            {displayTitle}
                          </h2>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                            release.prerelease 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-400/20' 
                              : 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20'
                          }`}>
                            {release.tag_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                          <Calendar size={14} />
                          <span>{formatDate(release.published_at)}</span>
                        </div>
                      </div>

                      {exeAsset ? (
                        <a
                          href={exeAsset.browser_download_url}
                          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto shrink-0 font-mono"
                          title={exeAsset.name}
                        >
                          <Download size={16} />
                          <span>{isVi ? 'Tải xuống (.exe)' : 'Download (.exe)'}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 font-mono self-start sm:self-auto shrink-0 select-none py-1.5 bg-slate-900/30 px-3 rounded-lg border border-white/5">
                          <RefreshCw size={13} className="animate-spin text-slate-500" />
                          <span>{isVi ? 'Đang đóng gói (.exe)...' : 'Packaging (.exe)...'}</span>
                        </div>
                      )}
                    </div>

                    {shortDesc && (
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-2 font-medium">
                        {parseBoldText(shortDesc)}
                      </p>
                    )}

                    {detailsBody && (
                      <>
                        <button
                          onClick={() => toggleExpand(release.id)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors select-none py-1 focus:outline-none"
                        >
                          <span>{isExpanded ? (isVi ? 'Thu gọn chi tiết' : 'Hide details') : (isVi ? 'Xem chi tiết cập nhật' : 'View release details')}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}>
                          <div className="text-slate-300 space-y-1 markdown-body pl-2 border-l border-white/5">
                            {formatReleaseNotes(detailsBody)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
