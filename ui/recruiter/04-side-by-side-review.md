HÃY THIẾT KẾ GIAO DIỆN: MÀN HÌNH ĐÁNH GIÁ SONG SONG (SIDE-BY-SIDE REVIEW & OVERRIDE)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Màn hình cốt lõi nhất của hệ thống. Không gian làm việc kép (Dual-pane 50-50) trên giao diện sáng chuẩn Enterprise dành cho Nhà tuyển dụng đối chiếu trực tiếp tệp CV gốc (PDF/DOCX) với kết quả phân tích Rubric 100đ của AI Bedrock, nhập ghi chú, ghi đè điểm số và ra quyết định phỏng vấn.

[BỐ CỤC (LAYOUT)]
- Toàn màn hình không cuộn tổng thể (Fullscreen height: 100vh trên nền sáng #F8FAFC):
  + Header cố định trên cùng (60px): Nền trắng #FFFFFF viền đáy #E2E8F0, nút quay lại danh sách, tên ứng viên, mã hồ sơ (#APP-1049), và trạng thái hiện tại.
  + Thân trang chia đôi 50-50 (Dual-pane Split Workspace):
    * Nửa trái (50%): Trình xem tài liệu CV gốc (PDF/Document Viewer) trên nền xám kỹ thuật dịu #F1F5F9 có thanh cuộn riêng.
    * Nửa phải (50%): Bảng chi tiết phân tích AI Rubric nền trắng #FFFFFF, Form ghi chú & Ghi đè điểm của Recruiter, và Lịch sử đánh giá của đồng nghiệp (Audit Trail) có thanh cuộn riêng.
  + Thanh tác vụ dán đáy (Sticky Decision Action Bar): Nền trắng #FFFFFF viền trên #E2E8F0, ghim cố định ở chân nửa màn hình bên phải để bấm duyệt/từ chối ngay lập tức.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]

Phần A - Nửa Trái: Trình Xem CV Gốc (PDF Viewer)
1. Thanh công cụ xem tài liệu (Viewer Toolbar):
   - Nền trắng #FFFFFF, viền đáy #E2E8F0.
   - Nút thu nhỏ / phóng to (- / +), ô tỷ lệ phần trăm (100%).
   - Bộ chọn trang (Trang 1 / 2) kèm 2 nút mũi tên chuyển trang.
   - Ô tìm kiếm từ khóa trong CV và nút Tải xuống tệp gốc (màu #095744).
2. Khung hiển thị tài liệu CV (Document Canvas):
   - Nền trang giấy trắng tinh khiết đặt trên nền xám dịu #F1F5F9, đổ bóng nhẹ.
   - Hiển thị văn bản CV với font chữ rõ nét.
   - Các đoạn văn bản chứa bằng chứng được đánh dấu nổi bật bằng dải màu vàng hổ phách nhạt (Highlight #FEF3C7 viền cam #F59E0B).

Phần B - Nửa Phải: Phân Tích AI Rubric, Form Đánh Giá & Quyết Định
1. Hộp tổng điểm & Huy hiệu AI:
   - Điểm tổng lớn: 82 / 100 ĐIỂM (Huy hiệu tròn màu xanh lục #095744 trên nền xanh nhạt #E8F4F1).
   - Nhãn kết luận: "Đạt Chuẩn Phỏng Vấn (Ngưỡng yêu cầu: 75đ)".
   - Huy hiệu cảnh báo: "AI Suggestion — Quyết định cuối cùng thuộc về Recruiter" (Huy hiệu tím #7C3AED, nền #F5F3FF).
2. 4 Thẻ phân tích tiêu chí Rubric (Rubric Accordion Cards):
   - Tiêu chí 1: Kinh nghiệm liên quan (30/35đ):
     * Thanh tiến trình điểm đạt màu #095744.
     * Hộp trích dẫn bằng chứng từ CV (Evidence Quote): "3 năm thiết kế kiến trúc Serverless trên AWS..." kèm nút bấm [Xem tại Trang 1 CV] màu xanh #095744.
   - Tiêu chí 2: Kỹ năng kỹ thuật (24/30đ):
     * Danh sách kỹ năng khớp (Pill tags màu xanh lục #095744, nền #E8F4F1: AWS Lambda, DynamoDB, Node.js).
     * Danh sách kỹ năng còn thiếu (Pill tags màu cam #D97706, nền #FFFBEB: Terraform, Kubernetes).
   - Tiêu chí 3: Học vấn & Chứng chỉ (14/15đ):
     * Xác nhận bằng Đại học và chứng chỉ AWS Certified Solutions Architect.
   - Tiêu chí 4: Văn hóa & Định hướng (14/20đ):
     * Phân tích tính ổn định công việc và mục tiêu nghề nghiệp.
3. Khu vực Đánh giá Thủ công & Ghi đè điểm (Score Override):
   - Checkbox: "Ghi đè điểm số AI của ứng viên này".
   - Thanh trượt điều chỉnh điểm số thủ công (Slider kéo từ 82đ lên 88đ, màu xanh #095744).
   - Ô văn bản nhập lý do điều chỉnh: "Ứng viên có kỹ năng AWS CDK rất sâu, bù được khoảng trống kiến thức về Terraform." (Viền #E2E8F0, focus viền #095744).
   - Xếp hạng sao thủ công (Rating: 1 đến 5 sao màu vàng #F59E0B).
4. Nhật ký đánh giá của các Reviewer khác (Audit Trail):
   - Danh sách ghi chú từ Tech Lead và HR Manager kèm thời gian và điểm số đề xuất.
5. Thanh nút bấm hành động dán đáy (Sticky Action Bar):
   - Nút 1: "Yêu cầu AI chấm lại" (Nền trắng, viền #7C3AED, chữ tím #7C3AED).
   - Nút 2: "Lưu vào Kho tài năng" (Nền trắng, viền #095744, chữ xanh #095744).
   - Nút 3: "TỪ CHỐI HỒ SƠ" (Nút viền đỏ #DC2626, chữ đỏ #DC2626, hover nền #FEF2F2).
   - Nút 4: "DUYỆT PHỎNG VẤN" (Nút màu xanh lục bảo #095744, chữ trắng #FFFFFF, chiều cao 44px, hover #0C6E56).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Không gian làm việc chuyên sâu (Pro-workspace), hiện đại, độ tập trung cao.
- Nền khung PDF Viewer (Nửa trái): Màu xám kỹ thuật dịu mắt #F1F5F9.
- Nền phân tích AI (Nửa phải): Màu trắng tinh khiết #FFFFFF, viền ngăn cách #E2E8F0.
- Màu chủ đạo: Xanh lục bảo thẫm #095744.
- Đoạn trích dẫn bằng chứng (Evidence Quote): Nền vàng nhạt #FFFBEB, viền trái màu vàng hổ phách #D97706, chữ nghiêng.
- Điểm tổng AI (82đ): Màu xanh lục #095744 trên nền xanh nhạt #E8F4F1.
- Nút Duyệt phỏng vấn: Nền xanh lục bảo #095744, hover #0C6E56, chữ trắng #FFFFFF.
- Nút Từ chối hồ sơ: Chữ đỏ #DC2626, viền đỏ #DC2626.
- Nút Yêu cầu chấm lại: Viền tím AI #7C3AED, chữ tím #7C3AED.
