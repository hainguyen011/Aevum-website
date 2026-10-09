---
id: "living-memory-graph"
title: "Living Memory Graph Engine"
category: "Phát triển"
order: 13
---

# Living Memory Graph Engine

**Living Memory Graph** là trái tim của Aevum OS — một đồ thị tri thức tự phục hồi (self-healing knowledge graph) lưu trữ vĩnh viễn các bài học kinh nghiệm, quyết định kiến trúc và ngữ cảnh kỹ thuật dưới dạng các node có quan hệ ngữ nghĩa với nhau.

---

## 1. Kiến trúc Đồ thị (Graph Architecture)

### Các loại Node Tri thức
Mỗi node trong đồ thị có một `type` xác định loại tri thức:

| Type | Mô tả |
|---|---|
| `LESSON` | Bài học kinh nghiệm từ việc giải quyết bug, tối ưu hiệu năng hoặc refactor. |
| `PATTERN` | Mẫu thiết kế (Design Pattern) đã được kiểm chứng hiệu quả trong dự án. |
| `DECISION` | Quyết định kiến trúc quan trọng (Architecture Decision Record - ADR). |
| `CONVENTION` | Quy chuẩn coding và quy tắc đội ngũ đã được thống nhất. |

### Cấu trúc Node mẫu
```json
{
  "id": "node_auth_jwt_001",
  "type": "LESSON",
  "properties": {
    "title": "JWT Refresh Token Race Condition Fix",
    "description": "Sử dụng Redis distributed lock để ngăn race condition khi nhiều request đồng thời refresh token.",
    "author": "AN",
    "date": "2026-07-15",
    "status": "ACTIVE",
    "relatedFiles": ["src/auth/TokenService.ts", "src/auth/RefreshMiddleware.ts"]
  }
}
```

---

## 2. Thu hoạch Tri thức Tự động (Automatic Harvesting)
Khi Agent hoàn thành một kế hoạch và gọi `aevum_finalize_session`, hệ thống tự động:
1. Phân tích diff các tệp đã sửa đổi.
2. Trích xuất skeleton của các hàm và class mới tạo.
3. Tạo node tri thức mới từ mục `lessons` trong báo cáo.
4. Tự động liên kết ngữ nghĩa node mới với các node hiện có dựa trên quan hệ AST.

---

## 3. Phát hiện Trôi lệch Mã nguồn (Drift Detection)
Hệ thống chạy định kỳ `aevum_audit_memory_graph` để phát hiện các node tri thức bị trôi lệch (code drift):
- Khi một file hoặc hàm được node tham chiếu đã bị xóa hoặc đổi tên trong mã nguồn.
- Node sẽ tự động bị đánh dấu `STALE` để cảnh báo Agent không sử dụng thông tin cũ.

```bash
aevum_audit_memory_graph()
```

---

## 4. Kiểm toán Vi phạm Ranh giới (Boundary Violations)
Sử dụng công cụ `aevum_audit_boundary_violations` để phát hiện các vi phạm quy chuẩn kiến trúc:
- Gọi hàm cross-domain không thông qua public interface.
- Sửa đổi trực tiếp dữ liệu thuộc quyền quản lý của domain khác.
