/**
 * MembershipService - Kết nối với Aevum Cloud Backend
 * Quản lý bảng giá, kích hoạt 14-Day Pro Beta Trial và lấy thông tin quyền hạn (Entitlements).
 */

const getCloudApiUrl = () => {
  const envUrl = import.meta.env.VITE_AEVUM_CLOUD_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:4000';
};

export const MembershipService = {
  /**
   * Lấy danh sách gói giá công khai từ Aevum Cloud
   */
  async getPricingTiers() {
    try {
      const response = await fetch(`${getCloudApiUrl()}/api/v1/pricing/tiers`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('[MembershipService] Không thể tải bảng giá từ Cloud API, dùng fallback cục bộ:', error);
      return null;
    }
  },

  /**
   * Kích hoạt 14-Day Pro Beta Trial cho tài khoản người dùng
   * @param {Object} surveyData Thông tin khảo sát từ TrialModal
   * @param {string} accessToken JWT access token từ Supabase Auth
   */
  async activateProTrial(surveyData = {}, accessToken) {
    if (!accessToken) {
      throw new Error('Yêu cầu đăng nhập trước khi kích hoạt gói dùng thử.');
    }

    try {
      const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/activate-trial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(surveyData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || `Lỗi kích hoạt (HTTP ${response.status})`);
      }

      return data;
    } catch (error) {
      console.error('[MembershipService] Lỗi kích hoạt Pro Beta Trial:', error);
      throw error;
    }
  },

  /**
   * Lấy thông tin quyền hạn & trạng thái gói cước của người dùng hiện tại
   * @param {string} accessToken JWT access token từ Supabase Auth
   */
  async getCurrentEntitlements(accessToken) {
    if (!accessToken) return null;

    try {
      const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/current`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('[MembershipService] Lỗi lấy quyền hạn membership:', error);
      return null;
    }
  },

  /**
   * Khởi tạo yêu cầu nâng cấp gói Pro
   */
  async requestUpgrade(billingCycle = 'monthly', accessToken) {
    if (!accessToken) throw new Error('Yêu cầu đăng nhập');

    const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ billingCycle })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi nâng cấp');
    return data;
  }
};
