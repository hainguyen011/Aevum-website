import React, { useEffect, useRef } from 'react';

/**
 * HeroIoAMotionDiagram - Storytelling Motion: Chậm rãi, Mềm mại & Uyển chuyển
 * 
 * Thiết kế chuyển động:
 * 1. Nhịp điệu chậm rãi (~30s một chu kỳ) với không gian thở tự nhiên.
 * 2. Chuyển động lơ lửng đa tần số (composite zero-g buoyancy) siêu mượt.
 * 3. Ánh mắt lướt êm ái (smooth gaze interpolation), không giật chuyển hướng.
 * 4. Chuyển động bước đi lướt nhẹ (graceful floating glide & gentle tilt) khi hội quân.
 * 5. Độ sáng viền (radiance aura) nở dần mềm mại từ 0% -> 100% khi đạt đồng thuận.
 * 6. Bong bóng đối thoại nổi lên êm ái kèm hạt mật mã trôi nổi lững lờ.
 * 7. Hoàn toàn KHÔNG dùng đường kẻ, KHÔNG box-shadow, 100% vector phẳng sắc nét.
 */
export const HeroIoAMotionDiagram = () => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const tickRef = useRef(0);

  // Smooth gaze & state references for continuous interpolation
  const gazeRef = useRef({
    a1_lookX: 0, a1_lookY: 0,
    a2_lookX: 0, a2_lookY: 0,
    a3_lookX: 0, a3_lookY: 0,
    cand_lookX: 0,
    a1_highlightIntensity: 0,
    a2_highlightIntensity: 0,
    a3_highlightIntensity: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 780);
    let height = (canvas.height = 440);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = 440;
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

    // ── Dynamic Cryptic Cipher Text Scrambler ──
    const scrambleText = (baseText, tick, intensity = 0.2) => {
      const glyphs = '!@#$%^&*~<>?/01';
      let out = '';
      for (let i = 0; i < baseText.length; i++) {
        const ch = baseText[i];
        if (ch === ' ' || ch === ':' || ch === '>' || ch === '<' || ch === '_') {
          out += ch;
        } else if (Math.sin(tick * 0.12 + i * 1.8) > 0.88 - intensity) {
          const rIdx = Math.floor(Math.abs(Math.sin(tick * 0.2 + i * 4)) * glyphs.length) % glyphs.length;
          out += glyphs[rIdx];
        } else {
          out += ch;
        }
      }
      return out;
    };

    // ── Draw Pixel Question Mark (?) ──
    const drawPixelQuestionMark = (centerX, topY, size, alpha) => {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.fillStyle = '#FFFFFF';

      const p = Math.max(3.5, Math.round(size * 0.085));
      const qBlocks = [
        [-1, -4], [0, -4], [1, -4],
        [-2, -3], [2, -3],
        [2, -2],
        [1, -1],
        [0, 0],
        [0, 1],
        [0, 3]
      ];

      qBlocks.forEach(([bx, by]) => {
        ctx.fillRect(centerX + bx * p - p / 2, topY + by * p - p / 2, p, p);
      });

      ctx.restore();
    };

    // ── Graceful Floating Monospace Speech Bubble ──
    const drawSpeechBubble = ({
      x,
      y,
      text = '',
      alpha = 1,
      status = 'neutral' // 'neutral', 'match', 'error'
    }) => {
      if (alpha <= 0.02 || !text) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      ctx.font = '11px "JetBrains Mono", Consolas, Menlo, monospace';
      const textMetrics = ctx.measureText(text);
      const padX = 11;
      const bw = Math.max(48, textMetrics.width + padX * 2);
      const bh = 24;
      const bx = x - bw / 2;
      // Soft vertical floating rise as alpha enters
      const floatRise = (1 - Math.min(1, alpha)) * 6;
      const by = y - bh - 10 - floatRise;

      // Bubble Background (Strictly Flat Vector - Zero shadow)
      ctx.fillStyle = status === 'error' ? '#180E10' : '#0A0B0F';
      ctx.strokeStyle = status === 'match' 
        ? '#FFFFFF' 
        : status === 'error' 
          ? 'rgba(255, 255, 255, 0.45)' 
          : 'rgba(255, 255, 255, 0.32)';
      ctx.lineWidth = status === 'match' ? 1.8 : 1.0;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 5);
        ctx.fill();
        ctx.stroke();

        // Pointer Tail
        ctx.beginPath();
        ctx.moveTo(x - 4, by + bh);
        ctx.lineTo(x, by + bh + 5);
        ctx.lineTo(x + 4, by + bh);
        ctx.fillStyle = ctx.fillStyle;
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeRect(bx, by, bw, bh);
      }

      // Small status indicator dot
      let textOffsetX = 0;
      if (status === 'match') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(bx + 8, by + 10, 4, 4);
        textOffsetX = 4;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + textOffsetX, by + bh / 2 + 0.5);

      ctx.restore();
    };

    // ── Pixel Agent Drawing Function (Strictly Flat Vector - NO box-shadow) ──
    const drawPixelAgent = ({
      x,
      y,
      size = 54,
      scaleX = 1,
      scaleY = 1,
      rotation = 0,
      isBlink = false,
      lookX = 0,
      lookY = 0,
      alpha = 1,
      highlightIntensity = 0,
      expression = 'normal' // 'normal', 'happy', 'denied'
    }) => {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scaleX, scaleY);

      const radius = size * 0.28;

      // Soft swelling radiance double border when verified
      if (highlightIntensity > 0.02) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * highlightIntensity})`;
        ctx.lineWidth = 3.5;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2 - 4, -size / 2 - 4, size + 8, size + 8, radius + 2);
          ctx.stroke();
        }

        // Secondary subtle gentle breathing ring
        const breathSize = Math.sin(tickRef.current * 0.04) * 2 + 4;
        const breathAlpha = 0.22 * highlightIntensity;
        ctx.strokeStyle = `rgba(255, 255, 255, ${breathAlpha})`;
        ctx.lineWidth = 1.2;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2 - 4 - breathSize, -size / 2 - 4 - breathSize, size + 8 + breathSize * 2, size + 8 + breathSize * 2, radius + 3);
          ctx.stroke();
        }
      }

      // 1. Crisp White Squircle Body
      ctx.fillStyle = highlightIntensity > 0.5 ? '#FFFFFF' : '#F1F5F9';
      ctx.strokeStyle = highlightIntensity > 0.5 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = highlightIntensity > 0.5 ? 2.2 : 1.2;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-size / 2, -size / 2, size, size);
      }

      // 2. Eyes (Capsule Pills or Expressive curves)
      const eyeW = Math.max(3, size * 0.135);
      const eyeH = isBlink ? 2 : Math.max(5, size * 0.32);
      const eyeR = eyeW / 2;
      const eyeY = -eyeH / 2 + lookY;
      const leftEyeX = -size * 0.18 - eyeW / 2 + lookX;
      const rightEyeX = size * 0.18 - eyeW / 2 + lookX;

      ctx.fillStyle = '#0A0B0F';

      if (expression === 'happy' && !isBlink) {
        // Cute gentle happy closed curve eyes (^ ^)
        ctx.lineWidth = Math.max(2.4, eyeW);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0A0B0F';

        ctx.beginPath();
        ctx.arc(-size * 0.18 + lookX, -size * 0.05 + lookY, size * 0.11, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(size * 0.18 + lookX, -size * 0.05 + lookY, size * 0.11, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      } else if (expression === 'denied' && !isBlink) {
        // Squinted / denied eyes
        ctx.lineWidth = Math.max(2.4, eyeW);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0A0B0F';

        ctx.beginPath();
        ctx.moveTo(leftEyeX - 1, eyeY + eyeH / 2);
        ctx.lineTo(leftEyeX + eyeW + 1, eyeY + eyeH / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightEyeX - 1, eyeY + eyeH / 2);
        ctx.lineTo(rightEyeX + eyeW + 1, eyeY + eyeH / 2);
        ctx.stroke();
      } else {
        // Standard pill eyes
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
      }

      ctx.restore();
    };

    // ── Floating Cipher Glyphs drifting like slow cosmic dust ──
    let floatingGlyphs = [];
    const spawnGlyph = (x, y, targetX, targetY, char) => {
      floatingGlyphs.push({
        startX: x,
        startY: y,
        targetX,
        targetY,
        progress: 0,
        speed: 0.009 + Math.random() * 0.005, // Slower, gentler drift
        char,
        jitterY: (Math.random() - 0.5) * 16,
        waveFreq: 2 + Math.random() * 2
      });
    };

    // ── Global Network Nodes (Ambient agents across the world) ──
    const globalAmbientNodes = [
      { rx: 0.08, ry: 0.22, size: 42, phase: 0.5 },
      { rx: 0.12, ry: 0.78, size: 44, phase: 1.2 },
      { rx: 0.22, ry: 0.26, size: 40, phase: 2.1 },
      { rx: 0.35, ry: 0.82, size: 44, phase: 3.0 },
      { rx: 0.50, ry: 0.86, size: 40, phase: 4.4 },
      { rx: 0.70, ry: 0.16, size: 46, phase: 5.1 },
      { rx: 0.75, ry: 0.84, size: 42, phase: 1.8 },
      { rx: 0.88, ry: 0.24, size: 44, phase: 2.9 },
      { rx: 0.92, ry: 0.72, size: 46, phase: 3.7 }
    ];

    // Total cycle: 1800 frames (~30 seconds) for slow, spacious, graceful storytelling
    const CYCLE_LENGTH = 1800;

    const render = () => {
      tickRef.current++;
      const tick = tickRef.current;

      // 100% CLEAR TRANSPARENT CANVAS
      ctx.clearRect(0, 0, width, height);

      const cycle = tick % CYCLE_LENGTH;
      const centerY = height * 0.50;

      // ── Mềm mại: Dao động bồng bềnh phi tuyến tính (Zero-G Composite Buoyancy) ──
      const bob0 = Math.sin(tick * 0.022) * 3.4 + Math.cos(tick * 0.014) * 1.2;
      const bob2 = Math.sin(tick * 0.022 + 1.4) * 3.2 + Math.cos(tick * 0.014 + 1.4) * 1.0;
      const bob3 = Math.sin(tick * 0.022 + 2.8) * 3.0 + Math.cos(tick * 0.014 + 2.8) * 1.0;

      const isBlink0 = tick % 160 < 5;
      const isBlink2 = (tick + 45) % 160 < 5;
      const isBlink3 = (tick + 95) % 160 < 5;

      // ── TARGET STATE CALCULATIONS ──
      const originX = width * 0.44;

      // Agent 1
      let target_a1_x = originX;
      let target_a1_y = centerY + bob0;
      let target_a1_size = 76;
      let target_a1_lookX = 0;
      let target_a1_lookY = 0;
      let target_a1_highlight = 0;
      let a1_expression = 'normal';
      let a1_scaleY = 1.0;

      let qMarkAlpha = 0;
      let a1_bubbleText = '';
      let a1_bubbleAlpha = 0;
      let a1_bubbleStatus = 'neutral';

      // Agent 2
      let a2_visible = false;
      let target_a2_x = width * 0.78;
      let target_a2_y = centerY + bob2;
      let target_a2_size = 66;
      let a2_scale = 1.0;
      let a2_scaleY = 1.0;
      let a2_rotation = 0;
      let target_a2_lookX = 0;
      let target_a2_lookY = 0;
      let a2_alpha = 0;
      let target_a2_highlight = 0;
      let a2_expression = 'normal';
      let a2_bubbleText = '';
      let a2_bubbleAlpha = 0;
      let a2_bubbleStatus = 'neutral';

      // Candidate Incompatible Agent
      let cand_visible = false;
      let cand_x = width * 0.60;
      let cand_y = height * 0.22;
      let cand_size = 52;
      let cand_alpha = 0;
      let target_cand_lookX = 0;
      let cand_expression = 'normal';
      let cand_bubbleText = '';
      let cand_bubbleAlpha = 0;
      let cand_bubbleStatus = 'neutral';

      // Agent 3 (Target Ideal Partner)
      let a3_visible = false;
      let target_a3_x = width * 0.82;
      let target_a3_y = centerY + bob3;
      let target_a3_size = 66;
      let a3_scale = 1.0;
      let a3_scaleY = 1.0;
      let a3_rotation = 0;
      let target_a3_lookX = -2.4;
      let target_a3_lookY = 0;
      let a3_alpha = 0;
      let target_a3_highlight = 0;
      let a3_expression = 'normal';
      let a3_bubbleText = '';
      let a3_bubbleAlpha = 0;
      let a3_bubbleStatus = 'neutral';

      let ambientBaseAlpha = 0.22;

      // ── STORYTELLING PHASES (1800 FRAMES ~ 30S) ──

      // ── HỒI 1: Tác tử ban đầu suy tư trong tĩnh lặng (0 - 220) ──
      if (cycle < 220) {
        target_a1_x = originX;
        target_a1_size = 76;
        qMarkAlpha = easeInOutSine(Math.min(1, cycle / 45));

        // Các agent xung quanh từ từ hiện diện nhẹ nhàng từ bóng tối, tuyệt đối không nhấp nháy
        ambientBaseAlpha = 0.22 * easeInOutSine(Math.min(1, cycle / 120));

        if (cycle < 80) {
          target_a1_lookX = 0; target_a1_lookY = -2.2;
        } else if (cycle < 150) {
          target_a1_lookX = -2.2; target_a1_lookY = -0.5;
        } else {
          target_a1_lookX = 2.4; target_a1_lookY = -0.5;
        }

      // ── HỒI 2: Dấu hỏi tan, phát chuỗi ký tự mật mã lững lờ trôi (220 - 420) ──
      } else if (cycle < 420) {
        target_a1_x = originX;
        target_a1_size = 76;
        qMarkAlpha = Math.max(0, 1 - (cycle - 220) / 30);

        a1_bubbleAlpha = easeOutCubic(Math.min(1, (cycle - 240) / 35));
        a1_bubbleText = scrambleText('ádsa@!#@!#!@!# d!#@#!', tick, 0.28);
        target_a1_lookX = 2.4;
        target_a1_lookY = 0;

        // Ký tự trôi nổi nhịp nhàng, êm dịu sang bên phải
        if (tick % 18 === 0) {
          const glyphs = ['ádsa', '@!#', 'd!#', '#!@', '0x1'];
          const gChar = glyphs[Math.floor(Math.random() * glyphs.length)];
          spawnGlyph(originX + target_a1_size / 2, centerY - 10, width * 0.78, centerY, gChar);
        }

      // ── HỒI 3: Agent 2 xuất hiện, phản hồi và kiểm tra đồng thuận (420 - 640) ──
      } else if (cycle < 640) {
        target_a1_x = originX;
        target_a1_size = 76;
        target_a1_lookX = 2.4;
        a1_bubbleAlpha = Math.max(0.3, 1 - (cycle - 420) / 90);
        a1_bubbleText = 'ádsa@!#@!#!@!# d!#@#!';

        a2_visible = true;
        target_a2_x = width * 0.78;
        const pPop = Math.min(1, (cycle - 420) / 50);
        a2_scale = easeOutCubic(pPop);
        a2_alpha = easeOutCubic(pPop);
        target_a2_lookX = -2.4;

        if (cycle >= 470 && cycle < 560) {
          // Agent 2 phản hồi mật mã kiểm tra
          a2_bubbleAlpha = easeOutCubic(Math.min(1, (cycle - 470) / 30));
          a2_bubbleText = scrambleText('d!#@#! >> ACK_200 <<', tick, 0.20);
        } else if (cycle >= 560) {
          // Đồng thuận xác thực!
          a1_bubbleAlpha = 1;
          a1_bubbleText = 'CONSENSUS ✓';
          a1_bubbleStatus = 'match';

          a2_bubbleAlpha = 1;
          a2_bubbleText = 'VERIFIED ✓';
          a2_bubbleStatus = 'match';

          target_a1_highlight = 1;
          target_a2_highlight = 1;
          a1_expression = 'happy';
          a2_expression = 'happy';
        }

      // ── HỒI 4: CẢ 2 BỪNG SÁNG & AGENT 2 LƯỚT BƯỚC ÊM ÁI VỀ CHUNG ĐỘI (640 - 950) ──
      } else if (cycle < 950) {
        const pWalk = Math.min(1, (cycle - 640) / 160); // 160 frames (~2.7s) lướt rất chậm và êm
        const eWalk = easeInOutCubic(pWalk);

        target_a1_highlight = 1;
        target_a2_highlight = 1;
        a1_expression = 'happy';
        a2_expression = 'happy';

        // Agent 1 trượt nhẹ nhường chỗ
        target_a1_x = originX + (width * 0.35 - originX) * eWalk;
        target_a1_size = 76 - 8 * eWalk; // 76 -> 68px
        target_a1_lookX = 2.0;

        // Agent 2 lướt chuyển động uyển chuyển
        a2_visible = true;
        a2_alpha = 1;
        target_a2_x = width * 0.78 + (width * 0.49 - width * 0.78) * eWalk;

        if (pWalk < 0.98) {
          // Nhịp bước lướt phi trọng lực mềm mại
          const stepPhase = pWalk * Math.PI * 4; // chỉ 2 bước dài êm dịu
          const floatOffset = Math.sin(stepPhase) * 3.5 * (1 - pWalk * 0.2);
          target_a2_y = centerY + bob2 - floatOffset;
          a2_rotation = Math.sin(stepPhase) * 0.035 * (1 - pWalk);
          target_a2_lookX = -2.5; // nhìn bạn đồng hành
        } else {
          target_a2_y = centerY + bob2;
          a2_rotation = 0;
          const bounce = Math.sin((cycle - 800) * 0.08) * 0.04;
          if (cycle < 860) {
            a1_scaleY = 1.0 + bounce;
            a2_scaleY = 1.0 + bounce;
          }
          target_a1_lookX = 2.4;
          target_a2_lookX = 2.4;
        }

        ambientBaseAlpha = 0.28;

      // ── HỒI 5: THĂM DÒ MẠNG LƯỚI - AGENT KHÔNG HỢP LẮC ĐẦU TỪ CHỐI (950 - 1260) ──
      } else if (cycle < 1260) {
        target_a1_x = width * 0.35; target_a1_size = 68;
        a2_visible = true; a2_alpha = 1; target_a2_x = width * 0.49; target_a2_size = 66;
        target_a1_highlight = 1; target_a2_highlight = 1;

        cand_visible = true;
        cand_alpha = easeOutCubic(Math.min(1, (cycle - 950) / 45));

        if (cycle < 1070) {
          // Squad ngước nhìn thăm dò
          target_a1_lookX = 1.5; target_a1_lookY = -2.0;
          target_a2_lookX = 1.5; target_a2_lookY = -2.0;

          a1_bubbleAlpha = easeOutCubic(Math.min(1, (cycle - 960) / 35));
          a1_bubbleText = scrambleText('ping@!#? verify(IoA)', tick, 0.18);

          target_cand_lookX = -2.2;
        } else if (cycle < 1180) {
          // Lắc đầu từ chối chậm rãi, nhẹ nhàng
          target_cand_lookX = Math.sin(tick * 0.22) * 2.6;
          cand_expression = 'denied';
          cand_bubbleAlpha = 1;
          cand_bubbleText = 'ERR: 403_MISMATCH !#@';
          cand_bubbleStatus = 'error';

          target_a1_lookX = 0; target_a1_lookY = 1.2;
          target_a2_lookX = 0; target_a2_lookY = 1.2;
        } else {
          // Tan biến như làn sương mỏng
          cand_alpha = Math.max(0, 1 - (cycle - 1180) / 60);
          cand_bubbleAlpha = cand_alpha;
          a1_bubbleAlpha = 0;
        }

      // ── HỒI 6: TÌM THẤY ĐỐI TÁC PHÙ HỢP & HOÀN THIỆN SUPER SQUAD (1260 - 1620) ──
      } else if (cycle < 1620) {
        target_a1_x = width * 0.35; target_a1_size = 68;
        a2_visible = true; a2_alpha = 1; target_a2_x = width * 0.49; target_a2_size = 66;
        target_a1_highlight = 1; target_a2_highlight = 1;

        a3_visible = true;
        a3_alpha = easeOutCubic(Math.min(1, (cycle - 1260) / 45));

        if (cycle < 1370) {
          target_a1_lookX = 2.4; target_a1_lookY = 0;
          target_a2_lookX = 2.4; target_a2_lookY = 0;

          a2_bubbleAlpha = easeOutCubic(Math.min(1, (cycle - 1270) / 35));
          a2_bubbleText = 'ádsa@!#@!#!@!# d!#@#!';

          target_a3_lookX = -2.4;
          if (cycle >= 1320) {
            a3_bubbleAlpha = easeOutCubic(Math.min(1, (cycle - 1320) / 30));
            a3_bubbleText = scrambleText('d!#@#! >> VERIFIED_IoA', tick, 0.18);
          }
        } else if (cycle < 1440) {
          // CẢ 3 BỪNG SÁNG ĐỒNG THUẬN TUYỆT ĐỐI
          a2_bubbleAlpha = 1;
          a2_bubbleText = 'CONSENSUS ✓';
          a2_bubbleStatus = 'match';

          a3_bubbleAlpha = 1;
          a3_bubbleText = 'MATCHED! ✨';
          a3_bubbleStatus = 'match';

          target_a1_highlight = 1;
          target_a2_highlight = 1;
          target_a3_highlight = 1;
          a1_expression = 'happy';
          a2_expression = 'happy';
          a3_expression = 'happy';

        } else {
          // Agent 3 lướt chậm rãi về kết nạp thành Super Squad 3 Tác Tử
          const pJoin = Math.min(1, (cycle - 1440) / 150);
          const eJoin = easeInOutCubic(pJoin);

          target_a1_x = width * 0.35 - 12 * eJoin;
          target_a2_x = width * 0.49 - 8 * eJoin;
          target_a3_x = width * 0.82 + (width * 0.62 - width * 0.82) * eJoin;

          if (pJoin < 0.98) {
            const stepPhase = pJoin * Math.PI * 4;
            const floatOffset = Math.sin(stepPhase) * 3.5 * (1 - pJoin * 0.2);
            target_a3_y = centerY + bob3 - floatOffset;
            a3_rotation = Math.sin(stepPhase) * 0.035 * (1 - pJoin);
            target_a3_lookX = -2.5;
          } else {
            target_a3_y = centerY + bob3;
            a3_rotation = 0;
            target_a1_lookX = 2.2;
            target_a2_lookX = 2.2;
            target_a3_lookX = 2.2;
          }

          target_a1_highlight = 1;
          target_a2_highlight = 1;
          target_a3_highlight = 1;
          a1_expression = 'happy';
          a2_expression = 'happy';
          a3_expression = 'happy';

          ambientBaseAlpha = 0.22;
        }

      // ── HỒI 7: Chuyển tiếp êm dịu, liền mạch tuyệt đối quay về vòng lặp (1580 - 1800) ──
      } else {
        const pEnd = (cycle - 1580) / 220;
        const eEnd = easeInOutCubic(pEnd);

        const squad_a1_x = width * 0.35 - 12;
        const squad_a2_x = width * 0.49 - 8;
        const squad_a3_x = width * 0.62;

        // Agent 1 trượt nhẹ từ vị trí đội hình trở về trung tâm và lớn dần lên 76px
        target_a1_x = squad_a1_x + (originX - squad_a1_x) * eEnd;
        target_a1_size = 68 + 8 * eEnd;
        target_a1_lookX = 2.2 * (1 - eEnd);
        target_a1_lookY = 0;

        // Agent 2 & Agent 3 GIỮ NGUYÊN VỊ TRÍ ĐỘI HÌNH và mờ dần biến mất (Tuyệt đối không nhảy vị trí)
        target_a2_x = squad_a2_x;
        target_a2_y = centerY + bob2;
        target_a3_x = squad_a3_x;
        target_a3_y = centerY + bob3;

        a2_visible = true;
        a2_alpha = Math.max(0, 1 - eEnd);
        a3_visible = true;
        a3_alpha = Math.max(0, 1 - eEnd);

        target_a1_highlight = 1 - eEnd;
        target_a2_highlight = 1 - eEnd;
        target_a3_highlight = 1 - eEnd;

        // Các agent xung quanh mờ dần và BIẾN MẤT HOÀN TOÀN khi kết thúc (không nhấp nháy)
        ambientBaseAlpha = 0.22 * Math.max(0, 1 - eEnd);
      }

      // ── NỘI SUY ÁNH MẮT & ĐỘ SÁNG MỀM MẠI (Smooth Continuous Interpolation) ──
      const gaze = gazeRef.current;
      const smoothFactor = 0.065; // Lướt mắt êm ái
      gaze.a1_lookX += (target_a1_lookX - gaze.a1_lookX) * smoothFactor;
      gaze.a1_lookY += (target_a1_lookY - gaze.a1_lookY) * smoothFactor;
      gaze.a2_lookX += (target_a2_lookX - gaze.a2_lookX) * smoothFactor;
      gaze.a2_lookY += (target_a2_lookY - gaze.a2_lookY) * smoothFactor;
      gaze.a3_lookX += (target_a3_lookX - gaze.a3_lookX) * smoothFactor;
      gaze.a3_lookY += (target_a3_lookY - gaze.a3_lookY) * smoothFactor;
      gaze.cand_lookX += (target_cand_lookX - gaze.cand_lookX) * smoothFactor;

      // Nở độ sáng êm ái
      const glowFactor = 0.045;
      gaze.a1_highlightIntensity += (target_a1_highlight - gaze.a1_highlightIntensity) * glowFactor;
      gaze.a2_highlightIntensity += (target_a2_highlight - gaze.a2_highlightIntensity) * glowFactor;
      gaze.a3_highlightIntensity += (target_a3_highlight - gaze.a3_highlightIntensity) * glowFactor;

      // ── 1. VẼ MẠNG LƯỚI TÁC TỬ TOÀN CẦU (Ambient Global Agents - Mờ dần biến mất, Không nhấp nháy) ──
      if (ambientBaseAlpha > 0.005) {
        globalAmbientNodes.forEach((amb, i) => {
          const ambX = width * amb.rx;
          const ambY = height * amb.ry + Math.sin(tick * 0.018 + amb.phase) * 2.5;
          const isAmbBlink = (tick + i * 50) % 180 < 5;

          drawPixelAgent({
            x: ambX,
            y: ambY,
            size: amb.size,
            isBlink: isAmbBlink,
            lookX: 0,
            lookY: 0,
            alpha: ambientBaseAlpha,
            highlightIntensity: 0 // TUYỆT ĐỐI KHÔNG NHẤP NHÁY VIỀN
          });
        });
      }

      // ── 2. VẼ CÁC KÝ TỰ MẬT MÃ TRÔI LỮNG LỜ (Cosmic Floating Glyphs) ──
      floatingGlyphs = floatingGlyphs.filter(g => {
        g.progress += g.speed;
        const curX = g.startX + (g.targetX - g.startX) * g.progress;
        const curY = g.startY + (g.targetY - g.startY) * g.progress + Math.sin(g.progress * Math.PI * g.waveFreq) * g.jitterY;
        const gAlpha = Math.sin(g.progress * Math.PI) * 0.65;

        if (gAlpha > 0.02) {
          ctx.save();
          ctx.globalAlpha = gAlpha;
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(g.char, curX, curY);
          ctx.restore();
        }

        return g.progress < 1;
      });

      // ── 3. VẼ CANDIDATE INCOMPATIBLE AGENT ──
      if (cand_visible && cand_alpha > 0.01) {
        drawPixelAgent({
          x: cand_x,
          y: cand_y + Math.sin(tick * 0.025 + 2.0) * 2.2,
          size: cand_size,
          lookX: gaze.cand_lookX,
          lookY: 0,
          alpha: cand_alpha,
          expression: cand_expression
        });

        if (cand_bubbleAlpha > 0.01) {
          drawSpeechBubble({
            x: cand_x,
            y: cand_y - cand_size / 2,
            text: cand_bubbleText,
            alpha: cand_bubbleAlpha,
            status: cand_bubbleStatus
          });
        }
      }

      // ── 4. VẼ AGENT 3 (Target Partner) ──
      if (a3_visible && a3_alpha > 0.01) {
        drawPixelAgent({
          x: target_a3_x,
          y: target_a3_y,
          size: target_a3_size * a3_scale,
          scaleX: a3_scale,
          scaleY: a3_scaleY,
          rotation: a3_rotation,
          isBlink: isBlink3,
          lookX: gaze.a3_lookX,
          lookY: gaze.a3_lookY,
          alpha: a3_alpha,
          highlightIntensity: gaze.a3_highlightIntensity,
          expression: a3_expression
        });

        if (a3_bubbleAlpha > 0.01) {
          drawSpeechBubble({
            x: target_a3_x,
            y: target_a3_y - target_a3_size / 2,
            text: a3_bubbleText,
            alpha: a3_bubbleAlpha,
            status: a3_bubbleStatus
          });
        }
      }

      // ── 5. VẼ AGENT 2 (First Partner) ──
      if (a2_visible && a2_alpha > 0.01) {
        drawPixelAgent({
          x: target_a2_x,
          y: target_a2_y,
          size: target_a2_size * a2_scale,
          scaleX: a2_scale,
          scaleY: a2_scaleY,
          rotation: a2_rotation,
          isBlink: isBlink2,
          lookX: gaze.a2_lookX,
          lookY: gaze.a2_lookY,
          alpha: a2_alpha,
          highlightIntensity: gaze.a2_highlightIntensity,
          expression: a2_expression
        });

        if (a2_bubbleAlpha > 0.01) {
          drawSpeechBubble({
            x: target_a2_x,
            y: target_a2_y - target_a2_size / 2,
            text: a2_bubbleText,
            alpha: a2_bubbleAlpha,
            status: a2_bubbleStatus
          });
        }
      }

      // ── 6. VẼ AGENT 1 (Hero Founder) ──
      drawPixelAgent({
        x: target_a1_x,
        y: target_a1_y,
        size: target_a1_size,
        scaleY: a1_scaleY,
        isBlink: isBlink0,
        lookX: gaze.a1_lookX,
        lookY: gaze.a1_lookY,
        alpha: 1.0,
        highlightIntensity: gaze.a1_highlightIntensity,
        expression: a1_expression
      });

      // Dấu hỏi to trên đầu ở Hồi 1
      if (qMarkAlpha > 0.01) {
        const qBob = Math.sin(tick * 0.05) * 3;
        drawPixelQuestionMark(target_a1_x, target_a1_y - target_a1_size / 2 - 28 + qBob, target_a1_size, qMarkAlpha);
      }

      // Bong bóng đối thoại của Agent 1
      if (a1_bubbleAlpha > 0.01) {
        drawSpeechBubble({
          x: target_a1_x,
          y: target_a1_y - target_a1_size / 2,
          text: a1_bubbleText,
          alpha: a1_bubbleAlpha,
          status: a1_bubbleStatus
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

export default HeroIoAMotionDiagram;
