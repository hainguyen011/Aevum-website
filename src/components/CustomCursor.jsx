import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDodgeZone, setIsDodgeZone] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Progressive Anger Level Emojis mapped to number of failed chase attempts:
  // 1-2 attempts: 😒 (Slightly annoyed)
  // 3-4 attempts: 😠 (Angry)
  // 5-6 attempts: 😑 (Expressionless / Done with this)
  // 7-8 attempts: 😡 (Pissed off)
  // 9+  attempts: 🤬 (Enraged / Swearing)
  const angerEmojis = ['😒', '😠', '😑', '😡', '🤬'];
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animFrameId;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target) {
        // Check if cursor is near I2FLabs section while logo is actively taunting
        const tauntElement = document.querySelector('[data-is-taunting="true"]');
        const inSection = !!target.closest('#i2flabs');
        const isTaunted = !!tauntElement && inSection;
        setIsDodgeZone(isTaunted);

        if (tauntElement) {
          const rawCount = parseInt(tauntElement.getAttribute('data-dodge-count') || '1', 10);
          // Level mapping: 1-2 -> 0, 3-4 -> 1, 5-6 -> 2, 7-8 -> 3, 9+ -> 4
          const level = Math.min(4, Math.floor(Math.max(0, rawCount - 1) / 2));
          setEmojiIndex(level);
        }

        // Check if mouse is hovering over interactive element
        const isInteractive = target.closest('a, button, input, [role="button"], .cursor-pointer, kbd');
        setIsHovered(!!isInteractive && !isTaunted);
      }
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

  // Determine dynamic scale, styling and face state
  let cursorStyle = 'w-11 h-11 border-white/45 scale-100 flex items-center justify-center';
  if (isDodgeZone) {
    cursorStyle = 'w-11 h-11 border-red-500 bg-[#0B0B11]/90 scale-100 flex items-center justify-center shadow-none';
  } else if (isMouseDown) {
    cursorStyle = 'w-11 h-11 border-white/60 bg-transparent scale-[0.68] flex items-center justify-center';
  } else if (isHovered) {
    cursorStyle = 'w-14 h-14 border-white/80 bg-white/[0.02] scale-110 flex items-center justify-center';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Large Elastic Spring Bounce Ring with Progressive Anger Level Emoji mapped to failed attempt count */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${cursorStyle}`}
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
          boxShadow: 'none'
        }}
      >
        {isDodgeZone && (
          <span className="text-[35px] sm:text-[36px] leading-none select-none transition-all duration-200 flex items-center justify-center pointer-events-none transform scale-135">
            {angerEmojis[emojiIndex]}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
