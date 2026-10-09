---
id: "tips-tricks"
title: "Tips & Tricks Tương tác"
category: "Hướng dẫn"
order: 8
---

# Tips & Tricks Tương tác Sáng tạo dành cho Kỹ sư

Được đúc kết từ hàng nghìn giờ thực chiến của cộng đồng lập trình viên Aevum OS, dưới đây là những thủ thuật tối ưu giúp bạn khai thác 100% sức mạnh của hệ thống:

---

## 1. Định Vị Tệp & Dòng Code Chuẩn xác (Task Anchoring)

Khi viết kế hoạch hoặc yêu cầu Agent chỉnh sửa, hãy sử dụng cú pháp định vị tệp và dòng code cụ thể:

```markdown
- [ ] [src/core/bus.ts:45] Bổ sung Typed EventEmitter cho luồng tín hiệu Pulse
- [ ] [src/auth/TokenService.ts:182] Thêm kiểm tra Redis TTL trước khi cấp token mới
```

**Lợi ích:**
* Agent không bao giờ bị lạc dòng hoặc sửa nhầm vào hàm khác có tên tương tự.
* Trên giao diện IDE, khi di chuột vào dòng code tương ứng, tooltip sẽ hiển thị tóm tắt đầu việc và avatar của Persona phụ trách.

---

## 2. Xử Lý Tệp Code Khổng Lồ với AST Skeleton Hashing

Khi làm việc với các tệp nguồn dài hàng nghìn dòng, việc nhồi toàn bộ code vào prompt sẽ gây lãng phí token và làm loãng ngữ cảnh. Aevum OS tự động nén thân các hàm không liên quan trực tiếp thành mã băm AST Vault:

```typescript
// Trong ngữ cảnh nén của Agent:
public async processTelemetry(data: TelemetryPayload): Promise<void> { 
  // [BODY_HASH:a8f9c2d1e04b]
}
```

Nếu cần xem chi tiết nội dung thân hàm này để gỡ lỗi, bạn chỉ cần ra lệnh:
> *"Hãy giải nén thân hàm processTelemetry bằng công cụ `aevum_hydrate_vault_hash` để kiểm tra logic bên trong."*

Agent sẽ lập tức truy xuất đúng đoạn mã nguyên bản mà không cần đọc lại toàn bộ tệp!

---

## 3. Triệu Hồi Biệt Đội Phối Hợp Trong Một Câu Lệnh

Thay vì làm việc tuần tự với từng mô hình, bạn có thể phối hợp nhiều chuyên gia ngay trong một lời nhắc:

> *"Gọi **An** xây dựng logic Fastify route, nhờ **Luna** vẽ giao diện Tailwind Dark Mode chuẩn pixel, mời **Zenith** kiểm toán hiệu năng độ trễ dưới 5ms, và nhờ **Hawl** rà soát lỗ hổng Injection trước khi commit nhé."*

Các Agent sẽ tự động khởi tạo phiên Blackboard Hub, chia việc theo đúng chuyên môn và đồng bộ hóa tiến độ với nhau.

---

## 4. Tự Động Sửa Lỗi Biên Dịch (Diagnostic Awareness)

Không cần copy-paste thông báo lỗi dài dòng từ Terminal. Khi gặp lỗi build hoặc linting, bạn chỉ cần nhắn:

> *"Quét diagnostics và tự động sửa toàn bộ lỗi TypeScript hiện tại bằng Living Memory."*

Agent sẽ tự động gọi công cụ `aevum_get_diagnostics` để trích xuất danh sách lỗi kèm số dòng chính xác và âm thầm tạo kế hoạch sửa chữa tự động.

---

## 5. Tiết Kiệm 70% Token với Universal Semantic Middleware

Khi cần đọc một tệp tài liệu lớn, tài liệu API hoặc kế hoạch dài, **tuyệt đối không dùng lệnh đọc tệp thô**. Hãy sử dụng `aevum_get_compressed`:

```bash
aevum_get_compressed(filePath="docs/api-specification.md", maxBytes=4000)
```

Engine nén ngữ nghĩa của Aevum sẽ giữ lại 100% cấu trúc logic, tham số API và kiểu dữ liệu quan trọng, trong khi loại bỏ toàn bộ từ ngữ thừa thãi — giúp giảm tới 70% lượng token tiêu thụ.

---

## 6. Nhúng Đa Phương Tiện Đỉnh Cao (Video & Lightbox Zoom)

Hệ thống tài liệu của Aevum OS hỗ trợ hiển thị phong phú các dạng nội dung đa phương tiện:

### A. Ảnh Chụp Phóng To (Lightbox Zoom)
Sử dụng cú pháp Markdown tiêu chuẩn kèm chú thích; người đọc có thể nhấp chuột trực tiếp để phóng to toàn màn hình:
```markdown
![Kiến trúc Aevum OS](/assets/architecture.webp "Sơ đồ luồng dữ liệu 4 tầng của Aevum OS")
```

### B. Nhúng Video YouTube Tự Động (Responsive 16:9)
Dán URL YouTube trên một dòng riêng hoặc sử dụng shortcode:
```markdown
::youtube[dQw4w9WgXcQ] "Video Demo Tính năng Multi-Agent Squad"
```

### C. Nhúng Video HTML5 Trực tiếp (.mp4, .webm)
```markdown
::video[/assets/demo-run.mp4] "Video mô phỏng tiến trình thực thi OODA Loop"
```
