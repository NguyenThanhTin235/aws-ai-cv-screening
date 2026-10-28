HÃY THIẾT KẾ GIAO DIỆN: CỔNG TÌM KIẾM & LỌC VIỆC LÀM (CANDIDATE JOB SEARCH & FILTER)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên tìm kiếm, lọc các vị trí tuyển dụng IT/Tech theo tiêu chí và xem danh sách tin tuyển dụng dạng thẻ trực quan.

[BỐ CỤC (LAYOUT)]
- Header điều hướng trên cùng (Fixed Navbar): Toàn màn hình, cố định khi cuộn trang.
- Thanh tìm kiếm trung tâm (Hero Search Bar): Nằm ngay dưới Header, nổi bật giữa trang.
- Thân trang chia 2 cột bất đối xứng (Container 1280px căn giữa):
  + Cột trái (280px): Khung bộ lọc cố định (Filter Sidebar).
  + Cột phải (1fr): Danh sách kết quả việc làm dạng lưới thẻ (Job Cards Grid) và thanh phân trang ở đáy.
- Mobile: Bộ lọc thu gọn vào nút bấm mở ngăn kéo trượt (Filter Drawer), danh sách công việc xếp 1 cột.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Header điều hướng:
   - Logo thương hiệu bên trái.
   - Menu liên kết: "Việc làm", "Hồ sơ của tôi", "Báo cáo AI".
   - Nút bật Dark Mode và Avatar người dùng với dropdown cài đặt.
2. Thanh tìm kiếm Hero:
   - Ô nhập từ khóa (Icon kính lúp, placeholder: "Vị trí, kỹ năng: AWS, React, Python...").
   - Dropdown chọn địa điểm (Icon định vị: TP.HCM, Hà Nội, Đà Nẵng, Remote).
   - Nút bấm chính "Tìm kiếm việc làm" (Icon mũi tên).
3. Cột bộ lọc bên trái (Filter Sidebar):
   - Bộ lọc hình thức làm việc (Checkboxes: Toàn thời gian, Bán thời gian, Làm từ xa).
   - Bộ lọc cấp bậc (Checkboxes: Junior, Middle, Senior, Lead).
   - Bộ lọc mức lương (Thanh trượt Slider 2 đầu kéo từ $500 đến $5000+).
   - Nhóm Tag kỹ năng phổ biến (Pill tags bấm chọn: AWS, Docker, Node.js, React).
   - Nút "Đặt lại bộ lọc" và nút "Áp dụng".
4. Cột danh sách việc làm bên phải:
   - Thanh hiển thị số lượng kết quả ("Tìm thấy 24 việc làm phù hợp") kèm dropdown sắp xếp ("Mới nhất", "Lương cao nhất").
   - Thẻ tin tuyển dụng (Job Card):
     * Logo công ty (hình vuông bo góc 8px).
     * Tên công ty kèm huy hiệu xác thực màu xanh.
     * Tiêu đề công việc in đậm cỡ vừa.
     * Hàng thông tin nhanh: Mức lương (Icon Dollar, chữ xanh lá), Địa điểm (Icon MapPin), Thời gian đăng.
     * Dải tag kỹ năng yêu cầu (Badges bo tròn màu xám nhạt).
     * Nút icon Trái tim lưu tin và nút bấm chính "ỨNG TUYỂN NGAY".
5. Thanh phân trang ở đáy: Các nút số trang [ < ] [ 1 ] [ 2 ] [ 3 ] [ > ].

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Modern SaaS, thoáng đãng, bo góc thẻ 12px, bóng đổ nhẹ.
- Nền trang: Màu tối #0F172A (Dark) hoặc xám sáng #F8FAFC (Light).
- Nền thẻ công việc (Job Card): Màu #1E293B (Dark) hoặc #FFFFFF (Light), viền mảnh #334155. Khi rê chuột (Hover) viền chuyển sang màu xanh #2563EB và thẻ nhấc nhẹ lên 2px.
- Mức lương nổi bật: Màu xanh ngọc lục bảo #10B981.
- Nút Ứng tuyển ngay: Nền xanh dương điện #2563EB, chữ trắng #FFFFFF.
- Tag kỹ năng: Nền tối #334155 (Dark) hoặc xám nhạt #E2E8F0 (Light), chữ #94A3B8.
