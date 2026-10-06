import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { docsData } from '../data/docsData';
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Terminal,
  Cpu,
  ShieldAlert,
  Search,
  Link2,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
  ArrowUp,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Info,
  AlertTriangle,
  AlignLeft,
  WrapText,
  Type,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { TranslationService } from '../services/TranslationService';

// Intelligent Tokenizer for Terminal, Bash, JSON, JS/TS, PowerShell
const renderHighlightedLine = (line, lang = 'bash') => {
  if (!line || !line.trim()) return <span>&nbsp;</span>;

  // 1. Box drawing and ASCII art protection (e.g. ┌──┐, │, └──┘)
  if (/^[┌│└├─┬┴┼┐┘]/.test(line.trim()) || lang === 'text' || lang === 'ascii') {
    return <span className="text-white/90 font-mono">{line}</span>;
  }

  // 2. Full line comments
  const trimmed = line.trimStart();
  if (trimmed.startsWith('#') && !trimmed.startsWith('#!')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // 3. Command prompt prefix detection ($ or >)
  let promptPrefix = null;
  let content = line;

  const promptMatch = line.match(/^(\s*)([$>])\s+(.*)$/);
  if (promptMatch) {
    promptPrefix = (
      <>
        <span>{promptMatch[1]}</span>
        <span className="select-none text-slate-500 font-mono mr-1.5">{promptMatch[2]}</span>
      </>
    );
    content = promptMatch[3];
  }

  // 4. Tokenize line for syntax highlighting
  const tokenRegex = /(".*?"|'.*?'|`.*?`|\/\/[^\n]*|#.*$|--?[a-zA-Z0-9_-]+|\b(?:aevum|npm|pnpm|yarn|bun|node|git|curl|npx|cd|mkdir|import|from|export|default|const|let|var|function|return|async|await|if|else|new|try|catch|true|false|null|undefined)\b|\b\d+\b|[^\s"'\`]+|\s+)/g;

  const tokens = [];
  let match;

  while ((match = tokenRegex.exec(content)) !== null) {
    const text = match[0];
    let className = 'text-slate-200';

    if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) {
      className = 'text-emerald-300';
    } else if (text.startsWith('//') || text.startsWith('#')) {
      className = 'text-slate-500 italic';
    } else if (text.startsWith('-')) {
      className = 'text-amber-400 font-medium';
    } else if (/^(import|export|from|default|const|let|var|function|return|async|await|if|else|new|try|catch)$/.test(text)) {
      className = 'text-purple-400 font-semibold';
    } else if (/^(aevum|npm|pnpm|yarn|bun|node|git|curl|npx)$/.test(text)) {
      className = 'text-cyan-400 font-bold';
    } else if (/^(true|false|null|undefined)$/.test(text)) {
      className = 'text-amber-300 font-mono';
    } else if (/^\d+$/.test(text)) {
      className = 'text-sky-300 font-mono';
    }

    tokens.push(
      <span key={match.index} className={className}>
        {text}
      </span>
    );
  }

  return (
    <>
      {promptPrefix}
      {tokens.length > 0 ? tokens : content}
    </>
  );
};

// Enterprise Code Block with Syntax Highlighting, Package Switcher & Line Numbers
const CodeBlock = ({ block, onCopy, copiedId }) => {
  const [isWrapped, setIsWrapped] = useState(false);
  const [pkgManager, setPkgManager] = useState('npm');

  // Check if this block is a package manager command block (contains npm/pnpm/yarn/bun)
  const isPkgBlock = useMemo(() => {
    return (
      (block.lang === 'bash' || block.lang === 'sh') &&
      /\b(npm|pnpm|yarn|bun)\b/.test(block.content)
    );
  }, [block]);

  // Transformed content based on active package manager
  const displayContent = useMemo(() => {
    if (!isPkgBlock || pkgManager === 'npm') return block.content;

    return block.content
      .split('\n')
      .map((line) => {
        if (pkgManager === 'pnpm') {
          return line
            .replace(/\bnpm install\b/g, 'pnpm add')
            .replace(/\bnpm run\b/g, 'pnpm')
            .replace(/\bnpm link\b/g, 'pnpm link --global');
        }
        if (pkgManager === 'yarn') {
          return line
            .replace(/\bnpm install\b/g, 'yarn add')
            .replace(/\bnpm run\b/g, 'yarn')
            .replace(/\bnpm link\b/g, 'yarn link');
        }
        if (pkgManager === 'bun') {
          return line
            .replace(/\bnpm install\b/g, 'bun add')
            .replace(/\bnpm run\b/g, 'bun run')
            .replace(/\bnpm link\b/g, 'bun link');
        }
        return line;
      })
      .join('\n');
  }, [block.content, isPkgBlock, pkgManager]);

  const lines = displayContent.trimEnd().split('\n');

  return (
    <div className="rounded-lg bg-white/[0.02] overflow-hidden my-6 shadow-lg shadow-black/20">
      {/* Code Header Bar */}
      <div className="bg-white/[0.03] px-4 py-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Language badge */}
          <span className="text-[10px] font-mono font-semibold text-white uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded">
            {block.lang || 'code'}
          </span>

          {/* Optional Package Manager Switcher Tabs */}
          {isPkgBlock && (
            <div className="flex items-center bg-white/[0.04] p-0.5 rounded text-[10px] font-mono ml-1">
              {['npm', 'pnpm', 'yarn', 'bun'].map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setPkgManager(pkg)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    pkgManager === pkg
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
          )}

          {lines.length > 1 && (
            <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">
              · {lines.length} lines
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsWrapped(!isWrapped)}
            className={`p-1.5 rounded transition-all cursor-pointer text-xs font-mono flex items-center gap-1 ${
              isWrapped
                ? 'text-white bg-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title={isWrapped ? 'Tắt cuộn dòng (Unwrap)' : 'Bật cuộn dòng (Wrap lines)'}
            aria-label="Chuyển chế độ cuộn dòng mã"
          >
            <WrapText size={12} />
          </button>
          <button
            onClick={() => onCopy(displayContent, block.id)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title="Sao chép đoạn mã"
            aria-label="Sao chép mã nguồn"
          >
            {copiedId === block.id ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">Đã chép</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span className="text-slate-400 text-[10px] hidden sm:inline">Sao chép</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers & Syntax Highlighting */}
      <pre
        className={`p-4 overflow-x-auto text-[12.5px] font-mono leading-relaxed bg-[#07080e]/80 scrollbar-thin ${
          isWrapped ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
        }`}
      >
        {lines.length > 1 ? (
          <div className="table w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none text-slate-600 text-right pr-4 pl-1 text-[11px] opacity-60 w-8">
                  {idx + 1}
                </span>
                <span className="table-cell pl-4 text-slate-200">
                  {renderHighlightedLine(line, block.lang)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <code>{renderHighlightedLine(lines[0] || '', block.lang)}</code>
        )}
      </pre>
    </div>
  );
};

// Custom Markdown Parser for Minimalist, Transparent Technical Documentation
const MarkdownRenderer = ({ content, activeId, onHeadingClick, fontSize = 'normal' }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, blockId) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(blockId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const parseInline = (text) => {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Handle bold: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');

    // Handle markdown links: [text](url)
    escaped = escaped.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, linkText, url) => {
        // Strip backticks inside linkText if any (e.g. [`file.exe`](/changelog))
        const cleanText = linkText.replace(/`([^`]+)`/g, '$1');
        const isFileOrVersion = /\.(exe|dmg|zip|yml|blockmap)$/i.test(cleanText) || /^v?\d+\.\d+/i.test(cleanText);
        const extraClass = isFileOrVersion
          ? 'font-mono text-[12px] bg-white/[0.06] hover:bg-white/[0.12] px-2 py-0.5 rounded no-underline text-white font-medium border border-white/10 hover:border-white/25 cursor-pointer'
          : 'underline underline-offset-2 font-medium cursor-pointer';
        return `<a href="${url}" class="text-white hover:text-slate-200 transition-colors inline-flex items-center gap-1 ${extraClass}">${cleanText}</a>`;
      }
    );

    // Handle inline code: `code`
    escaped = escaped.replace(
      /`([^`]+)`/g,
      '<code class="bg-white/[0.06] text-white font-mono text-[11.5px] px-1.5 py-0.5 rounded">$1</code>'
    );

    return escaped;
  };

  // Pre-process text to separate code blocks from markdown blocks
  const blocks = [];
  let currentIdx = 0;

  const matches = [...content.matchAll(/```(\w*)\n([\s\S]*?)```/g)];

  matches.forEach((match, index) => {
    const textBefore = content.substring(currentIdx, match.index);
    if (textBefore.trim()) {
      blocks.push({ type: 'text', content: textBefore });
    }

    blocks.push({
      type: 'code',
      lang: match[1] || 'bash',
      content: match[2],
      id: `code-${index}`
    });

    currentIdx = match.index + match[0].length;
  });

  const textAfter = content.substring(currentIdx);
  if (textAfter.trim()) {
    blocks.push({ type: 'text', content: textAfter });
  }

  // Parse text block line-by-line
  const renderTextBlock = (textBlock, blockIdx) => {
    const lines = textBlock.split('\n');
    const elements = [];
    let listItems = [];

    let listType = 'ul';

    const flushList = (key) => {
      if (listItems.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListTag
            key={key}
            className={`${
              listType === 'ol' ? 'list-decimal' : 'list-disc'
            } pl-6 my-4 space-y-2 max-w-prose ${
              fontSize === 'large'
                ? 'text-[16px] leading-[1.8] text-slate-200'
                : 'text-[14.5px] leading-[1.75] text-slate-300'
            }`}
          >
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ListTag>
        );
        listItems = [];
        listType = 'ul';
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle horizontal rule
      if (line.trim() === '---') {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(<hr key={`hr-${blockIdx}-${i}`} className="border-0 my-8" />);
        continue;
      }

      // Handle H1
      if (line.startsWith('# ')) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <h1
            key={`h1-${blockIdx}-${i}`}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 font-display"
            itemProp="headline"
          >
            {line.substring(2)}
          </h1>
        );
        continue;
      }

      // Handle H2 with clean typography & crawlable anchor permalink (Google Docs standard)
      if (line.startsWith('## ')) {
        flushList(`list-${blockIdx}-${i}`);
        const titleText = line.substring(3).trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');

        elements.push(
          <h2
            id={headingId}
            key={`h2-${blockIdx}-${i}`}
            className="text-lg sm:text-xl font-bold text-white tracking-tight mt-10 mb-3 font-display flex items-center gap-2 scroll-mt-24 group relative"
          >
            <span>{titleText}</span>
            <a
              href={`#${headingId}`}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick?.(headingId);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white text-sm transition-opacity font-mono ml-1 select-none"
              title="Sao chép liên kết mục này"
              aria-label={`Liên kết tới phần ${titleText}`}
            >
              #
            </a>
          </h2>
        );
        continue;
      }

      // Handle H3 with clean typography, no dots, clean hierarchy
      if (line.startsWith('### ')) {
        flushList(`list-${blockIdx}-${i}`);
        const titleText = line.substring(4).trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');

        elements.push(
          <h3
            id={headingId}
            key={`h3-${blockIdx}-${i}`}
            className="text-sm sm:text-base font-semibold text-slate-200 tracking-tight mt-6 mb-2.5 font-display flex items-center gap-2 scroll-mt-24 group relative"
          >
            <span>{titleText}</span>
            <a
              href={`#${headingId}`}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick?.(headingId);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white text-xs transition-opacity font-mono ml-1 select-none"
              title="Sao chép liên kết mục này"
              aria-label={`Liên kết tới phần ${titleText}`}
            >
              #
            </a>
          </h3>
        );
        continue;
      }

      // Handle H4
      if (line.startsWith('#### ')) {
        flushList(`list-${blockIdx}-${i}`);
        const titleText = line.substring(5).trim();
        elements.push(
          <h4
            key={`h4-${blockIdx}-${i}`}
            className="text-xs sm:text-sm font-semibold tracking-tight text-slate-300 mt-4 mb-2 font-display"
          >
            {titleText}
          </h4>
        );
        continue;
      }

      // Handle Unordered List (- or *)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        if (listType !== 'ul') flushList(`list-${blockIdx}-${i}`);
        listType = 'ul';
        listItems.push(line.trim().substring(2));
        continue;
      }

      // Handle Ordered List (1. 2. etc.)
      const olMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
      if (olMatch) {
        if (listType !== 'ol') flushList(`list-${blockIdx}-${i}`);
        listType = 'ol';
        listItems.push(olMatch[2]);
        continue;
      }

      // Handle Markdown Table with robust escaped pipe & backtick support
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushList(`list-${blockIdx}-${i}`);

        const tableLines = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
          tableLines.push(lines[j].trim());
          j++;
        }
        i = j - 1;

        // Parse cells respecting escaped pipes \| and inline code backticks `...`
        const parseCells = (row) => {
          const trimmed = row.trim().replace(/^\||\|$/g, '');
          const cells = [];
          let current = '';
          let inCode = false;
          let isEscaped = false;

          for (let idx = 0; idx < trimmed.length; idx++) {
            const char = trimmed[idx];

            if (isEscaped) {
              current += char;
              isEscaped = false;
              continue;
            }

            if (char === '\\') {
              if (trimmed[idx + 1] === '|') {
                current += '|';
                idx++;
              } else {
                current += char;
              }
              continue;
            }

            if (char === '`') {
              inCode = !inCode;
              current += char;
              continue;
            }

            if (char === '|' && !inCode) {
              cells.push(current.trim());
              current = '';
              continue;
            }

            current += char;
          }
          cells.push(current.trim());
          return cells;
        };

        const isSeparator = (row) => /^\|[\s|:-]+\|$/.test(row);
        const headerRow = tableLines[0];
        const headers = parseCells(headerRow);
        const bodyRows = tableLines.slice(1).filter((r) => !isSeparator(r));

        elements.push(
          <div
            key={`table-${blockIdx}-${i}`}
            className="my-6 overflow-x-auto rounded-lg bg-white/[0.015] scrollbar-thin"
          >
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.04]">
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="px-4 py-3 text-slate-300 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: parseInline(h) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {parseCells(row).map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-slate-200 align-top leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: parseInline(cell) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Handle Callouts: > [!NOTE], > [!IMPORTANT], > [!TIP], > [!WARNING], > [!CAUTION]
      if (line.trim().startsWith('> ')) {
        flushList(`list-${blockIdx}-${i}`);

        let blockquoteLines = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('> ')) {
          blockquoteLines.push(lines[j].trim().substring(2));
          j++;
        }
        i = j - 1;

        const quoteContent = blockquoteLines.join('\n');
        const hasAdmonition = /\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION|INFO)\]/.test(quoteContent);

        if (hasAdmonition) {
          const isNote = /\[!(NOTE|INFO)\]/.test(quoteContent);
          const isTip = /\[!TIP\]/.test(quoteContent);
          const isWarning = /\[!(WARNING|CAUTION)\]/.test(quoteContent);

          const cleanText = quoteContent.replace(/\[!(NOTE|IMPORTANT|TIP|WARNING|CAUTION|INFO)\]/g, '').trim();

          const badgeTitle = isNote
            ? 'Lưu ý'
            : isTip
            ? 'Mẹo thực chiến'
            : isWarning
            ? 'Cảnh báo quan trọng'
            : 'Quan trọng';

          const textColor = isNote
            ? 'text-blue-300'
            : isTip
            ? 'text-emerald-300'
            : isWarning
            ? 'text-amber-300'
            : 'text-white';

          const bgAccent = isNote
            ? 'bg-blue-500/[0.05]'
            : isTip
            ? 'bg-emerald-500/[0.05]'
            : isWarning
            ? 'bg-amber-500/[0.05]'
            : 'bg-white/[0.04]';

          elements.push(
            <div
              key={`callout-${blockIdx}-${i}`}
              className={`p-4 rounded-lg my-6 flex gap-3 backdrop-blur-sm ${bgAccent}`}
            >
              <div className="pt-0.5 shrink-0">
                {isNote ? (
                  <Info size={16} className="text-blue-400" />
                ) : isTip ? (
                  <Sparkles size={16} className="text-emerald-400" />
                ) : isWarning ? (
                  <AlertTriangle size={16} className="text-amber-400" />
                ) : (
                  <Terminal size={16} className="text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`font-mono text-[11px] font-bold uppercase tracking-wider mb-1 ${textColor}`}>
                  {badgeTitle}
                </div>
                <div
                  className="text-xs leading-relaxed text-slate-300"
                  dangerouslySetInnerHTML={{ __html: parseInline(cleanText) }}
                />
              </div>
            </div>
          );
        } else {
          elements.push(
            <blockquote
              key={`quote-${blockIdx}-${i}`}
              className="bg-white/[0.03] px-4 py-2.5 rounded-md italic my-4 text-slate-300 text-xs"
            >
              {quoteContent}
            </blockquote>
          );
        }
        continue;
      }

      // Default Paragraph with Optimal Measure (65-75ch)
      if (line.trim()) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <p
            key={`p-${blockIdx}-${i}`}
            className={`${
              fontSize === 'large'
                ? 'text-[16px] leading-[1.8] text-slate-200'
                : 'text-[14.5px] leading-[1.75] text-slate-300'
            } mb-4 max-w-prose`}
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }
    }

    flushList(`list-end-${blockIdx}`);
    return elements;
  };

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <CodeBlock
              key={block.id}
              block={block}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          );
        } else {
          return (
            <React.Fragment key={`text-block-${idx}`}>
              {renderTextBlock(block.content, idx)}
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export const Docs = ({ activeLang = 'vi', onNavigate, initialDocId = null }) => {
  // Determine initial doc ID from prop, URL search param, pathname, or hash
  const getInitialDocId = () => {
    if (initialDocId && docsData.some((d) => d.id === initialDocId)) {
      return initialDocId;
    }
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const docParam = urlParams.get('doc');
      if (docParam && docsData.some((d) => d.id === docParam)) {
        return docParam;
      }
      // Google Sitelinks Searchbox support (?q=term)
      const qParam = urlParams.get('q');
      if (qParam) {
        const queryLower = qParam.toLowerCase();
        const matched = docsData.find(
          (d) =>
            d.title.toLowerCase().includes(queryLower) ||
            d.content.toLowerCase().includes(queryLower)
        );
        if (matched) return matched.id;
      }
      const pathParts = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
      if (pathParts[0] === 'docs' && pathParts[1] && docsData.some((d) => d.id === pathParts[1])) {
        return pathParts[1];
      }
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && docsData.some((d) => d.id === hash)) {
        return hash;
      }
    }
    return docsData[0]?.id || 'gioi-thieu';
  };

  const [activeId, setActiveId] = useState(getInitialDocId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [helpfulFeedback, setHelpfulFeedback] = useState(null); // 'yes' | 'no' | null
  const searchInputRef = useRef(null);

  // Push main container to the right in 3D when Docs mobile sidebar is active
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const container = document.querySelector('.perspective-container');
      if (sidebarOpen) {
        container?.classList.add('docs-menu-active');
        document.body.classList.add('docs-menu-active');
        document.body.style.overflow = 'hidden';
      } else {
        container?.classList.remove('docs-menu-active');
        document.body.classList.remove('docs-menu-active');
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        const container = document.querySelector('.perspective-container');
        container?.classList.remove('docs-menu-active');
        document.body.classList.remove('docs-menu-active');
        document.body.style.overflow = '';
      }
    };
  }, [sidebarOpen]);

  // Font size adjuster state for global accessibility
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('aevum-docs-font-size') || 'normal';
    }
    return 'normal';
  });

  const toggleFontSize = () => {
    const next = fontSize === 'normal' ? 'large' : 'normal';
    setFontSize(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aevum-docs-font-size', next);
    }
  };

  // Reset feedback state on doc switch
  useEffect(() => {
    setHelpfulFeedback(null);
  }, [activeId]);

  // Reading progress tracker (Top progress rail)
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setReadingProgress(percent);
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [activeId]);

  // Keyboard accessibility: press '/' to focus search, 'Escape' to clear
  useEffect(() => {
    const handleGlobalKey = (e) => {
      const tag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        if (e.key === 'Escape') {
          if (filterQuery) {
            setFilterQuery('');
          } else {
            e.target.blur();
          }
        }
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }

      if (e.key === 'Escape') {
        if (filterQuery) {
          setFilterQuery('');
        } else if (sidebarOpen) {
          setSidebarOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [filterQuery, sidebarOpen]);

  // Mobile sticky menu button visibility
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  useEffect(() => {
    let timeoutId = null;
    const handleActivity = () => {
      setIsBtnVisible(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsBtnVisible(false), 2500);
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    timeoutId = setTimeout(() => setIsBtnVisible(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const nextDocId = getInitialDocId();
      if (nextDocId && nextDocId !== activeId) {
        setActiveId(nextDocId);
      }
      // Handle hash heading scroll
      if (window.location.hash) {
        const headingId = window.location.hash.replace('#', '');
        setTimeout(() => scrollToHeading(headingId), 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [activeId]);

  // States for translation
  const [translatedData, setTranslatedData] = useState(docsData);
  const [translatingContent, setTranslatingContent] = useState(false);
  const [translatingSidebar, setTranslatingSidebar] = useState(false);
  const [translatedCache, setTranslatedCache] = useState({});
  const [sidebarCache, setSidebarCache] = useState({ vi: docsData });

  // Find active raw document
  const activeRawDoc = docsData.find((doc) => doc.id === activeId) || docsData[0];
  const [activeContent, setActiveContent] = useState(activeRawDoc.content);

  // Word count & reading time calculation
  const wordCount = useMemo(() => {
    if (!activeContent) return 0;
    return activeContent.trim().split(/\s+/).length;
  }, [activeContent]);

  const readingTime = useMemo(() => {
    return Math.max(1, Math.ceil(wordCount / 220));
  }, [wordCount]);

  // Translate sidebar headers & titles when language changes
  useEffect(() => {
    const translateSidebar = async () => {
      if (activeLang === 'vi') {
        setTranslatedData(docsData);
        return;
      }
      if (sidebarCache[activeLang]) {
        setTranslatedData(sidebarCache[activeLang]);
        return;
      }

      setTranslatingSidebar(true);
      try {
        const translated = await Promise.all(
          docsData.map(async (doc) => {
            const title = await TranslationService.translateText(doc.title, activeLang, 'vi');
            const category = await TranslationService.translateText(doc.category, activeLang, 'vi');
            return { ...doc, title, category };
          })
        );
        setSidebarCache((prev) => ({ ...prev, [activeLang]: translated }));
        setTranslatedData(translated);
      } catch (err) {
        setTranslatedData(docsData);
      } finally {
        setTranslatingSidebar(false);
      }
    };

    translateSidebar();
  }, [activeLang, sidebarCache]);

  // Translate document content when doc or language changes
  useEffect(() => {
    const translateDocContent = async () => {
      if (activeLang === 'vi') {
        setActiveContent(activeRawDoc.content);
        return;
      }

      const cacheKey = `${activeId}_${activeLang}`;
      if (translatedCache[cacheKey]) {
        setActiveContent(translatedCache[cacheKey]);
        return;
      }

      setTranslatingContent(true);
      try {
        const translatedMd = await TranslationService.translateMarkdown(
          activeRawDoc.content,
          activeLang,
          'vi'
        );
        setTranslatedCache((prev) => ({ ...prev, [cacheKey]: translatedMd }));
        setActiveContent(translatedMd);
      } catch (err) {
        setActiveContent(activeRawDoc.content);
      } finally {
        setTranslatingContent(false);
      }
    };

    translateDocContent();
  }, [activeId, activeLang, activeRawDoc, translatedCache]);

  // Dynamic Google SEO & Schema.org JSON-LD Generation per active document
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const isVi = activeLang === 'vi';
    const pageTitle = `${activeRawDoc.title} — ${isVi ? 'Tài liệu Kỹ thuật Aevum OS' : 'Aevum OS Documentation'}`;

    // Extract clean summary snippet for description
    const cleanSnippet = activeRawDoc.content
      .replace(/#+\s+.*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/[>*_|-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);

    const docCanonicalUrl = `https://www.aevum.ai.vn/docs?doc=${activeRawDoc.id}`;

    // 1. Update Title
    document.title = pageTitle;

    // 2. Helper to set/update meta tag
    const setMeta = (selector, attr, val, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', cleanSnippet);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', cleanSnippet);
    setMeta('meta[property="og:url"]', 'property', 'og:url', docCanonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', cleanSnippet);

    // 3. Update Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', docCanonicalUrl);

    // 4. Inject Dynamic Schema.org JSON-LD (TechArticle + BreadcrumbList)
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${docCanonicalUrl}#article`,
          "isPartOf": { "@id": "https://www.aevum.ai.vn/#website" },
          "headline": pageTitle,
          "description": cleanSnippet,
          "url": docCanonicalUrl,
          "inLanguage": isVi ? "vi-VN" : "en-US",
          "mainEntityOfPage": docCanonicalUrl,
          "articleSection": activeRawDoc.category,
          "author": {
            "@type": "Organization",
            "name": "I2FLabs Vietnam",
            "url": "https://www.aevum.ai.vn"
          },
          "publisher": {
            "@type": "Organization",
            "name": "I2FLabs Vietnam",
            "url": "https://www.aevum.ai.vn",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.aevum.ai.vn/icon-512.png"
            }
          },
          "datePublished": "2026-08-01T08:00:00+07:00",
          "dateModified": "2026-10-01T12:00:00+07:00"
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${docCanonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": isVi ? "Trang chủ" : "Home",
              "item": "https://www.aevum.ai.vn/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": isVi ? "Tài liệu Kỹ thuật" : "Documentation",
              "item": "https://www.aevum.ai.vn/docs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": activeRawDoc.category,
              "item": "https://www.aevum.ai.vn/docs"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": activeRawDoc.title,
              "item": docCanonicalUrl
            }
          ]
        }
      ]
    };

    let schemaScript = document.getElementById('aevum-doc-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'aevum-doc-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData, null, 2);
  }, [activeRawDoc, activeLang]);

  // Extract H2 and H3 headings for Enterprise Nested Table of Contents
  const headings = useMemo(() => {
    if (!activeContent) return [];
    const lines = activeContent.split('\n');
    const extracted = [];
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h2Match) {
        const titleText = h2Match[1].trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');
        extracted.push({ id: headingId, title: titleText, level: 2 });
      } else if (h3Match) {
        const titleText = h3Match[1].trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');
        extracted.push({ id: headingId, title: titleText, level: 3 });
      }
    });
    return extracted;
  }, [activeContent]);

  // Scroll spy for Table of Contents
  const [activeHeadingId, setActiveHeadingId] = useState('');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
        if (headingElements.length === 0) return;

        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
        let currentActive = '';

        if (isAtBottom && headings.length > 0) {
          currentActive = headings[headings.length - 1].id;
        } else {
          for (const el of headingElements) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              currentActive = el.id;
            } else {
              break;
            }
          }
        }

        if (!currentActive && headingElements.length > 0) {
          currentActive = headingElements[0].id;
        }

        setActiveHeadingId((prev) => (prev !== currentActive ? currentActive : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Group documentation by category
  const categories = useMemo(() => {
    const grouped = {};
    const filtered = filterQuery.trim()
      ? translatedData.filter(
          (d) =>
            d.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
            d.category.toLowerCase().includes(filterQuery.toLowerCase())
        )
      : translatedData;

    filtered.forEach((doc) => {
      if (!grouped[doc.category]) {
        grouped[doc.category] = [];
      }
      grouped[doc.category].push(doc);
    });
    return grouped;
  }, [translatedData, filterQuery]);

  // Select document and synchronize URL cleanly
  const selectDoc = (id, headingId = null) => {
    setActiveId(id);
    setSidebarOpen(false);

    if (typeof window !== 'undefined') {
      const targetUrl = `/docs/${id}${headingId ? `#${headingId}` : ''}`;
      window.history.pushState({ docId: id }, '', targetUrl);

      if (headingId) {
        setTimeout(() => scrollToHeading(headingId), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Calculate previous and next articles for relational crawlability & navigation
  const currentIndex = docsData.findIndex((d) => d.id === activeId);
  const prevDoc = currentIndex > 0 ? docsData[currentIndex - 1] : null;
  const nextDoc = currentIndex < docsData.length - 1 ? docsData[currentIndex + 1] : null;

  // Copy document link to clipboard
  const handleCopyDocLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const url = `https://www.aevum.ai.vn/docs/${activeId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Intercept clicks on links inside article markdown for smooth SPA transitions
  const handleArticleClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // External links -> open new tab
    if (href.startsWith('http://') || href.startsWith('https://')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    // Local anchor hash -> scroll to heading
    if (href.startsWith('#')) {
      e.preventDefault();
      const headingId = href.replace(/^#/, '');
      scrollToHeading(headingId);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `/docs?doc=${activeId}#${headingId}`);
      }
      return;
    }

    // Changelog link -> onNavigate('changelog')
    if (href === '/changelog' || href.startsWith('/changelog')) {
      e.preventDefault();
      onNavigate?.('changelog');
      return;
    }

    // Docs links -> selectDoc or onNavigate('docs')
    if (href.startsWith('/docs')) {
      e.preventDefault();
      try {
        const url = new URL(href, window.location.origin);
        const docId = url.searchParams.get('doc') || url.pathname.replace(/^\/docs\/?/, '').split('/')[0];
        const headingId = url.hash.replace(/^#/, '');
        if (docId) {
          selectDoc(docId, headingId || null);
          return;
        }
      } catch (err) {
        // Fallback
      }
      selectDoc('gioi-thieu');
      return;
    }

    // Other SPA routes (/landing, /pricing, /about, /explore, etc.)
    if (href.startsWith('/')) {
      e.preventDefault();
      const page = href.replace(/^\/+/, '') || 'landing';
      onNavigate?.(page);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-[#07090D] block lg:flex lg:flex-row relative justify-between overflow-x-clip font-sans">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      {/* Skip to Content for Screen Readers & Keyboard Access (WCAG 2.1) */}
      <a
        href="#doc-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md"
      >
        {activeLang === 'vi' ? 'Bỏ qua chuyển đến nội dung' : 'Skip to main content'}
      </a>

      {/* Click-to-close overlay on pushed content when Docs sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden cursor-pointer bg-transparent"
          onClick={() => setSidebarOpen(false)}
          aria-label="Đóng mục lục tài liệu"
        />
      )}

      {/* 3D Slide-in Mobile Docs Drawer (Symmetrical to Right Menu) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`docs-mobile-drawer lg:hidden ${
              sidebarOpen ? 'open' : ''
            }`}
          >
            {/* Header Bar */}
            <div className="shrink-0 pt-4 pb-3 px-4 flex items-center justify-between docs-drawer-header">
              <span className="font-mono text-xs font-bold uppercase tracking-wider docs-drawer-title">
                {activeLang === 'vi' ? 'Tài liệu Aevum OS' : 'Documentation'}
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg transition-colors cursor-pointer docs-drawer-close"
                aria-label="Đóng bảng điều hướng"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Filter Search Bar */}
            <div className="p-3 shrink-0 docs-drawer-search">
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder={activeLang === 'vi' ? 'Lọc tài liệu...' : 'Filter docs...'}
                  className="w-full rounded-md pl-8 pr-7 py-1.5 text-xs transition-colors font-mono docs-drawer-search-input"
                />
                {filterQuery && (
                  <button
                    onClick={() => setFilterQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin docs-drawer-nav-list"
              data-lenis-prevent
            >
              {Object.keys(categories).map((catName) => (
                <div key={catName} className="space-y-1.5">
                  <div className="flex items-center justify-between px-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest docs-drawer-cat-name">
                      {catName}
                    </span>
                    <span className="text-[9px] font-mono docs-drawer-cat-count">
                      {categories[catName].length}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {categories[catName].map((doc) => {
                      const isActive = doc.id === activeId;
                      return (
                        <li key={doc.id}>
                          <a
                            href={`/docs/${doc.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              selectDoc(doc.id);
                              setSidebarOpen(false);
                            }}
                            className={`docs-drawer-item w-full flex items-center justify-between text-left py-2 px-2.5 rounded text-xs font-medium transition-colors duration-150 ease-out group cursor-pointer ${
                              isActive ? 'active' : ''
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <ChevronRight
                              size={12}
                              className={`transition-transform duration-150 shrink-0 ${
                                isActive
                                  ? 'translate-x-0.5 opacity-100'
                                  : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-500'
                              }`}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sidebar Footer Hint */}
            <div className="p-4 flex items-center justify-between text-[10px] font-mono shrink-0 docs-drawer-footer">
              <a
                href="/changelog"
                onClick={(e) => {
                  e.preventDefault();
                  setSidebarOpen(false);
                  onNavigate?.('changelog');
                }}
                className="transition-colors cursor-pointer flex items-center gap-1.5 group"
                title="Xem Nhật ký Cập nhật"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="group-hover:underline">Aevum OS v1.0.0-beta.6</span>
              </a>
            </div>
          </div>,
          document.body
        )}

      {/* Desktop Sidebar (Clean Minimalist Transparent) */}
      <aside
        className={`hidden lg:block w-64 shrink-0 bg-transparent ${
          translatingSidebar ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <div className="sticky top-[73px] flex flex-col justify-between h-[calc(100vh-73px)]">
          {/* Quick Filter Search Bar with Keyboard / Hint */}
          <div className="p-4 shrink-0">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={activeLang === 'vi' ? 'Lọc tài liệu...' : 'Filter docs...'}
                className="w-full bg-white/[0.04] rounded-md pl-8 pr-10 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:bg-white/[0.07] transition-colors font-mono"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                {filterQuery ? (
                  <button
                    onClick={() => setFilterQuery('')}
                    className="text-slate-500 hover:text-white p-0.5 cursor-pointer"
                    aria-label="Xóa bộ lọc"
                  >
                    <X size={12} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block text-[9px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-400 select-none">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Categories & Docs Navigation - Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {Object.keys(categories).map((catName) => (
              <div key={catName} className="space-y-1.5">
                <div className="flex items-center justify-between px-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {catName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-600">
                    {categories[catName].length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {categories[catName].map((doc) => {
                    const isActive = doc.id === activeId;
                    return (
                      <li key={doc.id}>
                        <a
                          href={`/docs/${doc.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            selectDoc(doc.id);
                          }}
                          className={`w-full flex items-center justify-between text-left py-1.5 px-2.5 rounded text-xs font-medium transition-colors duration-150 ease-out group ${
                            isActive
                              ? 'text-white font-medium bg-white/10'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                          }`}
                        >
                          <span className="truncate">{doc.title}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${
                              isActive
                                ? 'translate-x-0.5 text-white'
                                : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-500'
                            }`}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar Footer Hint */}
          <div className="p-4 flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0">
            <a
              href="/changelog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('changelog');
              }}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
              title="Xem Nhật ký Cập nhật"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="group-hover:underline">Aevum OS v1.0.0-beta.6</span>
            </a>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.04]">Ctrl K</span>
          </div>
        </div>
      </aside>

      {/* Main View Wrapper */}
      <div
        onClick={() => sidebarOpen && setSidebarOpen(false)}
        className={`flex-1 flex flex-col xl:flex-row justify-between w-full bg-transparent ${
          sidebarOpen ? 'cursor-pointer' : ''
        }`}
      >
        {/* Mobile Sticky Top-Left Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
          onMouseEnter={() => setIsBtnVisible(true)}
          className={`lg:hidden sticky top-[76px] ml-4 mt-4 z-30 px-3 py-2 rounded-lg bg-[#07090D]/90 backdrop-blur-md hover:bg-white/10 text-white transition-all duration-300 cursor-pointer flex items-center gap-2 self-start ${
            isBtnVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-20 scale-90 hover:opacity-100'
          }`}
          aria-label="Mở danh mục tài liệu"
        >
          <Menu size={16} className="text-white" />
          <span className="text-xs font-mono font-medium">{activeLang === 'vi' ? 'Mục lục' : 'Menu'}</span>
        </button>

        {/* Main Content Area (Clean Section to prevent nested main issue) */}
        <div
          id="doc-content"
          role="region"
          aria-label="Nội dung tài liệu"
          className="flex-1 px-6 md:px-12 lg:px-16 py-8 max-w-3xl xl:max-w-4xl w-full relative min-h-[500px]"
        >
          {translatingContent && (
            <div className="absolute inset-0 bg-[#07090D]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center py-20 text-center font-mono text-sm text-white">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-white mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="animate-pulse">
                {activeLang === 'en'
                  ? 'Translating document in real-time...'
                  : 'Đang dịch tài liệu thời gian thực...'}
              </span>
            </div>
          )}

          {activeRawDoc ? (
            <article
              itemScope
              itemType="https://schema.org/TechArticle"
              className="docs-article animate-fadeIn"
            >
              {/* Semantic Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="mb-5 flex items-center flex-wrap gap-2 text-xs font-mono text-slate-400"
              >
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('landing');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {activeLang === 'vi' ? 'Trang chủ' : 'Home'}
                </a>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <a
                  href="/docs"
                  onClick={(e) => {
                    e.preventDefault();
                    selectDoc('gioi-thieu');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {activeLang === 'vi' ? 'Tài liệu' : 'Docs'}
                </a>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                  {activeRawDoc.category}
                </span>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-white font-semibold truncate">{activeRawDoc.title}</span>
              </nav>

              {/* Minimalist Article Metadata Bar & Reader Controls */}
              <header className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 text-xs font-mono text-slate-400">
                <div className="flex items-center flex-wrap gap-4">
                  <span className="px-2 py-0.5 rounded bg-white/[0.06] text-white uppercase tracking-wider text-[10px] font-semibold">
                    {activeRawDoc.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={13} className="text-slate-500" />
                    <span>
                      {readingTime} {activeLang === 'vi' ? 'phút đọc' : 'min read'}
                      <span className="text-slate-600 hidden sm:inline"> (~{wordCount.toLocaleString()} {activeLang === 'vi' ? 'từ' : 'words'})</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar size={13} className="text-slate-500" />
                    <span>01/10/2026</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {/* Font size toggle for comfortable reading & accessibility */}
                  <button
                    onClick={toggleFontSize}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all text-xs cursor-pointer select-none"
                    title={fontSize === 'normal' ? 'Tăng kích thước chữ (115%)' : 'Đặt lại cỡ chữ chuẩn'}
                    aria-label="Điều chỉnh kích thước chữ"
                  >
                    <Type size={13} className="text-white" />
                    <span className="text-[11px] font-mono">
                      {fontSize === 'normal' ? 'A' : 'A+'}
                    </span>
                  </button>

                  {/* Share / Copy Document Link Button */}
                  <button
                    onClick={handleCopyDocLink}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all text-xs cursor-pointer select-none"
                    title="Sao chép liên kết tài liệu"
                    aria-label="Sao chép liên kết tài liệu"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">
                          {activeLang === 'vi' ? 'Đã chép link' : 'Copied link'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Link2 size={13} />
                        <span>{activeLang === 'vi' ? 'Sao chép link' : 'Copy link'}</span>
                      </>
                    )}
                  </button>
                </div>
              </header>

              {/* Article Content Rendered via MarkdownRenderer */}
              <div itemProp="articleBody" onClick={handleArticleClick}>
                <MarkdownRenderer
                  content={activeContent}
                  activeId={activeId}
                  fontSize={fontSize}
                  onHeadingClick={(headingId) => {
                    scrollToHeading(headingId);
                    if (typeof window !== 'undefined') {
                      window.history.pushState(null, '', `/docs?doc=${activeId}#${headingId}`);
                    }
                  }}
                />
              </div>

              {/* Enterprise Helpful Feedback Widget */}
              <div className="mt-12 p-5 rounded-lg bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <MessageSquare size={14} className="text-white" />
                    <span>
                      {activeLang === 'vi'
                        ? 'Tài liệu này có giải đáp được thắc mắc của bạn không?'
                        : 'Was this page helpful?'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {activeLang === 'vi'
                      ? 'Phản hồi của bạn giúp chúng tôi cải thiện chất lượng tài liệu hệ sinh thái Aevum OS.'
                      : 'Your feedback helps improve our engineering documentation.'}
                  </p>
                </div>

                {helpfulFeedback ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono animate-fadeIn">
                    <Check size={14} />
                    <span>
                      {activeLang === 'vi'
                        ? 'Cảm ơn bạn đã đóng góp ý kiến!'
                        : 'Thank you for your feedback!'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setHelpfulFeedback('yes')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
                      aria-label="Đánh giá tài liệu hữu ích"
                    >
                      <ThumbsUp size={13} className="text-emerald-400" />
                      <span>{activeLang === 'vi' ? 'Hữu ích' : 'Yes'}</span>
                    </button>
                    <button
                      onClick={() => setHelpfulFeedback('no')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
                      aria-label="Đánh giá tài liệu cần cải thiện"
                    >
                      <ThumbsDown size={13} className="text-slate-400" />
                      <span>{activeLang === 'vi' ? 'Chưa rõ' : 'No'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Relational Pagination: Previous & Next Article Cards */}
              <footer className="mt-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevDoc ? (
                  <a
                    href={`/docs/${prevDoc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      selectDoc(prevDoc.id);
                    }}
                    className="p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col items-start gap-1 group text-left"
                    rel="prev"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1 group-hover:text-white transition-colors">
                      <ChevronLeft size={12} /> {activeLang === 'vi' ? 'Bài trước' : 'Previous'}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors line-clamp-1">
                      {prevDoc.title}
                    </span>
                  </a>
                ) : (
                  <div />
                )}

                {nextDoc && (
                  <a
                    href={`/docs/${nextDoc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      selectDoc(nextDoc.id);
                    }}
                    className="p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col items-end gap-1 group text-right sm:col-start-2"
                    rel="next"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1 group-hover:text-white transition-colors">
                      {activeLang === 'vi' ? 'Bài tiếp theo' : 'Next'} <ChevronRight size={12} />
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors line-clamp-1">
                      {nextDoc.title}
                    </span>
                  </a>
                )}
              </footer>
            </article>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 font-mono text-sm">
              <Cpu className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
              <span>Đang nạp dữ liệu tài liệu...</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar: Table of Contents (TOC) with Enterprise Navigation Rail */}
      <aside className="hidden xl:block w-64 relative bg-transparent shrink-0">
        <div className="sticky top-[73px] flex flex-col justify-between h-[calc(100vh-73px)]">
          {/* Header Bar */}
          <div className="w-full px-4 py-3.5 flex items-center justify-between shrink-0 bg-transparent">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <AlignLeft size={12} className="text-white" />
              {activeLang === 'vi' ? 'TRONG TRANG NÀY' : 'ON THIS PAGE'}
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
                          scrollToHeading(h.id);
                          if (typeof window !== 'undefined') {
                            window.history.pushState(null, '', `/docs/${activeId}#${h.id}`);
                          }
                        }}
                        className={`block py-1.5 px-3 transition-colors duration-150 text-left relative rounded text-[12px] leading-snug ${
                          isH3 ? 'ml-3' : ''
                        } ${
                          isActive
                            ? 'text-white font-medium bg-white/[0.08]'
                            : isH3
                            ? 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
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
                {activeLang === 'vi' ? 'Không có mục phụ' : 'No subheadings'}
              </div>
            )}
          </div>

          {/* TOC Footer Actions */}
          <div className="w-full p-4 space-y-2 shrink-0 bg-transparent">
            <button
              onClick={() => {
                if (window.lenis) {
                  window.lenis.scrollTo(0, { duration: 1.0 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full flex items-center justify-between py-1.5 px-2.5 rounded bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white text-[11px] font-mono transition-all cursor-pointer"
            >
              <span>{activeLang === 'vi' ? 'Lên đầu trang' : 'Back to top'}</span>
              <ArrowUp size={12} className="text-white" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Docs;
