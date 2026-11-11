import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: isVi ? 'Tôi có cần từ bỏ IDE hiện tại đang dùng không?' : 'Do I need to abandon my existing IDE or tools?',
      a: isVi
        ? 'Hoàn toàn không. Aevum OS hoạt động như một tầng daemon nền thông qua giao thức Open MCP. Bạn tiếp tục code trên Cursor, Claude Code hay VS Code và kết nối về chung một bộ não.'
        : 'Not at all. Aevum OS operates as a decoupled local daemon via the Open MCP protocol. You keep coding in Cursor, Claude Code, or VS Code while sharing one central brain.'
    },
    {
      q: isVi ? 'CoW Virtual Sandbox bảo vệ đĩa cứng của tôi như thế nào?' : 'How does the CoW Virtual Sandbox protect my host disk?',
      a: isVi
        ? 'Mọi lệnh CLI và thao tác sửa file diễn ra trong một phân vùng RAM Copy-on-Write ảo hóa. Đĩa cứng chủ chỉ được ghi khi vượt qua kiểm tra ranh giới Zero-Trust và được bạn phê duyệt.'
        : 'All CLI commands and file edits run in a volatile Copy-on-Write RAM partition. Your host disk is only touched after passing Zero-Trust boundary audits and user verification.'
    },
    {
      q: isVi ? 'Aevum hỗ trợ những mô hình AI và CLI nào?' : 'What models and CLI agents does Aevum support?',
      a: isVi
        ? 'Hỗ trợ toàn diện Claude 3.5/3.7 Sonnet, GPT-4o, Gemini 2.0 Flash/Pro và các công cụ CLI cục bộ (Antigravity, Cursor, Claude Code) qua nhân Hermes thông minh.'
        : 'Fully supports Claude 3.5/3.7 Sonnet, GPT-4o, Gemini 2.0 Flash/Pro, and local CLI engines (Antigravity, Cursor, Claude Code) via the Hermes synthesizer.'
    },
    {
      q: isVi ? 'Mã nguồn của tôi có bị gửi lên đám mây không?' : 'Is my code or private context sent to third-party clouds?',
      a: isVi
        ? 'Tuyệt đối không. Aevum OS vận hành 100% Local-First. Toàn bộ đồ thị tri thức, phân vùng sandbox và lịch sử phiên làm việc được lưu trên ổ cứng nội bộ của bạn.'
        : 'Never. Aevum OS operates 100% Local-First. Your living memory graphs, sandbox state, and agent transcripts remain stored exclusively on your local machine.'
    },
    {
      q: isVi ? 'PiperNet chia sẻ tri thức như thế nào mà không rò rỉ mã?' : 'How does PiperNet share knowledge without leaking code?',
      a: isVi
        ? 'PiperNet chỉ phát sóng các mẫu thiết kế kiến trúc trừu tượng (như quy chuẩn JWT rotation, sơ đồ phân tầng O-DDD) sau khi đã khử toàn bộ chi tiết mã nguồn thô của dự án.'
        : 'PiperNet only broadcasts abstract architectural patterns (like token rotation rituals and O-DDD schemas) after strictly scrubbing all proprietary source code.'
    }
  ];

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Một số câu hỏi<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">thực tế thường gặp.</span>
                </>
              ) : (
                <>
                  A few practical<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">answers.</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Tìm hiểu cách Aevum OS mang lại sự an toàn và giải phóng năng suất cho bạn.'
                : 'Learn how Aevum OS protects your sovereignty while unleashing autonomous swarms.'}
            </p>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:col-span-7 space-y-4 text-left lg:pl-8">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-white/10 [html[data-theme='light']_&]:border-slate-200 pb-5"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between text-left py-2 font-sans font-medium text-base sm:text-lg text-white [html[data-theme='light']_&]:text-slate-900 hover:text-slate-200 [html[data-theme='light']_&]:hover:text-black transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white [html[data-theme="light"]_&]:text-slate-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;

