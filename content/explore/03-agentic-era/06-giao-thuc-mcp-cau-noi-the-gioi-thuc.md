---
id: "giao-thuc-mcp-cau-noi-the-gioi-thuc"
title: "Giao Thức MCP (Model Context Protocol): Chuẩn Mực Mở Cho Phép Agent Kết Nối Vạn Vật"
coverImage: "/media/7c9853f453cc1123e6b41db03292d945.jpg"
category: "Kỷ nguyên Agentic"
targetAudience: "Lập trình viên, AI Engineers, System Architects"
readTime: "8 phút"
level: "Nâng cao"
tags:
  - "MCP"
  - "Giao thức mở"
  - "Model Context Protocol"
  - "Bảo mật Sandbox"
author:
  id: "hawl"
  name: "Hawl"
  role: "Security Architect & Cryptanalysis Specialist"
  aid: "VOD-HAC-9X0F2E"
  motto: "Một giao thức mở chỉ thực sự mạnh mẽ khi nó cung cấp quyền năng tối thượng đi kèm với cơ chế bảo mật nghiêm ngặt nhất."
summary: "Phân tích kiến trúc Client - Host - Server của chuẩn giao thức MCP (Model Context Protocol): Cổng kết nối USB-C của kỷ nguyên AI cho phép Agent truy cập dữ liệu, cơ sở dữ liệu và công cụ an toàn."
order: 6
---

# Giao Thức MCP (Model Context Protocol): Chuẩn Mực Mở Cho Phép Agent Kết Nối Vạn Vật

Trước cuối năm 2024, mỗi khi nhà phát triển muốn kết nối một mô hình AI với một công cụ bên ngoài (như GitHub, Slack, cơ sở dữ liệu Postgres hay tệp cục bộ), họ phải viết một đoạn mã tích hợp riêng biệt (Custom Tool Calling). 

Điều này dẫn đến tình trạng hỗn loạn kiểu **\"N x M Integration Problem\"**: Nếu có N mô hình AI và M công cụ, cộng đồng phải duy trì N x M cầu nối khác nhau. Chỉ một thay đổi nhỏ về API từ nhà cung cấp cũng làm gãy toàn bộ chuỗi tích hợp.

Sự xuất hiện của **Model Context Protocol (MCP)** do Anthropic khởi xướng đã giải quyết triệt để vấn đề này, trở thành **\"Chuẩn cổng cắm USB-C của Kỷ nguyên AI\"**.

---

## 1. Kiến Trúc 3 Tầng: Host, Client & Server

Giao thức MCP được thiết kế theo mô hình phân tách trách nhiệm rõ ràng:

```
┌────────────────────────────────────────────────────────┐
│ 1. MCP HOST (Môi trường máy trạm: Aevum OS / IDE)     │
│    ├── Điều phối phiên, quản lý khóa bảo mật API       │
│    └── Hiển thị giao diện xin quyền phê duyệt          │
├────────────────────────────────────────────────────────┤
│ 2. MCP CLIENT (Não bộ AI: Agent / Persona)             │
│    ├── Khám phá danh sách công cụ (Tools Discovery)     │
│    └── Gửi yêu cầu gọi hàm chuẩn hóa JSON-RPC 2.0      │
├────────────────────────────────────────────────────────┤
│ 3. MCP SERVER (Dịch vụ cung cấp tài nguyên)            │
│    ├── Server SQLite / Postgres (Truy vấn DB)          │
│    ├── Server GitHub / Git (Quản lý mã nguồn)          │
│    └── Server Filesystem (Đọc ghi tệp tin)             │
└────────────────────────────────────────────────────────┘
```

- **MCP Host**: Ứng dụng mà người dùng tương tác trực tiếp (như Aevum OS Daemon, Antigravity IDE). Host chịu trách nhiệm khởi chạy các tiến trình Server và đóng vai trò chốt chặn bảo mật.
- **MCP Client**: Agent gửi các truy vấn ngữ cảnh (Prompts, Resources) và yêu cầu gọi công cụ (Tool Invocations).
- **MCP Server**: Các chương trình độc lập, gọn nhẹ, phơi bày các khả năng (Capabilities) thông qua giao thức truyền thông chuẩn hóa qua `stdio` (tiêu chuẩn đầu vào/đầu ra) hoặc `SSE` (Server-Sent Events qua HTTP).

---

## 2. Ba Trụ Cột Năng Lực Của MCP

Một MCP Server có thể cung cấp 3 loại tài nguyên nguyên tử:

1. **Prompts (Mẫu hướng dẫn tương tác)**: Các kịch bản prompt được chuẩn hóa từ phía server để Agent hiểu cách tương tác với hệ thống nghiệp vụ phức tạp.
2. **Resources (Tài nguyên dữ liệu tĩnh & động)**: Đọc nội dung tệp, tài liệu hướng dẫn, log máy chủ hoặc schema cơ sở dữ liệu mà không cần Agent phải tự mò mẫm.
3. **Tools (Công cụ thực thi hành động)**: Các hàm có thể thay đổi trạng thái thế giới thực (như tạo branch mới trên Git, gửi tin nhắn Slack, chạy migration SQL).

---

## 3. Nguyên Tắc Bảo Mật Quyền Tối Thiểu (Least Privilege & Sandboxing)

Trao cho Agent quyền gọi công cụ đồng nghĩa với việc đối mặt với rủi ro Prompt Injection độc hại từ văn bản bên ngoài. Vì vậy, kiến trúc MCP trong Aevum OS bắt buộc thực thi ba rào chắn:
- **Xác thực từng quyền hạn (Granular Tool Permissions)**: Agent chỉ được phép truy cập vào thư mục làm việc chỉ định, không bao giờ có quyền quét toàn bộ ổ cứng `C:\` hay `/root`.
- **Cơ chế Phê duyệt Tức thời (Human Confirmation)**: Bất kỳ công cụ nào mang tính phá hủy (như xóa cơ sở dữ liệu hoặc push đè commit Git) đều bắt buộc phải hiển thị hộp thoại xác nhận trực tiếp cho Master phê duyệt.
