---
id: "cli-terminal"
title: "Giao diện Dòng lệnh (CLI)"
category: "Hướng dẫn"
order: 5
---

# Giao diện Dòng lệnh Toàn diện (Aevum CLI Engine)

Aevum OS cung cấp bộ công cụ dòng lệnh (**Aevum CLI**) độc lập, siêu tốc được viết bằng TypeScript và tối ưu hóa trên Node.js runtime. CLI cho phép kỹ sư khởi tạo dự án, giám sát sức khỏe hệ thống, quản lý cấu hình và điều phối MCP Daemon song song với giao diện Desktop GUI.

Toàn bộ cú pháp CLI tuân thủ tiêu chuẩn POSIX/GNU chuyên nghiệp:
* Hỗ trợ đầy đủ cờ ngắn (`-w`, `-p`, `-t`, `-v`, `-h`) và cờ dài tương ứng.
* Phân giải đường dẫn động (Dynamic Path Resolution) cho phép thực thi từ bất kỳ thư mục nào.
* Định dạng đầu ra ANSI màu sắc rõ nét, hỗ trợ cờ `--json` để tích hợp vào script CI/CD.

---

## 1. Kích hoạt Toàn cục (Global Activation)

Khi cài đặt Desktop App của Aevum OS (Windows/macOS), lệnh `aevum` được tự động đăng ký vào biến môi trường PATH toàn cục. Bạn có thể mở Terminal và kiểm tra ngay:

```bash
aevum --version
# Output: Aevum OS {{AEVUM_VERSION}} (Fastify v5 Daemon, Protocol: MCP 2024-11-05)
```

---

## 2. Bảng Tham chiếu Lệnh Chi tiết (Command Reference)

### `aevum [options]` — Khởi chạy MCP Daemon
Khi chạy `aevum` không kèm lệnh con, hệ thống tự động khởi động **Fastify Core Daemon**:

```bash
# Chạy máy chủ SSE mặc định (Port {{FASTIFY_PORT}}, Thư mục hiện tại)
aevum

# Chỉ định đường dẫn không gian làm việc và cổng tùy chọn
aevum --workspace D:/I2FLabs/Projects/MyProject --port {{FASTIFY_PORT}} --transport sse

# Dạng cờ ngắn POSIX gọn gàng:
aevum -w D:/MyProject -p {{FASTIFY_PORT}} -t sse

# Chạy ở chế độ Stdio dành cho IDE spawn trực tiếp dạng child-process:
aevum -w ./ -t stdio
```

---

### `aevum init [dir]` — Khởi tạo Không gian Nhận thức Aevum
Tạo cấu trúc thư mục nhận thức `.aevum/` trong dự án mà không can thiệp hay làm biến đổi bất kỳ tệp code hiện hữu nào của bạn:

```bash
# Khởi tạo ngay tại thư mục hiện tại:
aevum init

# Khởi tạo tại đường dẫn dự án cụ thể:
aevum init ./backend-service
```

**Các tài nguyên được sinh ra:**
* `.aevum/domains/`: Cây phân rã tính năng theo chuẩn Organismic Domain-Driven Design (O-DDD).
* `.aevum/index.json`: Tệp chỉ mục định vị cấu trúc dự án.
* `.aevum/signal.json`: Tín hiệu bắt tay bảo mật cho phiên làm việc.
* `.aevum/memory/`: Kho lưu trữ bộ nhớ nhận thức cục bộ.

---

### `aevum status` — Giám sát Tiến trình & Sức khỏe Daemon
Kết nối tới Daemon đang hoạt động qua cổng HTTP nội bộ để kiểm tra nhịp sống (uptime, port, active persona, connected clients):

```bash
# Kiểm tra cổng mặc định {{FASTIFY_PORT}}
aevum status

# Kiểm tra cổng tùy chỉnh
aevum status --port 8080
```

**Mẫu kết quả hiển thị:**
```text
┌────────────────────────────────────────────────────────┐
│ Aevum OS Fastify Daemon Status                         │
├──────────────────────┬─────────────────────────────────┤
│ Connection Status    │ ONLINE (Port {{FASTIFY_PORT}}, Transport: SSE)│
│ Core Engine          │ Fastify v5.1.0 + TypeBox JIT    │
│ Active Persona       │ An (ENG-AN-7B9F1D, Level 13)    │
│ Workspace Root       │ D:/I2FLabs/Projects/Aevum-os    │
│ Uptime               │ 14 giờ 28 phút 12 giây          │
│ Tools Ecology        │ {{MCP_TOOLS_COUNT}} MCP Registered Tools        │
│ Memory Vault State   │ OK (SQLite + Vector In-Memory)  │
└──────────────────────┴─────────────────────────────────┘
```

---

### `aevum gui` — Mở Bảng điều khiển Desktop Control Center
Kích hoạt giao diện đồ họa Electron Desktop từ dòng lệnh:

```bash
aevum gui
```

---

### `aevum ping` — Kiểm tra Nhanh Tình trạng Lắng nghe
Gửi yêu cầu ping siêu nhẹ với phản hồi dưới 1ms:

```bash
aevum ping
# Output: pong (Aevum Fastify Daemon is healthy)
```

---

## 3. Bảng Tham chiếu Cờ Lệnh & Tùy chọn (Options & Flags)

| Cờ ngắn | Cờ dài | Mặc định | Ý nghĩa & Hành vi |
|---|---|---|---|
| `-w` | `--workspace <path>` | `process.cwd()` | Đường dẫn tuyệt đối hoặc tương đối tới không gian làm việc của dự án. |
| `-t` | `--transport <sse \| stdio>` | `sse` | Giao thức truyền thông (`sse` cho HTTP Server đa client, `stdio` cho IDE subprocess). |
| `-p` | `--port <number>` | `{{FASTIFY_PORT}}` | Cổng mạng lắng nghe của máy chủ Fastify HTTP/SSE. |
| `-h` | `--help` | — | Hiển thị bảng hướng dẫn cú pháp và trợ giúp chi tiết. |
| `-v` | `--version` | — | Hiển thị phiên bản chính thức, giao thức MCP và thông số runtime. |
| `--verbose` | `--verbose` | `false` | Bật chế độ ghi nhật ký chi tiết cho toàn bộ các cuộc gọi JSON-RPC. |

---

## 4. Các Biến Môi trường Hệ thống (Environment Variables)

Bạn có thể cấu hình sẵn các thông số mặc định qua biến môi trường thay vì truyền cờ mỗi lần gõ lệnh:

```bash
# Cổng mặc định của Aevum Fastify Daemon
export AEVUM_PORT={{FASTIFY_PORT}}

# Giao thức truyền thông mặc định
export AEVUM_TRANSPORT=sse

# Đường dẫn không gian làm việc cố định
export AEVUM_WORKSPACE="D:/I2FLabs/Projects/MyProject"

# Mức độ chi tiết của hệ thống ghi log (debug, info, warn, error)
export AEVUM_LOG_LEVEL=info
```

---

## 5. Các Kịch bản Tự động hóa Điển hình (Dev Recipes)

### Kịch bản 1: Khởi chạy Nền trong Script Khởi động Dự án
```json
// package.json
{
  "scripts": {
    "dev": "concurrently \"aevum -t sse -p {{FASTIFY_PORT}}\" \"vite\""
  }
}
```

### Kịch bản 2: Kiểm tra Tiền Điều kiện trong CI/CD Pipeline
```bash
# Xác nhận cấu trúc .aevum không bị lỗi format trước khi merge PR
aevum status || exit 1
```
