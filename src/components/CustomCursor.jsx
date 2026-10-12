import React, { useEffect, useState, useRef } from 'react';
import unikornLogo from '../../assets/unikorn-logo.webp';
import unikornLogoDark from '../../assets/unikorn-logo-dark.webp';

/**
 * High-Performance Hardware-Accelerated Custom Cursor
 * - Zero React re-renders during mouse movement (direct GPU transform3d updates via rAF).
 * - Only state updates when zone thresholds change (Unikorn, Dodge, Hover, MouseDown).
 * - Disables completely on touch/mobile devices with zero overhead.
 */
export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDodgeZone, setIsDodgeZone] = useState(false);
  const [isUnikornZone, setIsUnikornZone] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);

  const angerEmojis = ['😒', '😠', '😑', '😡', '🤬'];

  const ringRef = useRef(null);
  const unikornRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isCoarse = useRef(typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true);

  useEffect(() => {
    if (isCoarse.current) return;

    let animFrameId;

    const handleMouseMove = (e) => {
      const isOverRightScrollbar = e.clientX >= (document.documentElement.clientWidth - 8);
      const isOverBottomScrollbar = e.clientY >= (document.documentElement.clientHeight - 8);

      if (isOverRightScrollbar || isOverBottomScrollbar) {
        setIsVisible(false);
        return;
      }

      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      const target = e.target;
      if (target) {
        const inUnikorn = !!target.closest('#unikorn, [data-unikorn-zone]');
        setIsUnikornZone(prev => (prev !== inUnikorn ? inUnikorn : prev));

        const tauntElement = document.querySelector('[data-is-taunting="true"]');
        const inSection = !!target.closest('#i2flabs');
        const isTaunted = !!tauntElement && inSection;
        setIsDodgeZone(prev => (prev !== (isTaunted && !inUnikorn) ? (isTaunted && !inUnikorn) : prev));

        if (tauntElement) {
          const rawCount = parseInt(tauntElement.getAttribute('data-dodge-count') || '1', 10);
          const level = Math.min(4, Math.floor(Math.max(0, rawCount - 1) / 2));
          setEmojiIndex(prev => (prev !== level ? level : prev));
        }

        const isInteractive = target.closest('a, button, input, [role="button"], .cursor-pointer, kbd');
        const newHover = !!isInteractive && !isTaunted && !inUnikorn;
        setIsHovered(prev => (prev !== newHover ? newHover : prev));
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      const transformStr = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform = transformStr;
      }
      if (unikornRef.current) {
        unikornRef.current.style.transform = `${transformStr} scale(${unikornRef.current.dataset.scale || '0'})`;
      }

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
  }, []);

  if (isCoarse.current) return null;

  // Determine dynamic scale, styling and special cursor zone state
  let cursorStyle = 'w-11 h-11 border-white/45 scale-100 flex items-center justify-center';
  if (isUnikornZone) {
    cursorStyle = 'w-2 h-2 border-transparent bg-transparent scale-0 flex items-center justify-center shadow-none overflow-visible';
  } else if (isDodgeZone) {
    cursorStyle = 'w-11 h-11 border-red-500 bg-[#07090D]/90 scale-100 flex items-center justify-center shadow-none';
  } else if (isMouseDown) {
    cursorStyle = 'w-11 h-11 border-white/60 bg-transparent scale-[0.68] flex items-center justify-center';
  } else if (isHovered) {
    cursorStyle = 'w-14 h-14 border-white/80 bg-white/[0.02] scale-110 flex items-center justify-center';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Elastic Spring Bounce Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${cursorStyle}`}
        style={{
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`,
          opacity: (isUnikornZone || !isVisible) ? 0 : 1,
        }}
      >
        {isDodgeZone && (
          <span className="text-[35px] sm:text-[36px] leading-none select-none transition-all duration-200 flex items-center justify-center pointer-events-none transform scale-135">
            {angerEmojis[emojiIndex]}
          </span>
        )}
      </div>

      {/* Unikorn Logo — blooms independently when entering Unikorn zone */}
      <div
        ref={unikornRef}
        data-scale={isUnikornZone ? '1' : '0'}
        className="fixed top-0 left-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${isUnikornZone ? 1 : 0})`,
          opacity: isUnikornZone ? 1 : 0,
        }}
      >
        {/* Dark Mode White Unikorn Logo */}
        <img
          src={unikornLogo}
          alt="Unikorn Logo"
          className="dark-logo w-28 h-28 object-contain pointer-events-none animate-spin"
          style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        {/* Light Mode Black Unikorn Logo */}
        <img
          src={unikornLogoDark}
          alt="Unikorn Logo"
          className="light-logo w-28 h-28 object-contain pointer-events-none animate-spin"
          style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default CustomCursor;
