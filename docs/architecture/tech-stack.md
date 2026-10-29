# Quy Định Công Nghệ & Tech Stack — AI CV Screening Portal

> **Tài liệu:** Đặc tả tiêu chuẩn công nghệ, nền tảng hạ tầng và quy chuẩn phát triển  
> **Phiên bản:** 2.0 (Chuẩn hóa theo Kiến trúc Chính thức v11.0) · **Ngày ban hành:** 29/10/2026  
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
| **Bảo vệ biên & Tường lửa** | **AWS WAF** | WebACL (Managed + Rate Rules) | Chặn đứng tấn công SQL Injection (SQLi), Cross-Site Scripting (XSS), HTTP Flood (Layer 7 DDoS), Bot độc hại, Request bất thường và Rate Abuse ngay tại biên. |
| **Phân phối nội dung (CDN)** | **Amazon CloudFront** | Global Edge Distribution | Phân phối toàn cầu ứng dụng Web SPA (AWS Amplify) và định tuyến lưu lượng API về API Gateway với TLS 1.3 Termination & HTTP/3. |
| **Xác thực & Phân quyền** | **Amazon Cognito User Pools** | 3 Groups + Custom Attributes | Quản lý đăng nhập/đăng ký cho 3 vai trò: `Candidate`, `Recruiter`, `Admin`; cấp JWT cho API Gateway Authorizer; liên kết `company_id` cho HR Team. |
| **API Gateway (REST & WebSocket)** | **Amazon API Gateway** | REST API + WebSocket API | **REST API** tiếp nhận nghiệp vụ đồng bộ kèm Cognito JWT Authorizer; **WebSocket API (`@connections`)** đẩy thông báo kết quả chấm điểm Real-time trực tiếp lên UI, thay thế hoàn toàn HTTP Polling. |
| **Cơ sở dữ liệu** | **Amazon DynamoDB** | On-Demand (Single-Table) | Cơ sở dữ liệu NoSQL độ trễ mili-giây; lưu cấu trúc CV JSON, trạng thái đơn, khóa chống trùng **Idempotency (`document_id`)** và bảng xếp hạng `GSI1`. |
| **Lưu trữ cách ly & Quét mã độc** | **Amazon S3 (`CV Quarantine`) + GuardDuty** | Malware Protection for S3 | Vùng cách ly tệp CV tải lên (`.pdf` <= 5MB); **Amazon GuardDuty Malware Protection for S3** tự động quét mã độc (`NO_THREATS_FOUND`) và kiểm tra chữ ký MIME `%PDF-` trước khi cho phép sử dụng. |
| **Cơ chế tải file** | **S3 Presigned URLs** | PUT Object (Server Key, Hạn 5 phút) | Chỉ cấp cho tài nguyên đã xác minh quyền sở hữu; dùng `s3Key` do Server tự tạo, thời hạn 5 phút, ép chặt `application/pdf` <= 5MB tải trực tiếp lên S3 Quarantine. |
| **Hàng đợi đệm bất đồng bộ** | **Amazon SQS** | Standard Queue + DLQ | Xếp hàng sự kiện từ S3 Quarantine, chống nghẽn đột biến và kiểm tra **Idempotency (`document_id`)** trước khi kích hoạt Step Functions; DLQ hứng lỗi sau 3 lần retry. |
| **Điều phối Pipeline AI** | **AWS Step Functions** | Standard Workflow (State Machine) | Điều phối tuần tự **`5a. Amazon Textract`** (trích xuất văn bản) $\to$ **`5b. Amazon Bedrock`** (chuẩn hóa CV thành JSON); cấu hình `Retry` (`IntervalSeconds: 2, BackoffRate: 2.0`) trực tiếp tại từng State. |
| **Trích xuất văn bản CV (`5a`)** | **Amazon Textract** | Async `StartDocumentTextDetection` / Sync API | Đọc trực tiếp tệp PDF từ S3 (`S3Object`), hỗ trợ API bất đồng bộ cho tài liệu lớn/nhiều trang mà không giữ kết nối HTTP chờ AI xử lý. |
| **Kết nối mạng nội bộ** | **VPC Endpoints (AWS PrivateLink)** | Gateway EP + Full Interface EP | Duy trì **Zero Public IP** (Không dùng NAT Gateway ~32 USD/tháng); kết nối nội bộ từ Private Subnet tới S3, DynamoDB, Textract, Bedrock Runtime, SES, SQS, Step Functions, Secrets Manager và CloudWatch. |
| **Khử định danh & Thiên kiến** | **Custom PII Redactor** | Regex & Context Masking | Che giấu/xóa số điện thoại, email cụ thể, địa chỉ nhà riêng, ảnh/tuổi/giới tính trên văn bản OCR trước khi gửi vào mô hình AI. |
| **Generative AI / LLM (`5b`)** | **Amazon Bedrock Runtime** | Anthropic Claude 3 Haiku | Nhận văn bản từ Textract để **chuẩn hóa CV thành cấu trúc JSON** (`Skills`, `Experience`, `Education`, `Job matching`, `AI score`); chi phí tối ưu (~$0.25/1M token input); cam kết Zero Model Training. |
| **Review Thủ công Fallback** | **Amazon A2I (Human-in-the-Loop)** | Manual Review Fallback Queue | Nhánh rẽ trong Step Functions khi Confidence Score của Textract thấp (`< 80%`) hoặc Bedrock trả về JSON sai định dạng, đẩy hồ sơ sang hàng đợi chờ HR Review thủ công. |
| **Dịch vụ Email (`6`)** | **Amazon SES** | Simple Email Service | Tự động gửi email xác nhận nộp hồ sơ, thông báo kết quả phân tích CV, thư mời phỏng vấn qua kết nối nội bộ PrivateLink. |
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
  │       ├── cv-processor/    # Nhận SQS event: Textract (PDF) -> PII -> Bedrock
  │       └── email-notifier/  # Nhận DynamoDB Stream / SNS -> SES Email
  └── shared/                  # Code dùng chung (layer hoặc symlink)
      ├── types/               # Type definitions, Enums, DTOs
      ├── utils/               # Logger, Response formatter, S3/Dynamo helpers
      ├── validators/          # PDF MIME & Magic Bytes (%PDF-) validator
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

### 3.3. Xử lý tài liệu PDF & Pipeline AI
* **Chuẩn hóa định dạng PDF duy nhất (`application/pdf`):**
  - Hệ thống chỉ chấp nhận tệp CV định dạng **PDF (`.pdf`)** có dung lượng tối đa **5MB** và kiểm tra chữ ký Magic Bytes `%PDF-`.
  - Gọi `DetectDocumentTextCommand` của **Amazon Textract** đọc đối tượng PDF từ S3 trực tiếp qua kết nối nội bộ AWS PrivateLink.
  - Giới hạn văn bản sau trích xuất tối đa 50,000 ký tự (cắt gọt an toàn nếu vượt ngưỡng để tránh quá tải token).
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
- [x] Luôn dùng Presigned URL chỉ cấp cho tài nguyên đã xác minh quyền sở hữu, dùng `s3Key` do Server tự tạo, thời hạn ngắn (5 phút) và giới hạn chặt `application/pdf` <= 5MB.
- [x] Luôn đưa tệp CV mới tải lên vào vùng cách ly **`Amazon S3 — CV Quarantine`** và quét mã độc qua **Amazon GuardDuty Malware Protection for S3** (`NO_THREATS_FOUND`) + kiểm tra Magic Bytes `%PDF-` trước khi cho phép tải xuống hoặc xử lý AI.
- [x] Luôn kiểm tra **Idempotency (`document_id`, `versionId`, `task_id`)** trên DynamoDB trước khi thực thi Step Functions để chống xử lý trùng lặp khi S3 phát sinh sự kiện nhiều lần.
- [x] Luôn điều phối tuần tự **`5a. Amazon Textract`** (hỗ trợ Async API cho tài liệu lớn, đọc trực tiếp `S3Object`) $\to$ **`5b. Amazon Bedrock`** (chuẩn hóa CV thành JSON) với cấu hình `Retry` (`IntervalSeconds: 2, BackoffRate: 2.0`) và nhánh Fallback **Amazon A2I (Human-in-the-Loop)**.
- [x] Luôn bọc nội dung đầu vào không tin cậy (CV text) trong các thẻ XML trước khi đưa vào LLM và Validate JSON Schema trước khi lưu vào DynamoDB.
- [x] Luôn thông báo kết quả thời gian thực qua **API Gateway WebSocket Push** (thay thế HTTP Polling) và lưu vết Audit Trail bất biến.

### Những điều TUYỆT ĐỐI KHÔNG (DON'TS):
- [ ] **KHÔNG** truyền file nhị phân (binary CV) trực tiếp qua API Gateway hoặc tải toàn bộ PDF về RAM Lambda rồi mới gửi sang Textract.
- [ ] **KHÔNG** giữ kết nối HTTP của người dùng để chờ AI xử lý hoặc dùng HTTP Polling liên tục từ trình duyệt.
- [ ] **KHÔNG** cho phép tải xuống hoặc đưa vào AI các tệp CV trong vùng Quarantine chưa qua kiểm tra mã độc GuardDuty.
- [ ] **KHÔNG** hardcode bất kỳ AWS Access Key / Secret Key nào trong mã nguồn hoặc file cấu hình (luôn dùng IAM Role / Secrets Manager).
- [ ] **KHÔNG** mở Public Access cho S3 Bucket chứa hồ sơ ứng viên (luôn bật Block Public Access 100%) hoặc dùng NAT Gateway tốn kém khi đã có VPC Endpoints.
- [ ] **KHÔNG** đưa dữ liệu định danh cá nhân nhạy cảm (SĐT, Email chính thức) vào prompt gửi lên mô hình AI.
- [ ] **KHÔNG** dùng các dịch vụ máy chủ ảo EC2, RDS nhằm bảo toàn kiến trúc 100% Serverless.

---

## 5. Định hướng Mở rộng Công nghệ (Post-MVP)

Nếu còn thời gian sau Milestone M4:
1. **Amazon OpenSearch Serverless (Vector Search cho Talent Rediscovery):** Mở rộng tính năng tìm kiếm ứng viên tương đồng bằng Vector Embeddings (Amazon Titan Text Embeddings v2) kết hợp truy vấn có cấu trúc trên DynamoDB.
2. **Amazon QuickSight (BI Analytics cho HR Director):** Xây dựng bộ báo cáo phân tích chuyên sâu theo quý về phễu tuyển dụng (Hiring Funnel) và hiệu quả nguồn ứng viên.
