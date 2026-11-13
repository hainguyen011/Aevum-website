import React, { useState, useEffect, useRef } from 'react';
import { Search, Facebook, ChevronDown, Globe, Eye, EyeOff, Sun, Atom, Menu, X, Sparkles, Layers, Network, Terminal, ArrowRight, Mail, User, LogOut, Zap } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.webp';
import unikornLogo from '../../assets/unikorn-logo.webp';
import unikornLogoDark from '../../assets/unikorn-logo-dark.webp';
import { translations } from '../data/translations';
import { MembershipBadge } from './ui/MembershipBadge';
import { AnnouncementBanner } from './AnnouncementBanner';
import { prefetchPage } from '../utils/prefetch';

export const Navbar = ({
  currentPage,
  onNavigate,
  activeLang,
  onChangeLang,
  onOpenSearch,
  isMobileMenuOpen,
  onToggleMobileMenu,
  user,
  userProfile,
  onOpenAuthModal,
  theme,
  onToggleTheme
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'features' | 'resources' | 'profile' | null
  const featuresOpen = activeDropdown === 'features';
  const resourcesOpen = activeDropdown === 'resources';
  const profileOpen = activeDropdown === 'profile';

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };
  const closeDropdown = () => setActiveDropdown(null);

  const [activeSection, setActiveSection] = useState(null);
  const [entitlements, setEntitlements] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const featuresRef = useRef(null);
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollY = Math.max(0, window.pageYOffset ?? window.scrollY ?? document.documentElement.scrollTop ?? 0);

      // Hysteresis deadband: prevents jitter/flutter when scrolling near top
      if (isScrolledRef.current) {
        // Currently scrolled: only reveal banner when user reaches the very top (<= 12px)
        if (scrollY <= 12) {
          isScrolledRef.current = false;
          setIsScrolled(false);
        }
      } else {
        // Currently at top: only hide banner when user scrolls down past 60px
        if (scrollY > 60) {
          isScrolledRef.current = true;
          setIsScrolled(true);
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      Promise.all([
        import('../services/supabaseClient'),
        import('../services/MembershipService')
      ]).then(([{ supabase }, { MembershipService }]) => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          MembershipService.getCurrentEntitlements(session?.access_token, user.id).then(data => {
            if (data) setEntitlements(data);
          });
        });
      });
    } else {
      setEntitlements(null);
    }
  }, [user]);


  // Dynamic Scroll Spy using high-performance IntersectionObserver (No layout thrashing / scroll lag)
  useEffect(() => {
    if (currentPage !== 'landing') {
      setActiveSection(null);
      return;
    }

    const sections = ['mission', 'value-props', 'co-evolution', 'workflow', 'metrics', 'ioa-roadmap', 'faq'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px', // Detect current section inside center screen viewport window
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Reset active indicator to home when scroll position is near the absolute top
    const handleScrollTop = () => {
      if (window.scrollY < 200) {
        setActiveSection(null);
      }
    };
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [currentPage]);

  // Get active section label or default fallback
  const getButtonLabel = () => {
    return isVi ? 'Tổng quan' : 'Overview';
  };

  // Handle click outside to close features, resources & profile Cyber HUD menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleNavLink = (e, target) => {
    e.preventDefault();
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
      onNavigate('landing');
      setTimeout(scrollToElement, 150);
    } else {
      scrollToElement();
    }
  };

  const isLanding = currentPage === 'landing';
  const isAtTopLanding = isLanding && !isScrolled && !isMobileMenuOpen;

  const headerBgClass = isAtTopLanding
    ? (Boolean(activeDropdown)
      ? 'bg-black/20 [html[data-theme="light"]_&]:bg-white/95 backdrop-blur-md border-b border-white/10 [html[data-theme="light"]_&]:border-slate-200/80'
      : 'bg-transparent [html[data-theme="light"]_&]:bg-white/95 border-b border-transparent [html[data-theme="light"]_&]:border-slate-200/80 backdrop-blur-none [html[data-theme="light"]_&]:backdrop-blur-md')
    : 'bg-[#07090D]/85 [html[data-theme="light"]_&]:bg-white/95 backdrop-blur-md border-b border-white/10 [html[data-theme="light"]_&]:border-slate-200/80';

  const dropdownBgClass = isAtTopLanding
    ? 'bg-black/40 [html[data-theme="light"]_&]:bg-white/95 backdrop-blur-xl border-b border-white/10 [html[data-theme="light"]_&]:border-slate-200 text-white [html[data-theme="light"]_&]:text-slate-800'
    : 'bg-[#07090D]/95 [html[data-theme="light"]_&]:bg-white/95 backdrop-blur-xl border-b border-white/10 [html[data-theme="light"]_&]:border-slate-200 text-white [html[data-theme="light"]_&]:text-slate-800';

  const isNavbarScrolled = !isAtTopLanding || Boolean(activeDropdown);

  return (
    <div
      ref={featuresRef}
      className={`navbar-root ${isNavbarScrolled ? 'navbar-scrolled' : 'navbar-transparent'} relative w-full !sticky top-0 z-40 flex flex-col transition-all duration-300 ${headerBgClass}`}
      style={{ position: 'sticky', top: 0, zIndex: 40 }}
    >

      {/* Top Accent Marquee Announcement Banner */}
      <AnnouncementBanner onNavigate={onNavigate} activeLang={activeLang} isScrolled={isScrolled} />

      {/* Main Navbar Top Row - Clean Edge-to-Edge Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left Cell: Logo + Main Navigation */}
        <div className="flex items-center gap-6 xl:gap-8 min-w-0">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}
            className="flex items-center gap-2.5 text-decoration-none group shrink-0"
          >
            <img
              src={logoImg}
              alt="Aevum OS Logo"
              className="w-7 h-7 object-contain [html[data-theme='light']_&]:brightness-0 transition-[filter] duration-200"
            />
            <span className="font-semibold text-lg text-white [html[data-theme='light']_&]:text-slate-900 tracking-wide font-sans whitespace-nowrap">
              AEVUM OS
            </span>
          </a>

          {/* Desktop Nav Links - Clean Monochrome, Concise & Punchy */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs sm:text-[13px] font-normal whitespace-nowrap shrink-0">

            {/* Desktop Features & Architecture Toggle Button */}
            {(() => {
              const isButtonActive = featuresOpen || Boolean(activeSection) || currentPage === 'home';
              return (
                <button
                  onClick={() => toggleDropdown('features')}
                  className={`flex items-center gap-1.5 text-xs sm:text-[13px] py-1 px-2.5 rounded-md transition-colors cursor-pointer ${isButtonActive
                    ? 'text-white [html[data-theme="light"]_&]:text-slate-900 bg-white/10 [html[data-theme="light"]_&]:bg-slate-200'
                    : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                    }`}
                >
                  <span className="font-normal text-inherit">{getButtonLabel()}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
              );
            })()}

            {/* Pricing Link */}
            <button
              data-nav="pricing"
              onClick={() => { onNavigate('pricing'); closeDropdown(); }}
              onMouseEnter={() => prefetchPage('pricing')}
              className={`transition-colors font-normal whitespace-nowrap cursor-pointer ${currentPage === 'pricing' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-medium' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
            >
              {t.navbar.pricing}
            </button>

            {/* About Link */}
            <button
              data-nav="about"
              onClick={() => { onNavigate('about'); closeDropdown(); }}
              onMouseEnter={() => prefetchPage('about')}
              className={`transition-colors font-normal whitespace-nowrap cursor-pointer ${currentPage === 'about' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-medium' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
            >
              {t.navbar.about}
            </button>

            {/* Resources Dropdown - Concise "Tài liệu" */}
            <button
              onClick={() => toggleDropdown('resources')}
              className={`flex items-center gap-1.5 transition-colors font-normal whitespace-nowrap cursor-pointer ${resourcesOpen || ['docs', 'changelog', 'discussions', 'explore'].includes(currentPage)
                ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-medium'
                : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
            >
              <span>{isVi ? 'Tài liệu' : 'Docs'}</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

          </nav>
        </div>

        {/* Right Cell: Search + Language + Theme + Sign In + Try Aevum Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Sleek Adaptive Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 hover:bg-white/[0.08] [html[data-theme='light']_&]:hover:bg-slate-200 border border-white/10 [html[data-theme='light']_&]:border-slate-300 px-2.5 py-1.5 rounded-md text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 cursor-pointer transition-colors"
            title={isVi ? 'Tìm kiếm (Ctrl+K)' : 'Search (Ctrl+K)'}
          >
            <Search size={13} />
            <span className="hidden xl:inline text-xs font-sans">
              {isVi ? 'Tìm kiếm...' : 'Search...'}
            </span>
            <kbd className="hidden xl:inline-block text-[10px] font-mono bg-white/5 px-1 py-0.5 rounded text-slate-400 border border-white/10">
              Ctrl K
            </kbd>
          </button>

          {/* Clean Language Switcher (VI / EN) */}
          <button
            onClick={() => onChangeLang(activeLang === 'vi' ? 'en' : 'vi')}
            className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer"
            title={activeLang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            {activeLang === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1.5 text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              <Sun size={15} />
            </button>
          )}

          {/* Supabase User Authentication Button */}
          {user ? (() => {
            const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
            const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
            const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const effectiveTier = (userProfile?.membership_tier || entitlements?.tier || (entitlements?.isPro ? 'PRO' : 'COMMUNITY')).toUpperCase();
            const tierSlug = effectiveTier.toLowerCase();

            const isWaitlist = entitlements?.isWaitlist || entitlements?.status === 'beta_waitlist';
            const tierLabel = effectiveTier === 'ENTERPRISE'
              ? 'Enterprise'
              : (effectiveTier === 'PRO' || entitlements?.isPro)
                ? (isWaitlist ? 'Waitlist (1M)' : (entitlements?.isTrial ? 'Pro Beta' : 'Pro'))
                : 'Community';

            const tierTextGradient = tierSlug === 'enterprise'
              ? 'text-purple-300'
              : tierSlug === 'pro'
                ? 'text-slate-300'
                : 'text-slate-400';

            return (
              <button
                onClick={() => toggleDropdown('profile')}
                className={`flex items-center self-stretch gap-2.5 text-xs font-mono text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 px-3 sm:px-4 border-l border-r ${isNavbarScrolled
                  ? 'border-white/10 [html[data-theme=\'light\']_&]:border-slate-200'
                  : 'border-transparent'
                  } bg-transparent hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-100/60 transition-colors cursor-pointer group rounded-none`}
                title={isVi ? "Xem tài khoản Aevum" : "View Aevum profile"}
              >
                {/* Clean Soft Rounded Avatar */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] overflow-hidden flex items-center justify-center shrink-0 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-xs font-mono font-bold">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name & Transparent Member Tier Beneath */}
                <div className="flex flex-col items-start justify-center leading-none text-left max-w-[110px]">
                  <span className="font-bold uppercase tracking-wider truncate text-white [html[data-theme='light']_&]:text-slate-900 text-xs">
                    {displayName.split(' ')[0]}
                  </span>
                  <span className={`text-[8.5px] font-mono font-semibold uppercase tracking-wider pt-0.5 ${tierTextGradient}`}>
                    {tierLabel}
                  </span>
                </div>

                <ChevronDown size={11} className={`text-white [html[data-theme='light']_&]:text-slate-600 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
            );
          })() : (

            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 px-3 py-1.5 rounded-md hover:bg-white/5 [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors cursor-pointer"
              title={isVi ? "Đăng nhập tài khoản" : "Sign in to Aevum account"}
            >
              <User size={13} className="text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
              <span className="font-medium uppercase tracking-wider text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950">
                {isVi ? 'ĐĂNG NHẬP' : 'SIGN IN'}
              </span>
            </button>
          )}

          {/* CoralOS Signature "Download" Header Pill */}
          <div className="hidden sm:flex items-center pl-1">
            <button
              onClick={() => onNavigate('changelog')}
              className="px-4 py-1.5 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:hover:bg-black [html[data-theme='light']_&]:text-white font-semibold text-xs transition-colors cursor-pointer select-none"
            >
              {isVi ? 'Tải xuống' : 'Download'}
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="lg:hidden flex items-center justify-center pl-1">
            <button
              onClick={onToggleMobileMenu}
              className="flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-950 bg-white/5 hover:bg-white/10 [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200/80 border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? <X size={18} className="shrink-0" /> : <Menu size={18} className="shrink-0" />}
            </button>
          </div>

        </div>
      </div>

      {/* Unified Compact Expandable Sub-Navigation Floating Overlay (Never pushes content down, never overlaps) */}
      <div
        className={`navbar-dropdown-panel absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-300 ease-out ${dropdownBgClass} ${(featuresOpen || resourcesOpen) ? 'max-h-16 opacity-100 py-3 pointer-events-auto' : 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs">
          {featuresOpen && (
            <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4 animate-in fade-in duration-150">
              <a
                href="#mission"
                onClick={(e) => { handleNavLink(e, 'mission'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'mission' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.mission}
              </a>
              <a
                href="#value-props"
                onClick={(e) => { handleNavLink(e, 'value-props'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'value-props' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.valueProps}
              </a>
              <a
                href="#co-evolution"
                onClick={(e) => { handleNavLink(e, 'co-evolution'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'co-evolution' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.coEvolution}
              </a>
              <a
                href="#workflow"
                onClick={(e) => { handleNavLink(e, 'workflow'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'workflow' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.workflow}
              </a>
              <a
                href="#metrics"
                onClick={(e) => { handleNavLink(e, 'metrics'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'metrics' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.metrics}
              </a>
              <a
                href="#ioa-roadmap"
                onClick={(e) => { handleNavLink(e, 'ioa-roadmap'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'ioa-roadmap' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.roadmap}
              </a>
              <a
                href="#faq"
                onClick={(e) => { handleNavLink(e, 'faq'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${activeSection === 'faq' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.faq}
              </a>
            </div>
          )}

          {resourcesOpen && (
            <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4 animate-in fade-in duration-150">
              <button
                data-nav="docs"
                onClick={() => { onNavigate('docs'); closeDropdown(); }}
                onMouseEnter={() => prefetchPage('docs')}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${currentPage === 'docs' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {t.navbar.docs}
              </button>
              <button
                data-nav="explore"
                onClick={() => { onNavigate('explore'); closeDropdown(); }}
                onMouseEnter={() => prefetchPage('explore')}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${currentPage === 'explore' || currentPage === 'kham-pha' || currentPage === 'learn' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {isVi ? 'Khám phá Kỉ nguyên' : 'Era Academy'}
              </button>
              <button
                data-nav="changelog"
                onClick={() => { onNavigate('changelog'); closeDropdown(); }}
                onMouseEnter={() => prefetchPage('changelog')}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${currentPage === 'changelog' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {isVi ? 'Nhật ký cập nhật' : 'Changelog'}
              </button>
              <button
                data-nav="discussions"
                onClick={() => { onNavigate('discussions'); closeDropdown(); }}
                onMouseEnter={() => prefetchPage('discussions')}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${currentPage === 'discussions' ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-semibold' : 'text-slate-400 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {isVi ? 'Thảo luận' : 'Discussions'}
              </button>
            </div>
          )}

          <button
            onClick={closeDropdown}
            aria-label={isVi ? "Đóng danh mục" : "Close menu"}
            className="text-slate-500 hover:text-white [html[data-theme='light']_&]:text-slate-400 [html[data-theme='light']_&]:hover:text-slate-800 transition-colors p-1 cursor-pointer shrink-0"
            title={isVi ? "Đóng" : "Close"}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Profile Dropdown Floating Overlay (Never pushes content down) ── */}
      {user && (
        <div
          className={`navbar-dropdown-panel absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-300 ease-out ${dropdownBgClass} ${profileOpen ? 'max-h-48 sm:max-h-24 opacity-100 py-3 sm:py-2.5 pointer-events-auto' : 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
            }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-3">
            {/* Avatar + Info -> Click to redirect to Profile Page */}
            <div
              onClick={() => {
                if (onNavigate) {
                  onNavigate('profile');
                  closeDropdown();
                }
              }}
              className="flex items-center gap-3 cursor-pointer group/user select-none min-w-0 flex-1"
              title={isVi ? "Xem trang thông tin cá nhân Profile" : "View Profile Page"}
            >
              {(() => {
                const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
                const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
                const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

                return (
                  <div className="w-10 h-10 rounded-md bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 overflow-hidden flex items-center justify-center shrink-0 group-hover/user:border-cyan-400/40 transition-all">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono">
                        {initials}
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900 group-hover/user:text-cyan-400 [html[data-theme='light']_&]:group-hover/user:text-cyan-600 transition-colors tracking-tight truncate">
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0]}
                  </span>

                  {/* Minimalist Transparent Membership Tier & Admin Badge */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white [html[data-theme='light']_&]:text-slate-700 select-none shrink-0">
                    {entitlements?.isWaitlist || entitlements?.status === 'beta_waitlist'
                      ? 'BETA WAITLIST'
                      : (entitlements?.isTrial
                        ? 'PRO BETA'
                        : ((userProfile?.membership_tier || entitlements?.tier || (entitlements?.isPro ? 'pro' : 'community')) === 'pro'
                          ? 'AEVUM PRO'
                          : 'COMMUNITY'))}
                  </span>

                  {userProfile?.role === 'admin' && (
                    <>
                      <span className="text-zinc-600 [html[data-theme='light']_&]:text-zinc-400 text-xs select-none">/</span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 [html[data-theme='light']_&]:text-zinc-600 select-none shrink-0">
                        ADMIN
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 group-hover/user:text-slate-300 [html[data-theme='light']_&]:group-hover/user:text-slate-800 transition-colors font-mono truncate max-w-[180px] sm:max-w-xs md:max-w-md m-0">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  const { supabase } = await import('../services/supabaseClient');
                  await supabase.auth.signOut();
                  closeDropdown();
                }}
                className="px-2.5 py-1.5 rounded-sm border border-red-500/30 hover:border-red-400/60 bg-red-500/5 hover:bg-red-500/15 text-red-400 hover:text-red-300 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title={isVi ? 'Đăng xuất tài khoản' : 'Sign out'}
              >
                <LogOut size={12} className="shrink-0" />
                <span className="whitespace-nowrap">{isVi ? 'Đăng xuất' : 'Sign Out'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeDropdown();
                }}
                className="text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-500 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors p-1.5 rounded-md hover:bg-white/5 [html[data-theme='light']_&]:hover:bg-slate-100 cursor-pointer shrink-0"
                aria-label="Close profile modal"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
