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

import { ArticleRenderer, MarkdownRenderer } from './ArticleRenderer';
import { DocPagination } from './DocPagination';
import { ReaderSidebarLeft } from './ReaderSidebarLeft';
import { ReaderSidebarRight } from './ReaderSidebarRight';

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

  // Font size adjuster state for global accessibility (synchronized across Docs & Explore)
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return (
        localStorage.getItem('aevum_reading_font_size') ||
        localStorage.getItem('aevum-docs-font-size') ||
        localStorage.getItem('aevum_reader_fontsize') ||
        'normal'
      );
    }
    return 'normal';
  });

  const toggleFontSize = () => {
    const next = fontSize === 'normal' ? 'large' : 'normal';
    setFontSize(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('aevum_reading_font_size', next);
      localStorage.setItem('aevum-docs-font-size', next);
      localStorage.setItem('aevum_reader_fontsize', next);
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
              <span className="font-sans text-xs font-medium uppercase tracking-wider docs-drawer-title">
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

            {/* Mobile Drawer Navigation (Standard Unified Reader Component) */}
            <div className="flex-1 overflow-hidden">
              <ReaderSidebarLeft
                asMobileDrawer={true}
                searchQuery={filterQuery}
                onSearchChange={setFilterQuery}
                searchPlaceholder={activeLang === 'vi' ? 'Lọc tài liệu...' : 'Filter docs...'}
                categories={categories}
                activeId={activeId}
                onSelectItem={(doc) => selectDoc(doc.id)}
                getItemHref={(doc) => `/docs/${doc.id}`}
                disabled={translatingSidebar}
                onCloseDrawer={() => setSidebarOpen(false)}
                isVi={activeLang === 'vi'}
                footerLeft={
                  <a
                    href="/changelog"
                    onClick={(e) => {
                      e.preventDefault();
                      setSidebarOpen(false);
                      onNavigate?.('changelog');
                    }}
                    className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5 group"
                    title="Xem Nhật ký Cập nhật"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="group-hover:underline">Aevum OS v1.0.0-beta.6</span>
                  </a>
                }
              />
            </div>
          </div>,
          document.body
        )}

      {/* Desktop Sidebar (Standard Unified Reader Component) */}
      <ReaderSidebarLeft
        searchQuery={filterQuery}
        onSearchChange={setFilterQuery}
        searchPlaceholder={activeLang === 'vi' ? 'Lọc tài liệu...' : 'Filter docs...'}
        categories={categories}
        activeId={activeId}
        onSelectItem={(doc) => selectDoc(doc.id)}
        getItemHref={(doc) => `/docs/${doc.id}`}
        disabled={translatingSidebar}
        isVi={activeLang === 'vi'}
        footerLeft={
          <a
            href="/changelog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('changelog');
            }}
            className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5 group"
            title="Xem Nhật ký Cập nhật"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="group-hover:underline">Aevum OS v1.0.0-beta.6</span>
          </a>
        }
        footerRight={<span className="px-1.5 py-0.5 rounded bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200">Ctrl K</span>}
      />

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
          <span className="text-xs font-sans font-medium">{activeLang === 'vi' ? 'Mục lục' : 'Menu'}</span>
        </button>

        {/* Main Content Area (Clean Section to prevent nested main issue) */}
        <div
          id="doc-content"
          role="region"
          aria-label="Nội dung tài liệu"
          className="flex-1 px-6 md:px-12 lg:px-16 py-8 max-w-3xl xl:max-w-4xl w-full relative min-h-[500px]"
        >
          {translatingContent && (
            <div className="absolute inset-0 bg-[#07090D]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center py-20 text-center font-sans text-sm text-white">
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
                className="mb-5 flex items-center flex-wrap gap-2 text-xs font-sans text-slate-400"
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
                <span className="text-slate-400 uppercase tracking-wider text-[11px] font-medium">
                  {activeRawDoc.category}
                </span>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-white font-medium truncate">{activeRawDoc.title}</span>
              </nav>

              {/* Minimalist Article Metadata Bar & Reader Controls */}
              <header className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 text-xs font-sans text-slate-400">
                <div className="flex items-center flex-wrap gap-4">
                  <span className="px-2 py-0.5 rounded bg-white/[0.06] text-white uppercase tracking-wider text-[10px] font-medium">
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
                    <span className="text-[11px] font-sans font-medium">
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
                <ArticleRenderer
                  content={activeContent}
                  activeId={activeId}
                  fontSize={fontSize}
                  isVi={activeLang === 'vi'}
                  renderTitle={true}
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

              {/* Unified Relational Pagination: Minimalist Floating Dock matching Image 1 */}
              <DocPagination
                prevDoc={prevDoc}
                nextDoc={nextDoc}
                onSelectDoc={selectDoc}
                isVi={activeLang === 'vi'}
              />
            </article>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 font-mono text-sm">
              <Cpu className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
              <span>Đang nạp dữ liệu tài liệu...</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar: Table of Contents (Standard Unified Reader Component) */}
      <ReaderSidebarRight
        headings={headings}
        activeHeadingId={activeHeadingId}
        onHeadingClick={(headingId) => {
          scrollToHeading(headingId);
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', `/docs/${activeId}#${headingId}`);
          }
        }}
        isVi={activeLang === 'vi'}
      />
    </div>
  );
};

export default Docs;
