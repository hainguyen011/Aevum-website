---
id: "deep-research-engine"
title: "Deep Research & Chòm sao Kỹ năng"
category: "Phát triển"
order: 15
---

# Deep Research Engine & Chòm sao Kỹ năng

**Deep Research Engine** là hệ thống nghiên cứu chuyên sâu tự trị tích hợp trong Aevum OS. Hệ thống cho phép Agent thực hiện các nhiệm vụ nghiên cứu có cấu trúc, tự động tổng hợp insights theo chuẩn học thuật và trực quan hóa thành **Chòm sao Kỹ năng (Skill Tree Constellations)**.

---

## 1. Cấu trúc Nhiệm vụ Nghiên cứu (Research Mission)
Mỗi Research Mission bao gồm:
- **Topic**: Đề tài nghiên cứu kỹ thuật cụ thể.
- **Depth (1-5)**: Độ sâu nghiên cứu (từ 1: tổng quan sơ bộ đến 5: phân tích đa chiều toàn diện).
- **Insights & Credibility Tiering**: Phát hiện phân tầng độ tin cậy kèm trích dẫn IEEE tự động.
- **IEEE/ACM Technical Paper Standard v2.1**: Bài báo nghiên cứu hoàn chỉnh được tự động sinh ra.

---

## 2. Khởi chạy Nghiên cứu Tự trị

```bash
aevum_deep_research(
  topic="Best practices for distributed JWT authentication in microservices",
  depth=3,
  id="research_auth_2026"
)
```

---

## 3. Thu thập Insights có Phân tầng Độ tin cậy (Credibility Tiers)

```bash
# Thu thập từ nguồn tiêu chuẩn chính thức (Tier 1)
aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="RFC 7519 - JSON Web Token",
  category="official_specification",
  credibility="Tier-1 (Peer-Reviewed / Formal Spec)",
  url="https://tools.ietf.org/html/rfc7519",
  insight="JWT claims nên được validate đầy đủ: iss, sub, aud, exp, nbf, iat, jti. Bắt buộc kiểm tra 'exp' để ngăn chặn triệt để replay attack."
)

# Thu thập từ nguồn phân tích thực nghiệm công nghiệp (Tier 2)
aevum_capture_research_insight(
  researchId="research_auth_2026",
  source="OWASP JWT Security Cheat Sheet",
  category="industry_benchmark",
  credibility="Tier-2 (Verified Industry Benchmark)",
  url="https://cheatsheetseries.owasp.org",
  insight="Tuyệt đối không cho phép 'alg: none'. Luôn whitelist thuật toán được phép; ưu tiên RS256 hơn HS256 cho kiến trúc phân tán."
)
```

---

## 4. Chòm sao Cây Kỹ năng (Interactive Skill Tree Constellations)
Trên giao diện Desktop Control Center, Aevum OS hiển thị chòm sao kỹ năng được vẽ bằng **React Flow** và thuật toán dàn đồ thị **Dagre**:
- **Trạng thái Node**: *Locked* (Chưa mở khóa), *Researching* (Đang nghiên cứu), *Mastered* (Đã tinh thông).
- **Tỉ lệ Tinh thông Domain**: Thước đo phần trăm hoàn thành năng lực của dự án.
- **Huy hiệu Persona**: Hiển thị avatar của Agent đang phụ trách node nghiên cứu đó.

### Phân nhánh Nghiên cứu Đệ quy (Branching Nodes)
Khi phát hiện một nhánh chủ đề con thú vị trong quá trình nghiên cứu, Agent có thể rẽ nhánh:
```bash
aevum_branch_research_node(
  parentId="research_auth_2026",
  subTopic="Redis Distributed Mutex for Token Invalidation"
)
```

---

## 5. Tổng hợp Bài báo Kỹ thuật & Thăng cấp thành Kế hoạch (Promote to Plan)

Khi nghiên cứu đạt độ bao phủ cần thiết (`aevum_analyze_research_progress`):

```bash
# 1. Tổng hợp bài báo nghiên cứu chuẩn IEEE/ACM
aevum_synthesize_report(researchId="research_auth_2026")

# 2. Thăng cấp 1-click thành Kế hoạch Kỹ thuật thực thi (Promote to Plan)
aevum_promote_research_to_plan(
  missionId="research_auth_2026",
  domainId="core_architecture",
  planName="Deploy Distributed JWT Mutex"
)
```

> [!TIP]
> Quy trình **Promote to Plan** kết nối liền mạch giữa giai đoạn nghiên cứu lý thuyết và thực thi mã nguồn. Toàn bộ kiến trúc và danh mục kiểm thử từ bài báo sẽ được tự động chuyển thành các task có thể thực thi ngay lập tức!
