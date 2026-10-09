---
id: "cli-terminal"
title: "Giao diện Dòng lệnh (CLI)"
category: "Hướng dẫn"
order: 3
---

# Giao diện Dòng lệnh Toàn diện (Aevum CLI Engine)

Aevum OS cung cấp bộ công cụ dòng lệnh (**Aevum CLI**) độc lập, siêu tốc được xây dựng trực tiếp trên nền Node.js và TypeScript. CLI cho phép bạn tương tác, khởi tạo và điều phối hệ thống song song với giao diện đồ họa Desktop GUI.

Toàn bộ giao diện CLI được thiết kế theo tiêu chuẩn Unix/GNU chuyên nghiệp:
- Hỗ trợ đầy đủ cờ lệnh ngắn (POSIX) và cờ lệnh dài (GNU) như `-w`, `-t`, `-p`, `-h`, `-v`.
- Phân giải đường dẫn động (Dynamic Path Resolution) cho phép đứng ở bất kỳ thư mục dự án nào để thực thi.
- Màu sắc ANSI chuẩn Terminal, hiển thị trực quan không ký tự thừa.

---

## Cài đặt & Kích hoạt Toàn cục (Global CLI)

### Cách 1: Sử dụng npm link (Khuyến nghị)
Từ thư mục gốc dự án Aevum OS:
```bash
npm run build
npm link
```
Lệnh `aevum` sẽ được đăng ký vào biến môi trường hệ thống và có thể gọi từ bất kỳ cửa sổ Terminal nào.

### Cách 2: Thêm thư mục bin vào biến môi trường PATH
Aevum OS cung cấp sẵn các tệp thực thi wrapper thông minh trong thư mục `bin/`:
- `bin/aevum.cmd`: Dành cho Windows Command Prompt (`cmd.exe`)
- `bin/aevum.ps1`: Dành cho Windows PowerShell
- `bin/aevum`: Dành cho Linux / macOS Shell (`bash`, `zsh`)

Chỉ cần thêm đường dẫn thư mục `bin` vào biến môi trường `PATH` của người dùng:
```powershell
# Ví dụ trên Windows PowerShell:
$env:Path += ";D:\I2FLabs\Projects\Aevum-os\bin"
```

---

## Danh mục Lệnh Chi tiết (Command Reference)

### 1. `aevum --help` / `aevum -h` — Hướng dẫn Sử dụng
Hiển thị danh sách đầy đủ các câu lệnh con (subcommands), các cờ tùy chọn (options) và cú pháp thực thi mẫu.

```bash
aevum --help
# hoặc:
aevum -h
aevum help
```

---

### 2. `aevum --version` / `aevum -v` — Kiểm tra Phiên bản
Kiểm tra phiên bản hiện tại của Aevum OS (phiên bản mới nhất: [v1.0.0-beta.6](/changelog)), môi trường Node.js và kiến trúc hệ thống.

```bash
aevum --version
# hoặc:
aevum -v
aevum version
```

> [!NOTE]
> Mọi thay đổi về tính năng và sửa lỗi của các phiên bản được cập nhật liên tục tại [Nhật ký Cập nhật](/changelog).

---

### 3. `aevum status` — Giám sát Tiến trình Daemon
Kết nối trực tiếp tới Aevum Daemon đang chạy ngầm thông qua cổng HTTP (`/api/ping`) để kiểm tra trạng thái sức khỏe, thời gian hoạt động (uptime), Persona đang trực chiến và không gian làm việc.

```bash
# Kiểm tra daemon trên cổng mặc định (3344)
aevum status

# Kiểm tra daemon trên cổng tùy chỉnh
aevum status --port 8080
# hoặc cờ ngắn:
aevum status -p 8080
```

Thông tin trả về:
- Trạng thái kết nối (ONLINE / OFFLINE)
- Phiên bản Aevum OS Daemon
- Thời gian hoạt động (Uptime tính bằng giây)
- Nhân vật đang hoạt động (Active Persona: An, Luna, Vidus...)
- Cổng giao tiếp và thư mục không gian làm việc đang gắn kết

---

### 4. `aevum init [dir]` — Khởi tạo Không gian Làm việc Mới
Tự động khởi tạo cấu trúc thư mục nhận thức `.aevum/` cho một dự án mã nguồn bất kỳ mà không làm ảnh hưởng đến mã nguồn hiện tại của bạn.

```bash
# Khởi tạo ngay tại thư mục hiện tại:
aevum init

# Khởi tạo tại một thư mục dự án cụ thể:
aevum init ./my-new-project
```

Các tài nguyên được khởi tạo tự động:
- Thư mục `.aevum/domains/` theo kiến trúc Domain-Driven Design (DDD).
- Tệp chỉ mục cấu trúc `.aevum/index.json`.
- Cấu hình bắt tay bảo mật `.aevum/signal.json`.
- Kho bộ nhớ sống `.aevum/memory/`.

---

### 5. `aevum gui` — Khởi chạy Giao diện Đồ họa Desktop
Khởi chạy hoặc đánh thức ứng dụng Aevum OS Desktop Control Center (Electron) trực tiếp từ dòng lệnh.

```bash
aevum gui
```

---

### 6. Khởi chạy Daemon Máy chủ MCP (Daemon Mode)
Khi chạy lệnh `aevum` kèm các tham số giao vận (hoặc không truyền subcommand), hệ thống sẽ khởi động máy chủ Fastify MCP Daemon để phục vụ các IDE khách (Cursor, Claude Desktop, Antigravity IDE):

```bash
# Chạy máy chủ SSE trên cổng mặc định (3344) tại thư mục hiện tại:
aevum

# Chỉ định cổng và thư mục không gian làm việc cụ thể:
aevum --workspace D:/MyProject --port 3344 --transport sse

# Sử dụng cờ ngắn POSIX gọn gàng:
aevum -w D:/MyProject -p 3344 -t sse

# Chạy ở chế độ Stdio (dành cho client chạy dạng process con trực tiếp):
aevum -w ./ -t stdio
```

---

## Bảng Tham chiếu Cờ Lệnh (Options & Flags)

| Cờ ngắn | Cờ dài | Giá trị mặc định | Mô tả chức năng |
|---|---|---|---|
| `-w` | `--workspace <path>` | Thư mục hiện tại (`process.cwd()`) | Đường dẫn tuyệt đối hoặc tương đối tới không gian làm việc dự án. |
| `-t` | `--transport <sse / stdio>` | `sse` | Giao thức giao vận MCP (`sse` cho HTTP Server hoặc `stdio` cho dòng lệnh trực tiếp). |
| `-p` | `--port <number>` | `3344` | Cổng mạng lắng nghe kết nối của Fastify HTTP/SSE server. |
| `-h` | `--help` | — | Hiển thị bảng trợ giúp và hướng dẫn chi tiết. |
| `-v` | `--version` | — | Hiển thị phiên bản ứng dụng ([v1.0.0-beta.6](/changelog)) và thông số runtime. |

---

## Luồng Thực chiến Điển hình (Developer Workflows)

### Workflow 1: Gắn kết Aevum vào Dự án Hiện hữu
```bash
# 1. Di chuyển vào thư mục dự án
cd /d/Projects/my-app

# 2. Khởi tạo cấu trúc Aevum
aevum init

# 3. Khởi chạy MCP Daemon trong nền
aevum -t sse -p 3344
```

### Workflow 2: Kiểm tra Tiến trình & Nhịp sống Daemon
```bash
aevum status
```

### Workflow 3: Mở Bảng điều khiển Desktop song song
```bash
aevum gui
```
