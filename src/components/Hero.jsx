import React, { useState } from 'react';
import asciiAsset from '../../assets/logos/Aevum-ascii.png';

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const commandText = "aevum --workspace ./ --transport sse --port 3344";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 border-subtle-b">
      
      {/* Left Cell: Text Content */}
      <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 border-subtle-b lg:border-b-0 lg:border-subtle-r flex flex-col justify-between space-y-8 bg-[#0B0B11]">
        <div className="space-y-6">
          
          {/* Sub-brand / Tagline */}
          <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">
            BY <span className="text-slate-300 font-bold">I2FLABS VIET NAM</span> • STANDALONE AGENTIC OPERATING SYSTEM
          </div>

          {/* Main Title - High-Impact Solid Cyan Background Highlight */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] leading-[1.15] font-display">
            Agentic OS <br />
            <span className="bg-[#00f0ff] text-[#0B0B11] px-3 py-0.5 inline-block font-extrabold mt-1.5">
              & External Brain
            </span>
          </h1>

          {/* Description - Standalone OS Positioning */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            Aevum OS is an independent workspace Operating System and External Brain — housing domain-driven planning, self-healing memory graphs, and autonomous multi-agent squad orchestration completely decoupled from traditional editors.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="https://open-vsx.org/extension/I2FLabs/aevum" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-electron"
            >
              Download Aevum OS
            </a>
            <a 
              href="https://open-vsx.org/extension/I2FLabs/aevum" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-ghost"
            >
              Read Documentation
            </a>
          </div>

        </div>

        {/* CLI Exec Command Strip */}
        <div className="pt-4 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] text-slate-500 uppercase">Start OS Kernel Daemon:</span>
            <button onClick={handleCopy} className="text-cyan-400 hover:text-cyan-300 text-[11px]">
              {copied ? "✓ Copied" : "Copy Command"}
            </button>
          </div>
          <div className="bg-[#030407] border-subtle p-3 rounded-md text-slate-200 text-xs overflow-x-auto flex items-center justify-between">
            <span className="text-cyan-400 font-bold mr-2">$</span>
            <span className="flex-1 select-all">{commandText}</span>
          </div>
        </div>

      </div>

      {/* Right Cell: Raw Aevum ASCII Graphic */}
      <div className="lg:col-span-5 p-6 sm:p-8 flex items-center justify-center relative min-h-[460px] bg-[#0B0B11]">
        <img 
          src={asciiAsset} 
          alt="Aevum ASCII Graphic" 
          className="w-full max-w-[440px] h-auto object-contain mix-blend-screen opacity-95"
        />
      </div>

    </div>
  );
};
