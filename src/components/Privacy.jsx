import { useEffect, useRef } from 'react';
import { Shield, Database, Eye, Lock, Users, Mail, Globe, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'overview',
      icon: Shield,
      color: '#0ea5e9',
      title: isVi ? '1. Tổng quan' : '1. Overview',
      content: isVi
        ? `Chính sách Bảo mật này mô tả cách I2FLabs ("chúng tôi", "Aevum OS") thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng các dịch vụ của chúng tôi tại aevum.ai.vn và các sản phẩm liên quan.

Bằng cách sử dụng dịch vụ Aevum OS, bạn đồng ý với các điều khoản trong Chính sách Bảo mật này. Chính sách có hiệu lực từ ngày 01/01/2026 và được cập nhật lần cuối vào tháng 08/2026.

Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng dịch vụ của chúng tôi ngay lập tức.`
        : `This Privacy Policy describes how I2FLabs ("we", "Aevum OS") collects, uses, and protects your information when you use our services at aevum.ai.vn and related products.

By using Aevum OS services, you agree to the terms in this Privacy Policy. This policy is effective as of January 1, 2026 and was last updated in August 2026.

If you do not agree with any terms, please discontinue using our services immediately.`
    },
    {
      id: 'collection',
      icon: Database,
      color: '#8b5cf6',
      title: isVi ? '2. Thông tin chúng tôi thu thập' : '2. Information We Collect',
      content: isVi
        ? `Chúng tôi thu thập các loại thông tin sau:

► THÔNG TIN TÀI KHOẢN
• Địa chỉ email khi đăng ký tài khoản
• Tên hiển thị và ảnh đại diện (nếu đăng nhập OAuth)
• Thông tin xác thực từ Google hoặc GitHub OAuth Provider

► DỮ LIỆU SỬ DỤNG (ẨN DANH)
• Số lần sử dụng tính năng (không gắn với danh tính cá nhân)
• Thống kê lỗi và hiệu suất (crash reports ẩn danh)
• Phiên bản phần mềm và hệ điều hành

► DỮ LIỆU WORKSPACE (LOCAL-FIRST)
• Aevum OS lưu trữ memory graph và plans tại máy cục bộ của bạn
• Dữ liệu cloud sync được mã hóa đầu-cuối trước khi truyền
• Chúng tôi KHÔNG đọc nội dung code hoặc tài liệu của bạn`
        : `We collect the following types of information:

► ACCOUNT INFORMATION
• Email address upon account registration
• Display name and avatar (if using OAuth login)
• Authentication data from Google or GitHub OAuth Provider

► USAGE DATA (ANONYMIZED)
• Feature usage frequency (not linked to personal identity)
• Error and performance statistics (anonymous crash reports)
• Software version and operating system

► WORKSPACE DATA (LOCAL-FIRST)
• Aevum OS stores memory graph and plans locally on your machine
• Cloud-synced data is end-to-end encrypted before transmission
• We do NOT read the content of your code or documents`
    },
    {
      id: 'usage',
      icon: Eye,
      color: '#10b981',
      title: isVi ? '3. Cách chúng tôi sử dụng thông tin' : '3. How We Use Information',
      content: isVi
        ? `Thông tin thu thập được sử dụng cho các mục đích sau:

01. CUNG CẤP DỊCH VỤ
    • Xác thực và quản lý tài khoản người dùng
    • Đồng bộ hóa dữ liệu giữa các thiết bị (tính năng Pro)
    • Gửi thông báo kỹ thuật và cập nhật sản phẩm

02. CẢI THIỆN SẢN PHẨM
    • Phân tích thống kê sử dụng ẩn danh để cải thiện UX
    • Phát hiện và sửa lỗi dựa trên crash reports
    • Nghiên cứu phát triển tính năng mới

03. BẢO MẬT và TUÂN THỦ
    • Phát hiện gian lận và hoạt động bất thường
    • Tuân thủ các nghĩa vụ pháp lý khi được yêu cầu
    • Bảo vệ quyền lợi hợp pháp của I2FLabs

Chúng tôi KHÔNG bán thông tin của bạn cho bên thứ ba.`
        : `Collected information is used for the following purposes:

01. SERVICE PROVISION
    • User account authentication and management
    • Data synchronization across devices (Pro feature)
    • Sending technical notifications and product updates

02. PRODUCT IMPROVEMENT
    • Analyzing anonymous usage statistics to improve UX
    • Detecting and fixing bugs based on crash reports
    • Research for new feature development

03. SECURITY and COMPLIANCE
    • Fraud detection and unusual activity monitoring
    • Compliance with legal obligations when required
    • Protecting I2FLabs' legitimate interests

We do NOT sell your information to third parties.`
    },
    {
      id: 'storage',
      icon: Lock,
      color: '#f59e0b',
      title: isVi ? '4. Lưu trữ và Bảo mật dữ liệu' : '4. Data Storage and Security',
      content: isVi
        ? `► LƯU TRỮ
• Dữ liệu tài khoản được lưu trên Supabase (PostgreSQL) với mã hóa at-rest
• Máy chủ đặt tại khu vực Đông Nam Á / Singapore
• Dữ liệu workspace local được lưu trên thiết bị của bạn (Community tier)

► BẢO MẬT
• Truyền dữ liệu qua HTTPS/TLS 1.3
• Mã hóa Ed25519 cho license cryptography
• Xác thực hai yếu tố (2FA) thông qua Supabase Auth
• Token JWT có thời hạn hết hạn tự động
• Kiểm tra bảo mật định kỳ

► THỜI GIAN LƯU TRỮ
• Dữ liệu tài khoản: Trong suốt thời gian sử dụng + 30 ngày sau khi xóa
• Log ẩn danh: Tối đa 90 ngày
• Dữ liệu thanh toán: Theo quy định pháp lý (thường 7 năm)`
        : `► STORAGE
• Account data stored on Supabase (PostgreSQL) with at-rest encryption
• Servers located in Southeast Asia / Singapore region
• Local workspace data stays on your device (Community tier)

► SECURITY
• Data transmission via HTTPS/TLS 1.3
• Ed25519 cryptography for license verification
• Two-factor authentication (2FA) via Supabase Auth
• JWT tokens with automatic expiration
• Regular security audits

► RETENTION PERIODS
• Account data: Duration of use + 30 days after deletion
• Anonymous logs: Maximum 90 days
• Payment data: As required by law (typically 7 years)`
    },
    {
      id: 'thirdparty',
      icon: Globe,
      color: '#ec4899',
      title: isVi ? '5. Bên thứ ba' : '5. Third Parties',
      content: isVi
        ? `Chúng tôi sử dụng các dịch vụ bên thứ ba đáng tin cậy:

► XÁC THỰC
• Supabase Auth — Quản lý tài khoản, OAuth provider
• Google OAuth — Đăng nhập qua Google Account
• GitHub OAuth — Đăng nhập qua GitHub Account

► HẠ TẦNG
• Vercel — Hosting và CDN
• Supabase — Database và realtime subscriptions

► THANH TOÁN
• Stripe / PayOS — Xử lý thanh toán an toàn (không lưu số thẻ)

► PHÂN TÍCH
• GrowthBook — A/B testing ẩn danh, không thu thập PII
• Resend — Gửi email thông báo

Mỗi bên thứ ba có Chính sách Bảo mật riêng. Chúng tôi chỉ chia sẻ dữ liệu tối thiểu cần thiết.`
        : `We use the following trusted third-party services:

► AUTHENTICATION
• Supabase Auth — Account management, OAuth provider
• Google OAuth — Login via Google Account
• GitHub OAuth — Login via GitHub Account

► INFRASTRUCTURE
• Vercel — Hosting and content delivery network (CDN)
• Supabase — Database and realtime subscriptions

► PAYMENTS
• Stripe / PayOS — Secure payment processing (no card storage)

► ANALYTICS
• GrowthBook — Anonymous A/B testing, no PII collection
• Resend — Transactional email delivery

Each third party has its own Privacy Policy. We only share the minimum data necessary.`
    },
    {
      id: 'rights',
      icon: Users,
      color: '#14b8a6',
      title: isVi ? '6. Quyền của bạn' : '6. Your Rights',
      content: isVi
        ? `Bạn có các quyền sau đối với dữ liệu cá nhân:

✓ QUYỀN TRUY CẬP — Yêu cầu bản sao dữ liệu chúng tôi đang lưu về bạn
✓ QUYỀN SỬA CHỮA — Cập nhật thông tin không chính xác
✓ QUYỀN XÓA — Xóa tài khoản và tất cả dữ liệu liên quan
✓ QUYỀN HẠN CHẾ — Yêu cầu hạn chế xử lý dữ liệu
✓ QUYỀN PHẢN ĐỐI — Phản đối việc xử lý dữ liệu vì lợi ích chính đáng
✓ QUYỀN DI CHUYỂN — Nhận dữ liệu dưới định dạng JSON/CSV

Liên hệ: dev@aevum.ai.vn — Phản hồi trong vòng 30 ngày làm việc.`
        : `You have the following rights regarding your personal data:

✓ RIGHT TO ACCESS — Request a copy of the data we hold about you
✓ RIGHT TO RECTIFICATION — Update inaccurate information
✓ RIGHT TO ERASURE — Delete your account and all associated data
✓ RIGHT TO RESTRICTION — Request limitation on data processing
✓ RIGHT TO OBJECT — Object to processing based on legitimate interests
✓ RIGHT TO PORTABILITY — Receive your data in JSON/CSV format

Contact: dev@aevum.ai.vn — Response within 30 business days.`
    },
    {
      id: 'cookies',
      icon: FileText,
      color: '#6366f1',
      title: isVi ? '7. Cookies và Tracking' : '7. Cookies and Tracking',
      content: isVi
        ? `► COOKIES CẦN THIẾT
• auth-token: Lưu phiên đăng nhập (hết hạn sau 7 ngày)
• aevum-lang: Lưu ngôn ngữ ưa thích
• aevum-theme: Lưu chế độ sáng/tối

► LOCAL STORAGE
• aevum-eyecare: Cài đặt bảo vệ mắt
• Cài đặt giao diện người dùng khác

Chúng tôi KHÔNG sử dụng:
✗ Tracking cookies bên thứ ba
✗ Fingerprinting trình duyệt
✗ Cross-site tracking
✗ Google Analytics hay Facebook Pixel`
        : `► NECESSARY COOKIES
• auth-token: Stores login session (expires after 7 days)
• aevum-lang: Stores language preference
• aevum-theme: Stores light/dark mode preference

► LOCAL STORAGE
• aevum-eyecare: Eye care mode setting
• Other UI preferences

We do NOT use:
✗ Third-party tracking cookies
✗ Browser fingerprinting
✗ Cross-site tracking
✗ Google Analytics or Facebook Pixel`
    },
    {
      id: 'contact',
      icon: Mail,
      color: '#0ea5e9',
      title: isVi ? '8. Liên hệ và Khiếu nại' : '8. Contact and Complaints',
      content: isVi
        ? `► LIÊN HỆ TRỰC TIẾP
Email: dev@aevum.ai.vn
Tổ chức: I2FLabs, Việt Nam
Website: https://www.aevum.ai.vn

► THỜI GIAN PHẢN HỒI
• Yêu cầu thông thường: 5 – 7 ngày làm việc
• Yêu cầu xóa dữ liệu: Tối đa 30 ngày làm việc
• Báo cáo bảo mật: Trong vòng 24 giờ

Chính sách này có thể được cập nhật định kỳ. Chúng tôi sẽ thông báo qua email khi có thay đổi quan trọng.`
        : `► DIRECT CONTACT
Email: dev@aevum.ai.vn
Organization: I2FLabs, Vietnam
Website: https://www.aevum.ai.vn

► RESPONSE TIMES
• General inquiries: 5 – 7 business days
• Data deletion requests: Up to 30 business days
• Security reports: Within 24 hours

This policy may be updated periodically. We will notify registered users via email of significant changes.`
    }
  ];
};

export const Privacy = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const containerRef = useRef(null);
  const sections = SECTIONS(activeLang);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('.privacy-section').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  }, [activeLang]);

  return (
    <div ref={containerRef} style={{
      padding: '2rem 0 4rem',
      maxWidth: '860px',
      margin: '0 auto',
      fontFamily: "var(--font-sans, 'Inter', sans-serif)"
    }}>
      {/* Header */}
      <div className="privacy-section" style={{ padding: '2.5rem 2rem 2rem', borderBottom: '1px solid var(--border-faint)', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={20} color="#0ea5e9" />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#0ea5e9', fontFamily: "var(--font-mono, monospace)", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>I2FLabs · Aevum OS</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              {isVi ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#10b981', fontFamily: "var(--font-mono, monospace)", background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 6, padding: '0.25rem 0.6rem' }}>
            <CheckCircle size={11} />{isVi ? 'Hiệu lực từ 01/01/2026' : 'Effective 01/01/2026'}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#f59e0b', fontFamily: "var(--font-mono, monospace)", background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, padding: '0.25rem 0.6rem' }}>
            <AlertCircle size={11} />{isVi ? 'Cập nhật: Tháng 08/2026' : 'Updated: August 2026'}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '1.25rem 0 0' }}>
          {isVi
            ? 'Tại I2FLabs, chúng tôi tôn trọng quyền riêng tư và cam kết bảo vệ dữ liệu cá nhân theo các tiêu chuẩn bảo mật cao nhất. Tài liệu này giải thích rõ ràng cách chúng tôi xử lý thông tin.'
            : 'At I2FLabs, we respect your privacy and are committed to protecting personal data to the highest security standards. This document clearly explains how we handle information.'}
        </p>
      </div>

      {/* Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon;
        return (
          <div key={section.id} className="privacy-section" style={{ margin: '0.25rem 0', padding: '1.75rem 2rem', borderBottom: idx < sections.length - 1 ? '1px solid var(--border-faint)' : 'none', transition: 'background 0.15s ease', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-cell)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: section.color + '15', border: '1px solid ' + section.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={section.color} />
              </div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{section.title}</h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-line', paddingLeft: '2.6rem' }}>
              {section.content.split('\n').map((line, i) => {
                if (line.startsWith('✓')) return <div key={i} style={{ color: '#10b981', fontWeight: 600, marginTop: i > 0 ? '0.4rem' : 0, fontFamily: "var(--font-mono, monospace)", fontSize: '0.78rem' }}>{line}</div>;
                if (line.startsWith('✗')) return <div key={i} style={{ color: '#ef4444', fontWeight: 600, marginTop: i > 0 ? '0.4rem' : 0, fontFamily: "var(--font-mono, monospace)", fontSize: '0.78rem' }}>{line}</div>;
                if (line.startsWith('►')) return <div key={i} style={{ color: section.color, fontWeight: 600, marginTop: i > 0 ? '0.75rem' : 0, fontFamily: "var(--font-mono, monospace)", fontSize: '0.78rem' }}>{line}</div>;
                if (/^\d{2}\./.test(line)) return <div key={i} style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: i > 0 ? '0.75rem' : 0 }}>{line}</div>;
                return <div key={i}>{line}</div>;
              })}
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div className="privacy-section" style={{ margin: '1.5rem 2rem 0', padding: '1.25rem 1.5rem', background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: 12, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Shield size={16} color="#0ea5e9" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {isVi ? 'Bằng cách tiếp tục sử dụng Aevum OS, bạn xác nhận đã đọc và đồng ý với Chính sách Bảo mật này. Mọi thắc mắc: ' : 'By continuing to use Aevum OS, you confirm you have read and agreed to this Privacy Policy. Questions: '}
          <a href="mailto:dev@aevum.ai.vn" style={{ color: '#0ea5e9', textDecoration: 'none' }}>dev@aevum.ai.vn</a>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
