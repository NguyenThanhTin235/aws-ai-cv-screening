HÃY THIẾT KẾ GIAO DIỆN: MODAL TẢI LÊN CV & CAM KẾT BẢO MẬT (CV UPLOAD & CONSENT MODAL)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Cửa sổ pop-up (Modal) xuất hiện khi ứng viên nhấn nút "ỨNG TUYỂN NGAY", cho phép tải tệp CV (PDF/DOCX) lên hệ thống và ký cam kết xử lý dữ liệu AI trên nền giao diện sáng trang nhã.

[BỐ CỤC (LAYOUT)]
- Lớp phủ nền mờ (Backdrop Overlay): Màu đen mờ 40% làm mờ trang web phía sau.
- Hộp thoại Modal căn giữa màn hình: Nền trắng tinh #FFFFFF, chiều rộng cố định 540px trên Desktop, bo góc trên chuyển thành Bottom Sheet trên Mobile.
- Cấu trúc 3 phần từ trên xuống:
  + Header: Tiêu đề vị trí và nút đóng (X).
  + Body: Vùng kéo thả file CV, thanh tiến trình upload S3, và hộp checkbox thỏa thuận bảo mật.
  + Footer: 2 nút hành động căn sát lề phải.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Header Modal:
   - Tiêu đề: "Ứng tuyển: Senior AWS Cloud Engineer" (chữ đậm màu #0F172A).
   - Dòng phụ: Tên công ty kèm địa điểm (màu xám #475569).
   - Nút icon X đóng hộp thoại ở góc trên phải.
2. Khu vực tải lên tệp CV (Drag & Drop Zone):
   - Khung hình chữ nhật viền nét đứt màu xanh #095744 (hoặc xám mảnh #CBD5E1), nền xanh ngọc rất nhạt #F4F9F8.
   - Icon đám mây tải lên màu xanh #095744 ở giữa.
   - Dòng chữ: "Kéo & thả file CV vào đây, hoặc Duyệt tệp từ máy tính".
   - Ghi chú định dạng: "Hỗ trợ định dạng PDF, DOCX (Dung lượng tối đa 5MB)".
3. Thẻ tệp đã chọn (File Selected Box):
   - Nền trắng viền #E2E8F0, icon tệp tài liệu, tên file Nguyen_Van_A_CV.pdf, dung lượng file (2.4 MB).
   - Nút icon Thùng rác xóa file để chọn lại (màu đỏ #DC2626).
   - Thanh tiến trình tải lên (Progress bar) chạy từ 0% đến 100% kèm nhãn "Đã tải lên an toàn".
4. Hộp cam kết bảo mật & AI Consent:
   - Khung Callout nền xanh ngọc nhạt #E8F4F1 bo góc 8px viền mảnh #095744 (độ mờ 20%), có icon Khiên bảo mật màu xanh #095744.
   - Checkbox 1 (Bắt buộc): "Tôi đồng ý để hệ thống sử dụng AWS Bedrock AI phân tích kỹ năng phục vụ cho vị trí tuyển dụng này."
   - Checkbox 2 (Tùy chọn): "Lưu trữ hồ sơ vào Kho tài năng (Talent Pool) để nhận cơ hội việc làm tương lai."
5. Footer nút bấm:
   - Nút phụ: "Hủy bỏ" (Nền trắng, viền xám #E2E8F0, chữ #475569).
   - Nút chính: "XÁC NHẬN NỘP HỒ SƠ" (Nền xanh lục bảo #095744, chữ trắng #FFFFFF, chiều cao 44px).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), gọn gàng, tin cậy, chuẩn mực an toàn dữ liệu, bo góc 12px.
- Nền Modal: Màu trắng tinh khiết #FFFFFF, đổ bóng lớn mịn (box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1)).
- Vùng kéo thả: Viền nét đứt màu #095744, nền xanh ngọc nhạt #F4F9F8. Khi kéo file vào thì nền chuyển sang #E8F4F1.
- Thanh tiến trình (Progress Bar): Nền ray #E2E8F0, vạch tiến trình màu xanh lục bảo #095744.
- Hộp thông tin bảo mật: Nền xanh ngọc nhạt #E8F4F1, viền #095744 (mờ 30%), chữ xanh thẫm #095744.
- Nút bấm chính: Nền xanh lục bảo #095744, hover #0C6E56, chữ trắng #FFFFFF.
