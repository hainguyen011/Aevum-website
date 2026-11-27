import React, { useState } from 'react';
import { Zap, Shield, Network } from 'lucide-react';

export const ValuePropsSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [audience, setAudience] = useState('individual'); // 'individual' | 'team'

  const catalog = {
    individual: [
      {
        icon: Zap,
        title: isVi ? 'Không bao giờ mất mạch' : 'Never lose your train of thought',
        desc: isVi
          ? 'Tắt máy mở lại hay đổi IDE, cộng sự vẫn nhớ trọn quy ước code và lý do thiết kế trước đó.'
          : 'Switch IDEs or reopen tomorrow with your project rules and history completely intact.'
      },
      {
        icon: Shield,
        title: isVi ? 'Thử nghiệm an toàn trong RAM' : 'Safe RAM testing before saving',
        desc: isVi
          ? 'Mọi lệnh chỉnh sửa chạy thử trong phân vùng ảo; chỉ ghi xuống đĩa khi bạn bấm đồng ý.'
          : 'Edits run inside isolated volatile RAM so your host project stays safe until you approve.'
      },
      {
        icon: Network,
        title: isVi ? 'Bớt việc lặp lại hàng ngày' : 'Delegate repetitive chores',
        desc: isVi
          ? 'Từ sửa lỗi, viết test đến rà soát cấu trúc — một nhóm trợ lý giúp bạn san sẻ việc nặng.'
          : 'From bug checks and tests to cleanup, digital specialists shoulder the busywork beside you.'
      }
    ],
    team: [
      {
        icon: Zap,
        title: isVi ? 'Chung một bộ não dự án' : 'Shared workspace wisdom',
        desc: isVi
          ? 'Quy chuẩn kiến trúc được lưu tập trung trong dự án để cả thành viên mới lẫn AI làm đúng ngay.'
          : 'Project standards persist in one shared local brain so new teammates stay aligned from day one.'
      },
      {
        icon: Shield,
        title: isVi ? 'Mã nguồn ở lại nội bộ' : 'Source code stays yours',
        desc: isVi
          ? 'Chạy cục bộ trên máy cá nhân hoặc VPC riêng, không đẩy mã nguồn độc quyền lên đám mây.'
          : 'Local-first execution ensures proprietary code stays inside your network perimeter.'
      },
      {
        icon: Network,
        title: isVi ? 'Tự kiểm tra chéo trước khi gộp' : 'Built-in peer verification',
        desc: isVi
          ? 'Coder, Kiến trúc sư và QA AI tự rà ranh giới sạch sẽ trước khi trình kết quả cho đội ngũ.'
          : 'Architect, Coder, and QA personas audit boundaries before landing changes.'
      }
    ]
  };

  const items = catalog[audience];

  return (
    <section id="value-props" className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header + Audience Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none">
              <span>{isVi ? 'GIÁ TRỊ HÀNG NGÀY • BEYOND CHAT' : 'EVERYDAY VALUE • BEYOND CHAT'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? 'Nhẹ đầu hơn mỗi ngày làm việc.' : 'Designed for calmer, faster days.'}
            </h2>
          </div>

          <div className="inline-flex items-center p-1.5 rounded-full bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-100 text-sm font-sans self-start lg:self-end shrink-0">
            <button
              type="button"
              onClick={() => setAudience('individual')}
              className={`px-4 py-2 min-h-[44px] rounded-full transition-colors cursor-pointer ${audience === 'individual'
                ? 'bg-white text-slate-950 font-medium [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-700 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
            >
              {isVi ? 'Cá nhân & Builder' : 'Individuals'}
            </button>
            <button
              type="button"
              onClick={() => setAudience('team')}
              className={`px-4 py-2 min-h-[44px] rounded-full transition-colors cursor-pointer ${audience === 'team'
                ? 'bg-white text-slate-950 font-medium [html[data-theme="light"]_&]:bg-slate-900 [html[data-theme="light"]_&]:text-white'
                : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-700 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
            >
              {isVi ? 'Đội ngũ & Startup' : 'Teams'}
            </button>
          </div>
        </div>

        {/* 12-Col Asymmetric Grid Masonry (7 Primary Feature + 5 Dual Stacked Pillars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch text-left">
          {items[0] && (() => {
            const LeadIcon = items[0].icon;
            return (
              <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 flex flex-col justify-between gap-8 transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] [html[data-theme='light']_&]:bg-white flex items-center justify-center text-white [html[data-theme='light']_&]:text-slate-900">
                      <LeadIcon size={20} />
                    </div>
                    <span className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500">01</span>
                  </div>
                  <div className="space-y-3 pt-2">
                    <h3 className="text-2xl sm:text-[28px] font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                      {items[0].title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal max-w-xl m-0">
                      {items[0].desc}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 pt-2">
                  {audience === 'individual'
                    ? (isVi ? 'BỀN VỮNG • MỞ LẠI BẤT KỲ LÚC NÀO' : 'PERSISTENT • ZERO CONTEXT RESET')
                    : (isVi ? 'ĐỒNG BỘ CHUẨN CHUNG • TOÀN ĐỘI NGŨ' : 'ALIGNED WORKSPACE • DAY ONE')}
                </div>
              </div>
            );
          })()}

          <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-5">
            {items.slice(1).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 space-y-3.5 transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] [html[data-theme='light']_&]:bg-white flex items-center justify-center text-white [html[data-theme='light']_&]:text-slate-900">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500">0{idx + 2}</span>
                  </div>
                  <h3 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValuePropsSection;
