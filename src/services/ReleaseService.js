const RELEASE_BODY_OVERRIDES = {
  'v1.0.0-beta.2': `# Aevum-OS v1.0.0-beta.2
Bản cập nhật này mang đến hệ thống tự động cập nhật mạnh mẽ, đảm bảo bạn luôn trải nghiệm Aevum-OS với những cải tiến mới nhất một cách liền mạch.

### Tính năng mới (New Features)
- **Hệ thống Auto-Updater tích hợp**: Aevum-OS nay hỗ trợ tự động kiểm tra, tải về và cập nhật các phiên bản mới ngầm trong nền thông qua electron-updater và GitHub Releases.
- **Tự động đóng gói đa nền tảng**: Tích hợp quy trình xuất bản Windows Installer (.exe) và macOS (.dmg, .zip) đồng bộ kèm blockmap tối ưu dung lượng tải về.
- **Bảo vệ toàn vẹn nguồn & Cấu hình Persona**: Chuẩn hóa cấu trúc bộ nhớ tri thức toàn cục và quy chuẩn hoạt động an toàn cho các AI Persona.

### Cải tiến & Tối ưu (Improvements)
- **Tối ưu hóa quy trình kiểm tra bản cập nhật**: Cho phép người dùng kiểm tra trạng thái phiên bản trực tiếp từ giao diện cài đặt với thông báo tức thì.
- **Nâng cao độ ổn định ứng dụng**: Tăng tốc độ khởi động và tối ưu hóa bộ nhớ tạm của ứng dụng.

### Tệp cài đặt / Installation
- Tải file cài đặt Aevum-OS-Setup-1.0.0-beta.2.exe hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v1.0.0-beta.3': `# Aevum-OS v1.0.0-beta.3
Nâng tầm trải nghiệm phát triển với kiến trúc kế hoạch phân tầng đột phá và tương tác AI cá nhân hóa sâu sắc.

### Tính năng mới (New Features)
- **Kiến trúc Kế hoạch Phân tầng (Tiered Plan Architecture) v2.2**: Giới thiệu mô hình định địa chỉ linh hoạt cho kế hoạch phát triển, hỗ trợ phân rã Domain và Feature đa cấp độ.
- **Điều phối Đa Tác tử (MCP Orchestration & Living Personas)**: Nâng cấp cơ chế điều phối công cụ MCP tự thích ứng và quản trị bộ nhớ làm việc (working memory) cho từng Persona.
- **Không gian Nghiên cứu (Research Workspace) & Cây Kỹ năng**: Tích hợp SkillTreeCanvas tương tác mượt mà, menu ngữ cảnh ContextMenu chuyên biệt và hỗ trợ hiển thị đa phương tiện trực quan.

### Cải tiến & Tối ưu (Improvements)
- **Tối ưu hóa Pipeline CI/CD**: Xuất bản tài nguyên release trực tiếp sang kho lưu trữ mở để giải phóng hạn mức Actions artifact storage quota.
- **Nâng cao Hiệu năng Renderer**: Tối ưu hóa DOM và xử lý sự kiện trong ứng dụng React, giảm độ trễ khi vẽ đồ thị cây kỹ năng.

### Tệp cài đặt / Installation
- Tải file cài đặt Aevum-OS-Setup-1.0.0-beta.3.exe hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,

  'v1.0.0-dev.0': `# Aevum-OS v1.0.0-dev.0
Nâng tầm trải nghiệm Aevum-OS với các cải tiến AI và quy trình phát hành linh hoạt hơn.

### Tính năng mới (New Features)
- **Hệ thống Phát hành Dev Build & Promote Build**: Giới thiệu quy trình phát hành mới, cho phép tạo các bản dựng phát triển nội bộ (\`-dev.X\`) và thăng hạng trực tiếp lên bản phát hành chính thức mà không cần build lại.
- **Kênh Cập nhật Thử nghiệm Nội bộ (Dev Channel Toggle)**: Tích hợp công tắc chuyển đổi kênh cập nhật trong cài đặt ứng dụng, cho phép Developer và Beta Tester đăng ký nhận các bản thử nghiệm sớm ngầm qua Auto-Updater.
- **Điều phối Đa Tác tử & Tối ưu hóa Persona**: Tinh chỉnh cấu trúc hoạt động của Nia và các Living Personas, nâng cao khả năng tự chủ và tương tác thời gian thực.

### Cải tiến & Tối ưu (Improvements)
- **Cải tiến Auto-Updater Core**: Bổ sung cờ \`allowPrerelease\` linh hoạt trong \`UpdaterService\`, đồng bộ trạng thái qua IPC handler an toàn giữa Main Process và Renderer.
- **Tự động hóa CI/CD & Webhook Thông báo**: Mở rộng pipeline GitHub Actions tự động kích hoạt cập nhật dữ liệu changelog tức thì trên website khi có bản release mới.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-1.0.0-dev.0.exe\` hoặc bản macOS bên dưới để trải nghiệm.

---
  'v1.0.0-dev.1': `# Aevum-OS v1.0.0-dev.1
Bản thử nghiệm Dev-Test thứ 2 mang đến Persona Hawl chuyên trách bảo mật, nâng cấp Hermes Engine và hoàn thiện phòng thí nghiệm nghiên cứu sóng não EEG.

### Tính năng mới (New Features)
- **Tác tử An ninh Hawl (Hawl AI Companion & Security Specialist)**: Bổ sung Persona Hawl - chuyên gia bảo mật và thẩm định phòng thủ mạng, hỗ trợ rà soát lỗ hổng, tư vấn phòng chống DDoS và tối ưu hóa hệ thống lá chắn đa tầng.
- **Tích hợp Hermes Broker & Signal Diagnostic UI**: Nâng cấp cơ chế điều phối phiên làm việc với Hermes Session Broker, bổ sung SignalDiagnosticHandlers và giao diện chẩn đoán sức khỏe hệ thống thời gian thực.
- **Không gian Nghiên cứu Thần kinh Nhận thức (Neuro-Cognitive Lab & Flow-State)**: Công bố các bài báo khoa học tiền in ấn Zenodo, bộ chuẩn đo lường trạng thái dòng chảy HAI EEG và hiệu chỉnh Kuramoto coupling cho các mô hình tự chữa lành.

### Cải tiến & Tối ưu (Improvements)
- **Hoàn thiện Giao diện Workspace & Agent Chat View**: Tinh chỉnh các thành phần giao diện không gian làm việc lõi, tối ưu hoá khung trò chuyện tác tử và tích hợp điều phối tác tử tự trị.
- **Chuẩn hóa Giao thức Fastify SSE Daemon**: Đồng bộ cổng proxy kết nối SSE (Port 3344) giữa Aevum Desktop và các công cụ MCP, đảm bảo độ trễ phản hồi dưới 2ms.
- **Tối ưu hóa Vector Zoom & Mermaid Diagram**: Nâng cấp khả năng thu phóng vector mượt mà và tương tác đồ thị cấu trúc kiến trúc trực quan.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-1.0.0-dev.1.exe\` hoặc bản macOS bên dưới để trải nghiệm.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`
};
let cachedReleases = null;
let inFlightPromise = null;
let isTokenMarkedInvalid = false;

export const ReleaseService = {
  /**
   * Fetches release list from GitHub releases API.
   * Caches results in-memory and deduplicates in-flight requests.
   */
  async getReleases() {
    if (cachedReleases) {
      return cachedReleases;
    }

    if (inFlightPromise) {
      return inFlightPromise;
    }

    inFlightPromise = (async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = {
          'Accept': 'application/vnd.github+json'
        };

        if (!isTokenMarkedInvalid && token && token !== 'your_read_only_token_here' && !token.startsWith('github_pat_your')) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        let res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });

        // If token returned 401 (expired/revoked), mark as invalid and retry unauthenticated
        if (res.status === 401 && headers['Authorization']) {
          isTokenMarkedInvalid = true;
          delete headers['Authorization'];
          res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });
        }

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        if (!Array.isArray(data)) return [];

        const enriched = data.map((item) => {
          const tag = item.tag_name || item.name || '';
          const override = RELEASE_BODY_OVERRIDES[tag];
          if (override && (!item.body || item.body.trim().endsWith(': Aev') || item.body.trim().endsWith('Giới thiệu') || item.body.trim().endsWith('(') || item.body.length < 400)) {
            return {
              ...item,
              body: override
            };
          }
          return item;
        });

        const sorted = enriched.sort((a, b) => {
          const timeA = new Date(a.published_at || a.created_at || 0).getTime();
          const timeB = new Date(b.published_at || b.created_at || 0).getTime();
          if (timeB !== timeA) return timeB - timeA;
          return (b.tag_name || b.name || '').localeCompare(a.tag_name || a.name || '', undefined, { numeric: true });
        });

        cachedReleases = sorted;
        return sorted;
      } finally {
        inFlightPromise = null;
      }
    })();

    return inFlightPromise;
  },

  /**
   * Get set of approved release tags (Dev Test releases approved by Admin).
   * Supports Supabase sync with LocalStorage fallback.
   */
  async getApprovedTags() {
    const local = new Set();
    try {
      const stored = localStorage.getItem('aevum_approved_releases');
      if (stored) {
        JSON.parse(stored).forEach((t) => local.add(t));
      }
    } catch (e) {}

    try {
      const { supabase } = await import('./supabaseClient.js');
      const { data, error } = await supabase
        .from('release_approvals')
        .select('tag_name, is_approved');

      if (!error && Array.isArray(data)) {
        data.forEach((row) => {
          if (row.is_approved) {
            local.add(row.tag_name);
          } else {
            local.delete(row.tag_name);
          }
        });
      }
    } catch (err) {
      // Table may not exist yet or offline, local fallback is used
    }

    return local;
  },

  /**
   * Approve or revoke approval for a dev release (Admin only).
   */
  async setReleaseApproved(tagName, isApproved, userProfile) {
    if (!tagName) return false;

    // 1. Update localStorage
    try {
      const stored = localStorage.getItem('aevum_approved_releases');
      const tags = stored ? JSON.parse(stored) : [];
      const set = new Set(tags);
      if (isApproved) {
        set.add(tagName);
      } else {
        set.delete(tagName);
      }
      localStorage.setItem('aevum_approved_releases', JSON.stringify(Array.from(set)));
    } catch (e) {}

    // 2. Sync to Supabase
    try {
      const { supabase } = await import('./supabaseClient.js');
      await supabase
        .from('release_approvals')
        .upsert({
          tag_name: tagName,
          is_approved: isApproved,
          approved_by: userProfile?.id || null,
          approved_by_email: userProfile?.email || null,
          approved_at: new Date().toISOString()
        }, { onConflict: 'tag_name' });
    } catch (err) {
      console.warn('[ReleaseService] Supabase sync release_approvals fallback:', err?.message || err);
    }

    // Invalidate cache
    cachedReleases = null;
    return true;
  }
};
