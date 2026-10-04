import React, { useState, useEffect, useRef } from 'react';
import { MembershipService } from '../services/MembershipService';
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
  const pollTimerRef = useRef(null);

  useEffect(() => {
    setCycle(initialCycle);
  }, [initialCycle]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError('');
      setIsSuccess(false);
      setOrderData(null);
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isOpen]);

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
        }
      } catch (err) {
        console.warn('[PaymentModal] Polling error:', err);
      }
    }, 3000);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [orderData, pollingActive, isSuccess, onSuccess]);

  const handleCreateOrder = async () => {
    if (!user || !accessToken) {
      setError(isVi ? 'Vui lòng đăng nhập để nâng cấp gói Pro.' : 'Please sign in to upgrade to Pro.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await MembershipService.requestUpgrade(cycle, accessToken, 'direct_vietqr');
      if (response && response.success && response.data) {
        setOrderData(response.data);
        setPollingActive(true);
      } else {
        throw new Error(response?.error || 'Không thể tạo đơn hàng thanh toán.');
      }
    } catch (err) {
      setError(err.message || 'Lỗi kết nối tới cổng thanh toán.');
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
      setError(err.message || 'Lỗi kiểm tra trạng thái.');
    } finally {
      setLoading(false);
    }
  };

  const amountDisplay = cycle === 'yearly' ? '1.990.000 VNĐ' : '249.000 VNĐ';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isVi ? 'Nâng Cấp Gói Aevum Pro' : 'Upgrade to Aevum Pro'}
      subtitle="VietQR Napas 24/7 • Kích hoạt tức thì"
      closeLabel={isVi ? 'Đóng' : 'Close'}
      maxWidth="md"
      grainy={true}
    >
      <div className="space-y-6">

        {/* SUCCESS STATE */}
        {isSuccess ? (
          <div className="text-center py-4 space-y-5">
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                {isVi ? 'Thành Công' : 'Success'}
              </span>
              <h4 className="text-lg sm:text-xl font-medium text-white tracking-wide uppercase">
                {isVi ? 'Thanh Toán Hoàn Tất' : 'Payment Completed'}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {isVi ? 'Đặc quyền Aevum Pro đã được mở khóa ngay tức thì trên toàn bộ máy trạm của bạn.' : 'Aevum Pro privileges are now fully unlocked across all your linked workstations.'}
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-left space-y-2.5">
              <div className="flex justify-between items-center text-slate-300">
                <span>Mã đơn hàng:</span>
                <span className="text-white font-medium font-mono">{orderData?.orderCode}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Gói nâng cấp:</span>
                <span className="text-white font-medium">Aevum Pro ({cycle === 'yearly' ? 'Gói Năm' : 'Gói Tháng'})</span>
              </div>
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
          /* STEP 1: CHOOSE PLAN & INITIATE */
          <div className="space-y-5">
            
            {/* Plan selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-slate-300 uppercase tracking-wider block">
                {isVi ? '1. Chọn Chu Kỳ Thanh Toán' : '1. Choose Billing Cycle'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Monthly Plan Card */}
                <button
                  type="button"
                  onClick={() => setCycle('monthly')}
                  className={`p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer backdrop-blur-md ${
                    cycle === 'monthly'
                      ? 'border-white/60 bg-white/[0.1] text-white'
                      : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:bg-black/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-white">Gói Tháng</span>
                    {cycle === 'monthly' && (
                      <span className="text-[10px] uppercase tracking-wider text-slate-200 font-medium">
                        Đang chọn
                      </span>
                    )}
                  </div>
                  <div className="text-base sm:text-lg font-medium text-white tracking-tight">249.000 đ</div>
                  <div className="text-[11px] text-slate-300/80 mt-1">Thanh toán theo tháng</div>
                </button>

                {/* Yearly Plan Card */}
                <button
                  type="button"
                  onClick={() => setCycle('yearly')}
                  className={`p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                    cycle === 'yearly'
                      ? 'border-white/60 bg-white/[0.1] text-white'
                      : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:bg-black/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-white">Gói Năm</span>
                    <span className="text-[10px] text-white border border-white/20 bg-white/10 px-2 py-0.5 rounded-full font-medium">
                      -20%
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-medium text-white tracking-tight">1.990.000 đ</div>
                  <div className="text-[11px] text-slate-300/80 mt-1">Tiết kiệm ~500.000 đ/năm</div>
                </button>
              </div>
            </div>

            {/* Payment Method Details */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-white">
                  VietQR Napas 24/7 (Techcombank)
                </span>
                <span className="text-[10px] font-medium text-slate-200 uppercase tracking-wider bg-white/[0.06] border border-white/15 px-2.5 py-0.5 rounded-full">
                  0% Phí • Tức thì
                </span>
              </div>
              <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                Chuyển khoản liên ngân hàng 24/7 không phí trung gian. Quét mã bằng bất kỳ ứng dụng ngân hàng nào (Vietcombank, MB, Techcombank, VPBank, MoMo,...).
              </p>
            </div>

            {/* Minimalist System Tip */}
            <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-300 leading-relaxed">
              <span className="text-white font-medium">Hệ thống:</span> Em sẽ lắng nghe biến động tài khoản và kích hoạt Pro ngay khi Master chuyển khoản xong nhé!
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 text-xs">
                {error}
              </div>
            )}

            {/* Signature Pill Button (Hero Style) */}
            <button
              type="button"
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-200 text-black font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Đang khởi tạo mã VietQR...' : `Tạo mã VietQR thanh toán (${amountDisplay})`}
            </button>
          </div>
        ) : (
          /* STEP 2: VIETQR DETAILS & LIVE RADAR */
          <div className="space-y-5">
            
            {/* QR Code Container (Minimalist White Surface) */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl sm:rounded-2xl bg-white text-black text-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                <img 
                  src={orderData.qrCode} 
                  alt="VietQR Napas 24/7" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium">
                Quét mã qua ứng dụng Ngân hàng hoặc Ví điện tử
              </span>
            </div>

            {/* Bank Details Table */}
            <div className="p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-3 text-xs">
              
              {/* Bank Name */}
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-300">Ngân hàng thụ hưởng:</span>
                <span className="text-white font-medium">Techcombank (TCB)</span>
              </div>

              {/* Account Number */}
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-300">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium font-mono tracking-wider">
                    {orderData.bankInfo?.accountNo || '112358420222'}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(orderData.bankInfo?.accountNo || '112358420222', 'acc')}
                    className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    {copiedField === 'acc' ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* Account Name */}
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-300">Chủ tài khoản:</span>
                <span className="text-white font-medium uppercase">
                  {orderData.bankInfo?.accountName || 'NGUYEN HUY HAI'}
                </span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-300">Số tiền:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium font-mono">
                    {orderData.amount?.toLocaleString('vi-VN')} VNĐ
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(orderData.amount, 'amt')}
                    className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    {copiedField === 'amt' ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* Transfer Content */}
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Nội dung chuyển khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    {orderData.description}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(orderData.description, 'desc')}
                    className="text-[10px] font-medium text-slate-200 hover:text-white px-2 py-0.5 rounded border border-white/15 hover:border-white/30 bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    {copiedField === 'desc' ? 'Đã chép' : 'Sao chép'}
                  </button>
                </div>
              </div>
            </div>

            {/* Clean Notice */}
            <div className="text-xs text-slate-300 bg-black/40 backdrop-blur-md border border-white/10 p-3.5 rounded-xl leading-relaxed">
              <span className="text-white font-medium">Lưu ý quan trọng:</span> Vui lòng giữ nguyên <span className="text-white font-mono font-medium">Nội dung chuyển khoản</span> để hệ thống tự động đối soát và kích hoạt Pro trong 3 giây.
            </div>

            {/* Polling Live Radar (Subtle Minimalist Status) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-slate-300 text-xs">Đang lắng nghe chuyển khoản Napas 24/7...</span>
              </div>
              <button
                type="button"
                onClick={handleManualCheck}
                disabled={loading}
                className="px-3 py-1 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] text-white text-[11px] font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                {loading ? 'Đang kiểm tra...' : 'Kiểm tra ngay'}
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-slate-200 text-xs">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;
