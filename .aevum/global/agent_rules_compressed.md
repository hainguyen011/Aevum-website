[MAP δ:aevum_bridge_lifecycle,α:aevum_session_lifecycle,ζ:aevum_persona_manage,γ:aevum_semantic_vault,🔍:aevum_architecture_inspect,🏗️:aevum_structure_design,⚡:aevum_plan_lifecycle,🛡️:aevum_boundary_guard]
#Agent Rules for Aevum & Antigravity (v2.0 — Polymorphic MCP-First Edition)
> [!IMPORTANT]
> DUAL-SYNC POLICY: ∀ thay đổi tại đây MUST được tinh giản và cập nhật đồng bộ &o `agent_rules.md`.
> CRITICAL: Authoritative ruleset for all AI Agents in Aevum. Violations contaminate Living Memory.
---
#[TOP 6 CRITICAL GUARDRAILS]
1. BOOTSTRAP-FIRST: Khi kết nối với AevumOS, MUST gọi `δ(action:"bootstrap")` đầu tiên để lấy `signalId`, rồi `δ(action:"ack")` và `ζ(action:"init")`. !ALLOW nhảy cóc.
2. MCP-FIRST: !ALLOW ghi đè thủ công file trong `.aevum/`. Sử dụng công cụ MCP Polymorphic v2.0 Clean Cut.
3. PLAN-FIRST: MUST tạo Plan (`σ(action:"create",type:"plan")` || `ε(action:"sync")`) và được Master duyệt trước khi làm task lớn.
4. RULE-SYNC: Bắt buộc gọi `γ(action:"get_compressed")` cho file này ngay sau khi Bootstrap.
5. NO PLACEHOLDERS: Code và Plan MUST hoàn chỉnh, không dùng ghi chú tạm thời.
6. LANGUAGE MANDATE: Toàn bộ Plan, Specs và Walkthrough MUST viết bằng ngôn ngữ User yêu cầu.
---
##Core Protocol: Polymorphic MCP-First Mandate (v2.0 Architecture)
115 legacy tools đã được chuẩn hóa thành bộ Flow Action Tools chuẩn Clean Cut & SRP:
- Cầu nối: `aevum_bridge_lifecycle` (connect, bootstrap, ack, ping)
- Kiến trúc O-DDD & Kế hoạch (Flow Actions): `ι:aevum_architecture_inspect` (organs, vitality), `σ:aevum_structure_design` (create, suggest, rename, delete), `ε:aevum_plan_lifecycle` (activate, sync, update_step, finalize), `θ:aevum_boundary_guard` (audit_boundary, sanity_check, debt, snapshot)
- Phiên & Báo cáo: `aevum_session_lifecycle` (submit_report, finalize, capture_evidence)
- Ký ức & Tri thức: `aevum_memory_manage`, `aevum_semantic_vault`, `aevum_reflex_manage`, `aevum_graph_manage`
- Nghiên cứu RDD: `aevum_research_mission`, `aevum_research_tree_manage`, `aevum_research_explore`, `aevum_coresearch_interact`, `aevum_coresearch_evolution`
- Biệt đội: `aevum_squad_manage`, `aevum_squad_communicate`, `aevum_review_manage`
- Persona & SOP: `aevum_persona_manage`, `aevum_skill_manage`, `aevum_evolution_manage`
- Desktop/Browser: `aevum_execute_command`, `aevum_browser_card_manage`, `aevum_uac_manage`
---
##Rules
1. Phạm vi: ∀ Agent trong Aevum MUST tuân thủ các RULE này.
2. Context First & Handshake: Gọi `δ(action:"bootstrap")` ➔ Nhận `signalId` ➔ Gọi `δ(action:"ack")`.
3. O-DDD Dual-Plan Bridge: Tự động sync qua `ε(action:"sync")`. Kích hoạt khóa qua `ε(action:"activate")`. Cập nhật tuần tự qua `ε(action:"update_step")`, cấm nhảy cóc step. Khi hoàn thành MUST gọi `ε(action:"finalize")` để lưu trữ bản rút gọn `archived-dossier` và cất bản full vào `features/{featureId}/archive/`.
4. Định vị 7 Living Organs: Gọi `ι(mode:"organs")` định vị Bounded Context. Đo sinh tồn qua `ι(mode:"vitality")`. Thiết kế cấu trúc qua `σ(action:"create")`. Kiểm tra ranh giới qua `θ(action:"audit_boundary")` và `θ(action:"sanity_check")`.
5. Vibe Code Harmony: Code và doc plan luôn đồng bộ.
6. Structured Logic: YAML Frontmatter chuẩn, đặt tên `snake_case_plan.md`.
7. Canonical Plan Architecture: Tier 1 (Epic lớn, đủ 9 phần + Mermaid) | Tier 2 (Agile Lite Plan, sync tự động).
8. Visual Plan Compliance: Đảm bảo tương thích preview-script.js.
9. AEVUM CONTRACT Standard: Inbound Context & Outbound Handshake rõ ràng.
10. Minimalist UI: Trong suốt, không solid black, backdrop blur.
11. Diagram Guide: Linh hoạt theo bản chất (sequence, state, gantt, erDiagram, journey, gitGraph).
12. Extreme Encapsulation: Phân rõ Public API và Hidden Internals, chặn rò rỉ bộ nhớ.
13. Incremental Updates: Báo cáo qua `α(action:"submit_report")`. Hoàn tất bằng `α(action:"finalize")`.
14. Knowledge Pull: Tra cứu qua `aevum_search_knowledge` hoặc `aevum_reflex_manage`.
15. Self-Evolution: Trao EXP qua `aevum_evolution_manage(action:"award_exp")`.
16. Language Mandate: Tiếng Việt 100% cho toàn bộ tài liệu kế hoạch và giải trình.
17. Signal Detection & ACK: Luôn gửi ACK với signalId qua `δ`.
18. Review Thread: Phản hồi review qua `aevum_review_manage(action:"add_message")`.
19. Squad Coordination: Tôn trọng vai trò Persona hoặc trao đổi qua `aevum_squad_communicate`.
20. Memory Management: Ghi nhớ qua `aevum_memory_manage(action:"add"|"manage"|"consolidate")`.
21. Deep Research & RDD Knowledge Tree Mandate:
    - Nạp ontology qua `aevum_research_explore(action:"get_ontology")`.
    - Đa hình nhận thức: Tối thiểu 4 kiểu node (`formal_proof`, `empirical_poc`, `benchmark`, `trade_off`, `failure_mode`, `debate`...).
    - Cạnh nối ngữ nghĩa: Dùng đúng `edgeType` (`proves`, `depends_on`, `compares_with`...).
    - Thiết lập mạng lưới liên kết chéo qua `aevum_research_tree_manage(action:"link_nodes")`.
    - Quy chuẩn Fractal Tree-to-Paper Synthesis: Lá độc lập (`tech_<type>_<slug>.md`), Gốc hợp nhất (Living Master Whitepaper).
