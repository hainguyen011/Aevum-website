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
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-sans max-w-lg mx-auto my-12">
      {/* Monochrome Shield Icon Box */}
      <div className="w-16 h-16 rounded-2xl bg-white/[0.06] [html[data-theme='light']_&]:bg-slate-100 border border-white/15 [html[data-theme='light']_&]:border-slate-200 flex items-center justify-center text-white [html[data-theme='light']_&]:text-slate-900 mb-6">
        <Shield className="w-8 h-8" />
      </div>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 select-none">
        <span>{isVi ? 'YÊU CẦU XÁC THỰC' : 'AUTHENTICATION REQUIRED'}</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight mb-3 font-display">
        {isVi ? `Đăng nhập để xem ${pageName}` : `Sign in to access ${pageName}`}
      </h2>

      <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-[1.7] mb-8 max-w-md">
        {isVi 
          ? `Tài liệu Kỹ thuật, Nhật ký Phát triển và Kênh Thảo luận được bảo vệ dành riêng cho cộng đồng thành viên và Tester của Aevum OS.`
          : `Technical Documentation, Changelog, and Developer Discussions are exclusively protected for Aevum OS members and verified testers.`}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          onClick={onOpenAuthModal}
          className="min-h-[48px] px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:hover:bg-black [html[data-theme='light']_&]:text-white font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 font-sans"
        >
          <User className="w-4 h-4" />
          <span>{isVi ? 'Đăng Nhập / Đăng Ký' : 'Sign In / Register'}</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('landing')}
          className="min-h-[48px] px-5 py-3 rounded-full border border-white/15 [html[data-theme='light']_&]:border-slate-300 bg-white/[0.04] hover:bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:hover:bg-slate-200 text-white [html[data-theme='light']_&]:text-slate-900 text-sm font-medium transition-colors cursor-pointer font-sans flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isVi ? 'Về Trang Chủ' : 'Back to Home'}</span>
        </button>
      </div>
    </div>
  );
};

export default AuthLockGate;
