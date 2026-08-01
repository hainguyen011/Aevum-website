import { BaseEmailLayout } from './BaseLayout.js';

/**
 * System Notification & Token Delivery Email Template (Refined, Gentle & Soft UI/UX - No Emojis)
 * @param {Object} payload 
 * @returns {string} HTML string
 */
export function NotificationEmailTemplate({ name, title, message, actionUrl, actionText, tokenCode, salutation = 'Anh/Chị' }) {
  const contentHtml = `
    <h1>${title || 'Thông báo từ Aevum OS'}</h1>
    <p>Kính gửi <strong>${name || 'Developer'}</strong>,</p>
    <p>${message || `Hệ thống Aevum OS vừa phát hành thông báo mới dành cho không gian làm việc của ${salutation}.`}</p>
    
    ${tokenCode ? `
    <div style="background-color: #12121A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 18px; text-align: center; margin-top: 24px; margin-bottom: 24px;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">Mã kích hoạt Daemon (Access Token)</div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: bold; color: #38bdf8; letter-spacing: 2px; margin-top: 8px;">
        ${tokenCode}
      </div>
    </div>
    ` : ''}
    
    ${actionUrl ? `
    <div style="text-align: center; margin-top: 28px; margin-bottom: 28px;">
      <a href="${actionUrl}" class="btn" target="_blank">${actionText || 'Truy cập Hệ thống'} →</a>
    </div>
    ` : ''}
    
    <!-- Seamless Full-Width Edge-to-Edge Divider Line -->
    <div style="margin-left: -28px; margin-right: -28px; border-top: 1px solid rgba(255, 255, 255, 0.08); margin-top: 36px; margin-bottom: 24px;"></div>
    
    <p style="color: #94A3B8; margin-bottom: 0;">
      Trân trọng,<br>
      <strong style="color: #ffffff;">Aevum OS Daemon Team</strong>
    </p>
  `;

  return BaseEmailLayout({
    previewText: title || 'Thông báo từ Aevum OS',
    headerTitle: title || 'Thông báo - Aevum OS',
    contentHtml
  });
}

export default NotificationEmailTemplate;
