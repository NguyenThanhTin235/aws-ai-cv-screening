HÃY THIẾT KẾ GIAO DIỆN: KHO TÀI NĂNG & TÁI KHÁM PHÁ ỨNG VIÊN BẰNG AI (TALENT POOL & REDISCOVERY)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng tìm kiếm, tái khám phá các ứng viên tiềm năng đã lưu trong Kho tài năng (Talent Pool) từ các đợt tuyển dụng trước bằng câu lệnh ngôn ngữ tự nhiên (AI Semantic Search) trên giao diện sáng thông minh.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Tiêu đề "Kho Tài Năng & Tái Khám Phá Ứng Viên", số lượng hồ sơ khả dụng (128 ứng viên tiềm năng).
- Khung tìm kiếm AI thông minh (AI Prompt Bar): Nổi bật ở vị trí trung tâm trên cùng trên thẻ card trắng viền xanh #095744.
- Thân trang chia 2 phần (trên nền xám sáng #F8FAFC):
  + Bộ lọc nhanh theo thẻ kỹ năng và phòng ban ở bên trái (240px) trên thẻ trắng.
  + Danh sách thẻ ứng viên tiềm năng (Candidate Talent Cards) xếp theo dạng lưới 2 cột ở bên phải (1fr).

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Khung tìm kiếm thông minh bằng AI (AI Prompt Bar):
   - Thẻ card nền trắng bo góc 12px viền #E2E8F0, bóng đổ nhẹ.
   - Ô nhập câu lệnh ngôn ngữ tự nhiên lớn với icon Tia sáng AI màu xanh #095744 (Lucide Sparkles).
   - Placeholder gợi ý: "Ví dụ: Tìm ứng viên từng nộp vị trí Backend có trên 3 năm kinh nghiệm AWS và DynamoDB..."
   - Nút bấm chính: "TÁI KHÁM PHÁ BẰNG AI" (Nền xanh lục bảo #095744, chữ trắng #FFFFFF, icon Search).
   - Dòng gợi ý nhanh: [AWS Serverless] [Node.js Tech Lead] [Python Data Engineer] (nền xanh nhạt #E8F4F1, chữ #095744).
2. Bộ lọc nhanh bên trái:
   - Thẻ card trắng bo góc 12px viền #E2E8F0.
   - Lọc theo Vị trí từng ứng tuyển.
   - Lọc theo Thời gian lưu trữ (3 tháng gần đây, 6 tháng, 1 năm).
   - Lọc theo Mức độ sẵn sàng chuyển việc (Sẵn sàng ngay, Đang cân nhắc).
3. Thẻ ứng viên trong Kho tài năng (Talent Card):
   - Thẻ card trắng bo góc 12px viền #E2E8F0, hover viền #095744 và nhấc nhẹ.
   - Đầu thẻ: Họ tên ứng viên (hoặc mã ẩn danh PII nếu chưa mở khóa), vị trí hiện tại.
   - Huy hiệu độ phù hợp AI (AI Match Score): Huy hiệu phần trăm màu xanh lục (Ví dụ: Khớp 89% với yêu cầu mới - nền #E8F4F1, chữ #095744).
   - Tóm tắt năng lực cốt lõi: 2 dòng ngắn gọn do Bedrock tóm tắt điểm mạnh nổi trội (màu #475569).
   - Tags kỹ năng: Dải tags kỹ năng công nghệ chính (nền #F1F5F9, chữ #475569).
   - Thông tin nguồn gốc: "Từng ứng tuyển vị trí Senior Cloud Dev vào Tháng 08/2026 (Điểm cũ: 81/100)".
   - Nút hành động:
     * Nút "Xem lại hồ sơ CV" (nền trắng viền #E2E8F0, chữ #475569).
     * Nút "GỬI LỜI MỜI ỨNG TUYỂN" (Nền xanh lục bảo #095744, chữ trắng #FFFFFF).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), hiện đại, thông minh, mang đậm dấu ấn công nghệ AI, bo góc 12px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền Khung tìm kiếm AI & Thẻ ứng viên: Màu trắng tinh khiết #FFFFFF, viền xám mảnh #E2E8F0.
- Màu chủ đạo: Xanh lục bảo thẫm #095744, hover #0C6E56.
- Huy hiệu độ khớp AI: Màu xanh lục #095744 trên nền xanh nhạt #E8F4F1.
- Nút Tái khám phá AI: Nền xanh lục bảo #095744, chữ trắng #FFFFFF.
- Nút Gửi lời mời ứng tuyển: Nền xanh lục bảo #095744, chữ trắng #FFFFFF.
