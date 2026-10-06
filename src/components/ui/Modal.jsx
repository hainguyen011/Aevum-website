import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * Aevum OS Minimalist Grainy Gradient Popup Modal Component
 * 
 * Reusable modal matching the Aevum OS Hero / Banner atmosphere:
 * - Grainy linear gradient atmosphere with top luminous crest
 * - Authentic SVG fractal noise texture (mix-blend-overlay)
 * - Micro-grain color dodge highlight layer
 * - Subtle DeepMind neural particle dot constellation
 * - Precision top hairline glow accent
 * - Zero box-shadows (shadow-none)
 * - Zero icons, zero emojis, clean Google Sans Flex typography
 * - High-contrast monochromatic elements & signature white pill CTA
 * 
 * @param {boolean} isOpen - Whether modal is visible
 * @param {Function} onClose - Close handler callback
 * @param {React.ReactNode} [title] - Modal title
 * @param {React.ReactNode} [subtitle] - Subtitle or caption
 * @param {React.ReactNode} children - Modal body content
 * @param {React.ReactNode} [footer] - Optional footer actions
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'full'|string} [maxWidth='md'] - Max width constraint
 * @param {string} [className] - Additional classes for the modal panel
 * @param {boolean} [closeOnBackdrop=true] - Click backdrop to close
 * @param {boolean} [closeOnEsc=true] - Press ESC to close
 * @param {boolean} [showCloseButton=true] - Render minimalist close button
 * @param {string} [closeLabel='Đóng'] - Text for close button (no icons)
 * @param {boolean} [grainy=true] - Enable hero-style grainy gradient atmosphere
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'md',
  className = '',
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeLabel = 'Đóng',
  grainy = true,
}) => {
  // ESC key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // Manage body scroll and key listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Max width presets
  const maxWidthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
    '2xl': 'max-w-3xl',
    '3xl': 'max-w-4xl',
    '4xl': 'max-w-5xl',
    full: 'max-w-6xl',
  }[maxWidth] || maxWidth;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-black/80 [html[data-theme='light']_&]:bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={() => closeOnBackdrop && onClose && onClose()}
        aria-hidden="true"
      />

      {/* Modal Surface - Deep black #07090D in Dark Mode / Crisp White in Light Mode */}
      <div
        className={`modal-surface relative w-full ${maxWidthClasses} max-h-[calc(100vh-2rem)] sm:max-h-[92vh] flex flex-col bg-[#07090D] [html[data-theme='light']_&]:bg-[#FFFFFF] border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden font-sans text-slate-200 [html[data-theme='light']_&]:text-slate-800 z-10 m-auto shadow-none [html[data-theme='light']_&]:shadow-2xl select-text transition-colors ${className}`.trim()}
      >
        {/* ── 1. Grainy Gradient Atmosphere Layer ── */}
        {grainy && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            {/* Primary Linear Gradient Flow */}
            <div className="modal-atmosphere-gradient absolute inset-0" />

            {/* Ethereal Top Horizon Wash (Curved ambient light crest) */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[110%] h-[180px]"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56, 189, 248, 0.18) 0%, transparent 100%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Precision Top Hairline Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 [html[data-theme='light']_&]:via-cyan-400/60 to-transparent z-10" />

            {/* Authentic Fine Film Grain Noise */}
            <div
              className="absolute inset-0 opacity-[0.08] [html[data-theme='light']_&]:opacity-[0.03] mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterModal'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterModal)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
              }}
            />

            {/* Ethereal Glow Horizon Wash */}
            <div className="absolute top-0 right-0 w-2/3 h-64 overflow-hidden opacity-25 [html[data-theme='light']_&]:opacity-40 z-[2] bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent" />
          </div>
        )}

        {/* ── 2. Modal Content (Relative z-10 Above Atmosphere) ── */}
        <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Header - Minimalist line divider, high-contrast typography, text close button */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 [html[data-theme='light']_&]:border-slate-200/80 backdrop-blur-[2px] shrink-0">
              <div className="space-y-0.5 pr-4">
                {title && (
                  <h3 className="text-sm sm:text-base font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-wide uppercase font-sans">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs text-slate-300/90 [html[data-theme='light']_&]:text-slate-500 font-normal">
                    {subtitle}
                  </p>
                )}
              </div>

              {showCloseButton && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Đóng"
                  className="w-8 h-8 rounded-full border border-white/15 [html[data-theme='light']_&]:border-slate-300/80 hover:border-white/30 [html[data-theme='light']_&]:hover:border-slate-400 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 hover:bg-white/[0.12] [html[data-theme='light']_&]:hover:bg-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-600 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center shrink-0 backdrop-blur-sm group"
                >
                  <X className="w-4 h-4 stroke-[1.75] transition-transform duration-200 group-hover:scale-110" />
                </button>
              )}
            </div>
          )}

          {/* Modal Body - Scrollable if content is tall */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin">
            {children}
          </div>

          {/* Optional Footer */}
          {footer && (
            <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 [html[data-theme='light']_&]:border-slate-200/80 bg-black/40 [html[data-theme='light']_&]:bg-slate-50 backdrop-blur-sm shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
