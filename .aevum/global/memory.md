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
