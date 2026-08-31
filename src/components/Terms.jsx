import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronRight, Terminal, ShieldAlert } from 'lucide-react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'acceptance',
      nav: isVi ? '1. Chấp nhận Điều khoản' : '1. Acceptance',
      title: isVi ? '1. Chấp nhận Điều khoản Dịch vụ' : '1. Acceptance of Terms',
      category: isVi ? 'Quy định Chung' : 'General Terms',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Bằng việc truy cập hoặc sử dụng bất kỳ dịch vụ nào của Aevum OS (bao gồm aevum.ai.vn, Aevum OS Desktop App, Aevum Cloud API và các công cụ liên quan), bạn đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản Dịch vụ này.'
            : 'By accessing or using any Aevum OS services (including aevum.ai.vn, Aevum OS Desktop App, Aevum Cloud API, and related tools), you agree to be bound by these Terms of Service.'
        },
        {
          type: 'p',
          text: isVi
            ? 'Nếu bạn đại diện cho một tổ chức hoặc doanh nghiệp, bạn xác nhận rằng bạn có đầy đủ thẩm quyền pháp lý để ràng buộc tổ chức đó với các điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào, vui lòng không sử dụng dịch vụ.'
            : 'If you are using the services on behalf of an organization, you confirm that you have legal authority to bind that entity to these terms. If you do not agree with any part, please discontinue use immediately.'
        },
        {
          type: 'meta',
          text: isVi ? 'Hiệu lực: 01/01/2026  ·  Cập nhật: Tháng 08/2026' : 'Effective: 01/01/2026  ·  Updated: August 2026'
        }
      ]
    },
    {
      id: 'eligibility',
      nav: isVi ? '2. Điều kiện sử dụng' : '2. Eligibility',
      title: isVi ? '2. Điều kiện sử dụng & Trách nhiệm Tài khoản' : '2. Eligibility & Account Responsibilities',
      category: isVi ? 'Quy định Chung' : 'General Terms',
      content: [
        {
          type: 'group',
          label: isVi ? 'Yêu cầu người dùng' : 'User requirements',
          items: isVi
            ? [
                'Độ tuổi tối thiểu: từ 13 tuổi trở lên (hoặc độ tuổi tối thiểu theo quy định tại quốc gia sở tại)',
                'Cung cấp thông tin xác thực chính xác khi đăng ký tài khoản qua Email hoặc OAuth',
                'Tự chịu trách nhiệm bảo mật thông tin đăng nhập, token xác thực và các hoạt động phát sinh từ tài khoản',
                'Thông báo ngay cho I2FLabs khi phát hiện có dấu hiệu truy cập trái phép'
              ]
            : [
                'Minimum age: 13 years or older (or the minimum legal age in your jurisdiction)',
                'Provide accurate verification info when registering via Email or OAuth',
                'Maintain confidentiality of credentials, access tokens, and all activities under your account',
                'Promptly notify I2FLabs upon discovering any unauthorized account activity'
              ]
        }
      ]
    },
    {
      id: 'services',
      nav: isVi ? '3. Dịch vụ & Phân hạng' : '3. Service Tiers',
      title: isVi ? '3. Mô tả Dịch vụ & Các gói sử dụng' : '3. Services & Subscription Tiers',
      category: isVi ? 'Dịch vụ & Quy tắc' : 'Services & Rules',
      content: [
        {
          type: 'group',
          label: isVi ? 'Gói Community (Local-First — Miễn phí)' : 'Community Tier (Local-First — Free)',
          items: isVi
            ? [
                'Chạy MCP Daemon trực tiếp trên máy cục bộ',
                'Lưu trữ Living Memory Graph cục bộ không giới hạn',
                'Tích hợp 1:1 với IDE (Cursor, VS Code, Claude Desktop)',
                'Không yêu cầu kết nối đám mây bắt buộc'
              ]
            : [
                'Run standalone MCP Daemon locally on your workstation',
                'Unlimited local Living Memory Graph storage',
                '1:1 integration with IDEs (Cursor, VS Code, Claude Desktop)',
                'No mandatory cloud connection required'
              ]
        },
        {
          type: 'group',
          label: isVi ? 'Gói Pro & Enterprise (Cloud Sync & Squads)' : 'Pro & Enterprise Tiers (Cloud Sync & Squads)',
          items: isVi
            ? [
                'Đồng bộ hóa Context & Memory Graph đa thiết bị an toàn qua Aevum Cloud',
                'Điều phối đội ngũ đa Agent tự trị (Autonomous Multi-Agent Squads)',
                'Mạng lưới giao tiếp phân tán PiperNet Mesh',
                'Hỗ trợ kỹ thuật ưu tiên từ đội ngũ phát triển I2FLabs'
              ]
            : [
                'End-to-end encrypted Context & Memory Graph synchronization via Aevum Cloud',
                'Autonomous Multi-Agent Squad Orchestration',
                'PiperNet Mesh distributed agent network',
                'Priority technical support from the I2FLabs core team'
              ]
        }
      ]
    },
    {
      id: 'acceptable-use',
      nav: isVi ? '4. Quy định sử dụng' : '4. Acceptable Use',
      title: isVi ? '4. Quy tắc sử dụng được chấp nhận' : '4. Acceptable Use Policy',
      category: isVi ? 'Dịch vụ & Quy tắc' : 'Services & Rules',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Người dùng cam kết không sử dụng Aevum OS cho các mục đích vi phạm pháp luật hoặc gây phương hại đến hệ thống:'
            : 'You agree not to use Aevum OS for unlawful purposes or activities that compromise system integrity:'
        },
        {
          type: 'list',
          items: isVi
            ? [
                'Phát tán mã độc, virus, tấn công DDoS hoặc cố gắng xâm nhập trái phép hạ tầng Aevum Cloud',
                'Sử dụng dịch vụ để thu thập, phân tích trái phép dữ liệu của người khác mà không có sự đồng ý',
                'Đảo ngược kỹ thuật (reverse engineering), sao chép mã nguồn các thành phần độc quyền khi chưa được cấp phép',
                'Khai thác hoặc lạm dụng tài nguyên API ngoài hạn mức quy định'
              ]
            : [
                'Distributing malware, viruses, DDoS attacks, or attempting unauthorized access to Aevum Cloud infrastructure',
                'Using the service to unlawfully harvest or analyze personal data without consent',
                'Reverse engineering or duplicating proprietary system binaries without explicit authorization',
                'Abusing API rate limits or service quotas beyond fair-use allocations'
              ]
        }
      ]
    },
    {
      id: 'intellectual-property',
      nav: isVi ? '5. Sở hữu trí tuệ' : '5. Intellectual Property',
      title: isVi ? '5. Quyền Sở hữu Trí tuệ & Quyền tác giả' : '5. Intellectual Property & Ownership',
      category: isVi ? 'Tài chính & Pháp lý' : 'Billing & Legal',
      content: [
        {
          type: 'group',
          label: isVi ? 'Dữ liệu và mã nguồn của bạn' : 'Your data and code',
          items: isVi
            ? [
                'Bạn giữ toàn quyền sở hữu 100% đối với toàn bộ source code, plans, notes và memory graph do bạn tạo ra',
                'I2FLabs không sở hữu, không thương mại hóa và không sử dụng dữ liệu của bạn để huấn luyện mô hình công cộng'
              ]
            : [
                'You retain 100% ownership over all source code, architectural plans, notes, and memory graphs you create',
                'I2FLabs does not claim ownership, commercialize, or use your private data to train public foundation models'
              ]
        },
        {
          type: 'group',
          label: isVi ? 'Tài sản của I2FLabs' : 'I2FLabs assets',
          items: isVi
            ? [
                'Thương hiệu Aevum OS, logo, giao diện người dùng, tài liệu và mã nguồn nền tảng thuộc quyền sở hữu của I2FLabs',
                'Các thành phần mã nguồn mở được phát hành theo giấy phép open-source tương ứng đính kèm trong repository'
              ]
            : [
                'The Aevum OS brand, logos, user interfaces, documentation, and platform code are proprietary to I2FLabs',
                'Open-source components are distributed under their respective licenses included in the repositories'
              ]
        }
      ]
    },
    {
      id: 'payment',
      nav: isVi ? '6. Thanh toán & Hoàn tiền' : '6. Billing & Refunds',
      title: isVi ? '6. Thanh toán, Gia hạn & Chính sách Hoàn tiền' : '6. Payments, Renewals & Refund Policy',
      category: isVi ? 'Tài chính & Pháp lý' : 'Billing & Legal',
      content: [
        {
          type: 'group',
          label: isVi ? 'Đăng ký & Chu kỳ thanh toán' : 'Subscriptions & billing cycles',
          items: isVi
            ? [
                'Các gói dịch vụ trả phí được tính theo chu kỳ hàng tháng hoặc hàng năm',
                'Gói dịch vụ tự động gia hạn trừ khi bạn hủy trước ngày bắt đầu chu kỳ kế tiếp',
                'Bạn có thể quản lý và hủy gói bất cứ lúc nào trong trang Hồ sơ cá nhân (Profile)'
              ]
            : [
                'Paid plans are billed on a recurring monthly or annual basis',
                'Subscriptions renew automatically unless cancelled before the next billing date',
                'You can manage or cancel your subscription anytime via your Profile settings'
              ]
        },
        {
          type: 'group',
          label: isVi ? 'Chính sách hoàn tiền' : 'Refund policy',
          items: isVi
            ? [
                'Chương trình Dùng thử (Trial): Trải nghiệm đầy đủ tính năng Pro theo thời hạn thông báo',
                'Hỗ trợ xem xét hoàn tiền trong vòng 7 ngày đầu tiên nếu dịch vụ gặp sự cố kỹ thuật không thể khắc phục'
              ]
            : [
                'Trial Program: Full access to Pro tier features during the designated trial period',
                'Refund requests considered within the first 7 days if persistent technical failures prevent service usage'
              ]
        }
      ]
    },
    {
      id: 'liability',
      nav: isVi ? '7. Giới hạn trách nhiệm' : '7. Liability Limits',
      title: isVi ? '7. Tuyên bố miễn trừ & Giới hạn Trách nhiệm' : '7. Disclaimer & Limitation of Liability',
      category: isVi ? 'Tài chính & Pháp lý' : 'Billing & Legal',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Aevum OS được cung cấp theo nguyên tắc "nguyên trạng" (AS-IS). Chúng tôi nỗ lực tối đa để đảm bảo tính ổn định và bảo mật, tuy nhiên:'
            : 'Aevum OS is provided on an "AS-IS" and "AS-AVAILABLE" basis. While we strive for maximum reliability and security:'
        },
        {
          type: 'list',
          items: isVi
            ? [
                'Chúng tôi không chịu trách nhiệm cho các mất mát dữ liệu phát sinh từ lỗi phần cứng cục bộ, cấu hình sai của người dùng hoặc sự cố mạng bên ngoài',
                'AI Agent là công cụ hỗ trợ; người dùng có trách nhiệm kiểm duyệt mã nguồn và các quyết định kiến trúc trước khi triển khai sản xuất',
                'Tổng mức bồi thường trách nhiệm tối đa (nếu có) không vượt quá số tiền bạn đã thanh toán cho dịch vụ trong 3 tháng gần nhất'
              ]
            : [
                'We are not liable for data loss caused by local hardware failures, improper user configuration, or external network outages',
                'AI Agents are assistive tools; developers retain sole responsibility for reviewing code and architecture before production deployment',
                'Our maximum aggregate liability shall not exceed the amount paid by you for the service during the preceding 3 months'
              ]
        }
      ]
    },
    {
      id: 'contact',
      nav: isVi ? '8. Liên hệ & Pháp lý' : '8. Contact & Legal',
      title: isVi ? '8. Luật điều chỉnh & Thông tin Liên hệ' : '8. Governing Law & Contact Information',
      category: isVi ? 'Tài chính & Pháp lý' : 'Billing & Legal',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Các Điều khoản này được điều chỉnh và giải thích theo pháp luật Việt Nam. Mọi thắc mắc hoặc yêu cầu hỗ trợ pháp lý, vui lòng liên hệ:'
            : 'These Terms are governed by and construed in accordance with the laws of Vietnam. For any legal inquiries or support:'
        },
        {
          type: 'contact',
          lines: [
            { label: 'Email', value: 'dev@aevum.ai.vn', href: 'mailto:dev@aevum.ai.vn' },
            { label: isVi ? 'Đơn vị phát triển' : 'Organization', value: 'I2FLabs, Việt Nam' },
            { label: 'Website', value: 'aevum.ai.vn', href: 'https://www.aevum.ai.vn' },
          ]
        },
        {
          type: 'note',
          text: isVi
            ? 'I2FLabs có quyền cập nhật Điều khoản Dịch vụ khi cần thiết. Chúng tôi sẽ đăng tải phiên bản mới và thông báo ngày hiệu lực trên trang web.'
            : 'I2FLabs reserves the right to revise these Terms as necessary. Updated versions will be published with an updated effective date.'
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

export const Terms = ({ activeLang = 'vi' }) => {
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
              {isVi ? 'Điều khoản Dịch vụ' : 'Terms of Service'}
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
                          className={`w-full flex items-center justify-between text-left py-2 px-3 rounded text-xs font-medium border transition-all duration-150 ease-out group cursor-pointer ${
                            isActive
                              ? 'text-cyan-400 font-bold bg-cyan-500/10 border-cyan-500/30'
                              : 'text-slate-400 border-transparent hover:text-white hover:bg-white/[0.02]'
                          }`}
                        >
                          <span className="truncate">{sec.nav}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${
                              isActive ? 'translate-x-0.5 text-cyan-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600'
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
                          className={`w-full flex items-center justify-between text-left py-1.5 px-2.5 rounded text-xs font-medium border transition-all duration-150 ease-out group cursor-pointer ${
                            isActive
                              ? 'text-cyan-400 font-bold bg-cyan-500/10 border-cyan-500/30'
                              : 'text-slate-400 border-transparent hover:text-white hover:bg-white/[0.01]'
                          }`}
                        >
                          <span className="truncate">{sec.nav}</span>
                          <ChevronRight
                            size={12}
                            className={`transition-transform duration-150 ${
                              isActive ? 'translate-x-0.5 text-cyan-400' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600'
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
        className={`flex-1 flex flex-col xl:flex-row justify-between w-full bg-[#0B0B11] ${
          sidebarOpen ? 'cursor-pointer' : ''
        }`}
      >
        {/* Mobile Sticky Top-Left Menu Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
          onMouseEnter={() => setIsBtnVisible(true)}
          className={`lg:hidden sticky top-[76px] ml-4 mt-4 z-30 p-2 rounded-lg bg-[#0B0B11]/90 backdrop-blur-md hover:bg-white/10 text-white border border-white/15 transition-all duration-500 cursor-pointer flex items-center justify-center shadow-lg active:scale-95 self-start ${
            isBtnVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-30 scale-90 hover:opacity-100'
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
              {isVi ? 'Điều khoản Dịch vụ' : 'Terms of Service'}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {isVi
                ? 'Văn bản này xác lập quyền, nghĩa vụ và các quy tắc sử dụng giữa người dùng và I2FLabs khi truy cập hệ sinh thái Aevum OS.'
                : 'This document defines the rights, responsibilities, and terms between users and I2FLabs when accessing the Aevum OS ecosystem.'}
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

          <ul className="font-mono text-[11px]">
            {sections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <li key={s.id} className={`border-b border-white/5 ${isActive ? 'bg-white/[0.05]' : ''}`}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-2 group cursor-pointer ${
                      isActive
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

export default Terms;
