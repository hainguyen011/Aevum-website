import React from 'react';

export const BentoGrid = () => {
  return (
    <div id="breakthroughs" className="border-subtle-b bg-[#0B0B11]">
      
      {/* Section Header Cell */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11]">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          Agentic OS Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          Core Breakthroughs of <span className="text-cyan-400">Aevum OS</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          An independent Agentic Operating System housing domain-driven context memory, handshake rituals, and multi-agent squad orchestration.
        </p>
      </div>

      {/* 2x2 Grid Layout with faint 1px adjacent borders (Zero Duplicate Borders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Breakthrough 1: Row 1 Left */}
        <div className="p-8 sm:p-10 border-subtle-b lg:border-subtle-r flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">The Handshake Ritual & Soul Sync</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Aevum OS acts as a standalone daemon. On startup, it emits `.aevum/signal.json` and synchronizes the Agent's "soul" via `aevum_submit_ack` completely independent of traditional editor APIs.
            </p>
          </div>

          <div className="bg-[#030407] p-3.5 rounded-md border-subtle font-mono text-xs space-y-2">
            <div className="text-cyan-400 text-[11px] font-bold">
              OS KERNEL: Signal Emitted (.aevum/signal.json)
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">submit_ack</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">init_persona</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">resonance_trail</span>
            </div>
          </div>
        </div>

        {/* Breakthrough 2: Row 1 Right */}
        <div className="p-8 sm:p-10 border-subtle-b flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">Domain-Driven External Brain (DDD)</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Establishes a permanent living memory hierarchy for the workspace: Domains (architectural pillars), Features (functional clusters), Plans (mission documents), and Personas.
            </p>
          </div>

          <div className="code-box">
            <div className="code-header">
              <span className="text-[11px] font-mono text-cyan-400">.aevum/domains/identity/config.json</span>
              <span className="text-[10px] text-slate-500">DDD OS Kernel</span>
            </div>
            <div className="p-3 text-[11px] font-mono leading-relaxed">
              <p className="text-slate-500">// External Brain Architecture</p>
              <p className="text-cyan-400">export const <span className="text-slate-200">identityDomain</span> = &#123;</p>
              <p className="pl-4 text-emerald-400">features: <span className="text-slate-300">["auth_flow", "sso_provider"],</span></p>
              <p className="pl-4 text-emerald-400">activePlan: <span className="text-slate-300">"PLAN_AUTH_V2.md"</span></p>
              <p className="text-cyan-400">&#125;;</p>
            </div>
          </div>
        </div>

        {/* Breakthrough 3: Row 2 Left */}
        <div className="p-8 sm:p-10 border-subtle-b lg:border-b-0 lg:border-subtle-r flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">Autonomous Squad OS Orchestration</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Coordinates a team of autonomous AI agents. Use `aevum_squad_handoff` to transfer tasks between specialized personas (Architect to Developer or Security Specialist) with 100% context persistence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded bg-white/[0.02] border-subtle text-slate-300">
              [+] Architect Persona
            </div>
            <div className="p-2 rounded bg-white/[0.02] border-subtle text-slate-300">
              [+] Developer Persona
            </div>
            <div className="p-2 rounded bg-white/[0.02] border-subtle text-slate-300">
              [+] Security Specialist
            </div>
            <div className="p-2 rounded bg-white/[0.02] border-subtle text-slate-300">
              [+] Squad Huddle Session
            </div>
          </div>
        </div>

        {/* Breakthrough 4: Row 2 Right */}
        <div className="p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#0e0f17] transition-colors">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">Living Memory & PiperNet (IoA)</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              When a plan is completed, Aevum OS harvests lessons learned into Global Memory. Connect to PiperNet (Internet of Agents) to query collective procedural intelligence across agent networks.
            </p>
          </div>

          <div className="bg-[#030407] p-3 rounded-md border-subtle font-mono text-xs space-y-1 text-[11px]">
            <div className="text-emerald-400 font-bold">OS Memory Kernel Active</div>
            <div className="text-slate-400 flex justify-between">
              <span>Proactive Thought Stream</span>
              <span className="text-cyan-400">Recording Live</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span>PiperNet IoA Connectivity</span>
              <span className="text-slate-300">Verified</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
