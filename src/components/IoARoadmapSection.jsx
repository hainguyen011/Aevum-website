import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  FileText,
  ChevronDown
} from 'lucide-react';
import { HeroIoAMotionDiagram } from './HeroIoAMotionDiagram';

export const IoARoadmapSection = ({ onNavigate, onOpenTrialModal, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [showDeepThesis, setShowDeepThesis] = useState(false);

  const phases = [
    {
      step: isVi ? 'GIAI ĐOẠN 01 · HIỆN TẠI' : 'PHASE 01 · LIVE',
      title: isVi ? 'Trí nhớ dự án cục bộ' : 'Local Workspace Memory',
      desc: isVi
        ? 'Giữ nguyên bối cảnh trên máy bạn qua chuẩn Open MCP cho Cursor, VS Code và Claude.'
        : 'Zero context amnesia across Cursor, VS Code, and Claude over Open MCP.'
    },
    {
      step: isVi ? 'GIAI ĐOẠN 02 · ĐANG MỞ' : 'PHASE 02 · ACTIVE',
      title: isVi ? 'Biệt đội & Sandbox an toàn' : 'Squads & Safe Sandboxing',
      desc: isVi
        ? '7 chuyên gia tự phối hợp và kiểm tra chéo trong phân vùng RAM ảo hóa.'
        : 'Seven companions collaborating safely inside isolated volatile RAM partitions.'
    },
    {
      step: isVi ? 'GIAI ĐOẠN 03 · TƯƠNG LAI' : 'PHASE 03 · NEXT',
      title: isVi ? 'Mạng PiperNet (IoA)' : 'PiperNet Mesh (IoA)',
      desc: isVi
        ? 'Trao đổi tri thức trừu tượng giữa các nhóm Agent mà không rò rỉ mã nguồn.'
        : 'Decentralized pattern exchange across organizations with zero raw code exposure.'
    }
  ];

  const thesisPoints = [
    {
      id: 'moat',
      title: isVi ? 'Độc lập mô hình (OS Moat)' : 'Model-Agnostic OS Moat',
      tag: 'ARCHITECTURE',
      desc: isVi
        ? 'Tập trung vào điều phối, lập lịch và ký ức bền vững — càng hưởng lợi khi LLM mới rẻ và mạnh hơn.'
        : 'Owns memory and scheduling infrastructure independent of underlying model providers.'
    },
    {
      id: 'economics',
      title: isVi ? 'Giảm 66% chi phí suy luận' : '66% Lower Token Overhead',
      tag: 'ECONOMICS',
      desc: isVi
        ? 'Băm AST và nén ngữ nghĩa giúp loại bỏ phần nhắc lại thừa thãi ở mỗi lượt hỏi AI.'
        : 'AST hashing and semantic distillation strip repetitive context payloads.'
    },
    {
      id: 'science',
      title: isVi ? 'Thực chứng Neural Brain v3.0' : 'Neural Brain v3.0 Rigor',
      tag: 'RESEARCH',
      desc: isVi
        ? 'Mọi cải tiến trí nhớ đều có chứng minh toán học và đo kiểm thực nghiệm trước khi phát hành.'
        : 'Memory breakthroughs undergo formal verification and reproducible sandbox benchmarks.'
    }
  ];

  return (
    <section id="ioa-roadmap" className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Concise Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 text-left">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none">
              <span>{isVi ? 'LỘ TRÌNH PHÁT TRIỂN' : 'EVOLUTION ROADMAP'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Từ máy cá nhân<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">đến mạng lưới cộng sự AI.</span>
                </>
              ) : (
                <>
                  From local daemon<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">to Internet of Agents.</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
              {isVi
                ? 'Hạ tầng cộng tác mở giúp các Agent kết nối an toàn ngay từ chiếc máy cá nhân hôm nay.'
                : 'Building the open local-first foundation connecting autonomous companions smoothly.'}
            </p>
          </div>
        </div>

        {/* Dynamic Diagram inside Clean Obsidian Stage */}
        <div className="w-full relative min-h-[420px] rounded-3xl bg-[#0C0E14]/45 [html[data-theme='light']_&]:bg-slate-50/75 flex items-center justify-center mb-6 select-none overflow-hidden">
          <HeroIoAMotionDiagram />
        </div>

        {/* 12-Col Asymmetric Masonry Grid: 6 + 6 / 7 + 5 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 text-left mb-8">
          {phases.map((p, idx) => (
            <div
              key={p.step}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80 space-y-2.5 ${idx < 2 ? 'md:col-span-6' : 'md:col-span-7 flex flex-col justify-between'}`}
            >
              <div className="space-y-2.5">
                <span className="block text-xs font-mono uppercase tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600">
                  {p.step}
                </span>
                <h3 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                  {p.title}
                </h3>
                <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-normal leading-[1.7] m-0">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Integrated Partner Tile (5 cols alongside Phase 03) */}
          <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 flex flex-col justify-between gap-5 text-left">
            <div className="space-y-2">
              <span className="block text-xs font-mono uppercase tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600">
                {isVi ? 'HỢP TÁC R&D & DOANH NGHIỆP' : 'R&D & ENTERPRISE PARTNERS'}
              </span>
              <h4 className="text-xl font-medium text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                {isVi ? 'Kết nối với I2FLabs cho thử nghiệm tổ chức' : 'Partner with I2FLabs for Private Beta'}
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:dev@aevum.ai.vn?subject=Aevum%20OS%20-%20Strategic%20Investment%20%26%20R%26D%20Inquiry"
                className="px-4 py-2.5 min-h-[48px] rounded-full bg-white hover:bg-slate-200 text-slate-950 [html[data-theme='light']_&]:bg-slate-900 [html[data-theme='light']_&]:hover:bg-black [html[data-theme='light']_&]:text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>{isVi ? 'Nhận Pitch Deck' : 'Request Pitch Deck'}</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-4 py-2.5 min-h-[48px] rounded-full bg-white/5 hover:bg-white/10 [html[data-theme='light']_&]:bg-slate-200 [html[data-theme='light']_&]:hover:bg-slate-300 text-white [html[data-theme='light']_&]:text-slate-900 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isVi ? 'Về Đội ngũ' : 'Meet the Squad'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Meta System Card Collapsible Deep-Tech / Investor Thesis */}
        <div>
          <button
            type="button"
            aria-expanded={showDeepThesis}
            onClick={() => setShowDeepThesis((prev) => !prev)}
            className="inline-flex items-center gap-2 min-h-[48px] text-sm font-sans font-medium text-white hover:text-slate-200 [html[data-theme='light']_&]:text-slate-900 underline underline-offset-4 decoration-white/25 [html[data-theme='light']_&]:decoration-slate-300 transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            <span>
              {showDeepThesis
                ? (isVi ? 'Thu gọn luận điểm R&D & Kinh tế Token ↑' : 'Hide R&D & Token Economics ↑')
                : (isVi ? 'Xem thêm luận điểm R&D & Kinh tế Token ↓' : 'Read R&D moat & Token Economics ↓')}
            </span>
            <ChevronDown size={15} className={`transition-transform ${showDeepThesis ? 'rotate-180' : ''}`} />
          </button>

          {showDeepThesis && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-left mt-4 animate-in fade-in duration-200">
              {thesisPoints.map((point) => (
                <div key={point.id} className="p-6 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 space-y-2">
                  <span className="inline-block text-xs font-mono uppercase tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600">
                    {point.tag}
                  </span>
                  <h4 className="text-base font-medium text-white [html[data-theme='light']_&]:text-slate-900">
                    {point.title}
                  </h4>
                  <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] m-0">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default IoARoadmapSection;
