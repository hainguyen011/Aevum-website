import React from 'react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0B11] text-slate-400 text-xs">
      
      {/* Main Footer Links */}
      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Aevum OS Logo" className="w-6 h-6 object-contain" />
              <span className="font-bold text-white text-base tracking-tight font-display">AEVUM OS</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Standalone Agentic Operating System & Workspace External Brain developed by I2FLabs Viet Nam. Completely decoupled from traditional editors.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-slate-400 font-mono text-[11px]">
              <a href="https://open-vsx.org/extension/I2FLabs/aevum" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Open VSX (v1.7)</a>
              <a href="https://unikorn.vn/p/aevum" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Unikorn Article</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
            </div>
          </div>

          {/* Architecture Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">OS Architecture</h4>
            <ul className="space-y-2">
              <li><a href="#breakthroughs" className="hover:text-cyan-400 transition-colors">The Handshake Ritual</a></li>
              <li><a href="#breakthroughs" className="hover:text-cyan-400 transition-colors">Domain-Driven Brain</a></li>
              <li><a href="#breakthroughs" className="hover:text-cyan-400 transition-colors">Squad Orchestration</a></li>
              <li><a href="#breakthroughs" className="hover:text-cyan-400 transition-colors">Knowledge Harvest</a></li>
            </ul>
          </div>

          {/* Execution Modes Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">OS Execution Modes</h4>
            <ul className="space-y-2">
              <li><a href="#cli" className="hover:text-cyan-400 transition-colors">SSE Daemon (Port 3344)</a></li>
              <li><a href="#cli" className="hover:text-cyan-400 transition-colors">Stdio OS Process</a></li>
              <li><a href="#cli" className="hover:text-cyan-400 transition-colors">Health Ping Endpoint</a></li>
              <li><a href="#cli" className="hover:text-cyan-400 transition-colors">Electron Desktop GUI</a></li>
            </ul>
          </div>

          {/* Agent Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Agent Ecosystem</h4>
            <ul className="space-y-2">
              <li><a href="#orchestration" className="hover:text-cyan-400 transition-colors">Autonomous Agents</a></li>
              <li><a href="#orchestration" className="hover:text-cyan-400 transition-colors">Claude Desktop Squads</a></li>
              <li><a href="#orchestration" className="hover:text-cyan-400 transition-colors">Antigravity AI Brain</a></li>
              <li><a href="#orchestration" className="hover:text-cyan-400 transition-colors">PiperNet IoA Mesh</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Edge-to-Edge Divider Line & Bottom Copyright Bar */}
      <div className="border-subtle-t px-8 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
        <p>Copyright © 2026 I2FLabs Viet Nam. Autonomous Agentic Operating System.</p>
        <p className="text-cyan-400">
          Aevum OS Standalone MCP Daemon • Kernel Active
        </p>
      </div>

    </footer>
  );
};
