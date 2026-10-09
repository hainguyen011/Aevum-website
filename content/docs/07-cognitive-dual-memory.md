---
id: "cognitive-dual-memory"
title: "Não bộ Kép & Động cơ Phản xạ"
category: "Phát triển"
order: 7
---

# Kiến trúc Não bộ Kép & Động cơ Phản xạ

> Aevum OS kết hợp **Bộ nhớ Nhận thức Kép (Dual-Memory: STM + LTM)**, mô hình thần kinh xung **LIF (Spiking Recall)** và **Động cơ Phản xạ Không gian làm việc (2-Hop BFS Reflex)** để mang lại khả năng ghi nhớ vĩnh cửu và phản xạ tri thức với độ trễ dưới 5ms.

---

## 1. Phân tầng Bộ nhớ Não bộ Kép (STM & LTM)

Hệ thống nhận thức của Aevum OS phân tách rạch ròi hai tầng bộ nhớ:

| Tầng bộ nhớ | Đặc điểm | Trường hợp sử dụng |
|---|---|---|
| **Bộ nhớ Ngắn hạn (STM - Short-Term Memory)** | Có thời gian tự phai mờ (`decayHours`), linh hoạt, chứa các ghi chú tạm thời (`scratchpad`), suy nghĩ đang xử lý (`working_thought`). | Ghi chú tạm thời khi debug, danh sách task ngắn hạn trong buổi làm việc. |
| **Bộ nhớ Dài hạn (LTM - Long-Term Memory)** | Tồn tại vĩnh viễn, gồm các quy tắc ngữ nghĩa (`semantic_rule`), quy trình SOP (`procedural_sop`), và sở thích quan hệ (`relational_preference`). | Lời dặn cốt lõi của Master, quy chuẩn thiết kế hệ thống, bài học kiến trúc vĩnh cửu. |

### Thao tác với `aevum_manage_memory`
```bash
# Ghi nhận một quy tắc dài hạn mới
aevum_manage_memory(
  action="write",
  target="long_term",
  memoryType="semantic_rule",
  title="Prisma Batch Transaction",
  content="Luôn bọc các thao tác ghi dữ liệu hàng loạt vào transaction để tránh partial failure.",
  tags=["#database", "#prisma", "#best_practice"]
)
```

---

## 2. Mạng nơ-ron Xung LIF (Spiking Recall)
Thay vì tìm kiếm từ khóa đơn giản, Aevum OS áp dụng mô hình **Leaky Integrate-and-Fire (LIF)**:
- Mỗi nút ký ức hoạt động như một tế bào thần kinh sinh học với điện thế màng (membrane potential).
- Khi có truy vấn từ ngữ cảnh, điện thế màng tích lũy; khi vượt quá ngưỡng kích thích (threshold), nơ-ron phát xung (spike) và kéo theo các ký ức liên đới cùng thức tỉnh.

```bash
# Kích hoạt truy vấn thần kinh xung
aevum_manage_memory(
  action="spiking_recall",
  query="Xử lý lỗi timeout kết nối cơ sở dữ liệu"
)
```

---

## 3. Chỉ số Dẫn truyền Thần kinh (Neurotransmitter Telemetry)
Mỗi Persona trong Aevum OS được đo đạc và điều tiết trạng thái tinh thần qua 3 chất dẫn truyền thần kinh chính:
- **Dopamine (1.00x)**: Động lực, cảm giác thành tựu và củng cố thói quen tích cực. Tăng khi giải quyết thành công một ca khó.
- **Noradrenaline (1.00x)**: Mức độ tập trung cao độ và cảnh giác với rủi ro bảo mật hoặc lỗi tiềm ẩn.
- **Serotonin (1.00x)**: Trạng thái bình tĩnh, kiên nhẫn và tính nhất quán trong phong cách code.

---

## 4. Tua lại Hồi hải mã (Dream Consolidation)
Trong thời gian nghỉ hoặc khi kết thúc phiên làm việc lớn, Agent kích hoạt tiến trình **Dream Consolidation**:
```bash
aevum_manage_memory(action="dream_consolidation")
```
Hệ thống tự động:
1. Quét toàn bộ STM đã tích lũy trong ngày.
2. Loại bỏ các dữ liệu rác, nén các chuỗi sự kiện trùng lặp.
3. Thăng hạng các phát hiện quan trọng lên LTM hoặc chuyển thành quy trình SOP vĩnh viễn.

---

## 5. Động cơ Phản xạ Không gian Làm việc (Multi-Tier Workspace Reflex)
Agent hoạt động trong các không gian khác nhau cần những phản xạ ngữ cảnh khác nhau. Động cơ phản xạ sử dụng thuật toán **2-Hop Bounded BFS topological distance**:

```bash
aevum_query_workspace_reflex(
  query="Tối ưu hóa bảng hiển thị dữ liệu lớn",
  spaceId="W_coding",
  activeFilePath="src/renderer/src/components/DataGrid.tsx",
  topK=5
)
```

Hệ thống tự động phát hiện không gian (`W_coding`, `W_research`, `W_dashboard`, `W_architecture`) và tái xếp hạng (re-rank) tri thức để đưa ra gợi ý chuẩn xác nhất cho ngữ cảnh hiện tại.
