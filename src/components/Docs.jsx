import React, { useState, useEffect, useMemo } from 'react';
import { docsData } from '../data/docsData';
import { Menu, X, ChevronRight, Copy, Check, Terminal, Cpu, ShieldAlert } from 'lucide-react';
import { TranslationService } from '../services/TranslationService';

// Custom Markdown Parser for Vercel-like docs display
const MarkdownRenderer = ({ content }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(blockId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseInline = (text) => {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Handle bold: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle inline code: `code`
    escaped = escaped.replace(/`([^`]+)`/g, '<code class="bg-[#161B22] text-cyan-400 font-mono text-[11px] px-1.5 py-0.5 rounded border border-white/5">$1</code>');
    
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

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key} className="list-disc pl-5 my-4 space-y-2 text-slate-300 text-sm">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle horizontal rule
      if (line.trim() === '---') {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(<hr key={`hr-${blockIdx}-${i}`} className="border-t border-white/5 my-8" />);
        continue;
      }

      // Handle Headings
      if (line.startsWith('# ')) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <h1 key={`h1-${blockIdx}-${i}`} className="text-3xl font-extrabold text-white tracking-tight mb-6 font-display">
            {line.substring(2)}
          </h1>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        flushList(`list-${blockIdx}-${i}`);
        const titleText = line.substring(3).trim();
        // Generate clean anchor slug
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');
        elements.push(
          <h2 id={headingId} key={`h2-${blockIdx}-${i}`} className="text-xl font-bold text-white tracking-tight mt-10 mb-4 font-display flex items-center gap-2 scroll-mt-24">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span>
            {titleText}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <h3 key={`h3-${blockIdx}-${i}`} className="text-base font-semibold text-white tracking-tight mt-6 mb-3 font-display">
            {line.substring(4)}
          </h3>
        );
        continue;
      }

      // Handle Unordered List
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        listItems.push(line.trim().substring(2));
        continue;
      }

      // Handle Markdown Table
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushList(`list-${blockIdx}-${i}`);

        // Collect all consecutive table lines
        const tableLines = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
          tableLines.push(lines[j].trim());
          j++;
        }
        i = j - 1;

        // Parse cells from a row string
        const parseCells = (row) =>
          row.slice(1, -1).split('|').map((cell) => cell.trim());

        // Identify separator row (---|---|---)
        const isSeparator = (row) => /^\|[\s|:-]+\|$/.test(row);

        const headerRow = tableLines[0];
        const headers = parseCells(headerRow);

        // Body rows = all non-separator rows after header
        const bodyRows = tableLines.slice(1).filter((r) => !isSeparator(r));

        elements.push(
          <div key={`table-${blockIdx}-${i}`} className="my-6 overflow-x-auto rounded-md border border-white/10">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="px-4 py-2.5 text-white font-bold uppercase tracking-wider text-[10px] whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: parseInline(h) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    {parseCells(row).map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-2.5 text-white align-top"
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

      // Handle blockquotes / callouts: > [!NOTE] or > [!IMPORTANT]
      if (line.trim().startsWith('> ')) {
        flushList(`list-${blockIdx}-${i}`);
        
        let blockquoteLines = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('> ')) {
          blockquoteLines.push(lines[j].trim().substring(2));
          j++;
        }
        i = j - 1; // Skip lines processed

        const quoteContent = blockquoteLines.join('\n');
        
        if (quoteContent.includes('[!NOTE]') || quoteContent.includes('[!IMPORTANT]')) {
          const isNote = quoteContent.includes('[!NOTE]');
          const cleanText = quoteContent.replace(/\[!NOTE\]|\[!IMPORTANT\]/g, '').trim();
          
          elements.push(
            <div 
              key={`callout-${blockIdx}-${i}`} 
              className={`p-4 rounded-md border my-6 flex gap-3 ${
                isNote 
                  ? 'bg-blue-950/20 border-blue-500/20 text-blue-200' 
                  : 'bg-cyan-950/20 border-cyan-500/20 text-cyan-200'
              }`}
            >
              <div className="pt-0.5">
                {isNote ? <ShieldAlert size={16} className="text-blue-400" /> : <Terminal size={16} className="text-cyan-400" />}
              </div>
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
                  {isNote ? 'Lưu ý' : 'Quan trọng'}
                </div>
                <div className="text-xs leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: parseInline(cleanText) }} />
              </div>
            </div>
          );
        } else {
          elements.push(
            <blockquote key={`quote-${blockIdx}-${i}`} className="border-l-2 border-cyan-500/40 pl-4 py-1 italic my-4 text-slate-400 text-xs">
              {quoteContent}
            </blockquote>
          );
        }
        continue;
      }

      // Default paragraph (flush list first)
      if (line.trim()) {
        flushList(`list-${blockIdx}-${i}`);
        elements.push(
          <p 
            key={`p-${blockIdx}-${i}`} 
            className="text-slate-300 text-sm leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: parseInline(line) }}
          />
        );
      }
    }

    // Flush any remaining list items
    flushList(`list-end-${blockIdx}`);
    return elements;
  };

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <div key={block.id} className="rounded-lg border border-white/5 overflow-hidden my-6">
              {/* Code header bar */}
              <div className="bg-[#0b0c10] border-b border-white/5 px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{block.lang}</span>
                <button
                  onClick={() => handleCopy(block.content, block.id)}
                  className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                  title="Sao chép"
                >
                  {copiedId === block.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
              </div>
              {/* Code content */}
              <pre className="p-4 overflow-x-auto text-[12px] font-mono text-slate-300 leading-relaxed bg-[#030407] scrollbar-thin">
                <code>{block.content}</code>
              </pre>
            </div>
          );
        } else {
          return <React.Fragment key={`text-block-${idx}`}>{renderTextBlock(block.content, idx)}</React.Fragment>;
        }
      })}
    </div>
  );
};

export const Docs = ({ activeLang = 'vi' }) => {
  const [activeId, setActiveId] = useState(docsData[0]?.id || "gioi-thieu");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // States for translation
  const [translatedData, setTranslatedData] = useState(docsData);
  const [translatingContent, setTranslatingContent] = useState(false);
  const [translatingSidebar, setTranslatingSidebar] = useState(false);
  const [translatedCache, setTranslatedCache] = useState({});
  const [sidebarCache, setSidebarCache] = useState({ vi: docsData });

  // Find active raw document
  const activeRawDoc = docsData.find((doc) => doc.id === activeId) || docsData[0];

  // Dynamic state for translated active content
  const [activeContent, setActiveContent] = useState(activeRawDoc.content);

  // Effect to translate sidebar headers and items when language changes
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
        console.error("Failed to translate sidebar:", err);
        setTranslatedData(docsData);
      } finally {
        setTranslatingSidebar(false);
      }
    };

    translateSidebar();
  }, [activeLang, sidebarCache]);

  // Effect to translate document content when active doc or language changes
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
        const translatedMd = await TranslationService.translateMarkdown(activeRawDoc.content, activeLang, 'vi');
        setTranslatedCache((prev) => ({ ...prev, [cacheKey]: translatedMd }));
        setActiveContent(translatedMd);
      } catch (err) {
        console.error("Failed to translate document content:", err);
        setActiveContent(activeRawDoc.content);
      } finally {
        setTranslatingContent(false);
      }
    };

    translateDocContent();
  }, [activeId, activeLang, activeRawDoc, translatedCache]);

  // Extract H2 headings for the Table of Contents (TOC)
  const headings = useMemo(() => {
    if (!activeContent) return [];
    const lines = activeContent.split('\n');
    const headingRegex = /^##\s+(.+)$/;
    const extracted = [];
    lines.forEach((line) => {
      const match = line.match(headingRegex);
      if (match) {
        const titleText = match[1].trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\u00C0-\u1EF9\s-]/g, '')
          .replace(/\s+/g, '-');
        extracted.push({ id: headingId, title: titleText });
      }
    });
    return extracted;
  }, [activeContent]);

  // Scroll spy implementation to highlight active TOC item
  const [activeHeadingId, setActiveHeadingId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      if (headingElements.length === 0) return;

      // Check if the user has scrolled to the bottom of the page (within a 60px buffer)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      let currentActive = '';
      
      if (isAtBottom && headings.length > 0) {
        currentActive = headings[headings.length - 1].id;
      } else {
        for (const el of headingElements) {
          const rect = el.getBoundingClientRect();
          // Check if the heading is above or near the screen threshold
          if (rect.top <= 120) {
            currentActive = el.id;
          } else {
            break;
          }
        }
      }
      
      // Default to first heading if scrolled but none activated
      if (!currentActive && headingElements.length > 0) {
        currentActive = headingElements[0].id;
      }
      
      setActiveHeadingId(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group documentation by category
  const categories = {};
  translatedData.forEach((doc) => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  });

  // Close sidebar on item selection (mobile)
  const selectDoc = (id) => {
    setActiveId(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-[#0B0B11] border-b border-white/5 flex relative justify-between">

      {/* Mobile Toggle Sidebar Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 bg-cyan-500 text-black rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B0B11]/95 lg:bg-transparent border-r border-white/5 transform lg:transform-none transition-transform duration-200 ease-in-out lg:relative lg:border-r lg:border-white/5 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-0 lg:translate-x-0'
        } ${!sidebarOpen && 'hidden lg:block'} ${translatingSidebar ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}`}
      >
        <div className="sticky top-[73px] py-8 px-6 overflow-y-auto flex flex-col justify-between h-[calc(100vh-73px)]">
          <div className="space-y-6">
            {Object.keys(categories).map((catName) => (
              <div key={catName} className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
                  {catName}
                </div>
                <ul className="space-y-1">
                  {categories[catName].map((doc) => {
                    const isActive = doc.id === activeId;
                    return (
                      <li key={doc.id}>
                        <button
                          onClick={() => selectDoc(doc.id)}
                          className={`w-full flex items-center justify-between text-left py-1.5 px-2.5 rounded text-xs font-medium transition-all group ${
                            isActive
                              ? 'text-white bg-white/[0.03]'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.01]'
                          }`}
                        >
                          <span className="truncate">{doc.title}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${
                              isActive ? 'translate-x-0.5 text-cyan-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600'
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>


        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-6 md:px-12 lg:px-16 py-10 max-w-3xl xl:max-w-4xl w-full relative min-h-[500px]">
        {translatingContent && (
          <div className="absolute inset-0 bg-[#0B0B11]/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center py-20 text-center font-mono text-sm text-cyan-400">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-cyan-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="animate-pulse">
              {activeLang === 'en' ? 'Translating document in real-time...' : 'Đang dịch tài liệu thời gian thực...'}
            </span>
          </div>
        )}

        {activeRawDoc ? (
          <div className="animate-fadeIn">
            <MarkdownRenderer content={activeContent} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 font-mono text-sm">
            <Cpu className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
            <span>Đang nạp dữ liệu tài liệu...</span>
          </div>
        )}
      </main>

      {/* Right Sidebar: Mini Index / Table of Contents (TOC) */}
      <aside className="hidden xl:block w-56 relative border-l border-white/5">
        <div className="sticky top-6">
          {/* Label */}
          <div className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest px-4 py-3 border-b border-white/5">
            {activeLang === 'vi' ? 'TRONG TRANG NÀY' : 'ON THIS PAGE'}
          </div>

          {headings.length > 0 ? (
            <ul className="font-mono text-[11px]">
              {headings.map((h) => {
                const isActive = h.id === activeHeadingId;
                return (
                  <li key={h.id} className={`border-b border-white/5 ${isActive ? 'bg-white/[0.04]' : ''}`}>
                    <button
                      onClick={() => scrollToHeading(h.id)}
                      className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-2 group ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="line-clamp-2 leading-snug">{h.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-[10px] text-slate-600 italic px-4 py-3">
              {activeLang === 'vi' ? 'Không có chỉ mục phụ' : 'No subheadings'}
            </div>
          )}
        </div>
      </aside>


    </div>
  );
};

export default Docs;
