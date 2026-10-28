# PROMPT STITCH AI: KHO TÀI NĂNG & TÁI KHÁM PHÁ AI (TALENT POOL & REDISCOVERY)

## [TÊN TRANG & MỤC ĐÍCH]
Trang dành cho Nhà tuyển dụng tìm kiếm, tái khám phá các ứng viên tiềm năng đã lưu trong Kho tài năng (Talent Pool) từ các đợt tuyển dụng trước bằng câu lệnh ngôn ngữ tự nhiên (AI Semantic Search).

---

## [BỐ CỤC (LAYOUT)]
* **Header đầu trang:** Tiêu đề *"Kho Tài Năng & Tái Khám Phá Ứng Viên"*, số lượng hồ sơ khả dụng (128 ứng viên tiềm năng).
* **Khung tìm kiếm AI thông minh (AI Prompt Bar):** Nổi bật ở vị trí trung tâm trên cùng.
* **Thân trang chia 2 phần:**
  - Bộ lọc nhanh theo thẻ kỹ năng và phòng ban ở bên trái (240px).
  - Danh sách thẻ ứng viên tiềm năng (Candidate Talent Cards) xếp theo dạng lưới 2 cột ở bên phải (1fr).

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Khung tìm kiếm thông minh bằng AI (AI Prompt Bar):**
   - Ô nhập câu lệnh ngôn ngữ tự nhiên lớn với icon Tia sáng AI (Lucide Sparkles).
   - Placeholder gợi ý: *"Ví dụ: Tìm ứng viên từng nộp vị trí Backend có trên 3 năm kinh nghiệm AWS và DynamoDB..."*
   - Nút bấm chính: *"TÁI KHÁM PHÁ BẰNG AI"* (Nền tím AI nổi bật).
   - Dòng gợi ý nhanh: `[AWS Serverless]` `[Node.js Tech Lead]` `[Python Data Engineer]`.
2. **Bộ lọc nhanh bên trái:**
   - Lọc theo Vị trí từng ứng tuyển.
   - Lọc theo Thời gian lưu trữ (3 tháng gần đây, 6 tháng, 1 năm).
   - Lọc theo Mức độ sẵn sàng chuyển việc (Sẵn sàng ngay, Đang cân nhắc).
3. **Thẻ ứng viên trong Kho tài năng (Talent Card):**
   - **Đầu thẻ:** Họ tên ứng viên (hoặc mã ẩn danh PII nếu chưa mở khóa), vị trí hiện tại.
   - **Huy hiệu độ phù hợp AI (AI Match Score):** Huy hiệu phần trăm màu xanh ngọc (Ví dụ: `Khớp 89% với yêu cầu mới`).
   - **Tóm tắt năng lực cốt lõi:** 2 dòng ngắn gọn do Bedrock tóm tắt điểm mạnh nổi trội.
   - **Tags kỹ năng:** Dải tags kỹ năng công nghệ chính.
   - **Thông tin nguồn gốc:** *"Từng ứng tuyển vị trí Senior Cloud Dev vào Tháng 08/2026 (Điểm cũ: 81/100)"*.
   - **Nút hành động:**
     * Nút *"Xem lại hồ sơ CV"*.
     * Nút *"GỬI LỜI MỜI ỨNG TUYỂN"* (Mở modal chọn tin JD mới và gửi email tự động).

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Hiện đại, thông minh, mang đậm dấu ấn công nghệ AI, bo góc 12px.
* **Nền toàn trang:** Màu tối `#0F172A` (Dark) hoặc `#F8FAFC` (Light).
* **Nền Khung tìm kiếm AI:** Nền tối có viền sáng chuyển sắc tím AI `#8B5CF6`, đổ bóng nổi bật.
* **Nền thẻ ứng viên:** Màu `#1E293B` (Dark) hoặc trắng `#FFFFFF` (Light), viền xám `#334155`.
* **Huy hiệu độ khớp AI:** Màu xanh ngọc `#10B981` trên nền xanh mờ.
* **Nút Tái khám phá AI:** Nền tím AI `#8B5CF6`, chữ trắng `#FFFFFF`.
* **Nút Gửi lời mời ứng tuyển:** Nền xanh dương điện `#2563EB`, chữ trắng.
