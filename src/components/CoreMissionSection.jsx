import React from 'react';
import { CoreMissionMotion } from './CoreMissionMotion';

/**
 * CoreMissionSection - Section Làm rõ Mục tiêu của AevumOS ngay từ đầu
 * 
 * Nội dung:
 * - Trao cho bạn Agent tự hành có khả năng ghi nhớ, tự động làm việc và tiến hóa cùng hành trình của bạn.
 * - Bên dưới là motion pixel agent 5 bạn đứng thành hàng chữ V với diễn hoạt hài hước và ngầu.
 */

export const CoreMissionSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section
      id="mission"
      className="w-full pt-10 pb-8 sm:pt-14 sm:pb-10 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.05] [html[data-theme='light']_&]:border-slate-200 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 2-COLUMN EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start mb-6 sm:mb-8 text-left">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'MỤC TIÊU CỐT LÕI • CORE MISSION' : 'CORE MISSION • AUTONOMOUS AGENTS'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.14] font-sans">
              {isVi ? (
                <>
                  Trao cho bạn Agent tự hành có khả năng ghi nhớ,{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    tự động làm việc và tiến hóa cùng hành trình của bạn.
                  </span>
                </>
              ) : (
                <>
                  Empowering you with autonomous agents that remember,{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    execute independently, and evolve with your journey.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-4 pt-2">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Không đơn thuần là công cụ sinh code tức thời. Aevum OS trao cho bạn một biệt đội cộng sự số thực thụ, am hiểu kiến trúc và cùng bạn gánh vác mọi trọng trách kỹ thuật.'
                : 'Not just transient prompt generators. Aevum OS gives you a dedicated digital collective that remembers architectural conventions and scales alongside your engineering career.'}
            </p>
          </div>

        </div>

        {/* ── MOTION CANVAS: V-FORMATION 5 PIXEL AGENTS ── */}
        <CoreMissionMotion activeLang={activeLang} />

      </div>
    </section>
  );
};

export default CoreMissionSection;

