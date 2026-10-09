---
id: "gioi-thieu"
title: "Giới thiệu chung"
category: "Bắt đầu"
order: 1
---

# Tổng quan về Aevum OS

**Aevum OS** đại diện cho một bước đột phá kiến trúc trong việc quản lý ngữ cảnh (Context), bộ nhớ nhận thức (Cognitive Memory) và điều phối đa tác nhân (Multi-Agent Orchestration) cho các AI Agent. 

Bằng cách tách biệt công cụ quản lý ngữ cảnh cốt lõi, quy trình lập kế hoạch, không gian nghiên cứu chuyên sâu và đồ thị kiến thức tự phục hồi ra khỏi môi trường biên dịch (editor runtime) của VS Code, Aevum OS hoạt động như một máy chủ **Model Context Protocol (MCP)** độc lập toàn diện với **98 công cụ chuyên dụng**.

> [!NOTE]
> **Phiên bản mới nhất**: [Aevum OS v1.0.0-beta.6](/changelog) — Bản nâng cấp Fastify v5 Core, OpenAPI 3.1 Tool Discovery, WebSocket nhị phân Zero-Copy và W3C Distributed Tracing. Xem chi tiết tại [Nhật ký Cập nhật](/changelog).

---

## Mô hình Kiến trúc Tổng quan (System Topology)

```text
┌──────────────────────────────────────────────────────────────────┐
│         IDE & Chat Clients (Cursor, Antigravity, Claude)         │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ JSON-RPC / MCP Protocol (Stdio & SSE)
┌────────────────────────────────▼─────────────────────────────────┐
│         Aevum OS Fastify Core Daemon (Port 3344)                 │
│  ├── 98 MCP Specialized Tools & Dynamic Resources                │
│  ├── Cognitive Dual-Memory (STM & Vector/SQLite LTM)             │
│  ├── Multi-Tier Workspace Reflex Engine (2-Hop BFS)              │
│  ├── PiperNet Mesh (IoA P2P Encrypted Telepathy)                 │
│  └── Living Blackboard Hub (OCC Version Lock)                    │
└────────────────────────────────┬─────────────────────────────────┘
                                 │ WebSockets / IPC
┌────────────────────────────────▼─────────────────────────────────┐
│       Electron Desktop Control Center (Control, Graph & Logs)    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Các Điểm Đột Phá Cốt Lõi

### 1. Giao thức Chuẩn hóa Đỉnh cao (MCP-First Architecture)
Aevum OS triển khai hoàn chỉnh đặc tả Model Context Protocol chính thức với 98 công cụ, tài nguyên và prompts được tổ chức theo module. Bất kỳ mô hình LLM nào (Gemini, Claude, GPT, v.v.) kết nối vào hệ thống đều có thể đọc hiểu cấu trúc dự án, quản lý bộ nhớ dài hạn, tương tác terminal và phối hợp cùng các Agent khác.

### 2. Môi trường Chạy Độc lập Siêu tốc (Decoupled Fastify v5 Core)
Bằng cách đánh chặn và giả lập động các dependency của editor host (như namespace `vscode`) trong quá trình phân giải module, công cụ ngữ cảnh lõi có thể chạy tự nhiên trên Node.js với nền tảng **Fastify v5** hiệu năng cao kết hợp TypeBox JIT. Điều này đảm bảo khả năng tách biệt hoàn toàn khỏi GUI của IDE và cho phép triển khai máy chủ từ xa (Remote Server).

### 3. Điều phối Đa Client Đồng thời (Multi-Client Orchestration)
Công cụ tự động cấu hình và đàm phán của Aevum OS cho phép kết nối đồng thời và an toàn giữa nhiều IDE khách nhau bao gồm Cursor, Claude Desktop, và Antigravity IDE thông qua một daemon duy nhất với cơ chế auto-registration thông minh.

### 4. Não bộ Kép & Động cơ Phản xạ (Cognitive Dual-Memory & Reflex Engine)
Hệ thống kết hợp bộ nhớ ngắn hạn (STM) và dài hạn (LTM), mạng nơ-ron xung LIF (Spiking Recall), vi đo đạc chất dẫn truyền thần kinh (Dopamine, Noradrenaline, Serotonin) cùng động cơ phản xạ không gian làm việc (Multi-Tier Workspace Reflex Engine) dựa trên topo 2-Hop Bounded BFS.

### 5. Không gian Nghiên cứu Tự trị & Chòm sao Kỹ năng (Autonomous Research Space)
Không gian nghiên cứu độc lập với cây kỹ năng tương tác (React Flow & Dagre), phân nhánh nghiên cứu đệ quy, phân tầng độ tin cậy nguồn tin, tự động tổng hợp báo cáo kỹ thuật theo chuẩn IEEE/ACM v2.1 và quy trình 1-click thăng cấp thành Engineering Plan thực thi.

### 6. Bảng điều khiển Máy tính để bàn (Desktop Control Center)
Giao diện máy tính để bàn (Desktop Dashboard) tối giản chạy bằng Electron mang phong cách tối sang trọng, tích hợp Agent Chat View với Dynamic Model Selector, Panning Architecture Canvas, và trình theo dõi nhật ký hoạt động trực tiếp.
