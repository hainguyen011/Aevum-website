import React from 'react';
import { Mail } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';
import { translations } from '../data/translations';

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

    onNavigate('landing');
    setTimeout(scrollToElement, 150);
  };

  return (
    <footer className="bg-[#0B0B11] text-slate-400 text-xs">
      
      {/* Main Footer Links */}
      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-left"
              >
                <img src={logoImg} alt="Aevum OS Logo" className="w-6 h-6 object-contain" />
                <span className="font-bold text-white text-base tracking-tight font-display">AEVUM OS</span>
              </button>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-slate-400 font-mono text-[11px]">
              <button 
                onClick={() => onNavigate('docs')} 
                className="text-white hover:underline hover:text-slate-200 transition-colors font-semibold"
              >
                {t.footer.links.docs}
              </button>
              <span className="text-white/10">•</span>
              <button 
                onClick={() => onNavigate('about')} 
                className="text-white hover:underline hover:text-slate-200 transition-colors font-semibold"
              >
                {t.navbar.about}
              </button>
              <span className="text-white/10">•</span>
              <a href="https://open-vsx.org/extension/I2FLabs/aevum" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">{t.footer.links.openVsx}</a>
              <a href="https://unikorn.vn/p/aevum" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">{t.footer.links.unikorn}</a>
              <a href="https://github.com/hainguyen011" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">{t.footer.links.github}</a>
              <a 
                href="mailto:hainguyen011238@gmail.com" 
                className="hover:text-cyan-400 transition-colors" 
                title="hainguyen011238@gmail.com"
              >
                Mail
              </a>
            </div>
          </div>

          {/* Architecture Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">{t.footer.cols.arch}</h4>
            <ul className="space-y-2">
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors">{activeLang === 'vi' ? 'Nghi thức Bắt tay' : 'The Handshake Ritual'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors">{activeLang === 'vi' ? 'Bộ não hướng Tên miền' : 'Domain-Driven Brain'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors">{activeLang === 'vi' ? 'Điều phối Biệt đội' : 'Squad Orchestration'}</a></li>
              <li><a href="#breakthroughs" onClick={(e) => handleNavLink(e, 'breakthroughs')} className="hover:text-cyan-400 transition-colors">{activeLang === 'vi' ? 'Thu hoạch Tri thức' : 'Knowledge Harvest'}</a></li>
            </ul>
          </div>

          {/* Execution Modes Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">{t.footer.cols.exec}</h4>
            <ul className="space-y-2">
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors">SSE Daemon (Port 3344)</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors">Stdio OS Process</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors">Health Ping Endpoint</a></li>
              <li><a href="#cli" onClick={(e) => handleNavLink(e, 'cli')} className="hover:text-cyan-400 transition-colors">Electron Desktop GUI</a></li>
            </ul>
          </div>

          {/* Agent Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">{t.footer.cols.eco}</h4>
            <ul className="space-y-2">
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors">Autonomous Agents</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors">Claude Desktop Squads</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors">Antigravity AI Brain</a></li>
              <li><a href="#orchestration" onClick={(e) => handleNavLink(e, 'orchestration')} className="hover:text-cyan-400 transition-colors">PiperNet IoA Mesh</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Edge-to-Edge Divider Line & Bottom Copyright Bar */}
      <div className="border-subtle-t px-8 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
        <p>{t.footer.copyright}</p>
        <p className="text-cyan-400">
          {t.footer.status}
        </p>
      </div>

    </footer>
  );
};

export default Footer;
