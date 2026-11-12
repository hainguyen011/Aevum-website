import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: isVi ? 'Tôi có cần đổi IDE hay công cụ đang quen dùng không?' : 'Do I need to abandon my existing IDE or tools?',
      a: isVi
        ? 'Hoàn toàn không. Aevum OS chạy ngầm như một daemon cục bộ qua giao thức Open MCP. Bạn cứ viết code trên Cursor, Claude Code hay VS Code như bình thường; Aevum sẽ là bộ não trung tâm đứng sau hỗ trợ.'
        : 'Not at all. Aevum OS operates as a decoupled local daemon via the Open MCP protocol. You keep coding in Cursor, Claude Code, or VS Code while sharing one central brain.'
    },
    {
      q: isVi ? 'CoW Virtual Sandbox bảo vệ đĩa cứng của tôi ra sao?' : 'How does the CoW Virtual Sandbox protect my host disk?',
      a: isVi
        ? 'Mọi câu lệnh CLI và thao tác sửa file của AI ban đầu chỉ chạy trên bộ nhớ RAM ảo hóa. Mã chỉ được ghi vào ổ cứng thật khi vượt qua các rà soát an toàn và nhận được sự đồng ý từ bạn.'
        : 'All CLI commands and file edits run in a volatile Copy-on-Write RAM partition. Your host disk is only touched after passing Zero-Trust boundary audits and user verification.'
    },
    {
      q: isVi ? 'Aevum hỗ trợ những mô hình AI và công cụ nào?' : 'What models and CLI agents does Aevum support?',
      a: isVi
        ? 'Hệ thống tích hợp mượt mà với Claude 3.5/3.7 Sonnet, GPT-4o, Gemini 2.0 Flash/Pro cùng các công cụ quen thuộc như Antigravity, Claude Code và Cursor.'
        : 'Fully supports Claude 3.5/3.7 Sonnet, GPT-4o, Gemini 2.0 Flash/Pro, and local CLI engines (Antigravity, Cursor, Claude Code) via the Hermes synthesizer.'
    },
    {
      q: isVi ? 'Mã nguồn và dữ liệu của tôi có bị tải lên đám mây không?' : 'Is my code or private context sent to third-party clouds?',
      a: isVi
        ? 'Tuyệt đối không. Aevum OS được thiết kế theo triết lý Local-First: toàn bộ đồ thị tri thức, phân vùng thử nghiệm và lịch sử tác vụ đều nằm trọn vẹn trên ổ cứng máy bạn.'
        : 'Never. Aevum OS operates 100% Local-First. Your living memory graphs, sandbox state, and agent transcripts remain stored exclusively on your local machine.'
    },
    {
      q: isVi ? 'Các cộng sự số học hỏi và tiến hóa như thế nào?' : 'How do digital companions learn without leaking code?',
      a: isVi
        ? 'Sau mỗi tác vụ hoàn thành, hệ thống tự động đúc kết các bài học, quy chuẩn thiết kế và cách giải quyết lỗi vào bộ nhớ cục bộ, giúp cộng sự ngày càng hiểu dự án của bạn hơn.'
        : 'After every completed task, abstract architectural patterns and lessons are harvested locally, allowing companions to continuously adapt without leaking raw proprietary code.'
    },
    {
      q: isVi ? 'Tầm nhìn Internet of Agents (IoA) là gì và Aevum đóng vai trò gì?' : 'What is the Internet of Agents (IoA) vision?',
      a: isVi
        ? 'IoA là mạng lưới phân tán nơi hàng triệu AI Agent tự do đàm phán, trao đổi kỹ năng và phối hợp giải quyết công việc xuyên tổ chức. Aevum OS là hệ điều hành cục bộ và giao thức PiperNet làm nền móng hạ tầng cho mạng lưới này.'
        : 'IoA is a decentralized mesh where autonomous agents negotiate, trade skills, and coordinate work across organizations. Aevum OS acts as the local-first OS runtime and foundational PiperNet protocol.'
    },
    {
      q: isVi ? 'Nhà đầu tư hoặc đối tác muốn hợp tác R&D thì liên hệ ra sao?' : 'How can investors or partners collaborate on R&D?',
      a: isVi
        ? 'I2FLabs sẵn sàng chia sẻ Pitch Deck, mô hình tài chính Unit Economics và mở cổng trải nghiệm Private Beta. Đối tác có thể gửi thư trực tiếp tới contact@i2flabs.com để kết nối.'
        : 'I2FLabs welcomes venture capital inquiries, offering our Pitch Deck, unit economics models, and private beta access via contact@i2flabs.com.'
    }
  ];

  return (
    <section id="faq" className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80">
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
                ? 'Giải đáp ngắn gọn, minh bạch để bạn yên tâm đưa Aevum vào công việc hàng ngày.'
                : 'Clear, transparent answers so you can confidently bring Aevum into your daily workflow.'}
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

