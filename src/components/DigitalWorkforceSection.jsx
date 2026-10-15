import React, { useState } from 'react';

export const DigitalWorkforceSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [activeTab, setActiveTab] = useState('painpoints'); // 'painpoints' | 'matrix'

  // Nội dung 3 điểm đau thực tế - diễn đạt gần gũi, trực quan, không từ ngữ học thuật
  const painPoints = [
    {
      num: "01",
      tag: isVi ? "GHI NHỚ DÀI HẠN" : "LONG-TERM MEMORY",
      title: isVi ? "Chatbot Thường Rất Hay Quên Mã Nguồn" : "Standard Chatbots Forget Your Codebase Context",
      problem: isVi
        ? "Dùng ChatGPT hay Claude thông thường, chỉ sau vài cuộc trò chuyện là bot bắt đầu quên quy tắc kiến trúc ban đầu, dẫn đến việc sinh code sai lệch và xung đột hệ thống."
        : "Standard chat models lose earlier rules after a few prompts, generating conflicting code that breaks your existing codebase.",
      solution: isVi
        ? "Nhân sự số Aevum có bộ nhớ dài hạn: ghi nhớ toàn bộ mã nguồn và quy chuẩn dự án, không bao giờ quên dù dự án kéo dài nhiều tháng hay nhiều năm."
        : "Aevum digital teammates have dedicated long-term memory: continuously retaining your architecture rules and project context without amnesia."
    },
    {
      num: "02",
      tag: isVi ? "TUYỂN DỤNG LINH HOẠT" : "ON-DEMAND RECRUITMENT",
      title: isVi ? "Không Còn Phải Tự Ôm Đồm Mọi Việc" : "Never Get Overloaded Building Alone",
      problem: isVi
        ? "Khi xây dựng sản phẩm, bạn phải tự gánh vác quá nhiều khâu: vừa viết code, vừa thiết kế, vừa tìm lỗi, vừa viết tài liệu. Làm một mình rất dễ kiệt sức và chậm tiến độ."
        : "Juggling development, system design, QA testing, and documentation alone drains your energy and stalls product velocity.",
      solution: isVi
        ? "Khởi đầu với 1 nhân sự số đồng hành. Khi khối lượng việc tăng, bạn chỉ cần nhờ bạn ấy 'tuyển dụng' thêm đồng nghiệp mới, hoặc tự tạo nhân sự chuyên sâu cho bất kỳ lĩnh vực nào."
        : "Start with 1 digital companion. As work grows, simply ask them to 'recruit' new digital teammates, or create custom specialized agents for any domain."
    },
    {
      num: "03",
      tag: isVi ? "TỐI ƯU CHI PHÍ" : "ZERO HIRING OVERHEAD",
      title: isVi ? "Tuyển Dụng Đội Ngũ Ngoài Đời Quá Tốn Kém" : "Hiring Traditional Teams Is Prohibitive",
      problem: isVi
        ? "Tuyển thêm lập trình viên hay chuyên gia tốn hàng chục đến hàng trăm triệu mỗi tháng, mất hàng tuần phỏng vấn và tốn công quản lý phức tạp."
        : "Recruiting full-time senior engineers takes tens of thousands monthly, weeks of interviews, and heavy management overhead.",
      solution: isVi
        ? "Xây dựng phòng kỹ thuật số làm việc 24/7 trực tiếp trên máy của bạn: sẵn sàng nhận việc ngay lập tức, tiết kiệm chi phí tối đa, nâng cao hiệu suất gấp nhiều lần."
        : "Deploy your dedicated digital workforce 24/7 right on your computer: ready to work instantly, zero hiring friction, multiplying your output."
    }
  ];

  // Bảng so sánh trực diện - từ ngữ rõ ràng, dễ hiểu
  const comparisonRows = [
    {
      criteria: isVi ? "Khả năng ghi nhớ" : "Memory & Continuity",
      traditional: isVi 
        ? "Quên sạch sau mỗi phiên chat; người dùng phải liên tục copy-paste và giải thích lại từ đầu" 
        : "Loses context after each session; user must constantly re-explain guidelines from scratch",
      aevum: isVi 
        ? "Ghi nhớ bền vững toàn bộ dự án; luôn hiểu sâu kiến trúc mã nguồn mà không cần nhắc lại" 
        : "Permanent long-term memory; intuitively understands your entire codebase without prompt stuffing"
    },
    {
      criteria: isVi ? "Đội ngũ & Mở rộng" : "Team & Flexibility",
      traditional: isVi 
        ? "Chỉ là một khung chat đơn lẻ trả lời chung chung, không có sự phân vai chuyên môn" 
        : "A single generic chat window answering broadly without role specialization",
      aevum: isVi 
        ? "Có sẵn 1 bạn đồng hành; dễ dàng nhờ 'tuyển dụng' thêm đồng nghiệp mới hoặc tự tạo nhân sự riêng cho từng việc" 
        : "Start with 1 companion; recruit specialized digital teammates on demand or build custom personas"
    },
    {
      criteria: isVi ? "Cách thức làm việc" : "Collaboration Style",
      traditional: isVi 
        ? "Bị động: Người dùng phải tự nghĩ câu lệnh prompt, tự copy ghép từng đoạn code thủ công" 
        : "Passive: User must craft prompts, copy-paste snippets, and manually assemble pieces",
      aevum: isVi 
        ? "Chủ động phối hợp: Các nhân sự số tự trao đổi, tự lập kế hoạch bài bản và cùng bạn giải quyết trọn vẹn" 
        : "Autonomous coordination: Digital teammates discuss, formulate clear plans, and execute alongside you"
    },
    {
      criteria: isVi ? "Bảo mật & Dữ liệu" : "Data Privacy & Control",
      traditional: isVi 
        ? "Mã nguồn và ý tưởng bị tải lên máy chủ tập trung của bên thứ ba, nguy cơ lộ lọt dữ liệu" 
        : "Code and confidential ideas uploaded to third-party centralized servers",
      aevum: isVi 
        ? "Chạy an toàn trực tiếp trên máy tính của bạn; 100% mã nguồn và tài liệu thuộc về bạn" 
        : "Runs securely on your local computer; 100% of your source code and data remain sovereign"
    }
  ];

  return (
    <section id="digital-workforce" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80 font-sans">
      
      {/* ── Section Header (Chuẩn padding & container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12) ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12 sm:mb-16">
        <span className="text-[12px] leading-[16px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 tracking-[0.6px] uppercase block mb-3">
          {isVi ? "TẠI SAO BẠN CẦN AEVUM OS" : "WHY AEVUM OS"}
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[-0.02em] font-sans">
          {isVi ? (
            <>
              Từ <span className="text-slate-500 line-through mr-2">Chatbot Đơn Lẻ</span> Đến{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-white bg-clip-text text-transparent [html[data-theme='light']_&]:from-cyan-600 [html[data-theme='light']_&]:via-cyan-700 [html[data-theme='light']_&]:to-slate-900">
                Nhân Sự Số Thông Minh
              </span>
            </>
          ) : (
            <>
              Beyond <span className="text-slate-500 line-through mr-2">Isolated Chatbots</span> To{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-white bg-clip-text text-transparent [html[data-theme='light']_&]:from-cyan-600 [html[data-theme='light']_&]:via-cyan-700 [html[data-theme='light']_&]:to-slate-900">
                Smart Digital Teammates
              </span>
            </>
          )}
        </h2>

        <p className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 max-w-2xl mx-auto text-[16px] leading-relaxed mt-4 font-normal font-sans">
          {isVi 
            ? "Giải quyết triệt để 3 vấn đề lớn nhất khi làm sản phẩm: Hay quên mã nguồn, một mình quá tải công việc, và chi phí thuê người ngoài đời quá đắt đỏ."
            : "Solving the 3 critical hurdles of modern builders: Forgetful AI models, solo burnout, and prohibitive recruitment overhead."}
        </p>

        {/* Tab Toggle Switch (Bám sát thiết kế hình 1 / SubNavTabs rounded-full) */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center p-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200/70 border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 text-[13px] font-sans">
            <button
              type="button"
              onClick={() => setActiveTab('painpoints')}
              className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer font-medium font-sans ${
                activeTab === 'painpoints'
                  ? 'bg-white text-black [html[data-theme="light"]_&]:bg-white [html[data-theme="light"]_&]:text-slate-900 [html[data-theme="light"]_&]:shadow-sm'
                  : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
              }`}
            >
              {isVi ? "Vấn đề" : "Problems"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer font-medium font-sans ${
                activeTab === 'matrix'
                  ? 'bg-white text-black [html[data-theme="light"]_&]:bg-white [html[data-theme="light"]_&]:text-slate-900 [html[data-theme="light"]_&]:shadow-sm'
                  : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
              }`}
            >
              {isVi ? "So sánh" : "Comparison"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Section Content (Tuân thủ đúng chuẩn container padding max-w-7xl mx-auto px-6 sm:px-8 lg:px-12) ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── NỘI DUNG 1: 3 CỘT ĐIỂM ĐAU & LỜI GIẢI (TRANSPARENT MONOCHROME) ── */}
        {activeTab === 'painpoints' && (
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 [html[data-theme='light']_&]:border-slate-200/80 rounded-2xl overflow-hidden bg-transparent">
            {painPoints.map((item, index) => (
              <div
                key={index}
                className={`p-7 sm:p-9 space-y-5 bg-transparent hover:bg-white/[0.02] [html[data-theme='light']_&]:hover:bg-slate-50/50 transition-colors border-subtle-b md:border-subtle-b-0 ${
                  index < painPoints.length - 1 ? 'md:border-subtle-r [html[data-theme="light"]_&]:border-slate-200/80' : ''
                }`}
              >
                {/* Header Tag - 100% Google Sans Flex */}
                <div className="flex items-center justify-between border-subtle-b [html[data-theme='light']_&]:border-slate-200/80 pb-4">
                  <span className="text-[12px] leading-[16px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-[0.6px]">
                    {item.num} • {item.tag}
                  </span>
                  <span className="text-[12px] leading-[16px] font-sans font-medium text-slate-500 tracking-[0.6px]">
                    AEVUM OS
                  </span>
                </div>

                {/* Title - Exactly 20px / 28px line-height / Weight 600 in Google Sans Flex */}
                <h3 className="text-[20px] leading-[28px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-[-0.24px]">
                  {item.title}
                </h3>

                {/* Problem - 100% Google Sans Flex */}
                <div className="space-y-2 pt-1">
                  <span className="text-[12px] leading-[16px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 tracking-[0.6px] uppercase block">
                    {isVi ? "THỰC TRẠNG BẾ TẮC" : "THE BOTTLENECK"}
                  </span>
                  <p className="text-[16px] leading-[26px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-normal">
                    {item.problem}
                  </p>
                </div>

                {/* Solution - 100% Google Sans Flex */}
                <div className="space-y-2 pt-4 border-subtle-t [html[data-theme='light']_&]:border-slate-200/80">
                  <span className="text-[12px] leading-[16px] font-sans font-semibold text-slate-200 [html[data-theme='light']_&]:text-slate-800 tracking-[0.6px] uppercase block">
                    {isVi ? "LỜI GIẢI TỪ NHÂN SỰ SỐ" : "AEVUM SOLUTION"}
                  </span>
                  <p className="text-[16px] leading-[26px] text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-sans font-normal">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── NỘI DUNG 2: BẢNG SO SÁNH ĐỐI CHIẾU (TRANSPARENT MONOCHROME) ── */}
        {activeTab === 'matrix' && (
          <div className="w-full border border-white/10 [html[data-theme='light']_&]:border-slate-200/80 rounded-2xl overflow-hidden bg-transparent">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[720px]">
                {/* Table Header - 100% Google Sans Flex */}
                <div className="grid grid-cols-12 border-subtle-b [html[data-theme='light']_&]:border-slate-200/80 py-4 px-8 text-[12px] leading-[16px] font-sans uppercase tracking-[0.6px] bg-transparent">
                  <div className="col-span-3 text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-medium font-sans">
                    {isVi ? "TIÊU CHÍ" : "CRITERIA"}
                  </div>
                  <div className="col-span-4 text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-medium font-sans">
                    {isVi ? "CHATBOT AI THÔNG THƯỜNG" : "STANDARD CHATBOTS"}
                  </div>
                  <div className="col-span-5 text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-semibold font-sans">
                    {isVi ? "NHÂN SỰ SỐ AEVUM OS" : "AEVUM DIGITAL WORKFORCE"}
                  </div>
                </div>

                {/* Table Rows - 100% Google Sans Flex */}
                <div className="divide-y divide-[var(--border-subtle)] [html[data-theme='light']_&]:divide-slate-200/80">
                  {comparisonRows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 py-5 px-8 hover:bg-white/[0.02] [html[data-theme='light']_&]:hover:bg-slate-50/50 transition-colors items-start text-[15px] font-sans bg-transparent">
                      <div className="col-span-3 font-medium text-white [html[data-theme='light']_&]:text-slate-900 pr-4 font-sans">
                        {row.criteria}
                      </div>
                      <div className="col-span-4 text-slate-400 [html[data-theme='light']_&]:text-slate-600 pr-6 leading-relaxed font-normal font-sans">
                        {row.traditional}
                      </div>
                      <div className="col-span-5 text-slate-200 [html[data-theme='light']_&]:text-slate-800 leading-relaxed font-normal font-sans">
                        {row.aevum}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default DigitalWorkforceSection;
