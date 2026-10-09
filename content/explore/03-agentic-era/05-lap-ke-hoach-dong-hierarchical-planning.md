---
id: "lap-ke-hoach-dong-hierarchical-planning"
title: "Hoạch Định Phân Cấp (Hierarchical Task Planning): Bí Quyết Giúp Agent Xử Lý Dự Án Ngàn Bước"
coverImage: "/media/7c9853f453cc1123e6b41db03292d945.jpg"
category: "Kỷ nguyên Agentic"
targetAudience: "AI Engineers, System Architects, Senior Developers"
readTime: "8 phút"
level: "Nâng cao"
tags:
  - "Planning"
  - "HTN"
  - "Hierarchical Planning"
  - "Agent Architecture"
author:
  id: "kai"
  name: "Kai"
  role: "Swarm Orchestration Lead & Internet of Agents"
  aid: "IOA-KAI-4D8E2F"
  motto: "Một kế hoạch vĩ đại không bao giờ là một đường thẳng cứng nhắc, mà là một thân cây vững chãi có khả năng nảy mầm nhánh mới khi gặp bão giông."
summary: "Phân tích cơ chế hoạch định phân cấp (HTN): Cách Agent chia nhỏ mục tiêu phức tạp thành cây nhiệm vụ, phân tách chiến lược vĩ mô và hành động nguyên tử, tự phục hồi khi kế hoạch nhánh bị đổ vỡ."
order: 5
---

# Hoạch Định Phân Cấp (Hierarchical Task Planning): Bí Quyết Giúp Agent Xử Lý Dự Án Ngàn Bước

Khi yêu cầu một AI thực hiện một nhiệm vụ đơn giản như *\"Tóm tắt file này\"*, mô hình có thể giải quyết trong một bước gọi công cụ duy nhất. Nhưng khi mục tiêu là *\"Nâng cấp kiến trúc cơ sở dữ liệu và triển khai hệ thống thanh toán mới không gián đoạn dịch vụ\"*, tác vụ đòi hỏi hàng trăm bước thực thi đan xen phụ thuộc lẫn nhau.

Nếu cố gắng bắt AI suy nghĩ ra toàn bộ danh sách 500 bước tuần tự ngay từ đầu, hệ thống chắc chắn sẽ thất bại: Chỉ cần bước thứ 3 gặp lỗi nhỏ, toàn bộ 497 bước phía sau sẽ trở thành phế thải.

Để giải bài toán này, các hệ thống tác nhân đỉnh cao như Aevum OS sử dụng cơ chế **Hoạch Định Nhiệm Vụ Phân Cấp (Hierarchical Task Planning - HTN)**.

---

## 1. Cấu Trúc Cây Mục Tiêu: Tách Biệt Chiến Lược & Thực Thi

Thay vì một danh sách phẳng (flat list), kế hoạch của Agent được cấu trúc như một cái cây nhiều tầng:

```
[MỤC TIÊU TỐI CAO: Triển khai Cổng Thanh toán Mới]
         │
         ├── [Giai đoạn 1: Thiết kế & Chuẩn bị Môi trường] (Macro Plan)
         │       ├── Bước 1.1: Khởi tạo schema cơ sở dữ liệu
         │       └── Bước 1.2: Cấu hình biến môi trường bảo mật
         │
         ├── [Giai đoạn 2: Phát triển & Kiểm thử Tích hợp] (Active Execution)
         │       ├── Bước 2.1: Viết API Webhook Handler
         │       └── Bước 2.2: Chạy bộ kiểm thử giả lập thanh toán
         │
         └── [Giai đoạn 3: Di chuyển Dữ liệu & Bật Production] (Contingency Branch)
```

- **Tầng Chiến Lược (High-Level Strategy)**: Chỉ xác định các mốc then chốt (Milestones) và điều kiện thành công tổng thể. Tầng này không quan tâm đến tên hàm hay cú pháp dòng lệnh cụ thể.
- **Tầng Chiến Thuật (Sub-Tasks)**: Phân rã mốc hiện tại thành 3 đến 5 nhiệm vụ vừa vặn trong phạm vi quan sát.
- **Tầng Hành Động Nguyên Tử (Atomic Primitive Actions)**: Các lệnh gọi công cụ cụ thể (`read_file`, `run_command`, `replace_file_content`) được thực thi từng bước một.

---

## 2. Hoạch Định Lười Biếng (Lazy Planning & JIT Execution)

Một nguyên tắc vàng trong kiến trúc Agent hiện đại là: **Đừng bao giờ lập kế hoạch chi tiết cho những việc chưa xảy ra!**

- Hệ thống chỉ mở rộng chi tiết (Expand) các bước nguyên tử cho giai đoạn đang chạy ngay trước mắt (Just-in-Time Planning).
- Các giai đoạn trong tương lai được giữ ở dạng trừu tượng. 
- Tại sao? Vì kết quả thực tế của Giai đoạn 1 sẽ làm thay đổi hoàn toàn bối cảnh và giả định ban đầu của Giai đoạn 2! Nhờ đó, Agent tiết kiệm tối đa chi phí token và tránh lãng phí năng lực tính toán.

---

## 3. Khả Năng Tự Phục Hồi Khi Nhánh Kế Hoạch Bị Đổ Vỡ

Khi một hành động nguyên tử thất bại (ví dụ: Cổng thanh toán bên thứ ba trả về mã lỗi 401 Unauthorized):
1. **Cô lập nhánh lỗi**: Lỗi chỉ nằm trong phạm vi của Bước 2.1, không làm hủy hoại toàn bộ Mục tiêu tối cao.
2. **Kích hoạt Kế hoạch Dự phòng (Contingency Branching)**: Agent kích hoạt nhánh phụ đã chuẩn bị sẵn: Thử dùng bộ chìa khóa dự phòng hoặc thông báo cho Master để kiểm tra lại cấu hình webhook.
3. **Cập nhật lại cây trạng thái**: Cây kế hoạch tự tái cấu trúc để thích ứng với hiện trạng mới mà không cần con người can thiệp từ đầu.
