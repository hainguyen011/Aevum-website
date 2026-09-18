import React, { useRef, useEffect } from 'react';

/**
 * VietnamAsciiFlag - Hiệu ứng Lá cờ Việt Nam 3D bằng Ký tự ASCII Trắng Tinh Khiết & Trong suốt
 * Phong cách Typography Ribbon Wireframe nghệ thuật, tối giản tuyệt đối, không UI rườm rà.
 */
export const VietnamAsciiFlag = ({ 
  className = '', 
  height = 460,
  interactive = true 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, force: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    let lastTime = performance.now();

    // Đồng bộ kích thước canvas với màn hình và DPR
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ký tự mật độ ánh sáng phong cách nghệ thuật trắng tinh khiết
    const DENSITY_RAMP = ' .:-=+*#%@';
    const STAR_DENSE_CHARS = '★*#%@+';

    // Thuật toán kiểm tra điểm có nằm trong Ngôi Sao 5 Cánh hay không
    const isPointInStar = (x, y, cx, cy, R) => {
      const r = R * 0.381966; // Tỷ lệ chuẩn bán kính trong của sao vàng
      const points = [];
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;
        const radius = i % 2 === 0 ? R : r;
        points.push({
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle)
        });
      }

      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x, yi = points[i].y;
        const xj = points[j].x, yj = points[j].y;
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Kiểm tra điểm có gần viền cạnh ngôi sao để vẽ đường viền sắc nét
    const isNearStarEdge = (x, y, cx, cy, R) => {
      const r = R * 0.381966;
      const points = [];
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;
        const radius = i % 2 === 0 ? R : r;
        points.push({
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle)
        });
      }

      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const p1 = points[i];
        const p2 = points[j];
        const l2 = (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;
        if (l2 === 0) continue;
        const t = Math.max(0, Math.min(1, ((x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y)) / l2));
        const projX = p1.x + t * (p2.x - p1.x);
        const projY = p1.y + t * (p2.y - p1.y);
        const dist = Math.hypot(x - projX, y - projY);
        if (dist <= 0.85) return true;
      }
      return false;
    };

    // Vòng lặp render chính
    const render = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += delta * 1.1;

      const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : { width: 800, height };
      const w = rect.width;
      const h = height;

      // Xóa canvas hoàn toàn trong suốt (Transparent background)
      ctx.clearRect(0, 0, w, h);

      // Độ phân giải ma trận ký tự mật độ cao, sắc nét
      const cellW = 7.0;
      const cellH = 11.5;

      // Kích thước chuẩn tỉ lệ lá cờ 3:2
      const flagRatio = 3 / 2;
      let flagWidth = w * 0.82;
      let flagHeight = flagWidth / flagRatio;
      if (flagHeight > h * 0.82) {
        flagHeight = h * 0.82;
        flagWidth = flagHeight * flagRatio;
      }

      const flagCols = Math.floor(flagWidth / cellW);
      const flagRows = Math.floor(flagHeight / cellH);
      const startX = (w - flagCols * cellW) / 2;
      const startY = (h - flagRows * cellH) / 2;

      // Tâm và bán kính sao 5 cánh
      const starCx = flagCols / 2;
      const starCy = flagRows / 2;
      const starRadius = Math.min(flagCols, flagRows) * 0.28;

      ctx.font = '10px "JetBrains Mono", "SF Mono", "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Vẽ lưới ký tự 3D lượn sóng
      for (let r = 0; r < flagRows; r++) {
        for (let c = 0; c < flagCols; c++) {
          const u = c / flagCols; // Trục ngang 0 -> 1
          const v = r / flagRows; // Trục dọc 0 -> 1

          // 1. Sóng vải lượn 3D tự nhiên, mượt mà
          const waveAmp = u * 16 + 5;
          const wave1 = Math.sin(u * 6.8 - time * 3.8 + v * 2.2) * waveAmp;
          const wave2 = Math.cos(u * 11.2 - time * 5.2 + v * 3.6) * (waveAmp * 0.32);
          const wave3 = Math.sin(v * 5.5 - time * 2.0) * 4;
          
          let z = wave1 + wave2 + wave3;

          // 2. Tương tác gợn sóng từ chuột
          const px = startX + c * cellW;
          const py = startY + r * cellH;
          if (mouseRef.current.force > 0) {
            const distToMouse = Math.hypot(px - mouseRef.current.x, py - mouseRef.current.y);
            if (distToMouse < 100) {
              const mousePerturbation = Math.cos((distToMouse / 100) * Math.PI) * mouseRef.current.force * 16;
              z += mousePerturbation;
            }
          }

          // 3. Đánh bóng ánh sáng (Lighting normal)
          const dz_du = Math.cos(u * 6.8 - time * 3.8 + v * 2.2) * 6.8 * waveAmp;
          const normalX = -dz_du * 0.035;
          const normalY = -0.3;
          const normalZ = 1.0;
          
          // Hướng nguồn sáng chính chiếu góc trên
          const lightX = 0.55;
          const lightY = -0.7;
          const lightZ = 0.65;
          const dot = (normalX * lightX + normalY * lightY + normalZ * lightZ) / 
                      Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ);
          
          const intensity = Math.max(0.12, Math.min(1.0, 0.52 + dot * 0.48));

          // 4. Kiểm tra phân vùng Ngôi Sao & Cạnh Viền
          const inStar = isPointInStar(c, r, starCx, starCy, starRadius);
          const nearStarEdge = isNearStarEdge(c, r, starCx, starCy, starRadius);
          const isFlagBorder = (c === 0 || c === flagCols - 1 || r === 0 || r === flagRows - 1);

          // 5. Lựa chọn ký tự theo phong cách Ribbon Wireframe
          let char = '';
          let alpha = 0.2 + intensity * 0.8;

          if (isFlagBorder) {
            // Viền ngoài cờ nét thanh tú
            if (r === 0 || r === flagRows - 1) char = '-';
            else char = '|';
            alpha = 0.85;
          } else if (nearStarEdge) {
            // Viền cạnh ngôi sao sắc nét
            char = '*';
            alpha = 1.0;
          } else if (inStar) {
            // Thân ngôi sao vàng nổi bật với mật độ cao
            const sIdx = Math.floor(intensity * (STAR_DENSE_CHARS.length - 1));
            char = STAR_DENSE_CHARS[sIdx];
            alpha = 0.95 + intensity * 0.05;
          } else {
            // Nền lá cờ dệt bằng các đường contour wireframe tinh tế (giống logo chữ A)
            if (r % 2 === 0) {
              const cIdx = Math.floor(intensity * (DENSITY_RAMP.length - 1));
              char = DENSITY_RAMP[cIdx];
            } else {
              // Hàng xen kẽ dạng lưới wireframe thanh lịch
              char = intensity > 0.65 ? ':' : intensity > 0.35 ? '.' : ' ';
            }
          }

          // 6. Màu sắc: Trắng tinh khiết với độ trong suốt (White Monochrome Wireframe)
          if (char !== ' ') {
            const drawX = px + z * 0.28;
            const drawY = py + z * 0.42;

            if (inStar) {
              // Ngôi sao trắng sáng rực rỡ (Pure Bright White Highlight)
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
            } else {
              // Nền vải cờ trắng xám thanh lịch có chiều sâu
              ctx.fillStyle = `rgba(240, 243, 246, ${(alpha * 0.72).toFixed(2)})`;
            }

            ctx.fillText(char, drawX, drawY);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [height]);

  // Tương tác chuột mượt mà không độ trễ
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      force: 1.0
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.force = 0;
  };

  return (
    <div 
      ref={containerRef}
      className={`vietnam-ascii-flag-container relative w-full overflow-hidden select-none bg-transparent ${className}`}
      style={{ height: `${height}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default VietnamAsciiFlag;
