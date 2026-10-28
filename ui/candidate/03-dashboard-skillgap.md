# PROMPT STITCH AI: DASHBOARD THEO DÕI HỒ SƠ & BÁO CÁO KỸ NĂNG AI (CANDIDATE DASHBOARD)

## [TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên theo dõi tiến độ xử lý của các đơn ứng tuyển đã nộp, xem trạng thái AI chấm điểm, và xem báo cáo phân tích khoảng trống kỹ năng (Skill Gap Analysis).

---

## [BỐ CỤC (LAYOUT)]
* **Cấu trúc 1 cột chính (Container tối đa 1140px căn giữa).**
* **Phần 1 (Đầu trang):** Thanh thống kê 4 thẻ chỉ số nhanh nằm ngang (Metrics Row).
* **Phần 2 (Giữa trang):** Bộ lọc Tab trạng thái và Danh sách các đơn ứng tuyển dạng thẻ lớn (Application Cards).
* **Phần 3 (Khung mở rộng bên trong mỗi thẻ):** Báo cáo phân tích kỹ năng AI chia 2 cột (Kỹ năng đã đáp ứng bên trái vs Kỹ năng còn thiếu bên phải).

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Hàng 4 thẻ chỉ số tổng quan (Metrics Row):**
   - Thẻ 1: *"Tổng đơn đã nộp"* (Số 4).
   - Thẻ 2: *"Đang phân tích AI"* (Số 1).
   - Thẻ 3: *"Được mời phỏng vấn"* (Số 2, số màu xanh lá).
   - Thẻ 4: *"Đã rút đơn"* (Số 1, số màu xám).
2. **Bộ Tab trạng thái:**
   - Các tab bấm chọn: *"Tất cả (4)"*, *"Đang xử lý (3)"*, *"Đã hoàn thành (1)"*.
3. **Thẻ đơn ứng tuyển (Application Tracking Card):**
   - **Phần đầu thẻ:** Tên công ty, tên vị trí tuyển dụng, ngày nộp hồ sơ.
   - **Hệ thống nhãn trạng thái:**
     * Nhãn tiến trình tuyển dụng: Badge *"ĐANG PHỎNG VẤN"* (Màu xanh lá) hoặc *"ĐÃ TIẾP NHẬN"* (Màu xanh dương).
     * Nhãn AI: Huy hiệu *"AI ĐÃ CHẤM XONG"* (Màu tím AI kèm icon tia sáng).
   - **Dòng tiến trình trực quan (Timeline Stepper):**
     * 4 điểm tròn nối nhau bằng thanh ngang: `Đã nộp` $\rightarrow$ `AI Sàng lọc` $\rightarrow$ `Phỏng vấn` $\rightarrow$ `Kết quả`.
   - **Các nút thao tác:**
     * Nút mũi tên gập/mở: *"Xem Báo cáo AI Skill Gap"*.
     * Nút chữ màu đỏ mờ: *"Rút đơn ứng tuyển"*.
4. **Báo cáo AI Skill Gap (Mở ra khi bấm xem chi tiết):**
   - **Cột kỹ năng đạt chuẩn (Bên trái):** Danh sách các kỹ năng với dấu tích xanh (AWS Lambda, DynamoDB, Node.js).
   - **Cột khoảng trống cần bổ sung (Bên phải):** Danh sách kỹ năng còn thiếu với dấu chấm than màu cam (Terraform, Docker Security).
   - **Khung tư vấn phát triển nghề nghiệp:** Hộp chữ bo góc có icon gợi ý, đưa ra lời khuyên từ AI Bedrock về các khóa học hoặc chứng chỉ nên học thêm.

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Hiện đại, khuyến khích ứng viên, bố cục thẻ rõ ràng, bo góc 12px.
* **Nền trang:** Màu `#0F172A` (Dark) hoặc `#F8FAFC` (Light).
* **Nền thẻ đơn ứng tuyển:** Màu `#1E293B` (Dark) hoặc `#FFFFFF` (Light), viền mảnh `#334155`.
* **Trạng thái Đạt phỏng vấn:** Chữ và viền màu xanh ngọc `#10B981`, nền xanh nhạt mờ.
* **Huy hiệu AI Bedrock:** Màu tím neon `#8B5CF6`, nền tím mờ `#8B5CF6` (độ mờ 15%).
* **Thanh tiến trình Timeline:** Đoạn đã hoàn thành có màu xanh lá `#10B981`, đoạn đang chờ có màu xám `#475569`.
* **Nút Rút đơn:** Chữ đỏ nhạt `#EF4444`, không màu nền.
