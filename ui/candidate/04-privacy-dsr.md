HÃY THIẾT KẾ GIAO DIỆN: QUYỀN RIÊNG TƯ & DSR XÓA DỮ LIỆU CÁ NHÂN (CANDIDATE PRIVACY & DSR SETTINGS)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên quản lý quyền đồng ý chia sẻ dữ liệu (Consent), tải xuống toàn bộ dữ liệu cá nhân dạng JSON (DSR Export), và yêu cầu xóa vĩnh viễn tài khoản (Right to Erasure) theo Nghị định 13/2023 và GDPR.

[BỐ CỤC (LAYOUT)]
- Cấu trúc 1 cột trung tâm (Container tối đa 760px).
- Gồm 3 khối thẻ xếp chồng từ trên xuống dưới:
  + Khối 1: Quản lý các công tắc quyền đồng ý (Consent Settings).
  + Khối 2: Tải xuống hồ sơ dữ liệu cá nhân (Data Portability).
  + Khối 3: Vùng nguy hiểm - Yêu cầu xóa vĩnh viễn tài khoản (Danger Zone).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Tiêu đề trang: Tiêu đề h2 "Quyền Riêng Tư & Bảo Mật Dữ Liệu", kèm dòng mô tả ngắn về chính sách bảo mật dữ liệu.
2. Khối 1: Cài đặt quyền đồng ý (Consent Preferences):
   - Công tắc gạt (Switch toggle): "Cho phép lưu hồ sơ vào Kho tài năng (Talent Pool) để doanh nghiệp tìm kiếm cơ hội tương lai".
   - Công tắc gạt (Switch toggle): "Đồng ý sử dụng dữ liệu ẩn danh để cải thiện độ chính xác của AI Bedrock".
   - Dòng ghi chú thời gian cập nhật lần cuối.
   - Nút "LƯU CÀI ĐẶT" (Nút xanh dương).
3. Khối 2: Xuất dữ liệu cá nhân (Data Export Card):
   - Icon tải xuống tệp dữ liệu (DownloadCloud).
   - Đoạn văn bản giải thích: "Bạn có quyền tải bản sao lưu đầy đủ thông tin cá nhân, lịch sử ứng tuyển và kết quả đánh giá kỹ năng ở định dạng JSON tiêu chuẩn."
   - Nút bấm "TẢI XUỐNG DỮ LIỆU CỦA TÔI (.JSON)" (Nút viền xám nổi bật).
4. Khối 3: Vùng nguy hiểm — Yêu cầu xóa tài khoản (Danger Zone Card):
   - Khung viền màu đỏ cảnh báo.
   - Icon cảnh báo tam giác màu đỏ.
   - Đoạn văn bản: "Thao tác này sẽ kích hoạt quy trình xóa toàn bộ file CV trên AWS S3, ẩn danh hóa thông tin định danh và hủy tư cách tài khoản. Thao tác này KHÔNG THỂ khôi phục."
   - Nút bấm "YÊU CẦU XÓA TÀI KHOẢN VĨNH VIỄN" (Nút màu đỏ rực).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Nghiêm túc, minh bạch, bảo mật cao, bo góc 12px.
- Nền trang: Màu tối #0F172A (Dark) hoặc xám sáng #F8FAFC (Light).
- Nền khối 1 & 2: Màu #1E293B (Dark) hoặc trắng #FFFFFF (Light), viền xám #334155.
- Công tắc Switch: Màu xanh lá cây #10B981 khi bật (ON), màu xám xỉn #475569 khi tắt (OFF).
- Nền khối 3 (Danger Zone): Nền tối có sắc đỏ nhạt rgba(239, 68, 68, 0.08), viền đỏ nét liền #EF4444.
- Nút Xóa vĩnh viễn: Nền màu đỏ #EF4444, chữ trắng, hover chuyển sang đỏ đậm #DC2626.
