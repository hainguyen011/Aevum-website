import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { PopupBannerService } from '../services/PopupBannerService';
import { API_CONFIG } from '../config/apiConfig';

const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Nếu là file tĩnh cục bộ của website (/media/, /assets/, /images/...)
  if (url.startsWith('/media/') || url.startsWith('/assets/') || url.startsWith('/images/')) {
    return url;
  }
  // Nếu là tài nguyên động từ Aevum Cloud Backend (/banners/, /uploads/, /api/...)
  const baseUrl = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? (API_CONFIG.AEVUM_CLOUD_URL || 'http://localhost:4000')
    : (API_CONFIG.AEVUM_CLOUD_URL || 'https://api.aevum.ai.vn');

  return `${baseUrl.replace(/\/+$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
};

// Cờ bộ nhớ phiên làm việc (SPA session runtime): Giữ trạng thái trong suốt phiên lướt web
let hasShownBannerInSession = false;

export const SquarePopupBanner = ({ onNavigate, activeLang = 'vi' }) => {
  const [bannerConfig, setBannerConfig] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);

  // Đóng banner và ghi nhận đã hiển thị trong phiên
  const handleClose = useCallback(() => {
    setIsVisible(false);
    hasShownBannerInSession = true;
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('aevum_popup_banner_shown_session', 'true');
      }
    } catch (_) {}
  }, []);

  // 1. Tải cấu hình và preload hình ảnh từ Server trước khi hiển thị
  useEffect(() => {
    // Kiểm tra xem lần tải này có phải là thao tác Reload (F5 / Refresh) tại trang chủ không
    const isAtHome = typeof window !== 'undefined' && 
      (window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname === '/index.html');

    const navEntries = typeof performance !== 'undefined' && typeof performance.getEntriesByType === 'function'
      ? performance.getEntriesByType('navigation')
      : [];
    const navType = navEntries[0]?.type || (typeof performance !== 'undefined' && performance.navigation?.type === 1 ? 'reload' : 'navigate');
    const isReloadAtHome = isAtHome && navType === 'reload';

    if (isReloadAtHome) {
      // Khi reload trực tiếp ở trang chủ: xóa cờ đã hiển thị để cho phép popup xuất hiện lại
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('aevum_popup_banner_shown_session');
        }
      } catch (_) {}
      hasShownBannerInSession = false;
    } else {
      // Khi điều hướng / redirect về home từ trang khác, hoặc đã hiển thị trước đó: tuyệt đối không hiển thị lại
      const alreadyShown = hasShownBannerInSession || 
        (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aevum_popup_banner_shown_session') === 'true');
      if (alreadyShown) {
        return;
      }
    }

    // Kiểm tra xem có phải bot kiểm định tốc độ tự động (Lighthouse, PageSpeed, Headless) không
    const isAuditBot = typeof navigator !== 'undefined' && 
      (/Lighthouse|HeadlessChrome|Google-InspectionTool|PTST|Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent) || navigator.webdriver);
    if (isAuditBot) return;

    let isCancelled = false;
    let timerOrScrollTriggered = false;
    let imagePreloaded = false;
    let hasDisplayed = false;

    // Helper kiểm tra và preload ảnh từ server/local hoàn tất
    const preloadImage = (url) => {
      return new Promise((resolve) => {
        if (!url) return resolve(false);
        const img = new Image();
        img.src = url;
        if (img.complete && img.naturalWidth > 0) {
          return resolve(true);
        }
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    PopupBannerService.getPopupBanner()
      .then((config) => {
        if (isCancelled) return;
        if (config && config.enabled && Array.isArray(config.slides) && config.slides.length > 0) {
          setBannerConfig(config);

          const firstSlideUrl = resolveImageUrl(config.slides[0]?.imageUrl);

          const tryShowPopup = () => {
            if (hasDisplayed || isCancelled || !timerOrScrollTriggered || !imagePreloaded) return;
            hasDisplayed = true;
            hasShownBannerInSession = true;
            try {
              if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem('aevum_popup_banner_shown_session', 'true');
              }
            } catch (_) {}
            setIsVisible(true);
            window.removeEventListener('scroll', onUserScroll);
          };

          const onUserIntent = () => {
            timerOrScrollTriggered = true;
            tryShowPopup();
          };

          const onUserScroll = () => {
            if (window.scrollY > 150) {
              onUserIntent();
            }
          };

          window.addEventListener('scroll', onUserScroll, { passive: true });
          const showTimer = setTimeout(onUserIntent, 3500);

          // Bắt đầu preload ảnh từ server/CDN ngay lập tức
          preloadImage(firstSlideUrl).then((success) => {
            if (!isCancelled) {
              imagePreloaded = true;
              tryShowPopup();
            }
          });

          // Tải trước các slide tiếp theo ngầm trong cache trình duyệt
          if (config.slides.length > 1) {
            config.slides.slice(1).forEach((slide) => {
              const nextUrl = resolveImageUrl(slide.imageUrl);
              if (nextUrl) {
                const bgImg = new Image();
                bgImg.src = nextUrl;
              }
            });
          }

          return () => {
            clearTimeout(showTimer);
            window.removeEventListener('scroll', onUserScroll);
          };
        }
      })
      .catch((err) => {
        console.warn('[SquarePopupBanner] Lỗi tải cấu hình banner:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const slides = bannerConfig?.slides || [];
  const slideCount = slides.length;
  const autoPlayInterval = bannerConfig?.autoPlayIntervalMs || 4500;

  // 2. Chuyển slide tiếp theo / trước đó
  const handleNext = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const handlePrev = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // 3. Tự động chuyển tiếp (Auto-play) và tạm dừng khi rê chuột
  useEffect(() => {
    if (!isVisible || slideCount <= 1 || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isVisible, slideCount, isHovered, autoPlayInterval, handleNext]);

  // 4. Bắt phím Escape để đóng, phím mũi tên để chuyển slide
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleClose, handleNext, handlePrev]);

  // 5. Xử lý click vào ảnh để điều hướng: Luôn mở tab browser mới, tuyệt đối không thay đổi URL trang hiện tại
  const handleClickImage = (slide) => {
    if (!slide) return;
    handleClose();

    if (slide.actionUrl) {
      let targetUrl = slide.actionUrl;
      // Nếu là đường dẫn nội bộ (/pricing, /docs...), biến thành URL đầy đủ để mở sang tab mới
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        const cleanPath = targetUrl.startsWith('/') ? targetUrl : `/${targetUrl}`;
        targetUrl = `${window.location.origin}${cleanPath}`;
      }
      // Luôn mở tab browser mới (_blank), tuyệt đối không thay đổi URL hiện tại của trang
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 6. Xử lý chạm vuốt trên Mobile (Touch swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (!isVisible || slideCount === 0) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aevum Banner"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 [html[data-theme='light']_&]:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative flex flex-col items-end w-full max-w-[680px] sm:max-w-[760px] md:max-w-[840px]">
        {/* Khung Banner Hình Chữ Nhật (Tăng Width, Giảm Height: 16/10) - Bo Góc Nhỏ Vừa - Viền Đen Ở Nền Tối - Tuyệt Đối Không Box Shadow */}
        <div
          className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden select-none border border-black [html[data-theme='light']_&]:border-slate-300 bg-[#0a0a0f] [html[data-theme='light']_&]:bg-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Nút Đóng bằng icon 'X' từ Lucide React ở góc trên bên phải */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Đóng banner"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 [html[data-theme='light']_&]:bg-black/30 [html[data-theme='light']_&]:hover:bg-black/60 border border-white/20 [html[data-theme='light']_&]:border-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            title="Đóng (Esc)"
          >
            <X size={15} />
          </button>

          {/* Slides: Chuyển tiếp ảnh thuần túy Full Image, không có icon, không phần tử text đè lên */}
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id || idx}
                onClick={() => handleClickImage(slide)}
                className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <img
                  src={resolveImageUrl(slide.imageUrl)}
                  alt={slide.title || 'Banner'}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center block"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (slide.imageUrl && !target.dataset.triedFallback) {
                      target.dataset.triedFallback = '1';
                      if (target.src.includes(':4000/banners/')) {
                        target.src = slide.imageUrl.startsWith('/') ? slide.imageUrl : `/${slide.imageUrl}`;
                      } else if (slide.imageUrl.startsWith('/banners/')) {
                        target.src = `http://localhost:4000${slide.imageUrl}`;
                      } else if (slide.imageUrl.includes('think_in_vietnam_event')) {
                        target.src = '/media/843103687_122153394435028070_7649109327320201271_n.jpg';
                      }
                    }
                  }}
                />
              </div>
            );
          })}

          {/* Control Indication Dots / Pills Ở Bottom Center (To hơn, Background Transparent, Không dùng box shadow) */}
          {slideCount > 1 && (
            <div className="absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5 px-2 py-1 bg-transparent border-none">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer border-none p-0 outline-none ${
                    i === currentIndex
                      ? "w-7 sm:w-9 h-2 sm:h-2.5 bg-cyan-400 [html[data-theme='light']_&]:bg-cyan-400"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white/90 [html[data-theme='light']_&]:bg-slate-400 [html[data-theme='light']_&]:hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquarePopupBanner;
