# HƯỚNG DẪN PROMPT TỔNG THỂ & TEMPLATE THIẾT KẾ CHO STITCH AI

Tài liệu này cung cấp:
1. **Prompt Tổng Thể (Master Context Prompt):** Dùng để copy vào StitchAI đầu tiên nhằm giúp AI hiểu sâu sắc bối cảnh sản phẩm, bài toán nghiệp vụ, các nhóm người dùng và tôn chỉ thiết kế.
2. **Template Khung Mẫu Chuẩn:** Cấu trúc 4 phần tinh gọn cho các prompt trang con.
3. **Bảng Mã Màu & Phong Cách Chuẩn:** Bảng tra cứu màu sắc đồng bộ toàn hệ thống (Giao diện sáng, màu chủ đạo `#095744`).

---

## 1. PROMPT TỔNG THỂ VỀ DỰ ÁN & NGỮ CẢNH HỆ THỐNG (MASTER CONTEXT PROMPT)

> **Mẹo sử dụng:** Hãy copy toàn bộ khối văn bản trong khung dưới đây và dán vào StitchAI ở đầu phiên làm việc (hoặc mục Project / System Prompt) để AI nắm bắt toàn diện bức tranh sản phẩm trước khi sinh giao diện cho từng trang cụ thể.

```text
BẠN LÀ CHUYÊN GIA THIẾT KẾ UI/UX HÀNG ĐẦU DÀNH CHO NỀN TẢNG CLOUD SAAS HIỆN ĐẠI.

HÃY THIẾT KẾ GIAO DIỆN CHO DỰ ÁN: "AWS AI CV SCREENING PORTAL"
(Cổng Tuyển Dụng Thông Minh Sàng Lọc Hồ Sơ Ứng Viên Bằng Generative AI & AWS Serverless)

1. BỐI CẢNH DỰ ÁN & VẤN ĐỀ CẦN GIẢI QUYẾT:
Hệ thống là giải pháp HR Tech thế hệ mới giúp các doanh nghiệp công nghệ giải quyết bài toán "quá tải hồ sơ" (hàng nghìn CV nộp vào mỗi vị trí), tự động hóa khâu đọc hiểu, bóc tách và chấm điểm sơ loại ứng viên bằng AWS Textract OCR và AWS Bedrock (Claude 3.5 Haiku).
- Tự động khử định kiến tuyển dụng (PII Redaction): Ẩn danh tên tuổi, giới tính, ảnh chân dung trước khi đưa vào mô hình AI để đảm bảo tính công bằng và khách quan.
- Minh bạch tiêu chuẩn đánh giá: Sử dụng thang đo chuẩn hóa Rubric 100đ (Kinh nghiệm 35đ, Kỹ năng kỹ thuật 30đ, Bằng cấp chứng chỉ 15đ, Văn hóa & Định hướng 20đ). Mọi điểm số đều có trích dẫn bằng chứng cụ thể từ nội dung CV.
- Tôn chỉ tối thượng: "Human-in-the-Loop" — AI chỉ đóng vai trò trợ lý đưa ra khuyến nghị; quyền quyết định tuyển dụng, phỏng vấn, từ chối hoặc ghi đè điểm số hoàn toàn thuộc về con người (Recruiter).
- Tuân thủ quyền riêng tư: Tương thích nghiêm ngặt với Nghị định 13/2023/NĐ-CP và GDPR (Ứng viên có quyền kiểm soát thỏa thuận Consent, xuất toàn bộ dữ liệu cá nhân JSON, và yêu cầu xóa vĩnh viễn tài khoản DSR).

2. BA NHÓM ĐỐI TƯỢNG NGƯỜI DÙNG CHÍNH (TARGET PERSONAS):
- Ứng viên (Candidate): Cần cảm giác được tôn trọng, giao diện sáng sủa, an tâm, minh bạch, nắm rõ trạng thái hồ sơ theo thời gian thực và nhận được bản phân tích kỹ năng (Skill Gap Report) mang tính định hướng phát triển bản thân.
- Nhà tuyển dụng (Recruiter / Hiring Manager): Cần không gian làm việc chuyên nghiệp, năng suất cao (Data-dense Pro Workspace), bố cục đối chiếu song song (Side-by-side View: CV gốc đặt cạnh phân tích AI) để kiểm chứng thông tin tức thì, thao tác nhanh bằng phím tắt và dễ dàng tái khám phá nhân tài trong kho lưu trữ.
- Quản trị viên (Admin / DevOps): Cần bảng điều khiển giám sát sức khỏe hạ tầng, theo dõi hạn mức sử dụng API quotas, xử lý hàng đợi lỗi (Dead-Letter Queue) và phê duyệt các yêu cầu xóa dữ liệu pháp lý.

3. TÔN CHỈ THẨM MỸ & BẢN SẮC THỊ GIÁC (VISUAL IDENTITY):
- Phong cách: Modern Enterprise SaaS, Clean & Crisp Light Theme, thanh lịch, tinh tế, đậm tính nhân văn (Human-centric) và chuẩn mực chuyên nghiệp.
- Không gian giao diện: GIAO DIỆN SÁNG (Light Mode) làm chủ đạo. Nền trang xám sáng sạch sẽ (#F8FAFC), các thẻ và bề mặt làm việc bằng nền trắng tinh khiết (#FFFFFF) với bóng đổ siêu mịn (Subtle elevated shadows) và đường viền chia ngăn thanh mảnh (#E2E8F0).
- Màu sắc chủ đạo (Brand Primary): Sử dụng màu Xanh Lục Bảo Thẫm / Deep Forest Emerald (#095744) đại diện cho sự uy tín, bền vững, đạo đức và trí tuệ. Nút bấm chính, điểm nhấn thương hiệu và trạng thái kích hoạt đều dùng tông màu này (#095744, hover: #0C6E56, nền phụ nhạt: #E8F4F1).
- Màu điểm nhấn AI (AI Accent): Tím hoa cà công nghệ (#7C3AED) kết hợp nền tím nhạt (#F5F3FF) để phân biệt trực quan các gợi ý từ Bedrock AI.
- Cấu trúc: Bo góc mềm mại 8-12px, bố cục lưới phân cấp thị giác rõ ràng, độ tương phản văn bản cao (Text #0F172A trên nền trắng đạt chuẩn WCAG 2.1 AA >= 12:1), không gây giật bố cục khi tải dữ liệu AI (Zero CLS < 0.1).
- Tránh các mẫu thiết kế AI sáo mòn: Không dùng nền gradient tím mờ nhạt nhẽo, không dùng emoji làm biểu tượng icon, không dùng nút bấm chung chung như "Submit" mà dùng động từ hành động cụ thể.
```

---

## 2. QUY ĐỊNH CẤU TRÚC TEMPLATE CHO CÁC PROMPT TRANG CON

Khi gửi yêu cầu thiết kế cho từng trang cụ thể trong hệ thống, cấu trúc prompt sẽ tuân thủ 4 phần tinh gọn sau:

```text
[TÊN TRANG & MỤC ĐÍCH]
Mô tả 1-2 câu ngắn gọn về vai trò và nhiệm vụ cốt lõi của màn hình.

[BỐ CỤC (LAYOUT)]
- Dạng bố cục: Giao diện sáng toàn màn hình / 2 cột / 3 cột / Split-screen 50-50 / Dashboard kèm Sidebar.
- Phân vùng: Header trên cùng, Sidebar bên trái, Main Content trung tâm, Sticky Action Bar đáy.
- Đáp ứng: Desktop (1280px+) và Mobile responsive.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
- Liệt kê chi tiết từng phần tử: Thẻ Card trắng, Nút bấm (Button), Bảng (Table), Ô nhập (Input), Thanh trượt (Slider), Tag trạng thái (Badge), Thanh tiến trình (Progress Bar), Hộp thoại (Modal).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách giao diện sáng, màu chủ đạo #095744 và chỉ định mã màu HEX cụ thể cho từng thành phần chính.
```

---

## 3. BẢNG MÃ MÀU CHUẨN TOÀN HỆ THỐNG (SYSTEM COLOR PALETTE)

Để đảm bảo tính nhất quán trên toàn bộ các trang do StitchAI sinh ra, bảng mã màu giao diện sáng sau đây được quy ước áp dụng chung:

| Nhóm Màu | Tên Màu | Mã HEX | Áp Dụng Cho |
|---|---|---|---|
| **Canvas Background** | Clean Slate Light | `#F8FAFC` | Nền tổng thể toàn bộ trang web (Giao diện sáng) |
| **Surface** | Pure Crisp White | `#FFFFFF` | Nền các thẻ Card, Table, Sidebar, Modal, Dropdown |
| **Surface Hover / Alt** | Soft Tint Surface | `#F1F5F9` | Nền hàng bảng xen kẽ, ô input nền mờ |
| **Border Subtle** | Light Gray Border | `#E2E8F0` | Đường viền mảnh chia ngăn các khối |
| **Border Focus** | Primary Green Border | `#095744` | Viền ô input khi chọn, viền thẻ kích hoạt |
| **Text Primary** | Deep Charcoal Slate | `#0F172A` | Tiêu đề h1-h4, chữ số quan trọng, nội dung chính (Tương phản cao) |
| **Text Secondary**| Slate Muted | `#475569` | Chữ phụ, mô tả tính năng, nhãn trường nhập liệu |
| **Text Tertiary** | Light Muted | `#94A3B8` | Placeholder, thời gian, chú thích nhỏ |
| **Brand Primary** | Deep Forest Emerald | `#095744` | Nút bấm chính (Primary CTA), tiêu đề thương hiệu |
| **Brand Hover** | Forest Emerald Hover| `#0C6E56` | Trạng thái di chuột vào nút bấm chính |
| **Brand Tint / Light** | Soft Mint Tint | `#E8F4F1` | Nền badge thương hiệu, tab đang chọn, vùng highlight |
| **AI Accent** | Purple Orchid AI | `#7C3AED` | Điểm nhấn tính năng AI Bedrock, nhãn AI Suggestion |
| **AI Accent Tint** | Soft Purple Tint | `#F5F3FF` | Nền khối nhận xét của AI Bedrock |
| **Status Success**| Emerald Green | `#059669` | Điểm số $\ge 75đ$, Hồ sơ đạt phỏng vấn, Đã nộp thành công (Nền `#ECFDF5`) |
| **Status Warning**| Amber Orange | `#D97706` | Cần xem xét, Hồ sơ chờ duyệt, Khoảng trống kỹ năng (Nền `#FFFBEB`) |
| **Status Danger** | Rose Red | `#DC2626` | Dưới điểm sàn, Từ chối hồ sơ, Yêu cầu xóa dữ liệu DSR (Nền `#FEF2F2`) |
