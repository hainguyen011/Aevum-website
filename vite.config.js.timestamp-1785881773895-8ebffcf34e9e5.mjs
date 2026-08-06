// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/Anton/Aevum-website/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Anton/Aevum-website/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "D:\\Anton\\Aevum-website";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);
  let logoBase64Uri = "https://aevum.ai.vn/assets/logos/AevumOS-transparent.png";
  try {
    const logoPath = path.resolve(__vite_injected_original_dirname, "./assets/logos/AevumOS-transparent.png");
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64Uri = `data:image/png;base64,${logoBuffer.toString("base64")}`;
    }
  } catch (_) {
  }
  return {
    plugins: [
      react(),
      {
        name: "api-serverless-local-middleware",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith("/api/preview-email")) {
              try {
                const url = new URL(req.url, "http://localhost");
                const template = url.searchParams.get("template");
                if (template === "welcome") {
                  const { WelcomeEmailTemplate } = await server.ssrLoadModule("./src/emails/templates/WelcomeEmail.js");
                  const html = WelcomeEmailTemplate({
                    name: "Nguy\u1EC5n V\u0103n A",
                    logoUrl: logoBase64Uri
                  });
                  res.setHeader("Content-Type", "text/html; charset=utf-8");
                  return res.end(html);
                }
                if (template === "notification") {
                  const { NotificationEmailTemplate } = await server.ssrLoadModule("./src/emails/templates/NotificationEmail.js");
                  const html = NotificationEmailTemplate({
                    name: "Alex Mercer",
                    title: "C\u1EACP NH\u1EACT PHI\xCAN B\u1EA2N DAEMON 2.1.0",
                    message: "H\u1EC7 th\u1ED1ng Aevum OS Daemon v\u1EEBa ph\xE1t h\xE0nh b\u1EA3n n\xE2ng c\u1EA5p b\u1ED9 nh\u1EDB s\u1ED1ng v2.1.0. M\xE3 k\xEDch ho\u1EA1t b\xEAn d\u01B0\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7.",
                    tokenCode: "AEVUM-DAEMON-9988-X7",
                    actionUrl: "https://aevum.ai.vn/docs",
                    actionText: "XEM T\xC0I LI\u1EC6U N\xC2NG C\u1EA4P",
                    logoUrl: logoBase64Uri
                  });
                  res.setHeader("Content-Type", "text/html; charset=utf-8");
                  return res.end(html);
                }
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
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                return res.end(hubHtml);
              } catch (err) {
                console.error("[Preview Email Error]:", err);
                res.statusCode = 500;
                return res.end("Error rendering email preview");
              }
            }
            if (req.url && req.url.startsWith("/api/send-email")) {
              try {
                if (req.method === "POST") {
                  let bodyStr = "";
                  for await (const chunk of req) {
                    bodyStr += chunk;
                  }
                  try {
                    req.body = JSON.parse(bodyStr);
                  } catch (_) {
                    req.body = {};
                  }
                }
                const { default: handler } = await server.ssrLoadModule("./api/send-email.js");
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(data));
                  return res;
                };
                await handler(req, res);
              } catch (err) {
                console.error("[Vite Local API Error]:", err);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: err.message || "Internal API Error" }));
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
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      port: 5177,
      open: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBbnRvblxcXFxBZXZ1bS13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxBbnRvblxcXFxBZXZ1bS13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9BbnRvbi9BZXZ1bS13ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAvLyBMb2FkIGVudmlyb25tZW50IHZhcmlhYmxlcyBmcm9tIC5lbnYgYW5kIC5lbnYubG9jYWwgaW50byBwcm9jZXNzLmVudiBmb3IgbG9jYWwgQVBJIGhhbmRsZXJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gIE9iamVjdC5hc3NpZ24ocHJvY2Vzcy5lbnYsIGVudik7XG5cbiAgLy8gTG9hZCBsb2dvIGFzIGJhc2U2NCBkYXRhIFVSSSBmb3IgbG9jYWwgZGV2IHByZXZpZXdcbiAgbGV0IGxvZ29CYXNlNjRVcmkgPSAnaHR0cHM6Ly9hZXZ1bS5haS52bi9hc3NldHMvbG9nb3MvQWV2dW1PUy10cmFuc3BhcmVudC5wbmcnO1xuICB0cnkge1xuICAgIGNvbnN0IGxvZ29QYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vYXNzZXRzL2xvZ29zL0FldnVtT1MtdHJhbnNwYXJlbnQucG5nJyk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMobG9nb1BhdGgpKSB7XG4gICAgICBjb25zdCBsb2dvQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGxvZ29QYXRoKTtcbiAgICAgIGxvZ29CYXNlNjRVcmkgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCR7bG9nb0J1ZmZlci50b1N0cmluZygnYmFzZTY0Jyl9YDtcbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHt9XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAge1xuICAgICAgICBuYW1lOiAnYXBpLXNlcnZlcmxlc3MtbG9jYWwtbWlkZGxld2FyZScsXG4gICAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICAgICAgLy8gMS4gTGl2ZSBFbWFpbCBNb2NrdXAgUHJldmlldyBIdWIgRW5kcG9pbnRcbiAgICAgICAgICAgIGlmIChyZXEudXJsICYmIHJlcS51cmwuc3RhcnRzV2l0aCgnL2FwaS9wcmV2aWV3LWVtYWlsJykpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcS51cmwsICdodHRwOi8vbG9jYWxob3N0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndGVtcGxhdGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSA9PT0gJ3dlbGNvbWUnKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IFdlbGNvbWVFbWFpbFRlbXBsYXRlIH0gPSBhd2FpdCBzZXJ2ZXIuc3NyTG9hZE1vZHVsZSgnLi9zcmMvZW1haWxzL3RlbXBsYXRlcy9XZWxjb21lRW1haWwuanMnKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBXZWxjb21lRW1haWxUZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOZ3V5XHUxRUM1biBWXHUwMTAzbiBBJyxcbiAgICAgICAgICAgICAgICAgICAgbG9nb1VybDogbG9nb0Jhc2U2NFVyaVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmVuZChodG1sKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUgPT09ICdub3RpZmljYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IE5vdGlmaWNhdGlvbkVtYWlsVGVtcGxhdGUgfSA9IGF3YWl0IHNlcnZlci5zc3JMb2FkTW9kdWxlKCcuL3NyYy9lbWFpbHMvdGVtcGxhdGVzL05vdGlmaWNhdGlvbkVtYWlsLmpzJyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gTm90aWZpY2F0aW9uRW1haWxUZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBbGV4IE1lcmNlcicsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ1x1MUVBQ1AgTkhcdTFFQUNUIFBISVx1MDBDQU4gQlx1MUVBMk4gREFFTU9OIDIuMS4wJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0hcdTFFQzcgdGhcdTFFRDFuZyBBZXZ1bSBPUyBEYWVtb24gdlx1MUVFQmEgcGhcdTAwRTF0IGhcdTAwRTBuaCBiXHUxRUEzbiBuXHUwMEUybmcgY1x1MUVBNXAgYlx1MUVEOSBuaFx1MUVEQiBzXHUxRUQxbmcgdjIuMS4wLiBNXHUwMEUzIGtcdTAwRURjaCBob1x1MUVBMXQgYlx1MDBFQW4gZFx1MDFCMFx1MUVEQmkgXHUwMTExXHUwMEUzIFx1MDExMVx1MDFCMFx1MUVFM2MgYlx1MUVBM28gdlx1MUVDNy4nLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbkNvZGU6ICdBRVZVTS1EQUVNT04tOTk4OC1YNycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblVybDogJ2h0dHBzOi8vYWV2dW0uYWkudm4vZG9jcycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblRleHQ6ICdYRU0gVFx1MDBDMEkgTElcdTFFQzZVIE5cdTAwQzJORyBDXHUxRUE0UCcsXG4gICAgICAgICAgICAgICAgICAgIGxvZ29Vcmw6IGxvZ29CYXNlNjRVcmlcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbDsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5lbmQoaHRtbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdDogU2VydmUgSW50ZXJhY3RpdmUgRW1haWwgUHJldmlldyBIdWJcbiAgICAgICAgICAgICAgICBjb25zdCBodWJIdG1sID0gYFxuPCFET0NUWVBFIGh0bWw+XG48aHRtbCBsYW5nPVwidmlcIj5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgPHRpdGxlPkFldnVtIE9TIC0gRW1haWwgTW9ja3VwIFByZXZpZXcgSHViPC90aXRsZT5cbiAgPHN0eWxlPlxuICAgIGJvZHkgeyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmOyBiYWNrZ3JvdW5kOiAjMEIwQjExOyBjb2xvcjogI2ZmZjsgaGVpZ2h0OiAxMDB2aDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAgIC50b3BiYXIgeyBiYWNrZ3JvdW5kOiAjMEUwRTE2OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjEpOyBwYWRkaW5nOiAxMnB4IDI0cHg7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAgIC5icmFuZCB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzAwRjBGRjsgbGV0dGVyLXNwYWNpbmc6IDJweDsgfVxuICAgIC5uYXYgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IDEycHg7IH1cbiAgICAubmF2LWJ0biB7IGJhY2tncm91bmQ6ICMxNjE2MjI7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4xNSk7IGNvbG9yOiAjOTRBM0I4OyBwYWRkaW5nOiA4cHggMTZweDsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgZm9udC1zaXplOiAxMnB4OyBjdXJzb3I6IHBvaW50ZXI7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgYm9yZGVyLXJhZGl1czogNHB4OyB0cmFuc2l0aW9uOiBhbGwgMC4yczsgfVxuICAgIC5uYXYtYnRuLmFjdGl2ZSwgLm5hdi1idG46aG92ZXIgeyBiYWNrZ3JvdW5kOiAjMDBGMEZGOyBjb2xvcjogIzAwMDsgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiAgICBpZnJhbWUgeyBmbGV4OiAxOyBib3JkZXI6IG5vbmU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IH1cbiAgPC9zdHlsZT5cbjwvaGVhZD5cbjxib2R5PlxuICA8ZGl2IGNsYXNzPVwidG9wYmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cImJyYW5kXCI+QUVWVU0gT1MgLy8gRU1BSUwgTU9DS1VQIFBSRVZJRVcgSFVCPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5hdlwiPlxuICAgICAgPGEgaHJlZj1cIi9hcGkvcHJldmlldy1lbWFpbD90ZW1wbGF0ZT13ZWxjb21lXCIgdGFyZ2V0PVwicHJldmlldy1mcmFtZVwiIGNsYXNzPVwibmF2LWJ0biBhY3RpdmVcIiBvbmNsaWNrPVwic2V0QWN0aXZlKHRoaXMpXCI+V2VsY29tZSBFbWFpbDwvYT5cbiAgICAgIDxhIGhyZWY9XCIvYXBpL3ByZXZpZXctZW1haWw/dGVtcGxhdGU9bm90aWZpY2F0aW9uXCIgdGFyZ2V0PVwicHJldmlldy1mcmFtZVwiIGNsYXNzPVwibmF2LWJ0blwiIG9uY2xpY2s9XCJzZXRBY3RpdmUodGhpcylcIj5Ob3RpZmljYXRpb24gRW1haWw8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8aWZyYW1lIG5hbWU9XCJwcmV2aWV3LWZyYW1lXCIgc3JjPVwiL2FwaS9wcmV2aWV3LWVtYWlsP3RlbXBsYXRlPXdlbGNvbWVcIj48L2lmcmFtZT5cbiAgPHNjcmlwdD5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmUoZWwpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtYnRuJykuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgPC9zY3JpcHQ+XG48L2JvZHk+XG48L2h0bWw+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5lbmQoaHViSHRtbCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tQcmV2aWV3IEVtYWlsIEVycm9yXTonLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuZW5kKCdFcnJvciByZW5kZXJpbmcgZW1haWwgcHJldmlldycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDIuIFNlcnZlcmxlc3MgQVBJIERpc3BhdGNoIEVuZHBvaW50XG4gICAgICAgICAgICBpZiAocmVxLnVybCAmJiByZXEudXJsLnN0YXJ0c1dpdGgoJy9hcGkvc2VuZC1lbWFpbCcpKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICAgICAgICAgICAgbGV0IGJvZHlTdHIgPSAnJztcbiAgICAgICAgICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlTdHIgKz0gY2h1bms7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXEuYm9keSA9IEpTT04ucGFyc2UoYm9keVN0cik7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5ib2R5ID0ge307XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZWZhdWx0OiBoYW5kbGVyIH0gPSBhd2FpdCBzZXJ2ZXIuc3NyTG9hZE1vZHVsZSgnLi9hcGkvc2VuZC1lbWFpbC5qcycpO1xuXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyA9IChjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVzLmpzb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgaGFuZGxlcihyZXEsIHJlcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tWaXRlIExvY2FsIEFQSSBFcnJvcl06JywgZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgJ0ludGVybmFsIEFQSSBFcnJvcicgfSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MTc3LFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBQLFNBQVMsY0FBYyxlQUFlO0FBQ2hTLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBSGYsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFeEMsUUFBTSxNQUFNLFFBQVEs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
