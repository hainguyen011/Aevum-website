---
id: "living-memory-graph"
title: "Đồ thị Tri thức Sống"
category: "Phát triển"
order: 14
---

# Đồ thị Tri thức Sống (Living Memory Graph)

**Living Memory Graph** là kho lưu trữ kiến thức dạng đồ thị tích hợp sẵn trong Aevum OS. 

Điểm đặc biệt nhất: Các bài học, quyết định kiến trúc và quy chuẩn coding không nằm im trong các file tài liệu phủ bụi, mà được **neo chặt trực tiếp vào từng hàm, class và file code cụ thể** trong dự án của bạn.

```mermaid
flowchart LR
    F1["<b>Mã Nguồn AST</b><br/>src/auth/token_service.ts"]
    N1["<b>Bài Học (Lesson)</b><br/>Race condition lock"]
    N2["<b>Quyết Định (ADR)</b><br/>Fastify TypeBox JIT"]
    F1 <===>|Neo [file:line]| N1
    N1 --- N2
```

---

## 1. Bốn Loại Tri Thức Được Lưu Trữ

Mỗi nút trên đồ thị đại diện cho một loại kinh nghiệm quý giá của dự án:

| Loại Tri Thức | Ý Nghĩa Thực Tế | Ví Dụ Cụ Thể |
|---|---|---|
| **`LESSON`** | Bài học rút ra sau khi fix bug hoặc xử lý sự cố. | *"Cách sửa lỗi Race Condition khi nhiều request cùng gọi refresh token."* |
| **`PATTERN`** | Mẫu thiết kế kiến trúc chuẩn đã chứng minh hiệu quả. | *"Mẫu Distributed Mutex bọc quanh các thao tác ghi dữ liệu nhạy cảm."* |
| **`DECISION`** | Quyết định kiến trúc quan trọng (ADR). | *"Tại sao dự án chọn Fastify v5 thay vì Express? Để đạt throughput cao hơn."* |
| **`CONVENTION`** | Quy ước chung của đội ngũ lập trình. | *"Mọi tệp component đều phải đi kèm ít nhất 1 bài unit test."* |

---

## 2. Khả Năng Tự Phục Hồi (Self-Healing & Drift Detection)

Trong các dự án phần mềm, tài liệu thường nhanh chóng bị "lạc hậu" vì code thay đổi liên tục: các hàm bị đổi tên, tách file hoặc xóa bỏ.

Living Memory Graph giải quyết vấn đề này bằng tính năng **Tự phục hồi**:
* Đồ thị tự động neo vào tên hàm và cấu trúc cú pháp của mã nguồn.
* Khi bạn đổi tên hàm (ví dụ từ `refreshToken()` sang `rotateToken()`), hệ thống tự động nhận biết và cập nhật lại mối liên kết.
* Nếu một hàm bị xóa bỏ hoàn toàn, hệ thống tự động đánh dấu bài học liên quan là `STALE` để cảnh báo AI không dùng kiến thức cũ đã lỗi thời.

---

## 3. Bảo Vệ Ranh Giới Kiến Trúc (Clean Architecture Guardrails)

Đồ thị tự động theo dõi các mối quan hệ giữa các Domain trong dự án để cảnh báo bạn và AI:
* Cảnh báo nếu tầng Giao diện (UI) cố tình gọi trực tiếp vào Cơ sở dữ liệu (Database) mà không thông qua Service Interface.
* Ngăn chặn Domain này "chọc trộm" vào dữ liệu nội bộ của Domain khác, giúp codebase luôn sạch sẽ và dễ bảo trì.

---

## 4. Cách Tra Cứu Tri Thức Bằng Khung Chat

Bạn có thể tìm kiếm lại bất kỳ kinh nghiệm nào trong quá khứ chỉ bằng câu hỏi tự nhiên:

> *"An ơi, tìm lại bài học trước đây về cách xử lý CORS trên Fastify giúp anh với."*

AI sẽ tự động quét đồ thị tri thức sống và trích xuất lại giải pháp kèm theo file code mẫu chính xác cho bạn trong tích tắc!
