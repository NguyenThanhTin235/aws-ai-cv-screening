HÃY THIẾT KẾ GIAO DIỆN: DASHBOARD THEO DÕI HỒ SƠ & BÁO CÁO KỸ NĂNG AI (CANDIDATE DASHBOARD & SKILL GAP)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Ứng viên theo dõi tiến độ xử lý của các đơn ứng tuyển đã nộp, xem trạng thái AI chấm điểm, và xem báo cáo phân tích khoảng trống kỹ năng (Skill Gap Analysis) trên nền giao diện sáng tinh tế.

[BỐ CỤC (LAYOUT)]
- Cấu trúc 1 cột chính (Container tối đa 1140px căn giữa trên nền xám sáng #F8FAFC).
- Phần 1 (Đầu trang): Thanh thống kê 4 thẻ chỉ số nhanh nền trắng nằm ngang (Metrics Row).
- Phần 2 (Giữa trang): Bộ lọc Tab trạng thái và Danh sách các đơn ứng tuyển dạng thẻ trắng lớn (Application Cards).
- Phần 3 (Khung mở rộng bên trong mỗi thẻ): Báo cáo phân tích kỹ năng AI chia 2 cột (Kỹ năng đã đáp ứng bên trái vs Kỹ năng còn thiếu bên phải).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Hàng 4 thẻ chỉ số tổng quan (Metrics Row):
   - Thẻ 1: "Tổng đơn đã nộp" (Số 4, màu xanh #095744).
   - Thẻ 2: "Đang phân tích AI" (Số 1, màu tím AI #7C3AED).
   - Thẻ 3: "Được mời phỏng vấn" (Số 2, màu xanh ngọc #059669).
   - Thẻ 4: "Đã rút đơn" (Số 1, màu xám #94A3B8).
2. Bộ Tab trạng thái:
   - Các tab bấm chọn: "Tất cả (4)", "Đang xử lý (3)", "Đã hoàn thành (1)". Tab đang chọn có gạch chân màu xanh #095744 và chữ đậm.
3. Thẻ đơn ứng tuyển (Application Tracking Card):
   - Nền trắng tinh bo góc 12px viền mảnh #E2E8F0.
   - Phần đầu thẻ: Tên công ty, tên vị trí tuyển dụng, ngày nộp hồ sơ.
   - Hệ thống nhãn trạng thái:
     * Nhãn tiến trình tuyển dụng: Badge "ĐANG PHỎNG VẤN" (Màu xanh ngọc #059669, nền #ECFDF5) hoặc "ĐÃ TIẾP NHẬN" (Màu xanh dương #0284C7, nền #F0F9FF).
     * Nhãn AI: Huy hiệu "AI ĐÃ CHẤM XONG" (Màu tím AI #7C3AED, nền tím nhạt #F5F3FF kèm icon tia sáng).
   - Dòng tiến trình trực quan (Timeline Stepper):
     * 4 điểm tròn nối nhau bằng thanh ngang: Đã nộp -> AI Sàng lọc -> Phỏng vấn -> Kết quả. Nấc hoàn thành có màu xanh #095744.
   - Các nút thao tác:
     * Nút mũi tên gập/mở: "Xem Báo cáo AI Skill Gap" (màu #095744).
     * Nút chữ màu đỏ mờ: "Rút đơn ứng tuyển" (màu đỏ #DC2626).
4. Báo cáo AI Skill Gap (Mở ra khi bấm xem chi tiết):
   - Nền xanh ngọc nhạt #F4F9F8 bo góc 8px viền #E2E8F0.
   - Cột kỹ năng đạt chuẩn (Bên trái): Danh sách các kỹ năng với dấu tích xanh #059669 (AWS Lambda, DynamoDB, Node.js).
   - Cột khoảng trống cần bổ sung (Bên phải): Danh sách kỹ năng còn thiếu với dấu chấm than màu cam #D97706 (Terraform, Docker Security).
   - Khung tư vấn phát triển nghề nghiệp: Hộp chữ nền trắng bo góc viền tím nhạt #7C3AED, đưa ra lời khuyên từ AI Bedrock về các khóa học hoặc chứng chỉ nên học thêm.

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), hiện đại, khích lệ ứng viên, bố cục thẻ rõ ràng, bo góc 12px.
- Nền trang: Màu xám sáng nhẹ #F8FAFC.
- Nền thẻ đơn ứng tuyển: Màu trắng tinh khiết #FFFFFF, viền mảnh #E2E8F0, bóng đổ nhẹ.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Trạng thái Đạt phỏng vấn: Chữ màu xanh ngọc #059669, nền xanh nhạt #ECFDF5.
- Huy hiệu AI Bedrock: Màu tím #7C3AED, nền tím nhạt #F5F3FF.
- Thanh tiến trình Timeline: Đoạn đã hoàn thành có màu xanh #095744, đoạn đang chờ có màu xám #CBD5E1.
- Nút Rút đơn: Chữ đỏ nhạt #DC2626, hover có nền đỏ nhạt #FEF2F2.
