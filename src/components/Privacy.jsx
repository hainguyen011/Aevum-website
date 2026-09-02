import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronRight, Terminal, ShieldAlert } from 'lucide-react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'overview',
      nav: isVi ? 'Tổng quan' : 'Overview',
      title: isVi ? 'Tổng quan' : 'Overview',
      category: isVi ? 'Giới thiệu chung' : 'Introduction',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Chính sách Bảo mật này mô tả cách I2FLabs ("chúng tôi", "Aevum OS") thu thập, sử dụng và bảo vệ thông tin của bạn khi sử dụng các dịch vụ tại aevum.ai.vn và các sản phẩm liên quan.'
            : 'This Privacy Policy describes how I2FLabs ("we", "Aevum OS") collects, uses, and protects your information when using services at aevum.ai.vn and related products.'
        },
        {
          type: 'p',
          text: isVi
            ? 'Bằng cách sử dụng dịch vụ Aevum OS, bạn đồng ý với các điều khoản trong Chính sách này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.'
            : 'By using Aevum OS, you agree to the terms in this Policy. If you do not agree, please discontinue using our services.'
        },
        {
          type: 'meta',
          text: isVi ? 'Hiệu lực: 01/01/2026  ·  Cập nhật: Tháng 08/2026' : 'Effective: 01/01/2026  ·  Updated: August 2026'
        }
      ]
    },
    {
      id: 'collection',
      nav: isVi ? 'Dữ liệu thu thập' : 'Data We Collect',
      title: isVi ? 'Dữ liệu chúng tôi thu thập' : 'Data We Collect',
      category: isVi ? 'Chính sách Dữ liệu' : 'Data Policy',
      content: [
        {
          type: 'group',
          label: isVi ? 'Thông tin tài khoản' : 'Account information',
          items: isVi
            ? ['Địa chỉ email khi đăng ký', 'Tên hiển thị và ảnh đại diện (nếu đăng nhập OAuth)', 'Thông tin xác thực từ Google hoặc GitHub']
            : ['Email address upon registration', 'Display name and avatar (if using OAuth login)', 'Authentication data from Google or GitHub']
        },
        {
          type: 'group',
          label: isVi ? 'Dữ liệu sử dụng (ẩn danh)' : 'Usage data (anonymized)',
          items: isVi
            ? ['Tần suất sử dụng tính năng — không gắn với danh tính cá nhân', 'Báo cáo lỗi và hiệu suất ẩn danh', 'Phiên bản phần mềm và hệ điều hành']
            : ['Feature usage frequency — not linked to personal identity', 'Anonymous error and performance reports', 'Software version and operating system']
        },
        {
          type: 'group',
          label: isVi ? 'Dữ liệu workspace (local-first)' : 'Workspace data (local-first)',
          items: isVi
            ? ['Memory graph và plans được lưu trên thiết bị của bạn', 'Dữ liệu cloud sync được mã hóa đầu-cuối trước khi truyền', 'Chúng tôi không đọc nội dung code hoặc tài liệu của bạn']
            : ['Memory graph and plans stored on your device', 'Cloud-synced data is end-to-end encrypted before transmission', 'We do not read the content of your code or documents']
        }
      ]
    },
    {
      id: 'usage',
      nav: isVi ? 'Cách sử dụng' : 'How We Use It',
      title: isVi ? 'Cách chúng tôi sử dụng thông tin' : 'How We Use Information',
      category: isVi ? 'Chính sách Dữ liệu' : 'Data Policy',
      content: [
        {
          type: 'group',
          label: isVi ? 'Cung cấp dịch vụ' : 'Service provision',
          items: isVi
            ? ['Xác thực và quản lý tài khoản người dùng', 'Đồng bộ hóa dữ liệu giữa các thiết bị (tính năng Pro)', 'Gửi thông báo kỹ thuật và cập nhật sản phẩm']
            : ['User account authentication and management', 'Data synchronization across devices (Pro feature)', 'Sending technical notifications and product updates']
        },
        {
          type: 'group',
          label: isVi ? 'Cải thiện sản phẩm' : 'Product improvement',
          items: isVi
            ? ['Phân tích thống kê sử dụng ẩn danh', 'Phát hiện và sửa lỗi dựa trên crash reports', 'Nghiên cứu phát triển tính năng mới']
            : ['Analyzing anonymous usage statistics', 'Detecting and fixing bugs based on crash reports', 'Research for new feature development']
        },
        {
          type: 'note',
          text: isVi ? 'Chúng tôi cam kết không bán hoặc chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại.' : 'We commit not to sell or share your personal information with third parties for commercial purposes.'
        }
      ]
    },
    {
      id: 'storage',
      nav: isVi ? 'Lưu trữ & Bảo mật' : 'Storage & Security',
      title: isVi ? 'Lưu trữ và Bảo mật' : 'Storage and Security',
      category: isVi ? 'Hạ tầng & Bảo vệ' : 'Infrastructure & Security',
      content: [
        {
          type: 'group',
          label: isVi ? 'Hạ tầng lưu trữ' : 'Storage infrastructure',
          items: isVi
            ? ['Dữ liệu tài khoản được lưu trên Supabase (PostgreSQL) với mã hóa at-rest', 'Máy chủ đặt tại khu vực Đông Nam Á / Singapore', 'Dữ liệu workspace local lưu trên thiết bị của bạn (Community tier)']
            : ['Account data stored on Supabase (PostgreSQL) with at-rest encryption', 'Servers located in Southeast Asia / Singapore', 'Local workspace data stays on your device (Community tier)']
        },
        {
          type: 'group',
          label: isVi ? 'Biện pháp bảo mật' : 'Security measures',
          items: isVi
            ? ['Truyền dữ liệu qua HTTPS / TLS 1.3', 'Mã hóa Ed25519 cho license', 'Token JWT với thời hạn hết hạn tự động', 'Xác thực hai yếu tố (2FA) qua Supabase Auth']
            : ['Data transmission via HTTPS / TLS 1.3', 'Ed25519 cryptography for license verification', 'JWT tokens with automatic expiration', 'Two-factor authentication (2FA) via Supabase Auth']
        },
        {
          type: 'group',
          label: isVi ? 'Thời gian lưu trữ' : 'Retention periods',
          items: isVi
            ? ['Dữ liệu tài khoản: Trong suốt thời gian sử dụng + 30 ngày sau khi xóa', 'Log ẩn danh: Tối đa 90 ngày', 'Dữ liệu thanh toán: Theo quy định pháp lý (thường 7 năm)']
            : ['Account data: Duration of use + 30 days after deletion', 'Anonymous logs: Maximum 90 days', 'Payment data: As required by law (typically 7 years)']
        }
      ]
    },
    {
      id: 'thirdparty',
      nav: isVi ? 'Bên thứ ba' : 'Third Parties',
      title: isVi ? 'Bên thứ ba' : 'Third Parties',
      category: isVi ? 'Hạ tầng & Bảo vệ' : 'Infrastructure & Security',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Chúng tôi sử dụng các dịch vụ bên thứ ba đáng tin cậy để vận hành sản phẩm. Mỗi bên có chính sách bảo mật riêng. Chúng tôi chỉ chia sẻ dữ liệu tối thiểu cần thiết.'
            : 'We use trusted third-party services to operate the product. Each has its own privacy policy. We only share the minimum data necessary.'
        },
        {
          type: 'table',
          rows: isVi
            ? [
              ['Supabase', 'Cơ sở dữ liệu và xác thực'],
              ['Google OAuth', 'Đăng nhập qua Google'],
              ['GitHub OAuth', 'Đăng nhập qua GitHub'],
              ['Vercel', 'Hosting và CDN'],
              ['GrowthBook', 'A/B testing ẩn danh'],
              ['Resend', 'Gửi email thông báo'],
            ]
            : [
              ['Supabase', 'Database and authentication'],
              ['Google OAuth', 'Login via Google'],
              ['GitHub OAuth', 'Login via GitHub'],
              ['Vercel', 'Hosting and CDN'],
              ['GrowthBook', 'Anonymous A/B testing'],
              ['Resend', 'Transactional email'],
            ]
        }
      ]
    },
    {
      id: 'rights',
      nav: isVi ? 'Quyền của bạn' : 'Your Rights',
      title: isVi ? 'Quyền của bạn' : 'Your Rights',
      category: isVi ? 'Pháp lý & Quyền lợi' : 'Legal & Rights',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Bạn có toàn quyền kiểm soát dữ liệu cá nhân của mình. Để thực hiện bất kỳ quyền nào, liên hệ dev@aevum.ai.vn — phản hồi trong vòng 30 ngày làm việc.'
            : 'You have full control over your personal data. To exercise any right, contact dev@aevum.ai.vn — response within 30 business days.'
        },
        {
          type: 'list',
          items: isVi
            ? ['Quyền truy cập — yêu cầu bản sao dữ liệu cá nhân', 'Quyền sửa chữa — cập nhật thông tin không chính xác', 'Quyền xóa — yêu cầu xóa tài khoản và tất cả dữ liệu liên quan', 'Quyền hạn chế — yêu cầu tạm ngừng hoặc hạn chế xử lý', 'Quyền di chuyển — nhận dữ liệu dưới định dạng JSON / CSV tiêu chuẩn']
            : ['Right to access — request a copy of your personal data', 'Right to rectification — update inaccurate information', 'Right to erasure — request deletion of account and all associated data', 'Right to restriction — request limitation of data processing', 'Right to portability — receive data in standard JSON / CSV format']
        }
      ]
    },
    {
      id: 'cookies',
      nav: 'Cookies',
      title: 'Cookies & Lưu trữ Cục bộ',
      category: isVi ? 'Pháp lý & Quyền lợi' : 'Legal & Rights',
      content: [
        {
          type: 'group',
          label: isVi ? 'Cookies cần thiết' : 'Necessary cookies',
          items: isVi
            ? ['auth-token — lưu phiên đăng nhập, hết hạn sau 7 ngày', 'aevum-lang — lưu ngôn ngữ ưa thích (vi / en)', 'aevum-theme — lưu chế độ hiển thị sáng / tối']
            : ['auth-token — stores login session, expires after 7 days', 'aevum-lang — stores language preference (vi / en)', 'aevum-theme — stores light / dark mode']
        },
        {
          type: 'group',
          label: isVi ? 'Những gì chúng tôi không sử dụng' : 'What we do not use',
          items: isVi
            ? ['Tracking cookies bên thứ ba', 'Browser fingerprinting', 'Cross-site tracking', 'Google Analytics hay Facebook Pixel']
            : ['Third-party tracking cookies', 'Browser fingerprinting', 'Cross-site tracking', 'Google Analytics or Facebook Pixel']
        }
      ]
    },
    {
      id: 'contact',
      nav: isVi ? 'Liên hệ' : 'Contact',
      title: isVi ? 'Thông tin Liên hệ & Cập nhật' : 'Contact & Updates',
      category: isVi ? 'Pháp lý & Quyền lợi' : 'Legal & Rights',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Mọi câu hỏi hoặc yêu cầu liên quan đến Chính sách Bảo mật, vui lòng liên hệ với đội ngũ phát triển I2FLabs:'
            : 'For any questions or requests related to this Privacy Policy, please contact the I2FLabs core development team:'
        },
        {
          type: 'contact',
          lines: [
            { label: 'Email', value: 'dev@aevum.ai.vn', href: 'mailto:dev@aevum.ai.vn' },
            { label: isVi ? 'Tổ chức' : 'Organization', value: 'I2FLabs, Việt Nam' },
            { label: 'Website', value: 'aevum.ai.vn', href: 'https://www.aevum.ai.vn' },
          ]
        },
        {
          type: 'note',
          text: isVi
            ? 'Chính sách này có thể được cập nhật định kỳ. Chúng tôi sẽ thông báo qua email khi có thay đổi quan trọng.'
            : 'This policy may be updated periodically. We will notify registered users via email of significant changes.'
        }
      ]
    }
  ];
};

const renderBlock = (block, idx, isVi) => {
  switch (block.type) {
    case 'p':
      return (
        <p key={idx} className="text-slate-300 text-sm leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case 'meta':
      return (
        <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#161B22] border border-white/5 text-slate-400 font-mono text-[11px] my-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{block.text}</span>
        </div>
      );
    case 'note':
      return (
        <div key={idx} className="p-4 rounded-md border my-6 flex gap-3 bg-cyan-950/20 border-cyan-500/20 text-cyan-200">
          <div className="pt-0.5 shrink-0">
            <Terminal size={16} className="text-cyan-400" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
              {isVi ? 'Lưu ý' : 'Note'}
            </div>
            <div className="text-xs leading-relaxed text-slate-300">
              {block.text}
            </div>
          </div>
        </div>
      );
    case 'group':
      return (
        <div key={idx} className="my-5">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1 h-2.5 bg-cyan-400 rounded-sm inline-block"></span>
            {block.label}
          </div>
          <ul className="list-disc pl-5 my-2 space-y-2 text-slate-300 text-sm">
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'list':
      return (
        <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-slate-300 text-sm">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={idx} className="overflow-x-auto my-6 border border-white/10 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-3 font-mono font-bold text-white uppercase tracking-wider w-2/5">
                  {isVi ? 'Dịch vụ bên thứ ba' : 'Third-Party Service'}
                </th>
                <th className="px-4 py-3 font-mono font-bold text-white uppercase tracking-wider w-3/5">
                  {isVi ? 'Mục đích sử dụng' : 'Purpose'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {block.rows.map(([name, desc], i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-cyan-400 align-top">
                    {name}
                  </td>
                  <td className="px-4 py-3 text-slate-300 align-top leading-relaxed">
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'contact':
      return (
        <div key={idx} className="overflow-x-auto my-6 border border-white/10 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <tbody className="divide-y divide-white/5 font-sans">
              {block.lines.map(({ label, value, href }, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-slate-400 uppercase tracking-wider w-1/3 bg-white/[0.01]">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-slate-200 break-all leading-relaxed">
                    {href ? (
                      <a href={href} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

export const Privacy = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const sections = SECTIONS(activeLang);
  const [activeId, setActiveId] = useState(sections[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  // Sync body class for 3D perspective mobile drawer (same as Docs page)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('docs-menu-active');
    } else {
      document.body.classList.remove('docs-menu-active');
    }
    return () => document.body.classList.remove('docs-menu-active');
  }, [sidebarOpen]);

  // Scroll spy implementation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const headingElements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
        if (headingElements.length === 0) return;

        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
        let currentActive = '';

        if (isAtBottom && sections.length > 0) {
          currentActive = sections[sections.length - 1].id;
        } else {
          for (const el of headingElements) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              currentActive = el.id;
            } else {
              break;
            }
          }
        }

        if (!currentActive && sections.length > 0) {
          currentActive = sections[0].id;
        }

        setActiveId((prev) => (prev !== currentActive ? currentActive : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    setActiveId(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -90, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Group sections by category (Docs structure)
  const categories = {};
  sections.forEach((sec) => {
    if (!categories[sec.category]) {
      categories[sec.category] = [];
    }
    categories[sec.category].push(sec);
  });

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-[#0B0B11] border-b border-white/5 block lg:flex lg:flex-row relative justify-between overflow-x-clip">
      {/* Mobile Portal Drawer (Renders outside app-content-wrapper directly on body) */}
      {typeof document !== 'undefined' && createPortal(
        <div className={`docs-mobile-drawer lg:hidden ${sidebarOpen ? 'open' : ''}`}>
          {/* Header Bar */}
          <div className="shrink-0 flex items-center justify-between p-5 border-b border-white/5 bg-transparent">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {isVi ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Categories List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar docs-drawer-nav-list" data-lenis-prevent>
            {Object.keys(categories).map((catName) => (
              <div key={catName} className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
                  {catName}
                </div>
                <ul className="space-y-1">
                  {categories[catName].map((sec) => {
                    const isActive = sec.id === activeId;
                    return (
                      <li key={sec.id}>
                        <button
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full flex items-center justify-between text-left py-2 px-3 rounded text-xs font-medium border transition-all duration-150 ease-out group cursor-pointer ${isActive
                            ? 'text-cyan-400 font-bold bg-cyan-500/10 border-cyan-500/30'
                            : 'text-slate-400 border-transparent hover:text-white hover:bg-white/[0.02]'
                            }`}
                        >
                          <span className="truncate">{sec.nav}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${isActive ? 'translate-x-0.5 text-cyan-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600'
                              }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}

      {/* Desktop Left Sidebar (Docs UI style) */}
      <aside className="hidden lg:block w-64 border-r border-white/5 shrink-0">
        <div className="sticky top-[73px] py-8 px-6 overflow-y-auto flex flex-col justify-between h-[calc(100vh-73px)]">
          <div className="space-y-6">
            {Object.keys(categories).map((catName) => (
              <div key={catName} className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
                  {catName}
                </div>
                <ul className="space-y-1">
                  {categories[catName].map((sec) => {
                    const isActive = sec.id === activeId;
                    return (
                      <li key={sec.id}>
                        <button
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full flex items-center justify-between text-left py-1.5 px-2.5 rounded text-xs font-medium border transition-all duration-150 ease-out group cursor-pointer ${isActive
                            ? 'text-cyan-400 font-bold bg-cyan-500/10 border-cyan-500/30'
                            : 'text-slate-400 border-transparent hover:text-white hover:bg-white/[0.01]'
                            }`}
                        >
                          <span className="truncate">{sec.nav}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${isActive ? 'translate-x-0.5 text-cyan-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600'
                              }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main View Wrapper */}
      <div
        onClick={() => sidebarOpen && setSidebarOpen(false)}
        className={`flex-1 flex flex-col xl:flex-row justify-between w-full bg-[#0B0B11] ${sidebarOpen ? 'cursor-pointer' : ''
          }`}
      >
        {/* Mobile Sticky Top-Left Menu Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
          onMouseEnter={() => setIsBtnVisible(true)}
          className={`lg:hidden sticky top-[76px] ml-4 mt-4 z-30 p-2 rounded-lg bg-[#0B0B11]/90 backdrop-blur-md hover:bg-white/10 text-white border border-white/15 transition-all duration-500 cursor-pointer flex items-center justify-center shadow-lg active:scale-95 self-start ${isBtnVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-30 scale-90 hover:opacity-100'
            }`}
          aria-label="Toggle Menu"
        >
          <Menu size={18} className="text-white" />
        </button>

        {/* Main Content Area (Docs UI Style) */}
        <main className="flex-1 px-6 md:px-12 lg:px-16 py-10 max-w-3xl xl:max-w-4xl w-full relative min-h-[500px]">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-2 font-bold uppercase tracking-wider">
              <span>I2FLABS</span>
              <span className="text-slate-600">/</span>
              <span>AEVUM OS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4 font-display">
              {isVi ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {isVi
                ? 'Tài liệu này giải thích rõ ràng cách I2FLabs thu thập, sử dụng và bảo vệ dữ liệu của bạn khi sử dụng Aevum OS và các dịch vụ trong hệ sinh thái.'
                : 'This document clearly explains how I2FLabs collects, uses, and protects your data when using Aevum OS and ecosystem services.'}
            </p>
            <hr className="border-t border-white/5 my-8" />
          </div>

          {/* Sections List */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-white tracking-tight mb-4 font-display flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span>
                  {section.title}
                </h2>
                <div>
                  {section.content.map((block, idx) => renderBlock(block, idx, isVi))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>

      {/* Right Sidebar: Mini Index / On This Page (TOC) */}
      <aside className="hidden xl:block w-56 relative border-l border-white/5">
        <div className="sticky top-[73px] py-8">
          {/* Label */}
          <div className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest px-4 py-3 border-b border-white/5">
            {isVi ? 'TRONG TRANG NÀY' : 'ON THIS PAGE'}
          </div>

          <ul className="text-xs">
            {sections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <li key={s.id} className={`border-b border-white/5 ${isActive ? 'bg-white/[0.05]' : ''}`}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-2 group cursor-pointer ${isActive
                      ? 'text-white font-bold'
                      : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'
                      }`}
                  >
                    <span className="line-clamp-2 leading-snug">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Privacy;
