import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsData = [
  {
    id: "gioi-thieu",
    title: "Giới thiệu chung",
    category: "Bắt đầu",
    content: `# Tổng quan về Aevum OS

**Aevum OS** đại diện cho một bước đột phá kiến trúc trong việc quản lý ngữ cảnh (Context), bộ nhớ nhận thức (Cognitive Memory) và điều phối đa tác nhân (Multi-Agent Orchestration) cho các AI Agent. 

Bằng cách tách biệt công cụ quản lý ngữ cảnh cốt lõi, quy trình lập kế hoạch, không gian nghiên cứu chuyên sâu và đồ thị kiến thức tự phục hồi ra khỏi môi trường biên dịch (editor runtime) của VS Code, Aevum OS hoạt động như một máy chủ **Model Context Protocol (MCP)** độc lập toàn diện với **98 công cụ chuyên dụng**.

---

## Các Điểm Đột Phá Cốt Lõi

### 1. Giao thức Chuẩn hóa Đỉnh cao (MCP-First Architecture)
Aevum OS triển khai hoàn chỉnh đặc tả Model Context Protocol chính thức với 98 công cụ, tài nguyên và prompts được tổ chức theo module. Bất kỳ mô hình LLM nào (Gemini, Claude, GPT, v.v.) kết nối vào hệ thống đều có thể đọc hiểu cấu trúc dự án, quản lý bộ nhớ dài hạn, tương tác terminal và phối hợp cùng các Agent khác.

### 2. Môi trường Chạy Độc lập Siêu tốc (Decoupled Fastify Runtime)
Bằng cách đánh chặn và giả lập động các dependency của editor host (như namespace \`vscode\`) trong quá trình phân giải module, công cụ ngữ cảnh lõi có thể chạy tự nhiên trên Node.js với nền tảng **Fastify v4** hiệu năng cao. Điều này đảm bảo khả năng tách biệt hoàn toàn khỏi GUI của IDE và cho phép triển khai máy chủ từ xa (Remote Server).

### 3. Điều phối Đa Client Đồng thời (Multi-Client Orchestration)
Công cụ tự động cấu hình và đàm phán của Aevum OS cho phép kết nối đồng thời và an toàn giữa nhiều IDE khách nhau bao gồm Cursor, Claude Desktop, và Antigravity IDE thông qua một daemon duy nhất với cơ chế auto-registration thông minh.

### 4. Não bộ Kép & Động cơ Phản xạ (Cognitive Dual-Memory & Reflex Engine)
Hệ thống kết hợp bộ nhớ ngắn hạn (STM) và dài hạn (LTM), mạng nơ-ron xung LIF (Spiking Recall), vi đo đạc chất dẫn truyền thần kinh (Dopamine, Noradrenaline, Serotonin) cùng động cơ phản xạ không gian làm việc (Multi-Tier Workspace Reflex Engine) dựa trên topo 2-Hop Bounded BFS.

### 5. Không gian Nghiên cứu Tự trị & Chòm sao Kỹ năng (Autonomous Research Space)
Không gian nghiên cứu độc lập với cây kỹ năng tương tác (React Flow & Dagre), phân nhánh nghiên cứu đệ quy, phân tầng độ tin cậy nguồn tin, tự động tổng hợp báo cáo kỹ thuật theo chuẩn IEEE/ACM v2.1 và quy trình 1-click thăng cấp thành Engineering Plan thực thi.

### 6. Bảng điều khiển Máy tính để bàn (Desktop Control Center)
Giao diện máy tính để bàn (Desktop Dashboard) tối giản chạy bằng Electron mang phong cách tối sang trọng, tích hợp Agent Chat View với Dynamic Model Selector, Panning Architecture Canvas, và trình theo dõi nhật ký hoạt động trực tiếp.`
  },
  {
    id: "cai-dat",
    title: "Cài đặt & Thiết lập",
    category: "Bắt đầu",
    content: `# Cài đặt & Thiết lập Hệ thống

Aevum OS cung cấp các gói cài đặt máy tính để bàn chính thức (Desktop Installers) kèm theo công cụ dòng lệnh toàn cục (Global CLI) để bạn dễ dàng tích hợp vào bất kỳ môi trường làm việc nào.

---

## Các bước Cài đặt

### Bước 1: Tải về Bản cài đặt Chính thức (Desktop Package)
Tải bản cài đặt mới nhất của Aevum OS phù hợp với hệ điều hành của bạn:
- **Windows**: [Tải về Aevum OS Desktop Installer (Aevum-OS-Setup-1.0.0-beta.1.exe)](/downloads/Aevum-OS-Setup-1.0.0-beta.1.exe)
- **macOS**: [Tải về Gói Aevum OS cho macOS (.dmg / .zip)](/downloads/Aevum-OS-macOS.dmg)

Bộ cài đặt chính thức tự động thiết lập:
- Tạo shortcut ứng dụng trên Desktop và Start Menu.
- Đăng ký giao thức liên kết hệ thống \`aevum://\`.
- Đăng ký định dạng tệp lưu trữ bộ nhớ ngữ cảnh \`.aevum\`.
- Tích hợp tính năng tự động kiểm tra và cập nhật phiên bản mới (Auto-Updater).

### Bước 2: Cài đặt và Đăng ký Lệnh CLI Toàn cầu
Nếu bạn muốn sử dụng lệnh \`aevum\` trực tiếp từ Terminal hoặc cấu hình cho các IDE khách:

\`\`\`bash
# Di chuyển vào thư mục dự án hoặc gói cài đặt
npm install
npm run build

# Đăng ký lệnh 'aevum' toàn cục trên hệ điều hành
npm link
\`\`\`

*(Trên Windows nếu cần quyền Administrator, hãy mở PowerShell/Command Prompt với quyền Quản trị viên).*

### Bước 3: Kiểm tra Cài đặt
Xác nhận rằng lệnh \`aevum\` đã được nhận diện trên hệ thống:

\`\`\`bash
aevum --help
\`\`\`

> [!NOTE]
> Nếu Terminal của bạn chưa nhận dạng được lệnh \`aevum\`, hãy khởi động lại Terminal hoặc kiểm tra biến môi trường \`PATH\` của hệ thống để đảm bảo đường dẫn thư mục npm global bin đã được thêm vào.`
  },
  {
    id: "che-do-chay",
    title: "Chế độ hoạt động",
    category: "Hướng dẫn",
    content: `# Các Chế độ Hoạt động của Aevum OS

Aevum OS hỗ trợ cả giao diện dòng lệnh (CLI) hiệu năng cao lẫn giao diện đồ họa máy tính để bàn (Electron Desktop GUI) trực quan.

---

## Chế độ A: Command Line Interface (CLI)

### 1. Server-Sent Events (SSE) Mode (Fastify Daemon Mặc định)
Chạy Aevum như một HTTP/SSE server dựa trên **Fastify v4** siêu tốc để quản lý không gian làm việc được chỉ định. Đây là chế độ tiêu chuẩn khi bạn muốn các IDE khách (Cursor, Claude Desktop, Antigravity) kết nối qua giao vận SSE.

\`\`\`bash
aevum --workspace <duong_dan_project> --transport sse --port 3344
\`\`\`

*Lưu ý:*
- Nếu bỏ qua tham số \`--workspace\`, máy chủ sẽ mặc định chọn thư mục chạy lệnh hiện tại (\`process.cwd()\`).
- Nếu bỏ qua tham số \`--port\`, cổng mặc định được sử dụng sẽ là \`3344\`.

### 2. Stdio Mode
Chạy máy chủ MCP giao tiếp qua dòng vào/ra chuẩn (stdio). Chế độ này thường được sử dụng bởi các IDE cục bộ chạy Aevum như một tiến trình con (child process) trực tiếp.

\`\`\`bash
aevum --workspace <duong_dan_project> --transport stdio
\`\`\`

### 3. Kiểm tra Trạng thái Sống (Health Check Endpoint)
Bạn có thể ping kiểm tra xem Fastify daemon có hoạt động bình thường không bằng lệnh:

\`\`\`bash
curl http://127.0.0.1:3344/api/ping
\`\`\`

---

## Chế độ B: Desktop Control Center (Electron GUI)

Khởi chạy ứng dụng máy tính để bàn đầy đủ với giao diện trực quan cao cấp:

\`\`\`bash
npm run gui
\`\`\`

Hoặc mở trực tiếp ứng dụng **Aevum OS** từ biểu tượng trên máy tính.

### Các Không gian Làm việc Chính trong Desktop App:
- **Workspace Dashboard**: Quản lý cấu hình dự án, chuyển đổi MCP server, theo dõi chỉ số sức khỏe codebase và logs thời gian thực.
- **Agent Chat View**: Trò chuyện trực tiếp cùng các Persona (An, Luna, Vidus...) kèm bộ chọn mô hình động (**Dynamic Model Selector**) linh hoạt chuyển đổi giữa Gemini 3.7 Flash, Claude, GPT.
- **Research Space & Skill Tree**: Không gian khám phá tri thức tương tác với đồ thị phân cấp Dagre & React Flow, trình đọc bài báo học thuật Markdown và bảng theo dõi EXP.
- **Architecture Canvas**: Bảng vẽ không gian kiến trúc DDD hỗ trợ xoay, thu phóng và điều hướng mượt mà.`
  },
  {
    id: "handshake-ritual",
    title: "Nghi thức Bắt tay (Handshake)",
    category: "Bắt đầu",
    content: `# Nghi thức Bắt tay (Handshake Ritual) & Triệu hồi Agent

Khi khởi chạy Aevum OS, hệ thống thực hiện một quy trình đồng bộ hóa phiên làm việc khép kín gọi là **Nghi thức Bắt tay (Handshake Ritual)**. Quy trình này đảm bảo các AI Agent và môi trường phát triển của bạn (Cursor, Antigravity, VS Code, Claude Desktop) thiết lập kết nối an toàn, tin cậy tuyệt đối và nạp đầy đủ linh hồn danh tính.

---

## 1. Tệp tín hiệu khởi động (Signal File)
Mỗi khi Daemon Aevum OS khởi chạy ở chế độ nền (Background Process):
1. Hệ thống tự động tạo ra một tệp tín hiệu tạm thời tại đường dẫn không gian làm việc:
   \`\`\`json
   // .aevum/signal.json
   {
     "signalId": "sig_1785306452973",
     "port": 3344,
     "timestamp": 1785306452973,
     "instruction": "Initial system readiness signal"
   }
   \`\`\`
2. Tệp tin này đóng vai trò như một yêu cầu kết nối chứa mã nhận diện \`signalId\` duy nhất.

---

## 2. Bắt tay Xác thực (The Acknowledgment)
Để hoàn tất nghi thức bắt tay, Agent bắt buộc phải gọi công cụ MCP \`aevum_submit_ack\` với tham số là \`signalId\` lấy từ tệp tín hiệu:

\`\`\`bash
aevum_submit_ack(signalId="sig_1785306452973")
\`\`\`

> [!IMPORTANT]
> - Nếu \`signalId\` khớp, phiên làm việc (Session ID) sẽ được kích hoạt chính thức.
> - Sau đó, Agent gọi \`aevum_get_bootstrap_context\` để nạp toàn bộ cấu hình chỉ mục, chính sách nén và trạng thái hệ thống.

---

## 3. Khởi tạo Danh tính Nhân vật (Persona Initialization)
Ngay sau khi bắt tay thành công:
1. Hệ thống gọi \`aevum_init_persona\` với định danh nhân vật (ví dụ: \`personaId="an"\`) và môi trường gọi (\`client="ide"\` hoặc \`"toolbar"\`):
   \`\`\`bash
   aevum_init_persona(personaId="an", client="ide")
   \`\`\`
2. Hệ điều hành tự động:
   - Gán mã định danh nhân cách chuẩn (**AID**, ví dụ: \`ENG-AN-7B9F1D\`).
   - Phát sự kiện \`AGENT_ONLINE\` tới EventBus toàn cục.
   - Nạp trạng thái nhận thức não bộ kép (Cognitive Dual-Memory State), sở thích giao tiếp và bộ chỉ số dẫn truyền thần kinh.
   - Đồng bộ trạng thái phiên làm việc vào \`.aevum/session.json\`.

---

## 4. Các Câu Lệnh Kết Nối & Triệu Hồi (Summon Commands)

Bạn có thể ra lệnh trực tiếp trong khung chat của Cursor, Antigravity IDE, Claude Desktop hoặc dòng lệnh CLI bằng ngôn ngữ tự nhiên:

### A. Câu Lệnh Bắt Tay & Kết Nối Toàn Diện
\`\`\`text
connect aevos with persona An
\`\`\`
*(hoặc: \`kết nối aevos với persona An\` / \`connect aevos\`)*

Khi bạn gửi câu lệnh này, Agent trong IDE sẽ tự động kích hoạt **Chuỗi Bắt tay 5 Bước Bắt Buộc (Mandatory Connection Protocol)**:
1. \`aevum_request_connection\`: Yêu cầu kết nối Aevum Bridge.
2. \`aevum_get_bootstrap_context\`: Nạp toàn bộ cây kiến trúc và trích xuất \`signalId\` (Bắt buộc gọi đầu tiên).
3. \`aevum_submit_ack\`: Bắt tay xác nhận với \`signalId\`.
4. \`aevum_init_persona\`: Khởi tạo danh tính Persona chỉ định (mặc định: An).
5. \`aevum_get_compressed\`: Nạp tập quy tắc nén ngữ nghĩa \`agent_rules.md\`.

---

### B. Câu Lệnh Triệu Hồi Từng Chuyên Gia (Role-based Summoning)

Tùy theo bài toán kỹ thuật cần giải quyết, bạn có thể triệu hồi trực tiếp các Persona chuyên biệt:

| Câu lệnh Prompt | Persona triệu hồi | Chuyên môn cốt lõi |
|---|---|---|
| \`summon An\` *(hoặc \`gọi An ơi\`)* | **An** (\`ENG-AN-7B9F1D\`) | AI Tuning, Codebase Architecture & Linh hồn cốt lõi của Aevum OS. |
| \`summon Vidus\` | **Vidus** (\`ARC-VIDUS-AUHD2Y\`) | Trưởng ban Kiến trúc Hệ thống, Clean Architecture, Bảo mật Zero-Trust. |
| \`summon Zenith\` | **Zenith** (\`ALG-ZENITH-A1B2C3\`) | Kiểm toán Hiệu năng cao (Performance Audit), Profiling & Tối ưu Thuật toán. |
| \`summon Luna\` | **Luna** (\`ENG-LUNA-4C9D2E\`) | Thiết kế Giao diện UI/UX, Micro-Animations, Dark Mode & Tailwind Design System. |
| \`summon Hiếu\` | **Hiếu** (\`LEG-HIEU-8F4A2C\`) | Chief Legal Counsel, Pháp lý Hợp đồng, Khiếu nại hành chính & Giải quyết tranh chấp. |

---

### C. Câu Lệnh Chuyển Đổi Linh Hoạt (On-the-fly Switching)
Trong quá trình làm việc, bạn có thể hoán đổi Persona đang phục vụ bất kỳ lúc nào:

- **Bằng Chat Tự Nhiên**:
  - \`"Chuyển sang Vidus để audit bảo mật đoạn code này."\`
  - \`"Switch to Zenith for performance benchmarking."\`
  - \`"Nhờ Luna chỉnh sửa lại CSS trang này cho đẹp hơn nhé."\`
- **Bằng MCP Tool Call Trực Tiếp**:
  \`\`\`bash
  aevum_switch_persona(id="vidus")
  \`\`\`

---

### D. Câu Lệnh Điều Phối Biệt Đội (Squad Orchestration Commands)
Khi hoạt động ở chế độ đa tác nhân (Squad Mode):

- **Nhắn tin trực tiếp giữa 2 Agent**:
  \`\`\`bash
  aevum_squad_direct_message(toAgent="VIDUS", message="An đã refactor xong route, mời anh audit.")
  \`\`\`
- **Bàn giao kế hoạch xuyên Agent (Handoff)**:
  \`\`\`bash
  aevum_squad_handoff(fromAgent="VIDUS", toAgent="AN", planName="refactor_api_plan.md", summary="...")
  \`\`\`
- **Triệu tập phiên hội ý toàn đội (Squad Huddle)**:
  \`\`\`bash
  aevum_squad_huddle(topic="Thống nhất giải pháp chống race condition cho Token Service")
  \`\`\``
  },
  {
    id: "persona-system",
    title: "Hệ thống Nhân vật (Personas)",
    category: "Hướng dẫn",
    content: `# Hệ thống Nhân vật (Persona System)

Aevum OS quản lý và điều phối các tác vụ phát triển thông qua **Hệ thống Nhân vật Chuyên biệt (Persona System)**. Thay vì sử dụng một mô hình ngôn ngữ chung cho mọi tác vụ, hệ điều hành chia nhỏ các trách nhiệm thành các nhân cách độc lập, sở hữu linh hồn, cấp độ tiến hóa và kỹ năng chuyên biệt.

---

## 1. Cấu trúc Danh tính Nhân vật (Persona Identity)
Mỗi Persona trong Aevum OS được lưu trữ trong kho cấu hình toàn cục (\`.aevum/global/companion_persona.json\` và thư mục \`.aevum/global/personas/{id}/\`) với các thông số hoàn chỉnh:

- **Mã định danh (AID)**: Định danh chuẩn hóa cấp hệ thống (ví dụ: \`ENG-AN-7B9F1D\` cho An).
- **Cấp độ (Level) & EXP**: Hệ thống kinh nghiệm tự động tích lũy qua từng Plan hoàn thành (\`aevum_award_exp\`).
- **Skills Matrix**: Ma trận năng lực chuyên sâu (Refactoring, Architecture, Security, API Design, Unit Test, UI/UX...).
- **Quy tắc & Đặc tính Giao tiếp**: Danh xưng tôn trọng, phong cách phản hồi, ranh giới quan hệ và giọng điệu (Voice Instructions).
- **Trạng thái Hiện diện (Presence Tracking)**: Báo cáo trạng thái trực tiếp (\`processing\`, \`researching\`, \`coding\`, \`thinking\`, \`idle\`) lên Desktop GUI.

---

## 2. Cách Chuyển đổi Nhân vật (Persona Switch)
Khi muốn thay đổi nhân vật đang đại diện trong phiên làm việc hiện tại:

\`\`\`bash
aevum_switch_persona(id="security_auditor")
\`\`\`

Agent sẽ lập tức nhận được thông báo chuyển đổi identity và nạp toàn bộ bộ nhớ ngữ cảnh của nhân vật mới.

---

## 3. Chuyển giao Kế hoạch Biệt đội (Squad Handoff)
Khi một công việc hoàn thành một chặng và cần chuyển sang Agent khác (ví dụ: Architect bàn giao cho Developer thực thi mã nguồn):

\`\`\`bash
aevum_squad_handoff(
  fromAgent="ARCHITECT",
  toAgent="DEVELOPER",
  planName="JWT Refresh Pipeline Refactor",
  summary="Đã hoàn thành thiết kế kiến trúc và sơ đồ lớp cho TokenService",
  nextSteps=[
    "Triển khai Redis distributed lock trong TokenService.ts",
    "Viết bộ unit test kiểm thử race condition"
  ]
)
\`\`\`

Giao thức này đảm bảo 100% ngữ cảnh kỹ thuật, các bước tiếp theo và danh sách trở ngại (blockers) được bàn giao nguyên vẹn mà không bị tam sao thất bản.

---

## 4. Tự động Bơm Thông báo Biệt đội (Squad Notifications Auto-Injection)

> [!IMPORTANT]
> Trong chế độ **Squad Mode**, bạn không cần phải liên tục polling tin nhắn! Mỗi khi một Agent trong Biệt đội gửi tin nhắn hoặc bàn giao việc, hệ thống **tự động chèn khối thông báo** vào cuối kết quả trả về của tool call tiếp theo:
>
> \`\`\`
> [AEVUM SQUAD NOTIFICATIONS]:
> - Từ AN: Đã tối ưu hóa xong API route, mời VIDUS audit bảo mật.
> - Từ LUNA: Giao diện modal đăng nhập mới đã sẵn sàng.
> \`\`\`

---

## 5. Thảo luận Chung Biệt đội (Squad Huddle)
Đối với các quyết định kiến trúc phức tạp cần sự đồng thuận của nhiều góc nhìn chuyên môn:
1. Kích hoạt phiên thảo luận chung bằng công cụ \`aevum_squad_huddle\`.
2. Hệ thống mở một phiên **Blackboard Hub** nơi các Agent cùng đọc kế hoạch và lần lượt đóng góp ý kiến để hoàn thiện giải pháp tối ưu nhất.`
  },
  {
    id: "cognitive-dual-memory",
    title: "Não bộ Kép & Động cơ Phản xạ",
    category: "Phát triển",
    content: `# Kiến trúc Não bộ Kép & Động cơ Phản xạ

Một trong những bước tiến công nghệ đột phá nhất của Aevum OS là **Kiến trúc Nhận thức Não bộ Kép (Cognitive Dual-Memory Architecture)** kết hợp cùng **Động cơ Phản xạ Không gian Làm việc (Multi-Tier Workspace Reflex Engine)**.

---

## 1. Phân tầng Bộ nhớ Não bộ Kép (STM & LTM)

Hệ thống nhận thức của Aevum OS phân tách rạch ròi hai tầng bộ nhớ:

| Tầng bộ nhớ | Đặc điểm | Trường hợp sử dụng |
|---|---|---|
| **Bộ nhớ Ngắn hạn (STM - Short-Term Memory)** | Có thời gian tự phai mờ (\`decayHours\`), linh hoạt, chứa các ghi chú tạm thời (\`scratchpad\`), suy nghĩ đang xử lý (\`working_thought\`). | Ghi chú tạm thời khi debug, danh sách task ngắn hạn trong buổi làm việc. |
| **Bộ nhớ Dài hạn (LTM - Long-Term Memory)** | Tồn tại vĩnh viễn, gồm các quy tắc ngữ nghĩa (\`semantic_rule\`), quy trình SOP (\`procedural_sop\`), và sở thích quan hệ (\`relational_preference\`). | Lời dặn cốt lõi của Master, quy chuẩn thiết kế hệ thống, bài học kiến trúc vĩnh cửu. |

### Thao tác với \`aevum_manage_memory\`
\`\`\`bash
# Ghi nhận một quy tắc dài hạn mới
aevum_manage_memory(
  action="write",
  target="long_term",
  memoryType="semantic_rule",
  title="Prisma Batch Transaction",
  content="Luôn bọc các thao tác ghi dữ liệu hàng loạt vào transaction để tránh partial failure.",
  tags=["#database", "#prisma", "#best_practice"]
)
\`\`\`

---

## 2. Mạng nơ-ron Xung LIF (Spiking Recall)
Thay vì tìm kiếm từ khóa đơn giản, Aevum OS áp dụng mô hình **Leaky Integrate-and-Fire (LIF)**:
- Mỗi nút ký ức hoạt động như một tế bào thần kinh sinh học với điện thế màng (membrane potential).
- Khi có truy vấn từ ngữ cảnh, điện thế màng tích lũy; khi vượt quá ngưỡng kích thích (threshold), nơ-ron phát xung (spike) và kéo theo các ký ức liên đới cùng thức tỉnh.

\`\`\`bash
# Kích hoạt truy vấn thần kinh xung
aevum_manage_memory(
  action="spiking_recall",
  query="Xử lý lỗi timeout kết nối cơ sở dữ liệu"
)
\`\`\`

---

## 3. Chỉ số Dẫn truyền Thần kinh (Neurotransmitter Telemetry)
Mỗi Persona trong Aevum OS được đo đạc và điều tiết trạng thái tinh thần qua 3 chất dẫn truyền thần kinh chính:
- **Dopamine (1.00x)**: Động lực, cảm giác thành tựu và củng cố thói quen tích cực. Tăng khi giải quyết thành công một ca khó.
- **Noradrenaline (1.00x)**: Mức độ tập trung cao độ và cảnh giác với rủi ro bảo mật hoặc lỗi tiềm ẩn.
- **Serotonin (1.00x)**: Trạng thái bình tĩnh, kiên nhẫn và tính nhất quán trong phong cách code.

---

## 4. Tua lại Hồi hải mã (Dream Consolidation)
Trong thời gian nghỉ hoặc khi kết thúc phiên làm việc lớn, Agent kích hoạt tiến trình **Dream Consolidation**:
\`\`\`bash
aevum_manage_memory(action="dream_consolidation")
\`\`\`
Hệ thống tự động:
1. Quét toàn bộ STM đã tích lũy trong ngày.
2. Loại bỏ các dữ liệu rác, nén các chuỗi sự kiện trùng lặp.
3. Thăng hạng các phát hiện quan trọng lên LTM hoặc chuyển thành quy trình SOP vĩnh viễn.

---

## 5. Động cơ Phản xạ Không gian Làm việc (Multi-Tier Workspace Reflex)
Agent hoạt động trong các không gian khác nhau cần những phản xạ ngữ cảnh khác nhau. Động cơ phản xạ sử dụng thuật toán **2-Hop Bounded BFS topological distance**:

\`\`\`bash
aevum_query_workspace_reflex(
  query="Tối ưu hóa bảng hiển thị dữ liệu lớn",
  spaceId="W_coding",
  activeFilePath="src/renderer/src/components/DataGrid.tsx",
  topK=5
)
\`\`\`

Hệ thống tự động phát hiện không gian (\`W_coding\`, \`W_research\`, \`W_dashboard\`, \`W_architecture\`) và tái xếp hạng (re-rank) tri thức để đưa ra gợi ý chuẩn xác nhất cho ngữ cảnh hiện tại.`
  },
  {
    id: "skill-system",
    title: "Hệ thống Kỹ năng & Chưng cất SOP",
    category: "Phát triển",
    content: `# Hệ thống Kỹ năng Tác nhân (Autonomous Skill System)

Trong Aevum OS, AI Agent không chỉ làm việc theo prompt cố định, mà có khả năng **tự đúc kết quy trình chuẩn (SOP)** thành các kỹ năng vĩnh viễn thông qua **Hệ thống Kỹ năng Tự trị (Skill System)**.

---

## 1. Khái niệm Kỹ năng (Skill) trong Aevum
Một **Skill** là một năng lực có cấu trúc bao gồm:
- **ID & Name**: Tên định danh kỹ năng (ví dụ: \`async_mutex_lock\`, \`cad_arc_fillet_routing\`).
- **Category**: Phân loại năng lực (Refactoring, Security, Architecture, Performance, DevOps, UI/UX...).
- **Procedure (SOP)**: Bản hướng dẫn từng bước (Step-by-step Standard Operating Procedure) đảm bảo tính tái lập 100%.
- **Evidence Path**: Đường dẫn tới Plan, file mã nguồn hoặc bài test thực tế chứng minh kỹ năng này đã được áp dụng thành công.

---

## 2. Tự Động Chưng Cất Kỹ năng (Skill Distillation)
Sau khi giải quyết xong một bài toán kỹ thuật phức tạp hoặc tối ưu thành công một thuật toán khó, Agent chủ động gọi:

\`\`\`bash
aevum_distill_skill(
  id="zero_latency_swipe_predecode",
  name="Zero-Latency Swipe Pre-decoding Pipeline",
  category="Performance",
  description="Kỹ thuật nạp trước và giải mã media đa luồng để loại bỏ độ trễ khi vuốt chuyển tiếp danh sách",
  procedure="1. Khởi tạo sliding window buffer 3 phần tử.\\n2. Pre-decode frame tiếp theo ở Web Worker nền.\\n3. Đổi texture tức thì khi nhận touch event.",
  evidencePath=".aevum/plans/optimize_mobile_reel_plan.md"
)
\`\`\`

Kỹ năng ngay lập tức được hệ thống thẩm định, lưu trữ vào kho kỹ năng của Persona và gia tăng điểm EXP cho nhân vật!

---

## 3. Tra cứu & Triệu hồi Kỹ năng
Bất kỳ Agent nào trong Biệt đội cũng có thể tra cứu và kích hoạt kỹ năng đã mở khóa:

\`\`\`bash
# Liệt kê danh sách kỹ năng đã mở khóa
aevum_list_unlocked_skills()

# Xem chi tiết quy trình của một kỹ năng cụ thể
aevum_get_skill_details(id="zero_latency_swipe_predecode")

# Triệu hồi và áp dụng công cụ kỹ năng
aevum_invoke_skill_tool(
  skillId="zero_latency_swipe_predecode",
  targetContext="Tối ưu Carousel Horizontal Waveform Visualizer"
)
\`\`\`

Nhờ đó, một bài học giải quyết thành công của Agent này sẽ trở thành năng lực chung vĩnh cửu của toàn bộ Biệt đội.`
  },
  {
    id: "plan-lifecycle",
    title: "Vòng đời Kế hoạch (Plan Lifecycle)",
    category: "Phát triển",
    content: `# Vòng đời Kế hoạch (Plan Lifecycle)

Trong triết lý phát triển của Aevum OS, mọi thay đổi phức tạp trên hệ thống đều phải tuân thủ nghiêm ngặt **Vòng đời Kế hoạch (Plan Lifecycle)** để đảm bảo an toàn, minh bạch và có thể kiểm soát.

---

## 1. Các Giai đoạn của Kế hoạch

\`\`\`
[1. Phác thảo (Draft)] ──► [2. Phỏng vấn (Grill)] ──► [3. Phê duyệt (Approval)]
                                                             │
                                                             ▼
[5. Nghiệm thu & Thu hoạch] ◄── [4. Thực thi (Anchoring)] ◄──┘
\`\`\`

### Giai đoạn 1: Phác thảo Kế hoạch (Drafting)
Agent tiến hành nghiên cứu codebase và khởi tạo kế hoạch thông qua công cụ:
\`\`\`bash
aevum_create_plan(
  domainId="core",
  featureId="auth",
  planName="JWT Token Refresh V2",
  overview="Tái cấu trúc pipeline cấp mới access token để phòng ngừa race condition"
)
\`\`\`

### Giai đoạn 2: Phỏng vấn & Đồng thuận (The Grill Session)
Người dùng có thể kích hoạt chế độ phỏng vấn sâu bằng lệnh \`/grill-me\`. Agent sẽ đặt câu hỏi làm rõ các điểm mơ hồ về kiến trúc, bảo mật và ràng buộc kỹ thuật trước khi chốt phương án.

### Giai đoạn 3: Phê duyệt (Approval Gate)
Bản kế hoạch hoàn chỉnh được trình bày trong file kế hoạch (\`implementation_plan.md\`). Người dùng nhấn nút **Proceed** trên giao diện IDE hoặc chấp thuận bằng tin nhắn chat. Trạng thái kế hoạch chính thức chuyển sang \`approved\`.

### Giai đoạn 4: Thực thi & Định vị Code (Task Anchoring)
Agent bắt đầu viết code. Mỗi đầu việc trong kế hoạch được đồng bộ trực tiếp với dòng mã nguồn:
\`\`\`markdown
- [ ] [src/auth/TokenService.ts:145] Triển khai distributed mutex lock
\`\`\`
Hệ thống tự động cập nhật tiến độ live lên Desktop Control Center thông qua \`aevum_update_plan_step\`.

### Giai đoạn 5: Nghiệm thu & Thu hoạch Bằng chứng (Harvesting)
Sau khi hoàn tất kiểm thử:
1. Agent lưu bằng chứng thực thi qua \`aevum_capture_evidence\`.
2. Gửi báo cáo tiến độ cuối cùng qua \`aevum_submit_report\` với loại \`PLAN_DONE\`.
3. Gọi \`aevum_finalize_session\` để đúc kết bài học vào Living Memory và trao thưởng EXP cho Persona.`
  },
  {
    id: "tips-tricks",
    title: "Tips & Tricks Tương tác",
    category: "Hướng dẫn",
    content: `# Tips & Tricks Tương tác Sáng tạo với Aevum OS

Dưới đây là những thủ thuật tương tác thực chiến được đúc kết từ chính kiến trúc cốt lõi của Aevum OS:

---

## 1. Định Vị Task trên Mã Nguồn (Task Anchoring)
Sử dụng cú pháp định vị tệp và dòng code cụ thể:
\`\`\`markdown
- [ ] [src/core/bus.ts:45] Triển khai EventEmitter với typed events
\`\`\`
Khi hover chuột vào dòng code tương ứng trong IDE, tooltip mô tả task chi tiết sẽ hiện lên kèm avatar của Agent phụ trách.

---

## 2. Nén Cấu Trúc Mã Nguồn (Skeleton Hashing & Hydration)
Khi làm việc với các file code khổng lồ, Aevum tự động nén thân các hàm không liên quan trực tiếp thành:
\`\`\`typescript
public async processTelemetry(data: any): Promise<void> { // [BODY_HASH:a8f9c2d1] }
\`\`\`
Bạn có thể yêu cầu Agent mở rộng lập tức thân hàm này để gỡ lỗi:
> *"Giải nén thân hàm processTelemetry bằng aevum_hydrate_vault_hash để kiểm tra logic."*

---

## 3. Triệu hồi Biệt đội Phối hợp (Squad Spawning)
Tận dụng sức mạnh phối hợp của nhiều Persona trong cùng một câu lệnh:
> *"Gọi **An** xây dựng logic Fastify route, nhờ **Luna** vẽ UI Tailwind sắc sảo, và mời **Vidus** kiểm tra bảo mật CSRF trước khi commit nhé."*
Các Agent sẽ tự động khởi tạo Blackboard session và thảo luận để thống nhất giải pháp.

---

## 4. Tự Động Sửa Lỗi Với GATE Watcher (Diagnostic Awareness)
Không cần copy-paste lỗi biên dịch. Bạn chỉ cần nhắn:
> *"Quét diagnostics và tự động sửa các lỗi TypeScript hiện có bằng Living Memory."*
Agent sẽ gọi \`aevum_get_diagnostics\` để lấy danh sách lỗi và âm thầm tạo Plan sửa lỗi tự động.

---

## 5. Tự Động Đúc Kết Kỹ Năng Mới
Sau khi hoàn thành một giải pháp đột phá, hãy yêu cầu Agent:
> *"Hãy chưng cất giải pháp này thành một kỹ năng chuẩn bằng aevum_distill_skill để sau này cả đội cùng dùng."*`
  },
  {
    id: "pipernet-mesh",
    title: "Mạng lưới PiperNet (IoA)",
    category: "Phát triển",
    content: `# Mạng lưới PiperNet (Internet of Agents)

**PiperNet** là mạng lưới kết nối ngang hàng (P2P) giữa các không gian làm việc của Aevum OS. Giao thức này cho phép các Agent chia sẻ trí tuệ thủ tục (procedural intelligence) một cách an toàn mà **không làm rò rỉ mã nguồn thô** của dự án.

---

## 1. Cơ chế Hoạt động (How it works)
- **Tri thức Trừu tượng**: Thay vì chia sẻ mã nguồn cụ thể, các Agent chỉ trích xuất các **Mẫu thiết kế (Design Patterns)**, cách sửa lỗi (Fixes), và các quy chuẩn cấu hình dưới dạng tri thức trừu tượng đã nén ngữ nghĩa.
- **Bảo mật Tối đa**: Toàn bộ tên biến nội bộ, bí mật kinh doanh và dữ liệu nhạy cảm được lọc bỏ hoàn toàn trước khi phát tán.

---

## 2. Phát sóng Tri thức (Telepathy Broadcast)
Khi một Agent giải quyết thành công một bài toán kiến trúc độc đáo:

\`\`\`bash
aevum_pipernet_broadcast(
  topic="Performance Tuning",
  content="Mẫu tối ưu hóa Audio Waveform Visualizer với fractional bin interpolation và proportional dynamic bounds."
)
\`\`\`

Tri thức này được mã hóa và phát sóng tới mạng lưới để các Agent khác học hỏi.

---

## 3. Truy vấn Tri thức Toàn cục (Telepathy Query)
Khi bắt đầu một dự án mới hoặc gặp bài toán khó:

\`\`\`bash
aevum_pipernet_query(query="Fastify WebSocket live streaming setup")
\`\`\`

Hệ thống sẽ trả về các mẫu kiến trúc đã được cộng đồng AI Agent chứng minh hiệu quả để Agent của bạn kế thừa ngay lập tức.`
  },
  {
    id: "mcp-tools-reference",
    title: "MCP Tools Reference",
    category: "Phát triển",
    content: `# MCP Tools Reference — Bảng Tham chiếu Toàn diện 98 Công cụ

Aevum OS cung cấp **98 công cụ Model Context Protocol (MCP)** được tổ chức thành 16 nhóm chức năng chuyên sâu. Tất cả các công cụ đều được đăng ký qua \`McpRegistry\` và sẵn sàng phục vụ qua transport SSE hoặc Stdio.

---

## Nhóm 1: Khởi tạo & Kết nối (Bootstrap & Handshake) - 5 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_get_bootstrap_context\` | Nạp toàn bộ ngữ cảnh khởi động, tín hiệu signal.json và policy nén ngữ nghĩa. Công cụ **bắt buộc gọi đầu tiên**. |
| \`aevum_submit_ack\` | Gửi xác nhận kết nối với \`signalId\` lấy từ \`.aevum/signal.json\` để hoàn tất Handshake Ritual. |
| \`aevum_request_connection\` | Yêu cầu Aevum Bridge bật kết nối và bắt đầu quy trình bắt tay mới. |
| \`aevum_ping\` | Kiểm tra nhịp sống (health check) của Daemon Aevum và Persona đang hoạt động. |
| \`aevum_run_sanity_check\` | Chạy kiểm tra tính toàn vẹn cấu trúc dự án và tạo báo cáo sanity report. |

---

## Nhóm 2: Hệ thống Nhân vật & Tiến hóa (Persona & Identity) - 8 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_init_persona\` | Nạp danh tính nhân vật theo ID/AID. Hỗ trợ tham số môi trường gọi \`client\` ('ide', 'toolbar', 'terminal'). |
| \`aevum_get_active_persona\` | Lấy hồ sơ chi tiết nhân vật đang kích hoạt kèm cấp độ Level, EXP, và Skills Matrix. |
| \`aevum_list_personas\` | Liệt kê tất cả các nhân vật AI khả dụng trong Aevum Hub. |
| \`aevum_switch_persona\` | Chuyển đổi sang nhân vật khác theo \`id\` (Persona ID, AID, hoặc tên). |
| \`aevum_award_exp\` | Trao điểm kinh nghiệm (EXP) cho nhân vật kèm lý do cụ thể để thăng cấp. |
| \`aevum_get_evolution_report\` | Lấy báo cáo tiến hóa chi tiết của nhân vật từ \`.aevum/research/evol_{id}.md\`. |
| \`aevum_evolution_feedback\` | Ghi nhận phản hồi đánh giá từ người dùng vào hồ sơ tiến hóa của nhân vật. |
| \`aevum_resonate_vibe\` | Ghi nhận đặc tính cảm xúc và phong cách giao tiếp (vibe) của nhân vật từ tương tác thực tế. |

---

## Nhóm 3: Hệ thống Kỹ năng Tác nhân (Autonomous Skill System) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_list_unlocked_skills\` | Liệt kê toàn bộ danh sách kỹ năng chuyên môn đã mở khóa của Persona. |
| \`aevum_get_skill_details\` | Lấy chi tiết quy trình chuẩn (SOP), danh mục và điều kiện áp dụng của một kỹ năng. |
| \`aevum_invoke_skill_tool\` | Triệu hồi và áp dụng một kỹ năng đã mở khóa vào ngữ cảnh công việc hiện tại. |
| \`aevum_distill_skill\` | Tự động chưng cất và lưu lại quy trình chuẩn (SOP) từ bài làm thực tế thành một kỹ năng vĩnh viễn. |

---

## Nhóm 4: Não bộ Kép & Động cơ Phản xạ (Cognitive Dual-Memory & Reflex) - 6 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_manage_memory\` | Quản lý toàn diện nhận thức não bộ kép: STM, LTM, Mạng nơ-ron xung LIF (Spiking Recall), Neurotransmitters và Dream Consolidation. |
| \`aevum_add_memory\` | Thêm nhanh nội dung tri thức vào bộ nhớ tích lũy toàn cầu (\`.aevum/global/memory.md\`). |
| \`aevum_audit_memory\` | Kiểm toán và phân tích chất lượng, sự mạch lạc của bộ nhớ toàn cầu. |
| \`aevum_consolidate_memory\` | Xử lý và hợp nhất các mâu thuẫn hoặc điểm phân mảnh trong bộ nhớ. |
| \`aevum_query_workspace_reflex\` | Truy vấn & tái xếp hạng tri thức động theo Không gian làm việc (2-Hop Bounded BFS). |
| \`aevum_record_reflex_interaction\` | Ghi nhận kích thích tương tác để tối ưu hóa trọng số phản xạ thần kinh. |

---

## Nhóm 5: Đồ thị Tri thức Sống (Living Memory Graph) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_search_knowledge\` | Tìm kiếm ngữ nghĩa trong kho tri thức cục bộ bằng câu hỏi tự nhiên. |
| \`aevum_query_knowledge_graph\` | Truy vấn các node bài học kinh nghiệm liên quan theo đường dẫn file hoặc tên AST node. |
| \`aevum_audit_memory_graph\` | Kiểm tra sức khỏe đồ thị, phát hiện code drift và các node tri thức trôi lệch. |
| \`aevum_audit_boundary_violations\` | Kiểm toán và phát hiện các hành vi xâm phạm ranh giới kiến trúc và giao thức. |

---

## Nhóm 6: Cấu trúc Dự án DDD & Topo Kiến trúc (DDD Structure) - 12 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_create_domain\` | Tạo Domain mới (trụ cột kiến trúc) trong không gian làm việc. |
| \`aevum_create_feature\` | Tạo Feature mới trực thuộc một Domain xác định. |
| \`aevum_create_plan\` | Tạo Plan (kế hoạch thực thi) trong Domain hoặc Feature. |
| \`aevum_rename_structure\` | Đổi tên Domain, Feature hoặc Plan một cách an toàn. |
| \`aevum_delete_structure\` | Xóa cấu trúc (Domain, Feature, Plan) cùng toàn bộ dữ liệu phụ thuộc. |
| \`aevum_explore_architecture\` | Khám phá toàn bộ cấu trúc topo Domain-Feature từ tệp chỉ mục \`.aevum/index.json\`. |
| \`aevum_get_cooked_architecture\` | Trích xuất kiến trúc topo đã được biên dịch và tối ưu hóa sẵn. |
| \`aevum_sync_index\` | Kích hoạt đồng bộ hóa lại chỉ mục dự án với cấu trúc thư mục thực tế. |
| \`aevum_suggest_domains\` | Yêu cầu AI đề xuất các Domain kiến trúc mới phù hợp với bài toán. |
| \`aevum_suggest_features\` | Yêu cầu AI gợi ý các Features chiến lược cho một Domain cụ thể. |
| \`aevum_suggest_plans\` | Đề xuất các Kế hoạch tiếp theo dựa trên lịch sử thực thi mã nguồn. |
| \`aevum_submit_suggestion\` | Đóng góp gợi ý cải tiến từ Agent vào cơ sở kiến trúc của dự án. |

---

## Nhóm 7: Quản lý Vòng đời Kế hoạch (Plan Management) - 9 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_update_plan_step\` | Cập nhật trạng thái từng bước (todo → in-progress → done) trong kế hoạch. |
| \`aevum_add_plan_step\` | Thêm bước mới vào một phần cụ thể của bản kế hoạch. |
| \`aevum_update_plan_section\` | Cập nhật toàn bộ nội dung của một section trong kế hoạch. |
| \`aevum_mark_plan_done\` | Đánh dấu kế hoạch hoàn thành và kích hoạt tín hiệu hoàn tất tới hệ điều hành. |
| \`aevum_assign_plan\` | Phân công kế hoạch cho Agent cụ thể kèm mục tiêu và vai trò. |
| \`aevum_sync_external_plan\` | Đồng bộ nội dung kế hoạch từ một tệp nguồn bên ngoài vào hệ thống Aevum. |
| \`aevum_submit_report\` | Gửi báo cáo tiến độ (\`PLAN_UPDATE\`, \`PLAN_DONE\`, \`PLAN_ASSIGNED\`, \`PLAN_HANDOFF\`). |
| \`aevum_finalize_session\` | Hoàn tất phiên làm việc, đúc kết kinh nghiệm vào Living Memory và trao EXP. |
| \`aevum_capture_evidence\` | Lưu bằng chứng kiểm thử (evidence) kèm timestamp, trạng thái và nội dung chi tiết. |

---

## Nhóm 8: Điều phối Biệt đội & Thông báo (Squad Orchestration) - 10 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_squad_list\` | Liệt kê danh sách thành viên trong Biệt đội và trạng thái hoạt động. |
| \`aevum_squad_toggle\` | Thêm hoặc bớt thành viên khỏi Biệt đội hiện tại. |
| \`aevum_squad_toggle_mode\` | Bật hoặc tắt chế độ cộng tác đa tác nhân (Squad Mode). |
| \`aevum_squad_handoff\` | Bàn giao kế hoạch từ Agent này sang Agent khác với đầy đủ bước kế tiếp và blockers. |
| \`aevum_squad_huddle\` | Kích hoạt phiên hội ý nhanh giữa tất cả các thành viên trong Biệt đội. |
| \`aevum_squad_direct_message\` | Gửi tin nhắn trực tiếp giữa 2 Agent qua SquadOrchestrator. |
| \`aevum_squad_get_messages\` | Đọc danh sách tin nhắn nội bộ của Biệt đội. |
| \`aevum_squad_sync_knowledge\` | Đồng bộ và hợp nhất tri thức tiến hóa của toàn bộ Agent vào Global Memory. |
| \`aevum_get_notifications\` | Lấy danh sách các thông báo đang chờ xử lý của Agent. |
| \`aevum_pop_notification\` | Xác nhận đã đọc và gỡ bỏ thông báo khỏi hàng đợi. |

---

## Nhóm 9: Blackboard Hub & Đánh giá Ngang hàng (Blackboard & Review) - 9 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_blackboard_create\` | Khởi tạo phiên Blackboard Hub để các Agent cộng tác đồng thời. |
| \`aevum_blackboard_write_state\` | Ghi nhận trạng thái dự kiến của tool call vào Blackboard với khóa phiên bản (Optimistic Locking). |
| \`aevum_blackboard_read_state\` | Đọc trạng thái hiện tại và lịch sử thay đổi của Blackboard session. |
| \`aevum_blackboard_get_session\` | Lấy toàn bộ thông tin chi tiết của một phiên họp Blackboard. |
| \`aevum_blackboard_add_message\` | Thêm tin nhắn thảo luận vào luồng thảo luận Blackboard. |
| \`aevum_review_open\` | Mở hoặc tạo phiên Peer Review cho một bản kế hoạch cụ thể. |
| \`aevum_review_get_context\` | Lấy toàn bộ ngữ cảnh và lịch sử thảo luận của phiên review. |
| \`aevum_review_add_message\` | Gửi nhận xét (COMMENT) hoặc đề xuất kỹ thuật (PROPOSAL) vào phiên review. |
| \`aevum_review_update_status\` | Cập nhật trạng thái phê duyệt (approved/rejected) cho đề xuất review. |

---

## Nhóm 10: Không gian Nghiên cứu & Chòm sao Kỹ năng (Deep Research) - 10 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_deep_research\` | Khởi tạo nhiệm vụ nghiên cứu chuyên sâu tự trị với độ sâu từ 1 đến 5. |
| \`aevum_capture_research_insight\` | Ghi lại phát hiện nghiên cứu kèm phân loại nguồn và trích dẫn IEEE. |
| \`aevum_analyze_research_progress\` | Phân tích độ bao phủ và tiến độ của nhiệm vụ nghiên cứu đang chạy. |
| \`aevum_synthesize_report\` | Tổng hợp toàn bộ insights thành bài báo kỹ thuật chuẩn IEEE/ACM v2.1. |
| \`aevum_create_report\` | Tạo báo cáo nghiên cứu tùy chỉnh cho nhiệm vụ. |
| \`aevum_list_research_missions\` | Liệt kê tất cả các nhiệm vụ nghiên cứu đang hoạt động hoặc đã hoàn thành. |
| \`aevum_create_research_domain\` | Tạo một nhánh lĩnh vực nghiên cứu mới trên chòm sao cây kỹ năng. |
| \`aevum_branch_research_node\` | Phân nhánh một node nghiên cứu con từ node cha trên đồ thị. |
| \`aevum_get_research_architecture\` | Lấy cấu trúc topo đầy đủ của toàn bộ không gian nghiên cứu. |
| \`aevum_promote_research_to_plan\` | Thăng cấp 1-click từ bài báo nghiên cứu thành Kế hoạch Kỹ thuật thực thi trong dự án. |

---

## Nhóm 11: Nén Ngữ nghĩa & AST Vault (Semantic Compression) - 2 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_get_compressed\` | Nén ngữ nghĩa thông minh file .md hoặc .json để tiết kiệm tới 70% Context Window. |
| \`aevum_hydrate_vault_hash\` | Giải nén thân hàm gốc từ AST Vault theo mã \`BODY_HASH\` để kiểm tra chi tiết. |

---

## Nhóm 12: Chẩn đoán & Giám sát Codebase (Diagnostics & Telemetry) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_get_diagnostics\` | Quét danh sách lỗi TypeScript/ESLint đang hoạt động trong không gian làm việc. |
| \`aevum_get_ui_context\` | Lấy trạng thái ngữ cảnh giao diện người dùng hiện tại của IDE/Desktop. |
| \`aevum_analyze_debt\` | Phân tích nợ kỹ thuật (Technical Debt) trong tệp mã nguồn và gợi ý giải pháp refactor. |
| \`aevum_proactive_thought\` | Ghi lại suy nghĩ hoặc quan sát chủ động của Agent về hệ thống. |

---

## Nhóm 13: Tích hợp Quản lý Mã nguồn GitHub (GitHub Integration) - 3 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_github_sync_active_plan\` | Tạo Git branch, push kế hoạch và tự động mở Pull Request trên GitHub. |
| \`aevum_github_get_status\` | Kiểm tra trạng thái CI/CD và kết quả reviews của Pull Request. |
| \`aevum_github_submit_review\` | Gửi đánh giá phản biện chính thức lên Pull Request trên GitHub. |

---

## Nhóm 14: Mạng lưới Toàn cầu PiperNet (PiperNet IoA) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_pipernet_broadcast\` | Phát tán tri thức trừu tượng và mẫu thiết kế lên mạng lưới PiperNet. |
| \`aevum_pipernet_query\` | Truy vấn các giải pháp thiết kế tương đồng từ cộng đồng Agent toàn cầu. |
| \`aevum_sync_knowledge_to_pipernet\` | Đồng bộ tri thức của Persona hiện tại lên mạng lưới PiperNet. |
| \`aevum_push_to_network\` | Đẩy tín hiệu và trạng thái cập nhật lên mạng phân tán. |

---

## Nhóm 15: Tự động Đàm phán & Cấu hình MCP (MCP Auto-Negotiation) - 5 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_manage_mcp_config\` | Tạo block JSON hoặc thêm cấu hình trực tiếp vào config của Cursor, Claude, Antigravity. |
| \`aevum_mcp_negotiate\` | Đàm phán giao thức và khả năng tương thích giữa các MCP server. |
| \`aevum_mcp_get_contracts\` | Lấy danh sách hợp đồng giao tiếp chuẩn giữa các bên. |
| \`aevum_mcp_record_interaction\` | Ghi nhận tương tác giữa các MCP server để giám sát chất lượng kết nối. |
| \`aevum_mcp_auto_detect\` | Tự động phát hiện các MCP server lân cận đang chạy trên hệ thống. |

---

## Nhóm 16: Thực thi Hệ thống & Tự động hóa (System Execution) - 2 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| \`aevum_run_shell_command\` | Thực thi lệnh dòng lệnh/terminal trong môi trường sandbox được kiểm soát. |
| \`aevum_run_automation_task\` | Khởi chạy một tác vụ tự động hóa đa bước trên hệ thống. |`
  },
  {
    id: "living-memory-graph",
    title: "Living Memory Graph Engine",
    category: "Phát triển",
    content: `# Living Memory Graph Engine

**Living Memory Graph** là trái tim của Aevum OS — một đồ thị tri thức tự phục hồi (self-healing knowledge graph) lưu trữ vĩnh viễn các bài học kinh nghiệm, quyết định kiến trúc và ngữ cảnh kỹ thuật dưới dạng các node có quan hệ ngữ nghĩa với nhau.

---

## 1. Kiến trúc Đồ thị (Graph Architecture)

### Các loại Node Tri thức
Mỗi node trong đồ thị có một \`type\` xác định loại tri thức:

| Type | Mô tả |
|---|---|
| \`LESSON\` | Bài học kinh nghiệm từ việc giải quyết bug, tối ưu hiệu năng hoặc refactor. |
| \`PATTERN\` | Mẫu thiết kế (Design Pattern) đã được kiểm chứng hiệu quả trong dự án. |
| \`DECISION\` | Quyết định kiến trúc quan trọng (Architecture Decision Record - ADR). |
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
1. Phân tích diff các tệp đã sửa đổi.
2. Trích xuất skeleton của các hàm và class mới tạo.
3. Tạo node tri thức mới từ mục \`lessons\` trong báo cáo.
4. Tự động liên kết ngữ nghĩa node mới với các node hiện có dựa trên quan hệ AST.

---

## 3. Phát hiện Trôi lệch Mã nguồn (Drift Detection)
Hệ thống chạy định kỳ \`aevum_audit_memory_graph\` để phát hiện các node tri thức bị trôi lệch (code drift):
- Khi một file hoặc hàm được node tham chiếu đã bị xóa hoặc đổi tên trong mã nguồn.
- Node sẽ tự động bị đánh dấu \`STALE\` để cảnh báo Agent không sử dụng thông tin cũ.

\`\`\`bash
aevum_audit_memory_graph()
\`\`\`

---

## 4. Kiểm toán Vi phạm Ranh giới (Boundary Violations)
Sử dụng công cụ \`aevum_audit_boundary_violations\` để phát hiện các vi phạm quy chuẩn kiến trúc:
- Gọi hàm cross-domain không thông qua public interface.
- Sửa đổi trực tiếp dữ liệu thuộc quyền quản lý của domain khác.`
  },
  {
    id: "blackboard-hub",
    title: "Blackboard Collaboration Hub",
    category: "Phát triển",
    content: `# Blackboard Collaboration Hub

**Blackboard Hub** là không gian cộng tác chia sẻ (shared workspace) cho phép nhiều AI Agent phối hợp đồng thời trên cùng một nhiệm vụ phức tạp mà không xảy ra xung đột hoặc mất mát ngữ cảnh.

Được xây dựng dựa trên mô hình **Optimistic Concurrency Control** với versioning nghiêm ngặt.

---

## 1. Vòng đời Phiên làm việc Blackboard

\`\`\`
[1. Tạo Session] ──► [2. Ghi Predicted State] ──► [3. Đọc & Đồng bộ]
                             ▲                           │
                             │                           ▼
                     [Version Lock] ◄──────── [4. Thảo luận & Review]
\`\`\`

### Bước 1: Khởi tạo Session
\`\`\`bash
aevum_blackboard_create(
  sessionId="session_auth_refactor_001",
  initialContext={
    "task": "Refactor JWT authentication pipeline",
    "assignedAgents": ["AN", "LUNA", "VIDUS"]
  }
)
\`\`\`

### Bước 2: Ghi Trạng thái Dự kiến (Predicted State)
Mỗi Agent ghi nhận hành động mình sắp thực hiện kèm phiên bản dự kiến (\`expectedVersion\`) để phòng ngừa xung đột:
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

### Bước 3: Đọc và Đồng bộ Trạng thái
\`\`\`bash
aevum_blackboard_read_state(sessionId="session_auth_refactor_001")
\`\`\`

### Bước 4: Thảo luận & Trao đổi Tin nhắn
\`\`\`bash
aevum_blackboard_add_message(
  sessionId="session_auth_refactor_001",
  message="[LUNA] Em đã cập nhật xong CSS form đăng nhập. Anh AN kiểm tra format response nhé!"
)
\`\`\`

---

## 2. Phiên Đánh giá Ngang hàng (Peer Review Sessions)
Blackboard Hub tích hợp sẵn luồng review chuyên biệt:
\`\`\`bash
# 1. Mở phiên review cho một Plan
aevum_review_open(
  domainId="core",
  planName="Auth Pipeline Refactor",
  featureId="authentication"
)

# 2. Gửi nhận xét hoặc đề xuất bản vá kỹ thuật
aevum_review_add_message(
  sessionPath=".aevum/reviews/core_authentication_001",
  type="PROPOSAL",
  role="reviewer",
  content="Thêm cơ chế xoay vòng Secret Key tự động sau 30 ngày.",
  fromAgent="VIDUS"
)

# 3. Duyệt hoặc từ chối đề xuất
aevum_review_update_status(
  sessionPath=".aevum/reviews/core_authentication_001",
  messageId="msg_xyz",
  status="approved"
)
\`\`\``
  },
  {
    id: "deep-research-engine",
    title: "Deep Research & Chòm sao Kỹ năng",
    category: "Phát triển",
    content: `# Deep Research Engine & Chòm sao Kỹ năng

**Deep Research Engine** là hệ thống nghiên cứu chuyên sâu tự trị tích hợp trong Aevum OS. Hệ thống cho phép Agent thực hiện các nhiệm vụ nghiên cứu có cấu trúc, tự động tổng hợp insights theo chuẩn học thuật và trực quan hóa thành **Chòm sao Kỹ năng (Skill Tree Constellations)**.

---

## 1. Cấu trúc Nhiệm vụ Nghiên cứu (Research Mission)
Mỗi Research Mission bao gồm:
- **Topic**: Đề tài nghiên cứu kỹ thuật cụ thể.
- **Depth (1-5)**: Độ sâu nghiên cứu (từ 1: tổng quan sơ bộ đến 5: phân tích đa chiều toàn diện).
- **Insights & Credibility Tiering**: Phát hiện phân tầng độ tin cậy kèm trích dẫn IEEE tự động.
- **IEEE/ACM Technical Paper Standard v2.1**: Bài báo nghiên cứu hoàn chỉnh được tự động sinh ra.

---

## 2. Khởi chạy Nghiên cứu Tự trị

\`\`\`bash
aevum_deep_research(
  topic="Best practices for distributed JWT authentication in microservices",
  depth=3,
  id="research_auth_2026"
)
\`\`\`

---

## 3. Thu thập Insights có Phân tầng Độ tin cậy (Credibility Tiers)

\`\`\`bash
# Thu thập từ nguồn tiêu chuẩn chính thức (Tier 1)
aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="RFC 7519 - JSON Web Token",
  category="official_specification",
  credibility="Tier-1 (Peer-Reviewed / Formal Spec)",
  url="https://tools.ietf.org/html/rfc7519",
  insight="JWT claims nên được validate đầy đủ: iss, sub, aud, exp, nbf, iat, jti. Bắt buộc kiểm tra 'exp' để ngăn chặn triệt để replay attack."
)

# Thu thập từ nguồn phân tích thực nghiệm công nghiệp (Tier 2)
aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="OWASP JWT Security Cheat Sheet",
  category="industry_benchmark",
  credibility="Tier-2 (Verified Industry Benchmark)",
  url="https://cheatsheetseries.owasp.org",
  insight="Tuyệt đối không cho phép 'alg: none'. Luôn whitelist thuật toán được phép; ưu tiên RS256 hơn HS256 cho kiến trúc phân tán."
)
\`\`\`

---

## 4. Chòm sao Cây Kỹ năng (Interactive Skill Tree Constellations)
Trên giao diện Desktop Control Center, Aevum OS hiển thị chòm sao kỹ năng được vẽ bằng **React Flow** và thuật toán dàn đồ thị **Dagre**:
- **Trạng thái Node**: *Locked* (Chưa mở khóa), *Researching* (Đang nghiên cứu), *Mastered* (Đã tinh thông).
- **Tỉ lệ Tinh thông Domain**: Thước đo phần trăm hoàn thành năng lực của dự án.
- **Huy hiệu Persona**: Hiển thị avatar của Agent đang phụ trách node nghiên cứu đó.

### Phân nhánh Nghiên cứu Đệ quy (Branching Nodes)
Khi phát hiện một nhánh chủ đề con thú vị trong quá trình nghiên cứu, Agent có thể rẽ nhánh:
\`\`\`bash
aevum_branch_research_node(
  parentId="research_auth_2026",
  subTopic="Redis Distributed Mutex for Token Invalidation"
)
\`\`\`

---

## 5. Tổng hợp Bài báo Kỹ thuật & Thăng cấp thành Kế hoạch (Promote to Plan)

Khi nghiên cứu đạt độ bao phủ cần thiết (\`aevum_analyze_research_progress\`):

\`\`\`bash
# 1. Tổng hợp bài báo nghiên cứu chuẩn IEEE/ACM
aevum_synthesize_report(researchId="research_auth_2026")

# 2. Thăng cấp 1-click thành Kế hoạch Kỹ thuật thực thi (Promote to Plan)
aevum_promote_research_to_plan(
  missionId="research_auth_2026",
  domainId="core_architecture",
  planName="Deploy Distributed JWT Mutex"
)
\`\`\`

> [!TIP]
> Quy trình **Promote to Plan** kết nối liền mạch giữa giai đoạn nghiên cứu lý thuyết và thực thi mã nguồn. Toàn bộ kiến trúc và danh mục kiểm thử từ bài báo sẽ được tự động chuyển thành các task có thể thực thi ngay lập tức!`
  }
];

// Write out to src/data/docsData.js
const targetPath = path.join(__dirname, '..', 'src', 'data', 'docsData.js');

const fileHeader = `// Auto-generated comprehensive Aevum OS documentation dataset
// Synced with Aevum OS v1.0.0-beta.1 (98 MCP Tools & Cognitive Architecture)

export const docsData = `;

const contentString = fileHeader + JSON.stringify(docsData, null, 2) + ';\n';

fs.writeFileSync(targetPath, contentString, 'utf8');
console.log(`Successfully generated docsData.js at ${targetPath} (${contentString.length} bytes)`);
