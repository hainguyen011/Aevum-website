import { useState, useEffect, useMemo } from 'react';
import logoImg from '../../assets/logos/AevumOS-transparent.png';

export const About = ({ activeLang }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Hierarchical TUI Folder & Command Data with Enriched High-Value Technical Content
  const navigationData = useMemo(() => ({
    title: 'ROOT',
    items: [
      {
        id: 'aevum-journey',
        type: 'folder',
        code: '1.',
        label: activeLang === 'vi' ? '1./ Aevum Journey' : '1./ Aevum Journey',
        desc: activeLang === 'vi' ? 'Hành trình & Trụ cột Kiến trúc' : 'Journey & Architectural Pillars',
        children: {
          title: 'Aevum Journey',
          items: [
            {
              id: 'overview',
              type: 'cmd',
              code: '1.1/',
              cmd: 'aevum-os help --overview',
              label: activeLang === 'vi' ? '1.1/ Aevum OS là gì?' : '1.1/ What is Aevum OS?',
              desc: activeLang === 'vi' ? 'Tổng quan hệ điều hành AI Agent' : 'Decoupled External Brain Overview',
              content: activeLang === 'vi' 
                ? `[AEVUM AGENTIC OPERATING SYSTEM - OVERVIEW]\n\nAevum OS là Hệ điều hành Bộ Não Ngoại Vi (External Brain) độc lập dành cho các AI Agent thế hệ mới.\n\n► VẤN ĐỀ CỐT LÕI (CONTEXT AMNESIA):\nCác AI Agent ngày nay chạy trong môi trường sandbox của IDE (Cursor, VS Code, Windsurf) bị mất trí nhớ ngắn hạn liên tục mỗi khi reset context window hoặc đổi dự án. Toàn bộ quyết định kiến trúc, bài học debug và quy trình làm việc đều tan biến.\n\n► GIẢI PHÁP KỸ THUẬT (AEVUM EXTERNAL BRAIN):\n01. Tách biệt hoàn toàn Prompt Caching, Living Memory Graph và Persona khỏi IDE sandbox.\n02. Daemon chạy ngầm liên tục lưu trữ Ký ức Dài hạn (Long-term Memory) ở định dạng local vault mã hóa.\n03. Cung cấp chuẩn kết nối mở MCP (Model Context Protocol) cho mọi công cụ (Cursor, VS Code, Claude Desktop, CLI).\n04. Tự động hóa quá trình lập kế hoạch (Plan-First) trước khi tiến hành viết code.\n\n[ARCHITECTURE: Local Daemon • MCP Protocol Active • Memory Loss: 0%]`
                : `[AEVUM AGENTIC OPERATING SYSTEM - OVERVIEW]\n\nAevum OS is an independent Decoupled External Brain for next-gen AI Engineering Agents.\n\n► THE CORE PAIN POINT (CONTEXT AMNESIA):\nCurrent AI agents embedded inside IDE sandboxes (Cursor, VS Code, Windsurf) suffer continuous short-term amnesia whenever the context window resets or workspace changes. Crucial architectural decisions, debug logs, and domain context evaporate.\n\n► THE TECHNICAL SOLUTION (AEVUM EXTERNAL BRAIN):\n01. Decouples Prompt Caching, Living Memory Graph, and Agent Personas from IDE sandboxes.\n02. Runs a lightweight local daemon persisting Long-Term Memory in an encrypted local vault.\n03. Exposes standard MCP (Model Context Protocol) endpoints for any client (Cursor, VS Code, Claude Desktop, CLI).\n04. Enforces Plan-First domain-driven engineering pipelines prior to code synthesis.\n\n[ARCHITECTURE: Local Daemon • MCP Protocol Active • Memory Loss: 0%]`
            },
            {
              id: 'features',
              type: 'cmd',
              code: '1.2/',
              cmd: 'aevum-os features --pillars',
              label: activeLang === 'vi' ? '1.2/ 4 Trụ cột Kiến trúc' : '1.2/ 4 Architectural Pillars',
              desc: activeLang === 'vi' ? 'Decoupled Vault, Plan-First, Memory Graph, IoA Squad' : 'Decoupled Vault, Plan-First, Memory Graph, IoA Squad',
              content: activeLang === 'vi'
                ? `[AEVUM OS - 4 TRỤ CỘT KIẾN TRÚC HỆ THỐNG]\n\n01. DECOUPLED MEMORY VAULT:\n    • Lưu trữ đồ thị ký ức dài hạn dưới dạng local database bảo mật trên máy developer.\n    • Cho phép AI Agent truy xuất lịch sử refactor, nguyên nhân lỗi và quy chuẩn code tức thì.\n\n02. PLAN-FIRST PIPELINE:\n    • Buộc AI Agent thực hiện bước lập kế hoạch kiến trúc (Domain-Driven Plan) trước khi ghi file.\n    • Giảm 90% rủi ro tạo ra code thừa, sai lệch kiến trúc hoặc tự ý thay đổi file không liên quan.\n\n03. LIVING MEMORY GRAPH:\n    • Đồ thị tri thức tự chữa lành (Self-Healing Graph) thu hoạch bài học kinh nghiệm sau mỗi task.\n    • Kết nối các khái niệm, quy tắc dự án và lưu lại các quy chuẩn của đội ngũ phát triển.\n\n04. IOA SQUAD PROTOCOL (INTERNET OF AGENTS):\n    • Giao thức peer-to-peer cho phép đội ngũ Agent đa chuyên môn (Architect, Coder, Auditor) phối hợp.\n    • Tự động phân công công việc, giao tiếp qua PiperNet và kiểm duyệt chéo chất lượng code.\n\n[STATUS: 4/4 Pillars Operational • Latency: <2ms • Encryption: AES-256]`
                : `[AEVUM OS - 4 ARCHITECTURAL PILLARS]\n\n01. DECOUPLED MEMORY VAULT:\n    • Stores persistent long-term engineering memory graph in a secure local developer database.\n    • Enables instant retrieval of refactor history, root-cause fixes, and code guidelines.\n\n02. PLAN-FIRST PIPELINE:\n    • Mandates AI agents to produce domain-driven architectural plans prior to writing source files.\n    • Reduces unnecessary code churn, hallucinated edits, and unexpected side effects by 90%.\n\n03. LIVING MEMORY GRAPH:\n    • Self-healing engineering knowledge graph harvesting actionable lessons after every completed task.\n    • Maps system concepts, project constraints, and preserves team-wide coding rules permanently.\n\n04. IOA SQUAD PROTOCOL (INTERNET OF AGENTS):\n    • Peer-to-peer protocol empowering multi-role agent squads (Architect, Coder, Auditor) to collaborate.\n    • Autonomous task handoff, peer code auditing, and knowledge sync over PiperNet network.\n\n[STATUS: 4/4 Pillars Operational • Latency: <2ms • Encryption: AES-256]`
            },
            {
              id: 'quickstart',
              type: 'cmd',
              code: '1.3/',
              cmd: 'aevum-os quickstart --run',
              label: activeLang === 'vi' ? '1.3/ Lệnh Khởi chạy' : '1.3/ Quickstart Setup',
              desc: activeLang === 'vi' ? 'Lệnh Khởi chạy Daemon & MCP Attach' : 'Daemon setup & MCP Attach',
              content: activeLang === 'vi'
                ? `[AEVUM OS - HƯỚNG DẪN KHỞI CHẠY & TÍCH HỢP TẬP TRUNG]\n\n► BƯỚC 1: CÀI ĐẶT AEVUM KERNEL DAEMON\n$ npm install -g @aevum/os-kernel\n$ aevum-os init --workspace ./my-project\n\n► BƯỚC 2: KHỞI CHẠY DAEMON BỘ NÃO NGOẠI VI\n$ aevum-os daemon start --port 3344 --vault ~/.aevum/vault\n[DAEMON] Running background process PID: 88412 • Listening on 127.0.0.1:3344\n\n► BƯỚC 3: KẾT NỐI CHUẨN MCP CHO CURSOR / VS CODE\n$ aevum-os mcp attach --target cursor --auto-sync\n[MCP] Target Cursor IDE detected at /Users/admin/.cursor/mcp.json\n[MCP] Successfully registered Aevum OS Server (58 active tools loaded)\n\n► BƯỚC 4: KIỂM TRA TRẠNG THÁI KẾT NỐI\n$ aevum-os status\n✔ Daemon: ACTIVE (Port 3344)\n✔ Memory Graph: HYDRATED (1,420 nodes)\n✔ MCP Handshake: CONFIRMED (Cursor IDE)\n\n[READY: Aevum OS External Brain is fully protecting your AI context window]`
                : `[AEVUM OS - QUICKSTART & INTEGRATION GUIDE]\n\n► STEP 1: INSTALL AEVUM KERNEL DAEMON\n$ npm install -g @aevum/os-kernel\n$ aevum-os init --workspace ./my-project\n\n► STEP 2: LAUNCH EXTERNAL BRAIN BACKGROUND DAEMON\n$ aevum-os daemon start --port 3344 --vault ~/.aevum/vault\n[DAEMON] Running background process PID: 88412 • Listening on 127.0.0.1:3344\n\n► STEP 3: ATTACH MCP PROTOCOL TO CURSOR / VS CODE\n$ aevum-os mcp attach --target cursor --auto-sync\n[MCP] Target Cursor IDE detected at /Users/admin/.cursor/mcp.json\n[MCP] Successfully registered Aevum OS Server (58 active tools loaded)\n\n► STEP 4: VERIFY SYSTEM CONNECTION STATUS\n$ aevum-os status\n✔ Daemon: ACTIVE (Port 3344)\n✔ Memory Graph: HYDRATED (1,420 nodes)\n✔ MCP Handshake: CONFIRMED (Cursor IDE)\n\n[READY: Aevum OS External Brain is fully protecting your AI context window]`
            }
          ]
        }
      },
      {
        id: 'dev-team',
        type: 'folder',
        code: '2.',
        label: activeLang === 'vi' ? '2./ Dev Team' : '2./ Dev Team',
        desc: activeLang === 'vi' ? 'Đội ngũ phát triển & Câu chuyện I2FLabs' : 'Development Team & I2FLabs Story',
        children: {
          title: 'Dev Team',
          items: [
            {
              id: 'genesis',
              type: 'cmd',
              code: '2.1/',
              cmd: 'aevum-os genesis --story',
              label: activeLang === 'vi' ? '2.1/ Câu chuyện khai sinh' : '2.1/ Genesis Story',
              desc: activeLang === 'vi' ? 'Nỗi đau & Hành trình I2FLabs' : 'Story & Context Battle',
              content: activeLang === 'vi'
                ? `[CÂU CHUYỆN KHAI SINH AEVUM OS TẠI I2FLABS VIỆT NAM]\n\n► BỐI CẢNH & NỖI ĐAU THỰC TẾ:\nTrong quá trình phát triển các hệ thống phần mềm phức tạp cùng AI Agent, đội ngũ kỹ sư tại I2FLabs phát hiện một trở ngại lớn:\nMỗi khi dự án phình to, các AI Agent xuất sắc nhất cũng bắt đầu mắc lỗi ngớ ngẩn do vượt quá context window. AI quên mất cấu trúc DB đã thỏa thuận, tự tạo lại các hàm utility đã có, hoặc vô tình làm gãy các module quan trọng.\n\n► KHÁM PHÁ BƯỚC NGOẶT:\n"Tại sao lại bắt AI Agent ghi nhớ mọi thứ trong prompt context ngắn hạn, trong khi chúng ta có thể xây dựng một Bộ Não Ngoại Vi (External Brain) lưu trữ tri thức bền vững bên ngoài?"\n\n► HÀNH TRÌNH PHÁT TRIỂN AEVUM OS:\nI2FLabs đã bắt tay vào thiết kế Aevum Kernel — daemon lưu trữ Living Memory Graph kết hợp chuẩn mở MCP. Aevum OS ra đời giúp mọi AI Agent giữ vững phong độ thiên tài, không bao giờ quên ngữ cảnh dự án.\n\n[MISSION: Eradicate AI Context Amnesia worldwide • Built with passion by I2FLabs]`
                : `[THE GENESIS STORY AT I2FLABS VIETNAM]\n\n► BACKGROUND & THE ENGINEERING BATTLE:\nWhile building complex software architectures alongside AI Agents, engineers at I2FLabs encountered a severe fundamental bottleneck:\nAs codebases scale, even the most capable AI agents start making naive mistakes due to context window truncation. Agents forget database schemas, rewrite existing utility helpers, or break critical production invariants.\n\n► THE BREAKTHROUGH INSIGHT:\n"Why force AI agents to hold everything in fragile short-term prompt memory, when we can build a Decoupled External Brain to hold persistent knowledge outside the LLM context window?"\n\n► THE JOURNEY TO AEVUM OS:\nI2FLabs designed Aevum Kernel — a background daemon managing a self-healing Living Memory Graph over open MCP protocols. Aevum OS empowers AI agents to maintain peak engineering excellence without context amnesia.\n\n[MISSION: Eradicate AI Context Amnesia worldwide • Built with passion by I2FLabs]`
            },
            {
              id: 'members',
              type: 'folder',
              code: '2.2/',
              label: activeLang === 'vi' ? '2.2/ Các thành viên' : '2.2/ Team Members',
              desc: activeLang === 'vi' ? 'AI Agents & Kỹ sư con người' : 'AI Agent Squad & Human Engineers',
              children: {
                title: activeLang === 'vi' ? 'Các thành viên' : 'Team Members',
                items: [
                  {
                    id: 'member-1',
                    type: 'cmd',
                    code: '2.2.1/',
                    cmd: 'aevum-os squad --agents',
                    label: activeLang === 'vi' ? '2.2.1/ Autonomous Agent Squad' : '2.2.1/ Autonomous Agent Squad',
                    desc: activeLang === 'vi' ? 'Đội ngũ AI Agent (Architect, Coder, Reviewer)' : 'Autonomous Agent Squad',
                    content: activeLang === 'vi'
                      ? `[AEVUM SQUAD - ĐỘI NGŨ AI AGENT TỰ HÀNH & PIPERNET]\n\n► CẤU TRÚC ĐỘI NGŨ AI AGENT ĐA VAI TRÒ:\n01. ARCHITECT AGENT (Phân tích & Thiết kế):\n    • Chịu trách nhiệm phân tích requirement, xây dựng sơ đồ hệ thống và lập plan chi tiết.\n02. CODER AGENT (Lập trình viên chuyên sâu):\n    • Thi hành các bước lập trình theo plan, tuân thủ nghiêm ngặt quy chuẩn code và type safety.\n03. REVIEWER & AUDITOR AGENT (Kiểm duyệt & Bảo mật):\n    • Độc lập kiểm tra code diff, quét lỗ hổng bảo mật và chạy sanity test tự động.\n\n► GIAO THỨC PIPERNET (INTERNET OF AGENTS):\nCác Agent trong Squad giao tiếp trực tiếp qua mạng lưới PiperNet peer-to-peer.\nKhi Coder Agent hoàn thành task, thông điệp tự động gửi tới Reviewer Agent để audit code trước khi merge vào codebase chính.\n\n[SQUAD STATUS: 3 Agents Online • PiperNet Bandwidth: 1Gbps • Autonomous Handoff: ACTIVE]`
                      : `[AEVUM SQUAD - AUTONOMOUS AGENT TEAM & PIPERNET]\n\n► MULTI-ROLE AGENT SQUAD ARCHITECTURE:\n01. ARCHITECT AGENT (Analysis & Design):\n    • Responsible for analyzing requirements, mapping system boundaries, and drafting specs.\n02. CODER AGENT (Core Implementation):\n    • Executes precise step-by-step code changes adhering strictly to architectural constraints.\n03. REVIEWER & AUDITOR AGENT (Code Quality & Security):\n    • Independently inspects code diffs, scans security vulnerabilities, and triggers sanity checks.\n\n► PIPERNET PROTOCOL (INTERNET OF AGENTS):\nSquad agents communicate directly over an encrypted peer-to-peer PiperNet protocol network.\nUpon task completion by Coder Agent, an event handoff automatically triggers Reviewer Agent to audit changes before merging.\n\n[SQUAD STATUS: 3 Agents Online • PiperNet Bandwidth: 1Gbps • Autonomous Handoff: ACTIVE]`
                  },
                  {
                    id: 'member-2',
                    type: 'cmd',
                    code: '2.2.2/',
                    cmd: 'aevum-os team --i2flabs',
                    label: activeLang === 'vi' ? '2.2.2/ I2FLabs Core Engineers' : '2.2.2/ I2FLabs Core Engineers',
                    desc: activeLang === 'vi' ? 'Đội ngũ phát triển Aevum Kernel' : 'Aevum Kernel Core R&D Team',
                    content: activeLang === 'vi'
                      ? `[I2FLABS HUMAN ENGINEERING TEAM & CORE R&D]\n\n► ĐỘI NGŨ NGHIÊN CỨU & PHÁT TRIỂN CORE KERNEL:\nI2FLabs tập hợp các kỹ sư hệ thống, nhà nghiên cứu AI và lập trình viên đam mê tại Việt Nam.\n\n► LĨNH VỰC NGHIÊN CỨU TRỌNG TÂM:\n01. Agentic Operating System Architecture (Kiến trúc OS cho AI Agent).\n02. Open MCP Protocol Standards & Decoupled Memory Graph Optimization.\n03. High-performance Local Prompt Caching & Living Memory Vault Security.\n04. Developer Experience (DX) & Seamless Tooling Attachments.\n\n► TẦM NHÌN DÀI HẠN:\nĐưa Aevum OS trở thành chuẩn mực hạ tầng bộ nhớ ngoại vi mặc định cho hàng triệu lập trình viên và AI Agent trên toàn thế giới.\n\n[I2FLABS R&D LABS • HANOI / SAIGON, VIETNAM • CONNECT: contact@i2flabs.com]`
                      : `[I2FLABS HUMAN ENGINEERING TEAM & CORE R&D]\n\n► CORE KERNEL RESEARCH & DEVELOPMENT SQUAD:\nI2FLabs brings together passionate systems engineers, AI researchers, and developers in Vietnam.\n\n► CORE RESEARCH DOMAINS:\n01. Agentic Operating System Architecture & Autonomous Workflows.\n02. Open MCP Protocol Standards & Decoupled Memory Graph Optimization.\n03. High-performance Local Prompt Caching & Living Memory Vault Security.\n04. Developer Experience (DX) & Seamless Tooling Attachments across IDEs.\n\n► LONG-TERM VISION:\nEstablishing Aevum OS as the default external brain memory infrastructure for millions of developers and AI agents globally.\n\n[I2FLABS R&D LABS • HANOI / SAIGON, VIETNAM • CONNECT: contact@i2flabs.com]`
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }), [activeLang]);

  // Folder navigation stack
  const [folderStack, setFolderStack] = useState([navigationData]);

  // Auto-sync folderStack whenever navigationData updates or resets
  useEffect(() => {
    setFolderStack([navigationData]);
    setSelectedIndex(0);
  }, [navigationData]);

  const currentFolder = folderStack[folderStack.length - 1];

  // Active command rendered on the right terminal panel
  const [activeCommand, setActiveCommand] = useState(
    navigationData.items[0].children.items[0]
  );

  // Currently focused item index in the active list
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Derive items for current folder view including ".." back item if inside a subfolder
  const currentDisplayItems = useMemo(() => {
    if (folderStack.length > 1) {
      const parentFolder = folderStack[folderStack.length - 2];
      const backItem = {
        id: '__back__',
        type: 'back',
        label: `.. (${activeLang === 'vi' ? 'Quay lại' : 'Back to'} ${parentFolder.title})`,
        desc: activeLang === 'vi' ? 'Trở về thư mục cấp trên' : 'Navigate back to parent folder'
      };
      return [backItem, ...currentFolder.items];
    }
    return currentFolder.items;
  }, [folderStack, currentFolder, activeLang]);

  // Handle click or enter selection on items
  const handleItemSelect = (item) => {
    if (item.type === 'back') {
      setFolderStack((prev) => prev.slice(0, prev.length - 1));
      setSelectedIndex(0);
    } else if (item.type === 'folder') {
      setFolderStack((prev) => [...prev, item.children]);
      setSelectedIndex(0);
    } else if (item.type === 'cmd') {
      setActiveCommand(item);
    }
  };

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
  }, [activeCommand, activeLang]);

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

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) return;
      
      const itemCount = currentDisplayItems.length;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % itemCount);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const selected = currentDisplayItems[selectedIndex];
        if (selected) handleItemSelect(selected);
      } else if (e.key === 'Backspace' || e.key === 'Escape') {
        if (folderStack.length > 1) {
          setFolderStack((prev) => prev.slice(0, prev.length - 1));
          setSelectedIndex(0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, currentDisplayItems, selectedIndex, folderStack]);

  // Breadcrumb path calculation
  const breadcrumbPath = useMemo(() => {
    return folderStack.map((f) => f.title).join(' / ');
  }, [folderStack]);

  return (
    <div id="about" className="w-full bg-[#0B0B11] text-slate-100 min-h-[calc(100vh-73px)] font-sans flex flex-col">
      
      {isLoading ? (
        /* 2.5s Retro Loading Screen with Pure Transparent Logo */
        <div className="border-subtle-b bg-[#0B0B11] py-10 px-6 lg:px-10 h-[520px] max-h-[75vh] flex flex-col items-center justify-center text-center font-mono relative overflow-hidden flex-1">
          
          {/* Subtle CRT Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px'
            }}
          ></div>

          {/* Rendered Transparent Logo Image */}
          <div className="relative z-10 space-y-4 max-w-xl mx-auto flex flex-col items-center">
            <img 
              src={logoImg} 
              alt="Aevum OS Logo" 
              className="max-h-48 sm:max-h-60 w-auto object-contain bg-transparent border-none shadow-none select-none pointer-events-none" 
            />

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
        /* Authentic Transparent Terminal UI (TUI) Screen - Full-width Border Header & Equal Vertical Padding */
        <div className="border-subtle-b bg-[#0B0B11] text-left font-mono relative overflow-hidden flex-1 flex flex-col w-full">
          
          {/* Subtle CRT Scanline Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px'
            }}
          ></div>

          {/* Full-width Terminal Header Bar (Border-bottom touches both parent edges 100%, Equal Top & Bottom Padding) */}
          <div className="w-full border-b border-white/10 py-5 px-6 lg:px-10 bg-[#0B0B11] relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold tracking-wider">AEVUM TTY INTERACTIVE SHELL v1.0.0</span>
              </div>
              <div className="flex items-center text-[11px] text-slate-500 font-mono">
                <span>Use [↑/↓] arrows, [Enter] or click options</span>
              </div>
            </div>
          </div>

          {/* Main Terminal Shell Body Container - 2-Column Grid (Full-height Divider Touching Bottom Edge) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full text-left font-mono flex-1 min-h-[450px]">
            
            {/* Column 1: Interactive Drill-down Menu (5 Cols - Full Height Vertical Separator Line) */}
            <div className="lg:col-span-5 space-y-3 font-mono lg:border-r border-b lg:border-b-0 border-white/10 px-6 lg:px-10 py-8 h-full">
                
                {/* Current Directory Breadcrumb */}
                <div className="flex items-center gap-2 text-[11px] text-white font-mono font-bold tracking-wide uppercase">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-white">~/{breadcrumbPath}</span>
                </div>

                {/* Subfolder Menu List */}
                <div className="space-y-1 font-mono text-xs sm:text-sm pt-1">
                  {currentDisplayItems.map((item, idx) => {
                    const isFocused = selectedIndex === idx;
                    const isCmdActive = item.type === 'cmd' && activeCommand?.id === item.id;
                    const isFolder = item.type === 'folder';

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedIndex(idx);
                          handleItemSelect(item);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex flex-col py-2 px-2.5 rounded cursor-pointer transition-colors font-mono ${
                          isFocused || isCmdActive
                            ? 'text-white font-bold bg-white/[0.06]'
                            : 'text-slate-300 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold w-4 text-center">
                            {isFocused ? '>' : ' '}
                          </span>

                          <span className={`flex-1 ${
                            isFocused || isCmdActive
                              ? 'text-white font-bold'
                              : 'text-slate-200'
                          }`}>
                            {isFolder ? `${item.label}/` : item.label}
                          </span>

                          {isFolder && (
                            <span className="text-slate-400 text-xs font-mono font-bold">
                              &gt;
                            </span>
                          )}
                        </div>

                        {item.desc && (
                          <span className="text-slate-400 text-xs pl-6 pt-0.5 font-normal">
                            {item.desc}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Column 2: Terminal Output Render (7 Cols - Pure Monochrome Text) */}
              <div className="lg:col-span-7 space-y-4 font-mono px-6 lg:px-10 py-8">
                
                {/* Command Execution Line */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-white pb-1">
                  <span className="text-slate-400 font-bold">$</span>
                  <span className="font-bold text-white">{activeCommand.cmd}</span>
                </div>

                {/* Terminal Text Output Display */}
                <div className="pt-1 min-h-[240px]">
                  <pre className="whitespace-pre-wrap text-left text-white font-mono text-xs sm:text-sm leading-[1.5] tracking-tight">
                    {displayedText}
                    <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse align-middle"></span>
                  </pre>

                  {isTypingComplete && (
                    <div className="pt-4 text-[11px] text-slate-500 uppercase tracking-widest animate-pulse font-mono text-left mt-4">
                      [ EXECUTION COMPLETE • USE ARROWS [↑/↓] OR [ENTER] TO NAVIGATE ]
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
