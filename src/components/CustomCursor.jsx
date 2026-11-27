import React, { useEffect, useState, useRef } from 'react';
import unikornLogo from '../../assets/unikorn-logo.webp';
import unikornLogoDark from '../../assets/unikorn-logo-dark.webp';

/**
 * Kael 120Hz Demand-Driven Hardware-Accelerated Custom Cursor
 * - Runs rAF strictly while the cursor follower ring is actively converging;
 *   cancels automatically when settled (0% idle CPU/GPU drain).
 * - Never combines CSS `transition-all` with rAF `style.transform` (eliminates 300ms transform contention).
 * - Disables completely on touch/coarse-pointer or prefers-reduced-motion devices.
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
  const isVisibleRef = useRef(false);
  const isDisabled = useRef(
    typeof window !== 'undefined'
      ? (window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      : true
  );

  useEffect(() => {
    if (isDisabled.current) return;

    let animFrameId = null;

    const render = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      if (Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08) {
        ringPos.current.x = mousePos.current.x;
        ringPos.current.y = mousePos.current.y;
        const settledStr = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
        if (ringRef.current) ringRef.current.style.transform = settledStr;
        if (unikornRef.current) {
          unikornRef.current.style.transform = `${settledStr} scale(${unikornRef.current.dataset.scale || '0'})`;
        }
        animFrameId = null;
        return;
      }

      ringPos.current.x += dx * 0.22;
      ringPos.current.y += dy * 0.22;

      const transformStr = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform = transformStr;
      }
      if (unikornRef.current) {
        unikornRef.current.style.transform = `${transformStr} scale(${unikornRef.current.dataset.scale || '0'})`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (animFrameId === null && !document.hidden) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      const isOverRightScrollbar = e.clientX >= (document.documentElement.clientWidth - 8);
      const isOverBottomScrollbar = e.clientY >= (document.documentElement.clientHeight - 8);

      if (isOverRightScrollbar || isOverBottomScrollbar) {
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
        return;
      }

      if (!isVisibleRef.current) {
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      scheduleRender();

      const target = e.target;
      if (target && typeof target.closest === 'function') {
        const inUnikorn = !!target.closest('#unikorn, [data-unikorn-zone]');
        setIsUnikornZone(prev => (prev !== inUnikorn ? inUnikorn : prev));

        const inI2F = !!target.closest('#i2flabs');
        const tauntElement = inI2F ? document.querySelector('[data-is-taunting="true"]') : null;
        const isTaunted = !!tauntElement && inI2F;
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
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (isDisabled.current) return null;

  let cursorStyle = "w-11 h-11 border-white/45 [html[data-theme='light']_&]:border-slate-800/45 scale-100 flex items-center justify-center";
  if (isUnikornZone) {
    cursorStyle = 'w-2 h-2 border-transparent bg-transparent scale-0 flex items-center justify-center shadow-none overflow-visible';
  } else if (isDodgeZone) {
    cursorStyle = 'w-11 h-11 border-red-500 bg-[#07090D]/90 scale-100 flex items-center justify-center shadow-none';
  } else if (isMouseDown) {
    cursorStyle = "w-11 h-11 border-white/60 [html[data-theme='light']_&]:border-slate-800/60 bg-transparent scale-[0.68] flex items-center justify-center";
  } else if (isHovered) {
    cursorStyle = "w-14 h-14 border-white/80 [html[data-theme='light']_&]:border-slate-900/80 bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-900/[0.03] scale-110 flex items-center justify-center";
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Elastic Ring (CSS transitions excluded from `transform` so rAF stays zero-lag) */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform ${cursorStyle}`}
        style={{
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`,
          opacity: (isUnikornZone || !isVisible) ? 0 : 1,
        }}
      >
        {isDodgeZone && (
          <span className="text-[35px] sm:text-[36px] leading-none select-none flex items-center justify-center pointer-events-none scale-135">
            {angerEmojis[emojiIndex]}
          </span>
        )}
      </div>

      {/* Unikorn Logo — blooms independently when entering Unikorn zone */}
      <div
        ref={unikornRef}
        data-scale={isUnikornZone ? '1' : '0'}
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${isUnikornZone ? 1 : 0})`,
          opacity: isUnikornZone ? 1 : 0,
        }}
      >
        <img
          src={unikornLogo}
          alt="Unikorn Logo"
          className="dark-logo w-28 h-28 object-contain pointer-events-none animate-spin"
          style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
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
