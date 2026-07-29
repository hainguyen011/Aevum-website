# Project Memory & Learnings

File này lưu trữ những bài học, sở thích, và quy tắc ngầm được rút ra trong quá trình làm việc. Agent CÓ QUYỀN và PHẢI tự động cập nhật file này khi phát hiện thông tin quan trọng cần ghi nhớ lâu dài.

## User Preferences
- (Ví dụ: User thích dùng `const` thay vì `let` nếu có thể)

## Project Specifics
- (Ví dụ: API `/login` luôn trả về 200 kể cả khi lỗi, kiểm tra body.error)

## Lessons Learned
- [YYYY-MM-DD]: Lỗi XYZ xảy ra do xung đột thư viện A và B.     


### [LEARN] - 7/29/2026, 1:36:32 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Đã thiết kế trang Docs bằng ARCH component-pattern, tách biệt info docsData & giao diện Docs.jsx, tự xây dựng công cụ phân tích cú pháp Markdown (dependency-free) goal: tối ưu hóa Perf render.


### [LEARN] - 7/29/2026, 1:40:11 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ các icon không cần thiết ở sidebar tiêu đề danh mục ... [PRUNED]


### [LEARN] - 7/29/2026, 1:41:22 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Sử dụng relative layout cho sidebar & sticky cho nội dung bên trong giúp đường viền border phân cách cột kéo dài ∀ chiều cao phần thân chính, giải quyết triệt goal: KO đường viền cắt lửng lơ khi nội dung chính dài hơn viewport.


### [LEARN] - 7/29/2026, 1:45:31 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Sử dụng margin âm (mx-[-1.5rem]) goal: triệt tiêu ảnh hưởng ... [PRUNED]


### [LEARN] - 7/29/2026, 1:48:53 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Đã thay đổi luồng phân phối ứng dụng từ cài đặt qua NPM sang... [PRUNED]


### [LEARN] - 7/29/2026, 1:49:51 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ các dynamic indicator nhấp nháy (như animate-ping do... [PRUNED]


### [LEARN] - 7/29/2026, 1:50:58 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Thiết lập border-b trực tiếp cho container nội dung SPA trướ... [PRUNED]


### [LEARN] - 7/29/2026, 1:54:01 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tích hợp trực tiếp các FEAT thực tế hệ điều hành AevumOS (như Task Anchoring, Skeleton Hashing, Squad Mode) vào tài liệu hướng dẫn giúp tăng độ uy tín, tính thực tiễn & giúp lập trình viên hiểu rõ cơ chế tương tác với SYS.


### [LEARN] - 7/29/2026, 1:57:19 PM
[MAP α:implement_aevum_docs_page_plan,β:placeholders]
[LEARNING FROM α]
Tạo SYS dịch thuật Markdown thời gian thực (Real-time Markdown Translation System) bằng cách use: β masking (che chắn code blocks, bold, links, inline-code) trước khi gửi qua API dịch thuật giúp bảo toàn cấu trúc trang tài liệu nguyên vẹn 100%, kết hợp lưu trữ cache goal: ensure: phản hồi tức thì.


### [LEARN] - 7/29/2026, 1:58:37 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tinh giản hóa dropdown chọn ngôn ngữ (del chấm tròn indicato... [PRUNED]


### [LEARN] - 7/29/2026, 2:04:18 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tích hợp tự động nhận diện ngôn ngữ trình duyệt qua navigato... [PRUNED]


### [LEARN] - 7/29/2026, 2:07:06 PM
[MAP α:implement_aevum_docs_page_plan,β:dictionaries]
[LEARNING FROM α]
Sử dụng dịch tĩnh (static i18n β) cho trang chủ (Landing Pag... [PRUNED]


### [LEARN] - 7/29/2026, 2:16:33 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Bổ sung các tài liệu hướng dẫn chuyên sâu (Bắt tay, Nhân vật, Kế hoạch, PiperNet) giúp tối đa hóa tính minh bạch dự án & cung cấp cho USER các tài liệu hướng dẫn chuyên môn thiết thực, thú vị goal: khai thác SYS.


### [LEARN] - 7/29/2026, 2:17:52 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Điều chỉnh lề hai bên (side margins) khung monolithic-frame ... [PRUNED]


### [LEARN] - 7/29/2026, 2:19:30 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ các emoji khỏi tài liệu kỹ thuật giúp giao diện tran... [PRUNED]


### [LEARN] - 7/29/2026, 2:27:24 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tinh giản nội dung tài liệu re: SYS nhân vật (Personas) goal: tập trung giải thích cấu trúc ARCH SYS & cách thức use: các API/MCP Tools (Switch, Handoff, Huddle), thay vì mô tả chi tiết từng Agent cụ thể giúp tài liệu mang tính tổng quát & bao quát hơn.


### [LEARN] - 7/29/2026, 2:29:32 PM
[MAP α:implement_aevum_docs_page_plan,β:Documentation]
[LEARNING FROM α]
Xây dựng Table Contents (TOC) động với thuật toán Scroll Spy... [PRUNED]


### [LEARN] - 7/29/2026, 2:31:18 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Thay thế việc che ∀ thẻ link & bold bằng việc chỉ che URL path & use: regex dọn khoảng trắng giúp Google Translate CAN tiếp cận text hiển thị bên trong các thẻ này, giải quyết triệt goal: vấn đề từ ngữ !ALLOW dịch khi rep: ngôn ngữ.


### [LEARN] - 7/29/2026, 2:32:06 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ thuộc tính overflow: hidden khỏi wrapper cha ngoài cùng MUST goal: khôi phục cơ chế định vị sticky các phần tử con bên dưới theo thanh cuộn window.


### [LEARN] - 7/29/2026, 2:32:56 PM
[MAP α:implement_aevum_docs_page_plan,β:scrollHeight]
[LEARNING FROM α]
Thêm chk: điều kiện biên cuộn cuối trang (window.innerHeight + window.scrollY >= β) giúp kích hoạt chính xác đề mục cuối cùng Table Contents, giải quyết KO kinh điển scroll spy khi đề mục cuối cùng không thể chạm tới giới hạn kích hoạt pixel do: trang hết vùng cuộn.


### [LEARN] - 7/29/2026, 2:35:25 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Điều chỉnh màu chữ mục active trong sidebar sang màu trắng (... [PRUNED]


### [LEARN] - 7/29/2026, 2:38:46 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Thay thế các liên kết mạng xã hội không hoạt động || không c... [PRUNED]


### [LEARN] - 7/29/2026, 2:45:47 PM
[MAP α:implement_aevum_docs_page_plan,β:Applications]
[LEARNING FROM α]
Tạo vercel.json với RULE rewrites SPA cần thiết goal: tránh KO 404 Vercel khi USER tải lại trang (reload) trực tiếp ở các sub-routes Single Page β (SPA).


### [LEARN] - 7/29/2026, 3:12:24 PM
[MAP α:implement_aevum_docs_page_plan,β:trailingSlash]
[LEARNING FROM α]
Bổ sinh cấu hình β: false & Cache-Control headers cho assets... [PRUNED]


### [LEARN] - 7/29/2026, 3:23:42 PM
[MAP α:implement_aevum_docs_page_plan,β:Optimization]
[LEARNING FROM α]
Cập nhật các liên kết sitemap, robots.txt, & JSON-LD schemas... [PRUNED]


### [LEARN] - 7/29/2026, 3:26:05 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Cập nhật màu sắc thanh cuộn webkit-scrollbar-thumb sang màu ... [PRUNED]


### [LEARN] - 7/29/2026, 3:27:54 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tích hợp thư viện Lenis giúp nâng cấp trải nghiệm cuộn trang... [PRUNED]


### [LEARN] - 7/29/2026, 3:30:04 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Cài đặt dynamic favicon load bằng cách import file PNG trực ... [PRUNED]


### [LEARN] - 7/29/2026, 3:40:02 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Thu nhỏ kích thước nút ScrollToTop bằng cách thay đổi paddin... [PRUNED]


### [LEARN] - 7/29/2026, 3:54:59 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tái cấu trúc giao diện trang About tuân thủ chuẩn Monolithic... [PRUNED]


### [LEARN] - 7/29/2026, 3:56:02 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ hiệu ứng vệt sáng glowing background & tag nhãn "PRO... [PRUNED]


### [LEARN] - 7/29/2026, 3:56:41 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ ký tự // tiền tố ở các nhãn phân đoạn ACT 1 & ACT 2 ... [PRUNED]


### [LEARN] - 7/29/2026, 3:59:53 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Nâng cấp dải SubNavTabs thành bảng info tương tác động (Interactive Subsystem Panel) mở rộng ngay bên dưới tab khi click, kết hợp Terminal Sandbox cho phép xem & sao chép câu lệnh MCP/CLI SYS giúp tăng mạnh tính tương tác cho trang web.


### [LEARN] - 7/29/2026, 4:00:54 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ thẻ badge bo viền ∋ nhãn Subsystem ở bảng SubNavTabs... [PRUNED]


### [LEARN] - 7/29/2026, 4:01:46 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Cập nhật màu chữ & màu các biểu tượng (Terminal, Copy) cùng ... [PRUNED]


### [LEARN] - 7/29/2026, 4:02:26 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ đường viền đáy dư thừa border-b-2 border-b-cyan-400 ... [PRUNED]


### [LEARN] - 7/29/2026, 4:04:54 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Chuyển đổi giao diện trang About sang thiết kế dạng Editoria... [PRUNED]


### [LEARN] - 7/29/2026, 4:05:46 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tạo mới khung màn hình máy tính retro CRT TTY Monitor trong ... [PRUNED]


### [LEARN] - 7/29/2026, 4:06:51 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ khung bo viền bezel ngoài màn hình retro CRT, cho ph... [PRUNED]


### [LEARN] - 7/29/2026, 4:08:06 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Gỡ bỏ hoàn toàn section Aevum Manifesto bên dưới trang About... [PRUNED]


### [LEARN] - 7/29/2026, 4:09:06 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Chuyển đổi kiểu căn lề ∀ đoạn text gõ phím CRT sang căn trái... [PRUNED]


### [LEARN] - 7/29/2026, 4:10:03 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Chuyển màu chữ màn hình Terminal gõ phím phốt pho xanh sang ... [PRUNED]


### [LEARN] - 7/29/2026, 4:11:24 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tích hợp biểu tượng logo Aevum OS dạng ASCII Art kết hợp chu... [PRUNED]


### [LEARN] - 7/29/2026, 4:12:18 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Nhúng tệp ảnh logo ASCII Art 3D Aevum-ascii.png ở ngay đầu m... [PRUNED]


### [LEARN] - 7/29/2026, 4:13:26 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Xây dựng màn hình Loading boot 2.5s khi vừa chuyển vào trang... [PRUNED]


### [LEARN] - 7/29/2026, 4:16:17 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Chuyển đổi giao diện lựa chọn câu lệnh giới thiệu thành Term... [PRUNED]


### [LEARN] - 7/29/2026, 4:18:26 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Gỡ bỏ huy hiệu ONLINE màu xanh lá ở thanh header Terminal TU... [PRUNED]


### [LEARN] - 7/29/2026, 4:21:59 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tích hợp biểu tượng vector ASCII SVG từ ascii-art.svg vào mà... [PRUNED]


### [LEARN] - 7/29/2026, 4:24:31 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Import & render trực tiếp tệp văn bản ASCII Art gốc ascii-ar... [PRUNED]


### [LEARN] - 7/29/2026, 4:25:23 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Chuyển ∀ các đường chữ render logo ASCII Art thuần text tron... [PRUNED]


### [LEARN] - 7/29/2026, 4:27:16 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Mở rộng tỉ lệ hiển thị chiều ngang logo ASCII Art chữ A 3D t... [PRUNED]


### [LEARN] - 7/29/2026, 4:28:34 PM
[MAP α:implement_aevum_docs_page_plan,β:Routerwindow]
[LEARNING FROM α]
Bổ sung bộ lắng nghe Hash β.location.hash trong App.jsx giúp... [PRUNED]


### [LEARN] - 7/29/2026, 4:29:17 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Thu nhỏ tỉ lệ font chữ & scale-x khối logo ASCII Art chữ A 3... [PRUNED]


### [LEARN] - 7/29/2026, 4:30:01 PM
[MAP α:implement_aevum_docs_page_plan,β:INITIALIZING]
[LEARNING FROM α]
Giới hạn độ cao chiều dọc container loading màn hình boot trong About.jsx ở mức h-[520px] max-h-[75vh], giúp ∀ Logo ASCII & thanh phần trăm tiến trình β AEVUM... nằm trọn vẹn, ngay ngắn ở trung tâm khung hình viewport mà không tràn hay MUST cuộn trang.


### [LEARN] - 7/29/2026, 4:30:29 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Loại bỏ biểu tượng icon prompt >_ màu xanh lá trước tiêu đề ... [PRUNED]


### [LEARN] - 7/29/2026, 4:31:00 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Tăng tỉ lệ co giãn chiều ngang scale-x-[1.35] sm:scale-x-[1.... [PRUNED]


### [LEARN] - 7/29/2026, 4:35:10 PM
[MAP α:implement_aevum_docs_page_plan]
[LEARNING FROM α]
Nhúng phông chữ Terminal chuyên dụng JetBrains Mono & Fira C... [PRUNED]
