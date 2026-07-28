import React from 'react';
import computerGif from '../../assets/computer.gif';

export const CtaBanner = () => {
  return (
    <div className="py-16 relative bg-[#0B0B11] border-subtle-b">
      <div className="w-full px-6 lg:px-12">
        
        {/* Banner Card - Computer GIF Background with Subtle Dark Overlay */}
        <div 
          className="relative p-10 sm:p-14 text-center border border-cyan-500/30 rounded-md overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${computerGif})` }}
        >
          
          {/* Dark Overlay for Ultra Readability */}
          <div className="absolute inset-0 bg-[#0B0B11]/80 backdrop-blur-[1px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              STANDALONE DAEMON READY
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Deploy Aevum OS <br />
              <span className="text-cyan-400">On Your System</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base max-w-md mx-auto">
              Run `aevum --transport sse` to instantly connect Cursor, Claude Desktop, and Antigravity IDE to your unified context engine.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a 
                href="https://open-vsx.org/extension/I2FLabs/aevum" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-electron"
              >
                <span>Download Aevum OS</span>
              </a>
              <a 
                href="https://open-vsx.org/extension/I2FLabs/aevum" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-ghost"
              >
                <span>Read Documentation</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
