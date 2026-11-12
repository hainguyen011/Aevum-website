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
      name: 'DJ54N',
      role: isVi ? 'Đơn vị sáng tạo âm nhạc' : 'Music Creation & Production Studio'
    },
    {
      id: 'i2flabs',
      name: 'I2F LABS',
      role: isVi ? 'Viện Nghiên cứu Trí tuệ Nhân tạo' : 'AI & Agentic Systems Lab'
    }
  ];

  return (
    <section id="partners" className="w-full py-10 sm:py-14 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        
        {/* 2-Column Compact Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end text-left">
          
          {/* Cột Trái: Lời tri ân đồng hành (Nhỏ gọn, tinh tế) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="text-xs sm:text-sm text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light max-w-md">
              {isVi
                ? 'Chúng tôi trân trọng các giá trị đồng hành và nỗ lực cùng nhau trên con đường phát triển công nghệ của quốc gia và thế giới.'
                : 'We deeply honor the values of partnership, striving together on the frontier of technological advancement for the nation and the world.'}
            </p>
          </div>

          {/* Cột Phải: Tag & Tiêu đề nhỏ gọn */}
          <div className="lg:col-span-7 space-y-1.5 order-1 lg:order-2">
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'ĐỐI TÁC ĐỒNG HÀNH • STRATEGIC ALLIES' : 'STRATEGIC ALLIES & ECOSYSTEM'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-[-0.02em] text-white [html[data-theme='light']_&]:text-slate-900 leading-snug font-sans">
              {isVi ? (
                <>
                  Đồng hành cùng{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    những đơn vị tiên phong.
                  </span>
                </>
              ) : (
                <>
                  Empowered by{' '}
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    visionary innovators.
                  </span>
                </>
              )}
            </h2>
          </div>

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
                  <div className="font-sans font-bold tracking-wider text-sm sm:text-base lg:text-lg text-white [html[data-theme='light']_&]:text-slate-900 uppercase group-hover:text-amber-200/90 [html[data-theme='light']_&]:group-hover:text-blue-600 transition-colors">
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
