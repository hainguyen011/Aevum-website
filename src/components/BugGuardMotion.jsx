import React, { useEffect, useRef } from 'react';

/**
 * BugGuardMotion - Pixel Agent Zero-Trust Guardian & Mini Pixel Agents
 * 
 * Concept:
 * 1. Pixel Agent Guardian đứng ở trung tâm canh giữ ranh giới Zero-Trust.
 * 2. Đằng sau lưng là các bạn MINI PIXEL AGENT tí hon núp che chở, nhún nhảy và run rẩy khi có bọ tới.
 * 3. Các con bọ cánh cứng sử dụng EMOJI 🪲 bò nhào tới từ bên trái.
 * 4. Khi Bọ 🪲 chạm ranh giới, Khiên Zero-Trust hất bật nảy (BOOP!), bọ lộn nhào văng ngược ra ngoài.
 * 5. Các Mini Pixel Agent an toàn thò đầu ra nhảy cẫng lên ăn mừng cực kỳ đáng yêu!
 * 
 * 100% Flat Vector, mắt viên thuốc đen đặc đúng chuẩn Pixel Agent.
 */
export const BugGuardMotion = ({ activeLang = 'vi' }) => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 580);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = 360;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Silky Easing ──
    const easeOutQuad = (t) => t * (2 - t);

    // ── 1. DRAW PIXEL AGENT GUARDIAN ──
    const drawGuardianAgent = ({
      x,
      y,
      size = 74,
      tilt = 0,
      lookX = -4,
      lookY = 0,
      isBlink = false,
      recoilX = 0
    }) => {
      ctx.save();
      ctx.translate(x + recoilX, y);
      ctx.rotate(tilt);

      const radius = size * 0.28;

      // Squircle Body
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.6;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-size / 2, -size / 2, size, size);
      }

      // Pure Solid Black Capsule Eyes (NO dots, NO smile curves)
      const eyeW = Math.max(5.0, size * 0.155);
      const eyeH = isBlink ? 2.5 : size * 0.35;
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

    // ── 2. DRAW ZERO-TRUST DEFLECTION SHIELD ──
    const drawShield = ({ x, y, impact = 0 }) => {
      ctx.save();
      const shieldH = 120 + impact * 15;
      const shieldW = 24 + impact * 8;

      // Shockwave Wavefront when hitting a bug
      if (impact > 0.05) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${impact * 0.85})`;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(x, y, 40 + (1 - impact) * 35, -Math.PI * 0.55, Math.PI * 0.55);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${impact * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, 60 + (1 - impact) * 45, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.stroke();
      }

      // Main Shield Capsule
      ctx.fillStyle = impact > 0.1 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = impact > 0.1 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = impact > 0.1 ? 2.8 : 1.8;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(x - shieldW / 2, y - shieldH / 2, shieldW, shieldH, shieldW / 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(x - shieldW / 2, y - shieldH / 2, shieldW, shieldH);
      }

      // Minimalist grid crossbars
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.0;
      for (let i = -3; i <= 3; i++) {
        const lineY = y + i * 14;
        ctx.beginPath();
        ctx.moveTo(x - shieldW * 0.35, lineY);
        ctx.lineTo(x + shieldW * 0.35, lineY);
        ctx.stroke();
      }

      ctx.restore();
    };

    // ── 3. DRAW ADORABLE MINI PIXEL AGENTS NÚP SAU LƯNG ──
    const drawMiniPixelAgent = ({
      x,
      y,
      size = 36,
      tilt = 0,
      lookX = -2,
      lookY = 0,
      isScared = false,
      isHappy = false,
      bob = 0,
      scale = 1
    }) => {
      ctx.save();
      ctx.translate(x, y + bob);
      ctx.scale(scale, scale);
      ctx.rotate(tilt);

      const radius = size * 0.28;

      // Squircle Body
      ctx.fillStyle = isScared ? '#E2E8F0' : '#FFFFFF';
      ctx.strokeStyle = isScared ? 'rgba(239, 68, 68, 0.45)' : 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.3;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-size / 2, -size / 2, size, size);
      }

      // Pure Solid Black Capsule Eyes (NO dots, NO smile curves)
      const eyeW = Math.max(3.8, size * 0.16);
      const eyeH = isScared ? size * 0.22 : (isHappy ? size * 0.38 : size * 0.32);
      const eyeR = eyeW / 2;
      const eyeY = -eyeH / 2 + (isScared ? 1.5 : 0) + lookY;
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

      // Cute Joy Sparks when Happy
      if (isHappy) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('✦', -size * 0.5 - 3, -size * 0.4);
        ctx.fillText('✦', size * 0.5 + 3, -size * 0.5);
      }

      ctx.restore();
    };

    // ── 4. DRAW BEETLE EMOJI (🪲) ──
    const drawBeetleEmoji = ({
      x,
      y,
      rotation = 0,
      size = 32,
      alpha = 1
    }) => {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.font = `${size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪲', 0, 0);

      ctx.restore();
    };

    // ── CONTINUOUS ENTITY-BASED LOOP STATE ──
    // 2 alternating beetles continuously marching in rhythm
    const beetles = [
      { id: 1, x: -40, yOffset: -8, state: 'crawl', bounceProgress: 0, rot: Math.PI * 0.45 },
      { id: 2, x: -240, yOffset: 12, state: 'crawl', bounceProgress: 0, rot: Math.PI * 0.45 }
    ];

    let shieldImpact = 0;
    let globalHappyTimer = 0;

    const render = () => {
      tickRef.current++;
      const tick = tickRef.current;

      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.52;
      const agentX = width * 0.45;
      const agentY = centerY;
      const shieldX = agentX - 48;

      // Agent Floating Motion
      const agentBob = Math.sin(tick * 0.035) * 3.8;
      const isBlink = tick % 130 < 5;

      // Shield Impact Decay
      shieldImpact = Math.max(0, shieldImpact - 0.04);
      globalHappyTimer = Math.max(0, globalHappyTimer - 1);

      let isBugNearby = false;
      let recoilX = 0;
      let lookX = -4;

      // ── UPDATE & DRAW CONTINUOUS BEETLES (🪲) ──
      beetles.forEach((b) => {
        const bugY = centerY + b.yOffset;

        if (b.state === 'crawl') {
          // Crawling towards shield
          b.x += 2.4;
          // Natural crawl tilt towards the right
          b.rot = Math.PI * 0.45 + Math.sin(tick * 0.25) * 0.12;

          // Check if approaching shield
          const distToShield = shieldX - b.x;
          if (distToShield > 0 && distToShield < 95) {
            isBugNearby = true;
          }

          // Collision with shield! -> BOOP! Deflect!
          if (b.x >= shieldX - 6) {
            b.state = 'bounce';
            b.bounceProgress = 0;
            shieldImpact = 1.0; // Trigger shield flash & shockwave
            globalHappyTimer = 45; // Mini agents cheer!
          }

        } else if (b.state === 'bounce') {
          // Bouncing backwards & tumbling
          b.bounceProgress += 0.024;
          const p = b.bounceProgress;

          // Arc backwards
          b.x = (shieldX - 6) - easeOutQuad(p) * 160;
          b.rot -= 0.22; // Rapid tumble spin

          // When bounced away far enough -> reset off-screen
          if (p >= 1.0) {
            b.state = 'crawl';
            b.x = -60 - Math.random() * 80;
            b.yOffset = (Math.random() - 0.5) * 24;
            b.rot = Math.PI * 0.45;
          }
        }

        // Draw this Beetle Emoji 🪲
        drawBeetleEmoji({
          x: b.x,
          y: bugY - (b.state === 'bounce' ? Math.sin(b.bounceProgress * Math.PI) * 32 : 0),
          rotation: b.rot,
          size: 32,
          alpha: b.x > -30 ? 1 : Math.max(0, (b.x + 50) / 20)
        });
      });

      // Recoil & Eye gaze
      if (shieldImpact > 0.05) {
        recoilX = Math.sin(shieldImpact * Math.PI) * 3.5;
        lookX = -6;
      } else if (globalHappyTimer > 15) {
        lookX = 3; // Turn around looking warmly at mini pixel agents
      } else {
        lookX = isBugNearby ? -5 : -3;
      }

      // ── DRAW ZERO-TRUST BOUNDARY DASHED LINE ──
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(25, centerY + 56);
      ctx.lineTo(width - 25, centerY + 56);
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertical Sentinel Marker
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(shieldX, centerY - 70);
      ctx.lineTo(shieldX, centerY + 70);
      ctx.stroke();

      // ── DRAW SHIELD ──
      drawShield({
        x: shieldX,
        y: centerY,
        impact: shieldImpact
      });

      // ── DRAW PIXEL AGENT GUARDIAN ──
      drawGuardianAgent({
        x: agentX,
        y: agentY + agentBob,
        size: 74,
        tilt: isBugNearby ? -0.03 : (globalHappyTimer > 0 ? 0.02 : 0),
        lookX,
        lookY: 0,
        isBlink,
        recoilX
      });

      // ── DRAW 3 ADORABLE MINI PIXEL AGENTS NÚP SAU LƯNG ──
      const isScared = isBugNearby && shieldImpact < 0.1;
      const isHappy = globalHappyTimer > 0;
      const huddleX = isScared ? -10 : 0;
      const buddiesBaseX = agentX + 58 + huddleX;

      // Mini Agent 1: Top-right shoulder (Size 36px)
      const b1Jump = isHappy ? -Math.abs(Math.sin(tick * 0.16)) * 14 : 0;
      const b1Bob = Math.sin(tick * 0.04) * 2.8 + b1Jump;
      drawMiniPixelAgent({
        x: buddiesBaseX,
        y: centerY - 24,
        size: 36,
        tilt: isScared ? -0.05 : (isHappy ? 0.06 : 0),
        lookX: isScared ? -3 : (isHappy ? 1 : -2),
        isScared,
        isHappy,
        bob: b1Bob
      });

      // Mini Agent 2: Middle-right (Size 34px)
      const b2Jump = isHappy ? -Math.abs(Math.sin(tick * 0.16 + 0.8)) * 16 : 0;
      const b2Bob = Math.sin(tick * 0.04 + 1.2) * 3.2 + b2Jump;
      drawMiniPixelAgent({
        x: buddiesBaseX + 38,
        y: centerY + 2,
        size: 34,
        tilt: isScared ? -0.06 : (isHappy ? -0.05 : 0),
        lookX: isScared ? -3 : (isHappy ? -1 : -2),
        isScared,
        isHappy,
        bob: b2Bob
      });

      // Mini Agent 3: Bottom-right (Size 32px)
      const b3Jump = isHappy ? -Math.abs(Math.sin(tick * 0.16 + 1.6)) * 12 : 0;
      const b3Bob = Math.sin(tick * 0.04 + 2.4) * 2.5 + b3Jump;
      drawMiniPixelAgent({
        x: buddiesBaseX + 4,
        y: centerY + 28,
        size: 32,
        tilt: isScared ? -0.04 : (isHappy ? 0.04 : 0),
        lookX: isScared ? -3 : (isHappy ? 2 : -2),
        isScared,
        isHappy,
        bob: b3Bob
      });

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
    <div className="w-full h-full min-h-[360px] flex items-center justify-center relative select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default BugGuardMotion;
