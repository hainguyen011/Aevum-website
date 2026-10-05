import React, { useState, useEffect, useRef } from 'react';
import { Search, Facebook, ChevronDown, Globe, Eye, EyeOff, Sun, Atom, Menu, X, Sparkles, Layers, Network, Terminal, ArrowRight, Mail, User, LogOut, Zap } from 'lucide-react';
const logoImg = '/assets/logos/AevumOS-transparent.webp';
import unikornLogo from '../../assets/unikorn-logo.webp';
import unikornLogoDark from '../../assets/unikorn-logo-dark.webp';
import { translations } from '../data/translations';
import { MembershipBadge } from './ui/MembershipBadge';
import { AnnouncementBanner } from './AnnouncementBanner';

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
  onOpenAuthModal 
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
  const featuresRef = useRef(null);
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || (window.lenis ? window.lenis.scroll : 0);
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', handleScroll);
      }
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

    const sections = ['cli', 'breakthroughs', 'agents', 'architecture', 'orchestration', 'pricing', 'testimonials', 'unikorn', 'i2flabs'];
    
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
    if (activeSection === 'cli') return t.navbar.kernel;
    if (activeSection === 'breakthroughs') return t.navbar.breakthroughs;
    if (activeSection === 'agents') return t.navbar.agents;
    if (activeSection === 'architecture') return t.navbar.architecture;
    if (activeSection === 'orchestration') return t.navbar.orchestration;
    if (activeSection === 'pricing') return t.navbar.pricing;
    if (activeSection === 'testimonials') return t.navbar.testimonials;
    if (activeSection === 'unikorn') return t.navbar.unikorn;
    if (activeSection === 'i2flabs') return t.navbar.i2flabs;
    return isVi ? 'Kiến trúc & Tính năng' : 'Features & Architecture';
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
        ? 'bg-black/20 backdrop-blur-md border-b border-white/10'
        : 'bg-transparent border-b border-transparent backdrop-blur-none')
    : 'bg-[#07090D]/85 backdrop-blur-md border-b border-white/10';

  const dropdownBgClass = isAtTopLanding
    ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 text-white'
    : 'bg-[#07090D]/95 backdrop-blur-xl border-b border-white/10 text-white';

  return (
    <div 
      ref={featuresRef} 
      className={`relative w-full !sticky top-0 z-40 flex flex-col transition-all duration-300 ${headerBgClass}`}
      style={{ position: 'sticky', top: 0, zIndex: 40 }}
    >
      
      {/* Top Accent Marquee Announcement Banner */}
      <AnnouncementBanner onNavigate={onNavigate} activeLang={activeLang} />

      {/* Main Navbar Top Row */}
      <div className="w-full flex items-stretch justify-between pl-4 sm:pl-6 lg:pl-8 xl:pl-10 pr-0 h-16">
        {/* Left Cell: Logo + Main Navigation */}
        <div className="flex items-center gap-3 xl:gap-5 min-w-0 py-2">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}
            className="flex items-center gap-2 text-decoration-none group shrink-0"
          >
            <img 
              src={logoImg} 
              alt="Aevum OS Logo" 
              className="w-7 h-7 object-contain" 
            />
            <span className="font-semibold text-lg text-white tracking-wide font-display whitespace-nowrap">
              AEVUM OS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs sm:text-[13px] font-medium whitespace-nowrap text-nowrap">
            
            {/* Desktop Features & Architecture Toggle Button */}
            {(() => {
              const isButtonActive = featuresOpen || Boolean(activeSection) || currentPage === 'home';
              return (
                <button 
                  onClick={() => toggleDropdown('features')}
                  className={`flex items-center gap-1.5 text-xs sm:text-[13px] font-medium py-1.5 px-3 rounded-[5px] transition-all duration-200 cursor-pointer ${
                    isButtonActive
                      ? 'border-beam-btn text-white'
                      : 'text-white border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40'
                  }`}
                >

                  <span className="relative z-10 font-medium tracking-wide text-white">{getButtonLabel()}</span>
                  <ChevronDown size={13} className={`relative z-10 text-white transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
              );
            })()}

            {/* Pricing Link */}
            <button 
              onClick={() => { onNavigate('pricing'); closeDropdown(); }}
              className={`transition-colors font-medium whitespace-nowrap text-nowrap cursor-pointer ${
                currentPage === 'pricing' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.pricing}
            </button>

            {/* About Link */}
            <button 
              onClick={() => { onNavigate('about'); closeDropdown(); }}
              className={`transition-colors font-medium whitespace-nowrap text-nowrap cursor-pointer ${
                currentPage === 'about' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.about}
            </button>

            {/* Resources & Community Dropdown (Designed as a Clean Text Link) */}
            <button 
              onClick={() => toggleDropdown('resources')}
              className={`flex items-center gap-1.5 transition-colors font-medium whitespace-nowrap text-nowrap cursor-pointer ${
                resourcesOpen || ['docs', 'changelog', 'discussions', 'explore'].includes(currentPage)
                  ? 'text-cyan-400'
                  : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              <span>{isVi ? 'Tài liệu & Cộng đồng' : 'Docs & Community'}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

          </nav>
        </div>

        {/* Right Cell: Search + Social Links */}
        {/* Right Cell: Search + Full-Height Sign In + Social Icons */}
        <div className="flex items-stretch gap-0 shrink-0">
          {/* Search Input — desktop only, centered vertically */}
          <div className="hidden lg:flex items-center self-center mr-3 xl:mr-4">
            <div 
              onClick={onOpenSearch}
              className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3 py-1.5 rounded-lg text-slate-400 cursor-pointer transition-all group"
            >
              <Search size={14} className="group-hover:text-white transition-colors" />
              <span className="text-xs text-slate-400 group-hover:text-white">
                {isVi ? 'Tìm kiếm OS...' : 'Search OS...'}
              </span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-400 border border-white/10 ml-2">
                Ctrl K
              </kbd>
            </div>
          </div>

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
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400'
              : tierSlug === 'pro'
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400'
              : 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400';

            return (
              <button
                onClick={() => toggleDropdown('profile')}
                className="flex items-center self-stretch gap-2.5 text-xs font-mono text-slate-300 hover:text-white px-3 sm:px-4 border-l border-r border-white/10 bg-transparent hover:bg-white/[0.04] transition-all cursor-pointer group rounded-none"
                title={isVi ? "Xem tài khoản Aevum" : "View Aevum profile"}
              >
                {/* Clean Soft Rounded Avatar */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] overflow-hidden flex items-center justify-center shrink-0">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-white text-xs font-mono font-bold">
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name & Transparent Member Tier Beneath */}
                <div className="flex flex-col items-start justify-center leading-none text-left max-w-[110px]">
                  <span className="font-bold uppercase tracking-wider truncate text-white text-xs">
                    {displayName.split(' ')[0]}
                  </span>
                  <span className={`text-[8.5px] font-mono font-semibold uppercase tracking-wider pt-0.5 ${tierTextGradient}`}>
                    {tierLabel}
                  </span>
                </div>


                <ChevronDown size={11} className={`text-white transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
            );
          })() : (

            <button
              onClick={onOpenAuthModal}
              className="flex items-center self-stretch gap-2 text-xs font-mono text-slate-300 hover:text-white px-4 sm:px-5 border-l border-r border-white/10 bg-transparent hover:bg-white/[0.04] transition-all cursor-pointer group rounded-none"
              title={isVi ? "Đăng nhập tài khoản" : "Sign in to Aevum account"}
            >
              <User size={13} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="font-bold uppercase tracking-wider text-slate-300 group-hover:text-cyan-400 transition-colors">
                {isVi ? 'ĐĂNG NHẬP' : 'SIGN IN'}
              </span>
            </button>
          )}

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-2 px-3 sm:px-4 lg:px-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook I2FLabs"
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <Facebook size={14} />
            </a>
            <a 
              href="https://unikorn.vn" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Unikorn Vietnam Creative Tech Agency"
              className="opacity-70 hover:opacity-100 transition-opacity p-1 flex items-center justify-center"
              title="Unikorn - Creative Tech Agency"
            >
              <img src={unikornLogo} alt="Unikorn Logo" width="14" height="14" className="w-3.5 h-3.5 object-contain unikorn-header-light" />
              <img src={unikornLogoDark} alt="Unikorn Logo" width="14" height="14" className="w-3.5 h-3.5 object-contain unikorn-header-dark" />
            </a>

            <a
              href="mailto:hainguyen011238@gmail.com"
              aria-label="Email Aevum OS Support"
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="hainguyen011238@gmail.com"
            >
              <Mail size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="lg:hidden flex items-center justify-center px-3 sm:px-4">
            <button
              onClick={onToggleMobileMenu}
              className="flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-lg transition-all cursor-pointer"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? <X size={18} className="shrink-0" /> : <Menu size={18} className="shrink-0" />}
            </button>
          </div>

        </div>
      </div>

      {/* Unified Compact Expandable Sub-Navigation Floating Overlay (Never pushes content down, never overlaps) */}
      <div 
        className={`absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-300 ease-out ${dropdownBgClass} ${
          (featuresOpen || resourcesOpen) ? 'max-h-16 opacity-100 py-3 pointer-events-auto' : 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs">
          {featuresOpen && (
            <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4 animate-in fade-in duration-150">
              <a 
                href="#cli" 
                onClick={(e) => { handleNavLink(e, 'cli'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'cli' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.kernel}
              </a>
              <a 
                href="#breakthroughs" 
                onClick={(e) => { handleNavLink(e, 'breakthroughs'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'breakthroughs' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.breakthroughs}
              </a>
              <a 
                href="#agents" 
                onClick={(e) => { handleNavLink(e, 'agents'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'agents' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.agents}
              </a>
              <a 
                href="#architecture" 
                onClick={(e) => { handleNavLink(e, 'architecture'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'architecture' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.architecture}
              </a>
              <a 
                href="#orchestration" 
                onClick={(e) => { handleNavLink(e, 'orchestration'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'orchestration' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.orchestration}
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => { handleNavLink(e, 'pricing'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'pricing' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.pricing}
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => { handleNavLink(e, 'testimonials'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'testimonials' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.testimonials}
              </a>
              <a 
                href="#unikorn" 
                onClick={(e) => { handleNavLink(e, 'unikorn'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'unikorn' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.unikorn}
              </a>
              <a 
                href="#i2flabs" 
                onClick={(e) => { handleNavLink(e, 'i2flabs'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === 'i2flabs' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.i2flabs}
              </a>
            </div>
          )}

          {resourcesOpen && (
            <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4 animate-in fade-in duration-150">
              <button 
                onClick={() => { onNavigate('docs'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${
                  currentPage === 'docs' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {t.navbar.docs}
              </button>
              <button 
                onClick={() => { onNavigate('explore'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${
                  currentPage === 'explore' || currentPage === 'kham-pha' || currentPage === 'learn' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {isVi ? 'Khám phá Kỉ nguyên' : 'Era Academy'}
              </button>
              <button 
                onClick={() => { onNavigate('changelog'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${
                  currentPage === 'changelog' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {isVi ? 'Nhật ký cập nhật' : 'Changelog'}
              </button>
              <button 
                onClick={() => { onNavigate('discussions'); closeDropdown(); }}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-medium ${
                  currentPage === 'discussions' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {isVi ? 'Thảo luận' : 'Discussions'}
              </button>
            </div>
          )}

          <button 
            onClick={closeDropdown}
            aria-label={isVi ? "Đóng danh mục" : "Close menu"}
            className="text-slate-500 hover:text-white transition-colors p-1 cursor-pointer shrink-0"
            title={isVi ? "Đóng" : "Close"}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Profile Dropdown Floating Overlay (Never pushes content down) ── */}
      {user && (
        <div
          className={`absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-300 ease-out ${dropdownBgClass} ${
            profileOpen ? 'max-h-48 sm:max-h-24 opacity-100 py-3 sm:py-2.5 pointer-events-auto' : 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
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
                  <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center shrink-0 group-hover/user:border-cyan-400/40 transition-all">
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
                  <span className="text-xs font-bold text-white group-hover/user:text-cyan-400 transition-colors tracking-tight truncate">
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0]}
                  </span>
                  
                  {/* Minimalist Transparent Membership Tier & Admin Badge */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white select-none shrink-0">
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
                      <span className="text-zinc-600 text-xs select-none">•</span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 select-none shrink-0">
                        ADMIN
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 group-hover/user:text-slate-300 transition-colors font-mono truncate max-w-[180px] sm:max-w-xs md:max-w-md m-0">
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
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5 cursor-pointer shrink-0"
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
