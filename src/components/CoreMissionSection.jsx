import React from 'react';
import { AevumOsChatMockup } from './AevumOsChatMockup';

/**
 * CoreMissionSection - Giới thiệu trực quan không gian AevumOS Desktop
 * 
 * Mô phỏng trung thực UI AevumOS (Sidebar dự án, Máy chủ cổng 3344, khung chat đen Obsidian)
 * cùng dòng hoạt động thực tế của Agent (Memory Recall, CoW RAM Sandbox, Boundary Guard).
 */

export const CoreMissionSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section
      id="mission"
      className="w-full py-12 sm:py-16 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Concise Editorial Header (DeepMind Breathing Room) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-6 sm:mb-8 text-left">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none">
              <span>{isVi ? 'SỨ MỆNH CỐT LÕI' : 'CORE MISSION'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.14] font-sans">
              {isVi ? (
                <>
                  Từ trợ lý hỏi-đáp thành{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    đồng nghiệp biết nhớ việc.
                  </span>
                </>
              ) : (
                <>
                  From forgetful chatbox to{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    lasting engineering partners.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
              {isVi
                ? 'Không chỉ sinh code rồi quên, các cộng sự hiểu cấu trúc dự án và tự phối hợp hoàn thiện cùng bạn.'
                : 'More than prompt autocomplete: a coordinated digital collective that retains project architecture and finishes tasks beside you.'}
            </p>
          </div>
        </div>

        {/* Authentic AevumOS Desktop UI & Live Agent Activity Simulator */}
        <AevumOsChatMockup activeLang={activeLang} />

      </div>
    </section>
  );
};

export default CoreMissionSection;

