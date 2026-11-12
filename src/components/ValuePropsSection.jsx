import React from 'react';
import { Zap, Shield, Network } from 'lucide-react';

export const ValuePropsSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const items = [
    {
      icon: Zap,
      title: isVi ? 'Đồng hành bền bỉ. Thấu hiểu sâu sắc.' : 'Persistent companions. Deep context.',
      desc: isVi
        ? 'Không còn cảnh "quên sạch" bối cảnh sau mỗi lần đóng tab. Cộng sự ghi nhớ trọn vẹn quy ước kiến trúc, lý do ra quyết định và cùng bạn đi qua từng chặng đường phát triển.'
        : 'Never lose context after closing a tab. Companions preserve full architectural intent and decisions across multi-week milestones.'
    },
    {
      icon: Shield,
      title: isVi ? 'Tin cậy tuyệt đối. Không lo hỏng code.' : 'Zero-risk trust. Safe execution.',
      desc: isVi
        ? 'Mọi thử nghiệm và câu lệnh CLI đều vận hành trong phân vùng RAM ảo hóa (CoW Sandbox). An toàn tuyệt đối, chỉ chạm vào máy thật khi bạn đã hoàn toàn an tâm.'
        : 'Copy-on-Write volatile RAM virtualization isolates all execution safely, protecting your host system until you give explicit approval.'
    },
    {
      icon: Network,
      title: isVi ? 'Cùng nhau khám phá. Giải bài toán lớn.' : 'Explore & conquer big challenges together.',
      desc: isVi
        ? 'Từ kiến trúc, lập trình, kiểm thử đến nghiên cứu khoa học — các cộng sự số chủ động phối hợp, chia lửa và mở ra những chân trời công nghệ mới cùng bạn.'
        : 'Autonomous cross-domain squads (Architect, Coder, QA, Researcher) collaborating smoothly over shared memory to expand new frontiers.'
    }
  ];

  return (
    <section id="value-props" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20 text-left">
          
          {/* Left Title: Clean, Large, Editorial font */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none">
              <span>{isVi ? 'TRIẾT LÝ CỘNG SỰ • BEYOND CHAT' : 'COMPANION PHILOSOPHY • BEYOND CHAT'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Vượt xa khung chat.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Cộng sự số đích thực cho bạn.
                  </span>
                </>
              ) : (
                <>
                  Beyond prompt chat.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    True digital companions for you.
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Right Description: Câu thông điệp cốt lõi theo đúng yêu cầu */}
          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-relaxed font-sans font-light">
              {isVi
                ? 'Không chỉ chat, chúng tôi muốn trao cho bạn các cộng sự số: đồng hành, tin cậy và cùng nhau khám phá.'
                : 'Beyond chat, we want to give you true digital companions: persistent, trusted, and exploring the future together.'}
            </p>
          </div>

        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-300 flex items-center justify-center text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ValuePropsSection;

