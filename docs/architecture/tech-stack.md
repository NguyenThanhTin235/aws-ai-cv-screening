# Quy Định Công Nghệ & Tech Stack — AI CV Screening Portal

> **Tài liệu:** Đặc tả tiêu chuẩn công nghệ, nền tảng hạ tầng và quy chuẩn phát triển  
> **Phiên bản:** 1.0 (Chính thức) · **Ngày ban hành:** 28/10/2026  
> **Áp dụng cho:** Toàn bộ các Phase phát triển dự án (Phase 1 → Phase 6)

---

## 1. Mục đích & Nguyên tắc cốt lõi

Tài liệu này thiết lập bộ khung công nghệ, các quyết định kiến trúc và quy chuẩn lập trình bắt buộc áp dụng trong suốt vòng đời dự án **AI CV Screening Portal**.

### 3 Nguyên tắc kỹ thuật nền tảng:
1. **100% Serverless & Cloud-Native:** Tận dụng tối đa các dịch vụ quản lý hoàn toàn của AWS (Pay-as-you-go, không quản lý máy chủ, tự động co giãn, chi phí nhàn rỗi xấp xỉ 0 USD).
2. **End-to-End TypeScript Unification:** Sử dụng duy nhất một ngôn ngữ **TypeScript** xuyên suốt từ Hạ tầng (AWS CDK), Backend Serverless (Node.js 20.x Lambda) đến Giao diện (React + Vite), chia sẻ cấu trúc kiểu dữ liệu (Shared Types/Interfaces).
3. **Bảo mật theo chiều sâu & Khử thiên kiến (Security-by-Design & Responsible AI):** Áp dụng quyền tối thiểu (IAM Least Privilege), mã hóa toàn trình (At-rest & In-transit), khử thông tin nhận dạng cá nhân (PII Redaction) trước khi đưa vào LLM, cam kết Zero Model Training.

---

## 2. Bảng ma trận Tech Stack tổng thể

| Tầng hệ thống | Công nghệ / Dịch vụ | Phiên bản / Chi tiết | Lý do & Vai trò kỹ thuật |
| :--- | :--- | :--- | :--- |
| **Hạ tầng (IaC)** | **AWS CDK** | v2.x (TypeScript) | Khai báo hạ tầng bằng code type-safe; sử dụng Serverless L2/L3 Constructs; tự động sinh IAM role chặt chẽ; dọn dẹp môi trường sạch sẽ bằng `cdk destroy`. |
| **Backend Runtime** | **Node.js** | 20.x LTS (TypeScript 5.x) | Khởi động lạnh (Cold-start) nhanh; tích hợp trơn tru với AWS SDK v3 modular; dùng chung DTO/Types với Frontend. |
| **AWS SDK** | **AWS SDK for JavaScript v3** | `@aws-sdk/client-*` | Cấu trúc modular tree-shaking, kích thước deployment package cực nhỏ (chỉ import đúng client cần dùng). |
| **Frontend Framework** | **React** | 18.x / 19.x (Vite) | Tốc độ build siêu nhanh với Vite; SPA mượt mà, tối ưu hiệu năng render danh sách CV và bảng xếp hạng. |
| **Giao diện (Styling)** | **Vanilla CSS + Design Tokens** | CSS Custom Properties | Tự do tùy biến 100%, không bị phụ thuộc/bloat CSS framework; giao diện Dark/Light hiện đại, Glassmorphism, Micro-animations. |
| **Xác thực & Phân quyền** | **Amazon Cognito User Pools** | 3 Groups + Custom Attributes | Quản lý đăng nhập/đăng ký cho 3 vai trò: `Candidate`, `Recruiter`, `Admin`; liên kết `company_id` cho HR Team. |
| **API Gateway** | **Amazon API Gateway** | HTTP API / REST API | Điểm tiếp nhận request từ Web Portal, xác thực bằng Cognito JWT Authorizer, định tuyến đến các Lambda Functions tương ứng. |
| **Cơ sở dữ liệu** | **Amazon DynamoDB** | On-Demand (Single-Table) | Cơ sở dữ liệu NoSQL độ trễ mili-giây; thiết kế Single-Table Design (`PK`, `SK`, `GSI1`); hỗ trợ Time-to-Live (TTL) cho cache và dữ liệu tạm. |
| **Lưu trữ tài liệu** | **Amazon S3** | Standard Tier (Private 100%) | Lưu trữ file CV tải lên (PDF, DOCX) và avatar; kích hoạt S3 Lifecycle (chuyển/xóa sau 90 ngày); Block Public Access toàn bộ. |
| **Cơ chế tải file** | **S3 Presigned URLs** | PUT Object (Hạn 15 phút) | Trình duyệt tải file trực tiếp lên S3, không qua API Gateway/Lambda; tiết kiệm băng thông và loại trừ giới hạn 10MB payload của API Gateway. |
| **Hàng đợi đệm bất đồng bộ** | **Amazon SQS** | Standard Queue + DLQ | Tách rời (Decoupling) giữa hành động nộp CV và quá trình xử lý AI; chịu tải đột biến (spike); Dead Letter Queue (DLQ) hứng lỗi sau 3 lần retry. |
| **Trích xuất CV (PDF)** | **Amazon Textract** | `DetectDocumentText` API | Nhận diện và bóc tách chữ từ PDF tải lên S3 chuẩn xác, hỗ trợ cả định dạng một cột và nhiều cột. |
| **Trích xuất CV (DOCX)** | **Thư viện `mammoth`** | Node.js native library | Chạy trực tiếp bên trong Worker Lambda; giải mã cấu trúc OpenXML `.docx` để bóc tách paragraphs và văn bản thô cực nhanh mà không cần Python subprocess. |
| **Khử định danh & Thiên kiến** | **Custom PII Redactor** | Regex & Context Masking | Che giấu/xóa số điện thoại, email cụ thể, địa chỉ nhà riêng, ảnh/tuổi/giới tính trước khi gửi nội dung vào mô hình AI. |
| **Generative AI / LLM** | **Amazon Bedrock** | Anthropic Claude 3 Haiku | Mô hình ngôn ngữ lớn tốc độ cao, chi phí tối ưu (~$0.25/1M token input); trích xuất thông tin, đánh giá Rubric 100đ, xuất JSON Schema nghiêm ngặt. |
| **Dịch vụ Email** | **Amazon SES** | Simple Email Service | Tự động gửi email xác nhận nộp hồ sơ, thư mời phỏng vấn, thư từ chối; dùng template HTML chuyên nghiệp. |
| **Giám sát & Nhật ký** | **Amazon CloudWatch** | Logs, Metrics, Alarms | Ghi log JSON có cấu trúc (gắn `traceId`, `applicationId`); Dashboard theo dõi số lượng CV, tỉ lệ lỗi AI; Alarms cảnh báo DLQ và lỗi 5xx. |
| **Kiểm thử** | **Vitest / Jest** | Unit & Integration Test | Kiểm thử tự động các hàm business logic, module khử PII, hàm tính điểm Rubric và schema validator. |

---

## 3. Quy chuẩn công nghệ chi tiết

### 3.1. Infrastructure as Code (AWS CDK TypeScript)
* **Phiên bản CDK:** AWS CDK v2 (`aws-cdk-lib`).
* **Cấu trúc Stack phân tầng (Layered Stacks):**
  - `NetworkAndAuthStack`: Cognito User Pool, Client, Groups, Domain.
  - `StorageAndQueueStack`: S3 Buckets, DynamoDB Tables, SQS Queues, DLQ.
  - `ComputeAndApiStack`: Lambda Functions, API Gateway, Integrations, Authorizers.
  - `ObservabilityStack`: CloudWatch Dashboard, Metric Filters, Alarms, SNS Topic.
* **Quy tắc đặt tên tài nguyên:** Áp dụng tiền tố dự án và môi trường, ví dụ: `cv-portal-dev-applications-table`, `cv-portal-dev-cv-bucket`.
* **Clean-up:** Toàn bộ tài nguyên phụ trợ phải có cờ `removalPolicy: RemovalPolicy.DESTROY` trong môi trường phát triển/workshop để đảm bảo lệnh `cdk destroy` dọn dẹp 100% tài nguyên, không để lại tài nguyên rác phát sinh chi phí.

### 3.2. Backend & Serverless (Node.js 20.x TypeScript)
* **TypeScript Settings:** Bật `"strict": true`, không sử dụng kiểu `any` tùy tiện; mọi Request/Response DTO đều phải có interface rõ ràng.
* **Cấu trúc thư mục chuẩn:**
  ```text
  backend/
  ├── functions/               # Các Lambda functions độc lập
  │   ├── api/                 # Các hàm phục vụ API Gateway (CRUD)
  │   │   ├── auth/
  │   │   ├── jobs/
  │   │   ├── applications/
  │   │   ├── reviews/
  │   │   └── talent-pool/
  │   └── workers/             # Các hàm background worker
  │       ├── cv-processor/    # Nhận SQS event: Textract/DOCX -> PII -> Bedrock
  │       └── email-notifier/  # Nhận DynamoDB Stream / SNS -> SES Email
  └── shared/                  # Code dùng chung (layer hoặc symlink)
      ├── types/               # Type definitions, Enums, DTOs
      ├── utils/               # Logger, Response formatter, S3/Dynamo helpers
      ├── parsers/             # mammoth docx parser
      └── pii/                 # Module khử PII regex & rules
  ```
* **AWS SDK Client Reuse:** Toàn bộ AWS Clients (`DynamoDBClient`, `S3Client`, `BedrockRuntimeClient`) phải được khởi tạo **ngoài handler** (Global Scope) để tái sử dụng kết nối TCP qua các lần invoke (Execution Context Reuse).
* **Logging:** Sử dụng log định dạng JSON có cấu trúc:
  ```json
  {
    "timestamp": "2026-10-28T10:30:00Z",
    "level": "INFO",
    "traceId": "cdd-app-9876",
    "applicationId": "app-1234",
    "message": "CV extraction completed via Textract",
    "executionTimeMs": 1420
  }
  ```

### 3.3. Xử lý tài liệu & Pipeline AI
* **Xử lý tài liệu đa định dạng:**
  - File PDF: Gọi `DetectDocumentTextCommand` của Amazon Textract với đối tượng S3 trực tiếp.
  - File DOCX: Đọc buffer từ S3 qua S3Client, truyền vào `mammoth.extractRawText({ buffer })` để lấy văn bản thuần sạch sẽ, giữ nguyên cấu trúc phân đoạn.
  - Giới hạn file: Tối đa 5MB, độ dài văn bản sau trích xuất tối đa 50,000 ký tự (cắt gọt nếu vượt ngưỡng để tránh quá tải token).
* **Quy chuẩn Khử PII & Thiên kiến:**
  - Áp dụng bộ lọc Regex để thay thế: Email (`[EMAIL_REDACTED]`), Số điện thoại (`[PHONE_REDACTED]`), Địa chỉ nhà cụ thể (`[ADDRESS_REDACTED]`).
  - Hướng dẫn System Prompt của LLM: "Bỏ qua các yếu tố về tuổi tác, giới tính, dân tộc, hình ảnh cá nhân; chỉ đánh giá dựa trên năng lực chuyên môn, kinh nghiệm thực tế, học vấn và cách thức tổ chức hồ sơ".
* **Quy chuẩn Gọi Amazon Bedrock (Claude 3 Haiku):**
  - Sử dụng API `InvokeModelCommand` hoặc `ConverseCommand`.
  - Khung Prompt: Bọc toàn bộ nội dung CV và JD vào các thẻ XML riêng biệt (`<job_description>`, `<candidate_cv>`) để triệt tiêu nguy cơ Prompt Injection từ file CV của ứng viên.
  - Cấu trúc Output: Ép định dạng phản hồi bằng JSON Schema nghiêm ngặt, bao gồm:
    - `total_score` (0–100)
    - `rubric_scores`: Kỹ năng (40đ), Kinh nghiệm (30đ), Học vấn (15đ), Trình bày (15đ)
    - `strengths` (mảng string các điểm mạnh cốt lõi)
    - `weaknesses` (mảng string các điểm còn thiếu so với JD)
    - `summary` (đoạn văn nhận xét khách quan dưới 100 từ)
    - `skill_gap` (kỹ năng bắt buộc còn thiếu)

### 3.4. Cơ sở dữ liệu DynamoDB (Single-Table Design)
* **Chế độ Capacity:** On-Demand (PAY_PER_REQUEST) — không mất phí khi không có truy vấn.
* **Bảng chính:** `CvPortalMainTable`
  - Khóa chính: `PK` (String), `SK` (String)
  - Khóa ngoại thứ cấp (GSI1): `GSI1PK` (String), `GSI1SK` (String) — phục vụ tra cứu danh sách đơn theo JD, danh sách ứng viên theo điểm số.
  - Tính năng TTL: Cột `expire_at` (Epoch Timestamp) kích hoạt tự động xóa các presigned upload sessions quá hạn và bản ghi tạm.

### 3.5. Frontend & UI/UX Standards
* **Framework:** React 18+ với Vite làm build tool.
* **Quy định Styling:**
  - Sử dụng **Vanilla CSS** với hệ thống Design Tokens (CSS Variables) đặt trong `src/styles/tokens.css` (định nghĩa màu sắc, khoảng cách, font chữ, border-radius, hiệu ứng bóng).
  - Nghiêm cấm dùng TailwindCSS hoặc các thư viện component UI đồ sộ (Ant Design, MUI) để giữ bundle size siêu gọn, dễ tùy biến sâu.
  - Giao diện phải mang tính thẩm mỹ cao: Phối màu hiện đại (Modern Dark & Clean Light mode), hiệu ứng Glassmorphism (nền mờ mờ mờ cao cấp), Micro-animations trên nút bấm, badge trạng thái và thanh tiến trình điểm số.
* **Trải nghiệm người dùng cốt lõi:**
  - Trang Side-by-side: Chia 2 cột song song (cột trái xem nội dung CV trích xuất, cột phải xem điểm số Rubric, nhận xét của AI và form ghi chú của Recruiter).
  - Trạng thái trực quan: Loading Skeleton khi AI đang chấm điểm, Toast thông báo tương tác, Responsive thân thiện từ màn hình Desktop (HR Review) đến Mobile (Ứng viên tra cứu).

---

## 4. Khuôn khổ Giới hạn & Ranh giới Kỹ thuật (Do's & Don'ts)

### Những điều BẮT BUỘC (DO'S):
- [x] Luôn dùng Presigned URL với thời hạn ngắn (tối đa 15 phút) để tải file lên S3.
- [x] Luôn bọc nội dung đầu vào không tin cậy (CV text) trong các thẻ XML trước khi đưa vào LLM.
- [x] Luôn cấu hình Dead Letter Queue (DLQ) cho SQS Queue để không làm mất dữ liệu khi Lambda xử lý AI bị lỗi.
- [x] Luôn bật kiểm tra định dạng file (chỉ chấp nhận `application/pdf` và `.docx`) ngay từ khâu tạo presigned URL.
- [x] Luôn lưu vết Audit Trail bất biến khi Recruiter thay đổi trạng thái hồ sơ ứng viên.

### Những điều TUYỆT ĐỐI KHÔNG (DON'TS):
- [ ] **KHÔNG** truyền file nhị phân (binary CV) trực tiếp qua API Gateway để tránh chạm ngưỡng giới hạn 10MB payload.
- [ ] **KHÔNG** hardcode bất kỳ AWS Access Key / Secret Key nào trong mã nguồn hoặc file cấu hình (luôn dùng IAM Role / Environment Variables).
- [ ] **KHÔNG** mở Public Access cho S3 Bucket chứa hồ sơ ứng viên (luôn bật Block Public Access 100%).
- [ ] **KHÔNG** đưa dữ liệu định danh cá nhân nhạy cảm (SĐT, Email chính thức) vào prompt gửi lên mô hình AI.
- [ ] **KHÔNG** dùng các dịch vụ máy chủ ảo EC2, RDS nếu không thật sự cần thiết nhằm bảo toàn kiến trúc 100% Serverless.

---

## 5. Định hướng Mở rộng Công nghệ (Post-MVP)

Nếu còn thời gian sau Milestone M4:
1. **AWS WAF (Web Application Firewall):** Gắn vào CloudFront Distribution và API Gateway để chặn SQL Injection, XSS, rate-limit chống spam bot.
2. **OpenSearch Serverless (Nếu nâng cấp Talent Rediscovery):** Mở rộng tính năng tìm kiếm ứng viên tương đồng bằng Vector Search / Semantic Search thay vì từ khóa thuần.
