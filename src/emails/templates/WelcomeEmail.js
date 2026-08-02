import { BaseEmailLayout } from './BaseLayout.js';

/**
 * Early Access Welcome Email Template (Centered Layout & Respectful Salutation with Cute An Sticker)
 * @param {Object} payload 
 * @returns {string} HTML string
 */
export function WelcomeEmailTemplate({ name, salutation = 'Anh/Chị' }) {
  const anStickerUrl = 'https://raw.githubusercontent.com/hainguyen011/Aevum-website/main/assets/stickers/An_Collection/An_Lover.png';

  const contentHtml = `
    <h1>Chào mừng bạn đến với Aevum OS</h1>
    
    <p>Xin chào <strong>${name}</strong>,</p>
    <p>Cảm ơn ${salutation} đã dành thời gian đăng ký tham gia chương trình Early Access của <strong>Aevum OS</strong>. Đội ngũ I2FLabs Việt Nam rất trân trọng sự đồng hành và những đóng góp khảo sát quý báu của ${salutation}.</p>
    
    <p>Mã nạp Daemon (Daemon Access Token) kèm tài liệu hướng dẫn tích hợp trực tiếp vào Workspace sẽ được gửi đến hòm thư này ngay khi đợt thử nghiệm mở cửa.</p>
    
    <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
      <a href="https://aevum.ai.vn/docs" class="btn" target="_blank">Khám phá Tài liệu Hướng dẫn →</a>
    </div>
    
    <!-- Seamless Full-Width Edge-to-Edge Divider Line -->
    <div style="margin-left: -28px; margin-right: -28px; border-top: 1px solid rgba(255, 255, 255, 0.08); margin-top: 36px; margin-bottom: 24px;"></div>
    
    <!-- Cute An Mascot Sticker -->
    <div style="text-align: center; margin: 16px 0 12px 0;">
      <img 
        src="${anStickerUrl}" 
        alt="Cute An Mascot Sticker" 
        width="110" 
        height="110" 
        style="width: 110px; height: 110px; display: inline-block; border: 0; outline: none; text-decoration: none;" 
      />
    </div>

    <p style="color: #94A3B8; margin-bottom: 0; text-align: center;">
      Chúc ${salutation} một ngày làm việc ngập tràn niềm vui và nhiều cảm hứng sáng tạo,<br>
      <strong style="color: #ffffff;">An & Đội ngũ I2FLabs Việt Nam</strong>
    </p>
  `;

  return BaseEmailLayout({
    previewText: `Chào mừng ${name} đến với Aevum OS`,
    headerTitle: `Chào mừng ${name} - Aevum OS`,
    contentHtml
  });
}

export default WelcomeEmailTemplate;
