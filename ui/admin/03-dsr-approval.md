HÃY THIẾT KẾ GIAO DIỆN: XÉT DUYỆT YÊU CẦU XÓA DỮ LIỆU DSR (ADMIN DSR APPROVAL & AUDIT)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Quản trị viên hệ thống xét duyệt các yêu cầu xóa tài khoản, ẩn danh hóa dữ liệu (Right to Erasure / Anonymization) do Ứng viên gửi lên để đảm bảo tuân thủ pháp lý Nghị định 13/2023 và GDPR trên giao diện sáng chuẩn mực.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Tiêu đề "Quản Lý & Phê Duyệt Yêu Cầu DSR (Data Subject Requests)", nhãn tuân thủ bảo mật, nút xuất biên bản kiểm toán (nền trắng viền #E2E8F0, chữ #095744).
- Hàng trên: 3 Thẻ trạng thái nền trắng (Chờ xét duyệt: 2 yêu cầu, Đã hoàn tất xóa: 14 yêu cầu, Bị từ chối: 1 yêu cầu).
- Bảng danh sách yêu cầu trung tâm: Bảng thẻ trắng #FFFFFF bo góc 12px viền #E2E8F0, hiển thị chi tiết từng yêu cầu xóa, thông tin ứng viên, thời hạn giải quyết theo luật (30 ngày), và các nút phê duyệt.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Hàng 3 thẻ trạng thái:
   - Thẻ trắng bo góc 10px viền #E2E8F0, đổ bóng nhẹ.
   - Thẻ 1: "Yêu cầu chờ xử lý" (Số 2, icon Clock màu cam #D97706, hạn chót xử lý trong 72 giờ).
   - Thẻ 2: "Đã ẩn danh hóa thành công" (Số 14, icon CheckCircle màu xanh lục #095744).
   - Thẻ 3: "Từ chối hợp pháp" (Số 1, icon ShieldAlert màu xám #64748B, ví dụ: Ứng viên đang có tranh chấp hợp đồng).
2. Bảng xét duyệt yêu cầu (DSR Request Table):
   - Cột 1: Mã yêu cầu (#DSR-2026-042).
   - Cột 2: Ứng viên gửi yêu cầu (Email, Họ tên chữ đậm màu #0F172A, ID tài khoản Cognito).
   - Cột 3: Ngày gửi và Thời hạn xử lý còn lại (Ví dụ: Còn 14 ngày).
   - Cột 4: Phạm vi dữ liệu cần xóa:
     * Checkbox xanh: Tệp CV gốc trên S3.
     * Checkbox xanh: Bản ghi ứng tuyển & Điểm AI trên DynamoDB.
     * Checkbox xanh: Tài khoản xác thực Cognito.
   - Cột 5: Trạng thái: Badge màu cam "CHỜ DUYỆT (PENDING APPROVAL)" - nền #FFFBEB, chữ #D97706.
   - Cột 6: Nút thao tác:
     * Nút "PHÊ DUYỆT XÓA & ẨN DANH" (Nút màu đỏ #DC2626, chữ trắng #FFFFFF, kích hoạt Step Function xóa tự động).
     * Nút "Từ chối" (Nền trắng viền #E2E8F0, chữ #475569).
3. Modal Xác Nhận Phê Duyệt Xóa (Approval Dialog):
   - Hộp thoại nền trắng hiển thị danh sách các tài nguyên AWS sẽ bị xóa vĩnh viễn (S3 Objects, DynamoDB PII fields).
   - Nút "Xác nhận phê duyệt và ký biên bản điện tử" (Nền đỏ #DC2626, chữ trắng).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Trang trọng, tuân thủ pháp lý (Legal Compliance), nghiêm túc, bo góc 10px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền bảng và thẻ: Màu trắng tinh khiết #FFFFFF, viền xám mảnh #E2E8F0, bóng đổ nhẹ.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Trạng thái Chờ duyệt: Màu vàng hổ phách #D97706, nền vàng cam mờ #FFFBEB.
- Trạng thái Đã xóa hoàn tất: Màu xanh ngọc #059669 (hoặc xanh #095744), nền #ECFDF5.
- Nút Phê duyệt Xóa vĩnh viễn: Nền màu đỏ #DC2626, hover #B91C1C, chữ trắng #FFFFFF.
