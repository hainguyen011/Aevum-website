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
      <span className="text-6xl sm:text-7xl lg:text-8xl font-bold font-sans text-white [html[data-theme='light']_&]:text-slate-950 tracking-tighter leading-none tabular-nums transition-colors duration-300 group-hover/num:text-slate-200 [html[data-theme='light']_&]:group-hover/num:text-slate-800">
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

  // 6 Core Measurable Outcomes: Concise & Human-Centered
  const benefits = [
    {
      id: 'memory',
      layout: 'stat-first',
      tag: isVi ? '01 • TRÍ NHỚ LIỀN MẠCH' : '01 • CONTINUOUS MEMORY',
      title: isVi ? 'Hiểu dự án sâu. Giữ trọn sự thảnh thơi.' : 'Deep continuity. Calm focus.',
      desc: isVi
        ? 'Lưu nguyên lý do thiết kế và quy ước code qua nhiều tuần, giúp bạn không phải giải thích lại mỗi khi mở máy.'
        : 'Preserves architectural decisions across weeks so you never repeat project context.',
      value: 99,
      suffix: '%',
      decimals: 0,
      caption: isVi ? 'Bối cảnh được bảo tồn qua nhiều tuần' : 'Context preserved across milestones',
      actionText: isVi ? 'Xem kiến trúc trí nhớ' : 'Explore memory graph',
      actionTarget: 'docs'
    },
    {
      id: 'plan',
      layout: 'narrative-first',
      tag: isVi ? '02 • LÀM ĐÚNG NGAY TỪ ĐẦU' : '02 • PLAN BEFORE CODE',
      title: isVi ? 'Vẽ rõ lộ trình trước khi viết mã.' : 'Clear blueprint before editing.',
      desc: isVi
        ? 'Kiểm tra kỹ phạm vi ảnh hưởng trước lúc sửa file, cắt mạnh token thừa và tránh code chắp vá.'
        : 'Audits change scope before touching files, cutting wasted inference tokens cleanly.',
      value: 66,
      suffix: '%',
      decimals: 0,
      caption: isVi ? 'Tiết kiệm chi phí token lãng phí' : 'Token waste reduced',
      actionText: isVi ? 'Xem tài liệu Plan-First' : 'Explore Plan-First',
      actionTarget: 'docs'
    },
    {
      id: 'guard',
      layout: 'stat-first',
      tag: isVi ? '03 • AN TOÀN TUYỆT ĐỐI' : '03 • ZERO-TRUST GUARD',
      title: isVi ? 'Khóa chặt ranh giới tệp.' : 'Strict boundary safety.',
      desc: isVi
        ? 'Mọi thay đổi chạy nháp trên RAM; chạm đúng tệp được phép và chờ bạn gật đầu trước khi lưu.'
        : 'Edits stay bounded inside activeFiles and volatile RAM until explicitly approved.',
      value: 100,
      suffix: '%',
      decimals: 0,
      caption: isVi ? 'Phạm vi tệp được kiểm soát an toàn' : 'Active files protected',
      actionText: isVi ? 'Tìm hiểu Sandbox' : 'Explore Sandbox',
      actionTarget: 'docs'
    },
    {
      id: 'swarm',
      layout: 'narrative-first',
      tag: isVi ? '04 • ĐỒNG HÀNH ĐA LUỒNG' : '04 • CONCURRENT SQUAD',
      title: isVi ? 'Chia tải đồng thời nhiều chuyên gia.' : 'Parallel multi-role teamwork.',
      desc: isVi
        ? 'Từ thiết kế đến kiểm thử cùng chạy song song, rút ngắn công việc nhiều ngày xuống chỉ còn vài giờ.'
        : 'Architecture, coding, and verification run together, compressing multi-day work smoothly.',
      value: 3.8,
      suffix: 'x',
      decimals: 1,
      caption: isVi ? 'Tốc độ hoàn thành tác vụ thực tế' : 'Measured delivery speedup',
      actionText: isVi ? 'Khám phá Học viện' : 'Explore Academy',
      actionTarget: 'explore'
    },
    {
      id: 'balance',
      layout: 'stat-first',
      tag: isVi ? '05 • CÂN BẰNG CUỘC SỐNG' : '05 • WORK-LIFE HARMONY',
      title: isVi ? 'Giữ sức khỏe bên cạnh năng suất.' : 'Healthier rhythm without burnout.',
      desc: isVi
        ? 'Giao việc lặp lại và kiểm thử dài hơi cho cộng sự số xử lý gọn, giữ cho bạn thời gian nghỉ ngơi.'
        : 'Hand repetitive checks and batch workflows to digital companions while reclaiming rest.',
      value: 8,
      suffix: 'h',
      decimals: 0,
      caption: isVi ? 'Ngủ đủ mỗi ngày mà tiến độ vẫn vững' : 'Restful sleep with steady releases',
      actionText: isVi ? 'Triết lý sản phẩm' : 'Read product story',
      actionTarget: 'about'
    }
  ];

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="w-full py-14 sm:py-20 bg-[#0A0B0F] [html[data-theme='light']_&]:bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Concise Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12 text-left">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-widest text-slate-300 [html[data-theme='light']_&]:text-slate-600 uppercase select-none mb-2.5">
              <span>{isVi ? 'HIỆU QUẢ ĐO LƯỜNG ĐƯỢC' : 'MEASURABLE OUTCOMES'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-white [html[data-theme='light']_&]:text-slate-900 leading-[1.12] font-sans">
              {isVi ? (
                <>
                  Ít nhắc lại hơn.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Nhiều thời gian sống hơn.
                  </span>
                </>
              ) : (
                <>
                  Less context friction.<br />
                  <span className="text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                    Higher software craftsmanship.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
              {isVi
                ? 'Công nghệ tốt nhất là công nghệ âm thầm giảm tải cho bạn mỗi ngày mà vẫn bảo toàn chất lượng code.'
                : 'The best technology quietly removes daily friction while keeping engineering quality uncompromisingly high.'}
            </p>
          </div>
        </div>

        {/* ── UNIFIED SWISS MASONRY BENTO GRID (7+5 / 4+4+4 / 12) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 text-left items-stretch">

          {/* ── ROW 1: THE ANCHOR DUO (7 COLS + 5 COLS = 12 COLS) ── */}
          {/* CARD 01: LIVING MEMORY GRAPH (7 COLS) */}
          <div className="md:col-span-1 lg:col-span-7 rounded-3xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-4 group transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
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
              <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {benefits[0].title}
              </h3>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal max-w-2xl m-0">
                {benefits[0].desc}
              </p>
            </div>
          </div>

          {/* CARD 02: PLAN-FIRST DISCIPLINE (5 COLS) */}
          <div className="md:col-span-1 lg:col-span-5 rounded-3xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-4 group transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
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
              <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {benefits[1].title}
              </h3>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                {benefits[1].desc}
              </p>
            </div>
          </div>

          {/* ── ROW 2: THE 3-PILLAR BASELINE GRID (4 COLS + 4 COLS + 4 COLS = 12 COLS) ── */}
          {/* CARD 03: ZERO-TRUST GUARD (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 p-6 sm:p-7 flex flex-col justify-between space-y-4 group transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
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
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {benefits[2].title}
              </h3>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                {benefits[2].desc}
              </p>
            </div>
          </div>

          {/* CARD 04: SWARM CONCURRENCY (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 p-6 sm:p-7 flex flex-col justify-between space-y-4 group transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
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
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {benefits[3].title}
              </h3>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                {benefits[3].desc}
              </p>
            </div>
          </div>

          {/* CARD 05: LIFE-WORK HARMONY (4 COLS) */}
          <div className="md:col-span-1 lg:col-span-4 rounded-2xl bg-[#0C0E14] [html[data-theme='light']_&]:bg-slate-50 p-6 sm:p-7 flex flex-col justify-between space-y-4 group transition-colors hover:bg-[#10131C] [html[data-theme='light']_&]:hover:bg-slate-100/80">
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
              <h3 className="text-xl sm:text-2xl font-semibold text-white [html[data-theme='light']_&]:text-slate-900 font-sans tracking-tight leading-snug">
                {benefits[4].title}
              </h3>
              <p className="text-base text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-[1.7] font-sans font-normal m-0">
                {benefits[4].desc}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProofMetricsSection;
