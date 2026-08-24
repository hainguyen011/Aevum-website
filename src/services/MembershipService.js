import { supabase } from './supabaseClient.js';

const getCloudApiUrl = () => API_CONFIG.AEVUM_CLOUD_URL;

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
   * Tự động fallback sang truy vấn trực tiếp Supabase Database khi Cloud API 401 hoặc offline
   */
  async getCurrentEntitlements(accessToken, userId) {
    // 1. Thử gọi qua Aevum Cloud Backend
    if (accessToken) {
      try {
        const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/current`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.tier) return data;
        }
      } catch (error) {
        // Tiếp tục fallback bên dưới
      }
    }

    // 2. Fallback trực tiếp qua Supabase Client
    try {
      let uid = userId;
      let email = '';
      if (!uid) {
        const { data: { user } } = await supabase.auth.getUser();
        uid = user?.id;
        email = user?.email || '';
      }

      if (!uid) return null;

      const { data: membership } = await supabase
        .from('user_memberships')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .maybeSingle();

      const userEmail = email || profile?.email || '';
      const isAdmin = profile?.role === 'admin' || ['nguyenhuyhaidx2@gmail.com', 'hainguyen0112358@gmail.com'].includes(userEmail.toLowerCase());

      const tier = isAdmin ? 'enterprise' : (membership?.tier_slug || (profile?.membership_tier ? profile.membership_tier.toLowerCase() : 'community'));
      const status = membership?.status || 'active';
      const isPro = tier === 'pro' || isAdmin;
      const isWaitlist = status === 'beta_waitlist';
      const isTrial = status === 'pro_trial' || isWaitlist;

      return {
        tier,
        status,
        isPro,
        isTrial,
        isWaitlist,
        trialDaysRemaining: isWaitlist ? 30 : 30,
        role: isAdmin ? 'admin' : (profile?.role || 'user'),
      };
    } catch (err) {
      console.warn('[MembershipService] Lỗi fallback Supabase:', err);
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
