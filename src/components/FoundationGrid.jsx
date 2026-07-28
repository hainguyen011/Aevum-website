import React from 'react';

export const FoundationGrid = () => {
  return (
    <div id="cli" className="border-subtle-b bg-[#0B0B11]">
      
      {/* Section Title */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11]">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          Standardized Protocol Suite
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          Aevum Native <span className="text-cyan-400">MCP Tooling Reference</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          Specialized Model Context Protocol tools exposing domain creation, squad coordination, and persistent fact retrieval.
        </p>
      </div>

      {/* 2 Grid Columns (Zero duplicate bottom borders) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Mode A: Structure & Planning Tools */}
        <div className="p-8 border-subtle-r space-y-4">
          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
              STRUCTURE & PLANNING
            </div>
            <h3 className="text-base font-bold text-white font-display">Domain & Plan Tools</h3>
            <p className="text-xs text-slate-400 mt-1">Atomic creation of DDD entities and state-tracked mission documents</p>
          </div>

          <div className="code-box">
            <div className="code-header">
              <span className="text-[11px] font-mono text-slate-400">
                Key MCP Tools
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Structure API</span>
            </div>
            <div className="p-3 text-xs font-mono text-slate-200 space-y-1.5">
              <p className="text-cyan-400">• aevum_create_domain <span className="text-slate-500">(name, features)</span></p>
              <p className="text-cyan-400">• aevum_create_plan <span className="text-slate-500">(domain, title, steps)</span></p>
              <p className="text-emerald-400">• aevum_update_plan_step <span className="text-slate-500">(step_id, status)</span></p>
              <p className="text-emerald-400">• aevum_capture_evidence <span className="text-slate-500">(logs, screenshot)</span></p>
            </div>
          </div>
        </div>

        {/* Mode B: Squad & Memory Tools */}
        <div className="p-8 space-y-4">
          <div>
            <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
              SQUAD & MEMORY
            </div>
            <h3 className="text-base font-bold text-white font-display">Squad & Living Memory Tools</h3>
            <p className="text-xs text-slate-400 mt-1">Multi-agent coordination, persona initialization, and semantic retrieval</p>
          </div>

          <div className="code-box">
            <div className="code-header">
              <span className="text-[11px] font-mono text-slate-400">
                Key MCP Tools
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Squad & Memory API</span>
            </div>
            <div className="p-3 text-xs font-mono text-slate-200 space-y-1.5">
              <p className="text-cyan-400">• aevum_squad_handoff <span className="text-slate-500">(from_persona, to_persona)</span></p>
              <p className="text-cyan-400">• aevum_squad_huddle <span className="text-slate-500">(topic, personas)</span></p>
              <p className="text-emerald-400">• aevum_add_memory <span className="text-slate-500">(fact, category)</span></p>
              <p className="text-emerald-400">• aevum_submit_ack <span className="text-slate-500">(handshake_token)</span></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
