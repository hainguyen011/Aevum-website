import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Check, Copy, QrCode, ShieldCheck, Zap, ArrowRight, 
  RefreshCw, AlertCircle, Sparkles, CheckCircle2, Clock, Landmark
} from 'lucide-react';
import { MembershipService } from '../services/MembershipService';
import anAvatar from '../../assets/agent-avatar/an_avatar.webp';

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

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError('');
      setIsSuccess(false);
      setOrderData(null);
    } else {
      document.body.style.overflow = '';
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }
    return () => {
      document.body.style.overflow = '';
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

  if (!isOpen) return null;

  const amountDisplay = cycle === 'yearly' ? '1.990.000 VNĐ' : '249.000 VNĐ';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0b0f19] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden font-mono text-slate-200 z-10 my-8">
        
        {/* Cyber Neon Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {isVi ? 'Nâng Cấp Gói Aevum Pro' : 'Upgrade to Aevum Pro'}
              </h3>
              <span className="text-[10px] text-cyan-400">VietQR Napas 24/7 • Instant Activation</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">

          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                  {isVi ? 'Thanh Toán Thành Công!' : 'Payment Completed!'}
                </h4>
                <p className="text-xs text-emerald-300">
                  {isVi ? 'Đặc quyền Aevum Pro đã được mở khóa ngay tức thì trên toàn bộ máy trạm của bạn.' : 'Aevum Pro privileges are now fully unlocked across all your linked workstations.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-left space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Mã đơn:</span>
                  <span className="text-white font-bold">{orderData?.orderCode}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gói nâng cấp:</span>
                  <span className="text-cyan-400 font-bold">Aevum Pro ({cycle === 'yearly' ? 'Gói Năm' : 'Gói Tháng'})</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                {isVi ? 'Bắt Đầu Sử Dụng Pro' : 'Done & Start Using Pro'}
              </button>
            </div>
          ) : !orderData ? (
            /* STEP 1: CHOOSE PLAN & INITIATE */
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isVi ? '1. Chọn Chu Kỳ Thanh Toán' : '1. Choose Billing Cycle'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCycle('monthly')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      cycle === 'monthly'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-lg shadow-cyan-950/50'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">Gói Tháng</span>
                      {cycle === 'monthly' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-sm font-black text-cyan-400 font-mono">249.000 đ</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Thanh toán theo tháng</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCycle('yearly')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      cycle === 'yearly'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-lg shadow-cyan-950/50'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="absolute top-0 right-0 bg-cyan-500 text-black font-bold text-[8px] px-2 py-0.5 rounded-bl-md uppercase">
                      -20%
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">Gói Năm</span>
                      {cycle === 'yearly' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-sm font-black text-cyan-400 font-mono">1.990.000 đ</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Tiết kiệm ~500.000 đ/năm</div>
                  </button>
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Landmark className="w-4 h-4 text-cyan-400" />
                    <span>VietQR Napas 24/7 (Techcombank)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    0% Phí • Tức thì
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Chuyển khoản liên ngân hàng 24/7 không phí trung gian. Quét mã bằng bất kỳ app ngân hàng nào (Vietcombank, MB, Techcombank, VPBank, MoMo,...).
                </p>
              </div>

              {/* Companion Tip */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs">
                <img src={anAvatar} alt="An" className="w-6 h-6 rounded-full border border-sky-400/40 shrink-0" />
                <span className="text-[11px] text-sky-200 leading-tight">
                  Em sẽ lắng nghe biến động tài khoản và kích hoạt Pro ngay khi Master chuyển khoản xong nhé!
                </span>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-[#0ea5e9] hover:bg-[#38bdf8] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang khởi tạo mã QR...</span>
                  </>
                ) : (
                  <>
                    <span>Tạo Mã VietQR Thanh Toán ({amountDisplay})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* STEP 2: VIETQR DETAILS & LIVE RADAR */
            <div className="space-y-5">
              
              {/* QR Image Box */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white text-black text-center shadow-lg relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                  <img 
                    src={orderData.qrCode} 
                    alt="VietQR Napas 24/7" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 font-bold">
                  Quét mã qua ứng dụng Ngân hàng hoặc Ví điện tử
                </span>
              </div>

              {/* Bank Details Table */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 text-xs">
                
                {/* Bank Name */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Ngân hàng thụ hưởng:</span>
                  <span className="text-white font-bold">Techcombank (TCB)</span>
                </div>

                {/* Account Number */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Số tài khoản:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold font-mono tracking-wider">
                      {orderData.bankInfo?.accountNo || '112358420222'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(orderData.bankInfo?.accountNo || '112358420222', 'acc')}
                      className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
                      title="Copy số tài khoản"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Account Name */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Chủ tài khoản:</span>
                  <span className="text-white font-bold uppercase">
                    {orderData.bankInfo?.accountName || 'NGUYEN HUY HAI'}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Số tiền:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold font-mono">
                      {orderData.amount?.toLocaleString('vi-VN')} VNĐ
                    </span>
                    <button
                      onClick={() => copyToClipboard(orderData.amount, 'amt')}
                      className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
                      title="Copy số tiền"
                    >
                      {copiedField === 'amt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Transfer Content */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Nội dung chuyển khoản:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300 font-black font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {orderData.description}
                    </span>
                    <button
                      onClick={() => copyToClipboard(orderData.description, 'desc')}
                      className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
                      title="Copy nội dung"
                    >
                      {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="text-[11px] text-amber-300/80 bg-amber-950/20 border border-amber-500/20 p-3 rounded-lg leading-relaxed">
                ⚠️ <strong className="text-amber-200">Quan trọng:</strong> Vui lòng giữ nguyên <strong>Nội dung chuyển khoản</strong> để hệ thống tự động đối soát và kích hoạt Pro trong 3 giây.
              </div>

              {/* Polling Live Radar */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[11px] text-slate-300">Đang lắng nghe chuyển khoản Napas 24/7...</span>
                </div>
                <button
                  onClick={handleManualCheck}
                  disabled={loading}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {loading ? 'Đang kiểm tra...' : 'Kiểm tra ngay'}
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
