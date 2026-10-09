import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { curriculumModules, findLessonById } from '../data/learningCurriculum';
import { ArticleRenderer } from './ArticleRenderer';
import { TranslationService } from '../services/TranslationService';
import { ReaderSidebarLeft } from './ReaderSidebarLeft';
import { ReaderSidebarRight } from './ReaderSidebarRight';
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Share2,
  Check,
  Search,
  ArrowUp,
  ArrowLeft,
  CheckCircle2,
  Circle,
  LayoutGrid,
  AlignLeft,
  Type,
  Clock,
  BookOpen
} from 'lucide-react';

export const EraExploration = ({ activeLang = 'vi', onNavigate, initialLessonId = null }) => {
  const isVi = activeLang === 'vi';

  // Flatten all lessons across curriculum modules
  const allLessons = useMemo(() => {
    return curriculumModules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, categoryName: m.categoryName }))
    );
  }, []);

  // Determine initial view mode: 'reader' if URL has a specific lesson ID, otherwise 'grid'
  const [viewMode, setViewMode] = useState(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return 'reader';
    }
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.replace(/^\/+/, '').split('/');
      if (['explore', 'kham-pha', 'learn', 'academy'].includes(parts[0]) && parts[1]) {
        const found = allLessons.find((l) => l.id === parts[1]);
        if (found) return 'reader';
      }
    }
    return 'grid';
  });

  // Active lesson ID
  const [activeLessonId, setActiveLessonId] = useState(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return initialLessonId;
    }
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.replace(/^\/+/, '').split('/');
      if (['explore', 'kham-pha', 'learn', 'academy'].includes(pathParts[0]) && pathParts[1]) {
        const found = allLessons.find((l) => l.id === pathParts[1]);
        if (found) return found.id;
      }
    }
    return allLessons[0]?.id || 'ai-la-gi-co-che-hoat-dong';
  });

  // Track completed lessons via localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('aevum_completed_lessons');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const toggleLessonCompleted = (id, e) => {
    if (e) e.stopPropagation();
    setCompletedLessons((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('aevum_completed_lessons', JSON.stringify(next));
      }
      return next;
    });
  };

  // Font size state for comfortable, accessible reading (synchronized across Docs & Explore)
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
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('aevum_reading_font_size', next);
      localStorage.setItem('aevum-docs-font-size', next);
      localStorage.setItem('aevum_reader_fontsize', next);
    }
  };

  // Mobile sidebar drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobileBtnVisible, setIsMobileBtnVisible] = useState(true);

  // Auto-hide mobile button on scroll down, show on activity
  useEffect(() => {
    let timeoutId;
    const handleActivity = () => {
      setIsMobileBtnVisible(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobileBtnVisible(false), 2500);
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    timeoutId = setTimeout(() => setIsMobileBtnVisible(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarFilterQuery, setSidebarFilterQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Category tab scroll (Grid mode)
  const tabScrollRef = useRef(null);
  const [tabCanScrollLeft, setTabCanScrollLeft] = useState(false);
  const [tabCanScrollRight, setTabCanScrollRight] = useState(false);

  const updateTabScroll = useCallback(() => {
    const el = tabScrollRef.current;
    if (!el) return;
    setTabCanScrollLeft(el.scrollLeft > 4);
    setTabCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateTabScroll();
    const el = tabScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateTabScroll, { passive: true });
    const ro = new ResizeObserver(updateTabScroll);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateTabScroll); ro.disconnect(); };
  }, [updateTabScroll]);

  const scrollTabs = (dir) => {
    const el = tabScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 180, behavior: 'smooth' });
  };

  // Active lesson object and current module
  const { lesson: activeLesson, module: activeModule } = useMemo(() => {
    return findLessonById(activeLessonId);
  }, [activeLessonId]);

  // Current lesson index & prev/next
  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // =========================================================================
  // LANGUAGE SYSTEM INTEGRATION & REAL-TIME DYNAMIC TRANSLATION
  // =========================================================================
  const [activeContent, setActiveContent] = useState(activeLesson?.content || '');
  const [translatingContent, setTranslatingContent] = useState(false);
  const [contentCache, setContentCache] = useState({});

  // Dynamic lesson translation when language or active lesson changes
  useEffect(() => {
    if (!activeLesson?.content) return;

    if (activeLang === 'vi') {
      setActiveContent(activeLesson.content);
      return;
    }

    const cacheKey = `${activeLessonId}_${activeLang}`;
    if (contentCache[cacheKey]) {
      setActiveContent(contentCache[cacheKey]);
      return;
    }

    let isMounted = true;
    const translateContent = async () => {
      setTranslatingContent(true);
      try {
        const translatedMd = await TranslationService.translateMarkdown(
          activeLesson.content,
          activeLang,
          'vi'
        );
        if (isMounted) {
          setContentCache((prev) => ({ ...prev, [cacheKey]: translatedMd }));
          setActiveContent(translatedMd);
        }
      } catch (err) {
        console.error('Lesson translation failed, falling back to original:', err);
        if (isMounted) setActiveContent(activeLesson.content);
      } finally {
        if (isMounted) setTranslatingContent(false);
      }
    };

    translateContent();
    return () => { isMounted = false; };
  }, [activeLessonId, activeLang, activeLesson]);

  // Dynamic SEO & Metadata Synchronization for Client-side Navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setMeta = (selector, attrName, attrVal, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (viewMode === 'reader' && activeLesson) {
      const pageTitle = `${activeLesson.title} — Khám phá Kỉ nguyên AI | Aevum OS`;
      const desc = activeLesson.summary || activeLesson.title;
      const canonical = `https://www.aevum.ai.vn/explore/${activeLesson.id}`;

      document.title = pageTitle;
      setMeta('meta[name="description"]', 'name', 'description', desc);
      setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
      setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
      setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);

      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute('href', canonical);
      }
    } else if (viewMode === 'grid') {
      const defaultTitle = isVi
        ? 'Khám phá Kỉ nguyên AI — Học viện Tri thức & Tác nhân Tự chủ | Aevum OS'
        : 'Explore AI Era — Autonomous Agent Academy & Knowledge Hub | Aevum OS';
      const defaultDesc = isVi
        ? 'Khám phá kỉ nguyên Agentic AI: Giáo trình mở miễn phí về kiến trúc hệ điều hành agent, tối ưu ngữ cảnh MCP, trí nhớ nhận thức kép và đồ thị tri thức sống.'
        : 'Explore the Agentic AI era: Free open academy on agent operating systems, MCP context engineering, dual-memory architectures, and living memory graphs.';
      const canonical = 'https://www.aevum.ai.vn/explore';

      document.title = defaultTitle;
      setMeta('meta[name="description"]', 'name', 'description', defaultDesc);
      setMeta('meta[property="og:title"]', 'property', 'og:title', defaultTitle);
      setMeta('meta[property="og:description"]', 'property', 'og:description', defaultDesc);
      setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);

      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute('href', canonical);
      }
    }
  }, [viewMode, activeLessonId, activeLesson, isVi]);

  // Reading progress tracker (Top progress rail across top of viewport)
  const [readingProgress, setReadingProgress] = useState(0);
  useEffect(() => {
    if (viewMode !== 'reader') return;
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
  }, [activeLessonId, viewMode]);

  // Filtered lessons for card grid
  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchesCategory = selectedCategory === 'all' || lesson.moduleId === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.summary.toLowerCase().includes(query) ||
        lesson.targetAudience?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allLessons, selectedCategory, searchQuery]);

  // Filtered syllabus lessons in reader sidebar
  const filteredSidebarModules = useMemo(() => {
    const q = sidebarFilterQuery.trim().toLowerCase();
    if (!q) return curriculumModules;

    return curriculumModules.map((mod) => ({
      ...mod,
      lessons: mod.lessons.filter(
        (l) => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)
      )
    })).filter((mod) => mod.lessons.length > 0);
  }, [sidebarFilterQuery]);

  // Open a specific lesson in Reader Mode
  const openLessonReader = (lessonId) => {
    setActiveLessonId(lessonId);
    setViewMode('reader');
    setMobileDrawerOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/explore/${lessonId}`);
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Back to Card Grid
  const backToGrid = () => {
    setViewMode('grid');
    setMobileDrawerOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/explore');
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Copy share link
  const handleCopyLessonLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const url = viewMode === 'reader'
        ? `https://www.aevum.ai.vn/explore/${activeLessonId}`
        : 'https://www.aevum.ai.vn/explore';
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Extract H2 and H3 headings from active content
  const headings = useMemo(() => {
    if (!activeContent) return [];
    const lines = activeContent.split('\n');
    const result = [];
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text.toLowerCase().replace(/[^\w\u00C0-\u1EF9\s-]/g, '').replace(/\s+/g, '-');
        result.push({ id, title: text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text.toLowerCase().replace(/[^\w\u00C0-\u1EF9\s-]/g, '').replace(/\s+/g, '-');
        result.push({ id, title: text, level: 3 });
      }
    });
    return result;
  }, [activeContent]);

  // Scroll spy for Right Outline (Table of contents)
  const [activeHeadingId, setActiveHeadingId] = useState('');
  useEffect(() => {
    if (viewMode !== 'reader') return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
        if (headingElements.length === 0) return;

        let currentActive = '';
        for (const el of headingElements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentActive = el.id;
          } else {
            break;
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
  }, [headings, viewMode]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -80, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-200 [html[data-theme='light']_&]:text-slate-800 era-exploration-root font-sans">

      {/* Top Reading Progress Bar (Monochrome Style) */}
      {viewMode === 'reader' && (
        <div
          className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 [html[data-theme='light']_&]:bg-slate-700 z-50 transition-all duration-75 pointer-events-none"
          style={{ width: `${readingProgress}%` }}
          aria-hidden="true"
        />
      )}

      {/* ========================================================================= */}
      {/* 1. QUIET & REFINED HEADER                                                 */}
      {/* ========================================================================= */}
      <div className="w-full border-b border-white/10 [html[data-theme='light']_&]:border-slate-200/80 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-widest">
                {isVi ? 'HỌC VIỆN TRI THỨC MỞ' : 'OPEN KNOWLEDGE HUB'}
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight font-display">
                {isVi ? 'Khám phá Kỉ nguyên AI' : 'Explore the AI Era'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed pt-0.5">
                {isVi
                  ? 'Kho lưu trữ tri thức và bài học mở hoàn toàn miễn phí cho mọi người từ khái niệm căn bản, ứng dụng thực tiễn đa lĩnh vực, đến các công nghệ tác nhân tự chủ.'
                  : 'A 100% free open knowledge repository for everyone — from intuitive foundations, cross-industry applications, to autonomous agent technologies.'}
              </p>
            </div>

            {/* Metrics & View Mode Switcher */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
              <div className="text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                {completedLessons.length}/{allLessons.length} {isVi ? 'bài đã học' : 'completed'}
              </div>

              <div className="inline-flex rounded border border-white/10 [html[data-theme='light']_&]:border-slate-200 p-0.5 bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-200/60">
                <button
                  onClick={() => backToGrid()}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${viewMode === 'grid'
                    ? 'bg-white/10 [html[data-theme="light"]_&]:bg-white text-white [html[data-theme="light"]_&]:text-slate-900 font-medium [html[data-theme="light"]_&]:shadow-sm'
                    : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900'
                    }`}
                  title={isVi ? 'Xem dạng thẻ' : 'Card Grid view'}
                >
                  <LayoutGrid size={12} />
                  <span>{isVi ? 'Thẻ' : 'Cards'}</span>
                </button>
                <button
                  onClick={() => openLessonReader(activeLessonId)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${viewMode === 'reader'
                    ? 'bg-white/10 [html[data-theme="light"]_&]:bg-white text-white [html[data-theme="light"]_&]:text-slate-900 font-medium [html[data-theme="light"]_&]:shadow-sm'
                    : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900'
                    }`}
                  title={isVi ? 'Xem dạng đọc chi tiết' : 'Reader view'}
                >
                  <AlignLeft size={12} />
                  <span>{isVi ? 'Đọc' : 'Reader'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CARD DESIGN VIEW (UNCLUTTERED, EDITORIAL DISCOVERY)                     */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="w-full">
          {/* Navigation & Search Strip */}
          <div className="w-full border-b border-white/10 [html[data-theme='light']_&]:border-slate-200/80 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] sticky top-16 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Category Filter Links — scrollable with arrow nav */}
              <div className="relative flex items-center flex-1 min-w-0">
                {tabCanScrollLeft && (
                  <button
                    onClick={() => scrollTabs(-1)}
                    className="shrink-0 flex items-center justify-center w-6 h-6 mr-1 rounded text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer z-10 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC]"
                  >
                    <ChevronLeft size={14} />
                  </button>
                )}

                <div
                  ref={tabScrollRef}
                  className="flex items-center gap-0.5 overflow-x-auto no-scrollbar py-0.5 text-xs scroll-smooth flex-1 min-w-0"
                >
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === 'all'
                      ? 'text-white [html[data-theme="light"]_&]:text-slate-900 bg-white/10 [html[data-theme="light"]_&]:bg-slate-200/70 font-medium'
                      : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900'
                      }`}
                  >
                    {isVi ? 'Tất cả' : 'All'} ({allLessons.length})
                  </button>
                  {curriculumModules.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedCategory(mod.id)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === mod.id
                        ? 'text-white [html[data-theme="light"]_&]:text-slate-900 bg-white/10 [html[data-theme="light"]_&]:bg-slate-200/70 font-medium'
                        : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900'
                        }`}
                    >
                      {mod.categoryName || mod.title}
                    </button>
                  ))}
                </div>

                {tabCanScrollRight && (
                  <button
                    onClick={() => scrollTabs(1)}
                    className="shrink-0 flex items-center justify-center w-6 h-6 ml-1 rounded text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer z-10 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC]"
                  >
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div className="relative shrink-0 sm:w-56">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isVi ? 'Tìm bài học...' : 'Search lessons...'}
                  className="w-full pl-8 pr-7 py-1.5 rounded bg-white/[0.03] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 focus:border-white/30 [html[data-theme='light']_&]:focus:border-slate-400 text-xs text-white [html[data-theme='light']_&]:text-slate-900 placeholder-slate-400 font-sans outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {filteredLessons.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs font-sans">
                <p>{isVi ? 'Không tìm thấy bài học phù hợp.' : 'No lessons found.'}</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-2 text-white [html[data-theme='light']_&]:text-slate-900 underline underline-offset-4 cursor-pointer"
                >
                  {isVi ? 'Xem tất cả bài học' : 'View all'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLessons.map((lesson) => {
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => openLessonReader(lesson.id)}
                      className="group flex flex-col justify-between p-5 rounded-xl border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 [html[data-theme='light']_&]:hover:border-slate-300 bg-white/[0.015] [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:shadow-sm hover:bg-white/[0.03] transition-all cursor-pointer"
                    >
                      <div>
                        {/* Muted Category & Read Time */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 mb-1.5">
                          <span className="uppercase tracking-wider truncate">{lesson.category}</span>
                          <span className="shrink-0">{lesson.readTime}</span>
                        </div>

                        {/* Author Agent Tag */}
                        {lesson.author && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono mb-2">
                            <span className="font-medium text-slate-300 [html[data-theme='light']_&]:text-slate-800">{lesson.author.name}</span>
                            <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-400">•</span>
                            <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500 text-[10px] truncate">{lesson.author.role}</span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-semibold text-white [html[data-theme='light']_&]:text-slate-900 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-black transition-colors leading-snug line-clamp-2">
                          {lesson.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed line-clamp-3 mt-2 font-normal">
                          {lesson.summary}
                        </p>
                      </div>

                      {/* Footer: Target Audience & Status */}
                      <div className="pt-4 mt-4 flex items-center justify-between text-xs border-t border-white/5 [html[data-theme='light']_&]:border-slate-100">
                        <span className="text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate max-w-[170px]">
                          {lesson.targetAudience}
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                              <CheckCircle2 size={11} />
                              <span>{isVi ? 'Đã học' : 'Done'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 group-hover:text-slate-200 [html[data-theme='light']_&]:group-hover:text-slate-900 font-mono transition-colors">
                              <span>{isVi ? 'Khám phá' : 'Read'}</span>
                              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. READER VIEW (SEAMLESS UNIFIED PALETTE JUST LIKE DOCS)                   */}
      {/* ========================================================================= */}
      {viewMode === 'reader' && (
        <div className="w-full flex-1 block lg:flex lg:flex-row relative justify-between overflow-x-clip bg-transparent">

          {/* Mobile Drawer Portal (like Docs) */}
          {typeof document !== 'undefined' &&
            createPortal(
              <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                  onClick={() => setMobileDrawerOpen(false)}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                />

                {/* Drawer Container */}
                <div className={`absolute top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] border-r border-white/10 [html[data-theme='light']_&]:border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ${mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                  {/* Drawer Header */}
                  <div className="p-4 border-b border-white/10 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider">
                      {isVi ? 'HỌC VIỆN TRI THỨC' : 'SYLLABUS'}
                    </span>
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1 rounded text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Drawer Lessons List */}
                  <div className="flex-1 overflow-hidden">
                    <ReaderSidebarLeft
                      asMobileDrawer={true}
                      searchQuery={sidebarFilterQuery}
                      onSearchChange={setSidebarFilterQuery}
                      searchPlaceholder={isVi ? 'Lọc bài học...' : 'Filter lessons...'}
                      categories={filteredSidebarModules}
                      activeId={activeLessonId}
                      onSelectItem={(lesson) => openLessonReader(lesson.id)}
                      getItemHref={(lesson) => `/explore/${lesson.id}`}
                      onCloseDrawer={() => setMobileDrawerOpen(false)}
                      isVi={isVi}
                    />
                  </div>
                </div>
              </div>,
              document.body
            )}

          {/* ── LEFT RAIL: Clean Syllabus Outline (Exact Docs Style & Unified Component) ── */}
          <ReaderSidebarLeft
            searchQuery={sidebarFilterQuery}
            onSearchChange={setSidebarFilterQuery}
            searchPlaceholder={isVi ? 'Lọc bài học...' : 'Filter lessons...'}
            categories={filteredSidebarModules}
            activeId={activeLessonId}
            onSelectItem={(lesson) => openLessonReader(lesson.id)}
            getItemHref={(lesson) => `/explore/${lesson.id}`}
            isVi={isVi}
            footerLeft={
              <span className="flex items-center gap-1.5">
                <span>{isVi ? 'Tri thức mở' : 'Open Academy'}</span>
              </span>
            }
            footerRight={
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200">
                {allLessons.length} {isVi ? 'bài' : 'lessons'}
              </span>
            }
          />

          {/* ── CENTER AREA: Main Focus Reading Article ── */}
          <div className="flex-1 flex flex-col xl:flex-row justify-between w-full bg-transparent">
            {/* Mobile Sticky Menu Trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className={`lg:hidden sticky top-[76px] ml-4 mt-4 z-30 px-3 py-2 rounded-lg bg-[#07090D]/90 [html[data-theme='light']_&]:bg-white/95 backdrop-blur-md text-white [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300 shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300 self-start ${isMobileBtnVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-30 scale-95 hover:opacity-100'
                }`}
              aria-label="Mở mục lục bài học"
            >
              <Menu size={16} className="text-white [html[data-theme='light']_&]:text-slate-900" />
              <span className="text-xs font-sans font-medium">{isVi ? 'Mục lục' : 'Menu'}</span>
            </button>

            <article className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-8 lg:py-10 bg-transparent">
              {/* Semantic Breadcrumbs (Monochrome Style) */}
              <nav aria-label="Breadcrumb" className="mb-5 flex items-center flex-wrap gap-2 text-xs font-sans text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); onNavigate?.('landing'); }}
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors"
                >
                  {isVi ? 'Trang chủ' : 'Home'}
                </a>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <button
                  onClick={backToGrid}
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {isVi ? 'Khám phá' : 'Explore'}
                </button>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-wider text-[11px] font-medium truncate max-w-[200px]">
                  {activeLesson.category}
                </span>
                <ChevronRight size={12} className="text-slate-600 shrink-0" />
                <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-medium truncate max-w-[240px]">
                  {activeLesson.title}
                </span>
              </nav>

              {/* Minimalist Article Metadata Bar & Reader Controls */}
              <header className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 text-xs font-sans text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                <div className="flex items-center flex-wrap gap-3">
                  <span className="px-2 py-0.5 rounded bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200/80 text-white [html[data-theme='light']_&]:text-slate-900 border border-white/15 [html[data-theme='light']_&]:border-slate-300 uppercase tracking-wider text-[10px] font-medium">
                    {activeLesson.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                    <Clock size={13} className="text-slate-500" />
                    <span>{activeLesson.readTime}</span>
                  </span>
                  {activeLesson.targetAudience && (
                    <span className="text-slate-500 hidden sm:inline">• {activeLesson.targetAudience}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Font Size Toggle for Reading Accessibility */}
                  <button
                    onClick={toggleFontSize}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white hover:bg-white/[0.05] border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/30 [html[data-theme='light']_&]:hover:border-slate-400 text-slate-400 [html[data-theme='light']_&]:text-slate-600 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-all text-xs cursor-pointer select-none"
                    title={fontSize === 'normal' ? (isVi ? 'Tăng kích thước chữ (115%)' : 'Increase font size') : (isVi ? 'Đặt lại cỡ chữ chuẩn' : 'Reset font size')}
                  >
                    <Type size={13} className="text-white [html[data-theme='light']_&]:text-slate-900" />
                    <span className="text-[11px] font-sans font-medium">
                      {fontSize === 'normal' ? 'A' : 'A+'}
                    </span>
                  </button>

                  {/* Mark Completed Toggle */}
                  <button
                    onClick={() => toggleLessonCompleted(activeLessonId)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-sans font-medium border transition-colors cursor-pointer ${completedLessons.includes(activeLessonId)
                      ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                      : 'border-white/10 [html[data-theme="light"]_&]:border-slate-200 text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900'
                      }`}
                  >
                    {completedLessons.includes(activeLessonId) ? (
                      <>
                        <CheckCircle2 size={12} />
                        <span>{isVi ? 'Đã học' : 'Done'}</span>
                      </>
                    ) : (
                      <>
                        <Circle size={11} />
                        <span>{isVi ? 'Đánh dấu' : 'Mark done'}</span>
                      </>
                    )}
                  </button>

                  {/* Share Link */}
                  <button
                    onClick={handleCopyLessonLink}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.02] [html[data-theme='light']_&]:bg-white hover:bg-white/[0.05] border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/30 [html[data-theme='light']_&]:hover:border-slate-400 text-slate-400 [html[data-theme='light']_&]:text-slate-600 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-all text-xs cursor-pointer select-none"
                    title={isVi ? 'Sao chép liên kết bài học' : 'Copy lesson link'}
                  >
                    {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
                    <span className="text-[11px] font-sans font-medium">{copiedLink ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Chia sẻ' : 'Share')}</span>
                  </button>
                </div>
              </header>

              {/* Article Main Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight font-display leading-[1.22] mb-5 max-w-prose text-pretty">
                {activeLesson.title}
              </h1>

              {/* Article Summary */}
              <p className="text-[16px] sm:text-[17.5px] text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-relaxed font-normal mb-7 max-w-prose">
                {activeLesson.summary}
              </p>

              {/* Transparent Agent Author Quote (Refined Editorial Style, Zero Box, Zero Highlight Accent) */}
              {activeLesson.author && (
                <div className="pt-3 pb-8 mb-10 sm:mb-12 max-w-prose text-center">
                  {activeLesson.author.motto ? (
                    <div className="py-1 space-y-2.5">
                      <blockquote className="encode-sans-condensed-extralight text-[18px] sm:text-[20px] md:text-[22px] italic text-slate-100 [html[data-theme='light']_&]:text-slate-900 leading-snug tracking-wide text-center">
                        "{activeLesson.author.motto}"
                      </blockquote>
                      <div className="flex flex-wrap items-center justify-center gap-x-2.5 text-[14px] sm:text-[15.5px] font-quote text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                        <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-normal">{activeLesson.author.name}</span>
                        <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-400 font-light">/</span>
                        <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-light">{activeLesson.author.role}</span>
                        {activeLesson.author.aid && (
                          <>
                            <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-400 font-light">/</span>
                            <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-light tracking-wider">{activeLesson.author.aid}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[14px] sm:text-[15.5px] font-quote text-slate-400 [html[data-theme='light']_&]:text-slate-500 flex items-center justify-center gap-2.5 text-center">
                      <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-normal">{activeLesson.author.name}</span>
                      <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-400 font-light">/</span>
                      <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-light">{activeLesson.author.role}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic Real-time Translation Spinner Indicator */}
              {translatingContent && (
                <div className="mb-6 p-3 rounded-lg bg-white/[0.04] border border-white/10 text-white [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:text-slate-900 text-xs font-sans flex items-center gap-3">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="animate-pulse">
                    {activeLang === 'en' ? 'Translating lesson in real-time...' : 'Đang chuyển ngữ bài học thời gian thực...'}
                  </span>
                </div>
              )}

              {/* Rendered Markdown Body via Unified ArticleRenderer */}
              <div className="py-2" itemProp="articleBody">
                <ArticleRenderer
                  content={activeContent}
                  activeId={activeLessonId}
                  fontSize={fontSize}
                  isVi={isVi}
                  renderTitle={false}
                  onHeadingClick={(headingId) => {
                    scrollToHeading(headingId);
                    if (typeof window !== 'undefined') {
                      window.history.pushState(null, '', `/explore/${activeLessonId}#${headingId}`);
                    }
                  }}
                />
              </div>

              {/* Bottom Prev / Next Navigation */}
              <div className="pt-8 mt-12 border-t border-white/10 [html[data-theme='light']_&]:border-slate-200/80 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevLesson ? (
                    <button
                      onClick={() => openLessonReader(prevLesson.id)}
                      className="p-4 rounded-lg border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 [html[data-theme='light']_&]:hover:border-slate-300 bg-white/[0.015] [html[data-theme='light']_&]:bg-white hover:bg-white/[0.03] text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 mb-1">
                        <ChevronLeft size={11} />
                        <span>{isVi ? 'Bài trước' : 'Previous'}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-white [html[data-theme='light']_&]:text-slate-900 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors line-clamp-2 leading-snug">
                        {prevLesson.title}
                      </div>
                    </button>
                  ) : <div />}

                  {nextLesson ? (
                    <button
                      onClick={() => openLessonReader(nextLesson.id)}
                      className="p-4 rounded-lg border border-white/10 [html[data-theme='light']_&]:border-slate-200 hover:border-white/20 [html[data-theme='light']_&]:hover:border-slate-300 bg-white/[0.015] [html[data-theme='light']_&]:bg-white hover:bg-white/[0.03] text-right transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-end gap-1 text-[11px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 mb-1">
                        <span>{isVi ? 'Bài tiếp' : 'Next'}</span>
                        <ChevronRight size={11} />
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-white [html[data-theme='light']_&]:text-slate-900 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors line-clamp-2 leading-snug">
                        {nextLesson.title}
                      </div>
                    </button>
                  ) : <div />}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => backToGrid()}
                    className="text-xs font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-600 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {isVi ? '← Trở về danh mục tất cả bài học' : '← Return to all lessons'}
                  </button>
                </div>
              </div>
            </article>

            {/* ── RIGHT RAIL: On This Page Outline (Exact Docs Style & Unified Component) ── */}
            <ReaderSidebarRight
              headings={headings}
              activeHeadingId={activeHeadingId}
              onHeadingClick={(headingId) => scrollToHeading(headingId)}
              isVi={isVi}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default EraExploration;
