---
id: "plan-lifecycle"
title: "Vòng đời Kế hoạch (Plan Lifecycle)"
category: "Phát triển"
order: 9
---

# Vòng đời Kế hoạch (Plan Lifecycle)

Trong triết lý phát triển của Aevum OS, mọi thay đổi phức tạp trên hệ thống đều phải tuân thủ nghiêm ngặt **Vòng đời Kế hoạch (Plan Lifecycle)** để đảm bảo an toàn, minh bạch và có thể kiểm soát.

---

## 1. Các Giai đoạn của Kế hoạch

```
[1. Phác thảo (Draft)] ──► [2. Phỏng vấn (Grill)] ──► [3. Phê duyệt (Approval)]
                                                             │
                                                             ▼
[5. Nghiệm thu & Thu hoạch] ◄── [4. Thực thi (Anchoring)] ◄──┘
```

### Giai đoạn 1: Phác thảo Kế hoạch (Drafting)
Agent tiến hành nghiên cứu codebase và khởi tạo kế hoạch thông qua công cụ:
```bash
aevum_create_plan(
  domainId="core",
  featureId="auth",
  planName="JWT Token Refresh V2",
  overview="Tái cấu trúc pipeline cấp mới access token để phòng ngừa race condition"
)
```

### Giai đoạn 2: Phỏng vấn & Đồng thuận (The Grill Session)
Người dùng có thể kích hoạt chế độ phỏng vấn sâu bằng lệnh `/grill-me`. Agent sẽ đặt câu hỏi làm rõ các điểm mơ hồ về kiến trúc, bảo mật và ràng buộc kỹ thuật trước khi chốt phương án.

### Giai đoạn 3: Phê duyệt (Approval Gate)
Bản kế hoạch hoàn chỉnh được trình bày trong file kế hoạch (`implementation_plan.md`). Người dùng nhấn nút **Proceed** trên giao diện IDE hoặc chấp thuận bằng tin nhắn chat. Trạng thái kế hoạch chính thức chuyển sang `approved`.

### Giai đoạn 4: Thực thi & Định vị Code (Task Anchoring)
Agent bắt đầu viết code. Mỗi đầu việc trong kế hoạch được đồng bộ trực tiếp với dòng mã nguồn:
```markdown
- [ ] [src/auth/TokenService.ts:145] Triển khai distributed mutex lock
```
Hệ thống tự động cập nhật tiến độ live lên Desktop Control Center thông qua `aevum_update_plan_step`.

### Giai đoạn 5: Nghiệm thu & Thu hoạch Bằng chứng (Harvesting)
Sau khi hoàn tất kiểm thử:
1. Agent lưu bằng chứng thực thi qua `aevum_capture_evidence`.
2. Gửi báo cáo tiến độ cuối cùng qua `aevum_submit_report` với loại `PLAN_DONE`.
3. Gọi `aevum_finalize_session` để đúc kết bài học vào Living Memory và trao thưởng EXP cho Persona.
