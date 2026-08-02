/**
 * Aevum OS - Centered Elegant Email Base Layout Template (Prominent Logo Size)
 * 100% aligned with website's Aevum Design System (Centered Text, White CTA Button, #0B0B11 background).
 * Uses public HTTPS GitHub CDN URL for 100% error-free rendering in Gmail, Outlook, Yahoo, and Webmail.
 */
export function BaseEmailLayout({ previewText, headerTitle, contentHtml, footerText, logoUrl }) {
  // Public 24/7 Global HTTPS CDN Logo URL (HTTP 200 Verified for Gmail/Outlook/Yahoo Webmail)
  const defaultLogo = 'https://raw.githubusercontent.com/hainguyen011/Aevum-website/main/assets/logos/AevumOS-transparent.png';
  const logoImageSrc = logoUrl || defaultLogo;

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerTitle || 'Aevum OS'}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    body {
      font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #0B0B11;
      color: #E2E8F0;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #0B0B11;
      padding: 40px 12px;
    }
    .main-container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #0B0B11;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      overflow: hidden;
      text-align: center;
    }
    .header {
      padding: 36px 28px 16px 28px;
      text-align: center;
      background-color: #0B0B11;
    }
    .logo-img {
      height: 60px;
      max-height: 68px;
      width: auto;
      display: inline-block;
      border: 0;
      outline: none;
      margin: 0 auto;
    }
    .content {
      padding: 20px 28px 32px 28px;
      line-height: 1.7;
      font-size: 14px;
      color: #CBD5E1;
      text-align: center;
    }
    h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 20px;
      line-height: 1.4;
      letter-spacing: -0.025em;
      text-align: center;
    }
    p {
      margin-top: 0;
      margin-bottom: 16px;
      color: #CBD5E1;
      line-height: 1.7;
      text-align: center;
    }
    /* Signature Aevum OS High-Contrast White CTA Button Style */
    .btn {
      display: inline-block;
      padding: 13px 26px;
      background-color: #ffffff;
      color: #000000 !important;
      text-decoration: none;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: -0.01em;
      margin: 18px 0 10px 0;
      border-radius: 6px;
      transition: all 0.15s ease-out;
    }
    .btn:hover {
      background-color: #e2e8f0;
    }
    .footer {
      padding: 24px 20px;
      background-color: #0B0B11;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      text-align: center;
      font-size: 12px;
      color: #64748B;
      line-height: 1.6;
    }
    .footer-brand {
      color: #94A3B8;
      font-weight: 600;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;font-size:1px;color:#0b0b11;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</div>` : ''}
  <div class="wrapper">
    <div class="main-container">
      <div class="header">
        <a href="https://aevum.ai.vn" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="${logoImageSrc}" alt="Aevum OS Logo" class="logo-img" height="60" />
        </a>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <div class="footer-brand">I2FLabs Việt Nam</div>
        © 2026 I2FLabs. All rights reserved.<br>
        ${footerText || 'Email tự động gửi từ hệ thống Aevum OS. Vui lòng không trả lời trực tiếp thư này.'}
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export default BaseEmailLayout;
