import React, { useState, useEffect, useRef } from 'react';
import { MembershipService } from '../services/MembershipService';
import { TranslationService } from '../services/TranslationService';
import { Modal } from './ui/Modal';

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  activeLang = 'vi', 
  user,
  accessToken,
  initialCycle = 'monthly',
  onSuccess
}) => {
  const isVi = activeLang === 'vi';
  const [cycle, setCycle] = useState(initialCycle);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isExpired, setIsExpired] = useState(false);
  const pollTimerRef = useRef(null);

  // Coupon & Voucher State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [savedCouponCode, setSavedCouponCode] = useState('');
  const [activeRetention, setActiveRetention] = useState(null);
  const [translatedCache, setTranslatedCache] = useState({});

  useEffect(() => {
    setCycle(initialCycle);
  }, [initialCycle]);

  // Dynamic Translation Service for dynamic coupon & ticket data (Zero Hardcoding)
  useEffect(() => {
    if (!appliedCoupon) return;
    const targetLang = activeLang === 'en' ? 'en' : 'vi';

    // 1. Translate Coupon Title / Name
    if (appliedCoupon.name) {
      const nameKey = `${appliedCoupon.id || appliedCoupon.code}_name_${targetLang}`;
      if (!translatedCache[nameKey]) {
        TranslationService.translateText(appliedCoupon.name, targetLang)
          .then(res => {
            if (res && res !== appliedCoupon.name) {
              setTranslatedCache(prev => ({ ...prev, [nameKey]: res }));
            }
          })
          .catch(() => {});
      }
    }

    // 2. Translate Partner Badge
    if (appliedCoupon.partnerBadge) {
      const badgeKey = `${appliedCoupon.id || appliedCoupon.code}_badge_${targetLang}`;
      if (!translatedCache[badgeKey]) {
        TranslationService.translateText(appliedCoupon.partnerBadge, targetLang)
          .then(res => {
            if (res && res !== appliedCoupon.partnerBadge) {
              setTranslatedCache(prev => ({ ...prev, [badgeKey]: res }));
            }
          })
          .catch(() => {});
      }
    }

    // 3. Translate Description if available
    if (appliedCoupon.description) {
      const descKey = `${appliedCoupon.id || appliedCoupon.code}_desc_${targetLang}`;
      if (!translatedCache[descKey]) {
        TranslationService.translateText(appliedCoupon.description, targetLang)
          .then(res => {
            if (res && res !== appliedCoupon.description) {
              setTranslatedCache(prev => ({ ...prev, [descKey]: res }));
            }
          })
          .catch(() => {});
      }
    }
  }, [appliedCoupon, activeLang]);

  // Dynamic names with automatic translation fallback
  const dynamicCouponName = (appliedCoupon && translatedCache[`${appliedCoupon.id || appliedCoupon.code}_name_${activeLang}`]) || appliedCoupon?.name;
  const dynamicPartnerBadge = (appliedCoupon?.partnerBadge && translatedCache[`${appliedCoupon.id || appliedCoupon.code}_badge_${activeLang}`]) || appliedCoupon?.partnerBadge;

  const handleApplyCouponDirect = async (codeToApply, targetCycle) => {
    const cleanCode = (codeToApply || '').trim().toUpperCase();
    if (!cleanCode) return;
    setCouponLoading(true);
    setCouponError('');
    setCouponSuccess('');
    try {
      const activeCycle = targetCycle || cycle;
      const res = await MembershipService.validateCoupon(cleanCode, activeCycle, accessToken);
      if (res && res.valid && res.coupon) {
        setAppliedCoupon(res.coupon);
        setSavedCouponCode(res.coupon.code);
        setCouponInput(res.coupon.code);
        const defaultMsg = isVi ? 'Áp dụng mã ưu đãi thành công!' : 'Promo code applied successfully!';
        const rawMsg = res.message || defaultMsg;
        setCouponSuccess(rawMsg);
        setCouponError('');
        if (!isVi && res.message) {
          TranslationService.translateText(res.message, 'en').then(trans => {
            if (trans) setCouponSuccess(trans);
          }).catch(() => {});
        }
      } else {
        setAppliedCoupon(null);
        setCouponSuccess('');
        const defaultErr = isVi ? 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.' : 'Invalid or expired promo code.';
        const rawErr = res?.message || defaultErr;
        setCouponError(rawErr);
        if (!isVi && res?.message) {
          TranslationService.translateText(res.message, 'en').then(trans => {
            if (trans) setCouponError(trans);
          }).catch(() => {});
        }
      }
    } catch (err) {
      setAppliedCoupon(null);
      setCouponSuccess('');
      setCouponError(isVi ? 'Lỗi kiểm tra mã ưu đãi.' : 'Error validating promo code.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setSavedCouponCode('');
    setCouponInput('');
    setCouponError('');
    setCouponSuccess('');
  };

  const handleSelectCycle = (newCycle) => {
    setCycle(newCycle);
    setCouponError('');
    
    // Nếu chuyển sang Gói Năm mà mã hiện tại chỉ dành cho Gói Tháng
    if (newCycle === 'yearly') {
      if (appliedCoupon && !appliedCoupon.applicableCycles?.includes('yearly')) {
        setSavedCouponCode(appliedCoupon.code);
        setAppliedCoupon(null);
        setCouponError(
          isVi
            ? `Mã ${appliedCoupon.code} chỉ áp dụng cho Gói Tháng (Monthly). Gói Năm giữ nguyên giá niêm yết 1.990.000 đ.`
            : `Code ${appliedCoupon.code} only applies to Monthly plan. Yearly plan remains at standard price.`
        );
      }
    } else if (newCycle === 'monthly') {
      // Khi quay lại Gói Tháng, tự động khôi phục lại mã ưu đãi đã lưu
      const codeToRestore = appliedCoupon?.code || savedCouponCode || couponInput;
      if (codeToRestore) {
        handleApplyCouponDirect(codeToRestore, 'monthly');
      }
    }
  };

  // Tự động kiểm tra lại ưu đãi khi đổi chu kỳ tháng/năm
  useEffect(() => {
    if (appliedCoupon) {
      handleApplyCouponDirect(appliedCoupon.code, cycle);
    }
  }, [cycle]);

  // Reset state when modal opens/closes & Tự động nhận diện URL query (?coupon=...) & Kiểm tra ưu đãi gia hạn
  useEffect(() => {
    if (isOpen) {
      setError('');
      setIsSuccess(false);
      setIsExpired(false);
      setTimeLeft(900);
      setOrderData(null);
      setCouponError('');

      // Tự động kiểm tra đặc quyền gia hạn từ mã đã đăng ký của tài khoản
      if (user?.id || accessToken) {
        MembershipService.getProfileStatus(accessToken, user?.id).then(status => {
          const ret = status?.renewalRetention || status?.builderRetention;
          if (ret && ret.remainingDiscountMonths > 0) {
            setActiveRetention(ret);
          } else {
            setActiveRetention(null);
          }
        }).catch(() => {});
      }

      // Auto-detect URL query coupon (ví dụ: ?coupon=UNIKORN_BUILDER hoặc ?voucher=FOUNDER50)
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCoupon = urlParams.get('coupon') || urlParams.get('voucher');
        if (urlCoupon && !appliedCoupon) {
          setCouponInput(urlCoupon.toUpperCase());
          handleApplyCouponDirect(urlCoupon.toUpperCase(), cycle);
        }
      } catch (e) {}
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isOpen, user]);

  // Live polling for payment completion
  useEffect(() => {
    if (!orderData?.orderCode || !pollingActive || isSuccess) return;

    pollTimerRef.current = setInterval(async () => {
      try {
        const statusData = await MembershipService.getOrderStatus(orderData.orderCode);
        if (statusData && (statusData.status === 'completed' || statusData.isProActive)) {
          setIsSuccess(true);
          setPollingActive(false);
          clearInterval(pollTimerRef.current);
          if (onSuccess) onSuccess(statusData);
        } else if (statusData && (statusData.status === 'cancelled' || statusData.isExpired)) {
          setIsExpired(true);
          setPollingActive(false);
          clearInterval(pollTimerRef.current);
        }
      } catch (err) {
        console.warn('[PaymentModal] Polling error:', err);
      }
    }, 3000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [orderData, pollingActive, isSuccess, onSuccess]);

  // Đếm ngược thời gian tồn tại của đơn hàng (TTL 15 phút)
  useEffect(() => {
    if (!orderData || !pollingActive || isSuccess || isExpired) return;

    const calcRemaining = () => {
      if (orderData.expiresAt) {
        const diff = Math.floor((new Date(orderData.expiresAt).getTime() - Date.now()) / 1000);
        return Math.max(0, diff);
      }
      return 900;
    };

    setTimeLeft(calcRemaining());

    const countdownTimer = setInterval(() => {
      const remaining = calcRemaining();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setIsExpired(true);
        setPollingActive(false);
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [orderData, pollingActive, isSuccess, isExpired]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(Math.max(0, totalSeconds) / 60);
    const s = Math.floor(Math.max(0, totalSeconds) % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRecreateOrder = () => {
    setIsExpired(false);
    setOrderData(null);
    setPollingActive(false);
    setError('');
  };

  const handleCreateOrder = async () => {
    if (!user || !accessToken) {
      setError(isVi ? 'Vui lòng đăng nhập để nâng cấp gói Pro.' : 'Please sign in to upgrade to Pro.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await MembershipService.requestUpgrade(
        cycle,
        accessToken,
        'sepay',
        appliedCoupon ? appliedCoupon.code : null
      );
      const orderPayload = response?.data || response?.order || (response?.orderCode ? response : null);
      if (response && response.success && orderPayload) {
        setOrderData(orderPayload);
        // Nếu là đơn hàng 0 VNĐ kích hoạt miễn phí tức thì hoặc đã PAID
        if (orderPayload.isFreeActivation || orderPayload.status === 'PAID' || orderPayload.amount === 0) {
          setIsSuccess(true);
          setPollingActive(false);
          if (onSuccess) onSuccess(orderPayload);
          return;
        }
        setIsExpired(false);
        setTimeLeft(orderPayload.expiresInSeconds || 900);
        setPollingActive(true);
      } else {
        throw new Error(response?.error || response?.message || (isVi ? 'Không thể tạo đơn hàng thanh toán.' : 'Unable to create payment order.'));
      }
    } catch (err) {
      setError(err.message || (isVi ? 'Lỗi kết nối tới cổng thanh toán.' : 'Payment gateway connection error.'));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(String(text));
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleManualCheck = async () => {
    if (!orderData?.orderCode) return;
    setLoading(true);
    try {
      const statusData = await MembershipService.getOrderStatus(orderData.orderCode);
      if (statusData && (statusData.status === 'completed' || statusData.isProActive)) {
        setIsSuccess(true);
        setPollingActive(false);
        if (onSuccess) onSuccess(statusData);
      } else {
        setError(isVi ? 'Đang chờ xác nhận giao dịch từ ngân hàng. Nếu bạn vừa chuyển khoản, vui lòng đợi vài giây rồi thử lại.' : 'Awaiting bank confirmation. Please wait a few seconds and try again.');
      }
    } catch (err) {
      setError(err.message || (isVi ? 'Lỗi kiểm tra trạng thái.' : 'Status check error.'));
    } finally {
      setLoading(false);
    }
  };

  const baseAmount = cycle === 'yearly' ? 1990000 : 249000;
  
  // BẢO MẬT CHẶT CHẼ: Kiểm tra xem coupon có thực sự áp dụng cho chu kỳ hiện tại không (Chống Tricker 0đ Gói Năm)
  const isCouponApplicableToCycle = Boolean(
    appliedCoupon &&
    (appliedCoupon.applicableCycles
      ? appliedCoupon.applicableCycles.includes(cycle)
      : cycle === 'monthly')
  );

  // Tự động kiểm tra đặc quyền ưu đãi gia hạn từ mã đã đăng ký của tài khoản
  const isRetentionApplicable = Boolean(
    !appliedCoupon &&
    activeRetention &&
    activeRetention.remainingDiscountMonths > 0 &&
    (activeRetention.applicableCycles || ['monthly']).includes(cycle)
  );

  let discountAmount = 0;
  if (isCouponApplicableToCycle) {
    discountAmount = appliedCoupon?.discountAmountVnd ?? 0;
  } else if (isRetentionApplicable) {
    if (activeRetention.discountPercent && activeRetention.discountPercent > 0) {
      discountAmount = Math.round(baseAmount * (activeRetention.discountPercent / 100));
    } else if (activeRetention.discountAmountVnd && activeRetention.discountAmountVnd > 0) {
      discountAmount = Math.min(baseAmount, activeRetention.discountAmountVnd);
    }
  }

  const finalAmount = isCouponApplicableToCycle
    ? (appliedCoupon.finalAmount !== undefined && cycle === 'monthly' ? appliedCoupon.finalAmount : Math.max(0, baseAmount - discountAmount))
    : Math.max(0, baseAmount - discountAmount);

  const amountDisplay = isVi ? `${(finalAmount || 0).toLocaleString('vi-VN')} VNĐ` : `${(finalAmount || 0).toLocaleString('en-US')} VND`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isVi ? 'Nâng Cấp Gói Aevum Pro' : 'Upgrade to Aevum Pro'}
      subtitle={isVi ? 'VietQR Napas 24/7 • Kích hoạt tức thì' : 'VietQR Napas 24/7 • Instant Activation'}
      closeLabel={isVi ? 'Đóng' : 'Close'}
      maxWidth={appliedCoupon ? '3xl' : orderData ? '2xl' : 'md'}
      grainy={true}
    >
      <div className="space-y-4">

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="text-center py-4 space-y-5">
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                {isVi ? 'Thành Công' : 'Success'}
              </span>
              <h4 className="text-lg sm:text-xl font-medium text-white tracking-wide uppercase">
                {appliedCoupon?.isFree || orderData?.isFreeActivation || orderData?.amount === 0
                  ? (isVi ? 'Kích Hoạt Pro Miễn Phí Thành Công' : 'Free Pro Activation Successful')
                  : (isVi ? 'Thanh Toán Hoàn Tất' : 'Payment Completed')}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {isVi ? 'Đặc quyền Aevum Pro đã được mở khóa ngay tức thì trên toàn bộ máy trạm của bạn.' : 'Aevum Pro privileges are now fully unlocked across all your linked workstations.'}
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-left space-y-2.5">
              <div className="flex justify-between items-center text-slate-300">
                <span>{isVi ? 'Mã đơn hàng:' : 'Order Code:'}</span>
                <span className="text-white font-medium font-mono">{orderData?.orderCode || (isVi ? 'KÍCH HOẠT ƯU ĐÃI' : 'PROMO ACTIVATION')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{isVi ? 'Gói nâng cấp:' : 'Plan:'}</span>
                <span className="text-white font-medium">Aevum Pro ({cycle === 'yearly' ? (isVi ? 'Gói Năm' : 'Yearly Plan') : (isVi ? 'Gói Tháng' : 'Monthly Plan')})</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-400 pt-1 border-t border-white/10">
                  <span>{isVi ? 'Ưu đãi áp dụng:' : 'Applied Promo:'}</span>
                  <span className="font-semibold font-mono">{dynamicCouponName}</span>
                </div>
              )}
              {appliedCoupon?.partnerBadge && (
                <div className="flex justify-between items-center text-purple-300">
                  <span>{isVi ? 'Huy hiệu đối tác:' : 'Partner Badge:'}</span>
                  <span className="font-semibold">{dynamicPartnerBadge}</span>
                </div>
              )}
              {appliedCoupon?.bonusWorkstations > 0 && (
                <div className="flex justify-between items-center text-cyan-300">
                  <span>{isVi ? 'Máy trạm mở rộng:' : 'Extra Workstations:'}</span>
                  <span className="font-semibold">+{appliedCoupon.bonusWorkstations} {isVi ? 'máy trạm' : 'devices'}</span>
                </div>
              )}
            </div>

            {/* Signature Pill Button (Hero Style) */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-white hover:bg-slate-200 text-black font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isVi ? 'Bắt Đầu Sử Dụng Pro' : 'Done & Start Using Pro'}
            </button>
          </div>
        ) : !orderData ? (
          /* STEP 1: CHOOSE PLAN & INITIATE (2-Column Grid when coupon is applied, Side Panel pops out to the right) */
          <div className={appliedCoupon ? "grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch" : "space-y-5"}>
            
            {/* CỘT CHÍNH (LEFT COLUMN: md:col-span-7 khi có mã ưu đãi, ngược lại full width) */}
            <div className={appliedCoupon ? "md:col-span-7 space-y-4 flex flex-col justify-between" : "space-y-5"}>
              
              <div className="space-y-4">
                {/* 1. Plan selection */}
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-slate-300 uppercase tracking-wider block">
                    {isVi ? '1. Chọn Chu Kỳ Thanh Toán' : '1. Choose Billing Cycle'}
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Monthly Plan Card */}
                    <button
                      type="button"
                      onClick={() => handleSelectCycle('monthly')}
                      className={`p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer backdrop-blur-md ${
                        cycle === 'monthly'
                          ? 'border-white/60 bg-white/[0.1] text-white'
                          : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:bg-black/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-white">{isVi ? 'Gói Tháng' : 'Monthly Plan'}</span>
                        {cycle === 'monthly' && (
                          <span className="text-[10px] uppercase tracking-wider text-slate-200 font-medium">
                            {isVi ? 'Đang chọn' : 'Selected'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-medium text-white tracking-tight">
                          {isRetentionApplicable ? `${finalAmount.toLocaleString('vi-VN')} đ` : '249.000 đ'}
                        </span>
                        {isRetentionApplicable && (
                          <span className="text-xs text-slate-400 line-through font-normal">249.000 đ</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-300/80 mt-1">
                        {isRetentionApplicable 
                          ? (isVi ? `Ưu đãi mã ${activeRetention.code} (-${activeRetention.discountPercent}%)` : `Promo ${activeRetention.code} (-${activeRetention.discountPercent}%)`)
                          : (isVi ? 'Thanh toán theo tháng' : 'Billed monthly')}
                      </div>
                    </button>

                    {/* Yearly Plan Card */}
                    <button
                      type="button"
                      onClick={() => handleSelectCycle('yearly')}
                      className={`p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                        cycle === 'yearly'
                          ? 'border-white/60 bg-white/[0.1] text-white'
                          : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:bg-black/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-white">{isVi ? 'Gói Năm' : 'Yearly Plan'}</span>
                        <span className="text-[10px] text-white border border-white/20 bg-white/10 px-2 py-0.5 rounded-full font-medium">
                          -20%
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-medium text-white tracking-tight">1.990.000 đ</div>
                      <div className="text-[11px] text-slate-300/80 mt-1">
                        {isVi ? 'Tiết kiệm ~500.000 đ/năm' : 'Save ~500,000 VND/year'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Coupon & Voucher Input Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-medium text-slate-300 uppercase tracking-wider block">
                      {isVi ? '2. Mã Ưu Đãi / Voucher Tri Ân' : '2. Promo Code / Tribute Voucher'}
                    </label>
                    {appliedCoupon && (
                      <span className="text-[10px] font-medium text-slate-200 uppercase tracking-wider bg-white/[0.06] border border-white/15 px-2.5 py-0.5 rounded-full">
                        {isVi ? 'Đang áp dụng' : 'Applied'}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCouponDirect(couponInput);
                          }
                        }}
                        placeholder={isVi ? "Nhập mã ưu đãi..." : "Enter promo code..."}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 placeholder:normal-case text-xs font-mono tracking-wider focus:outline-none focus:border-white/40 uppercase transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyCouponDirect(couponInput)}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black text-xs font-medium uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center shrink-0 min-w-[95px]"
                    >
                      {couponLoading ? (isVi ? 'Kiểm tra...' : 'Checking...') : (isVi ? 'Áp dụng' : 'Apply')}
                    </button>
                  </div>

                  {couponError && (
                    <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 text-xs">
                      {couponError}
                    </div>
                  )}

                  {/* Hiển thị ưu đãi gia hạn tự động theo đúng mã đã đăng ký */}
                  {isRetentionApplicable && (
                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/15 space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white">
                          {isVi ? `Đặc quyền gia hạn: Mã ${activeRetention.code}` : `Renewal Benefit: ${activeRetention.code}`}
                        </span>
                        <span className="text-[10px] font-mono text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                          -{activeRetention.discountPercent}% • {isVi ? `Còn ${activeRetention.remainingDiscountMonths} tháng` : `${activeRetention.remainingDiscountMonths} months left`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300/90 leading-relaxed font-normal">
                        {isVi 
                          ? `Tài khoản của bạn đã được ghi nhận ưu đãi từ mã ${activeRetention.code}. Hệ thống tự động áp dụng mức giảm ${activeRetention.discountPercent}% cho chu kỳ gia hạn này.` 
                          : `Your account has registered benefit from code ${activeRetention.code}. A ${activeRetention.discountPercent}% discount is automatically applied to this renewal.`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Method Details (0 VND Free Experience or VietQR) */}
                {finalAmount === 0 ? (
                  <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {isVi ? 'Đặc Quyền Kích Hoạt Miễn Phí 100%' : '100% Free Pro Experience'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-200 uppercase tracking-wider bg-white/[0.06] border border-white/15 px-2.5 py-0.5 rounded-full">
                        {isVi ? '0 VNĐ • Tức thì' : '0 VND • Instant'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                      {isVi 
                        ? 'Không yêu cầu chuyển khoản hoặc thẻ tín dụng. Hệ thống sẽ kích hoạt trực tiếp bản quyền Aevum Pro vào tài khoản ngay khi xác nhận.' 
                        : 'No payment or credit card required. Aevum Pro will be activated directly to your account upon confirmation.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-white">
                        VietQR Napas 24/7 (Techcombank)
                      </span>
                      <span className="text-[10px] font-medium text-slate-200 uppercase tracking-wider bg-white/[0.06] border border-white/15 px-2.5 py-0.5 rounded-full">
                        {isVi ? '0% Phí • Tức thì' : '0% Fee • Instant'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                      {isVi 
                        ? 'Chuyển khoản liên ngân hàng 24/7 không phí trung gian. Quét mã bằng bất kỳ ứng dụng ngân hàng nào (Vietcombank, MB, Techcombank, VPBank, MoMo,...).' 
                        : 'Instant 24/7 interbank transfer with zero fees. Scan QR code using any banking or e-wallet app (Vietcombank, MB, Techcombank, MoMo,...).'}
                    </p>
                  </div>
                )}

                {/* Chi tiết giá gia hạn tự động */}
                {isRetentionApplicable && (
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">{isVi ? 'Giá niêm yết:' : 'Regular price:'}</span>
                      <span className="font-mono text-slate-300">{baseAmount.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-200">
                      <span className="text-slate-400">{isVi ? `Ưu đãi gia hạn (${activeRetention.code}):` : `Renewal benefit (${activeRetention.code}):`}</span>
                      <span className="font-mono text-white font-medium">-{discountAmount.toLocaleString('vi-VN')} đ (-{activeRetention.discountPercent}%)</span>
                    </div>
                    <div className="flex justify-between items-center text-white pt-2 border-t border-white/10 font-medium">
                      <span>{isVi ? 'Tổng thanh toán:' : 'Total due:'}</span>
                      <span className="font-mono text-sm text-white">{amountDisplay}</span>
                    </div>
                  </div>
                )}

                {/* Minimalist System Tip */}
                <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-300 leading-relaxed">
                  <span className="text-white font-medium">{isVi ? 'Hệ thống:' : 'System:'}</span>{' '}
                  {finalAmount === 0 
                    ? (isVi 
                        ? 'Xác nhận kích hoạt bên dưới để mở khóa đặc quyền Pro vào tài khoản của bạn.' 
                        : 'Confirm activation below to unlock Pro privileges for your account.')
                    : (isVi 
                        ? 'Hệ thống tự động kích hoạt gói Pro ngay khi nhận được giao dịch chuyển khoản.' 
                        : 'The system automatically activates Pro as soon as bank transfer is confirmed.')}
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 text-xs">
                    {error}
                  </div>
                )}
              </div>

              {/* Signature Pill Button */}
              <button
                type="button"
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full mt-4 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center disabled:opacity-50 bg-white hover:bg-slate-200 text-black"
              >
                {loading 
                  ? (finalAmount === 0 
                      ? (isVi ? 'Đang kích hoạt gói Pro...' : 'Activating Pro...') 
                      : (isVi ? 'Đang khởi tạo mã VietQR...' : 'Generating QR...'))
                  : (finalAmount === 0 
                      ? (isVi ? 'Kích hoạt gói Pro miễn phí (0 VNĐ)' : 'Activate Free Pro (0 VND)') 
                      : (isVi ? `Tạo mã VietQR thanh toán (${amountDisplay})` : `Generate VietQR (${amountDisplay})`))}
              </button>
            </div>

            {/* CỘT PHẢI (RIGHT COLUMN: DIGITAL VOUCHER TICKET CAO CẤP BẬT RA BÊN PHẢI POPUP) */}
            {appliedCoupon && (
              <div className="md:col-span-5 flex flex-col justify-between animate-in fade-in slide-in-from-left-4 duration-300">
                {/* Digital Ticket Container - Chỉ giữ viền top, bỏ hoàn toàn border left, right và bottom */}
                <div className="p-6 sm:p-7 rounded-3xl border-t border-x-0 border-b-0 border-white/10 shadow-2xl relative flex-1 flex flex-col justify-between overflow-hidden bg-[#07090D]">
                  
                  {/* 1. Primary Linear Gradient Flow (Dải gradient cyan êm dịu chìm vào nền đen sâu #07090D chuẩn Modal Popup) */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0" 
                    style={{
                      background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.16) 0%, rgba(2, 132, 199, 0.06) 16%, rgba(7, 9, 13, 0.75) 36%, #07090D 70%)'
                    }}
                  />

                  {/* 2. Ethereal Top Horizon Wash (Ánh sáng chân trời cong tỏa mềm mại ở đỉnh) */}
                  <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-[150px] pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(56, 189, 248, 0.18) 0%, transparent 100%)',
                      filter: 'blur(24px)',
                    }}
                  />

                  {/* 3. Authentic Fine Film Grain Noise Texture (Lớp hạt mịn mix-blend-overlay đồng điệu với Modal Popup) */}
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-[1]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ticketNoiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ticketNoiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '120px 120px',
                    }}
                  />

                  {/* 4. Precision Top Luminous Crest Hairline Highlight */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-10" />

                  {/* Ticket Upper Section: Header, Code Pill & Perks */}
                  <div className="relative z-10 space-y-4">
                    {/* Header Row: Clean & Line-free */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                        {isVi ? 'Chi Tiết Ưu Đãi' : 'Coupon Details'}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {isVi ? 'Gỡ bỏ' : 'Remove'}
                      </button>
                    </div>

                    {/* Voucher Pill Badge & Title */}
                    <div className="space-y-2 pt-1">
                      <div>
                        <span className="inline-block text-xs font-mono font-medium px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.08] text-white tracking-wider shadow-sm">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {dynamicCouponName}
                      </h4>
                      {appliedCoupon.partnerBadge && (
                        <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-0.5">
                          <span className="text-slate-400">{isVi ? 'Đặc quyền:' : 'Perk:'}</span>
                          <span className="font-semibold text-white uppercase tracking-wider">
                            {dynamicPartnerBadge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Perks List: Spacing & Typography instead of dividers */}
                    <div className="space-y-2 pt-1 text-xs">
                      {/* Ưu đãi kỳ đầu hoặc Mức giảm giá */}
                      <div className="flex justify-between items-center text-slate-300 gap-2">
                        <span className="text-slate-400 shrink-0">
                          {appliedCoupon.isFree 
                            ? (isVi ? 'Kỳ đầu tiên:' : 'First cycle:') 
                            : (isVi ? 'Mức giảm giá:' : 'Discount:')}
                        </span>
                        <span className="font-mono text-white font-medium text-right">
                          {appliedCoupon.isFree 
                            ? (isVi ? 'Miễn phí 100% (0 VNĐ)' : '100% Free (0 VND)') 
                            : `-${discountAmount.toLocaleString('vi-VN')} đ ${appliedCoupon.discountType === 'percentage' ? `(-${appliedCoupon.discountValue}%)` : ''}`}
                        </span>
                      </div>

                      {/* Ưu đãi gia hạn các tháng tiếp theo (DB metadata) */}
                      {appliedCoupon.subsequentDiscountMonths > 0 && (
                        <div className="flex justify-between items-center text-slate-300 gap-2">
                          <span className="text-slate-400 shrink-0">
                            {appliedCoupon.subsequentDiscountMonths} {isVi ? 'tháng tiếp theo:' : 'months renewal:'}
                          </span>
                          <span className="font-mono text-white font-medium text-right">
                            {isVi ? `Giảm ${appliedCoupon.subsequentDiscountPercent}%` : `${appliedCoupon.subsequentDiscountPercent}% off`}
                          </span>
                        </div>
                      )}

                      {/* Thời gian tặng thêm (DB bonus_days) */}
                      {appliedCoupon.bonusDays > 0 && (
                        <div className="flex justify-between items-center text-slate-300 gap-2">
                          <span className="text-slate-400 shrink-0">{isVi ? 'Tặng thêm:' : 'Bonus:'}</span>
                          <span className="font-mono text-white font-medium text-right">
                            +{appliedCoupon.bonusDays} {isVi ? 'ngày Pro' : 'days Pro'}
                          </span>
                        </div>
                      )}

                      {/* Mở rộng máy trạm (DB bonus_workstations - chỉ hiện khi > 0) */}
                      {appliedCoupon.bonusWorkstations > 0 && (
                        <div className="flex justify-between items-center text-slate-300 gap-2">
                          <span className="text-slate-400 shrink-0">{isVi ? 'Máy trạm:' : 'Workstations:'}</span>
                          <span className="font-mono text-white font-medium text-right">
                            +{appliedCoupon.bonusWorkstations} {isVi ? 'thiết bị' : 'devices'}
                          </span>
                        </div>
                      )}

                      {/* Giới hạn kích hoạt trên mỗi tài khoản (DB max_uses_per_user) */}
                      {appliedCoupon.maxUsesPerUser && (
                        <div className="flex justify-between items-center text-slate-300 gap-2">
                          <span className="text-slate-400 shrink-0">{isVi ? 'Giới hạn:' : 'Limit:'}</span>
                          <span className="font-mono text-white font-medium text-right whitespace-nowrap">
                            {appliedCoupon.maxUsesPerUser === 1 
                              ? (isVi ? '1 lần / tài khoản' : '1 time / account') 
                              : `${appliedCoupon.maxUsesPerUser} ${isVi ? 'lần / tài khoản' : 'times / account'}`}
                          </span>
                        </div>
                      )}

                      {/* Gói áp dụng (DB applicable_cycles) */}
                      {appliedCoupon.applicableCycles && appliedCoupon.applicableCycles.length > 0 && (
                        <div className="flex justify-between items-center text-slate-300 gap-2">
                          <span className="text-slate-400 shrink-0">{isVi ? 'Gói áp dụng:' : 'Applicable plan:'}</span>
                          <span className="font-mono text-white font-medium text-right">
                            {appliedCoupon.applicableCycles.map(c => 
                              c === 'monthly' ? (isVi ? 'Gói Tháng' : 'Monthly') :
                              c === 'yearly' ? (isVi ? 'Gói Năm' : 'Yearly') : c
                            ).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ticket Tear-off Perforation Divider (Thanh thoát, không còn viền sườn) */}
                  <div className="relative my-3 flex items-center">
                    <div className="w-full border-t border-dashed border-white/15" />
                  </div>

                  {/* Ticket Lower Section: Price Summary & Activation Stamp */}
                  <div className="relative z-10 space-y-4 pt-1">
                    {/* Price Breakdown: Seamless, no heavy inner boxes or dividers */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span>{isVi ? 'Giá niêm yết:' : 'Regular price:'}</span>
                        <span className="text-slate-200">{baseAmount.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{isVi ? 'Ưu đãi áp dụng:' : 'Discount applied:'}</span>
                        <span className="text-white font-medium">-{discountAmount.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="text-xs sm:text-sm font-medium text-white font-sans">
                          {isVi ? 'Tổng thanh toán:' : 'Total due:'}
                        </span>
                        <span className="text-base sm:text-lg font-mono font-bold text-white tracking-tight">
                          {finalAmount === 0 ? (isVi ? '0 VNĐ (FREE)' : '0 VND (FREE)') : `${finalAmount.toLocaleString('vi-VN')} đ`}
                        </span>
                      </div>
                    </div>

                    {/* Activation Guarantee Pill */}
                    <div className="text-center pt-1">
                      <span className="inline-block text-[10px] text-slate-300 uppercase tracking-widest font-mono bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full">
                        {isVi ? 'HỢP LỆ • KÍCH HOẠT TỨC THÌ' : 'VALID • INSTANT ACTIVATION'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          /* STEP 2: VIETQR DETAILS & LIVE RADAR (Balanced 2-Column Desktop Grid) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* CỘT TRÁI (col-span-12 md:col-span-5): Khung ảnh QR Code & Radar trạng thái */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-3">
              {isExpired ? (
                /* Expired Card State (Clean Minimalist, Zero Circular Dots) */
                <div className="flex flex-col items-center justify-center p-5 rounded-xl sm:rounded-2xl bg-black/60 border border-amber-500/30 text-center space-y-3 flex-1 min-h-[220px]">
                  <span className="text-[10px] uppercase font-mono font-medium tracking-wider text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded">
                    {isVi ? 'ĐƠN HÀNG ĐÃ HẾT HẠN' : 'ORDER EXPIRED'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {isVi 
                      ? 'Thời gian chờ thanh toán (15 phút) đã kết thúc. Mã VietQR đã tự động đóng để bảo vệ giao dịch.' 
                      : 'The 15-minute payment window has ended. VietQR has been closed for transaction security.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleRecreateOrder}
                    className="py-2 px-5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isVi ? 'Tạo đơn mới' : 'Create New Order'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black text-center flex-1 shadow-md">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center">
                    <img 
                      src={orderData.qrCode} 
                      alt="VietQR Napas 24/7" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-slate-700 mt-2 font-medium">
                    {isVi ? 'Quét mã qua App Ngân hàng / Ví điện tử' : 'Scan via Banking App or E-Wallet'}
                  </span>
                </div>
              )}

              {/* Polling Live Radar & Countdown Timer (Clean Minimalist, Zero Circular Dots) */}
              <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    NAPAS 24/7
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-slate-400 font-sans">{isVi ? 'Hết hạn:' : 'Expires:'}</span>
                    <span className={`font-medium ${isExpired ? 'text-rose-400 font-bold' : timeLeft < 180 ? 'text-amber-400 font-bold' : 'text-cyan-300'}`}>
                      {isExpired ? '00:00' : formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleManualCheck}
                  disabled={loading || isExpired}
                  className="w-full py-1.5 rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.1] text-white text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer text-center disabled:opacity-40"
                >
                  {loading ? (isVi ? 'Đang kiểm tra...' : 'Checking...') : (isVi ? 'Kiểm tra ngay' : 'Check Now')}
                </button>
              </div>
            </div>

            {/* CỘT PHẢI (col-span-12 md:col-span-7): Bảng thông tin thanh toán & Lưu ý */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              {/* Bank Details Table */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-2.5 text-xs">
                
                {/* Bank Name */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">{isVi ? 'Ngân hàng thụ hưởng:' : 'Beneficiary Bank:'}</span>
                  <span className="text-white font-medium">
                    {orderData.bankInfo?.bankName || (orderData.bankInfo?.bankId === 'MB' ? (isVi ? 'MBBank (Quân Đội)' : 'MBBank (Military Bank)') : orderData.bankInfo?.bankId) || 'MBBank'}
                  </span>
                </div>

                {/* Account Number */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">{isVi ? 'Số tài khoản:' : 'Account No:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium font-mono tracking-wider text-xs sm:text-sm">
                      {orderData.bankInfo?.accountNo || '0879299627'}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(orderData.bankInfo?.accountNo || '0879299627', 'acc')}
                      className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      {copiedField === 'acc' ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Sao chép' : 'Copy')}
                    </button>
                  </div>
                </div>

                {/* Account Name */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">{isVi ? 'Chủ tài khoản:' : 'Account Name:'}</span>
                  <span className="text-white font-medium uppercase">
                    {orderData.bankInfo?.accountName || 'NGUYEN HUY HAI'}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">{isVi ? 'Số tiền:' : 'Amount:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-semibold font-mono text-xs sm:text-sm">
                      {isVi ? `${orderData.amount?.toLocaleString('vi-VN')} VNĐ` : `${orderData.amount?.toLocaleString('en-US')} VND`}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(orderData.amount, 'amt')}
                      className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      {copiedField === 'amt' ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Sao chép' : 'Copy')}
                    </button>
                  </div>
                </div>

                {/* Transfer Content */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">{isVi ? 'Nội dung chuyển khoản:' : 'Transfer memo:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold font-mono bg-cyan-950/60 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/30 text-xs">
                      {orderData.description}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(orderData.description, 'desc')}
                      className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      {copiedField === 'desc' ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Sao chép' : 'Copy')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Clean Notice */}
              <div className="text-[11px] text-slate-300/90 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl leading-relaxed">
                <span className={isExpired ? 'text-amber-300 font-medium' : 'text-cyan-300 font-medium'}>
                  {isVi ? 'Lưu ý quan trọng:' : 'Important Note:'}
                </span>{' '}
                {isExpired ? (
                  isVi 
                    ? 'Đơn hàng này đã hết hạn. Nếu bạn chưa chuyển khoản, vui lòng bấm "Tạo đơn mới" để nhận mã VietQR mới nhất.' 
                    : 'This order has expired. If not yet transferred, please click "Create New Order" for a fresh QR.'
                ) : (
                  isVi 
                    ? 'Đơn hàng tự động hủy sau 15 phút nếu chưa thanh toán. Vui lòng giữ nguyên Nội dung chuyển khoản để kích hoạt Pro trong 3 giây.'
                    : 'Order auto-cancels after 15 minutes if unpaid. Please keep the memo unchanged for 3-second Pro activation.'
                )}
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-950/40 backdrop-blur-md border border-red-500/30 text-red-200 text-xs">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;
