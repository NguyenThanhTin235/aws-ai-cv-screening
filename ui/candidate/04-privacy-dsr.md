HÃY THIẾT KẾ GIAO DIỆN: QUYỀN RIÊNG TƯ & DSR XÓA DỮ LIỆU CÁ NHÂN (CANDIDATE PRIVACY & DSR SETTINGS)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên quản lý quyền đồng ý chia sẻ dữ liệu (Consent), tải xuống toàn bộ dữ liệu cá nhân dạng JSON (DSR Export), và yêu cầu xóa vĩnh viễn tài khoản (Right to Erasure) theo Nghị định 13/2023 trên giao diện sáng chuẩn mực.

[BỐ CỤC (LAYOUT)]
- Cấu trúc 1 cột trung tâm (Container tối đa 760px căn giữa trên nền xám sáng #F8FAFC).
- Gồm 3 khối thẻ trắng xếp chồng từ trên xuống dưới:
  + Khối 1: Quản lý các công tắc quyền đồng ý (Consent Settings).
  + Khối 2: Tải xuống hồ sơ dữ liệu cá nhân (Data Portability).
  + Khối 3: Vùng nguy hiểm - Yêu cầu xóa vĩnh viễn tài khoản (Danger Zone).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Tiêu đề trang: Tiêu đề h2 "Quyền Riêng Tư & Bảo Mật Dữ Liệu" (màu #0F172A), kèm dòng mô tả ngắn về chính sách bảo mật dữ liệu (màu #475569).
2. Khối 1: Cài đặt quyền đồng ý (Consent Preferences):
   - Thẻ trắng bo góc 12px viền #E2E8F0.
   - Công tắc gạt (Switch toggle): "Cho phép lưu hồ sơ vào Kho tài năng (Talent Pool) để doanh nghiệp tìm kiếm cơ hội tương lai".
   - Công tắc gạt (Switch toggle): "Đồng ý sử dụng dữ liệu ẩn danh để cải thiện độ chính xác của AI Bedrock".
   - Dòng ghi chú thời gian cập nhật lần cuối.
   - Nút "LƯU CÀI ĐẶT" (Nền xanh lục #095744, chữ trắng #FFFFFF).
3. Khối 2: Xuất dữ liệu cá nhân (Data Export Card):
   - Thẻ trắng bo góc 12px viền #E2E8F0.
   - Icon tải xuống tệp dữ liệu màu xanh #095744.
   - Đoạn văn bản giải thích: "Bạn có quyền tải bản sao lưu đầy đủ thông tin cá nhân, lịch sử ứng tuyển và kết quả đánh giá kỹ năng ở định dạng JSON tiêu chuẩn."
   - Nút bấm "TẢI XUỐNG DỮ LIỆU CỦA TÔI (.JSON)" (Nền trắng, viền #095744, chữ xanh #095744, hover nền #E8F4F1).
4. Khối 3: Vùng nguy hiểm — Yêu cầu xóa tài khoản (Danger Zone Card):
   - Thẻ nền trắng viền đỏ nét liền #DC2626 (hoặc nền đỏ siêu nhạt #FEF2F2).
   - Icon cảnh báo tam giác màu đỏ #DC2626.
   - Đoạn văn bản: "Thao tác này sẽ kích hoạt quy trình xóa toàn bộ file CV trên AWS S3, ẩn danh hóa thông tin định danh và hủy tư cách tài khoản. Thao tác này KHÔNG THỂ khôi phục."
   - Nút bấm "YÊU CẦU XÓA TÀI KHOẢN VĨNH VIỄN" (Nút màu đỏ rực #DC2626, chữ trắng #FFFFFF).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), nghiêm túc, minh bạch, bảo mật cao, bo góc 12px.
- Nền trang: Màu xám sáng nhẹ #F8FAFC.
- Nền khối 1 & 2: Màu trắng tinh khiết #FFFFFF, viền xám mảnh #E2E8F0, bóng đổ nhẹ.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Công tắc Switch: Màu xanh lục bảo #095744 khi bật (ON), màu xám nhạt #CBD5E1 khi tắt (OFF).
- Khối 3 (Danger Zone): Nền đỏ nhạt #FEF2F2, viền đỏ #DC2626.
- Nút Xóa vĩnh viễn: Nền màu đỏ #DC2626, chữ trắng, hover chuyển sang đỏ đậm #B91C1C.
