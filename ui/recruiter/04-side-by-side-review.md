HÃY THIẾT KẾ GIAO DIỆN: MÀN HÌNH ĐÁNH GIÁ SONG SONG (SIDE-BY-SIDE REVIEW & OVERRIDE)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Màn hình cốt lõi nhất của hệ thống. Không gian làm việc kép (Dual-pane 50-50) dành cho Nhà tuyển dụng đối chiếu trực tiếp tệp CV gốc (PDF/DOCX) với kết quả phân tích Rubric 100đ của AI Bedrock, nhập ghi chú, ghi đè điểm số và ra quyết định phỏng vấn.

[BỐ CỤC (LAYOUT)]
- Toàn màn hình không cuộn tổng thể (Fullscreen height: 100vh):
  + Header cố định trên cùng (60px): Nút quay lại danh sách, tên ứng viên, mã hồ sơ (#APP-1049), và trạng thái hiện tại.
  + Thân trang chia đôi 50-50 (Dual-pane Split Workspace):
    * Nửa trái (50%): Trình xem tài liệu CV gốc (PDF/Document Viewer) có thanh cuộn riêng.
    * Nửa phải (50%): Bảng chi tiết phân tích AI Rubric, Form ghi chú & Ghi đè điểm của Recruiter, và Lịch sử đánh giá của đồng nghiệp (Audit Trail) có thanh cuộn riêng.
  + Thanh tác vụ dán đáy (Sticky Decision Action Bar): Ghim cố định ở chân nửa màn hình bên phải để bấm duyệt/từ chối ngay lập tức.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]

Phần A - Nửa Trái: Trình Xem CV Gốc (PDF Viewer)
1. Thanh công cụ xem tài liệu (Viewer Toolbar):
   - Nút thu nhỏ / phóng to (- / +), ô tỷ lệ phần trăm (100%).
   - Bộ chọn trang (Trang 1 / 2) kèm 2 nút mũi tên chuyển trang.
   - Ô tìm kiếm từ khóa trong CV và nút Tải xuống tệp gốc.
2. Khung hiển thị tài liệu CV (Document Canvas):
   - Hiển thị văn bản CV với font chữ rõ nét.
   - Các đoạn văn bản chứa bằng chứng được đánh dấu nổi bật bằng dải màu vàng (Highlight).

Phần B - Nửa Phải: Phân Tích AI Rubric, Form Đánh Giá & Quyết Định
1. Hộp tổng điểm & Huy hiệu AI:
   - Điểm tổng lớn: 82 / 100 ĐIỂM (Huy hiệu tròn màu xanh nổi bật).
   - Nhãn kết luận: "Đạt Chuẩn Phỏng Vấn (Ngưỡng yêu cầu: 75đ)".
   - Huy hiệu cảnh báo: "AI Suggestion — Quyết định cuối cùng thuộc về Recruiter".
2. 4 Thẻ phân tích tiêu chí Rubric (Rubric Accordion Cards):
   - Tiêu chí 1: Kinh nghiệm liên quan (30/35đ):
     * Thanh tiến trình điểm đạt.
     * Hộp trích dẫn bằng chứng từ CV (Evidence Quote): "3 năm thiết kế kiến trúc Serverless trên AWS..." kèm nút bấm [Xem tại Trang 1 CV].
   - Tiêu chí 2: Kỹ năng kỹ thuật (24/30đ):
     * Danh sách kỹ năng khớp (Pill tags màu xanh lá: AWS Lambda, DynamoDB, Node.js).
     * Danh sách kỹ năng còn thiếu (Pill tags màu cam: Terraform, Kubernetes).
   - Tiêu chí 3: Học vấn & Chứng chỉ (14/15đ):
     * Xác nhận bằng Đại học và chứng chỉ AWS Certified Solutions Architect.
   - Tiêu chí 4: Văn hóa & Định hướng (14/20đ):
     * Phân tích tính ổn định công việc và mục tiêu nghề nghiệp.
3. Khu vực Đánh giá Thủ công & Ghi đè điểm (Score Override):
   - Checkbox: "Ghi đè điểm số AI của ứng viên này".
   - Thanh trượt điều chỉnh điểm số thủ công (Slider kéo từ 82đ lên 88đ).
   - Ô văn bản nhập lý do điều chỉnh: "Ứng viên có kỹ năng AWS CDK rất sâu, bù được khoảng trống kiến thức về Terraform."
   - Xếp hạng sao thủ công (Rating: 1 đến 5 sao).
4. Nhật ký đánh giá của các Reviewer khác (Audit Trail):
   - Danh sách ghi chú từ Tech Lead và HR Manager kèm thời gian và điểm số đề xuất.
5. Thanh nút bấm hành động dán đáy (Sticky Action Bar):
   - Nút 1: "Yêu cầu AI chấm lại" (Icon xoay vòng).
   - Nút 2: "Lưu vào Kho tài năng" (Icon Bookmark).
   - Nút 3: "TỪ CHỐI HỒ SƠ" (Nút màu đỏ viền mờ).
   - Nút 4: "DUYỆT PHỎNG VẤN" (Nút màu xanh lá rực rỡ, chiều cao 44px).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Không gian làm việc chuyên sâu (Pro-workspace), hiện đại, độ tập trung cao.
- Nền khung PDF Viewer (Nửa trái): Màu xám kỹ thuật #0B1120 (Dark) hoặc xám nhạt #E2E8F0 (Light) để trang giấy CV nổi bật.
- Nền phân tích AI (Nửa phải): Màu #1E293B (Dark) hoặc trắng #FFFFFF (Light), viền ngăn cách #334155.
- Đoạn trích dẫn bằng chứng (Evidence Quote): Nền vàng nhạt rgba(245, 158, 11, 0.1), viền trái màu vàng hổ phách #F59E0B, chữ nghiêng.
- Điểm tổng AI (82đ): Màu xanh ngọc #10B981 kèm vòng sáng nhẹ.
- Nút Duyệt phỏng vấn: Nền xanh lá #10B981, chữ trắng #FFFFFF.
- Nút Từ chối hồ sơ: Chữ đỏ #EF4444, viền đỏ #EF4444.
- Nút Yêu cầu chấm lại: Viền tím AI #8B5CF6, chữ tím #8B5CF6.
