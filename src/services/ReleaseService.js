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
          if (override && (!item.body || item.body.trim().endsWith(': Aev') || item.body.trim().endsWith('Giới thiệu') || item.body.length < 350)) {
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
  }
};
