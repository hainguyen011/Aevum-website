import React, { useState } from 'react';

export const DigitalWorkforceSection = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const [activeTab, setActiveTab] = useState('workers'); // 'workers' | 'business' | 'students'

  // Gạch chân siêu mỏng tinh tế (hairline gradient underline) trắng - xanh cyan cho lời giải
  const Highlight = ({ children }) => (
    <span className="font-medium text-slate-100 [html[data-theme='light']_&]:text-slate-900 highlight-hairline-cyan inline">
      {children}
    </span>
  );

  // Gạch chân siêu mỏng tinh tế (hairline gradient underline) đỏ linear cho các điểm đau thực trạng
  const HighlightPain = ({ children }) => (
    <span className="font-medium text-slate-200 [html[data-theme='light']_&]:text-slate-900 highlight-hairline-red inline">
      {children}
    </span>
  );

  // 1. NGƯỜI LAO ĐỘNG (Chuyên viên, Quản lý, Freelancer, Nhà sáng tạo, Người làm việc độc lập mọi ngành nghề)
  const workersPillars = [
    {
      num: "01",
      tag: isVi ? "MỞ RỘNG NĂNG LỰC" : "CROSS-DOMAIN MASTERY",
      title: isVi ? "Giỏi Lĩnh Vực Này Nhưng Bỡ Ngỡ Với Lĩnh Vực Khác" : "Expert in Your Field, Stranded in Others",
      problem: isVi ? (
        <>
          Khi công việc đòi hỏi sang mảng khác (tài chính, pháp lý, kỹ thuật, marketing), bạn dễ <HighlightPain>bỡ ngỡ, mất nhiều ngày mò mẫm</HighlightPain> và <HighlightPain>không biết cách ứng dụng thực tế</HighlightPain>.
        </>
      ) : (
        <>
          When work demands skills outside your zone (finance, legal, tech, marketing), you feel <HighlightPain>stranded, wasting days searching</HighlightPain> and <HighlightPain>struggling to apply them in practice</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số kết nối bạn với chuyên gia AI đa lĩnh vực: kiên nhẫn giải thích từ gốc rễ, giúp bạn <Highlight>từ không biết</Highlight> trở nên <Highlight>tự tin giao tiếp, hiểu sâu và áp dụng chuẩn xác</Highlight> vào công việc.
        </>
      ) : (
        <>
          Digital companions connect you to cross-domain AI specialists: breaking down complexity so you go <Highlight>from zero familiarity</Highlight> to <Highlight>confidently communicating, understanding, and applying skills</Highlight>.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "GHI NHỚ & THẤU HIỂU" : "PERSISTENT CONTEXT",
      title: isVi ? "Mỗi Lần Chat Lại Phải Giải Thích Lại Từ Đầu" : "Tired of Retyping Context Every Session",
      problem: isVi ? (
        <>
          Dùng AI thông thường, mỗi ngày là một phiên chat xa lạ: AI <HighlightPain>không nhớ phong cách, không lưu bối cảnh dự án</HighlightPain>, khiến bạn <HighlightPain>mất thời gian gõ lại lời nhắc lặp đi lặp lại</HighlightPain>.
        </>
      ) : (
        <>
          Generic chatbots reset every session. They <HighlightPain>forget your work style and project history</HighlightPain>, forcing you to <HighlightPain>waste time endlessly retyping prompts</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số có bộ nhớ dài hạn: <Highlight>ghi nhớ sâu thói quen, tài liệu và quy chuẩn</Highlight>, tự động nối mạch làm việc <Highlight>mà không cần bạn phải giải thích lại</Highlight>.
        </>
      ) : (
        <>
          Aevum companions retain durable memory: <Highlight>remembering your habits, documents, and style</Highlight>, picking up right where you left off <Highlight>without repetitive reminders</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "SAN SẺ GÁNH NẶNG" : "ON-DEMAND TEAMWORK",
      title: isVi ? "Một Mình Xoay Xở Ôm Đồm Quá Nhiều Đầu Việc" : "Exhausted Juggling Too Many Roles Alone",
      problem: isVi ? (
        <>
          Tự gánh vác mọi khâu từ tìm kiếm, xử lý số liệu đến soạn thảo khiến bạn <HighlightPain>dễ kiệt sức, phân tâm</HighlightPain> và <HighlightPain>trì trệ tiến độ công việc chung</HighlightPain>.
        </>
      ) : (
        <>
          Handling research, data crunching, and drafting entirely alone <HighlightPain>drains your cognitive energy</HighlightPain> and <HighlightPain>delays critical deliverables</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Bắt đầu với 1 cộng sự số. Khi khối lượng việc lớn dần, bạn chỉ cần nhờ bạn ấy <Highlight>triệu tập thêm các AI chuyên môn khác</Highlight>, giúp <Highlight>san sẻ gánh nặng và giải quyết nhanh gấp 5 lần</Highlight>.
        </>
      ) : (
        <>
          Start with 1 companion. As work expands, ask them to <Highlight>assemble specialized AI collaborators</Highlight>, <Highlight>lifting your burden and shipping 5x faster</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "CỐ VẤN TRƯỞNG THÀNH" : "CAREER MENTORSHIP",
      title: isVi ? "Loay Hoay Việc Khó & Ngại Hỏi Vì Sợ Đánh Giá" : "Stuck on Hard Tasks & Hesitant to Ask",
      problem: isVi ? (
        <>
          Đứng trước nhiệm vụ mới hay tình huống phức tạp, bạn thường bế tắc nhưng <HighlightPain>ngại hỏi cấp trên vì sợ bị đánh giá</HighlightPain>, tạo ra <HighlightPain>áp lực và lo âu âm thầm</HighlightPain>.
        </>
      ) : (
        <>
          Facing unfamiliar challenges, you feel stuck yet <HighlightPain>hesitant to ask peers out of fear of judgment</HighlightPain>, causing <HighlightPain>silent stress and self-doubt</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Người cố vấn 24/7 không bao giờ phán xét: <Highlight>sẵn sàng bẻ nhỏ bài toán khó thành từng bước dễ hiểu</Highlight>, giúp bạn <Highlight>tự tin làm chủ vấn đề và vững vàng thăng tiến</Highlight>.
        </>
      ) : (
        <>
          A dedicated 24/7 mentor with zero judgment: <Highlight>breaking complex problems into clear actionable steps</Highlight>, empowering you to <Highlight>grow professionally with confidence</Highlight>.
        </>
      )
    }
  ];

  // 2. DOANH NGHIỆP (Doanh nghiệp vừa & nhỏ, Startup, Đội ngũ kỹ thuật)
  const businessPillars = [
    {
      num: "01",
      tag: isVi ? "BẢO MẬT & CHỦ QUYỀN" : "DATA PRIVACY & SOVEREIGNTY",
      title: isVi ? "Nỗi Lo Lộ Lọt Dữ Liệu & Bí Mật Kinh Doanh" : "Enterprise Data Leakage & IP Privacy Risks",
      problem: isVi ? (
        <>
          Nhân viên dán mã nguồn và báo cáo nội bộ lên AI đám mây công cộng, <HighlightPain>tiềm ẩn rủi ro lộ lọt bí mật thương mại</HighlightPain> và <HighlightPain>mất kiểm soát dữ liệu tổ chức</HighlightPain>.
        </>
      ) : (
        <>
          Employees pasting proprietary source code and documents into public cloud AI <HighlightPain>risks trade secret leaks</HighlightPain> and <HighlightPain>loss of enterprise data control</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Kiến trúc Local-First chạy nội bộ: <Highlight>toàn bộ dữ liệu được lưu trữ và mã hóa cục bộ 100%</Highlight>, bảo vệ bí mật kinh doanh với <Highlight>chủ quyền dữ liệu tuyệt đối</Highlight>.
        </>
      ) : (
        <>
          Local-First architecture runs on premise: <Highlight>all data remains 100% encrypted locally</Highlight>, strictly protecting corporate IP with <Highlight>complete data sovereignty</Highlight>.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "BẢO TỒN TRI THỨC" : "KNOWLEDGE PRESERVATION",
      title: isVi ? "Tri Thức Thất Lạc Khi Nhân Sự Nghỉ Việc" : "Knowledge Loss When Key Personnel Leave",
      problem: isVi ? (
        <>
          Mỗi khi nhân sự cốt cán rời đi, quy trình và kinh nghiệm quý báu mất theo; đào tạo người mới <HighlightPain>tốn nhiều tháng chuyển giao chắp vá</HighlightPain> và <HighlightPain>làm đình trệ mạch vận hành</HighlightPain>.
        </>
      ) : (
        <>
          When key members leave, institutional memory vanishes; onboarding new recruits <HighlightPain>takes months of fragmented handovers</HighlightPain> and <HighlightPain>stalls business momentum</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Aevum OS liên tục lưu trữ đồ thị tri thức: <Highlight>đóng gói kinh nghiệm và quy trình chuẩn (SOP)</Highlight> vào cộng sự số, giúp doanh nghiệp <Highlight>kế thừa tài sản tri thức trọn vẹn</Highlight>.
        </>
      ) : (
        <>
          Aevum OS captures enterprise knowledge graphs: <Highlight>crystallizing SOPs and proven patterns</Highlight> into digital companions, ensuring <Highlight>zero loss of organizational memory</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "PHỐI HỢP TỰ ĐỘNG" : "AUTONOMOUS COLLABORATION",
      title: isVi ? "Giao Tiếp Rời Rạc & Tiến Độ Bị Trì Trệ" : "Fragmented Silos & Delayed Roadmaps",
      problem: isVi ? (
        <>
          Thông tin nghẽn giữa các phòng ban trao đổi rời rạc khiến <HighlightPain>sản phẩm liên tục trễ hạn ra mắt</HighlightPain> và <HighlightPain>tiêu tốn chi phí quản lý khổng lồ</HighlightPain>.
        </>
      ) : (
        <>
          Information bottlenecks across fragmented tools cause <HighlightPain>repeated release delays</HighlightPain> and <HighlightPain>bloated coordination costs</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Biệt đội cộng sự số tự động phối hợp qua giao thức riêng, <Highlight>kết nối nhịp nhàng giữa kỹ thuật, vận hành và phân tích</Highlight>, giúp dự án <Highlight>về đích nhanh gấp nhiều lần</Highlight>.
        </>
      ) : (
        <>
          Autonomous digital squads coordinate via internal protocols, <Highlight>seamlessly aligning engineering, ops, and analytics</Highlight> to <Highlight>ship deliverables 5x faster</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "TIẾP SỨC ĐỘI NGŨ" : "TALENT MULTIPLICATION",
      title: isVi ? "Nhân Lực Giỏi Bị Quá Tải Bởi Việc Lặp Lại" : "Top Talent Overloaded With Repetitive Chores",
      problem: isVi ? (
        <>
          Chuyên gia giỏi bị cuốn vào việc lặp lại, thủ tục giấy tờ và báo cáo định kỳ, <HighlightPain>không còn năng lượng cho sáng tạo</HighlightPain> và <HighlightPain>dễ dẫn đến kiệt sức, rời đi</HighlightPain>.
        </>
      ) : (
        <>
          High performers get bogged down by administrative boilerplate and audits, <HighlightPain>draining creative energy</HighlightPain> and <HighlightPain>sparking employee burnout</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số đảm nhiệm toàn bộ tác vụ lặp lại, <Highlight>giải phóng nhân lực giỏi</Highlight> để họ toàn tâm <Highlight>tập trung vào chiến lược cốt lõi và giá trị khác biệt</Highlight>.
        </>
      ) : (
        <>
          Digital companions absorb repetitive chores, <Highlight>unshackling top talent</Highlight> to focus fully on <Highlight>core strategic innovations and competitive moat</Highlight>.
        </>
      )
    }
  ];

  // 3. HỌC SINH / SINH VIÊN (Học sinh, Sinh viên, Người tự học, Nghiên cứu sinh)
  const studentsPillars = [
    {
      num: "01",
      tag: isVi ? "TƯ DUY NGHIÊN CỨU" : "AUTONOMOUS RESEARCH",
      title: isVi ? "Muốn Khám Phá Thế Giới Nhưng Bị Động Trong Sách Vở" : "Curious to Explore, Yet Trapped in Rote Books",
      problem: isVi ? (
        <>
          Quanh quẩn trong giáo trình khiến bạn <HighlightPain>thiếu tư duy nghiên cứu khoa học</HighlightPain>, lúng túng trước tài liệu quốc tế và <HighlightPain>thụ động tiếp nhận kiến thức một chiều</HighlightPain>.
        </>
      ) : (
        <>
          Confined to rote textbooks, students <HighlightPain>lack scientific research methodology</HighlightPain> and <HighlightPain>passively absorb one-way facts</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số khơi mở tư duy nghiên cứu độc lập: <Highlight>cùng bạn đào sâu bản chất đa nguồn</Highlight>, giúp bạn <Highlight>chủ động khám phá thế giới ngay trên màn hình nhỏ</Highlight>.
        </>
      ) : (
        <>
          Ignites independent scientific inquiry: <Highlight>synthesizing multi-source knowledge</Highlight> to help you <Highlight>actively explore the world right from your screen</Highlight>.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "ĐỒ ÁN & KHÓA LUẬN" : "CAPSTONE & THESIS",
      title: isVi ? "Làm Đồ Án Lớn Thiếu Người Dẫn Dắt & Cố Vấn" : "Struggling With Major Projects Alone",
      problem: isVi ? (
        <>
          Khi làm đồ án, nghiên cứu hay khóa luận, sinh viên <HighlightPain>dễ lạc lối giữa biển tài liệu</HighlightPain> và <HighlightPain>mắc kẹt khi sửa lỗi mã nguồn hoặc viết đề cương</HighlightPain>.
        </>
      ) : (
        <>
          Embarking on theses or capstones alone, students <HighlightPain>get overwhelmed by literature</HighlightPain> and <HighlightPain>stuck debugging outlines and architectures</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số cùng bạn lên kế hoạch bài bản: <Highlight>hướng dẫn từ đề cương đến phản biện</Highlight>, hỗ trợ debug và <Highlight>rèn luyện tác phong chuẩn chỉ như đi làm thực tế</Highlight>.
        </>
      ) : (
        <>
          Digital research mentors guide you step-by-step: <Highlight>from proposal to defense rehearsals</Highlight>, instilling <Highlight>industry-grade rigor and problem-solving</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "HỌC TẬP CÁ NHÂN HÓA" : "ADAPTIVE LEARNING",
      title: isVi ? "Giáo Trình Đại Trà Không Hợp Nhịp Độ Riêng" : "Rigid One-Size-Fits-All Curricula",
      problem: isVi ? (
        <>
          Mỗi người có nhịp độ tiếp thu riêng. Cách học chung rập khuôn khiến bạn <HighlightPain>dễ bị ngộp khi theo không kịp lớp</HighlightPain> hoặc <HighlightPain>mất dần hứng thú khám phá</HighlightPain>.
        </>
      ) : (
        <>
          Fixed classroom pacing forces uniform speeds, leaving students <HighlightPain>falling behind prerequisites</HighlightPain> or <HighlightPain>losing joy in self-directed curiosity</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số thích ứng theo tốc độ của bạn, <Highlight>biến lý thuyết khô khan thành bài thực hành sinh động</Highlight>, giúp bạn <Highlight>học sâu hiểu kỹ và duy trì đam mê</Highlight>.
        </>
      ) : (
        <>
          Adapts dynamically to your personal tempo: <Highlight>transforming dry theory into hands-on simulations</Highlight>, cultivating <Highlight>deep mastery and lifelong passion</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "TRI KỶ HỌC TẬP" : "COGNITIVE COMPANION",
      title: isVi ? "Tự Học Cô Đơn, Mau Quên Vì Thiếu Người Cùng Tư Duy" : "Lonely Learning: Forgetting Fast Without Dialogue",
      problem: isVi ? (
        <>
          Tự học một mình rất <HighlightPain>dễ nản và cô đơn</HighlightPain>. Dùng AI làm bài hộ chỉ khiến học vẹt, <HighlightPain>học trước quên sau và không rèn được tư duy phản biện</HighlightPain>.
        </>
      ) : (
        <>
          Self-study brings <HighlightPain>isolation and burnout</HighlightPain>. Relying on AI shortcuts creates <HighlightPain>passive rote memory and zero critical reasoning</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Người bạn tri kỷ đồng hành: <Highlight>tuyệt đối không giải hộ để ỷ lại</Highlight>, mà kiên nhẫn gợi mở đa chiều, giúp bạn <Highlight>vừa học, vừa nhớ sâu, vừa khai phóng tư duy sắc bén</Highlight>.
        </>
      ) : (
        <>
          An intellectual study partner: <Highlight>never spoon-feeding lazy answers</Highlight>, but asking thought-provoking questions to help you <Highlight>retain deeply and think critically</Highlight>.
        </>
      )
    }
  ];

  // Danh sách các tabs đối tượng với nhãn ngắn gọn trên Mobile
  const tabs = [
    { 
      id: 'workers', 
      label: isVi ? 'Người lao động' : 'Professionals',
      shortLabel: isVi ? 'Người lao động' : 'Pros'
    },
    { 
      id: 'business', 
      label: isVi ? 'Doanh nghiệp' : 'Enterprises',
      shortLabel: isVi ? 'Doanh nghiệp' : 'Business'
    },
    { 
      id: 'students', 
      label: isVi ? 'Học sinh / Sinh viên' : 'Students & Learners',
      shortLabel: isVi ? 'Học sinh / SV' : 'Students'
    },
  ];

  const currentPillars = {
    workers: workersPillars,
    business: businessPillars,
    students: studentsPillars,
  }[activeTab] || workersPillars;

  return (
    <section id="digital-workforce" className="relative w-full py-12 sm:py-20 lg:py-24 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80 font-sans">
      
      {/* ── Section Header (Mở rộng container thoáng đãng max-w-[1440px]) ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-center mb-8 sm:mb-14">
        <span className="text-[11px] sm:text-[13px] font-sans font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-widest uppercase block mb-2 sm:mb-3">
          {isVi ? "TẠI SAO BẠN CẦN AEVUM OS" : "WHY AEVUM OS"}
        </span>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[-0.02em] font-sans">
          {isVi ? (
            <>
              Từ <span className="text-slate-500 line-through mr-1.5 sm:mr-2">Chatbot Đơn Lẻ</span> Đến{' '}
              <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 [html[data-theme='light']_&]:from-slate-950 [html[data-theme='light']_&]:via-sky-900 [html[data-theme='light']_&]:to-cyan-700 bg-clip-text text-transparent">
                Cộng Sự Số Thông Minh
              </span>
            </>
          ) : (
            <>
              Beyond <span className="text-slate-500 line-through mr-1.5 sm:mr-2">Isolated Chatbots</span> To{' '}
              <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 [html[data-theme='light']_&]:from-slate-950 [html[data-theme='light']_&]:via-sky-900 [html[data-theme='light']_&]:to-cyan-700 bg-clip-text text-transparent">
                Smart Digital Companions
              </span>
            </>
          )}
        </h2>

        <p className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 max-w-2xl mx-auto text-[13.5px] sm:text-[16px] leading-relaxed mt-3 sm:mt-4 font-normal font-sans px-2">
          {isVi 
            ? "Giải quyết triệt để các rào cản cốt lõi và khai phóng tiềm năng cho từng nhóm người dùng: Người lao động, Doanh nghiệp và Học sinh / Sinh viên."
            : "Solving core hurdles and unlocking full potential across dedicated personas: Professionals, Enterprises, and Students."}
        </p>

        {/* Tab Toggle Switch - Tối ưu chống tràn và không vỡ dòng trên Mobile */}
        <div className="flex justify-center mt-6 sm:mt-8 px-2 max-w-full overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200/70 border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 text-[12px] sm:text-[13px] font-sans shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer font-medium font-sans whitespace-nowrap text-xs sm:text-[13px] shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-white text-black [html[data-theme="light"]_&]:bg-white [html[data-theme="light"]_&]:text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
              >
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section Content (Container chuẩn 4 cột đều nhau max-w-[1440px]) ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 [html[data-theme='light']_&]:border-slate-200/80 rounded-2xl overflow-hidden bg-transparent">
          {currentPillars.map((item, index) => {
            const borderClasses = [
              index < 3 ? 'border-b border-white/10 [html[data-theme="light"]_&]:border-slate-200/80' : 'border-b-0',
              index < 2 ? 'md:border-b' : 'md:border-b-0',
              index % 2 === 0 ? 'md:border-r border-white/10 [html[data-theme="light"]_&]:border-slate-200/80' : 'md:border-r-0',
              index < 3 ? 'lg:border-r lg:border-b-0 border-white/10 [html[data-theme="light"]_&]:border-slate-200/80' : 'lg:border-r-0 lg:border-b-0'
            ].filter(Boolean).join(' ');

            return (
              <div
                key={index}
                className={`p-4 sm:p-6 lg:p-5.5 xl:p-7 flex flex-col justify-between space-y-4 sm:space-y-6 bg-transparent hover:bg-white/[0.015] [html[data-theme='light']_&]:hover:bg-slate-50/50 transition-colors ${borderClasses}`}
              >
                {/* Header Tag - Pure Typography */}
                <div>
                  <span className="text-[11px] sm:text-xs leading-[15px] sm:leading-[16px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-[0.6px] block">
                    {item.num} • {item.tag}
                  </span>
                </div>

                {/* Title - Mềm mại dịu mắt, không chói */}
                <h3 className="text-[16.5px] sm:text-[19px] lg:text-[18.5px] xl:text-[20px] leading-[23px] sm:leading-[28px] font-medium text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-sans tracking-[-0.2px]">
                  {item.title}
                </h3>

                {/* Problem - Subtle Muted Typography với gạch chân linear đỏ */}
                <div className="space-y-1 sm:space-y-1.5 flex-1">
                  <span className="text-[10.5px] sm:text-[11px] leading-[15px] sm:leading-[16px] font-sans font-medium text-slate-500 [html[data-theme='light']_&]:text-slate-400 tracking-[0.6px] uppercase block">
                    {isVi ? "THỰC TRẠNG BẾ TẮC" : "THE BOTTLENECK"}
                  </span>
                  <div className="text-[13.5px] sm:text-[15px] leading-[21px] sm:leading-[24px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-normal">
                    {item.problem}
                  </div>
                </div>

                {/* Solution - Pure Typography với highlight gạch chân linear cyan siêu mỏng */}
                <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                  <span className="text-[11.5px] sm:text-[12px] leading-[15px] sm:leading-[16px] font-sans font-semibold text-slate-400 [html[data-theme='light']_&]:text-slate-600 tracking-[0.6px] uppercase block">
                    {isVi ? "LỜI GIẢI TỪ CỘNG SỰ SỐ" : "AEVUM COMPANION SOLUTION"}
                  </span>
                  <div className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[27px] font-normal text-slate-300 [html[data-theme='light']_&]:text-slate-800 font-sans tracking-[-0.01em]">
                    {item.solution}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default DigitalWorkforceSection;
