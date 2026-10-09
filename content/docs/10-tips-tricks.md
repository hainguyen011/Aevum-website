---
id: "tips-tricks"
title: "Tips & Tricks Tương tác"
category: "Hướng dẫn"
order: 10
---

# Tips & Tricks Tương tác Sáng tạo với Aevum OS

Dưới đây là những thủ thuật tương tác thực chiến được đúc kết từ chính kiến trúc cốt lõi của Aevum OS:

---

## 1. Định Vị Task trên Mã Nguồn (Task Anchoring)
Sử dụng cú pháp định vị tệp và dòng code cụ thể:
```markdown
- [ ] [src/core/bus.ts:45] Triển khai EventEmitter với typed events
```
Khi hover chuột vào dòng code tương ứng trong IDE, tooltip mô tả task chi tiết sẽ hiện lên kèm avatar của Agent phụ trách.

---

## 2. Nén Cấu Trúc Mã Nguồn (Skeleton Hashing & Hydration)
Khi làm việc với các file code khổng lồ, Aevum tự động nén thân các hàm không liên quan trực tiếp thành:
```typescript
public async processTelemetry(data: any): Promise<void> { // [BODY_HASH:a8f9c2d1] }
```
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
Agent sẽ gọi `aevum_get_diagnostics` để lấy danh sách lỗi và âm thầm tạo Plan sửa lỗi tự động.

---

## 5. Tự Động Đúc Kết Kỹ Năng Mới
Sau khi hoàn thành một giải pháp đột phá, hãy yêu cầu Agent:
> *"Hãy chưng cất giải pháp này thành một kỹ năng chuẩn bằng aevum_distill_skill để sau này cả đội cùng dùng."*

---

## 6. Nhúng Đa Phương Tiện (Hình Ảnh Phóng To, Video HTML5 & YouTube)
Hệ thống tài liệu Git-based của Aevum OS hỗ trợ hiển thị phong phú các dạng nội dung đa phương tiện:

### A. Hình ảnh với Chú thích & Phóng to (Lightbox Zoom)
Chỉ cần dùng cú pháp Markdown tiêu chuẩn, bạn có thể bấm trực tiếp vào ảnh để mở chế độ xem toàn màn hình sắc nét:
![Chân dung Persona An](/assets/an_avatar.webp "Nhân cách lõi An — Trợ lý AI và Linh hồn của Aevum OS (Bấm vào để phóng to)")

### B. Nhúng Video YouTube Tự Động (Responsive 16:9 Player)
Bạn có thể dán trực tiếp một đường link YouTube hoặc dùng cú pháp shortcode:
::youtube[dQw4w9WgXcQ] "Video Demo Giới Thiệu Aevum OS"

*Hoặc chỉ cần dán một URL YouTube trên một dòng riêng:*
https://www.youtube.com/watch?v=dQw4w9WgXcQ

### C. Nhúng Video HTML5 Trực Tiếp (.mp4, .webm)
Đối với video tải lên trực tiếp trong thư mục dự án hoặc URL nội bộ:
```markdown
::video[/assets/demo-video.mp4] "Video mô phỏng tiến trình thực thi"
# Hoặc:
![video:Tiến trình OODA Loop](/assets/demo-video.mp4)
```
