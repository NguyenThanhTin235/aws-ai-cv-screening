# PROMPT STITCH AI: XÉT DUYỆT YÊU CẦU XÓA DỮ LIỆU DSR (ADMIN DSR APPROVAL & AUDIT)

## [TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Quản trị viên hệ thống xét duyệt các yêu cầu xóa tài khoản, ẩn danh hóa dữ liệu (Right to Erasure / Anonymization) do Ứng viên gửi lên để đảm bảo tuân thủ pháp lý Nghị định 13/2023 và GDPR.

---

## [BỐ CỤC (LAYOUT)]
* **Header đầu trang:** Tiêu đề *"Quản Lý & Phê Duyệt Yêu Cầu DSR (Data Subject Requests)"*, nhãn tuân thủ bảo mật, nút xuất biên bản kiểm toán.
* **Hàng trên:** 3 Thẻ trạng thái (Chờ xét duyệt: 2 yêu cầu, Đã hoàn tất xóa: 14 yêu cầu, Bị từ chối: 1 yêu cầu).
* **Bảng danh sách yêu cầu trung tâm:** Hiển thị chi tiết từng yêu cầu xóa, thông tin ứng viên, thời hạn giải quyết theo luật (30 ngày), và các nút phê duyệt.

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Hàng 3 thẻ trạng thái:**
   - Thẻ 1: *"Yêu cầu chờ xử lý"* (Số 2, icon Clock màu cam, hạn chót xử lý trong 72 giờ).
   - Thẻ 2: *"Đã ẩn danh hóa thành công"* (Số 14, icon CheckCircle màu xanh lá).
   - Thẻ 3: *"Từ chối hợp pháp"* (Số 1, icon ShieldAlert màu xám, ví dụ: Ứng viên đang có tranh chấp hợp đồng).
2. **Bảng xét duyệt yêu cầu (DSR Request Table):**
   - **Cột 1:** Mã yêu cầu (`#DSR-2026-042`).
   - **Cột 2:** Ứng viên gửi yêu cầu (Email, Họ tên, ID tài khoản Cognito).
   - **Cột 3:** Ngày gửi và Thời hạn xử lý còn lại (Ví dụ: `Còn 14 ngày`).
   - **Cột 4:** Phạm vi dữ liệu cần xóa:
     * Checkbox xanh: Tệp CV gốc trên S3.
     * Checkbox xanh: Bản ghi ứng tuyển & Điểm AI trên DynamoDB.
     * Checkbox xanh: Tài khoản xác thực Cognito.
   - **Cột 5:** Trạng thái: Badge màu cam *"CHỜ DUYỆT (PENDING APPROVAL)"*.
   - **Cột 6:** Nút thao tác:
     * Nút *"PHÊ DUYỆT XÓA & ẨN DANH"* (Nút màu đỏ rực, kích hoạt Step Function xóa tự động).
     * Nút *"Từ chối"* (Mở modal nhập lý do pháp lý).
3. **Modal Xác Nhận Phê Duyệt Xóa (Approval Dialog):**
   - Hộp thoại hiển thị danh sách các tài nguyên AWS sẽ bị xóa vĩnh viễn (S3 Objects, DynamoDB PII fields).
   - Nút *"Xác nhận phê duyệt và ký biên bản điện tử"*.

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Trang trọng, tuân thủ pháp lý (Legal Compliance), nghiêm túc, bo góc 10px.
* **Nền toàn trang:** Màu tối `#0A0F1D` (Dark) hoặc `#F8FAFC` (Light).
* **Nền bảng và thẻ:** Màu `#161F30` (Dark) hoặc trắng `#FFFFFF` (Light), viền xám `#243147`.
* **Trạng thái Chờ duyệt:** Màu vàng hổ phách `#F59E0B`, nền vàng cam mờ.
* **Trạng thái Đã xóa hoàn tất:** Màu xanh ngọc `#10B981`.
* **Nút Phê duyệt Xóa vĩnh viễn:** Nền màu đỏ `#EF4444`, chữ trắng `#FFFFFF`.
