HÃY THIẾT KẾ GIAO DIỆN: BẢNG XẾP HẠNG ỨNG VIÊN THEO ĐIỂM AI (CANDIDATE LEADERBOARD)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng xem danh sách ứng viên của một vị trí tuyển dụng, được sắp xếp thứ hạng tự động theo điểm số Rubric 100đ của AI Bedrock, lọc dải điểm và duyệt hồ sơ hàng loạt.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Breadcrumb điều hướng, Tiêu đề vị trí công việc, số lượng hồ sơ (34 hồ sơ), và nút "Xuất Excel".
- Thanh công cụ lọc phía trên bảng: Ô tìm kiếm, các dropdown bộ lọc, và nhóm nút thao tác hàng loạt khi chọn checkbox.
- Bảng dữ liệu trung tâm (Data Grid): Chiếm toàn bộ chiều rộng với các cột thông tin rõ ràng.
- Ngăn trượt xem nhanh bên phải (Slide-over Drawer 380px): Xuất hiện khi nhấp vào một dòng ứng viên để xem nhanh nhận xét của AI mà không cần rời trang.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Thanh công cụ lọc & Tác vụ hàng loạt:
   - Ô tìm kiếm ứng viên theo tên hoặc từ khóa kỹ năng.
   - Dropdown lọc theo Trạng thái (Tất cả, Đạt chuẩn, Chờ duyệt, Từ chối).
   - Dropdown lọc dải điểm AI (>= 85đ, 75-84đ, < 75đ).
   - Checkbox "Chọn tất cả" kèm 2 nút tác vụ hàng loạt: "Duyệt phỏng vấn" (Xanh lá) và "Từ chối" (Xám).
2. Bảng xếp hạng ứng viên (Leaderboard Table):
   - Cột 1: Thứ hạng (#Rank): Huy hiệu Top 1 (Huy hiệu Vàng), Top 2 (Bạc), Top 3 (Đồng).
   - Cột 2: Thông tin ứng viên: Họ và tên, số năm kinh nghiệm, các tags kỹ năng chính.
   - Cột 3: Điểm tổng AI: Huy hiệu tròn (Score Badge) hiển thị số điểm lớn (Ví dụ: 92đ, 86đ, 62đ).
   - Cột 4: Chi tiết 4 tiêu chí Rubric: 4 thanh đo nhỏ thể hiện điểm Kinh nghiệm (Exp), Kỹ thuật (Tech), Bằng cấp (Edu), Văn hóa (Cult).
   - Cột 5: Trạng thái: Nhãn màu: "ĐẠT CHUẨN (SHORTLISTED)", "CHỜ DUYỆT", "TỪ CHỐI".
   - Cột 6: Thao tác: Nút "Đánh giá chi tiết (Side-by-side)".
3. Ngăn trượt xem nhanh bên phải (Slide-over Drawer):
   - Tiêu đề tóm tắt nhận xét AI của ứng viên được chọn.
   - 3 Điểm mạnh nổi bật nhất AI phát hiện.
   - 1 Điểm kỹ năng còn thiếu.
   - Nút bấm chính mở toàn màn hình: "VÀO ĐÁNH GIÁ SONG SONG CHI TIẾT".

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Bảng dữ liệu chuyên nghiệp, mật độ thông tin cao, bo góc 12px.
- Nền toàn trang: Màu tối #0F172A (Dark) hoặc #F8FAFC (Light).
- Nền Bảng dữ liệu: Màu #1E293B (Dark) hoặc trắng #FFFFFF (Light), các hàng xen kẽ màu nền mờ nhẹ.
- Huy hiệu điểm AI:
  * Điểm >= 85đ: Màu xanh ngọc #10B981 (kèm vòng sáng nhẹ).
  * Điểm 75-84đ: Màu xanh dương điện #2563EB.
  * Điểm dưới 75đ: Màu vàng cam #F59E0B hoặc đỏ #EF4444.
- Huy hiệu Top 1-3: Viền kim loại ánh kim #F59E0B (Vàng), #94A3B8 (Bạc), #CD7F32 (Đồng).
- Nút Đánh giá chi tiết: Nền xanh tím AI #8B5CF6, chữ trắng #FFFFFF.
