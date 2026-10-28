# PROMPT STITCH AI: GIÁM SÁT HÀNG ĐỢI LỖI DEAD-LETTER QUEUE (ADMIN DLQ MONITOR)

## [TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Quản trị viên theo dõi các tệp CV hoặc tác vụ xử lý AI bị lỗi sau 3 lần thử lại thất bại (bị đẩy vào SQS Dead-Letter Queue), xem chi tiết nguyên nhân lỗi và bấm kích hoạt xử lý lại (Re-drive / Retry).

---

## [BỐ CỤC (LAYOUT)]
* **Header đầu trang:** Tiêu đề *"Giám Sát Dead-Letter Queue (Hàng Đợi Lỗi DLQ)"*, trạng thái hàng đợi, và nút bấm *"RE-DRIVE TẤT CẢ (CHẠY LẠI)"*.
* **Hàng trên:** 3 Thẻ thống kê lỗi (Tổng số tin nhắn lỗi hiện tại, Lỗi bóc tách OCR, Lỗi hạn mức Bedrock).
* **Bảng danh sách lỗi trung tâm:** Danh sách các thông điệp lỗi dạng bảng kèm nút mở rộng xem chi tiết mã lỗi (Error Stack Trace).

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Hàng 3 thẻ thống kê lỗi:**
   - Thẻ 1: *"Tổng thông điệp trong DLQ"* (Số 3, icon AlertOctagon màu đỏ).
   - Thẻ 2: *"Lỗi tệp CV hỏng / Không đọc được"* (Số 2, icon FileX).
   - Thẻ 3: *"Lỗi nghẽn hạn mức API (Throttling)"* (Số 1, icon ZapOff màu vàng).
2. **Thanh tác vụ trên bảng:**
   - Ô tìm kiếm theo `applicationId` hoặc tên tệp CV.
   - Nút *"RE-DRIVE HÀNG LOẠT (BẮT ĐẦU XỬ LÝ LẠI)"* (Icon xoay vòng, nút màu xanh lá).
   - Nút *"Xóa sạch hàng đợi (Purge DLQ)"* (Nút đỏ cảnh báo).
3. **Bảng danh sách lỗi (DLQ Error Table):**
   - **Cột 1:** Mã hồ sơ ứng tuyển (`#APP-1082`, `#APP-1094`).
   - **Cột 2:** Tên tệp CV và đường dẫn S3 (`s3://cv-screening-bucket/raw/cv-1082.pdf`).
   - **Cột 3:** Thời điểm đẩy vào DLQ (`28/10/2026 15:22:10`).
   - **Cột 4:** Số lần đã thử lại (Retry Count: `3/3`).
   - **Cột 5:** Nguyên nhân lỗi chính (Huy hiệu đỏ: *"Textract UnsupportedDocumentException"* hoặc *"Bedrock ThrottlingException"*).
   - **Cột 6:** Thao tác:
     * Nút *"Chi tiết lỗi"* (Mở modal xem toàn bộ đoạn mã JSON Payload và Stack trace).
     * Nút *"Thử lại ngay"* (Đẩy tin nhắn ngược lại hàng đợi chính SQS).

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Bảng điều khiển gỡ lỗi kỹ thuật (Debugging & Operations), dứt khoát, màu sắc cảnh báo rõ ràng, bo góc 10px.
* **Nền toàn trang:** Màu tối `#0A0F1D` (Dark) hoặc `#F8FAFC` (Light).
* **Nền bảng và thẻ:** Màu `#161F30` (Dark) hoặc trắng `#FFFFFF` (Light), viền xám `#243147`.
* **Cảnh báo lỗi nghiêm trọng:** Đỏ hồng `#EF4444`, nền đỏ mờ.
* **Nút Re-drive (Chạy lại):** Nền xanh lá `#10B981`, chữ trắng.
* **Mã code và Stack Trace trong modal:** Nền đen tuyền `#050811`, chữ xanh lá kỹ thuật `#4ADE80`, font chữ đơn cách (Monospace).
