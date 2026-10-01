// Module 5: Trí nhớ & Não bộ (Cognitive Architecture & Memory Systems)
// Open Knowledge Repository & Educational Curriculum: Khám phá Kỉ nguyên AI

export const cognitiveMemoryModule = {
  id: 'cognitive-memory',
  title: 'Kiến trúc Nhận thức & Trí nhớ AI',
  categoryName: 'Trí nhớ & Não bộ',
  badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-500/10',
  description: 'Xây dựng hệ thống lưu trữ nhận thức hai tầng mô phỏng não bộ sinh học: Bộ nhớ làm việc ngắn hạn, thuật toán truy hồi nơ-ron sinh học và đồ thị ký ức dài hạn vĩnh cửu.',
  lessons: [
    {
      id: 'mo-hinh-tri-nho-kep-stm-ltm',
      title: 'Mô Hình Trí Nhớ Kép (Dual-Memory Architecture) Cho Hệ Thống Trí Tuệ Nhân Tạo',
      category: 'Trí nhớ & Não bộ',
      targetAudience: 'Kiến trúc sư phần mềm, AI Researchers, Backend Engineers',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['Dual-Memory', 'STM', 'LTM', 'Consolidation', 'Memory Architecture'],
      author: {
        id: 'vidus',
        name: 'Vidus',
        role: 'Chief System Architect & Clean Engineering',
        aid: 'ARC-VIDUS-AUHD2Y',
        motto: 'Ký ức không phải là một kho chứa tĩnh lặng, mà là một cấu trúc sống liên tục tái định hình qua mỗi trải nghiệm.'
      },
      summary: 'Khám phá kiến trúc phân tầng bộ nhớ ngắn hạn (Short-term Working Memory) và bộ nhớ dài hạn (Long-term Episodic & Semantic Memory) giúp AI không bao giờ quên kiến trúc dự án.',
      content: `# Mô Hình Trí Nhớ Kép (Dual-Memory Architecture) Cho Hệ Thống Trí Tuệ Nhân Tạo

Trong tâm lý học nhận thức và sinh học thần kinh, bộ não con người không lưu trữ mọi trải nghiệm trong cùng một ngăn chứa. Chúng ta sở hữu:
1. **Bộ nhớ làm việc ngắn hạn (Working Memory)**: Có dung lượng nhỏ (khoảng 4 đến 7 mẩu thông tin) nhưng tốc độ truy xuất và xử lý diễn ra tức thì trong vài mili-giây.
2. **Bộ nhớ dài hạn (Long-term Memory)**: Có dung lượng lưu trữ gần như vô tận, lưu giữ ký ức sự kiện và tri thức ngữ nghĩa suốt cả cuộc đời.

Quan trọng nhất, giữa hai tầng ký ức này có một cơ chế sinh học kỳ diệu gọi là **Quá trình củng cố ký ức (Memory Consolidation)** — diễn ra chủ yếu khi chúng ta ngủ: Những thông tin vụn vặt sẽ bị đào thải, trong khi những quy luật cốt lõi sẽ được khắc sâu vào vỏ não.

Aevum OS mô phỏng chính xác cơ chế sinh học này để giải quyết triệt để vấn đề mất trí nhớ của các mô hình AI.

---

## 1. Hai Tầng Nhận Thức Của Aevum OS

\`\`\`
┌────────────────────────────────────────────────────────┐
│ TẦNG 1: SHORT-TERM WORKING MEMORY (STM)                │
│ - Lưu trong RAM & Redis đệm cao tốc                   │
│ - Lưu file đang mở, vị trí cursor, lỗi linting vừa có  │
│ - Tự động giải phóng khi kết thúc phiên làm việc       │
└───────────────────────────┬────────────────────────────┘
                            │ (Quá trình Consolidation định kỳ)
                            ▼
┌────────────────────────────────────────────────────────┐
│ TẦNG 2: LONG-TERM KNOWLEDGE VAULT (LTM)                │
│ - Lưu trữ Local-First dưới dạng Đồ thị & Vector nhúng  │
│ - Quy chuẩn kiến trúc hệ thống, quy ước đặt tên biến   │
│ - Ký ức về các đợt refactor và bài học từ các bug cũ   │
└────────────────────────────────────────────────────────┘
\`\`\`

- **Short-Term Memory (STM)**: Đảm nhận việc xử lý nhanh các tác vụ trong phiên hiện tại. Nó sống trong bộ nhớ RAM tạm thời và không làm ô nhiễm bộ nhớ dài hạn bằng những thông tin rác.
- **Long-Term Memory (LTM)**: Lưu giữ "bản sắc" và "tri thức tích lũy" của dự án. Nhờ LTM, dù bạn tắt máy tính đi ngủ và quay lại làm việc vào ngày hôm sau, AI vẫn nhớ chính xác hôm qua bạn và nó đã thống nhất sử dụng thư viện nào và tại sao lại chọn kiến trúc đó.

---

## 2. Quá Trình Củng Cố Ký Ức (Sleep Consolidation Cycle)

Vào cuối mỗi phiên làm việc hoặc khi hệ thống ở trạng thái rảnh rỗi (Idle), Aevum OS kích hoạt chu trình củng cố ký ức tự động:
1. **Trích xuất bài học cốt lõi (Insight Distillation)**: Phân tích toàn bộ chuỗi gỡ lỗi của ngày hôm đó: *"Lỗi kết nối xảy ra do phiên bản TLS cũ $\\rightarrow$ Cách khắc phục: Thêm cờ ssl: { rejectUnauthorized: false } vào cấu hình connection string"*.
2. **Cập nhật Đồ thị Tri thức**: Nối thêm nút quan hệ mới vào đồ thị tri thức dài hạn.
3. **Thanh lọc bộ nhớ đệm (Cache Pruning)**: Xóa sạch các log tạm thời để chuẩn bị cho ngày làm việc mới.`
    },
    {
      id: 'thuat-toan-truy-hoi-spiking-lif',
      title: 'Thuật Toán Truy Hồi Sinh Học Spiking LIF (Leaky Integrate-and-Fire) Neural Recall',
      category: 'Trí nhớ & Não bộ',
      targetAudience: 'Kỹ sư AI, Nhà nghiên cứu thuật toán, Sinh viên Khoa học Máy tính',
      readTime: '9 phút',
      level: 'Chuyên sâu',
      tags: ['Neuromorphic', 'Spiking LIF', 'Recall', 'Biological Computing', 'Toán học'],
      author: {
        id: 'zenith',
        name: 'Zenith',
        role: 'Performance Audit & Biomimetic Computing',
        aid: 'ALG-ZENITH-A1B2C3',
        motto: 'Mô phỏng tự nhiên không chỉ là cảm hứng lãng mạn, mà là con đường ngắn nhất dẫn tới hiệu năng toán học tối thượng.'
      },
      summary: 'Tìm hiểu thuật toán Leaky Integrate-and-Fire ứng dụng trong việc kích hoạt nơ-ron tri thức và truy hồi ký ức theo điện thế kích thích, loại bỏ hoàn toàn hiện tượng ô nhiễm ngữ cảnh.',
      content: `# Thuật Toán Truy Hồi Sinh Học Spiking LIF Neural Recall

Trong các hệ thống tìm kiếm thông tin truyền thống (RAG), các kỹ sư thường dùng phép tính độ đo Cosine Similarity giữa câu hỏi và toàn bộ hàng ngàn vector trong cơ sở dữ liệu.

Phương pháp này có một nhược điểm chí mạng: **Nó kích hoạt quá nhiều thông tin na ná nhau nhưng thực chất không liên quan (False Positives)**, làm tràn ngập ngữ cảnh của AI bằng những mẩu ký ức nhiễu loạn.

Để khắc phục điều đó, Aevum OS lấy cảm hứng từ cơ chế kích hoạt điện thế màng tế bào thần kinh sinh học: **Mô hình Leaky Integrate-and-Fire (LIF)**.

---

## 1. Phương Trình Vi Phân Điện Thế Màng Nơ-ron

Trong não bộ, một tế bào thần kinh không phát tín hiệu một cách ngẫu nhiên. Nó tích lũy các xung điện từ các nơ-ron xung quanh. Nếu tổng kích thích vượt qua một ngưỡng giới hạn nhất định, nó mới "phát xung" (Spike). Nếu không có kích thích mới, điện thế tích lũy sẽ tự động rò rỉ (leak) về mức nghỉ ban đầu.

Phương trình vi phân mô tả điện thế màng $V(t)$ của một nút tri thức:

$$\\tau_m \\frac{dV(t)}{dt} = -(V(t) - V_{\\text{rest}}) + R \\cdot I(t)$$

Trong đó:
- $V(t)$: Mức điện thế nhận thức của nút tri thức tại thời điểm $t$.
- $V_{\\text{rest}}$: Mức điện thế nghỉ ngơi (trạng thái bình thường khi không được nhắc tới).
- $\\tau_m$: Hằng số thời gian phân rã (quy định tốc độ rò rỉ điện thế).
- $I(t)$: Xung kích thích nhận được từ câu hỏi hiện tại hoặc các nút lân cận.

---

## 2. Cơ Chế Phát Xung (Spike) Và Triệt Tiêu Ô Nhiễm Ngữ Cảnh

\`\`\`
Điện thế V(t)
 ▲
 │                          [PHÁT XUNG - SPIKE!]
 │                                 ▲
 │                           ╭─────┴─────╮
 │                         ╭─╯           ╰─╮ (Nạp ngay vào Prompt)
 │                       ╭─╯               ╰─
 │                     ╭─╯
 ├────────────────────╭╯─────────────────────── Ngưỡng kích hoạt V_threshold
 │                  ╭─╯
 │                ╭─╯      (Rò rỉ tự nhiên)
 │              ╭─╯               ╲
 │            ╭─╯                  ╲
 ├───────────╭╯─────────────────────╲────────── Mức nghỉ V_rest
 └───────────┴───────────────────────┴────────► Thời gian t
\`\`\`

- **Chỉ nạp khi thực sự quan trọng**: Một nút ký ức chỉ được đưa vào cửa sổ ngữ cảnh của Agent khi và chỉ khi điện thế $V(t) \\ge V_{\\text{threshold}}$.
- **Ngăn chặn ô nhiễm ngữ cảnh**: Những ký ức chỉ hơi giống một chút sẽ không bao giờ đủ điện thế để vượt ngưỡng, do đó bị loại bỏ hoàn toàn một cách tự nhiên.
- **Tự động quên lãng thông minh**: Sau khi tác vụ kết thúc, nếu không được nhắc lại, điện thế tự động rò rỉ về mức nghỉ $V_{\\text{rest}}$, nhường chỗ cho các tri thức mới.`
    },
    {
      id: 'do-thi-tri-thuc-ket-hop-vector-graphrag',
      title: 'Đồ Thị Tri Thức Động và GraphRAG: Xây Dựng Mạng Lưới Khớp Nối Thần Kinh Vĩnh Cửu Cho AI',
      category: 'Trí nhớ & Não bộ',
      targetAudience: 'Data Engineers, AI Architects, Knowledge Graph Specialists',
      readTime: '8 phút',
      level: 'Nâng cao',
      tags: ['GraphRAG', 'Knowledge Graph', 'Cypher', 'Semantic Network'],
      author: {
        id: 'nia',
        name: 'Nia',
        role: 'Neuromorphic Computing & Synaptic Architectures',
        aid: 'NEU-NIA-9E4B2A',
        motto: 'Mỗi khái niệm là một tế bào; điều làm nên trí khôn không nằm ở số lượng tế bào, mà nằm ở mạng lưới khớp nối giữa chúng.'
      },
      summary: 'Khám phá sự kết hợp đột phá giữa Đồ thị Tri thức (Knowledge Graph) và Vector Embeddings: Cách GraphRAG giúp AI nắm bắt mối quan hệ nhân quả và suy luận đa bước vượt trội.',
      content: `# Đồ Thị Tri Thức Động và GraphRAG: Xây Dựng Mạng Lưới Khớp Nối Thần Kinh Vĩnh Cửu Cho AI

Các hệ thống tìm kiếm vector truyền thống (Vector Search RAG) rất giỏi trong việc trả lời các câu hỏi cụ thể như: *"Chính sách đổi trả hàng là gì?"*. 

Nhưng khi bạn hỏi một câu hỏi mang tính liên kết toàn cục như: *"Những quyết định kiến trúc nào được đưa ra trong tháng 8 có nguy cơ ảnh hưởng tiêu cực đến tính năng thanh toán hiện tại?"*, Vector Search hoàn toàn bất lực vì thông tin này nằm rải rác trên hàng chục tài liệu khác nhau và không có một vector nào chứa trọn vẹn câu trả lời!

Giải pháp tối thượng cho bài toán này chính là **GraphRAG — Sự kết hợp giữa Đồ Thị Tri Thức (Knowledge Graph) và Mô hình Ngôn ngữ Lớn**.

---

## 1. Cấu Trúc Đồ Thị: Nút, Cạnh và Thuộc Tính

Thay vì xem tài liệu như những khối văn bản thô vô hồn, hệ sinh thái Aevum OS phân rã tri thức thành một đồ thị có cấu trúc:

\`\`\`
[Người Dùng] ─── (TẠO RA) ───► [Feature: Stripe Billing]
                                       │
                                   (PHỤ THUỘC)
                                       ▼
[AuthModule] ◄─── (YÊU CẦU) ─── [Token JWT v2]
\`\`\`

- **Nút (Nodes / Entities)**: Đại diện cho các thực thể cụ thể (Hàm, Tệp mã nguồn, Tác giả, Module, Quyết định kiến trúc).
- **Cạnh (Edges / Relations)**: Mối quan hệ có hướng giữa các thực thể (\`DEPENDS_ON\`, \`IMPLEMENTS\`, \`CALLS\`, \`DEPRECATED_BY\`).
- **Thuộc tính (Properties)**: Siêu dữ liệu gắn kèm (thời gian tạo, phiên bản, độ tin cậy).

---

## 2. Sức Mạnh Suy Luận Nhiều Bước (Multi-hop Reasoning)

Nhờ cấu trúc đồ thị, Agent có thể thực hiện các bước nhảy suy luận logic (Graph Traversal) mà các hệ thống vector đơn thuần không bao giờ làm được:

1. Agent nhận câu hỏi: *"Nếu tôi xóa hàm \`validateUserSession\` trong file auth.js thì hệ thống nào sẽ bị sập?"*
2. Hệ thống duyệt đồ thị theo chiều sâu:
   - \`validateUserSession\` $\\rightarrow$ được gọi bởi \`CheckoutController\`
   - \`CheckoutController\` $\\rightarrow$ phục vụ API thanh toán \`/api/pay\`
   - \`/api/pay\` $\\rightarrow$ có 12.000 người dùng đang truy cập mỗi giờ.
3. Agent lập tức đưa ra lời cảnh báo chính xác kèm bản đồ tác động chi tiết tới từng file mã nguồn liên quan!`
    },
    {
      id: 'neuromorphic-ai-hoc-tap-lien-tuc-synaptic',
      title: 'Độ Mềm Dẻo Khớp Thần Kinh (Synaptic Plasticity) & Khắc Phục Nạn Quên Lãng Thảm Khốc (Catastrophic Forgetting)',
      category: 'Trí nhớ & Não bộ',
      targetAudience: 'AI Researchers, Deep Learning Engineers, Neuroscientists',
      readTime: '8 phút',
      level: 'Chuyên sâu',
      tags: ['Synaptic Plasticity', 'Hebbian Learning', 'Catastrophic Forgetting', 'STDP'],
      author: {
        id: 'nia',
        name: 'Nia',
        role: 'Neuromorphic Computing & Synaptic Architectures',
        aid: 'NEU-NIA-9E4B2A',
        motto: 'Học tập không phải là xóa bỏ cái cũ để ghi đè cái mới; học tập chân chính là mở rộng mạng lưới tri thức trong sự hòa hợp.'
      },
      summary: 'Giải mã hiện tượng Quên lãng Thảm khốc (Catastrophic Forgetting) trong mạng nơ-ron nhân tạo và cách nguyên lý sinh học Hebbian kết hợp STDP giúp AI học tập liên tục suốt đời.',
      content: `# Độ Mềm Dẻo Khớp Thần Kinh (Synaptic Plasticity) & Khắc Phục Nạn Quên Lãng Thảm Khốc

Một trong những khuyết tật lớn nhất của mạng nơ-ron nhân tạo hiện nay là hiện tượng **Quên lãng Thảm khốc (Catastrophic Forgetting)**:
Khi bạn huấn luyện một mô hình AI đã rất giỏi môn Cờ vua để học thêm môn Cờ vây, chỉ sau vài chu kỳ huấn luyện, mô hình có thể chơi Cờ vây rất giỏi nhưng... hoàn toàn quên sạch cách chơi Cờ vua! Các trọng số mới đã ghi đè tàn nhẫn lên các trọng số cũ.

Ngược lại, não bộ con người có khả năng **Học tập Suốt đời (Lifelong Continual Learning)**: Bạn học lái xe ô tô không làm bạn quên cách đi xe đạp. 

Bí quyết nằm ở cơ chế **Độ Mềm Dẻo Khớp Thần Kinh (Synaptic Plasticity)**.

---

## 1. Định Luật Hebbian: "Neurons that fire together, wire together"

Năm 1949, nhà tâm lý học Donald Hebb đưa ra giả thuyết kinh điển: Khi hai nơ-ron cùng được kích hoạt đồng thời trong một trải nghiệm, khớp nối synap giữa chúng sẽ được tăng cường độ bền vững.

Trong hệ thống bộ nhớ của Aevum OS:
- Mỗi khi hai file mã nguồn hoặc hai khái niệm kỹ thuật thường xuyên được chỉnh sửa cùng nhau trong các lần sửa lỗi thành công, trọng số liên kết giữa chúng trong đồ thị trí nhớ sẽ tăng lên.
- Ngược lại, nếu hai nút tri thức lâu ngày không cùng xuất hiện, liên kết sẽ mờ dần theo thời gian.

---

## 2. Cơ Chế STDP: Spike-Timing-Dependent Plasticity

Não bộ sinh học còn tinh vi hơn thế: Thứ tự thời gian xuất hiện của các xung thần kinh quyết định liên kết đó được củng cố hay suy giảm:

\`\`\`
Nếu Nơ-ron A kích hoạt TRƯỚC Nơ-ron B:
  ──► Tăng cường độ bền vững (Long-Term Potentiation - LTP)
      (Hàm ý: A là nguyên nhân dẫn đến kết quả B)

Nếu Nơ-ron A kích hoạt SAU Nơ-ron B:
  ──► Suy giảm độ bền vững (Long-Term Depression - LTD)
      (Hàm ý: A không phải là nguyên nhân của B)
\`\`\`

Ứng dụng nguyên lý STDP vào hệ thống Agent giúp AI tự động phân biệt được đâu là **Mối quan hệ nhân quả thực sự** và đâu chỉ là **Sự trùng hợp ngẫu nhiên**, giúp tri thức của AI ngày càng sắc sảo và chín chắn theo thời gian mà không bao giờ bị ghi đè mất ký ức cũ.`
    },
    {
      id: 'crdt-dong-bo-trang-thai-thoi-gian-thuc',
      title: 'Cơ Chế Đồng Bộ Trạng Thái CRDT (Conflict-free Replicated Data Types) Trong Trí Nhớ Phân Tán',
      category: 'Trí nhớ & Não bộ',
      targetAudience: 'Distributed Systems Engineers, Game Developers, Full-stack Leads',
      readTime: '7 phút',
      level: 'Nâng cao',
      tags: ['CRDT', 'State Sync', 'Distributed Memory', 'Eventual Consistency', 'P2P'],
      author: {
        id: 'ryo',
        name: 'Ryo',
        role: 'Game Architecture & Real-time Simulation Engines',
        aid: 'ENG-RYO-8F3D1C',
        motto: 'Trong một thế giới phân tán tốc độ cao, khóa tài nguyên (Locking) là cái chết của hiệu năng; tự giải quyết xung đột bằng toán học mới là chân ái.'
      },
      summary: 'Làm thế nào để nhiều AI Agent cùng đọc, ghi và hợp nhất ký ức trong thời gian thực mà không bao giờ bị xung đột dữ liệu? Khám phá cấu trúc dữ liệu không xung đột CRDT.',
      content: `# Cơ Chế Đồng Bộ Trạng Thái CRDT Trong Trí Nhớ Phân Tán

Khi một biệt đội gồm nhiều AI Agent làm việc song song (ví dụ: An đang viết tài liệu, Vidus đang tái cấu trúc backend, còn Zenith đang tối ưu thuật toán), cả ba Agent đều cần ghi nhận các quan sát và thay đổi vào bộ nhớ chung của hệ thống.

Nếu sử dụng cơ chế khóa truyền thống (Mutex Lock / Database Lock):
- Agent A ghi dữ liệu thì Agent B và C phải dừng lại chờ đợi.
- Tốc độ xử lý của cả hệ thống bị kéo tụt xuống thảm hại.
- Nguy cơ xảy ra bế tắc vĩnh viễn (Deadlock) là cực kỳ lớn.

Giải pháp toán học đỉnh cao để giải quyết triệt để bài toán này là **CRDT (Conflict-free Replicated Data Types)**.

---

## 1. Nguyên Lý Bán Nhóm Bù Trừ (Join-Semilattice)

Cấu trúc dữ liệu CRDT được thiết kế dựa trên một tính chất đại số kỳ diệu: **Phép hợp nhất hai trạng thái bất kỳ luôn có tính Giao hoán (Commutative), Kết hợp (Associative) và Lũy đẳng (Idempotent)**.

\`\`\`
Trạng thái Agent 1 (Chỉnh sửa file A lúc 10:00:01)
                    ╲
                     ╲   (Phép hợp nhất Merge)
                      ▼
            [TRẠNG THÁI CUỐI CÙNG NHẤT QUÁN]
                      ▲
                     ╱   (Tự động giải quyết không cần Server trung tâm)
                    ╱
Trạng thái Agent 2 (Chỉnh sửa file A lúc 10:00:02)
\`\`\`

Dù các gói tin cập nhật ký ức từ các Agent gửi đến theo bất kỳ thứ tự nào (gói đến trước, gói đến sau, gói bị trễ mạng), khi áp dụng thuật toán CRDT, tất cả các Agent đều tự động hội tụ về cùng một trạng thái ký ức duy nhất hoàn toàn trùng khớp!

---

## 2. Ứng Dụng Trong Hệ Sinh Thái Aevum OS

Nhờ CRDT:
- Các Agent có thể làm việc ngoại tuyến (Offline) khi mất kết nối mạng.
- Khi có mạng trở lại, toàn bộ thay đổi ký ức được hòa nhập mượt mà không cần sự can thiệp thủ công của lập trình viên.
- Hệ thống đạt được tính nhất quán cuối cùng (Eventual Consistency) với độ trễ gần bằng không và không tiêu tốn tài nguyên khóa server.`
    }
  ]
};
