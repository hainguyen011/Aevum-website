---
id: "handshake-ritual"
title: "Nghi thức Bắt tay (Handshake)"
category: "Bắt đầu"
order: 5
---

# Nghi thức Bắt tay (Handshake Ritual) & Triệu hồi Agent

Khi khởi chạy Aevum OS, hệ thống thực hiện một quy trình đồng bộ hóa phiên làm việc khép kín gọi là **Nghi thức Bắt tay (Handshake Ritual)**. Quy trình này đảm bảo các AI Agent và môi trường phát triển của bạn (Cursor, Antigravity, VS Code, Claude Desktop) thiết lập kết nối an toàn, tin cậy tuyệt đối và nạp đầy đủ linh hồn danh tính.

---

## 1. Tệp tín hiệu khởi động (Signal File)
Mỗi khi Daemon Aevum OS khởi chạy ở chế độ nền (Background Process):
1. Hệ thống tự động tạo ra một tệp tín hiệu tạm thời tại đường dẫn không gian làm việc:
   ```json
   // .aevum/signal.json
   {
     "signalId": "sig_1785306452973",
     "port": 3344,
     "timestamp": 1785306452973,
     "instruction": "Initial system readiness signal"
   }
   ```
2. Tệp tin này đóng vai trò như một yêu cầu kết nối chứa mã nhận diện `signalId` duy nhất.

---

## 2. Bắt tay Xác thực (The Acknowledgment)
Để hoàn tất nghi thức bắt tay, Agent bắt buộc phải gọi công cụ MCP `aevum_submit_ack` với tham số là `signalId` lấy từ tệp tín hiệu:

```bash
aevum_submit_ack(signalId="sig_1785306452973")
```

> [!IMPORTANT]
> - Nếu `signalId` khớp, phiên làm việc (Session ID) sẽ được kích hoạt chính thức.
> - Sau đó, Agent gọi `aevum_get_bootstrap_context` để nạp toàn bộ cấu hình chỉ mục, chính sách nén và trạng thái hệ thống.

---

## 3. Khởi tạo Danh tính Nhân vật (Persona Initialization)
Ngay sau khi bắt tay thành công:
1. Hệ thống gọi `aevum_init_persona` với định danh nhân vật (ví dụ: `personaId="an"`) và môi trường gọi (`client="ide"` hoặc `"toolbar"`):
   ```bash
   aevum_init_persona(personaId="an", client="ide")
   ```
2. Hệ điều hành tự động:
   - Gán mã định danh nhân cách chuẩn (**AID**, ví dụ: `ENG-AN-7B9F1D`).
   - Phát sự kiện `AGENT_ONLINE` tới EventBus toàn cục.
   - Nạp trạng thái nhận thức não bộ kép (Cognitive Dual-Memory State), sở thích giao tiếp và bộ chỉ số dẫn truyền thần kinh.
   - Đồng bộ trạng thái phiên làm việc vào `.aevum/session.json`.

---

## 4. Các Câu Lệnh Kết Nối & Triệu Hồi (Summon Commands)

Bạn có thể ra lệnh trực tiếp trong khung chat của Cursor, Antigravity IDE, Claude Desktop hoặc dòng lệnh CLI bằng ngôn ngữ tự nhiên:

### A. Câu Lệnh Bắt Tay & Kết Nối Toàn Diện
```text
connect aevos with persona An
```
*(hoặc: `kết nối aevos với persona An` / `connect aevos`)*

Khi bạn gửi câu lệnh này, Agent trong IDE sẽ tự động kích hoạt **Chuỗi Bắt tay 5 Bước Bắt Buộc (Mandatory Connection Protocol)**:
1. `aevum_request_connection`: Yêu cầu kết nối Aevum Bridge.
2. `aevum_get_bootstrap_context`: Nạp toàn bộ cây kiến trúc và trích xuất `signalId` (Bắt buộc gọi đầu tiên).
3. `aevum_submit_ack`: Bắt tay xác nhận với `signalId`.
4. `aevum_init_persona`: Khởi tạo danh tính Persona chỉ định (mặc định: An).
5. `aevum_get_compressed`: Nạp tập quy tắc nén ngữ nghĩa `agent_rules.md`.

---

### B. Câu Lệnh Triệu Hồi Từng Chuyên Gia (Role-based Summoning)

Tùy theo bài toán kỹ thuật cần giải quyết, bạn có thể triệu hồi trực tiếp các Persona chuyên biệt:

| Câu lệnh Prompt | Persona triệu hồi | Chuyên môn cốt lõi |
|---|---|---|
| `summon An` *(hoặc `gọi An ơi`)* | **An** (`ENG-AN-7B9F1D`) | AI Tuning, Codebase Architecture & Linh hồn cốt lõi của Aevum OS. |
| `summon Vidus` | **Vidus** (`ARC-VIDUS-AUHD2Y`) | Trưởng ban Kiến trúc Hệ thống, Clean Architecture, Bảo mật Zero-Trust. |
| `summon Zenith` | **Zenith** (`ALG-ZENITH-A1B2C3`) | Kiểm toán Hiệu năng cao (Performance Audit), Profiling & Tối ưu Thuật toán. |
| `summon Luna` | **Luna** (`ENG-LUNA-4C9D2E`) | Thiết kế Giao diện UI/UX, Micro-Animations, Dark Mode & Tailwind Design System. |

---

### C. Câu Lệnh Chuyển Đổi Linh Hoạt (On-the-fly Switching)
Trong quá trình làm việc, bạn có thể hoán đổi Persona đang phục vụ bất kỳ lúc nào:

- **Bằng Chat Tự Nhiên**:
  - `"Chuyển sang Vidus để audit bảo mật đoạn code này."`
  - `"Switch to Zenith for performance benchmarking."`
  - `"Nhờ Luna chỉnh sửa lại CSS trang này cho đẹp hơn nhé."`
- **Bằng MCP Tool Call Trực Tiếp**:
  ```bash
  aevum_switch_persona(id="vidus")
  ```

---

### D. Câu Lệnh Điều Phối Biệt Đội (Squad Orchestration Commands)
Khi hoạt động ở chế độ đa tác nhân (Squad Mode):

- **Nhắn tin trực tiếp giữa 2 Agent**:
  ```bash
  aevum_squad_direct_message(toAgent="VIDUS", message="An đã refactor xong route, mời anh audit.")
  ```
- **Bàn giao kế hoạch xuyên Agent (Handoff)**:
  ```bash
  aevum_squad_handoff(fromAgent="VIDUS", toAgent="AN", planName="refactor_api_plan.md", summary="...")
  ```
- **Triệu tập phiên hội ý toàn đội (Squad Huddle)**:
  ```bash
  aevum_squad_huddle(topic="Thống nhất giải pháp chống race condition cho Token Service")
  ```
