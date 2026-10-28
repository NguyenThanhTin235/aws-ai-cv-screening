HÃY THIẾT KẾ GIAO DIỆN: MODAL TẢI LÊN CV & CAM KẾT BẢO MẬT (CV UPLOAD & CONSENT MODAL)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Cửa sổ pop-up (Modal) xuất hiện khi ứng viên nhấn nút "ỨNG TUYỂN NGAY", cho phép tải tệp CV (PDF/DOCX) lên hệ thống và ký cam kết xử lý dữ liệu AI.

[BỐ CỤC (LAYOUT)]
- Lớp phủ nền mờ (Backdrop Overlay): Màu đen mờ 60% làm mờ trang web phía sau.
- Hộp thoại Modal căn giữa màn hình: Chiều rộng cố định 540px trên Desktop, bo góc trên chuyển thành Bottom Sheet trên Mobile.
- Cấu trúc 3 phần từ trên xuống:
  + Header: Tiêu đề vị trí và nút đóng (X).
  + Body: Vùng kéo thả file CV, thanh tiến trình upload S3, và hộp checkbox thỏa thuận bảo mật.
  + Footer: 2 nút hành động căn sát lề phải.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Header Modal:
   - Tiêu đề: "Ứng tuyển: Senior AWS Cloud Engineer".
   - Dòng phụ: Tên công ty kèm địa điểm.
   - Nút icon X đóng hộp thoại ở góc trên phải.
2. Khu vực tải lên tệp CV (Drag & Drop Zone):
   - Khung hình chữ nhật viền nét đứt (Dashed border).
   - Icon đám mây tải lên ở giữa.
   - Dòng chữ: "Kéo & thả file CV vào đây, hoặc Duyệt tệp từ máy tính".
   - Ghi chú định dạng: "Hỗ trợ định dạng PDF, DOCX (Dung lượng tối đa 5MB)".
3. Thẻ tệp đã chọn (File Selected Box):
   - Icon tệp tài liệu, tên file Nguyen_Van_A_CV.pdf, dung lượng file (2.4 MB).
   - Nút icon Thùng rác xóa file để chọn lại.
   - Thanh tiến trình tải lên (Progress bar) chạy từ 0% đến 100% kèm nhãn "Đã tải lên an toàn".
4. Hộp cam kết bảo mật & AI Consent:
   - Khung Callout bo góc có icon Khiên bảo mật (Shield).
   - Checkbox 1 (Bắt buộc): "Tôi đồng ý để hệ thống sử dụng AWS Bedrock AI phân tích kỹ năng phục vụ cho vị trí tuyển dụng này."
   - Checkbox 2 (Tùy chọn): "Lưu trữ hồ sơ vào Kho tài năng (Talent Pool) để nhận cơ hội việc làm tương lai."
5. Footer nút bấm:
   - Nút phụ: "Hủy bỏ" (Nút viền xám mờ).
   - Nút chính: "XÁC NHẬN NỘP HỒ SƠ" (Nút nổi bật, chiều cao 44px).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Gọn gàng, tin cậy, an toàn dữ liệu, bo góc 12px.
- Nền Modal: Màu tối #1E293B (Dark) hoặc trắng tinh #FFFFFF (Light).
- Vùng kéo thả: Viền nét đứt màu #475569, nền xám nhạt #0F172A (Dark) hoặc #F1F5F9 (Light). Khi kéo file vào thì viền chuyển sang xanh #2563EB.
- Thanh tiến trình (Progress Bar): Nền ray #334155, vạch tiến trình màu xanh ngọc #10B981.
- Hộp thông tin bảo mật: Nền tím nhạt mờ #8B5CF6 (độ mờ 10%), viền tím mảnh #8B5CF6, chữ tím/trắng.
- Nút bấm chính: Nền xanh dương điện #2563EB, chữ trắng #FFFFFF.
