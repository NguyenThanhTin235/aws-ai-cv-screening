# PROMPT STITCH AI: DASHBOARD TỔNG QUAN TUYỂN DỤNG (RECRUITER DASHBOARD)

## [TÊN TRANG & MỤC ĐÍCH]
Bảng điều khiển trung tâm dành cho Nhà tuyển dụng (`Recruiter`) để theo dõi chỉ số phễu tuyển dụng, khối lượng hồ sơ cần duyệt, và phân bổ điểm số AI Bedrock.

---

## [BỐ CỤC (LAYOUT)]
* **Layout Dashboard quản trị chuẩn:**
  - **Sidebar điều hướng bên trái (240px cố định):** Chứa logo và danh sách menu chức năng.
  - **Khu vực làm việc chính bên phải (1fr):**
    * Header nhỏ trên cùng: Ô tìm kiếm nhanh, icon chuông thông báo (kèm số 3 đỏ), avatar tài khoản.
    * Hàng 1: 4 thẻ KPI chỉ số quan trọng (Stat Cards Row).
    * Hàng 2: Bố cục 2 cột (Cột trái 60%: Danh sách chiến dịch tuyển dụng đang mở; Cột phải 40%: Biểu đồ thanh ngang phân bổ dải điểm số AI Bedrock).
    * Hàng 3: Dòng nhật ký hoạt động đánh giá gần đây (Activity Feed).

---

## [THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
1. **Sidebar bên trái:**
   - Logo doanh nghiệp TechCorp.
   - Danh sách menu có icon rõ nét: *"Tổng quan"* (Active), *"Tin tuyển dụng"*, *"Ứng viên"*, *"Bảng xếp hạng"*, *"Đánh giá song song"*, *"Kho tài năng"*, *"Cài đặt"*.
   - Khung nhỏ ở chân sidebar: Đồng hồ báo hạn mức API Bedrock (*"142/500 CV đã chấm tháng này"*).
2. **Bộ 4 thẻ chỉ số KPI (Stat Cards):**
   - Thẻ 1: *"Tổng CV tiếp nhận"* (Số 148, icon FileText, nhãn xanh lá: `+12% tuần này`).
   - Thẻ 2: *"Đã chấm bằng AI"* (Số 142 - 96%, icon Sparkles màu tím, nhãn: `Điểm TB: 78đ`).
   - Thẻ 3: *"Chờ duyệt thủ công"* (Số 18, icon Clock, nhãn màu cam: `Ưu tiên cao`).
   - Thẻ 4: *"Lịch phỏng vấn tuần này"* (Số 7, icon Calendar, nhãn xanh dương).
3. **Bảng tin tuyển dụng đang mở (Active Jobs Table):**
   - Tiêu đề vị trí (Senior AWS Cloud Engineer, Fullstack React & Node.js, Platform Engineer).
   - Số lượng CV nộp, điểm trung bình AI, thanh tiến trình tỷ lệ hồ sơ đã xử lý.
   - Nút *"Đánh giá ngay"* bên cạnh mỗi vị trí.
4. **Biểu đồ phân bổ điểm số AI (Score Distribution Chart):**
   - Các thanh ngang thể hiện tỷ lệ phần trăm theo dải điểm:
     * Dải 90-100đ (Xuất sắc - 8%): Thanh màu xanh lá ngọc.
     * Dải 80-89đ (Khá tốt - 32%): Thanh màu xanh dương.
     * Dải 70-79đ (Tiềm năng - 41%): Thanh màu tím AI.
     * Dưới 70đ (Cần cân nhắc - 19%): Thanh màu xám.
5. **Dòng nhật ký hoạt động gần đây (Audit Feed):**
   - Danh sách các hành động có avatar người thực hiện, thời gian, và sự kiện: *"Recruiter Linh Nguyễn vừa duyệt phỏng vấn ứng viên #APP-1049"*, *"AI Bedrock hoàn thành chấm điểm CV #APP-1052 (84/100)"*.

---

## [MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
* **Phong cách:** Dashboard quản trị dữ liệu mật độ cao (Data-dense), hiện đại, chuyên nghiệp, bo góc 12px.
* **Nền toàn trang:** Màu tối `#0F172A` (Dark) hoặc xám sáng `#F8FAFC` (Light).
* **Nền Sidebar & các thẻ Card:** Màu `#1E293B` (Dark) hoặc trắng `#FFFFFF` (Light), viền mảnh `#334155`.
* **Màu điểm nhấn AI:** Màu tím neon `#8B5CF6`.
* **Thẻ KPI chờ duyệt:** Số màu vàng cam `#F59E0B`.
* **Thẻ KPI lịch phỏng vấn:** Số màu xanh lá `#10B981`.
