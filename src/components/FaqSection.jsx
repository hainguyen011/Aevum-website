import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [openIdx, setOpenIdx] = useState(0);
  const [showTechnicalFaqs, setShowTechnicalFaqs] = useState(false);

  const coreFaqs = [
    {
      q: isVi ? 'Tôi có cần bỏ công cụ hay đổi IDE đang quen dùng không?' : 'Do I need to switch my IDE or tools?',
      a: isVi
        ? 'Hoàn toàn không. Bạn vẫn làm việc bình thường trên Cursor, Claude Code hay VS Code; Aevum OS chỉ chạy ngầm phía sau để giữ bộ nhớ dự án liền mạch.'
        : 'Not at all. Keep coding inside Cursor, Claude Code, or VS Code while Aevum OS quietly preserves context underneath.'
    },
    {
      q: isVi ? 'Mã nguồn và tài liệu có bị gửi lên đám mây không?' : 'Does my code stay private on my machine?',
      a: isVi
        ? 'Không. Bộ nhớ dự án nằm trọn trên ổ cứng máy cá nhân và các thử nghiệm chạy trong vùng RAM cô lập, tuyệt đối không dùng code để train AI.'
        : 'Yes, 100% Local-First. Project memory stays on your disk and test runs execute in volatile RAM until you approve.'
    },
    {
      q: isVi ? 'Aevum hỗ trợ mô hình AI nào và có mất phí sử dụng ngay không?' : 'Which AI models are supported and is it free to start?',
      a: isVi
        ? 'Hỗ trợ đầy đủ Claude 4 / 3.7 Sonnet, GPT-4o / o3, Gemini 2.5 / 3.x và Ollama offline. Gói Community miễn phí trọn đời cho cá nhân, tặng kèm 30 ngày dùng thử Pro.'
        : 'Works with Claude 4 / 3.7 Sonnet, GPT-4o / o3, Gemini 2.5 / 3.x, and offline Ollama models. Community is free forever with a 30-day Pro trial.'
    },
    {
      q: isVi ? 'Làm sao các cộng sự học thói quen dự án mà không rò rỉ dữ liệu?' : 'How do companions learn project habits safely?',
      a: isVi
        ? 'Bộ não Neural Brain v3.0 chưng cất quy ước kiến trúc và bài học sửa lỗi ngay trên máy bạn, giúp phiên làm việc sau kế thừa kinh nghiệm tức thì.'
        : 'Neural Brain v3.0 distills project rules and lessons locally on your device so future sessions inherit context cleanly.'
    }
  ];

  const technicalFaqs = [
    {
      q: isVi ? 'CoW Virtual Sandbox bảo vệ ổ cứng của tôi ra sao?' : 'How does the CoW Virtual Sandbox protect my disk?',
      a: isVi
        ? 'Mọi câu lệnh và chỉnh sửa nháp nằm trên vùng nhớ RAM ảo hóa; ổ cứng thật chỉ cập nhật khi bạn xác nhận phê duyệt.'
        : 'Draft edits and CLI runs stay in volatile Copy-on-Write RAM isolation until verified and accepted.'
    },
    {
      q: isVi ? 'Tầm nhìn Internet of Agents (IoA) & PiperNet hoạt động thế nào?' : 'What is the Internet of Agents (IoA) & PiperNet?',
      a: isVi
        ? 'PiperNet là giao thức ngang hàng giúp các đội Agent chia sẻ mẫu thiết kế trừu tượng an toàn mà không làm lộ mã nguồn thô.'
        : 'PiperNet is a peer-to-peer coordination layer for sharing abstract engineering patterns without exposing source code.'
    },
    {
      q: isVi ? 'Đối tác hoặc quỹ đầu tư muốn hợp tác R&D thì liên hệ ở đâu?' : 'How can R&D partners or investors reach the team?',
      a: isVi
        ? 'Quý đối tác có thể liên hệ trực tiếp I2FLabs qua email dev@aevum.ai.vn để nhận Pitch Deck và lịch trao đổi Private Beta.'
        : 'Connect directly with I2FLabs via dev@aevum.ai.vn for investor decks and Enterprise Private Beta inquiries.'
    }
  ];

  const visibleFaqs = showTechnicalFaqs ? [...coreFaqs, ...technicalFaqs] : coreFaqs;

  return (
    <section id="faq" className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Giải đáp nhanh<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">trước khi bắt đầu.</span>
                </>
              ) : (
                <>
                  Practical answers<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">before you start.</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal">
              {isVi
                ? 'Ngắn gọn, minh bạch để bạn an tâm đưa cộng sự AI vào công việc hàng ngày.'
                : 'Clear, transparent answers for bringing Aevum into your everyday workflow.'}
            </p>
          </div>

          {/* Right Column: Seamless Tonal FAQ Tiles (Zero Hard Line Dividers) */}
          <div className="lg:col-span-7 space-y-3 text-left">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 px-5 sm:px-6 py-4 transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between text-left min-h-[48px] font-sans font-medium text-base sm:text-lg text-white [html[data-theme='light']_&]:text-slate-900 hover:text-slate-200 [html[data-theme='light']_&]:hover:text-black transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white [html[data-theme="light"]_&]:text-slate-900' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal animate-in fade-in duration-200 m-0">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTechnicalFaqs((prev) => !prev)}
                className="inline-flex items-center min-h-[44px] text-sm font-sans font-medium text-white hover:text-slate-200 [html[data-theme='light']_&]:text-slate-900 underline underline-offset-4 decoration-white/25 [html[data-theme='light']_&]:decoration-slate-300 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                {showTechnicalFaqs
                  ? (isVi ? 'Thu gọn câu hỏi kỹ thuật ↑' : 'Hide technical FAQs ↑')
                  : (isVi ? '+ Xem thêm 3 câu hỏi kỹ thuật & R&D ↓' : '+ 3 deeper technical & R&D FAQs ↓')}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;

