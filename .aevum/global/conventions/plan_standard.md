# Aevum Plan Architecture Standard (v2.5)
Tiêu chuẩn kiến trúc kế hoạch và lưu trữ tiến hóa trong hệ điều hành Aevum OS. Mục tiêu biến mọi Plan thành một thực thể sống: kiểm soát ranh giới nghiêm ngặt khi đang làm (Active Runbook), chuyển hóa thành Bản Thảo Lưu Trữ Tinh Gọn (Archived Dossier) khi hoàn thành, và ươm mầm cho các phiên bản nâng cấp tiếp theo.

## 1. Cấu trúc bắt buộc của một Plan khi đang thực thi (Active Runbook)

### 1.1. Frontmatter (YAML)
Mọi plan phải bắt đầu bằng khối frontmatter đầy đủ các yếu tố định danh để Dashboard và Agent parse tự động:
```yaml
---
plan_name: [tên_file].md
domain: [id_domain]
feature: [id_feature]
version: "1.0.0"
status: todo # [todo | in-progress | done | blocked | archived-dossier]

# Ai làm & Ai nghiệm thu
authors: ["ID_AGENT"]
assigned_to:
  agent: "ID_AGENT"
  role: "Developer (Implementation)"
  intent: "Mục đích thực thi"
reviewer:
  agent: "ID_ARCHITECT"
  role: "Lead Architect (Review & Gate)"

# Làm khi nào & Thời gian thực thi
created_at: "YYYY-MM-DDTHH:mm:ss.sssZ"
started_at: "YYYY-MM-DDTHH:mm:ss.sssZ"
completed_at: ""
updated_at: "YYYY-MM-DDTHH:mm:ss.sssZ"

# Ranh giới tệp & Phụ thuộc
active_files:
  - "src/path/to/file1.ts"
dependencies: []
---
```

### 1.2. Architectural Context (Bối cảnh kiến trúc)
BẮT BUỘC chứa ít nhất một sơ đồ trực quan (Mermaid diagram) mô tả sự thay đổi mà plan này mang lại:
- Component flow: `graph TD` hoặc `graph LR`
- Luồng tương tác A2A: `sequenceDiagram`

### 1.3. Implementation Steps (Kỷ luật Chống Nhảy Cóc - Anti-Skipping)
Sử dụng format checkbox chuẩn tuần tự theo Phase.
- **Quy tắc nghiêm ngặt**: Agent bắt buộc cập nhật từng step theo đúng trình tự bằng `aevum_plan_lifecycle(action: "update_step")`. Tuyệt đối cấm tick step sau khi step trước còn để trống `[ ]`.
- **Định vị Task Anchoring**: Cú pháp `[ ] [file_path:line] [Nội dung task] [Evidence: ...] [Est: 1h]`.
- **Bằng chứng kiểm định**: Mọi step hoàn thành phải có bằng chứng cụ thể (test pass, git commit, terminal log).

---

## 2. Quy Chuẩn Lưu Trữ Rút Gọn Sau Khi Nghiệm Thu (Archived Living Dossier)

Khi toàn bộ các step đã hoàn thành 100%, Agent kích hoạt Acceptance Review và gọi `aevum_plan_lifecycle(action: "finalize")`. Hệ thống tự động thực hiện quy trình **Lưu Trữ 2 Tầng Cục Bộ (Cellular Archive)**:

### 2.1. Đóng gói bản đầy đủ vào Feature Archive
- Bản runbook chi tiết cũ được tự động cất vào:  
  `.aevum/domains/{domainId}/features/{featureId}/archive/{plan_name}`
- **Tuyệt đối không rải rác ra kho toàn cục**: Mỗi Feature quản lý trọn vẹn gia phả tiến hóa của riêng mình.

### 2.2. Chuyển hóa tệp Plan chính thành Bản Thảo Lưu Trữ Rút Gọn (~25 dòng)
File chính trong `plans/` được AI chuyển đổi sang `status: "archived-dossier"`, ẩn toàn bộ checkbox vụn vặt và chỉ giữ lại 4 khối tinh hoa:
1. **🏆 Biên bản Nghiệm thu & Đóng dấu ký số**: Người thực hiện, người duyệt, thời gian, con dấu chất lượng `100% Clean Architecture`.
2. **📐 Đặc tả Kiến trúc Bàn giao**: Public APIs đã mở, danh sách tệp thực tế đã tạo/sửa.
3. **🧠 Tri thức & Kỹ năng Đúc kết**: Pattern phát hiện, SOP kỹ năng đã chưng cất.
4. **🚀 Bệ phóng Nâng cấp Tiếp theo (Next-Gen Runway)**: Hạn chế hiện tại và Hạt giống Plan đề xuất cho phiên bản kế tiếp (v1.1.0).

### 2.3. Hấp thụ tiến hóa vào `specs.md` của Feature
AI tự động cập nhật milestone trong `specs.md` của Feature (ví dụ: đánh dấu hoàn thành `v1.0.0` và mở ra milestone `v1.1.0`), bảo đảm `specs.md` luôn là bản đặc tả sống của toàn bộ Feature.

---
*Phê duyệt bởi: Aevum Architect System & Squad Core - 2026*
