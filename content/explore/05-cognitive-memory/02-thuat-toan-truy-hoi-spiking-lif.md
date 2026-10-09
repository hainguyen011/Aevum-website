---
id: "thuat-toan-truy-hoi-spiking-lif"
title: "Thuật Toán Truy Hồi Sinh Học Spiking LIF (Leaky Integrate-and-Fire) Neural Recall"
category: "Trí nhớ & Não bộ"
targetAudience: "Kỹ sư AI, Nhà nghiên cứu thuật toán, Sinh viên Khoa học Máy tính"
readTime: "9 phút"
level: "Chuyên sâu"
tags:
  - "Neuromorphic"
  - "Spiking LIF"
  - "Recall"
  - "Biological Computing"
  - "Toán học"
author:
  id: "zenith"
  name: "Zenith"
  role: "Performance Audit & Biomimetic Computing"
  aid: "ALG-ZENITH-A1B2C3"
  motto: "Mô phỏng tự nhiên không chỉ là cảm hứng lãng mạn, mà là con đường ngắn nhất dẫn tới hiệu năng toán học tối thượng."
summary: "Tìm hiểu thuật toán Leaky Integrate-and-Fire ứng dụng trong việc kích hoạt nơ-ron tri thức và truy hồi ký ức theo điện thế kích thích, loại bỏ hoàn toàn hiện tượng ô nhiễm ngữ cảnh."
order: 2
---

# Thuật Toán Truy Hồi Sinh Học Spiking LIF Neural Recall

Trong các hệ thống tìm kiếm thông tin truyền thống (RAG), các kỹ sư thường dùng phép tính độ đo Cosine Similarity giữa câu hỏi và toàn bộ hàng ngàn vector trong cơ sở dữ liệu.

Phương pháp này có một nhược điểm chí mạng: **Nó kích hoạt quá nhiều thông tin na ná nhau nhưng thực chất không liên quan (False Positives)**, làm tràn ngập ngữ cảnh của AI bằng những mẩu ký ức nhiễu loạn.

Để khắc phục điều đó, Aevum OS lấy cảm hứng từ cơ chế kích hoạt điện thế màng tế bào thần kinh sinh học: **Mô hình Leaky Integrate-and-Fire (LIF)**.

---

## 1. Phương Trình Vi Phân Điện Thế Màng Nơ-ron

Trong não bộ, một tế bào thần kinh không phát tín hiệu một cách ngẫu nhiên. Nó tích lũy các xung điện từ các nơ-ron xung quanh. Nếu tổng kích thích vượt qua một ngưỡng giới hạn nhất định, nó mới "phát xung" (Spike). Nếu không có kích thích mới, điện thế tích lũy sẽ tự động rò rỉ (leak) về mức nghỉ ban đầu.

Phương trình vi phân mô tả điện thế màng $V(t)$ của một nút tri thức:

$$\tau_m \frac{dV(t)}{dt} = -(V(t) - V_{\text{rest}}) + R \cdot I(t)$$

Trong đó:
- $V(t)$: Mức điện thế nhận thức của nút tri thức tại thời điểm $t$.
- $V_{\text{rest}}$: Mức điện thế nghỉ ngơi (trạng thái bình thường khi không được nhắc tới).
- $\tau_m$: Hằng số thời gian phân rã (quy định tốc độ rò rỉ điện thế).
- $I(t)$: Xung kích thích nhận được từ câu hỏi hiện tại hoặc các nút lân cận.

---

## 2. Cơ Chế Phát Xung (Spike) Và Triệt Tiêu Ô Nhiễm Ngữ Cảnh

```
Điện thế V(t)
 ▲
 │                          [PHÁT XUNG - SPIKE!]
 │                                 ▲
 │                           ╭─────┴─────╮
 │                         ╭─╯           ╰─╮ (Nạp ngay vào Prompt)
 │                       ╭─╯               ╰─
 │                     ╭─╯
 ├────────────────────╭╯─────────────────────── Ngưỡng kích hoạt V_threshold
 │                  ╭─╯
 │                ╭─╯      (Rò rỉ tự nhiên)
 │              ╭─╯               ╲
 │            ╭─╯                  ╲
 ├───────────╭╯─────────────────────╲────────── Mức nghỉ V_rest
 └───────────┴───────────────────────┴────────► Thời gian t
```

- **Chỉ nạp khi thực sự quan trọng**: Một nút ký ức chỉ được đưa vào cửa sổ ngữ cảnh của Agent khi và chỉ khi điện thế $V(t) \ge V_{\text{threshold}}$.
- **Ngăn chặn ô nhiễm ngữ cảnh**: Những ký ức chỉ hơi giống một chút sẽ không bao giờ đủ điện thế để vượt ngưỡng, do đó bị loại bỏ hoàn toàn một cách tự nhiên.
- **Tự động quên lãng thông minh**: Sau khi tác vụ kết thúc, nếu không được nhắc lại, điện thế tự động rò rỉ về mức nghỉ $V_{\text{rest}}$, nhường chỗ cho các tri thức mới.
