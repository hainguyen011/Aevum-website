import { useEffect, useRef } from 'react';
import { FileText, Users, Shield, AlertTriangle, Ban, CreditCard, RefreshCw, Scale, Globe, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const SECTIONS = (lang) => {
  const isVi = lang === 'vi';
  return [
    {
      id: 'acceptance',
      icon: CheckCircle,
      color: '#10b981',
      title: isVi ? '1. Chấp nhận Điều khoản' : '1. Acceptance of Terms',
      content: isVi
        ? `Bằng cách truy cập hoặc sử dụng bất kỳ dịch vụ nào của Aevum OS (bao gồm aevum.ai.vn, Aevum OS desktop app, Aevum Cloud API và các sản phẩm liên quan), bạn đồng ý bị ràng buộc bởi Điều khoản Dịch vụ này.

Nếu bạn sử dụng dịch vụ thay mặt cho một tổ chức, bạn xác nhận rằng bạn có thẩm quyền chấp nhận các điều khoản này thay mặt cho tổ chức đó.

Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được phép sử dụng dịch vụ của chúng tôi.

Các Điều khoản này áp dụng từ ngày 01/01/2026 và được cập nhật lần cuối vào tháng 08/2026.`
        : `By accessing or using any Aevum OS services (including aevum.ai.vn, Aevum OS desktop app, Aevum Cloud API, and related products), you agree to be bound by these Terms of Service.

If you use the services on behalf of an organization, you confirm that you have the authority to accept these terms on behalf of that organization.

If you do not agree with any part of these terms, you are not permitted to use our services.

These Terms are effective as of January 1, 2026 and were last updated in August 2026.`
    },
    {
      id: 'eligibility',
      icon: Users,
      color: '#8b5cf6',
      title: isVi ? '2. Điều kiện sử dụng' : '2. Eligibility',
      content: isVi
        ? `Để sử dụng dịch vụ Aevum OS, bạn phải đáp ứng các điều kiện sau:

► ĐỘ TUỔI
• Bạn phải từ 13 tuổi trở lên
• Nếu dưới 18 tuổi, cần có sự đồng ý của phụ huynh hoặc người giám hộ hợp pháp

► TÀI KHOẢN
• Cung cấp thông tin đăng ký chính xác và đầy đủ
• Bảo mật mật khẩu và thông tin tài khoản của bạn
• Chịu trách nhiệm về mọi hoạt động xảy ra dưới tài khoản của bạn
• Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép

► TUÂN THỦ PHÁP LUẬT
• Không sử dụng dịch vụ cho mục đích bất hợp pháp
• Tuân thủ luật pháp địa phương, quốc gia và quốc tế áp dụng`
        : `To use Aevum OS services, you must meet the following conditions:

► AGE
• You must be at least 13 years old
• If under 18, parental or legal guardian consent is required

► ACCOUNT
• Provide accurate and complete registration information
• Keep your password and account information secure
• You are responsible for all activities that occur under your account
• Notify us immediately if you discover unauthorized access

► LEGAL COMPLIANCE
• Do not use the services for illegal purposes
• Comply with applicable local, national, and international laws`
    },
    {
      id: 'services',
      icon: Globe,
      color: '#0ea5e9',
      title: isVi ? '3. Mô tả Dịch vụ' : '3. Description of Services',
      content: isVi
        ? `Aevum OS cung cấp các dịch vụ sau:

01. AEVUM OS (COMMUNITY - MIỄN PHÍ)
    • MCP Server daemon chạy cục bộ (Local-First)
    • Living Memory Graph lưu trữ trên thiết bị của bạn
    • Tích hợp với Cursor, VS Code, Claude Desktop
    • Giới hạn: 1 agent, memory cục bộ không giới hạn

02. AEVUM OS (PRO - TRẢ PHÍ)
    • Tất cả tính năng Community
    • Cloud Sync - đồng bộ memory qua đám mây
    • Multi-agent Squad Orchestration
    • PiperNet IoA Mesh kết nối biệt đội
    • Hỗ trợ ưu tiên từ đội ngũ I2FLabs

03. AEVUM CLOUD API
    • REST API cho tích hợp hệ thống bên thứ ba
    • License management và validation
    • Webhook và event streaming

Chúng tôi có quyền thay đổi, tạm dừng hoặc ngừng bất kỳ tính năng nào của dịch vụ với thông báo trước 30 ngày (trừ trường hợp khẩn cấp bảo mật).`
        : `Aevum OS provides the following services:

01. AEVUM OS (COMMUNITY - FREE)
    • Local-First MCP Server daemon
    • Living Memory Graph stored on your device
    • Integration with Cursor, VS Code, Claude Desktop
    • Limit: 1 agent, unlimited local memory

02. AEVUM OS (PRO - PAID)
    • All Community features
    • Cloud Sync - memory synchronization across devices
    • Multi-agent Squad Orchestration
    • PiperNet IoA Mesh for squad connectivity
    • Priority support from I2FLabs team

03. AEVUM CLOUD API
    • REST API for third-party system integration
    • License management and validation
    • Webhooks and event streaming

We reserve the right to modify, suspend, or discontinue any feature of the service with 30 days notice (except in security emergencies).`
    },
    {
      id: 'usage',
      icon: Shield,
      color: '#f59e0b',
      title: isVi ? '4. Sử dụng Chấp nhận được' : '4. Acceptable Use',
      content: isVi
        ? `Bạn đồng ý KHÔNG sử dụng dịch vụ để:

✗ Vi phạm bất kỳ luật pháp hoặc quy định nào hiện hành
✗ Gửi spam, phần mềm độc hại hoặc nội dung có hại
✗ Xâm phạm quyền sở hữu trí tuệ của người khác
✗ Đánh lừa hoặc giả mạo danh tính người khác
✗ Thu thập dữ liệu trái phép từ dịch vụ (scraping)
✗ Thực hiện tấn công từ chối dịch vụ (DDoS)
✗ Cố gắng truy cập trái phép vào hệ thống của chúng tôi
✗ Khai thác tiền mã hóa không được phép
✗ Phân phối lại hoặc bán lại dịch vụ mà không có sự đồng ý

Vi phạm các quy tắc này có thể dẫn đến đình chỉ hoặc chấm dứt tài khoản ngay lập tức, không hoàn tiền.`
        : `You agree NOT to use the services to:

✗ Violate any applicable law or regulation
✗ Send spam, malware, or harmful content
✗ Infringe the intellectual property rights of others
✗ Deceive or impersonate others
✗ Collect data from the service without authorization (scraping)
✗ Conduct denial-of-service attacks (DDoS)
✗ Attempt unauthorized access to our systems
✗ Conduct unauthorized cryptocurrency mining
✗ Redistribute or resell the service without consent

Violation of these rules may result in immediate account suspension or termination without refund.`
    },
    {
      id: 'ip',
      icon: FileText,
      color: '#ec4899',
      title: isVi ? '5. Sở hữu Trí tuệ' : '5. Intellectual Property',
      content: isVi
        ? `► TÀI SẢN CỦA I2FLABS
Tất cả nội dung, phần mềm, thiết kế, nhãn hiệu và tài liệu của Aevum OS là tài sản độc quyền của I2FLabs. Bạn không được sao chép, sửa đổi, phân phối hoặc tạo sản phẩm phái sinh mà không có sự cho phép bằng văn bản.

► TÀI SẢN CỦA BẠN
Bạn giữ toàn quyền sở hữu đối với dữ liệu và nội dung bạn tạo ra khi sử dụng dịch vụ (memory graph, plans, code context). Chúng tôi không có bất kỳ quyền nào đối với nội dung của bạn.

► GIẤY PHÉP SỬ DỤNG
Khi sử dụng dịch vụ, bạn cấp cho I2FLabs giấy phép hạn chế để lưu trữ và xử lý dữ liệu của bạn nhằm cung cấp dịch vụ. Giấy phép này chấm dứt khi bạn xóa dữ liệu hoặc tài khoản.

► MÃ NGUỒN MỞ
Một số thành phần của Aevum OS có thể sử dụng các thư viện mã nguồn mở. Danh sách đầy đủ có thể được xem trong phần LICENSES của phần mềm.`
        : `► I2FLABS PROPERTY
All content, software, design, trademarks, and documentation of Aevum OS are the exclusive property of I2FLabs. You may not copy, modify, distribute, or create derivative works without written permission.

► YOUR PROPERTY
You retain full ownership of the data and content you create while using the services (memory graph, plans, code context). We have no rights over your content.

► LICENSE TO USE
By using the service, you grant I2FLabs a limited license to store and process your data in order to provide the service. This license terminates when you delete your data or account.

► OPEN SOURCE
Some components of Aevum OS may use open-source libraries. A full list can be viewed in the LICENSES section of the software.`
    },
    {
      id: 'payment',
      icon: CreditCard,
      color: '#14b8a6',
      title: isVi ? '6. Thanh toán & Đăng ký' : '6. Payment & Subscriptions',
      content: isVi
        ? `► GÓI PRO - ĐĂNG KÝ ĐỊNH KỲ
• Thanh toán theo chu kỳ hàng tháng hoặc hàng năm
• Giá có thể thay đổi với thông báo trước 30 ngày
• Đăng ký tự động gia hạn trừ khi bạn hủy trước ngày gia hạn

► CHÍNH SÁCH HOÀN TIỀN
• Beta Trial (7-14 ngày): Hoàn tiền đầy đủ trong vòng 7 ngày nếu không hài lòng
• Đăng ký tháng: Không hoàn tiền sau khi đã thanh toán
• Đăng ký năm: Hoàn tiền một phần trong vòng 30 ngày đầu

► HỦY ĐĂNG KÝ
• Bạn có thể hủy bất cứ lúc nào qua trang Profile
• Khi hủy, quyền truy cập Pro được duy trì đến hết chu kỳ thanh toán đã trả
• Dữ liệu local của bạn không bị ảnh hưởng khi hủy

► THUẾ
Giá hiển thị chưa bao gồm thuế. Thuế áp dụng theo luật địa phương của bạn.`
        : `► PRO PLAN - RECURRING SUBSCRIPTION
• Billed monthly or annually
• Prices may change with 30 days notice
• Subscription auto-renews unless cancelled before the renewal date

► REFUND POLICY
• Beta Trial (7-14 days): Full refund within 7 days if unsatisfied
• Monthly subscription: No refund after payment
• Annual subscription: Partial refund within the first 30 days

► CANCELLATION
• You can cancel at any time via the Profile page
• Upon cancellation, Pro access is maintained until the end of the paid billing period
• Your local data is not affected when you cancel

► TAXES
Displayed prices exclude taxes. Applicable taxes are determined by your local laws.`
    },
    {
      id: 'termination',
      icon: Ban,
      color: '#ef4444',
      title: isVi ? '7. Chấm dứt Tài khoản' : '7. Account Termination',
      content: isVi
        ? `► CHẤM DỨT BỞI BẠN
Bạn có thể xóa tài khoản bất cứ lúc nào qua trang cài đặt Profile. Khi xóa tài khoản:
• Tất cả dữ liệu cloud của bạn sẽ bị xóa trong vòng 30 ngày
• Dữ liệu local trên thiết bị của bạn không bị ảnh hưởng
• Đăng ký Pro (nếu có) sẽ bị hủy, không hoàn lại phần còn lại

► CHẤM DỨT BỞI I2FLABS
Chúng tôi có thể đình chỉ hoặc chấm dứt tài khoản của bạn nếu:
• Vi phạm Điều khoản Dịch vụ này
• Không thanh toán đúng hạn
• Hoạt động gian lận hoặc lạm dụng hệ thống
• Theo yêu cầu của cơ quan pháp luật

Trong trường hợp vi phạm nghiêm trọng, chúng tôi có quyền chấm dứt tài khoản ngay lập tức mà không cần thông báo trước.`
        : `► TERMINATION BY YOU
You can delete your account at any time via the Profile settings page. Upon account deletion:
• All your cloud data will be deleted within 30 days
• Local data on your device is not affected
• Pro subscription (if any) will be cancelled, with no refund for remaining period

► TERMINATION BY I2FLABS
We may suspend or terminate your account if:
• You violate these Terms of Service
• Payment is not made on time
• Fraudulent or abusive system activity
• Required by law enforcement

In cases of serious violations, we reserve the right to terminate accounts immediately without prior notice.`
    },
    {
      id: 'liability',
      icon: AlertTriangle,
      color: '#f59e0b',
      title: isVi ? '8. Giới hạn Trách nhiệm' : '8. Limitation of Liability',
      content: isVi
        ? `Dịch vụ được cung cấp "nguyên trạng" (AS-IS) không có bảo đảm nào, rõ ràng hay ngụ ý.

I2FLabs không chịu trách nhiệm về:
• Mất mát dữ liệu do lỗi phần cứng, phần mềm hoặc sự cố không lường trước
• Gián đoạn dịch vụ do bảo trì, sự cố kỹ thuật hoặc sự kiện bất khả kháng
• Thiệt hại gián tiếp, ngẫu nhiên hoặc đặc biệt phát sinh từ việc sử dụng dịch vụ
• Hành động của bên thứ ba hoặc dịch vụ tích hợp

► GIỚI HẠN BỒI THƯỜNG
Trong mọi trường hợp, trách nhiệm tối đa của I2FLabs không vượt quá số tiền bạn đã thanh toán trong 3 tháng gần nhất hoặc 500.000 VNĐ, tùy giá trị nào lớn hơn.

Một số khu vực pháp lý không cho phép giới hạn trách nhiệm nhất định, vì vậy các giới hạn trên có thể không áp dụng đầy đủ với bạn.`
        : `Services are provided "AS-IS" without any warranties, express or implied.

I2FLabs is not liable for:
• Data loss due to hardware, software failures, or unforeseen incidents
• Service interruptions due to maintenance, technical failures, or force majeure
• Indirect, incidental, or special damages arising from use of the service
• Actions of third parties or integrated services

► LIABILITY CAP
In any case, the maximum liability of I2FLabs shall not exceed the amount you paid in the most recent 3 months or 500,000 VND, whichever is greater.

Some jurisdictions do not allow certain liability limitations, so the above limits may not fully apply to you.`
    },
    {
      id: 'changes',
      icon: RefreshCw,
      color: '#6366f1',
      title: isVi ? '9. Thay đổi Điều khoản' : '9. Changes to Terms',
      content: isVi
        ? `Chúng tôi có quyền sửa đổi Điều khoản Dịch vụ này bất cứ lúc nào.

► QUY TRÌNH CẬP NHẬT
• Thay đổi nhỏ (không ảnh hưởng đến quyền lợi): Cập nhật trang web, hiệu lực ngay
• Thay đổi quan trọng: Thông báo qua email ít nhất 30 ngày trước khi có hiệu lực
• Thay đổi khẩn cấp (bảo mật): Có thể hiệu lực ngay lập tức với thông báo đồng thời

► CHẤP NHẬN THAY ĐỔI
Việc tiếp tục sử dụng dịch vụ sau khi các thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận Điều khoản mới.

Nếu bạn không đồng ý với các thay đổi, bạn có quyền ngừng sử dụng dịch vụ và xóa tài khoản trước ngày thay đổi có hiệu lực.`
        : `We reserve the right to modify these Terms of Service at any time.

► UPDATE PROCESS
• Minor changes (not affecting rights): Website update, effective immediately
• Material changes: Email notification at least 30 days before taking effect
• Emergency changes (security): May take effect immediately with simultaneous notice

► ACCEPTANCE OF CHANGES
Continued use of the service after changes take effect constitutes acceptance of the new Terms.

If you do not agree with the changes, you have the right to stop using the service and delete your account before the effective date.`
    },
    {
      id: 'governing',
      icon: Scale,
      color: '#0ea5e9',
      title: isVi ? '10. Luật áp dụng & Liên hệ' : '10. Governing Law & Contact',
      content: isVi
        ? `► LUẬT ÁP DỤNG
Điều khoản này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.

► GIẢI QUYẾT TRANH CHẤP
Trước khi khởi kiện, các bên đồng ý cố gắng giải quyết tranh chấp thông qua thương lượng thiện chí trong vòng 60 ngày.

► LIÊN HỆ
Email: dev@aevum.ai.vn
Tổ chức: I2FLabs, Việt Nam
Website: https://www.aevum.ai.vn

► THỜI GIAN PHẢN HỒI
• Thắc mắc về điều khoản: 5 – 7 ngày làm việc
• Khiếu nại về vi phạm: Tối đa 15 ngày làm việc

Nếu bất kỳ điều khoản nào được xác định là không hợp lệ hoặc không thể thi hành, các điều khoản còn lại vẫn có hiệu lực đầy đủ.`
        : `► GOVERNING LAW
These Terms are governed by the laws of Vietnam. Any disputes arising will be resolved in the competent courts of Vietnam.

► DISPUTE RESOLUTION
Before filing a lawsuit, parties agree to attempt to resolve disputes through good-faith negotiation within 60 days.

► CONTACT
Email: dev@aevum.ai.vn
Organization: I2FLabs, Vietnam
Website: https://www.aevum.ai.vn

► RESPONSE TIMES
• Terms inquiries: 5 – 7 business days
• Violation complaints: Up to 15 business days

If any provision is found to be invalid or unenforceable, the remaining provisions remain in full effect.`
    }
  ];
};

export const Terms = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const containerRef = useRef(null);
  const sections = SECTIONS(activeLang);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('.terms-section').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 70);
      });
    }
  }, [activeLang]);

  return (
    <div ref={containerRef} style={{ padding: '2rem 0 4rem', maxWidth: '860px', margin: '0 auto', fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}>
      {/* Header */}
      <div className="terms-section" style={{ padding: '2.5rem 2rem 2rem', borderBottom: '1px solid var(--border-faint)', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Scale size={20} color="#6366f1" />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#6366f1', fontFamily: "var(--font-mono, monospace)", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>I2FLabs · Aevum OS</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              {isVi ? 'Điều khoản Dịch vụ' : 'Terms of Service'}
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
            ? 'Điều khoản Dịch vụ này là thỏa thuận pháp lý giữa bạn và I2FLabs về việc sử dụng các sản phẩm và dịch vụ Aevum OS. Vui lòng đọc kỹ trước khi sử dụng.'
            : 'These Terms of Service constitute a legal agreement between you and I2FLabs regarding the use of Aevum OS products and services. Please read carefully before using.'}
        </p>
      </div>

      {/* Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon;
        return (
          <div key={section.id} className="terms-section" style={{ margin: '0.25rem 0', padding: '1.75rem 2rem', borderBottom: idx < sections.length - 1 ? '1px solid var(--border-faint)' : 'none', transition: 'background 0.15s ease', cursor: 'default' }}
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
      <div className="terms-section" style={{ margin: '1.5rem 2rem 0', padding: '1.25rem 1.5rem', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Scale size={16} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {isVi ? 'Bằng cách sử dụng Aevum OS, bạn xác nhận đã đọc, hiểu và đồng ý với toàn bộ Điều khoản Dịch vụ này. Mọi thắc mắc: ' : 'By using Aevum OS, you confirm you have read, understood, and agreed to these Terms of Service. Questions: '}
          <a href="mailto:dev@aevum.ai.vn" style={{ color: '#6366f1', textDecoration: 'none' }}>dev@aevum.ai.vn</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;
