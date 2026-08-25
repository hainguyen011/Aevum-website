import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env and .env.local into process.env for local API handler
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  // Load logo as base64 data URI for local dev preview
  let logoBase64Uri = 'https://aevum.ai.vn/assets/logos/AevumOS-transparent.png';
  try {
    const logoPath = path.resolve(__dirname, './assets/logos/AevumOS-transparent.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64Uri = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }
  } catch (_) {}

  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-local-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            // 1. Live Email Mockup Preview Hub Endpoint
            if (req.url && req.url.startsWith('/api/preview-email')) {
              try {
                const url = new URL(req.url, 'http://localhost');
                const template = url.searchParams.get('template');

                if (template === 'welcome') {
                  const { WelcomeEmailTemplate } = await server.ssrLoadModule('./src/emails/templates/WelcomeEmail.js');
                  const html = WelcomeEmailTemplate({
                    name: 'Nguyễn Văn A',
                    logoUrl: logoBase64Uri
                  });
                  res.setHeader('Content-Type', 'text/html; charset=utf-8');
                  return res.end(html);
                }

                if (template === 'notification') {
                  const { NotificationEmailTemplate } = await server.ssrLoadModule('./src/emails/templates/NotificationEmail.js');
                  const html = NotificationEmailTemplate({
                    name: 'Alex Mercer',
                    title: 'CẬP NHẬT PHIÊN BẢN DAEMON 2.1.0',
                    message: 'Hệ thống Aevum OS Daemon vừa phát hành bản nâng cấp bộ nhớ sống v2.1.0. Mã kích hoạt bên dưới đã được bảo vệ.',
                    tokenCode: 'AEVUM-DAEMON-9988-X7',
                    actionUrl: 'https://aevum.ai.vn/docs',
                    actionText: 'XEM TÀI LIỆU NÂNG CẤP',
                    logoUrl: logoBase64Uri
                  });
                  res.setHeader('Content-Type', 'text/html; charset=utf-8');
                  return res.end(html);
                }

                // Default: Serve Interactive Email Preview Hub
                const hubHtml = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Aevum OS - Email Mockup Preview Hub</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, sans-serif; background: #0B0B11; color: #fff; height: 100vh; display: flex; flex-direction: column; }
    .topbar { background: #0E0E16; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
    .brand { font-family: monospace; font-weight: bold; color: #00F0FF; letter-spacing: 2px; }
    .nav { display: flex; gap: 12px; }
    .nav-btn { background: #161622; border: 1px solid rgba(255,255,255,0.15); color: #94A3B8; padding: 8px 16px; font-family: monospace; font-size: 12px; cursor: pointer; text-decoration: none; border-radius: 4px; transition: all 0.2s; }
    .nav-btn.active, .nav-btn:hover { background: #00F0FF; color: #000; font-weight: bold; }
    iframe { flex: 1; border: none; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div class="topbar">
    <div class="brand">AEVUM OS // EMAIL MOCKUP PREVIEW HUB</div>
    <div class="nav">
      <a href="/api/preview-email?template=welcome" target="preview-frame" class="nav-btn active" onclick="setActive(this)">Welcome Email</a>
      <a href="/api/preview-email?template=notification" target="preview-frame" class="nav-btn" onclick="setActive(this)">Notification Email</a>
    </div>
  </div>
  <iframe name="preview-frame" src="/api/preview-email?template=welcome"></iframe>
  <script>
    function setActive(el) {
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
    }
  </script>
</body>
</html>
                `;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                return res.end(hubHtml);
              } catch (err) {
                console.error('[Preview Email Error]:', err);
                res.statusCode = 500;
                return res.end('Error rendering email preview');
              }
            }

            // 2. Serverless API Dispatch Endpoint
            if (req.url && req.url.startsWith('/api/send-email')) {
              try {
                if (req.method === 'POST') {
                  let bodyStr = '';
                  for await (const chunk of req) {
                    bodyStr += chunk;
                  }
                  try {
                    req.body = JSON.parse(bodyStr);
                  } catch (_) {
                    req.body = {};
                  }
                }

                const { default: handler } = await server.ssrLoadModule('./api/send-email.js');

                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };

                await handler(req, res);
              } catch (err) {
                console.error('[Vite Local API Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Internal API Error' }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5177,
      open: true,
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
          }
        }
      }
    }
  };
});
