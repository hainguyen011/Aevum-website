export const translations = {
  vi: {
    navbar: {
      breakthroughs: "Điểm đột phá",
      architecture: "Kiến trúc OS",
      orchestration: "Hệ sinh thái",
      kernel: "Nhân OS",
      docs: "Tài liệu",
      about: "Giới thiệu",
      searchPlaceholder: "Tìm kiếm OS...",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "I2FLABS VIỆT NAM • HỆ ĐIỀU HÀNH AGENT ĐỘC LẬP",
      title: "Hệ điều hành Agent & Bộ não ngoại vi",
      desc: "Aevum OS là Hệ điều hành độc lập và Bộ não Ngoại vi cho AI Agent — tích hợp lập kế hoạch hướng tên miền (DDD), biểu đồ bộ nhớ tự phục hồi và điều phối biệt đội Agent tự trị, tách biệt hoàn toàn khỏi mọi IDE.",
      downloadBtn: "Đăng ký trải nghiệm",
      docsBtn: "Đọc tài liệu",
      startKernel: "KHỞI CHẠY NHÂN OS:",
      copyCmd: "Sao chép lệnh"
    },
    subNavTabs: {
      tab1: "Nhân OS Độc lập",
      tab2: "Nghi thức Bắt tay",
      tab3: "Bộ não miền DDD",
      tab4: "Điều phối Biệt đội",
      tab5: "Quy trình Lập kế hoạch",
      tab6: "Mạng lưới PiperNet"
    },
    subNavDetails: {
      tab1: {
        tag: "DAEMON KERNEL PROCESS",
        title: "Nhân OS Độc lập & Máy chủ MCP Daemon",
        desc: "Aevum OS vận hành như một daemon cục bộ độc lập qua giao thức SSE (Port 3344) hoặc Stdio. Tất cả trình soạn thảo AI (Cursor, VS Code, Claude Desktop) đều kết nối về một Bộ Não duy nhất mà không bị phụ thuộc vào môi trường cụ thể.",
        cmd: "aevum --transport sse --port 3344",
        pills: ["Khởi chạy 0.1s", "Giao thức Open MCP", "Zero Editor Lock-in"]
      },
      tab2: {
        tag: "HANDSHAKE RITUAL & SOUL SYNC",
        title: "Nghi thức Bắt tay & Xác thực Agent",
        desc: "Khi khởi động, daemon phát ra tín hiệu bảo mật tại `.aevum/signal.json` chứa session token tạm thời. Agent khách phải gọi `aevum_submit_ack` để xác thực quyền truy cập và nạp các quy định hoạt động.",
        cmd: 'aevum_submit_ack({ token: "AEVUM_SIGNAL_TOKEN_OK" })',
        pills: ["Tín hiệu .aevum/signal.json", "Xác thực Token", "Nạp Quy định Agent"]
      },
      tab3: {
        tag: "DOMAIN-DRIVEN BRAIN (DDD)",
        title: "Bộ não Ngoại vi Hướng Tên miền (DDD)",
        desc: "Cấu trúc hóa bộ nhớ sống của dự án theo kiến trúc Domain-Driven Design: Phân chia thành Domains (trụ cột kiến trúc), Features (tính năng), Plans (kế hoạch thực thi) và Personas (nhân vật), ngăn ngừa hiện tượng rác ngữ cảnh.",
        cmd: 'aevum_create_domain({ domainId: "core", name: "Core Infrastructure" })',
        pills: ["Phân cấp DDD", "Bộ nhớ Sống (Living Memory)", "Lưu trữ Bền vững"]
      },
      tab4: {
        tag: "AUTONOMOUS SQUAD OS",
        title: "Điều phối Biệt đội Đa Agent Tự trị",
        desc: "Cho phép luân chuyển công việc linh hoạt giữa các Agent chuyên biệt qua `aevum_squad_handoff` (Kiến trúc sư -> Lập trình viên -> Chuyên gia Bảo mật) và tổ chức các phiên họp nhóm (Huddle) bảo toàn 100% ngữ cảnh.",
        cmd: 'aevum_squad_handoff({ targetPersona: "Luna (UI)", task: "Refactor CSS Grid" })',
        pills: ["Chuyển tiếp Handoff", "Họp Biệt đội Huddle", "Tăng EXP & Level Up"]
      },
      tab5: {
        tag: "PLAN-FIRST WORKFLOW",
        title: "Quy trình Lập kế hoạch trước khi Viết Code",
        desc: "Yêu cầu Agent phác thảo kế hoạch kỹ lưỡng, đối sánh trực tiếp với người dùng qua lệnh `/grill-me`, neo giữ tiến độ công việc và thu hoạch bằng chứng thực thi (Evidence Harvesting) sau khi hoàn thành.",
        cmd: 'aevum_create_plan({ title: "Auth Pipeline", domainId: "security" })',
        pills: ["Phác thảo Implementation Plan", "Đối chéo /grill-me", "Thu hoạch Evidence"]
      },
      tab6: {
        tag: "PIPERNET IOA MESH",
        title: "Mạng lưới Trí tuệ Tập thể P2P (PiperNet)",
        desc: "Mạng lưới kết nối các nút Agent phân tán (Internet of Agents) cho phép truyền phát và truy vấn các giải pháp gỡ lỗi, thiết kế đã được mã hóa trừu tượng qua `aevum_pipernet_broadcast` mà không làm rò rỉ mã nguồn dự án.",
        cmd: 'aevum_pipernet_broadcast({ pattern: "JWT_REFRESH_ROTATION" })',
        pills: ["Kết nối P2P Daemon", "Mã hóa Trừu tượng", "Không rò rỉ Code thô"]
      }
    },
    bentoGrid: {
      tag: "ĐỘT PHÁ CỐT LÕI",
      title: "Đột phá Cốt lõi của Aevum OS",
      desc: "Hệ điều hành Agent độc lập sở hữu bộ nhớ ngữ cảnh hướng tên miền, nghi thức xác thực và điều phối biệt đội tự trị.",
      b1Title: "Nghi thức Bắt tay & Xác thực Soul Sync",
      b1Desc: "Aevum OS vận hành như daemon độc lập. Khi khởi động, hệ thống phát tín hiệu `.aevum/signal.json` và đồng bộ hóa ngữ cảnh Agent qua `aevum_submit_ack`, tách biệt hoàn toàn khỏi API của các trình soạn thảo.",
      b1Active: "KHỞI CHẠY NHÂN: Tín hiệu đã phát (.aevum/signal.json)",
      b2Title: "Bộ não Ngoại vi Hướng Tên miền (DDD)",
      b2Desc: "Xây dựng bộ nhớ sống vĩnh cửu cho Workspace theo kiến trúc phân cấp: Domains (Kiến trúc), Features (Tính năng), Plans (Kế hoạch), và Personas (Nhân vật).",
      b2Active: "Nhân Bộ nhớ OS Đang hoạt động",
      b2Live: "Ghi nhận trực tiếp",
      b2Connectivity: "Kết nối mạng PiperNet IoA",
      b2Verified: "Đã xác thực",
      b3Title: "Điều phối Biệt đội Agent Tự trị (Squad OS)",
      b3Desc: "Điều phối biệt đội AI Agent tự trị qua lệnh `aevum_squad_handoff` — chuyển giao công việc linh hoạt giữa Kiến trúc sư, Lập trình viên và Chuyên gia Bảo mật với 100% ngữ cảnh toàn vẹn.",
      b3Pillars: [
        "[+] Nhân vật Kiến trúc sư",
        "[+] Nhân vật Lập trình viên",
        "[+] Chuyên gia Bảo mật",
        "[+] Thảo luận Biệt đội Huddle"
      ],
      b4Title: "Bộ nhớ Sống & Mạng lưới PiperNet (IoA)",
      b4Desc: "Tự động thu hoạch bài học kinh nghiệm vào Bộ nhớ Toàn cục khi hoàn thành kế hoạch. Kết nối PiperNet (Internet of Agents) để truy vấn trí tuệ tập thể trên toàn mạng lưới."
    },
    foundationGrid: {
      tag: "GIAO THỨC MCP TIÊU CHUẨN",
      title: "Bảng Tham chiếu Công cụ MCP Aevum",
      desc: "Hệ thống công cụ Model Context Protocol (MCP) chuyên dụng cho quản trị Domain, điều phối biệt đội và truy xuất bộ nhớ vĩnh cửu.",
      c1Tag: "CẤU TRÚC & LẬP KẾ HOẠCH",
      c1Title: "Công cụ Domain & Lập kế hoạch",
      c1Desc: "Khởi tạo các thực thể DDD và quản lý tài liệu kế hoạch thực thi",
      c1ToolTitle: "Công cụ MCP Chính",
      c1ToolType: "API cấu trúc",
      c2Tag: "BIỆT ĐỘI & BỘ NHỚ",
      c2Title: "Công cụ Biệt đội & Bộ nhớ Sống",
      c2Desc: "Điều phối đa Agent, quản lý Personas và truy xuất ngữ nghĩa tự động",
      c2ToolTitle: "Công cụ MCP Chính",
      c2ToolType: "API biệt đội & bộ nhớ"
    },
    frameworkFlow: {
      tag: "HẠ TẦNG BỘ NHỚ THỐNG NHẤT",
      title: "Không gian làm việc & Bộ não Ngoại vi Thống nhất",
      desc: "Aevum OS là nguồn dữ liệu tin cậy duy nhất (Single Source of Truth) cho bộ nhớ ngữ cảnh, các quyết định kiến trúc và trạng thái của biệt đội Agent trên mọi môi trường phát triển."
    },
    testimonials: {
      tag: "CỘNG ĐỒNG & CHUYÊN GIA",
      title: "Được yêu thích bởi Pied Piper & Cộng đồng",
      desc: "Được tin dùng bởi các kỹ sư và nhà sáng tạo công nghệ hàng đầu trên toàn thế giới.",
      installs: "Lượt cài đặt OpenVSX",
      score: "Điểm Weissman",
      bootTime: "Thời gian khởi động Daemon",
      r1Text: '“Thuật toán nén ngữ cảnh Middle-Out của Aevum OS thật điên rồ! Nó duy trì Điểm số Weissman 100% trên toàn bộ biệt đội agent của chúng tôi mà không làm mất một byte nào.”',
      r2Text: '“Tôi đã xây dựng Anton để xử lý tải hệ thống, nhưng daemon Aevum OS chạy cục bộ khiến các IDE truyền thống trông thật trẻ con. Không thể hack, nhanh kinh hoàng và vượt trội về mọi mặt.”',
      r3Text: '“Tôi đã thử viết các script chuyển giao agent tùy chỉnh, nhưng điều phối biệt đội của Aevum OS quá mượt mà đến nỗi Gilfoyle cũng không thể tìm ra một lỗi nào trong triển khai của tôi.”',
      r4Text: '“Bộ não ngoại vi DDD của Aevum OS liên kết sự cộng hưởng tâm hồn của biệt đội chúng tôi một cách hoàn hảo. Tôi cảm thấy an tâm khi biết các kế hoạch tên miền được thu hoạch vào Bộ nhớ Toàn cục.”'
    },
    ctaBanner: {
      tag: "SẴN SÀNG TRIỂN KHAI",
      title: "Triển khai Aevum OS trên Hệ thống của bạn",
      desc: "Chạy `aevum --transport sse` để kết nối tức thì Cursor, Claude Desktop và Antigravity IDE với bộ nhớ ngữ cảnh thống nhất.",
      downloadBtn: "Đăng ký trải nghiệm",
      docsBtn: "Đọc tài liệu"
    },
    footer: {
      brandDesc: "Hệ điều hành Agent độc lập & Bộ não Ngoại vi không gian làm việc phát triển bởi I2FLabs Việt Nam. Tách biệt hoàn toàn khỏi mọi IDE.",
      links: {
        docs: "Tài liệu",
        openVsx: "Open VSX (v1.7)",
        unikorn: "Bài viết Unikorn",
        github: "GitHub"
      },
      cols: {
        arch: "Kiến trúc OS",
        exec: "Chế độ Chạy OS",
        eco: "Hệ sinh thái Agent"
      },
      copyright: "Bản quyền © 2026 I2FLabs Việt Nam. Hệ điều hành Agent tự trị.",
      status: "Aevum OS Standalone MCP Daemon • Nhân đang hoạt động"
    },
    unikorn: {
      tag: "UNIKORN VIỆT NAM",
      title: "Sản phẩm của Ngày trên Unikorn.vn",
      desc: "Khám phá bài viết phân tích kiến trúc, tính năng và thảo luận cộng đồng về Aevum OS trên Unikorn.vn — nền tảng tôn vinh sáng tạo công nghệ Việt.",
      btn: "Đọc bài viết phân tích trên Unikorn.vn →"
    },
    i2flabs: {
      tag: "ĐỘI NGŨ PHÁT TRIỂN",
      title: "Phát triển bởi Đội ngũ I2FLabs",
      desc: "Chúng tôi là đội ngũ kỹ sư chuyên biệt tiên phong xây dựng Hệ điều hành Agent tự trị, bộ nhớ ngữ cảnh sống và hạ tầng phần mềm thế hệ mới.",
      p1Tag: "NHÂN CỐT LÕI",
      p1Title: "Kiến trúc Nhân OS Cốt lõi",
      p1Desc: "Công cụ daemon SSE & Stdio hiệu năng cao chạy cục bộ không phụ thuộc vào trình soạn thảo và khởi chạy tức thì.",
      p2Tag: "BỘ NHỚ SỐNG DDD",
      p2Title: "Hệ thống Bộ nhớ Sống",
      p2Desc: "Bộ não Ngoại vi hướng Tên miền lưu trữ bền vững bộ nhớ kiến trúc cấu trúc, tính năng và bằng chứng kế hoạch.",
      p3Tag: "BIỆT ĐỘI ĐA AGENT",
      p3Title: "Điều phối Biệt đội",
      p3Desc: "Cho phép chuyển giao công việc linh hoạt giữa các Agent chuyên biệt (Kiến trúc sư, Lập trình viên, Bảo mật) với toàn vẹn ngữ cảnh 100% qua Huddle & Handoff.",
      p4Tag: "MẠNG LƯỚI PIPERNET IOA",
      p4Title: "Giao thức PiperNet IoA",
      p4Desc: "Mạng lưới kết nối các Agent phân tán (Internet of Agents) cho phép chia sẻ trí tuệ thủ tục liên kết."
    },
    about: {
      heroTag: "CÂU CHUYỆN SẢN PHẨM",
      heroTitle: "Hành Trình Aevum OS: Thuần Hóa Sự Hỗn Loạn Của AI Agent",
      heroDesc: "Câu chuyện từ phòng nghiên cứu I2FLabs Việt Nam về việc khai sinh ra một Bộ Não Ngoại Vi độc lập, giúp AI Agent vượt qua hội chứng mất trí nhớ ngắn hạn.",
      storyTitle: "Nỗi Đau & Điểm Khởi Đầu",
      storySubtitle1: "Trận chiến ngữ cảnh không hồi kết",
      storyText1: "Lập trình cùng AI ngày nay giống như việc cộng tác với một kỹ sư thiên tài nhưng bị mất trí nhớ ngắn hạn sau mỗi vài phút. Mỗi lần bạn đổi dự án, hay đơn giản là chuyển đổi công việc giữa Cursor, VS Code và Claude Desktop, toàn bộ ngữ cảnh quan trọng, các quyết định kiến trúc khó khăn và những bài học gỡ lỗi xương máu đều bay màu. Bạn bị mắc kẹt trong việc viết lại prompt để giải thích đi giải thích lại cấu trúc dự án của mình.",
      storySubtitle2: "Tia sáng từ I2FLabs Việt Nam",
      storyText2: "Tại I2FLabs Việt Nam, chúng tôi tự hỏi: 'Tại sao trí tuệ của Agent lại phải bị nhốt trong hộp cát của một IDE cụ thể?'. Tại sao không tách bộ não của Agent ra làm một thực thể độc lập, một daemon chạy cục bộ trên máy tính nhà phát triển, lưu giữ một bộ nhớ sống (Living Memory Graph) vĩnh cửu đi theo dự án? Aevum OS ra đời từ đó — thiết lập một hệ thống bộ não ngoại vi giúp AI Agent tự lập kế hoạch, tự tích lũy kinh nghiệm và làm việc ăn ý như một biệt đội thực sự.",
      pillarsTitle: "Tuyên Ngôn Thiết Kế Của Aevum",
      p1Title: "Giải phóng khỏi IDE (Decoupled Brain)",
      p1Desc: "Tách rời toàn bộ ngữ cảnh, bộ nhớ, cấu hình nhân vật khỏi IDE. Mọi AI Agent chạy từ bất kỳ trình soạn thảo hay CLI nào đều truy cập chung một nguồn tri thức duy nhất qua giao thức MCP.",
      p2Title: "Lập kế hoạch trước, Viết code sau",
      p2Desc: "Thay thế việc gõ prompt tự phát bằng quy trình lập kế hoạch hướng tên miền (Domain-Driven Plans). Mọi tác vụ được Agent lập sơ đồ, kiểm tra chéo và đối sánh bằng chứng trước khi thực thi.",
      p3Title: "Biểu đồ Bộ nhớ sống (Living Memory Graph)",
      p3Desc: "Sau mỗi kế hoạch hoàn thành, Aevum OS tự động thu hoạch các bài học kinh nghiệm và kiến trúc code thô thành tri thức đồ thị tự phục hồi, giúp các phiên làm việc sau thừa hưởng ngay kinh nghiệm của phiên trước.",
      p4Title: "Trí tuệ tập thể ngang hàng (PiperNet)",
      p4Desc: "Kết nối các biệt đội Agent trên các dự án khác nhau thông qua mạng lưới phi tập trung PiperNet, cho phép trao đổi giải pháp thiết kế đã mã hóa trừu tượng mà không làm rò rỉ mã nguồn dự án."
    }
  },
  en: {
    navbar: {
      breakthroughs: "Breakthroughs",
      architecture: "Architecture",
      orchestration: "Ecosystem",
      kernel: "Kernel",
      docs: "Documentation",
      about: "About",
      searchPlaceholder: "Search OS...",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "BY I2FLABS VIETNAM • STANDALONE AGENTIC OS",
      title: "Agentic Operating System & External Brain",
      desc: "Aevum OS is an independent workspace Operating System and External Brain — integrating Domain-Driven Plans (DDD), self-healing living memory graphs, and autonomous multi-agent squad orchestration completely decoupled from traditional editors.",
      downloadBtn: "Join Early Access",
      docsBtn: "Read Documentation",
      startKernel: "START KERNEL:",
      copyCmd: "Copy command"
    },
    subNavTabs: {
      tab1: "Standalone OS Kernel",
      tab2: "Handshake Ritual",
      tab3: "DDD Domain Brain",
      tab4: "Squad Orchestration",
      tab5: "Plan-First Workflow",
      tab6: "PiperNet Mesh"
    },
    subNavDetails: {
      tab1: {
        tag: "DAEMON KERNEL PROCESS",
        title: "Standalone OS Kernel & MCP Daemon Server",
        desc: "Aevum OS operates as a decoupled local daemon via SSE (Port 3344) or Stdio transports. All AI editors (Cursor, VS Code, Claude Desktop) connect to a single central Brain without editor lock-in.",
        cmd: "aevum --transport sse --port 3344",
        pills: ["0.1s Fast Boot", "Open MCP Protocol", "Zero Editor Lock-in"]
      },
      tab2: {
        tag: "HANDSHAKE RITUAL & SOUL SYNC",
        title: "Handshake Ritual & Agent Authentication",
        desc: "Upon bootup, the daemon broadcasts a secure signal at `.aevum/signal.json` with a temporary session token. Guest agents invoke `aevum_submit_ack` to authenticate and load operating constraints.",
        cmd: 'aevum_submit_ack({ token: "AEVUM_SIGNAL_TOKEN_OK" })',
        pills: [".aevum/signal.json Signal", "Token Auth", "Load Agent Persona"]
      },
      tab3: {
        tag: "DOMAIN-DRIVEN BRAIN (DDD)",
        title: "Domain-Driven External Brain (DDD)",
        desc: "Structure workspace living memory using Domain-Driven Design: Partition into Domains (core architecture), Features (capabilities), Plans (execution roadmaps), and Personas (characters).",
        cmd: 'aevum_create_domain({ domainId: "core", name: "Core Infrastructure" })',
        pills: ["DDD Hierarchy", "Living Memory Graph", "Persistent Vault"]
      },
      tab4: {
        tag: "AUTONOMOUS SQUAD OS",
        title: "Autonomous Multi-Agent Squad Orchestration",
        desc: "Handoff tasks seamlessly between specialized agent personas via `aevum_squad_handoff` (Architect -> Developer -> Security Specialist) and host multi-agent huddles while preserving 100% context.",
        cmd: 'aevum_squad_handoff({ targetPersona: "Luna (UI)", task: "Refactor CSS Grid" })',
        pills: ["Handoff Transfer", "Squad Huddle", "EXP & Level Up"]
      },
      tab5: {
        tag: "PLAN-FIRST WORKFLOW",
        title: "Plan-First Execution Workflow",
        desc: "Requires agents to draft structured implementation plans, cross-examine with users via `/grill-me`, anchor execution progress, and harvest evidence upon task completion.",
        cmd: 'aevum_create_plan({ title: "Auth Pipeline", domainId: "security" })',
        pills: ["Implementation Plan", "Cross-Examine /grill-me", "Evidence Harvesting"]
      },
      tab6: {
        tag: "PIPERNET IOA MESH",
        title: "P2P Collective Intelligence Mesh (PiperNet)",
        desc: "An Internet of Agents (IoA) mesh network allowing distributed agent nodes to broadcast and query abstract design patterns via `aevum_pipernet_broadcast` without leaking raw source code.",
        cmd: 'aevum_pipernet_broadcast({ pattern: "JWT_REFRESH_ROTATION" })',
        pills: ["P2P Daemon Mesh", "Abstract Pattern Encryption", "Zero Raw Code Leak"]
      }
    },
    bentoGrid: {
      tag: "CORE BREAKTHROUGHS",
      title: "Core Architectural Breakthroughs of Aevum OS",
      desc: "A standalone agent operating system featuring domain-driven context memory, handshake rituals, and autonomous squad orchestration.",
      b1Title: "Handshake Ritual & Soul Sync Authentication",
      b1Desc: "Aevum OS operates as a decoupled daemon process. Upon startup, it broadcasts a `.aevum/signal.json` beacon and synchronizes agent soul memory via `aevum_submit_ack` independently of editor APIs.",
      b1Active: "KERNEL ACTIVE: Signal broadcasted (.aevum/signal.json)",
      b2Title: "Domain-Driven External Brain (DDD)",
      b2Desc: "Establishes a persistent, living memory hierarchy for workspace codebases: Domains (architecture pillars), Features (capabilities), Plans (task specs), and Personas (characters).",
      b2Active: "OS Memory Kernel Running",
      b2Live: "Live Telemetry",
      b2Connectivity: "PiperNet IoA Connectivity",
      b2Verified: "Authenticated",
      b3Title: "Autonomous Squad OS Orchestration",
      b3Desc: "Orchestrate an autonomous squad of AI agents. Use `aevum_squad_handoff` to transfer tasks between specialized personas (Architect to Developer or Security Expert) with 100% context fidelity.",
      b3Pillars: [
        "[+] Architect Persona",
        "[+] Lead Developer Persona",
        "[+] Security Specialist",
        "[+] Squad Huddle Session"
      ],
      b4Title: "Living Memory Graph & PiperNet (IoA)",
      b4Desc: "Automatically harvest insights into the Global Memory Vault upon plan completion. Connect with PiperNet (Internet of Agents) to query collective procedural wisdom across agent nodes."
    },
    foundationGrid: {
      tag: "STANDARD MCP PROTOCOL",
      title: "Aevum MCP Tooling Reference Grid",
      desc: "A specialized Model Context Protocol (MCP) toolset for domain management, squad orchestration, and persistent memory querying.",
      c1Tag: "STRUCTURE & PLANNING",
      c1Title: "Domain & Planning Tools",
      c1Desc: "Atomic creation of DDD entities and stateful execution plan documents",
      c1ToolTitle: "Core MCP Tools",
      c1ToolType: "Structure API",
      c2Tag: "SQUAD & MEMORY",
      c2Title: "Squad & Living Memory Tools",
      c2Desc: "Multi-agent coordination, persona initialization, and semantic memory retrieval",
      c2ToolTitle: "Core MCP Tools",
      c2ToolType: "Squad & Memory API"
    },
    frameworkFlow: {
      tag: "UNIFIED MEMORY INFRASTRUCTURE",
      title: "Central Workspace & Unified External Brain",
      desc: "Aevum OS serves as the single source of truth for context memory, architectural decisions, and agent squad state across all your AI development environments."
    },
    testimonials: {
      tag: "COMMUNITY & EXPERTS",
      title: "Loved by Pied Piper & Community",
      desc: "Used by visionary engineers and tech innovators worldwide.",
      installs: "OpenVSX Installs",
      score: "Weissman Score",
      bootTime: "Daemon Boot Time",
      r1Text: '“The Middle-Out context compression algorithm in Aevum OS is insane! It maintains 100% Weissman Score across our entire agent squad without dropping a single byte.”',
      r2Text: '“I built Anton to handle system load, but the local Aevum OS daemon makes traditional IDEs look like child\'s play. Unhackable, blazingly fast, and superior in every metric.”',
      r3Text: '“I tried writing custom agent handoff scripts, but Aevum OS squad orchestration is so smooth that even Gilfoyle couldn\'t find a single flaw in my deployment.”',
      r4Text: '“The DDD external brain in Aevum OS aligns our squad\'s soul resonance perfectly. It gives me peace of mind knowing domain plans are harvested into Global Memory.”'
    },
    ctaBanner: {
      tag: "READY FOR DEPLOYMENT",
      title: "Deploy Aevum OS on Your Infrastructure",
      desc: "Run `aevum --transport sse` to instantly connect Cursor, Claude Desktop, and Antigravity IDE to your unified context engine.",
      downloadBtn: "Join Early Access",
      docsBtn: "Read Documentation"
    },
    footer: {
      brandDesc: "Standalone Agentic Operating System & Workspace External Brain developed by I2FLabs Vietnam. Fully decoupled from traditional IDEs.",
      links: {
        docs: "Documentation",
        openVsx: "Open VSX (v1.7)",
        unikorn: "Unikorn Article",
        github: "GitHub"
      },
      cols: {
        arch: "OS Architecture",
        exec: "OS Runtime",
        eco: "Agent Ecosystem"
      },
      copyright: "Copyright © 2026 I2FLabs Vietnam. Autonomous Agentic OS.",
      status: "Aevum OS Standalone MCP Daemon • Kernel Running"
    },
    unikorn: {
      tag: "UNIKORN VIETNAM",
      title: "Product of the Day on Unikorn.vn",
      desc: "Explore the deep-dive architectural article, features, and community discussions on Aevum OS at Unikorn.vn — the premier platform celebrating Vietnamese tech innovations.",
      btn: "Read Analysis on Unikorn.vn →"
    },
    i2flabs: {
      tag: "DEVELOPMENT TEAM",
      title: "Built by the Creative Team at I2FLabs",
      desc: "We are a specialized engineering collective pioneering autonomous Agentic OS, living context memory, and next-generation software infrastructure.",
      p1Tag: "CORE KERNEL",
      p1Title: "Core OS Kernel Architecture",
      p1Desc: "High-performance local SSE & Stdio daemon engine decoupled from any single editor with instant boot times.",
      p2Tag: "DDD LIVING MEMORY",
      p2Title: "Living Memory System",
      p2Desc: "Domain-Driven External Brain persistently storing structural architecture, features, and plan evidence.",
      p3Tag: "MULTI-AGENT SQUAD",
      p3Title: "Squad Orchestration",
      p3Desc: "Seamless task handoff between specialized agents (Architect, Developer, Security) with 100% context integrity.",
      p4Tag: "PIPERNET MESH",
      p4Title: "PiperNet IoA Protocol",
      p4Desc: "Distributed Internet of Agents network enabling encrypted procedural intelligence sharing."
    },
    about: {
      heroTag: "PRODUCT STORY",
      heroTitle: "The Aevum OS Journey: Taming AI Agent Chaos",
      heroDesc: "The story from I2FLabs Vietnam lab on creating a standalone External Brain to overcome short-term AI agent amnesia.",
      storyTitle: "Pain Point & Genesis",
      storySubtitle1: "The endless context battle",
      storyText1: "Coding with AI today feels like collaborating with a genius engineer who suffers from short-term amnesia every few minutes. Every time you switch projects or move between Cursor, VS Code, and Claude Desktop, critical context, architectural decisions, and hard-earned debugging lessons evaporate. You're trapped rewriting prompts to explain your codebase over and over again.",
      storySubtitle2: "The spark from I2FLabs Vietnam",
      storyText2: "At I2FLabs Vietnam, we asked: 'Why should an agent\\'s intelligence be trapped in a single editor\\'s sandbox?' Why not decouple the agent\\'s brain into an independent, local daemon running alongside developer workspaces, maintaining a persistent Living Memory Graph? Aevum OS was born — establishing an external brain system empowering AI agents to plan, accumulate experience, and collaborate seamlessly as a true squad.",
      pillarsTitle: "The Aevum Design Manifesto",
      p1Title: "Decoupled Brain from IDEs",
      p1Desc: "Unbind context, memory, and persona configs from the IDE. Every AI Agent across any editor or CLI accesses a single unified knowledge source via MCP.",
      p2Title: "Plan First, Code Later",
      p2Desc: "Replace ad-hoc prompting with Domain-Driven Plans. Tasks are mapped, cross-examined, and evidence-verified before execution.",
      p3Title: "Living Memory Graph",
      p3Desc: "Upon plan completion, Aevum OS automatically harvests lessons and architecture into self-healing graph memory for future sessions.",
      p4Title: "Peer-to-Peer Collective Intelligence (PiperNet)",
      p4Desc: "Connect agent squads across projects via the decentralized PiperNet mesh, sharing encrypted design patterns without exposing raw source code."
    }
  }
};

export default translations;
