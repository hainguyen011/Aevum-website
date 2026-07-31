import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Terminal, Cpu, BookOpen, Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { translations } from '../data/translations';

export const SearchModal = ({ isOpen, onClose, onNavigate, activeLang }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const t = translations[activeLang] || translations.en;
  const isVi = activeLang === 'vi';

  // Search Data Index
  const searchItems = [
    // Pages
    {
      id: 'page-home',
      title: isVi ? 'Trang chủ Aevum OS' : 'Aevum OS Home',
      category: isVi ? 'Trang' : 'Pages',
      icon: Layers,
      action: () => { onNavigate('landing'); onClose(); }
    },
    {
      id: 'page-docs',
      title: isVi ? 'Tài liệu Kỹ thuật (Docs)' : 'Technical Documentation',
      category: isVi ? 'Trang' : 'Pages',
      icon: BookOpen,
      action: () => { onNavigate('docs'); onClose(); }
    },
    {
      id: 'page-about',
      title: isVi ? 'Giới thiệu & Câu chuyện Sản phẩm' : 'About & Product Story',
      category: isVi ? 'Trang' : 'Pages',
      icon: Cpu,
      action: () => { onNavigate('about'); onClose(); }
    },

    // Subsystems & Architecture
    {
      id: 'sub-kernel',
      title: isVi ? 'Nhân OS Độc lập & Daemon Server' : 'Standalone OS Kernel & Daemon Process',
      category: isVi ? 'Kiến trúc' : 'Architecture',
      icon: Terminal,
      action: () => { jumpToAnchor('breakthroughs'); }
    },
    {
      id: 'sub-handshake',
      title: isVi ? 'Nghi thức Bắt tay (Handshake Ritual & Soul Sync)' : 'Handshake Ritual & Soul Sync Protocol',
      category: isVi ? 'Kiến trúc' : 'Architecture',
      icon: ShieldCheck,
      action: () => { jumpToAnchor('breakthroughs'); }
    },
    {
      id: 'sub-ddd',
      title: isVi ? 'Bộ nào Ngoại vi hướng Tên miền (DDD Brain)' : 'Domain-Driven External Brain (DDD)',
      category: isVi ? 'Kiến trúc' : 'Architecture',
      icon: Layers,
      action: () => { jumpToAnchor('breakthroughs'); }
    },
    {
      id: 'sub-squad',
      title: isVi ? 'Điều phối Biệt đội Agent Tự trị (Squad OS)' : 'Autonomous Multi-Agent Squad Orchestration',
      category: isVi ? 'Kiến trúc' : 'Architecture',
      icon: Zap,
      action: () => { jumpToAnchor('orchestration'); }
    },
    {
      id: 'sub-pipernet',
      title: isVi ? 'Mạng lưới Trí tuệ Tập thể P2P (PiperNet IoA)' : 'Decentralized Collective Wisdom Mesh (PiperNet)',
      category: isVi ? 'Kiến trúc' : 'Architecture',
      icon: Cpu,
      action: () => { jumpToAnchor('orchestration'); }
    },

    // Core MCP Tools
    {
      id: 'mcp-ack',
      title: 'aevum_submit_ack — Handshake Token Verification',
      category: 'MCP Tools',
      icon: Terminal,
      action: () => { jumpToAnchor('cli'); }
    },
    {
      id: 'mcp-domain',
      title: 'aevum_create_domain — Create DDD Architectural Domain',
      category: 'MCP Tools',
      icon: Terminal,
      action: () => { jumpToAnchor('cli'); }
    },
    {
      id: 'mcp-plan',
      title: 'aevum_create_plan — Generate Domain Execution Plan',
      category: 'MCP Tools',
      icon: Terminal,
      action: () => { jumpToAnchor('cli'); }
    },
    {
      id: 'mcp-handoff',
      title: 'aevum_squad_handoff — Transfer Task Between Personas',
      category: 'MCP Tools',
      icon: Terminal,
      action: () => { jumpToAnchor('cli'); }
    },
    {
      id: 'mcp-memory',
      title: 'aevum_add_memory — Persist Learnings to Living Memory',
      category: 'MCP Tools',
      icon: Terminal,
      action: () => { jumpToAnchor('cli'); }
    }
  ];

  const jumpToAnchor = (targetId) => {
    onNavigate('landing');
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -40, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  // Filter items based on query
  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation listener (Arrow Up/Down, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Backdrop overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Command Palette Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0B0B11] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 font-sans">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search size={18} className="text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder={isVi ? "Tìm kiếm công cụ MCP, kiến trúc, tài liệu..." : "Search MCP tools, architecture, docs..."}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-medium focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-500 hover:text-white mr-2">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white/10 px-2 py-1 rounded text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <IconComp size={15} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                    <span className="font-medium truncate">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight size={13} className="text-cyan-400" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              {isVi ? "Không tìm thấy kết quả phù hợp" : "No matching results found"}
            </div>
          )}
        </div>

        {/* Command Palette Footer Hints */}
        <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-white/5 px-1 py-0.5 rounded">↑↓</kbd> {isVi ? "chọn" : "navigate"}</span>
            <span><kbd className="bg-white/5 px-1 py-0.5 rounded">↵</kbd> {isVi ? "mở" : "select"}</span>
          </div>
          <span>Aevum OS Command Palette</span>
        </div>

      </div>
    </div>
  );
};

export default SearchModal;
