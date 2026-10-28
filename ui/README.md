# THƯ MỤC PROMPT THIẾT KẾ GIAO DIỆN CHO STITCH AI (UI PROMPTS INDEX)

Thư mục này chứa toàn bộ các prompt tinh gọn, được chuẩn hóa chuyên biệt để copy trực tiếp vào công cụ **StitchAI** (hoặc các AI Design Agent) nhằm tạo ra giao diện web hiện đại, thẩm mỹ cao cho hệ thống **AWS AI CV Screening Portal**.

Các prompt đều tuân thủ nguyên tắc: **Không quy định code chi tiết, chỉ tập trung mô tả rõ ràng 3 yếu tố cốt lõi: Bố cục (Layout) — Thành phần giao diện (Components) — Màu sắc & Phong cách (Colors & Style)**.

---

## 1. Hướng Dẫn & Quy Định Chung
* [Template Chung Cho StitchAI](file:///d:/AWS/workshop/ui/00-template-chung.md): Quy định cấu trúc khung mẫu chuẩn và bảng tra cứu mã màu HEX dùng chung toàn hệ thống.

---

## 2. Danh Sách Prompt Chi Tiết Từng Trang

### A. Phân Hệ Xác Thực & Đăng Nhập (Auth)
1. [Trang Đăng nhập & Chọn vai trò](file:///d:/AWS/workshop/ui/auth/login-register.md): Đăng nhập đa vai trò (Ứng viên / Nhà tuyển dụng), xác thực hai lớp MFA, đăng nhập Google SSO.

### B. Phân Hệ Ứng Viên (Candidate Portal)
2. [Trang Tìm kiếm & Lọc việc làm](file:///d:/AWS/workshop/ui/candidate/01-job-search.md): Tìm kiếm việc làm, thanh bên bộ lọc kỹ năng/mức lương/địa điểm, danh sách thẻ công việc trực quan.
3. [Modal Nộp CV & Cam kết bảo mật](file:///d:/AWS/workshop/ui/candidate/02-apply-modal.md): Hộp thoại tải tệp PDF/DOCX lên S3, thanh tiến trình upload, và checkbox đồng ý xử lý AI (Consent).
4. [Dashboard Theo dõi hồ sơ & Báo cáo kỹ năng](file:///d:/AWS/workshop/ui/candidate/03-dashboard-skillgap.md): Theo dõi tiến độ hồ sơ theo thời gian thực và báo cáo phân tích khoảng trống kỹ năng từ AI Bedrock.
5. [Cổng Quyền riêng tư & DSR Xóa dữ liệu](file:///d:/AWS/workshop/ui/candidate/04-privacy-dsr.md): Quản lý công tắc Consent, tải xuống toàn bộ dữ liệu cá nhân (JSON), và yêu cầu xóa tài khoản vĩnh viễn.

### C. Phân Hệ Nhà Tuyển Dụng (Recruiter Portal)
6. [Dashboard Tổng quan Tuyển dụng](file:///d:/AWS/workshop/ui/recruiter/01-recruiter-dashboard.md): Bảng điều khiển phễu tuyển dụng, 4 thẻ chỉ số KPI, biểu đồ phân bổ điểm số AI, và nhật ký hoạt động.
7. [Quản lý Tin tuyển dụng & Cấu hình Rubric AI](file:///d:/AWS/workshop/ui/recruiter/02-job-management.md): Soạn thảo tin JD và trình kéo thanh trượt 4 tiêu chí trọng số Rubric (tổng bằng 100%).
8. [Bảng Xếp hạng Ứng viên theo điểm AI](file:///d:/AWS/workshop/ui/recruiter/03-candidate-leaderboard.md): Bảng dữ liệu xếp hạng ứng viên theo điểm số Bedrock Rubric, ngăn trượt xem nhanh nhận xét AI.
9. [Màn hình Đánh giá Song song (Side-by-side Review)](file:///d:/AWS/workshop/ui/recruiter/04-side-by-side-review.md): **Màn hình cốt lõi nhất** — Không gian làm việc kép 50-50: Xem CV gốc đối chiếu nhận xét AI Rubric 100đ, trích dẫn bằng chứng, ghi đè điểm số thủ công, và thanh tác vụ duyệt phỏng vấn.
10. [Kho Tài năng & Tái khám phá ứng viên AI](file:///d:/AWS/workshop/ui/recruiter/05-talent-pool.md): Tìm kiếm ứng viên tiềm năng từ các đợt tuyển dụng trước bằng câu lệnh ngôn ngữ tự nhiên.

### D. Phân Hệ Quản Trị Hệ Thống (Admin Portal)
11. [Giám sát Vận hành & Quotas Hạ tầng](file:///d:/AWS/workshop/ui/admin/01-system-overview.md): Giám sát trạng thái hoạt động của AWS Textract, Bedrock Claude, SQS, DynamoDB và theo dõi ngân sách chi phí.
12. [Giám sát Hàng đợi lỗi Dead-Letter Queue](file:///d:/AWS/workshop/ui/admin/02-dlq-monitor.md): Theo dõi các CV lỗi xử lý và nút kích hoạt Re-drive / Retry chạy lại tác vụ.
13. [Xét duyệt & Kiểm toán Yêu cầu DSR](file:///d:/AWS/workshop/ui/admin/03-dsr-approval.md): Cổng phê duyệt các yêu cầu xóa dữ liệu của ứng viên đảm bảo tuân thủ Nghị định 13/2023 và GDPR.

---

## 3. Cách Sử Dụng Với StitchAI

1. Mở trang StitchAI (hoặc giao diện AI Design tương ứng).
2. Mở file prompt tương ứng với trang bạn muốn thiết kế.
3. Copy toàn bộ nội dung từ tiêu đề `[TÊN TRANG & MỤC ĐÍCH]` đến hết phần `[MÀU SẮC & PHONG CÁCH]`.
4. Dán vào StitchAI và nhấn tạo giao diện.
