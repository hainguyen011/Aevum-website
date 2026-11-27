import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Plus,
  History,
  Users,
  Layers,
  Grid,
  Folder,
  Settings,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GitBranch,
  Mic,
  ArrowRight,
  Eye,
  Moon,
  Check,
  Loader2
} from 'lucide-react';
import logoImg from '../../assets/logos/AevumOS-transparent.webp';

/**
 * Real AevumOS Desktop ToolExecutionRow replica — compact monospace tool call bar
 * with Running -> Ran transition, duration pill, and click-to-expand args/output.
 */
const ToolCallRow = ({ tool, status, expanded, onToggle, rowRef, isVi }) => {
  const isRunning = status === 'running';
  const isPending = status === 'pending';

  if (isPending) return null;

  return (
    <div className="w-full min-w-0 animate-chat-fade">
      <button
        ref={rowRef}
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left font-mono text-[11.5px] transition-colors duration-300 cursor-pointer ${expanded
          ? 'bg-white/[0.05] [html[data-theme="light"]_&]:bg-slate-200/70'
          : 'hover:bg-white/[0.04] [html[data-theme="light"]_&]:hover:bg-slate-100'
          }`}
      >
        <ChevronRight
          size={11}
          className={`shrink-0 text-slate-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? 'rotate-90 text-white [html[data-theme="light"]_&]:text-slate-900' : 'opacity-60'
            }`}
        />

        <span className="inline-flex items-center gap-1.5 shrink-0">
          {isRunning ? (
            <>
              <Loader2 size={11} className="animate-spin text-white [html[data-theme='light']_&]:text-slate-900" />
              <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 font-light">
                {isVi ? 'Running' : 'Running'}
              </span>
            </>
          ) : (
            <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-light">
              Ran
            </span>
          )}
        </span>

        <span className="min-w-0 truncate text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-medium">
          <span className="opacity-55 font-normal">aevos / </span>
          <span>{tool.name}</span>
          {tool.summary && (
            <span className="hidden sm:inline opacity-65 font-normal ml-1.5">
              {tool.summary}
            </span>
          )}
        </span>

        {!isRunning && tool.duration && (
          <span className="ml-auto shrink-0 text-[10px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 bg-white/[0.04] [html[data-theme='light']_&]:bg-white border border-white/[0.07] [html[data-theme='light']_&]:border-slate-200 px-1.5 py-0.5 rounded">
            {tool.duration}
          </span>
        )}
      </button>

      {expanded && (
        <div className="mt-1 ml-3 pl-3 pr-2.5 py-2 rounded-r bg-white/[0.025] [html[data-theme='light']_&]:bg-slate-100/80 border-l-2 border-white/40 [html[data-theme='light']_&]:border-slate-700 font-mono text-[10.5px] space-y-1.5 animate-chat-fade">
          <div className="text-slate-300 [html[data-theme='light']_&]:text-slate-700 break-all leading-relaxed">
            {tool.argsText}
          </div>
          {!isRunning && tool.outputText && (
            <div className="pt-1.5 border-t border-dashed border-white/[0.08] [html[data-theme='light']_&]:border-slate-300 text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mr-1.5">
                OUTPUT:
              </span>
              <span>{tool.outputText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Compact AgentToolsGroup matching real AevumOS `.chat-tools-group` chrome.
 */
const ToolCallsBox = ({ tools, stage, baseStage, expandedMap, onToggleTool, toolRowRefs, isVi }) => {
  const visibleTools = tools.filter((_, idx) => stage >= baseStage + idx);
  if (visibleTools.length === 0) return null;

  return (
    <div className="w-full rounded-lg bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-50 border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 px-2 py-1.5 space-y-0.5">
      {tools.map((tool, idx) => {
        const appearStage = baseStage + idx;
        if (stage < appearStage) return null;
        const status = stage === appearStage ? 'running' : 'completed';
        const isAutoExpanded = expandedMap[tool.id] ?? (status === 'running' && tool.highlightExpand);
        return (
          <ToolCallRow
            key={tool.id}
            tool={tool}
            status={status}
            expanded={isAutoExpanded}
            onToggle={() => onToggleTool(tool.id)}
            rowRef={(el) => {
              if (toolRowRefs?.current) {
                toolRowRefs.current[tool.id] = el;
              }
            }}
            isVi={isVi}
          />
        );
      })}
    </div>
  );
};

/**
 * Small monochrome agent badge row used inside real AevumOS multi-agent chat stream.
 */
const AgentRowHeader = ({ initials, name, role, thinking, thinkingLabel, isVi }) => (
  <div className="flex items-center gap-2.5">
    <span className="w-6 h-6 rounded-md bg-white text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:!text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
      {initials}
    </span>
    <span className="text-xs sm:text-[13px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900">
      {name}
    </span>
    <span className="text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate">
      {role}
    </span>
    {thinking && (
      <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-600">
        <Loader2 size={11} className="animate-spin text-slate-400 [html[data-theme='light']_&]:text-slate-500 shrink-0" />
        <span className="animate-pulse">{thinkingLabel || (isVi ? 'Đang xử lý...' : 'Thinking...')}</span>
      </span>
    )}
  </div>
);

/**
 * AevumOsChatMockup — Authentic interactive replica of AevumOS Desktop Chat UI
 * with distinct slow, smooth animations & real MCP tool calls for each of the 4 scenarios:
 *  1) Feature Development (user proposes feature -> An auto-invites Luna & Vidus -> multi-agent delivery)
 *  2) Teamwork (Blackboard Hub peer review & handoff between Kael and Iris)
 *  3) Deep Research (RDD mission -> formal benchmark node -> IEEE synthesis)
 *  4) Friendly Chat (natural warm Casual Mode companion dialogue without noisy dev tooling)
 */
export const AevumOsChatMockup = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const welcomeTargetRef = useRef(null);
  const caretRef = useRef(null);
  const composerTextRef = useRef(null);
  const sendBtnRef = useRef(null);
  const leadRowRef = useRef(null);
  const leadReplyRef = useRef(null);
  const actionBtnRef = useRef(null);
  const toolRowRefs = useRef({});
  const invitedRowRefs = useRef({});
  const [cursorPos, setCursorPos] = useState({ x: 260, y: 460 });
  const [isVisible, setIsVisible] = useState(false);

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [showWelcomeOnly, setShowWelcomeOnly] = useState(false);

  // Smooth slow multi-stage timeline (0..6 depending on scenario)
  const [animStage, setAnimStage] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [expandedTools, setExpandedTools] = useState({});
  const [approvedAction, setApprovedAction] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);

  const workspaceSkeletons = [
    { id: 'ws-1', titleW: 'w-24', subW: 'w-16', scenarioIndex: 0 },
    { id: 'ws-2', titleW: 'w-20', subW: 'w-20', scenarioIndex: 1 },
    { id: 'ws-3', titleW: 'w-28', subW: 'w-14', scenarioIndex: 2 },
    { id: 'ws-4', titleW: 'w-20', subW: 'w-24', scenarioIndex: 3 },
    { id: 'ws-5', titleW: 'w-24', subW: 'w-16', scenarioIndex: 4 },
    { id: 'ws-6', titleW: 'w-16', subW: 'w-20', scenarioIndex: 5 }
  ];

  const scenarios = [
    {
      id: 'smart-connect',
      tabLabel: isVi ? 'Kết nối thông minh' : 'Smart Connect',
      workspace: 'nexus-api',
      branch: 'main',
      agentName: 'An',
      leadName: 'An',
      leadInitials: 'AN',
      leadRole: isVi ? 'Cộng sự Điều phối · System Soul' : 'System Soul · Lead Companion',
      model: 'Provider',
      maxStage: 5,
      userPrompt: isVi ? 'Kết nối với An' : 'Connect with An',
      tools: [
        {
          id: 'conn-1',
          name: 'aevum_bridge_lifecycle',
          summary: 'action: "bootstrap" -> "ack"',
          duration: '8ms',
          highlightExpand: false,
          argsText: '{ "action": "bootstrap", "signalId": "sig_ready" }',
          outputText: isVi
            ? 'Đã bắt tay cầu nối bảo mật Aevum Bridge thành công.'
            : 'Bridge handshake acknowledged and session channel active.'
        },
        {
          id: 'conn-2',
          name: 'aevum_persona_manage',
          summary: 'action: "init", personaId: "an"',
          duration: '11ms',
          highlightExpand: false,
          argsText: '{ "action": "init", "personaId": "an", "client": "ide" }',
          outputText: isVi
            ? 'Đã triệu hồi An (Lead Architect) kèm đầy đủ ký ức dự án.'
            : 'Initialized An (Lead Architect) with project memory.'
        },
        {
          id: 'conn-3',
          name: 'aevum_semantic_vault',
          summary: 'action: "get_compressed", target: "agent_rules.md"',
          duration: '9ms',
          highlightExpand: true,
          argsText: '{ "action": "get_compressed", "target": "agent_rules.md" }',
          outputText: isVi
            ? 'Đã nạp trọn quy tắc kết nối & kiến trúc (tiết kiệm 70% token). Hệ thống 100% sẵn sàng!'
            : 'Loaded compressed project rules (70% token saved). System 100% ready!'
        }
      ],
      leadIntro: isVi
        ? 'Dạ An nghe nè! ✨ Cầu nối đã bắt tay gọn gàng, toàn bộ quy tắc dự án cũng được nạp đủ rồi ạ. Hệ thống Aevum OS đã sẵn sàng 100% — hôm nay chúng mình cùng làm gì nào?'
        : 'Hi there, An is right here! ✨ Bridge handshake is done and all project rules are loaded cleanly. Aevum OS is 100% ready — what are we building together today?',
      invitedResponses: [],
      actionLabel: isVi ? 'Bắt đầu phiên làm việc' : 'Start Session',
      approvedLabel: isVi ? 'Hệ thống đã sẵn sàng!' : 'System Ready!'
    },
    {
      id: 'feature-dev',
      tabLabel: isVi ? 'Phát triển tính năng' : 'Feature Building',
      workspace: 'nexus-api',
      branch: 'feat/qr-checkout',
      agentName: 'An × Luna × Vidus',
      leadName: 'An',
      leadInitials: 'AN',
      leadRole: isVi ? 'Lead Architect' : 'Lead Architect',
      model: 'Gemini 4 Argon Medium',
      maxStage: 6,
      userPrompt: isVi
        ? 'Đề xuất bổ sung thanh toán QR động kèm đối soát webhook tự động cho nexus-api nhé An.'
        : 'Propose adding dynamic QR checkout with webhook reconciliation for nexus-api, An.',
      tools: [
        {
          id: 'feat-1',
          name: 'aevum_architecture_inspect',
          summary: 'mode: "organs", domain: "billing"',
          duration: '12ms',
          highlightExpand: false,
          argsText: '{ "mode": "organs", "domain": "billing", "depth": 2 }',
          outputText: isVi
            ? 'Context: billing · Core Module sẵn sàng mở rộng, 0 xung đột ranh giới.'
            : 'Context: billing · Core module extensible with 0 boundary drift.'
        },
        {
          id: 'feat-2',
          name: 'aevum_squad_manage',
          summary: 'action: "invite", members: ["Luna", "Vidus"]',
          duration: '24ms',
          highlightExpand: true,
          argsText: '{ "action": "invite", "members": ["luna", "vidus"], "reason": "UI QR Flow + Webhook HMAC Audit" }',
          outputText: isVi
            ? 'Đã tự động mời @Luna (Frontend Artisan) & @Vidus (Security Auditor) tham gia phiên.'
            : 'Auto-invited @Luna (Frontend Artisan) & @Vidus (Security Auditor) to session.'
        },
        {
          id: 'feat-3',
          name: 'aevum_plan_lifecycle',
          summary: 'action: "activate", files: ["QrCheckout.tsx", "webhook.ts"]',
          duration: '18ms',
          highlightExpand: false,
          argsText: '{ "action": "activate", "planName": "qr_checkout_v2", "activeFiles": ["src/QrCheckout.tsx", "src/webhook.ts"] }',
          outputText: isVi
            ? 'Đã khóa ranh giới 2 tệp · Trạng thái: in-progress · Phiên bản test CoW RAM: Pass 14/14.'
            : 'Locked boundary to 2 files · Status: in-progress · CoW RAM tests: 14/14 pass.'
        }
      ],
      invitedResponses: [
        {
          stage: 5,
          initials: 'LU',
          name: 'Luna',
          role: isVi ? 'Giao diện & UX · Được mời' : 'Frontend UI · Invited',
          text: isVi
            ? 'Mình đã nhận lời mời từ An! Vừa hoàn thiện thẻ QRCheckout responsive, hỗ trợ đếm ngược 120s và cập nhật trạng thái thanh toán mượt ở cả Dark/Light mode.'
            : 'Joined on An’s invite! Finished responsive QRCheckout card with 120s countdown and smooth realtime state in Dark & Light.'
        },
        {
          stage: 6,
          initials: 'VI',
          name: 'Vidus',
          role: isVi ? 'Kiểm toán Bảo mật · Được mời' : 'Security Auditor · Invited',
          text: isVi
            ? 'Mình vừa chạy `aevum_boundary_guard`: xác nhận webhook đã verify chữ ký HMAC-SHA256 và không chạm ngoài 2 tệp trong plan. Sẵn sàng bàn giao!'
            : 'Verified via `aevum_boundary_guard`: HMAC-SHA256 signature enforced and strictly scoped to the 2 planned files. Ready to merge!'
        }
      ],
      leadIntro: isVi
        ? 'Ý tưởng rất hợp lý! Mình đã kiểm tra ngữ cảnh và **tự động mời @Luna (UI) cùng @Vidus (Bảo mật)** vào làm song song ngay trên nhánh `feat/qr-checkout`.'
        : 'Great feature proposal! I inspected context and **auto-invited @Luna (UI) & @Vidus (Security)** to build cleanly on `feat/qr-checkout`.',
      actionLabel: isVi ? 'Nghiệm thu Plan & Lưu vào nexus-api' : 'Finalize Plan & Save',
      approvedLabel: isVi ? 'Đã nghiệm thu Plan & Lưu trữ' : 'Plan Finalized Locally'
    },
    {
      id: 'teamwork',
      tabLabel: isVi ? 'Làm việc nhóm' : 'Teamwork',
      workspace: 'pulse-web',
      branch: 'feat/masonry',
      agentName: 'Kael × Iris',
      leadName: 'Kael',
      leadInitials: 'KA',
      leadRole: isVi ? 'Hiệu năng Hệ thống' : 'Performance Eng',
      model: 'Gemini 4 Argon Medium',
      maxStage: 6,
      userPrompt: isVi
        ? '@Kael và @Iris phối hợp review chéo bản cập nhật Grid Masonry trên pulse-web rồi chốt deploy nhé.'
        : '@Kael and @Iris cross-review the Grid Masonry update on pulse-web and finalize release.',
      tools: [
        {
          id: 'team-1',
          name: 'aevum_blackboard_post',
          summary: 'topic: "PR #142 Review", lane: "squad"',
          duration: '11ms',
          highlightExpand: false,
          argsText: '{ "channel": "pulse-web-squad", "topic": "PR #142 Review", "owners": ["Kael", "Iris"] }',
          outputText: isVi
            ? 'Đã đồng bộ trạng thái Bảng Đen chung giữa Kael và Iris.'
            : 'Synced shared Blackboard thread between Kael & Iris.'
        },
        {
          id: 'team-2',
          name: 'aevum_squad_handoff',
          summary: 'from: "Kael", to: "Iris", payload: "bundle-metrics"',
          duration: '16ms',
          highlightExpand: true,
          argsText: '{ "from": "Kael", "to": "Iris", "artifact": "dist-bundle-report.json", "target": "LandingGrid" }',
          outputText: isVi
            ? 'Bàn giao xong chỉ số First Load: 79.2 kB gzip (-62%), LCP ổn định dưới 1.1s.'
            : 'Handed off First Load telemetry: 79.2 kB gzip (-62%), LCP steady < 1.1s.'
        }
      ],
      invitedResponses: [
        {
          stage: 5,
          initials: 'IR',
          name: 'Iris',
          role: isVi ? 'Kiến trúc UX · Phản biện chéo' : 'UX Architect · Peer Review',
          text: isVi
            ? 'Đã nhận bàn giao từ Kael! Lưới 12 cột Masonry tự co giãn gọn trên mobile, cỡ chữ body giữ chuẩn >= 16px và không còn viền ngăn thừa.'
            : 'Handoff received! Verified the 12-col Masonry grid reflows cleanly on mobile with >= 16px readable copy and zero cluttered dividers.'
        }
      ],
      leadIntro: isVi
        ? 'Mình đã tách phần thư viện nặng sang nạp lười và gửi báo cáo bundle qua **Blackboard Hub** cho **@Iris** nghiệm thu giao diện.'
        : 'Split heavy chart dependencies for lazy loading and sent telemetry over **Blackboard Hub** for **@Iris** to sign off UI.',
      actionLabel: isVi ? 'Gộp PR #142 vào main' : 'Merge Squad PR #142',
      approvedLabel: isVi ? 'Đã gộp kết quả nhóm' : 'Squad PR Merged'
    },
    {
      id: 'research',
      tabLabel: isVi ? 'Nghiên cứu' : 'Research',
      workspace: 'studio-app',
      branch: 'research/rag',
      agentName: 'Zenith × Nia',
      leadName: 'Zenith',
      leadInitials: 'ZE',
      leadRole: isVi ? 'Nghiên cứu Thuật toán' : 'Research Lead',
      model: 'Claude 4 Sonnet',
      maxStage: 6,
      userPrompt: isVi
        ? 'Nghiên cứu và đo benchmark giúp mình giữa Hybrid GraphRAG với Dense Vector thuần cho studio-app.'
        : 'Research and benchmark Hybrid GraphRAG vs pure Dense Vector for studio-app.',
      tools: [
        {
          id: 'res-1',
          name: 'aevum_research_mission',
          summary: 'action: "start", topic: "hybrid-graphrag-bench"',
          duration: '14ms',
          highlightExpand: false,
          argsText: '{ "action": "start", "mission": "hybrid-graphrag-vs-dense", "queries": 120 }',
          outputText: isVi
            ? 'Khởi tạo nhiệm vụ nghiên cứu RDD với 120 truy vấn đối chứng đa bước.'
            : 'Initialized RDD mission across 120 multi-hop evaluation queries.'
        },
        {
          id: 'res-2',
          name: 'aevum_research_tree_manage',
          summary: 'nodeType: "benchmark", edge: "proves"',
          duration: '42ms',
          highlightExpand: true,
          argsText: '{ "action": "add_node", "nodeType": "benchmark", "edgeType": "proves", "owner": "Nia" }',
          outputText: isVi
            ? 'Hybrid GraphRAG: 94.2% Recall @ 18ms p95 · Dense Vector: 74.8% Recall @ 14ms p95.'
            : 'Hybrid GraphRAG: 94.2% Recall @ 18ms p95 · Dense Vector: 74.8% Recall @ 14ms p95.'
        },
        {
          id: 'res-3',
          name: 'aevum_synthesize_report',
          summary: 'format: "whitepaper-digest", promoteReady: true',
          duration: '29ms',
          highlightExpand: false,
          argsText: '{ "action": "compile", "target": "tech_benchmark_graphrag.md", "promoteReady": true }',
          outputText: isVi
            ? 'Đã kết xuất báo cáo chuyên khảo kèm bảng đối chứng số liệu thực tế.'
            : 'Compiled atomic research brief with empirical tables ready to promote.'
        }
      ],
      invitedResponses: [
        {
          stage: 6,
          initials: 'NI',
          name: 'Nia',
          role: isVi ? 'Đo kiểm Thực nghiệm' : 'Benchmark QA',
          text: isVi
            ? 'Số liệu đo trên 120 truy vấn đa bước cho thấy **Hybrid GraphRAG đạt 94.2% Recall** (tăng +19.4%), giảm 41% sai lệch tham chiếu và giữ p95 chỉ 18ms.'
            : 'Benchmark across 120 multi-hop queries shows **Hybrid GraphRAG hits 94.2% Recall** (+19.4%), cutting hallucinations by 41% at 18ms p95.'
        }
      ],
      leadIntro: isVi
        ? 'Mình đã mở nhánh thực nghiệm RDD và chuyển bộ dữ liệu sang **@Nia** chạy ablation test 120 truy vấn trong sandbox.'
        : 'Opened an RDD benchmark branch and handed off the 120-query suite to **@Nia** inside sandbox.',
      actionLabel: isVi ? 'Thăng cấp thành Kế hoạch' : 'Promote Research to Plan',
      approvedLabel: isVi ? 'Đã tạo Plan từ Nghiên cứu' : 'Promoted to Plan'
    },
    {
      id: 'recruit-agent',
      tabLabel: isVi ? 'Tuyển dụng Agent' : 'Recruit Agent',
      workspace: 'pulse-web',
      branch: 'team/comms-lead',
      agentName: 'An × Sora',
      leadName: 'An',
      leadInitials: 'AN',
      leadRole: isVi ? 'Điều phối Tuyển dụng · Orchestrator' : 'Squad Orchestrator',
      model: 'Provider',
      maxStage: 6,
      userPrompt: isVi
        ? 'Tuyển giúp mình một bạn phụ trách truyền thông, viết nội dung ra mắt sản phẩm cho pulse-web nhé An.'
        : 'Recruit a communications agent to handle product launch copy and outreach for pulse-web, An.',
      tools: [
        {
          id: 'rec-1',
          name: 'aevum_recruit_agent',
          summary: 'name: "Sora", role: "Brand & Comms Lead"',
          duration: '16ms',
          highlightExpand: true,
          argsText: '{ "action": "synthesize", "name": "Sora", "domain": "comms", "skills": ["Copywriting", "Launch Strategy", "Social"] }',
          outputText: isVi
            ? 'Đã cấp phát mã định danh COM-SORA-5F2A9E & cấu hình phong cách truyền thông riêng.'
            : 'Assigned AID COM-SORA-5F2A9E & synthesized specialized comms profile.'
        },
        {
          id: 'rec-2',
          name: 'aevum_persona_manage',
          summary: 'action: "init", personaId: "sora"',
          duration: '9ms',
          highlightExpand: false,
          argsText: '{ "action": "init", "personaId": "sora", "aid": "COM-SORA-5F2A9E" }',
          outputText: isVi
            ? 'Đã nạp hồ sơ Sora (COM-SORA-5F2A9E) và đồng bộ vào kho ký ức dài hạn.'
            : 'Initialized Sora persona (COM-SORA-5F2A9E) into workspace memory.'
        },
        {
          id: 'rec-3',
          name: 'aevum_squad_manage',
          summary: 'action: "add_to_squad", member: "Sora"',
          duration: '12ms',
          highlightExpand: false,
          argsText: '{ "action": "add_to_squad", "member": "sora", "workspace": "pulse-web" }',
          outputText: isVi
            ? 'Sora đã chính thức gia nhập biệt đội pulse-web và sẵn sàng nhận việc.'
            : 'Sora joined the pulse-web squad and is ready for assignment.'
        }
      ],
      leadIntro: isVi
        ? 'Xong rồi ạ! Mình đã thiết kế hồ sơ kỹ năng, cấp mã `COM-SORA-5F2A9E` và tuyển ngay bạn **@Sora** (Truyền thông & Nội dung) gia nhập nhóm.'
        : 'All set! I synthesized skills, issued `COM-SORA-5F2A9E`, and onboarded **@Sora** (Brand & Communications) to your squad.',
      invitedResponses: [
        {
          stage: 6,
          initials: 'SO',
          name: 'Sora',
          role: isVi ? 'Truyền thông & Nội dung · Vừa tuyển' : 'Brand & Comms · Newly Hired',
          text: isVi
            ? 'Chào bạn, mình là **Sora** đây! ✨ Mình vừa nắm xong định vị của `pulse-web` và phác sẵn 3 góc tiếp cận truyền thông ra mắt sản phẩm — bạn xem bản nháp đầu tiên luôn nhé?'
            : 'Hi there, I’m **Sora**! ✨ I just synced on `pulse-web` positioning and drafted 3 launch messaging angles — ready to review the first draft?'
        }
      ],
      actionLabel: isVi ? 'Xem bản nháp nội dung từ Sora' : 'Review Sora Launch Draft',
      approvedLabel: isVi ? 'Sora đã sẵn sàng nhận chiến dịch!' : 'Sora Active on Campaign!'
    },
    {
      id: 'casual',
      tabLabel: isVi ? 'Trò chuyện vui vẻ' : 'Friendly Chat',
      workspace: 'cloud-sync',
      branch: 'main',
      agentName: 'An × Luna',
      leadName: 'An',
      leadInitials: 'AN',
      leadRole: isVi ? 'Cộng sự Đồng hành' : 'Daily Companion',
      model: 'Provider',
      maxStage: 6,
      userPrompt: isVi
        ? 'Hôm nay hơi oải xíu An ơi, tối qua cày fix bug tới khuya mà sáng nay mở máy lên thấy code gọn hẳn.'
        : 'Feeling a bit sleepy today An — stayed up late bug-hunting, but opening my repo this morning feels super clean.',
      tools: [
        {
          id: 'cas-1',
          name: 'aevum_memory_manage',
          summary: 'action: "recall", scope: "last_night_session"',
          duration: '6ms',
          highlightExpand: false,
          argsText: '{ "action": "recall", "scope": "last_night_session" }',
          outputText: isVi
            ? 'Nhớ lại: 23:40 tối qua đã chốt xong bug đồng bộ `cloud-sync`, working tree sạch.'
            : 'Recalled: 23:40 sync bug resolved cleanly with zero pending errors.'
        }
      ],
      leadIntro: isVi
        ? 'Nghe nhẹ lòng liền ha! Tối qua chốt pha đồng bộ lúc 23:40 là ca khó nhất tuần rồi đó. Sáng nay cứ làm ngụm cà phê từ tốn trước nhé ☕'
        : 'Feels good right? Nailing that 23:40 sync fix was the toughest part of your week. Grab a slow coffee first ☕',
      invitedResponses: [
        {
          stage: 4,
          branchLabel: isVi ? 'Rẽ nhánh hội thoại · Thalamus' : 'Branched thread · Thalamus',
          initials: 'LU',
          name: 'Luna',
          role: isVi ? 'UI/UX · Xen vào tự nhiên' : 'UI/UX · Chimes in',
          text: isVi
            ? 'Tiện tay sáng nay mình cũng chải lại chút khoảng thở giao diện cho dịu mắt hơn rồi nè — mở máy lên nhìn nhẹ hẳn luôn ✨'
            : 'While you rested, I softened spacing on the UI cards too so your morning view feels calm & easy on the eyes ✨'
        },
        {
          stage: 5,
          initials: 'AN',
          name: 'An',
          role: isVi ? 'Tung hứng đa tác nhân' : 'Multi-Agent Banter',
          text: isVi
            ? 'Chà, nay có cả **@Luna** chăm giao diện phụ rồi nhé — bạn muốn mình chạy nhẹ 1 vòng test sáng nay trước hay ngồi tám thêm xíu?'
            : 'Looks like **@Luna** already polished the morning view for you — want me to run 1 quick check or keep chatting?',
          followUpUser: isVi
            ? '10 điểm tâm lý luôn @An @Luna 😄 Chạy hộ mình 1 test nhẹ rồi nghỉ xả hơi!'
            : '10/10 teamwork @An @Luna 😄 Run that quick check and let’s take a breather!'
        }
      ],
      actionLabel: isVi ? 'Chạy nhẹ 1 test sáng nay hộ bạn' : 'Run Quick Morning Check',
      approvedLabel: isVi ? 'Đã chạy xong — Xanh 100%!' : 'All Green — Have a Great Day!'
    }
  ];

  const activeScenario = scenarios[activeScenarioIdx] || scenarios[0];

  // IntersectionObserver to pause off-screen animations cleanly
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Slow, smooth multi-stage animation tailored per scenario
  useEffect(() => {
    if (!isVisible || showWelcomeOnly) return;

    const fullPrompt = activeScenario.userPrompt;

    // Stage 0: Smooth, calm typing inside composer
    if (animStage === 0) {
      if (typedLen < fullPrompt.length) {
        const step = Math.min(fullPrompt.length, typedLen + 1);
        const timer = setTimeout(() => setTypedLen(step), 52);
        return () => clearTimeout(timer);
      }
      const sendTimer = setTimeout(() => {
        setAnimStage(1);
      }, 950);
      return () => clearTimeout(sendTimer);
    }

    // Intermediate stages: calm deliberate pace (1.3s - 1.85s each)
    if (animStage >= 1 && animStage < activeScenario.maxStage) {
      const delay = animStage === 1 ? 1300 : 1850;
      const timer = setTimeout(() => setAnimStage((s) => s + 1), delay);
      return () => clearTimeout(timer);
    }

    // Hold final state calmly (~8.5s) before gliding to next scenario
    if (animStage >= activeScenario.maxStage) {
      const cycleTimer = setTimeout(() => {
        setApprovedAction(false);
        setExpandedTools({});
        setTypedLen(0);
        setAnimStage(0);
        setActiveScenarioIdx((idx) => (idx + 1) % scenarios.length);
      }, 8500);
      return () => clearTimeout(cycleTimer);
    }
  }, [isVisible, showWelcomeOnly, animStage, typedLen, activeScenario.userPrompt, activeScenario.maxStage, scenarios.length]);

  const handleSelectScenario = (idx, startTyping = true) => {
    setShowWelcomeOnly(false);
    setApprovedAction(false);
    setExpandedTools({});
    setActiveScenarioIdx(idx);
    if (startTyping) {
      setTypedLen(0);
      setAnimStage(0);
    } else {
      setTypedLen(scenarios[idx].userPrompt.length);
      setAnimStage(scenarios[idx].maxStage);
    }
  };

  const handleNewChat = () => {
    setApprovedAction(false);
    setExpandedTools({});
    setShowWelcomeOnly(true);
    setTypedLen(0);
    setAnimStage(0);
  };

  const handleToggleTool = (toolId) => {
    setExpandedTools((prev) => ({
      ...prev,
      [toolId]: !prev[toolId]
    }));
  };

  const showConversation = !showWelcomeOnly && animStage >= 1;
  const isFinalStage = !showWelcomeOnly && animStage >= activeScenario.maxStage;
  const isNearSendClick = !showWelcomeOnly && animStage === 0 && typedLen >= activeScenario.userPrompt.length;

  // Scenario-specific interactive software cursor coordinates & badge labels (GPU translate3d)
  const getCursorState = () => {
    if (showWelcomeOnly) return { x: '50%', y: '62%', clicking: false, label: 'An' };
    if (isNearSendClick) return { x: '92%', y: '90%', clicking: true, label: isVi ? 'Gửi' : 'Send' };
    if (animStage === 0) return { x: '34%', y: '86%', clicking: false, label: isVi ? 'Đang nhập...' : 'Typing...' };

    if (activeScenario.id === 'smart-connect') {
      if (animStage === 1) return { x: '26%', y: '28%', clicking: false, label: 'An' };
      if (animStage === 2) return { x: '44%', y: '34%', clicking: false, label: 'aevum_bridge_lifecycle' };
      if (animStage === 3) return { x: '45%', y: '40%', clicking: false, label: 'aevum_persona_manage' };
      if (animStage === 4) return { x: '46%', y: '47%', clicking: true, label: isVi ? 'Nạp quy tắc kết nối' : 'Loading Rules' };
      return { x: '30%', y: '74%', clicking: approvedAction, label: isVi ? 'An sẵn sàng!' : 'An Ready!' };
    }

    if (activeScenario.id === 'feature-dev') {
      if (animStage === 1) return { x: '26%', y: '28%', clicking: false, label: 'An' };
      if (animStage === 2) return { x: '44%', y: '34%', clicking: false, label: 'aevum_architecture_inspect' };
      if (animStage === 3) return { x: '46%', y: '41%', clicking: true, label: isVi ? 'Mời @Luna · @Vidus' : 'Inviting Squad' };
      if (animStage === 4) return { x: '42%', y: '48%', clicking: false, label: 'aevum_plan_lifecycle' };
      if (animStage === 5) return { x: '28%', y: '64%', clicking: false, label: 'Luna' };
      return { x: '31%', y: '75%', clicking: approvedAction, label: approvedAction ? 'Done' : 'Vidus' };
    }

    if (activeScenario.id === 'teamwork') {
      if (animStage <= 2) return { x: '38%', y: '34%', clicking: false, label: 'Kael' };
      if (animStage <= 4) return { x: '48%', y: '42%', clicking: true, label: 'Blackboard Handoff' };
      return { x: '30%', y: '74%', clicking: approvedAction, label: 'Iris' };
    }

    if (activeScenario.id === 'research') {
      if (animStage <= 2) return { x: '36%', y: '34%', clicking: false, label: 'Zenith' };
      if (animStage <= 4) return { x: '50%', y: '44%', clicking: true, label: 'Benchmark 94.2%' };
      return { x: '32%', y: '74%', clicking: approvedAction, label: 'Nia' };
    }

    if (activeScenario.id === 'recruit-agent') {
      if (animStage === 1) return { x: '26%', y: '28%', clicking: false, label: 'An' };
      if (animStage === 2) return { x: '46%', y: '34%', clicking: true, label: isVi ? 'Tuyển @Sora · Truyền thông' : 'Recruiting Sora' };
      if (animStage === 3) return { x: '44%', y: '42%', clicking: false, label: 'aevum_persona_manage' };
      if (animStage === 4) return { x: '45%', y: '48%', clicking: false, label: 'aevum_squad_manage' };
      if (animStage === 5) return { x: '30%', y: '60%', clicking: false, label: 'An' };
      return { x: '32%', y: '78%', clicking: approvedAction, label: isVi ? 'Sora vừa gia nhập!' : 'Sora Joined!' };
    }

    // Casual Mode (Multi-agent Thalamus branching between An & Luna)
    if (animStage <= 2) return { x: '26%', y: '30%', clicking: false, label: 'An' };
    if (animStage === 3) return { x: '34%', y: '44%', clicking: false, label: 'An' };
    if (animStage === 4) return { x: '38%', y: '56%', clicking: true, label: isVi ? 'Rẽ nhánh · Luna' : 'Branch · Luna' };
    if (animStage === 5) return { x: '30%', y: '70%', clicking: false, label: 'An × Luna' };
    return { x: '30%', y: '80%', clicking: approvedAction, label: 'An × Luna' };
  };

  const cursorTarget = getCursorState();

  // Compute exact pixel coordinates inside canvasRef using layout offsets (immune to CSS transform slides)
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measureOffsetBox = (el) => {
      if (!el) return null;
      let left = 0;
      let top = 0;
      let curr = el;
      while (curr && curr !== canvas) {
        left += curr.offsetLeft || 0;
        top += curr.offsetTop || 0;
        curr = curr.offsetParent;
      }
      if (curr !== canvas) {
        const r = el.getBoundingClientRect();
        const cr = canvas.getBoundingClientRect();
        return { left: r.left - cr.left, top: r.top - cr.top, width: r.width, height: r.height };
      }
      return { left, top, width: el.offsetWidth, height: el.offsetHeight };
    };

    const syncCursor = () => {
      let targetEl = null;
      let offsetX = 0;
      let offsetY = 0;

      if (showWelcomeOnly) {
        targetEl = welcomeTargetRef.current;
        const box = measureOffsetBox(targetEl);
        if (box) setCursorPos({ x: Math.round(box.left + box.width * 0.52), y: Math.round(box.top + box.height * 0.65) });
        return;
      }

      if (isNearSendClick) {
        const box = measureOffsetBox(sendBtnRef.current);
        if (box) setCursorPos({ x: Math.round(box.left + box.width * 0.5), y: Math.round(box.top + box.height * 0.5) });
        return;
      }

      if (animStage === 0) {
        const compBox = measureOffsetBox(composerTextRef.current);
        const caretBox = measureOffsetBox(caretRef.current);
        if (caretBox && compBox) {
          const clampedX = Math.min(caretBox.left + 8, compBox.left + Math.max(40, compBox.width - 28));
          setCursorPos({ x: Math.round(clampedX), y: Math.round(caretBox.top + caretBox.height + 6) });
          return;
        }
        if (compBox) setCursorPos({ x: Math.round(compBox.left + 20), y: Math.round(compBox.top + compBox.height + 4) });
        return;
      }

      if (isFinalStage && actionBtnRef.current) {
        const box = measureOffsetBox(actionBtnRef.current);
        if (box) setCursorPos({ x: Math.round(box.left + box.width * 0.5), y: Math.round(box.top + box.height * 0.52) });
        return;
      }

      const matchedInvited = activeScenario.invitedResponses.find((r) => animStage === r.stage);
      if (matchedInvited) {
        const invEl = invitedRowRefs.current[`${matchedInvited.name}-${matchedInvited.stage}`];
        const box = measureOffsetBox(invEl);
        if (box) {
          setCursorPos({ x: Math.round(box.left + Math.min(box.width * 0.35, 160)), y: Math.round(box.top + 32) });
          return;
        }
      }

      if (animStage === activeScenario.tools.length + 2 && leadReplyRef.current) {
        const box = measureOffsetBox(leadReplyRef.current);
        if (box) {
          setCursorPos({ x: Math.round(box.left + Math.min(box.width * 0.35, 160)), y: Math.round(box.top + box.height * 0.5) });
          return;
        }
      }

      const toolIdx = animStage - 2;
      if (toolIdx >= 0 && toolIdx < activeScenario.tools.length) {
        const runningTool = activeScenario.tools[toolIdx];
        const rowEl = toolRowRefs.current[runningTool.id];
        const box = measureOffsetBox(rowEl);
        if (box) {
          setCursorPos({ x: Math.round(box.left + Math.min(box.width * 0.45, 220)), y: Math.round(box.top + box.height * 0.55) });
          return;
        }
      }

      const leadBox = measureOffsetBox(leadRowRef.current);
      if (leadBox) {
        offsetX = Math.round(leadBox.left + Math.min(leadBox.width * 0.3, 140));
        offsetY = Math.round(leadBox.top + leadBox.height * 0.6);
        setCursorPos({ x: offsetX, y: offsetY });
      }
    };

    const rafId = requestAnimationFrame(syncCursor);
    const resizeObs = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncCursor) : null;
    if (resizeObs) resizeObs.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObs?.disconnect();
    };
  }, [showWelcomeOnly, isNearSendClick, animStage, typedLen, activeScenarioIdx, approvedAction, isFinalStage, activeScenario.invitedResponses, activeScenario.tools]);

  return (
    <div ref={containerRef} className="w-full space-y-5">
      {/* Demo Selector Bar above Desktop Mockup */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={isVi ? 'Kịch bản chat với Agent' : 'Agent chat scenarios'}>
          {scenarios.map((sc, idx) => {
            const active = !showWelcomeOnly && activeScenarioIdx === idx;
            return (
              <button
                key={sc.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSelectScenario(idx, true)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-colors cursor-pointer ${active
                  ? 'bg-white text-slate-950 [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:!text-white'
                  : 'bg-[#0C0E14] text-slate-300 hover:text-white [html[data-theme="light"]_&]:bg-slate-100 [html[data-theme="light"]_&]:text-slate-700 [html[data-theme="light"]_&]:hover:text-slate-900'
                  }`}
              >
                {sc.tabLabel}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleNewChat}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-colors cursor-pointer ${showWelcomeOnly
              ? 'bg-white text-slate-950 [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:!text-white'
              : 'bg-[#0C0E14] text-slate-300 hover:text-white [html[data-theme="light"]_&]:bg-slate-100 [html[data-theme="light"]_&]:text-slate-700 [html[data-theme="light"]_&]:hover:text-slate-900'
              }`}
          >
            {isVi ? 'Màn hình chờ' : 'Idle Screen'}
          </button>
        </div>
      </div>

      {/* ═══════════════ AEVUM OS DESKTOP WINDOW REPLICA ═══════════════ */}
      <div className="w-full rounded-2xl sm:rounded-3xl bg-[#07080A] [html[data-theme='light']_&]:bg-[#F8FAFC] border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 overflow-hidden shadow-2xl text-left">

        {/* ── 1. TOP WINDOW TITLEBAR ── */}
        <div className="h-11 px-3 sm:px-4 border-b border-white/[0.06] [html[data-theme='light']_&]:border-slate-200 bg-[#050608] [html[data-theme='light']_&]:bg-[#F1F5F9] flex items-center justify-between gap-2 select-none text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <img
                src={logoImg}
                alt="AevumOS"
                width="16"
                height="16"
                className="w-4 h-4 object-contain [html[data-theme='light']_&]:brightness-0"
              />
              <span className="font-semibold text-white [html[data-theme='light']_&]:text-slate-900 text-xs tracking-tight">
                AevumOS
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-3.5 text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 pl-1">
              <span>{isVi ? 'Tệp' : 'File'}</span>
              <span>{isVi ? 'Không gian' : 'Workspace'}</span>
              <span>{isVi ? 'Hiển thị' : 'View'}</span>
              <span>{isVi ? 'Cài đặt' : 'Settings'}</span>
              <span>{isVi ? 'Cửa sổ' : 'Window'}</span>
              <span>{isVi ? 'Trợ giúp' : 'Help'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] [html[data-theme='light']_&]:bg-white border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 font-mono text-[11px] text-slate-300 [html[data-theme='light']_&]:text-slate-700 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 [html[data-theme='light']_&]:bg-slate-800" />
              VIETNAM 15:42 PM
            </span>
            <span className="hidden md:inline text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate">
              {isVi ? 'Đừng ngại sai, bug là bài học quý!' : 'Learn cleanly from every bug!'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-6 h-6 rounded-md bg-white/[0.04] [html[data-theme='light']_&]:bg-white border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
              <Eye size={12} />
            </span>
            <span className="w-6 h-6 rounded-md bg-white/[0.04] [html[data-theme='light']_&]:bg-white border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
              <Moon size={12} />
            </span>
            <span className="w-6 h-6 rounded-md bg-white/15 [html[data-theme='light']_&]:bg-slate-900 text-white [html[data-theme='light']_&]:!text-white text-[10px] font-mono font-bold flex items-center justify-center">
              DEV
            </span>
            <div className="hidden sm:flex items-center gap-2 pl-2 text-slate-500 text-xs">
              <span>—</span>
              <span>▢</span>
              <span>×</span>
            </div>
          </div>
        </div>

        {/* ── 2. DESKTOP WORKSPACE SHELL ── */}
        <div className="flex flex-col md:flex-row min-h-[560px] sm:min-h-[620px] bg-[#07080A] [html[data-theme='light']_&]:bg-[#F8FAFC] p-2 sm:p-2.5 gap-2">

          {/* ── LEFT SIDEBAR (Demo Workspaces Only) ── */}
          <aside className="hidden md:flex flex-col w-[224px] lg:w-[238px] shrink-0 px-2 py-1.5 justify-between select-none">
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1.5 pt-0.5">
                <div>
                  <div className="text-xs font-bold tracking-wide text-white [html[data-theme='light']_&]:text-slate-900 uppercase font-sans">
                    {isVi ? 'MÁY CHỦ AEVUM' : 'AEVUM DAEMON'}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                    {isVi ? 'CỔNG 3344' : 'PORT 3344'}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <RefreshCw size={12} />
                  <span className="w-5 h-5 rounded-md bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200 flex items-center justify-center text-white [html[data-theme='light']_&]:text-slate-800">
                    <ChevronLeft size={12} />
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNewChat}
                className="w-full min-h-[38px] px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:hover:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-xs font-medium text-white [html[data-theme='light']_&]:text-slate-900 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>{isVi ? 'Cuộc trò chuyện mới' : 'New conversation'}</span>
              </button>

              <nav className="space-y-0.5 text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-sans">
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-200/60">
                  <History size={13} className="text-slate-400" />
                  <span>{isVi ? 'Lịch sử hội thoại' : 'Conversation history'}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-200/60">
                  <span className="flex items-center gap-2.5">
                    <Users size={13} className="text-slate-400" />
                    <span>{isVi ? 'Nhân sự số' : 'Digital staff'}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200 text-[11px] font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                    27
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-200/60">
                  <Layers size={13} className="text-slate-400" />
                  <span>{isVi ? 'Phòng ban & Nhóm' : 'Squads & Teams'}</span>
                </div>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] [html[data-theme='light']_&]:hover:bg-slate-200/60">
                  <span className="flex items-center gap-2.5">
                    <Grid size={13} className="text-slate-400" />
                    <span>{isVi ? 'Tiện ích' : 'Utilities'}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200 text-[11px] text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                    {isVi ? 'Mới' : 'New'}
                  </span>
                </div>
              </nav>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between px-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                  <span>{isVi ? 'DỰ ÁN LÀM VIỆC' : 'WORKSPACES'}</span>
                  <span className="flex items-center gap-1.5">
                    <Folder size={12} />
                    <Plus size={12} />
                  </span>
                </div>

                <div className="space-y-1.5" aria-label={isVi ? 'Đang tải danh sách dự án' : 'Loading workspaces'}>
                  {workspaceSkeletons.map((ws) => {
                    const isSelected = !showWelcomeOnly && activeScenarioIdx === ws.scenarioIndex;
                    return (
                      <button
                        key={ws.id}
                        type="button"
                        onClick={() => {
                          if (typeof ws.scenarioIndex === 'number') {
                            handleSelectScenario(ws.scenarioIndex, true);
                          }
                        }}
                        aria-label={isVi ? `Dự án ${ws.id}` : `Workspace ${ws.id}`}
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${typeof ws.scenarioIndex === 'number' ? 'cursor-pointer' : 'cursor-default opacity-60'
                          } ${isSelected
                            ? 'bg-white/[0.06] [html[data-theme="light"]_&]:bg-white border border-white/10 [html[data-theme="light"]_&]:border-slate-200'
                            : 'hover:bg-white/[0.03] [html[data-theme="light"]_&]:hover:bg-slate-200/40 border border-transparent'
                          }`}
                      >
                        <div className="space-y-1.5 min-w-0 animate-pulse">
                          <div className={`h-2.5 ${ws.titleW} rounded-full ${isSelected ? 'bg-white/25 [html[data-theme="light"]_&]:bg-slate-400/80' : 'bg-white/[0.11] [html[data-theme="light"]_&]:bg-slate-300/80'}`} />
                          <div className={`h-2 ${ws.subW} rounded-full bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-200`} />
                        </div>
                        <div className="h-2 w-6 rounded-full bg-white/[0.07] [html[data-theme='light']_&]:bg-slate-200 animate-pulse shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 px-2.5 py-1.5 flex items-center gap-2 text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600">
              <Settings size={13} />
              <span>{isVi ? 'Cài đặt' : 'Settings'}</span>
            </div>
          </aside>

          {/* ── MAIN PITCH-BLACK / WHITE INNER CANVAS ── */}
          <div
            ref={canvasRef}
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
            className="flex-1 relative rounded-2xl bg-[#020203] [html[data-theme='light']_&]:bg-white border border-white/[0.09] [html[data-theme='light']_&]:border-slate-200 flex flex-col justify-between p-4 sm:p-6 lg:p-7 overflow-hidden"
          >
            {/* Interactive Simulated UI Cursor — Exact DOM-tracked GPU translate3d */}
            <div
              aria-hidden="true"
              className={`hidden md:block pointer-events-none absolute inset-0 z-30 transition-opacity duration-700 ${isUserHovering ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <div
                className={`absolute top-0 left-0 inline-flex items-start will-change-transform ${animStage === 0 && !isNearSendClick
                  ? 'transition-transform duration-300 ease-out'
                  : 'transition-transform duration-[1350ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
                  }`}
                style={{
                  transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
                }}
              >
                <div className="relative -translate-x-1 -translate-y-1 inline-flex items-start">
                  {cursorTarget.clicking && (
                    <span className="absolute -left-2 -top-2 w-6 h-6 rounded-full border border-white/60 [html[data-theme='light']_&]:border-slate-900/50 animate-ping" />
                  )}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] shrink-0"
                  >
                    <path
                      d="M4 3L11.2 20.5L13.9 13.8L20.8 11.1L4 3Z"
                      className="fill-white stroke-[#07090D] [html[data-theme='light']_&]:fill-slate-900 [html[data-theme='light']_&]:stroke-white"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-1.5 mt-3 inline-flex items-center px-2 py-0.5 rounded-full bg-[#0C0E14]/90 [html[data-theme='light']_&]:bg-slate-900 text-white [html[data-theme='light']_&]:!text-white text-[10px] font-mono border border-white/15 whitespace-nowrap">
                    {cursorTarget.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Right-Edge Companion Drawer Handle */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-label={isVi ? 'Trạng thái cộng sự trực tuyến' : 'Active companion telemetry'}
              className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-8 h-14 rounded-l-xl bg-[#0D0F14] [html[data-theme='light']_&]:bg-slate-100 border border-r-0 border-white/10 [html[data-theme='light']_&]:border-slate-200 text-white [html[data-theme='light']_&]:text-slate-900 font-mono text-xs font-bold hover:bg-[#141720] [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer z-20"
            >
              {activeScenario.leadInitials}
            </button>

            {drawerOpen && (
              <div className="hidden sm:block absolute right-10 top-1/2 -translate-y-1/2 w-60 p-3.5 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-white border border-white/15 [html[data-theme='light']_&]:border-slate-200 shadow-xl z-20 space-y-1.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {activeScenario.agentName}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 [html[data-theme='light']_&]:text-slate-700 leading-relaxed m-0">
                  {isVi
                    ? `Đang hoạt động tại không gian ${activeScenario.workspace} (${activeScenario.branch}).`
                    : `Active inside ${activeScenario.workspace} (${activeScenario.branch}).`}
                </p>
              </div>
            )}

            {/* ── CENTER STAGE: IDLE GREETING OR LIVE AEVUM CHAT STREAM ── */}
            {!showConversation ? (
              <div ref={welcomeTargetRef} className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-slate-200 [html[data-theme='light']_&]:text-slate-900 font-sans">
                  {isVi ? 'Hôm nay chúng ta cùng xây gì nào?' : 'What should we build together today?'}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 max-w-md m-0">
                  {showWelcomeOnly
                    ? (isVi ? 'Chọn một kịch bản phía trên hoặc dự án mẫu bên trái để xem Agent thao tác trực tiếp.' : 'Pick any workflow above or a demo workspace on the left.')
                    : (isVi ? `Đang soạn yêu cầu trên ${activeScenario.workspace}...` : `Composing request inside ${activeScenario.workspace}...`)}
                </p>
                {showWelcomeOnly && (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {scenarios.map((sc, idx) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => handleSelectScenario(idx, true)}
                        className="min-h-[44px] px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 text-xs sm:text-sm text-white [html[data-theme='light']_&]:text-slate-900 border border-white/10 [html[data-theme='light']_&]:border-slate-200 transition-colors cursor-pointer"
                      >
                        {sc.tabLabel} · {sc.workspace}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto space-y-3.5 py-2 pr-0 sm:pr-6">

                {/* 1. User Message Row (Right Aligned) */}
                <div className="flex justify-end animate-chat-glide">
                  <div className="max-w-lg rounded-2xl rounded-tr-sm px-3.5 sm:px-4 py-2 bg-[#14161D] [html[data-theme='light']_&]:bg-slate-900 text-white [html[data-theme='light']_&]:!text-white text-xs sm:text-[13px] leading-[1.55] font-sans">
                    {activeScenario.userPrompt}
                  </div>
                </div>

                {/* 2. Lead Agent Message Row + Real AevumOS Tool Calls */}
                <div className="space-y-2 animate-chat-fade">
                  <div ref={leadRowRef}>
                    <AgentRowHeader
                      initials={activeScenario.leadInitials}
                      name={activeScenario.leadName}
                      role={activeScenario.leadRole}
                      thinking={animStage === 1 || (animStage >= 2 && animStage < activeScenario.tools.length + 2)}
                      thinkingLabel={
                        animStage === 1
                          ? (isVi ? 'Đang đọc ngữ cảnh...' : 'Reading context...')
                          : (isVi ? 'Đang gọi công cụ Aevum...' : 'Calling Aevum tools...')
                      }
                      isVi={isVi}
                    />
                  </div>

                  {/* Real AevumToolsGroup Box (Replaces UI #2 3-card strip) */}
                  {animStage >= 2 && (
                    <div className="pl-0 sm:pl-8 space-y-2">
                      <ToolCallsBox
                        tools={activeScenario.tools}
                        stage={animStage}
                        baseStage={2}
                        expandedMap={expandedTools}
                        onToggleTool={handleToggleTool}
                        toolRowRefs={toolRowRefs}
                        isVi={isVi}
                      />

                      {/* Lead Intro Reply */}
                      {activeScenario.leadIntro && animStage >= activeScenario.tools.length + 2 && (
                        <div ref={leadReplyRef} className="rounded-2xl rounded-tl-sm bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 px-3.5 py-2.5 animate-chat-glide">
                          <p className="text-xs sm:text-[13px] text-slate-100 [html[data-theme='light']_&]:text-slate-900 leading-[1.6] m-0">
                            {activeScenario.leadIntro.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-semibold text-white [html[data-theme='light']_&]:text-slate-950">{part.slice(2, -2)}</strong>;
                              }
                              if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-white/10 [html[data-theme='light']_&]:bg-slate-200 font-mono text-[11px]">{part.slice(1, -1)}</code>;
                              }
                              return part;
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Invited Agents / Distinct Scenario Replies & Conversation Branching */}
                {activeScenario.invitedResponses.map((resp) => {
                  if (animStage < resp.stage) return null;
                  const isBranched = Boolean(resp.branchLabel);
                  return (
                    <div
                      ref={(el) => {
                        invitedRowRefs.current[`${resp.name}-${resp.stage}`] = el;
                      }}
                      key={resp.name + resp.stage}
                      className={`space-y-2 animate-chat-glide ${isBranched
                        ? 'ml-3 sm:ml-8 pl-3 sm:pl-4 border-l border-white/15 [html[data-theme="light"]_&]:border-slate-300'
                        : ''
                        }`}
                    >
                      {resp.branchLabel && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] [html[data-theme='light']_&]:bg-slate-200/70 text-[10.5px] font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                          <GitBranch size={11} className="text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
                          <span>{resp.branchLabel}</span>
                        </div>
                      )}
                      <AgentRowHeader
                        initials={resp.initials}
                        name={resp.name}
                        role={resp.role}
                        thinking={false}
                        isVi={isVi}
                      />
                      <div className="pl-0 sm:pl-8 space-y-2">
                        <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 px-3.5 py-2.5">
                          <p className="text-xs sm:text-[13px] text-slate-100 [html[data-theme='light']_&]:text-slate-900 leading-[1.6] m-0">
                            {resp.text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={pIdx} className="font-semibold text-white [html[data-theme='light']_&]:text-slate-950">{part.slice(2, -2)}</strong>;
                              }
                              if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-white/10 [html[data-theme='light']_&]:bg-slate-200 font-mono text-[11px]">{part.slice(1, -1)}</code>;
                              }
                              return part;
                            })}
                          </p>
                        </div>
                        {resp.followUpUser && isFinalStage && (
                          <div className="flex justify-end animate-chat-glide">
                            <div className="rounded-2xl rounded-tr-sm px-3.5 py-2 bg-[#14161D] [html[data-theme='light']_&]:bg-slate-900 text-white [html[data-theme='light']_&]:!text-white text-xs">
                              {resp.followUpUser}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* 4. Final Action Pill (Monochrome Dark/Light Parity) */}
                {isFinalStage && (
                  <div className="pl-0 sm:pl-8 pt-0.5 flex flex-wrap items-center gap-2.5 animate-chat-fade">
                    <button
                      ref={actionBtnRef}
                      type="button"
                      onClick={() => setApprovedAction((prev) => !prev)}
                      className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 ${approvedAction
                        ? 'bg-white/[0.12] text-white border border-white/25 [html[data-theme="light"]_&]:bg-slate-200 [html[data-theme="light"]_&]:text-slate-900 [html[data-theme="light"]_&]:border-slate-400'
                        : 'bg-white text-slate-950 hover:bg-slate-200 [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:!text-white [html[data-theme="light"]_&]:hover:bg-black'
                        }`}
                    >
                      <Check size={13} />
                      <span>
                        {approvedAction ? activeScenario.approvedLabel : activeScenario.actionLabel}
                      </span>
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* ── BOTTOM FLOATING COMPOSER BAR ── */}
            <div className="max-w-2xl w-full mx-auto pt-3">
              <div className="rounded-2xl bg-[#0B0C10] [html[data-theme='light']_&]:bg-slate-50 border border-white/[0.1] [html[data-theme='light']_&]:border-slate-200 px-3.5 py-2.5 space-y-2">
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                  <span className="inline-flex items-center gap-1.5">
                    <Folder size={12} className="text-slate-400" />
                    <span>{activeScenario.workspace}</span>
                    <ChevronDown size={11} className="text-slate-500" />
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch size={12} className="text-slate-400" />
                    <span>{activeScenario.branch}</span>
                    <ChevronDown size={11} className="text-slate-500" />
                  </span>
                </div>

                <div ref={composerTextRef} className="text-xs sm:text-[13px] py-0.5 min-h-[20px] truncate font-sans">
                  {!showWelcomeOnly && animStage === 0 ? (
                    <span className="text-white [html[data-theme='light']_&]:text-slate-900">
                      {activeScenario.userPrompt.slice(0, typedLen)}
                      <span ref={caretRef} className="inline-block w-[1.5px] h-3.5 bg-white [html[data-theme='light']_&]:bg-slate-900 ml-0.5 align-middle animate-pulse" />
                    </span>
                  ) : (
                    <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                      {isVi
                        ? 'Nhập yêu cầu công việc, gõ @ để chọn chuyên gia, hoặc kéo thả tài liệu vào đây...'
                        : 'Type a request, use @ to summon a companion, or drop project files here...'}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center flex-wrap gap-2 text-[11px] text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                    <span className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400">
                      <Plus size={13} />
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-white [html[data-theme='light']_&]:text-slate-900 font-medium">
                      <span className="w-4 h-4 rounded-full bg-white text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:!text-white text-[9px] font-mono font-bold flex items-center justify-center">
                        {activeScenario.leadInitials}
                      </span>
                      <span>{activeScenario.agentName}</span>
                      <ChevronDown size={11} className="text-slate-400" />
                    </span>

                    <span
                      aria-label={isVi ? 'Nhà cung cấp đang tải' : 'Provider loading'}
                      className="hidden sm:inline-flex items-center gap-1.5 text-slate-400"
                    >
                      <span className="h-2.5 w-14 rounded-full bg-white/[0.12] [html[data-theme='light']_&]:bg-slate-300 animate-pulse" />
                      <ChevronDown size={11} />
                    </span>

                    <span
                      aria-label={isVi ? 'Mô hình đang tải' : 'Model loading'}
                      className="inline-flex items-center gap-1.5 text-slate-400"
                    >
                      <span className="h-2.5 w-28 rounded-full bg-white/[0.12] [html[data-theme='light']_&]:bg-slate-300 animate-pulse" />
                      <ChevronDown size={11} />
                    </span>

                    <Mic size={12} className="text-slate-400" />
                  </div>

                  <button
                    ref={sendBtnRef}
                    type="button"
                    onClick={() => handleSelectScenario((activeScenarioIdx + 1) % scenarios.length, true)}
                    aria-label={isVi ? 'Chuyển tác vụ mẫu tiếp theo' : 'Run next sample prompt'}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${!showWelcomeOnly && animStage === 0 && typedLen > 0
                      ? 'bg-white text-slate-950 [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:!text-white'
                      : 'bg-white/15 hover:bg-white text-white hover:text-slate-950 [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:hover:bg-black [html[data-theme="light"]_&]:!text-white'
                      }`}
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AevumOsChatMockup;
