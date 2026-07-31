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

export function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  // Detect browser language (default to 'vi' if Vietnamese, otherwise default to 'en')
  const getInitialLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  };

  const [activeLang, setActiveLang] = useState(getInitialLanguage());

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
    <div className="min-h-screen bg-[#0B0B11] text-slate-100 selection:bg-cyan-500 selection:text-black py-8 w-full relative">
      
      {/* Monolithic Seamless Grid Container Frame */}
      <div className="monolithic-frame">
        {/* Top Navbar Row */}
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          activeLang={activeLang} 
          onChangeLang={setActiveLang} 
          onOpenSearch={() => setIsSearchOpen(true)}
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
            <Sponsors />

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

    </div>
  );
}

export default App;
