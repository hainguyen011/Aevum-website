# 📚 Hướng Dẫn Quản Lý Tài Liệu Git-based Headless (Aevum Website)

Chào Master! Toàn bộ kho tài liệu kỹ thuật (**Docs**) và giáo trình học thuật (**Explore**) của Aevum Website đã được chuyển đổi 100% sang kiến trúc **Git-based Headless Content**.

---

## 📁 1. Cấu Trúc Thư Mục

```text
content/
├── docs/                     # 15+ tài liệu kỹ thuật & hướng dẫn Aevum OS
│   ├── 01-gioi-thieu.md
│   ├── 02-cai-dat.md
│   ├── 03-cli-terminal.md
│   ├── ...
│   └── 10-tips-tricks.md
├── explore/                  # 6 Modules giáo trình Khám phá Kỉ nguyên AI
│   ├── 01-universal-foundations/
│   │   ├── _module.json      # Metadata của Module (Tiêu đề, màu badge, mô tả)
│   │   ├── 01-ai-la-gi-co-che-hoat-dong.md
│   │   └── ...
│   ├── 02-real-world-applications/
│   ├── 03-agentic-era/
│   ├── 04-context-mcp/
│   ├── 05-cognitive-memory/
│   └── 06-squad-blackboard/
└── media/                    # Thư mục lưu trữ hình ảnh, sơ đồ, video nội bộ
```

---

## ✍️ 2. Frontmatter Chuẩn Cho Bài Viết

### A. Đối với tài liệu Docs (`content/docs/*.md`):
```yaml
---
id: "ten-slug-bai-viet"
title: "Tiêu đề bài viết hiển thị"
category: "Bắt đầu" # hoặc "Hướng dẫn", "Phát triển", "Tham chiếu"
order: 1
---

# Nội dung bài viết bắt đầu tại đây...
```

### B. Đối với bài học Explore (`content/explore/<module>/*.md`):
```yaml
---
id: "ten-slug-bai-hoc"
title: "Tiêu đề bài học"
category: "Phổ thông & Khái niệm"
targetAudience: "Mọi lứa tuổi & Người mới bắt đầu"
readTime: "6 phút"
level: "Phổ thông" # hoặc "Cơ bản", "Nâng cao", "Chuyên sâu"
tags:
  - "Khái niệm"
  - "Neural Network"
author:
  id: "an"
  name: "An"
  role: "AI System Companion & Alignment Lead"
  aid: "ENG-AN-7B9F1D"
summary: "Tóm tắt ngắn gọn nội dung bài học..."
order: 1
---

# Nội dung bài viết...
```

---

## 🎬 3. Cú Pháp Chèn Media Nâng Cao

### 🖼️ 1. Chèn Hình Ảnh & Sơ Đồ (Có Chú Thích & Lightbox Phóng To):
- **Cú pháp**:
  ```markdown
  ![Mô tả ảnh](https://example.com/image.png "Chú thích hiển thị bên dưới ảnh")
  # Hoặc ảnh cục bộ:
  ![Sơ đồ kiến trúc](/assets/architecture.png "Sơ đồ kiến trúc tổng quan")
  ```
- **Tính năng**: Tự động bo góc, viền kính, bóng đổ, và **bấm chuột vào ảnh sẽ phóng to toàn màn hình (Lightbox)**.

---

### 📺 2. Chèn Video YouTube (Chuẩn 16:9, Nocookie Player):
- **Cách 1: Dán trực tiếp link YouTube trên một dòng riêng**:
  ```text
  https://www.youtube.com/watch?v=dQw4w9WgXcQ
  ```
- **Cách 2: Sử dụng Shortcode / Directive kèm Tiêu đề**:
  ```markdown
  ::youtube[dQw4w9WgXcQ] "Video Demo Tính Năng Aevum OS"
  ```
- **Cách 3: Cú pháp Markdown Image**:
  ```markdown
  ![youtube](https://youtu.be/dQw4w9WgXcQ "Video Hướng Dẫn")
  ```

---

### 🎥 3. Chèn Video HTML5 Trực Tiếp (.mp4, .webm):
- **Cú pháp Directive**:
  ```markdown
  ::video[/assets/demo-video.mp4] "Video mô phỏng tiến trình thực thi OODA Loop"
  ```
- **Cú pháp Markdown Image**:
  ```markdown
  ![video:Tiến trình OODA Loop](/assets/demo-video.mp4)
  ```

---

### 💡 4. Khối Ghi Chú & Cảnh Báo (Callouts / Admonitions):
```markdown
> [!NOTE]
> Thông tin lưu ý quan trọng.

> [!TIP]
> Mẹo thực chiến giúp tăng hiệu năng.

> [!WARNING]
> Cảnh báo trước khi thực hiện thao tác.

> [!IMPORTANT]
> Chỉ thị bắt buộc không được bỏ qua.
```

---

## ⚡ 4. Đồng Bộ Dữ Liệu Về Website

- Khi sửa bài trong thư mục `content/`, chỉ cần chạy:
  ```bash
  npm run sync:content
  ```
- **Tự động hóa**: Lệnh này đã được móc nối tự động trước `npm run dev` và `npm run build`:
  - `npm run dev`: Tự động sync trước khi bật dev server.
  - `npm run build`: Tự động sync, build bundle và render ra 100% trang HTML tĩnh siêu tốc cho SEO.
