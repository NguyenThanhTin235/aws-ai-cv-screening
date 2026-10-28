# TEMPLATE CHUNG CHO PROMPT THIẾT KẾ UI (STITCH AI)

Tài liệu này quy định cấu trúc prompt chuẩn, ngắn gọn và trực quan để người dùng copy trực tiếp vào công cụ **StitchAI** (hoặc các AI Design Agent tương tự) để sinh giao diện giao diện web hiện đại, chuyên nghiệp.

---

## 1. Cấu Trúc Khung Mẫu Prompt (Prompt Structure)

Mỗi prompt gửi cho StitchAI sẽ gồm 4 phần tinh gọn:

```text
[TÊN TRANG & MỤC ĐÍCH]
Mô tả 1-2 câu mục đích trang và vai trò người dùng (Ứng viên / Nhà tuyển dụng / Quản trị viên).

[BỐ CỤC (LAYOUT)]
- Dạng layout: Toàn màn hình / 2 cột / 3 cột / Split-screen 50-50 / Dashboard kèm Sidebar.
- Phân vùng: Header trên cùng, Sidebar bên trái, Main Content trung tâm, Sticky Action Bar đáy.
- Đáp ứng: Desktop (1280px+) và Mobile responsive.

[THÀNH PHẦN GIAO DIỆN (COMPONENTS)]
- Liệt kê cụ thể từng thành phần: Thẻ Card, Nút bấm (Button), Bảng (Table), Ô nhập (Input), Thanh trượt (Slider), Tag trạng thái (Badge), Thanh tiến trình (Progress Bar), Hộp thoại (Modal).

[MÀU SẮC & PHONG CÁCH (COLORS & STYLE)]
- Phong cách: Modern SaaS, Clean Dark Mode (Obsidian) hoặc Light Mode sang trọng, Glassmorphism nhẹ, bo góc 8-12px.
- Bảng màu:
  + Nền chính (Background): #0F172A (Dark Slate) hoặc #F8FAFC (Light Slate)
  + Thẻ / Khối (Surface): #1E293B (Dark Surface) hoặc #FFFFFF (Pure White)
  + Màu chủ đạo (Brand Primary): #2563EB (Electric Blue)
  + Màu tính năng AI (AI Accent): #8B5CF6 (Purple Glow)
  + Màu trạng thái: #10B981 (Xanh lá - Thành công/Đạt), #F59E0B (Vàng cam - Chờ duyệt), #EF4444 (Đỏ - Từ chối/Lỗi)
```

---

## 2. Bảng Tra Cứu Màu Chuẩn Toàn Hệ Thống

| Nhóm Màu | Tên Màu | Mã HEX | Áp Dụng Cho |
|---|---|---|---|
| **Background** | Dark Slate Canvas | `#0F172A` | Nền tổng thể trang (Dark Mode) |
| **Surface** | Dark Slate Surface | `#1E293B` | Nền các thẻ Card, Table, Sidebar, Modal |
| **Border** | Subtle Border | `#334155` | Đường viền mảnh chia ngăn |
| **Text Primary** | Crisp White | `#F8FAFC` | Tiêu đề, chữ chính nổi bật |
| **Text Secondary** | Muted Slate | `#94A3B8` | Chữ phụ, mô tả, nhãn phụ |
| **Brand Primary** | Electric Blue | `#2563EB` | Nút bấm chính (CTA), liên kết nổi bật |
| **AI Accent** | Purple Glow | `#8B5CF6` | Thẻ phân tích AI, điểm số Bedrock, icon AI |
| **Status Success** | Emerald Green | `#10B981` | Điểm cao ($\ge 75$), Đạt phỏng vấn, Đã nộp |
| **Status Warning** | Amber Orange | `#F59E0B` | Cần xem xét, Hồ sơ chờ duyệt, Kỹ năng còn thiếu |
| **Status Danger** | Rose Red | `#EF4444` | Dưới điểm sàn, Từ chối hồ sơ, Xóa dữ liệu |
