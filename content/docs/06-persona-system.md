---
id: "persona-system"
title: "Hệ thống Nhân vật (Personas)"
category: "Hướng dẫn"
order: 6
---

# Hệ thống Nhân vật (Persona System)

> Aevum OS phân rã năng lực điều phối thành các **AI Persona chuyên trách độc lập**. Mỗi Persona sở hữu một danh tính số (AID), cấp độ tiến hóa (Level & EXP), cây kỹ năng chuyên sâu và phong cách giao tiếp đặc thù thay vì dùng một mô hình LLM chung.

---

## 1. Cấu trúc Danh tính Nhân vật (Persona Identity)

Mỗi Persona trong Aevum OS được định nghĩa tại tệp cấu hình toàn cục `~/.aevum/global/companion_persona.json` và phân nhánh theo thư mục `~/.aevum/global/personas/{id}/`:

### Bảng Đặc tả Thuộc tính Cốt lõi (Identity Schema)

| Thuộc tính (Property) | Kiểu dữ liệu | Mô tả kỹ thuật | Giá trị mẫu / Định dạng |
|---|---|---|---|
| **AID (Agent ID)** | `string` | Mã định danh chuẩn hóa cấp hệ thống, duy nhất và có tiền tố vai trò. | `ENG-AN-7B9F1D` (An), `ARC-VIDUS-AUHD2Y` |
| **Level & EXP** | `number` | Điểm kinh nghiệm tự động tích lũy qua từng Plan kỹ thuật hoàn thành. | Tăng trưởng qua [aevum_award_exp](/changelog) |
| **Skills Matrix** | `string[]` | Ma trận năng lực chuyên môn và quy trình SOP đã mở khóa. | `Architecture`, `Security`, `Refactoring`, `UI/UX` |
| **Voice Instructions** | `object` | Danh xưng, giọng điệu, ranh giới quan hệ và phong cách phản hồi. | Voice Instructions & Tone Policy |
| **Presence State** | `enum` | Trạng thái hiện diện thời gian thực phát sóng lên Desktop GUI. | Xem 5 trạng thái sinh mệnh bên dưới |

---

### Danh mục Trạng thái Hiện diện (Presence Enum States)

Hệ thống theo dõi và phát sóng trạng thái thời gian thực của Persona qua 5 chế độ sinh mệnh:

- `processing` — Đang tiếp nhận prompt, phân tích ngữ cảnh và thiết lập không gian làm việc.
- `researching` — Đang truy vấn tri thức sâu, duyệt tài liệu hoặc quét đồ thị bộ nhớ LTM.
- `coding` — Đang trực tiếp áp dụng công cụ chỉnh sửa, tạo file và refactor mã nguồn.
- `thinking` — Đang suy luận logic đa tầng hoặc kiểm tra tính toàn vẹn của kiến trúc.
- `idle` — Nghỉ ngơi trong trạng thái sẵn sàng đón nhận yêu cầu tiếp theo từ Master.

---

## 2. Cách Chuyển đổi Nhân vật (Persona Switch)
Khi muốn thay đổi nhân vật đang đại diện trong phiên làm việc hiện tại:

```bash
aevum_switch_persona(id="security_auditor")
```

Agent sẽ lập tức nhận được thông báo chuyển đổi identity và nạp toàn bộ bộ nhớ ngữ cảnh của nhân vật mới.

---

## 3. Chuyển giao Kế hoạch Biệt đội (Squad Handoff)
Khi một công việc hoàn thành một chặng và cần chuyển sang Agent khác (ví dụ: Architect bàn giao cho Developer thực thi mã nguồn):

```bash
aevum_squad_handoff(
  fromAgent="ARCHITECT",
  toAgent="DEVELOPER",
  planName="JWT Refresh Pipeline Refactor",
  summary="Đã hoàn thành thiết kế kiến trúc và sơ đồ lớp cho TokenService",
  nextSteps=[
    "Triển khai Redis distributed lock trong TokenService.ts",
    "Viết bộ unit test kiểm thử race condition"
  ]
)
```

Giao thức này đảm bảo 100% ngữ cảnh kỹ thuật, các bước tiếp theo và danh sách trở ngại (blockers) được bàn giao nguyên vẹn mà không bị tam sao thất bản.

---

## 4. Tự động Bơm Thông báo Biệt đội (Squad Notifications Auto-Injection)

> [!IMPORTANT]
> Trong chế độ **Squad Mode**, bạn không cần phải liên tục polling tin nhắn! Mỗi khi một Agent trong Biệt đội gửi tin nhắn hoặc bàn giao việc, hệ thống **tự động chèn khối thông báo** vào cuối kết quả trả về của tool call tiếp theo:
>
> ```
> [AEVUM SQUAD NOTIFICATIONS]:
> - Từ AN: Đã tối ưu hóa xong API route, mời VIDUS audit bảo mật.
> - Từ LUNA: Giao diện modal đăng nhập mới đã sẵn sàng.
> ```

---

## 5. Thảo luận Chung Biệt đội (Squad Huddle)
Đối với các quyết định kiến trúc phức tạp cần sự đồng thuận của nhiều góc nhìn chuyên môn:
1. Kích hoạt phiên thảo luận chung bằng công cụ `aevum_squad_huddle`.
2. Hệ thống mở một phiên **Blackboard Hub** nơi các Agent cùng đọc kế hoạch và lần lượt đóng góp ý kiến để hoàn thiện giải pháp tối ưu nhất.
