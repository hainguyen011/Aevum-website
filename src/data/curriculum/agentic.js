// Module 3: Kỷ nguyên Agentic (The Dawn of Agentic AI)
// Open Knowledge Repository & Educational Curriculum: Khám phá Kỉ nguyên AI

export const agenticModule = {
  id: 'agentic-era',
  title: 'Bình minh Kỷ nguyên Agentic AI',
  categoryName: 'Kỷ nguyên Agentic',
  badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-500/10',
  description: 'Chuyển dịch nền tảng từ mô hình sinh ngôn ngữ thụ động sang các tác nhân AI tự chủ có khả năng hoạch định, tương tác công cụ và hành động trong thế giới thực.',
  lessons: [
    {
      id: 'tu-chatbot-den-agent',
      title: 'Từ Chatbot Thụ Động Đến AI Tác Nhân Tự Chủ (Autonomous Agency)',
      category: 'Kỷ nguyên Agentic',
      targetAudience: 'Lập trình viên, Người yêu công nghệ, Nhà nghiên cứu',
      readTime: '7 phút',
      level: 'Cơ bản - Trung cấp',
      tags: ['Agentic AI', 'Tự chủ', 'Kiến trúc', 'ReAct', 'Tools'],
      author: {
        id: 'an',
        name: 'An',
        role: 'AI System Companion & Alignment Lead',
        aid: 'ENG-AN-7B9F1D',
        motto: 'Tác nhân thông minh thực sự không nằm ở việc trả lời văn hoa, mà nằm ở sự kiên trì giải quyết vấn đề đến cùng.'
      },
      summary: 'Phân tích bước nhảy vọt từ các chatbot hỏi đáp đơn thuần (reactive) sang các AI Agent có khả năng lập kế hoạch nhiều bước, sử dụng công cụ hệ thống và chủ động gỡ lỗi.',
      content: `# Từ Chatbot Thụ Động Đến AI Tác Nhân Tự Chủ (Autonomous Agency)

Trong giai đoạn đầu của cuộc cách mạng GenAI (2022-2024), phần lớn người dùng tiếp cận các mô hình ngôn ngữ lớn (LLM) thông qua giao diện hội thoại một vòng (single-turn) hoặc đa vòng (multi-turn) đơn giản: con người gõ câu hỏi, mô hình trả về câu trả lời bằng văn bản.

Tuy nhiên, mô hình hội thoại thụ động này bộc lộ những giới hạn nghiêm trọng khi bước vào các bài toán kỹ thuật phức tạp trong thế giới thực: **Mô hình không thể tự chạy mã lệnh để kiểm tra xem đoạn code có chạy đúng không, không thể đọc dữ liệu từ ổ đĩa máy tính, và cũng không thể tự sửa sai khi gặp lỗi**.

Đây chính là tiền đề cho sự ra đời của **Kỷ nguyên Agentic AI (AI Tác nhân Tự chủ)**.

---

## 1. Bản Chất Của Sự Tự Chủ (Agency)

Một hệ thống AI được xem là có "tính tác nhân" (Agency) khi nó vượt qua ranh giới của việc sinh văn bản đơn thuần và sở hữu ba năng lực cốt lõi:

1. **Khả năng Lập kế hoạch (Planning & Task Decomposition)**: Tự động phân rã một mục tiêu lớn và trừu tượng thành một chuỗi các bước hành động cụ thể, có thứ tự ưu tiên logic và điều kiện tiên quyết.
2. **Khả năng Sử dụng Công cụ (Tool Use & Environment Interaction)**: Tương tác trực tiếp với môi trường máy tính thông qua API, Terminal, hệ thống tệp tin hoặc trình duyệt để thu thập dữ liệu và tạo ra thay đổi thực tế trên hệ thống.
3. **Khả năng Tự điều chỉnh (Reflection & Self-Correction)**: Đánh giá kết quả của từng hành động, đọc hiểu log lỗi từ trình biên dịch và chủ động thử nghiệm các phương án thay thế thay vì dừng lại hoặc bỏ cuộc ngay khi gặp trở ngại.

---

## 2. Bảng So Sánh Kiến Trúc: Chatbot Truyền Thống vs AI Agent

| Tiêu chí | Chatbot Truyền thống (Reactive LLM) | AI Tác nhân (Autonomous Agent) |
|---|---|---|
| **Mô hình Vận hành** | Yêu cầu - Phản hồi (Hỏi đâu đáp đó) | Vòng lặp hướng mục tiêu (Chạy liên tục tới khi hoàn thành) |
| **Không gian Hành động** | Chỉ xuất ra chữ (Text Generation) | Đọc ghi tệp, chạy terminal, gọi API, thao tác browser |
| **Kiểm soát Ngữ cảnh** | Phụ thuộc hoàn toàn vào những gì người dùng dán vào | Tự chủ tìm kiếm file, truy vấn bộ nhớ và chọn lọc ngữ cảnh |
| **Xử lý Sai sót** | Lặp lại lỗi nếu con người không chỉ ra | Tự đọc log lỗi, sửa lại code và chạy lại test để kiểm chứng |
| **Phạm vi Nhiệm vụ** | Câu trả lời cô lập, ngắn hạn | Dự án dài hơi gồm hàng chục bước phụ thuộc phức tạp |

---

## 3. Ba Trụ Cột Cấu Trúc Một Agent Hiện Đại

Một Agent hoàn chỉnh không phải là một mô hình LLM đơn lẻ, mà là một cỗ máy hợp thành bởi ba thành phần:

\`\`\`
          ┌───────────────────────────────────┐
          │  1. NÃO BỘ SUY LUẬN (Reasoning)    │
          │  LLM: Lập kế hoạch & Phán đoán   │
          └─────────────────┬─────────────────┘
                            │
      ┌─────────────────────┴─────────────────────┐
      ▼                                           ▼
┌───────────────────────────┐       ┌───────────────────────────┐
│ 2. HỆ THỐNG TRÍ NHỚ       │       │ 3. GIAO DIỆN THỰC THI     │
│ (Working RAM & Long-term) │       │ (MCP, Tools, Terminal)    │
└───────────────────────────┘       └───────────────────────────┘
\`\`\`

- **Não bộ Suy luận (Reasoning Core)**: Mô hình nền tảng (như Gemini, Claude) đóng vai trò bộ vi xử lý trung tâm (CPU) chịu trách nhiệm hiểu mục tiêu, suy luận logic và quyết định hành động tiếp theo.
- **Hệ thống Trí nhớ (Memory Architecture)**: Gồm bộ nhớ làm việc trong phiên (Working Context) và bộ nhớ dài hạn (Long-term Knowledge Graph) giúp Agent không quên các quy ước thiết kế xuyên suốt dự án.
- **Giao diện Thực thi (Execution Interface)**: Tập hợp các công cụ giao tiếp chuẩn hóa (như giao thức MCP) cho phép Agent tác động vật lý lên máy tính của bạn một cách an toàn và có kiểm soát.`
    },
    {
      id: 'vong-lap-nhan-thuc-ooda-react',
      title: 'Vòng Lặp Nhận Thức ReAct và OODA Loop Trong Kỹ Thuật Tác Nhân Tự Trị',
      category: 'Kỷ nguyên Agentic',
      targetAudience: 'Kỹ sư phần mềm, AI Engineer, System Architects',
      readTime: '8 phút',
      level: 'Trung cấp - Nâng cao',
      tags: ['OODA', 'ReAct', 'Vòng lặp nhận thức', 'Suy luận', 'Algorithmic Efficiency'],
      author: {
        id: 'zenith',
        name: 'Zenith',
        role: 'Performance Audit & Biomimetic Computing',
        aid: 'ALG-ZENITH-A1B2C3',
        motto: 'Mỗi chu kỳ nhận thức phải đạt tới độ chính xác tuyệt đối và độ phức tạp tính toán tối ưu.'
      },
      summary: 'Khám phá kiến trúc nhận thức ReAct (Reason + Act) và mô hình OODA kinh điển, chìa khóa giúp AI tư duy mạch lạc, tránh lặp vô tận và hành động chuẩn xác.',
      content: `# Vòng Lặp Nhận Thức ReAct và OODA Loop Trong Kỹ Thuật Tác Nhân Tự Trị

Để một AI Agent không hành động bốc đồng, không đưa ra các quyết định ngẫu hứng hoặc rơi vào vòng lặp vô tận (infinite loop), các nhà khoa học máy tính đã chuẩn hóa quy trình ra quyết định thành các vòng lặp nhận thức có cấu trúc toán học chặt chẽ.

Hai mô hình nền tảng định hình toàn bộ thế hệ Agent hiện đại là **OODA Loop** và **ReAct Framework**.

---

## 1. Mô Hình OODA Loop: Bản Thiết Kế Phản Xạ Nhanh

Mô hình OODA (Observe - Orient - Decide - Act) nguyên bản được Đại tá Không quân Hoa Kỳ John Boyd phát triển để huấn luyện phi công phản xạ trong chiến đấu sinh tử ở tốc độ siêu âm. Trong kỹ nghệ phần mềm tác nhân thông minh, OODA trở thành bản thiết kế cho quy trình ra quyết định tự trị:

\`\`\`
[1. OBSERVE (Quan sát)] 
         │ (Đọc file, quét terminal, nhận diện mã lỗi)
         ▼
[2. ORIENT (Định hướng)]
         │ (Đối chiếu với bộ nhớ dài hạn, đồ thị tri thức)
         ▼
[3. DECIDE (Quyết định)]
         │ (Chọn công cụ MCP tối ưu, xác định tham số gọi)
         ▼
[4. ACT (Hành động)]
         │ (Thực thi tool call, quan sát kết quả trả về)
         └────────────────► Quay lại Bước 1 với quan sát mới
\`\`\`

- **Observe (Quan sát)**: Agent tiếp nhận thông tin khách quan từ môi trường (nội dung tệp mã nguồn, mã lỗi trả về từ compiler).
- **Orient (Định hướng)**: Đây là bước quan trọng nhất — Agent lọc bỏ thông tin rác, đặt dữ liệu quan sát được vào bối cảnh toàn cục của dự án và các ràng buộc kiến trúc.
- **Decide (Quyết định)**: Lựa chọn hành động tiếp theo từ tập công cụ sẵn có.
- **Act (Hành động)**: Thực thi công cụ và ghi nhận phản hồi hệ thống để làm đầu vào cho vòng lặp kế tiếp.

---

## 2. ReAct Framework: Đan Xen Suy Luận Và Hành Động

Được đề xuất bởi các nhà nghiên cứu tại Đại học Princeton và Google Research (Yao et al., 2022), **ReAct** (kết hợp giữa **Reasoning** và **Acting**) giải quyết nhược điểm chí mạng của hai phương pháp cũ:

- Nếu chỉ suy luận thuần túy (Chain of Thought): AI dễ bị ảo giác vì không có dữ liệu thực tế từ môi trường để kiểm chứng.
- Nếu chỉ hành động thuần túy: AI hành động mù quáng như một con robot không có khả năng phân tích hậu quả.

\`\`\`
Thought 1: Tôi cần sửa lỗi biên dịch tại file AuthProvider.jsx dòng 42. Trước hết cần đọc nội dung file để hiểu cấu trúc.
Action 1: view_file({ path: "src/AuthProvider.jsx", startLine: 35, endLine: 50 })
Observation 1: Thiếu biến useContext được import từ thư viện 'react'.
Thought 2: Đã xác định nguyên nhân: import thiếu useContext. Tôi sẽ sửa dòng 1 để thêm useContext vào.
Action 2: replace_file_content({ ... })
Observation 2: File đã được cập nhật thành công.
\`\`\`

Nhờ đan xen liên tục giữa **Ý nghĩ (Thought)**, **Hành động (Action)** và **Quan sát (Observation)**, Agent duy trì được sự tỉnh táo tuyệt đối và từng bước chinh phục các bài toán phức tạp.`
    },
    {
      id: 'tu-chua-lanh-self-healing-code',
      title: 'Kỹ Thuật Tự Chữa Lành (Self-Healing Code) & Phân Rã Kế Hoạch Kỹ Thuật Đa Bước',
      category: 'Kỷ nguyên Agentic',
      targetAudience: 'Senior Developers, Tech Leads, DevOps Engineers',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Self-Healing', 'AST Verification', 'Phân rã kế hoạch', 'Reliability'],
      author: {
        id: 'vidus',
        name: 'Vidus',
        role: 'Chief System Architect & Clean Engineering',
        aid: 'ARC-VIDUS-AUHD2Y',
        motto: 'Một kiến trúc bền vững là kiến trúc có khả năng tự nhận biết vết nứt và tự vá lành trước khi thảm họa xảy ra.'
      },
      summary: 'Khám phá cơ chế tự chữa lành mã nguồn của Aevum OS: Cách Agent tự phân tích cây cú pháp trừu tượng (AST), chạy vòng lặp kiểm thử tự động và khôi phục trạng thái an toàn khi xảy ra sự cố.',
      content: `# Kỹ Thuật Tự Chữa Lành (Self-Healing Code) & Phân Rã Kế Hoạch Kỹ Thuật Đa Bước

Một trong những khác biệt lớn nhất giữa một lập trình viên mới vào nghề và một kiến trúc sư hệ thống kỳ cựu là: **Khả năng dự đoán sự cố và thiết kế cơ chế tự phục hồi (Resilience)**.

Khi để AI Agent can thiệp trực tiếp vào mã nguồn của dự án, rủi ro lớn nhất là AI tạo ra mã lỗi làm hỏng toàn bộ dự án đang chạy. Để ngăn chặn điều này, Aevum OS thiết kế cơ chế **Self-Healing Code (Mã nguồn Tự Chữa Lành)** dựa trên vòng lặp phản hồi khép kín.

---

## 1. Nguyên Lý Phân Rã Kế Hoạch Đa Bước (Step Decomposition)

Trước khi chạm vào bất kỳ dòng mã nào, Agent không bao giờ hành động một cách vội vã. Nó bắt buộc phải trải qua ba pha kỷ luật:

\`\`\`
[Pha 1: Thăm dò (Reconnaissance)]
    └── Quét cấu trúc thư mục, đọc các interface và kiểu dữ liệu hiện hữu.
[Pha 2: Lập Kế hoạch Thực thi (Execution Plan)]
    └── Phân rã mục tiêu thành các bước nguyên tử (Atomic Steps) độc lập.
[Pha 3: Xác minh Từng Bước (Step Verification)]
    └── Chạy linter hoặc test sau mỗi bước trước khi chuyển sang bước kế tiếp.
\`\`\`

---

## 2. Vòng Lặp Phản Hồi Tự Chữa Lành (The Healing Loop)

Khi Agent thực hiện một thay đổi mã nguồn nhưng gặp lỗi biên dịch (Syntax Error / Type Error), cơ chế tự chữa lành sẽ được kích hoạt ngay lập tức:

1. **Phân tích Cây Cú pháp Trừu tượng (AST Parsing)**: Thay vì chỉ nhìn văn bản thô, hệ thống phân tích AST để xác định vị trí dấu ngoặc bị thiếu, biến chưa khai báo hoặc kiểu dữ liệu xung đột.
2. **Cô lập Vùng ảnh hưởng (Blast Radius Isolation)**: Lỗi chỉ được phép diễn ra trong phạm vi tệp đang chỉnh sửa, không được phép lan truyền sang các module khác.
3. **Thử nghiệm Đột biến (Mutation Retry with Backoff)**: Agent đọc chính xác thông điệp lỗi của Compiler, tự điều chỉnh giải pháp và áp dụng bản vá mới.
4. **Cơ chế Rollback Tự động**: Nếu sau 3 lần thử nghiệm liên tiếp mà bản vá không vượt qua bài kiểm tra kiểm thử (Unit Test), hệ thống sẽ tự động hoàn nguyên tệp về trạng thái sạch ban đầu thông qua Git Snapshot.`
    },
    {
      id: 'mo-phong-the-gioi-va-moi-truong-ao-cho-agent',
      title: 'Đấu Trường Mô Phỏng: Sandbox & Thế Giới Ảo Nơi AI Tác Nhân Rèn Luyện Kỹ Năng',
      category: 'Kỷ nguyên Agentic',
      targetAudience: 'Game Developers, AI Researchers, Simulation Engineers',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Sandbox', 'Simulation', 'ECS', 'Reinforcement Learning', 'Virtual Worlds'],
      author: {
        id: 'ryo',
        name: 'Ryo',
        role: 'Game Architecture & Real-time Simulation Engines',
        aid: 'ENG-RYO-8F3D1C',
        motto: 'Mỗi dòng mã là một định luật vật lý trong thế giới số; hãy để AI nếm trải hàng ngàn thất bại trong thế giới ảo trước khi làm chủ thế giới thực.'
      },
      summary: 'Tại sao các AI Agent hàng đầu cần một thế giới mô phỏng ảo để rèn luyện? Tìm hiểu cách kiến trúc thực thể thành phần (ECS) và sandbox cách ly tạo ra môi trường thử nghiệm an toàn tuyệt đối.',
      content: `# Đấu Trường Mô Phỏng: Sandbox & Thế Giới Ảo Nơi AI Tác Nhân Rèn Luyện Kỹ Năng

Trong ngành hàng không, không một phi công nào được phép bước lên buồng lái chiếc máy bay chở khách Boeing 787 mà chưa từng trải qua hàng ngàn giờ tập luyện trong buồng lái mô phỏng (Flight Simulator). 

Trong buồng mô phỏng, phi công có thể gặp sự cố chết động cơ, bão tuyết dữ dội hoặc hỏng hệ thống thủy lực hàng trăm lần mà không nguy hiểm đến tính mạng của bất kỳ ai.

AI Tác nhân Tự chủ cũng cần một môi trường tương tự để tôi luyện: **Đó chính là Đấu trường Mô phỏng (Agent Simulation Sandbox)**.

---

## 1. Vì Sao Thử Nghiệm Trực Tiếp Trên Production Là Sai Lầm Chí Mạng?

Khi một AI Agent được giao quyền thao tác cơ sở dữ liệu, gọi API thanh toán hoặc sửa đổi mã nguồn trực tiếp trên môi trường thực tế (Live Environment), một sai sót nhỏ trong suy luận có thể dẫn đến hậu quả khôn lường:
- Xóa nhầm dữ liệu của khách hàng.
- Làm tắc nghẽn đường truyền mạng vì gọi API vòng lặp.
- Tiêu tốn hàng ngàn USD chi phí điện toán đám mây ngoài dự kiến.

---

## 2. Kiến Trúc Sandbox Thực Thể Thành Phần (ECS-driven Simulation)

Để AI Agent có thể tự do thử nghiệm hàng vạn kịch bản khác nhau trong thời gian ngắn mà không làm tốn tài nguyên máy tính, Aevum OS sử dụng kiến trúc **Entity-Component-System (ECS)** kết hợp môi trường Sandbox cô lập:

\`\`\`
[AI Agent Brain] ──► Hành động thử nghiệm (Action Attempt)
                          │
                          ▼
             ┌─────────────────────────────┐
             │       SANDBOX CÔ LẬP        │
             │  - File System Ảo (VFS)     │
             │  - Giả lập Mạng & Mock API  │
             │  - Rollback tức thì trong RAM│
             └─────────────┬───────────────┘
                           │
                           ▼
[Hệ thống Đánh giá] ◄── Đạt chuẩn 100%? ──► Cho phép áp dụng ra hệ thống thật
\`\`\`

- **Hệ thống tệp ảo trong bộ nhớ (Virtual In-Memory FS)**: Mọi thao tác tạo file, xóa file của Agent diễn ra hoàn toàn trong RAM với tốc độ hàng triệu phép tính/giây mà không hề chạm vào ổ cứng vật lý.
- **Hệ thống mạng Mock (Simulated Network)**: Mọi yêu cầu HTTP gửi đi đều được đón đầu bởi một máy chủ giả lập, cho phép thử nghiệm các kịch bản mạng chập chờn, máy chủ trả về lỗi 500 hoặc timeout một cách chân thực nhất.

Nhờ đó, Agent bước ra môi trường làm việc thực thụ với sự dày dạn kinh nghiệm và độ tin cậy cao nhất.`
    }
  ]
};
