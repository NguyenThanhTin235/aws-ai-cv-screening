HÃY THIẾT KẾ GIAO DIỆN: GIÁM SÁT VẬN HÀNH HỆ THỐNG & QUOTAS (ADMIN SYSTEM OVERVIEW)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Bảng điều khiển dành cho Quản trị viên (System Admin) để giám sát sức khỏe hạ tầng Serverless trên AWS (Textract, Bedrock, SQS, Lambda, DynamoDB), theo dõi hạn mức sử dụng (Quotas) và cảnh báo chi phí trên giao diện sáng chuẩn kỹ thuật.

[BỐ CỤC (LAYOUT)]
- Layout Dashboard quản trị hệ thống giao diện sáng:
  + Sidebar bên trái (240px cố định): Nền trắng #FFFFFF, viền phải #E2E8F0, menu quản trị (Hạ tầng, Dead-Letter Queue, Yêu cầu DSR, Phân quyền).
  + Khu vực làm việc chính (1fr trên nền xám sáng #F8FAFC):
    * Header trên cùng: Tên môi trường (Production us-east-1), trạng thái tổng thể (Hệ thống ổn định 99.98% - đèn xanh #059669), nút làm mới dữ liệu.
    * Hàng 1: 4 Thẻ chỉ số hạ tầng AWS nền trắng (AWS Service Status Cards).
    * Hàng 2: Biểu đồ giám sát thời gian thực (Độ trễ xử lý Lambda & Số lượng Token Bedrock tiêu thụ).
    * Hàng 3: Bảng nhật ký sự kiện hệ thống (System Error & Alert Log).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Bộ 4 thẻ chỉ số hạ tầng AWS:
   - Thẻ trắng bo góc 10px viền #E2E8F0, đổ bóng nhẹ.
   - Thẻ 1: "AWS Textract OCR" (1,240 trang đã bóc tách, Tỷ lệ thành công: 99.4%, Icon FileScan xanh lục #095744).
   - Thẻ 2: "AWS Bedrock Claude Haiku" (382,000 Tokens, Thời gian phản hồi TB: 2.1s, Icon Cpu màu tím #7C3AED).
   - Thẻ 3: "Amazon SQS Queue Depth" (Hàng đợi chính: 2 tin nhắn, Hàng đợi lỗi DLQ: 0 tin nhắn, Icon Layers màu xanh #095744).
   - Thẻ 4: "Ước tính chi phí tháng" ($18.42 / Ngân sách $50.00 - Đạt 36%, Icon DollarSign xanh lục).
2. Biểu đồ giám sát độ trễ & lượng token (CloudWatch Charts):
   - Thẻ card nền trắng bo góc 12px viền #E2E8F0.
   - Biểu đồ đường (Line chart) thể hiện độ trễ của Lambda Worker xử lý CV (đường màu xanh lục #095744).
   - Biểu đồ cột (Bar chart) thể hiện số lượng token Bedrock tiêu thụ (cột màu tím #7C3AED).
3. Bảng cảnh báo và sự kiện hệ thống (System Health Table):
   - Bảng thẻ trắng bo góc 12px viền #E2E8F0.
   - Cột Thời gian, Tên dịch vụ AWS, Loại sự kiện (Info, Warning, Error), Mã lỗi (nếu có), Chi tiết thông báo.
   - Bộ lọc theo mức độ cảnh báo (Tất cả, Cảnh báo vàng, Lỗi đỏ).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Trung tâm vận hành hạ tầng (Cloud Operations NOC), hiện đại, độ tin cậy cao, bo góc 10px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền các thẻ Card & Bảng: Màu trắng tinh khiết #FFFFFF, viền xám #E2E8F0, bóng đổ nhẹ.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Trạng thái khỏe mạnh (Healthy): Xanh ngọc #059669 (kèm chấm đèn led xanh nhấp nháy, nền #ECFDF5).
- Thẻ chi phí và dịch vụ: Màu xanh lục #095744 và tím AI #7C3AED.
- Cảnh báo lỗi: Màu đỏ #DC2626 và cam hổ phách #D97706.
