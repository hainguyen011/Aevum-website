import { supabase } from './supabaseClient.js';
import { API_CONFIG } from '../config/apiConfig.js';

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
      if (!uid) {
        const { data: { user } } = await supabase.auth.getUser();
        uid = user?.id;
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

      const rawTier = membership?.tier_slug || profile?.membership_tier || 'community';
      const tier = rawTier.toLowerCase();
      const status = membership?.status || profile?.membership_status || 'active';
      const isPro = tier === 'pro';
      const isWaitlist = status === 'beta_waitlist';
      const isTrial = status === 'pro_trial' || isWaitlist;

      let trialDaysRemaining = 30;
      if (membership?.trial_ends_at) {
        const msRemaining = new Date(membership.trial_ends_at).getTime() - Date.now();
        trialDaysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
      } else if (isWaitlist) {
        trialDaysRemaining = 30;
      }

      // Lấy danh sách máy trạm thực tế đã liên kết
      const { data: workstations } = await supabase
        .from('license_activations')
        .select('*')
        .eq('user_id', uid)
        .order('last_verified_at', { ascending: false });

      const activeMachinesCount = workstations?.filter(w => w.is_active)?.length || 0;

      return {
        tier,
        status,
        isPro,
        isTrial,
        isWaitlist,
        trialDaysRemaining,
        trialStartedAt: membership?.trial_started_at,
        trialEndsAt: membership?.trial_ends_at,
        currentPeriodEnd: membership?.current_period_end,
        expiresAt: isTrial ? membership?.trial_ends_at : membership?.current_period_end,
        maxMachines: isPro ? 5 : 1,
        activeMachinesCount: Math.max(1, activeMachinesCount),
        workstations: workstations || [],
        role: profile?.role || 'user',
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
