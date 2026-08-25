import { useEffect, useRef, useState } from 'react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'overview',
      nav: isVi ? 'Tổng quan' : 'Overview',
      title: isVi ? 'Tổng quan' : 'Overview',
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
          text: isVi ? 'Chúng tôi không bán thông tin của bạn cho bên thứ ba.' : 'We do not sell your information to third parties.'
        }
      ]
    },
    {
      id: 'storage',
      nav: isVi ? 'Lưu trữ & Bảo mật' : 'Storage & Security',
      title: isVi ? 'Lưu trữ và Bảo mật' : 'Storage and Security',
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
            ? ['Quyền truy cập — yêu cầu bản sao dữ liệu', 'Quyền sửa chữa — cập nhật thông tin không chính xác', 'Quyền xóa — xóa tài khoản và tất cả dữ liệu', 'Quyền hạn chế — yêu cầu hạn chế xử lý', 'Quyền di chuyển — nhận dữ liệu dạng JSON / CSV']
            : ['Right to access — request a copy of your data', 'Right to rectification — update inaccurate information', 'Right to erasure — delete account and all data', 'Right to restriction — request processing limitation', 'Right to portability — receive data in JSON / CSV format']
        }
      ]
    },
    {
      id: 'cookies',
      nav: 'Cookies',
      title: 'Cookies',
      content: [
        {
          type: 'group',
          label: isVi ? 'Cookies cần thiết' : 'Necessary cookies',
          items: isVi
            ? ['auth-token — lưu phiên đăng nhập, hết hạn sau 7 ngày', 'aevum-lang — lưu ngôn ngữ ưa thích', 'aevum-theme — lưu chế độ sáng / tối']
            : ['auth-token — stores login session, expires after 7 days', 'aevum-lang — stores language preference', 'aevum-theme — stores light / dark mode']
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
      title: isVi ? 'Liên hệ' : 'Contact',
      content: [
        {
          type: 'p',
          text: isVi
            ? 'Mọi câu hỏi hoặc yêu cầu liên quan đến Chính sách Bảo mật, vui lòng liên hệ:'
            : 'For any questions or requests related to this Privacy Policy, please contact:'
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
    case 'table':
      return (
        <div key={idx} style={{ marginTop: '0.75rem', border: '1px solid var(--border-faint)', overflow: 'hidden' }}>
          {block.rows.map(([name, desc], i) => (
            <div key={i} style={{ display: 'flex', borderBottom: i < block.rows.length - 1 ? '1px solid var(--border-faint)' : 'none' }}>
              <div style={{ width: '38%', flexShrink: 0, padding: '0.55rem 0.85rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: "var(--font-mono, monospace)", background: 'var(--bg-cell)' }}>{name}</div>
              <div style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{desc}</div>
            </div>
          ))}
        </div>
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

export const Privacy = ({ activeLang = 'vi' }) => {
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
          {isVi ? 'Chính sách Bảo mật' : 'Privacy Policy'}
        </h1>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}>
          {isVi
            ? 'Tài liệu này giải thích rõ ràng cách I2FLabs thu thập, sử dụng và bảo vệ dữ liệu của bạn khi sử dụng Aevum OS.'
            : 'This document clearly explains how I2FLabs collects, uses, and protects your data when using Aevum OS.'}
        </p>
      </div>

      {/* 2-column layout */}
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: '3.5rem', alignItems: 'flex-start' }}>
        {/* Left: sticky nav */}
        <nav style={{ width: 180, flexShrink: 0, position: 'sticky', top: 96 }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "var(--font-mono, monospace)", textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
            {isVi ? 'Nội dung' : 'Contents'}
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

export default Privacy;
