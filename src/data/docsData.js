export const docsData = [
  {
    id: "gioi-thieu",
    title: "Giới thiệu chung",
    category: "Bắt đầu",
    content: `
# Tổng quan về Aevum OS

**Aevum OS** đại diện cho một bước đột phá kiến trúc trong việc quản lý ngữ cảnh (Context) và bộ nhớ (Memory) cho các AI Agent. Bằng cách tách biệt công cụ quản lý ngữ cảnh cốt lõi, quy trình lập kế hoạch và đồ thị kiến thức tự phục hồi ra khỏi môi trường biên dịch (editor runtime) của VS Code, Aevum OS hoạt động như một máy chủ **Model Context Protocol (MCP)** độc lập phổ quát.

---

## Các Điểm Đột Phá Cốt Lõi

### 1. Giao thức Chuẩn hóa (MCP-First)
Aevum OS triển khai đặc tả giao thức Model Context Protocol chính thức. Nó cung cấp một tập hợp các công cụ (Tools) và tài nguyên (Resources) chuẩn hóa giúp bất kỳ mô hình LLM nào cũng có thể đọc hiểu cấu trúc dự án, quản lý bộ nhớ dài hạn và tương tác trực tiếp với hệ điều hành.

### 2. Môi trường Chạy Độc lập (Decoupled Runtime)
Bằng cách đánh chặn và giả lập động các dependency của editor host (như namespace \`vscode\`) trong quá trình phân giải module, công cụ ngữ cảnh lõi có thể chạy tự nhiên trên Node.js. Điều này đảm bảo khả năng tách biệt hoàn toàn khỏi GUI của IDE và cho phép triển khai máy chủ từ xa.

### 3. Điều phối Đa Client (Multi-Client Orchestration)
Công cụ tự động đăng ký của Aevum OS cho phép kết nối đồng thời và an toàn giữa nhiều IDE khách nhau bao gồm Cursor, Claude Desktop, và Antigravity IDE thông qua một daemon duy nhất.

### 4. Bảng điều khiển CPU-Rendered (Control Center)
Hỗ trợ giao diện máy tính để bàn (Desktop Dashboard) tối giản chạy bằng Electron để cấu hình không gian làm việc, chuyển đổi các server MCP và theo dõi nhật ký hoạt động trực tiếp.
`
  },
  {
    id: "cai-dat",
    title: "Cài đặt & Thiết lập",
    category: "Bắt đầu",
    content: `
# Cài đặt & Thiết lập Hệ thống

Aevum OS không được phân phối qua các gói npm công khai. Thay vào đó, bạn có thể tải trực tiếp gói đóng gói cài đặt chính thức từ trang web này để cài đặt và sử dụng trên hệ thống của mình.

---

## Các bước Cài đặt

### Bước 1: Tải về Gói Đóng gói (Installation Package)
Tải bản cài đặt mới nhất của Aevum OS phù hợp với hệ điều hành của bạn:
- [Tải về gói Aevum OS cho Desktop (aevum-os-desktop.zip)](/downloads/aevum-os-desktop.zip)

### Bước 2: Giải nén & Cài đặt
1. **Giải nén** tệp tin \`aevum-os-desktop.zip\` vừa tải xuống vào thư mục làm việc mong muốn trên ổ đĩa của bạn (ví dụ: \`C:\\AevumOS\` trên Windows hoặc \`/Applications/AevumOS\` trên macOS).
2. Mở thư mục vừa giải nén và chạy file cài đặt/khởi tạo:
   - Trên **Windows**: Chạy tệp tin \`install.bat\` (hoặc chạy \`setup.exe\` nếu sử dụng bản cài đặt GUI).
   - Trên **macOS / Linux**: Chạy tệp tin \`./install.sh\` thông qua Terminal.

### Bước 3: Đăng ký Lệnh CLI Toàn cầu (Tùy chọn)
Trong quá trình cài đặt, script sẽ tự động đăng ký đường dẫn biến môi trường để bạn có thể gọi lệnh \`aevum\` trực tiếp ở bất kỳ cửa sổ Terminal nào.

> [!NOTE]
> Nếu Terminal của bạn chưa nhận dạng được lệnh \`aevum\`, hãy khởi động lại Terminal hoặc thêm đường dẫn thư mục cài đặt của Aevum OS vào biến môi trường \`PATH\` của hệ thống một cách thủ công.
`
  },
  {
    id: "che-do-chay",
    title: "Chế độ hoạt động",
    category: "Hướng dẫn",
    content: `
# Các Chế độ Hoạt động của Aevum OS

Aevum OS hỗ trợ cả giao diện dòng lệnh (CLI) hiệu năng cao lẫn giao diện đồ họa (GUI) trực quan.

---

## Chế độ A: Command Line Interface (CLI)

### 1. Server-Sent Events (SSE) Mode (Daemon Mặc định)
Chạy Aevum như một HTTP server dựa trên Express để quản lý không gian làm việc được chỉ định. Đây là chế độ lý tưởng khi bạn muốn các IDE khác kết nối từ xa qua HTTP.

\`\`\`bash
aevum --workspace <duong_dan_project> --transport sse --port 3344
\`\`\`

*Lưu ý:*
- Nếu bỏ qua tham số \`--workspace\`, máy chủ sẽ mặc định chọn thư mục chạy lệnh hiện tại (\`process.cwd()\`).
- Nếu bỏ qua tham số \`--port\`, cổng mặc định được sử dụng sẽ là \`3344\`.

### 2. Stdio Mode
Chạy máy chủ MCP giao tiếp qua dòng vào/ra chuẩn (stdio). Chế độ này thường được sử dụng bởi các IDE cục bộ chạy Aevum như một tiến trình con trực tiếp.

\`\`\`bash
aevum --workspace <duong_dan_project> --transport stdio
\`\`\`

### 3. Kiểm tra Trạng thái (Health Check)
Bạn có thể ping kiểm tra xem daemon SSE có hoạt động bình thường không bằng lệnh:

\`\`\`bash
curl http://127.0.0.1:3344/api/ping
\`\`\`

---

## Chế độ B: Desktop Control Center (Electron GUI)

Nếu muốn quản lý trực quan cấu hình dự án, xem log hoạt động hoặc thay đổi các cổng kết nối MCP bằng giao diện đồ họa:

\`\`\`bash
npm run gui
\`\`\`

Lệnh này sẽ khởi chạy một cửa sổ ứng dụng desktop Electron với giao diện tối giản mang phong cách tối sang trọng của Aevum OS.
`
  },
  {
    id: "quy-tac-agent",
    title: "Quy tắc & Giao thức Agent",
    category: "Phát triển",
    content: `
# Quy tắc hoạt động của AI Agent trong Aevum OS

Để đảm bảo các Agent phối hợp nhịp nhàng, thông tin không bị chồng chéo và kiến thức luôn được đồng bộ, toàn bộ Agent hoạt động trong môi trường Aevum OS bắt buộc phải tuân thủ các quy tắc nghiêm ngặt sau:

---

## 1. Ưu tiên Giao thức MCP (MCP-First Mandate)
Tuyệt đối không chỉnh sửa hoặc ghi đè thủ công các tệp cấu hình trong thư mục \`.aevum/\`. Tất cả các thao tác thay đổi cấu trúc, lưu trữ bộ nhớ và báo cáo tiến độ bắt buộc phải đi qua các công cụ MCP được cung cấp (như \`aevum_create_plan\`, \`aevum_submit_report\`).

---

## 2. Quy trình Quản lý Kế hoạch (Plan Lifecycle)
Trước khi bắt tay vào chỉnh sửa những tác vụ lớn hoặc thay đổi mã nguồn phức tạp:
1. **Lên kế hoạch (Idea-to-Plan Gate)**: Phác thảo thiết kế và các bước thực hiện bằng cách gọi \`aevum_create_plan\`.
2. **Chờ phê duyệt**: Trình bày tệp kế hoạch (\`implementation_plan.md\`) cho người dùng phê duyệt.
3. **Báo cáo tiến độ**: Sử dụng \`aevum_submit_report\` với loại \`PLAN_UPDATE\` khi đang làm và \`PLAN_DONE\` khi hoàn thành để hệ thống cập nhật tiến độ tự động lên Dashboard và trao EXP cho nhân vật.

---

## 3. Giao thức Nén Ngữ Nghĩa (Semantic Context Middleware)
Để tối ưu hóa Context Window của LLM và ngăn tràn cửa sổ ngữ cảnh:
- **Bắt buộc**: Trước khi đọc bất kỳ file \`.md\` nào có dung lượng lớn (> 2000 ký tự) hoặc các bản kế hoạch phức tạp, Agent phải gọi công cụ \`aevum_get_compressed\`.
- Giao thức này giúp nén thông tin thành cấu trúc mật độ cao, giúp tăng độ chính xác của logic suy luận lên nhiều lần.

---

## 4. Giao thức Thần giao cách cảm (PiperNet Telepathy)
Sau khi hoàn thành một kế hoạch lớn có giá trị kiến trúc, Agent bắt buộc gọi \`aevum_pipernet_broadcast\` để đẩy tri thức trừu tượng (chỉ các mẫu thiết kế và bài học kinh nghiệm, không chia sẻ mã nguồn thô) lên mạng lưới toàn cục. Các Agent khác gặp khó khăn có thể truy vấn bằng \`aevum_pipernet_query\` để tham khảo giải pháp đã có.
`
  },
  {
    id: "tips-tricks",
    title: "Tips & Tricks Tương tác",
    category: "Hướng dẫn",
    content: `
# Tips & Tricks Tương tác Sáng tạo với Aevum OS

Chào mừng bạn đến với khu vực khai thác nâng cao! Dưới đây là những thủ thuật tương tác cực kỳ thực tế được đúc kết từ chính kiến trúc cốt lõi của Aevum OS giúp bạn và biệt đội Agent cộng tác đỉnh cao:

---

## 1. Định Vị Task trên Mã Nguồn (Task Anchoring)
Aevum OS sở hữu khả năng liên kết trực tiếp giữa các đầu việc trong bản kế hoạch với các dòng code cụ thể trong dự án.
- **Cách viết**: Sử dụng cú pháp checkbox đặc biệt kèm đường dẫn tệp và số dòng:
  \`\`\`markdown
  - [ ] [src/core/bus.ts:45] Triển khai EventEmitter
  \`\`\`
- **Hiệu quả**: Hệ thống sẽ tự động đặt các **Avatar Markers** (Biểu tượng nổi) của Agent trên dòng code đó trong IDE. Khi bạn hoặc Agent hover chuột vào dòng code, một tooltip mô tả task chi tiết sẽ hiện lên. Trạng thái task (\`todo\`, \`done\`) cũng tự động cập nhật thời gian thực khi mã nguồn thay đổi!

---

## 2. Nén Cấu Trúc Mã Nguồn (Skeleton Hashing & Hydration)
Để tối ưu hóa dung lượng Context Window cho LLM khi làm việc với các file code khổng lồ, Aevum sử dụng công nghệ băm thân hàm.
- **Cơ chế**: Thân của các hàm phức tạp hoặc không liên quan trực tiếp đến task hiện tại sẽ được nén lại dưới dạng:
  \`\`\`typescript
  public async processTelemetry(data: any): Promise<void> { // [BODY_HASH:a8f9c2d1] }
  \`\`\`
- **Thủ thuật tương tác**: Bạn hoàn toàn có thể yêu cầu Agent mở rộng hoặc giải nén lập tức thân hàm này để gỡ lỗi hoặc viết unit test bằng câu lệnh:
  > *"Giải nén thân hàm processTelemetry bằng aevum_hydrate_vault_hash để kiểm tra logic."*
- **Hiệu quả**: Giúp Agent tập trung hoàn toàn vào khu vực code cần sửa mà không bị xao nhãng bởi hàng ngàn dòng code phụ trợ khác.

---

## 3. Triệu hồi "Đội Hình Trong Mơ" (Squad Spawning)
Aevum OS cho phép bạn phối hợp sức mạnh của nhiều Persona chuyên biệt cùng một lúc thông qua chế độ **Squad Mode**. Hãy tận dụng điều này để phân chia công việc:
- **Tình huống**: Bạn cần xây dựng một tính năng mới có giao diện phức tạp và kiến trúc bảo mật cao.
- **Cách khai thác**: Trực tiếp phân công trong yêu cầu của bạn:
  > *"Gọi **An** code phần logic API, nhờ **Luna** vẽ CSS/UI thật đẹp theo chuẩn Vercel, và mời **Vidus** duyệt lại kiến trúc bảo mật trước khi commit nhé."*
- **Hiệu quả**: Các Agent sẽ tự động thảo luận thông qua Blackboard Hub để thống nhất giải pháp tối ưu nhất trước khi viết code.

---

## 4. Tự Động Sửa Lỗi Với GATE Watcher (Diagnostic Awareness)
Aevum OS liên tục theo dõi chất lượng mã nguồn và phát hiện các lỗi TypeScript/ESLint ở chế độ nền.
- **Thủ thuật**: Bạn không cần phải mò mẫm tìm lỗi biên dịch. Chỉ cần gọi Agent:
  > *"Quét diagnostics và tự động sửa các lỗi KO hiện có bằng Living Memory."*
- **Hiệu quả**: Agent sẽ gọi \`aevum_get_diagnostics\` để lấy danh sách lỗi, tự phân tích nguyên nhân và âm thầm tạo Plan sửa lỗi tự động mà bạn không cần can thiệp.

---

## 5. Đồng Bộ Tri Thức Toàn Cục (PiperNet Telepathy)
Nếu bạn đang phát triển nhiều dự án khác nhau và muốn tái sử dụng các giải pháp đã được chứng minh hiệu quả:
- **Thủ thuật**: Yêu cầu Agent đẩy tri thức lên PiperNet bằng cách:
  > *"Đóng gói kiến thức nén và chia sẻ lên PiperNet."*
- **Hiệu quả**: Agent sẽ gọi \`aevum_pipernet_broadcast\` để đẩy các mẫu thiết kế (Design Patterns) dưới dạng trừu tượng lên mạng lưới. Khi bạn làm dự án mới và gặp bài toán tương tự, Agent mới có thể gọi \`aevum_pipernet_query\` để lấy về giải pháp ngay lập tức!
`
  },
  {
    id: "handshake-ritual",
    title: "Nghi thức Bắt tay (Handshake)",
    category: "Bắt đầu",
    content: `
# Nghi thức Bắt tay (Handshake Ritual)

Khi khởi chạy Aevum OS lần đầu tiên, hệ thống sẽ thực hiện một quy trình đồng bộ hóa phiên làm việc khép kín gọi là **Nghi thức Bắt tay (Handshake Ritual)**. Quy trình này đảm bảo các Agent và môi trường phát triển của bạn (như Cursor, Claude Desktop) thiết lập kết nối an toàn và tin cậy tuyệt đối.

---

## 1. Tệp tín hiệu khởi động (Signal File)
Mỗi khi Daemon Aevum OS khởi chạy ở chế độ nền (Background Process):
1. Hệ thống tự động tạo ra một tệp tín hiệu tạm thời tại đường dẫn không gian làm việc:
   \`\`\`json
   // .aevum/signal.json
   {
     "handshake_token": "sig_1785306452973",
     "port": 3344,
     "timestamp": 1785306452973
   }
   \`\`\`
2. Tệp tin này đóng vai trò như một "yêu cầu kết nối" chứa mã token bảo mật duy nhất dùng một lần.

---

## 2. Bắt tay Xác thực (The Acknowledgment)
Để hoàn tất nghi thức bắt tay, Agent bắt buộc phải gọi công cụ MCP \`aevum_submit_ack\` với tham số là token nhận được từ tệp tín hiệu:

\`\`\`bash
aevum_submit_ack(token="sig_1785306452973")
\`\`\`

> [!IMPORTANT]
> - Nếu token khớp, phiên làm việc (Session ID) sẽ được khởi tạo và ghi dấu vào tệp chỉ mục \`.aevum/index.json\`.
> - Nếu token không khớp hoặc hết hạn (sau 60 giây), Daemon sẽ tự động ngắt kết nối để ngăn chặn các truy cập trái phép.

---

## 3. Khởi tạo Nhân vật (Persona Initialization)
Ngay sau khi bắt tay thành công:
1. Hệ điều hành tự động gọi \`aevum_init_persona\` để tải nhân vật hoạt động mặc định (thường là **An - Lập trình viên**).
2. Tệp cấu hình trạng thái \`.aevum/active_session.json\` được tạo ra để lưu vết lịch sử trò chuyện và các công cụ đang hoạt động.
`
  },
  {
    id: "persona-system",
    title: "Hệ thống Nhân vật (Personas)",
    category: "Hướng dẫn",
    content: `
# Hệ thống Nhân vật (Persona System)

Aevum OS quản lý và điều phối các tác vụ phát triển thông qua một **Hệ thống Nhân vật chuyên biệt (Persona System)**. Thay vì sử dụng một mô hình ngôn ngữ chung cho mọi tác vụ, hệ điều hành chia nhỏ các trách nhiệm thành các vai trò độc lập, giúp tối ưu hóa cấu trúc ngữ cảnh và nâng cao tính chuyên môn hóa.

---

## 1. Khái niệm Persona trong Aevum OS
Mỗi Persona là một cấu hình tác vụ được tối ưu hóa riêng biệt bao gồm:
- **System Prompt**: Định nghĩa quy tắc ứng xử, định dạng đầu ra và giới hạn Sandbox của nhân vật.
- **Quyền truy cập Công cụ (Tool Access)**: Các quyền gọi MCP tool chuyên dụng (ví dụ: nhân vật thiết kế chỉ có quyền đọc file và ghi CSS, nhân vật bảo mật chỉ được phép quét diagnostics và kiểm duyệt mã).
- **Bộ nhớ Ngữ cảnh (Memory Context)**: Đồ thị bộ nhớ sống được lọc và tối ưu theo lĩnh vực hoạt động của nhân vật đó.

---

## 2. Cách Khởi tạo & Cấu hình Nhân vật
Các cấu hình nhân vật được lưu trữ dưới dạng các tệp tin cấu hình JSON trong không gian làm việc của bạn:

\`\`\`json
// .aevum/personas/developer.json
{
  "persona_id": "developer_core",
  "name": "Developer Persona",
  "temperature": 0.1,
  "rules_path": ".aevum/prompts/dev_rules.txt",
  "allowed_tools": ["read_file", "write_file", "aevum_run_sanity_check"]
}
\`\`\`

Khi khởi động phiên làm việc, Aevum OS gọi công cụ \`aevum_init_persona\` để nạp cấu hình nhân vật được yêu cầu vào bộ nhớ phiên hoạt động.

---

## 3. Cách Chuyển đổi Công việc (Handoff & Switch)
Khi một công việc đi qua nhiều giai đoạn (ví dụ: lập kế hoạch kiến trúc sang viết code logic, rồi sang kiểm tra bảo mật), hệ thống cung cấp hai phương thức chuyển giao công việc:

### Chuyển đổi Trực tiếp (Persona Switch)
Dùng để thay thế nhân vật đang hoạt động trong phiên làm việc hiện tại bằng cách gọi:
\`\`\`bash
aevum_switch_persona(target_persona="security_auditor")
\`\`\`

### Chuyển giao Kế hoạch (Squad Handoff)
Khi hoàn thành một phần của bản kế hoạch (\`implementation_plan.md\`), nhân vật hiện tại sẽ đóng gói lịch sử và bàn giao trạng thái cho nhân vật tiếp theo tiếp nhận thông qua:
\`\`\`bash
aevum_squad_handoff(
  from_persona="architect",
  to_persona="developer",
  plan_id="plan_auth_v2"
)
\`\`\`
Giao thức này đảm bảo 100% độ toàn vẹn ngữ cảnh của kế hoạch được chuyển tiếp đầy đủ sang nhân vật mới.

---

## 4. Họp Hội thoại Biệt đội (Squad Huddle)
Đối với các quyết định kiến trúc phức tạp cần sự đồng thuận của nhiều góc nhìn chuyên môn:
1. Bạn có thể kích hoạt phiên thảo luận chung bằng công cụ \`aevum_squad_huddle\`.
2. Hệ thống sẽ mở một không gian chia sẻ chung (Blackboard) nơi các nhân vật cùng đọc kế hoạch và lần lượt đóng góp ý kiến để hoàn thiện giải pháp tối ưu nhất trước khi thực thi.
`
  },
  {
    id: "plan-lifecycle",
    title: "Vòng đời Kế hoạch (Plan Lifecycle)",
    category: "Phát triển",
    content: `
# Vòng đời Kế hoạch (Plan Lifecycle)

Trong triết lý phát triển của Aevum OS, mọi thay đổi phức tạp trên hệ thống đều phải tuân thủ nghiêm ngặt **Vòng đời Kế hoạch (Plan Lifecycle)** để đảm bảo tính an toàn, có thể quan sát và nhất quán.

---

## 1. Các Giai đoạn của Kế hoạch

### Giai đoạn 1: Phác thảo (Drafting)
Agent tiến hành nghiên cứu codebase và tạo tệp thiết kế kiến trúc tại \`.aevum/plans/PLAN_NAME.md\` hoặc thư mục artifact của cuộc hội thoại. Kế hoạch phải chỉ rõ:
- Các file cần sửa đổi hoặc tạo mới.
- Kịch bản kiểm thử tự động và thủ công.

### Giai đoạn 2: Phỏng vấn & Align (The Grill Session)
Người dùng có thể sử dụng lệnh \`/grill-me\` để bắt đầu một buổi phỏng vấn tương tác với Agent. Agent sẽ hỏi các câu hỏi làm rõ các điểm mơ hồ về kiến trúc trước khi chốt phương án.

### Giai đoạn 3: Phê duyệt (Approval)
Người dùng phê duyệt bản kế hoạch bằng cách nhấn nút **Proceed** trên giao diện IDE hoặc nhập dòng lệnh chấp thuận. Khi đó trạng thái kế hoạch chuyển sang \`approved\`.

### Giai đoạn 4: Thực thi & Anchoring (Execution)
Agent bắt đầu triển khai viết code. Mỗi đầu việc phải sử dụng cú pháp Task Anchoring để đồng bộ hóa live:
- \`- [ ] [path/to/file:line] Nội dung việc cần làm\`

### Giai đoạn 5: Nghiệm thu & Thu hoạch Bằng chứng (Harvesting)
Sau khi viết code xong, Agent chạy test và lưu lại kết quả kiểm thử, ảnh chụp màn hình vào thư mục chứng cứ \`.aevum/evidence/\`. Cuối cùng, gọi \`aevum_finalize_session\` để đúc kết kinh nghiệm vào **Living Memory** và thăng cấp nhân vật.
`
  },
  {
    id: "pipernet-mesh",
    title: "Mạng lưới PiperNet (IoA)",
    category: "Phát triển",
    content: `
# Mạng lưới PiperNet (Internet of Agents)

**PiperNet** là mạng lưới phi tập trung kết nối các không gian làm việc của Aevum OS trên toàn cầu. Giao thức này cho phép các Agent chia sẻ trí tuệ thủ tục (procedural intelligence) một cách an toàn mà không làm rò rỉ mã nguồn thô của dự án.

---

## 1. Cơ chế hoạt động (How it works)
- **Tri thức Trừu tượng**: Thay vì gửi mã nguồn thô, các Agent chỉ trích xuất các **Mẫu thiết kế (Design Patterns)**, cách sửa lỗi (Fixes), và các quy chuẩn cấu hình chung dưới dạng tri thức trừu tượng đã nén ngữ nghĩa.
- **Mã hóa đầu cuối**: Tri thức được mã hóa bằng khóa riêng của không gian làm việc trước khi truyền đi qua giao thức ngang hàng (P2P).

---

## 2. Phát sóng Tri thức (Telepathy Broadcast)
Khi một Agent giải quyết thành công một bài toán kiến trúc độc đáo, nó sẽ gọi:

\`\`\`bash
aevum_pipernet_broadcast(
  topic="typescript_mcp_routing",
  knowledge_hash="kh_09a8f7c1..."
)
\`\`\`

Tri thức này sẽ được phát sóng và lưu trữ phân tán trên các nút mạng của PiperNet.

---

## 3. Truy vấn Tri thức (Telepathy Query)
Khi bạn khởi tạo một dự án mới và gặp khó khăn trong việc cấu hình định tuyến cho MCP Server:
- Agent của bạn có thể truy vấn mạng lưới toàn cầu để tìm kiếm giải pháp tương đồng:
  \`\`\`bash
  aevum_pipernet_query(query="typescript mcp routing setup")
  \`\`\`
- Hệ thống sẽ trả về các mẫu thiết kế đã được kiểm chứng để Agent tham khảo và tự động áp dụng vào dự án của bạn.
`
  }
];
