# 🎨 Google Sans Flex — Quy Chuẩn Typography & Hệ Thống Đọc Toàn Diện Cho Aevum OS
> **Tài liệu nghiên cứu & đúc kết từ Luna (DSN-LUNA-3C9A12) — Giám đốc Trải nghiệm & Thiết kế Giao diện Aevum OS**  
> *Phiên bản:* 2.4.0 • *Chuẩn mực:* Google Material 3 Variable Typography & Vietnamese Legibility Standards

---

## 1. Bản Chất & Các Trục Biến Thiên (Variable Axes) của Google Sans Flex

Khác với các bộ font tĩnh (static fonts) chỉ có vài file trọng số rời rạc, **Google Sans Flex** là họ font biến thiên đa chiều (Multi-axis Variable Font) hiện đại nhất từ Google, tối ưu cho khả năng hiển thị đa thiết bị và đa ngôn ngữ.

### Các trục điều khiển chính:
| Trục (Axis) | Tag | Phạm vi giá trị | Vai trò & Ý nghĩa thiết kế |
| :--- | :---: | :---: | :--- |
| **Weight** | `wght` | `100` – `1000` | Điều chỉnh độ đậm nhạt liên tục. Chuẩn **Regular** là `400` cho nội dung đọc dài, **Medium** `500` cho nhãn/nút, **SemiBold** `600` cho tiêu đề phụ, **Bold** `700` cho tiêu đề chính. |
| **Optical Size** | `opsz` | `6` – `144` | **Trục kích thước thị giác tự động:** Tự động điều chỉnh độ tương phản nét, mở rộng khẩu độ chữ (aperture) khi cỡ chữ nhỏ (10–14px) để chống nhòe nét; đồng thời tinh chỉnh nét chữ thanh thoát, khoảng cách hẹp lại khi cỡ chữ lớn (Display 32–64px). |
| **Width** | `wdth` | `25` – `151` | Độ co giãn bề ngang (mặc định chuẩn là `100`). |
| **Grade** | `GRAD` | `-200` – `150` | Tinh chỉnh độ dày nét quang học **mà không làm thay đổi độ dài dòng (layout reflow)**. Cực kỳ hữu dụng khi chuyển giữa Dark Mode và Light Mode để cân bằng độ phát sáng của pixel. |
| **Slant** | `slnt` | `-10` – `0` | Góc nghiêng chữ tự nhiên. |

---

### 1.1. Nạp Trực Tiếp Từ Google Fonts CDN (Khắc phục triệt để lỗi Tiếng Việt của tệp tải xuống)
Thay vì sử dụng các gói npm tải sẵn (`@fontsource/google-sans-flex`) thường bị thiếu hụt subset tiếng Việt hoặc phân mảnh unicode range gây lỗi lệch font trên các chữ có dấu (*ơ, ư, ế, ệ, ặ, ỗ, ũ*), hệ thống chuyển sang **kết nối trực tiếp qua Google Fonts CDN chính thức**:

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,100..1000&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Google Fonts CDN tự động phân phát đúng 11 block unicode font woff2, bao gồm đầy đủ toàn bộ dải ký tự tiếng Việt (`/* vietnamese */`), kết hợp tự động điều chỉnh quang học `opsz` mượt mà nhất.

### 1.2. Cấu hình biến thiên chuẩn tử Google Sans Flex Specimen
```css
.google-sans-flex {
  font-family: "Google Sans Flex", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "slnt" 0,
    "wdth" 100,
    "GRAD" 0,
    "ROND" 0;
}
```

---

## 2. Tiêu Chuẩn Trọng Số & Hiển Thị Văn Bản Tiếng Việt

Tiếng Việt là ngôn ngữ có hệ thống dấu thanh xếp chồng phong phú (*dấu hỏi, ngã, sắc, huyền, nặng kết hợp cùng mũ ô, ơ, ư, ê, ă*). Nếu sử dụng sai tỷ lệ font hoặc line-height quá sát, các dấu này sẽ va chạm vào chân chữ dòng trên (descenders) hoặc bị cụt mất phần trên.

### Quy tắc "Vàng" cho Tiếng Việt trong Google Sans Flex:
1. **Bắt buộc sử dụng Regular chuẩn (`wght: 400`) cho văn bản đọc**:
   - Tránh tuyệt đối việc làm đậm nhân tạo body text (`500` hay `600` kéo dài) vì sẽ gây hiện tượng "bết mực" khi các dấu phụ tiếng Việt đứng cạnh nhau.
   - Trọng số `400` mang lại khoảng thở thoáng đãng, sắc thái thanh thoát, mắt không bị điều tiết quá độ khi đọc sách hoặc tài liệu kỹ thuật hàng giờ liền.
2. **Tiêu chuẩn Heading 2 (H2) từ Google Fonts Specimen**:
   - **Size**: `22px` (`1.375rem`)
   - **Weight**: `400` (**Regular chuẩn**) — thay vì in đậm 700 cồng kềnh, Google Sans Flex H2 ở `400` toát lên vẻ đẹp thanh lịch, chuẩn mực báo chí công nghệ cao.
   - **Optical Size**: `Auto`
   - **Slant**: `0`, **Width**: `100`
3. **Khoảng cách dòng an toàn (`leading-relaxed` / `1.8`)**:
   - Với cỡ chữ đọc chuẩn `16px` – `16.5px`: Line-height đạt `29px` – `30px` (`leading-[1.8]`).
   - Với cỡ chữ đọc lớn `18.5px` – `19px`: Line-height đạt `33px` – `35px` (`leading-[1.85]`).
   - Đảm bảo 100% không va quẹt giữa dấu mũ tiếng Việt và chân chữ `g, y, p, q, j` của dòng phía trên.
4. **Kích hoạt tính năng Optical Sizing tự động**:
   - `font-optical-sizing: auto;` giúp trình duyệt tự động khớp `opsz` với `font-size` thực tế của phần tử.

---

## 3. Bảng Thang Kích Thước (Typography Scale) Toàn Hệ Thống Aevum

| Cấp bậc (Hierarchy) | Font Size | Line Height | Weight (`wght`) | Tracking (Letter Spacing) | Mục đích sử dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Display Hero** | `44px` – `56px` | `1.12` | `500` – `700` | `-0.03em` | Tiêu đề lớn trang chủ, slogan công nghệ |
| **Headline 1 (H1)** | `28px` – `34px` | `1.20` | `500` (Medium) | `-0.02em` | Tiêu đề chính bài học, tài liệu, trang |
| **Headline 2 (H2)** | `22px` (`1.375rem`) | `1.30` | **`400` (Regular)** | `-0.012em` | Đầu mục cấp 2, mục lục neo `#` (Chuẩn Google Specimen) |
| **Headline 3 (H3)** | `18px` (`1.125rem`) | `1.38` | `400` (Regular) | `-0.008em` | Phân mục cấp 3 |
| **Headline 4 (H4)** | `16px` (`1rem`) | `1.45` | `500` (Medium) | `-0.005em` | Nhóm chức năng, nhãn khối |
| **Body Large (A+)** | `18.5px` – `19px` | `1.85` | **`400` (Regular)** | `0.005em` | Chế độ đọc tiếp cận người lớn tuổi / thị lực yếu |
| **Body Standard** | `16px` – `16.5px` | `1.80` | **`400` (Regular)** | `0.005em` | Toàn bộ văn bản bài viết, docs, explore |
| **Body Small / Meta** | `12px` – `13px` | `1.50` | `400` / `500` | `0.01em` | Thời lượng đọc, ngày tháng, breadcrumb |
| **Kicker / Tag** | `10.5px` – `11px` | `1.40` | `500` | `0.12em` (caps) | Badge phân loại, category uppercase |
| **Code / Monospace** | `12.5px` – `13px` | `1.65` | `400` / `500` | `0` | **JetBrains Mono** (mã nguồn, CLI, hash) |

---

## 4. Độ Dài Dòng Đọc Chuẩn (The Optimal Measure: `max-w-prose`)

Nghiên cứu công thái học mắt người (Human-Computer Ergonomics) chỉ ra rằng:
- **Dòng quá dài (> 90 ký tự)**: Mắt người đọc phải di chuyển cơ mắt liên tục sang hai mép màn hình, khi quay lại dòng dưới rất dễ bị lạc dòng, gây chóng mặt và mỏi cơ mắt.
- **Dòng quá ngắn (< 45 ký tự)**: Nhịp ngắt dòng quá dồn dập, phá vỡ cấu trúc câu và mạch suy nghĩ logic.
- **Tiêu chuẩn tối ưu**: Giới hạn bề ngang văn bản từ **`65` đến `75` ký tự mỗi dòng** (`max-w-prose` ~ `65ch` – `72ch`). Cả `/docs` và `/explore` đều áp dụng chặt chẽ quy tắc này.
- **Tiêu đề dài & văn bản ngắn**: Sử dụng `max-w-prose text-balance leading-snug` cho H1 và H2 để tiêu đề tự bẻ dòng theo nhịp 2 dòng cân xứng, ôm khít theo chiều rộng thân bài đọc phía dưới, không còn tình trạng bè ngang 850px gây lệch tỷ lệ.

---

## 5. Quy Chuẩn Đồng Bộ Code & Styles

### File `src/styles/typography.css` & `src/index.css`:
```css
/* Base Body - Strict Regular Weight (400) */
html, body {
  font-family: 'Google Sans Flex', var(--font-sans);
  font-weight: 400;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "slnt" 0,
    "wdth" 100,
    "GRAD" 0,
    "ROND" 0;
  text-rendering: optimizeLegibility;
  letter-spacing: 0.005em;
}

/* Headings with Optical Sizing */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Google Sans Flex', var(--font-display);
  font-optical-sizing: auto;
  font-variation-settings:
    "slnt" 0,
    "wdth" 100,
    "GRAD" 0,
    "ROND" 0;
  text-wrap: pretty;
}

/* Heading 2 Standard (Size 22px, Weight 400 Regular) */
h2 {
  font-size: 1.375rem; /* 22px */
  font-weight: 400;
  line-height: 1.3;
}

/* Fixed-width Monospace Stack for Code */
code, pre, .font-mono {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace !important;
}
```

### File `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
  display: ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
}
```

---

*Ghi chú của Luna: "Một bộ font hoàn hảo không phải là bộ font cố gắng thu hút sự chú ý vào chính nó, mà là bộ font trở nên vô hình để ánh sáng của tri thức và tư duy tự do tỏa sáng trọn vẹn nhất."* 🌙
