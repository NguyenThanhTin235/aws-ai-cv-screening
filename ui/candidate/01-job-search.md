HÃY THIẾT KẾ GIAO DIỆN: CỔNG TÌM KIẾM & LỌC VIỆC LÀM (CANDIDATE JOB SEARCH & FILTER)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên tìm kiếm, lọc các vị trí tuyển dụng IT/Tech theo tiêu chí và xem danh sách tin tuyển dụng dạng thẻ trực quan trên giao diện sáng thanh lịch.

[BỐ CỤC (LAYOUT)]
- Header điều hướng trên cùng (Fixed Navbar): Nền trắng #FFFFFF viền mảnh #E2E8F0, cố định khi cuộn trang.
- Thanh tìm kiếm trung tâm (Hero Search Bar): Nằm ngay dưới Header, nổi bật giữa trang trên nền xám sáng nhẹ #F8FAFC.
- Thân trang chia 2 cột bất đối xứng (Container 1280px căn giữa):
  + Cột trái (280px): Khung bộ lọc cố định (Filter Sidebar) bằng thẻ card trắng.
  + Cột phải (1fr): Danh sách kết quả việc làm dạng lưới thẻ trắng (Job Cards Grid) và thanh phân trang ở đáy.
- Mobile: Bộ lọc thu gọn vào nút bấm mở ngăn kéo trượt (Filter Drawer), danh sách công việc xếp 1 cột.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Header điều hướng:
   - Logo thương hiệu xanh #095744 bên trái.
   - Menu liên kết: "Việc làm", "Hồ sơ của tôi", "Báo cáo AI" (chữ màu #0F172A, hover màu #095744).
   - Avatar người dùng với dropdown cài đặt.
2. Thanh tìm kiếm Hero:
   - Ô nhập từ khóa (Icon kính lúp, placeholder: "Vị trí, kỹ năng: AWS, React, Python...").
   - Dropdown chọn địa điểm (Icon định vị: TP.HCM, Hà Nội, Đà Nẵng, Remote).
   - Nút bấm chính "Tìm kiếm việc làm" (Nền xanh #095744, icon mũi tên, chữ trắng).
3. Cột bộ lọc bên trái (Filter Sidebar):
   - Thẻ card nền trắng bo góc 12px viền #E2E8F0.
   - Bộ lọc hình thức làm việc (Checkboxes: Toàn thời gian, Bán thời gian, Làm từ xa).
   - Bộ lọc cấp bậc (Checkboxes: Junior, Middle, Senior, Lead).
   - Bộ lọc mức lương (Thanh trượt Slider 2 đầu kéo từ $500 đến $5000+, màu xanh #095744).
   - Nhóm Tag kỹ năng phổ biến (Pill tags bấm chọn: AWS, Docker, Node.js, React).
   - Nút "Đặt lại bộ lọc" (chữ xám) và nút "Áp dụng" (nền xanh #095744, chữ trắng).
4. Cột danh sách việc làm bên phải:
   - Thanh hiển thị số lượng kết quả ("Tìm thấy 24 việc làm phù hợp") kèm dropdown sắp xếp.
   - Thẻ tin tuyển dụng (Job Card):
     * Nền trắng tinh khiết, đổ bóng nhẹ, bo góc 12px, viền #E2E8F0.
     * Logo công ty (hình vuông bo góc 8px).
     * Tên công ty kèm huy hiệu xác thực màu xanh #095744.
     * Tiêu đề công việc in đậm cỡ vừa, màu #0F172A (hover chuyển sang #095744).
     * Hàng thông tin nhanh: Mức lương (Icon Dollar, chữ màu xanh ngọc #059669 in đậm), Địa điểm (Icon MapPin), Thời gian đăng.
     * Dải tag kỹ năng yêu cầu (Badges bo tròn nền xám nhạt #F1F5F9, chữ #475569).
     * Nút icon Trái tim lưu tin và nút bấm chính "ỨNG TUYỂN NGAY" (Nền xanh #095744, chữ trắng).
5. Thanh phân trang ở đáy: Các nút số trang [ < ] [ 1 ] [ 2 ] [ 3 ] [ > ], trang đang chọn có nền xanh #095744 chữ trắng.

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Modern Clean SaaS, thoáng đãng, bo góc thẻ 12px, bóng đổ mịn (box-shadow: 0 1px 3px rgba(0,0,0,0.06)).
- Nền trang: Màu xám sáng nhẹ #F8FAFC.
- Nền các thẻ (Cards) & Sidebar: Màu trắng tinh khiết #FFFFFF, viền xám mảnh #E2E8F0. Khi rê chuột (Hover) viền chuyển sang màu xanh chủ đạo #095744 và thẻ nhấc nhẹ 2px.
- Màu chủ đạo: Xanh lục bảo thẫm #095744, hover #0C6E56.
- Mức lương nổi bật: Màu xanh ngọc #059669.
- Nút Ứng tuyển ngay: Nền xanh lục bảo #095744, chữ trắng #FFFFFF.
- Tag kỹ năng: Nền xám nhạt #F1F5F9, chữ #475569, viền #E2E8F0.
