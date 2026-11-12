import React from 'react';
import { 
  Check, 
  ArrowRight, 
  FileText
} from 'lucide-react';
import { HeroIoAMotionDiagram } from './HeroIoAMotionDiagram';

export const IoARoadmapSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const thesisPoints = [
    {
      id: 'moat',
      title: isVi ? 'Con Hào Công Nghệ (Deep-Tech Moat)' : 'Deep-Tech Architectural Moat',
      tag: isVi ? 'ĐỘC LẬP MÔ HÌNH' : 'MODEL-AGNOSTIC',
      desc: isVi
        ? 'Không phải AI wrapper. Khi LLMs rẻ và thông minh hơn, giá trị của Aevum càng tăng nhờ giải quyết bài toán cốt lõi: lập lịch MLFQ, ảo hóa CoW và quản trị tri thức dài hạn.'
        : 'Not an AI wrapper. As LLMs become commoditized, Aevum becomes more valuable by owning the OS substrate: MLFQ scheduling, CoW sandboxing, and persistent memory.'
    },
    {
      id: 'economics',
      title: isVi ? 'Hiệu Quả Kinh Tế & Token Economics' : 'Radical Token Unit Economics',
      tag: isVi ? 'TIẾT KIỆM 66%' : '66% SAVINGS',
      desc: isVi
        ? 'Băm AST và nén ngữ nghĩa giúp giảm 66% chi phí token suy luận lãng phí. Quy trình Plan-First triệt tiêu mã lỗi, tăng 10x năng suất kỹ sư.'
        : 'Semantic compression vaults cut token inference spend by 66%. Plan-First protocols eliminate erroneous code churn, delivering 10x engineer leverage.'
    },
    {
      id: 'science',
      title: isVi ? 'Nghiên Cứu Khoa Học IEEE/ACM' : 'Peer-Reviewed Scientific Rigor',
      tag: isVi ? 'BẰNG CHỨNG TOÁN HỌC' : 'FORMAL PROOFS',
      desc: isVi
        ? 'Mọi đột phá đều xuất phát từ Cây Tri Thức RDD, kiểm định qua chứng minh toán học, benchmark thực nghiệm và ma trận FMEA 3 tầng trước khi ra mắt.'
        : 'Every system capability is proven via formal mathematical lemmas, sandbox benchmarks, and 3-tier FMEA failure analysis before deployment.'
    },
    {
      id: 'market',
      title: isVi ? 'Quy Mô Thị Trường & Cơ Hội Đầu Tư' : 'Market Opportunity & Growth',
      tag: isVi ? 'THỊ TRƯỜNG $100B+' : 'TAM $100B+',
      desc: isVi
        ? 'Đón đầu bước chuyển dịch từ Chatbot đơn lẻ sang Biệt đội Tác tử Tự trị. Mô hình kinh doanh kép: Bản quyền On-premise Doanh nghiệp & Phí giao thức IoA.'
        : 'Leading the transition from prompt chat to autonomous agent swarms. Dual revenue: Enterprise On-Premise licenses and global IoA protocol settlement.'
    }
  ];

  return (
    <section id="ioa-roadmap" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 2-COLUMN HEADER (MATCHING EDITORIAL ARCHETYPE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-10 sm:mb-14 text-left">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'TIẾN TRÌNH R&D & LỘ TRÌNH IOA' : 'R&D FRONTIER & IOA ROADMAP'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Từ Hệ điều hành AI cục bộ<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">hướng tới Internet of Agents (IoA).</span>
                </>
              ) : (
                <>
                  From Local Agentic OS<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">to the Internet of Agents (IoA).</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Aevum đang xây dựng hệ điều hành và giao thức phân tán làm nền móng để hàng triệu AI Agent độc lập có thể cộng tác, thương thảo và giải quyết các bài toán liên tổ chức.'
                : 'Aevum OS engineers the foundational OS kernel and open protocol layer enabling autonomous agent swarms to negotiate, collaborate, and execute across organizations.'}
            </p>
          </div>

        </div>

        {/* ── 100% TRANSPARENT PIXEL AGENT DYNAMIC MATCHMAKING CANVAS (NO TEXT, NO FRAME) ── */}
        <div className="w-full relative min-h-[460px] flex items-center justify-center mb-16 sm:mb-20 select-none">
          <HeroIoAMotionDiagram />
        </div>

        {/* ── 4 THESIS POINTS (100% TRANSPARENT, NO LINES, NO BORDERS, NO BADGE BG) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left mb-16 sm:mb-20">
          {thesisPoints.map((point) => (
            <div
              key={point.id}
              className="bg-transparent flex flex-col justify-between space-y-4 p-1 sm:p-0"
            >
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 select-none">
                  {point.tag}
                </span>
                
                <h4 className="text-base font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                  {point.title}
                </h4>

                <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans leading-relaxed font-light">
                  {point.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 [html[data-theme='light']_&]:text-slate-400">
                <Check size={11} className="text-slate-400" />
                <span>{isVi ? 'Đã kiểm chứng R&D' : 'Empirically Verified'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── STRATEGIC PARTNER ROW ── */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500">
              {isVi ? 'HỢP TÁC R&D & ĐẦU TƯ CHIẾN LƯỢC' : 'INVESTOR RELATIONS & R&D INQUIRIES'}
            </span>
            <h4 className="text-xl sm:text-2xl font-normal text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
              {isVi ? 'Đồng hành cùng Aevum xây dựng nền tảng Internet of Agents' : 'Partner with Aevum on the Internet of Agents'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-light leading-relaxed">
              {isVi
                ? 'Sẵn sàng chia sẻ Pitch Deck, Báo cáo Unit Economics và Bạch thư Khoa học cho các quỹ đầu tư, đối tác công nghệ và doanh nghiệp thử nghiệm.'
                : 'Request our investor pitch deck, unit economics models, and academic whitepapers for venture funds and strategic enterprise partners.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:contact@i2flabs.com?subject=Aevum%20OS%20-%20Strategic%20Investment%20%26%20R%26D%20Inquiry"
              className="px-5 py-2.5 rounded-full bg-[#ECEEFE] hover:bg-white text-[#0A0B0F] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={13} />
              <span>{isVi ? 'Nhận Pitch Deck & Dữ liệu' : 'Request Pitch Deck'}</span>
            </a>

            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 [html[data-theme='light']_&]:bg-slate-200 [html[data-theme='light']_&]:hover:bg-slate-300 text-white [html[data-theme='light']_&]:text-slate-900 font-medium text-xs border border-white/10 [html[data-theme='light']_&]:border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isVi ? 'Về I2FLabs' : 'About I2FLabs'}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IoARoadmapSection;
