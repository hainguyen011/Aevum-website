import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import i2fLabsLogo from '../../assets/I2FLabs-logo.png';
import { translations } from '../data/translations';

export const I2FLabsSection = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;
  const containerRef = useRef(null);

  const [offset, setOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const [isTaunting, setIsTaunting] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [tauntCount, setTauntCount] = useState(0);

  const isDodgingRef = useRef(false);
  const idleTimerRef = useRef(null);
  const hideTauntTimerRef = useRef(null);

  const isVi = activeLang === 'vi';

  const cuteQuotesVi = [
    'Ơ kìa! Đừng đụng vào mà! 🙈',
    'Né nè! Thử bắt tớ xem! 💨',
    'Gần quá rùi nha! ⚡',
    'I2FLabs Shield: Không thể chạm vào! 🧪✨',
    'Ôi giật mình! Né gấp! 🙀🚀',
    'Tay ai mà nhanh dữ dội dọ! 🏃‍♂️💨',
    'Bình thí nghiệm này là của Aevum OS nha! 🔬🛡️',
    'Áaaa! Chuột tới, chạy thôi! 🐁🏃💨',
    'Tốc độ ánh sáng né nhẹ cái nè! ⚡✨',
  ];

  const cuteQuotesEn = [
    'Eek! Too close! 🙈',
    'Can’t touch this! 💨',
    'Whoops! Out of reach! ⚡',
    'I2FLabs Shield: Untouchable! 🧪✨',
    'Woah! Quick dodge! 🙀🚀',
    'Fast fingers detected! 🏃‍♂️💨',
    'Hands off the quantum flask! 🔬🛡️',
    'Ahhh! Mouse incoming, run! 🐁🏃💨',
    'Dodge mode: 100% active! ⚡✨',
  ];

  const tauntQuotesVi = [
    'Lè lè~ Bắt hụt rùi nha! 😜✨',
    'Hehe! Tớ nhanh hơn rùi! ⚡😝',
    'Chịu thua rùi phải hông~ 🤭💖',
    'Tưởng bắt được tớ sao? Nằm mơ đuy! 😜🔥',
    'Á ha! Tốc độ bàn tay chưa đủ nhanh rùi~ 🤭💨',
    'Lại đây nữa đi, tớ né cho xem tiếp nè! 😜🚀',
    'Hehe, Aevum Agent AI đỉnh chưa! 🤖✨',
    'Thua rùi nha! Cho 100 điểm cố gắng! 💯🥳',
    'Muốn chạm vào tớ thì phải nâng cấp chuột nha! 🖱️⚡',
  ];

  const tauntQuotesEn = [
    'Hehe! Missed me! 😜✨',
    'Too slow! Catch me if you can! ⚡😝',
    'Gave up already? Nice try! 🙈💖',
    'Faster than light! ⚡🔥',
    'Aha! Your cursor isn’t fast enough~ 🤭💨',
    'Come closer again, I dare you! 😜🚀',
    'Hehe, Aevum OS agility is top tier! 🤖✨',
    'Game Over! Points for effort though! 💯🥳',
    'Upgrade your mouse to touch this flask! 🖱️⚡',
  ];

  const cuteQuotes = isVi ? cuteQuotesVi : cuteQuotesEn;
  const tauntQuotes = isVi ? tauntQuotesVi : tauntQuotesEn;

  useEffect(() => {
    const triggerTaunt = () => {
      setOffset({ x: 0, y: 0, rotate: 0 });
      isDodgingRef.current = false;
      setIsDodging(false);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (hideTauntTimerRef.current) clearTimeout(hideTauntTimerRef.current);

      setIsTaunting(true);
      setTauntCount((prev) => prev + 1);

      // Hide taunt message quickly after 2.2 seconds
      hideTauntTimerRef.current = setTimeout(() => {
        setIsTaunting(false);
      }, 2200);
    };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const logoCenterX = rect.left + rect.width / 2;
      const logoCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - logoCenterX;
      const dy = e.clientY - logoCenterY;
      const distance = Math.hypot(dx, dy);
      const threshold = 190; // Trigger distance in pixels

      if (distance < threshold) {
        // Clear taunt state while actively chasing
        if (hideTauntTimerRef.current) clearTimeout(hideTauntTimerRef.current);
        setIsTaunting(false);

        // Calculate opposite vector direction away from cursor
        const force = (1 - distance / threshold) * 115;
        const angle = Math.atan2(dy, dx);
        
        let pushX = -Math.cos(angle) * force;
        let pushY = -Math.sin(angle) * force;

        // Clamp to stay inside container bounds safely
        const maxBoundaryX = 120;
        const maxBoundaryYUp = -60;
        const maxBoundaryYDown = 80;
        pushX = Math.max(-maxBoundaryX, Math.min(maxBoundaryX, pushX));
        pushY = Math.max(maxBoundaryYUp, Math.min(maxBoundaryYDown, pushY));

        // Cute springy tilt rotation
        const tilt = (pushX / maxBoundaryX) * 20;

        setOffset({ x: pushX, y: pushY, rotate: tilt });

        if (!isDodgingRef.current) {
          isDodgingRef.current = true;
          setIsDodging(true);
          setDodgeCount((prev) => prev + 1);
        }

        // If user stops moving mouse for 2s (gives up chasing), trigger taunt laugh!
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          triggerTaunt();
        }, 2000);

      } else {
        // Mouse moved outside threshold zone
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        if (isDodgingRef.current) {
          triggerTaunt();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (hideTauntTimerRef.current) clearTimeout(hideTauntTimerRef.current);
    };
  }, []);

  // Programmatically highlight I2FLabs in title
  const titleText = t.i2flabs.title;
  let titleNode = titleText;
  if (titleText.includes('I2FLabs')) {
    const parts = titleText.split('I2FLabs');
    titleNode = (
      <>
        {parts[0]}<span className="text-cyan-400">I2FLabs</span>{parts[1]}
      </>
    );
  }

  return (
    <div id="i2flabs" className="bg-[#0B0B11] border-b border-white/10 relative">

      {/* === Hero Header: Content Left / Cute Dodging Logo Right === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[280px]">

        {/* LEFT: Cute Interactive Dodging Logo Container */}
        <div 
          ref={containerRef}
          data-is-taunting={isTaunting ? "true" : "false"}
          data-dodge-count={dodgeCount}
          className="i2f-logo-stage relative flex items-center justify-center px-8 sm:px-12 pt-16 pb-12 sm:pt-20 sm:pb-16 order-1 select-none min-h-[300px]"
        >
          {/* Dodging Flask Logo Element + Dynamic Floating Quote */}
          <div
            className="relative flex flex-col items-center justify-center transition-transform duration-200 ease-out cursor-pointer will-change-transform"
            style={{
              transform: isTaunting ? 'none' : `translate3d(${offset.x}px, ${offset.y}px, 0px) rotate(${offset.rotate}deg)`,
              transition: isDodging ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Dynamic Floating White Text attached right above the logo (Dodging or Taunting) */}
            <div 
              className={`absolute -top-8 whitespace-nowrap font-mono text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 pointer-events-none z-20 select-none ${
                isDodging 
                  ? 'opacity-100 scale-110 -translate-y-1 text-white' 
                  : isTaunting
                  ? 'opacity-100 scale-110 -translate-y-2 text-white'
                  : 'opacity-0 scale-75 translate-y-3 text-white'
              }`}
              style={{
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {isDodging 
                ? cuteQuotes[dodgeCount % cuteQuotes.length]
                : isTaunting 
                ? tauntQuotes[tauntCount % tauntQuotes.length]
                : ''}
            </div>

            {/* Original I2FLabs Logo */}
            <img
              src={i2fLabsLogo}
              alt="I2FLabs Viet Nam Logo"
              className={`max-h-[130px] sm:max-h-[160px] w-auto object-contain select-none pointer-events-none transition-all ${
                isTaunting ? 'animate-giggle' : ''
              }`}
            />
          </div>
        </div>

        {/* RIGHT: Hero Content */}
        <div className="px-8 sm:px-12 py-10 sm:py-14 space-y-4 flex flex-col justify-center order-2">
          {/* Label */}
          <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase select-none">
            ENGINEERED BY I2FLABS VIET NAM
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
            {titleNode}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
            {t.i2flabs.desc}
          </p>

          {/* Subtle Arrow Icon */}
          <div className="flex items-center gap-2 pt-2">
            <ArrowRight size={13} className="text-white shrink-0" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              I2FLabs Core R&D — Hanoi / Saigon, Vietnam
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default I2FLabsSection;
