import { Resend } from 'resend';
import { WelcomeEmailTemplate, NotificationEmailTemplate } from '../emails/index.js';

/**
 * Aevum OS - Dedicated Email & Notification Service
 * Modular service for managing email dispatching via Resend SDK & Google Apps Script Webhooks.
 */
export class EmailService {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.RESEND_API_KEY;
    this.fromEmail = options.fromEmail && !options.fromEmail.includes('resend.dev') 
      ? options.fromEmail 
      : (process.env.RESEND_FROM_EMAIL && !process.env.RESEND_FROM_EMAIL.includes('resend.dev')
          ? process.env.RESEND_FROM_EMAIL 
          : 'AevumOS Dev Team <richard@aevum.ai.vn>');
    this.scriptUrl = options.scriptUrl || process.env.GOOGLE_SCRIPT_URL;

    if (this.apiKey) {
      this.resend = new Resend(this.apiKey);
    }
  }

  /**
   * Dispatch a generic email via Resend SDK
   * @param {Object} param0 
   * @returns {Promise<Object>}
   */
  async sendEmail({ to, subject, html, text }) {
    if (!this.resend) {
      console.log('💡 [EmailService] RESEND_API_KEY not configured. Skipping Resend dispatch.');
      return { success: false, reason: 'NO_API_KEY' };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
        text
      });

      if (error) {
        console.error('❌ [EmailService Resend Error]:', error);
        return { success: false, error };
      }

      console.log('✅ [EmailService Resend Success]: ID', data.id);
      return { success: true, data };
    } catch (err) {
      console.error('❌ [EmailService Exception]:', err);
      return { success: false, error: err.message || err };
    }
  }

  /**
   * Synchronize survey registration data to Google Sheet Webhook
   * @param {Object} payload 
   * @returns {Promise<Object>}
   */
  async syncToGoogleSheet(payload) {
    if (!this.scriptUrl || !this.scriptUrl.startsWith('http')) {
      console.log('💡 [EmailService] GOOGLE_SCRIPT_URL not configured. Skipping Sheet sync.');
      return { success: false, reason: 'NO_SCRIPT_URL' };
    }

    try {
      const res = await fetch(this.scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...payload
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ [EmailService Google Sheet Error] Status:', res.status, errorText);
        return { success: false, status: res.status, error: errorText };
      }

      console.log('✅ [EmailService Google Sheet Success]');
      return { success: true };
    } catch (err) {
      console.error('❌ [EmailService Google Sheet Exception]:', err);
      return { success: false, error: err.message || err };
    }
  }

  /**
   * Process full Early Access Registration: Sync to Sheet & Dispatch Welcoming Email
   * @param {Object} userPayload 
   * @returns {Promise<Object>}
   */
  async processRegistration(userPayload) {
    const { name, email } = userPayload;

    // 1. Sync data to Google Sheet Webhook
    const sheetResult = await this.syncToGoogleSheet(userPayload);

    // 2. Render Welcome Email HTML from Design Template Repository
    const htmlContent = WelcomeEmailTemplate(userPayload);

    // 3. Dispatch Email via Resend SDK
    const emailResult = await this.sendEmail({
      to: email,
      subject: `[AEVUM OS] Xác nhận đăng ký Early Access - ${name}`,
      html: htmlContent
    });

    return {
      sheetResult,
      emailResult
    };
  }

  /**
   * Send a system notification / token delivery email
   * @param {Object} payload 
   * @returns {Promise<Object>}
   */
  async sendNotification(payload) {
    const { email, title, message, actionUrl, actionText, tokenCode } = payload;

    const htmlContent = NotificationEmailTemplate({
      name: payload.name,
      title,
      message,
      actionUrl,
      actionText,
      tokenCode
    });

    return await this.sendEmail({
      to: email,
      subject: title || '[AEVUM OS] Thông báo hệ thống',
      html: htmlContent
    });
  }
}

// Singleton export
export const emailService = new EmailService();
export default emailService;
