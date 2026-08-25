import { useEffect, useRef, useState } from 'react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'acceptance',
      nav: isVi ? '1. Chấp nhận' : '1. Acceptance',
      title: isVi ? '1. Chấp nhận Điều khoản' : '1. Acceptance of Terms',
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
      title: isVi ? '2. Điều kiện sử dụng & Tài khoản' : '2. Eligibility & Account Responsibilities',
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

const renderBlock = (block, idx, color) => {
  switch (block.type) {
    case 'p':
      return <p key={idx} style={{ margin: '0 0 0.85rem', lineHeight: 1.75 }}>{block.text}</p>;
    case 'meta':
      return (
        <p key={idx} style={{ margin: '1rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "var(--font-mono, monospace)", letterSpacing: '0.02em' }}>
          {block.text}
        </p>
      );
    case 'note':
      return (
        <div key={idx} style={{ margin: '1rem 0 0', padding: '0.75rem 1rem', borderLeft: `2px solid ${color}`, background: 'var(--bg-cell)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {block.text}
        </div>
      );
    case 'group':
      return (
        <div key={idx} style={{ marginTop: '1.25rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "var(--font-mono, monospace)" }}>
            {block.label}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {block.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.3rem 0', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{ flexShrink: 0, marginTop: '0.45rem', width: 4, height: 4, borderRadius: '50%', background: color, display: 'inline-block' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'list':
      return (
        <ul key={idx} style={{ margin: '0.75rem 0 0', padding: 0, listStyle: 'none' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.35rem 0', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6, borderBottom: '1px solid var(--border-faint)' }}>
              <span style={{ flexShrink: 0, marginTop: '0.45rem', width: 4, height: 4, borderRadius: '50%', background: color, display: 'inline-block' }} />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'contact':
      return (
        <div key={idx} style={{ marginTop: '0.75rem', border: '1px solid var(--border-faint)', overflow: 'hidden' }}>
          {block.lines.map(({ label, value, href }, i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < block.lines.length - 1 ? '1px solid var(--border-faint)' : 'none' }}>
              <div style={{ width: '30%', flexShrink: 0, padding: '0.55rem 0.85rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: "var(--font-mono, monospace)", background: 'var(--bg-cell)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <div style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {href ? <a href={href} style={{ color: color, textDecoration: 'none' }}>{value}</a> : value}
              </div>
            </div>
          ))}
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
  const sectionRefs = useRef({});
  const color = 'var(--electron-blue, #0ea5e9)';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [activeLang]);

  return (
    <div style={{ padding: '3rem 2rem 5rem', fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}>
      {/* Page header */}
      <div style={{ maxWidth: 860, margin: '0 auto 3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-faint)' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', color: color, fontFamily: "var(--font-mono, monospace)", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          I2FLabs · Aevum OS
        </p>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {isVi ? 'Điều khoản Dịch vụ' : 'Terms of Service'}
        </h1>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}>
          {isVi
            ? 'Văn bản này xác lập quyền, nghĩa vụ và các quy tắc sử dụng giữa người dùng và I2FLabs khi truy cập hệ sinh thái Aevum OS.'
            : 'This document defines the rights, responsibilities, and terms between users and I2FLabs when accessing the Aevum OS ecosystem.'}
        </p>
      </div>

      {/* 2-column layout */}
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: '3.5rem', alignItems: 'flex-start' }}>
        {/* Left: sticky nav */}
        <nav style={{ width: 180, flexShrink: 0, position: 'sticky', top: 96 }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "var(--font-mono, monospace)", textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
            {isVi ? 'Mục lục' : 'Contents'}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    style={{
                      display: 'block',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.78rem',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      textDecoration: 'none',
                      borderLeft: `2px solid ${isActive ? color : 'transparent'}`,
                      transition: 'all 0.15s ease',
                      lineHeight: 1.4,
                    }}
                  >
                    {s.nav}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el; }}
              style={{ marginBottom: i < sections.length - 1 ? '3rem' : 0, scrollMarginTop: 100 }}
            >
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-faint)' }}>
                {section.title}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {section.content.map((block, idx) => renderBlock(block, idx, color))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
