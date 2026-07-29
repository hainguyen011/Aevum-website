import { useState, useEffect } from 'react';
import rawAsciiArt from '../../assets/Ascii art/ascii-art (1).txt?raw';

export const About = ({ activeLang }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  // TUI Command Menu Options Dictionary (Bilingual - Tight authentic terminal spacing)
  const commands = [
    {
      id: 'overview',
      cmd: 'aevum-os help --overview',
      desc: activeLang === 'vi' ? 'Aevum OS là gì?' : 'What is Aevum OS?',
      content: activeLang === 'vi' 
        ? `[AEVUM AGENTIC OPERATING SYSTEM OVERVIEW]\n\nAevum OS là Bộ Não Ngoại Vi (External Brain) độc lập dành cho các AI Agent.\nBộ não này tách biệt toàn bộ Prompt Caching, Living Memory Graph và Persona khỏi IDE sandbox, giúp AI Agent duy trì trí nhớ dài hạn và tự động hóa công việc trên mọi công cụ (Cursor, VS Code, Claude Desktop, CLI).`
        : `[AEVUM AGENTIC OPERATING SYSTEM OVERVIEW]\n\nAevum OS is an independent, decoupled External Brain for AI Agents.\nIt decouples Prompt Caching, Living Memory Graph, and Persona configurations from IDE sandboxes, empowering AI agents with long-term memory across any environment (Cursor, VS Code, Claude Desktop, CLI).`
    },
    {
      id: 'genesis',
      cmd: 'aevum-os genesis --story',
      desc: activeLang === 'vi' ? 'Nỗi đau & Hành trình I2FLabs' : 'Story & Context Battle',
      content: activeLang === 'vi'
        ? `[CÂU CHUYỆN KHAI SINH TẠI I2FLABS VIỆT NAM]\n\nLập trình cùng AI ngày nay giống như việc cộng tác với một kỹ sư thiên tài nhưng bị mất trí nhớ ngắn hạn sau mỗi vài phút.\nMỗi lần đổi dự án hoặc chuyển IDE, toàn bộ ngữ cảnh, quyết định kiến trúc và bài học debug đều bay màu. I2FLabs đã phát minh ra Aevum OS - một daemon chạy ngầm trên máy developer giữ vững Living Memory Graph để cứu các AI Agent khỏi hội chứng mất trí nhớ.`
        : `[THE GENESIS STORY AT I2FLABS VIETNAM]\n\nPair-programming with AI today feels like collaborating with a brilliant engineer who suffers short-term amnesia every few minutes.\nEvery time you swap projects or switch IDEs, crucial context, architectural decisions, and painful debug lessons evaporate. I2FLabs built Aevum OS — a local background daemon holding a permanent Living Memory Graph to save AI agents from context amnesia.`
    },
    {
      id: 'features',
      cmd: 'aevum-os features --pillars',
      desc: activeLang === 'vi' ? '4 Trụ cột Kiến trúc' : '4 Architectural Pillars',
      content: activeLang === 'vi'
        ? `[AEVUM OS 4 TRỤ CỘT KIẾN TRÚC]\n\n01. Decoupled Memory Vault: Lưu trữ ký ức dài hạn độc lập kết nối qua chuẩn mở MCP.\n02. Plan-First Pipeline: Quy trình lập kế hoạch Domain-Driven trước khi viết dòng code đầu tiên.\n03. Living Memory Graph: Đồ thị tri thức tự chữa lành thu hoạch kinh nghiệm sau mỗi task.\n04. IoA Squad Protocol: Giao thức kết nối đội ngũ Agent đa chuyên môn qua PiperNet.`
        : `[AEVUM OS 4 ARCHITECTURAL PILLARS]\n\n01. Decoupled Memory Vault: Persistent memory graph synced seamlessly via open MCP protocol.\n02. Plan-First Pipeline: Domain-driven planning cycle before a single line of code is written.\n03. Living Memory Graph: Self-healing engineering knowledge graph harvested after every task.\n04. IoA Squad Protocol: Peer-to-peer agent squad collaboration protocol over PiperNet.`
    },
    {
      id: 'squad',
      cmd: 'aevum-os squad --agents',
      desc: activeLang === 'vi' ? 'Đội ngũ Agent & PiperNet (IoA)' : 'Autonomous Squad & IoA',
      content: activeLang === 'vi'
        ? `[ĐỘI NGŨ AI AGENT VÀ MẠNG LƯỚI PIPERNET (IoA)]\n\nAevum OS điều phối đội ngũ Agent đa vai trò (Architect, Coder, Reviewer, Security Auditor).\nCác Agent giao tiếp qua giao thức PiperNet để tự động phân công task, kiểm duyệt code và truyền tải tri thức mà không cần con người can thiệp thủ công.`
        : `[AUTONOMOUS SQUAD & PIPERNET NETWORK (IoA)]\n\nAevum OS orchestrates specialized agent personas (Architect, Coder, Reviewer, Security Auditor).\nAgents communicate over the PiperNet protocol to handoff tasks, conduct peer code reviews, and sync memory graphs autonomously.`
    },
    {
      id: 'quickstart',
      cmd: 'aevum-os quickstart --run',
      desc: activeLang === 'vi' ? 'Lệnh Khởi chạy Daemon' : 'Commands & Setup',
      content: activeLang === 'vi'
        ? `[LỆNH KHỞI CHẠY NHANH CỦA AEVUM OS]\n\n$ npm install -g @aevum/os-kernel\n$ aevum-os daemon start --port 3344\n$ aevum-os mcp attach --target cursor\n\n[STATUS: Connected to Local Daemon on port 3344 • Memory Vault Active]`
        : `[AEVUM OS QUICKSTART COMMANDS]\n\n$ npm install -g @aevum/os-kernel\n$ aevum-os daemon start --port 3344\n$ aevum-os mcp attach --target cursor\n\n[STATUS: Connected to Local Daemon on port 3344 • Memory Vault Active]`
    }
  ];

  const activeCommand = commands[selectedCommandIndex];

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // 1. Initial Loading Boot (~2.5s)
  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeLang]);

  // 2. Typing animation for selected command
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTypingComplete(false);
  }, [selectedCommandIndex, activeLang]);

  useEffect(() => {
    if (!isLoading && activeCommand) {
      const fullText = activeCommand.content;
      if (currentIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + fullText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 8);
        return () => clearTimeout(timeout);
      } else {
        setIsTypingComplete(true);
      }
    }
  }, [isLoading, currentIndex, activeCommand]);

  // Keyboard navigation: [1-5] keys and [Up/Down] arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) return;
      if (e.key >= '1' && e.key <= '5') {
        setSelectedCommandIndex(parseInt(e.key, 10) - 1);
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev + 1) % commands.length);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev - 1 + commands.length) % commands.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, commands.length]);

  return (
    <div id="about" className="w-full bg-[#0B0B11] text-slate-100 min-h-[calc(100vh-73px)] font-sans">
      
      {isLoading ? (
        /* 2.5s Retro Loading Screen with Pure Text ASCII Logo (100% Native Transparency, Compact Viewport) */
        <div className="border-subtle-b bg-[#0B0B11] py-10 px-4 h-[520px] max-h-[75vh] flex flex-col items-center justify-center text-center font-mono relative overflow-hidden">
          
          {/* Subtle CRT Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px'
            }}
          ></div>

          {/* Rendered Pure Text ASCII Art Logo */}
          <div className="relative z-10 space-y-4 max-w-xl mx-auto flex flex-col items-center">
            <pre className="whitespace-pre text-white font-mono text-[9px] sm:text-[10px] md:text-xs font-bold leading-[1.05] tracking-tight overflow-hidden text-center select-none">
              {rawAsciiArt}
            </pre>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                INITIALIZING AEVUM TTY SHELL... {loadingProgress}%
              </div>
              
              {/* Terminal Progress Bar */}
              <div className="w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div 
                  className="h-full bg-white transition-all duration-75 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Authentic Transparent Terminal UI (TUI) Screen - Compact Line Spacing */
        <div className="border-subtle-b bg-[#0B0B11] p-6 sm:p-10 lg:p-14 text-left font-mono relative overflow-hidden min-h-[550px]">
          
          {/* Subtle CRT Scanline Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px'
            }}
          ></div>

          {/* Main Terminal Shell Container */}
          <div className="relative z-10 space-y-6 max-w-4xl w-full mx-auto text-left font-mono">
            
            {/* Terminal Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold tracking-wider">AEVUM TTY INTERACTIVE SHELL v1.0.0</span>
              </div>
              <div className="flex items-center text-[11px] text-slate-500 font-mono">
                <span>Use [↑/↓] arrows, keys [1-5] or click options</span>
              </div>
            </div>

            {/* Pure TUI Command Menu List */}
            <div className="space-y-2 font-mono">
              <div className="text-[11px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                SELECT COMMAND TO EXECUTE:
              </div>

              <div className="space-y-0.5 pt-1 font-mono text-xs sm:text-sm">
                {commands.map((item, idx) => {
                  const isSelected = selectedCommandIndex === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCommandIndex(idx)}
                      className={`group flex items-center gap-3 py-1 px-2 rounded cursor-pointer transition-colors font-mono ${
                        isSelected
                          ? 'text-white font-bold bg-white/5'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-emerald-400 font-bold w-4 text-center">
                        {isSelected ? '>' : ' '}
                      </span>
                      <span className={isSelected ? 'text-white font-bold' : 'text-slate-400'}>
                        [{idx + 1}] $ {item.cmd}
                      </span>
                      <span className="text-slate-600 text-xs hidden md:inline">
                        • {item.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Command Output Window (Tight Authentic Terminal Line Spacing) */}
            <div className="space-y-3 pt-3 font-mono">
              
              {/* Command Execution Line */}
              <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-emerald-400">
                <span className="font-bold text-white">$ {activeCommand.cmd}</span>
              </div>

              {/* Pure Transparent Compact Output Display */}
              <div className="pt-1 min-h-[160px]">
                <pre className="whitespace-pre-wrap text-left text-white font-mono text-xs sm:text-sm md:text-base leading-[1.35] tracking-tight">
                  {displayedText}
                  <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse align-middle"></span>
                </pre>

                {isTypingComplete && (
                  <div className="pt-4 text-xs text-slate-500 uppercase tracking-widest animate-pulse font-mono text-left">
                    [ EXECUTION COMPLETE • USE ARROWS [↑/↓] OR PRESS 1-5 TO EXECUTE ANOTHER COMMAND ]
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default About;
