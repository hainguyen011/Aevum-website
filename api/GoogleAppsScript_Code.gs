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
        var subject = 'Chào mừng ' + name + ' gia nhập gia đình Aevum OS! 🚀🏠';
        var htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0b11; color: #e2e8f0; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; border-top: 4px solid #00f0ff;">
            <h2 style="color: #00f0ff; text-align: center;">AEVUM OS</h2>
            <h3 style="color: #ffffff;">Chào mừng ${name} đã đăng ký Early Access! 🚀</h3>
            <p>Cảm ơn bạn rất nhiều vì đã đăng ký trải nghiệm Aevum OS. Đội ngũ I2FLabs Việt Nam đã nhận được thông tin khảo sát của bạn.</p>
            <div style="background-color: #161622; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #1e293b;">
              <p style="margin: 5px 0; color: #cbd5e1;"><strong>Môi trường lập trình:</strong> ${ide}</p>
              <p style="margin: 5px 0; color: #cbd5e1;"><strong>Vai trò:</strong> ${role}</p>
              <p style="margin: 5px 0; color: #cbd5e1;"><strong>Tính năng quan tâm:</strong> ${desiredFeature}</p>
              <p style="margin: 5px 0; color: #cbd5e1;"><strong>Tên Agent mơ ước:</strong> ${agentName}</p>
            </div>
            <p>Mã nạp Daemon Early Access sẽ được gửi đến hòm thư này ngay khi đợt nghiệm thu hoàn tất.</p>
            <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 30px;">© 2026 I2FLabs Vietnam. All rights reserved.</p>
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
