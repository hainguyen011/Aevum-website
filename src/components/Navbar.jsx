import React, { useState } from 'react';
import { Search, Facebook, ChevronDown, Globe, Eye, EyeOff, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';
import unikornLogo from '../../assets/unikorn-logo.png';
import { translations } from '../data/translations';

export const Navbar = ({ currentPage, onNavigate, activeLang, onChangeLang, onOpenSearch, isEyeCare, onToggleEyeCare, isMobileMenuOpen, onToggleMobileMenu }) => {
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[activeLang] || translations.en;

  const handleNavLink = (e, target) => {
    e.preventDefault();
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
      onNavigate('landing');
      setTimeout(scrollToElement, 150);
    } else {
      scrollToElement();
    }
  };

  return (
    <div className="w-full border-subtle-b flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 py-4 bg-[#0B0B11]/90 backdrop-blur-md sticky top-0 z-30">
      
      {/* Left Cell: Logo + Main Navigation */}
      <div className="flex items-center gap-4 xl:gap-8 min-w-0">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}
          className="flex items-center gap-2.5 text-decoration-none group shrink-0"
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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-semibold whitespace-nowrap text-nowrap" style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}>
          <a 
            href="#breakthroughs" 
            onClick={(e) => handleNavLink(e, 'breakthroughs')}
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap text-nowrap"
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.breakthroughs}
          </a>
          <a 
            href="#architecture" 
            onClick={(e) => handleNavLink(e, 'architecture')}
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap text-nowrap"
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.architecture}
          </a>
          <a 
            href="#orchestration" 
            onClick={(e) => handleNavLink(e, 'orchestration')}
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap text-nowrap"
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.orchestration}
          </a>
          <a 
            href="#cli" 
            onClick={(e) => handleNavLink(e, 'cli')}
            className="text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap text-nowrap"
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.kernel}
          </a>
          
          {/* Vertical Separator */}
          <span className="w-px h-3 bg-white/10 shrink-0"></span>

          {/* Docs Link */}
          <button 
            onClick={() => onNavigate('docs')}
            className={`transition-colors font-semibold whitespace-nowrap text-nowrap ${
              currentPage === 'docs' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
            }`}
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.docs}
          </button>

          {/* Vertical Separator */}
          <span className="w-px h-3 bg-white/10 shrink-0"></span>

          {/* About Link */}
          <button 
            onClick={() => onNavigate('about')}
            className={`transition-colors font-semibold whitespace-nowrap text-nowrap ${
              currentPage === 'about' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
            }`}
            style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
          >
            {t.navbar.about}
          </button>
        </nav>
      </div>

      {/* Right Cell: Search + Social Links */}
      <div className="flex items-center gap-3 xl:gap-4 shrink-0">
        {/* Search Input */}
        <div 
          onClick={onOpenSearch}
          className="hidden sm:flex items-center bg-white/[0.02] border-subtle rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono gap-2 hover:border-white/15 transition-all cursor-pointer whitespace-nowrap text-nowrap" 
          style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}
        >
          <Search size={13} className="text-slate-500 shrink-0" />
          <span className="whitespace-nowrap text-nowrap" style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}>{t.navbar.searchPlaceholder}</span>
          <kbd className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-slate-300 whitespace-nowrap text-nowrap" style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}>{t.navbar.searchShortcut}</kbd>
        </div>

        {/* Eye Care Toggle */}
        <button
          onClick={onToggleEyeCare}
          className={`hidden sm:flex items-center gap-1.5 text-xs transition-all font-mono py-1.5 px-2.5 rounded-md hover:bg-white/5 whitespace-nowrap ${
            isEyeCare 
              ? 'text-white border border-white/20 bg-white/5' 
              : 'text-slate-400 hover:text-white border border-transparent'
          }`}
          title={activeLang === 'vi' ? 'Chế độ bảo vệ mắt (Giảm ánh sáng xanh)' : 'Eye Care Mode (Filter Blue Light)'}
        >
          {isEyeCare ? <EyeOff size={14} className="shrink-0" /> : <Eye size={14} className="shrink-0" />}
          <span className="hidden sm:inline whitespace-nowrap">
            {activeLang === 'vi' ? 'Bảo vệ mắt' : 'Eye Care'}
          </span>
        </button>

        {/* Language selector */}
        <div className="relative shrink-0">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-mono py-1.5 px-2 rounded-md hover:bg-white/5 whitespace-nowrap"
          >
            <Globe size={14} className="shrink-0" />
            <span className="uppercase whitespace-nowrap">{activeLang}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 shrink-0 ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {langOpen && (
            <>
              {/* Overlay backdrop to close dropdown */}
              <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1.5 w-32 bg-[#0B0B11] border border-white/10 rounded-md overflow-hidden shadow-none z-20 font-mono text-[11px] animate-fadeIn" style={{ boxShadow: 'none' }}>
                <button
                  onClick={() => { onChangeLang('vi'); setLangOpen(false); }}
                  className={`block w-full text-left px-3 py-2 hover:bg-white/5 transition-colors whitespace-nowrap ${
                    activeLang === 'vi' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Vietnamese
                </button>
                <button
                  onClick={() => { onChangeLang('en'); setLangOpen(false); }}
                  className={`block w-full text-left px-3 py-2 border-t border-white/5 hover:bg-white/5 transition-colors whitespace-nowrap ${
                    activeLang === 'en' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  English
                </button>
              </div>
            </>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3.5 text-slate-400 shrink-0">
          <a 
            href="https://www.facebook.com/Haiii191/?locale=vi_VN" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center text-slate-400 opacity-60 hover:opacity-100 hover:text-white transition-all"
            title="Facebook"
          >
            <Facebook size={15} />
          </a>
          <a 
            href="https://unikorn.vn/p/aevum?ref=embed-aevum" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center transition-opacity opacity-60 hover:opacity-100"
            title="Aevum OS on Unikorn.vn"
          >
            <img src={unikornLogo} alt="Unikorn Logo" className="h-3.5 w-auto max-h-[14px] object-contain" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
        </button>
      </div>

    </div>
  );
};

export default Navbar;
