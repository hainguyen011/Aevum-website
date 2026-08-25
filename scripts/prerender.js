import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SEO_MAP = {
  landing: {
    route: '/',
    title: 'Aevum OS — Standalone MCP Server & Bộ não Ngoại vi Không gian Làm việc',
    description: 'Aevum OS là Hệ điều hành Agent độc lập và Bộ não Ngoại vi — hỗ trợ lập kế hoạch DDD, đồ thị bộ nhớ tự phục hồi và điều phối biệt đội đa agent tự trị.',
    canonical: 'https://www.aevum.ai.vn/'
  },
  pricing: {
    route: '/pricing',
    title: 'Bảng Giá & Gói Thành Viên — Aevum OS Community & Pro Tiers',
    description: 'Bảng giá minh bạch Aevum OS: Gói Community miễn phí vĩnh viễn Local-First và gói Pro trải nghiệm 14 ngày Beta Trial đồng bộ Cloud & Biệt đội Đa Agent.',
    canonical: 'https://www.aevum.ai.vn/pricing'
  },
  docs: {
    route: '/docs',
    title: 'Tài liệu Kỹ thuật & Hướng dẫn Tích hợp — Aevum OS Docs',
    description: 'Hướng dẫn tích hợp cổng MCP, cài đặt daemon SSE port 3344, quy trình bắt tay Handshake Ritual và danh mục công cụ MCP của Aevum OS.',
    canonical: 'https://www.aevum.ai.vn/docs'
  },
  about: {
    route: '/about',
    title: 'Giới thiệu & Triết lý Sản phẩm — Aevum OS by I2FLabs',
    description: 'Khám phá câu chuyện phát triển Aevum OS và sứ mệnh tách biệt bộ não AI khỏi IDE để mang lại khả năng ghi nhớ dài hạn cho lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/about'
  },
  changelog: {
    route: '/changelog',
    title: 'Nhật ký Cập nhật & Lịch sử Bản phát hành — Aevum OS Changelog',
    description: 'Theo dõi các tính năng mới nhất, bản vá lỗi và nâng cấp kiến trúc cho Aevum OS và bộ tiện ích mở rộng I2FLabs.',
    canonical: 'https://www.aevum.ai.vn/changelog'
  },
  discussions: {
    route: '/discussions',
    title: 'Cộng đồng Thảo luận & Sửa lỗi — Aevum OS Community Discussions',
    description: 'Tham gia thảo luận về các phiên bản phát hành Aevum OS, báo lỗi, đóng góp ý kiến và kết nối với cộng đồng lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/discussions'
  },
  privacy: {
    route: '/privacy',
    title: 'Chính sách Bảo mật — Aevum OS by I2FLabs',
    description: 'Chính sách Bảo mật của I2FLabs và Aevum OS: Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/privacy'
  },
  terms: {
    route: '/terms',
    title: 'Điều khoản Dịch vụ — Aevum OS by I2FLabs',
    description: 'Điều khoản Dịch vụ của I2FLabs và Aevum OS: Quyền, nghĩa vụ và chính sách sử dụng dịch vụ trong không gian làm việc.',
    canonical: 'https://www.aevum.ai.vn/terms'
  }
};

async function prerender() {
  console.log('[Prerender Snapshot] Starting static HTML generation...');

  const templatePath = path.resolve(rootDir, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run `vite build` first.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const ssrModulePath = path.resolve(rootDir, 'dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrModulePath)) {
    throw new Error('dist-ssr/entry-server.js not found. Run `vite build --ssr` first.');
  }

  const { render } = await import(`file://${ssrModulePath.replace(/\\/g, '/')}`);

  const pages = Object.keys(SEO_MAP);

  for (const pageKey of pages) {
    const meta = SEO_MAP[pageKey];
    console.log(`  📸 Rendering snapshot for: ${meta.route} (${pageKey})`);

    try {
      const { html: appHtml } = render(pageKey, 'vi');

      // Inject rendered app HTML into #root
      let pageHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Update route-specific SEO Meta
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${meta.description}" />`
      );
      pageHtml = pageHtml.replace(
        /<link\s+rel=["']canonical["'][^>]*>/i,
        `<link rel="canonical" href="${meta.canonical}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:title["'][^>]*>/i,
        `<meta property="og:title" content="${meta.title}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:description["'][^>]*>/i,
        `<meta property="og:description" content="${meta.description}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:url["'][^>]*>/i,
        `<meta property="og:url" content="${meta.canonical}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']twitter:title["'][^>]*>/i,
        `<meta name="twitter:title" content="${meta.title}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']twitter:description["'][^>]*>/i,
        `<meta name="twitter:description" content="${meta.description}" />`
      );

      // Determine output directory
      const outDir = meta.route === '/'
        ? path.resolve(rootDir, 'dist')
        : path.resolve(rootDir, `dist${meta.route}`);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const outFile = path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, pageHtml, 'utf-8');
      console.log(`     ✓ Saved: ${path.relative(rootDir, outFile)} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`     ✗ Failed to prerender ${meta.route}:`, err);
    }
  }

  // Cleanup temporary dist-ssr directory
  try {
    const ssrDir = path.resolve(rootDir, 'dist-ssr');
    if (fs.existsSync(ssrDir)) {
      fs.rmSync(ssrDir, { recursive: true, force: true });
      console.log('  🧹 Cleaned up temporary dist-ssr directory.');
    }
  } catch (_) {}

  console.log('✨ [Prerender Snapshot] Successfully generated all static HTML snapshots!\n');
}

prerender().catch((err) => {
  console.error('[Prerender Snapshot Error]:', err);
  process.exit(1);
});
