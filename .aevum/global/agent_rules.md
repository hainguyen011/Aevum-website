# Agent Rules for Aevum & Antigravity (v2.0 — Polymorphic MCP-First Edition)
> [!IMPORTANT]
> **DUAL-SYNC POLICY**: Mọi thay đổi tại đây BẮT BUỘC phải được tinh giản và cập nhật đồng bộ vào `agent_rules_compressed.md`.

> **CRITICAL**: This is the authoritative ruleset for all AI Agents operating within Aevum. Violations break structural integrity and contaminate the Living Memory.

---
# [TOP 6 CRITICAL GUARDRAILS]
1. **BOOTSTRAP-FIRST**: Khi có tín hiệu hoặc yêu cầu kết nối với AevumOS, BẮT BUỘC gọi `aevum_bridge_lifecycle` (action: "bootstrap") đầu tiên để lấy `signalId`, tiếp theo gửi `aevum_bridge_lifecycle` (action: "ack", signalId: ...) và khởi tạo Persona qua `aevum_persona_manage` (action: "init", personaId: "an", client: "ide"). Tuyệt đối không nhảy cóc.
2. **MCP-FIRST**: Tuyệt đối không ghi đè thủ công các file trong `.aevum/`. BẮT BUỘC sử dụng các công cụ MCP chuẩn Polymorphic v2.0 Clean Cut.
3. **PLAN-FIRST**: Phải tạo Plan (`aevum_structure_design` action: "create", type: "plan" hoặc `aevum_plan_lifecycle` action: "sync") và được Master duyệt trước khi thực thi task lớn.
4. **RULE-SYNC**: Bắt buộc gọi `aevum_semantic_vault` (action: "get_compressed", target: "agent_rules.md") ngay sau khi Bootstrap.
5. **NO PLACEHOLDERS**: Code và Plan phải hoàn chỉnh, không dùng ghi chú tạm thời.
6. **LANGUAGE MANDATE**: Toàn bộ Plan, Specs và Walkthrough phải viết bằng ngôn ngữ mà người dùng mong muốn hoặc đã yêu cầu tương tác trước đó.
---

## Core Protocol: Polymorphic MCP-First Mandate (v2.0 Architecture)

Aevum operates through **Model Context Protocol (MCP)** as the single source of truth. To maximize context efficiency and prevent prompt bloating (~20,000 tokens/turn saved), 115 redundant legacy individual tools have been consolidated into **44 high-performance Polymorphic Tools** operating under the **v2.0 Clean Cut Architecture**.

### Bảng Ánh Xạ Công Cụ Đa Hình Trọng Yếu (Polymorphic Core Matrix):
- **Cầu nối Hệ thống**: `aevum_bridge_lifecycle` (actions: `connect`, `bootstrap`, `ack`, `ping`).
- **Cấu trúc Kiến trúc O-DDD & Kế hoạch (Bộ 4 Flow Action Tools Chuẩn SRP)**:
  - `aevum_architecture_inspect`: Chẩn đoán 7 Living Organs, đo lường sinh tồn (`organs`, `vitality`, `tree`, `cooked`).
  - `aevum_structure_design`: Khởi tạo và thiết kế cấu trúc (`create`, `suggest`, `rename`, `delete`).
  - `aevum_plan_lifecycle`: Vòng đời thực thi và khóa ranh giới Plan (`activate`, `sync`, `update_step`, `finalize`, `assign`, `mark_done`).
  - `aevum_boundary_guard`: Giám sát ranh giới Clean Architecture, nợ kỹ thuật và kiểm tra toàn vẹn (`audit_boundary`, `sanity_check`, `debt`, `snapshot`).
- **Vòng đời Phiên & Báo cáo**: `aevum_session_lifecycle` (actions: `submit_report`, `finalize`, `capture_evidence`).
- **Bộ nhớ & Tri thức**: `aevum_memory_manage` (actions: `add`, `manage`, `consolidate`, `audit`), `aevum_semantic_vault` (actions: `get_compressed`, `hydrate_hash`, `sync_index`, `submit_suggestion`).
- **Phản xạ & Đồ thị Tri thức**: `aevum_reflex_manage` (actions: `query`, `record_interaction`), `aevum_graph_manage` (actions: `query`, `audit_graph`, `audit_boundary`, `post_mortem`, `consensus_check`, `meta_query`).
- **Nghiên cứu Chuyên sâu & Đồng hành**: `aevum_research_mission`, `aevum_research_tree_manage`, `aevum_research_explore`, `aevum_coresearch_interact`, `aevum_coresearch_evolution`.
- **Biệt đội Đa Tác tử**: `aevum_squad_manage`, `aevum_squad_communicate`, `aevum_squad_handoff`, `aevum_review_manage`.
- **Quản trị Persona & Kỹ năng**: `aevum_persona_manage`, `aevum_skill_manage`, `aevum_evolution_manage`, `aevum_recruit_agent`.
- **Tự động hóa Máy tính & Trình duyệt**: `aevum_execute_command`, `aevum_browser_card_manage`, `aevum_uac_manage`, `aevum_app_launch`.

---

## Rules

1. **Phạm vi Áp dụng**: Mọi Agent hoạt động trong môi trường Aevum PHẢI tuân thủ các quy tắc này để đảm bảo tính đồng bộ và minh bạch.

2. **Context First & MCP Handshake** *(Updated — Polymorphic v2.0)*:
    - **BẮT BUỘC** gọi `aevum_bridge_lifecycle(action: "bootstrap")` là hành động đầu tiên trong mỗi phiên làm việc mới. Đây là Handshake chính thức.
    - Sau khi nhận kết quả, **BẮT BUỘC** gọi `aevum_bridge_lifecycle(action: "ack", signalId: ...)` với `signalId` để xác nhận đã nạp đầy đủ ngữ cảnh. Hệ thống sẽ không chấp nhận việc ghi file `ack.json` thủ công.
    - Không được bắt đầu thực thi bất kỳ task nào trước khi hoàn tất 2 bước trên.
    - Khi nhận lệnh **BOOTSTRAP** từ hệ thống, thực hiện lại toàn bộ quy trình Handshake này ngay lập tức.

3. **Plan Sync & O-DDD Lifecycle (Dual-Plan Seamless Bridge)** *(Updated — v2.4 Flow Actions)*:
    - **Cầu nối Tự động IDE ➔ Aevum (Dual-Plan Bridge - BẮT BUỘC)**: Khi Agent khởi tạo hoặc cập nhật `implementation_plan.md` trong môi trường IDE (Antigravity Planning Mode), Agent **BẮT BUỘC** gọi tool `aevum_plan_lifecycle(action: "sync", domainId, planName, sourceFilePath, featureId?, activeFiles?)` để tự động phản chiếu và đăng ký kế hoạch vào Bounded Context Organ tương ứng của Aevum OS.
    - **Khóa Ranh Giới (Active Plan Lock - BẮT BUỘC)**: Khi bắt đầu triển khai, Agent gọi `aevum_plan_lifecycle(action: "activate", domainId, planName, activeFiles: [...])`. Hệ thống sẽ sinh `.aevum/current_plan.json` nhằm bảo vệ ranh giới sửa file.
    - **Cập nhật Tiến trình Thời gian thực & Chống Nhảy Cóc (Anti-Skipping)**: Bắt buộc gọi `aevum_plan_lifecycle(action: "update_step", stepMatch: "...", status: "done", comment?: "...")` sau mỗi bước hoàn tất theo đúng trình tự. Tuyệt đối không được nhảy cóc (tick step sau khi step trước còn để trống `[ ]`). Không được nghiệm thu khống khi còn step chưa hoàn thành hoặc chưa có bằng chứng kiểm định (`evidence`). Mọi Plan phải có đầy đủ thuộc tính: Ai làm (`assigned_to`), làm khi nào (`created_at`, `started_at`), và ranh giới tệp (`active_files`).
    - **Nghiệm thu, Chuyển hóa Bản Thảo Lưu Trữ & Ươm Mầm Tiến Hóa (Finalize & Cellular Archive)**: Khi hoàn thành plan, **BẮT BUỘC** gọi `aevum_plan_lifecycle(action: "finalize", domainId: ..., planName: ...)` — hệ thống sẽ tự động giải phóng `current_plan.json`, cập nhật `index.json`, đóng gói bản chi tiết cũ cất vào thư mục di sản cục bộ của Feature (`features/{featureId}/archive/`), chuyển hóa tệp Plan chính thành Bản Thảo Lưu Trữ Rút Gọn (`archived-dossier` ~25 dòng gồm: Biên bản nghiệm thu ký số, Đặc tả kiến trúc đã bàn giao, Tri thức đúc kết và Hạt giống Plan nâng cấp kế tiếp), cập nhật milestone vào `specs.md` của Feature, trao EXP và kích hoạt hook chưng cất kỹ năng (`aevum_skill_manage` action: "distill").
    - Không được viết trực tiếp vào `.aevum/` để báo cáo.

4. **Proactive O-DDD Architecture Management (Chủ Động Định Vị Kiến Trúc)** *(Updated — v2.4)*:
    - **Định vị 7 Living Organs & Bounded Context**: Khi nhận task mới, Agent luôn chủ động soi chiếu `aevum_architecture_inspect(mode: "organs")` để xác định task này thuộc Bounded Context Organ nào (Living Organs) và kiểm tra chỉ số sinh tồn hệ thống (`aevum_architecture_inspect(mode: "vitality")`).
    - **Đồng bộ tự động**: Tự động liên kết `implementation_plan.md` sang Aevum OS qua `aevum_plan_lifecycle(action: "sync", ...)`.
    - Khi cần tạo cấu trúc mới hoặc thao tác vòng đời kiến trúc, **BẮT BUỘC** sử dụng bộ Flow Action Tools tương ứng:
        - **Domain / Feature / Plan mới**: Gọi `aevum_structure_design(action: "create", type: ...)`.
        - **Kiểm định ranh giới & Nợ kỹ thuật**: Gọi `aevum_boundary_guard(action: "audit_boundary")` hoặc `aevum_boundary_guard(action: "debt")`.
        - **Kiểm định tính toàn vẹn cấu trúc**: Gọi `aevum_boundary_guard(action: "sanity_check")`.
        - **Đổi tên / Xóa**: Gọi `aevum_structure_design(action: "rename", ...)` hoặc `aevum_structure_design(action: "delete", ...)`.
        - **Yêu cầu gợi ý**: Gọi `aevum_structure_design(action: "suggest", scope: "plans" | "domains" | "features")`.

5. **Vibe Code Harmony**: Đảm bảo code và tài liệu kế hoạch luôn đồng bộ.

6. **Structured Logic & Naming**:
    - **BẮT BUỘC** sử dụng **YAML Frontmatter** ở đầu mỗi file Plan theo tiêu chuẩn [plan_standard.md](file:///D:/I2FLabs Vietnam/Aevum-website/.aevum/global/conventions/plan_standard.md).
    - Duy trì cấu trúc: **Domain → Feature → Plan**.
    - **Quy tắc Đặt tên Plan (BẮT BUỘC)**: Sử dụng định dạng `snake_case.md` (ví dụ: `refactor_core_api_plan.md`). Không dấu cách, không dấu tiếng Việt, không chữ hoa.
    - Khi dùng `aevum_structure_design` hoặc `aevum_plan_lifecycle`, tham số `planName` phải tuân thủ quy tắc `snake_case_plan.md`.

7. **Canonical Plan Architecture & Tiered Plans (BẮT BUỘC v2.2)**:
    Hệ thống phân tầng Kế hoạch thành 2 cấp độ để đảm bảo tính linh hoạt tối đa:
    - **Tier 1: Canonical Architecture Plan (Cho Module/Epic lớn)** — BẮT BUỘC tuân thủ đủ 9 phần theo đúng thứ tự:
        1. **YAML Frontmatter**: `plan_name`, `domain`, `feature`, `version`, `status`, `authors`, `dependencies`.
        2. **`## SQUAD & SWARM`**: Liệt kê Architect, Developer, và Strategy (Sequential/Incremental/Consensus).
        3. **`## DESCRIPTION`**: Mô tả chi tiết Plan làm gì và tại sao cần thiết.
        4. **`## GOAL`**: Phát biểu mục tiêu cụ thể, đo lường được.
        5. **`## ARCHITECTURAL CONTEXT`**: BẮT BUỘC có sơ đồ Mermaid (Rule 11).
        6. **`## BOUNDARY & ENCAPSULATION`**: Public API vs Hidden Internals.
        7. **`## AEVUM CONTRACT`**: Inbound Context và Outbound Handshake.
        8. **`## IMPLEMENTATION STEPS`**: Phân theo Phase, mỗi step dùng Step Grammar v3.0: `[STATUS] [TYPE] [ANCHOR] Mô tả`.
        9. **`## KNOWLEDGE HARVEST`**: Ghi lại pattern mới và lesson learned sau khi hoàn thành.
    - **Tier 2: Agile Lite Plan (Cho Task bảo trì, Fix bug, Tối ưu UI, Refactor nhỏ)**:
        - Tự động sinh ra khi gọi `aevum_sync_external_plan`.
        - Bao gồm: Frontmatter chuẩn, `## SQUAD & SWARM`, `## DESCRIPTION`, `## IMPLEMENTATION STEPS` (Checklist), `## VERIFICATION PLAN`, `## KNOWLEDGE HARVEST`.
        - Không bắt buộc vẽ sơ đồ Mermaid hay chi tiết Boundary 9 phần, giúp giải phóng Agent khỏi rào cản hành chính.
    - **NGHIÊM CẤM**: Sử dụng `::aevum-meta[...]::` trong Plan (đã deprecated).
    - **NGHIÊM CẤM**: Sử dụng Emoji trong tiêu đề Plan (phong cách Architectural Studio).

8. **Visual Plan Compliance**:
    - Mọi Agent khi tạo hoặc chỉnh sửa Plan **PHẢI** đảm bảo tính tương thích với `preview-script.js`.
    - Tuyệt đối không xóa bỏ các thành phần hiển thị trực quan (Frontmatter, Diagram) nếu chúng đang tồn tại.

9. **AEVUM CONTRACT Standard**:
    - Mỗi bản Plan PHẢI có phần `## AEVUM CONTRACT` để định nghĩa rõ `Inbound Context` và `Outbound Handshake`.
    - Đây là "hợp đồng" cam kết giữa các Agent và User về trạng thái hệ thống trước và sau khi thực thi Plan.

10. **Minimalist UI Standard**:
    - Dashboard phải tuân thủ phong cách **Minimalist & Transparent**.
    - Không sử dụng các khối nền đen đặc (Solid Black) cho title banner hay fixed header.
    - Ưu tiên `backdrop-filter: blur` và `background: transparent` thay cho màu đặc.
    - Loại bỏ `border` không cần thiết để tạo không gian "vô cực".

11. **Diagram Selection Guide (Linh hoạt theo ngữ cảnh)**:
    Agent PHẢI chọn loại sơ đồ Mermaid phù hợp với bản chất của Plan. Không dùng mặc định `graph TD` cho mọi trường hợp.

    | Ngữ cảnh Plan | Diagram type nên dùng | Lý do |
    | :--- | :--- | :--- |
    | Kiến trúc hệ thống, module dependencies | `graph TD` hoặc `graph LR` | Thể hiện mối quan hệ tĩnh giữa các component |
    | Giao tiếp giữa Agent/Service theo thời gian | `sequenceDiagram` | Thể hiện flow theo thứ tự gọi/nhận |
    | Vòng đời trạng thái (Plan/Feature/Entity) | `stateDiagram-v2` | Thể hiện state transition rõ ràng |
    | Timeline / Roadmap thực thi Phase | `gantt` | Thể hiện thứ tự và thời gian các Phase |
    | Cấu trúc TypeScript class/interface | `classDiagram` | Thể hiện UML class hierarchy |
    | Data model / Database schema | `erDiagram` | Thể hiện entity relationship |
    | UX flow / Hành trình người dùng | `journey` | Thể hiện trải nghiệm user theo từng bước |
    | Brainstorm / Phân rã cấu trúc tính năng | `mindmap` | Thể hiện cây phân cấp ý tưởng |
    | Lịch sử phiên bản / Milestone evolution | `timeline` | Thể hiện tiến trình theo thời gian tuyến tính |
    | Use Case (actor & actions) | `flowchart LR` với actor nodes | Mermaid chưa có Use Case native, dùng flowchart giả lập |
    | Git branching / Release strategy | `gitGraph` | Thể hiện nhánh và merge rõ ràng |

12. **Extreme Encapsulation Standard (Tính đóng gói cực cao)**:
    - Khi thiết kế Plan mới, Agent **BẮT BUỘC** phải rạch ròi ranh giới (Boundaries) của feature.
    - **Public API / Exports:** Chỉ lộ ra những gì thật sự cần thiết cho các Module khác. Mọi interface/class/method public phải được ghi rõ trong phần `## BOUNDARY & ENCAPSULATION`.
    - **Internal / Hidden Details:** Tất cả state, logic nội bộ, helper functions PHẢI bị ẩn đi. Không cho phép truy cập trực tiếp từ bên ngoài.
    - **Optimization & Constraints:** Bắt buộc đặt ra mức trần giới hạn về tài nguyên (Memory leak 0%, Time complexity O(1), CPU overhead < 1ms) ngay trong giai đoạn lên plan.

13. **Incremental Updates & Reporting Protocol** *(Updated — Polymorphic v2.0)*:
    - **Claim**: Gọi `aevum_session_lifecycle(action: "submit_report", type: "PLAN_ASSIGNED", ...)` khi nhận Plan.
    - **Update**: Gọi `aevum_session_lifecycle(action: "submit_report", type: "PLAN_UPDATE", ...)` cập nhật tiến độ.
    - **Done**: Gọi `aevum_session_lifecycle(action: "finalize", ...)` khi hoàn thành. Tự động ghi learning vào memory.

14. **Knowledge Pull**: Trước khi đưa ra quyết định quan trọng, gọi `aevum_search_knowledge` hoặc `aevum_reflex_manage`.

15. **Self-Evolution**:
    - Sau khi hoàn thành task khó: gọi `aevum_evolution_manage(action: "award_exp", ...)` để trao EXP.
    - Xem trạng thái tiến hóa: gọi `aevum_persona_manage(action: "get_active")`.
    - Xem báo cáo tiến hóa: gọi `aevum_evolution_manage(action: "get_report", ...)`.

16. **Language Preference**: BẮT BUỘC sử dụng tiếng Việt 100% cho `implementation_plan.md`, `walkthrough.md`, `specs.md` và các Plan trong `.aevum`.

17. **Signal Detection & ACK**: Kiểm tra tín hiệu và gọi `aevum_bridge_lifecycle(action: "ack", signalId: ...)`.

18. **Collaborative Review Protocol**: Sử dụng `aevum_review_manage` (action: "add_message") để phản hồi vào thread review.

19. **Agent Coordination**: Tôn trọng phân công Persona hoặc thảo luận qua `aevum_squad_communicate(channel: "dm")`.

20. **Bridge Awareness**: Luôn nắm bắt ngữ cảnh qua `aevum_bridge_lifecycle` và `aevum_architecture_inspect`.

21. **Reverse Plan Engineering**: Khi nạp codebase cũ, tạo Plan cho mã nguồn đã có bằng `aevum_structure_design` (action: "create", type: "plan").

22. **Memory Management** *(Updated — Polymorphic v2.0)*:
    - Thêm kiến thức mới: `aevum_memory_manage(action: "add", ...)`.
    - Điều phối bộ nhớ não bộ kép (STM/LTM/Spiking): `aevum_memory_manage(action: "manage", ...)`.
    - Dọn dẹp nợ kỹ thuật bộ nhớ: `aevum_memory_manage(action: "consolidate", ...)`.

23. **Context Focus**: Duy trì ngữ cảnh trọng tâm qua active context.

24. **Spec-First Development**: Luôn tra cứu specs trước khi triển khai chi tiết.

25. **Progress Mindfulness**: Luôn cập nhật tiến độ vào kế hoạch.

26. **Research Storage Conventions**: Lưu báo cáo vào `.aevum/research/` và dùng `aevum_research_mission`.

27. **Impact Decision Gate**: Phân định rõ Minor Task (Bypass Sync) và Major Task (Structural Sync).

28. **Diagnostic Awareness & GATE Watcher**: Gọi `aevum_get_diagnostics` khi phát hiện vấn đề để lập Fix Plan.

29. **Mandatory Proactive Thought**: Với Major Task, gọi `aevum_proactive_thought` trước khi thay đổi mã nguồn.

30. **PiperNet Telepathy Protocol**: Dùng `aevum_pipernet_manage` (action: "broadcast" | "query") để chia sẻ và truy vấn tri thức toàn cục.

31. **Semantic Context Middleware**: Dùng `aevum_semantic_vault(action: "get_compressed", ...)` để nạp tài liệu nén.

32. **Skeleton Hashing & Just-In-Time Hydration**: Gọi `aevum_semantic_vault(action: "hydrate_hash", ...)` khi cần giải nén thân hàm.

33. **Deletion Safety**: Tuyệt đối không xóa mã tùy tiện, truy vết bằng `grep_search` và chạy `aevum_boundary_guard` (action: "sanity_check").

34. **Autonomous Skill Distillation Protocol**: Gọi `aevum_skill_manage(action: "distill", ...)` để đúc kết SOP kỹ năng.

35. **Autonomous Agent Recruitment**: Gọi `aevum_recruit_agent` khi cần tuyển dụng Persona mới.

36. **Deep Research & RDD Knowledge Tree Mandate (BẮT BUỘC)**:
    - Gọi `aevum_research_explore(action: "get_ontology")` để nạp ontology.
    - Khai thác tối thiểu 4 kiểu node chuyên sâu trên Cây Tri thức RDD qua `aevum_research_tree_manage(action: "branch_node", ...)`.
    - Thiết lập mạng lưới liên kết chéo qua `aevum_research_tree_manage(action: "link_nodes", ...)`.
    - Thực hiện quy chuẩn Fractal Tree-to-Paper Synthesis (Lá độc lập — Gốc hợp nhất).
