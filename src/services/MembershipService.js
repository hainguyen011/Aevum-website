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
   * Lấy trạng thái hồ sơ và gói cước (tương thích đa năng userId hoặc accessToken)
   */
  async getProfileStatus(userIdOrToken, maybeUserId) {
    let accessToken = null;
    let userId = null;
    if (typeof userIdOrToken === 'string') {
      if (userIdOrToken.includes('.')) {
        accessToken = userIdOrToken;
        userId = maybeUserId;
      } else {
        userId = userIdOrToken;
        accessToken = maybeUserId || null;
      }
    }
    return this.getCurrentEntitlements(accessToken, userId);
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

      const expiresAt = isTrial ? membership?.trial_ends_at : membership?.current_period_end;
      let daysRemaining = null;
      if (expiresAt) {
        const msRemaining = new Date(expiresAt).getTime() - Date.now();
        daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
      } else if (isWaitlist) {
        daysRemaining = 30;
      }

      return {
        tier,
        status,
        isPro,
        isTrial,
        isWaitlist,
        trialDaysRemaining,
        daysRemaining,
        trialStartedAt: membership?.trial_started_at,
        trialEndsAt: membership?.trial_ends_at,
        currentPeriodStart: membership?.current_period_start,
        currentPeriodEnd: membership?.current_period_end,
        cancelAtPeriodEnd: Boolean(membership?.cancel_at_period_end),
        expiresAt,
        maxMachines: isPro ? 5 : 1,
        activeMachinesCount: Math.max(1, activeMachinesCount),
        workstations: workstations || [],
        role: profile?.role || 'user',
        builderRetention: membership?.metadata?.builderRetention || null,
        renewalRetention: membership?.metadata?.renewalRetention || membership?.metadata?.builderRetention || null,
      };
    } catch (err) {
      console.warn('[MembershipService] Lỗi fallback Supabase:', err);
      return null;
    }
  },

  /**
   * Xác thực mã Coupon / Voucher thời gian thực
   * Hỗ trợ Hybrid Dual-Engine: Thử gọi Cloud API trước, nếu lỗi hoặc 404 thì tự động fallback
   * sang truy vấn trực tiếp cơ sở dữ liệu Supabase, tính toán chiết khấu ngay lập tức.
   */
  async validateCoupon(code, billingCycle = 'monthly', accessToken = null) {
    const rawCode = (code || '').trim().toUpperCase();
    if (!rawCode) {
      return { valid: false, message: 'Vui lòng nhập mã ưu đãi.' };
    }

    // 1. Thử gọi qua Aevum Cloud Backend
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${getCloudApiUrl()}/api/v1/coupons/validate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: rawCode,
          tierSlug: 'pro',
          billingCycle
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data.valid === 'boolean') {
          return data;
        }
      }
    } catch (apiErr) {
      console.warn('[MembershipService] Cloud API không phản hồi, kích hoạt Supabase Direct Fallback:', apiErr);
    }

    // 2. Fallback trực tiếp qua Supabase Client (Always-Available Fallback)
    try {
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .ilike('code', rawCode)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !coupon) {
        return {
          valid: false,
          code: rawCode,
          message: 'Mã ưu đãi không tồn tại hoặc đã hết hạn.'
        };
      }

      const now = new Date();

      // Kiểm tra ngày bắt đầu
      if (coupon.starts_at && new Date(coupon.starts_at) > now) {
        return {
          valid: false,
          code: rawCode,
          message: 'Chương trình ưu đãi cho mã này chưa bắt đầu.'
        };
      }

      // Kiểm tra ngày hết hạn
      if (coupon.expires_at && new Date(coupon.expires_at) < now) {
        return {
          valid: false,
          code: rawCode,
          message: `Mã ưu đãi đã hết hạn sử dụng vào ngày ${new Date(coupon.expires_at).toLocaleDateString('vi-VN')}.`
        };
      }

      // Kiểm tra giới hạn số lượt sử dụng
      if (coupon.max_uses !== null && typeof coupon.max_uses === 'number') {
        if (coupon.current_uses >= coupon.max_uses) {
          return {
            valid: false,
            code: rawCode,
            message: `Mã ưu đãi đã đạt giới hạn tối đa (${coupon.max_uses} lượt) và không thể áp dụng thêm.`
          };
        }
      }

      // Kiểm tra chu kỳ gói áp dụng
      const cycle = (billingCycle || 'monthly').toLowerCase();
      const applicableCycles = coupon.applicable_cycles || ['monthly'];
      if (applicableCycles.length > 0 && !applicableCycles.includes(cycle)) {
        return {
          valid: false,
          code: rawCode,
          message: `Mã ưu đãi ${rawCode} chỉ áp dụng cho ${applicableCycles.includes('monthly') ? 'Gói Tháng (Monthly)' : 'Gói Năm'}.`
        };
      }

      // Tính toán số tiền cơ sở theo chu kỳ
      const baseAmount = cycle === 'yearly' ? 1990000 : 249000;

      // Kiểm tra xem tài khoản đã sử dụng mã này chưa (Chống Tricker)
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { count: usedCount } = await supabase
          .from('coupon_redemptions')
          .select('id', { count: 'exact', head: true })
          .eq('coupon_id', coupon.id)
          .eq('user_id', user.id)
          .eq('status', 'applied');

        if (typeof usedCount === 'number' && usedCount >= (coupon.max_uses_per_user || 1)) {
          // Kiểm tra xem tài khoản có đặc quyền gia hạn còn hiệu lực từ mã này không
          const { data: userMem } = await supabase
            .from('user_memberships')
            .select('metadata')
            .eq('user_id', user.id)
            .maybeSingle();

          const activeRet = userMem?.metadata?.renewalRetention || userMem?.metadata?.builderRetention;
          if (activeRet && (activeRet.code === rawCode || activeRet.couponId === coupon.id) && activeRet.remainingDiscountMonths > 0) {
            return {
              valid: false,
              code: rawCode,
              message: `Mã ưu đãi ${coupon.code} đã được kích hoạt trước đó. Đặc quyền giảm ${activeRet.discountPercent || 50}% cho các chu kỳ gia hạn tiếp theo đã được hệ thống tự động áp dụng vào tài khoản của bạn (không cần nhập lại mã).`
            };
          }

          return {
            valid: false,
            code: rawCode,
            message: 'Tài khoản của bạn đã sử dụng mã ưu đãi này rồi. Mỗi tài khoản chỉ được áp dụng 1 lần duy nhất.'
          };
        }
      }

      // Tính toán chiết khấu tự động dựa trên dữ liệu cấu hình
      let discountAmountVnd = 0;

      if (coupon.discount_type === 'percentage') {
        discountAmountVnd = Math.round(baseAmount * (coupon.discount_value / 100));
        if (coupon.max_discount_cap && coupon.max_discount_cap > 0 && discountAmountVnd > coupon.max_discount_cap) {
          discountAmountVnd = coupon.max_discount_cap;
        }
      } else if (coupon.discount_type === 'fixed_amount') {
        discountAmountVnd = Math.min(baseAmount, coupon.discount_value);
      } else if (coupon.discount_type === 'bonus_days') {
        discountAmountVnd = 0;
      }

      const is100PercentFree = (coupon.discount_type === 'percentage' && coupon.discount_value >= 100) || discountAmountVnd >= baseAmount;
      const finalAmount = is100PercentFree ? 0 : Math.max(10000, baseAmount - discountAmountVnd);
      const isUnikornBuilder = coupon.partner_id === 'unikorn' || coupon.target_audience === 'unikorn_builder';
      const isStudentEdu = coupon.target_audience === 'student' || Boolean(coupon.domain_restriction);

      // Toàn bộ chính sách ưu đãi lấy trực tiếp từ dữ liệu DB (metadata & columns)
      const subsequentDiscountMonths = Number(coupon.metadata?.subsequentDiscountMonths) || 0;
      const subsequentDiscountPercent = Number(coupon.metadata?.subsequentDiscountPercent) || 0;
      const policyDescription = coupon.metadata?.policyDescription || coupon.description || undefined;

      // Thông điệp hiển thị kết quả linh hoạt theo DB
      let successMessage = coupon.metadata?.successMessage;
      if (!successMessage) {
        if (is100PercentFree) {
          successMessage = subsequentDiscountMonths > 0
            ? `Tuyệt vời! Bạn nhận được đặc quyền ${coupon.name}: Miễn phí tháng đầu tiên (0 VNĐ) và giảm ${subsequentDiscountPercent}% trong ${subsequentDiscountMonths} tháng tiếp theo!`
            : `Tuyệt vời! Bạn được miễn phí 100% (0 VNĐ) trải nghiệm gói Aevum Pro (${coupon.name})!`;
        } else if (coupon.discount_type === 'percentage') {
          const perks = [
            `Giảm ${coupon.discount_value}%`,
            (coupon.bonus_days > 0 ? `+${coupon.bonus_days} ngày Pro` : null),
            (coupon.bonus_workstations > 0 ? `+${coupon.bonus_workstations} máy trạm` : null)
          ].filter(Boolean).join(', ');
          successMessage = `Áp dụng thành công ưu đãi ${coupon.name}: ${perks}!`;
        } else if (coupon.discount_type === 'fixed_amount') {
          successMessage = `Áp dụng thành công ưu đãi: Giảm ${coupon.discount_value.toLocaleString('vi-VN')} VNĐ!`;
        } else {
          successMessage = `Áp dụng thành công ưu đãi: ${coupon.name}!`;
        }
      }

      return {
        valid: true,
        code: coupon.code,
        message: successMessage,
        coupon: {
          id: coupon.id,
          code: coupon.code,
          name: coupon.name,
          description: coupon.description,
          campaignId: coupon.campaign_id,
          partnerId: coupon.partner_id,
          partnerBadge: coupon.partner_badge,
          discountType: coupon.discount_type,
          discountValue: coupon.discount_value,
          discountAmountVnd,
          finalAmount,
          bonusDays: coupon.bonus_days || 0,
          bonusWorkstations: coupon.bonus_workstations || 0,
          targetAudience: coupon.target_audience,
          applicableCycles,
          applicableTiers: coupon.applicable_tiers || ['pro'],
          maxUsesPerUser: coupon.max_uses_per_user || 1,
          subsequentDiscountMonths,
          subsequentDiscountPercent,
          policyDescription,
          isUnikornBuilder,
          isStudentEdu,
          isFree: is100PercentFree
        }
      };
    } catch (fallbackErr) {
      console.error('[MembershipService] Lỗi khi kiểm tra mã qua Supabase:', fallbackErr);
      return {
        valid: false,
        code: rawCode,
        message: 'Không thể kết nối đến máy chủ kiểm tra mã ưu đãi.'
      };
    }
  },

  /**
   * Khởi tạo yêu cầu nâng cấp gói Pro
   */
  async requestUpgrade(billingCycle = 'monthly', accessToken, providerId = 'sepay', promoCode = null) {
    if (!accessToken) throw new Error('Yêu cầu đăng nhập');

    const payload = { billingCycle, providerId };
    if (promoCode && promoCode.trim()) {
      payload.promoCode = promoCode.trim().toUpperCase();
    }

    const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi nâng cấp');
    return data;
  },

  /**
   * Lấy lịch sử hóa đơn thanh toán của người dùng
   */
  async getMyInvoices(accessToken) {
    if (!accessToken) throw new Error('Yêu cầu đăng nhập');

    const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/invoices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi tải lịch sử hóa đơn');
    return data.data || [];
  },

  /**
   * Hủy tự động gia hạn gói cước
   */
  async cancelRenewal(accessToken) {
    if (!accessToken) throw new Error('Yêu cầu đăng nhập');

    const response = await fetch(`${getCloudApiUrl()}/api/v1/memberships/cancel-renewal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi hủy tự động gia hạn');
    return data;
  },

  /**
   * Lấy cấu hình cổng thanh toán và tài khoản ngân hàng nhận tiền
   */
  async getPaymentConfig() {
    try {
      const response = await fetch(`${getCloudApiUrl()}/api/payment/config`);
      const data = await response.json();
      return data?.data || null;
    } catch (err) {
      console.warn('[MembershipService] Lỗi lấy cấu hình thanh toán:', err);
      return null;
    }
  },

  /**
   * Kiểm tra trạng thái đơn hàng thanh toán theo orderCode
   */
  async getOrderStatus(orderCode) {
    const response = await fetch(`${getCloudApiUrl()}/api/payment/order/${orderCode}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi kiểm tra trạng thái đơn');
    return data.data;
  },

  /**
   * Hủy đơn hàng thanh toán đang pending
   */
  async cancelPaymentOrder(orderCode, accessToken) {
    const headers = { 'Content-Type': 'application/json' };
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

    const response = await fetch(`${getCloudApiUrl()}/api/payment/cancel-order`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ orderCode: Number(orderCode) })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Lỗi hủy đơn thanh toán');
    return data;
  }
};
