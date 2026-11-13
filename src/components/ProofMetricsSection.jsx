import React, { useEffect, useRef, useState } from 'react';

/**
 * TypoAnimatedNumber - Typography Animated Counter
 * 
 * - Mượt mà đếm từ 0 lên giá trị mục tiêu (hoặc đếm lùi về 0) bằng đường cong easeOutExpo.
 * - Tự động kích hoạt khi cuộn vào tầm nhìn (IntersectionObserver).
 * - Cho phép tương tác di chuột để kích hoạt lại nhịp số nhẹ nhàng.
 * - Kiểu chữ thanh mảnh, cao cấp, tabular-nums chống rung chữ tuyệt đối.
 */
const TypoAnimatedNumber = ({ value, suffix = '', decimals = 0, isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startAnimation = () => {
    let startTimestamp = null;
    const duration = 1600; // 1.6s

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      if (value === 0) {
        // Đếm lùi mượt mà từ 10 về 0 để nhấn mạnh việc triệt tiêu nợ kỹ thuật
        setDisplayValue((1 - eased) * 10);
      } else {
        setDisplayValue(eased * value);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      startAnimation();
    }
  }, [isVisible, hasAnimated]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue);

  return (
    <div
      onMouseEnter={() => startAnimation()}
      className="flex items-baseline gap-1 select-none cursor-default group/num"
    >
      <span className="text-6xl sm:text-7xl lg:text-8xl font-bold font-sans text-white [html[data-theme='light']_&]:text-slate-950 tracking-tighter leading-none tabular-nums transition-colors duration-300 group-hover/num:text-amber-200/90 [html[data-theme='light']_&]:group-hover/num:text-blue-600">
        {formatted}
      </span>
      {suffix && (
        <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 tracking-normal ml-0.5">
          {suffix}
        </span>
      )}
    </div>
  );
};

export const ProofMetricsSection = ({ onNavigate, activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ── 6 LỢI ÍCH CỐT LÕI: XOAY QUANH CON NGƯỜI & CHẤT LƯỢNG SẢN PHẨM ──
  // Nhịp điệu Typographic Masonry đan xen: Stat-First và Narrative-First tạo sự phong phú, chặt chẽ
  const benefits = [
    // 1. STAT-FIRST: Tâm trí thảnh thơi & Ký ức sống
    {
      id: 'memory',
      layout: 'stat-first',
      tag: isVi ? '01 • TÂM TRÍ THẢNH THƠI & BẢO TOÀN TRÍ NHỚ' : '01 • MENTAL CLARITY & LIVING MEMORY',
      title: isVi
        ? 'Hiểu việc sâu sắc. Giữ trọn sự thảnh thơi cho tâm trí.'
        : 'Deep understanding. Total mental freedom.',
      desc: isVi
        ? 'Ký ức dài hạn (Living Memory Graph) lưu giữ trọn vẹn bối cảnh và lý do đằng sau từng quyết định kiến trúc. Bạn không còn phải làm "thư viện sống" giải thích lại dự án sau mỗi kỳ nghỉ hay sau khi mở lại tab làm việc.'
        : 'Living Memory Graph preserves 100% of architectural context across long sessions. Eliminates cognitive overload and AI context amnesia once and for all.',
      value: 99,
      suffix: '%',
      decimals: 0,
      caption: isVi
        ? 'Bối cảnh kỹ thuật được bảo tồn nguyên vẹn qua nhiều tuần'
        : 'Context fidelity preserved across multi-week milestones',
      actionText: isVi ? 'Khám phá kiến trúc bộ nhớ sống' : 'Explore Living Memory Graph',
      actionTarget: 'docs'
    },
    // 2. NARRATIVE-FIRST: Kỷ luật Plan-First
    {
      id: 'plan',
      layout: 'narrative-first',
      tag: isVi ? '02 • KỶ LUẬT PLAN-FIRST' : '02 • PLAN-FIRST DISCIPLINE',
      title: isVi
        ? 'Tính toán kỹ lưỡng trước khi gõ dòng code đầu tiên.'
        : 'Plan thoroughly before committing a single line.',
      desc: isVi
        ? 'Nguyên tắc Plan-First giúp AI tính toán cặn kẽ lộ trình thay đổi, tránh sửa lan man gây hỏng code thừa, giảm mạnh token lãng phí và triệt tiêu nợ kỹ thuật ngay từ đầu.'
        : 'Plan-First protocols eliminate trial-and-error churn, preventing code drift and slashing wasted token consumption.',
      value: 66,
      suffix: '%',
      decimals: 0,
      caption: isVi
        ? 'Giảm lãng phí token và sai lệch mã nguồn'
        : 'Reduction in token waste and code drift',
      actionText: isVi ? 'Xem báo cáo đo kiểm hiệu năng' : 'Explore benchmark report',
      actionTarget: 'explore'
    },
    // 3. STAT-FIRST: Bình an & An toàn hệ thống
    {
      id: 'guard',
      layout: 'stat-first',
      tag: isVi ? '03 • AN TÂM SAU MỖI LẦN DEPLOY' : '03 • ZERO-TRUST PEACE OF MIND',
      title: isVi
        ? 'Ranh giới bất khả xâm phạm. Tuyệt đối không lo vỡ code.'
        : 'Impenetrable boundaries. Sleep soundly after deploy.',
      desc: isVi
        ? 'Chốt chặn Zero-Trust tự động khóa chặt phạm vi activeFiles. Mọi thay đổi ngoài dự kiến đều lập tức dừng lại yêu cầu bạn phê duyệt. Mã nguồn an toàn tuyệt đối như trong két sắt.'
        : 'Zero-Trust boundary guard isolates activeFiles strictly. Unauthorized edits are intercepted in volatile RAM before touching host files.',
      value: 100,
      suffix: '%',
      decimals: 0,
      caption: isVi
        ? 'Ranh giới tệp được chốt chặn an toàn tuyệt đối'
        : 'Files bounded with Zero-Trust active isolation',
      actionText: isVi ? 'Tìm hiểu chốt chặn Zero-Trust' : 'Explore Zero-Trust Guard',
      actionTarget: 'docs'
    },
    // 4. NARRATIVE-FIRST: Biệt đội đa chuyên môn & Swarm
    {
      id: 'swarm',
      layout: 'narrative-first',
      tag: isVi ? '04 • CỘNG SỰ ĐA CHUYÊN MÔN' : '04 • CROSS-DOMAIN SWARM ACCELERATION',
      title: isVi
        ? 'Biệt đội cộng sự số. Cùng bạn giải quyết bài toán lớn.'
        : 'Autonomous agent squad. Conquering massive challenges.',
      desc: isVi
        ? 'Điều phối song song nhiều Persona: Kiến trúc sư dựng khung, Lập trình viên viết mã, QA rà soát biên giới và Nhà nghiên cứu lập luận chứng minh. Bạn chuyển hóa từ người gõ code đơn độc thành Tổng công trình sư điều hành hệ thống.'
        : 'Concurrent multi-persona orchestration (Architect, Coder, QA, Researcher) collaborating over shared memory, compressing multi-day refactors into minutes.',
      value: 3.8,
      suffix: 'x',
      decimals: 1,
      caption: isVi
        ? 'Gia tốc hoàn thành tác vụ kỹ thuật đa luồng'
        : 'Collaborative execution acceleration factor',
      actionText: isVi ? 'Trải nghiệm Swarm Concurrency' : 'Explore Swarm Concurrency',
      actionTarget: 'explore'
    },
    // 5. STAT-FIRST: Cân bằng cuộc sống & Giấc ngủ sâu
    {
      id: 'balance',
      layout: 'stat-first',
      tag: isVi ? '05 • CÂN BẰNG CUỘC SỐNG' : '05 • BIO-HARMONY & ANTI-BURNOUT',
      title: isVi
        ? 'Công nghệ phát triển khi con người khỏe mạnh.'
        : 'Technology thrives when humanity thrives.',
      desc: isVi
        ? 'Ủy quyền các tác vụ lặp lại và kiểm thử ngầm cho máy chạy xuyên đêm. Bạn ngủ đủ 8 tiếng, cuối tuần thảnh thơi bên gia đình mà dự án vẫn về đích xuất sắc. Kỹ sư minh mẫn tạo ra sản phẩm hoàn hảo.'
        : 'Delegate repetitive workloads and nocturnal batch runs to autonomous agents. Sleep a full 8 hours and reclaim your weekends while projects land on time.',
      value: 8,
      suffix: 'h',
      decimals: 0,
      caption: isVi
        ? 'Giấc ngủ sâu mỗi ngày mà deadline vẫn trọn vẹn'
        : 'Deep restorative sleep with 100% deadline success',
      actionText: isVi ? 'Tìm hiểu triết lý Co-Evolution' : 'Explore Co-Evolution philosophy',
      actionTarget: 'docs'
    },
    // 6. NARRATIVE-FIRST: Chất lượng trường tồn & Zero nợ kỹ thuật
    {
      id: 'craft',
      layout: 'narrative-first',
      tag: isVi ? '06 • CHẤT LƯỢNG TRƯỜNG TỒN' : '06 • ENDURING CRAFTSMANSHIP',
      title: isVi
        ? 'Sản phẩm tinh xảo, không mục nát theo thời gian.'
        : 'Exquisite software, zero accumulated tech debt.',
      desc: isVi
        ? 'Sau mỗi milestone, hệ thống tự động chưng cất tri thức, đóng gói tài liệu lưu trữ và chuẩn hóa ranh giới O-DDD. Mã nguồn phát triển như sinh thể sống khỏe mạnh, không bị mục nát bởi nợ kỹ thuật.'
        : 'Cellular architecture auto-distills reusable skills and purges dead abstractions, ensuring the codebase stays clean, pristine, and maintainable for decades.',
      value: 0,
      suffix: isVi ? ' nợ' : ' debt',
      decimals: 0,
      caption: isVi
        ? 'Zero nợ kỹ thuật tồn đọng sau mỗi lần bàn giao'
        : 'Zero technical debt left after project handoff',
      actionText: isVi ? 'Khám phá kiến trúc O-DDD' : 'Explore O-DDD Architecture',
      actionTarget: 'docs'
    }
  ];

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF] border-b border-white/[0.08] [html[data-theme='light']_&]:border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP 2-COLUMN EDITORIAL HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-20 text-left">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-widest text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase select-none mb-3">
              <span>{isVi ? 'GIÁ TRỊ THỰC TẾ • CON NGƯỜI & CHẤT LƯỢNG' : 'CORE VALUES • HUMAN & QUALITY'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Tôn vinh con người.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Nâng tầm chất lượng sản phẩm.
                  </span>
                </>
              ) : (
                <>
                  Empowering humanity.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Elevating product excellence.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5 pt-2">
            <p className="text-base sm:text-lg text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-light">
              {isVi
                ? 'Được đúc kết từ hàng trăm giờ nghiên cứu mã nguồn phức tạp và vận hành thực tế. Chúng tôi tin rằng công nghệ ưu việt nhất là công nghệ giải phóng sức lao động và mang lại cuộc sống hạnh phúc hơn cho con người.'
                : 'Distilled from hundreds of hours researching mission-critical code. We believe the highest technology is one that liberates human creativity and fosters true living well-being.'}
            </p>
          </div>
        </div>

        {/* ── SWISS TYPOGRAPHY EDITORIAL GRID (INHERITED FROM "DON'T BREAK THE GRID") ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-14 sm:gap-y-16 text-left items-start">

          {/* ── ROW 1: THE ANCHOR DUO (7 COLS + 5 COLS = 12 COLS) ── */}
          {/* CARD 01: LIVING MEMORY GRAPH (7 COLS) */}
          <div className="md:col-span-1 lg:col-span-7 bg-transparent border-0 p-0 flex flex-col justify-start space-y-3 group">
            <div className="space-y-1.5">
              <TypoAnimatedNumber
                value={benefits[0].value}
                suffix={benefits[0].suffix}
                decimals={benefits[0].decimals}
                isVisible={isVisible}
              />
              <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {benefits[0].caption}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                {benefits[0].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal max-w-2xl">
                {benefits[0].desc}
              </p>
            </div>
          </div>

          {/* CARD 02: PLAN-FIRST DISCIPLINE (5 COLS) */}
          <div className="md:col-span-1 lg:col-span-5 bg-transparent border-0 p-0 flex flex-col justify-start space-y-3 group">
            <div className="space-y-1.5">
              <TypoAnimatedNumber
                value={benefits[1].value}
                suffix={benefits[1].suffix}
                decimals={benefits[1].decimals}
                isVisible={isVisible}
              />
              <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {benefits[1].caption}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                {benefits[1].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal">
                {benefits[1].desc}
              </p>
            </div>
          </div>

          {/* ── ROW 2: THE 3-PILLAR BASELINE GRID (4 COLS + 4 COLS + 4 COLS = 12 COLS) ── */}
          {/* CARD 03: ZERO-TRUST GUARD (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 bg-transparent border-0 p-0 flex flex-col justify-start space-y-3 group">
            <div className="space-y-1.5">
              <TypoAnimatedNumber
                value={benefits[2].value}
                suffix={benefits[2].suffix}
                decimals={benefits[2].decimals}
                isVisible={isVisible}
              />
              <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {benefits[2].caption}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                {benefits[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal">
                {benefits[2].desc}
              </p>
            </div>
          </div>

          {/* CARD 04: SWARM CONCURRENCY (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 bg-transparent border-0 p-0 flex flex-col justify-start space-y-3 group">
            <div className="space-y-1.5">
              <TypoAnimatedNumber
                value={benefits[3].value}
                suffix={benefits[3].suffix}
                decimals={benefits[3].decimals}
                isVisible={isVisible}
              />
              <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {benefits[3].caption}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                {benefits[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal">
                {benefits[3].desc}
              </p>
            </div>
          </div>

          {/* CARD 05: LIFE-WORK HARMONY (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 bg-transparent border-0 p-0 flex flex-col justify-start space-y-3 group">
            <div className="space-y-1.5">
              <TypoAnimatedNumber
                value={benefits[4].value}
                suffix={benefits[4].suffix}
                decimals={benefits[4].decimals}
                isVisible={isVisible}
              />
              <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {benefits[4].caption}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                {benefits[4].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal">
                {benefits[4].desc}
              </p>
            </div>
          </div>

          {/* ── ROW 3: WIDESCREEN EDITORIAL CLOSER (SPAN 12 COLS) ── */}
          {/* CARD 06: ENDURING CRAFTSMANSHIP & ZERO DEBT */}
          <div className="md:col-span-2 lg:col-span-12 bg-transparent border-0 p-0 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              {/* Cột 1 (4 cols): Số liệu Animated 0 nợ */}
              <div className="lg:col-span-4 space-y-1.5">
                <TypoAnimatedNumber
                  value={benefits[5].value}
                  suffix={benefits[5].suffix}
                  decimals={benefits[5].decimals}
                  isVisible={isVisible}
                />
                <p className="text-xs sm:text-sm font-mono text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                  {benefits[5].caption}
                </p>
              </div>

              {/* Cột 2 (8 cols): Tiêu đề & Diễn giải chi tiết */}
              <div className="lg:col-span-8 space-y-2 pt-1">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug group-hover:text-slate-100 [html[data-theme='light']_&]:group-hover:text-slate-950 transition-colors">
                  {benefits[5].title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-relaxed font-sans font-normal max-w-3xl">
                  {benefits[5].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProofMetricsSection;
