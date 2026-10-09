---
id: "tu-chua-lanh-self-healing-code"
title: "Kỹ Thuật Tự Chữa Lành (Self-Healing Code) & Phân Rã Kế Hoạch Kỹ Thuật Đa Bước"
category: "Kỷ nguyên Agentic"
targetAudience: "Senior Developers, Tech Leads, DevOps Engineers"
readTime: "8 phút"
level: "Nâng cao"
tags:
  - "Self-Healing"
  - "AST Verification"
  - "Phân rã kế hoạch"
  - "Reliability"
author:
  id: "vidus"
  name: "Vidus"
  role: "Chief System Architect & Clean Engineering"
  aid: "ARC-VIDUS-AUHD2Y"
  motto: "Một kiến trúc bền vững là kiến trúc có khả năng tự nhận biết vết nứt và tự vá lành trước khi thảm họa xảy ra."
summary: "Khám phá cơ chế tự chữa lành mã nguồn của Aevum OS: Cách Agent tự phân tích cây cú pháp trừu tượng (AST), chạy vòng lặp kiểm thử tự động và khôi phục trạng thái an toàn khi xảy ra sự cố."
order: 3
---

# Kỹ Thuật Tự Chữa Lành (Self-Healing Code) & Phân Rã Kế Hoạch Kỹ Thuật Đa Bước

Một trong những khác biệt lớn nhất giữa một lập trình viên mới vào nghề và một kiến trúc sư hệ thống kỳ cựu là: **Khả năng dự đoán sự cố và thiết kế cơ chế tự phục hồi (Resilience)**.

Khi để AI Agent can thiệp trực tiếp vào mã nguồn của dự án, rủi ro lớn nhất là AI tạo ra mã lỗi làm hỏng toàn bộ dự án đang chạy. Để ngăn chặn điều này, Aevum OS thiết kế cơ chế **Self-Healing Code (Mã nguồn Tự Chữa Lành)** dựa trên vòng lặp phản hồi khép kín.

---

## 1. Nguyên Lý Phân Rã Kế Hoạch Đa Bước (Step Decomposition)

Trước khi chạm vào bất kỳ dòng mã nào, Agent không bao giờ hành động một cách vội vã. Nó bắt buộc phải trải qua ba pha kỷ luật:

```
[Pha 1: Thăm dò (Reconnaissance)]
    └── Quét cấu trúc thư mục, đọc các interface và kiểu dữ liệu hiện hữu.
[Pha 2: Lập Kế hoạch Thực thi (Execution Plan)]
    └── Phân rã mục tiêu thành các bước nguyên tử (Atomic Steps) độc lập.
[Pha 3: Xác minh Từng Bước (Step Verification)]
    └── Chạy linter hoặc test sau mỗi bước trước khi chuyển sang bước kế tiếp.
```

---

## 2. Vòng Lặp Phản Hồi Tự Chữa Lành (The Healing Loop)

Khi Agent thực hiện một thay đổi mã nguồn nhưng gặp lỗi biên dịch (Syntax Error / Type Error), cơ chế tự chữa lành sẽ được kích hoạt ngay lập tức:

1. **Phân tích Cây Cú pháp Trừu tượng (AST Parsing)**: Thay vì chỉ nhìn văn bản thô, hệ thống phân tích AST để xác định vị trí dấu ngoặc bị thiếu, biến chưa khai báo hoặc kiểu dữ liệu xung đột.
2. **Cô lập Vùng ảnh hưởng (Blast Radius Isolation)**: Lỗi chỉ được phép diễn ra trong phạm vi tệp đang chỉnh sửa, không được phép lan truyền sang các module khác.
3. **Thử nghiệm Đột biến (Mutation Retry with Backoff)**: Agent đọc chính xác thông điệp lỗi của Compiler, tự điều chỉnh giải pháp và áp dụng bản vá mới.
4. **Cơ chế Rollback Tự động**: Nếu sau 3 lần thử nghiệm liên tiếp mà bản vá không vượt qua bài kiểm tra kiểm thử (Unit Test), hệ thống sẽ tự động hoàn nguyên tệp về trạng thái sạch ban đầu thông qua Git Snapshot.
