---
id: "hermes-dynamic-context-budgeting"
title: "Hermes Context Budgeting: Nghệ Thuật Cân Đối Chi Phí và Cửa Sổ Ngữ Cảnh Động"
category: "Ngữ cảnh & MCP"
targetAudience: "DevOps Engineers, AI Architects, FinOps Leaders"
readTime: "8 phút"
level: "Nâng cao"
tags:
  - "Token Budget"
  - "Context Pruning"
  - "FinOps"
  - "Hermes Engine"
author:
  id: "kai"
  name: "Kai"
  role: "Swarm Orchestration Lead & Internet of Agents"
  aid: "IOA-KAI-4D8E2F"
  motto: "Một mạng lưới tác nhân vĩ đại được xây dựng trên sự phân bổ tài nguyên tối ưu tới từng mili-token."
summary: "Khám phá kiến trúc Hermes Dynamic Context Budgeting: Cách giám sát token thời gian thực, tỉa ngữ cảnh phân tầng và duy trì hiệu năng đỉnh cao mà không làm nổ ngân sách API."
order: 5
---

# Hermes Context Budgeting: Nghệ Thuật Cân Đối Chi Phí và Cửa Sổ Ngữ Cảnh Động

Trong các dự án phát triển phần mềm quy mô lớn, một phiên làm việc của AI Agent có thể kéo dài hàng giờ, tiêu tốn từ hàng trăm ngàn đến hàng triệu token. 

Nếu không có cơ chế quản trị tài nguyên thông minh, bạn sẽ nhanh chóng đối mặt với hai thảm họa:
1. **Thảm họa Tài chính (FinOps Shock)**: Hóa đơn API tăng đột biến lên hàng trăm USD chỉ sau vài ngày thử nghiệm.
2. **Thảm họa Suy thoái Ngữ cảnh (Context Degradation)**: Khi prompt quá dài, tốc độ phản hồi của AI chậm chạp và chất lượng suy luận giảm sút rõ rệt.

Để giải quyết bài toán này, kiến trúc **Hermes Dynamic Context Budgeting** trong Aevum OS ra đời.

---

## 1. Cơ Chế Phân Bổ Ngân Sách Theo Ngăn (Context Bucketing)

Thay vì để prompt phình to vô tội vạ, Hermes chia cửa sổ ngữ cảnh thành các "ngăn ngân sách" có giới hạn cố định:

```
┌─────────────────────────────────────────────────────────────┐
│  CỬA SỔ NGỮ CẢNH TỔNG THỂ (Ví dụ: 32,000 Tokens)            │
├───────────────┬───────────────┬───────────────┬─────────────┤
│ System Prompt │ Knowledge     │ Recent Turn   │ Tool Specs  │
│ & Rules (15%) │ Graph (25%)   │ History (40%) │ & AST (20%) │
└───────────────┴───────────────┴───────────────┴─────────────┘
```

- **Ngăn Quy tắc Hệ thống (System Rules)**: Cố định 15% dung lượng, chứa các nguyên tắc đạo đức và quy ước kiến trúc bất di bất dịch.
- **Ngăn Tri thức Đồ thị (Knowledge Graph)**: Chiếm 25%, chứa các quan hệ logic được truy xuất theo thuật toán nơ-ron sinh học.
- **Ngăn Lịch sử Giao tiếp (Conversation History)**: Chiếm 40%, lưu trữ các vòng đối thoại gần nhất.
- **Ngăn Khai báo Công cụ (Tool Interfaces)**: Chiếm 20%, chứa danh mục các hàm MCP có thể gọi.

---

## 2. Kỹ Thuật Tỉa Ngữ Cảnh Tự Động (Sliding Window & Token Pruning)

Khi lịch sử giao tiếp vượt quá hạn mức 40%, bộ điều phối Hermes sẽ tự động thực hiện ba hành động:
1. **Tóm tắt nén (Recursive Summarization)**: Tóm tắt 10 vòng hội thoại cũ thành một đoạn văn ngắn gọn giữ lại các quyết định kỹ thuật then chốt.
2. **Loại bỏ kết quả trung gian thừa**: Các output dài hàng ngàn dòng của lệnh kiểm thử terminal sau khi đã phân tích xong sẽ được rút gọn lại thành chỉ mã trạng thái (Exit code: 0).
3. **Giải phóng bộ nhớ RAM đệm**: Trả lại không gian trống cho các suy luận logic phức tạp ở bước tiếp theo.
