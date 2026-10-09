import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Terminal,
  Info,
  Sparkles,
  AlertTriangle,
  WrapText
} from 'lucide-react';

/**
 * Intelligent Tokenizer for Terminal, Bash, JSON, JS/TS, Python, PowerShell
 * Extracted directly from Docs standard for high readability and syntax accuracy.
 */
export const renderHighlightedLine = (line, lang = 'bash') => {
  if (!line || !line.trim()) return <span>&nbsp;</span>;

  // 1. Box drawing and ASCII art protection (e.g. ┌──┐, │, └──┘)
  if (/^[┌│└├─┬┴┼┐┘]/.test(line.trim()) || lang === 'text' || lang === 'ascii') {
    return <span className="text-white/90 [html[data-theme='light']_&]:text-slate-900 font-mono">{line}</span>;
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
        <span className="select-none text-slate-500 [html[data-theme='light']_&]:text-slate-400 font-mono mr-1.5">{promptMatch[2]}</span>
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
    let className = 'text-slate-200 [html[data-theme=\'light\']_&]:text-slate-800';

    if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) {
      className = 'text-emerald-300 [html[data-theme=\'light\']_&]:text-emerald-700';
    } else if (text.startsWith('//') || text.startsWith('#')) {
      className = 'text-slate-500 italic';
    } else if (text.startsWith('-')) {
      className = 'text-amber-400 [html[data-theme=\'light\']_&]:text-amber-700 font-medium';
    } else if (/^(import|export|from|default|const|let|var|function|return|async|await|if|else|new|try|catch)$/.test(text)) {
      className = 'text-purple-400 [html[data-theme=\'light\']_&]:text-purple-700 font-semibold';
    } else if (/^(aevum|npm|pnpm|yarn|bun|node|git|curl|npx)$/.test(text)) {
      className = 'text-cyan-400 [html[data-theme=\'light\']_&]:text-cyan-700 font-bold';
    } else if (/^(true|false|null|undefined)$/.test(text)) {
      className = 'text-amber-300 [html[data-theme=\'light\']_&]:text-amber-600 font-mono';
    } else if (/^\d+$/.test(text)) {
      className = 'text-sky-300 [html[data-theme=\'light\']_&]:text-sky-600 font-mono';
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
      {tokens.length > 0 ? tokens : <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800">{content}</span>}
    </>
  );
};

/**
 * Enterprise Code Block with Syntax Highlighting, Package Switcher, Line Numbers & Copy Button
 * Exact Docs Standard with Dark/Light Parity.
 */
export const CodeBlock = ({ block, onCopy, copiedId, isVi = true }) => {
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
    <div className="rounded-lg bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-100/70 border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 overflow-hidden my-6 shadow-lg shadow-black/20">
      {/* Code Header Bar */}
      <div className="bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-200/70 px-4 py-2 flex items-center justify-between gap-2 flex-wrap border-b border-white/5 [html[data-theme='light']_&]:border-slate-300">
        <div className="flex items-center gap-2">
          {/* Language badge */}
          <span className="text-[10px] font-mono font-semibold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-widest bg-white/10 [html[data-theme='light']_&]:bg-white/80 px-1.5 py-0.5 rounded">
            {block.lang || 'code'}
          </span>

          {/* Optional Package Manager Switcher Tabs */}
          {isPkgBlock && (
            <div className="flex items-center bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-300/60 p-0.5 rounded text-[10px] font-mono ml-1">
              {['npm', 'pnpm', 'yarn', 'bun'].map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setPkgManager(pkg)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    pkgManager === pkg
                      ? 'bg-white/15 text-white font-bold [html[data-theme="light"]_&]:bg-slate-800 [html[data-theme="light"]_&]:text-white'
                      : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
          )}

          {lines.length > 1 && (
            <span className="text-[9px] font-mono text-slate-500 [html[data-theme='light']_&]:text-slate-500 hidden sm:inline">
              · {lines.length} {isVi ? 'dòng' : 'lines'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsWrapped(!isWrapped)}
            className={`p-1.5 rounded transition-all cursor-pointer text-xs font-mono flex items-center gap-1 ${
              isWrapped
                ? 'text-white bg-white/10 [html[data-theme="light"]_&]:text-slate-900 [html[data-theme="light"]_&]:bg-slate-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5 [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
            }`}
            title={isWrapped ? (isVi ? 'Tắt cuộn dòng (Unwrap)' : 'Unwrap lines') : (isVi ? 'Bật cuộn dòng (Wrap lines)' : 'Wrap lines')}
            aria-label="Chuyển chế độ cuộn dòng mã"
          >
            <WrapText size={12} />
          </button>
          <button
            onClick={() => onCopy(displayContent, block.id)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title={isVi ? 'Sao chép đoạn mã' : 'Copy code'}
            aria-label="Sao chép mã nguồn"
          >
            {copiedId === block.id ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">{isVi ? 'Đã chép' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-[10px] hidden sm:inline">
                  {isVi ? 'Sao chép' : 'Copy'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers & Syntax Highlighting */}
      <pre
        className={`p-4 overflow-x-auto text-[12.5px] sm:text-[13px] font-mono leading-relaxed bg-[#07080e]/95 [html[data-theme='light']_&]:bg-[#F1F5F9] scrollbar-thin ${
          isWrapped ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
        }`}
      >
        {lines.length > 1 ? (
          <div className="table w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none text-slate-600 [html[data-theme='light']_&]:text-slate-400 text-right pr-4 pl-1 text-[11px] opacity-60 w-8">
                  {idx + 1}
                </span>
                <span className="table-cell pl-4 text-slate-200 [html[data-theme='light']_&]:text-slate-800">
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

/**
 * Standardized Article & Markdown Renderer
 * Standardized typography, measure (max-w-prose 65-75ch), line height & universal accessibility.
 * Reusable across Docs and Explore.
 */
export const ArticleRenderer = ({
  content = '',
  activeId = '',
  onHeadingClick = null,
  fontSize = 'normal',
  isVi = true,
  className = 'space-y-6',
  renderTitle = true
}) => {
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
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white [html[data-theme=\'light\']_&]:text-slate-950">$1</strong>');

    // Handle italic: *text* (avoid matching list markers)
    escaped = escaped.replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, '$1<em class="italic text-slate-300 [html[data-theme=\'light\']_&]:text-slate-700">$2</em>$3');

    // Handle markdown links: [text](url)
    escaped = escaped.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, linkText, url) => {
        const cleanText = linkText.replace(/`([^`]+)`/g, '$1');
        const isFileOrVersion = /\.(exe|dmg|zip|yml|blockmap)$/i.test(cleanText) || /^v?\d+\.\d+/i.test(cleanText);
        const extraClass = isFileOrVersion
          ? 'font-mono text-[12px] bg-white/[0.06] hover:bg-white/[0.12] [html[data-theme=\'light\']_&]:bg-slate-200/80 px-2 py-0.5 rounded no-underline text-white [html[data-theme=\'light\']_&]:text-slate-900 font-medium border border-white/10 hover:border-white/25 cursor-pointer'
          : 'underline underline-offset-2 font-medium cursor-pointer';
        return `<a href="${url}" class="text-white [html[data-theme=\'light\']_&]:text-blue-600 hover:text-slate-200 [html[data-theme=\'light\']_&]:hover:text-blue-700 transition-colors inline-flex items-center gap-1 ${extraClass}">${cleanText}</a>`;
      }
    );

    // Handle inline code: `code`
    escaped = escaped.replace(
      /`([^`]+)`/g,
      '<code class="bg-white/[0.06] [html[data-theme=\'light\']_&]:bg-slate-200/80 text-white [html[data-theme=\'light\']_&]:text-slate-800 font-mono text-[11.5px] sm:text-[12px] px-1.5 py-0.5 rounded border border-white/5 [html[data-theme=\'light\']_&]:border-slate-300/80">$1</code>'
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

    // Flush accumulated list items
    const flushList = (key) => {
      if (listItems.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListTag
            key={key}
            className={`${
              listType === 'ol' ? 'list-decimal' : 'list-disc'
            } pl-6 my-5 space-y-2.5 max-w-prose ${
              fontSize === 'large'
                ? 'text-[18px] sm:text-[19px] leading-[1.85] text-slate-100 [html[data-theme="light"]_&]:text-slate-900'
                : 'text-[16px] sm:text-[16.5px] leading-[1.8] text-slate-200 [html[data-theme="light"]_&]:text-slate-800'
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

      // Handle horizontal rule - clean breathing room spacing without harsh divider lines
      if (line.trim() === '---') {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <div
            key={`hr-${blockIdx}-${i}`}
            className="my-8 max-w-prose"
            aria-hidden="true"
          />
        );
        continue;
      }

      // Handle H1
      if (line.startsWith('# ')) {
        flushList(`list-${blockIdx}-${i}`);
        if (renderTitle) {
          elements.push(
            <h1
              key={`h1-${blockIdx}-${i}`}
              className="text-2xl sm:text-3xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight mb-4 font-display leading-tight max-w-prose text-balance"
              itemProp="headline"
            >
              {line.substring(2)}
            </h1>
          );
        }
        continue;
      }

      // Handle H2 with Google Sans Flex standard (Size: 22px, Weight: 400 Regular, Optical Size: Auto)
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
            className={`font-normal text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight mt-11 mb-4 font-display scroll-mt-24 group relative max-w-prose text-balance leading-snug ${
              fontSize === 'large' ? 'text-2xl sm:text-[26px]' : 'text-xl sm:text-[22px]'
            }`}
          >
            <span>{titleText}</span>
            <a
              href={`#${headingId}`}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick?.(headingId);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 text-sm transition-opacity font-mono inline-block ml-1.5 select-none align-baseline"
              title={isVi ? 'Sao chép liên kết mục này' : 'Copy link to this section'}
              aria-label={`Liên kết tới phần ${titleText}`}
            >
              #
            </a>
          </h2>
        );
        continue;
      }

      // Handle H3 with clean typography
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
            className={`font-normal text-slate-200 [html[data-theme='light']_&]:text-slate-900 tracking-tight mt-8 mb-3 font-display scroll-mt-24 group relative max-w-prose text-balance leading-snug ${
              fontSize === 'large' ? 'text-lg sm:text-[20px]' : 'text-base sm:text-[18px]'
            }`}
          >
            <span>{titleText}</span>
            <a
              href={`#${headingId}`}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick?.(headingId);
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 text-xs transition-opacity font-mono inline-block ml-1.5 select-none align-baseline"
              title={isVi ? 'Sao chép liên kết mục này' : 'Copy link to this section'}
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
            className={`font-medium tracking-tight text-slate-300 [html[data-theme='light']_&]:text-slate-800 mt-5 mb-2.5 font-display max-w-prose text-balance leading-normal ${
              fontSize === 'large' ? 'text-base sm:text-[17px]' : 'text-sm sm:text-base'
            }`}
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
            className="my-6 overflow-x-auto rounded-lg border border-white/10 [html[data-theme='light']_&]:border-slate-200 bg-white/[0.015] [html[data-theme='light']_&]:bg-white scrollbar-thin"
          >
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100/80 border-b border-white/10 [html[data-theme='light']_&]:border-slate-200">
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="px-4 py-3 text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: parseInline(h) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-white/5 [html[data-theme='light']_&]:border-slate-100 hover:bg-white/[0.02] [html[data-theme='light']_&]:hover:bg-slate-50 transition-colors"
                  >
                    {parseCells(row).map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-slate-200 [html[data-theme='light']_&]:text-slate-700 align-top leading-relaxed"
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
            ? (isVi ? 'Lưu ý' : 'Note')
            : isTip
            ? (isVi ? 'Mẹo thực chiến' : 'Pro Tip')
            : isWarning
            ? (isVi ? 'Cảnh báo quan trọng' : 'Warning')
            : (isVi ? 'Quan trọng' : 'Important');

          const textColor = isNote
            ? 'text-blue-300 [html[data-theme="light"]_&]:text-blue-700'
            : isTip
            ? 'text-emerald-300 [html[data-theme="light"]_&]:text-emerald-700'
            : isWarning
            ? 'text-amber-300 [html[data-theme="light"]_&]:text-amber-700'
            : 'text-white [html[data-theme="light"]_&]:text-slate-900';

          const bgAccent = isNote
            ? 'bg-blue-500/[0.05] [html[data-theme="light"]_&]:bg-blue-50 border border-blue-500/15 [html[data-theme="light"]_&]:border-blue-200'
            : isTip
            ? 'bg-emerald-500/[0.05] [html[data-theme="light"]_&]:bg-emerald-50 border border-emerald-500/15 [html[data-theme="light"]_&]:border-emerald-200'
            : isWarning
            ? 'bg-amber-500/[0.05] [html[data-theme="light"]_&]:bg-amber-50 border border-amber-500/15 [html[data-theme="light"]_&]:border-amber-200'
            : 'bg-white/[0.04] [html[data-theme="light"]_&]:bg-slate-100 border border-white/10 [html[data-theme="light"]_&]:border-slate-300';

          elements.push(
            <div
              key={`callout-${blockIdx}-${i}`}
              className={`p-4 sm:p-5 rounded-lg my-6 flex gap-3.5 backdrop-blur-sm max-w-prose ${bgAccent}`}
            >
              <div className="pt-0.5 shrink-0">
                {isNote ? (
                  <Info size={16} className="text-blue-400 [html[data-theme='light']_&]:text-blue-600" />
                ) : isTip ? (
                  <Sparkles size={16} className="text-emerald-400 [html[data-theme='light']_&]:text-emerald-600" />
                ) : isWarning ? (
                  <AlertTriangle size={16} className="text-amber-400 [html[data-theme='light']_&]:text-amber-600" />
                ) : (
                  <Terminal size={16} className="text-white [html[data-theme='light']_&]:text-slate-900" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`font-mono text-[11px] font-bold uppercase tracking-wider mb-1 ${textColor}`}>
                  {badgeTitle}
                </div>
                <div
                  className={`leading-relaxed text-slate-200 [html[data-theme='light']_&]:text-slate-800 ${
                    fontSize === 'large' ? 'text-[16.5px]' : 'text-[15px]'
                  }`}
                  dangerouslySetInnerHTML={{ __html: parseInline(cleanText) }}
                />
              </div>
            </div>
          );
        } else {
          elements.push(
            <blockquote
              key={`quote-${blockIdx}-${i}`}
              className={`bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100/60 px-5 py-3.5 rounded-md italic my-5 text-slate-100 [html[data-theme='light']_&]:text-slate-900 border-l-2 border-white/25 [html[data-theme='light']_&]:border-slate-300 max-w-prose encode-sans-condensed-extralight ${
                fontSize === 'large' ? 'text-[19px] sm:text-[21px] leading-[1.65] tracking-wide' : 'text-[17.5px] sm:text-[19.5px] leading-[1.6] tracking-wide'
              }`}
            >
              {quoteContent}
            </blockquote>
          );
        }
        continue;
      }

      // Default Paragraph with Optimal Measure (65-75ch) & High Legibility Typography
      if (line.trim()) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <p
            key={`p-${blockIdx}-${i}`}
            className={`${
              fontSize === 'large'
                ? 'text-[18px] sm:text-[19px] leading-[1.85] text-slate-100 [html[data-theme="light"]_&]:text-slate-900'
                : 'text-[16px] sm:text-[16.5px] leading-[1.8] text-slate-200 [html[data-theme="light"]_&]:text-slate-800'
            } mb-5 max-w-prose font-normal`}
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }
    }

    flushList(`list-end-${blockIdx}`);
    return elements;
  };

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <CodeBlock
              key={block.id}
              block={block}
              onCopy={handleCopy}
              copiedId={copiedId}
              isVi={isVi}
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

export default ArticleRenderer;
export { ArticleRenderer as MarkdownRenderer };
