import React from 'react';

/**
 * PartnersInfiniteSection - Continuous Infinite Slide of Strategic Allies
 * 
 * Đối tác đồng hành:
 * 1. UNIKORN - Nền tảng Đổi mới Sáng tạo
 * 2. LÁ CHẮN SỐ - An ninh Mạng & Chủ quyền Số
 * 3. DJ54N - Đơn vị sáng tạo âm nhạc
 * 4. I2F LABS - Viện Nghiên cứu Trí tuệ Nhân tạo
 * 
 * Thiết kế tối giản:
 * - CHỈ tên viết IN HOA, KHÔNG sử dụng icon.
 * - Marquee vô cực (Infinite Slide) mượt mà với hiệu ứng mờ dần hai đầu (Fade Gradients).
 * - Tạm dừng khi di chuột (Hover to pause).
 */

export const PartnersInfiniteSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const partners = [
    {
      id: 'unikorn',
      name: 'UNIKORN',
      role: isVi ? 'Nền tảng Đổi mới Sáng tạo' : 'Innovation Platform'
    },
    {
      id: 'lachanso',
      name: 'LÁ CHẮN SỐ',
      role: isVi ? 'An ninh Mạng & Chủ quyền Số' : 'Digital Defense Alliance'
    },
    {
      id: 'dj54n',
      name: 'DJ54N STUDIO',
      role: isVi ? 'Đơn vị sáng tạo âm nhạc' : 'Music Creation & Production Studio'
    },
    {
      id: 'i2flabs',
      name: 'I2FLABS VIETNAM',
      role: isVi ? 'Tổ chức Nghiên cứu AI & ứng dụng' : 'AI & Agentic Systems Lab'
    }
  ];

  return (
    <section id="partners" className="w-full py-6 sm:py-8 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5">

        {/* Concise Single-Line Alignment Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
          <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-600 uppercase">
            <span>{isVi ? 'ĐỐI TÁC ĐỒNG HÀNH • STRATEGIC ALLIES' : 'STRATEGIC ALLIES & ECOSYSTEM'}</span>
          </div>
          <h2 className="text-base font-normal text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-sans">
            {isVi
              ? 'Đồng hành cùng những đơn vị tiên phong xây dựng công nghệ Việt.'
              : 'Built alongside visionary Vietnamese technology teams.'}
          </h2>
        </div>

      </div>

      {/* ── SEAMLESS COMPACT INFINITE MARQUEE SLIDER ── */}
      <div className="relative w-full overflow-hidden">

        {/* Left & Right Cinematic Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-[#0A0B0F] via-[#0A0B0F]/80 to-transparent [html[data-theme='light']_&]:from-[#FFFFFF] [html[data-theme='light']_&]:via-[#FFFFFF]/80 [html[data-theme='light']_&]:to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-[#0A0B0F] via-[#0A0B0F]/80 to-transparent [html[data-theme='light']_&]:from-[#FFFFFF] [html[data-theme='light']_&]:via-[#FFFFFF]/80 [html[data-theme='light']_&]:to-transparent" />

        {/* Infinite Moving Track (Nhỏ gọn, mượt mà, text rõ nét) */}
        <div className="flex gap-6 sm:gap-10 animate-marquee hover:[animation-play-state:paused] py-2">

          {/* Render 4 Sets to guarantee seamless gapless infinity loop */}
          {[1, 2, 3, 4].map((setNum) => (
            <React.Fragment key={`set-${setNum}`}>
              {partners.map((partner) => (
                <div
                  key={`${setNum}-${partner.id}`}
                  className="flex flex-col justify-center px-6 sm:px-8 py-2 sm:py-2.5 bg-transparent border-0 min-w-[190px] sm:min-w-[230px] group cursor-default text-left shrink-0 select-none"
                >
                  <div className="font-sans font-bold tracking-wider text-sm sm:text-base lg:text-lg text-white [html[data-theme='light']_&]:text-slate-900 uppercase group-hover:text-slate-200 [html[data-theme='light']_&]:group-hover:text-black transition-colors">
                    {partner.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-500 pt-1 leading-snug">
                    {partner.role}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}

        </div>

      </div>

    </section>
  );
};

export default PartnersInfiniteSection;
