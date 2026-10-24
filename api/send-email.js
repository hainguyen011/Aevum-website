import { EmailService } from '../src/services/EmailService.js';

// In-memory sliding window rate limiter for Serverless warm container
const ipRateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Allowed Origins for CORS
const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/,
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)*aevum\.ai\.vn$/,
  /^https:\/\/(?:[a-zA-Z0-9-]+\.)*pipernet\.io\.vn$/
];

function isOriginAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

function checkRateLimit(ip) {
  const now = Date.now();
  const history = ipRateLimitMap.get(ip) || [];
  const validHistory = history.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (validHistory.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRateLimitMap.set(ip, validHistory);
    return false;
  }

  validHistory.push(now);
  ipRateLimitMap.set(ip, validHistory);

  // Periodic cleanup if map grows too large
  if (ipRateLimitMap.size > 1000) {
    for (const [key, timestamps] of ipRateLimitMap.entries()) {
      if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] > RATE_LIMIT_WINDOW_MS) {
        ipRateLimitMap.delete(key);
      }
    }
  }

  return true;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.referer || '';
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString()
    .split(',')[0]
    .trim();

  // Dynamic CORS Headers based on allowed whitelist
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Direct server-to-server or script invocation without origin
    res.setHeader('Access-Control-Allow-Origin', 'https://aevum.ai.vn');
  } else {
    // Disallowed origin
    return res.status(403).json({ error: 'Origin forbidden.' });
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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

  // 1. IP Rate Limiting Check
  if (!checkRateLimit(clientIp)) {
    console.warn(`[RateLimit Guard] IP ${clientIp} exceeded rate limit for /api/send-email`);
    return res.status(429).json({ error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.' });
  }

  try {
    const bodyData = req.body;
    if (!bodyData || typeof bodyData !== 'object') {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
    }

    // 2. Anti-spam Honeypot Check: If the hidden 'website' or 'url' field is filled, reject immediately.
    if ((bodyData.website && bodyData.website.trim() !== '') || (bodyData.url && bodyData.url.trim() !== '')) {
      console.warn('[Spam Guard] Bot detected via honeypot field:', bodyData.website || bodyData.url);
      return res.status(400).json({ error: 'Bot detected. Submission ignored.' });
    }

    const { name, email } = bodyData;

    if (!email || !name) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc: email hoặc name.' });
    }

    // 3. Strict Input Validation & Header Injection Defense
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedName = String(name).trim();

    // Prevent Email Header Injection (newlines in name or email)
    if (/[\r\n]/.test(trimmedEmail) || /[\r\n]/.test(trimmedName)) {
      console.warn('[Security Guard] Header injection attempt blocked from IP:', clientIp);
      return res.status(400).json({ error: 'Dữ liệu chứa ký tự không hợp lệ.' });
    }

    // Validate email format and max length (RFC 5322 basic standard)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (trimmedEmail.length > 128 || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Địa chỉ email không đúng định dạng.' });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({ error: 'Họ tên quá dài (tối đa 100 ký tự).' });
    }

    // 4. Instantiate and execute decoupled EmailService
    const emailService = new EmailService();
    const sanitizedPayload = {
      ...bodyData,
      name: trimmedName,
      email: trimmedEmail
    };

    const result = await emailService.processRegistration(sanitizedPayload);

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

