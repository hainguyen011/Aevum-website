import React, { useEffect, useRef } from 'react';

/**
 * HeroCompanionMotion - Big Pixel Agent with AI Provider Logo Orbit
 * 
 * Nguồn Icon: LobeHub Icons Official (https://github.com/lobehub/lobe-icons)
 * 1. Sử dụng 100% LOGO CHUẨN (dạng huy hiệu tròn 52px tinh giản, không dùng thẻ chữ dài).
 * 2. Bỏ hoàn toàn Gemini theo yêu cầu.
 * 3. 9 AI Providers & Nền tảng tri thức hàng đầu xoay quanh Agent tạo thành HÌNH TRÒN ĐỀU NHAU (cách nhau đúng 40°):
 *    - Antigravity (Google Agentic IDE)
 *    - Notion (Knowledge Vault & AI)
 *    - OpenAI (GPT-4o / o3)
 *    - Anthropic (Claude 3.5 Sonnet)
 *    - DeepSeek (DeepSeek R1 Reasoning)
 *    - Perplexity (Live Web AI)
 *    - Ollama (Local Model Runtime)
 *    - Mistral AI (Codestral 25B)
 *    - Meta Llama (Llama 3.3 70B)
 * 4. Pixel Agent biểu cảm NGẠC NHIÊN (Surprise / Awe):
 *    - Đôi mắt viên thuốc đen đặc mở to tròn kinh ngạc (dilated wonder capsules).
 *    - 100% Nguyên bản: KHÔNG chấm tròn trắng, KHÔNG cười cong.
 *    - Ánh mắt lướt mượt mà dõi theo từng logo xoay quanh.
 * 5. 100% Flat Vector, KHÔNG box-shadow, Canvas trong suốt.
 */
export const HeroCompanionMotion = ({ activeLang = 'vi' }) => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const tickRef = useRef(0);

  const gazeRef = useRef({
    lookX: 0,
    lookY: 0,
    tilt: 0,
    highlightIntensity: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 640);
    let height = (canvas.height = 540);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = 540;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Silky Easing Curves ──
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    // ── Official LobeHub SVG Logo Path2D Instances (viewBox 0 0 24 24) ──
    const lobeLogos = {
      // 1. Google Antigravity (Official LobeHub)
      antigravity: new Path2D(
        'M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z'
      ),
      // 2. Notion AI (Official LobeHub)
      notion: new Path2D(
        'M15.257.055l-13.31.98C.874 1.128.5 1.83.5 2.667v14.559c0 .654.233 1.213.794 1.96l3.129 4.06c.513.653.98.794 1.962.745l15.457-.932c1.307-.093 1.681-.7 1.681-1.727V4.954c0-.53-.21-.684-.829-1.135l-.106-.078L18.34.755c-1.027-.746-1.45-.84-3.083-.7zm-8.521 4.63c-1.263.086-1.549.105-2.266-.477L2.647 2.76c-.186-.187-.092-.42.375-.466l12.796-.933c1.074-.094 1.634.28 2.054.606l2.195 1.587c.093.047.326.326.047.326l-13.216.794-.162.01zM5.263 21.193V7.287c0-.606.187-.886.748-.933l15.176-.886c.515-.047.748.28.748.886v13.81c0 .609-.093 1.122-.934 1.168l-14.523.84c-.842.047-1.215-.232-1.215-.98zm14.338-13.16c.093.422 0 .842-.422.89l-.699.139v10.264c-.608.327-1.168.513-1.635.513-.747 0-.934-.232-1.495-.932l-4.576-7.185v6.952l1.448.327s0 .84-1.169.84l-3.221.186c-.094-.187 0-.654.327-.747l.84-.232V9.853L7.832 9.76c-.093-.42.14-1.026.794-1.073l3.456-.232 4.763 7.279v-6.44l-1.214-.14c-.094-.513.28-.887.747-.933l3.223-.187z'
      ),
      // 3. OpenAI (Official LobeHub)
      openai: new Path2D(
        'M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z'
      ),
      // 4. Anthropic Claude (Official LobeHub)
      anthropic: new Path2D(
        'M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z'
      ),
      // 5. DeepSeek (Official LobeHub)
      deepseek: new Path2D(
        'M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z'
      ),
      // 6. Perplexity (Official LobeHub)
      perplexity: new Path2D(
        'M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z'
      ),
      // 7. Ollama (Official LobeHub)
      ollama: new Path2D(
        'M7.905 1.09c.216.085.411.225.588.41.295.306.544.744.734 1.263.191.522.315 1.1.362 1.68a5.054 5.054 0 012.049-.636l.051-.004c.87-.07 1.73.087 2.48.474.101.053.2.11.297.17.05-.569.172-1.134.36-1.644.19-.52.439-.957.733-1.264a1.67 1.67 0 01.589-.41c.257-.1.53-.118.796-.042.401.114.745.368 1.016.737.248.337.434.769.561 1.287.23.934.27 2.163.115 3.645l.053.04.026.019c.757.576 1.284 1.397 1.563 2.35.435 1.487.216 3.155-.534 4.088l-.018.021.002.003c.417.762.67 1.567.724 2.4l.002.03c.064 1.065-.2 2.137-.814 3.19l-.007.01.01.024c.472 1.157.62 2.322.438 3.486l-.006.039a.651.651 0 01-.747.536.648.648 0 01-.54-.742c.167-1.033.01-2.069-.48-3.123a.643.643 0 01.04-.617l.004-.006c.604-.924.854-1.83.8-2.72-.046-.779-.325-1.544-.8-2.273a.644.644 0 01.18-.886l.009-.006c.243-.159.467-.565.58-1.12a4.229 4.229 0 00-.095-1.974c-.205-.7-.58-1.284-1.105-1.683-.595-.454-1.383-.673-2.38-.61a.653.653 0 01-.632-.371c-.314-.665-.772-1.141-1.343-1.436a3.288 3.288 0 00-1.772-.332c-1.245.099-2.343.801-2.67 1.686a.652.652 0 01-.61.425c-1.067.002-1.893.252-2.497.703-.522.39-.878.935-1.066 1.588a4.07 4.07 0 00-.068 1.886c.112.558.331 1.02.582 1.269l.008.007c.212.207.257.53.109.785-.36.622-.629 1.549-.673 2.44-.05 1.018.186 1.902.719 2.536l.016.019a.643.643 0 01.095.69c-.576 1.236-.753 2.252-.562 3.052a.652.652 0 01-1.269.298c-.243-1.018-.078-2.184.473-3.498l.014-.035-.008-.012a4.339 4.339 0 01-.598-1.309l-.005-.019a5.764 5.764 0 01-.177-1.785c.044-.91.278-1.842.622-2.59l.012-.026-.002-.002c-.293-.418-.51-.953-.63-1.545l-.005-.024a5.352 5.352 0 01.093-2.49c.262-.915.777-1.701 1.536-2.269.06-.045.123-.09.186-.132-.159-1.493-.119-2.73.112-3.67.127-.518.314-.95.562-1.287.27-.368.614-.622 1.015-.737.266-.076.54-.059.797.042z'
      ),
      // 8. Mistral AI (Official LobeHub)
      mistral: new Path2D(
        'M3.428 3.4h3.429v3.428h3.429v3.429h-.002 3.431V6.828h3.427V3.4h3.43v13.714H24v3.429H13.714v-3.428h-3.428v-3.429h-3.43v3.428h3.43v3.429H0v-3.429h3.428V3.4zm10.286 13.715h3.428v-3.429h-3.427v3.429z'
      ),
      // 9. Meta Llama (Official LobeHub)
      meta: new Path2D(
        'M6.897 4c1.915 0 3.516.932 5.43 3.376l.282-.373c.19-.246.383-.484.58-.71l.313-.35C14.588 4.788 15.792 4 17.225 4c1.273 0 2.469.557 3.491 1.516l.218.213c1.73 1.765 2.917 4.71 3.053 8.026l.011.392.002.25c0 1.501-.28 2.759-.818 3.7l-.14.23-.108.153c-.301.42-.664.758-1.086 1.009l-.265.142-.087.04a3.493 3.493 0 01-.302.118 4.117 4.117 0 01-1.33.208c-.524 0-.996-.067-1.438-.215-.614-.204-1.163-.56-1.726-1.116l-.227-.235c-.753-.812-1.534-1.976-2.493-3.586l-1.43-2.41-.544-.895-1.766 3.13-.343.592C7.597 19.156 6.227 20 4.356 20c-1.21 0-2.205-.42-2.936-1.182l-.168-.184c-.484-.573-.837-1.311-1.043-2.189l-.067-.32a8.69 8.69 0 01-.136-1.288L0 14.468c.002-.745.06-1.49.174-2.23l.1-.573c.298-1.53.828-2.958 1.536-4.157l.209-.34c1.177-1.83 2.789-3.053 4.615-3.16L6.897 4zm-.033 2.615l-.201.01c-.83.083-1.606.673-2.252 1.577l-.138.199-.01.018c-.67 1.017-1.185 2.378-1.456 3.845l-.004.022a12.591 12.591 0 00-.207 2.254l.002.188c.004.18.017.36.04.54l.043.291c.092.503.257.908.486 1.208l.117.137c.303.323.698.492 1.17.492 1.1 0 1.796-.676 3.696-3.641l2.175-3.4.454-.701-.139-.198C9.11 7.3 8.084 6.616 6.864 6.616zm10.196-.552l-.176.007c-.635.048-1.223.359-1.82.933l-.196.198c-.439.462-.887 1.064-1.367 1.807l.266.398c.18.274.362.56.55.858l.293.475 1.396 2.335.695 1.114c.583.926 1.03 1.6 1.408 2.082l.213.262c.282.326.529.54.777.673l.102.05c.227.1.457.138.718.138.176.002.35-.023.518-.073.338-.104.61-.32.813-.637l.095-.163.077-.162c.194-.459.29-1.06.29-1.785l-.006-.449c-.08-2.871-.938-5.372-2.2-6.798l-.176-.189c-.67-.683-1.444-1.074-2.27-1.074z'
      )
    };

    // ── Big Pixel Agent Drawing Function (Iconic Clean Solid Black Eyes with Surprise Expression) ──
    const drawBigPixelAgent = ({
      x,
      y,
      size = 112,
      scaleX = 1,
      scaleY = 1,
      tilt = 0,
      isBlink = false,
      lookX = 0,
      lookY = 0,
      alpha = 1,
      highlightIntensity = 0,
      isSurprised = true
    }) => {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      ctx.translate(x, y);
      ctx.rotate(tilt);
      ctx.scale(scaleX, scaleY);

      const radius = size * 0.28;

      // Soft Radiance double border when unified
      if (highlightIntensity > 0.02) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * highlightIntensity})`;
        ctx.lineWidth = 5;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2 - 6, -size / 2 - 6, size + 12, size + 12, radius + 2);
          ctx.stroke();
        }

        const breath = Math.sin(tickRef.current * 0.04) * 4 + 7;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 * highlightIntensity})`;
        ctx.lineWidth = 1.6;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2 - 6 - breath, -size / 2 - 6 - breath, size + 12 + breath * 2, size + 12 + breath * 2, radius + 4);
          ctx.stroke();
        }
      }

      // 1. Crisp White Squircle Body (Size 112px)
      ctx.fillStyle = highlightIntensity > 0.5 ? '#FFFFFF' : '#F8FAFC';
      ctx.strokeStyle = highlightIntensity > 0.5 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = highlightIntensity > 0.5 ? 2.6 : 1.4;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-size / 2, -size / 2, size, size);
      }

      // 2. Pure, Clean Iconic Solid Black Capsule Pill Eyes (NO dots, NO smile curves)
      // When surprised: eyes dilate vertically into tall wide wonder capsules
      const eyeW = isSurprised ? Math.max(5.2, size * 0.155) : Math.max(5.0, size * 0.135);
      const eyeH = isBlink ? 3 : (isSurprised ? Math.max(9.0, size * 0.38) : Math.max(8.0, size * 0.32));
      const eyeR = eyeW / 2;
      const eyeY = -eyeH / 2 + lookY;
      const leftEyeX = -size * 0.18 - eyeW / 2 + lookX;
      const rightEyeX = size * 0.18 - eyeW / 2 + lookX;

      ctx.fillStyle = '#0A0B0F';
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(leftEyeX, eyeY, eyeW, eyeH, eyeR);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(rightEyeX, eyeY, eyeW, eyeH, eyeR);
        ctx.fill();
      } else {
        ctx.fillRect(leftEyeX, eyeY, eyeW, eyeH);
        ctx.fillRect(rightEyeX, eyeY, eyeW, eyeH);
      }

      ctx.restore();
    };

    // ── Pure Circular Logo Badge (62px diameter, ONLY the official logo vector) ──
    const drawLobeLogoBadge = ({
      x,
      y,
      logoKey,
      isActive = false,
      alpha = 1
    }) => {
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      const radius = 31;   // 62px diameter circular badge (expanded for visual presence)
      const logoSize = 33; // 33px crisp official logo vector

      // Soft Radiance pulsing ring when active
      if (isActive) {
        const pulse = Math.sin(tickRef.current * 0.08) * 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, radius + 5 + pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Badge Circle
      ctx.fillStyle = isActive ? '#FFFFFF' : '#0B0D13';
      ctx.strokeStyle = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = isActive ? 2.2 : 1.4;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Render Official LobeHub SVG Vector (Scaled 24x24 to 33x33)
      const logoPath = lobeLogos[logoKey];
      if (logoPath) {
        ctx.save();
        ctx.translate(x - logoSize / 2, y - logoSize / 2);
        ctx.scale(logoSize / 24, logoSize / 24);
        ctx.fillStyle = isActive ? '#0A0B0F' : '#FFFFFF';
        ctx.fill(logoPath);
        ctx.restore();
      }

      ctx.restore();
    };

    // ── Floating Knowledge Stream Particles ──
    let particles = [];
    const spawnParticle = (fromX, fromY, toX, toY, text) => {
      particles.push({
        startX: fromX,
        startY: fromY,
        targetX: toX,
        targetY: toY,
        progress: 0,
        speed: 0.016 + Math.random() * 0.008,
        text,
        jitterY: (Math.random() - 0.5) * 16
      });
    };

    // ── Speech / Insight Badge (Compact & Pristine) ──
    const drawBadge = ({ x, y, text = '', alpha = 1, type = 'normal' }) => {
      if (alpha <= 0.02 || !text) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      ctx.font = '10px "JetBrains Mono", monospace';
      const tm = ctx.measureText(text);
      const bw = tm.width + 18;
      const bh = 22;
      const bx = x - bw / 2;
      const by = y - bh / 2;

      ctx.fillStyle = '#0A0B0F';
      ctx.strokeStyle = type === 'match' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = type === 'match' ? 1.5 : 1.0;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 5);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeRect(bx, by, bw, bh);
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);

      ctx.restore();
    };

    const CYCLE_LENGTH = 1800; // ~30s silky continuous loop

    // ── 9 AI PROVIDERS & KNOWLEDGE VAULT (GEMINI BỎ THEO YÊU CẦU) ──
    const providers = [
      { id: 'openai',      name: 'OpenAI',       badgeLabel: 'OPENAI • GPT-4o / o3',          token: 'gpt.cot',          logoKey: 'openai' },
      { id: 'anthropic',   name: 'Anthropic',    badgeLabel: 'ANTHROPIC • CLAUDE 3.5',        token: 'claude.ast',       logoKey: 'anthropic' },
      { id: 'deepseek',    name: 'DeepSeek',     badgeLabel: 'DEEPSEEK • R1 REASONING',       token: 'r1.thought',       logoKey: 'deepseek' },
      { id: 'perplexity',  name: 'Perplexity',   badgeLabel: 'PERPLEXITY • LIVE WEB',         token: 'web.cit',          logoKey: 'perplexity' },
      { id: 'ollama',      name: 'Ollama',       badgeLabel: 'OLLAMA • LOCAL MODEL',          token: 'local.gguf',       logoKey: 'ollama' },
      { id: 'mistral',     name: 'Mistral AI',   badgeLabel: 'MISTRAL • CODESTRAL',           token: 'codestral.fill',   logoKey: 'mistral' },
      { id: 'meta',        name: 'Meta Llama',   badgeLabel: 'META • LLAMA 3.3',              token: 'llama.tensor',     logoKey: 'meta' },
      { id: 'notion',      name: 'Notion',       badgeLabel: 'NOTION • KNOWLEDGE VAULT',      token: 'vault.doc',        logoKey: 'notion' },
      { id: 'antigravity', name: 'Antigravity',  badgeLabel: 'ANTIGRAVITY • AGENTIC IDE',     token: 'agentic.mcp',      logoKey: 'antigravity' },
    ];

    const render = () => {
      tickRef.current++;
      const tick = tickRef.current;

      ctx.clearRect(0, 0, width, height);

      const cycle = tick % CYCLE_LENGTH;
      const centerX = width * 0.50;
      const centerY = height * 0.50;

      // Zero-G Buoyant Floating Oscillation
      const bob = Math.sin(tick * 0.022) * 4.8 + Math.cos(tick * 0.014) * 2.0;
      const isBlink = tick % 150 < 5;

      // ── BÁN KÍNH QUỸ ĐẠO HÌNH TRÒN ĐỀU NHAU (R = 205px, MỞ RỘNG TƯƠNG XỨNG VỚI AGENT & LOGO MỚI) ──
      const orbitRadius = Math.min(width * 0.38, 205);
      const orbitDrift = tick * 0.0018; // Nhẹ nhàng xoay chậm theo thời gian

      // Determine Active Provider and Acting Phase
      let activeProviderIndex = -1;
      let target_lookX = 0;
      let target_lookY = 0;
      let target_tilt = 0;
      let target_highlight = 0;
      let badgeText = '';
      let badgeAlpha = 0;
      let badgeType = 'normal';

      // ── STORYTELLING: CẢM XÚC NGẠC NHIÊN TRƯỚC VÒNG TRÒN TRI THỨC ──
      if (cycle < 220) {
        // Hồi 1: An bừng tỉnh, đôi mắt mở to ngạc nhiên ngắm nhìn 9 logo xoay quanh
        target_lookX = Math.sin(tick * 0.025) * 2.5;
        target_lookY = -1.5;
        target_tilt = Math.sin(tick * 0.03) * 0.03;
        badgeText = '✦ AI KNOWLEDGE ORBIT ✦';
        badgeAlpha = easeInOutSine(Math.min(1, cycle / 50));

      } else if (cycle < 1450) {
        // Hồi 2 -> 5: Lần lượt khám phá 9 providers theo quỹ đạo tròn
        // Mỗi provider nhận ~136 frames
        const pPhase = cycle - 220;
        const pDuration = 1230 / providers.length; // ~136 ticks per provider
        activeProviderIndex = Math.floor(pPhase / pDuration) % providers.length;
        const activeP = providers[activeProviderIndex];

        // Tính góc thực tế của provider đang active
        const activeAngle = (activeProviderIndex / providers.length) * Math.PI * 2 - Math.PI / 2 + orbitDrift;
        const targetX = centerX + Math.cos(activeAngle) * orbitRadius;
        const targetY = centerY + Math.sin(activeAngle) * orbitRadius;

        // Ánh mắt ngạc nhiên dõi theo logo đang phát sáng
        target_lookX = Math.cos(activeAngle) * 4.4;
        target_lookY = Math.sin(activeAngle) * 3.6;
        target_tilt = Math.cos(activeAngle) * 0.05;

        badgeText = activeP.badgeLabel;
        badgeAlpha = 1;

        // Bắn dòng hạt tri thức từ logo về trung tâm An
        if (tick % 22 === 0) {
          spawnParticle(targetX, targetY, centerX + target_lookX * 3, centerY + target_lookY * 3, activeP.token || 'synapse');
        }

      } else if (cycle < 1680) {
        // Hồi 6: TOÀN BỘ 9 AI LOGOS BỪNG SÁNG ĐỒNG BỘ TRÊN VÒNG TRÒN ✨
        target_highlight = 1;
        target_lookX = 0;
        target_lookY = 0;
        target_tilt = Math.sin(tick * 0.04) * 0.02;

        badgeText = '✦ 9 AI PROVIDERS SYNCHRONIZED ✦';
        badgeAlpha = 1;
        badgeType = 'match';

      } else {
        // Hồi 7: Chuyển tiếp mượt mà quay về chu kỳ mới (Zero-delta)
        const pEnd = (cycle - 1680) / 120;
        const eEnd = easeInOutCubic(pEnd);
        target_highlight = 1 - eEnd;
        badgeAlpha = 1 - eEnd;
      }

      // Smooth eye gaze and tilt interpolation
      const gaze = gazeRef.current;
      gaze.lookX += (target_lookX - gaze.lookX) * 0.065;
      gaze.lookY += (target_lookY - gaze.lookY) * 0.065;
      gaze.tilt += (target_tilt - gaze.tilt) * 0.06;
      gaze.highlightIntensity += (target_highlight - gaze.highlightIntensity) * 0.05;

      // ── 1. VẼ 9 AI LOGO HUY HIỆU TRÒN ĐỀU NHAU (40° INTERVALS) ──
      providers.forEach((p, i) => {
        const angle = (i / providers.length) * Math.PI * 2 - Math.PI / 2 + orbitDrift;
        const pX = centerX + Math.cos(angle) * orbitRadius;
        const pY = centerY + Math.sin(angle) * orbitRadius;
        const isActive = activeProviderIndex === i || gaze.highlightIntensity > 0.6;

        drawLobeLogoBadge({
          x: pX,
          y: pY,
          logoKey: p.logoKey,
          isActive
        });
      });

      // ── 2. VẼ DÒNG HẠT TRI THỨC TRÔI DẠT (Knowledge Stream) ──
      particles = particles.filter(p => {
        p.progress += p.speed;
        const curX = p.startX + (p.targetX - p.startX) * p.progress;
        const curY = p.startY + (p.targetY - p.startY) * p.progress + Math.sin(p.progress * Math.PI) * p.jitterY;
        const pAlpha = Math.sin(p.progress * Math.PI) * 0.75;

        if (pAlpha > 0.02) {
          ctx.save();
          ctx.globalAlpha = pAlpha;
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(p.text, curX, curY);
          ctx.restore();
        }

        return p.progress < 1;
      });

      // ── 3. VẼ TÁC TỬ PIXEL AGENT TO (136px, TĂNG KÍCH THƯỚC THEO YÊU CẦU) MẮT TO NGẠC NHIÊN ──
      const agentSize = 136;
      drawBigPixelAgent({
        x: centerX,
        y: centerY + bob,
        size: agentSize,
        scaleX: 1.0,
        scaleY: 1.0,
        tilt: gaze.tilt,
        isBlink,
        lookX: gaze.lookX,
        lookY: gaze.lookY,
        alpha: 1.0,
        highlightIntensity: gaze.highlightIntensity,
        isSurprised: true
      });

      // ── 4. VẼ HUY HIỆU TRẠNG THÁI NẰM GỌN TRÊN ĐẦU (KHÔNG CHẠM VÀO LOGO QUỸ ĐẠO) ──
      if (badgeAlpha > 0.01) {
        drawBadge({
          x: centerX,
          y: centerY + bob - agentSize / 2 - 18,
          text: badgeText,
          alpha: badgeAlpha,
          type: badgeType
        });
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block select-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default HeroCompanionMotion;