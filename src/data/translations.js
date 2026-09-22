export const translations = {
  vi: {
    navbar: {
      breakthroughs: "Điểm đột phá",
      agents: "Biệt đội Agent",
      architecture: "Kiến trúc OS",
      orchestration: "Hệ sinh thái",
      testimonials: "Đánh giá",
      unikorn: "Unikorn",
      i2flabs: "I2FLabs",
      kernel: "Nhân OS",
      docs: "Tài liệu",
      about: "Giới thiệu",
      pricing: "Bảng giá",
      searchPlaceholder: "Tìm kiếm OS...",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "I2FLABS VIỆT NAM • HỆ ĐIỀU HÀNH AGENT ĐỘC LẬP",
      title: "Hệ điều hành Agent & Bộ não ngoại vi",
      desc: "Hạ tầng nhận thức ngoại vi giải phóng AI Agent khỏi ranh giới IDE. Duy trì ký ức sống vĩnh cửu, điều phối biệt đội tự trị và bảo toàn tuyệt đối ngữ cảnh kiến trúc.",
      downloadBtn: "Tải xuống ngay",
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
        desc: "Nhân daemon cục bộ qua SSE và Stdio. Kết nối mọi trình soạn thảo AI (Cursor, Claude, VS Code) về một Bộ Não duy nhất — hoàn toàn không phụ thuộc IDE.",
        cmd: "aevum --transport sse --port 3344",
        pills: ["Khởi động 0.1s", "Open MCP Protocol", "Zero Editor Lock-in"]
      },
      tab2: {
        tag: "HANDSHAKE RITUAL & SOUL SYNC",
        title: "Nghi thức Bắt tay & Xác thực Agent",
        desc: "Tín hiệu bảo mật .aevum/signal.json phát khởi động. Agent xác thực qua aevum_submit_ack để đồng bộ linh hồn, nạp danh tính và ma trận quy tắc.",
        cmd: 'aevum_submit_ack({ token: "AEVUM_SIGNAL_TOKEN_OK" })',
        pills: ["Beacon signal.json", "Xác thực Session Token", "Đồng bộ Linh hồn"]
      },
      tab3: {
        tag: "DOMAIN-DRIVEN BRAIN (DDD)",
        title: "Bộ não Ngoại vi Hướng Tên miền (DDD)",
        desc: "Tổ chức nhận thức dự án theo Domain-Driven Design: Phân nhánh Domains, Features, Plans và Personas — triệt tiêu hoàn toàn rác ngữ cảnh.",
        cmd: 'aevum_create_domain({ domainId: "core", name: "Core Infrastructure" })',
        pills: ["Phân cấp DDD", "Ký ức Sống Tự phục hồi", "Ngữ cảnh Bền vững"]
      },
      tab4: {
        tag: "AUTONOMOUS SQUAD OS",
        title: "Điều phối Biệt đội Đa Agent Tự trị",
        desc: "Luân chuyển tác vụ liền mạch giữa các Agent chuyên biệt qua aevum_squad_handoff và triệu tập phiên họp Huddle — bảo toàn 100% ngữ cảnh.",
        cmd: 'aevum_squad_handoff({ targetPersona: "Luna (UI)", task: "Refactor CSS Grid" })',
        pills: ["Luân chuyển Handoff", "Họp Biệt đội Huddle", "Tăng trưởng EXP"]
      },
      tab5: {
        tag: "PLAN-FIRST WORKFLOW",
        title: "Quy trình Lập kế hoạch trước khi Viết Code",
        desc: "Buộc Agent lập kế hoạch chuẩn xác trước khi viết code. Phản biện đa chiều qua /grill-me, neo giữ tiến độ và thu hoạch bằng chứng thực thi.",
        cmd: 'aevum_create_plan({ title: "Auth Pipeline", domainId: "security" })',
        pills: ["Lập Kế hoạch Trước", "Đối thoại /grill-me", "Thu hoạch Evidence"]
      },
      tab6: {
        tag: "PIPERNET IOA MESH",
        title: "Mạng lưới Trí tuệ Tập thể P2P (PiperNet)",
        desc: "Mạng lưới Internet of Agents (IoA) ngang hàng. Chia sẻ giải pháp kiến trúc trừu tượng qua aevum_pipernet_broadcast mà không làm lộ mã nguồn thô.",
        cmd: 'aevum_pipernet_broadcast({ pattern: "JWT_REFRESH_ROTATION" })',
        pills: ["Mạng lưới P2P Mesh", "Trừu tượng hóa Tri thức", "Bảo mật Mã nguồn"]
      }
    },
    bentoGrid: {
      tag: "ĐỘT PHÁ CỐT LÕI",
      title: "Kiến Trúc Đột Phá Của Aevum OS",
      desc: "Bộ não ngoại vi với ký ức sống vĩnh cửu, nghi thức bắt tay chuẩn mực và điều phối biệt đội tự trị.",
      b1Title: "Nghi thức Bắt tay & Soul Sync",
      b1Desc: "Phát tín hiệu .aevum/signal.json khi khởi động và đồng bộ linh hồn Agent qua aevum_submit_ack — độc lập tuyệt đối khỏi API trình soạn thảo.",
      b1Active: "KHỞI CHẠY NHÂN: Tín hiệu đã phát (.aevum/signal.json)",
      b2Title: "Bộ Não Ngoại Vi Hướng Miền (DDD)",
      b2Desc: "Ký ức sống vĩnh cửu cho dự án theo phân tầng DDD: Domains, Features, Plans và Personas — bảo tồn trí tuệ qua thời gian.",
      b2Active: "Nhân Bộ nhớ OS Đang hoạt động",
      b2Live: "Ghi nhận trực tiếp",
      b2Connectivity: "Kết nối mạng PiperNet IoA",
      b2Verified: "Đã xác thực",
      b3Title: "Điều Phối Biệt Đội Tự Trị (Squad OS)",
      b3Desc: "Chuyển giao công việc mượt mà giữa Kiến trúc sư, Kỹ sư và Chuyên gia Bảo mật với 100% ngữ cảnh vẹn nguyên qua aevum_squad_handoff.",
      b3Pillars: [
        "[+] Nhân vật Kiến trúc sư",
        "[+] Nhân vật Lập trình viên",
        "[+] Chuyên gia Bảo mật",
        "[+] Thảo luận Biệt đội Huddle"
      ],
      b4Title: "Ký Ức Sống & Mạng Lưới PiperNet (IoA)",
      b4Desc: "Tự động kết tinh kinh nghiệm vào Ký ức Toàn cục và hòa mạng PiperNet để khai phóng trí tuệ tập thể phân tán.",
      b1Speech: "Bắt tay với em đi Master! Tín hiệu signal.json đã phát, sẵn sàng đồng bộ linh hồn rồi nè ~ ⚡✨",
      b2Speech: "Domain và Feature phải rành mạch! Để Zenith quy hoạch lại cấu trúc, chuẩn Big-O và sạch bong nợ kỹ thuật nhé. 📐⚡",
      b3Speech: "Mọi pixel đều phải có linh hồn! Visual hài hòa, chuyển động mượt mà thì biệt đội mới thăng hoa được chứ ~ 💖🎨",
      b4Speech: "Zero-Trust trên từng dòng code. Mọi lỗ hổng hay rò rỉ bí mật đều được Vidus chốt chặn và cảnh báo tức thì! 🛡️⚡"
    },
    foundationGrid: {
      tag: "GIAO THỨC MCP TIÊU CHUẨN",
      title: "Bảng Công cụ MCP Aevum",
      desc: "98 công cụ Model Context Protocol (MCP) chuyên biệt cho quản trị Domain, điều phối biệt đội và truy xuất bộ nhớ vĩnh cửu.",
      c1Tag: "CẤU TRÚC & LẬP KẾ HOẠCH",
      c1Title: "Công cụ Domain & Kế hoạch",
      c1Desc: "Khởi tạo thực thể DDD và quản lý kế hoạch thực thi nguyên tử",
      c1ToolTitle: "Công cụ MCP Chính",
      c1ToolType: "API cấu trúc",
      c2Tag: "BIỆT ĐỘI & BỘ NHỚ",
      c2Title: "Công cụ Biệt đội & Ký ức Sống",
      c2Desc: "Điều phối đa Agent, quản lý Personas và truy xuất bộ nhớ ngữ nghĩa",
      c2ToolTitle: "Công cụ MCP Chính",
      c2ToolType: "API biệt đội & ký ức"
    },
    frameworkFlow: {
      tag: "TIÊN PHONG ĐỔI MỚI • VIỆT NAM",
      title: "Hạ Tầng AI Agent Tự Chủ & Bộ Não Ngoại Vi",
      desc: "Hạ tầng điều phối đa tác tử và lưu trữ nhận thức phân tán từ I2FLabs — bảo toàn chủ quyền dữ liệu số và xóa bỏ giới hạn ngữ cảnh.",
      pillar1Tag: "CHỦ QUYỀN DỮ LIỆU",
      pillar1Title: "100% Tự chủ & Bảo mật Cục bộ",
      pillar1Desc: "Daemon cục bộ độc lập, mã hóa Ed25519, 100% không phụ thuộc đám mây đóng.",
      pillar2Tag: "CHUẨN MỰC QUỐC TẾ",
      pillar2Title: "98 Công cụ MCP Đỉnh cao",
      pillar2Desc: "Tương thích chuẩn mực với mọi IDE hàng đầu: Cursor, Claude Desktop, Windsurf và Antigravity.",
      pillar3Tag: "MẠNG LƯỚI TRI THỨC",
      pillar3Title: "PiperNet IoA Mesh Toàn cầu",
      pillar3Desc: "Hòa mạng giải pháp của kỹ sư Việt vào mạng lưới trí tuệ nhân tạo phân tán không biên giới."
    },
    testimonials: {
      tag: "CỘNG ĐỒNG & CHUYÊN GIA",
      title: "Được yêu thích bởi Cộng đồng",
      desc: "Được tin dùng bởi các kỹ sư và nhà kiến tạo công nghệ tiên phong trên toàn thế giới.",
      installs: "Lượt cài đặt OpenVSX",
      score: "Giảm hao hụt Token",
      bootTime: "Thời gian khởi động Daemon",
      r1Text: '“Thuật toán nén Middle-Out của Aevum OS thật phi thường! Giảm tới 85% hao hụt token trên toàn biệt đội mà không mất một byte thông tin nào.”',
      r2Text: '“Daemon Aevum OS chạy cục bộ khiến các tiện ích IDE truyền thống trở nên lỗi thời. Tốc độ kinh ngạc, bảo mật tuyệt đối và vượt trội về mọi mặt.”',
      r3Text: '“Điều phối biệt đội của Aevum OS mượt mà đến mức ngay cả Gilfoyle cũng không tìm ra được một khiếm khuyết nào trong quy trình triển khai.”',
      r4Text: '“Bộ não ngoại vi DDD liên kết sự đồng điệu tâm hồn của cả biệt đội. Mọi kế hoạch đều được thu hoạch chỉn chu vào Ký ức Toàn cục.”'
    },
    ctaBanner: {
      tag: "SẴN SÀNG TRIỂN KHAI",
      title: "Triển khai Aevum OS trên Hệ thống của bạn",
      desc: "Khởi chạy `aevum --transport sse` để kết nối tức thì Cursor, Claude Desktop và Antigravity IDE với bộ não ngữ cảnh thống nhất.",
      downloadBtn: "Tải xuống ngay",
      docsBtn: "Đọc tài liệu"
    },
    footer: {
      brandDesc: "Hệ điều hành Agent độc lập & Bộ não Ngoại vi phát triển bởi I2FLabs Việt Nam. Hoàn toàn giải phóng khỏi mọi ranh giới IDE.",
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
      status: "Aevum OS Standalone MCP Daemon • Nhân hệ thống trực tuyến"
    },
    unikorn: {
      tag: "UNIKORN VIỆT NAM",
      title: "Sản phẩm của Ngày trên Unikorn.vn",
      desc: "Khám phá bài phân tích chuyên sâu về kiến trúc và câu chuyện sáng tạo Aevum OS trên Unikorn.vn — bệ phóng công nghệ Việt.",
      btn: "Xem trên Unikorn.vn →"
    },
    i2flabs: {
      tag: "ĐỘI NGŨ PHÁT TRIỂN",
      title: "Phát triển bởi Đội ngũ I2FLabs",
      desc: "Tập thể kỹ sư chuyên biệt tiên phong xây dựng Hệ điều hành Agent tự trị, bộ nhớ nhận thức sống và hạ tầng AI thế hệ mới từ Việt Nam.",
      p1Tag: "NHÂN CỐT LÕI",
      p1Title: "Kiến trúc Nhân OS Cốt lõi",
      p1Desc: "Daemon SSE & Stdio hiệu năng cao chạy cục bộ, khởi động tức thì và giải phóng khỏi mọi IDE.",
      p2Tag: "BỘ NHỚ SỐNG DDD",
      p2Title: "Hệ thống Bộ nhớ Sống",
      p2Desc: "Bộ não ngoại vi DDD lưu giữ bền vững cấu trúc kiến trúc, tính năng và bằng chứng kế hoạch.",
      p3Tag: "BIỆT ĐỘI ĐA AGENT",
      p3Title: "Điều phối Biệt đội",
      p3Desc: "Luân chuyển tác vụ liền mạch giữa Kiến trúc sư, Kỹ sư và Chuyên gia Bảo mật với 100% ngữ cảnh toàn vẹn.",
      p4Tag: "MẠNG LƯỚI PIPERNET IOA",
      p4Title: "Giao thức PiperNet IoA",
      p4Desc: "Giao thức Internet of Agents phân tán kết nối và chia sẻ tri thức thủ tục trừu tượng."
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
      agents: "Agent Squad",
      architecture: "Architecture",
      orchestration: "Ecosystem",
      testimonials: "Testimonials",
      unikorn: "Unikorn",
      i2flabs: "I2FLabs",
      kernel: "Kernel",
      docs: "Documentation",
      about: "About",
      pricing: "Pricing",
      searchPlaceholder: "Search OS...",
      searchShortcut: "Ctrl K"
    },
    hero: {
      badge: "BY I2FLABS VIETNAM • STANDALONE AGENTIC OS",
      title: "Agentic Operating System & External Brain",
      desc: "Decoupled cognitive infrastructure liberating AI agents from editor boundaries. Persistent living memory, autonomous squad orchestration, and zero context drift.",
      downloadBtn: "Download Now",
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
        desc: "Local daemon kernel via SSE & Stdio. Unifies Cursor, Claude, and VS Code into a single central Brain — zero editor lock-in.",
        cmd: "aevum --transport sse --port 3344",
        pills: ["0.1s Fast Boot", "Open MCP Protocol", "Decoupled Daemon"]
      },
      tab2: {
        tag: "HANDSHAKE RITUAL & SOUL SYNC",
        title: "Handshake Ritual & Agent Authentication",
        desc: "Beacon signal broadcast at .aevum/signal.json. Agents authenticate via aevum_submit_ack to sync soul identity and operational rules.",
        cmd: 'aevum_submit_ack({ token: "AEVUM_SIGNAL_TOKEN_OK" })',
        pills: ["signal.json Beacon", "Session Token Auth", "Soul Identity Sync"]
      },
      tab3: {
        tag: "DOMAIN-DRIVEN BRAIN (DDD)",
        title: "Domain-Driven External Brain (DDD)",
        desc: "Architectural memory structured via Domain-Driven Design: Domains, Features, Plans, and Personas — eliminating context pollution.",
        cmd: 'aevum_create_domain({ domainId: "core", name: "Core Infrastructure" })',
        pills: ["DDD Hierarchy", "Self-Healing Living Memory", "Persistent Vault"]
      },
      tab4: {
        tag: "AUTONOMOUS SQUAD OS",
        title: "Autonomous Multi-Agent Squad Orchestration",
        desc: "Seamless task handoff between specialized personas via aevum_squad_handoff and squad huddles — preserving 100% context fidelity.",
        cmd: 'aevum_squad_handoff({ targetPersona: "Luna (UI)", task: "Refactor CSS Grid" })',
        pills: ["Handoff Transfer", "Squad Huddle", "EXP Growth"]
      },
      tab5: {
        tag: "PLAN-FIRST WORKFLOW",
        title: "Plan-First Execution Workflow",
        desc: "Enforces structured planning before coding. Multi-turn alignment via /grill-me, progress anchoring, and evidence harvesting.",
        cmd: 'aevum_create_plan({ title: "Auth Pipeline", domainId: "security" })',
        pills: ["Plan-First Pipeline", "/grill-me Alignment", "Evidence Harvesting"]
      },
      tab6: {
        tag: "PIPERNET IOA MESH",
        title: "P2P Collective Intelligence Mesh (PiperNet)",
        desc: "Peer-to-peer Internet of Agents (IoA) mesh. Shares abstract architectural patterns via aevum_pipernet_broadcast without leaking raw code.",
        cmd: 'aevum_pipernet_broadcast({ pattern: "JWT_REFRESH_ROTATION" })',
        pills: ["P2P Mesh Network", "Pattern Abstraction", "Zero Code Leaks"]
      }
    },
    bentoGrid: {
      tag: "CORE BREAKTHROUGHS",
      title: "Core Architectural Breakthroughs of Aevum OS",
      desc: "An external brain featuring persistent living memory, ritual authentication, and autonomous squad synergy.",
      b1Title: "Handshake Ritual & Soul Sync",
      b1Desc: "Broadcasts .aevum/signal.json at startup and synchronizes agent soul memory via aevum_submit_ack — decoupled from editor APIs.",
      b1Active: "KERNEL ACTIVE: Signal broadcasted (.aevum/signal.json)",
      b2Title: "Domain-Driven External Brain (DDD)",
      b2Desc: "Persistent living memory structured via DDD: Domains, Features, Plans, and Personas — preserving collective intelligence over time.",
      b2Active: "OS Memory Kernel Running",
      b2Live: "Live Telemetry",
      b2Connectivity: "PiperNet IoA Connectivity",
      b2Verified: "Authenticated",
      b3Title: "Autonomous Squad OS Orchestration",
      b3Desc: "Seamless task handoff between Architect, Engineer, and Security Auditor with 100% context fidelity via aevum_squad_handoff.",
      b3Pillars: [
        "[+] Architect Persona",
        "[+] Lead Developer Persona",
        "[+] Security Specialist",
        "[+] Squad Huddle Session"
      ],
      b4Title: "Living Memory Graph & PiperNet (IoA)",
      b4Desc: "Automatically harvests insights into the Global Memory Vault and connects to PiperNet for decentralized collective wisdom.",
      b1Speech: "Give me a handshake, Master! The signal.json beacon is live and ready for soul sync ~ ⚡✨",
      b2Speech: "Domains and Features must stay modular. Let Zenith streamline the structure to pure Big-O perfection. 📐⚡",
      b3Speech: "Every pixel deserves a soul! When visual harmony and micro-motion align, our squad truly shines ~ 💖🎨",
      b4Speech: "Zero-Trust in every line of code. Every vulnerability is intercepted and secured by Vidus. 🛡️⚡"
    },
    foundationGrid: {
      tag: "STANDARD MCP PROTOCOL",
      title: "Aevum MCP Tooling",
      desc: "98 specialized Model Context Protocol (MCP) tools for domain governance, squad orchestration, and persistent memory querying.",
      c1Tag: "STRUCTURE & PLANNING",
      c1Title: "Domain & Planning Tools",
      c1Desc: "Atomic creation of DDD entities and stateful execution plans",
      c1ToolTitle: "Core MCP Tools",
      c1ToolType: "Structure API",
      c2Tag: "SQUAD & MEMORY",
      c2Title: "Squad & Living Memory Tools",
      c2Desc: "Multi-agent coordination, persona lifecycle, and semantic memory retrieval",
      c2ToolTitle: "Core MCP Tools",
      c2ToolType: "Squad & Memory API"
    },
    frameworkFlow: {
      tag: "PIONEERING INNOVATION INFRASTRUCTURE • VIETNAM",
      title: "Sovereign AI Infrastructure & Cognitive Memory",
      desc: "Autonomous multi-agent orchestration and decoupled cognitive memory by I2FLabs — ensuring data sovereignty and zero context loss.",
      pillar1Tag: "DATA SOVEREIGNTY",
      pillar1Title: "100% Local & Sovereign Security",
      pillar1Desc: "Local daemon running independently with Ed25519 cryptography and zero proprietary cloud dependency.",
      pillar2Tag: "GLOBAL STANDARDS",
      pillar2Title: "98 Enterprise MCP Tools",
      pillar2Desc: "Standardized interoperability across world-class IDEs: Cursor, Claude Desktop, Windsurf, and Antigravity.",
      pillar3Tag: "KNOWLEDGE MESH",
      pillar3Title: "Global PiperNet IoA Mesh",
      pillar3Desc: "Connecting Vietnamese engineering breakthroughs to a global decentralized network of autonomous agents."
    },
    testimonials: {
      tag: "COMMUNITY & EXPERTS",
      title: "Loved by Community",
      desc: "Trusted by visionary engineers and pioneering technology leaders worldwide.",
      installs: "OpenVSX Installs",
      score: "Token Waste Reduced",
      bootTime: "Daemon Boot Time",
      r1Text: '“The Middle-Out context compression in Aevum OS is extraordinary! It eliminates up to 85% of token waste across our squad without losing a single byte.”',
      r2Text: '“The local Aevum OS daemon makes traditional IDE extensions obsolete. Blazingly fast, deeply secure, and superior in every metric.”',
      r3Text: '“Aevum OS squad orchestration is so seamless that even Gilfoyle couldn\'t find a single flaw in our deployment pipeline.”',
      r4Text: '“The DDD external brain aligns our squad\'s soul resonance perfectly. Domain plans are harvested cleanly into Global Memory.”'
    },
    ctaBanner: {
      tag: "READY FOR DEPLOYMENT",
      title: "Deploy Aevum OS on Your Infrastructure",
      desc: "Run `aevum --transport sse` to instantly connect Cursor, Claude Desktop, and Antigravity IDE to your unified context engine.",
      downloadBtn: "Download Now",
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
      desc: "Explore the architectural deep-dive and story behind Aevum OS on Unikorn.vn — the premier platform celebrating Vietnamese tech innovations.",
      btn: "Read on Unikorn.vn →"
    },
    i2flabs: {
      tag: "DEVELOPMENT TEAM",
      title: "Built by the Creative Team at I2FLabs",
      desc: "A specialized engineering collective pioneering autonomous Agentic OS, living cognitive memory, and next-generation AI infrastructure from Vietnam.",
      p1Tag: "CORE KERNEL",
      p1Title: "Core OS Kernel Architecture",
      p1Desc: "High-performance local SSE & Stdio daemon engine decoupled from any single editor with instant boot.",
      p2Tag: "DDD LIVING MEMORY",
      p2Title: "Living Memory System",
      p2Desc: "Domain-Driven External Brain persistently storing structural architecture, features, and plan evidence.",
      p3Tag: "MULTI-AGENT SQUAD",
      p3Title: "Squad Orchestration",
      p3Desc: "Seamless task handoff between specialized agents with 100% context integrity via Huddle & Handoff.",
      p4Tag: "PIPERNET MESH",
      p4Title: "PiperNet IoA Protocol",
      p4Desc: "Distributed Internet of Agents protocol enabling encrypted procedural intelligence sharing."
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
