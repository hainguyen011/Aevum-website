import React from 'react';
import { Shield, User, ArrowLeft, Key } from 'lucide-react';

export const AuthLockGate = ({ 
  activeLang = 'vi', 
  onOpenAuthModal, 
  onNavigate, 
  pageName = 'Trang này' 
}) => {
  const isVi = activeLang === 'vi';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-mono max-w-lg mx-auto my-12">
      {/* Laser Shield Icon Box */}
      <div className="w-16 h-16 rounded-[8px] bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-500/10">
        <Shield className="w-8 h-8 text-cyan-400" />
      </div>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white/[0.04] border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-3 select-none">
        <span>{isVi ? 'YÊU CẦU XÁC THỰC' : 'AUTHENTICATION REQUIRED'}</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-3">
        {isVi ? `Đăng nhập để xem ${pageName}` : `Sign in to access ${pageName}`}
      </h2>

      <p className="text-xs text-slate-400 leading-relaxed mb-8 max-w-md">
        {isVi 
          ? `Tài liệu Kỹ thuật, Nhật ký Phát triển và Kênh Thảo luận được bảo vệ dành riêng cho cộng đồng thành viên và Tester của Aevum OS.`
          : `Technical Documentation, Changelog, and Developer Discussions are exclusively protected for Aevum OS members and verified testers.`}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-3 rounded-[5px] bg-[#0ea5e9] hover:bg-[#38bdf8] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20 font-mono"
        >
          <User className="w-4 h-4" />
          <span>{isVi ? 'Đăng Nhập / Đăng Ký' : 'Sign In / Register'}</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('landing')}
          className="px-5 py-3 rounded-[5px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isVi ? 'Về Trang Chủ' : 'Back to Home'}</span>
        </button>
      </div>
    </div>
  );
};

export default AuthLockGate;
