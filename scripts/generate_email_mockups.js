import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WelcomeEmailTemplate } from '../src/emails/templates/WelcomeEmail.js';
import { NotificationEmailTemplate } from '../src/emails/templates/NotificationEmail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../out/email_mockups');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert logo to Base64 URI for offline local preview
const logoPath = path.resolve(__dirname, '../assets/logos/AevumOS-transparent.png');
const logoBuffer = fs.readFileSync(logoPath);
const logoBase64Uri = `data:image/png;base64,${logoBuffer.toString('base64')}`;

// 1. Generate Welcome Email Mockup
const welcomeHtml = WelcomeEmailTemplate({
  name: 'Nguyễn Văn A',
  logoUrl: logoBase64Uri
});
fs.writeFileSync(path.join(outputDir, 'welcome_email.html'), welcomeHtml, 'utf8');

// 2. Generate Notification Email Mockup
const notificationHtml = NotificationEmailTemplate({
  name: 'Alex Mercer',
  title: 'CẬP NHẬT PHIÊN BẢN DAEMON 2.1.0',
  message: 'Hệ thống Aevum OS Daemon vừa phát hành bản nâng cấp bộ nhớ sống v2.1.0. Mã kích hoạt bên dưới đã được bảo vệ.',
  tokenCode: 'AEVUM-DAEMON-9988-X7',
  actionUrl: 'https://aevum.ai.vn/docs',
  actionText: 'XEM TÀI LIỆU NÂNG CẤP',
  logoUrl: logoBase64Uri
});
fs.writeFileSync(path.join(outputDir, 'notification_email.html'), notificationHtml, 'utf8');

console.log('✅ Email mockups with official logo generated successfully at:', outputDir);
console.log('1. file:///' + path.join(outputDir, 'welcome_email.html').replace(/\\/g, '/'));
console.log('2. file:///' + path.join(outputDir, 'notification_email.html').replace(/\\/g, '/'));
