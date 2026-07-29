export const translations = {
  vi: {
    navbar: {
      breakthroughs: "Điểm đột phá",
      architecture: "Kiến trúc hệ thống",
      orchestration: "Hệ sinh thái Agent",
      kernel: "Nhân & Daemon",
      docs: "Tài liệu",
      about: "Giới thiệu",
      searchPlaceholder: "Tìm kiếm công cụ OS...",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "BỞI I2FLABS VIỆT NAM • HỆ ĐIỀU HÀNH AGENT ĐỘC LẬP",
      title: "Hệ điều hành Agent & Bộ não ngoại vi",
      desc: "Aevum OS là một Hệ điều hành không gian làm việc độc lập và Bộ não ngoại vi — chứa các bản lập kế hoạch hướng tên miền (DDD), biểu đồ bộ nhớ tự phục hồi và sự điều phối biệt đội đa agent tự trị tách biệt hoàn toàn khỏi các trình soạn thảo truyền thống.",
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
        title: "Bộ não Ngoại vi hướng Tên miền (DDD)",
        desc: "Cấu trúc hóa bộ nhớ sống của dự án theo kiến trúc Domain-Driven Design: Phân chia thành Domains (miền kiến trúc lõi), Features (tính năng), Plans (kế hoạch thực thi) và Personas (nhân vật), ngăn ngừa hiện tượng rác ngữ cảnh.",
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
      tag: "Kiến trúc Agentic OS",
      title: "Các bước Đột phá Cốt lõi của Aevum OS",
      desc: "Một Hệ điều hành Agent độc lập chứa bộ nhớ ngữ cảnh hướng tên miền, nghi thức bắt tay và điều phối biệt đội đa agent tự trị.",
      b1Title: "Nghi thức Bắt tay & Đồng bộ hóa Linh hồn",
      b1Desc: "Aevum OS hoạt động như một daemon độc lập. Khi khởi động, nó phát tín hiệu `.aevum/signal.json` và đồng bộ hóa 'linh hồn' của Agent thông qua `aevum_submit_ack` hoàn toàn độc lập với các API trình soạn thảo truyền thống.",
      b1Active: "KHỞI CHẠY NHÂN: Tín hiệu đã phát (.aevum/signal.json)",
      b2Title: "Bộ não Ngoại vi hướng Tên miền (DDD)",
      b2Desc: "Thiết lập cấu trúc phân cấp bộ nhớ sống vĩnh viễn cho không gian làm việc: Domains (trụ cột kiến trúc), Features (cụm chức năng), Plans (tài liệu nhiệm vụ), và Personas (nhân vật).",
      b2Active: "Nhân Bộ nhớ OS Đang hoạt động",
      b2Live: "Ghi nhận trực tiếp",
      b2Connectivity: "Kết nối mạng PiperNet IoA",
      b2Verified: "Đã xác thực",
      b3Title: "Điều phối Biệt đội Agent Tự trị (Squad OS)",
      b3Desc: "Điều phối một đội ngũ các AI agent tự trị. Sử dụng `aevum_squad_handoff` để chuyển giao công việc giữa các nhân vật chuyên biệt (Kiến trúc sư sang Lập trình viên hoặc Chuyên gia bảo mật) với độ toàn vẹn ngữ cảnh 100%.",
      b3Pillars: [
        "[+] Nhân vật Kiến trúc sư",
        "[+] Nhân vật Lập trình viên",
        "[+] Chuyên gia Bảo mật",
        "[+] Phiên thảo luận Biệt đội"
      ],
      b4Title: "Bộ nhớ Sống & Mạng lưới PiperNet (IoA)",
      b4Desc: "Khi một kế hoạch hoàn thành, Aevum OS sẽ thu hoạch các bài học kinh nghiệm vào Bộ nhớ Toàn cục. Kết nối với PiperNet (Internet of Agents) để truy vấn trí tuệ thủ tục tập thể trên mạng lưới agent."
    },
    foundationGrid: {
      tag: "Bộ Giao thức Tiêu chuẩn",
      title: "Bảng Tham chiếu MCP Tooling của Aevum",
      desc: "Các công cụ Model Context Protocol (MCP) chuyên dụng hiển thị các lệnh tạo domain, điều phối biệt đội và truy xuất sự kiện lưu trữ.",
      c1Tag: "CẤU TRÚC & LẬP KẾ HOẠCH",
      c1Title: "Công cụ Domain & Kế hoạch",
      c1Desc: "Tạo lập nguyên tử các thực thể DDD và các tài liệu nhiệm vụ được theo dõi trạng thái",
      c1ToolTitle: "Công cụ MCP Chính",
      c1ToolType: "API cấu trúc",
      c2Tag: "BIỆT ĐỘI & BỘ NHỚ",
      c2Title: "Công cụ Biệt đội & Bộ nhớ Sống",
      c2Desc: "Điều phối đa agent, khởi tạo nhân vật và truy xuất ngữ nghĩa",
      c2ToolTitle: "Công cụ MCP Chính",
      c2ToolType: "API biệt đội & bộ nhớ"
    },
    frameworkFlow: {
      tag: "Hạ tầng Bộ não Ngoại vi Thống nhất",
      title: "Không gian làm việc Trung tâm & Trung tâm Bộ não Ngoại vi",
      desc: "Aevum OS hoạt động như một Bộ não ngoại vi được tách rời — đóng vai trò là nguồn dữ liệu tin cậy duy nhất cho bộ nhớ ngữ cảnh sống, các quyết định kiến trúc và trạng thái của biệt đội agent trên tất cả các môi trường phát triển AI của bạn."
    },
    testimonials: {
      tag: "CỘNG ĐỒNG CHỨNG NHẬN",
      title: "Được yêu thích bởi Pied Piper & Cộng đồng",
      desc: "Được sử dụng bởi các kỹ sư có tầm nhìn và các nhà sáng tạo công nghệ hàng đầu trên toàn thế giới.",
      installs: "Lượt cài đặt OpenVSX",
      score: "Điểm Weissman",
      bootTime: "Thời gian khởi động Daemon",
      r1Text: '“Thuật toán nén ngữ cảnh Middle-Out của Aevum OS thật điên rồ! Nó duy trì Điểm số Weissman 100% trên toàn bộ biệt đội agent của chúng tôi mà không làm mất một byte nào.”',
      r2Text: '“Tôi đã xây dựng Anton để xử lý tải hệ thống, nhưng daemon Aevum OS chạy cục bộ khiến các IDE truyền thống trông thật trẻ con. Không thể hack, nhanh kinh hoàng và vượt trội về mọi mặt.”',
      r3Text: '“Tôi đã thử viết các script chuyển giao agent tùy chỉnh, nhưng điều phối biệt đội của Aevum OS quá mượt mà đến nỗi Gilfoyle cũng không thể tìm ra một lỗi nào trong triển khai của tôi.”',
      r4Text: '“Bộ não ngoại vi DDD của Aevum OS liên kết sự cộng hưởng tâm hồn của biệt đội chúng tôi một cách hoàn hảo. Tôi cảm thấy an tâm khi biết các kế hoạch tên miền được thu hoạch vào Bộ nhớ Toàn cục.”'
    },
    ctaBanner: {
      tag: "DAEMON ĐỘC LẬP SẴN SÀNG",
      title: "Triển khai Aevum OS Trên Hệ thống của bạn",
      desc: "Chạy `aevum --transport sse` để kết nối tức thì Cursor, Claude Desktop và Antigravity IDE với công cụ ngữ cảnh thống nhất của bạn.",
      downloadBtn: "Đăng ký trải nghiệm",
      docsBtn: "Đọc tài liệu"
    },
    footer: {
      brandDesc: "Hệ điều hành Agent độc lập & Bộ não ngoại vi không gian làm việc phát triển bởi I2FLabs Việt Nam. Tách biệt hoàn toàn khỏi các trình soạn thảo truyền thống.",
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
      tag: "CÓ MẶT TRÊN UNIKORN VIỆT NAM",
      title: "Được Bình chọn là Sản phẩm của Ngày trên Unikorn.vn",
      desc: "Khám phá bài viết phân tích kiến trúc chi tiết, tính năng và thảo luận cộng đồng về Aevum OS trên Unikorn Việt Nam — nền tảng hàng đầu tôn vinh các sáng tạo công nghệ Việt.",
      btn: "Đọc bài viết phân tích sâu trên Unikorn.vn →"
    },
    i2flabs: {
      tag: "PHÁT TRIỂN BỞI I2FLABS VIỆT NAM",
      title: "Xây dựng bởi Đội ngũ Sáng tạo tại I2FLabs",
      desc: "Chúng tôi là một tập thể kỹ sư chuyên biệt tiên phong trong việc phát triển các Hệ điều hành Agent có chủ quyền, bộ nhớ ngữ cảnh sống và hạ tầng phần mềm tự trị thế hệ mới.",
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
      architecture: "OS Architecture",
      orchestration: "Agentic Ecosystem",
      kernel: "OS Kernel & Daemon",
      docs: "Docs",
      about: "About",
      searchPlaceholder: "Search OS Tools",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "BY I2FLABS VIET NAM • STANDALONE AGENTIC OPERATING SYSTEM",
      title: "Agentic OS & External Brain",
      desc: "Aevum OS is an independent workspace Operating System and External Brain — housing domain-driven planning, self-healing memory graphs, and autonomous multi-agent squad orchestration completely decoupled from traditional editors.",
      downloadBtn: "Request Early Access",
      docsBtn: "Read Documentation",
      startKernel: "START OS KERNEL DAEMON:",
      copyCmd: "Copy Command"
    },
    subNavTabs: {
      tab1: "Standalone OS Kernel",
      tab2: "Handshake Ritual",
      tab3: "Domain DDD Brain",
      tab4: "Squad Orchestration",
      tab5: "Plan-First Pipeline",
      tab6: "PiperNet (IoA)"
    },
    subNavDetails: {
      tab1: {
        tag: "DAEMON KERNEL PROCESS",
        title: "Standalone OS Kernel & MCP Daemon Server",
        desc: "Aevum OS operates as a standalone local daemon process via SSE (Port 3344) or Stdio. All AI editors (Cursor, VS Code, Claude Desktop) connect to a single, unified External Brain with zero editor lock-in.",
        cmd: "aevum --transport sse --port 3344",
        pills: ["0.1s Boot Time", "Open MCP Protocol", "Zero Editor Lock-in"]
      },
      tab2: {
        tag: "HANDSHAKE RITUAL & SOUL SYNC",
        title: "Handshake Ritual & Agent Authentication",
        desc: "On startup, the daemon emits a security signal at `.aevum/signal.json` containing a session token. Guest agents must call `aevum_submit_ack` to authenticate access and hydrate operating protocols.",
        cmd: 'aevum_submit_ack({ token: "AEVUM_SIGNAL_TOKEN_OK" })',
        pills: [".aevum/signal.json File", "Token Authentication", "Protocol Hydration"]
      },
      tab3: {
        tag: "DOMAIN-DRIVEN BRAIN (DDD)",
        title: "Domain-Driven External Brain (DDD)",
        desc: "Structures workspace living memory using Domain-Driven Design: Divided into Domains (architectural pillars), Features, Plans, and Personas, preventing context pollution.",
        cmd: 'aevum_create_domain({ domainId: "core", name: "Core Infrastructure" })',
        pills: ["DDD Hierarchy", "Living Memory Graph", "Persistent Vault"]
      },
      tab4: {
        tag: "AUTONOMOUS SQUAD OS",
        title: "Autonomous Multi-Agent Squad Orchestration",
        desc: "Enables seamless task handoffs between specialized Personas via `aevum_squad_handoff` (Architect -> Developer -> Security Specialist) and launches huddle sessions with 100% context integrity.",
        cmd: 'aevum_squad_handoff({ targetPersona: "Luna (UI)", task: "Refactor CSS Grid" })',
        pills: ["Task Handoff", "Squad Huddles", "EXP & Skill Progression"]
      },
      tab5: {
        tag: "PLAN-FIRST WORKFLOW",
        title: "Plan-First, Code-Later Execution Pipeline",
        desc: "Enforces rigorous plan drafting, alignment via `/grill-me`, task anchoring, and evidence harvesting upon mission completion before writing production code.",
        cmd: 'aevum_create_plan({ title: "Auth Pipeline", domainId: "security" })',
        pills: ["Implementation Plan", "/grill-me Alignment", "Evidence Harvesting"]
      },
      tab6: {
        tag: "PIPERNET IOA MESH",
        title: "Decentralized Collective Wisdom Mesh (PiperNet)",
        desc: "A distributed Internet of Agents (IoA) mesh allowing agents to broadcast and query abstracted architectural patterns via `aevum_pipernet_broadcast` without leaking raw source code.",
        cmd: 'aevum_pipernet_broadcast({ pattern: "JWT_REFRESH_ROTATION" })',
        pills: ["P2P Mesh Network", "Abstracted Knowledge", "Zero Source Code Leakage"]
      }
    },
    bentoGrid: {
      tag: "Agentic OS Architecture",
      title: "Core Breakthroughs of Aevum OS",
      desc: "An independent Agentic Operating System housing domain-driven context memory, handshake rituals, and multi-agent squad orchestration.",
      b1Title: "The Handshake Ritual & Soul Sync",
      b1Desc: "Aevum OS acts as a standalone daemon. On startup, it emits `.aevum/signal.json` and synchronizes the Agent's \"soul\" via `aevum_submit_ack` completely independent of traditional editor APIs.",
      b1Active: "OS KERNEL: Signal Emitted (.aevum/signal.json)",
      b2Title: "Domain-Driven External Brain (DDD)",
      b2Desc: "Establishes a permanent living memory hierarchy for the workspace: Domains (architectural pillars), Features (functional clusters), Plans (mission documents), and Personas.",
      b2Active: "OS Memory Kernel Active",
      b2Live: "Recording Live",
      b2Connectivity: "PiperNet IoA Connectivity",
      b2Verified: "Verified",
      b3Title: "Autonomous Squad OS Orchestration",
      b3Desc: "Coordinates a team of autonomous AI agents. Use `aevum_squad_handoff` to transfer tasks between specialized personas (Architect to Developer or Security Specialist) with 100% context persistence.",
      b3Pillars: [
        "[+] Architect Persona",
        "[+] Developer Persona",
        "[+] Security Specialist",
        "[+] Squad Huddle Session"
      ],
      b4Title: "Living Memory & PiperNet (IoA)",
      b4Desc: "When a plan is completed, Aevum OS harvests lessons learned into Global Memory. Connect to PiperNet (Internet of Agents) to query collective procedural intelligence across agent networks."
    },
    foundationGrid: {
      tag: "Standardized Protocol Suite",
      title: "Aevum Native MCP Tooling Reference",
      desc: "Specialized Model Context Protocol tools exposing domain creation, squad coordination, and persistent fact retrieval.",
      c1Tag: "STRUCTURE & PLANNING",
      c1Title: "Domain & Plan Tools",
      c1Desc: "Atomic creation of DDD entities and state-tracked mission documents",
      c1ToolTitle: "Key MCP Tools",
      c1ToolType: "Structure API",
      c2Tag: "SQUAD & MEMORY",
      c2Title: "Squad & Living Memory Tools",
      c2Desc: "Multi-agent coordination, persona initialization, and semantic retrieval",
      c2ToolTitle: "Key MCP Tools",
      c2ToolType: "Squad & Memory API"
    },
    frameworkFlow: {
      tag: "UNIFIED EXTERNAL BRAIN INFRASTRUCTURE",
      title: "Central Workspace & External Brain Hub",
      desc: "Aevum OS operates as a decoupled External Brain — serving as the single source of truth for living context memory, architectural decisions, and agent squad state across all your AI development environments."
    },
    testimonials: {
      tag: "COMMUNITY ENDORSED",
      title: "Loved by Pied Piper & Community",
      desc: "Used by visionary engineers and top technology creators worldwide.",
      installs: "OpenVSX Installs",
      score: "Weissman Score",
      bootTime: "Daemon Boot Time",
      r1Text: '"Aevum OS\'s Middle-Out context compression algorithm is insane! It maintains a 100% Weissman Score across our entire agent squad without dropping a single byte."',
      r2Text: '"I built Anton to handle system loads, but Aevum OS daemon running locally makes traditional IDEs look childish. Unhackable, satanically fast, and superior in every way."',
      r3Text: '"I tried writing custom agent handoff scripts, but Aevum OS squad orchestration is so smooth that even Gilfoyle couldn\'t find a single flaw in my implementation."',
      r4Text: '"Aevum OS DDD External Brain aligns our squad\'s spiritual resonance perfectly. I feel emotionally secure knowing domain plans are harvested into Global Memory."'
    },
    ctaBanner: {
      tag: "STANDALONE DAEMON READY",
      title: "Deploy Aevum OS On Your System",
      desc: "Run `aevum --transport sse` to instantly connect Cursor, Claude Desktop, and Antigravity IDE to your unified context engine.",
      downloadBtn: "Request Early Access",
      docsBtn: "Read Documentation"
    },
    footer: {
      brandDesc: "Standalone Agentic Operating System & Workspace External Brain developed by I2FLabs Viet Nam. Completely decoupled from traditional editors.",
      links: {
        docs: "Documentation",
        openVsx: "Open VSX (v1.7)",
        unikorn: "Unikorn Article",
        github: "GitHub"
      },
      cols: {
        arch: "OS Architecture",
        exec: "OS Execution Modes",
        eco: "Agent Ecosystem"
      },
      copyright: "Copyright © 2026 I2FLabs Viet Nam. Autonomous Agentic Operating System.",
      status: "Aevum OS Standalone MCP Daemon • Kernel Active"
    },
    unikorn: {
      tag: "FEATURED ON UNIKORN VIETNAM",
      title: "Voted Product of the Day on Unikorn.vn",
      desc: "Explore the detailed architectural deep dive, feature analysis, and community discussion of Aevum OS on Unikorn Vietnam — the premier platform celebrating Vietnamese technology innovations.",
      btn: "Read Deep Dive Article on Unikorn.vn →"
    },
    i2flabs: {
      tag: "ENGINEERED BY I2FLABS VIET NAM",
      title: "Built by the Innovation Team at I2FLabs",
      desc: "We are a specialized engineering collective pioneering sovereign Agentic Operating Systems, living context memory, and next-generation autonomous software infrastructure.",
      p1Tag: "KERNEL ENGINE",
      p1Title: "Core Kernel Architecture",
      p1Desc: "High-throughput SSE & Stdio daemon engine running locally with zero editor lock-in and instant startup.",
      p2Tag: "DDD LIVING MEMORY",
      p2Title: "Living Memory System",
      p2Desc: "Domain-Driven External Brain persisting structured architectural memory, features, and plan evidence.",
      p3Tag: "MULTI-AGENT SQUAD",
      p3Title: "Squad Orchestration",
      p3Desc: "Enables seamless task handoff between specialized agents (Architect, Coder, Security) with 100% context integrity via Huddle & Handoff protocols.",
      p4Tag: "PIPERNET IOA MESH",
      p4Title: "PiperNet IoA Protocol",
      p4Desc: "Distributed Internet of Agents network enabling cross-agent procedural intelligence sharing."
    },
    about: {
      heroTag: "PRODUCT STORY",
      heroTitle: "The Aevum Journey: Taming the AI Agent Chaos",
      heroDesc: "The story of how I2FLabs Viet Nam created a standalone External Brain to save AI agents from short-term context amnesia.",
      storyTitle: "The Pain & The Genesis",
      storySubtitle1: "The Never-Ending Context Battle",
      storyText1: "Pair-programming with AI today feels like collaborating with a brilliant engineer who gets short-term amnesia every few minutes. Every time you swap projects, or simply switch workspaces between Cursor, VS Code, and Claude Desktop, crucial context, hard-fought architectural decisions, and painful debug lessons simply evaporate. You find yourself trapped in an endless loop of copy-pasting folders and rewriting prompts to explain your project over and over again.",
      storySubtitle2: "The Spark at I2FLabs Viet Nam",
      storyText2: "At I2FLabs Viet Nam, we asked ourselves: 'Why should an agent's intelligence be locked inside the sandbox of a specific IDE?'. Why not extract the agent's brain into a standalone entity — a local daemon running on the developer's machine, holding a permanent Living Memory Graph that follows the project? That spark created Aevum OS — a decoupled Agentic Operating System that helps your AI agents plan, accumulate experience, and collaborate as a true autonomous squad.",
      pillarsTitle: "The Aevum Design Manifesto",
      p1Title: "Decoupled Workspace Brain",
      p1Desc: "Decouples context, memory, and persona configurations from the IDE. Any AI agent running from any editor or CLI accesses a single, unified source of truth via the open MCP protocol.",
      p2Title: "Plan-First, Code-Later Flow",
      p2Desc: "Replaces raw prompt shooting with a structured Domain-Driven Planning cycle. Every task is mapped, cross-checked, and anchored with harvested evidence before a single line of code is written.",
      p3Title: "Living Memory Graph Engine",
      p3Desc: "Upon plan completion, Aevum OS harvests engineering lessons and skeletal code structures into a self-healing graph, so future sessions instantly inherit past learnings.",
      p4Title: "Peer-to-Peer Collective Wisdom (PiperNet)",
      p4Desc: "Connects agent squads across different workspaces over the decentralized PiperNet mesh, sharing abstract design patterns without leaking raw project source code."
    }
  }
};

export default translations;
