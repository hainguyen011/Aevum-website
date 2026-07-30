/**
 * Aevum OS - Google Apps Script Backend (Code.gs)
 * Hướng dẫn triển khai:
 * 1. Mở Google Sheet -> Tiện ích mở rộng (Extensions) -> Apps Script.
 * 2. Dán toàn bộ mã nguồn này vào tệp Code.gs.
 * 3. Chạy hàm testSendEmail() hoặc doPostManually() 1 lần trong cửa sổ biên dịch để cấp quyền (Authorize Access) gửi Gmail và truy cập Sheet.
 * 4. Nhấp "Triển khai" (Deploy) -> "Triển khai dưới dạng ứng dụng web" (New deployment -> Web app):
 *    - Thực thi dưới danh nghĩa (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 * 5. Sao chép Web App URL và dán vào biến môi trường GOOGLE_SCRIPT_URL trong Vercel / .env.local.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa script tối đa 10s để tránh xung đột ghi dữ liệu đồng thời
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: 'error', message: 'No post data received' });
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Kiểm tra hàng tiêu đề (nếu sheet mới tạo)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian (Timestamp)',
        'Họ và tên (Name)',
        'Email',
        'IDE / Editor',
        'Vai trò (Role)',
        'Trở ngại chính (Pain Point)',
        'Tính năng mong đợi (Desired Feature)',
        'Tên Agent (Agent Name)',
        'Vibe Agent',
        'Ghi chú bổ sung (Custom Notes)'
      ]);
      // Format tiêu đề
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#0b0b11').setFontColor('#00f0ff');
    }

    // 2. Ghi dữ liệu vào Google Sheet
    var timestamp = data.timestamp || new Date().toISOString();
    var name = data.name || 'N/A';
    var email = data.email || 'N/A';
    var ide = data.ide || 'N/A';
    var role = data.role || 'N/A';
    var primaryPainPoint = data.primaryPainPoint || 'N/A';
    var desiredFeature = data.desiredFeature || 'N/A';
    var agentName = data.agentName || 'N/A';
    var agentVibe = data.agentVibe || 'N/A';
    var customNotes = data.customNotes || 'N/A';

    sheet.appendRow([
      timestamp,
      name,
      email,
      ide,
      role,
      primaryPainPoint,
      desiredFeature,
      agentName,
      agentVibe,
      customNotes
    ]);

    // 3. Tự động gửi Email chào mừng trực tiếp từ Apps Script (Dự phòng nếu không dùng Resend API)
    var emailSent = false;
    var emailError = null;

    if (email && email !== 'N/A' && email.includes('@')) {
      try {
        var subject = 'Chào mừng ' + name + ' gia nhập gia đình Aevum OS! 🚀';
        var logoUrl = 'https://raw.githubusercontent.com/hainguyen011/Aevum-website/main/assets/logos/AevumOS-transparent.png';
        var anStickerUrl = 'https://raw.githubusercontent.com/hainguyen011/Aevum-website/main/assets/stickers/An_Collection/An_Lover.png';
        var htmlBody = `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 580px; margin: 0 auto; background-color: #0b0b11; color: #e2e8f0; padding: 36px 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); text-align: center;">
            <div style="margin-bottom: 24px;">
              <img src="${logoUrl}" alt="Aevum OS Logo" height="60" style="height: 60px; display: inline-block; border: 0;" />
            </div>
            <h2 style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 18px;">Chào mừng bạn đến với Aevum OS</h2>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7;">Xin chào <strong>${name}</strong>,</p>
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7;">Cảm ơn Anh/Chị đã dành thời gian đăng ký tham gia chương trình Early Access của <strong>Aevum OS</strong>. Đội ngũ I2FLabs Việt Nam rất trân trọng sự đồng hành của Anh/Chị.</p>
            <div style="margin-top: 28px; margin-bottom: 28px;">
              <a href="https://aevum-website.vercel.app/docs" target="_blank" style="display: inline-block; padding: 13px 26px; background-color: #ffffff; color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; border-radius: 6px;">Khám phá Tài liệu Hướng dẫn →</a>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 32px; padding-top: 20px;"></div>
            <div style="text-align: center; margin: 16px 0 12px 0;">
              <img src="${anStickerUrl}" alt="Cute An Mascot Sticker" width="110" height="110" style="width: 110px; height: 110px; display: inline-block; border: 0;" />
            </div>
            <div style="color: #94a3b8; font-size: 13px;">
              Chúc Anh/Chị một ngày làm việc ngập tràn niềm vui và nhiều cảm hứng sáng tạo,<br>
              <strong style="color: #ffffff;">An & Đội ngũ I2FLabs Việt Nam</strong>
            </div>
            <div style="font-size: 12px; color: #64748b; margin-top: 24px;">© 2026 I2FLabs Vietnam. All rights reserved.</div>
          </div>
        `;

        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: htmlBody
        });
        emailSent = true;
      } catch (mailErr) {
        emailError = mailErr.toString();
        Logger.log('Lỗi gửi email từ Apps Script: ' + emailError);
      }
    }

    return createJsonResponse({
      status: 'success',
      message: 'Data logged successfully',
      emailSent: emailSent,
      emailError: emailError
    });

  } catch (err) {
    return createJsonResponse({ status: 'error', error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({ status: 'active', service: 'Aevum OS AppsScript Webhook' });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
