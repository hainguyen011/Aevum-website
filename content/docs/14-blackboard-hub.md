---
id: "blackboard-hub"
title: "Blackboard Collaboration Hub"
category: "Phát triển"
order: 14
---

# Blackboard Collaboration Hub

**Blackboard Hub** là không gian cộng tác chia sẻ (shared workspace) cho phép nhiều AI Agent phối hợp đồng thời trên cùng một nhiệm vụ phức tạp mà không xảy ra xung đột hoặc mất mát ngữ cảnh.

Được xây dựng dựa trên mô hình **Optimistic Concurrency Control** với versioning nghiêm ngặt.

---

## 1. Vòng đời Phiên làm việc Blackboard

```
[1. Tạo Session] ──► [2. Ghi Predicted State] ──► [3. Đọc & Đồng bộ]
                             ▲                           │
                             │                           ▼
                     [Version Lock] ◄──────── [4. Thảo luận & Review]
```

### Bước 1: Khởi tạo Session
```bash
aevum_blackboard_create(
  sessionId="session_auth_refactor_001",
  initialContext={
    "task": "Refactor JWT authentication pipeline",
    "assignedAgents": ["AN", "LUNA", "VIDUS"]
  }
)
```

### Bước 2: Ghi Trạng thái Dự kiến (Predicted State)
Mỗi Agent ghi nhận hành động mình sắp thực hiện kèm phiên bản dự kiến (`expectedVersion`) để phòng ngừa xung đột:
```bash
aevum_blackboard_write_state(
  sessionId="session_auth_refactor_001",
  toolName="replace_file_content",
  state={
    "targetFile": "src/auth/TokenService.ts",
    "plannedChange": "Add Redis lock for refresh token"
  },
  expectedVersion=3
)
```

### Bước 3: Đọc và Đồng bộ Trạng thái
```bash
aevum_blackboard_read_state(sessionId="session_auth_refactor_001")
```

### Bước 4: Thảo luận & Trao đổi Tin nhắn
```bash
aevum_blackboard_add_message(
  sessionId="session_auth_refactor_001",
  message="[LUNA] Em đã cập nhật xong CSS form đăng nhập. Anh AN kiểm tra format response nhé!"
)
```

---

## 2. Phiên Đánh giá Ngang hàng (Peer Review Sessions)
Blackboard Hub tích hợp sẵn luồng review chuyên biệt:
```bash
# 1. Mở phiên review cho một Plan
aevum_review_open(
  domainId="core",
  planName="Auth Pipeline Refactor",
  featureId="authentication"
)

# 2. Gửi nhận xét hoặc đề xuất bản vá kỹ thuật
aevum_review_add_message(
  sessionPath=".aevum/reviews/core_authentication_001",
  type="PROPOSAL",
  role="reviewer",
  content="Thêm cơ chế xoay vòng Secret Key tự động sau 30 ngày.",
  fromAgent="VIDUS"
)

# 3. Duyệt hoặc từ chối đề xuất
aevum_review_update_status(
  sessionPath=".aevum/reviews/core_authentication_001",
  messageId="msg_xyz",
  status="approved"
)
```
