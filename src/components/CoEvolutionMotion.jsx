import React, { useEffect, useRef } from 'react';

/**
 * CoEvolutionMotion - 3D Collaborative Dream House Blueprint Studio
 * 
 * Ý tưởng độc đáo:
 * - 5 Bạn Pixel Agent đại diện cho 5 lĩnh vực chuyên môn cùng hợp tác kiến tạo
 *   một Ngôi Nhà Hoàn Mỹ trên chiếc bảng (theo đúng nét vẽ kiến trúc chuẩn).
 * - Từng bước hình dáng ngôi nhà xuất hiện lũy tiến (Additive Architectural Layers):
 *   + Bước 1 (Khảo sát & Nền móng): Bệ sân 3D, bậc tam cấp & ranh giới đất.
 *   + Bước 2 (Kiến trúc & Kết cấu): Khung tường chịu lực 3 gian (khối chính 2 tầng, gian trái, gian garage).
 *   + Bước 3 (Kỹ thuật Mái & Hiên đón): Hệ mái dốc kiên cố, mái hiên sảnh với 2 cột trụ.
 *   + Bước 4 (Tiện nghi & Cửa thông minh): Toàn bộ hệ cửa kính 6 khoang, ô thoáng tròn áp mái, cửa chính & cửa cuốn gara.
 *   + Bước 5 (Cảnh quan & Sinh thái): Cây xanh sân vườn, đường viền sinh thái và hoàn thiện bàn giao.
 * 
 * - Chuẩn hóa thiết kế:
 *   + KHÔNG dùng emoji.
 *   + Hiệu ứng gõ chữ chuyên nghiệp (Fixed-Anchor Typewriter), tuyệt đối không giật, không tràn màn hình.
 *   + Lời thoại chia làm 2 nhịp ngắn gọn, súc tích, mang tính chuyên môn cao nhưng dễ hiểu.
 *   + Nhịp điệu animation chậm rãi, thư thái và truyền cảm hứng.
 */
export const CoEvolutionMotion = ({ activeLang = 'vi' }) => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const tickRef = useRef(0);

  const isVi = activeLang === 'vi';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 780);
    let height = (canvas.height = 510);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement.clientWidth;
      height = 510;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── 5 CHUYÊN MÔN CỘNG TÁC XÂY DỰNG NGÔI NHÀ ──
    const studyBuddies = [
      {
        id: 'survey',
        stepNumber: '01',
        title: isVi ? 'NỀN MÓNG' : 'FOUNDATION',
        summary: isVi ? 'Bệ sân & Nền móng vững chãi' : 'Survey & Ground Slab Plinth',
        beats: [
          isVi ? 'Khảo sát trắc địa, đầm chặt nền đất.' : 'Topographic survey, soil stabilized.',
          isVi ? 'Nền móng vững chãi, sẵn sàng thi công.' : 'Foundation locked, ready to build.'
        ],
        xRel: -0.34,
        yRel: 0.65,
        size: 72
      },
      {
        id: 'structure',
        stepNumber: '02',
        title: isVi ? 'KẾT CẤU' : 'STRUCTURE',
        summary: isVi ? 'Dựng khung tường chịu lực ba gian' : '3-Bay Structural Framing',
        beats: [
          isVi ? 'Dựng hệ tường chịu lực ba gian.' : 'Erecting 3-bay structural walls.',
          isVi ? 'Không gian tối ưu, chịu lực bền vững.' : 'Optimized volumes, enduring strength.'
        ],
        xRel: -0.17,
        yRel: 0.74,
        size: 76
      },
      {
        id: 'roof',
        stepNumber: '03',
        title: isVi ? 'HỆ MÁI' : 'ROOFING',
        summary: isVi ? 'Hệ mái dốc & Hiên sảnh che chở' : 'Pitched Roofs & Porch Canopy',
        beats: [
          isVi ? 'Lắp ghép hệ mái dốc và hiên đón.' : 'Assembling pitched gables and porch.',
          isVi ? 'Che mưa chắn nắng, vững vàng kiên cố.' : 'Weather-tight enclosure, climate-ready.'
        ],
        xRel: 0.0,
        yRel: 0.82,
        size: 82
      },
      {
        id: 'openings',
        stepNumber: '04',
        title: isVi ? 'TIỆN NGHI' : 'OPENINGS',
        summary: isVi ? 'Cửa sổ đón sáng & Cửa cuốn thông minh' : 'Smart Windows & Automated Doors',
        beats: [
          isVi ? 'Trổ hệ cửa sổ kính đón gió tự nhiên.' : 'Installing natural light window banks.',
          isVi ? 'Lắp cửa tự động, kích hoạt năng lượng.' : 'Automating entrances, power online.'
        ],
        xRel: 0.17,
        yRel: 0.74,
        size: 76
      },
      {
        id: 'landscape',
        stepNumber: '05',
        title: isVi ? 'HOÀN THIỆN' : 'LANDSCAPE',
        summary: isVi ? 'Cảnh quan sân vườn sinh thái' : 'Eco Garden & Ready for Living',
        beats: [
          isVi ? 'Quy hoạch cây xanh và sân vườn sinh thái.' : 'Planting shade tree & garden greens.',
          isVi ? 'Ngôi nhà hoàn tất, sẵn sàng an cư.' : 'Dream residence complete, move-in ready.'
        ],
        xRel: 0.34,
        yRel: 0.65,
        size: 72
      }
    ];

    // ── 1. DRAW 3D PERSPECTIVE FLOOR (SÀN LỚP HỌC 3D) ──
    const drawStudioFloor = (horizonY) => {
      const vpX = width * 0.5;
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

      ctx.save();
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.038)';
      ctx.lineWidth = 1.0;

      // Perspective floor rays radiating down from horizon
      for (let i = -7; i <= 7; i++) {
        const bottomX = vpX + i * (width * 0.088);
        ctx.beginPath();
        ctx.moveTo(vpX + i * 16, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Depth concentric lines
      for (let j = 1; j <= 5; j++) {
        const t = j / 5;
        const lineY = horizonY + Math.pow(t, 2.1) * (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── 2. DRAW COLLABORATIVE DREAM HOUSE ARCHITECTURE TRÊN BẢNG ──
    // Vẽ lũy tiến theo từng bước (activeStep: 0..4)
    const drawCollaborativeHouse = (ox, oy, activeStep) => {
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
      ctx.save();
      ctx.strokeStyle = isLight ? '#0F172A' : '#FFFFFF';
      ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
      ctx.lineWidth = 1.35;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // ───────────────────────────────────────────────
      // LAYER 1: KHẢO SÁT & NỀN MÓNG (Luôn vẽ từ bước 0 trở đi)
      // ───────────────────────────────────────────────
      if (activeStep >= 0) {
        // Bệ sân vườn (Foundation plinth / lawn slab)
        ctx.beginPath();
        // Mặt trên bệ sân
        ctx.moveTo(ox - 138, oy + 28);
        ctx.lineTo(ox - 32, oy + 50);
        ctx.lineTo(ox + 142, oy + 32);
        ctx.lineTo(ox + 82, oy + 12);
        ctx.lineTo(ox - 88, oy + 8);
        ctx.closePath();
        ctx.stroke();

        // Độ dày 3D bệ sân (Downward extrusion)
        ctx.beginPath();
        ctx.moveTo(ox - 138, oy + 28);
        ctx.lineTo(ox - 138, oy + 32);
        ctx.lineTo(ox - 32, oy + 54);
        ctx.lineTo(ox + 142, oy + 36);
        ctx.lineTo(ox + 142, oy + 32);
        ctx.stroke();

        // Đường gờ đứng ở góc trước
        ctx.beginPath();
        ctx.moveTo(ox - 32, oy + 50);
        ctx.lineTo(ox - 32, oy + 54);
        ctx.stroke();

        // Bậc tam cấp trước sảnh chính (Front steps)
        // Bậc 1 (dưới cùng)
        ctx.strokeRect(ox - 38, oy + 38, 44, 3);
        // Bậc 2
        ctx.strokeRect(ox - 35, oy + 35, 38, 3);
        // Bậc 3 (chiếu nghỉ sảnh)
        ctx.strokeRect(ox - 32, oy + 32, 32, 3);
      }

      // ───────────────────────────────────────────────
      // LAYER 2: KIẾN TRÚC & KẾT CẤU TƯỜNG (Từ bước 1 trở đi)
      // ───────────────────────────────────────────────
      if (activeStep >= 1) {
        // GIAN GIỮA (Khối 2 tầng chính)
        ctx.beginPath();
        // Tường mặt tiền gian giữa
        ctx.moveTo(ox - 28, oy + 32);
        ctx.lineTo(ox + 14, oy + 34);
        ctx.lineTo(ox + 14, oy - 26);
        ctx.lineTo(ox - 7, oy - 58);
        ctx.lineTo(ox - 28, oy - 28);
        ctx.closePath();
        ctx.stroke();

        // Tường hồi bên phải gian giữa (nhô cao trên mái gara)
        ctx.beginPath();
        ctx.moveTo(ox + 14, oy - 26);
        ctx.lineTo(ox + 46, oy - 38);
        ctx.lineTo(ox + 46, oy - 10);
        ctx.stroke();

        // GIAN TRÁI (Khối 2 tầng thụt lùi)
        // Tường mặt tiền gian trái
        ctx.beginPath();
        ctx.moveTo(ox - 66, oy + 26);
        ctx.lineTo(ox - 28, oy + 32);
        ctx.lineTo(ox - 28, oy - 20);
        ctx.lineTo(ox - 66, oy - 26);
        ctx.closePath();
        ctx.stroke();

        // Tường hồi bên trái
        ctx.beginPath();
        ctx.moveTo(ox - 66, oy + 26);
        ctx.lineTo(ox - 88, oy + 18);
        ctx.lineTo(ox - 88, oy - 34);
        ctx.lineTo(ox - 66, oy - 26);
        ctx.stroke();

        // GIAN PHẢI (Khối garage 1 tầng)
        // Tường mặt tiền garage
        ctx.beginPath();
        ctx.moveTo(ox + 14, oy + 34);
        ctx.lineTo(ox + 76, oy + 38);
        ctx.lineTo(ox + 76, oy + 2);
        ctx.lineTo(ox + 14, oy - 2);
        ctx.closePath();
        ctx.stroke();

        // Tường hồi bên phải garage
        ctx.beginPath();
        ctx.moveTo(ox + 76, oy + 38);
        ctx.lineTo(ox + 110, oy + 24);
        ctx.lineTo(ox + 110, oy - 12);
        ctx.lineTo(ox + 94, oy - 20);
        ctx.lineTo(ox + 76, oy + 2);
        ctx.stroke();
      }

      // ───────────────────────────────────────────────
      // LAYER 3: KỸ THUẬT MÁI & HIÊN ĐÓN (Từ bước 2 trở đi)
      // ───────────────────────────────────────────────
      if (activeStep >= 2) {
        // Mái đầu hồi gian giữa (Pitched Center Gable)
        ctx.beginPath();
        ctx.moveTo(ox - 32, oy - 26);
        ctx.lineTo(ox - 7, oy - 62);
        ctx.lineTo(ox + 18, oy - 24);
        ctx.stroke();

        // Viền diềm mái đôi đầu hồi
        ctx.beginPath();
        ctx.moveTo(ox - 28, oy - 28);
        ctx.lineTo(ox - 7, oy - 58);
        ctx.lineTo(ox + 14, oy - 26);
        ctx.stroke();

        // Sống mái dốc nghiêng về sau
        ctx.beginPath();
        ctx.moveTo(ox - 7, oy - 62);
        ctx.lineTo(ox + 26, oy - 70);
        ctx.lineTo(ox + 48, oy - 38);
        ctx.lineTo(ox + 18, oy - 24);
        ctx.stroke();

        // Mái che hiên sảnh chính (Front Porch Canopy)
        ctx.beginPath();
        ctx.moveTo(ox - 34, oy + 12);
        ctx.lineTo(ox - 7, oy + 4);
        ctx.lineTo(ox + 14, oy + 14);
        ctx.stroke();
        // Mép dốc hiên đón
        ctx.beginPath();
        ctx.moveTo(ox - 34, oy + 14);
        ctx.lineTo(ox + 14, oy + 16);
        ctx.stroke();

        // Hai cột chống hiên sảnh
        ctx.beginPath();
        ctx.moveTo(ox - 26, oy + 15);
        ctx.lineTo(ox - 26, oy + 32);
        ctx.moveTo(ox + 4, oy + 16);
        ctx.lineTo(ox + 4, oy + 33);
        ctx.stroke();

        // Mái gian trái
        ctx.beginPath();
        ctx.moveTo(ox - 70, oy - 24);
        ctx.lineTo(ox - 46, oy - 42);
        ctx.lineTo(ox - 28, oy - 38);
        ctx.stroke();

        // Mái gian garage phải
        ctx.beginPath();
        ctx.moveTo(ox + 14, oy - 2);
        ctx.lineTo(ox + 32, oy - 18);
        ctx.lineTo(ox + 94, oy - 20);
        ctx.lineTo(ox + 76, oy + 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ox + 94, oy - 20);
        ctx.lineTo(ox + 112, oy - 10);
        ctx.stroke();
      }

      // ───────────────────────────────────────────────
      // LAYER 4: TIỆN NGHI, CỬA SỔ & CỬA TỰ ĐỘNG (Từ bước 3 trở đi)
      // ───────────────────────────────────────────────
      if (activeStep >= 3) {
        // Ô thoáng tròn áp mái (Round attic window)
        ctx.beginPath();
        ctx.arc(ox - 7, oy - 44, 4, 0, Math.PI * 2);
        ctx.stroke();
        // Nan chữ thập ô tròn
        ctx.beginPath();
        ctx.moveTo(ox - 7, oy - 48);
        ctx.lineTo(ox - 7, oy - 40);
        ctx.moveTo(ox - 11, oy - 44);
        ctx.lineTo(ox - 3, oy - 44);
        ctx.stroke();

        // Cửa sổ 3 khoang tầng 2 gian giữa
        const mwX = ox - 20;
        const mwY = oy - 22;
        ctx.strokeRect(mwX, mwY, 26, 17);
        // Chia 3 khoang đứng
        ctx.beginPath();
        ctx.moveTo(mwX + 7, mwY);
        ctx.lineTo(mwX + 7, mwY + 17);
        ctx.moveTo(mwX + 19, mwY);
        ctx.lineTo(mwX + 19, mwY + 17);
        // Nan ngang khoang giữa
        ctx.moveTo(mwX + 7, mwY + 8);
        ctx.lineTo(mwX + 19, mwY + 8);
        ctx.stroke();

        // Cửa chính sảnh đón (dưới mái hiên)
        const dX = ox - 16;
        const dY = oy + 16;
        ctx.strokeRect(dX, dY, 15, 16);
        // Tay nắm cửa đứng
        ctx.beginPath();
        ctx.moveTo(dX + 12, dY + 6);
        ctx.lineTo(dX + 12, dY + 10);
        ctx.stroke();

        // Hai cụm cửa sổ 6 khoang gian trái
        // Cửa sổ tầng 2 gian trái
        const l2X = ox - 60;
        const l2Y = oy - 22;
        ctx.strokeRect(l2X, l2Y, 22, 16);
        ctx.beginPath();
        ctx.moveTo(l2X + 7, l2Y);
        ctx.lineTo(l2X + 7, l2Y + 16);
        ctx.moveTo(l2X + 15, l2Y);
        ctx.lineTo(l2X + 15, l2Y + 16);
        ctx.moveTo(l2X, l2Y + 8);
        ctx.lineTo(l2X + 22, l2Y + 8);
        ctx.stroke();

        // Cửa sổ tầng 1 gian trái
        const l1X = ox - 60;
        const l1Y = oy + 6;
        ctx.strokeRect(l1X, l1Y, 22, 16);
        ctx.beginPath();
        ctx.moveTo(l1X + 7, l1Y);
        ctx.lineTo(l1X + 7, l1Y + 16);
        ctx.moveTo(l1X + 15, l1Y);
        ctx.lineTo(l1X + 15, l1Y + 16);
        ctx.moveTo(l1X, l1Y + 8);
        ctx.lineTo(l1X + 22, l1Y + 8);
        ctx.stroke();

        // Cửa cuốn gara gian phải
        const gX = ox + 22;
        const gY = oy + 6;
        ctx.strokeRect(gX, gY, 44, 30);
        ctx.strokeRect(gX + 2, gY + 2, 40, 26);
        // Các nan ngang cửa cuốn
        ctx.beginPath();
        ctx.moveTo(gX + 2, gY + 10);
        ctx.lineTo(gX + 42, gY + 10);
        ctx.moveTo(gX + 2, gY + 18);
        ctx.lineTo(gX + 42, gY + 18);
        ctx.stroke();

        // Cửa sổ hông garage
        const gsX = ox + 86;
        const gsY = oy + 8;
        ctx.strokeRect(gsX, gsY, 16, 16);
        ctx.beginPath();
        ctx.moveTo(gsX + 8, gsY);
        ctx.lineTo(gsX + 8, gsY + 16);
        ctx.moveTo(gsX, gsY + 8);
        ctx.lineTo(gsX + 16, gsY + 8);
        ctx.stroke();
      }

      // ───────────────────────────────────────────────
      // LAYER 5: CÂY XANH, CẢNH QUAN & HOÀN THIỆN (Bước 4)
      // ───────────────────────────────────────────────
      if (activeStep >= 4) {
        // Cây tròn sân vườn bên trái (Garden tree)
        const tX = ox - 122;
        const tY = oy + 20;

        // Thân cây đứng
        ctx.beginPath();
        ctx.moveTo(tX, tY + 12);
        ctx.lineTo(tX, tY + 26);
        ctx.stroke();

        // Tán cây tròn
        ctx.beginPath();
        ctx.arc(tX, tY, 11, 0, Math.PI * 2);
        ctx.stroke();

        // Đường ranh giới cỏ sân vườn
        ctx.beginPath();
        ctx.moveTo(ox - 138, oy + 28);
        ctx.lineTo(ox - 100, oy + 22);
        ctx.stroke();

        // Ngôi sao lấp lánh hoàn tất trên nóc nhà
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText('✦', ox + 32, oy - 66);
      }

      ctx.restore();
    };

    // ── 3. DRAW MINIMALIST SQUARE BLACKBOARD (CHIẾC BẢNG BẢN VẼ TỐI GIẢN) ──
    const drawSquareBlackboard = (activeBuddy, activeIndex) => {
      const bWidth = Math.min(width * 0.74, 440);
      const bHeight = 224;
      const bx = width * 0.5 - bWidth / 2;
      const by = 16;
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

      ctx.save();

      // Đổ bóng êm phía sau bảng
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(0, 0, 0, 0.65)';
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx + 4, by + 6, bWidth, bHeight, 6);
        ctx.fill();
      }

      // Mặt bảng đá phiến tối giản (Hoặc bản vẽ sáng thanh lịch trong Light Mode)
      ctx.fillStyle = isLight ? '#F1F5F9' : '#080A12';
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.18)' : 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.3;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx, by, bWidth, bHeight, 6);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(bx, by, bWidth, bHeight);
        ctx.strokeRect(bx, by, bWidth, bHeight);
      }

      // Dòng trên cùng: Số bước & Tiêu đề chuyên môn (Không emoji)
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'left';
      ctx.fillText(`${activeBuddy.stepNumber} / 05  •  ${activeBuddy.title}`, bx + 16, by + 20);

      ctx.textAlign = 'right';
      ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
      ctx.fillText(
        isVi ? 'BẢN VẼ: NGÔI NHÀ TƯƠNG LAI' : 'BLUEPRINT: RESIDENTIAL SANCTUARY',
        bx + bWidth - 16,
        by + 20
      );

      // Đường kẻ mỏng ngăn cách header
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(bx + 14, by + 28);
      ctx.lineTo(bx + bWidth - 14, by + 28);
      ctx.stroke();
      ctx.setLineDash([]);

      // Phần giữa: Bản vẽ ngôi nhà lũy tiến theo từng bước
      const houseOx = bx + bWidth * 0.5 - 6;
      const houseOy = by + 130;
      drawCollaborativeHouse(houseOx, houseOy, activeIndex);

      // Phần đáy bảng: 5 chấm tiến trình thanh lịch
      const dotY = by + bHeight - 16;
      const dotSpacing = 14;
      const dotStartX = bx + 24;

      for (let d = 0; d < 5; d++) {
        const dx = dotStartX + d * dotSpacing;
        const isPastOrCurrent = d <= activeIndex;
        const isCurrent = d === activeIndex;

        ctx.beginPath();
        ctx.arc(dx, dotY, isCurrent ? 3.0 : 2.0, 0, Math.PI * 2);
        if (isCurrent) {
          ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
          ctx.fill();
        } else if (isPastOrCurrent) {
          ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.65)';
          ctx.fill();
        } else {
          ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
        }
      }

      // Dòng tóm tắt tiến trình bên phải đáy bảng (Không emoji)
      ctx.font = '9.5px "JetBrains Mono", monospace';
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'right';
      ctx.fillText(activeBuddy.summary, bx + bWidth - 16, by + bHeight - 13);

      ctx.restore();
    };

    // ── 4. DRAW BIG PIXEL AGENT (WITH SOLID BLACK CAPSULE EYES) ──
    const drawBigAgent = ({
      x,
      y,
      size = 76,
      tilt = 0,
      lookX = 0,
      lookY = -2,
      isBlink = false,
      isSpeaking = false,
      bob = 0
    }) => {
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
      ctx.save();

      // Soft 3D Floor Shadow
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.15)' : 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.ellipse(x, y + size / 2 + 10, size * 0.44, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Translate to Agent Body
      ctx.translate(x, y + bob);
      ctx.rotate(tilt);

      const radius = size * 0.28;

      // Subtle glow border when speaking
      if (isSpeaking) {
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.22)' : 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 3.2;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2 - 4, -size / 2 - 4, size + 8, size + 8, radius + 2);
          ctx.stroke();
        }
      }

      // Squircle Body with subtle 3D lighting in Light Mode
      if (isLight) {
        const bodyGrad = ctx.createLinearGradient(0, -size / 2, 0, size / 2);
        bodyGrad.addColorStop(0, '#FFFFFF');
        bodyGrad.addColorStop(0.7, '#F8FAFC');
        bodyGrad.addColorStop(1, '#E2E8F0');
        ctx.fillStyle = bodyGrad;
        ctx.strokeStyle = isSpeaking ? '#0F172A' : 'rgba(15, 23, 42, 0.28)';
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = isSpeaking ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)';
      }
      ctx.lineWidth = isSpeaking ? 2.2 : 1.4;

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
      const eyeH = isBlink ? 2.5 : (isSpeaking ? size * 0.38 : size * 0.34);
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

      // Subtle sparkle
      if (isSpeaking) {
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText('✦', -size * 0.5 - 6, -size * 0.35);
        ctx.fillText('✦', size * 0.5 + 6, -size * 0.45);
      }

      ctx.restore();
    };

    // ── 5. PROFESSIONAL FIXED-ANCHOR TYPING TEXT (CHỐNG GIẬT TUYỆT ĐỐI) ──
    const drawFixedAnchorTypingText = ({
      agentX,
      agentY,
      agentSize = 76,
      beats = [],
      phaseTick = 0
    }) => {
      let activeText = '';
      let progress = 0;
      let alpha = 1.0;
      let isTypingActive = false;

      // Phân chia 2 nhịp thoại (tổng 450 ticks = ~7.5s):
      // Nhịp 1: tick 20 -> 215
      // Nhịp 2: tick 225 -> 425
      if (phaseTick >= 20 && phaseTick < 215) {
        activeText = beats[0] || '';
        const beatTick = phaseTick - 20;
        progress = Math.max(0, Math.min(1, beatTick / 85));
        isTypingActive = beatTick < 165;
        if (beatTick > 165) {
          alpha = Math.max(0, (215 - phaseTick) / 30);
        }
      } else if (phaseTick >= 225 && phaseTick < 425) {
        activeText = beats[1] || '';
        const beatTick = phaseTick - 225;
        progress = Math.max(0, Math.min(1, beatTick / 85));
        isTypingActive = beatTick < 165;
        if (phaseTick > 390) {
          alpha = Math.max(0, (425 - phaseTick) / 35);
        }
      } else {
        return;
      }

      if (!activeText || alpha <= 0.02) return;

      const charCount = Math.floor(progress * activeText.length);
      const typedSubstring = activeText.slice(0, charCount);

      // Con trỏ nhấp nháy ▍
      const isCursorBlink = Math.floor(phaseTick / 16) % 2 === 0;
      const cursor = isTypingActive && isCursorBlink ? '▍' : '';

      ctx.save();
      ctx.globalAlpha = alpha;

      ctx.font = '500 12.5px "JetBrains Mono", system-ui, monospace';

      // Fixed Anchor: Neo vị trí đầu câu để loại bỏ hoàn toàn rung lắc
      const fullTextWidth = ctx.measureText(activeText).width;
      let startX = agentX - fullTextWidth / 2;

      // Giới hạn an toàn trong khung nhìn
      const padding = 16;
      if (startX < padding) {
        startX = padding;
      } else if (startX + fullTextWidth > width - padding) {
        startX = width - padding - fullTextWidth;
      }

      const textY = agentY - agentSize / 2 - 20;
      const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

      // Đổ bóng tương phản cao
      ctx.shadowColor = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)';
      ctx.shadowBlur = isLight ? 3 : 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;

      // Vẽ văn bản cố định startX (textAlign: 'left')
      ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedSubstring + cursor, startX, textY);

      ctx.restore();
    };

    // ── CHU TRÌNH ANIMATION CHẬM RÃI & BÌNH THẢN ──
    const PHASE_PER_AGENT = 450; // ~7.5 giây cho mỗi agent
    const TOTAL_CYCLE = PHASE_PER_AGENT * studyBuddies.length; // ~37.5 giây trọn chu trình

    const render = () => {
      tickRef.current++;
      const tick = tickRef.current;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;

      // 1. Đường chân trời sàn lớp học
      const horizonY = 248;
      drawStudioFloor(horizonY);

      // 2. Tính toán agent & bước hiện tại
      const cycleTick = tick % TOTAL_CYCLE;
      const activeIndex = Math.floor(cycleTick / PHASE_PER_AGENT);
      const activePhaseTick = cycleTick % PHASE_PER_AGENT;
      const activeBuddy = studyBuddies[activeIndex];

      // 3. Vẽ chiếc bảng bản vẽ ngôi nhà lũy tiến
      drawSquareBlackboard(activeBuddy, activeIndex);

      // 4. Vẽ 5 bạn Pixel Agent trong không gian 3D
      studyBuddies.forEach((ag, idx) => {
        const ax = centerX + ag.xRel * width;
        const ay = height * ag.yRel;
        const isSpeaking = idx === activeIndex;

        // Nhún nhẹ nhàng khi phát biểu
        const speakingHop = isSpeaking ? -Math.abs(Math.sin(tick * 0.055)) * 4.5 : 0;
        const bob = Math.sin(tick * 0.024 + idx * 1.3) * 3.2 + speakingHop;
        const isBlink = (tick + idx * 60) % 160 < 6;

        // Hướng ánh mắt tương tác:
        // Bạn đang nói nhìn nhẹ lên bảng & người dùng.
        // Các bạn còn lại quay đầu nhìn bạn đang nói.
        let lookX = 0;
        let lookY = -3;

        if (isSpeaking) {
          lookX = Math.sin(tick * 0.03) * 2;
          lookY = -4;
        } else {
          const speakerX = centerX + activeBuddy.xRel * width;
          const speakerY = height * activeBuddy.yRel;
          const dx = speakerX - ax;
          const dy = speakerY - ay;
          const dist = Math.hypot(dx, dy) || 1;
          lookX = (dx / dist) * 3.5;
          lookY = (dy / dist) * 2.2;
        }

        const tilt = isSpeaking
          ? Math.sin(tick * 0.04) * 0.03
          : (ax < centerX ? 0.03 : -0.03);

        // Vẽ Big Pixel Agent
        drawBigAgent({
          x: ax,
          y: ay,
          size: ag.size,
          tilt,
          lookX,
          lookY,
          isBlink,
          isSpeaking,
          bob
        });

        // Nếu là agent đang phát biểu -> Vẽ hiệu ứng gõ chữ chống giật, không dùng khung hộp
        if (isSpeaking) {
          drawFixedAnchorTypingText({
            agentX: ax,
            agentY: ay + bob,
            agentSize: ag.size,
            beats: ag.beats,
            phaseTick: activePhaseTick
          });

          // Đốm sáng phấn nhẹ nhàng bay lên bảng
          if (activePhaseTick > 40 && activePhaseTick < 390) {
            const pBeam = ((activePhaseTick - 40) % 90) / 90;
            const beamX = ax + (centerX - ax) * pBeam * 0.7;
            const beamY = (ay + bob - ag.size / 2 - 32) - pBeam * 50;
            const sparkAlpha = Math.sin(pBeam * Math.PI) * 0.6;

            ctx.save();
            ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlpha})`;
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillText('✦', beamX, beamY);
            ctx.restore();
          }
        }
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
  }, [isVi]);

  return (
    <div className="w-full h-full min-h-[500px] sm:min-h-[530px] flex items-center justify-center relative select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default CoEvolutionMotion;
