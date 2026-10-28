HÃY THIẾT KẾ GIAO DIỆN: TRANG ĐĂNG NHẬP & CHỌN VAI TRÒ (AUTHENTICATION & ROLE PICKER)
Dự án: AWS AI CV Screening Portal (Hệ thống tuyển dụng thông minh bằng AWS Bedrock & Serverless)

[TÊN TRANG & MỤC ĐÍCH]
Trang đăng nhập, đăng ký và chọn vai trò cho Ứng viên (Candidate), Nhà tuyển dụng (Recruiter), và Quản trị viên (Admin) trên nền tảng AWS AI CV Screening với giao diện sáng chuyên nghiệp.

[BỐ CỤC (LAYOUT)]
- Dạng layout: Giao diện sáng chia đôi màn hình 50-50 (Split-screen) trên Desktop (1280px+), 1 cột căn giữa trên Mobile.
- Cột trái (Branding & Trust Panel - 50%): Nền xanh lục bảo đậm #095744 kết hợp hoa văn lưới tinh tế, hiển thị logo trắng, tiêu đề sản phẩm, các điểm nổi bật về công nghệ AI Bedrock và trích dẫn đánh giá của khách hàng.
- Cột phải (Auth Box - 50%): Nền trắng sáng tinh khiết #FFFFFF, khung form đăng nhập căn giữa chiều rộng 420px, gồm bộ chọn vai trò ở trên cùng, các ô nhập liệu ở giữa, nút bấm hành động và tùy chọn đăng nhập mạng xã hội ở dưới cùng.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. Header phụ góc phải: Dropdown chọn ngôn ngữ (Tiếng Việt / English).
2. Bộ chọn vai trò (Role Tabs): 2 nút tab dạng thanh trượt: "Ứng viên tìm việc" (Icon User) và "Nhà tuyển dụng" (Icon Briefcase).
3. Form đăng nhập:
   - Ô nhập Email (Input text có icon Mail, viền xám mảnh #E2E8F0, khi chọn có viền xanh #095744).
   - Ô nhập Mật khẩu (Input password có icon Lock và nút bấm Mắt ẩn/hiện mật khẩu).
   - Dòng tùy chọn: Checkbox "Ghi nhớ đăng nhập 30 ngày" bên trái và liên kết "Quên mật khẩu?" màu xanh #095744 bên phải.
   - Nút bấm chính: "ĐĂNG NHẬP VÀO HỆ THỐNG" (Full-width, chiều cao 48px, nền xanh lục #095744, chữ trắng #FFFFFF).
4. Phần đăng nhập mở rộng (Social / SSO):
   - Đường phân cách có chữ "Hoặc tiếp tục với".
   - Nút đăng nhập tài khoản Google Workspace (Nền trắng, viền #E2E8F0, logo Google đa sắc).
   - Dòng văn bản điều hướng: "Chưa có tài khoản? Đăng ký miễn phí ngay" (Liên kết màu #095744 in đậm).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Giao diện sáng (Light Theme), Modern Enterprise SaaS, trang nhã, tin cậy, bo góc 10px.
- Cột trái (Branding): Nền xanh lục bảo thẫm #095744, chữ màu trắng #FFFFFF, các huy hiệu tính năng nền xanh nhạt mờ rgba(255,255,255,0.15).
- Cột phải (Form đăng nhập): Nền trắng tinh khiết #FFFFFF, chữ chính màu đen than #0F172A, chữ phụ xám tro #475569.
- Nút bấm chính: Nền xanh lục bảo #095744, hover chuyển sang #0C6E56, chữ trắng #FFFFFF.
- Trạng thái chọn Tab vai trò: Tab đang chọn có nền xanh nhạt #E8F4F1, chữ và icon màu xanh đậm #095744, viền #095744. Tab chưa chọn có nền trong suốt, chữ xám #64748B.
