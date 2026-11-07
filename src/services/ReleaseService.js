const RELEASE_BODY_OVERRIDES = {
  'v2.0.0-beta.5': `# Aevum-OS v2.0.0-beta.5
Bản phát hành Beta công khai toàn diện, tích hợp ma trận ký số tự động đa nền tảng, hệ thống phát sóng email thông báo cập nhật qua Aevum Cloud và cơ chế cập nhật vi sai Blockmap siêu tốc.

### Tính năng mới (New Features)
- **Hạ tầng Ký số Tự động & Apple Notarization (Automated Code Signing & Notarization)**: Tích hợp đầy đủ Apple Entitlements (Hardened Runtime, JIT cho V8, bộ nhớ thực thi không dấu cho terminal \`node-pty\`), tự động công chứng qua Apple Notarytool trên máy ảo Apple Silicon và ký số Windows với chuẩn RFC 3161 DigiCert Timestamping.
- **Hệ thống Phát sóng Email Tự Động Qua Aevum Cloud (Release Email Broadcast)**: Kết nối trực tiếp GitHub Actions với máy chủ Aevum Cloud (Fastify + Resend), tự động nhận diện và gửi thông báo cập nhật tới toàn bộ tệp người dùng Beta Tester ngay khi quá trình đóng gói hoàn tất.
- **Đồng bộ hóa Trung tâm Nhật ký Cập nhật (Changelog Hub)**: Toàn bộ nút liên kết trong hệ thống thông báo và email được quy chuẩn trỏ trực tiếp về trang \`https://www.aevum.ai.vn/changelog\`.

### Cải tiến & Tối ưu (Improvements)
- **Nâng cấp Môi trường Build lên Node.js 22**: Chuẩn hóa toàn bộ runner GitHub Actions (\`windows-latest\` và \`macos-latest\`) lên Node 22, triệt tiêu hoàn toàn cảnh báo không tương thích engine (\`EBADENGINE\`) và tối ưu hóa tốc độ đóng gói electron-builder.
- **Tối ưu hóa Cập nhật Vi sai (Blockmap Delta Updates)**: Phân tách khối nhị phân thông minh, cho phép người dùng nâng cấp từ các bản Beta trước chỉ cần tải từ 5MB - 15MB thay vì toàn bộ bộ cài đặt 150MB.
- **Cơ chế Kháng Lỗi Linh hoạt (Zero-Break Graceful Fallback)**: Tự động chuyển đổi giữa ký số thương mại và đóng gói ad-hoc an toàn khi thiếu chứng chỉ mà không gây gián đoạn quy trình xuất bản.

### Tệp cài đặt / Installation
- **Windows (x64)**: Tải file cài đặt \`Aevum-OS-Setup-2.0.0-beta.5.exe\` bên dưới để trải nghiệm.
- **macOS (Apple Silicon & Intel)**: Tải các gói \`.dmg\` hoặc \`.zip\` tương ứng cho chip Apple M-series hoặc Intel.

---
*Phát hành tự động bởi Aevum CI/CD Engine — Bản thử nghiệm cộng đồng (Beta Channel)*\`,

  'v2.0.0-dev.9': \`# Aevum-OS v2.0.0-dev.9
Bản phát hành Dev Test nội bộ với bộ khung tự động hóa ký số Apple Hardened Runtime, chuẩn hóa Node.js 22 và tích hợp giao thức thông báo email qua Aevum Cloud API.

### Tính năng mới (New Features)
- **Kiến trúc Hardened Runtime & Cấu hình Entitlements macOS**: Bổ sung plist entitlements cho phép JIT compiler, bộ nhớ thực thi không dấu cho terminal PTY và chuẩn bị sẵn sàng cho quy trình Apple Notarization.
- **Cơ chế Dispatch Broadcast Email qua Cloud API**: Tích hợp hook tự động thông báo qua Aevum Cloud backend (api.aevum.ai.vn) dành riêng cho quản trị viên và đội ngũ kiểm thử nội bộ.
- **Hỗ trợ Timestamping Ký số Windows RFC 3161**: Cấu hình quy chuẩn máy chủ đóng dấu thời gian DigiCert tự động trong pipeline CI/CD.

### Cải tiến & Tối ưu (Improvements)
- **Nâng cấp Toàn diện Runner lên Node.js 22**: Đảm bảo tương thích hoàn hảo với @electron/rebuild và electron-builder thế hệ mới.
- **Đồng bộ hóa Đường dẫn Điều hướng**: Thống nhất chuyển hướng người dùng đến Trung tâm Changelog chính thức tại aevum.ai.vn.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-2.0.0-dev.9.exe\` hoặc bản macOS bên dưới để tiến hành kiểm thử nội bộ.

---
*Phát hành tự động bởi Aevum CI/CD Engine — Kênh Dev Test dành riêng cho Developers*`,

  'v2.0.0-beta.2': `# Aevum-OS v2.0.0-beta.2
Bản phát hành Beta công khai toàn diện mang sức mạnh tự hành Hermes, kiến trúc ảo hóa phòng ARCV và trải nghiệm làm việc mượt mà 120 FPS đến với cộng đồng người dùng thử nghiệm.

### Tính năng mới (New Features)
- **Động cơ Tác tử Tự hành Hermes (Autonomous Tool Calling)**: Kích hoạt khả năng đọc/ghi file và tương tác lệnh dòng lệnh tự hành cho các nhân sự số trong Casual Mode, mang lại trải nghiệm trợ lý lập trình như một kỹ sư thực thụ.
- **Hệ thống Ảo hóa Ngữ cảnh Phòng (ARCV & LSR)**: Giảm tải hơn 70% chi phí token và tăng tốc độ phản hồi khi trò chuyện đa tác tử nhờ cơ chế nạp ngữ cảnh động theo nhu cầu.
- **Khung Nghiên cứu Cộng sinh (Co-Research Cockpit)**: Đưa không gian nghiên cứu học thuật và cây tri thức đa phân nhánh trực tiếp vào luồng đàm thoại hàng ngày.
- **Đồng bộ Giao tiếp Đa Ngôi Thalamus**: Hỗ trợ đàm thoại nhóm tự nhiên, cho phép các tác tử tự trao đổi và ủy thác công việc cho nhau mà không làm ngắt mạch người dùng.

### Cải tiến & Tối ưu (Improvements)
- **Hiệu năng Giao diện 120 FPS (Zero-Jank Input Pacing)**: Tối ưu hóa phản hồi bàn phím và luồng hiển thị tin nhắn, loại bỏ hoàn toàn độ trễ khi gõ phím ngay cả trong các dự án lớn.
- **Phong cách Thẩm mỹ Tối giản Hiện đại**: Áp dụng ngôn ngữ thiết kế phẳng không bóng đổ (Zero Box-Shadow) kết hợp đường nét thanh mảnh Neuromorphic Hairline.
- **Ổn định hóa Auto-Updater & Pipeline Đóng gói**: Chuẩn hóa quy trình xuất bản Windows (.exe) và macOS (.dmg, .zip) song song, đồng bộ thông tin phát hành tức thì.

### Sửa lỗi (Fixes)
- Sửa lỗi trùng lặp tệp kê khai cập nhật macOS (latest-mac.yml) trên GitHub Actions Release.
- Khắc phục sự cố xung đột quyền ghi tệp và lỗi hiển thị avatar tác tử.
- Loại bỏ hoàn toàn các câu trả lời máy móc, đảm bảo luồng suy nghĩ mượt mà theo đúng tính cách của từng Persona.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v2.0.0-dev.6': `# Aevum-OS v2.0.0-dev.6
Bản phát hành đột phá với động cơ Hermes tự hành đa tác tử, kiến trúc ảo hóa ngữ cảnh phòng ARCV & LSR, Living Knowledge Fabric v3.0 và giao diện Lean Workspace 120 FPS.

### Tính năng mới (New Features)
- **Hermes Autonomous Agent Engine & Tool Calling**: Cho phép các tác tử AI trong Casual Mode tự động thao tác file, thực thi lệnh CLI và gọi công cụ đa tầng không giới hạn, đồng thời đo kiểm chuẩn xác thời gian thực thi của từng tool.
- **Adaptive Room Context Virtualization (ARCV) & Lazy Semantic Hydration (LSR)**: Bộ ảo hóa ngữ cảnh thông minh RoomContextVirtualizer, tự động gom cụm và tái tạo lịch sử đàm thoại của phòng khi tác tử mới tham gia, tối ưu hơn 70% lượng token tiêu thụ.
- **Living Knowledge Fabric v3.0**: Hệ thống nhận thức tự tiến hóa tích hợp Autonomous Post-Mortem (tự phân tích lỗi build/AST), cơ chế đồng thuận Squad Consensus Auto-ADR và cây cấu trúc Fractal Meta-Knowledge thay thế RAG phẳng truyền thống.
- **Không gian Nghiên cứu Cộng sinh (Human-Agent Co-Research Cockpit)**: Tích hợp bảng điều khiển nghiên cứu trực tiếp trong khung trò chuyện, hỗ trợ mô hình khóa pha Kuramoto và đồ thị DAG nhận thức thời gian thực.
- **Thalamus Multi-Party Relay**: Nâng cấp bộ điều phối hội thoại đa ngôi, hỗ trợ phân giải đại từ ngữ dụng và cơ chế đánh thức chéo giữa các tác tử số.

### Cải tiến & Giao diện (Improvements & UI)
- **Lean Workspace 120 FPS Zero-Jank**: Tái cấu trúc phân rã thành HeroWorkspaceView, LeanSidebar, LeanChatInputCapsule kết hợp thuật toán điều tiết ngân sách nhập liệu của Kael, đạt chuẩn độ mượt 120 FPS và triệt tiêu hoàn toàn giật lag INP.
- **Chuẩn hóa Thẩm mỹ Tối giản (Zero Box-Shadow)**: Loại bỏ các bóng đổ rườm rà, thay thế bằng viền AdLIF Neuromorphic Hairline và hiệu ứng viền chìm Inset Linear tinh tế.
- **Tối ưu hóa Băng thông & Phân rã Thẻ công cụ**: Phân tách rõ ràng giữa thời gian suy nghĩ Chain of Thought (CoT) của mô hình và độ trễ thực thi vật lý của công cụ MCP.

### Sửa lỗi (Fixes)
- Khắc phục triệt để hiện tượng phản hồi tự động đóng băng trong nhóm chat Casual Mode.
- Sửa lỗi truy cập hệ thống tệp EPERM khi quét kho tri thức và loại bỏ thư mục cache sandbox.
- Chuẩn hóa tỷ lệ khung hình vuông và thuộc tính object-fit: cover cho avatar kích hoạt tác tử.

---
*Phát hành tự động bởi Aevum CI/CD Engine — Kênh Dev Test dành riêng cho Developers*`,

  'v2.0.0-beta.0': `# Aevum-OS v2.0.0-beta.0
Khởi đầu kỷ nguyên AevumOS v2 - Tái định hình hệ điều hành AI có chủ quyền với hiệu năng vượt trội, không gian làm việc tinh gọn và cơ chế cập nhật tự động mượt mà.

### Tính năng mới (New Features)
- **Kiến trúc AevumOS v2 (Next-Gen Architecture)**: Tái cấu trúc toàn diện hệ thống nhân điều phối, chuyển dịch hoàn toàn chu kỳ phát triển từ Beta v1 sang nền tảng v2 hiện đại, tối ưu 40% bộ nhớ tạm và tăng tốc độ khởi động app.
- **Không gian làm việc Lean Workspace**: Ra mắt chế độ làm việc tối giản, trực quan, hỗ trợ đa màn hình, tập trung cao độ vào quy trình tư duy và tương tác sâu cùng các AI Persona.
- **Động cơ Auto-Updater v2**: Tích hợp cơ chế lắng nghe cập nhật thông minh qua GitHub Releases công khai, tự động kích hoạt kênh Beta, kiểm tra ngầm khi khởi động và hỗ trợ tải/nâng cấp mượt mà ngay trong ứng dụng.
- **Hệ thống Quản lý Bản quyền & Giấy phép v2**: Tích hợp định danh phần cứng (Machine ID Fingerprint), quản trị phân hạng gói (Free / Pro), hỗ trợ kích hoạt giấy phép ngoại tuyến (Offline License Modal) và đồng bộ trực tiếp với Aevum Cloud.
- **Phòng Tác tử Trực tiếp (Live Agent Room) & Đa Tác tử MCP**: Tối ưu hóa kênh truyền thông thời gian thực giữa Main Process và Renderer, nâng cao khả năng phối hợp tác tử tự trị và hỗ trợ công cụ MCP động.

### Cải tiến & Tối ưu (Improvements)
- **Bộ dịch thuật tự động đa ngôn ngữ**: Tích hợp công cụ nhận diện và chuyển ngữ thông tin bản cập nhật (Release Notes) sang Tiếng Việt và Tiếng Anh tức thì.
- **Tối ưu hóa Pipeline CI/CD**: Hoàn thiện quy trình build đa nền tảng Windows (.exe) và macOS (.dmg, .zip) tự động, xuất bản đầy đủ tệp kê khai blockmap và manifest.
- **Tăng cường Bảo mật & Ổn định**: Khắc phục hiện tượng xung đột token xác thực, bảo vệ an toàn danh tính Persona và đồng bộ trạng thái liền mạch.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-2.0.0-beta.0.exe\` hoặc các gói macOS Apple Silicon/Intel bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v2.0.0-dev.0': `# Aevum-OS v2.0.0-dev.0
Bản dựng thử nghiệm nội bộ dành riêng cho đội ngũ kỹ sư và QA đo kiểm các tính năng nền tảng của kỷ nguyên AevumOS v2.

### Tính năng mới (New Features)
- **Kênh Thử nghiệm Dev Test v2 (Internal Dev Channel)**: Kích hoạt kênh phân phối các tính năng thử nghiệm sớm, tách biệt an toàn với kênh công chúng và hỗ trợ chuyển đổi linh hoạt trong Cài đặt hệ thống.
- **Thử nghiệm Lean Workspace & Performance Instrumentation**: Bổ sung bộ thu thập telemetry hiệu năng thời gian thực, đo kiểm độ trễ tương tác UI và mức tiêu thụ tài nguyên hệ thống.
- **Cơ chế Prerelease Auto-Updater**: Thử nghiệm luồng phân phối tự động các gói build phát triển nội bộ (\`-dev.X\`) cho phép QA cập nhật tức thì khi có commit mới.
- **Nâng cấp MCP Dev Tools**: Tích hợp bộ công cụ gỡ lỗi, kiểm tra sức khỏe bridge kết nối và giả lập kịch bản đa tác tử phức hợp.

### Cải tiến & Tối ưu (Improvements)
- **Tối ưu hóa Build Script**: Hỗ trợ tự động gắn thẻ tag, đồng bộ phiên bản \`package.json\` và kích hoạt GitHub Actions build song song Windows & macOS.
- **Tăng cường khả năng chịu lỗi (Resilience)**: Xử lý các tình huống mất kết nối mạng đột ngột trong quá trình kiểm tra cập nhật và đồng bộ phiên đăng nhập.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-2.0.0-dev.0.exe\` hoặc bản macOS bên dưới để tiến hành kiểm thử.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v1.0.0-beta.2': `# Aevum-OS v1.0.0-beta.2
Bản cập nhật này mang đến hệ thống tự động cập nhật mạnh mẽ, đảm bảo bạn luôn trải nghiệm Aevum-OS với những cải tiến mới nhất một cách liền mạch.

### Tính năng mới (New Features)
- **Hệ thống Auto-Updater tích hợp**: Aevum-OS nay hỗ trợ tự động kiểm tra, tải về và cập nhật các phiên bản mới ngầm trong nền thông qua electron-updater và GitHub Releases.
- **Tự động đóng gói đa nền tảng**: Tích hợp quy trình xuất bản Windows Installer (.exe) và macOS (.dmg, .zip) đồng bộ kèm blockmap tối ưu dung lượng tải về.
- **Bảo vệ toàn vẹn nguồn & Cấu hình Persona**: Chuẩn hóa cấu trúc bộ nhớ tri thức toàn cục và quy chuẩn hoạt động an toàn cho các AI Persona.

### Cải tiến & Tối ưu (Improvements)
- **Tối ưu hóa quy trình kiểm tra bản cập nhật**: Cho phép người dùng kiểm tra trạng thái phiên bản trực tiếp từ giao diện cài đặt với thông báo tức thì.
- **Nâng cao độ ổn định ứng dụng**: Tăng tốc độ khởi động và tối ưu hóa bộ nhớ tạm của ứng dụng.

### Tệp cài đặt / Installation
- Tải file cài đặt Aevum-OS-Setup-1.0.0-beta.2.exe hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v1.0.0-beta.3': `# Aevum-OS v1.0.0-beta.3
Nâng tầm trải nghiệm phát triển với kiến trúc kế hoạch phân tầng đột phá và tương tác AI cá nhân hóa sâu sắc.

### Tính năng mới (New Features)
- **Kiến trúc Kế hoạch Phân tầng (Tiered Plan Architecture) v2.2**: Giới thiệu mô hình định địa chỉ linh hoạt cho kế hoạch phát triển, hỗ trợ phân rã Domain và Feature đa cấp độ.
- **Điều phối Đa Tác tử (MCP Orchestration & Living Personas)**: Nâng cấp cơ chế điều phối công cụ MCP tự thích ứng và quản trị bộ nhớ làm việc (working memory) cho từng Persona.
- **Không gian Nghiên cứu (Research Workspace) & Cây Kỹ năng**: Tích hợp SkillTreeCanvas tương tác mượt mà, menu ngữ cảnh ContextMenu chuyên biệt và hỗ trợ hiển thị đa phương tiện trực quan.

### Cải tiến & Tối ưu (Improvements)
- **Tối ưu hóa Pipeline CI/CD**: Xuất bản tài nguyên release trực tiếp sang kho lưu trữ mở để giải phóng hạn mức Actions artifact storage quota.
- **Nâng cao Hiệu năng Renderer**: Tối ưu hóa DOM và xử lý sự kiện trong ứng dụng React, giảm độ trễ khi vẽ đồ thị cây kỹ năng.

### Tệp cài đặt / Installation
- Tải file cài đặt Aevum-OS-Setup-1.0.0-beta.3.exe hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v1.0.0-dev.0': `# Aevum-OS v1.0.0-dev.0
Nâng tầm trải nghiệm Aevum-OS với các cải tiến AI và quy trình phát hành linh hoạt hơn.

### Tính năng mới (New Features)
- **Hệ thống Phát hành Dev Build & Promote Build**: Giới thiệu quy trình phát hành mới, cho phép tạo các bản dựng phát triển nội bộ (\`-dev.X\`) và thăng hạng trực tiếp lên bản phát hành chính thức mà không cần build lại.
- **Kênh Cập nhật Thử nghiệm Nội bộ (Dev Channel Toggle)**: Tích hợp công tắc chuyển đổi kênh cập nhật trong cài đặt ứng dụng, cho phép Developer và Beta Tester đăng ký nhận các bản thử nghiệm sớm ngầm qua Auto-Updater.
- **Điều phối Đa Tác tử & Tối ưu hóa Persona**: Tinh chỉnh cấu trúc hoạt động của Nia và các Living Personas, nâng cao khả năng tự chủ và tương tác thời gian thực.

### Cải tiến & Tối ưu (Improvements)
- **Cải tiến Auto-Updater Core**: Bổ sung cờ \`allowPrerelease\` linh hoạt trong \`UpdaterService\`, đồng bộ trạng thái qua IPC handler an toàn giữa Main Process và Renderer.
- **Tự động hóa CI/CD & Webhook Thông báo**: Mở rộng pipeline GitHub Actions tự động kích hoạt cập nhật dữ liệu changelog tức thì trên website khi có bản release mới.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-1.0.0-dev.0.exe\` hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*\`,

  'v1.0.0-dev.1': \`# Aevum-OS v1.0.0-dev.1
Bản thử nghiệm Dev-Test thứ 2 mang đến Persona Hawl chuyên trách bảo mật, nâng cấp Hermes Engine và hoàn thiện phòng thí nghiệm nghiên cứu sóng não EEG.

### Tính năng mới (New Features)
- **Tác tử An ninh Hawl (Hawl AI Companion & Security Specialist)**: Bổ sung Persona Hawl - chuyên gia bảo mật và thẩm định phòng thủ mạng, hỗ trợ rà soát lỗ hổng, tư vấn phòng chống DDoS và tối ưu hóa hệ thống lá chắn đa tầng.
- **Tích hợp Hermes Broker & Signal Diagnostic UI**: Nâng cấp cơ chế điều phối phiên làm việc với Hermes Session Broker, bổ sung SignalDiagnosticHandlers và giao diện chẩn đoán sức khỏe hệ thống thời gian thực.
- **Không gian Nghiên cứu Thần kinh Nhận thức (Neuro-Cognitive Lab & Flow-State)**: Công bố các bài báo khoa học tiền in ấn Zenodo, bộ chuẩn đo lường trạng thái dòng chảy HAI EEG và hiệu chỉnh Kuramoto coupling cho các mô hình tự chữa lành.

### Cải tiến & Tối ưu (Improvements)
- **Hoàn thiện Giao diện Workspace & Agent Chat View**: Tinh chỉnh các thành phần giao diện không gian làm việc lõi, tối ưu hoá khung trò chuyện tác tử và tích hợp điều phối tác tử tự trị.
- **Chuẩn hóa Giao thức Fastify SSE Daemon**: Đồng bộ cổng proxy kết nối SSE (Port 3344) giữa Aevum Desktop và các công cụ MCP, đảm bảo độ trễ phản hồi dưới 2ms.
- **Tối ưu hóa Vector Zoom & Mermaid Diagram**: Nâng cấp khả năng thu phóng vector mượt mà và tương tác đồ thị cấu trúc kiến trúc trực quan.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-1.0.0-dev.1.exe\` hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`
};
let cachedReleases = null;
let inFlightPromise = null;
let isTokenMarkedInvalid = false;

export const ReleaseService = {
  /**
   * Fetches release list from GitHub releases API.
   * Caches results in-memory and deduplicates in-flight requests.
   */
  async getReleases() {
    if (cachedReleases) {
      return cachedReleases;
    }

    if (inFlightPromise) {
      return inFlightPromise;
    }

    inFlightPromise = (async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = {
          'Accept': 'application/vnd.github+json'
        };

        if (!isTokenMarkedInvalid && token && token !== 'your_read_only_token_here' && !token.startsWith('github_pat_your')) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        let res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });

        // If token returned 401 (expired/revoked), mark as invalid and retry unauthenticated
        if (res.status === 401 && headers['Authorization']) {
          isTokenMarkedInvalid = true;
          delete headers['Authorization'];
          res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });
        }

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        const enriched = data.map((item) => {
          const tag = item.tag_name || item.name || '';
          const override = RELEASE_BODY_OVERRIDES[tag];
          if (override && (!item.body || item.body.trim().endsWith(': Aev') || item.body.trim().endsWith('Giới thiệu') || item.body.trim().endsWith('(') || item.body.length < 400)) {
            return {
              ...item,
              body: override
            };
          }
          return item;
        });

        const sorted = enriched.sort((a, b) => {
          const timeA = new Date(a.published_at || a.created_at || 0).getTime();
          const timeB = new Date(b.published_at || b.created_at || 0).getTime();
          if (timeB !== timeA) return timeB - timeA;
          return (b.tag_name || b.name || '').localeCompare(a.tag_name || a.name || '', undefined, { numeric: true });
        });

        cachedReleases = sorted;
        return sorted;
      } finally {
        inFlightPromise = null;
      }
    })();

    return inFlightPromise;
  },

  /**
   * Get set of approved release tags (Dev Test releases approved by Admin).
   * Supports Supabase sync with LocalStorage fallback.
   */
  async getApprovedTags() {
    const local = new Set();
    try {
      const stored = localStorage.getItem('aevum_approved_releases');
      if (stored) {
        JSON.parse(stored).forEach((t) => local.add(t));
      }
    } catch (e) {}

    try {
      const { supabase } = await import('./supabaseClient.js');
      const { data, error } = await supabase
        .from('release_approvals')
        .select('tag_name, is_approved');

      if (!error && Array.isArray(data)) {
        data.forEach((row) => {
          if (row.is_approved) {
            local.add(row.tag_name);
          } else {
            local.delete(row.tag_name);
          }
        });
      }
    } catch (err) {
      // Table may not exist yet or offline, local fallback is used
    }

    return local;
  },

  /**
   * Approve or revoke approval for a dev release (Admin only).
   */
  async setReleaseApproved(tagName, isApproved, userProfile) {
    if (!tagName) return false;

    // 1. Update localStorage
    try {
      const stored = localStorage.getItem('aevum_approved_releases');
      const tags = stored ? JSON.parse(stored) : [];
      const set = new Set(tags);
      if (isApproved) {
        set.add(tagName);
      } else {
        set.delete(tagName);
      }
      localStorage.setItem('aevum_approved_releases', JSON.stringify(Array.from(set)));
    } catch (e) {}

    // 2. Sync to Supabase
    try {
      const { supabase } = await import('./supabaseClient.js');
      await supabase
        .from('release_approvals')
        .upsert({
          tag_name: tagName,
          is_approved: isApproved,
          approved_by: userProfile?.id || null,
          approved_by_email: userProfile?.email || null,
          approved_at: new Date().toISOString()
        }, { onConflict: 'tag_name' });
    } catch (err) {
      console.warn('[ReleaseService] Supabase sync release_approvals fallback:', err?.message || err);
    }

    // Invalidate cache
    cachedReleases = null;
    return true;
  }
};
