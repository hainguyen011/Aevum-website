import React from 'react';
import { Search, Github, Twitter, Disc as Discord, ChevronDown, Globe } from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';

export const Navbar = () => {
  return (
    <div className="w-full border-subtle-b flex items-center justify-between px-6 lg:px-10 py-4 bg-[#0B0B11]">
      
      {/* Left Cell: Logo + Main Navigation */}
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2.5 text-decoration-none group">
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
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#breakthroughs" className="hover:text-cyan-400 transition-colors">Breakthroughs</a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">OS Architecture</a>
          <a href="#orchestration" className="hover:text-cyan-400 transition-colors">Agentic Ecosystem</a>
          <a href="#cli" className="hover:text-cyan-400 transition-colors">OS Kernel & Daemon</a>
        </nav>
      </div>

      {/* Right Cell: Search + Social Links */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="hidden sm:flex items-center bg-white/[0.02] border-subtle rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono gap-2 hover:border-white/15 transition-all cursor-pointer">
          <Search size={13} className="text-slate-500" />
          <span>Search OS Tools</span>
          <kbd className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-slate-300">Ctrl K</kbd>
        </div>

        {/* Language selector */}
        <button className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors font-mono">
          <Globe size={14} />
          <ChevronDown size={12} />
        </button>

        {/* Social Links */}
        <div className="flex items-center gap-3 text-slate-400">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <Twitter size={15} />
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
