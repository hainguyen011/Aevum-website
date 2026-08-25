import React, { useState, useEffect, useRef } from 'react';
import { Search, Facebook, ChevronDown, Globe, Eye, EyeOff, Sun, Atom, Menu, X, Sparkles, Layers, Network, Terminal, ArrowRight, Mail, User, LogOut, Zap } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';
import unikornLogo from '../../assets/unikorn-logo.png';
import unikornLogoDark from '../../assets/unikorn-logo-dark.png';
import { translations } from '../data/translations';

import { supabase } from '../services/supabaseClient';
import { MembershipService } from '../services/MembershipService';
import { MembershipBadge } from './ui/MembershipBadge';

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
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [entitlements, setEntitlements] = useState(null);
  const featuresRef = useRef(null);
  const isVi = activeLang === 'vi';
  const t = translations[activeLang] || translations.en;

  useEffect(() => {
    if (user) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        MembershipService.getCurrentEntitlements(session?.access_token, user.id).then(data => {
          if (data) setEntitlements(data);
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

  // Handle click outside to close features & resources Cyber HUD menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setFeaturesOpen(false);
        setResourcesOpen(false);
      }
    };
    if (featuresOpen || resourcesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [featuresOpen, resourcesOpen]);

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

  return (
    <div ref={featuresRef} className="w-full border-b border-white/10 bg-[#0B0B11]/90 backdrop-blur-md sticky top-0 z-40 flex flex-col transition-all duration-300">
      
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
            <span className="font-extrabold text-lg text-white tracking-wider font-display whitespace-nowrap">
              AEVUM OS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-semibold whitespace-nowrap text-nowrap">
            
            {/* Desktop Features & Architecture Toggle Button */}
            {(() => {
              const isButtonActive = featuresOpen || Boolean(activeSection) || currentPage === 'home';
              return (
                <button 
                  onClick={() => setFeaturesOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-[5px] transition-all duration-200 cursor-pointer font-mono ${
                    isButtonActive
                      ? 'border-beam-btn text-white'
                      : 'text-white border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40'
                  }`}
                >

                  <span className="relative z-10 font-bold tracking-wide text-white">{getButtonLabel()}</span>
                  <ChevronDown size={13} className={`relative z-10 text-white transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
              );
            })()}

            {/* Pricing Link */}
            <button 
              onClick={() => { onNavigate('pricing'); setFeaturesOpen(false); setResourcesOpen(false); }}
              className={`transition-colors font-semibold whitespace-nowrap text-nowrap cursor-pointer ${
                currentPage === 'pricing' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.pricing}
            </button>

            {/* About Link */}
            <button 
              onClick={() => { onNavigate('about'); setFeaturesOpen(false); setResourcesOpen(false); }}
              className={`transition-colors font-semibold whitespace-nowrap text-nowrap cursor-pointer ${
                currentPage === 'about' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.about}
            </button>

            {/* Resources & Community Dropdown (Designed as a Clean Text Link) */}
            <button 
              onClick={() => { setResourcesOpen(prev => !prev); setFeaturesOpen(false); }}
              className={`flex items-center gap-1.5 transition-colors font-semibold whitespace-nowrap text-nowrap cursor-pointer ${
                resourcesOpen || ['docs', 'changelog', 'discussions'].includes(currentPage)
                  ? 'text-cyan-400 font-bold'
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
              className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] px-3 py-1.5 rounded-lg text-slate-400 cursor-pointer transition-all group"
            >
              <Search size={14} className="group-hover:text-white transition-colors" />
              <span className="text-xs font-mono text-slate-400 group-hover:text-white">
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
                onClick={() => { setProfileOpen(o => !o); setFeaturesOpen(false); }}
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
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <Facebook size={14} />
            </a>
            <a 
              href="https://unikorn.vn" 
              target="_blank" 
              rel="noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity p-1 flex items-center justify-center"
              title="Unikorn - Creative Tech Agency"
            >
              <img src={unikornLogo} alt="Unikorn Logo" className="w-3.5 h-3.5 object-contain unikorn-header-light" />
              <img src={unikornLogoDark} alt="Unikorn Logo" className="w-3.5 h-3.5 object-contain unikorn-header-dark" />
            </a>

            <a
              href="mailto:hainguyen011238@gmail.com"
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

      {/* Compact Expandable Sub-Navigation Strip (Pushes Content Down Seamlessly) */}
      <div 
        className={`w-full overflow-hidden transition-all duration-300 ease-out bg-[#0B0B11]/95 border-t border-white/10 ${
          featuresOpen ? 'max-h-16 opacity-100 py-3' : 'max-h-0 opacity-0 py-0 border-t-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4">
            <a 
              href="#cli" 
              onClick={(e) => { handleNavLink(e, 'cli'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'cli' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.kernel}
            </a>
            <a 
              href="#breakthroughs" 
              onClick={(e) => { handleNavLink(e, 'breakthroughs'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'breakthroughs' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.breakthroughs}
            </a>
            <a 
              href="#agents" 
              onClick={(e) => { handleNavLink(e, 'agents'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'agents' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.agents}
            </a>
            <a 
              href="#architecture" 
              onClick={(e) => { handleNavLink(e, 'architecture'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'architecture' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.architecture}
            </a>
            <a 
              href="#orchestration" 
              onClick={(e) => { handleNavLink(e, 'orchestration'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'orchestration' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.orchestration}
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { handleNavLink(e, 'pricing'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'pricing' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.pricing}
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => { handleNavLink(e, 'testimonials'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'testimonials' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.testimonials}
            </a>
            <a 
              href="#unikorn" 
              onClick={(e) => { handleNavLink(e, 'unikorn'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'unikorn' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.unikorn}
            </a>
            <a 
              href="#i2flabs" 
              onClick={(e) => { handleNavLink(e, 'i2flabs'); setFeaturesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'i2flabs' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.i2flabs}
            </a>
          </div>

          <button 
            onClick={() => setFeaturesOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-1 cursor-pointer"
            title={isVi ? "Đóng" : "Close"}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Resources & Community Sub-Navigation Strip (Pushes Content Down Seamlessly) */}
      <div 
        className={`w-full overflow-hidden transition-all duration-300 ease-out bg-[#0B0B11]/95 border-t border-white/10 ${
          resourcesOpen ? 'max-h-16 opacity-100 py-3' : 'max-h-0 opacity-0 py-0 border-t-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5 sm:gap-7 font-medium overflow-x-auto no-scrollbar py-1 pr-4">
            <button 
              onClick={() => { onNavigate('docs'); setResourcesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold ${
                currentPage === 'docs' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {t.navbar.docs}
            </button>
            <button 
              onClick={() => { onNavigate('changelog'); setResourcesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold ${
                currentPage === 'changelog' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {isVi ? 'Nhật ký cập nhật' : 'Changelog'}
            </button>
            <button 
              onClick={() => { onNavigate('discussions'); setResourcesOpen(false); }}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold ${
                currentPage === 'discussions' ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {isVi ? 'Thảo luận' : 'Discussions'}
            </button>
          </div>

          <button 
            onClick={() => setResourcesOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-1 cursor-pointer"
            title={isVi ? "Đóng" : "Close"}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Profile Dropdown Strip ── */}
      {user && (
        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-out bg-[#0B0B11]/95 border-t border-white/5 ${
            profileOpen ? 'max-h-24 opacity-100 py-3' : 'max-h-0 opacity-0 py-0 border-t-0'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            {/* Avatar + Info -> Click to redirect to Profile Page */}
            <div 
              onClick={() => {
                if (onNavigate) {
                  onNavigate('profile');
                  setProfileOpen(false);
                }
              }}
              className="flex items-center gap-3 cursor-pointer group/user select-none transition-all"
              title={isVi ? "Xem trang thông tin cá nhân Profile" : "View Profile Page"}
            >
              {(() => {
                const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
                const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
                const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

                return (
                  <div className="w-10 h-10 rounded-[6px] overflow-hidden flex items-center justify-center shrink-0 group-hover/user:opacity-85 transition-opacity">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-white text-xs font-bold font-mono">
                        {initials}
                      </div>
                    )}
                  </div>
                );
              })()}

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-white group-hover/user:text-cyan-400 transition-colors tracking-wide">
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0]}
                  </span>
                  
                  {/* Minimalist Premium Membership Tier Badge */}
                  <MembershipBadge
                    tier={userProfile?.membership_tier || entitlements?.tier || (entitlements?.isPro ? 'pro' : 'community')}
                    isTrial={entitlements?.isTrial}
                    isWaitlist={entitlements?.isWaitlist || entitlements?.status === 'beta_waitlist'}
                    trialDaysRemaining={entitlements?.trialDaysRemaining}
                    size="xs"
                  />


                  {userProfile?.role === 'admin' && (
                    <span className="admin-badge inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-white/[0.06] border border-white/20 text-slate-300 select-none">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 group-hover/user:text-slate-400 transition-colors">{user.email}</p>
              </div>
            </div>




            {/* Actions */}
            <div className="flex items-center gap-3">

              <button
                onClick={async () => { await supabase.auth.signOut(); setProfileOpen(false); }}
                className="border border-red-500/30 hover:border-red-400/60 rounded-md px-3 py-1.5 uppercase tracking-widest transition-colors cursor-pointer font-mono font-bold text-red-400 hover:text-red-300"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', lineHeight: 1 }}
              >
                <LogOut size={11} style={{ display: 'block' }} />
                <span style={{ display: 'block', lineHeight: 1, transform: 'translateY(1px)' }}>{isVi ? 'Đăng xuất' : 'Sign Out'}</span>
              </button>
              <button
                onClick={() => setProfileOpen(false)}
                className="text-slate-500 hover:text-white transition-colors p-1 cursor-pointer ml-2"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
