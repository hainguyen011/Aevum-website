---
id: "skill-system"
title: "Hệ thống Kỹ năng & Chưng cất SOP"
category: "Phát triển"
order: 8
---

# Hệ thống Kỹ năng Tác nhân (Autonomous Skill System)

Trong Aevum OS, AI Agent không chỉ làm việc theo prompt cố định, mà có khả năng **tự đúc kết quy trình chuẩn (SOP)** thành các kỹ năng vĩnh viễn thông qua **Hệ thống Kỹ năng Tự trị (Skill System)**.

---

## 1. Khái niệm Kỹ năng (Skill) trong Aevum
Một **Skill** là một năng lực có cấu trúc bao gồm:
- **ID & Name**: Tên định danh kỹ năng (ví dụ: `async_mutex_lock`, `cad_arc_fillet_routing`).
- **Category**: Phân loại năng lực (Refactoring, Security, Architecture, Performance, DevOps, UI/UX...).
- **Procedure (SOP)**: Bản hướng dẫn từng bước (Step-by-step Standard Operating Procedure) đảm bảo tính tái lập 100%.
- **Evidence Path**: Đường dẫn tới Plan, file mã nguồn hoặc bài test thực tế chứng minh kỹ năng này đã được áp dụng thành công.

---

## 2. Tự Động Chưng Cất Kỹ năng (Skill Distillation)
Sau khi giải quyết xong một bài toán kỹ thuật phức tạp hoặc tối ưu thành công một thuật toán khó, Agent chủ động gọi:

```bash
aevum_distill_skill(
  id="zero_latency_swipe_predecode",
  name="Zero-Latency Swipe Pre-decoding Pipeline",
  category="Performance",
  description="Kỹ thuật nạp trước và giải mã media đa luồng để loại bỏ độ trễ khi vuốt chuyển tiếp danh sách",
  procedure="1. Khởi tạo sliding window buffer 3 phần tử.\n2. Pre-decode frame tiếp theo ở Web Worker nền.\n3. Đổi texture tức thì khi nhận touch event.",
  evidencePath=".aevum/plans/optimize_mobile_reel_plan.md"
)
```

Kỹ năng ngay lập tức được hệ thống thẩm định, lưu trữ vào kho kỹ năng của Persona và gia tăng điểm EXP cho nhân vật!

---

## 3. Tra cứu & Triệu hồi Kỹ năng
Bất kỳ Agent nào trong Biệt đội cũng có thể tra cứu và kích hoạt kỹ năng đã mở khóa:

```bash
# Liệt kê danh sách kỹ năng đã mở khóa
aevum_list_unlocked_skills()

# Xem chi tiết quy trình của một kỹ năng cụ thể
aevum_get_skill_details(id="zero_latency_swipe_predecode")

# Triệu hồi và áp dụng công cụ kỹ năng
aevum_invoke_skill_tool(
  skillId="zero_latency_swipe_predecode",
  targetContext="Tối ưu Carousel Horizontal Waveform Visualizer"
)
```

Nhờ đó, một bài học giải quyết thành công của Agent này sẽ trở thành năng lực chung vĩnh cửu của toàn bộ Biệt đội.
