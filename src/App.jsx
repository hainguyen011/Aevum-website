import { useEffect, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
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
import { Changelog } from './components/Changelog';
import { Discussions } from './components/Discussions';
import { Pricing } from './components/Pricing';
import { Profile } from './components/Profile';
import { AuthLockGate } from './components/ui/AuthLockGate';
import { TrialModal } from './components/TrialModal';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';

import { SearchModal } from './components/SearchModal';
import { CustomCursor } from './components/CustomCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSEO } from './hooks/useSEO';
import logoImg from '../assets/logos/AevumOS-transparent.png';
import { translations } from './data/translations';
import { Search, X, Eye, ScanEye, Sun, Atom, User, Globe, Sparkles } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { DesktopAuthSuccessModal } from './components/DesktopAuthSuccessModal';
import { supabase } from './services/supabaseClient';
import { DiscussionService } from './services/DiscussionService';

export function App({ initialPage = null, initialLang = 'vi' }) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (initialPage) return initialPage;
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
      if (['pricing', 'docs', 'about', 'changelog', 'discussions', 'privacy', 'terms'].includes(path)) {
        return path;
      }
    }
    return 'landing';
  });
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [pendingOpenTrial, setPendingOpenTrial] = useState(false);
  const [pendingRedirectPage, setPendingRedirectPage] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isEyeCare, setIsEyeCare] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('aevum-eyecare') === 'true';
    }
    return false;
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('aevum-theme') || 'dark';
    }
    return 'dark';
  });

  const handleOpenTrialModal = () => {
    if (!user) {
      setPendingOpenTrial(true);
      setIsAuthModalOpen(true);
    } else {
      setIsTrialModalOpen(true);
    }
  };

  useEffect(() => {
    if (user && pendingOpenTrial) {
      setPendingOpenTrial(false);
      setIsTrialModalOpen(true);
    }
    if (user && pendingRedirectPage) {
      const target = pendingRedirectPage;
      setPendingRedirectPage(null);
      handleNavigate(target);
    }
  }, [user, pendingOpenTrial, pendingRedirectPage]);


  // State for Desktop Handoff Banner
  const [desktopAuthConnected, setDesktopAuthConnected] = useState(false);

  // Helper to extract query parameters from regular search, hash route, or full href
  const getQueryParam = (name) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get(name)) return searchParams.get(name);

      if (window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.substring(window.location.hash.indexOf('?'));
        const hashParams = new URLSearchParams(hashQuery);
        if (hashParams.get(name)) return hashParams.get(name);
      }

      const match = window.location.href.match(new RegExp(`[?&]${name}=([^&#]*)`));
      return match ? decodeURIComponent(match[1]) : null;
    } catch (e) {
      return null;
    }
  };

  // Dedicated Desktop Broadcast function with multiple heartbeat retries
  const broadcastDesktopSession = useCallback(async (forcedNonce) => {
    const isDesktopIntent = getQueryParam('auth') === 'desktop' || Boolean(getQueryParam('nonce')) || Boolean(sessionStorage.getItem('aevum_desktop_nonce'));
    const effectiveNonce = forcedNonce || getQueryParam('nonce') || sessionStorage.getItem('aevum_desktop_nonce');

    // Chỉ kích hoạt và hiển thị thông báo kết nối nếu đăng nhập bắt nguồn từ Aevum OS
    if (!isDesktopIntent || !effectiveNonce) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) return;

      console.log('[Desktop Handoff] Broadcasting token to channel:', `auth-handoff:${effectiveNonce}`);
      const channel = supabase.channel(`auth-handoff:${effectiveNonce}`);

      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          const sendSession = () => {
            channel.send({
              type: 'broadcast',
              event: 'session',
              payload: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                user: session.user,
              },
            });
          };

          // Send immediately and repeat once after 500ms
          sendSession();
          setTimeout(sendSession, 500);

          setDesktopAuthConnected(true);
          setIsAuthModalOpen(false);

          // Xóa nonce khỏi sessionStorage sau khi đã phát thành công
          sessionStorage.removeItem('aevum_desktop_nonce');

          setTimeout(() => {
            channel.unsubscribe();
          }, 4000);
        }
      });
    } catch (err) {
      console.error('[Desktop Handoff] Broadcast failed:', err);
    }
  }, []);

  // Handle ?auth=signin, ?auth=login, or ?auth=desktop parameter to automatically open AuthModal
  useEffect(() => {
    const authType = getQueryParam('auth');
    const urlNonce = getQueryParam('nonce');

    if (urlNonce) {
      sessionStorage.setItem('aevum_desktop_nonce', urlNonce);
    }

    if (authType === 'signin' || authType === 'login' || authType === 'desktop' || getQueryParam('openAuth') === 'true') {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session?.user) {
          setIsAuthModalOpen(true);
        } else {
          broadcastDesktopSession(urlNonce);
        }
      });
    }
  }, [broadcastDesktopSession]);

  // If user state updates and desktop nonce exists, broadcast session
  useEffect(() => {
    const effectiveNonce = getQueryParam('nonce') || sessionStorage.getItem('aevum_desktop_nonce');
    if (effectiveNonce && user) {
      broadcastDesktopSession(effectiveNonce);
    }
  }, [user, broadcastDesktopSession]);

  // Supabase Auth session listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        broadcastDesktopSession();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
        broadcastDesktopSession();
      }
    });

    return () => subscription.unsubscribe();
  }, [broadcastDesktopSession]);

  // Fetch user profile (role, full_name) when session updates
  useEffect(() => {
    if (user?.id) {
      DiscussionService.getUserProfile(user.id).then(profile => {
        setUserProfile(profile);
      });
    } else {
      setUserProfile(null);
    }
  }, [user?.id]);

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

  const handleToggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Fallback if browser doesn't support View Transitions API
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e?.clientX ?? (window.innerWidth - 60);
    const y = e?.clientY ?? (window.innerHeight / 2);
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 800,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
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
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('aevum-lang');
      return saved === 'en' ? 'en' : 'vi';
    }
    return initialLang;
  });

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    localStorage.setItem('aevum-lang', lang);
  };

  // Dynamic SEO & Generative Engine Optimization (GEO) Head Manager
  useSEO(currentPage, activeLang);

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
  const scrollToTarget = (target, offset = -80) => {
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
          window.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
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

  // Full Clean Path & Hash Routing Listener (supports /about, /docs, /changelog, #breakthroughs, etc.)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();

      if (path === 'about' || hash === 'about') {
        setCurrentPage('about');
        scrollToTarget(0);
      } else if (path === 'pricing' || hash === 'pricing') {
        setCurrentPage('pricing');
        scrollToTarget(0);
      } else if (path === 'docs' || hash === 'docs') {
        setCurrentPage('docs');
        scrollToTarget(0);
      } else if (path === 'changelog' || hash === 'changelog') {
        setCurrentPage('changelog');
        scrollToTarget(0);
      } else if (path === 'discussions' || hash === 'discussions') {
        setCurrentPage('discussions');
        scrollToTarget(0);
      } else if (path === 'privacy' || hash === 'privacy') {
        setCurrentPage('privacy');
        scrollToTarget(0);
      } else if (path === 'terms' || hash === 'terms') {
        setCurrentPage('terms');
        scrollToTarget(0);
      } else if (hash && hash !== 'landing' && hash !== 'home') {
        // Landing anchor section (#breakthroughs, #architecture, #orchestration, #cli)
        setCurrentPage('landing');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            scrollToTarget(el, -80);
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
    const protectedPages = ['docs', 'changelog', 'discussions', 'profile'];
    if (protectedPages.includes(page) && !user) {
      setPendingRedirectPage(page);
      setIsAuthModalOpen(true);
      return;
    }

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
      pricing: {
        title: isVi
          ? 'Bảng Giá & Gói Phân Hạng Thành Viên — Aevum OS'
          : 'Transparent Pricing & Membership Tiers — Aevum OS',
        description: isVi
          ? 'Bảng giá chính thức Aevum OS: Gói Community miễn phí vĩnh viễn Local-First và gói Pro siêu việt tặng 14 ngày trải nghiệm Biệt đội Đa Agent & Đồng bộ Ký ức Đám mây.'
          : 'Official pricing for Aevum OS: Free forever Local-First Community tier and supercharged Pro tier with 14-Day Free Beta Trial for Autonomous Multi-Agent Squads.',
        url: 'https://www.aevum.ai.vn/pricing'
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
      },
      changelog: {
        title: isVi
          ? 'Nhật ký Cập nhật & Các bản phát hành — Aevum OS'
          : 'Changelog & Product Releases — Aevum OS',
        description: isVi
          ? 'Xem lịch sử cập nhật của Aevum OS: Các tính năng mới, cải tiến hiệu năng và bản sửa lỗi của biệt đội AI agent từ I2FLabs.'
          : 'View the changelog and update history of Aevum OS: New features, performance enhancements, and bug fixes from the I2FLabs team.',
        url: 'https://www.aevum.ai.vn/changelog'
      },
      privacy: {
        title: isVi ? 'Chính sách Bảo mật — Aevum OS' : 'Privacy Policy — Aevum OS',
        description: isVi
          ? 'Chính sách Bảo mật của I2FLabs và Aevum OS: Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn.'
          : 'Privacy Policy of I2FLabs and Aevum OS: How we collect, use, and protect your personal data.',
        url: 'https://www.aevum.ai.vn/privacy'
      },
      terms: {
        title: isVi ? 'Điều khoản Dịch vụ — Aevum OS' : 'Terms of Service — Aevum OS',
        description: isVi
          ? 'Điều khoản Dịch vụ của I2FLabs và Aevum OS: Quyền, nghĩa vụ và chính sách sử dụng dịch vụ.'
          : 'Terms of Service of I2FLabs and Aevum OS: Rights, obligations, and service usage policies.',
        url: 'https://www.aevum.ai.vn/terms'
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
      <div className={`min-h-screen bg-[#07080c] text-slate-100 selection:bg-cyan-500 selection:text-black w-full relative overflow-x-clip perspective-container ${isMobileMenuOpen ? 'mobile-menu-active' : ''
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
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
                user={user}
                userProfile={userProfile}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />

              {currentPage === 'landing' && (
                <>
                  {/* Hero 2-Column Grid Row */}
                  <Hero
                    onNavigate={handleNavigate}
                    onOpenTrialModal={handleOpenTrialModal}
                    activeLang={activeLang}
                  />

                  {/* Sub Nav Category Tabs Row */}
                  <SubNavTabs activeLang={activeLang} />

                  {/* Section 1: Bento Grid Feature Showcase Row */}
                  <BentoGrid activeLang={activeLang} />

                  {/* Dedicated Default Aevum AI Agents Squad Showcase Section */}
                  <AgentsShowcase
                    activeLang={activeLang}
                    onOpenTrialModal={handleOpenTrialModal}
                  />

                  {/* Section 2: Architecture & Foundation Grid Row */}
                  <FoundationGrid activeLang={activeLang} />

                  {/* Section 3: Framework Integration Flow */}
                  <FrameworkFlow activeLang={activeLang} />

                  {/* Section 4: Transparent Pricing & Membership Tiers */}
                  <Pricing
                    activeLang={activeLang}
                    onOpenTrialModal={handleOpenTrialModal}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    showDetails={false}
                    onNavigate={handleNavigate}
                  />

                  {/* Section 5: Testimonials & Community Stats */}
                  <Testimonials activeLang={activeLang} />

                  {/* Section 6: Dedicated Unikorn Vietnam Feature Section */}
                  <UnikornSection activeLang={activeLang} />

                  {/* Section 7: Dedicated I2FLabs Development Team Section */}
                  <I2FLabsSection activeLang={activeLang} />

                  {/* Section 8: Open Source Sponsors */}
                  <Sponsors activeLang={activeLang} />

                  {/* Section 9: CTA Banner */}
                  <CtaBanner
                    onNavigate={handleNavigate}
                    onOpenTrialModal={handleOpenTrialModal}
                    activeLang={activeLang}
                  />
                </>
              )}

              {currentPage === 'pricing' && (
                <Pricing
                  activeLang={activeLang}
                  onOpenTrialModal={handleOpenTrialModal}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  showDetails={true}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'docs' && (
                user ? (
                  <Docs activeLang={activeLang} />
                ) : (
                  <AuthLockGate
                    activeLang={activeLang}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    onNavigate={handleNavigate}
                    pageName={activeLang === 'vi' ? 'Tài liệu Kỹ thuật (Docs)' : 'Documentation'}
                  />
                )
              )}

              {currentPage === 'about' && (
                <About activeLang={activeLang} />
              )}

              {currentPage === 'changelog' && (
                user ? (
                  <Changelog activeLang={activeLang} onNavigate={handleNavigate} />
                ) : (
                  <AuthLockGate
                    activeLang={activeLang}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    onNavigate={handleNavigate}
                    pageName={activeLang === 'vi' ? 'Nhật ký Cập nhật (Changelog)' : 'Changelog'}
                  />
                )
              )}

              {currentPage === 'discussions' && (
                user ? (
                  <Discussions
                    activeLang={activeLang}
                    user={user}
                    userProfile={userProfile}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  />
                ) : (
                  <AuthLockGate
                    activeLang={activeLang}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                    onNavigate={handleNavigate}
                    pageName={activeLang === 'vi' ? 'Kênh Thảo luận (Discussions)' : 'Discussions'}
                  />
                )
              )}

              {currentPage === 'privacy' && (
                <Privacy activeLang={activeLang} />
              )}

              {currentPage === 'terms' && (
                <Terms activeLang={activeLang} />
              )}


              {currentPage === 'profile' && (
                <Profile
                  activeLang={activeLang}
                  user={user}
                  userProfile={userProfile}
                  onNavigate={handleNavigate}
                  onOpenTrialModal={handleOpenTrialModal}
                />
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
              href="#cli"
              onClick={(e) => handleNavLink(e, 'cli')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.kernel}
            </a>
            <a
              href="#breakthroughs"
              onClick={(e) => handleNavLink(e, 'breakthroughs')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.breakthroughs}
            </a>
            <a
              href="#agents"
              onClick={(e) => handleNavLink(e, 'agents')}
              className="text-right text-lg font-bold text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-wide"
            >
              {t.navbar.agents}
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

            {/* Standalone Pages UI Block (PRICING, DOCUMENTATION, ABOUT, CHANGELOG, DISCUSSIONS) */}
            <div className="flex flex-col space-y-4 mt-5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('pricing'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${currentPage === 'pricing' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                  }`}
              >
                {t.navbar.pricing}
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('docs'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${currentPage === 'docs' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                  }`}
              >
                {t.navbar.docs}
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('about'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${currentPage === 'about' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                  }`}
              >
                {t.navbar.about}
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('changelog'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${currentPage === 'changelog' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                  }`}
              >
                {activeLang === 'vi' ? 'Nhật ký cập nhật' : 'Changelog'}
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleNavigate('discussions'); }}
                className={`text-right text-lg font-bold transition-colors uppercase tracking-wide ${currentPage === 'discussions' ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-400'
                  }`}
              >
                {activeLang === 'vi' ? 'Thảo luận' : 'Discussions'}
              </button>

              <div className="h-px bg-white/5 my-2"></div>

              {user ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                  className="text-right text-lg font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wide flex items-center justify-end gap-2"
                >
                  <User size={16} className="text-cyan-400 animate-pulse" />
                  <span className="max-w-[120px] truncate">{user.email.split('@')[0]}</span>
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                  className="text-right text-lg font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wide flex items-center justify-end gap-2"
                >
                  <User size={16} className="text-slate-400" />
                  <span>{activeLang === 'vi' ? 'Đăng nhập' : 'Sign In'}</span>
                </button>
              )}
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
                  onClick={(e) => handleToggleTheme(e)}
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
        user={user}
      />

      {/* Desktop Auth Handoff Success Modal */}
      <DesktopAuthSuccessModal
        isOpen={desktopAuthConnected}
        onClose={() => setDesktopAuthConnected(false)}
        activeLang={activeLang}
        user={user}
        userProfile={userProfile}
      />

      {/* Supabase User Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeLang={activeLang}
        user={user}
        userProfile={userProfile}
      />

      {/* Interactive Command Palette Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        activeLang={activeLang}
      />

      {/* Floating Cyber HUD Utility Toolbar (Fixed to Viewport - Shifted Right of Content Edge) */}
      <div className="fixed right-[calc(6vw-50px)] top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center bg-transparent p-0 w-[42px] transition-all duration-300 group rounded-none">

        {/* Language Switcher Toggle (Placed above Eye Care Toggle) */}
        <button
          onClick={() => handleLanguageChange(activeLang === 'vi' ? 'en' : 'vi')}
          className="utility-bar-btn flex items-center justify-center w-[42px] h-[42px] transition-all duration-200 cursor-pointer rounded-none border-0 select-none text-slate-300 hover:text-cyan-400 font-mono"
          title={activeLang === 'vi' ? "Chuyển sang Tiếng Anh (EN)" : "Switch to Vietnamese (VI)"}
          aria-label="Toggle Language"
        >
          <span className="text-xs font-extrabold uppercase tracking-wider">{activeLang === 'vi' ? 'VI' : 'EN'}</span>
        </button>

        {/* Eye Care Toggle */}
        <button
          onClick={() => setIsEyeCare(prev => !prev)}
          className={`utility-bar-btn flex items-center justify-center w-[42px] h-[42px] transition-all duration-200 cursor-pointer rounded-none border-0 select-none ${isEyeCare
            ? '!bg-amber-500/10 !text-amber-500 hover:!bg-amber-500/20'
            : ''
            }`}
          title={activeLang === 'vi' ? "Bật/Tắt bảo vệ mắt" : "Toggle Eye Care"}
        >
          {isEyeCare ? <ScanEye size={18} className="text-amber-400" /> : <Eye size={18} />}
        </button>


        {/* Theme Toggle */}
        <button
          onClick={(e) => handleToggleTheme(e)}
          className="utility-bar-btn flex items-center justify-center w-[42px] h-[42px] border-0 transition-all duration-200 cursor-pointer rounded-none active:scale-[0.92] select-none"
          title={
            activeLang === 'vi'
              ? (theme === 'dark' ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối")
              : (theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode")
          }
          aria-label="Toggle Theme Mode"
        >
          <div className="theme-icon-wrapper">
            <Sun size={18} className="theme-icon theme-icon-sun" />
            <Atom size={18} className="theme-icon theme-icon-electron" />
          </div>
        </button>
      </div>

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
