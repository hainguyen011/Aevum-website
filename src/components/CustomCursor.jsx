import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animFrameId;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if mouse is hovering over interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, [role="button"], .cursor-pointer, kbd');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth inertia interpolation (lerp) for the outer glowing ring
    const render = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  // Determine dynamic scale and spring bounce state
  let cursorStyle = 'w-11 h-11 border-white/45 scale-100';
  if (isMouseDown) {
    cursorStyle = 'w-11 h-11 border-white/60 bg-transparent scale-[0.68]';
  } else if (isHovered) {
    cursorStyle = 'w-14 h-14 border-white/80 bg-white/[0.02] scale-110';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Large Elastic Spring Bounce Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${cursorStyle}`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
          boxShadow: 'none'
        }}
      />
    </div>
  );
};

export default CustomCursor;
