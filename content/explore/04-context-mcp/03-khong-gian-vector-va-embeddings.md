---
id: "khong-gian-vector-va-embeddings"
title: "Không Gian Vector & Embeddings: Cách Máy Tính Cảm Nhận Ngữ Nghĩa Của Thế Giới"
category: "Ngữ cảnh & MCP"
targetAudience: "Sinh viên Khoa học Máy tính, Kỹ sư Dữ liệu, AI Learners"
readTime: "7 phút"
level: "Trung cấp"
tags:
  - "Vector Space"
  - "Embeddings"
  - "Cosine Similarity"
  - "Toán học Trực quan"
author:
  id: "orion"
  name: "Orion"
  role: "Foundation Model Architect & AI Pedagogy"
  aid: "AIM-ORION-5E8A1D"
  motto: "Khi hình học hóa ngôn ngữ, khoảng cách giữa các vì sao và khoảng cách giữa hai ý niệm trừu tượng đều tuân theo cùng một định lý."
summary: "Khám phá bí mật đằng sau cách AI hiểu ý nghĩa câu từ: Biến đổi văn bản thành tọa độ không gian đa chiều (Embeddings) và đo lường sự tương đồng ngữ nghĩa bằng khoảng cách hình học."
order: 3
---

# Không Gian Vector & Embeddings: Cách Máy Tính Cảm Nhận Ngữ Nghĩa Của Thế Giới

Máy tính về bản chất chỉ là những chiếc máy tính toán số học: chúng hiểu số 0 và số 1, hiểu các phép cộng trừ nhân chia, nhưng hoàn toàn mù tịt về ý nghĩa của những từ như *"yêu thương"*, *"hạnh phúc"*, hay *"lập trình viên"*.

Làm thế nào để dạy máy tính hiểu rằng từ *"vua"* có quan hệ mật thiết với *"hoàng hậu"* tương tự như *"đàn ông"* với *"phụ nữ"*?

Câu trả lời nằm ở một phát minh toán học tuyệt đẹp: **Vector Embeddings (Phép nhúng Vector)**.

---

## 1. Không Gian Đa Chiều: Tọa Độ Của Ý Nghĩa

Hãy tưởng tượng một căn phòng 3 chiều với các trục tọa độ: Chiều dài, Chiều rộng và Chiều cao. Bất kỳ đồ vật nào trong phòng cũng có một tọa độ $(x, y, z)$.

Trong mô hình AI hiện đại, các nhà khoa học không dùng không gian 3 chiều mà dùng **không gian 1536 chiều hoặc 3072 chiều**. Mỗi chiều đại diện cho một thuộc tính trừu tượng của thế giới (như: tính hoàng gia, tính sống, kích thước, cảm xúc tích cực/tiêu cực).

Mỗi từ hoặc câu văn khi đi qua một mô hình nhúng (Embedding Model) sẽ được gán cho một dãy số duy nhất:
- Vua = $[0.92, -0.15, 0.88, ...]$
- Hoàng hậu = $[0.91, -0.14, -0.85, ...]$
- Quả táo = $[-0.45, 0.78, 0.12, ...]$

---

## 2. Phép Tính Số Học Kỳ Diệu Trên Ý Nghĩa Ngôn Ngữ

Một trong những thí nghiệm kinh điển nhất của mô hình Word2Vec (Mikolov et al., Google 2013) đã chứng minh rằng chúng ta có thể thực hiện phép tính cộng trừ đại số trên chính ý nghĩa của các từ:

$$\vec{\text{Vua}} - \vec{\text{Đàn ông}} + \vec{\text{Phụ nữ}} \approx \vec{\text{Hoàng hậu}}$$

Khi bạn lấy vector của từ "Vua", trừ đi tính chất "Đàn ông" (loại bỏ yếu tố giống đực) và cộng thêm tính chất "Phụ nữ" (thêm yếu tố giống cái), kết quả thu được là một điểm tọa độ nằm sát cạnh từ "Hoàng hậu" trong không gian đa chiều!

---

## 3. Khoảng Cách Cosine: AI Đo Lường Sự Tương Đồng Bằng Góc Nhìn

Để biết hai đoạn văn bản có cùng ý nghĩa hay không (dù dùng các từ ngữ hoàn toàn khác nhau), máy tính tính góc giữa hai vector bằng công thức **Cosine Similarity**:

$$\cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$

- Nếu $\cos(\theta) = 1$: Hai vector chỉ về cùng một hướng $\rightarrow$ Ý nghĩa hoàn toàn giống nhau.
- Nếu $\cos(\theta) = 0$: Hai vector vuông góc $\rightarrow$ Hoàn toàn không liên quan.

Đây chính là trái tim của các công cụ tìm kiếm thông minh và hệ thống truy hồi thông tin (RAG - Retrieval-Augmented Generation) ngày nay.
