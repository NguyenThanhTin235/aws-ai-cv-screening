HÃY THIẾT KẾ GIAO DIỆN: GIÁM SÁT HÀNG ĐỢI LỖI DEAD-LETTER QUEUE (ADMIN DLQ MONITOR)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Quản trị viên theo dõi các tệp CV hoặc tác vụ xử lý AI bị lỗi sau 3 lần thử lại thất bại (bị đẩy vào SQS Dead-Letter Queue), xem chi tiết nguyên nhân lỗi và bấm kích hoạt xử lý lại (Re-drive / Retry) trên giao diện sáng chuẩn mực.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Tiêu đề "Giám Sát Dead-Letter Queue (Hàng Đợi Lỗi DLQ)", trạng thái hàng đợi, và nút bấm "RE-DRIVE TẤT CẢ (CHẠY LẠI)" (Nền xanh #095744, chữ trắng).
- Hàng trên: 3 Thẻ thống kê lỗi nền trắng (Tổng số tin nhắn lỗi hiện tại, Lỗi bóc tách OCR, Lỗi hạn mức Bedrock).
- Bảng danh sách lỗi trung tâm: Bảng thẻ trắng #FFFFFF bo góc 12px viền #E2E8F0, hiển thị danh sách các thông điệp lỗi kèm nút mở rộng xem chi tiết mã lỗi (Error Stack Trace).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Hàng 3 thẻ thống kê lỗi:
   - Thẻ trắng bo góc 10px viền #E2E8F0, đổ bóng nhẹ.
   - Thẻ 1: "Tổng thông điệp trong DLQ" (Số 3, icon AlertOctagon màu đỏ #DC2626).
   - Thẻ 2: "Lỗi tệp CV hỏng / Không đọc được" (Số 2, icon FileX màu cam #D97706).
   - Thẻ 3: "Lỗi nghẽn hạn mức API (Throttling)" (Số 1, icon ZapOff màu vàng #D97706).
2. Thanh tác vụ trên bảng:
   - Ô tìm kiếm theo applicationId hoặc tên tệp CV (viền #E2E8F0, focus viền #095744).
   - Nút "RE-DRIVE HÀNG LOẠT (BẮT ĐẦU XỬ LÝ LẠI)" (Icon xoay vòng, nút màu xanh lục #095744, chữ trắng).
   - Nút "Xóa sạch hàng đợi (Purge DLQ)" (Nền trắng, viền đỏ #DC2626, chữ đỏ #DC2626).
3. Bảng danh sách lỗi (DLQ Error Table):
   - Cột 1: Mã hồ sơ ứng tuyển (#APP-1082, #APP-1094).
   - Cột 2: Tên tệp CV và đường dẫn S3 (s3://cv-screening-bucket/raw/cv-1082.pdf).
   - Cột 3: Thời điểm đẩy vào DLQ (28/10/2026 15:22:10).
   - Cột 4: Số lần đã thử lại (Retry Count: 3/3).
   - Cột 5: Nguyên nhân lỗi chính (Huy hiệu đỏ: "Textract UnsupportedDocumentException" hoặc "Bedrock ThrottlingException" - nền #FEF2F2, chữ #DC2626).
   - Cột 6: Thao tác:
     * Nút "Chi tiết lỗi" (Nền trắng viền #E2E8F0, chữ #475569, mở modal xem JSON Payload).
     * Nút "Thử lại ngay" (Nền xanh nhạt #E8F4F1, chữ xanh #095744, hover nền #095744 chữ trắng).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Bảng điều khiển gỡ lỗi kỹ thuật, dứt khoát, màu sắc cảnh báo rõ ràng, bo góc 10px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền bảng và thẻ: Màu trắng tinh khiết #FFFFFF, viền xám #E2E8F0, bóng đổ nhẹ.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Cảnh báo lỗi nghiêm trọng: Đỏ #DC2626, nền đỏ nhạt #FEF2F2.
- Nút Re-drive (Chạy lại): Nền xanh lục bảo #095744, hover #0C6E56, chữ trắng #FFFFFF.
- Hộp xem mã code/JSON trong modal: Nền xám đen kỹ thuật #0F172A, chữ xanh lá công nghệ #4ADE80, font chữ đơn cách (Monospace).
