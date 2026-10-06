import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { docsData } from '../src/data/docsData.js';
import { curriculumModules } from '../src/data/learningCurriculum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SEO_MAP = {
  landing: {
    route: '/',
    pageKey: 'landing',
    title: 'Aevum OS — Standalone MCP Server & Bộ não Ngoại vi Không gian Làm việc',
    description: 'Aevum OS là Hệ điều hành Agent độc lập và Bộ não Ngoại vi — hỗ trợ lập kế hoạch DDD, đồ thị bộ nhớ tự phục hồi và điều phối biệt đội đa agent tự trị.',
    canonical: 'https://www.aevum.ai.vn/'
  },
  pricing: {
    route: '/pricing',
    pageKey: 'pricing',
    title: 'Bảng Giá & Gói Thành Viên — Aevum OS Community & Pro Tiers',
    description: 'Bảng giá minh bạch Aevum OS: Gói Community miễn phí vĩnh viễn Local-First và gói Pro trải nghiệm 14 ngày Beta Trial đồng bộ Cloud & Biệt đội Đa Agent.',
    canonical: 'https://www.aevum.ai.vn/pricing'
  },
  docs: {
    route: '/docs',
    pageKey: 'docs',
    docId: 'gioi-thieu',
    title: 'Tài liệu Kỹ thuật & Hướng dẫn Cấu hình MCP Cursor & Claude — Aevum OS Docs',
    description: 'Hướng dẫn cấu hình MCP Server cho Cursor và Claude Desktop, cài đặt Fastify Daemon SSE port 3344, quy trình bắt tay Handshake Ritual và danh mục 98 công cụ MCP của Aevum OS.',
    canonical: 'https://www.aevum.ai.vn/docs'
  },
  explore: {
    route: '/explore',
    pageKey: 'explore',
    title: 'Khám phá Kỉ nguyên AI — Học viện Tri thức & Tác nhân Tự chủ | Aevum OS',
    description: 'Giáo trình mở miễn phí về hệ điều hành agent, tối ưu ngữ cảnh MCP, trí nhớ nhận thức kép và đồ thị tri thức sống cùng Aevum OS.',
    canonical: 'https://www.aevum.ai.vn/explore'
  },
  about: {
    route: '/about',
    pageKey: 'about',
    title: 'Giới thiệu & Triết lý Sản phẩm — Aevum OS by I2FLabs',
    description: 'Khám phá câu chuyện phát triển Aevum OS và sứ mệnh tách biệt bộ não AI khỏi IDE để mang lại khả năng ghi nhớ dài hạn cho lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/about'
  },
  changelog: {
    route: '/changelog',
    pageKey: 'changelog',
    title: 'Nhật ký Cập nhật & Lịch sử Bản phát hành — Aevum OS Changelog',
    description: 'Theo dõi các tính năng mới nhất, bản vá lỗi và nâng cấp kiến trúc cho Aevum OS và bộ tiện ích mở rộng I2FLabs.',
    canonical: 'https://www.aevum.ai.vn/changelog'
  },
  discussions: {
    route: '/discussions',
    pageKey: 'discussions',
    title: 'Cộng đồng Thảo luận & Sửa lỗi — Aevum OS Community Discussions',
    description: 'Tham gia thảo luận về các phiên bản phát hành Aevum OS, báo lỗi, đóng góp ý kiến và kết nối với cộng đồng lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/discussions'
  },
  privacy: {
    route: '/privacy',
    pageKey: 'privacy',
    title: 'Chính sách Bảo mật — Aevum OS by I2FLabs',
    description: 'Chính sách Bảo mật của I2FLabs và Aevum OS: Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của lập trình viên.',
    canonical: 'https://www.aevum.ai.vn/privacy'
  },
  terms: {
    route: '/terms',
    pageKey: 'terms',
    title: 'Điều khoản Dịch vụ — Aevum OS by I2FLabs',
    description: 'Điều khoản Dịch vụ của I2FLabs và Aevum OS: Quyền, nghĩa vụ và chính sách sử dụng dịch vụ trong không gian làm việc.',
    canonical: 'https://www.aevum.ai.vn/terms'
  }
};

// Add all 15 Docs as individual deep prerender routes for 100% Google SEO Crawlability
docsData.forEach((doc) => {
  const cleanSnippet = doc.content
    .replace(/#+\s+.*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/[>*_|-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 160);

  SEO_MAP[`doc_${doc.id}`] = {
    route: `/docs/${doc.id}`,
    pageKey: 'docs',
    docId: doc.id,
    docData: doc,
    title: `${doc.title} — Tài liệu Kỹ thuật Aevum OS`,
    description: `${doc.title}: ${cleanSnippet}...`,
    canonical: `https://www.aevum.ai.vn/docs/${doc.id}`
  };
});

// Add all curriculum lessons as individual deep prerender routes for SEO
curriculumModules.forEach((mod) => {
  mod.lessons.forEach((lesson) => {
    const cleanSnippet = lesson.content
      .replace(/#+\s+.*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/[>*_|-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);

    SEO_MAP[`lesson_${lesson.id}`] = {
      route: `/explore/${lesson.id}`,
      pageKey: 'explore',
      lessonId: lesson.id,
      lessonData: lesson,
      title: `${lesson.title} — Khám phá Kỉ nguyên AI | Aevum OS`,
      description: `${lesson.title}: ${cleanSnippet}...`,
      canonical: `https://www.aevum.ai.vn/explore/${lesson.id}`
    };
  });
});

function extractFaqFromContent(content, lessonTitle, lessonSummary) {
  const faqs = [];
  if (lessonTitle && lessonSummary) {
    faqs.push({
      question: `${lessonTitle} là gì và có ý nghĩa như thế nào trong kỷ nguyên AI?`,
      answer: lessonSummary
    });
  }

  if (content) {
    const lines = content.split('\n');
    let curQ = null;
    let curAns = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^#{2,3}\s+(?:[\d.]+\s*)?([^?\n]+\?)/);
      if (match) {
        if (curQ && curAns.length > 0) {
          const ansText = curAns.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`{1,3}[^`]*`{1,3}/g, '').replace(/[>*_|-]/g, '').replace(/\s+/g, ' ').trim();
          if (ansText.length > 25) {
            faqs.push({ question: curQ, answer: ansText.substring(0, 320) });
          }
        }
        curQ = match[1].trim();
        curAns = [];
      } else if (curQ) {
        if (line.startsWith('#') || line.startsWith('---')) {
          const ansText = curAns.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`{1,3}[^`]*`{1,3}/g, '').replace(/[>*_|-]/g, '').replace(/\s+/g, ' ').trim();
          if (ansText.length > 25) {
            faqs.push({ question: curQ, answer: ansText.substring(0, 320) });
          }
          curQ = null;
          curAns = [];
        } else if (line.trim().length > 0 && curAns.length < 4) {
          curAns.push(line.trim());
        }
      }
    }

    if (curQ && curAns.length > 0) {
      const ansText = curAns.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`{1,3}[^`]*`{1,3}/g, '').replace(/[>*_|-]/g, '').replace(/\s+/g, ' ').trim();
      if (ansText.length > 25) {
        faqs.push({ question: curQ, answer: ansText.substring(0, 320) });
      }
    }
  }

  return faqs;
}

async function prerender() {
  console.log('[Prerender Snapshot] Starting static HTML generation for SEO & Search Spiders...');

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

  const snapshotKeys = Object.keys(SEO_MAP);

  for (const key of snapshotKeys) {
    const meta = SEO_MAP[key];
    console.log(`  📸 Rendering snapshot: ${meta.route} [${meta.pageKey}${meta.docId ? ':' + meta.docId : (meta.lessonId ? ':' + meta.lessonId : '')}]`);

    try {
      const { html: appHtml } = render(meta.pageKey, 'vi', meta.docId || null, meta.lessonId || null);

      // Inject rendered app HTML into #root
      let pageHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Update route-specific SEO Meta
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<link\s+rel=["']canonical["'][^>]*>/i,
        `<link rel="canonical" href="${meta.canonical}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:title["'][^>]*>/i,
        `<meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:description["'][^>]*>/i,
        `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property=["']og:url["'][^>]*>/i,
        `<meta property="og:url" content="${meta.canonical}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']twitter:title["'][^>]*>/i,
        `<meta name="twitter:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+name=["']twitter:description["'][^>]*>/i,
        `<meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
      );

      // Inject JSON-LD Schema for TechArticle & BreadcrumbList if document
      if (meta.docData) {
        const schema = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "TechArticle",
              "@id": `${meta.canonical}#article`,
              "isPartOf": { "@id": "https://www.aevum.ai.vn/#website" },
              "headline": meta.title,
              "description": meta.description,
              "url": meta.canonical,
              "inLanguage": "vi-VN",
              "mainEntityOfPage": meta.canonical,
              "articleSection": meta.docData.category,
              "author": {
                "@type": "Organization",
                "name": "I2FLabs Vietnam",
                "url": "https://www.aevum.ai.vn"
              },
              "publisher": {
                "@type": "Organization",
                "name": "I2FLabs Vietnam",
                "url": "https://www.aevum.ai.vn",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.aevum.ai.vn/icon-512.png"
                }
              },
              "datePublished": "2026-08-01T08:00:00+07:00",
              "dateModified": "2026-10-01T12:00:00+07:00"
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${meta.canonical}#breadcrumb`,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Trang chủ",
                  "item": "https://www.aevum.ai.vn/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tài liệu Kỹ thuật",
                  "item": "https://www.aevum.ai.vn/docs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": meta.docData.category,
                  "item": "https://www.aevum.ai.vn/docs"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": meta.docData.title,
                  "item": meta.canonical
                }
              ]
            }
          ]
        };

        const schemaTag = `<script id="aevum-doc-schema" type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
        pageHtml = pageHtml.replace('</head>', `  ${schemaTag}\n</head>`);
      }

      // Inject JSON-LD Schema for Course if on main /explore hub
      if (meta.pageKey === 'explore' && !meta.lessonData) {
        const courseSchema = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              "@id": "https://www.aevum.ai.vn/explore#course",
              "name": "Khám phá Kỉ nguyên AI — Học viện Tri thức & Tác nhân Tự chủ Aevum OS",
              "description": "Giáo trình mở miễn phí về hệ điều hành agent, tối ưu ngữ cảnh MCP, trí nhớ nhận thức kép và đồ thị tri thức sống cùng Aevum OS.",
              "url": "https://www.aevum.ai.vn/explore",
              "inLanguage": "vi-VN",
              "provider": {
                "@type": "Organization",
                "name": "I2FLabs Vietnam",
                "url": "https://www.aevum.ai.vn"
              },
              "hasCourseInstance": [
                {
                  "@type": "CourseInstance",
                  "courseMode": "Online",
                  "courseWorkload": "PT12H"
                }
              ],
              "syllabusSections": curriculumModules.map(mod => ({
                "@type": "Syllabus",
                "name": mod.title,
                "description": mod.description
              }))
            }
          ]
        };
        const courseTag = `<script id="aevum-course-schema" type="application/ld+json">${JSON.stringify(courseSchema, null, 2)}</script>`;
        pageHtml = pageHtml.replace('</head>', `  ${courseTag}\n</head>`);
      }

      // Inject JSON-LD Schema for LearningResource & FAQPage if lesson
      if (meta.lessonData) {
        const faqs = extractFaqFromContent(meta.lessonData.content, meta.lessonData.title, meta.lessonData.summary);

        const graphItems = [
          {
            "@type": "LearningResource",
            "@id": `${meta.canonical}#lesson`,
            "isPartOf": { "@id": "https://www.aevum.ai.vn/#website" },
            "headline": meta.title,
            "description": meta.description,
            "url": meta.canonical,
            "inLanguage": "vi-VN",
            "educationalLevel": meta.lessonData.level || "Intermediate to Advanced",
            "learningResourceType": "Lesson",
            "timeRequired": meta.lessonData.readTime ? `PT${meta.lessonData.readTime.replace(/[^0-9]/g, '') || 10}M` : "PT10M",
            "author": {
              "@type": "Person",
              "name": meta.lessonData.author?.name || "I2FLabs Vietnam",
              "jobTitle": meta.lessonData.author?.role || "AI Engineer"
            },
            "publisher": {
              "@type": "Organization",
              "name": "I2FLabs Vietnam",
              "url": "https://www.aevum.ai.vn",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.aevum.ai.vn/icon-512.png"
              }
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${meta.canonical}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": "https://www.aevum.ai.vn/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Khám phá Kỉ nguyên",
                "item": "https://www.aevum.ai.vn/explore"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": meta.lessonData.category || "Chuyên đề",
                "item": "https://www.aevum.ai.vn/explore"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": meta.lessonData.title,
                "item": meta.canonical
              }
            ]
          }
        ];

        if (faqs.length > 0) {
          graphItems.push({
            "@type": "FAQPage",
            "@id": `${meta.canonical}#faq`,
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          });
        }

        const lessonSchema = {
          "@context": "https://schema.org",
          "@graph": graphItems
        };

        const schemaTag = `<script id="aevum-lesson-schema" type="application/ld+json">${JSON.stringify(lessonSchema, null, 2)}</script>`;
        pageHtml = pageHtml.replace('</head>', `  ${schemaTag}\n</head>`);

        // Inject keywords tag into <head>
        const keywordsList = [
          ...(meta.lessonData.tags || []),
          meta.lessonData.title,
          meta.lessonData.category || '',
          'Aevum OS',
          'Khám phá Kỉ nguyên AI',
          'Agentic AI',
          'Model Context Protocol',
          'I2FLabs Vietnam'
        ].filter(Boolean).join(', ');

        pageHtml = pageHtml.replace(
          /<\/head>/i,
          `  <meta name="keywords" content="${keywordsList.replace(/"/g, '&quot;')}" />\n</head>`
        );
      }

      // Optimize Critical Rendering Path: Inline entire critical CSS directly into <style> in <head>
      const cssMatch = pageHtml.match(/<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["'](\/assets\/index-[^"']+\.css)["']>/i);
      if (cssMatch) {
        const cssRelativePath = cssMatch[1].replace(/^\//, '');
        const cssFilePath = path.resolve(rootDir, 'dist', cssRelativePath);
        if (fs.existsSync(cssFilePath)) {
          const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
          pageHtml = pageHtml.replace(cssMatch[0], `<style id="critical-css">${cssContent}</style>`);
          pageHtml = pageHtml.replace(/<link\s+rel=["']preload["']\s+as=["']style["'][^>]*href=["'][^"']*assets\/index-[^"']*\.css["'][^>]*>\s*/gi, '');
        }
      }

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
