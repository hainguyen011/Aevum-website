import React from 'react';
import { translations } from '../data/translations';

import logoImg from '../../assets/logos/AevumOS-transparent.webp';

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
    <footer className="bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-400 [html[data-theme='light']_&]:text-slate-600 relative z-10 w-full border-t border-white/[0.06] [html[data-theme='light']_&]:border-slate-200">
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
                <img src={logoImg} alt="Aevum OS Logo" width="24" height="24" className="w-6 h-6 object-contain [html[data-theme='light']_&]:brightness-0" />
                <span className="font-bold text-white [html[data-theme='light']_&]:text-slate-900 text-base tracking-tight font-display">AEVUM OS</span>
              </button>
            </div>
            <p className="text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-md text-xs leading-relaxed font-sans">
              {t.footer.brandDesc}
            </p>
            
            {/* Quick Text Links */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 pt-2 text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-mono text-xs">
              <button 
                onClick={() => onNavigate('pricing')} 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {t.navbar.pricing}
              </button>
              <button 
                onClick={() => onNavigate('docs')} 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {t.footer.links.docs}
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
              >
                {t.navbar.about}
              </button>
              <a 
                href="https://i2flabs.vercel.app/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="I2FLabs Official Website" 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors"
              >
                I2FLabs
              </a>
              <a 
                href="https://open-vsx.org/extension/I2FLabs/aevum" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Aevum Open VSX Extension" 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors"
              >
                {t.footer.links.openVsx}
              </a>
              <a 
                href="https://unikorn.vn/p/aevum" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Unikorn Product Hunt Page" 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors"
              >
                {t.footer.links.unikorn}
              </a>
              <a 
                href="https://github.com/hainguyen011" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Repository" 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="mailto:hainguyen011238@gmail.com" 
                aria-label="Email Aevum OS Support" 
                className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors" 
                title="hainguyen011238@gmail.com"
              >
                Mail
              </a>
            </div>
          </div>

          {/* Column 1: Overview & Digital Workforce */}
          <div className="space-y-3 font-sans">
            <h3 className="font-bold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-white/40 [html[data-theme='light']_&]:bg-slate-400 rounded-none inline-block"></span>
              {t.footer.cols.overview || (activeLang === 'vi' ? 'Tổng quan & Tác tử' : 'Overview & Agents')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#mission" 
                  onClick={(e) => handleNavLink(e, 'mission')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Mục tiêu cốt lõi' : 'Core Mission'}
                </a>
              </li>
              <li>
                <a 
                  href="#value-props" 
                  onClick={(e) => handleNavLink(e, 'value-props')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Vượt xa khung chat' : 'Value Pillars'}
                </a>
              </li>
              <li>
                <a 
                  href="#co-evolution" 
                  onClick={(e) => handleNavLink(e, 'co-evolution')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Biệt đội kiến tạo' : 'Interdisciplinary Swarm'}
                </a>
              </li>
              <li>
                <a 
                  href="#workflow" 
                  onClick={(e) => handleNavLink(e, 'workflow')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Quy trình 3 bước' : '3-Step Workflow'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Proof & Real Metrics */}
          <div className="space-y-3 font-sans">
            <h3 className="font-bold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-white/40 [html[data-theme='light']_&]:bg-slate-400 rounded-none inline-block"></span>
              {t.footer.cols.metrics || (activeLang === 'vi' ? 'Giá trị & Đo kiểm' : 'Proof & Metrics')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#metrics" 
                  onClick={(e) => handleNavLink(e, 'metrics')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? '6 Lợi ích & Đo kiểm' : '6 Verified Metrics'}
                </a>
              </li>
              <li>
                <a 
                  href="#metrics" 
                  onClick={(e) => handleNavLink(e, 'metrics')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Bảo tồn trí nhớ (99%)' : 'Living Memory Graph (99%)'}
                </a>
              </li>
              <li>
                <a 
                  href="#metrics" 
                  onClick={(e) => handleNavLink(e, 'metrics')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Kỷ luật Plan-First (66%)' : 'Plan-First Discipline (66%)'}
                </a>
              </li>
              <li>
                <a 
                  href="#metrics" 
                  onClick={(e) => handleNavLink(e, 'metrics')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Phân vùng CoW Sandbox' : 'Zero-Trust CoW Sandbox'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Ecosystem & Roadmap */}
          <div className="space-y-3 font-sans col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-white [html[data-theme='light']_&]:text-slate-900 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-1 h-2 bg-white/40 [html[data-theme='light']_&]:bg-slate-400 rounded-none inline-block"></span>
              {t.footer.cols.roadmap || (activeLang === 'vi' ? 'Hệ sinh thái & Lộ trình' : 'Ecosystem & Roadmap')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#ioa-roadmap" 
                  onClick={(e) => handleNavLink(e, 'ioa-roadmap')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Lộ trình Internet of Agents' : 'Internet of Agents (IoA)'}
                </a>
              </li>
              <li>
                <a 
                  href="#ioa-roadmap" 
                  onClick={(e) => handleNavLink(e, 'ioa-roadmap')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Con hào công nghệ R&D' : 'R&D Moat & Architecture'}
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleNavLink(e, 'faq')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5"
                >
                  {activeLang === 'vi' ? 'Giải đáp thắc mắc (FAQ)' : 'Practical FAQs'}
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('changelog')} 
                  className="hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-colors text-slate-300 [html[data-theme='light']_&]:text-slate-600 block py-0.5 text-left bg-transparent border-none p-0 cursor-pointer font-sans text-xs"
                >
                  {activeLang === 'vi' ? 'Tải xuống Desktop App' : 'Download Desktop App'}
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F1F5F9] border-t border-white/[0.06] [html[data-theme='light']_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-mono text-[11px]">
          {/* Copyright text */}
          <p className="text-center sm:text-left m-0 text-slate-400 [html[data-theme='light']_&]:text-slate-600 text-xs sm:text-[11px] leading-relaxed">
            {t.footer.copyright}
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center sm:justify-end gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors py-1 cursor-pointer bg-transparent border-0 font-mono text-[11px]"
            >
              {activeLang === 'vi' ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </button>
            <span className="text-white/20 [html[data-theme='light']_&]:text-slate-400 select-none">/</span>
            <button
              onClick={() => onNavigate('terms')}
              className="text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-600 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors py-1 cursor-pointer bg-transparent border-0 font-mono text-[11px]"
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
