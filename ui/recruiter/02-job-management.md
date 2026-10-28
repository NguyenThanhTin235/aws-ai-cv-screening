# PROMPT STITCH AI: QUẢN LÝ TIN TUYỂN DỤNG & CẤU HÌNH RUBRIC AI (JOB MANAGEMENT & RUBRIC BUILDER)

## [TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng đăng tin tuyển dụng mới và thiết lập các thanh trượt trọng số Rubric (tổng bằng 100%) để AI Bedrock chấm điểm CV tự động.

---

## [BỐ CỤC (LAYOUT)]
* **Header đầu trang:** Nút quay lại, tiêu đề trang và 2 nút hành động *"Lưu bản nháp"* và *"ĐĂNG TIN TUYỂN DỤNG"*.
* **Bố cục thân trang chia 2 cột (Container 1280px):**
  - **Cột trái (58%):** Form nhập thông tin chi tiết của vị trí công việc (JD Form).
  - **Cột phải (42%):** Bảng điều khiển cấu hình trọng số Rubric AI với thanh kiểm tra tổng 100% và các thanh trượt tương tác.

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Cột trái - Thông tin công việc (JD Form):**
   - Ô nhập Tiêu đề vị trí (Text input: *"Senior AWS Cloud Engineer"*).
   - Dropdown chọn Phòng ban và Cấp bậc kinh nghiệm (Middle, Senior, Lead).
   - Ô nhập Mức lương (Khoảng lương từ $2,500 đến $3,500) và Địa điểm làm việc.
   - Ô nhập Tags kỹ năng bắt buộc (Must-have skills: AWS CDK, Node.js, Docker).
   - Ô nhập Tags kỹ năng ưu tiên (Nice-to-have: Terraform, Kubernetes).
   - Khung soạn thảo mô tả công việc (Rich text editor với thanh công cụ: In đậm, Danh sách gạch đầu dòng, Link).
2. **Cột phải - Cấu hình Rubric chấm điểm AI (AI Rubric Builder):**
   - **Hộp cảnh báo tổng trọng số:**
     * Hiển thị: *"TỔNG TRỌNG SỐ: 100% (Hợp lệ)"* kèm thanh đo ngang màu xanh lá.
   - **4 Thanh trượt tiêu chí chấm điểm (Interactive Sliders):**
     * Tiêu chí 1: *"Kinh nghiệm chuyên môn"* - Slider kéo 35% (Kèm ô nhập số 35).
     * Tiêu chí 2: *"Kỹ năng kỹ thuật"* - Slider kéo 30% (Kèm ô nhập số 30).
     * Tiêu chí 3: *"Học vấn & Chứng chỉ"* - Slider kéo 15% (Kèm ô nhập số 15).
     * Tiêu chí 4: *"Văn hóa & Định hướng"* - Slider kéo 20% (Kèm ô nhập số 20).
   - **Cài đặt Điểm sàn đạt yêu cầu (Passing Score):**
     * Ô nhập điểm: `75` / 100 điểm.
     * Chú thích: *"Ứng viên đạt từ 75 điểm trở lên sẽ được AI tự động xếp vào danh sách Tiềm năng phỏng vấn."*

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Hiện đại, trực quan, hỗ trợ kéo thả tiện lợi, bo góc 12px.
* **Nền toàn trang:** Màu tối `#0F172A` (Dark) hoặc `#F8FAFC` (Light).
* **Nền Cột trái (Form):** Màu `#1E293B` (Dark) hoặc trắng `#FFFFFF` (Light), viền xám `#334155`.
* **Nền Cột phải (Rubric AI):** Nền tối có sắc tím công nghệ `rgba(139, 92, 246, 0.08)`, viền tím mảnh `#8B5CF6`.
* **Thanh trượt Slider:** Đường ray xám nhạt `#475569`, nút kéo (Thumb) và đoạn đã chọn màu tím AI `#8B5CF6`.
* **Thanh kiểm tra 100% hợp lệ:** Màu xanh lá ngọc `#10B981`. (Nếu lệch 100% chuyển sang đỏ `#EF4444`).
* **Nút Đăng tin tuyển dụng:** Nền xanh dương điện `#2563EB`, chữ trắng `#FFFFFF`.
