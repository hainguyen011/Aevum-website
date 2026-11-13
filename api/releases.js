/**
 * api/releases.js
 * Vercel Serverless Function to proxy GitHub releases API with Edge Caching.
 * Prevents client-side IP rate limiting (60 req/hr) by caching responses on Vercel's global CDN.
 */

const FALLBACK_RELEASES = [
  {
    tag_name: 'v2.0.0-dev.11',
    name: 'AevumOS v2.0.0-dev.11 (Dev Test)',
    published_at: '2026-11-13T12:20:00Z',
    created_at: '2026-11-13T12:20:00Z',
    prerelease: true,
    body: `# Aevum-OS v2.0.0-dev.11 (Dev Test)

Bản phát hành thử nghiệm nội bộ dành cho đội ngũ kỹ sư I2FLabs, nâng cấp cơ chế tự hành tiếp sức (Autonomous Chained Relay Loop) và tối ưu hóa hệ thống đóng gói.

### Tính năng mới (New Features)
- **Cơ Chế Tiếp Sức Tự Động (Autonomous Chained Relay Loop)**:
  - Tự động phát hiện chế độ Tự hành (Autonomous Mode) trong \`AntigravityHermesEngine\`.
  - Phân tách tác vụ lớn thành các chặng (Sprint) 10 phút liền mạch; tự động dọn dẹp tiến trình con và bộ đệm ngữ cảnh sau mỗi chặng để chống quá tải token, rồi tiếp sức sang chặng tiếp theo (hỗ trợ tới 6 chặng liên tục = 60 phút).
  - Tích hợp phanh an toàn \`HermesExecutionRegistry\`: Cho phép Master ngắt tác vụ tức thì (Mid-Flight Preemption) mà không để lại tiến trình rác.

### Cải tiến & Tối ưu (Improvements)
- **Tối Ưu Hóa Quy Trình Đóng Gói (Build Pipeline)**:
  - Cập nhật cấu hình \`vite.config.ts\` (\`emptyOutDir: false\`) triệt tiêu lỗi phân quyền \`EPERM\` do khóa tập tin trên môi trường Windows.
  - Chuẩn hóa quy trình nghiệm thu kế hoạch O-DDD trong vùng \`aevum_protocol_hub\`.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-2.0.0-dev.11.exe\` bên dưới để trải nghiệm các tính năng tự hành mới nhất.

---
*Phát hành tự động bởi Aevum CI/CD Engine*`,
    assets: [
      {
        id: 702000011,
        name: 'Aevum-OS-Setup-2.0.0-dev.11.exe',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.11/Aevum-OS-Setup-2.0.0-dev.11.exe',
        content_type: 'application/x-msdownload',
        size: 154820192
      }
    ]
  },
  {
    tag_name: 'v2.0.0-dev.9',
    name: 'AevumOS v2.0.0-dev.9',
    published_at: '2026-10-30T14:52:13Z',
    created_at: '2026-10-30T14:52:13Z',
    prerelease: true,
    body: `# Aevum-OS v2.0.0-dev.9
Bản phát hành Dev Test nội bộ với bộ khung tự động hóa ký số Apple Hardened Runtime, chuẩn hóa Node.js 22 và tích hợp giao thức thông báo email qua Aevum Cloud API.

### Tính năng mới (New Features)
- **Kiến trúc Hardened Runtime & Cấu hình Entitlements macOS**: Bổ sung plist entitlements cho phép JIT compiler, bộ nhớ thực thi không dấu cho terminal PTY và chuẩn bị sẵn sàng cho quy trình Apple Notarization.
- **Cơ chế Dispatch Broadcast Email qua Cloud API**: Tích hợp hook tự động thông báo qua Aevum Cloud backend dành riêng cho quản trị viên và đội ngũ kiểm thử nội bộ.
- **Hỗ trợ Timestamping Ký số Windows RFC 3161**: Cấu hình quy chuẩn máy chủ đóng dấu thời gian DigiCert tự động trong pipeline CI/CD.

### Tệp cài đặt / Installation
- Tải file cài đặt \`Aevum-OS-Setup-2.0.0-dev.9.exe\` bên dưới để tiến hành kiểm thử nội bộ.`,
    assets: [
      {
        id: 692409021,
        name: 'Aevum-OS-Setup-2.0.0-dev.9.exe',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.9/Aevum-OS-Setup-2.0.0-dev.9.exe',
        content_type: 'application/x-msdownload',
        size: 153092096
      }
    ]
  },
  {
    tag_name: 'v2.0.0-beta.5',
    name: 'AevumOS v2.0.0-beta.5',
    published_at: '2026-11-06T10:00:00Z',
    created_at: '2026-11-06T10:00:00Z',
    prerelease: false,
    body: `# Aevum-OS v2.0.0-beta.5
Bản phát hành Beta công khai toàn diện, tích hợp ma trận ký số tự động đa nền tảng, hệ thống phát sóng email thông báo cập nhật qua Aevum Cloud và cơ chế cập nhật vi sai Blockmap siêu tốc.

### Tính năng mới (New Features)
- **Hạ tầng Ký số Tự động & Apple Notarization**: Tích hợp đầy đủ Apple Entitlements (Hardened Runtime, JIT cho V8, PTY execution), tự động công chứng qua Apple Notarytool và ký số Windows với chuẩn RFC 3161 DigiCert Timestamping.
- **Tối ưu hóa Cập nhật Vi sai (Blockmap Delta Updates)**: Phân tách khối nhị phân thông minh, cho phép nâng cấp chỉ cần tải từ 5MB - 15MB.

### Tệp cài đặt / Installation
- **Windows (x64)**: Tải file cài đặt \`Aevum-OS-Setup-2.0.0-beta.5.exe\`.
- **macOS (Apple Silicon & Intel)**: Tải các gói \`.dmg\` tương ứng.`,
    assets: [
      {
        id: 701500001,
        name: 'Aevum-OS-Setup-2.0.0-beta.5.exe',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-beta.5/Aevum-OS-Setup-2.0.0-beta.5.exe',
        content_type: 'application/x-msdownload',
        size: 154128000
      },
      {
        id: 701500002,
        name: 'Aevum-OS-2.0.0-beta.5-mac-arm64.dmg',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-beta.5/Aevum-OS-2.0.0-beta.5-mac-arm64.dmg',
        content_type: 'application/x-apple-diskimage',
        size: 142100000
      },
      {
        id: 701500003,
        name: 'Aevum-OS-2.0.0-beta.5-mac-x64.dmg',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-beta.5/Aevum-OS-2.0.0-beta.5-mac-x64.dmg',
        content_type: 'application/x-apple-diskimage',
        size: 146200000
      }
    ]
  },
  {
    tag_name: 'v2.0.0-dev.6',
    name: 'AevumOS v2.0.0-dev.6',
    published_at: '2026-10-25T08:00:00Z',
    created_at: '2026-10-25T08:00:00Z',
    prerelease: true,
    body: `# Aevum-OS v2.0.0-dev.6
Bản phát hành đột phá với động cơ Hermes tự hành đa tác tử, kiến trúc ảo hóa ngữ cảnh phòng ARCV & LSR, Living Knowledge Fabric v3.0 và giao diện Lean Workspace 120 FPS.`,
    assets: [
      {
        id: 689000001,
        name: 'Aevum-OS-2.0.0-dev.6-mac-arm64.dmg',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.6/Aevum-OS-2.0.0-dev.6-mac-arm64.dmg',
        content_type: 'application/x-apple-diskimage',
        size: 141000000
      },
      {
        id: 689000002,
        name: 'Aevum-OS-2.0.0-dev.6-mac-x64.dmg',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.6/Aevum-OS-2.0.0-dev.6-mac-x64.dmg',
        content_type: 'application/x-apple-diskimage',
        size: 145000000
      },
      {
        id: 689000003,
        name: 'Aevum-OS-2.0.0-dev.6-mac-arm64.zip',
        browser_download_url: 'https://github.com/hainguyen011/aevum-os-releases/releases/download/v2.0.0-dev.6/Aevum-OS-2.0.0-dev.6-mac-arm64.zip',
        content_type: 'application/zip',
        size: 139000000
      }
    ]
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Edge CDN Cache: 5 mins fresh, 10 mins stale-while-revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.VITE_GITHUB_TOKEN;
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Aevum-Cloud-Edge-Proxy'
    };

    if (token && token !== 'your_read_only_token_here' && !token.startsWith('github_pat_your')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const githubRes = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', {
      headers
    });

    if (githubRes.ok) {
      const data = await githubRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return res.status(200).json(data);
      }
    }

    console.warn(`[api/releases] GitHub API returned status ${githubRes.status}. Serving fallback dataset.`);
    return res.status(200).json(FALLBACK_RELEASES);
  } catch (err) {
    console.error('[api/releases] Upstream fetch error:', err);
    return res.status(200).json(FALLBACK_RELEASES);
  }
}

