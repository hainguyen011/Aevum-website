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
  },
  {
    id: "mcp-tools-reference",
    title: "MCP Tools Reference",
    category: "Phát triển",
    content: `
# MCP Tools Reference — Bảng Tham chiếu Đầy đủ

Aevum OS cung cấp hơn **50 công cụ MCP (Model Context Protocol)** được tổ chức theo các nhóm chức năng. Tất cả các công cụ đều được đăng ký trong \`McpRegistry\` và hoạt động qua transport SSE hoặc Stdio.

---

## Nhóm 1: Khởi tạo & Kết nối (Bootstrap & Handshake)

| Công cụ | Mô tả |
|---|---|
| \`aevum_get_bootstrap_context\` | Tải toàn bộ ngữ cảnh khởi động, signal.json và policy nén ngữ nghĩa. Đây là công cụ **bắt buộc gọi đầu tiên**. |
| \`aevum_submit_ack\` | Gửi xác nhận kết nối với \`signalId\` lấy từ \`.aevum/signal.json\`. Hoàn tất nghi thức bắt tay. |
| \`aevum_request_connection\` | Chủ động yêu cầu Bridge thiết lập kết nối nếu chưa được kết nối. |
| \`aevum_ping\` | Kiểm tra trạng thái sống của Aevum MCP Daemon và Persona hiện tại. |

---

## Nhóm 2: Hệ thống Nhân vật (Persona & Identity)

| Công cụ | Mô tả |
|---|---|
| \`aevum_init_persona\` | Nạp nhân vật (Persona) theo ID. Tự động đăng ký AID vào session và phát sự kiện \`AGENT_ONLINE\`. |
| \`aevum_get_active_persona\` | Lấy thông tin nhân vật hiện tại kèm theo bảng tiến hóa EXP và skills matrix. |
| \`aevum_list_personas\` | Liệt kê tất cả nhân vật khả dụng trong không gian làm việc. |
| \`aevum_switch_persona\` | Chuyển đổi sang nhân vật khác theo ID. |
| \`aevum_award_exp\` | Trao điểm kinh nghiệm (EXP) cho nhân vật kèm lý do cụ thể. |
| \`aevum_get_evolution_report\` | Lấy báo cáo tiến hóa chi tiết của một nhân vật từ \`.aevum/research/evol_{id}.md\`. |
| \`aevum_evolution_feedback\` | Ghi nhận phản hồi từ người dùng vào hồ sơ tiến hóa của nhân vật. |
| \`aevum_resonate_vibe\` | Ghi nhận đặc tính cá nhân (vibe) của nhân vật từ tương tác thực tế. |

---

## Nhóm 3: Cấu trúc Dự án (DDD Structure)

| Công cụ | Mô tả |
|---|---|
| \`aevum_create_domain\` | Tạo Domain mới (trụ cột kiến trúc) trong không gian làm việc. |
| \`aevum_create_feature\` | Tạo Feature mới trong một Domain xác định. |
| \`aevum_create_plan\` | Tạo Plan (kế hoạch thực thi) trong Domain hoặc Feature. |
| \`aevum_rename_structure\` | Đổi tên Domain, Feature, hoặc Plan. |
| \`aevum_delete_structure\` | Xóa một cấu trúc (Domain, Feature, Plan) cùng toàn bộ dữ liệu liên quan. |
| \`aevum_explore_architecture\` | Khám phá toàn bộ kiến trúc Domain-Feature từ \`.aevum/index.json\`. |
| \`aevum_sync_index\` | Kích hoạt đồng bộ lại chỉ mục dự án. |
| \`aevum_suggest_domains\` | Yêu cầu AI gợi ý các Domain mới phù hợp với dự án. |
| \`aevum_suggest_features\` | Yêu cầu AI gợi ý Features cho một Domain cụ thể. |
| \`aevum_suggest_plans\` | Yêu cầu AI gợi ý Plans tiếp theo dựa trên lịch sử thực thi. |

---

## Nhóm 4: Quản lý Kế hoạch (Plan Management)

| Công cụ | Mô tả |
|---|---|
| \`aevum_update_plan_step\` | Cập nhật trạng thái bước (todo → in-progress → done) trong kế hoạch. Hỗ trợ batch update nhiều bước cùng lúc. |
| \`aevum_add_plan_step\` | Thêm bước mới vào một section cụ thể trong kế hoạch. |
| \`aevum_update_plan_section\` | Cập nhật toàn bộ nội dung của một section trong kế hoạch. |
| \`aevum_mark_plan_done\` | Đánh dấu kế hoạch hoàn thành và kích hoạt completion signal. |
| \`aevum_assign_plan\` | Phân công kế hoạch cho một Agent cụ thể kèm theo vai trò và mục tiêu. |
| \`aevum_sync_external_plan\` | Đồng bộ nội dung kế hoạch từ một tệp nguồn bên ngoài. |
| \`aevum_submit_report\` | Gửi báo cáo tiến độ (PLAN_UPDATE, PLAN_DONE, PLAN_ASSIGNED, PLAN_HANDOFF). |
| \`aevum_finalize_session\` | Hoàn tất phiên làm việc, đúc kết kinh nghiệm vào Living Memory và cập nhật trạng thái kế hoạch. |
| \`aevum_capture_evidence\` | Lưu bằng chứng thực thi (evidence) kèm timestamp, trạng thái, và nội dung chi tiết. |

---

## Nhóm 5: Điều phối Biệt đội (Squad Orchestration)

| Công cụ | Mô tả |
|---|---|
| \`aevum_squad_list\` | Liệt kê thành viên Squad hiện tại và trạng thái Squad Mode. |
| \`aevum_squad_toggle\` | Thêm hoặc xóa thành viên khỏi Squad hiện tại. |
| \`aevum_squad_toggle_mode\` | Bật/tắt chế độ Squad Mode (multi-agent collaboration). |
| \`aevum_squad_handoff\` | Chuyển giao kế hoạch từ Agent này sang Agent khác với đầy đủ ngữ cảnh, bước tiếp theo và blockers. |
| \`aevum_squad_huddle\` | Phát tín hiệu thảo luận chung (Huddle) tới toàn bộ thành viên trong Squad. |
| \`aevum_squad_direct_message\` | Gửi tin nhắn trực tiếp (Direct Message) từ Agent này tới Agent khác qua SquadOrchestrator. |
| \`aevum_squad_sync_knowledge\` | Đồng bộ và hợp nhất tri thức tiến hóa từ tất cả Agent trong Squad vào Global Memory. |

---

## Nhóm 6: Bộ nhớ & Tri thức (Memory & Knowledge)

| Công cụ | Mô tả |
|---|---|
| \`aevum_add_memory\` | Thêm nội dung mới trực tiếp vào Global Living Memory (\`.aevum/global/memory.md\`). |
| \`aevum_search_knowledge\` | Tìm kiếm ngữ nghĩa trong kho tri thức cục bộ với query tự nhiên. |
| \`aevum_query_knowledge_graph\` | Truy vấn các bài học kinh nghiệm liên quan từ Semantic Knowledge Graph theo đường dẫn file hoặc tên hàm. |
| \`aevum_audit_memory_graph\` | Kiểm tra sức khỏe, phát hiện code drift và tính toàn vẹn của Knowledge Graph. |
| \`aevum_audit_memory\` | Kiểm tra và báo cáo chất lượng của Global Memory. |
| \`aevum_consolidate_memory\` | Xử lý và hợp nhất các vấn đề trong bộ nhớ theo issueId. |
| \`aevum_sync_knowledge_to_pipernet\` | Đẩy tri thức từ nhân vật hiện tại lên mạng lưới PiperNet. |
| \`aevum_proactive_thought\` | Ghi lại suy nghĩ hoặc quan sát chủ động của Agent theo chủ đề và mức độ ưu tiên. |

---

## Nhóm 7: Nén & Giải nén Ngữ nghĩa (Semantic Compression)

| Công cụ | Mô tả |
|---|---|
| \`aevum_get_compressed\` | Nén thông minh nội dung file .md hoặc .json để tối ưu Context Window. Hỗ trợ đọc theo khoảng dòng (\`startLine\`, \`endLine\`). |
| \`aevum_hydrate_vault_hash\` | Giải nén thân hàm từ AST Vault theo \`BODY_HASH\` để xem nội dung chi tiết. |

---

## Nhóm 8: Phân tích & Chẩn đoán (Diagnostics & Analysis)

| Công cụ | Mô tả |
|---|---|
| \`aevum_get_diagnostics\` | Lấy danh sách lỗi TypeScript/ESLint đang hoạt động từ VS Code Diagnostic Service. |
| \`aevum_get_ui_context\` | Lấy trạng thái ngữ cảnh giao diện người dùng hiện tại. |
| \`aevum_run_sanity_check\` | Chạy kiểm tra cấu trúc toàn diện và tạo báo cáo sanity report. |
| \`aevum_analyze_debt\` | Phân tích technical debt trong một file và gợi ý kế hoạch refactor. |
| \`aevum_explore_architecture\` | Khám phá kiến trúc Domain-Feature của dự án từ chỉ mục. |

---

## Nhóm 9: GitHub Integration

| Công cụ | Mô tả |
|---|---|
| \`aevum_github_sync_active_plan\` | Tạo branch, push kế hoạch và mở Pull Request trên GitHub tự động. |
| \`aevum_github_get_status\` | Kiểm tra trạng thái và reviews của một Pull Request. |
| \`aevum_github_submit_review\` | Gửi peer review chính thức lên Pull Request với điểm mạnh, cảnh báo và kết luận. |

---

## Nhóm 10: Nghiên cứu Chuyên sâu (Deep Research)

| Công cụ | Mô tả |
|---|---|
| \`aevum_deep_research\` | Khởi chạy nhiệm vụ nghiên cứu chuyên sâu về một chủ đề với độ sâu từ 1-5. |
| \`aevum_capture_research_insight\` | Ghi lại insight từ một nguồn nghiên cứu vào nhiệm vụ đang chạy. |
| \`aevum_synthesize_report\` | Tổng hợp báo cáo nghiên cứu hoàn chỉnh từ các insights đã thu thập. |
| \`aevum_analyze_research_progress\` | Phân tích tiến độ của một nhiệm vụ nghiên cứu đang chạy. |

---

## Nhóm 11: Blackboard & Cộng tác (Collaboration)

| Công cụ | Mô tả |
|---|---|
| \`aevum_blackboard_create\` | Khởi tạo phiên Blackboard Hub để các Agent có thể cộng tác đồng thời. |
| \`aevum_blackboard_write_state\` | Ghi trạng thái dự kiến (predicted state) của một tool call vào Blackboard với versioning. |
| \`aevum_blackboard_read_state\` | Đọc trạng thái hiện tại và lịch sử của Blackboard session. |
| \`aevum_blackboard_get_session\` | Lấy thông tin đầy đủ của một Blackboard session. |
| \`aevum_blackboard_add_message\` | Thêm tin nhắn vào luồng thảo luận của Blackboard session. |
| \`aevum_review_open\` | Mở phiên peer review cho một kế hoạch cụ thể. |
| \`aevum_review_get_context\` | Lấy toàn bộ ngữ cảnh của một phiên review. |
| \`aevum_review_add_message\` | Gửi comment, proposal, hoặc review vào phiên đánh giá. |
| \`aevum_review_update_status\` | Cập nhật trạng thái (approved/rejected) cho một đề xuất trong review. |

---

> [!TIP]
> Để tối ưu Context Window khi làm việc, luôn ưu tiên dùng \`aevum_get_compressed\` thay vì đọc file trực tiếp. Giao thức này giúp giảm tới 70% kích thước context mà vẫn giữ nguyên độ chính xác ngữ nghĩa.
`
  },
  {
    id: "living-memory-graph",
    title: "Living Memory Graph Engine",
    category: "Phát triển",
    content: `
# Living Memory Graph Engine

**Living Memory Graph** là trái tim của Aevum OS — một đồ thị tri thức tự phục hồi (self-healing knowledge graph) lưu trữ vĩnh viễn các bài học kinh nghiệm, quyết định kiến trúc và ngữ cảnh kỹ thuật dưới dạng các node có quan hệ ngữ nghĩa với nhau.

---

## 1. Kiến trúc Đồ thị (Graph Architecture)

### Các loại Node
Mỗi node trong đồ thị có một \`type\` xác định loại tri thức:

| Type | Mô tả |
|---|---|
| \`LESSON\` | Bài học kinh nghiệm từ việc giải quyết bug, thiết kế hệ thống hoặc refactor. |
| \`PATTERN\` | Mẫu thiết kế (Design Pattern) đã được kiểm chứng trong dự án. |
| \`DECISION\` | Quyết định kiến trúc quan trọng (Architecture Decision Record). |
| \`CONVENTION\` | Quy chuẩn coding và quy tắc đội ngũ đã được thống nhất. |

### Cấu trúc Node mẫu
\`\`\`json
{
  "id": "node_auth_jwt_001",
  "type": "LESSON",
  "properties": {
    "title": "JWT Refresh Token Race Condition Fix",
    "description": "Sử dụng Redis distributed lock để ngăn race condition khi nhiều request đồng thời refresh token.",
    "author": "AN",
    "date": "2026-07-15",
    "status": "ACTIVE",
    "relatedFiles": ["src/auth/TokenService.ts", "src/auth/RefreshMiddleware.ts"]
  }
}
\`\`\`

---

## 2. Thu hoạch Tri thức Tự động (Automatic Harvesting)

Khi Agent hoàn thành một kế hoạch và gọi \`aevum_finalize_session\`, hệ thống tự động:

1. **Phân tích diff** các file đã thay đổi.
2. **Trích xuất skeleton** của các hàm và class mới được tạo.
3. **Tạo node tri thức** mới từ \`learnings\` trong báo cáo.
4. **Liên kết ngữ nghĩa** node mới với các node hiện có dựa trên file path và AST node names.

---

## 3. Phát hiện Code Drift (Drift Detection)

Hệ thống chạy \`aevum_audit_memory_graph\` để phát hiện các node tri thức bị **trôi lệch (code drift)**:
- Khi file hoặc hàm được node tham chiếu đã bị xóa hoặc đổi tên.
- Node bị đánh dấu \`STALE\` thay vì \`ACTIVE\`.

\`\`\`bash
# Kiểm tra sức khỏe Knowledge Graph
aevum_audit_memory_graph()

# Kết quả mẫu:
# - Tổng số nodes: 142 (Đã dọn 3 nodes trôi lệch)
# - Bài học ACTIVE: 139
# - Bài học STALE: 3
\`\`\`

---

## 4. Truy vấn Tri thức Ngữ nghĩa (Semantic Query)

### Tìm kiếm theo chủ đề
\`\`\`bash
aevum_search_knowledge(query="JWT authentication error handling")
# → Trả về các bài học liên quan đến JWT auth
\`\`\`

### Truy vấn theo File & AST
\`\`\`bash
aevum_query_knowledge_graph(
  filePath="src/auth/TokenService.ts",
  astNodeName="refreshToken"
)
# → Trả về lịch sử kinh nghiệm liên quan đến hàm refreshToken
\`\`\`

---

## 5. Nén & Giải nén AST Vault (Skeleton Hashing)

Để tiết kiệm Context Window, Aevum OS nén thân hàm phức tạp dưới dạng hash:

\`\`\`typescript
// Trong file được đọc qua aevum_get_compressed:
public async processTelemetry(data: TelemetryData): Promise<void> {
  // [BODY_HASH:a8f9c2d1e5b7f3c0]
}
\`\`\`

Khi cần xem chi tiết thân hàm, Agent gọi:
\`\`\`bash
aevum_hydrate_vault_hash(hashId="a8f9c2d1e5b7f3c0")
# → Trả về nội dung gốc đầy đủ của thân hàm
\`\`\`

---

## 6. Memory Pulse — Bộ nhớ Toàn cục

File \`.aevum/global/memory.md\` là bộ nhớ tích lũy toàn cầu của dự án. Thêm tri thức mới:

\`\`\`bash
aevum_add_memory(
  content="[LEARNING] Khi dùng Prisma với PostgreSQL, luôn sử dụng transaction cho batch writes để tránh partial failure."
)
\`\`\`

> [!NOTE]
> Living Memory Graph hoạt động song song với file \`memory.md\`. Graph cung cấp khả năng truy vấn ngữ nghĩa có cấu trúc, còn \`memory.md\` là nguồn nạp ngữ cảnh toàn cục cho Agent khi bắt đầu phiên mới.
`
  },
  {
    id: "blackboard-hub",
    title: "Blackboard Collaboration Hub",
    category: "Phát triển",
    content: `
# Blackboard Collaboration Hub

**Blackboard Hub** là không gian cộng tác chia sẻ (shared workspace) cho phép nhiều AI Agent phối hợp đồng thời trên cùng một nhiệm vụ phức tạp mà không xảy ra xung đột hoặc mất mát ngữ cảnh. Được xây dựng dựa trên mô hình **Optimistic Concurrency Control** với versioning.

---

## 1. Khái niệm & Kiến trúc

Mỗi **Blackboard Session** là một "bảng trắng điện tử" bất biến (append-only) nơi:
- **Nhiều Agent** có thể đọc trạng thái đồng thời.
- **Mỗi Agent** ghi trạng thái dự kiến của riêng mình vào một slot được cô lập.
- **Version control** ngăn chặn các write conflict.
- **Luồng tin nhắn** ghi lại toàn bộ quá trình thảo luận và quyết định.

---

## 2. Vòng đời Blackboard Session

### Bước 1: Khởi tạo Session
Agent điều phối (thường là Architect) tạo phiên Blackboard mới:
\`\`\`bash
aevum_blackboard_create(
  sessionId="session_auth_refactor_001",
  initialContext={
    "task": "Refactor JWT authentication pipeline",
    "assignedAgents": ["AN", "LUNA", "VIDUS"]
  }
)
\`\`\`

### Bước 2: Ghi Trạng thái Dự kiến
Mỗi Agent ghi kết quả dự kiến của tool call sắp thực thi:
\`\`\`bash
aevum_blackboard_write_state(
  sessionId="session_auth_refactor_001",
  toolName="replace_file_content",
  state={
    "targetFile": "src/auth/TokenService.ts",
    "plannedChange": "Add Redis lock for refresh token"
  },
  expectedVersion=3
)
\`\`\`

### Bước 3: Đọc & Đồng bộ
Agent khác đọc trạng thái để đảm bảo không conflict:
\`\`\`bash
aevum_blackboard_read_state(sessionId="session_auth_refactor_001")
\`\`\`

### Bước 4: Thảo luận qua Messages
\`\`\`bash
aevum_blackboard_add_message(
  sessionId="session_auth_refactor_001",
  message="[LUNA] Tôi đã cập nhật CSS cho auth form. Anh AN có thể kiểm tra API response format không?"
)
\`\`\`

---

## 3. Tích hợp với Squad Notifications

Khi một Agent hoàn thành tool call, hệ thống **tự động inject notifications** vào response tiếp theo của Agent khác trong Squad:

\`\`\`
[AEVUM SQUAD NOTIFICATIONS]:
- Từ AN: Đã hoàn thành refactor TokenService. Cần VIDUS audit bảo mật.
- Từ LUNA: Modal đăng nhập đã được cập nhật design mới.
\`\`\`

Cơ chế này giúp Agent luôn nhận được thông tin cập nhật từ đồng nghiệp mà không cần polling thủ công.

---

## 4. Review Session — Peer Code Review

Blackboard Hub tích hợp luồng review chuyên biệt cho việc đánh giá code:

\`\`\`bash
# Mở phiên review
aevum_review_open(
  domainId="core",
  planName="Auth Pipeline Refactor",
  featureId="authentication"
)
# → Tạo session tại: .aevum/reviews/core_authentication_...

# Gửi nhận xét
aevum_review_add_message(
  sessionPath=".aevum/reviews/core_authentication_001",
  type="COMMENT",
  role="reviewer",
  content="Cần thêm unit test cho edge case khi Redis không khả dụng.",
  fromAgent="VIDUS"
)

# Duyệt/từ chối đề xuất
aevum_review_update_status(
  sessionPath=".aevum/reviews/core_authentication_001",
  messageId="msg_xyz",
  status="approved"
)
\`\`\`

---

## 5. Ví dụ Thực tế: Tác vụ Ba Agent

\`\`\`
[Squad Mode: ON]
[AN (Architect)] → Tạo Blackboard session "feature_payment_v2"
[AN] → aevum_squad_handoff(toAgent="LUNA", planName="Payment UI")
[LUNA] → Nhận handoff, đọc Blackboard, bắt đầu viết CSS
[AN] → aevum_squad_handoff(toAgent="VIDUS", planName="Payment Security Audit")  
[VIDUS] → Đọc code LUNA đã viết, chạy aevum_run_sanity_check
[VIDUS] → aevum_review_add_message(type="PROPOSAL", content="Thêm CSRF token")
[LUNA] → aevum_review_update_status(status="approved")
[AN] → aevum_finalize_session() → Tri thức đổ vào Living Memory
\`\`\`

> [!IMPORTANT]
> Khi Squad Mode được kích hoạt, **tất cả notifications** từ Squad members đều được tự động đính kèm vào cuối response của mọi tool call. Agent không bao giờ bỏ lỡ thông tin quan trọng từ đồng đội.
`
  },
  {
    id: "deep-research-engine",
    title: "Deep Research Engine",
    category: "Phát triển",
    content: `
# Deep Research Engine

**Deep Research Engine** là hệ thống nghiên cứu chuyên sâu tích hợp trong Aevum OS, cho phép Agent thực hiện các nhiệm vụ nghiên cứu có cấu trúc với nhiều mức độ (depth levels) từ 1 đến 5, tự động tổng hợp insights và tạo báo cáo nghiên cứu hoàn chỉnh.

---

## 1. Cấu trúc Nhiệm vụ Nghiên cứu (Research Mission)

Mỗi Research Mission bao gồm:
- **Topic**: Chủ đề nghiên cứu cụ thể.
- **Depth (1-5)**: Độ sâu nghiên cứu — 1 là sơ bộ, 5 là chuyên sâu toàn diện.
- **Insights**: Tập hợp các phát hiện từ nhiều nguồn khác nhau.
- **Synthesized Report**: Báo cáo tổng hợp cuối cùng.

---

## 2. Khởi chạy Nhiệm vụ Nghiên cứu

\`\`\`bash
aevum_deep_research(
  topic="Best practices for distributed JWT authentication in microservices",
  depth=3,
  id="research_auth_2026"  # Tùy chọn: gắn ID tùy chỉnh
)
# → Research started: research_auth_2026
\`\`\`

**Depth Levels:**

| Level | Phạm vi | Thời gian ước tính |
|---|---|---|
| 1 | Tổng quan nhanh, 3-5 nguồn | ~5 phút |
| 2 | Phân tích cơ bản, 8-10 nguồn | ~15 phút |
| 3 | Nghiên cứu cân bằng, 15-20 nguồn | ~30 phút |
| 4 | Nghiên cứu chuyên sâu, 25-35 nguồn | ~1 giờ |
| 5 | Toàn diện, 50+ nguồn, phân tích đa chiều | ~2-3 giờ |

---

## 3. Thu thập Insights

Trong quá trình nghiên cứu, Agent ghi lại từng phát hiện quan trọng:

\`\`\`bash
aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="RFC 7519 - JSON Web Token",
  url="https://tools.ietf.org/html/rfc7519",
  insight="JWT claims nên được validate đầy đủ: iss, sub, aud, exp, nbf, iat, jti. Đặc biệt kiểm tra 'exp' để ngăn replay attacks."
)

aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="OWASP JWT Security Cheat Sheet",
  url="https://cheatsheetseries.owasp.org",
  insight="Không bao giờ dùng 'alg: none'. Luôn whitelist thuật toán được phép. Ưu tiên RS256 hơn HS256 cho hệ thống phân tán."
)
\`\`\`

---

## 4. Kiểm tra Tiến độ

\`\`\`bash
aevum_analyze_research_progress(researchId="research_auth_2026")
# → Trả về:
# {
#   "insightCount": 12,
#   "coverageScore": 0.75,
#   "suggestedNextSources": ["NIST guidelines", "Auth0 blog"],
#   "readyForSynthesis": false
# }
\`\`\`

---

## 5. Tổng hợp Báo cáo

Khi thu thập đủ insights (thường khi \`coverageScore >= 0.85\`):

\`\`\`bash
aevum_synthesize_report(researchId="research_auth_2026")
# → Report synthesized: .aevum/research/research_auth_2026_report.md
\`\`\`

Báo cáo tự động bao gồm:
- **Executive Summary**: Tóm tắt hành động 5 điểm chính.
- **Findings by Source**: Phát hiện được tổ chức theo nguồn.
- **Recommendations**: Khuyến nghị ưu tiên với mức độ tác động.
- **Implementation Checklist**: Danh sách triển khai chi tiết.
- **References**: Danh sách nguồn tham chiếu đầy đủ.

---

## 6. Tích hợp với Living Memory

Sau khi tổng hợp báo cáo, Agent nên đẩy kết quả vào Living Memory:

\`\`\`bash
aevum_add_memory(
  content="[RESEARCH SUMMARY: JWT Auth in Microservices]\\nKey insights: RS256 > HS256, always validate full claims, implement token rotation with Redis. Full report: .aevum/research/research_auth_2026_report.md"
)
\`\`\`

---

## 7. Luồng Nghiên cứu Hoàn chỉnh

\`\`\`
[1] aevum_deep_research(topic="...", depth=3)
         ↓
[2] Nhiều lần aevum_capture_research_insight(...)
         ↓
[3] aevum_analyze_research_progress() → Kiểm tra coverage
         ↓ (nếu ready)
[4] aevum_synthesize_report() → Tạo báo cáo .md
         ↓
[5] aevum_add_memory() → Đổ vào Living Memory
         ↓
[6] aevum_pipernet_broadcast() → Chia sẻ lên PiperNet (tùy chọn)
\`\`\`

> [!TIP]
> Hãy sử dụng Deep Research Engine trước khi bắt đầu bất kỳ tác vụ kiến trúc phức tạp nào. Một buổi nghiên cứu depth=3 có thể tiết kiệm nhiều giờ sửa lỗi sau này bằng cách giúp Agent chọn đúng pattern ngay từ đầu.
`
  }
];

