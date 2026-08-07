import { useEffect } from 'react';

const SEO_CONFIG = {
  landing: {
    title: {
      vi: 'Aevum OS — Standalone MCP Server & Bộ não Ngoại vi Không gian Làm việc',
      en: 'Aevum OS — Standalone MCP Server & Workspace External Brain',
    },
    description: {
      vi: 'Aevum OS là Hệ điều hành Agent độc lập và Bộ não Ngoại vi — hỗ trợ lập kế hoạch DDD, đồ thị bộ nhớ tự phục hồi và điều phối biệt đội đa agent tự trị.',
      en: 'Aevum OS is an independent workspace Operating System and External Brain — housing domain-driven planning, self-healing memory graphs, and autonomous multi-agent squad orchestration.',
    },
    path: '',
  },
  docs: {
    title: {
      vi: 'Tài liệu Kỹ thuật — Aevum OS Documentation',
      en: 'Technical Documentation — Aevum OS Docs',
    },
    description: {
      vi: 'Hướng dẫn tích hợp cổng MCP, cài đặt daemon SSE port 3344, quy trình bắt tay Handshake Ritual và danh sách công cụ MCP của Aevum OS.',
      en: 'Complete technical reference, MCP server connection guide, SSE daemon setup on port 3344, Handshake Ritual specs, and MCP tool definitions.',
    },
    path: 'docs',
  },
  about: {
    title: {
      vi: 'Giới thiệu & Triết lý Sản phẩm — Aevum OS by I2FLabs',
      en: 'About & Product Philosophy — Aevum OS by I2FLabs',
    },
    description: {
      vi: 'Khám phá câu chuyện phát triển Aevum OS và sứ mệnh tách biệt bộ não AI khỏi IDE để mang lại khả năng ghi nhớ dài hạn cho lập trình viên.',
      en: 'Discover the story behind Aevum OS and the mission to decouple workspace AI intelligence from single-editor lifecycles.',
    },
    path: 'about',
  },
  changelog: {
    title: {
      vi: 'Nhật ký Cập nhật & Lịch sử Phiên bản — Aevum OS Changelog',
      en: 'Product Release History & Changelog — Aevum OS',
    },
    description: {
      vi: 'Theo dõi các tính năng mới nhất, bản vá lỗi và nâng cấp kiến trúc cho Aevum OS và bộ tiện ích mở rộng I2FLabs.',
      en: 'Track the latest feature updates, security patches, and architectural evolution of Aevum OS releases.',
    },
    path: 'changelog',
  },
  discussions: {
    title: {
      vi: 'Cộng đồng Thảo luận & Sửa lỗi — Aevum OS Community Discussions',
      en: 'Community Discussions & Bug Hunter — Aevum OS',
    },
    description: {
      vi: 'Tham gia thảo luận về các phiên bản phát hành Aevum OS, báo lỗi, đóng góp ý kiến và kết nối với cộng đồng lập trình viên.',
      en: 'Join discussions on Aevum OS release builds, submit bug reports, suggest architecture features, and connect with developers.',
    },
    path: 'discussions',
  },
};

export function useSEO(currentPage = 'landing', activeLang = 'vi') {
  useEffect(() => {
    const config = SEO_CONFIG[currentPage] || SEO_CONFIG.landing;
    const lang = activeLang === 'vi' ? 'vi' : 'en';

    const titleText = config.title[lang] || config.title.en;
    const descText = config.description[lang] || config.description.en;
    const canonicalUrl = `https://www.aevum.ai.vn/${config.path}`;

    // 1. Update Title
    document.title = titleText;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description & Keywords
    setMetaTag('meta[name="description"]', 'name', 'description', descText);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', titleText);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', descText);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', titleText);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', descText);

    // 3. Update Canonical Link Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // 4. Update html lang attribute
    document.documentElement.setAttribute('lang', lang);

  }, [currentPage, activeLang]);
}
