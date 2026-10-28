HÃY THIẾT KẾ GIAO DIỆN: BẢNG XẾP HẠNG ỨNG VIÊN THEO ĐIỂM AI (CANDIDATE LEADERBOARD)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng xem danh sách ứng viên của một vị trí tuyển dụng, được sắp xếp thứ hạng tự động theo điểm số Rubric 100đ của AI Bedrock, lọc dải điểm và duyệt hồ sơ hàng loạt trên giao diện sáng chuyên nghiệp.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Breadcrumb điều hướng, Tiêu đề vị trí công việc, số lượng hồ sơ (34 hồ sơ), và nút "Xuất Excel" (nền trắng viền #E2E8F0, chữ #095744).
- Thanh công cụ lọc phía trên bảng: Nền trắng bo góc 10px viền #E2E8F0, gồm ô tìm kiếm, các dropdown bộ lọc, và nhóm nút thao tác hàng loạt khi chọn checkbox.
- Bảng dữ liệu trung tâm (Data Grid): Thẻ bảng nền trắng #FFFFFF, bo góc 12px, chiếm toàn bộ chiều rộng.
- Ngăn trượt xem nhanh bên phải (Slide-over Drawer 380px): Nền trắng #FFFFFF, đổ bóng lớn sang trái, xuất hiện khi nhấp vào một dòng ứng viên để xem nhanh nhận xét của AI mà không cần rời trang.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Thanh công cụ lọc & Tác vụ hàng loạt:
   - Ô tìm kiếm ứng viên theo tên hoặc từ khóa kỹ năng (viền #E2E8F0, focus viền #095744).
   - Dropdown lọc theo Trạng thái (Tất cả, Đạt chuẩn, Chờ duyệt, Từ chối).
   - Dropdown lọc dải điểm AI (>= 85đ, 75-84đ, < 75đ).
   - Checkbox "Chọn tất cả" kèm 2 nút tác vụ hàng loạt: "Duyệt phỏng vấn" (Nền xanh #095744, chữ trắng) và "Từ chối" (Nền xám nhạt, chữ #475569).
2. Bảng xếp hạng ứng viên (Leaderboard Table):
   - Cột 1: Thứ hạng (#Rank): Huy hiệu Top 1 (Vàng kim #D97706), Top 2 (Bạc #64748B), Top 3 (Đồng #B45309).
   - Cột 2: Thông tin ứng viên: Họ và tên (chữ đậm màu #0F172A), số năm kinh nghiệm, các tags kỹ năng chính.
   - Cột 3: Điểm tổng AI: Huy hiệu tròn (Score Badge) hiển thị số điểm lớn (Ví dụ: 92đ, 86đ, 62đ).
   - Cột 4: Chi tiết 4 tiêu chí Rubric: 4 thanh đo nhỏ thể hiện điểm Kinh nghiệm (Exp), Kỹ thuật (Tech), Bằng cấp (Edu), Văn hóa (Cult).
   - Cột 5: Trạng thái: Nhãn màu: "ĐẠT CHUẨN (SHORTLISTED)" (Xanh ngọc #059669), "CHỜ DUYỆT" (Vàng cam #D97706), "TỪ CHỐI" (Đỏ #DC2626).
   - Cột 6: Thao tác: Nút "Đánh giá chi tiết (Side-by-side)" (Chữ màu #095744, nền #E8F4F1, hover nền #095744 chữ trắng).
3. Ngăn trượt xem nhanh bên phải (Slide-over Drawer):
   - Nền trắng tinh khiết, viền trái #E2E8F0.
   - Tiêu đề tóm tắt nhận xét AI của ứng viên được chọn.
   - 3 Điểm mạnh nổi bật nhất AI phát hiện (Icon tích xanh #059669).
   - 1 Điểm kỹ năng còn thiếu (Icon cảnh báo cam #D97706).
   - Nút bấm chính mở toàn màn hình: "VÀO ĐÁNH GIÁ SONG SONG CHI TIẾT" (Nền xanh lục bảo #095744, chữ trắng #FFFFFF).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Bảng dữ liệu chuyên nghiệp, mật độ thông tin cao, bo góc 12px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền Bảng dữ liệu & Drawer: Màu trắng tinh khiết #FFFFFF, các hàng chẵn/lẻ có màu nền xen kẽ nhẹ #F8FAFC, viền mảnh #E2E8F0.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Huy hiệu điểm AI:
  * Điểm >= 85đ: Màu xanh ngọc #059669 trên nền xanh nhạt #ECFDF5.
  * Điểm 75-84đ: Màu xanh lục bảo #095744 trên nền xanh nhạt #E8F4F1.
  * Điểm dưới 75đ: Màu vàng cam #D97706 hoặc đỏ #DC2626.
- Nút Đánh giá chi tiết: Nền xanh nhạt #E8F4F1, chữ xanh lục #095744, hover nền #095744 chữ trắng.
