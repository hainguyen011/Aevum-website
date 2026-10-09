import React from 'react';
import { AlignLeft, ArrowUp } from 'lucide-react';

/**
 * ReaderSidebarRight — Reusable Unified Table of Contents (TOC) Sidebar
 * Standardized across /docs and /explore for clean section outline navigation.
 */
export const ReaderSidebarRight = ({
  headings = [],
  activeHeadingId = '',
  onHeadingClick = () => {},
  isVi = true,
  className = ''
}) => {
  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className={`hidden xl:block w-64 relative bg-transparent shrink-0 ${className}`}>
      <div className="sticky top-[73px] flex flex-col justify-between h-[calc(100vh-73px)]">
        {/* Header Bar */}
        <div className="w-full px-4 py-3.5 flex items-center justify-between shrink-0 bg-transparent">
          <span className="text-[11px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <AlignLeft size={12} className="text-white [html[data-theme='light']_&]:text-slate-900" />
            {isVi ? 'TRONG TRANG NÀY' : 'ON THIS PAGE'}
          </span>
        </div>

        {/* Scrollable Headings List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
          {headings.length > 0 ? (
            <ul className="space-y-0.5 text-xs">
              {headings.map((h) => {
                const isActive = h.id === activeHeadingId;
                const isH3 = h.level === 3;
                return (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onHeadingClick(h.id);
                      }}
                      className={`block py-1.5 px-3 transition-colors duration-150 text-left relative rounded text-[12px] leading-snug cursor-pointer ${
                        isH3 ? 'ml-3' : ''
                      } ${
                        isActive
                          ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-medium bg-white/[0.08] [html[data-theme="light"]_&]:bg-slate-200/80'
                          : isH3
                          ? 'text-slate-500 [html[data-theme="light"]_&]:text-slate-500 hover:text-slate-200 [html[data-theme="light"]_&]:hover:text-slate-900 hover:bg-white/[0.03] [html[data-theme="light"]_&]:hover:bg-slate-100/50'
                          : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900 hover:bg-white/[0.03] [html[data-theme="light"]_&]:hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="line-clamp-2">{h.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-[11px] text-slate-500 italic py-2">
              {isVi ? 'Không có mục phụ' : 'No subheadings'}
            </div>
          )}
        </div>

        {/* TOC Footer Actions */}
        <div className="w-full p-4 space-y-2 shrink-0 bg-transparent">
          <button
            onClick={handleBackToTop}
            className="w-full flex items-center justify-between py-1.5 px-2.5 rounded bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100 hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-200 text-slate-400 [html[data-theme='light']_&]:text-slate-600 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 text-[11px] font-sans font-medium transition-all cursor-pointer"
          >
            <span>{isVi ? 'Lên đầu trang' : 'Back to top'}</span>
            <ArrowUp size={12} className="text-white [html[data-theme='light']_&]:text-slate-900" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ReaderSidebarRight;
