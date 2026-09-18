import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles, Wind, Eye, RefreshCw, Layers } from 'lucide-react';

/**
 * VietnamAsciiFlag - Hiệu ứng Lá Cờ Việt Nam 3D bằng Ký tự ASCII & Typography Wireframe
 * Lấy cảm hứng từ Aevum ASCII Ribbon Typography với hiệu ứng cờ bay phấp phới chân thực,
 * ánh sáng tương phản 3D và các chế độ hiển thị linh hoạt.
 */
export const VietnamAsciiFlag = ({ 
  className = '', 
  height = 480,
  interactive = true,
  defaultTheme = 'national' // 'national' | 'wireframe' | 'cyber'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [theme, setTheme] = useState(defaultTheme); // 'national' | 'wireframe' | 'cyber'
  const [windIntensity, setWindIntensity] = useState(1.0); // 0.5: gentle, 1.0: normal, 1.8: storm
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, radius: 80, force: 0 });
  const [fps, setFps] = useState(60);

  // Thư viện ký tự mật độ ánh sáng (Darkest -> Brightest)
  const CHAR_RAMP = ' .:-=+*#%@';
  const STAR_CHARS = '★*#%@+';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    // Thiết lập kích thước Canvas dựa theo container
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Thuật toán kiểm tra điểm có nằm trong Ngôi Sao 5 Cánh hay không
    const isPointInStar = (x, y, cx, cy, R) => {
      const r = R * 0.381966; // Tỷ lệ bán kính trong chuẩn của sao vàng
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

    // Vòng lặp render hiệu ứng
    const render = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      time += delta * windIntensity;

      // Tính toán FPS thực tế
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : { width: 800, height };
      const w = rect.width;
      const h = height;

      // Xóa và đổ nền tối sâu chuẩn Cyberpunk
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, w, h);

      // Kích thước ô lưới ký tự ASCII
      const cellW = 8.5;
      const cellH = 13.5;
      const cols = Math.floor(w / cellW);
      const rows = Math.floor(h / cellH);

      // Tỉ lệ lá cờ: Căn giữa trong canvas
      const flagRatio = 3 / 2; // Tỉ lệ chuẩn 3:2 của Quốc kỳ
      let flagWidth = w * 0.88;
      let flagHeight = flagWidth / flagRatio;
      if (flagHeight > h * 0.88) {
        flagHeight = h * 0.88;
        flagWidth = flagHeight * flagRatio;
      }

      const startX = (w - flagWidth) / 2;
      const startY = (h - flagHeight) / 2;
      const flagCols = Math.floor(flagWidth / cellW);
      const flagRows = Math.floor(flagHeight / cellH);

      const startCol = Math.floor(startX / cellW);
      const startRow = Math.floor(startY / cellH);

      // Tâm và bán kính sao vàng
      const starCx = flagCols / 2;
      const starCy = flagRows / 2;
      const starRadius = Math.min(flagCols, flagRows) * 0.28;

      ctx.font = 'bold 11px "JetBrains Mono", "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Vẽ từng ký tự trên mạng lưới cờ 3D
      for (let r = 0; r < flagRows; r++) {
        for (let c = 0; c < flagCols; c++) {
          const u = c / flagCols; // 0 -> 1 theo chiều ngang
          const v = r / flagRows; // 0 -> 1 theo chiều dọc

          // 1. Phương trình mô phỏng sóng lượn 3D của lá vải
          // Gió thổi từ cột cờ (trái u=0) ra đuôi cờ (phải u=1)
          const waveAmp = (u * 14 + 4) * windIntensity;
          const wave1 = Math.sin(u * 7.5 - time * 4.2 + v * 2.5) * waveAmp;
          const wave2 = Math.cos(u * 12.0 - time * 5.8 + v * 4.0) * (waveAmp * 0.35);
          const wave3 = Math.sin(v * 6.0 - time * 2.5) * 3;
          
          let z = wave1 + wave2 + wave3;

          // 2. Tương tác chuột làm xao động mặt cờ (Mouse Wind Wave)
          const px = (startCol + c) * cellW;
          const py = (startRow + r) * cellH;
          if (mousePos.force > 0) {
            const distToMouse = Math.hypot(px - mousePos.x, py - mousePos.y);
            if (distToMouse < mousePos.radius) {
              const mousePerturbation = Math.cos((distToMouse / mousePos.radius) * Math.PI) * mousePos.force * 18;
              z += mousePerturbation;
            }
          }

          // 3. Tính góc pháp tuyến (Normal Vector) để đánh bóng bề mặt sáng tối
          // Đạo hàm theo chiều sóng gió để tính cường độ ánh sáng chiếu tới
          const dz_du = Math.cos(u * 7.5 - time * 4.2 + v * 2.5) * 7.5 * waveAmp;
          const normalX = -dz_du * 0.04;
          const normalY = -0.3;
          const normalZ = 1.0;
          
          // Hướng nguồn sáng chính (Top-Left Light Source)
          const lightX = 0.5;
          const lightY = -0.7;
          const lightZ = 0.6;
          const dot = (normalX * lightX + normalY * lightY + normalZ * lightZ) / 
                      Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ);
          
          // Cường độ ánh sáng từ 0.15 đến 1.0
          const intensity = Math.max(0.15, Math.min(1.0, 0.55 + dot * 0.45));

          // 4. Phân loại vùng: Ngôi sao vàng hay Nền cờ đỏ
          const inStar = isPointInStar(c, r, starCx, starCy, starRadius);

          // 5. Chọn ký tự theo mật độ ánh sáng
          let charIndex = Math.floor(intensity * (CHAR_RAMP.length - 1));
          let char = CHAR_RAMP[charIndex];

          // Tạo viền sắc nét vi mô kiểu ASCII Ribbon (Edge contours)
          const isFlagBorder = (c === 0 || c === flagCols - 1 || r === 0 || r === flagRows - 1);
          if (isFlagBorder) {
            if (r === 0 || r === flagRows - 1) char = '=';
            else if (c === 0 || c === flagCols - 1) char = '|';
          }

          // 6. Phối màu theo chủ đề được chọn
          let color = '';
          let glowColor = '';

          if (theme === 'national') {
            if (inStar) {
              // Ngôi sao vàng năm cánh (Gold/Yellow gradient rực rỡ)
              const starBrightness = Math.min(255, Math.floor(200 + intensity * 55));
              color = `rgb(${starBrightness}, ${Math.floor(starBrightness * 0.82)}, 20)`;
              char = STAR_CHARS[charIndex % STAR_CHARS.length];
              glowColor = 'rgba(255, 215, 0, 0.4)';
            } else {
              // Nền cờ đỏ rực rỡ (Crimson Red shading)
              const redVal = Math.min(255, Math.floor(140 + intensity * 115));
              const greenVal = Math.floor(intensity * 35);
              const blueVal = Math.floor(intensity * 35);
              color = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
              glowColor = 'rgba(218, 37, 29, 0.15)';
            }
          } else if (theme === 'wireframe') {
            // Phong cách đơn sắc giống nguyên bản logo Aevum chữ A
            const vVal = Math.min(255, Math.floor(intensity * 255));
            color = inStar ? `rgb(255, 255, 255)` : `rgb(${vVal}, ${vVal}, ${vVal})`;
            if (inStar) char = '*';
          } else if (theme === 'cyber') {
            // Phong cách Cyberpunk Neon (Cyan & Amber Gold)
            if (inStar) {
              color = `rgb(255, 200, 50)`;
              char = '★';
            } else {
              const cVal = Math.min(255, Math.floor(60 + intensity * 195));
              color = `rgb(20, ${cVal}, ${Math.floor(cVal * 0.9)})`;
            }
          }

          // Tọa độ vẽ sau khi chiếu độ sâu 3D
          const drawX = px + z * 0.25;
          const drawY = py + z * 0.45;

          ctx.fillStyle = color;
          ctx.fillText(char, drawX, drawY);
        }
      }

      // Vẽ hiệu ứng cột cờ công nghệ bên trái (Flagpole Mast)
      const poleX = startX - 8;
      const poleYStart = startY - 15;
      const poleYEnd = startY + flagHeight + 35;
      
      ctx.fillStyle = '#475569';
      ctx.fillRect(poleX, poleYStart, 3.5, poleYEnd - poleYStart);
      
      // Đỉnh cột cờ mạ vàng phát sáng
      ctx.fillStyle = '#EAB308';
      ctx.beginPath();
      ctx.arc(poleX + 1.75, poleYStart, 5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme, windIntensity, mousePos, height]);

  // Xử lý tương tác rê chuột tạo sóng gió
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 90,
      force: 1.0
    });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, force: 0 }));
  };

  return (
    <div 
      ref={containerRef}
      className={`vietnam-ascii-flag-container relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#08080C] select-none ${className}`}
      style={{ height: `${height}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas vẽ các ký tự ASCII 3D */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-crosshair"
      />

      {/* Floating HUD Badges & Metadata */}
      <div className="absolute top-4 left-4 backdrop-blur-md bg-black/70 border border-white/15 px-3.5 py-1.5 rounded-lg flex items-center gap-2.5 text-xs font-mono text-slate-200 shadow-xl pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        <span className="font-bold text-white tracking-wider uppercase">VIETNAM SOVEREIGN AI CORE</span>
        <span className="hidden sm:inline text-slate-400">• ASCII WIREFRAME FLAG</span>
      </div>

      <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/70 border border-white/15 px-3 py-1 rounded-md hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 pointer-events-none">
        <span className="text-emerald-400 font-bold">{fps} FPS</span>
        <span>•</span>
        <span>60 Hz Fluid Matrix</span>
      </div>

      {/* Interactive Controls Toolbar (Top Right) */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        
        {/* Theme Switcher */}
        <div className="backdrop-blur-md bg-black/75 border border-white/15 p-1 rounded-lg flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setTheme('national')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
              theme === 'national' 
                ? 'bg-red-600/80 text-white shadow-md shadow-red-500/30' 
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
            title="Nguyên bản Quốc kỳ (Đỏ & Vàng)"
          >
            🇻🇳 Đỏ Vàng
          </button>

          <button
            onClick={() => setTheme('wireframe')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
              theme === 'wireframe' 
                ? 'bg-white/20 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
            title="Đơn sắc Aevum Ribbon ASCII"
          >
            Chữ A ASCII
          </button>

          <button
            onClick={() => setTheme('cyber')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
              theme === 'cyber' 
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40' 
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
            title="Cyberpunk Matrix Neon"
          >
            Cyber Matrix
          </button>
        </div>

        {/* Wind Breeze Controller */}
        <button
          onClick={() => setWindIntensity(prev => prev === 1.0 ? 1.8 : prev === 1.8 ? 0.5 : 1.0)}
          className="backdrop-blur-md bg-black/75 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white p-2 rounded-lg transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs font-mono"
          title="Chỉnh tốc độ gió phấp phới"
        >
          <Wind size={13} className={windIntensity > 1.2 ? 'text-cyan-400 animate-pulse' : 'text-slate-400'} />
          <span className="hidden md:inline text-[10px]">
            {windIntensity === 1.8 ? 'Gió lộng' : windIntensity === 0.5 ? 'Gió nhẹ' : 'Gió chuẩn'}
          </span>
        </button>
      </div>

      {/* Floating Bottom Right Watermark */}
      <div className="absolute bottom-4 right-4 backdrop-blur-md bg-black/70 border border-white/15 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 shadow-xl pointer-events-none">
        <Sparkles size={12} className="text-yellow-400" />
        <span className="tracking-wide">I2FLABS SOVEREIGN PRIDE</span>
      </div>
    </div>
  );
};

export default VietnamAsciiFlag;
