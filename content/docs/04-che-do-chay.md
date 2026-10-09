---
id: "che-do-chay"
title: "Chế độ hoạt động"
category: "Hướng dẫn"
order: 4
---

# Các Chế độ Hoạt động của Aevum OS

Aevum OS hỗ trợ cả giao diện dòng lệnh (CLI) hiệu năng cao lẫn giao diện đồ họa máy tính để bàn (Electron Desktop GUI) trực quan, có thể hoạt động độc lập hoặc kết hợp song song.

---

## Chế độ A: Command Line Interface (CLI)

Giao diện CLI của Aevum OS cung cấp các lệnh quản trị, khởi tạo dự án, kiểm tra nhịp sống và chạy daemon. Chi tiết đầy đủ xem tại [Giao diện Dòng lệnh (CLI)](#cli-terminal).

### 1. Server-Sent Events (SSE) Mode (Fastify Daemon Mặc định)
Chạy Aevum như một HTTP/SSE server dựa trên **Fastify v4** siêu tốc để quản lý không gian làm việc được chỉ định. Đây là chế độ tiêu chuẩn khi bạn muốn các IDE khách (Cursor, Claude Desktop, Antigravity) kết nối qua giao vận SSE.

```bash
aevum --workspace <duong_dan_project> --transport sse --port 3344
# Hoặc cú pháp rút gọn POSIX:
aevum -w <duong_dan_project> -t sse -p 3344
```

*Lưu ý:*
- Nếu bỏ qua tham số `-w / --workspace`, máy chủ sẽ mặc định chọn thư mục chạy lệnh hiện tại (`process.cwd()`).
- Nếu bỏ qua tham số `-p / --port`, cổng mặc định được sử dụng sẽ là `3344`.
- Nếu bỏ qua tham số `-t / --transport`, giao thức mặc định sẽ là `sse`.

### 2. Stdio Mode
Chạy máy chủ MCP giao tiếp qua dòng vào/ra chuẩn (stdio). Chế độ này thường được sử dụng bởi các IDE cục bộ chạy Aevum như một tiến trình con (child process) trực tiếp.

```bash
aevum --workspace <duong_dan_project> --transport stdio
# Hoặc cú pháp rút gọn POSIX:
aevum -w <duong_dan_project> -t stdio
```

### 3. Kiểm tra Trạng thái Daemon (Status Command)
Thay vì sử dụng curl thủ công, bạn có thể kiểm tra trực tiếp trạng thái tiến trình nền bằng lệnh:

```bash
aevum status
```

---

## Chế độ B: Desktop Control Center (Electron GUI)

Khởi chạy ứng dụng máy tính để bàn đầy đủ với giao diện trực quan cao cấp bằng lệnh:

```bash
aevum gui
# hoặc:
npm run gui
```

Hoặc mở trực tiếp ứng dụng **Aevum OS** từ biểu tượng trên máy tính.

### Các Không gian Làm việc Chính trong Desktop App:
- **Workspace Dashboard**: Quản lý cấu hình dự án, chuyển đổi MCP server, theo dõi chỉ số sức khỏe codebase và logs thời gian thực.
- **Agent Chat View**: Trò chuyện trực tiếp cùng các Persona (An, Luna, Vidus...) kèm bộ chọn mô hình động (**Dynamic Model Selector**) linh hoạt chuyển đổi giữa Gemini 3.7 Flash, Claude, GPT.
- **Research Space & Skill Tree**: Không gian khám phá tri thức tương tác với đồ thị phân cấp Dagre & React Flow, trình đọc bài báo học thuật Markdown và bảng theo dõi EXP.
- **Architecture Canvas**: Bảng vẽ không gian kiến trúc DDD hỗ trợ xoay, thu phóng và điều hướng mượt mà.
