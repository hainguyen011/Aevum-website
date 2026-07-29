import React, { useState } from 'react';
import { Search, Github, Facebook, Disc as Discord, ChevronDown, Globe } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';
import { translations } from '../data/translations';

export const Navbar = ({ currentPage, onNavigate, activeLang, onChangeLang }) => {
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[activeLang] || translations.en;

  const handleNavLink = (e, target) => {
    if (currentPage !== 'landing') {
      e.preventDefault();
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="w-full border-subtle-b flex items-center justify-between px-6 lg:px-10 py-4 bg-[#0B0B11]">
      
      {/* Left Cell: Logo + Main Navigation */}
      <div className="flex items-center gap-8">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}
          className="flex items-center gap-2.5 text-decoration-none group"
        >
          <img 
            src={logoImg} 
            alt="Aevum OS Logo" 
            className="w-7 h-7 object-contain" 
          />
          <span className="font-extrabold text-lg text-white tracking-wider font-display">
            AEVUM OS
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
          <a 
            href="#breakthroughs" 
            onClick={(e) => handleNavLink(e, 'breakthroughs')}
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t.navbar.breakthroughs}
          </a>
          <a 
            href="#architecture" 
            onClick={(e) => handleNavLink(e, 'architecture')}
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t.navbar.architecture}
          </a>
          <a 
            href="#orchestration" 
            onClick={(e) => handleNavLink(e, 'orchestration')}
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t.navbar.orchestration}
          </a>
          <a 
            href="#cli" 
            onClick={(e) => handleNavLink(e, 'cli')}
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {t.navbar.kernel}
          </a>
          
          {/* Vertical Separator */}
          <span className="w-px h-3 bg-white/10"></span>

          {/* Docs Link */}
          <button 
            onClick={() => onNavigate('docs')}
            className={`transition-colors font-semibold ${
              currentPage === 'docs' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
            }`}
          >
            {t.navbar.docs}
          </button>
        </nav>
      </div>

      {/* Right Cell: Search + Social Links */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="hidden sm:flex items-center bg-white/[0.02] border-subtle rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono gap-2 hover:border-white/15 transition-all cursor-pointer">
          <Search size={13} className="text-slate-500" />
          <span>{t.navbar.searchPlaceholder}</span>
          <kbd className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-slate-300">{t.navbar.searchShortcut}</kbd>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-mono py-1.5 px-2 rounded-md hover:bg-white/5"
          >
            <Globe size={14} />
            <span className="uppercase">{activeLang}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
          </button>

          {langOpen && (
            <>
              {/* Overlay backdrop to close dropdown */}
              <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1.5 w-32 bg-[#0B0B11] border border-white/10 rounded-md overflow-hidden shadow-xl z-20 font-mono text-[11px] animate-fadeIn">
                <button
                  onClick={() => { onChangeLang('vi'); setLangOpen(false); }}
                  className={`block w-full text-left px-3 py-2 hover:bg-white/5 transition-colors ${
                    activeLang === 'vi' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Vietnamese
                </button>
                <button
                  onClick={() => { onChangeLang('en'); setLangOpen(false); }}
                  className={`block w-full text-left px-3 py-2 border-t border-white/5 hover:bg-white/5 transition-colors ${
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
        <div className="flex items-center gap-3 text-slate-400">
          <a href="https://www.facebook.com/Haiii191/?locale=vi_VN" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <Facebook size={15} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <Discord size={15} />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <Github size={15} />
          </a>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
