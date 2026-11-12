import React from 'react';
import { BugGuardMotion } from './BugGuardMotion';

export const InteractiveAuditSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section id="interactive-canvas" className="w-full py-20 sm:py-28 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top 2-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Ngăn ngừa lỗi sai trước<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">khi ghi vào mã nguồn.</span>
                </>
              ) : (
                <>
                  Catch the gap before<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">it becomes a commitment.</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2 text-left">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Hệ thống tự động canh giữ ranh giới kiến trúc và kiểm tra chéo các phụ thuộc nhạy cảm trước khi cho phép AI chạm vào file thật trên máy bạn.'
                : 'Aevum OS continuously audits boundaries and verifies dependencies before committing changes to your disk.'}
            </p>
          </div>
        </div>

        {/* ── 2-COLUMN HERO AUDIT (100% TRANSPARENT, NO BOXES, NO REDUNDANT TEXT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-left">

          {/* Left Column: Interactive Zero-Trust Bug Guard Motion */}
          <div className="lg:col-span-7 flex items-center justify-center relative select-none min-h-[360px]">
            <BugGuardMotion activeLang={activeLang} />
          </div>

          {/* Right Column: Clean Editorial Insight */}
          <div className="lg:col-span-5 space-y-4 lg:pl-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 block select-none">
              {isVi ? 'PHÂN TÍCH RỦI RO KIẾN TRÚC' : 'ARCHITECTURAL RISK AUDIT'}
            </span>

            <h3 className="text-2xl sm:text-4xl font-normal text-white [html[data-theme='light']_&]:text-slate-900 font-sans leading-tight">
              {isVi ? (
                <>
                  Bản vẽ hợp lệ.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">Nhưng chưa bao quát toàn bộ ranh giới.</span>
                </>
              ) : (
                <>
                  The document is valid.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-700">But not for the whole job.</span>
                </>
              )}
            </h3>

            <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Chốt chặn Zero-Trust phát hiện tác vụ yêu cầu sửa đổi ngoài phạm vi activeFiles. Hệ thống tự động dừng và yêu cầu sự phê duyệt của lập trình viên.'
                : 'The boundary guard detected modification attempts outside activeFiles scope. Execution was automatically suspended for human review.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveAuditSection;
