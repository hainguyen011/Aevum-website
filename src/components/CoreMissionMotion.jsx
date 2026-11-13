import React, { useEffect, useRef } from 'react';

/**
 * CoreMissionMotion - V-Formation 5 Pixel Agents with Rich 3D Occlusion & Performance Optimization
 * 
 * Tối ưu hóa:
 * 1. KHÔNG LẶP LẠI LIÊN TỤC: Chỉ phát diễn hoạt một lần duy nhất khi người dùng scroll qua section.
 *    - Khi chạy xong 520 ticks (~8.5s) và đội hình khóa ngầu, vòng lặp RAF dừng hoàn toàn (0% CPU/GPU).
 * 2. TỐI ƯU HIỆU NĂNG - KHÔNG CHẠY SONG SONG:
 *    - Sử dụng IntersectionObserver: khi section nằm ngoài màn hình, hủy hoàn toàn requestAnimationFrame.
 *    - Tránh xung đột hay làm giật lag các thành phần WebGL / Canvas khác của website.
 * 3. KAEL HỖ TRỢ ĐỒNG ĐỘI:
 *    - Kael (Leader ở giữa) giữ ánh mắt chỉ huy và gật đầu điều phối, hướng dẫn Mira bước về đúng vị trí.
 *    - Các thành viên 2 cánh lườm mắt ngang (— —) hài hước, Kael gật đầu ghi nhận khi Mira vào đúng đội hình.
 * 4. BÓNG ĐA TẦNG 3D:
 *    - Đổ bóng trực tiếp giữa các lớp agent (Occlusion shadow).
 *    - Hệ thống bóng sàn đa tầng theo cự ly Trên - Dưới trên nền quầng sáng perspective.
 */

export const CoreMissionMotion = () => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const tickRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 780);
    let height = 260;

    // ── HÀM VẼ BÓNG SÀN TIẾP ĐẤT (GROUND SHADOW) ──
    const drawFloorShadow = (x, y, size, alpha = 0.75, widthScale = 1) => {
      ctx.save();
      const groundY = y + size * 0.47;
      const shadowW = size * 0.48 * widthScale;
      const shadowH = size * 0.14;

      // Quầng bóng mềm tỏa ra sàn
      const softGrad = ctx.createRadialGradient(
        x, groundY, shadowW * 0.15,
        x, groundY, shadowW * 1.35
      );
      softGrad.addColorStop(0, `rgba(0, 0, 0, ${alpha * 0.85})`);
      softGrad.addColorStop(0.45, `rgba(0, 0, 0, ${alpha * 0.45})`);
      softGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = softGrad;
      ctx.beginPath();
      ctx.ellipse(x, groundY, shadowW * 1.35, shadowH * 1.45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tâm tiếp đất đậm đặc (contact core)
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.ellipse(x, groundY, shadowW * 0.78, shadowH * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // ── HÀM VẼ THÂN BẠN PIXEL AGENT VỚI ĐỔ BÓNG LÊN NHAU ──
    const drawAgentBody = ({
      x,
      y,
      size,
      lookX = 0,
      lookY = 0,
      squint = false,
      tilt = 0,
      bob = 0,
      sweatDrop = false,
      sweatProgress = 0,
      isGlaring = false,
      dropShadowAlpha = 0.65,
      dropShadowBlur = 24,
      dropShadowOffsetY = 10,
      responsiveScale = 1
    }) => {
      ctx.save();
      ctx.translate(x, y + bob);
      ctx.rotate(tilt);

      const radius = size * 0.28;

      // 1. ĐỔ BÓNG TRỰC TIẾP LÊN CÁC BẠN AGENT ĐỨNG PHÍA SAU (Layer Occlusion Shadow)
      ctx.shadowColor = `rgba(0, 0, 0, ${dropShadowAlpha})`;
      ctx.shadowBlur = dropShadowBlur * responsiveScale;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = dropShadowOffsetY * responsiveScale;

      // 2. Thân Squircle 3D tinh tế
      const bodyGrad = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
      bodyGrad.addColorStop(0, '#FFFFFF');
      bodyGrad.addColorStop(0.68, '#F8FAFC');
      bodyGrad.addColorStop(1, '#DCE3EE');
      ctx.fillStyle = bodyGrad;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fill();
      } else {
        ctx.fillRect(-size / 2, -size / 2, size, size);
      }

      // Tắt shadow để viền và mắt sắc bén
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // 3. Đường viền tinh xảo ngăn cách các khối squircle khi xếp đè nhau
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.28)' : 'rgba(15, 23, 42, 0.20)';
      ctx.lineWidth = 1.25;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.stroke();
      }

      // 4. Viền ánh sáng highlight nhẹ ở gờ trên
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(0, -size / 2 + radius, radius * 0.75, Math.PI, 0, false);
      ctx.stroke();

      // 5. Đôi mắt capsule hoặc mắt ngang dẹp khi lườm
      let eyeW = Math.max(5.0, size * 0.155);
      let eyeH = squint ? size * 0.18 : size * 0.32;
      let eyeR = eyeW / 2;
      let eyeY = -eyeH / 2 + lookY;
      let leftEyeX = -size * 0.20 - eyeW / 2 + lookX;
      let rightEyeX = size * 0.20 - eyeW / 2 + lookX;

      if (isGlaring) {
        // MẮT NGANG DẸP (Horizontal Slit Eyes: "— —")
        eyeW = size * 0.24;
        eyeH = Math.max(3.5, size * 0.042);
        eyeR = eyeH / 2;
        eyeY = -eyeH / 2 + lookY;
        leftEyeX = -size * 0.20 - eyeW / 2 + lookX;
        rightEyeX = size * 0.20 - eyeW / 2 + lookX;
      }

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

      // Giọt mồ hôi lo lắng rơi khi bị cả đội lườm
      if (sweatDrop) {
        ctx.save();
        const dropY = -size * 0.44 + sweatProgress * 22;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(size * 0.38, dropY, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(size * 0.38 - 3.2, dropY);
        ctx.lineTo(size * 0.38, dropY - 6.0);
        ctx.lineTo(size * 0.38 + 3.2, dropY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // ── HÀM RENDER MỘT FRAME CỤ THỂ ──
    const renderFrame = (curTick) => {
      ctx.clearRect(0, 0, width, height);

      const responsiveScale = Math.min(1, Math.max(0.55, width / 720));
      const cx = width / 2;
      const baseY = height * 0.50;

      // ── ÁNH SÁNG SÀN AMBIENT PERSPECTIVE ──
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
      ctx.save();
      const floorGlow = ctx.createRadialGradient(
        cx, baseY + 45 * responsiveScale, 20,
        cx, baseY + 45 * responsiveScale, 380 * responsiveScale
      );
      floorGlow.addColorStop(0, isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.12)');
      floorGlow.addColorStop(0.35, isLight ? 'rgba(15, 23, 42, 0.02)' : 'rgba(255, 255, 255, 0.05)');
      floorGlow.addColorStop(0.7, isLight ? 'rgba(148, 163, 184, 0.01)' : 'rgba(148, 163, 184, 0.02)');
      floorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = floorGlow;
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 45 * responsiveScale, 380 * responsiveScale, 75 * responsiveScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lưới sàn 3D nhẹ
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridStartY = baseY - 45 * responsiveScale;
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 38 * responsiveScale, gridStartY);
        ctx.lineTo(cx + i * 115 * responsiveScale, height);
        ctx.stroke();
      }
      ctx.restore();

      // ── ĐỊNH HÌNH TỌA ĐỘ V-FORMATION CÓ HIỆU ỨNG XA GẦN RÕ RỆT ──
      const centerSize = 150 * responsiveScale;
      const midSize = 116 * responsiveScale;
      const farSize = 88 * responsiveScale;

      const p3 = {
        x: cx,
        y: baseY + 30 * responsiveScale,
        size: centerSize
      };

      const p2 = {
        x: cx - 98 * responsiveScale,
        y: baseY + 4 * responsiveScale,
        size: midSize
      };
      const p4 = {
        x: cx + 98 * responsiveScale,
        y: baseY + 4 * responsiveScale,
        size: midSize
      };

      const p1 = {
        x: cx - 184 * responsiveScale,
        y: baseY - 22 * responsiveScale,
        size: farSize
      };

      const targetX5 = cx + 184 * responsiveScale;
      const awkwardX5 = cx + 305 * responsiveScale;
      const p5 = {
        y: baseY - 22 * responsiveScale,
        size: farSize
      };

      // ── KỊCH BẢN DIỄN HOẠT (CHOREOGRAPHY & KAEL SUPPORT STORY) ──
      let lookXTeam = 0;
      let lookYTeam = -1;
      let isGlaring = false;
      let currentX5 = awkwardX5;
      let lookX5 = 3;
      let lookY5 = -3;
      let sweatDrop = false;
      let sweatProgress = 0;
      let walkBob5 = 0;
      let walkTilt5 = 0;

      // Trạng thái của Kael (Lead Architect ở giữa)
      let kaelLookX = 0;
      let kaelLookY = -1;
      let kaelTilt = 0;
      let kaelBob = 0;

      const idleBreath = Math.sin(curTick * 0.04) * (2 * responsiveScale);

      if (curTick < 80) {
        // PHA 1 (0 -> 80, ~1.3s): Đội hình ban đầu rất ngầu nhìn thẳng, Mira đứng ngoài xa ngó lơ
        lookXTeam = 0;
        lookYTeam = -1;
        currentX5 = awkwardX5;
        lookX5 = 3;
        lookY5 = -3;
        kaelLookX = 0;
        kaelLookY = -1;
      } else if (curTick >= 80 && curTick < 130) {
        // PHA 2A (80 -> 130, ~0.8s): 3 bạn 2 cánh liếc mắt ngang (— —). Kael quay ánh nhìn sang Mira
        isGlaring = true;
        lookXTeam = 5;
        lookYTeam = 0;
        currentX5 = awkwardX5;

        // Kael quay ánh nhìn và đầu sang Mira
        kaelLookX = 6;
        kaelLookY = 0;
        kaelTilt = 0.04;

        if (curTick < 105) {
          lookX5 = 3;
          lookY5 = -3;
        } else {
          lookX5 = -5; // Mira giật mình nhìn lại Kael
          lookY5 = 0;
          sweatDrop = true;
          sweatProgress = ((curTick - 105) % 25) / 25;
        }
      } else if (curTick >= 130 && curTick < 185) {
        // PHA 2B (130 -> 185, ~0.9s): KAEL GẬT ĐẦU RA HIỆU RÕ NÉT ("Ánh mắt gật đầu gọi bạn vào")
        isGlaring = true;
        lookXTeam = 5;
        lookYTeam = 0;
        currentX5 = awkwardX5;
        lookX5 = -5; // Mira chú ý nhìn Kael
        sweatDrop = true;
        sweatProgress = 0.8;

        // Cú gật đầu rõ rệt và ấm áp của Kael (nod curve)
        const nodT = (curTick - 130) / 55; // 0 -> 1
        const nodSin = Math.sin(nodT * Math.PI);
        kaelLookX = 5.5;
        kaelLookY = nodSin * 4.5; // Ánh mắt hạ xuống theo nhịp gật đầu
        kaelTilt = 0.04 + nodSin * 0.08; // Đầu nghiêng nhẹ gật xuống
        kaelBob = nodSin * 8 * responsiveScale; // Nhấp đầu xuống 8px rất rõ!
      } else if (curTick >= 185 && curTick < 285) {
        // PHA 3 (185 -> 285, ~1.6s): MIRA NHẬN TÍN HIỆU VÀ CHẠY VỘI VÀO ĐỘI HÌNH ("Chạy vào")
        isGlaring = true;
        lookXTeam = 4.5;
        lookYTeam = 0;

        const runProgress = Math.min(1, Math.max(0, (curTick - 185) / 95));
        // Easing chạy nhanh dứt khoát rồi phanh êm
        const easedRun = 1 - Math.pow(1 - runProgress, 2.5);
        currentX5 = awkwardX5 - easedRun * (awkwardX5 - targetX5);

        // Nhịp chạy nhanh thoăn thoắt (run cadence nhanh gấp đôi đi bộ!)
        const runStride = (curTick - 185) * 0.65;
        walkBob5 = Math.abs(Math.sin(runStride)) * 7 * responsiveScale;
        walkTilt5 = Math.sin(runStride) * 0.12 - 0.06; // Hơi chúi người về trước khi chạy

        lookX5 = -4; // Mắt nhìn thẳng về vị trí đích
        lookY5 = 1;
        sweatDrop = curTick < 250;
        sweatProgress = ((curTick - 185) % 20) / 20;

        // Kael dõi theo bước chạy của Mira
        kaelLookX = 5.5 - runProgress * 3.5;
        kaelLookY = 0;
        kaelTilt = 0.03;
      } else if (curTick >= 285 && curTick < 345) {
        // PHA 4 (285 -> 345, ~1.0s): MIRA CẬP BẾN, PHANH LẠI & THỞ PHÀO. CẢ ĐỘI VÀ KAEL MỈM CƯỜI ĐÓN MỪNG
        const settleT = (curTick - 285) / 60;
        currentX5 = targetX5;
        walkBob5 = Math.sin(settleT * Math.PI * 2) * 2.5 * Math.exp(-settleT * 3) * responsiveScale;
        walkTilt5 = 0;

        lookX5 = 0;
        lookY5 = 0;
        sweatDrop = false;

        // Các bạn 2 cánh hết lườm, mắt bình thường trở lại
        isGlaring = false;
        lookXTeam = 2;
        lookYTeam = 0;

        // Kael gật đầu nhẹ lần 2 ghi nhận và chào mừng Mira vào hàng
        const welcomeSin = Math.sin(settleT * Math.PI);
        kaelLookX = 2;
        kaelLookY = 1;
        kaelTilt = 0.02 + welcomeSin * 0.04;
        kaelBob = welcomeSin * 4 * responsiveScale;
      } else {
        // PHA 5 (345 -> 420+): KHÓA ĐỘI HÌNH CHỮ V SIÊU NGẦU, CẢ 5 BẠN ĐỒNG LOẠT NHÌN THẲNG
        currentX5 = targetX5;
        lookXTeam = 0;
        lookYTeam = -1;
        lookX5 = 0;
        lookY5 = -1;
        kaelLookX = 0;
        kaelLookY = -1;
        kaelTilt = 0;
        kaelBob = 0;
      }

      // ── BƯỚC 1: VẼ BÓNG SÀN THEO CHIỀU SÂU TRÊN DƯỚI (FLOOR SHADOW PASS) ──
      // 1. Tầng trên (Hậu cảnh): Agent 1 & Agent 5
      drawFloorShadow(p1.x, p1.y, p1.size, 0.60);
      drawFloorShadow(currentX5, p5.y, p5.size, 0.60, (curTick >= 185 && curTick < 285) ? 0.9 : 1);

      // 2. Tầng giữa (Trung cảnh): Agent 2 & Agent 4
      drawFloorShadow(p2.x, p2.y, p2.size, 0.75);
      drawFloorShadow(p4.x, p4.y, p4.size, 0.75);

      // 3. Tầng dưới cùng (Tiền cảnh): Agent 3 - Kael
      drawFloorShadow(p3.x, p3.y, p3.size, 0.95);

      // ── BƯỚC 2: VẼ THÂN AGENT VỚI ĐỔ BÓNG ĐA TẦNG ──
      // 1. HẬU CẢNH: Agent 1 & Agent 5
      drawAgentBody({
        x: p1.x,
        y: p1.y,
        size: p1.size,
        lookX: isGlaring ? lookXTeam : 0,
        lookY: isGlaring ? lookYTeam : -1,
        isGlaring,
        bob: idleBreath * 0.7,
        tilt: isGlaring ? 0.04 : 0,
        dropShadowAlpha: 0.50,
        dropShadowBlur: 16,
        dropShadowOffsetY: 6,
        responsiveScale
      });

      drawAgentBody({
        x: currentX5,
        y: p5.y,
        size: p5.size,
        lookX: lookX5,
        lookY: lookY5,
        squint: sweatDrop,
        bob: (curTick >= 185 && curTick < 285) ? -walkBob5 : (idleBreath * 0.7),
        tilt: (curTick >= 185 && curTick < 285) ? walkTilt5 : (sweatDrop ? -0.05 : 0),
        sweatDrop,
        sweatProgress,
        dropShadowAlpha: 0.50,
        dropShadowBlur: 16,
        dropShadowOffsetY: 6,
        responsiveScale
      });

      // 2. TRUNG CẢNH: Agent 2 & Agent 4 (Đổ bóng mạnh lên thân Agent 1 & 5 phía sau)
      drawAgentBody({
        x: p2.x,
        y: p2.y,
        size: p2.size,
        lookX: isGlaring ? lookXTeam : 0,
        lookY: isGlaring ? lookYTeam : -1,
        isGlaring,
        bob: idleBreath * 0.85,
        tilt: isGlaring ? 0.05 : 0,
        dropShadowAlpha: 0.70,
        dropShadowBlur: 24,
        dropShadowOffsetY: 10,
        responsiveScale
      });

      drawAgentBody({
        x: p4.x,
        y: p4.y,
        size: p4.size,
        lookX: isGlaring ? lookXTeam + 1 : 0,
        lookY: isGlaring ? lookYTeam : -1,
        isGlaring,
        bob: idleBreath * 0.85,
        tilt: isGlaring ? 0.06 : 0,
        dropShadowAlpha: 0.70,
        dropShadowBlur: 24,
        dropShadowOffsetY: 10,
        responsiveScale
      });

      // 3. TIỀN CẢNH: Agent 3 (Kael - Leader điều phối với ánh mắt và cái gật đầu)
      drawAgentBody({
        x: p3.x,
        y: p3.y,
        size: p3.size,
        lookX: kaelLookX,
        lookY: kaelLookY,
        isGlaring: false,
        bob: idleBreath + kaelBob,
        tilt: kaelTilt,
        dropShadowAlpha: 0.90,
        dropShadowBlur: 34,
        dropShadowOffsetY: 14,
        responsiveScale
      });
    };

    // ── VÒNG LẶP ĐIỀU PHỐI TỐI ƯU HIỆU NĂNG ──
    const loop = () => {
      if (!isVisibleRef.current) {
        animFrameId.current = null;
        return;
      }

      tickRef.current += 1;
      renderFrame(tickRef.current);

      // KHI ĐẠT ĐẾN 420 TICKS (KHÓA ĐỘI HÌNH HOÀN TẤT) -> DỪNG HOÀN TOÀN, KHÔNG LẶP LẠI
      if (tickRef.current >= 420) {
        animFrameId.current = null;
        return; // Dừng RAF, giữ nguyên trạng thái tĩnh hoàn hảo -> 0% CPU/GPU
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    const startAnimation = (forceReset = false) => {
      if (forceReset) {
        tickRef.current = 0;
      }
      if (!animFrameId.current && isVisibleRef.current) {
        animFrameId.current = requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };

    // ── XỬ LÝ RESIZE (ĐẶT SAU KHI RENDERFRAME ĐÃ ĐƯỢC KHỞI TẠO) ──
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = width < 640 ? 210 : 260;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Nếu đang tạm dừng ở khung hình cuối, vẽ lại ngay 1 frame tĩnh để canvas sắc nét
      if (!animFrameId.current) {
        renderFrame(tickRef.current >= 420 ? 420 : tickRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── INTERSECTION OBSERVER: CHỈ PHÁT KHI SCROLL QUA SECTION ──
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          // Phát một lần duy nhất từ đầu mỗi khi người dùng scroll đến section
          startAnimation(true);
        } else {
          isVisibleRef.current = false;
          // Ngay lập tức ngắt render khi section ra khỏi tầm mắt để tối ưu hiệu năng
          stopAnimation();
        }
      },
      {
        threshold: 0.20 // Kích hoạt khi thấy 20% khung hình
      }
    );

    observer.observe(canvas);

    // Click canvas để replay lại nếu muốn xem lại tương tác
    const handleCanvasClick = () => {
      startAnimation(true);
    };
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      observer.disconnect();
      stopAnimation();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent border-0 select-none">
      <canvas
        ref={canvasRef}
        className="w-full block cursor-pointer select-none"
      />
    </div>
  );
};

export default CoreMissionMotion;
