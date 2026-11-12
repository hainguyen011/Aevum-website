import React from 'react';
import { CoEvolutionMotion } from './CoEvolutionMotion';

export const CoEvolutionSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  return (
    <section id="co-evolution" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 2-COLUMN EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-10 sm:mb-14 text-left">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'KHÔNG GIAN ĐỒNG HÀNH • KHÔNG GIỚI HẠN' : 'CREATIVE SANCTUARY • UNBOUNDED'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Vượt qua ranh giới chuyên môn.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Khai phóng cộng sự số không giới hạn.
                  </span>
                </>
              ) : (
                <>
                  Transcend domain boundaries.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Unleash your boundless digital collective.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi ? (
                <>
                  <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-normal">
                    &ldquo;Công nghệ chỉ thực sự phát triển khi con người cùng phát triển.&rdquo;
                  </span>{' '}
                  Dù bạn muốn nghiên cứu khoa học, viết sách, thiết kế game, vẽ tranh hay giải quyết những bài toán phức tạp nhất — Aevum OS mang đến cho bạn một biệt đội cộng sự số thông minh, trung thành và đáng yêu, sẵn sàng đồng hành cùng bạn trên mọi hành trình.
                </>
              ) : (
                <>
                  <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-normal">
                    &ldquo;Technology truly advances only when humanity advances alongside it.&rdquo;
                  </span>{' '}
                  Whether you want to explore science, write stories, design games, or crack hard problems — Aevum OS gives you a loyal, cheerful, and brilliant digital team ready to turn every bold curiosity into reality.
                </>
              )}
            </p>
          </div>

        </div>

        {/* ── 100% TRANSPARENT 3D INTERDISCIPLINARY LAB & BLACKBOARD MOTION ── */}
        <div className="w-full relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center select-none">
          <CoEvolutionMotion activeLang={activeLang} />
        </div>

      </div>
    </section>
  );
};

export default CoEvolutionSection;
