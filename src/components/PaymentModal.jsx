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
  const [timeLeft, setTimeLeft] = useState(900);
  const [isExpired, setIsExpired] = useState(false);
  const pollTimerRef = useRef(null);

  useEffect(() => {
    setCycle(initialCycle);
  }, [initialCycle]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError('');
      setIsSuccess(false);
      setIsExpired(false);
      setTimeLeft(900);
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
      const response = await MembershipService.requestUpgrade(cycle, accessToken, 'sepay');
      const orderPayload = response?.data || response?.order || (response?.orderCode ? response : null);
      if (response && response.success && orderPayload) {
        setOrderData(orderPayload);
        setIsExpired(false);
        setTimeLeft(orderPayload.expiresInSeconds || 900);
        setPollingActive(true);
      } else {
        throw new Error(response?.error || response?.message || 'Không thể tạo đơn hàng thanh toán.');
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
      maxWidth={orderData ? '2xl' : 'md'}
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
                  <span className="text-slate-400">{isVi ? 'Ngân hàng thụ hưởng:' : 'Bank:'}</span>
                  <span className="text-white font-medium">
                    {orderData.bankInfo?.bankName || (orderData.bankInfo?.bankId === 'MB' ? 'MBBank (Quân Đội)' : orderData.bankInfo?.bankId) || 'MBBank'}
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
                      {orderData.amount?.toLocaleString('vi-VN')} VNĐ
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
