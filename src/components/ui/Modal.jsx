import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * Aevum OS Minimalist Modal Component (Portal-anchored to Viewport)
 * 
 * - Rendered via createPortal directly into document.body to break free from 3D perspective containers
 * - Perfectly centered in viewport (50%/50% single-screen display)
 * - Complete background scroll lock (html, body, touch-action, Lenis stop, overscroll-contain)
 * - Crisp minimalist dark backdrop (zero excessive blur)
 * - Precision top hairline cyan accent
 * 
 * @param {boolean} isOpen - Whether modal is visible
 * @param {Function} onClose - Close handler callback
 * @param {React.ReactNode} [title] - Modal title
 * @param {React.ReactNode} [subtitle] - Subtitle or caption
 * @param {React.ReactNode} children - Modal body content
 * @param {React.ReactNode} [footer] - Optional footer actions
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'full'|string} [maxWidth='md'] - Max width constraint
 * @param {string} [className] - Additional classes for the modal panel
 * @param {boolean} [closeOnBackdrop=true] - Click backdrop to close
 * @param {boolean} [closeOnEsc=true] - Press ESC to close
 * @param {boolean} [showCloseButton=true] - Render minimalist close button
 * @param {string} [closeLabel='Đóng'] - Text for close button (no icons)
 * @param {boolean} [grainy=false] - Enable hero-style grainy gradient atmosphere
 * @param {string} [backdropBlur='backdrop-blur-[2px]'] - Backdrop filter blur
 * @param {string} [backdropBg] - Backdrop overlay color
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
  grainy = false,
  backdropBlur = 'backdrop-blur-[2px]',
  backdropBg = 'bg-black/75 [html[data-theme=\'light\']_&]:bg-slate-900/35',
  hideHeaderBorder = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEsc && e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // Manage body & document scroll locking + Lenis stop
  useEffect(() => {
    if (isOpen) {
      // 1. Lock document and body overflow
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // 2. Pause smooth scroll engines (Lenis)
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }

      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !mounted) return null;

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

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden overscroll-contain select-none"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      onWheel={(e) => {
        // Prevent background scroll bleed if mouse is not over the scrollable body
        if (!e.target.closest('.modal-scroll-area')) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (!e.target.closest('.modal-scroll-area')) {
          e.preventDefault();
        }
      }}
    >
      {/* Crisp Dark Backdrop - Clean & Deep, No Excessive Blur */}
      <div
        className={`fixed inset-0 ${backdropBg} ${backdropBlur} transition-opacity duration-200 pointer-events-auto`}
        onClick={() => closeOnBackdrop && onClose && onClose()}
        aria-hidden="true"
      />

      {/* Modal Surface - Perfectly Centered in Viewport, Fit Single Screen */}
      <div
        className={`modal-surface relative w-full ${maxWidthClasses} max-h-[85vh] sm:max-h-[86vh] flex flex-col bg-[#07090D] [html[data-theme='light']_&]:bg-[#FFFFFF] border border-white/10 [html[data-theme='light']_&]:border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden font-sans text-slate-200 [html[data-theme='light']_&]:text-slate-800 z-10 shadow-2xl select-text transition-all duration-200 pointer-events-auto ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Precision Top Hairline Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 [html[data-theme='light']_&]:via-cyan-400/70 to-transparent z-20 pointer-events-none" />

        {/* ── 1. Subtle Grainy Atmosphere Layer (Optional) ── */}
        {grainy && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
            <div className="modal-atmosphere-gradient absolute inset-0" />
            <div
              className="absolute inset-0 opacity-[0.04] [html[data-theme='light']_&]:opacity-[0.02] mix-blend-overlay z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterModal'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterModal)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
              }}
            />
          </div>
        )}

        {/* ── 2. Modal Content (Header + Scrollable Body + Pinned Footer) ── */}
        <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Header - Fixed to top of modal */}
          {(title || showCloseButton) && (
            <div className={`flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 ${
              hideHeaderBorder ? '' : 'border-b border-white/10 [html[data-theme=\'light\']_&]:border-slate-200/80'
            } backdrop-blur-[2px] shrink-0`}>
              <div className="space-y-1.5 sm:space-y-2 pr-4">
                {title && (
                  <h3 className="text-sm sm:text-base font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-wide uppercase font-sans">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <div className="text-xs text-slate-300/90 [html[data-theme='light']_&]:text-slate-500 font-normal">
                    {subtitle}
                  </div>
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

          {/* Modal Body - Scrollable Area (Contained within single screen) */}
          <div 
            className="modal-scroll-area p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin overscroll-contain select-text" 
            data-lenis-prevent
          >
            {children}
          </div>

          {/* Optional Footer - Seamless Background Matching Modal Body */}
          {footer && (
            <div className="px-5 sm:px-6 py-3 sm:py-3.5 bg-transparent shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};

export default Modal;
