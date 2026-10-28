HÃY THIẾT KẾ GIAO DIỆN: GIÁM SÁT VẬN HÀNH HỆ THỐNG & QUOTAS (ADMIN SYSTEM OVERVIEW)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Bảng điều khiển dành cho Quản trị viên (System Admin) để giám sát sức khỏe hạ tầng Serverless trên AWS (Textract, Bedrock, SQS, Lambda, DynamoDB), theo dõi hạn mức sử dụng (Quotas) và cảnh báo chi phí.

[BỐ CỤC (LAYOUT)]
- Layout Dashboard quản trị hệ thống:
  + Sidebar bên trái (240px cố định): Menu quản trị (Hạ tầng, Dead-Letter Queue, Yêu cầu DSR, Phân quyền tài khoản).
  + Khu vực làm việc chính (1fr):
    * Header trên cùng: Tên môi trường (Production us-east-1), trạng thái tổng thể (Hệ thống ổn định 99.98%), nút làm mới dữ liệu.
    * Hàng 1: 4 Thẻ chỉ số hạ tầng AWS (AWS Service Status Cards).
    * Hàng 2: Biểu đồ giám sát thời gian thực (Độ trễ xử lý Lambda & Số lượng Token Bedrock tiêu thụ).
    * Hàng 3: Bảng nhật ký sự kiện hệ thống (System Error & Alert Log).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Bộ 4 thẻ chỉ số hạ tầng AWS:
   - Thẻ 1: "AWS Textract OCR" (1,240 trang đã bóc tách, Tỷ lệ thành công: 99.4%, Icon FileScan xanh lá).
   - Thẻ 2: "AWS Bedrock Claude Haiku" (382,000 Tokens, Thời gian phản hồi TB: 2.1s, Icon Cpu màu tím).
   - Thẻ 3: "Amazon SQS Queue Depth" (Hàng đợi chính: 2 tin nhắn, Hàng đợi lỗi DLQ: 0 tin nhắn, Icon Layers).
   - Thẻ 4: "Ước tính chi phí tháng" ($18.42 / Ngân sách $50.00 - Đạt 36%, Icon DollarSign xanh dương).
2. Biểu đồ giám sát độ trễ & lượng token (CloudWatch Charts):
   - Biểu đồ đường (Line chart) thể hiện độ trễ của Lambda Worker xử lý CV qua các khung giờ.
   - Biểu đồ cột (Bar chart) thể hiện số lượng token Bedrock tiêu thụ theo từng ngày trong tuần.
3. Bảng cảnh báo và sự kiện hệ thống (System Health Table):
   - Cột Thời gian, Tên dịch vụ AWS, Loại sự kiện (Info, Warning, Error), Mã lỗi (nếu có), Chi tiết thông báo.
   - Bộ lọc theo mức độ cảnh báo (Tất cả, Cảnh báo vàng, Lỗi đỏ).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Trung tâm vận hành hạ tầng (Cloud Operations NOC), hiện đại, độ tin cậy cao, bo góc 10px.
- Nền toàn trang: Màu tối kỹ thuật #0A0F1D (Dark) hoặc #F8FAFC (Light).
- Nền các thẻ Card: Màu #161F30 (Dark) hoặc trắng #FFFFFF (Light), viền xám #243147.
- Trạng thái khỏe mạnh (Healthy): Xanh lá ngọc #10B981 (kèm chấm đèn led xanh nhấp nháy).
- Thẻ chi phí và Token: Màu xanh dương #2563EB và tím AI #8B5CF6.
- Cảnh báo lỗi: Màu đỏ #EF4444 và cam hổ phách #F59E0B.
