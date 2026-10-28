HÃY THIẾT KẾ GIAO DIỆN: QUẢN LÝ TIN TUYỂN DỤNG & CẤU HÌNH RUBRIC AI (JOB MANAGEMENT & RUBRIC BUILDER)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng đăng tin tuyển dụng mới và thiết lập các thanh trượt trọng số Rubric (tổng bằng 100%) để AI Bedrock chấm điểm CV tự động trên giao diện sáng thanh lịch.

[BỐ CỤC (LAYOUT)]
- Header đầu trang: Nút quay lại, tiêu đề trang và 2 nút hành động "Lưu bản nháp" (nền trắng viền #E2E8F0) và "ĐĂNG TIN TUYỂN DỤNG" (nền xanh #095744 chữ trắng).
- Bố cục thân trang chia 2 cột (Container 1280px căn giữa trên nền xám sáng #F8FAFC):
  + Cột trái (58%): Form nhập thông tin chi tiết của vị trí công việc (JD Form) trên thẻ card trắng.
  + Cột phải (42%): Bảng điều khiển cấu hình trọng số Rubric AI trên thẻ card trắng viền xanh ngọc nhạt #E8F4F1 với thanh kiểm tra tổng 100% và các thanh trượt tương tác.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Cột trái - Thông tin công việc (JD Form):
   - Thẻ card nền trắng bo góc 12px viền #E2E8F0.
   - Ô nhập Tiêu đề vị trí (Text input: "Senior AWS Cloud Engineer", viền #E2E8F0, focus viền #095744).
   - Dropdown chọn Phòng ban và Cấp bậc kinh nghiệm (Middle, Senior, Lead).
   - Ô nhập Mức lương (Khoảng lương từ $2,500 đến $3,500) và Địa điểm làm việc.
   - Ô nhập Tags kỹ năng bắt buộc (Must-have skills: AWS CDK, Node.js, Docker - tag nền xanh nhạt #E8F4F1, chữ #095744).
   - Ô nhập Tags kỹ năng ưu tiên (Nice-to-have: Terraform, Kubernetes - tag nền xám #F1F5F9, chữ #475569).
   - Khung soạn thảo mô tả công việc (Rich text editor với thanh công cụ: In đậm, Danh sách gạch đầu dòng, Link).
2. Cột phải - Cấu hình Rubric chấm điểm AI (AI Rubric Builder):
   - Thẻ card nền trắng bo góc 12px viền #E2E8F0, đổ bóng nhẹ.
   - Hộp cảnh báo tổng trọng số:
     * Hiển thị: "TỔNG TRỌNG SỐ: 100% (Hợp lệ)" kèm thanh đo ngang màu xanh lục bảo #095744 trên nền ray #E2E8F0.
   - 4 Thanh trượt tiêu chí chấm điểm (Interactive Sliders):
     * Tiêu chí 1: "Kinh nghiệm chuyên môn" - Slider kéo 35% (Kèm ô nhập số 35, con trượt thumb màu #095744).
     * Tiêu chí 2: "Kỹ năng kỹ thuật" - Slider kéo 30% (Kèm ô nhập số 30, con trượt thumb màu #095744).
     * Tiêu chí 3: "Học vấn & Chứng chỉ" - Slider kéo 15% (Kèm ô nhập số 15, con trượt thumb màu #095744).
     * Tiêu chí 4: "Văn hóa & Định hướng" - Slider kéo 20% (Kèm ô nhập số 20, con trượt thumb màu #095744).
   - Cài đặt Điểm sàn đạt yêu cầu (Passing Score):
     * Ô nhập điểm: 75 / 100 điểm.
     * Chú thích: "Ứng viên đạt từ 75 điểm trở lên sẽ được AI tự động xếp vào danh sách Tiềm năng phỏng vấn."

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), hiện đại, trực quan, hỗ trợ kéo thả tiện lợi, bo góc 12px.
- Nền toàn trang: Màu xám sáng nhẹ #F8FAFC.
- Nền Cột trái (Form) & Cột phải (Rubric): Màu trắng tinh khiết #FFFFFF, viền xám mảnh #E2E8F0.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Thanh trượt Slider: Đường ray xám nhạt #E2E8F0, nút kéo (Thumb) và đoạn đã chọn màu xanh lục bảo #095744.
- Thanh kiểm tra 100% hợp lệ: Màu xanh lục bảo #095744 (kèm dấu tích xanh #059669). Nếu lệch 100% chuyển sang đỏ #DC2626.
- Nút Đăng tin tuyển dụng: Nền xanh lục bảo #095744, hover #0C6E56, chữ trắng #FFFFFF.
