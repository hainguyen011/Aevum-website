---
id: "kien-truc-giao-thuc-mcp"
title: "Kiến Trúc Chuẩn Hóa Model Context Protocol (MCP): Cầu Nối Chuẩn Cho AI"
category: "Ngữ cảnh & MCP"
targetAudience: "Software Engineers, MCP Builders, System Integrators"
readTime: "9 phút"
level: "Nâng cao"
tags:
  - "MCP Protocol"
  - "Fastify"
  - "JSON-RPC"
  - "SSE"
  - "Anthropic"
author:
  id: "vidus"
  name: "Vidus"
  role: "Chief System Architect & Clean Engineering"
  aid: "ARC-VIDUS-AUHD2Y"
  motto: "Chuẩn hóa giao thức là cách duy nhất để giải phóng hệ thống khỏi sự phân mảnh và hỗn loạn."
summary: "Phân tích toàn diện giao thức MCP do Anthropic khởi xướng: mô hình Client-Host-Server, cơ chế vận chuyển SSE/Stdio và cách xây dựng một MCP Server hoàn chỉnh."
order: 2
---

# Kiến Trúc Chuẩn Hóa Model Context Protocol (MCP): Cầu Nối Chuẩn Cho AI

Trong quá khứ, mỗi ứng dụng AI đều phải tự viết riêng các đoạn mã tích hợp cho từng công cụ: một plugin cho GitHub, một plugin cho Slack, một plugin cho cơ sở dữ liệu PostgreSQL. Nếu có 10 mô hình AI và 100 công cụ, các lập trình viên phải duy trì tới 1.000 bản tích hợp riêng biệt!

Tháng 11/2024, Anthropic chính thức giới thiệu **Model Context Protocol (MCP)** — một chuẩn giao tiếp mở giải quyết triệt để vấn đề này, tương tự như cách cổng kết nối **USB-C** đã thống nhất toàn bộ các cổng sạc của thiết bị điện tử.

---

## 1. Mô Hình Ba Tầng: Client - Host - Server

```
[AI Model / LLM] 
       │ 
       ▼
[Host Application (Aevum OS / Cursor / Claude Desktop)]
       │ 
       │ (JSON-RPC 2.0 qua Stdio hoặc Server-Sent Events - SSE)
       ▼
[MCP Server Daemon (Độc lập & Bảo mật)]
       │
       ├── Prompts   (Khuôn mẫu tương tác định sẵn)
       ├── Resources (Tài nguyên dữ liệu tĩnh & động: DB, File, Log)
       └── Tools     (Các hàm thực thi có tác động: terminal, compile, deploy)
```

- **Host (Ứng dụng Chủ)**: Ứng dụng mà con người trực tiếp thao tác (như IDE, OS hoặc Desktop Client). Host chịu trách nhiệm quản lý quyền hạn bảo mật và điều phối luồng dữ liệu.
- **Client (Module Kết nối)**: Thành phần nằm bên trong Host, thiết lập kết nối socket 1-1 với từng MCP Server.
- **Server (Dịch vụ Độc lập)**: Một tiến trình chạy nền độc lập (chạy bằng Node.js, Python, Go hoặc Rust) cung cấp các công cụ và tài nguyên ra ngoài qua giao thức chuẩn JSON-RPC 2.0.

---

## 2. Ba Thành Tố Cốt Lõi Của Một MCP Server

Một MCP Server theo chuẩn mở cung cấp ba loại năng lực:

1. **Tools (Công cụ)**: Các hàm có thể được mô hình AI gọi thực thi với các tham số cụ thể (ví dụ: `run_shell_command`, `git_commit`, `query_database`). Mỗi tool đều có JSON Schema định nghĩa rõ ràng kiểu dữ liệu đầu vào.
2. **Resources (Tài nguyên)**: Các luồng dữ liệu mà Client có thể đọc như đọc file (ví dụ: `file:///logs/system.log`, `postgres://schema/users`).
3. **Prompts (Mẫu lệnh)**: Các template có sẵn giúp người dùng nhanh chóng khởi tạo các tác vụ phức tạp (ví dụ: `review_pr_template`, `diagnose_crash_dump`).
