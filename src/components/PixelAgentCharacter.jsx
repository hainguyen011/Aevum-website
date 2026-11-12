import React, { useState, useEffect } from 'react';

/**
 * PixelAgentCharacter - Nhân vật Pixel Agent khối vuông màu trắng với 2 mắt dọc
 * Thiết kế chuẩn theo yêu cầu của Master:
 * - Khối vuông bo góc (squircle) màu trắng (#FFFFFF).
 * - 2 mắt dọc dạng viên thuốc (vertical pill capsule) màu đen/tối (#0A0B0F).
 * - Hiệu ứng chớp mắt tự nhiên (blinking) và tương tác hover.
 */
export const PixelAgentCharacter = ({ 
  size = 40, 
  name = '', 
  className = '', 
  interactive = true,
  status = 'active'
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Natural periodic blinking loop (every 3 to 5 seconds)
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 140);
    }, 2800 + Math.random() * 2400);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setLookOffset({
      x: Math.max(-2, Math.min(2, relX * 4)),
      y: Math.max(-1.5, Math.min(1.5, relY * 3))
    });
  };

  const handleMouseLeave = () => {
    setLookOffset({ x: 0, y: 0 });
  };

  const eyeHeight = isBlinking ? 1.5 : size * 0.28;
  const eyeWidth = size * 0.12;
  const eyeRadius = isBlinking ? 0.75 : eyeWidth / 2;
  const eyeY = (size - eyeHeight) / 2 + lookOffset.y;
  const leftEyeX = size * 0.38 - eyeWidth / 2 + lookOffset.x;
  const rightEyeX = size * 0.62 - eyeWidth / 2 + lookOffset.x;
  const borderRadius = size * 0.28;

  return (
    <div 
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      title={name || 'Aevum Pixel Agent'}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="overflow-visible transition-transform duration-200 hover:scale-105"
      >
        {/* Subtle drop shadow underneath the white block */}
        <defs>
          <filter id={`agent-shadow-${size}`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. White Squircle Body (Khối vuông màu trắng) */}
        <rect
          x="1"
          y="1"
          width={size - 2}
          height={size - 2}
          rx={borderRadius}
          ry={borderRadius}
          fill="#FFFFFF"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth="1"
          filter={`url(#agent-shadow-${size})`}
        />

        {/* 2. Left Vertical Capsule Eye (Mắt trái) */}
        <rect
          x={leftEyeX}
          y={eyeY}
          width={eyeWidth}
          height={eyeHeight}
          rx={eyeRadius}
          ry={eyeRadius}
          fill="#0A0B0F"
          className="transition-all duration-75"
        />

        {/* 3. Right Vertical Capsule Eye (Mắt phải) */}
        <rect
          x={rightEyeX}
          y={eyeY}
          width={eyeWidth}
          height={eyeHeight}
          rx={eyeRadius}
          ry={eyeRadius}
          fill="#0A0B0F"
          className="transition-all duration-75"
        />
      </svg>

      {/* Optional Name Tag below */}
      {name && (
        <span className="mt-1 text-[10px] font-mono font-medium text-slate-300 [html[data-theme='light']_&]:text-slate-800 tracking-wider uppercase">
          {name}
        </span>
      )}
    </div>
  );
};

export default PixelAgentCharacter;

