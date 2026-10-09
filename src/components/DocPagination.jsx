import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Extracts a concise snippet from the first informative markdown paragraph
 */
const extractSnippet = (content) => {
  if (!content) return '';
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('>') &&
      !trimmed.startsWith('-') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('|') &&
      !trimmed.startsWith('```') &&
      !trimmed.startsWith('---')
    ) {
      const clean = trimmed
        .replace(/\*\*/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/^[#\s]+/, '');
      if (clean.length > 5) {
        return clean;
      }
    }
  }
  return '';
};

/**
 * DocPagination - Sleek, unified floating dock for doc navigation
 * Matches Coral OS / Mintlify design standards:
 * - Unified rounded-2xl outer container
 * - Minimalist disabled button when at boundary
 * - Recessed inner card with title, snippet preview, vertical divider and chevron
 */
export const DocPagination = ({
  prevDoc = null,
  nextDoc = null,
  onSelectDoc,
  isVi = true,
  className = ''
}) => {
  const prevSnippet = useMemo(() => extractSnippet(prevDoc?.content), [prevDoc?.content]);
  const nextSnippet = useMemo(() => extractSnippet(nextDoc?.content), [nextDoc?.content]);

  return (
    <footer
      aria-label={isVi ? 'Điều hướng tài liệu' : 'Document pagination'}
      className={`mt-10 mb-6 w-full rounded-2xl bg-[#090b10] [html[data-theme='light']_&]:bg-slate-100/90 border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 p-1.5 sm:p-2 flex items-stretch justify-between gap-2 sm:gap-3 shadow-xl transition-all ${className}`.trim()}
    >
      {/* PREVIOUS ARTICLE BUTTON / CARD */}
      {prevDoc ? (
        <a
          href={`/docs/${prevDoc.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelectDoc?.(prevDoc.id);
          }}
          className={`group ${
            !nextDoc ? 'flex-1' : 'flex-1'
          } min-w-0 bg-black/60 [html[data-theme='light']_&]:bg-white hover:bg-black/90 [html[data-theme='light']_&]:hover:bg-slate-50 border border-white/5 [html[data-theme='light']_&]:border-slate-200/80 hover:border-white/15 [html[data-theme='light']_&]:hover:border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-start gap-2.5 sm:gap-3.5 transition-all text-left shadow-sm cursor-pointer`}
          rel="prev"
          title={prevDoc.title}
        >
          {/* Previous label + Chevron */}
          <div className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-medium text-zinc-300 [html[data-theme='light']_&]:text-slate-700 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-slate-950 shrink-0 select-none">
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform text-zinc-400 group-hover:text-white" />
            <span className="hidden xs:inline">{isVi ? 'Bài trước' : 'Previous'}</span>
            <span className="xs:hidden">{isVi ? 'Trước' : 'Prev'}</span>
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-white/10 [html[data-theme='light']_&]:bg-slate-300 shrink-0" aria-hidden="true" />

          {/* Title and snippet preview */}
          <div className="min-w-0 flex-1 flex flex-col items-start overflow-hidden">
            <div className="text-[13px] sm:text-[14px] font-bold text-white [html[data-theme='light']_&]:text-slate-900 group-hover:text-cyan-400 [html[data-theme='light']_&]:group-hover:text-cyan-600 transition-colors truncate max-w-full leading-snug">
              {prevDoc.title}
            </div>
            {prevSnippet && (
              <div className="hidden sm:block text-[11px] sm:text-[12px] font-normal text-zinc-400 [html[data-theme='light']_&]:text-slate-500 truncate max-w-full leading-tight mt-0.5">
                {prevSnippet}
              </div>
            )}
          </div>
        </a>
      ) : (
        /* Disabled Minimalist Button on boundary */
        <div
          className="px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-medium text-zinc-600 [html[data-theme='light']_&]:text-slate-400 select-none cursor-not-allowed shrink-0"
          aria-disabled="true"
        >
          <ChevronLeft size={14} className="opacity-40 text-zinc-600" />
          <span className="hidden xs:inline">{isVi ? 'Bài trước' : 'Previous'}</span>
          <span className="xs:hidden">{isVi ? 'Trước' : 'Prev'}</span>
        </div>
      )}

      {/* NEXT ARTICLE BUTTON / CARD */}
      {nextDoc ? (
        <a
          href={`/docs/${nextDoc.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelectDoc?.(nextDoc.id);
          }}
          className={`group ${
            !prevDoc ? 'flex-1' : 'flex-1'
          } min-w-0 bg-black/60 [html[data-theme='light']_&]:bg-white hover:bg-black/90 [html[data-theme='light']_&]:hover:bg-slate-50 border border-white/5 [html[data-theme='light']_&]:border-slate-200/80 hover:border-white/15 [html[data-theme='light']_&]:hover:border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-end gap-2.5 sm:gap-3.5 transition-all text-right shadow-sm cursor-pointer`}
          rel="next"
          title={nextDoc.title}
        >
          {/* Title and snippet preview */}
          <div className="min-w-0 flex-1 flex flex-col items-end overflow-hidden">
            <div className="text-[13px] sm:text-[14px] font-bold text-white [html[data-theme='light']_&]:text-slate-900 group-hover:text-cyan-400 [html[data-theme='light']_&]:group-hover:text-cyan-600 transition-colors truncate max-w-full leading-snug">
              {nextDoc.title}
            </div>
            {nextSnippet && (
              <div className="hidden sm:block text-[11px] sm:text-[12px] font-normal text-zinc-400 [html[data-theme='light']_&]:text-slate-500 truncate max-w-full leading-tight mt-0.5">
                {nextSnippet}
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-white/10 [html[data-theme='light']_&]:bg-slate-300 shrink-0" aria-hidden="true" />

          {/* Next label + Chevron */}
          <div className="flex items-center gap-1 text-[13px] sm:text-[13.5px] font-medium text-zinc-300 [html[data-theme='light']_&]:text-slate-700 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-slate-950 shrink-0 select-none">
            <span className="hidden xs:inline">{isVi ? 'Bài tiếp' : 'Next'}</span>
            <span className="xs:hidden">{isVi ? 'Tiếp' : 'Next'}</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform text-zinc-400 group-hover:text-white" />
          </div>
        </a>
      ) : (
        /* Disabled Minimalist Button on boundary */
        <div
          className="px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-medium text-zinc-600 [html[data-theme='light']_&]:text-slate-400 select-none cursor-not-allowed shrink-0"
          aria-disabled="true"
        >
          <span className="hidden xs:inline">{isVi ? 'Bài tiếp' : 'Next'}</span>
          <span className="xs:hidden">{isVi ? 'Tiếp' : 'Next'}</span>
          <ChevronRight size={14} className="opacity-40 text-zinc-600" />
        </div>
      )}
    </footer>
  );
};

export default DocPagination;
