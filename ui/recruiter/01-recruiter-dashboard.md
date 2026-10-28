HÃY THIẾT KẾ GIAO DIỆN: DASHBOARD TỔNG QUAN TUYỂN DỤNG (RECRUITER OVERVIEW & PIPELINE)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Bảng điều khiển trung tâm dành cho Nhà tuyển dụng (Recruiter) để theo dõi chỉ số phễu tuyển dụng, khối lượng hồ sơ cần duyệt, và phân bổ điểm số AI Bedrock trên giao diện sáng chuyên nghiệp.

[BỐ CỤC (LAYOUT)]
- Layout Dashboard quản trị giao diện sáng chuẩn Enterprise:
  + Sidebar điều hướng bên trái (240px cố định): Nền trắng #FFFFFF, viền phải #E2E8F0, chứa logo xanh #095744 và menu.
  + Khu vực làm việc chính bên phải (1fr trên nền xám sáng #F8FAFC):
    * Header nhỏ trên cùng: Ô tìm kiếm nhanh, icon chuông thông báo (kèm số 3 đỏ), avatar tài khoản.
    * Hàng 1: 4 thẻ KPI chỉ số quan trọng nền trắng (Stat Cards Row).
    * Hàng 2: Bố cục 2 cột (Cột trái 60%: Danh sách chiến dịch tuyển dụng đang mở; Cột phải 40%: Biểu đồ thanh ngang phân bổ dải điểm số AI Bedrock).
    * Hàng 3: Dòng nhật ký hoạt động đánh giá gần đây (Activity Feed).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Sidebar bên trái:
   - Logo doanh nghiệp màu xanh lục bảo #095744.
   - Danh sách menu có icon rõ nét: "Tổng quan" (Active - nền xanh nhạt #E8F4F1, chữ và icon xanh #095744), "Tin tuyển dụng", "Ứng viên", "Bảng xếp hạng", "Đánh giá song song", "Kho tài năng", "Cài đặt".
   - Khung nhỏ ở chân sidebar: Đồng hồ báo hạn mức API Bedrock ("142/500 CV đã chấm tháng này", thanh tiến trình màu #095744).
2. Bộ 4 thẻ chỉ số KPI (Stat Cards):
   - Thẻ trắng bo góc 12px viền #E2E8F0, đổ bóng mịn.
   - Thẻ 1: "Tổng CV tiếp nhận" (Số 148 màu #0F172A, icon FileText màu xanh #095744, nhãn xanh ngọc: +12% tuần này).
   - Thẻ 2: "Đã chấm bằng AI" (Số 142 - 96%, icon Sparkles màu tím #7C3AED, nhãn: Điểm TB: 78đ).
   - Thẻ 3: "Chờ duyệt thủ công" (Số 18 màu #D97706, icon Clock, nhãn màu cam: Ưu tiên cao).
   - Thẻ 4: "Lịch phỏng vấn tuần này" (Số 7 màu #059669, icon Calendar, nhãn xanh ngọc).
3. Bảng tin tuyển dụng đang mở (Active Jobs Table):
   - Thẻ card trắng bo góc 12px viền #E2E8F0.
   - Tiêu đề vị trí (Senior AWS Cloud Engineer, Fullstack React & Node.js, Platform Engineer).
   - Số lượng CV nộp, điểm trung bình AI, thanh tiến trình tỷ lệ hồ sơ đã xử lý màu #095744.
   - Nút "Đánh giá ngay" bên cạnh mỗi vị trí (chữ xanh #095744, nền #E8F4F1, hover nền #095744 chữ trắng).
4. Biểu đồ phân bổ điểm số AI (Score Distribution Chart):
   - Thẻ card trắng bo góc 12px viền #E2E8F0.
   - Các thanh ngang thể hiện tỷ lệ phần trăm theo dải điểm:
     * Dải 90-100đ (Xuất sắc - 8%): Thanh màu xanh ngọc #059669.
     * Dải 80-89đ (Khá tốt - 32%): Thanh màu xanh lục bảo #095744.
     * Dải 70-79đ (Tiềm năng - 41%): Thanh màu tím AI #7C3AED.
     * Dưới 70đ (Cần cân nhắc - 19%): Thanh màu xám #94A3B8.
5. Dòng nhật ký hoạt động gần đây (Audit Feed):
   - Danh sách các hành động có avatar người thực hiện, thời gian, và sự kiện: "Recruiter Linh Nguyễn vừa duyệt phỏng vấn ứng viên #APP-1049", "AI Bedrock hoàn thành chấm điểm CV #APP-1052 (84/100)".

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Dashboard quản trị dữ liệu hiện đại, chuyên nghiệp, bo góc 12px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền Sidebar & các thẻ Card: Màu trắng tinh khiết #FFFFFF, viền mảnh #E2E8F0, bóng đổ nhẹ (box-shadow: 0 1px 3px rgba(0,0,0,0.05)).
- Màu chủ đạo: Xanh lục bảo thẫm #095744, hover #0C6E56, nền nhạt #E8F4F1.
- Màu điểm nhấn AI: Màu tím #7C3AED, nền tím nhạt #F5F3FF.
- Thẻ KPI chờ duyệt: Số màu vàng cam #D97706.
- Thẻ KPI lịch phỏng vấn: Số màu xanh ngọc #059669.
