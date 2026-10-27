# QUY ĐỊNH VÀ BỘ TIÊU CHUẨN XÂY DỰNG WORKSHOP KỸ THUẬT

> **Chương trình:** Cloud Computing & FCAJ  
> **Mục tiêu:** Định hướng, rà soát và chuẩn hóa nội dung Workshop theo các chuẩn mực của **AWS** và **AWS Well-Architected Framework**.

---

> [!IMPORTANT]
> ### 🚨 CÁC NGUYÊN TẮC "KHÓA ĐIỂM" BẮT BUỘC (CRITICAL RULES)
> 1. **Dự toán chi phí (Cost Estimation):** Bắt buộc phải có bảng tính chi phí từ *AWS Pricing Calculator*. Thiếu phần này sẽ **nhận 0 điểm** mục Trình bày.
> 2. **Sản phẩm chạy thực tế (Live Demo):** Bắt buộc phải có Live Demo, Video minh chứng hoặc URL Production. Không có demo = **0 điểm** mục Demo.
> 3. **Kiến trúc tự thiết kế:** Sinh viên phải tự thiết kế và hiểu cặn kẽ hệ thống. **Nghiêm cấm sao chép 100% sơ đồ từ GenAI**.
> 4. **An toàn bảo mật (Security):** Tuyệt đối **không hard-code credentials** (Access Key, Secret Key, token, mật khẩu DB) vào code hoặc GitHub.

---

## 1. Cấu trúc Bản Đề xuất (Proposal Outline)

Bản đề xuất giải pháp (Proposal) cần có đầy đủ 7 nội dung trọng tâm sau:

1. **Tổng quan bài toán / giải pháp:** Giới thiệu ngắn gọn bối cảnh và hướng tiếp cận.
2. **Mục tiêu & phạm vi (Scope & Objectives):** Xác định rõ kết quả đầu ra và giới hạn triển khai.
3. **Vấn đề cần giải quyết (Problem Statement):** Phân tích thực trạng, nỗi đau (pain points) và sự cần thiết của giải pháp.
4. **Kiến trúc giải pháp sơ bộ (High-level Architecture):** Phác thảo mô hình tổng thể và các dịch vụ dự kiến.
5. **Kế hoạch & Timeline thực hiện:** Lộ trình chi tiết theo từng giai đoạn/tuần.
6. **Bảng dự toán ngân sách & chi phí (Cost Estimation):** Ước tính chi phí vận hành trên AWS Pricing Calculator.
7. **Rủi ro & phương án giảm thiểu (Risk Assessment & Mitigation):** Nhận diện các rủi ro kỹ thuật, chi phí và biện pháp dự phòng.

---

## 2. Cấu trúc Nội dung Kỹ thuật Workshop (Technical Guide)

Tài liệu Workshop hướng dẫn thực hành chính thức gồm 7 phần:

1. **Overview (Tổng quan Workshop):** Giới thiệu mục tiêu bài lab và sản phẩm sau khi hoàn thành.
2. **Prerequisites (Điều kiện tiên quyết):** Yêu cầu tài khoản AWS, quyền IAM, công cụ cài đặt (CLI, Docker, Node.js,...).
3. **Mô tả kiến trúc chi tiết (Architecture & Data Flow):** Sơ đồ chi tiết và phân tích luồng dữ liệu từng bước.
4. **Các bước triển khai thực hành (Step-by-step Lab Guide):** Hướng dẫn tuần tự từ khởi tạo hạ tầng đến chạy ứng dụng.
5. **Kiểm thử & đo lường (Testing & Validation):** Xác thực hệ thống qua Logs, Metrics và Alerts trên Amazon CloudWatch.
6. **Dọn dẹp tài nguyên (Clean-up):** Các bước hủy tài nguyên để tránh phát sinh chi phí ngoài ý muốn.
7. **Minh chứng sản phẩm chạy thực tế (Live Demo / Video):** Đường dẫn demo trực tiếp hoặc video ghi lại quá trình vận hành.

---

## 3. Yêu cầu Cốt lõi đối với Workshop Kỹ thuật

### 3.1. Tính thực tế & Dịch vụ sử dụng
- **Use-case thực tế trên AWS:** Đề tài cần phản ánh bài toán sản xuất thực tế, ví dụ:
  - ⚡ *Serverless Application*
  - 📊 *Data Pipeline / Analytics*
  - 🔍 *Monitoring & Observability System*
  - 🌐 *IoT & Event-driven Platform*
  - 🐳 *Containerized / Microservices Architecture*
- **Quy mô dịch vụ:** Sử dụng **tối thiểu 3 dịch vụ AWS** liên kết chặt chẽ với nhau.

### 3.2. Yêu cầu chất lượng cốt lõi
* **Thiết kế kiến trúc chuẩn mực:**
  * Sơ đồ trực quan, sử dụng đúng bộ icon chính thức của AWS.
  * Liệt kê đầy đủ dịch vụ và giải thích rõ ràng lý do lựa chọn.
  * Tuân thủ 6 trụ cột của *AWS Well-Architected Framework*.
* **Triển khai End-to-End (Tính tái lập - Reproducible):**
  * Hướng dẫn chi tiết, rõ ràng để người khác có thể tự triển khai thành công mà không gặp lỗi đứt gãy.
* **Minh chứng Demo thực tế:**
  * Có sản phẩm chạy thật (Live demo, video minh chứng rõ ràng hoặc link production).
* **Kiểm thử & Giám sát:**
  * Giám sát hệ thống qua Logs, Metrics, Alarms (Amazon CloudWatch, SNS,...).
* **Dự toán & Tối ưu chi phí:**
  * Bảng dự toán chi phí chi tiết qua AWS Pricing Calculator.
  * Đề xuất phương án tối ưu chi phí vận hành và kịch bản Clean-up triệt để.

---

## 4. Khung Tiêu chuẩn Best Practices Chi tiết (FCAJ & AWS)

### 4.1. Ý tưởng & Mục tiêu bài toán (Problem Statement & Scope)

* **Bối cảnh & Bài toán thực tế:**
  * Hệ thống được xây dựng nhằm giải quyết bài toán gì trong thực tế?
  * Xác định rõ đối tượng sử dụng / khách hàng mục tiêu.
  * *Ví dụ:* Hệ thống thu thập và giám sát dữ liệu IoT thời gian thực, Pipeline xử lý dữ liệu tự động, Hệ thống logging & alerting tập trung cho Microservices,...
* **Mục tiêu cụ thể & Tiêu chí hoàn thành:**
  * Đầu ra mong muốn rõ ràng: Dashboard trực quan, RESTful API hoạt động, hệ thống cảnh báo tự động gửi email/Slack khi có sự cố,...
  * Có tiêu chí định lượng đo lường sự thành công của giải pháp.
* **Phù hợp định hướng Cloud & AWS:**
  * Gắn liền với hệ sinh thái AWS, tập trung khai thác các dịch vụ Cloud hiện đại, tránh đề tài lệch chủ đề hoặc chỉ mang tính chất lý thuyết đơn thuần.

---

### 4.2. Kiến trúc & Thiết kế kỹ thuật (Architecture & Well-Architected)

* **Sơ đồ kiến trúc (Architecture Diagram):**
  * Sơ đồ trực quan, thẩm mỹ, vẽ bằng các công cụ chuyên nghiệp (*draw.io, Excalidraw, Lucidchart, Figma*).
  * Sử dụng bộ icon chính thức của AWS (*AWS Architecture Icons* mới nhất), ghi đúng tên dịch vụ và thể hiện rõ luồng dữ liệu (data flow) giữa các thành phần.
  * > [!CAUTION]
    > **Lưu ý:** Sinh viên phải tự thiết kế và hiểu tường tận kiến trúc. **Không sử dụng sơ đồ do GenAI tạo 100%**.
* **Căn cứ lựa chọn dịch vụ:**
  * Giải thích rõ cơ sở chọn từng dịch vụ (`S3`, `Lambda`, `API Gateway`, `DynamoDB`, `SQS`, `ECS`,...): dựa trên chi phí, tính sẵn sàng cao (*High Availability*), mô hình Serverless hay Managed Services.
* **Bảo mật & Quản lý danh tính (Security Pillar - Tiêu chí trọng tâm):**
  * Thiết lập IAM Role, IAM Policy tuân thủ nghiêm ngặt nguyên tắc **Least Privilege** (quyền tối thiểu).
  * Hạn chế tối đa việc mở tài nguyên ra Internet (đặt tài nguyên trong Private Subnet, sử dụng VPC Endpoint, cấu hình Security Group chặt chẽ).
  * **Tuyệt đối KHÔNG hard-code credentials** (`Access Key`, `Secret Key`, `Token`, `Database Password`) trong source code, file cấu hình hoặc GitHub repository.
* **Độ tin cậy & Vận hành (Reliability & Operational Excellence):**
  * Thiết kế có khả năng chịu lỗi và mở rộng linh hoạt (*Auto Scaling*, kiến trúc hướng sự kiện *Event-driven*, hàng đợi *SQS* giải phóng tải).
  * Thiết lập cơ chế giám sát, logging và cảnh báo tự động (*CloudWatch Logs, Metrics, Alarms*).

---

### 4.3. Dự toán & Tối ưu chi phí (Cost Estimation & Optimization)

> [!WARNING]
> **BẮT BUỘC:** Theo tiêu chí chấm Workshop, bài báo cáo hoặc bài trình bày thiếu phần **COST** sẽ nhận **0 điểm** mục Trình bày.

* **Bảng dự toán chi phí (Cost Estimation):**
  * Xây dựng bảng dự toán chi tiết bằng công cụ **AWS Pricing Calculator**.
  * Dự toán dựa trên kịch bản tải thực tế: lưu lượng request, dung lượng lưu trữ, băng thông truyền tải.
* **Chiến lược tối ưu chi phí (Cost Optimization):**
  * Đề xuất các phương án tối ưu: tận dụng *AWS Free Tier*, ưu tiên kiến trúc *Serverless* (trả phí theo lượt dùng), thiết lập vòng đời dữ liệu (*S3 Lifecycle Policy*), chọn cấu hình compute tier phù hợp.
* **Quy trình dọn dẹp tài nguyên (Clean-up):**
  * Cung cấp các bước dọn dẹp chi tiết sau khi thực hành xong (xóa CloudFormation stack, empty và xóa S3 bucket, tắt Alarm, giải phóng Elastic IP,...) để không phát sinh chi phí ngoài ý muốn.

---

### 4.4. Hướng dẫn thực hành Step-by-Step & Demo sản phẩm

* **Điều kiện tiên quyết (Prerequisites):**
  * Nêu rõ các yêu cầu trước khi bắt đầu: tài khoản AWS, Region khuyến nghị, quyền IAM cần thiết.
  * Các công cụ cần cài đặt và cấu hình: AWS CLI, Git, Docker, SAM, CDK hoặc Terraform (nếu áp dụng).
* **Hướng dẫn từng bước chi tiết (Step-by-step Lab Guide):**
  * Phân chia thành từng bước rõ ràng, mạch lạc:
    * *Bước 1:* Khởi tạo mạng VPC / Networking
    * *Bước 2:* Cấu hình IAM Role & Policy
    * *Bước 3:* Triển khai Backend / Database
    * *Bước 4:* Triển khai Frontend / Web Application
    * *Bước 5:* Tích hợp và kiểm tra luồng dữ liệu
  * Cung cấp đầy đủ câu lệnh CLI, file cấu hình mẫu, screenshot hướng dẫn trực quan trên AWS Management Console.
  * Đảm bảo tính **tái lập (Reproducible)**: người đọc có thể tự thao tác thành công từ đầu đến cuối mà không gặp lỗi đứt gãy.
* **Kiểm thử & Xác thực (Testing & Validation):**
  * Hướng dẫn cụ thể cách gửi request kiểm thử (qua `cURL`, `Postman` hoặc giao diện Web).
  * Hướng dẫn kiểm tra kết quả qua log CloudWatch, kiểm tra dữ liệu được ghi nhận trong database.
  * Kiểm thử các kịch bản lỗi (request sai định dạng, vượt tải) để đánh giá khả năng xử lý của hệ thống.
* **Sản phẩm chạy thực tế (Live Demo / Video Minh chứng):**
  * > [!IMPORTANT]
    > **Bắt buộc có sản phẩm hoạt động thực tế:** Cung cấp link demo trực tiếp, video ghi hình quá trình hoạt động hoặc link production. *(Không có demo = 0 điểm mục Demo)*.

---

### 4.5. Tài liệu hóa & Trình bày (Documentation & Formatting)

* **Chuẩn song ngữ (Bilingual vi / en):**
  * Bắt buộc có cả hai phiên bản tiếng Việt và tiếng Anh cho tất cả nội dung chính.
  * Văn phong kỹ thuật chuẩn xác, dịch đúng thuật ngữ Cloud Computing.
* **Cấu trúc & Giao diện Website:**
  * Xây dựng dựa trên template tiêu chuẩn của FCAJ.
  * Có mục lục (Table of Contents) rõ ràng, thanh điều hướng (navigation) thuận tiện.
* **Trình bày chuyên nghiệp:**
  * Font chữ đồng nhất, căn chỉnh dễ đọc, ngắt đoạn hợp lý.
  * Các đoạn mã nguồn (`Code Snippet`, `CLI`, `Policy JSON`) phải đặt trong Code Block với Syntax Highlighting tương ứng.
  * Hình ảnh minh họa sắc nét, có chú thích đầy đủ, kiểm tra kỹ lỗi chính tả.

---

### 4.6. Đóng góp cá nhân & Đổi mới sáng tạo (Personal Contribution & Reflection)

* **Mức độ tự chủ & Tùy biến sáng tạo:**
  * Workshop phải là kết quả làm việc độc lập của sinh viên, thể hiện sự tìm tòi và dấu ấn riêng.
  * Có sự cải tiến hoặc mở rộng so với các bài lab cơ bản: tích hợp thêm dịch vụ mới, tăng cường bảo mật nhiều lớp, áp dụng tự động hóa (CI/CD, IaC).
* **Bài học kinh nghiệm & Xử lý sự cố (Troubleshooting & Reflection):**
  * Nêu rõ các thách thức, lỗi kỹ thuật gặp phải trong quá trình triển khai và cách thức khắc phục.
  * Đưa ra định hướng mở rộng, nâng cấp giải pháp trong tương lai.