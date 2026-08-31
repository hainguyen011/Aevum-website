import React from 'react';
import { translations } from '../data/translations';

const logoImg = '/assets/logos/AevumOS-transparent.webp';

export const Footer = ({ onNavigate, activeLang }) => {
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

    if (onNavigate) {
      onNavigate('landing');
      setTimeout(scrollToElement, 100);
    } else {
      scrollToElement();
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#07080E] text-slate-400 relative z-10 w-full">
      {/* Top Main Section with Responsive Grid */}
      <div className="px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
          
          {/* Brand & Identity Column (Spans full on mobile, 2 cols on desktop) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate('landing')}
                aria-label="Aevum OS Homepage"
                className="flex items-center gap-2.5 text-left p-0 cursor-pointer group bg-transparent border-0"
              >
                <img src={logoImg} alt="Aevum OS Logo" width="24" height="24" className="w-6 h-6 object-contain group-hover:scale-105 transition-transform" />
                <span className="font-bold text-white text-base tracking-tight font-display">AEVUM OS</span>
              </button>
            </div>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed font-sans">
              {t.footer.brandDesc}
            </p>
            
            {/* Quick Links / Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 text-slate-400 font-mono text-[11px]">
              <button 
                onClick={() => onNavigate('pricing')} 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/5 transition-all text-xs font-semibold cursor-pointer"
              >
                {t.navbar.pricing}
              </button>
              <button 
                onClick={() => onNavigate('docs')} 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/5 transition-all text-xs font-semibold cursor-pointer"
              >
                {t.footer.links.docs}
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/5 transition-all text-xs font-semibold cursor-pointer"
              >
                {t.navbar.about}
              </button>
              <a 
                href="https://i2flabs.vercel.app/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="I2FLabs Official Website" 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-cyan-400 border border-white/5 transition-all text-xs"
              >
                I2FLabs
              </a>
              <a 
                href="https://open-vsx.org/extension/I2FLabs/aevum" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Aevum Open VSX Extension" 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-cyan-400 border border-white/5 transition-all text-xs"
              >
                {t.footer.links.openVsx}
              </a>
              <a 
                href="https://unikorn.vn/p/aevum" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Unikorn Product Hunt Page" 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-cyan-400 border border-white/5 transition-all text-xs"
              >
                {t.footer.links.unikorn}
              </a>
              <a 
                href="https://github.com/hainguyen011" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Repository" 
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-cyan-400 border border-white/5 transition-all text-xs"
              >
                GitHub
              </a>
              <a 
                href="mailto:hainguyen011238@gmail.com" 
                aria-label="Email Aevum OS Support"
                className="px-2.5 py-1 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] hover:text-cyan-400 border border-white/5 transition-all text-xs" 
                title="hainguyen011238@gmail.com"
              >
                Mail
              </a>
            </div>
          </div>

          {/* Architecture Column */}
          <div className="space-y-3 font-sans">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-cyan-500 rounded-none inline-block"></span>
              {t.footer.cols.arch}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">{activeLang === 'vi' ? 'Nghi thức Bắt tay' : 'The Handshake Ritual'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">{activeLang === 'vi' ? 'Bộ não hướng Tên miền' : 'Domain-Driven Brain'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">{activeLang === 'vi' ? 'Điều phối Biệt đội' : 'Squad Orchestration'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">{activeLang === 'vi' ? 'Thu hoạch Tri thức' : 'Knowledge Harvest'}</a></li>
            </ul>
          </div>

          {/* Execution Modes Column */}
          <div className="space-y-3 font-sans">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-cyan-500 rounded-none inline-block"></span>
              {t.footer.cols.exec}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">SSE Daemon (Port 3344)</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Stdio OS Process</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Health Ping Endpoint</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Electron Desktop GUI</a></li>
            </ul>
          </div>

          {/* Agent Ecosystem Column */}
          <div className="space-y-3 font-sans col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-cyan-500 rounded-none inline-block"></span>
              {t.footer.cols.eco}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Autonomous Agents</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Claude Desktop Squads</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">Antigravity AI Brain</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors text-slate-300 block py-0.5">PiperNet IoA Mesh</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Edge-to-Edge Divider Line & Bottom Copyright Bar */}
      <div className="border-t border-white/5 bg-[#05060A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5 pb-16 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-slate-400 font-mono text-[11px]">
          {/* Copyright text */}
          <p className="text-center sm:text-left m-0 text-slate-400 text-xs sm:text-[11px] leading-relaxed">
            {t.footer.copyright}
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center sm:justify-end gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="text-slate-400 hover:text-cyan-400 transition-colors py-1 cursor-pointer bg-transparent border-0 font-mono text-[11px]"
            >
              {activeLang === 'vi' ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </button>
            <span className="text-white/10 select-none">•</span>
            <button
              onClick={() => onNavigate('terms')}
              className="text-slate-400 hover:text-cyan-400 transition-colors py-1 cursor-pointer bg-transparent border-0 font-mono text-[11px]"
            >
              {activeLang === 'vi' ? 'Điều khoản Dịch vụ' : 'Terms of Service'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
