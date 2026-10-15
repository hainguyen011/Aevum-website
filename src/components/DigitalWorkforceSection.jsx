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
      title: isVi ? "Giỏi Lĩnh Vực Này Nhưng Bỡ Ngỡ Với Lĩnh Vực Khác" : "Expert in Your Field, Yet Stranded in Others",
      problem: isVi ? (
        <>
          Bạn có thể rất giỏi chuyên môn của mình, nhưng khi công việc đòi hỏi sang mảng khác (như số liệu, tài chính, pháp lý, kỹ thuật hay tiếp thị), bạn <HighlightPain>hoàn toàn bỡ ngỡ, mất nhiều ngày tự mò mẫm</HighlightPain> và <HighlightPain>không biết cách ứng dụng vào thực tế</HighlightPain>.
        </>
      ) : (
        <>
          You may be deeply skilled in your domain, but when work demands cross-disciplinary capabilities (finance, legal, technical, or marketing), you feel <HighlightPain>completely stranded, wasting days searching</HighlightPain> and <HighlightPain>struggling to apply new concepts practically</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số kết nối bạn với các chuyên gia AI đa lĩnh vực: kiên nhẫn giải thích từ gốc rễ, giúp bạn <Highlight>từ chỗ hoàn toàn không biết</Highlight> có thể <Highlight>tự tin giao tiếp, thấu hiểu sâu sắc và áp dụng chuẩn xác</Highlight> ngay vào công việc thực tế.
        </>
      ) : (
        <>
          Digital companions connect you to cross-domain AI specialists: breaking down complexity so you go <Highlight>from zero familiarity</Highlight> to <Highlight>confidently communicating, deeply understanding, and applying skills</Highlight> directly to your work.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "GHI NHỚ & THẤU HIỂU" : "PERSISTENT CONTEXT",
      title: isVi ? "Mỗi Lần Chat Lại Phải Giải Thích Lại Từ Đầu" : "Tired of Retyping Context Every Single Morning",
      problem: isVi ? (
        <>
          Dùng ChatGPT thông thường, mỗi ngày là một phiên chat xa cách. AI <HighlightPain>không nhớ phong cách làm việc, không lưu bối cảnh dự án</HighlightPain>, khiến bạn <HighlightPain>mất thời gian sao chép và gõ lại lời nhắc lặp đi lặp lại</HighlightPain>.
        </>
      ) : (
        <>
          Generic chatbots reset every session. They <HighlightPain>forget your work style and project history</HighlightPain>, forcing you to <HighlightPain>waste time endlessly retyping prompts and context</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số Aevum có bộ nhớ dài hạn gắn liền với công việc của bạn: <Highlight>ghi nhớ từng thói quen, tài liệu và quy chuẩn</Highlight>, thấu hiểu những gì bạn đang theo đuổi để <Highlight>liền mạch tiếp sức mà không cần nhắc lại</Highlight>.
        </>
      ) : (
        <>
          Aevum companions hold durable long-term memory: <Highlight>remembering your habits, documents, and style</Highlight>, seamlessly picking up right where you left off <Highlight>without needing repetitive reminders</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "SAN SẺ GÁNH NẶNG" : "ON-DEMAND TEAMWORK",
      title: isVi ? "Một Mình Xoay Xở Ôm Đồm Quá Nhiều Đầu Việc" : "Exhausted Juggling Too Many Roles Alone",
      problem: isVi ? (
        <>
          Để hoàn thành một đầu việc lớn, bạn phải tự gánh vác đủ khâu: từ tìm kiếm tài liệu, xử lý số liệu, soạn thảo đến kiểm tra lỗi. Làm một mình <HighlightPain>rất dễ kiệt sức, phân tâm</HighlightPain> và <HighlightPain>trì trệ tiến độ chung</HighlightPain>.
        </>
      ) : (
        <>
          Delivering complete work forces you to wear too many hats: researching, data crunching, drafting, and quality-checking. Solo multitasking <HighlightPain>drains your energy</HighlightPain> and <HighlightPain>stalls key project milestones</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Khởi đầu với 1 cộng sự số. Khi khối lượng việc lớn dần, bạn chỉ cần nhờ bạn ấy <Highlight>‘triệu tập’ thêm các cộng sự chuyên môn khác</Highlight> cùng phối hợp, giúp bạn <Highlight>san sẻ gánh nặng và giải quyết công việc nhanh gấp 5 lần</Highlight>.
        </>
      ) : (
        <>
          Start with 1 digital companion. When tasks pile up, simply ask them to <Highlight>assemble specialized AI collaborators</Highlight> to work side-by-side, <Highlight>lifting your cognitive burden and shipping 5x faster</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "CỐ VẤN TRƯỞNG THÀNH" : "CAREER MENTORSHIP",
      title: isVi ? "Loay Hoay Trước Việc Khó & Ngại Hỏi Vì Sợ Đánh Giá" : "Struggling With Complex Tasks & Hesitant to Ask",
      problem: isVi ? (
        <>
          Khi nhận nhiệm vụ mới hoặc đối mặt tình huống phức tạp, bạn thường loay hoay không biết bắt đầu từ đâu, <HighlightPain>ngại hỏi cấp trên hay đồng nghiệp vì sợ bị đánh giá</HighlightPain>, dẫn đến <HighlightPain>áp lực âm thầm và dễ bế tắc</HighlightPain>.
        </>
      ) : (
        <>
          Tackling unfamiliar responsibilities leaves many feeling stuck, <HighlightPain>hesitant to ask teammates out of fear of judgment</HighlightPain>, creating <HighlightPain>silent anxiety and career imposter syndrome</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số là người cố vấn kiên nhẫn 24/7: không bao giờ phán xét, <Highlight>sẵn sàng bẻ nhỏ bài toán khó thành từng bước dễ hiểu</Highlight>, giúp bạn <Highlight>tự tin làm chủ vấn đề và vững vàng thăng tiến</Highlight> trong sự nghiệp.
        </>
      ) : (
        <>
          A dedicated 24/7 mentor with zero judgment: <Highlight>breaking down intimidating challenges into manageable steps</Highlight>, empowering you to <Highlight>master new challenges and grow professionally with confidence</Highlight>.
        </>
      )
    }
  ];

  // 2. DOANH NGHIỆP (Doanh nghiệp vừa & nhỏ, Startup, Đội ngũ kỹ thuật)
  const businessPillars = [
    {
      num: "01",
      tag: isVi ? "BẢO MẬT & CHỦ QUYỀN" : "SOVEREIGN DATA PRIVACY",
      title: isVi ? "Nỗi Lo Lộ Lọt Dữ Liệu & Bí Mật Kinh Doanh" : "Enterprise Data Leakage & IP Privacy Risks",
      problem: isVi ? (
        <>
          Nhân viên vô tình dán mã nguồn nội bộ, tài liệu kinh doanh và báo cáo tài chính lên các AI công cộng, <HighlightPain>tiềm ẩn rủi ro lộ lọt bí mật thương mại</HighlightPain> và <HighlightPain>mất hoàn toàn quyền kiểm soát dữ liệu</HighlightPain>.
        </>
      ) : (
        <>
          Employees pasting proprietary source code and financial metrics into public AI clouds <HighlightPain>triggers severe data leaks</HighlightPain> and <HighlightPain>causes complete loss of corporate data governance</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Kiến trúc Local-First chạy an toàn 100% trên hạ tầng nội bộ: <Highlight>toàn bộ dữ liệu được lưu trữ và mã hóa cục bộ</Highlight>, bảo vệ tài sản trí tuệ và đảm bảo <Highlight>chủ quyền dữ liệu tối thượng</Highlight>.
        </>
      ) : (
        <>
          Local-First architecture runs 100% on your internal machines: <Highlight>all context remains encrypted locally</Highlight>, strictly protecting corporate IP with <Highlight>complete data sovereignty</Highlight>.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "BẢO TỒN TRI THỨC" : "KNOWLEDGE PRESERVATION",
      title: isVi ? "Tri Thức Bị Thất Lạc Khi Nhân Sự Nghỉ Việc" : "Knowledge Loss When Senior Engineers Depart",
      problem: isVi ? (
        <>
          Mỗi khi nhân sự cốt cán chuyển công tác, quy trình và kinh nghiệm quý báu biến mất theo; việc đào tạo người mới <HighlightPain>mất hàng tháng chuyển giao chắp vá</HighlightPain> và <HighlightPain>làm đình trệ toàn bộ mạch vận hành</HighlightPain>.
        </>
      ) : (
        <>
          When senior engineers leave, institutional memory vanishes; onboarding new recruits <HighlightPain>takes months of painful handovers</HighlightPain> and <HighlightPain>stalls continuous business operations</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Aevum OS liên tục lưu trữ đồ thị tri thức tập trung: <Highlight>đóng gói kinh nghiệm và quy trình chuẩn</Highlight> vào cộng sự số, giúp doanh nghiệp <Highlight>kế thừa tài sản tri thức nguyên vẹn</Highlight> qua nhiều thế hệ.
        </>
      ) : (
        <>
          Aevum OS continuously preserves an enterprise knowledge graph: <Highlight>crystallizing SOPs and architecture patterns</Highlight> into digital companions, ensuring <Highlight>zero loss of institutional knowledge</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "PHỐI HỢP LIÊN PHÒNG BAN" : "AUTONOMOUS WORKFLOWS",
      title: isVi ? "Giao Tiếp Rời Rạc & Tiến Độ Bị Trì Trệ" : "Fragmented Silos & Delayed Product Roadmaps",
      problem: isVi ? (
        <>
          Các phòng ban trao đổi qua quá nhiều kênh rời rạc, thông tin bị nghẽn ở khâu trung gian khiến <HighlightPain>sản phẩm liên tục trễ hạn ra mắt</HighlightPain> và <HighlightPain>tiêu tốn chi phí quản lý khổng lồ</HighlightPain>.
        </>
      ) : (
        <>
          Departments collaborate across scattered silos where requirements get lost, causing <HighlightPain>repeated release delays</HighlightPain> and <HighlightPain>massive administrative overhead</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Đội ngũ cộng sự số tự động phối hợp qua giao thức chuyên biệt, <Highlight>kết nối nhịp nhàng giữa kỹ thuật, vận hành và phân tích</Highlight>, giúp dự án <Highlight>về đích nhanh hơn gấp nhiều lần</Highlight>.
        </>
      ) : (
        <>
          Digital squads collaborate autonomously across protocol meshes, <Highlight>synchronizing engineering, testing, and operations</Highlight> to <Highlight>ship roadmaps up to 5x faster</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "TIẾP SỨC ĐỘI NGŨ" : "TALENT MULTIPLICATION",
      title: isVi ? "Nhân Lực Giỏi Bị Quá Tải Bởi Việc Lặp Lại" : "Senior Talent Overburdened With Routine Chores",
      problem: isVi ? (
        <>
          Kỹ sư và chuyên gia giỏi bị cuốn vào các công việc lặp lại, thủ tục giấy tờ và báo cáo định kỳ, <HighlightPain>không còn năng lượng cho sáng tạo đột phá</HighlightPain> và <HighlightPain>dễ dẫn đến kiệt sức, rời bỏ tổ chức</HighlightPain>.
        </>
      ) : (
        <>
          Key engineers get bogged down by mundane boilerplate, audits, and routine paperwork, <HighlightPain>draining energy for breakthrough innovation</HighlightPain> and <HighlightPain>triggering burnout and attrition</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số nhận lãnh toàn bộ tác vụ thủ công tốn thời gian, <Highlight>tiếp sức cho nhân lực giỏi</Highlight> để họ toàn tâm <Highlight>tập trung vào chiến lược cốt lõi và giá trị khác biệt</Highlight> của doanh nghiệp.
        </>
      ) : (
        <>
          Digital companions absorb all repetitive chores, <Highlight>empowering top talent</Highlight> so your engineers can <Highlight>focus 100% on strategic innovation</Highlight> and competitive moat.
        </>
      )
    }
  ];

  // 3. HỌC SINH / SINH VIÊN (Học sinh, Sinh viên, Người tự học, Nghiên cứu sinh)
  const studentsPillars = [
    {
      num: "01",
      tag: isVi ? "TƯ DUY NGHIÊN CỨU" : "AUTONOMOUS RESEARCH",
      title: isVi ? "Muốn Khám Phá Thế Giới Nhưng Bị Động Trong Sách Vở" : "Curious to Explore the World, Yet Trapped in Rote Textbooks",
      problem: isVi ? (
        <>
          Khi việc học chỉ quanh quẩn thụ động trong sách giáo khoa, ngọn lửa tò mò khám phá dần nguội lạnh. Bạn <HighlightPain>chưa có tư duy nghiên cứu khoa học</HighlightPain>, lúng túng khi tiếp cận các nguồn tài liệu quốc tế và <HighlightPain>bị động tiếp nhận kiến thức một chiều</HighlightPain>.
        </>
      ) : (
        <>
          Confined to rote textbooks, natural curiosity fades. Learners often <HighlightPain>lack autonomous research methodology</HighlightPain>, feeling overwhelmed by global academic literature and <HighlightPain>trapped in passive one-way consumption</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số thắp lên tư duy nghiên cứu độc lập: cùng bạn đào sâu bản chất, tra cứu đa nguồn và bóc tách tài liệu học thuật phức tạp, giúp bạn <Highlight>chủ động khám phá cả thế giới tri thức bao la</Highlight> ngay <Highlight>trên chính chiếc màn hình nhỏ</Highlight> của mình.
        </>
      ) : (
        <>
          Your digital research companion nurtures autonomous scientific inquiry: synthesizing multi-source literature and digesting complex papers, empowering you to <Highlight>actively explore the vast world of knowledge</Highlight> right <Highlight>from your own small screen</Highlight>.
        </>
      )
    },
    {
      num: "02",
      tag: isVi ? "ĐỒ ÁN & KHÓA LUẬN" : "CAPSTONE & THESIS",
      title: isVi ? "Làm Đồ Án Lớn Thiếu Người Dẫn Dắt & Cố Vấn" : "Struggling With Complex Capstones Alone",
      problem: isVi ? (
        <>
          Khi làm đồ án môn học, nghiên cứu khoa học hay khóa luận tốt nghiệp, sinh viên thường bơ vơ không biết bắt đầu từ đâu, <HighlightPain>dễ lạc lối giữa biển tài liệu</HighlightPain> và <HighlightPain>mắc kẹt khi sửa lỗi mã nguồn hoặc viết đề cương</HighlightPain>.
        </>
      ) : (
        <>
          Embarking on thesis or capstone projects without hands-on coaching, students <HighlightPain>drown in research literature</HighlightPain> and <HighlightPain>get stuck debugging architecture bugs alone</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số cùng bạn lên kế hoạch nghiên cứu bài bản, <Highlight>hướng dẫn từng bước từ lập đề cương đến phản biện</Highlight>, hỗ trợ debug và <Highlight>rèn luyện tác phong chuẩn chỉ như đi làm thực tế</Highlight>.
        </>
      ) : (
        <>
          Digital research companions break projects into phased milestones, <Highlight>coaching you from outline to defense rehearsals</Highlight>, building <Highlight>industry-grade engineering rigor</Highlight>.
        </>
      )
    },
    {
      num: "03",
      tag: isVi ? "HỌC TẬP CÁ NHÂN HÓA" : "ADAPTIVE LEARNING PACE",
      title: isVi ? "Giáo Trình Đại Trà Không Hợp Nhịp Độ Riêng" : "Rigid One-Size-Fits-All Curricula",
      problem: isVi ? (
        <>
          Mỗi người có một tốc độ tiếp thu khác nhau, nhưng cách học chung rập khuôn khiến bạn <HighlightPain>dễ bị ngộp khi theo không kịp lớp</HighlightPain> hoặc <HighlightPain>mất dần niềm vui khám phá tri thức</HighlightPain>.
        </>
      ) : (
        <>
          Standard classroom paces force uniform learning speeds, leaving curious minds <HighlightPain>frustrated by missing prerequisites</HighlightPain> or <HighlightPain>losing joy in self-directed discovery</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số tự động thích ứng với phong cách và tốc độ học của bạn, <Highlight>biến lý thuyết khô khan thành bài thực hành thú vị</Highlight>, giúp bạn <Highlight>học sâu hiểu kỹ và đam mê lâu dài</Highlight>.
        </>
      ) : (
        <>
          Adapts dynamically to your natural learning tempo: <Highlight>converting dry theory into interactive hands-on experiments</Highlight>, nurturing <Highlight>deep mastery and lifelong curiosity</Highlight>.
        </>
      )
    },
    {
      num: "04",
      tag: isVi ? "TRI KỶ HỌC TẬP" : "COGNITIVE COMPANION",
      title: isVi ? "Tự Học Cô Đơn, Mau Quên Vì Thiếu Người Cùng Tư Duy" : "Lonely Learning: Forgetting Fast Without Socratic Dialogue",
      problem: isVi ? (
        <>
          Tự học một mình rất <HighlightPain>dễ cô đơn và nản chí</HighlightPain>. Dùng AI làm bài hộ chỉ khiến bạn học vẹt, <HighlightPain>học trước quên sau, não bộ thụ động và không rèn được tư duy độc lập</HighlightPain>.
        </>
      ) : (
        <>
          Studying in isolation easily leads to <HighlightPain>loneliness and premature burnout</HighlightPain>. Relying on AI shortcuts creates <HighlightPain>passive cramming, rapid forgetting, and zero critical thinking</HighlightPain>.
        </>
      ),
      solution: isVi ? (
        <>
          Cộng sự số là người bạn tri kỷ đồng hành: <Highlight>tuyệt đối không giải hộ để bạn ỷ lại</Highlight>, mà kiên nhẫn cùng bạn đàm đạo, gợi mở câu hỏi đa chiều, giúp bạn <Highlight>vừa học, vừa nhớ sâu, vừa khai phóng tư duy sắc bén mỗi ngày</Highlight>.
        </>
      ) : (
        <>
          A devoted intellectual soulmate: <Highlight>never spoon-feeding lazy answers</Highlight>, but engaging in patient Socratic dialogues to help you <Highlight>learn deeply, retain forever, and sharpen independent reasoning</Highlight>.
        </>
      )
    }
  ];

  // Danh sách các tabs đối tượng
  const tabs = [
    { id: 'workers', label: isVi ? 'Người lao động' : 'Professionals' },
    { id: 'business', label: isVi ? 'Doanh nghiệp' : 'Enterprises' },
    { id: 'students', label: isVi ? 'Học sinh / Sinh viên' : 'Students & Learners' },
  ];

  const currentPillars = {
    workers: workersPillars,
    business: businessPillars,
    students: studentsPillars,
  }[activeTab] || workersPillars;

  return (
    <section id="digital-workforce" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] border-subtle-b [html[data-theme='light']_&]:border-slate-200/80 font-sans">
      
      {/* ── Section Header (Mở rộng container thoáng đãng max-w-[1440px]) ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12 sm:mb-16">
        <span className="text-xs sm:text-[13px] font-sans font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-widest uppercase block mb-3">
          {isVi ? "TẠI SAO BẠN CẦN AEVUM OS" : "WHY AEVUM OS"}
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-[-0.02em] font-sans">
          {isVi ? (
            <>
              Từ <span className="text-slate-500 line-through mr-2">Chatbot Đơn Lẻ</span> Đến{' '}
              <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 [html[data-theme='light']_&]:from-slate-950 [html[data-theme='light']_&]:via-sky-900 [html[data-theme='light']_&]:to-cyan-700 bg-clip-text text-transparent">
                Cộng Sự Số Thông Minh
              </span>
            </>
          ) : (
            <>
              Beyond <span className="text-slate-500 line-through mr-2">Isolated Chatbots</span> To{' '}
              <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 [html[data-theme='light']_&]:from-slate-950 [html[data-theme='light']_&]:via-sky-900 [html[data-theme='light']_&]:to-cyan-700 bg-clip-text text-transparent">
                Smart Digital Companions
              </span>
            </>
          )}
        </h2>

        <p className="text-slate-300 [html[data-theme='light']_&]:text-slate-600 max-w-2xl mx-auto text-[15px] sm:text-[16px] leading-relaxed mt-4 font-normal font-sans">
          {isVi 
            ? "Giải quyết triệt để các rào cản cốt lõi và khai phóng tiềm năng cho từng nhóm người dùng: Người lao động, Doanh nghiệp và Học sinh / Sinh viên."
            : "Solving core hurdles and unlocking full potential across dedicated personas: Professionals, Enterprises, and Students."}
        </p>

        {/* Tab Toggle Switch (3 tabs đối tượng: Người lao động | Doanh nghiệp | Học sinh / Sinh viên) */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200/70 border border-white/10 [html[data-theme='light']_&]:border-slate-300/80 text-[13px] font-sans">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full transition-all duration-200 cursor-pointer font-medium font-sans whitespace-nowrap text-xs sm:text-[13px] ${
                  activeTab === tab.id
                    ? 'bg-white text-black [html[data-theme="light"]_&]:bg-white [html[data-theme="light"]_&]:text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:text-white [html[data-theme="light"]_&]:text-slate-600 [html[data-theme="light"]_&]:hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section Content (Container chuẩn 4 cột đều nhau max-w-[1440px]) ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
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
                className={`p-5 sm:p-6 lg:p-5.5 xl:p-7 flex flex-col justify-between space-y-6 bg-transparent hover:bg-white/[0.015] [html[data-theme='light']_&]:hover:bg-slate-50/50 transition-colors ${borderClasses}`}
              >
                {/* Header Tag - Pure Typography */}
                <div>
                  <span className="text-[11.5px] sm:text-xs leading-[16px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-[0.6px] block">
                    {item.num} • {item.tag}
                  </span>
                </div>

                {/* Title - Mềm mại dịu mắt, không chói */}
                <h3 className="text-[18px] sm:text-[19px] lg:text-[18.5px] xl:text-[20px] leading-[26px] sm:leading-[28px] font-medium text-slate-100 [html[data-theme='light']_&]:text-slate-900 font-sans tracking-[-0.24px]">
                  {item.title}
                </h3>

                {/* Problem - Subtle Muted Typography với gạch chân linear đỏ */}
                <div className="space-y-1.5 flex-1">
                  <span className="text-[11px] leading-[16px] font-sans font-medium text-slate-500 [html[data-theme='light']_&]:text-slate-400 tracking-[0.6px] uppercase block">
                    {isVi ? "THỰC TRẠNG BẾ TẮC" : "THE BOTTLENECK"}
                  </span>
                  <div className="text-[14px] sm:text-[15px] leading-[23px] sm:leading-[24px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-normal">
                    {item.problem}
                  </div>
                </div>

                {/* Solution - Pure Typography với highlight gạch chân linear cyan siêu mỏng */}
                <div className="space-y-2 pt-2">
                  <span className="text-[12px] leading-[16px] font-sans font-semibold text-slate-400 [html[data-theme='light']_&]:text-slate-600 tracking-[0.6px] uppercase block">
                    {isVi ? "LỜI GIẢI TỪ CỘNG SỰ SỐ" : "AEVUM COMPANION SOLUTION"}
                  </span>
                  <div className="text-[15px] sm:text-[16px] leading-[26px] sm:leading-[27px] font-normal text-slate-300 [html[data-theme='light']_&]:text-slate-800 font-sans tracking-[-0.01em]">
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
