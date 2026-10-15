import { API_CONFIG } from '../config/apiConfig.js';

const DISMISS_KEY = 'aevum_dismissed_popup_banner_time';

export const PopupBannerService = {
  /**
   * Lấy cấu hình popup banner trực tiếp từ Aevum Cloud Backend
   * Không sử dụng banner mặc định - chỉ hiển thị khi Cloud có dữ liệu hợp lệ
   */
  async getPopupBanner() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const url = `${API_CONFIG.AEVUM_CLOUD_URL}/api/v1/banners/popup`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const json = await response.json();
      if (json && json.success && json.data && json.data.enabled && Array.isArray(json.data.slides)) {
        const activeSlides = json.data.slides
          .filter((s) => s.isActive !== false)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

        if (activeSlides.length > 0) {
          return {
            ...json.data,
            slides: activeSlides
          };
        }
      }
      return null;
    } catch (error) {
      console.warn('[PopupBannerService] Không thể kết nối tới Aevum Cloud:', error.message || error);
      return null;
    }
  },

  /**
   * Kiểm tra người dùng đã chọn không hiển thị lại hôm nay chưa
   */
  isDismissedToday(maxHours = 24) {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false;
    }
    const dismissedTime = localStorage.getItem(DISMISS_KEY);
    if (!dismissedTime) return false;

    const timeDiff = Date.now() - parseInt(dismissedTime, 10);
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff < maxHours;
  },

  /**
   * Đánh dấu không hiển thị lại hôm nay
   */
  setDismissedToday() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    }
  },

  /**
   * Đặt lại trạng thái để hiển thị lại
   */
  resetDismissed() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(DISMISS_KEY);
    }
  }
};

export default PopupBannerService;
