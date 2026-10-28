# PROMPT STITCH AI: TRANG ĐĂNG NHẬP & CHỌN VAI TRÒ (AUTH & ROLE PICKER)

## [TÊN TRANG & MỤC ĐÍCH]
Trang đăng nhập, đăng ký và chọn vai trò cho Ứng viên (`Candidate`), Nhà tuyển dụng (`Recruiter`), và Quản trị viên (`Admin`) trên nền tảng AWS AI CV Screening.

---

## [BỐ CỤC (LAYOUT)]
* **Chia đôi màn hình 50-50 (Split-screen) trên Desktop, 1 cột căn giữa trên Mobile.**
* **Cột trái (Branding & Trust Panel):**
  - Chiếm 50% màn hình, hiển thị logo, tiêu đề sản phẩm, các điểm nổi bật về công nghệ AI Bedrock và trích dẫn đánh giá của khách hàng.
* **Cột phải (Auth Box):**
  - Khung form đăng nhập căn giữa chiều rộng `420px`, gồm bộ chọn vai trò ở trên cùng, các ô nhập liệu ở giữa, nút bấm hành động và tùy chọn đăng nhập mạng xã hội ở dưới cùng.

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Header phụ góc phải:**
   - Dropdown chọn ngôn ngữ (Tiếng Việt / English).
   - Nút bật/tắt Dark Mode / Light Mode.
2. **Bộ chọn vai trò (Role Tabs):**
   - 2 nút tab dạng thanh trượt: *"Ứng viên tìm việc"* (Icon User) và *"Nhà tuyển dụng"* (Icon Briefcase).
3. **Form đăng nhập:**
   - Ô nhập Email (Input text có icon Mail).
   - Ô nhập Mật khẩu (Input password có icon Lock và nút bấm Mắt ẩn/hiện mật khẩu).
   - Dòng tùy chọn: Checkbox *"Ghi nhớ đăng nhập 30 ngày"* bên trái và Liên kết *"Quên mật khẩu?"* bên phải.
   - Nút bấm chính (Primary Button): *"ĐĂNG NHẬP VÀO HỆ THỐNG"* (kích thước lớn, chiều cao 48px).
4. **Phần đăng nhập mở rộng (Social / SSO):**
   - Đường phân cách có chữ *"Hoặc tiếp tục với"*.
   - Nút đăng nhập tài khoản Google Workspace (Có logo Google màu sắc).
   - Dòng văn bản điều hướng: *"Chưa có tài khoản? Đăng ký miễn phí ngay"*.

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Hiện đại, tối giản, sang trọng (Modern SaaS), bo góc 10px.
* **Cột trái:** Nền tối màu `#0F172A` kết hợp dải gradient tím AI `#8B5CF6` mờ ảo tạo chiều sâu công nghệ. Chữ màu trắng `#F8FAFC`.
* **Cột phải:** Nền thẻ `#1E293B` (Dark) hoặc `#FFFFFF` (Light), viền xám mảnh `#334155`.
* **Nút bấm chính:** Nền xanh dương điện `#2563EB`, chữ trắng `#FFFFFF`, hiệu ứng sáng nhẹ khi di chuột.
* **Trạng thái chọn Tab vai trò:** Tab đang kích hoạt có nền xanh `#2563EB` hoặc tím `#8B5CF6`, tab còn lại màu xám mờ `#64748B`.
