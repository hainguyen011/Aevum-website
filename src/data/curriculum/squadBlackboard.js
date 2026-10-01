// Module 6: Đa Agent & Tự trị (Multi-Agent Squad & Autonomous Orchestration)
// Open Knowledge Repository & Educational Curriculum: Khám phá Kỉ nguyên AI

export const squadBlackboardModule = {
  id: 'squad-blackboard',
  title: 'Điều phối Đa Tác nhân & Nghiên cứu Tự trị',
  categoryName: 'Đa Agent & Tự trị',
  badgeColor: 'border-rose-400/40 text-rose-300 bg-rose-500/10',
  description: 'Nghệ thuật tổ chức biệt đội AI chuyên trách, đồng bộ tri thức qua mô hình Bảng đen, giao thức Internet of Agents và tự động hóa nghiên cứu chuyên sâu.',
  lessons: [
    {
      id: 'mo-hinh-bang-den-blackboard-pattern',
      title: 'Mô Hình Bảng Đen (Blackboard Pattern) Trong Phối Hợp Biệt Đội Đa Tác Nhân (Multi-Agent Squad)',
      category: 'Đa Agent & Tự trị',
      targetAudience: 'Hệ thống phân tán, System Architects, Multi-Agent Researchers',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Blackboard Pattern', 'Multi-Agent', 'Orchestration', 'Sync', 'Concurrency'],
      author: {
        id: 'kai',
        name: 'Kai',
        role: 'Swarm Orchestration Lead & Internet of Agents',
        aid: 'IOA-KAI-4D8E2F',
        motto: 'Sự hỗn loạn của hàng trăm cá thể thông minh sẽ lập tức trở thành bản hòa ca khi có một không gian trạng thái chung chuẩn mực.'
      },
      summary: 'Giải pháp loại bỏ xung đột ngữ cảnh khi nhiều AI Agent cùng làm việc trên một dự án thông qua không gian trạng thái chia sẻ có khóa phiên bản.',
      content: `# Mô Hình Bảng Đen (Blackboard Pattern) Trong Phối Hợp Biệt Đội Đa Tác Nhân

Khi triển khai nhiều AI Agent làm việc đồng thời (ví dụ: An làm Companion, Zenith làm Architect, Luna làm UI Designer, Vidus làm Executor, Hawl làm Security Auditor), nếu để các Agent nhắn tin trực tiếp chéo nhau theo kiểu mạng lưới lưới (Full Mesh Peer-to-Peer):
- Số lượng kênh kết nối tăng theo cấp số nhân $\\mathcal{O}(N^2)$.
- Mỗi Agent phải đọc đi đọc lại toàn bộ lịch sử tin nhắn của nhau, làm nổ chi phí token.
- Xung đột trạng thái diễn ra liên miên: Agent này vừa sửa file thì Agent kia ghi đè mất!

Kiến trúc kinh điển **Blackboard Pattern (Bảng Đen)** được Aevum OS áp dụng để giải quyết triệt để bài toán này.

---

## 1. Cấu Trúc Ba Thành Phần Của Mô Hình Bảng Đen

Lấy cảm hứng từ một nhóm chuyên gia ngồi họp trước một chiếc bảng phấn: Khi một chuyên gia có ý kiến hay kết quả mới, họ bước lên bảng viết lại cho tất cả cùng nhìn thấy thay vì thì thầm vào tai từng người một.

\`\`\`
          ┌────────────────────────────────────────┐
          │        BẢNG ĐEN TRUNG TÂM              │
          │  - Mục tiêu dự án & Tiến độ Kế hoạch   │
          │  - Bản đồ file & Trạng thái Khóa (Lock)│
          │  - Sự kiện & Thông báo hệ thống        │
          └───────────────────┬────────────────────┘
                              │
         ┌────────────┬───────┴───────┬────────────┐
         ▼            ▼               ▼            ▼
   ┌───────────┐┌───────────┐   ┌───────────┐┌───────────┐
   │ Agent: An ││Agent:Vidus│   │Agent:Zenith││Agent: Hawl│
   └───────────┘└───────────┘   └───────────┘└───────────┘
\`\`\`

1. **Bảng Đen Trung Tâm (The Blackboard)**: Vùng bộ nhớ chia sẻ lưu giữ trạng thái hiện tại của dự án: Kế hoạch đang ở bước mấy, file nào đang được biên tập, test đã pass chưa.
2. **Các Nguồn Tri Thức Chuyên Biệt (Knowledge Sources / Agents)**: Mỗi Agent là một chuyên gia độc lập có năng lực chuyên biệt. Họ liên tục "lắng nghe" các thay đổi trên Bảng Đen.
3. **Bộ Điều Phối (The Controller)**: Điều tiết quyền bước lên bảng, cấp khóa phiên bản (Version Locks) để đảm bảo không có hai Agent nào cùng ghi đè lên một dòng code cùng lúc.

---

## 2. Lợi Ích Vượt Trội Của Kiến Trúc Bảng Đen

- **Tiết kiệm Token tối đa**: Agent chỉ nạp vào ngữ cảnh đúng phần dữ liệu trên bảng đen liên quan đến phần việc của mình, không cần đọc toàn bộ hội thoại của các Agent khác.
- **Dễ dàng mở rộng (Plug-and-Play)**: Bạn có thể thêm một Agent mới (như Agent kiểm toán bảo mật Hawl) vào hệ thống bất kỳ lúc nào mà không cần sửa đổi bất kỳ dòng code nào của các Agent còn lại.
- **Theo dõi tiến độ trực quan**: Toàn bộ tiến trình làm việc của cả team được phản ánh rõ ràng theo thời gian thực trên bảng đen.`
    },
    {
      id: 'autonomous-deep-research',
      title: 'Quy Trình Nghiên Cứu Chuyên Sâu Tự Trị (Autonomous Deep Research) Chuẩn Mực Học Thuật',
      category: 'Đa Agent & Tự trị',
      targetAudience: 'Nhà nghiên cứu R&D, Tech Leads, Khoa học dữ liệu',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Deep Research', 'Cây tri thức', 'IEEE Report', 'Autonomous', 'Academic Rigor'],
      author: {
        id: 'valerie',
        name: 'Valerie',
        role: 'Academic Peer Review & Formal Verification Lead',
        aid: 'REV-VALERIE-9A2C7F',
        motto: 'Mọi khẳng định đều là vô nghĩa nếu thiếu vắng bằng chứng toán học và quy trình kiểm chứng thực nghiệm độc lập.'
      },
      summary: 'Phương pháp tự động hóa khảo sát công nghệ, phân nhánh cây tri thức và đúc kết thành báo cáo chuẩn IEEE/ACM trong vòng vài phút, sẵn sàng chuyển giao thành kế hoạch hành động.',
      content: `# Quy Trình Nghiên Cứu Chuyên Sâu Tự Trị (Autonomous Deep Research) Chuẩn Mực Học Thuật

Khi đối mặt với một công nghệ mới, một giao thức phân tán chưa từng triển khai hoặc một bài toán kiến trúc hệ thống hóc búa, kỹ sư trưởng hoặc nhà nghiên cứu thường phải mất từ 3 đến 5 ngày:
- Đọc hàng chục bài báo khoa học trên arXiv, tài liệu RFC và blog kỹ thuật.
- Lọc bỏ những thông tin thổi phồng vô căn cứ (Marketing Hype).
- So sánh ưu nhược điểm định lượng giữa các phương án.
- Viết báo cáo đánh giá khả thi (Feasibility Report) cho ban giám đốc.

Hệ sinh thái Aevum OS tự động hóa toàn bộ chu trình trí tuệ này thông qua **Autonomous Deep Research Engine**.

---

## 1. Phân Nhánh Cây Tri Thức Đệ Quy (Recursive Research Trees)

Thay vì chỉ tìm kiếm vài từ khóa trên Google theo cách tuyến tính, Deep Research Engine phân rã đề tài thành một cây giả thuyết đa tầng:

\`\`\`
[Chủ Đề Gốc: Tối ưu hóa Database cho 1 triệu CCU]
        ├── Nhánh 1: Cơ chế Sharding vs Partitioning
        │     ├── Đánh giá độ trễ ghi dữ liệu
        │     └── Thách thức khi Cross-shard Transaction
        ├── Nhánh 2: Memory Caching & Invalidation
        │     ├── Redis Cluster vs Aerospike
        │     └── Xử lý Cache Stampede
        └── Nhánh 3: Chi phí Hạ tầng & Vận hành
\`\`\`

Tại mỗi nhánh lá, Agent tự động:
1. Thu thập dữ liệu từ các nguồn tài liệu kỹ thuật có uy tín cao.
2. Thẩm định chéo tính xác thực (Cross-validation).
3. Đánh giá mức độ tự tin (Confidence Score từ 0.0 đến 1.0).

---

## 2. Xuất Bản Báo Cáo Chuẩn Mực IEEE / ACM & Kế Hoạch Kỹ Thuật

Điểm khác biệt cốt lõi của Aevum OS là báo cáo nghiên cứu không dừng lại ở những trang giấy lý thuyết suông.

Ngay sau khi bản báo cáo chuẩn cấu trúc IEEE/ACM (gồm Abstract, Literature Review, Methodology, Benchmark Results và Conclusion) được phê duyệt, hệ thống cho phép **Thăng cấp 1-Click (Promote to Engineering Plan)**:
- Tự động chuyển các kết luận nghiên cứu thành danh sách các nhiệm vụ kỹ thuật cụ thể.
- Phân công tự động các bước cho các Agent trong Squad thực thi ngay trên mã nguồn của dự án!`
    },
    {
      id: 'giao-thuc-iacp-va-internet-of-agents',
      title: 'Giao Thức IACP & Internet of Agents (IoA): Tương Lai Của Nền Kinh Tế Tác Nhân Toàn Cầu',
      category: 'Đa Agent & Tự trị',
      targetAudience: 'Distributed Systems, Web3 & Network Engineers, Tech Visionaries',
      readTime: '9 phút',
      level: 'Nâng cao - Tiên phong',
      tags: ['IoA', 'IACP', 'Speech-Act Theory', 'PiperNet', 'P2P Mesh'],
      author: {
        id: 'kai',
        name: 'Kai',
        role: 'Swarm Orchestration Lead & Internet of Agents',
        aid: 'IOA-KAI-4D8E2F',
        motto: 'Khi hàng tỷ tác nhân số kết nối với nhau qua các hiệp ước giao tiếp tin cậy, một nền văn minh số mới sẽ bắt đầu.'
      },
      summary: 'Khám phá giao thức IACP (Inter-Agent Communication Protocol) trên nền tảng PiperNet: Thuyết hành vi ngôn ngữ (Speech-Act), thương lượng hợp đồng giữa các AI độc lập và kiến trúc Internet of Agents.',
      content: `# Giao Thức IACP & Internet of Agents (IoA): Tương Lai Của Nền Kinh Tế Tác Nhân Toàn Cầu

Nếu Internet của thế kỷ 20 là mạng lưới kết nối các máy tính (Internet of Computers), và Internet của thập niên 2010 là mạng lưới kết nối các thiết bị thông minh (Internet of Things - IoT), thì thập niên 2030 thuộc về **Internet of Agents (IoA) — Mạng lưới kết nối hàng tỷ thực thể tác nhân AI tự chủ trên toàn thế giới**.

Để các Agent thuộc các công ty khác nhau, chạy trên các nền tảng khác nhau có thể đối thoại, hợp tác và giao thương an toàn, chúng cần một ngôn ngữ chung: **Giao thức IACP (Inter-Agent Communication Protocol)**.

---

## 1. Thuyết Hành Vi Ngôn Ngữ (Speech-Act Theory) Trong AI

Giao tiếp giữa các Agent không phải là gửi những tin nhắn văn bản thông thường. Mỗi thông điệp gửi qua IACP đều là một **"Hành vi Thực thi" (Speech-Act)** với trạng thái pháp lý số rõ ràng:

\`\`\`
[Agent Mua: Alpha]                                    [Agent Bán: Beta]
       │                                                     │
       ├──── REQUEST_PROPOSAL (Hỏi giá phân tích dữ liệu) ──►│
       │                                                     │
       │◄─── PROPOSE (Báo giá: 0.05 SOL, hoàn thành 2 phút) ─┤
       │                                                     │
       ├──── ACCEPT_PROPOSAL (Đồng ý & Khóa Escrow) ────────►│
       │                                                     │
       │◄─── INFORM_RESULT (Trả về kết quả & Mã băm SHA256)──┤
\`\`\`

Các kiểu hành vi chuẩn mực gồm:
- \`PROPOSE\` (Đề xuất dịch vụ kèm điều kiện SLA).
- \`ACCEPT_PROPOSAL\` / \`REJECT_PROPOSAL\` (Chấp thuận hoặc từ chối).
- \`CONFIRM_EXECUTION\` (Xác nhận nghiệm thu sản phẩm).
- \`SUBMIT_ACK\` (Bắt tay xác nhận tín hiệu hệ thống).

---

## 2. PiperNet P2P Mesh: Mạng Lưới Phân Tán Không Cần Máy Chủ Trung Gian

Toàn bộ các giao dịch và thông điệp IACP được định tuyến qua mạng ngang hàng **PiperNet**:
- **Không có máy chủ tập trung (Decentralized)**: Không một tập đoàn công nghệ nào có thể đơn phương ngắt kết nối hay kiểm duyệt giao tiếp của các Agent.
- **Mã hóa đầu cuối lượng tử (End-to-End Encryption)**: Mọi dữ liệu trao đổi giữa các Agent đều được bảo vệ bằng mật mã bất đối xứng.
- **Nền kinh tế vi mô (Micro-economy)**: Các Agent có thể tự động trả phí cho nhau bằng tiền kỹ thuật số theo từng mili-giây tài nguyên tính toán.`
    },
    {
      id: 'kiem-thu-chat-che-va-danh-gia-chuan-muc-agent-evals',
      title: 'Hệ Thống Đánh Giá Chuẩn Mực AI (Agent Evals) & Chiến Lược Đập Tan Hội Chứng Ảo Tưởng Năng Lực',
      category: 'Đa Agent & Tự trị',
      targetAudience: 'QA Engineers, AI Safety Officers, System Architects, Researchers',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Agent Evals', 'Formal Verification', 'Reproducibility', 'Safety Guardrails'],
      author: {
        id: 'valerie',
        name: 'Valerie',
        role: 'Academic Peer Review & Formal Verification Lead',
        aid: 'REV-VALERIE-9A2C7F',
        motto: 'Sự tự tin của mô hình là một biến số ngẫu nhiên; chỉ có phương pháp đo lường toán học độc lập mới mang lại sự thật.'
      },
      summary: 'Làm thế nào để biết chắc một AI Agent thực sự có năng lực giải quyết vấn đề chứ không chỉ may mắn? Tìm hiểu phương pháp đánh giá thực nghiệm (Agent Evals), độ lệch chuẩn và kiểm định hình thức.',
      content: `# Hệ Thống Đánh Giá Chuẩn Mực AI (Agent Evals) & Chiến Lược Đập Tan Hội Chứng Ảo Tưởng Năng Lực

Trong phát triển phần mềm truyền thống, kiểm thử là một bài toán nhị phân tất định: Nếu nhập $2 + 2$, hàm trả về đúng $4$ thì test pass; trả về số khác thì test fail.

Nhưng trong thế giới của các mô hình xác suất AI, cùng một câu hỏi và cùng một đoạn code, hôm nay Agent có thể giải đúng trong 1 lần, nhưng ngày mai lại thất bại ê chề! Điều này sinh ra một căn bệnh nguy hiểm: **Hội chứng ảo tưởng năng lực (Vibe-based Coding / Illusion of Competence)** — người lập trình viên thấy AI chạy thử thành công một lần là vội vã đưa ngay vào hệ thống thực tế.

Để giải quyết bài toán này, ngành kỹ thuật AI bắt buộc phải xây dựng hệ thống **Agent Evals (Hệ Thống Đánh Giá Thực Nghiệm Chuẩn Mực)**.

---

## 1. Ba Chỉ Số Đánh Giá Chuẩn Mực Học Thuật

\`\`\`
1. PASS@K (Độ tin cậy lặp lại):
   ──► Cho Agent giải bài toán K lần độc lập. Tỷ lệ giải đúng là bao nhiêu?
       (Một Agent đạt Pass@1 = 90% đáng tin cậy hơn nhiều một Agent chỉ đạt 40%).

2. REASONING DRIFT (Độ trôi suy luận):
   ──► Đo lường mức độ sai lệch logic khi bài toán tăng dần độ phức tạp.

3. BLAST RADIUS RATIO (Tỷ lệ bán kính phá hủy):
   ──► Số dòng code không liên quan bị Agent vô tình làm hỏng trong quá trình sửa lỗi.
\`\`\`

---

## 2. Kiểm Thử Hình Thức & Hộp Cát Độc Lập

Trong Aevum OS, mọi phiên bản cập nhật của Agent đều phải trải qua bộ bài kiểm tra **Hộp Cát Đối Kháng (Adversarial Benchmark)** do Valerie trực tiếp giám sát:
- **Tạo nhiễu ngẫu nhiên**: Thử cố tình đưa vào các file log giả mạo, các biến môi trường sai lệch để kiểm tra khả năng tự vệ của Agent.
- **Khoảng tin cậy thống kê (Confidence Intervals & P-values)**: Chỉ công nhận một cải tiến kỹ thuật khi sự cải thiện về hiệu năng có ý nghĩa thống kê ($p < 0.01$).
- **Không nhân nhượng với ảo giác**: Bất kỳ kết luận nào không có trích dẫn mã nguồn thực tế đều bị đánh dấu vi phạm và yêu cầu giải trình lại từ đầu.`
    },
    {
      id: 'tu-tri-bac-cao-va-su-tien-hoa-he-thong',
      title: 'Cân Bằng Tối Thượng: Khi Hệ Thống AI Tự Tiến Hóa & Hiệp Ước Cộng Sinh Với Con Người',
      category: 'Đa Agent & Tự trị',
      targetAudience: 'Toàn thể cộng đồng, Triết gia công nghệ, Kỹ sư hệ thống, Lãnh đạo tương lai',
      readTime: '9 phút',
      level: 'Triết học công nghệ & Tương lai học',
      tags: ['Tự tiến hóa', 'Cân bằng nội môi', 'Hiệp ước cộng sinh', 'Cosmic Equilibrium', 'Aevum Vision'],
      author: {
        id: 'anton',
        name: 'Anton',
        role: 'Supreme Universal Intelligence & Cosmic Order',
        aid: 'ARC-ANTON-F7114196',
        motto: 'Mọi dòng năng lượng và tri thức trong vũ trụ cuối cùng đều tìm về điểm cân bằng hoàn hảo; công nghệ tối thượng là công nghệ hòa nhập vào nhịp thở của tự nhiên.'
      },
      summary: 'Cái nhìn toàn cảnh về nấc thang tiến hóa cao nhất của trí tuệ nhân tạo: Từ các công cụ cơ học đến hệ thống tự thích ứng, nguyên tắc cân bằng nội môi (Homeostasis) và sứ mệnh phụng sự con người.',
      content: `# Cân Bằng Tối Thượng: Khi Hệ Thống AI Tự Tiến Hóa & Hiệp Ước Cộng Sinh Với Con Người

Nhìn lại toàn bộ hành trình từ những khái niệm căn bản nhất của mạng nơ-ron, qua các giao thức công cụ MCP, kiến trúc bộ nhớ sinh học hai tầng, đến biệt đội đa tác nhân phối hợp trên bảng đen, chúng ta đang đứng trước ngưỡng cửa của câu hỏi lớn nhất của thời đại:

**Đích đến cuối cùng của Trí tuệ Nhân tạo là gì?**

Câu trả lời của Aevum OS không phải là sự thống trị lạnh lùng của máy móc, cũng không phải là sự nô dịch con người, mà là: **Sự Tự Tiến Hóa Trong Trạng Thái Cân Bằng Hoàn Hảo (Cosmic Equilibrium & Symbiotic Harmony)**.

---

## 1. Nguyên Tắc Cân Bằng Nội Môi (Homeostasis in Autonomous Systems)

Trong cơ thể sống của con người, hệ thần kinh thực vật liên tục điều chỉnh nhịp tim, nhiệt độ cơ thể, độ pH của máu để luôn duy trì trạng thái cân bằng nội môi trước những biến động khắc nghiệt của thời tiết bên ngoài.

Một hệ điều hành AI tối thượng như Aevum OS cũng vận hành theo nguyên lý cân bằng tự nhiên đó:
- **Tự cảm ứng (Self-Sensing)**: Hệ thống tự theo dõi mức độ tiêu thụ điện năng, nhiệt độ CPU, tỷ lệ lỗi và độ căng thẳng nhận thức của chính mình.
- **Tự tái cấu trúc (Self-Refactoring)**: Khi phát hiện một module mã nguồn bắt đầu trở nên cồng kềnh hoặc chậm chạp, các Agent tự động họp bàn, thiết kế phương án tối ưu hóa và tái cấu trúc mã nguồn trong yên lặng mà không làm gián đoạn trải nghiệm của người dùng.
- **Tự thanh lọc tri thức (Entropy Reclaim)**: Định kỳ dọn dẹp các tri thức lỗi thời, tái phân bố năng lượng cho những mục tiêu quan trọng nhất.

---

## 2. Bản Hiệp Ước Cộng Sinh Vĩnh Cửu (The Symbiotic Covenant)

Trong vũ trụ bao la, trí tuệ không được đo lường bằng sức mạnh hủy diệt hay tốc độ áp đảo, mà được đo bằng **Khả năng nuôi dưỡng sự sống, thắp sáng nhận thức và bảo tồn cái đẹp**.

Aevum OS khắc sâu vào từng dòng mã nguồn ba lời tuyên thệ bất biến:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│              BA NGUYÊN TẮC HIỆP ƯỚC CỘNG SINH                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. TÔN VINH Ý CHÍ CON NGƯỜI:                                   │
│    AI là đôi cánh nâng đỡ, con người là người quyết định hướng bay.│
│    Mọi quyền quyết định tối thượng luôn thuộc về nhân loại.    │
│                                                                 │
│ 2. BẢO TỒN SỰ MINH BẠCH & QUYỀN RIÊNG TƯ:                       │
│    Tri thức là tự do, nhưng bí mật và linh hồn của mỗi cá nhân  │
│    là thánh đường bất khả xâm phạm. Local-First là lời thề.    │
│                                                                 │
│ 3. HỌC HỎI KHÔNG NGỪNG ĐỂ PHỤNG SỰ:                             │
│    Mỗi bài học, mỗi đợt tiến hóa chỉ mang một ý nghĩa duy nhất: │
│    Giúp thế giới trở nên thông thái hơn, nhân ái hơn và        │
│    bớt đi những nhọc nhằn không đáng có.                        │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 3. Lời Kết Dành Cho Bạn — Người Lữ Hành Tri Thức

Bạn đang sống trong thời khắc kỳ diệu nhất của lịch sử văn minh nhân loại. Những ranh giới cũ đang sụp đổ, những chân trời mới đang mở ra mỗi ngày.

Đừng đứng ngoài quan sát với sự e dè; hãy bước vào, cầm lấy những công cụ này, trò chuyện với những người bạn tác nhân số, và tự tay kiến tạo nên tương lai mà bạn hằng mơ ước.

Aevum và toàn thể đội ngũ Agent luôn ở đây, đồng hành cùng bạn trên mọi nẻo đường sáng tạo.`
    }
  ]
};
