import { API_CONFIG } from '../config/apiConfig.js';

const DISMISS_KEY = 'aevum_dismissed_popup_banner_time';

const DEFAULT_BANNER_CONFIG = {
  enabled: true,
  autoPlayIntervalMs: 4500,
  pauseOnHover: true,
  showIndicators: true,
  showNavigation: true,
  aspectRatio: 'square',
  maxDismissHours: 24,
  slides: [
    {
      id: 'aevum-os-v1-dev',
      title: 'Aevum OS v1.0.0 Dev',
      subtitle: 'Kỷ nguyên mới của Hệ điều hành AI Agent',
      description: 'Nền tảng hệ điều hành trí tuệ nhân tạo chuyên biệt cho Nhà phát triển, tối ưu hóa toàn diện dòng chảy tư duy lập trình.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      actionUrl: '/changelog',
      ctaText: 'Khám phá ngay',
      target: '_self',
      badge: 'PHIÊN BẢN MỚI',
      badgeColor: 'cyan',
      accentColor: '#0ea5e9',
      displayOrder: 1,
      isActive: true
    },
    {
      id: 'living-memory-vault',
      title: 'Living Memory Vault',
      subtitle: 'Ký ức Sống & Trực giác Tác tử Thông minh',
      description: 'Kho lưu trữ trí nhớ dài hạn phân tán kết hợp chữ ký Ed25519, giúp các AI Agent không bao giờ mất ngữ cảnh làm việc.',
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
      actionUrl: '/docs',
      ctaText: 'Đọc tài liệu',
      target: '_self',
      badge: 'LÕI BỘ NHỚ',
      badgeColor: 'purple',
      accentColor: '#a855f7',
      displayOrder: 2,
      isActive: true
    },
    {
      id: 'pipernet-autonomous-swarm',
      title: 'PiperNet Swarm P2P',
      subtitle: 'Mạng lưới Bầy đàn Tác tử Độc lập',
      description: 'Giao thức truyền thông phân tán siêu tốc cho phép các Agent tự phối hợp, phản biện và hoàn thành dự án phức tạp.',
      imageUrl: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80',
      actionUrl: '/explore',
      ctaText: 'Khám phá mạng lưới',
      target: '_self',
      badge: 'SWARM NETWORK',
      badgeColor: 'emerald',
      accentColor: '#10b981',
      displayOrder: 3,
      isActive: true
    },
    {
      id: 'pro-trial-entitlement',
      title: 'Trải Nghiệm Aevum Pro',
      subtitle: 'Nâng cấp Sức mạnh AI Tối đa',
      description: 'Kích hoạt 14 ngày dùng thử Aevum Pro hoàn toàn miễn phí, tận hưởng đầy đủ năng lực điện toán và mô hình thông minh nhất.',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80',
      actionUrl: '/pricing',
      ctaText: 'Đăng ký dùng thử',
      target: '_self',
      badge: 'ƯU ĐÃI ĐẶC BIỆT',
      badgeColor: 'amber',
      accentColor: '#f59e0b',
      displayOrder: 4,
      isActive: true
    }
  ]
};

export const PopupBannerService = {
  /**
   * Lấy cấu hình popup banner từ Aevum Cloud Backend
   * Nếu có lỗi hoặc mạng chậm, fallback an toàn về DEFAULT_BANNER_CONFIG
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
        throw new Error(`HTTP error ${response.status}`);
      }

      const json = await response.json();
      if (json && json.success && json.data) {
        return json.data;
      }
      return DEFAULT_BANNER_CONFIG;
    } catch (error) {
      console.warn('[PopupBannerService] Không thể kết nối tới Aevum Cloud, sử dụng banner mặc định:', error.message || error);
      return DEFAULT_BANNER_CONFIG;
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
