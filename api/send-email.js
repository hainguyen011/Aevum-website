import { EmailService } from '../src/services/EmailService.js';

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

    const { name, email } = bodyData;

    if (!email || !name) {
      return res.status(400).json({ error: 'Missing required fields: email or name' });
    }

    // 2. Instantiate and execute decoupled EmailService
    const emailService = new EmailService();
    const result = await emailService.processRegistration(bodyData);

    return res.status(200).json({
      success: true,
      message: 'Đăng ký thành công!',
      details: result
    });
  } catch (error) {
    console.error('[Serverless Handler Error]:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
