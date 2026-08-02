import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SubNavTabs } from './components/SubNavTabs';
import { BentoGrid } from './components/BentoGrid';
import { AgentsShowcase } from './components/AgentsShowcase';
import { FoundationGrid } from './components/FoundationGrid';
import { FrameworkFlow } from './components/FrameworkFlow';
import { Testimonials } from './components/Testimonials';
import { UnikornSection } from './components/UnikornSection';
import { I2FLabsSection } from './components/I2FLabsSection';
import { Sponsors } from './components/Sponsors';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Docs } from './components/Docs';
import { About } from './components/About';
import { TrialModal } from './components/TrialModal';
import { SearchModal } from './components/SearchModal';
import { CustomCursor } from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import logoImg from '../assets/logos/AevumOS-transparent.png';
import { translations } from './data/translations';
import { Search, X, Eye, EyeOff, Sun, Atom } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEyeCare, setIsEyeCare] = useState(() => {
    return localStorage.getItem('aevum-eyecare') === 'true';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aevum-theme') || 'dark';
  });

  // Toggle eye-care class on body
  useEffect(() => {
    localStorage.setItem('aevum-eyecare', isEyeCare);
    if (isEyeCare) {
      document.body.classList.add('eye-care-active');
    } else {
      document.body.classList.remove('eye-care-active');
    }
  }, [isEyeCare]);

  // Toggle theme mode attribute on html element
  useEffect(() => {
    localStorage.setItem('aevum-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const LenisClass = window.Lenis;
    if (!LenisClass) return;

    const lenis = new LenisClass({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Initialize Scroll Reveal Animations Hook
  useScrollReveal([currentPage]);

  // Dynamically set favicon using compiled Vite asset
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = logoImg;
    link.type = 'image/png';
  }, []);

  // Language Preference Manager (Default to 'vi')
  const [activeLang, setActiveLang] = useState(() => {
    const saved = localStorage.getItem('aevum-lang');
    return saved === 'en' ? 'en' : 'vi';
  });

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    localStorage.setItem('aevum-lang', lang);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[activeLang] || translations.en;

  // Global shortcut listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background body scroll and pause Lenis engine when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Helper scroll function
  const scrollToTarget = (target, offset = -20) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset, duration: 1.2 });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  // Handle mobile drawer links scrolling
  const handleNavLink = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const scrollToElement = () => {
      const el = document.getElementById(target);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -40, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (currentPage !== 'landing') {
      handleNavigate('landing');
      setTimeout(scrollToElement, 150);
    } else {
      scrollToElement();
    }
  };

  // Full Clean Path & Hash Routing Listener (supports /about, /docs, #breakthroughs, etc.)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (path === 'about' || hash === 'about') {
        setCurrentPage('about');
        scrollToTarget(0);
      } else if (path === 'docs' || hash === 'docs') {
        setCurrentPage('docs');
        scrollToTarget(0);
      } else if (hash && hash !== 'landing' && hash !== 'home') {
        // Landing anchor section (#breakthroughs, #architecture, #orchestration, #cli)
        setCurrentPage('landing');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            scrollToTarget(el, -40);
          }
        }, 100);
      } else {
        setCurrentPage('landing');
      }
    };

    // Initialize on mount
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Handle routing navigation and scroll to top with Clean URL paths
  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'landing') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/${page}`);
    }
    scrollToTarget(0);
  };

  // Dynamic SEO & Meta Tags Manager per Page & Language
  useEffect(() => {
    const isVi = activeLang === 'vi';

    const seoConfig = {
      landing: {
        title: isVi
          ? 'Aevum OS — Hệ điều hành Agent Độc lập & Bộ não Ngoại vi'
          : 'Aevum OS — Standalone Agentic OS & Workspace External Brain',
        description: isVi
          ? 'Aevum OS là Hệ điều hành không gian làm việc độc lập và Bộ não ngoại vi — lưu giữ bộ nhớ hướng tên miền (DDD), biểu đồ bộ nhớ tự phục hồi và điều phối biệt đội đa agent tự trị.'
          : 'Aevum OS is an independent workspace Operating System and External Brain housing domain-driven planning, self-healing memory graphs, and autonomous multi-agent squad orchestration.',
        url: 'https://www.aevum.ai.vn/'
      },
      docs: {
        title: isVi
          ? 'Tài liệu Kỹ thuật & Hướng dẫn sử dụng — Aevum OS'
          : 'Technical Documentation & Guides — Aevum OS',
        description: isVi
          ? 'Khám phá bộ tài liệu kỹ thuật đầy đủ của Aevum OS: Hướng dẫn cài đặt MCP daemon, nghi thức bắt tay, công cụ bộ nhớ DDD, điều phối biệt đội agent và mạng lưới PiperNet.'
          : 'Explore complete Aevum OS technical documentation: MCP daemon setup, handshake ritual, DDD memory tools, autonomous squad orchestration, and PiperNet mesh.',
        url: 'https://www.aevum.ai.vn/docs'
      },
      about: {
        title: isVi
          ? 'Giới thiệu & Câu chuyện Sản phẩm — Aevum OS'
          : 'About & Product Story — Aevum OS',
        description: isVi
          ? 'Hành trình khai sinh Aevum OS từ I2FLabs Việt Nam: Tách rời trí tuệ AI agent khỏi IDE, xây dựng bộ não ngoại vi độc lập giúp khắc phục hội chứng mất trí nhớ ngắn hạn của AI.'
          : 'The story behind Aevum OS by I2FLabs Viet Nam: Decoupling AI agent intelligence from IDEs, building a standalone external brain to conquer AI short-term context amnesia.',
        url: 'https://www.aevum.ai.vn/about'
      }
    };

    const currentSeo = seoConfig[currentPage] || seoConfig.landing;

    // 1. Update Document Title
    document.title = currentSeo.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = currentSeo.description;

    // 3. Update OpenGraph (OG) Title
    let ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.content = currentSeo.title;

    // 4. Update OpenGraph (OG) Description
    let ogDesc = document.querySelector("meta[property='og:description']");
    if (ogDesc) ogDesc.content = currentSeo.description;

    // 5. Update OpenGraph (OG) URL
    let ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) ogUrl.content = currentSeo.url;

    // 6. Update Twitter Title & Description
    let twTitle = document.querySelector("meta[name='twitter:title']");
    if (twTitle) twTitle.content = currentSeo.title;

    let twDesc = document.querySelector("meta[name='twitter:description']");
    if (twDesc) twDesc.content = currentSeo.description;

    // 7. Update HTML lang attribute
    document.documentElement.lang = activeLang;

  }, [currentPage, activeLang]);

  return (
    <>
      <div className={`min-h-screen bg-[#07080c] text-slate-100 selection:bg-cyan-500 selection:text-black w-full relative overflow-x-clip perspective-container ${
        isMobileMenuOpen ? 'mobile-menu-active' : ''
      }`}>
      
      {/* Page Content Wrapper (shrinks and pushes in 3D) */}
      <div className="app-content-wrapper">
        <div className="py-0 sm:py-8 w-full">
          {/* Monolithic Seamless Grid Container Frame */}
          <div className="monolithic-frame">
        {/* Top Navbar Row */}
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          activeLang={activeLang} 
          onChangeLang={handleLanguageChange} 
          onOpenSearch={() => setIsSearchOpen(true)}
          isEyeCare={isEyeCare}
          onToggleEyeCare={() => setIsEyeCare(prev => !prev)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        />

        {currentPage === 'landing' && (
          <>
            {/* Hero 2-Column Grid Row */}
            <Hero 
              onNavigate={handleNavigate} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)}
              activeLang={activeLang} 
            />

            {/* Sub Nav Category Tabs Row */}
            <SubNavTabs activeLang={activeLang} />

            {/* Section 1: Bento Grid Feature Showcase Row */}
            <BentoGrid activeLang={activeLang} />

            {/* Dedicated Default Aevum AI Agents Squad Showcase Section */}
            <AgentsShowcase 
              activeLang={activeLang} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)} 
            />

            {/* Section 2: Architecture & Foundation Grid Row */}
            <FoundationGrid activeLang={activeLang} />

            {/* Section 3: Framework Integration Flow */}
            <FrameworkFlow activeLang={activeLang} />

            {/* Section 4: Testimonials & Community Stats */}
            <Testimonials activeLang={activeLang} />

            {/* Section 5: Dedicated Unikorn Vietnam Feature Section */}
            <UnikornSection activeLang={activeLang} />

            {/* Section 6: Dedicated I2FLabs Development Team Section */}
            <I2FLabsSection activeLang={activeLang} />

            {/* Section 7: Open Source Sponsors */}
            <Sponsors activeLang={activeLang} />

            {/* Section 8: CTA Banner */}
            <CtaBanner 
              onNavigate={handleNavigate} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)}
              activeLang={activeLang} 
            />
          </>
        )}

        {currentPage === 'docs' && (
          <Docs activeLang={activeLang} />
        )}

        {currentPage === 'about' && (
          <About activeLang={activeLang} />
        )}

        {/* Footer */}
        <Footer onNavigate={handleNavigate} activeLang={activeLang} />
          </div>
        </div>
      </div>
    </div>

    {/* Click-to-close overlay on content */}
    {isMobileMenuOpen && (
      <div 
        className="fixed inset-0 z-40 lg:hidden cursor-pointer bg-transparent"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )}

    {/* 3D Slide-in Mobile Drawer (Fixed to Viewport 100vh) */}
    <div className={`mobile-drawer lg:hidden bg-[#07080c] ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Fixed Top Header for Logo & Search Bar */}
        <div className="shrink-0 bg-[#07080c] pt-4 pb-3 px-4 space-y-3 z-10">
          {/* Top Row: Logo Aevum OS */}
          <div className="flex items-center justify-end">
            {/* Logo Aevum OS */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); handleNavigate('landing'); }}
              className="flex items-center gap-2 text-decoration-none group shrink-0"
            >
              <img 
                src={logoImg} 
                alt="Aevum OS Logo" 
                className="w-6 h-6 object-contain" 
              />
              <span className="font-extrabold text-sm text-white tracking-wider font-display whitespace-nowrap">
                AEVUM OS
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div 
            onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
            className="flex items-center bg-white/[0.03] border border-white/10 rounded-md px-3.5 py-2.5 text-xs text-slate-300 font-mono gap-2 hover:border-white/15 transition-all cursor-pointer"
          >
            <Search size={14} className="text-slate-400 shrink-0" />
            <span className="flex-1 text-left text-slate-400">{t.navbar.searchPlaceholder}</span>
          </div>
        </div>

        {/* Scrollable Drawer Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6" data-lenis-prevent>
          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 drawer-nav-list">
            <a 
              href="#breakthroughs" 
              onClick={(e) => handleNavLink(e, 'breakthroughs')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.breakthroughs}
            </a>
            <a 
              href="#architecture" 
              onClick={(e) => handleNavLink(e, 'architecture')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.architecture}
            </a>
            <a 
              href="#orchestration" 
              onClick={(e) => handleNavLink(e, 'orchestration')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.orchestration}
            </a>
            <a 
              href="#cli" 
              onClick={(e) => handleNavLink(e, 'cli')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.kernel}
            </a>

            {/* Standalone Pages UI Block (DOCUMENTATION & ABOUT) */}
            <div className="flex flex-col space-y-4 mt-5">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('docs'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${
                  currentPage === 'docs' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                }`}
              >
                {t.navbar.docs}
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('about'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${
                  currentPage === 'about' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                }`}
              >
                {t.navbar.about}
              </button>
            </div>

            {/* Bottom Controls Row: Close Button, Theme Switcher & Language Switcher */}
            <div className="flex justify-between items-center text-xs font-mono pt-4 mt-2 border-t border-white/10">
              {/* Close Button at the end */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors font-bold uppercase py-1 px-2.5 rounded-md hover:bg-white/5 border border-white/10 text-xs cursor-pointer"
              >
                <X size={14} className="shrink-0 text-slate-400" />
                <span>{activeLang === 'vi' ? 'Đóng' : 'Close'}</span>
              </button>

              <div className="flex items-center gap-3">
                {/* Theme Mode Toggle Button (Icon-Only GPU-Accelerated Smooth Transition) */}
                <button
                  onClick={handleToggleTheme}
                  className="theme-toggle-btn"
                  title={theme === 'dark' ? "Light Mode" : "Dark Mode"}
                  aria-label="Toggle Theme Mode"
                >
                  <div className="theme-icon-wrapper">
                    <Sun size={18} className="theme-icon theme-icon-sun" />
                    <Atom size={18} className="theme-icon theme-icon-electron" />
                  </div>
                </button>

                {/* Language Switcher */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <button 
                    onClick={() => { setActiveLang('vi'); setIsMobileMenuOpen(false); }}
                    className={`transition-colors font-bold ${activeLang === 'vi' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    VI
                  </button>
                  <span className="text-white/10 text-[10px]">/</span>
                  <button 
                    onClick={() => { setActiveLang('en'); setIsMobileMenuOpen(false); }}
                    className={`transition-colors font-bold ${activeLang === 'en' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Early Access Trial Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        activeLang={activeLang}
      />

      {/* Interactive Command Palette Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        activeLang={activeLang}
      />

      {/* Floating Fixed Scroll To Top Button */}
      <ScrollToTop />

      {/* Futuristic Glowing Custom Cursor & Follower Ring */}
      <CustomCursor />

      {/* Eye Care Mode Screen Overlay (Warm light filter) */}
      <div className={`eye-care-overlay ${isEyeCare ? 'active' : ''}`} />

    </>
  );
}

export default App;
