---
id: "cai-dat"
title: "Cài đặt & Thiết lập"
category: "Bắt đầu"
order: 2
---

# Cài đặt & Thiết lập Hệ thống

Aevum OS cung cấp các gói cài đặt máy tính để bàn chính thức (Desktop Installers) kèm theo công cụ dòng lệnh toàn cục (Global CLI) để bạn dễ dàng tích hợp vào bất kỳ môi trường làm việc nào.

> [!NOTE]
> **Phiên bản mới nhất**: [Aevum OS v1.0.0-beta.6](/changelog) — Truy cập trang [Nhật ký Cập nhật](/changelog) để theo dõi toàn bộ ghi chú phát hành và các cải tiến mới nhất.

---

## Các bước Cài đặt

### Bước 1: Tải về Bản cài đặt Mới nhất ([v1.0.0-beta.6](/changelog))
Tải bản cài đặt chính thức của Aevum OS phù hợp với hệ điều hành của bạn trực tiếp tại [Trang Nhật ký Cập nhật](/changelog) hoặc [GitHub Releases](https://github.com/hainguyen011/aevum-os-releases/releases/latest):
- **Windows (x64 / ARM64)**: Tải tệp [Aevum-OS-Setup-1.0.0-beta.6.exe](/changelog)
- **macOS (Apple Silicon M-Series)**: Tải tệp [Aevum-OS-1.0.0-beta.6-mac-arm64.dmg](/changelog) hoặc [.zip](/changelog)
- **macOS (Intel x64)**: Tải tệp [Aevum-OS-1.0.0-beta.6-mac-x64.dmg](/changelog) hoặc [.zip](/changelog)

> [!TIP]
> Bạn có thể xem toàn bộ lịch sử thay đổi, ghi chú phát hành chi tiết và so sánh các gói cài đặt tại [Nhật ký Cập nhật](/changelog).

Bộ cài đặt chính thức tự động thiết lập:
- Tạo shortcut ứng dụng trên Desktop và Start Menu / Launchpad.
- Đăng ký giao thức liên kết hệ thống `aevum://`.
- Đăng ký định dạng tệp lưu trữ bộ nhớ ngữ cảnh `.aevum`.
- Tích hợp tính năng tự động kiểm tra và cập nhật phiên bản mới (Auto-Updater).

---

## Lưu ý Quan trọng Trong Giai đoạn Thử nghiệm (Beta Preview)

Hiện tại, Aevum OS đang trong giai đoạn phát hành thử nghiệm cộng đồng (**Public Beta**). Do phần mềm chưa tích hợp chứng chỉ ký số doanh nghiệp trả phí (EV Code Signing / Apple Notarization), hệ điều hành có thể hiển thị cảnh báo bảo vệ mặc định khi mở file cài đặt lần đầu. Ứng dụng an toàn 100% và không chứa mã độc.

### 1. Trên Windows — Xử lý Màn hình Xanh SmartScreen (2 giây)

Khi chạy file cài đặt `.exe`, nếu xuất hiện bảng cảnh báo màu xanh *"Windows protected your PC"* (`Publisher: Unknown publisher`):

```text
┌────────────────────────────────────────────────────────┐
│ Windows protected your PC                              │
│ Microsoft Defender SmartScreen prevented an...         │
│                                                        │
│ [Bước 1] 👉 Bấm vào: "More info"                      │
│                                                        │
│ App: Aevum-OS-Setup-1.0.0-beta.6.exe                  │
│ Publisher: Unknown publisher                           │
│                                                        │
│          [Bước 2] 👉 [ Run anyway ]   [ Don't run ]    │
└────────────────────────────────────────────────────────┘
```

1. **Bước 1**: Nhấp chuột vào dòng chữ gạch chân **"More info"** (hoặc *Thông tin khác*).
2. **Bước 2**: Nút **"Run anyway"** (hoặc *Vẫn chạy*) sẽ xuất hiện ở góc dưới bên phải -> Bấm vào **"Run anyway"** để tiến hành cài đặt.

---

### 2. Trên macOS — Xử lý Cảnh báo Apple Gatekeeper

Trên macOS, nếu hệ thống hiển thị thông báo *"App cannot be opened because Apple cannot check it for malicious software"*:

- **Cách 1 (Nhanh nhất)**: Nhấn giữ phím **Control** (hoặc nhấp chuột phải) vào tệp ứng dụng `Aevum OS` -> Chọn **Open** trong menu -> Chọn tiếp **Open** ở hộp thoại xác nhận.
- **Cách 2 (Qua Cài đặt Hệ thống)**:
  1. Mở **System Settings** (Cài đặt hệ thống) -> chọn mục **Privacy & Security** (Quyền riêng tư & Bảo mật).
  2. Cuộn xuống phần **Security**, bạn sẽ thấy thông báo về việc `Aevum OS` bị chặn.
  3. Bấm vào nút **"Open Anyway"** (Vẫn mở) và nhập mật khẩu máy để xác nhận.

---

### Bước 2: Cài đặt và Đăng ký Lệnh CLI Toàn cầu

Aevum OS cung cấp công cụ dòng lệnh toàn cục hỗ trợ cả hai phương thức thiết lập:

#### Cách A: Đăng ký qua npm link
```bash
# Di chuyển vào thư mục Aevum-os
npm install
npm run build
npm link
```

#### Cách B: Thêm thư mục bin vào PATH (Hỗ trợ Dynamic Path)
Thêm đường dẫn thư mục `bin` của Aevum OS vào biến môi trường `PATH` của hệ điều hành. Thư mục này chứa sẵn các wrapper thông minh (`aevum.cmd`, `aevum.ps1`, `aevum`) tự động tìm vị trí cài đặt mà không phụ thuộc vào thư mục hiện tại.

```powershell
# Trên PowerShell:
$env:Path += ";D:\I2FLabs\Projects\Aevum-os\bin"
```

---

### Bước 3: Kiểm tra & Khởi tạo

Xác nhận lệnh `aevum` đã hoạt động và kiểm tra các tính năng chính:

```bash
# Kiểm tra trợ giúp và danh mục lệnh
aevum --help

# Kiểm tra phiên bản hệ thống hiện tại
aevum --version
# Kết quả: Aevum OS v1.0.0-beta.6 (Fastify v5 Daemon, Protocol: MCP 2024-11-05)

# Khởi tạo không gian làm việc Aevum cho dự án hiện tại
aevum init

# Kiểm tra trạng thái Daemon đang chạy
aevum status
```

> [!NOTE]
> Nếu Terminal của bạn chưa nhận dạng được lệnh `aevum`, hãy khởi động lại Terminal hoặc kiểm tra biến môi trường `PATH` của hệ thống để đảm bảo đường dẫn đã được cập nhật. Tra cứu thêm tại [Nhật ký Cập nhật](/changelog).
