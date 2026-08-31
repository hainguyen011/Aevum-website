import { useEffect } from 'react';

const SEO_CONFIG = {
  landing: {
    title: {
      vi: 'Aevum OS — Standalone MCP Server & Bộ não Ngoại vi Khắc phục AI Context Amnesia',
      en: 'Aevum OS — Standalone MCP Server & Workspace External Brain',
    },
    description: {
      vi: 'Aevum OS là Hệ điều hành Agent độc lập và Bộ não Ngoại vi — hỗ trợ cấu hình MCP cho Cursor và Claude Desktop, lập kế hoạch DDD, đồ thị bộ nhớ tự phục hồi và khắc phục triệt để AI Context Amnesia.',
      en: 'Aevum OS is an independent workspace Operating System and External Brain — housing domain-driven planning, self-healing memory graphs, and autonomous multi-agent squad orchestration for Cursor and Claude Desktop.',
    },
    keywords: {
      vi: 'Cấu hình MCP Cursor, Kết nối Claude Desktop MCP, Standalone MCP Server, Local-First AI Memory, AI quên ngữ cảnh code, Fix AI Context Amnesia, Giảm hao hụt token, Aevum OS, Model Context Protocol',
      en: 'Cursor MCP config, Claude Desktop MCP server, Standalone MCP Daemon, Local-First AI Memory, Fix AI Context Amnesia, Reduce token consumption, Aevum OS',
    },
    path: '',
  },
  pricing: {
    title: {
      vi: 'Bảng Giá & Gói Thành Viên — Aevum OS Community & Pro Tiers',
      en: 'Transparent Pricing & Membership Tiers — Aevum OS',
    },
    description: {
      vi: 'Bảng giá minh bạch Aevum OS: Gói Community miễn phí vĩnh viễn Local-First và gói Pro trải nghiệm 14 ngày Beta Trial đồng bộ Cloud & Biệt đội Đa Agent.',
      en: 'Official pricing for Aevum OS: Free forever Local-First Community tier and supercharged Pro tier with 14-Day Free Beta Trial for Autonomous Multi-Agent Squads.',
    },
    keywords: {
      vi: 'Bảng giá Aevum OS, Free Local MCP Server, Aevum Pro Trial, Đăng ký MCP Server, Chi phí MCP Daemon',
      en: 'Aevum OS pricing, Free Local-First MCP, Aevum Pro Trial, MCP Server cost',
    },
    path: 'pricing',
  },
  docs: {
    title: {
      vi: 'Tài liệu Kỹ thuật & Hướng dẫn Cấu hình MCP Cursor & Claude — Aevum OS Docs',
      en: 'Technical Documentation & MCP Setup Guides — Aevum OS Docs',
    },
    description: {
      vi: 'Hướng dẫn từng bước cấu hình MCP Server trên Cursor và Claude Desktop, cài đặt daemon SSE port 3344, quy trình bắt tay Handshake Ritual và danh mục công cụ MCP của Aevum OS.',
      en: 'Step-by-step setup guides for Cursor MCP and Claude Desktop, SSE daemon setup on port 3344, Handshake Ritual protocol, and complete MCP tool definitions.',
    },
    keywords: {
      vi: 'Cấu hình MCP Cursor, Kết nối Claude Desktop MCP, Hướng dẫn cài đặt MCP Server, Handshake Ritual MCP, Danh mục MCP Tools, Lập trình DDD với AI',
      en: 'Configure MCP Cursor, Connect Claude Desktop MCP, MCP setup guide, Handshake Ritual, MCP tools catalog, DDD AI coding',
    },
    path: 'docs',
  },
  about: {
    title: {
      vi: 'Giới thiệu & Triết lý Sản phẩm — Aevum OS by I2FLabs',
      en: 'About & Product Philosophy — Aevum OS by I2FLabs',
    },
    description: {
      vi: 'Khám phá câu chuyện phát triển Aevum OS và sứ mệnh tách biệt bộ não AI khỏi IDE để khắc phục AI Context Amnesia và mang lại khả năng ghi nhớ dài hạn cho lập trình viên.',
      en: 'Discover the story behind Aevum OS and the mission to decouple workspace AI intelligence from single-editor lifecycles.',
    },
    keywords: {
      vi: 'Giới thiệu Aevum OS, I2FLabs, Triết lý Decoupled External Brain, Khắc phục AI Amnesia, Tương lai AI Coding',
      en: 'About Aevum OS, I2FLabs, Decoupled External Brain, Fix AI Amnesia, AI Coding Future',
    },
    path: 'about',
  },
  changelog: {
    title: {
      vi: 'Nhật ký Cập nhật & Lịch sử Bản phát hành — Aevum OS Changelog',
      en: 'Product Release History & Changelog — Aevum OS',
    },
    description: {
      vi: 'Theo dõi các tính năng mới nhất, bản vá lỗi và nâng cấp kiến trúc cho Aevum OS và bộ tiện ích mở rộng I2FLabs.',
      en: 'Track the latest feature updates, security patches, and architectural evolution of Aevum OS releases.',
    },
    keywords: {
      vi: 'Aevum OS Changelog, Lịch sử phiên bản Aevum, Bản cập nhật MCP Server, Tính năng mới Aevum',
      en: 'Aevum OS Changelog, Release notes, MCP server updates, New Aevum features',
    },
    path: 'changelog',
  },
  discussions: {
    title: {
      vi: 'Cộng đồng Thảo luận & Hỗ trợ Kỹ thuật — Aevum OS Discussions',
      en: 'Community Discussions & Technical Support — Aevum OS',
    },
    description: {
      vi: 'Tham gia thảo luận về các phiên bản phát hành Aevum OS, báo lỗi, đóng góp ý kiến và kết nối với cộng đồng lập trình viên.',
      en: 'Join discussions on Aevum OS release builds, submit bug reports, suggest architecture features, and connect with developers.',
    },
    keywords: {
      vi: 'Thảo luận Aevum OS, Diễn đàn MCP Server, Báo lỗi Aevum, Cộng đồng Lập trình viên AI',
      en: 'Aevum OS discussions, MCP forum, Bug reports, AI developer community',
    },
    path: 'discussions',
  },
  privacy: {
    title: {
      vi: 'Chính sách Bảo mật — Aevum OS by I2FLabs',
      en: 'Privacy Policy — Aevum OS by I2FLabs',
    },
    description: {
      vi: 'Chính sách Bảo mật của I2FLabs và Aevum OS: Cách chúng tôi bảo vệ dữ liệu cá nhân và đảm bảo nguyên tắc 100% Local-First.',
      en: 'Privacy Policy of I2FLabs and Aevum OS: How we collect, use, and protect your personal and engineering data.',
    },
    keywords: {
      vi: 'Chính sách bảo mật Aevum, Bảo mật Local-First, Quyền riêng tư dữ liệu mã nguồn',
      en: 'Privacy Policy Aevum, Local-First security, Code privacy',
    },
    path: 'privacy',
  },
  terms: {
    title: {
      vi: 'Điều khoản Dịch vụ — Aevum OS by I2FLabs',
      en: 'Terms of Service — Aevum OS by I2FLabs',
    },
    description: {
      vi: 'Điều khoản Dịch vụ của I2FLabs và Aevum OS: Quyền, nghĩa vụ và chính sách sử dụng dịch vụ trong không gian làm việc.',
      en: 'Terms of Service of I2FLabs and Aevum OS: Rights, obligations, and service usage policies in AI engineering workspaces.',
    },
    keywords: {
      vi: 'Điều khoản dịch vụ Aevum, Quy định sử dụng Aevum OS, I2FLabs Terms',
      en: 'Terms of service Aevum, Usage policies, I2FLabs Terms',
    },
    path: 'terms',
  },
};

export function useSEO(currentPage = 'landing', activeLang = 'vi') {
  useEffect(() => {
    const config = SEO_CONFIG[currentPage] || SEO_CONFIG.landing;
    const lang = activeLang === 'vi' ? 'vi' : 'en';

    const titleText = config.title[lang] || config.title.en;
    const descText = config.description[lang] || config.description.en;
    const keywordsText = (config.keywords && config.keywords[lang]) || config.keywords.en;
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

    // Meta Description, Keywords & Social Graphs
    setMetaTag('meta[name="description"]', 'name', 'description', descText);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywordsText);
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

    // 5. Ensure Favicon is explicitly refreshed across all dynamic tabs
    const setFavicon = (href, type, rel = 'icon') => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      if (type) link.setAttribute('type', type);
      link.setAttribute('href', href);
    };

    setFavicon('/aevum-logo-32.png?v=6.0', 'image/png', 'icon');
    setFavicon('/favicon.ico?v=6.0', 'image/x-icon', 'shortcut icon');
  }, [currentPage, activeLang]);
}
