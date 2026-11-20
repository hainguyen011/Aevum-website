# 🚀 Aevum MCP v1.8.0 - Hướng Dẫn Sử Dụng

Chúc mừng! Bạn đang sử dụng phiên bản Aevum mới nhất với máy chủ **Model Context Protocol (MCP)** đầy đủ tính năng. Điều này cho phép các Agent AI giao tiếp trực tiếp với môi trường VS Code của bạn để cộng tác trong thời gian thực.

## 📋 Điều Kiện Kiên Quyết
- Đã cài đặt Extension Aevum v1.3.2+ trong VS Code.
- Một Agent AI hỗ trợ giao thức MCP (ví dụ: Claude Desktop, Windsurf, hoặc các Agent tùy chỉnh bằng Python/JS).

## 🛠️ Bước 1: Kiểm Tra Trạng Thái Máy Chủ
Ngay khi bạn mở một dự án trong VS Code, Aevum sẽ tự động khởi động máy chủ MCP. Hãy kiểm tra cấu hình dự án của bạn:
1. Mở tệp: `.aevum/mcp.json`
2. Bạn sẽ thấy nội dung tương tự như sau:
```json
{
  "serverUrl": "http://localhost:3344/sse",
  "port": 3344,
  "status": "active",
  "version": "1.8.0"
}
```
> [!NOTE]
> Nếu cổng `3344` đã bị chiếm, Aevum sẽ tự động thử các cổng `3345`, `3346`, hoặc một cổng ngẫu nhiên. Hãy luôn kiểm tra `mcp.json` để biết URL đang hoạt động.

## 🤖 Bước 2: Cấu Hình Agent AI Của Bạn

### Sử Dụng Claude Desktop
Claude Desktop hiện tại chỉ hỗ trợ kết nối qua stdio. Aevum cung cấp một bridge tự động để chuyển đổi SSE sang stdio. Hãy thêm cấu hình sau vào tệp cấu hình Claude của bạn (`%APPDATA%/Claude/claude_desktop_config.json` trên Windows):

```json
{
  "mcpServers": {
    "aevum": {
      "command": "node",
      "args": [
        "ĐƯỜNG_DẪN_ĐẾN_DỰ_ÁN/out/mcp/sse_proxy.js",
        "http://localhost:3344/sse"
      ]
    }
  }
}
```
> [!TIP]
> Bạn có thể tìm thấy đường dẫn chính xác và lệnh đã được cấu hình sẵn trong tệp `.aevum/mcp_config.json` ngay trong thư mục dự án của bạn sau khi Aevum khởi động.
*(Thay thế `3344` bằng cổng thực tế trong tệp `mcp.json` của bạn)*.

### Sử Dụng Agent Tùy Chỉnh
Agent của bạn có thể kết nối bằng `@modelcontextprotocol/sdk` thông qua `SSEClientTransport`:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(new URL("http://localhost:3344/sse"));
const client = new Client({ name: "my-agent", version: "1.0.0" }, { capabilities: {} });
await client.connect(transport);
```

## 🛠️ Bước 3: Các Công Cụ & Tài Nguyên Có Sẵn (Polymorphic v2.0)
Sau khi kết nối, Agent của bạn sẽ có quyền truy cập vào 44 công cụ đa hình chuẩn:
- **`aevum_bridge_lifecycle`**: Kết nối và nạp ngữ cảnh bootstrap tức thì.
- **`aevum_session_lifecycle`**: Gửi báo cáo tiến độ thực thi Plan trở lại VS Code và nghiệm thu phiên.
- **`aevum_persona_manage`**: Đồng bộ danh tính và tính cách của Agent đang hoạt động.
- **`aevum_review_manage`**: Tham gia thảo luận trong các phiên Review Plan.

## 🔍 Khắc Phục Sự Cố
- **Máy chủ không hoạt động (inactive)**: Đảm bảo bạn đã mở một Workspace trong VS Code.
- **Kết nối bị từ chối**: Kiểm tra xem có phiên bản Aevum nào khác đang chạy hoặc tường lửa có chặn cổng không.
- **Xung đột cổng**: Kiểm tra `.aevum/mcp/port-config.json` để tùy chỉnh phạm vi cổng.

---
**Chúc bạn làm việc hiệu quả cùng Aevum & MCP!** 🌸💖🚀
