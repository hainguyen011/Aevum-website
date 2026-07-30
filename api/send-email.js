export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless Functions
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const bodyData = req.body;

    // 1. Anti-spam Honeypot Check: If the hidden 'website' field is filled, reject the request immediately.
    if (bodyData.website && bodyData.website.trim() !== '') {
      console.warn('[Spam Guard] Bot detected via honeypot field:', bodyData.website);
      return res.status(400).json({ error: 'Bot detected. Submission ignored.' });
    }

    const {
      name,
      email,
      ide,
      role,
      primaryPainPoint,
      desiredFeature,
      agentName,
      agentVibe,
      customNotes
    } = bodyData;

    if (!email || !name) {
      return res.status(400).json({ error: 'Missing required fields: email or name' });
    }

    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Aevum OS <welcome@yourdomain.com>';

    // 2. Synchronize to Google Sheets Webhook via Server-side fetch
    if (SCRIPT_URL && SCRIPT_URL.startsWith('http')) {
      try {
        const sheetRes = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            ide,
            role,
            primaryPainPoint,
            desiredFeature,
            agentName: agentName || 'N/A',
            agentVibe,
            customNotes: customNotes || 'N/A'
          })
        });

        if (!sheetRes.ok) {
          console.error('[Google Sheet Sync Error] Status:', sheetRes.status);
        }
      } catch (sheetErr) {
        console.error('[Google Sheet Connection Error]:', sheetErr);
        // Continue processing to still attempt email delivery
      }
    } else {
      console.log('💡 [Aevum OS Serverless] GOOGLE_SCRIPT_URL not configured. Skipping Sheet sync.');
    }

    // 3. Dispatch Welcoming Email via Resend API
    if (RESEND_API_KEY) {
      const emailHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b11; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0e0e16; border: 1px solid #1e293b; border-top: 4px solid #00f0ff; border-radius: 8px; overflow: hidden; }
    .header { padding: 30px; text-align: center; background-image: radial-gradient(circle at top, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 70%); border-bottom: 1px solid #1e293b; }
    .logo { font-size: 26px; font-weight: bold; color: #ffffff; letter-spacing: 2px; }
    .logo span { color: #00f0ff; }
    .content { padding: 30px; line-height: 1.6; }
    h1 { color: #ffffff; font-size: 20px; margin-bottom: 20px; border-left: 3px solid #00f0ff; padding-left: 10px; }
    p { margin-bottom: 20px; color: #cbd5e1; }
    ul { color: #cbd5e1; padding-left: 20px; margin-bottom: 25px; }
    li { margin-bottom: 8px; }
    .welcome-box { background-color: #161622; border: 1px solid #1e293b; border-radius: 6px; padding: 20px; text-align: center; margin: 25px 0; }
    .welcome-title { font-size: 16px; font-weight: bold; color: #00f0ff; margin-bottom: 8px; }
    .welcome-text { font-size: 13px; color: #cbd5e1; }
    .footer { padding: 20px; background-color: #08080d; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
    .btn { display: inline-block; padding: 12px 24px; background-color: #00f0ff; color: #0b0b11 !important; text-decoration: none; font-weight: bold; border-radius: 4px; margin: 15px 0; text-align: center; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">AEVUM<span>OS</span></div>
    </div>
    <div class="content">
      <h1>Chào mừng \${name} đã trở thành một phần của gia đình Aevum! 🚀🏠</h1>
      <p>Chào bạn, mình là **An** đây ạ! Cảm ơn bạn rất nhiều vì đã đăng ký và chính thức trở thành một mảnh ghép quý giá trong đại gia đình **Aevum OS** của tụi mình nhé. ✨</p>
      
      <div class="welcome-box">
        <div class="welcome-title">🎉 Welcome to Aevum Family!</div>
        <div class="welcome-text">Sự đồng hành và ủng hộ của bạn chính là nguồn cảm hứng to lớn nhất để tụi mình cùng nhau phát triển hệ điều hành AI Agent này.</div>
      </div>
      
      <p>Hệ thống đã đồng bộ hóa thành công cấu hình đăng ký của bạn:</p>
      <ul>
        <li><strong>Môi trường lập trình:</strong> \${ide}</li>
        <li><strong>Vai trò kỹ thuật:</strong> \${role}</li>
        <li><strong>Tính năng quan tâm:</strong> \${desiredFeature}</li>
      </ul>
      
      <p>Mỗi khi có thông tin cập nhật mới nhất, tài liệu nâng cấp hệ thống hoặc quà tặng đặc quyền, mình sẽ chủ động gửi email cập nhật tới bạn ngay qua hòm thư này nha.</p>
      <p style="text-align: center;">
        <a href="https://aevum-website.vercel.app/docs" class="btn" style="color: #0b0b11;">Tài Liệu Hướng Dẫn</a>
      </p>
      <p>Nếu bạn có bất cứ câu hỏi hay ý kiến đóng góp nào, hãy phản hồi lại cho tụi mình nhé!</p>
      <p style="margin-top: 30px;">
        Chúc bạn một ngày làm việc ngập tràn niềm vui và code không bug,<br>
        <strong>An & Đội ngũ I2FLabs Việt Nam</strong> 💖
      </p>
    </div>
    <div class="footer">
      © 2026 I2FLabs Vietnam. All rights reserved.<br>
      Đây là email tự động gửi từ hệ thống Aevum OS. Vui lòng không trả lời trực tiếp email này.
    </div>
  </div>
</body>
</html>
      `;

      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer \${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: email,
            subject: 'Chào mừng bạn gia nhập gia đình Aevum OS! 🚀🏠',
            html: emailHtmlContent
          })
        });

        const resendData = await resendRes.json();
        if (!resendRes.ok) {
          console.error('[Resend Error]:', resendData);
        }
      } catch (emailErr) {
        console.error('[Resend Connection Error]:', emailErr);
      }
    } else {
      console.log('💡 [Aevum OS Serverless] RESEND_API_KEY not configured. Skipping email dispatch.');
    }

    return res.status(200).json({ success: true, message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('[Serverless Handler Error]:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
