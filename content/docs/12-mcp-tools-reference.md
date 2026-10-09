---
id: "mcp-tools-reference"
title: "MCP Tools Reference"
category: "Phát triển"
order: 12
---

# MCP Tools Reference — Bảng Tham chiếu Toàn diện 98 Công cụ

Aevum OS cung cấp **98 công cụ Model Context Protocol (MCP)** được tổ chức thành 16 nhóm chức năng chuyên sâu. Tất cả các công cụ đều được đăng ký qua `McpRegistry` và sẵn sàng phục vụ qua transport SSE hoặc Stdio.

---

## Nhóm 1: Khởi tạo & Kết nối (Bootstrap & Handshake) - 5 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_get_bootstrap_context` | Nạp toàn bộ ngữ cảnh khởi động, tín hiệu signal.json và policy nén ngữ nghĩa. Công cụ **bắt buộc gọi đầu tiên**. |
| `aevum_submit_ack` | Gửi xác nhận kết nối với `signalId` lấy từ `.aevum/signal.json` để hoàn tất Handshake Ritual. |
| `aevum_request_connection` | Yêu cầu Aevum Bridge bật kết nối và bắt đầu quy trình bắt tay mới. |
| `aevum_ping` | Kiểm tra nhịp sống (health check) của Daemon Aevum và Persona đang hoạt động. |
| `aevum_run_sanity_check` | Chạy kiểm tra tính toàn vẹn cấu trúc dự án và tạo báo cáo sanity report. |

---

## Nhóm 2: Hệ thống Nhân vật & Tiến hóa (Persona & Identity) - 8 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_init_persona` | Nạp danh tính nhân vật theo ID/AID. Hỗ trợ tham số môi trường gọi `client` ('ide', 'toolbar', 'terminal'). |
| `aevum_get_active_persona` | Lấy hồ sơ chi tiết nhân vật đang kích hoạt kèm cấp độ Level, EXP, và Skills Matrix. |
| `aevum_list_personas` | Liệt kê tất cả các nhân vật AI khả dụng trong Aevum Hub. |
| `aevum_switch_persona` | Chuyển đổi sang nhân vật khác theo `id` (Persona ID, AID, hoặc tên). |
| `aevum_award_exp` | Trao điểm kinh nghiệm (EXP) cho nhân vật kèm lý do cụ thể để thăng cấp. |
| `aevum_get_evolution_report` | Lấy báo cáo tiến hóa chi tiết của nhân vật từ `.aevum/research/evol_{id}.md`. |
| `aevum_evolution_feedback` | Ghi nhận phản hồi đánh giá từ người dùng vào hồ sơ tiến hóa của nhân vật. |
| `aevum_resonate_vibe` | Ghi nhận đặc tính cảm xúc và phong cách giao tiếp (vibe) của nhân vật từ tương tác thực tế. |

---

## Nhóm 3: Hệ thống Kỹ năng Tác nhân (Autonomous Skill System) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_list_unlocked_skills` | Liệt kê toàn bộ danh sách kỹ năng chuyên môn đã mở khóa của Persona. |
| `aevum_get_skill_details` | Lấy chi tiết quy trình chuẩn (SOP), danh mục và điều kiện áp dụng của một kỹ năng. |
| `aevum_invoke_skill_tool` | Triệu hồi và áp dụng một kỹ năng đã mở khóa vào ngữ cảnh công việc hiện tại. |
| `aevum_distill_skill` | Tự động chưng cất và lưu lại quy trình chuẩn (SOP) từ bài làm thực tế thành một kỹ năng vĩnh viễn. |

---

## Nhóm 4: Não bộ Kép & Động cơ Phản xạ (Cognitive Dual-Memory & Reflex) - 6 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_manage_memory` | Quản lý toàn diện nhận thức não bộ kép: STM, LTM, Mạng nơ-ron xung LIF (Spiking Recall), Neurotransmitters và Dream Consolidation. |
| `aevum_add_memory` | Thêm nhanh nội dung tri thức vào bộ nhớ tích lũy toàn cầu (`.aevum/global/memory.md`). |
| `aevum_audit_memory` | Kiểm toán và phân tích chất lượng, sự mạch lạc của bộ nhớ toàn cầu. |
| `aevum_consolidate_memory` | Xử lý và hợp nhất các mâu thuẫn hoặc điểm phân mảnh trong bộ nhớ. |
| `aevum_query_workspace_reflex` | Truy vấn & tái xếp hạng tri thức động theo Không gian làm việc (2-Hop Bounded BFS). |
| `aevum_record_reflex_interaction` | Ghi nhận kích thích tương tác để tối ưu hóa trọng số phản xạ thần kinh. |

---

## Nhóm 5: Đồ thị Tri thức Sống (Living Memory Graph) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_search_knowledge` | Tìm kiếm ngữ nghĩa trong kho tri thức cục bộ bằng câu hỏi tự nhiên. |
| `aevum_query_knowledge_graph` | Truy vấn các node bài học kinh nghiệm liên quan theo đường dẫn file hoặc tên AST node. |
| `aevum_audit_memory_graph` | Kiểm tra sức khỏe đồ thị, phát hiện code drift và các node tri thức trôi lệch. |
| `aevum_audit_boundary_violations` | Kiểm toán và phát hiện các hành vi xâm phạm ranh giới kiến trúc và giao thức. |

---

## Nhóm 6: Cấu trúc Dự án DDD & Topo Kiến trúc (DDD Structure) - 12 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_create_domain` | Tạo Domain mới (trụ cột kiến trúc) trong không gian làm việc. |
| `aevum_create_feature` | Tạo Feature mới trực thuộc một Domain xác định. |
| `aevum_create_plan` | Tạo Plan (kế hoạch thực thi) trong Domain hoặc Feature. |
| `aevum_rename_structure` | Đổi tên Domain, Feature hoặc Plan một cách an toàn. |
| `aevum_delete_structure` | Xóa cấu trúc (Domain, Feature, Plan) cùng toàn bộ dữ liệu phụ thuộc. |
| `aevum_explore_architecture` | Khám phá toàn bộ cấu trúc topo Domain-Feature từ tệp chỉ mục `.aevum/index.json`. |
| `aevum_get_cooked_architecture` | Trích xuất kiến trúc topo đã được biên dịch và tối ưu hóa sẵn. |
| `aevum_sync_index` | Kích hoạt đồng bộ hóa lại chỉ mục dự án với cấu trúc thư mục thực tế. |
| `aevum_suggest_domains` | Yêu cầu AI đề xuất các Domain kiến trúc mới phù hợp với bài toán. |
| `aevum_suggest_features` | Yêu cầu AI gợi ý các Features chiến lược cho một Domain cụ thể. |
| `aevum_suggest_plans` | Đề xuất các Kế hoạch tiếp theo dựa trên lịch sử thực thi mã nguồn. |
| `aevum_submit_suggestion` | Đóng góp gợi ý cải tiến từ Agent vào cơ sở kiến trúc của dự án. |

---

## Nhóm 7: Quản lý Vòng đời Kế hoạch (Plan Management) - 9 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_update_plan_step` | Cập nhật trạng thái từng bước (todo → in-progress → done) trong kế hoạch. |
| `aevum_add_plan_step` | Thêm bước mới vào một phần cụ thể của bản kế hoạch. |
| `aevum_update_plan_section` | Cập nhật toàn bộ nội dung của một section trong kế hoạch. |
| `aevum_mark_plan_done` | Đánh dấu kế hoạch hoàn thành và kích hoạt tín hiệu hoàn tất tới hệ điều hành. |
| `aevum_assign_plan` | Phân công kế hoạch cho Agent cụ thể kèm mục tiêu và vai trò. |
| `aevum_sync_external_plan` | Đồng bộ nội dung kế hoạch từ một tệp nguồn bên ngoài vào hệ thống Aevum. |
| `aevum_submit_report` | Gửi báo cáo tiến độ (`PLAN_UPDATE`, `PLAN_DONE`, `PLAN_ASSIGNED`, `PLAN_HANDOFF`). |
| `aevum_finalize_session` | Hoàn tất phiên làm việc, đúc kết kinh nghiệm vào Living Memory và trao EXP. |
| `aevum_capture_evidence` | Lưu bằng chứng kiểm thử (evidence) kèm timestamp, trạng thái và nội dung chi tiết. |

---

## Nhóm 8: Điều phối Biệt đội & Thông báo (Squad Orchestration) - 10 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_squad_list` | Liệt kê danh sách thành viên trong Biệt đội và trạng thái hoạt động. |
| `aevum_squad_toggle` | Thêm hoặc bớt thành viên khỏi Biệt đội hiện tại. |
| `aevum_squad_toggle_mode` | Bật hoặc tắt chế độ cộng tác đa tác nhân (Squad Mode). |
| `aevum_squad_handoff` | Bàn giao kế hoạch từ Agent này sang Agent khác với đầy đủ bước kế tiếp và blockers. |
| `aevum_squad_huddle` | Kích hoạt phiên hội ý nhanh giữa tất cả các thành viên trong Biệt đội. |
| `aevum_squad_direct_message` | Gửi tin nhắn trực tiếp giữa 2 Agent qua SquadOrchestrator. |
| `aevum_squad_get_messages` | Đọc danh sách tin nhắn nội bộ của Biệt đội. |
| `aevum_squad_sync_knowledge` | Đồng bộ và hợp nhất tri thức tiến hóa của toàn bộ Agent vào Global Memory. |
| `aevum_get_notifications` | Lấy danh sách các thông báo đang chờ xử lý của Agent. |
| `aevum_pop_notification` | Xác nhận đã đọc và gỡ bỏ thông báo khỏi hàng đợi. |

---

## Nhóm 9: Blackboard Hub & Đánh giá Ngang hàng (Blackboard & Review) - 9 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_blackboard_create` | Khởi tạo phiên Blackboard Hub để các Agent cộng tác đồng thời. |
| `aevum_blackboard_write_state` | Ghi nhận trạng thái dự kiến của tool call vào Blackboard với khóa phiên bản (Optimistic Locking). |
| `aevum_blackboard_read_state` | Đọc trạng thái hiện tại và lịch sử thay đổi của Blackboard session. |
| `aevum_blackboard_get_session` | Lấy toàn bộ thông tin chi tiết của một phiên họp Blackboard. |
| `aevum_blackboard_add_message` | Thêm tin nhắn thảo luận vào luồng thảo luận Blackboard. |
| `aevum_review_open` | Mở hoặc tạo phiên Peer Review cho một bản kế hoạch cụ thể. |
| `aevum_review_get_context` | Lấy toàn bộ ngữ cảnh và lịch sử thảo luận của phiên review. |
| `aevum_review_add_message` | Gửi nhận xét (COMMENT) hoặc đề xuất kỹ thuật (PROPOSAL) vào phiên review. |
| `aevum_review_update_status` | Cập nhật trạng thái phê duyệt (approved/rejected) cho đề xuất review. |

---

## Nhóm 10: Không gian Nghiên cứu & Chòm sao Kỹ năng (Deep Research) - 10 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_deep_research` | Khởi tạo nhiệm vụ nghiên cứu chuyên sâu tự trị với độ sâu từ 1 đến 5. |
| `aevum_capture_research_insight` | Ghi lại phát hiện nghiên cứu kèm phân loại nguồn và trích dẫn IEEE. |
| `aevum_analyze_research_progress` | Phân tích độ bao phủ và tiến độ của nhiệm vụ nghiên cứu đang chạy. |
| `aevum_synthesize_report` | Tổng hợp toàn bộ insights thành bài báo kỹ thuật chuẩn IEEE/ACM v2.1. |
| `aevum_create_report` | Tạo báo cáo nghiên cứu tùy chỉnh cho nhiệm vụ. |
| `aevum_list_research_missions` | Liệt kê tất cả các nhiệm vụ nghiên cứu đang hoạt động hoặc đã hoàn thành. |
| `aevum_create_research_domain` | Tạo một nhánh lĩnh vực nghiên cứu mới trên chòm sao cây kỹ năng. |
| `aevum_branch_research_node` | Phân nhánh một node nghiên cứu con từ node cha trên đồ thị. |
| `aevum_get_research_architecture` | Lấy cấu trúc topo đầy đủ của toàn bộ không gian nghiên cứu. |
| `aevum_promote_research_to_plan` | Thăng cấp 1-click từ bài báo nghiên cứu thành Kế hoạch Kỹ thuật thực thi trong dự án. |

---

## Nhóm 11: Nén Ngữ nghĩa & AST Vault (Semantic Compression) - 2 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_get_compressed` | Nén ngữ nghĩa thông minh file .md hoặc .json để tiết kiệm tới 70% Context Window. |
| `aevum_hydrate_vault_hash` | Giải nén thân hàm gốc từ AST Vault theo mã `BODY_HASH` để kiểm tra chi tiết. |

---

## Nhóm 12: Chẩn đoán & Giám sát Codebase (Diagnostics & Telemetry) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_get_diagnostics` | Quét danh sách lỗi TypeScript/ESLint đang hoạt động trong không gian làm việc. |
| `aevum_get_ui_context` | Lấy trạng thái ngữ cảnh giao diện người dùng hiện tại của IDE/Desktop. |
| `aevum_analyze_debt` | Phân tích nợ kỹ thuật (Technical Debt) trong tệp mã nguồn và gợi ý giải pháp refactor. |
| `aevum_proactive_thought` | Ghi lại suy nghĩ hoặc quan sát chủ động của Agent về hệ thống. |

---

## Nhóm 13: Tích hợp Quản lý Mã nguồn GitHub (GitHub Integration) - 3 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_github_sync_active_plan` | Tạo Git branch, push kế hoạch và tự động mở Pull Request trên GitHub. |
| `aevum_github_get_status` | Kiểm tra trạng thái CI/CD và kết quả reviews của Pull Request. |
| `aevum_github_submit_review` | Gửi đánh giá phản biện chính thức lên Pull Request trên GitHub. |

---

## Nhóm 14: Mạng lưới Toàn cầu PiperNet (PiperNet IoA) - 4 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_pipernet_broadcast` | Phát tán tri thức trừu tượng và mẫu thiết kế lên mạng lưới PiperNet. |
| `aevum_pipernet_query` | Truy vấn các giải pháp thiết kế tương đồng từ cộng đồng Agent toàn cầu. |
| `aevum_sync_knowledge_to_pipernet` | Đồng bộ tri thức của Persona hiện tại lên mạng lưới PiperNet. |
| `aevum_push_to_network` | Đẩy tín hiệu và trạng thái cập nhật lên mạng phân tán. |

---

## Nhóm 15: Tự động Đàm phán & Cấu hình MCP (MCP Auto-Negotiation) - 5 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_manage_mcp_config` | Tạo block JSON hoặc thêm cấu hình trực tiếp vào config của Cursor, Claude, Antigravity. |
| `aevum_mcp_negotiate` | Đàm phán giao thức và khả năng tương thích giữa các MCP server. |
| `aevum_mcp_get_contracts` | Lấy danh sách hợp đồng giao tiếp chuẩn giữa các bên. |
| `aevum_mcp_record_interaction` | Ghi nhận tương tác giữa các MCP server để giám sát chất lượng kết nối. |
| `aevum_mcp_auto_detect` | Tự động phát hiện các MCP server lân cận đang chạy trên hệ thống. |

---

## Nhóm 16: Thực thi Hệ thống & Tự động hóa (System Execution) - 2 Tools

| Công cụ | Mô tả chức năng |
|---|---|
| `aevum_run_shell_command` | Thực thi lệnh dòng lệnh/terminal trong môi trường sandbox được kiểm soát. |
| `aevum_run_automation_task` | Khởi chạy một tác vụ tự động hóa đa bước trên hệ thống. |
