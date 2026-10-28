# SƠ ĐỒ TUẦN TỰ HỆ THỐNG (SYSTEM SEQUENCE DIAGRAMS)

# Hệ thống: AI CV Screening Portal
> **Tài liệu:** Thiết kế Sơ đồ Tuần tự Chi tiết các Luồng Nghiệp vụ & Xử lý Nền  
> **Mã tài liệu:** `DOC-SW-05-SEQ`  
> **Phiên bản:** `1.0` · **Ngày ban hành:** 28/10/2026 · **Trạng thái:** Đã phê duyệt (Approved Baseline)  
> **Kiến trúc áp dụng:** AWS Serverless (Cognito, API Gateway, Lambda, S3, SQS, Bedrock, Textract, DynamoDB, SES)  
> **Tài liệu đối chiếu:** [01-requirements.md](./01-requirements.md) (SRS v1.0), [02-use-cases.md](./02-use-cases.md) (Use Cases v2.1), [03-database-design.md](./03-database-design.md) (DynamoDB v2.1), [04-api-spec.md](./04-api-spec.md) (API Spec v1.0)

---

## 1. Tổng quan & Danh mục Sơ đồ Tuần tự

Tài liệu này đặc tả trực quan và chi tiết trình tự tương tác theo thời gian giữa các tác nhân người dùng (`Candidate`, `Recruiter`, `Admin`), các dịch vụ trên tầng Giao diện (`Web Portal SPA`), tầng Cổng điều hướng (`API Gateway`, `Cognito`), tầng Tính toán & Hàng đợi (`Lambda`, `SQS`), tầng Trí tuệ Nhân tạo (`Textract`, `Bedrock Claude 3 Haiku`), tầng Lưu trữ dữ liệu (`DynamoDB Single-Table`, `Amazon S3`) và tầng Thông báo (`Amazon SES`).

### Danh mục 6 Luồng Xử lý Cốt lõi:
1. **Luồng 1 (SEQ-01):** Nộp Hồ sơ Ứng tuyển Trực tuyến Đa Định dạng (PDF/DOCX) & Khởi tạo Khóa Kháng Trùng.
2. **Luồng 2 (SEQ-02):** Pipeline AI Trích xuất Văn bản, Khử PII & Chấm điểm Bedrock Rubric 100đ.
3. **Luồng 3 (SEQ-03):** Ứng viên Rút đơn Tuyển dụng (`WITHDRAWN`) & Giải phóng Khóa Nộp lại Hợp lệ.
4. **Luồng 4 (SEQ-04):** Đánh giá Đội nhóm HR (Multi-Reviewer), Side-by-side View & Ghi Audit Trail Bất biến.
5. **Luồng 5 (SEQ-05):** Quản trị Kho Tài năng (Talent Pool) & AI Gợi ý Ứng viên cho Tin mới (Talent Rediscovery).
6. **Luồng 6 (SEQ-06):** Quy trình Hủy định danh Toàn diện theo Quyền DSR (Asynchronous DSR Anonymization Pipeline).

---

## 2. SEQ-01: Nộp Hồ sơ Đa Định dạng (PDF/DOCX) & Khởi tạo Khóa Kháng Trùng

Sơ đồ mô tả quy trình ứng viên tải tệp CV trực tiếp lên **Amazon S3 qua Presigned URL**, sau đó gọi API nộp đơn. Hệ thống sử dụng **DynamoDB `TransactWriteItems`** để tạo đơn nộp, khởi tạo khóa `ACTIVE_APP#<jobId>` chống nộp trùng (`BR-DOC-02`), ghi nhận đồng thuận (`BR-PRIV-01`) và kích hoạt chuỗi xử lý nền qua **Amazon SQS**.

```mermaid
sequenceDiagram
    autonumber
    actor CDD as Ứng viên (Candidate)
    participant UI as Web Portal (React SPA)
    participant APIGW as Amazon API Gateway
    participant COG as Amazon Cognito
    participant L_APP as Lambda (ApplicationService)
    participant S3 as Amazon S3 (CV Storage Bucket)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant SQS as Amazon SQS (cv-screening-queue)
    participant SES as Amazon SES

    Note over CDD, S3: BƯỚC 1: XIN CẤP PRESIGNED URL & TẢI TỆP LÊN S3
    CDD->>UI: Chọn tệp CV (.pdf hoặc .docx, <= 5MB) và bấm nộp
    UI->>APIGW: POST /api/v1/applications/upload-url (kèm JWT Bearer)
    APIGW->>COG: Xác thực Token (Cognito Authorizer)
    COG-->>APIGW: 200 OK (Claims: userId)
    APIGW->>L_APP: Invoke handler (jobId, fileName, fileType, fileSize)
    activate L_APP
    L_APP->>L_APP: Kiểm tra fileType IN (PDF, DOCX) & fileSize <= 5MB (BR-DOC-01)
    L_APP->>S3: getSignedUrlPromise('putObject', { Key: temp-uploads/..., Expires: 300 })
    S3-->>L_APP: Presigned PUT URL (Hạn 5 phút theo BR-DOC-03)
    L_APP-->>APIGW: 200 OK { uploadUrl, s3Key, expiresInSeconds: 300 }
    deactivate L_APP
    APIGW-->>UI: 200 OK { uploadUrl, s3Key }

    UI->>S3: HTTP PUT uploadUrl (Kèm Binary Buffer tệp CV)
    activate S3
    Note over UI, S3: Trình duyệt hiển thị thanh tiến trình tải lên 0% -> 100%
    S3-->>UI: 200 OK (Tải tệp lên S3 thành công)
    deactivate S3

    Note over CDD, SES: BƯỚC 2: XÁC NHẬN NỘP ĐƠN & GIAO DỊCH ATOMIC
    CDD->>UI: Tích chọn đồng ý AI Screening & bấm "Gửi hồ sơ ứng tuyển"
    UI->>APIGW: POST /api/v1/applications { jobId, s3Key, consents }
    APIGW->>L_APP: Invoke handler (createApplication)
    activate L_APP
    L_APP->>L_APP: Kiểm tra bắt buộc consents.aiScreening == true (BR-PRIV-01)

    Note over L_APP, DDB: Giao dịch phân tán TransactWriteItems (Idempotent Apply)
    L_APP->>DDB: TransactWriteItems:
    Note over DDB: 1. Put APP#<applicationId> (status: SUBMITTED, aiStatus: PENDING)<br/>2. Put USER#<candidateId> / ACTIVE_APP#<jobId> (Condition: attribute_not_exists(PK))<br/>3. Put USER#<candidateId> / CONSENT#<timestamp>#AI_SCREENING
    
    alt Ứng viên chưa có đơn hoạt động cho vị trí này
        DDB-->>L_APP: 200 Transaction Committed Thành công
        L_APP->>SQS: SendMessage { applicationId, jobId, candidateId, s3Key, fileType, traceId }
        SQS-->>L_APP: MessageId (Tiếp nhận vào hàng đợi an toàn)
        L_APP->>SES: SendEmail (Biên nhận nộp đơn thành công tới ứng viên)
        L_APP-->>APIGW: 201 Created { applicationId, status: SUBMITTED, aiStatus: PENDING }
        APIGW-->>UI: 201 Created
        UI-->>CDD: Hiển thị thông báo thành công: "AI đang phân tích sơ bộ năng lực (30-60s)"
    else Đã có đơn nộp đang hoạt động (SUBMITTED/UNDER_REVIEW/INVITED)
        DDB-->>L_APP: TransactionCanceledException (ConditionalCheckFailed)
        L_APP-->>APIGW: 409 Conflict { code: "CONFLICT", message: "Bạn đang có đơn ứng tuyển cho vị trí này!" }
        APIGW-->>UI: 409 Conflict
        UI-->>CDD: Hiển thị cảnh báo đỏ ngăn chặn nộp trùng (BR-DOC-02)
    end
    deactivate L_APP
```

---

## 3. SEQ-02: Pipeline AI Trích xuất Văn bản, Khử PII & Chấm điểm Bedrock Rubric 100đ

Sơ đồ mô tả quy trình nền bất đồng bộ hoàn toàn: Lambda AI Worker nhận tin từ SQS, tự động phân luồng bóc tách văn bản theo định dạng (PDF qua Textract, DOCX qua OpenXML native), thực hiện **khử thông tin định danh (PII Redaction)** để loại bỏ thiên kiến, sau đó gửi prompt bọc XML tới **Amazon Bedrock (Claude 3 Haiku)** để chấm điểm theo Rubric 100 điểm (`BR-SCORING-01`).

```mermaid
sequenceDiagram
    autonumber
    participant SQS as Amazon SQS (cv-screening-queue)
    participant WRK as Lambda (AIWorkerService)
    participant S3 as Amazon S3 (CV Storage Bucket)
    participant TXT as Amazon Textract
    participant RED as In-Memory PII Redactor
    participant BDR as Amazon Bedrock (Claude 3 Haiku)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant SES as Amazon SES
    participant DLQ as SQS Dead-Letter Queue (DLQ)
    participant CW as CloudWatch Alarms

    SQS->>WRK: SQS Event Trigger (BatchSize = 1, SQS Message Payload)
    activate WRK
    WRK->>DDB: UpdateItem APP#<applicationId> SET aiStatus = 'EXTRACTING'
    WRK->>S3: GetObject(s3Key)
    S3-->>WRK: File Buffer & Metadata

    alt Tệp định dạng PDF (.pdf)
        WRK->>TXT: DetectDocumentTextCommand({ Document: { Bytes: buffer } })
        activate TXT
        TXT-->>WRK: Blocks (LINE, WORD, Confidence Scores)
        deactivate TXT
        WRK->>WRK: Ghép nối chuỗi văn bản thô theo thứ tự đọc (Reading Order)
    else Tệp định dạng Word (.docx)
        WRK->>WRK: Phân tích OpenXML native qua thư viện mammoth (Extract raw text)
    end

    WRK->>DDB: UpdateItem APP#<applicationId> SET aiStatus = 'SCORING'
    
    Note over WRK, RED: Khử thông tin định danh & Thiên kiến nhân khẩu học (NFR-SEC-03)
    WRK->>RED: sanitizeText(rawCvText)
    activate RED
    RED->>RED: 1. Regex che giấu Họ tên -> [CANDIDATE_NAME]
    RED->>RED: 2. Xóa số điện thoại, email cá nhân, địa chỉ cư trú
    RED->>RED: 3. Loại bỏ đại từ nhân xưng giới tính, năm sinh, hình ảnh đại diện
    RED-->>WRK: sanitizedCvText (Văn bản thuần năng lực chuyên môn)
    deactivate RED

    Note over WRK, BDR: Gọi Bedrock chấm điểm Rubric 100đ & Xuất JSON Schema
    WRK->>DDB: GetItem JOB#<jobId> / METADATA (Lấy JD & Rubric Weights)
    DDB-->>WRK: Job Data & rubricWeights (Kỹ năng 40, KN 30, Học vấn 15, Trình bày 15)
    
    WRK->>BDR: InvokeModelCommand (Claude 3 Haiku)
    Note over WRK, BDR: Prompt chống Injection: bọc nội dung trong thẻ XML <cv_content> và <job_description>
    activate BDR
    
    alt Bedrock phản hồi thành công (< 15 giây)
        BDR-->>WRK: 200 OK (JSON Payload chuẩn Schema)
        deactivate BDR
        WRK->>WRK: Validate JSON Schema: totalScore, matchLevel, criteriaScores, strengths, gaps
        
        WRK->>DDB: UpdateItem APP#<applicationId>:<br/>SET aiStatus = 'COMPLETED',<br/>aiEvaluation = :evalData,<br/>GSI1SK = 'SCORE#082#app_...'
        DDB-->>WRK: 200 OK (Lưu kết quả & Cập nhật Bảng xếp hạng)
        
        WRK->>SES: SendEmail (Thông báo kết quả sơ loại AI đã sẵn sàng tới ứng viên)
        WRK->>SQS: DeleteMessage (Xóa message khỏi hàng đợi)
    else Bedrock gặp sự cố mạng hoặc quá tải (Lỗi tạm thời)
        BDR-->>WRK: 429 Too Many Requests / 500 Service Error
        WRK->>WRK: Thử lại với cơ chế Exponential Backoff (Tối đa 3 lần theo NFR-REL-02)
        alt Thử lại lần 4 vẫn thất bại
            WRK->>DDB: UpdateItem APP#<applicationId> SET aiStatus = 'FAILED', failureReason = :err
            WRK->>DLQ: Chuyển message sự cố vào Dead-Letter Queue
            DLQ->>CW: Kích hoạt CloudWatch Alarm (DLQ Depth > 0 theo NFR-OPS-02)
            WRK->>SQS: DeleteMessage (Cách ly khỏi hàng đợi chính)
        end
    end
    deactivate WRK
```

---

## 4. SEQ-03: Ứng viên Rút đơn Tuyển dụng (`WITHDRAWN`) & Giải phóng Khóa Nộp lại

Sơ đồ mô tả cơ chế trao quyền tự chủ cho ứng viên hủy nộp hồ sơ (`UC-CDD-09`). Hệ thống kiểm tra điều kiện nghiêm ngặt theo `BR-STATE-02` (chỉ cho phép rút khi `SUBMITTED` hoặc `UNDER_REVIEW`). Khi giao dịch thành công, hệ thống xóa bỏ khóa `ACTIVE_APP#<jobId>` trên DynamoDB, cho phép ứng viên có thể nộp lại hồ sơ mới vào vị trí này nếu đổi ý sau này (`BR-DOC-02`).

```mermaid
sequenceDiagram
    autonumber
    actor CDD as Ứng viên (Candidate)
    participant UI as Web Portal (React SPA)
    participant APIGW as Amazon API Gateway
    participant L_APP as Lambda (ApplicationService)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant SES as Amazon SES

    CDD->>UI: Tại trang "Đơn ứng tuyển của tôi", bấm nút "Rút đơn"
    UI->>UI: Hiển thị Modal xác nhận rút đơn (Yêu cầu nhập lý do rút đơn)
    CDD->>UI: Xác nhận rút đơn và bấm "Đồng ý"
    UI->>APIGW: POST /api/v1/applications/{id}/withdraw (kèm reason)
    APIGW->>L_APP: Invoke handler (withdrawApplication)
    activate L_APP

    L_APP->>DDB: GetItem APP#<applicationId> / METADATA
    DDB-->>L_APP: Application Item (candidateId, status, version)

    alt Trạng thái hợp lệ (status IN ['SUBMITTED', 'UNDER_REVIEW'])
        Note over L_APP, DDB: Giao dịch TransactWriteItems: Cập nhật đơn & Gỡ khóa chống trùng
        L_APP->>DDB: TransactWriteItems:
        Note over DDB: 1. UpdateItem APP#<id>:<br/>Condition: #status IN ('SUBMITTED', 'UNDER_REVIEW')<br/>SET #status = 'WITHDRAWN', withdrawalReason = :reason<br/>2. DeleteItem USER#<candidateId> / ACTIVE_APP#<jobId><br/>3. PutItem APP#<id> / AUDIT#<now>#<auditId> (Audit Log)
        DDB-->>L_APP: 200 Transaction Committed (Khóa đã được giải phóng atomically)
        
        L_APP->>SES: SendEmail (Thư xác nhận ứng viên đã rút đơn thành công)
        L_APP-->>APIGW: 200 OK { status: "WITHDRAWN", message: "Rút đơn thành công." }
        APIGW-->>UI: 200 OK
        UI-->>CDD: Đổi huy hiệu sang màu xám "ĐÃ RÚT ĐƠN (WITHDRAWN)"

        Note over CDD, DDB: KHẢ NĂNG NỘP LẠI HỢP LỆ (BR-DOC-02)
        Note over CDD, UI: Khi ứng viên nộp lại đơn mới vào vị trí này sau đó:<br/>Khóa ACTIVE_APP#<jobId> không còn tồn tại -> Cho phép tạo đơn mới thành công!
    else Trạng thái không cho phép rút (status IN ['INVITED', 'ACCEPTED', 'REJECTED'])
        L_APP-->>APIGW: 400 Bad Request { code: "BAD_REQUEST", message: "Hồ sơ đã bước vào vòng phỏng vấn hoặc đã có kết quả, không thể rút đơn." }
        APIGW-->>UI: 400 Bad Request
        UI-->>CDD: Hiển thị thông báo giải thích từ chối thao tác
    end
    deactivate L_APP
```

---

## 5. SEQ-04: Đánh giá Đội nhóm HR, Side-by-side View & Ghi Audit Trail Bất biến

Sơ đồ mô tả quy trình làm việc của Nhà tuyển dụng (`UC-RCT-04`, `UC-RCT-05`, `UC-RCT-06`): Mở giao diện đối chiếu song song 3 cột (CV gốc bên trái, Nhận xét AI ở giữa, Đánh giá đội nhóm bên phải), ghi nhật ký kiểm toán bảo mật khi tải CV (`NFR-SEC-05`), nhiều thành viên cùng lưu đánh giá độc lập mà không bị ghi đè, và chuyển trạng thái nghiệp vụ ATS có ghi nhật ký bất biến `AuditTrail`.

```mermaid
sequenceDiagram
    autonumber
    actor RCT as Nhà tuyển dụng (Recruiter / Tech Lead)
    participant UI as Web Portal (HR Dashboard)
    participant APIGW as Amazon API Gateway
    participant L_REV as Lambda (ReviewService)
    participant S3 as Amazon S3 (CV Storage Bucket)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant SES as Amazon SES

    Note over RCT, S3: BƯỚC 1: XEM CHI TIẾT & CẤP QUYỀN TẢI CV AN TOÀN
    RCT->>UI: Mở xem hồ sơ ứng viên tại Bảng xếp hạng JD
    UI->>APIGW: POST /api/v1/applications/{id}/cv-access-url
    APIGW->>L_REV: Invoke handler (generateCvAccessUrl)
    activate L_REV
    L_REV->>L_REV: Kiểm tra quyền recruiter thuộc cùng companyId (BR-AUTH-03)
    L_REV->>S3: getSignedUrlPromise('getObject', { Key: applications/..., Expires: 300 })
    S3-->>L_REV: Presigned GET URL (Hạn 5 phút kèm grantId nhúng trong query)
    
    Note over L_REV, DDB: Ghi nhật ký kiểm toán an toàn thông tin (NFR-SEC-05)
    L_REV->>DDB: PutItem APP#<id> / ACCESS_LOG#<now>#<logId> (Ghi nhận quyền cấp URL, TTL 180 ngày)
    L_REV-->>APIGW: 200 OK { downloadUrl, grantId, expiresInSeconds: 300 }
    deactivate L_REV
    APIGW-->>UI: 200 OK

    UI->>S3: Tải file PDF/DOCX qua Presigned URL (S3 Data Events ghi nhận GetObject kèm grantId)
    S3-->>UI: File Content (Render tài liệu gốc trực tiếp trên khung bên trái)

    Note over RCT, DDB: BƯỚC 2: ĐÁNH GIÁ ĐỘI NHÓM ĐỘC LẬP (MULTI-REVIEWER)
    RCT->>UI: Nhập nhận xét chuyên môn, chọn 5 sao, đề xuất "INVITE" & bấm "Lưu đánh giá"
    UI->>APIGW: POST /api/v1/applications/{id}/reviews { rating: 5, manualNotes: "...", recommendation: "INVITE" }
    APIGW->>L_REV: Invoke handler (submitReview)
    activate L_REV
    
    Note over L_REV, DDB: Lưu item riêng cho từng reviewer, không ghi đè nhận xét đồng đội
    L_REV->>DDB: PutItem APP#<id> / REVIEW#<reviewerId> (rating, manualNotes, recommendation, reviewerName)
    L_REV->>DDB: UpdateItem APP#<id> / METADATA (Cập nhật atomic: reviewCount += 1, recalculate avgRating)
    DDB-->>L_REV: 200 OK
    L_REV-->>APIGW: 200 OK
    APIGW-->>UI: 200 OK (Cập nhật điểm đánh giá trung bình của HR Team)
    deactivate L_REV

    Note over RCT, SES: BƯỚC 3: QUYẾT ĐỊNH CHUYỂN TRẠNG THÁI & GHI AUDIT TRAIL
    RCT->>UI: Bấm nút "Mời Phỏng Vấn (INVITED)"
    UI->>APIGW: PATCH /api/v1/applications/{id}/status { newStatus: "INVITED", reason: "...", expectedVersion: 1 }
    APIGW->>L_REV: Invoke handler (updateStatus)
    activate L_REV

    L_REV->>DDB: TransactWriteItems:
    Note over DDB: 1. UpdateItem APP#<id> / METADATA:<br/>Condition: #version = 1 AND #status = 'UNDER_REVIEW'<br/>SET #status = 'INVITED', #version = 2<br/>2. PutItem APP#<id> / AUDIT#<now>#<auditId>:<br/>actorId: recruiterId, action: 'STATUS_CHANGE',<br/>prev: 'UNDER_REVIEW', new: 'INVITED', reason: '...'
    
    DDB-->>L_REV: 200 Transaction Committed (Bản ghi Audit Trail bất biến được lưu vĩnh viễn)
    L_REV->>SES: SendEmail (Tự động gửi thư mời phỏng vấn chính thức tới ứng viên theo BR-STATE-03)
    SES-->>L_REV: MessageId
    L_REV-->>APIGW: 200 OK { status: "INVITED", version: 2 }
    deactivate L_REV
    APIGW-->>UI: 200 OK
    UI-->>RCT: Cập nhật giao diện sang trạng thái "ĐÃ MỜI PHỎNG VẤN"
```

---

## 6. SEQ-05: Quản trị Kho Tài năng (Talent Pool) & AI Gợi ý Ứng viên (Rediscovery)

Sơ đồ mô tả quy trình lưu trữ ứng viên tiềm năng vào Kho tài năng công ty (`UC-RCT-09`) khi ứng viên đạt $\ge 60$ điểm và đã cấp quyền `consents.talentPool = true` (`BR-POOL-01`, `BR-POOL-02`). Khi có tin tuyển dụng mới mở, hệ thống hỗ trợ tính năng **Talent Rediscovery (`UC-RCT-10`)** để tự động rà quét và đề xuất ứng viên thích hợp sẵn có trong kho.

```mermaid
sequenceDiagram
    autonumber
    actor RCT as Nhà tuyển dụng (Recruiter)
    participant UI as Web Portal (HR Dashboard)
    participant APIGW as Amazon API Gateway
    participant L_POOL as Lambda (TalentPoolService)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant BDR as Amazon Bedrock (Claude 3 Haiku)

    Note over RCT, DDB: GIAI ĐOẠN 1: LƯU ỨNG VIÊN TIỀM NĂNG VÀO KHO TÀI NĂNG
    RCT->>UI: Tại hồ sơ ứng viên bị từ chối ở JD hiện tại (nhưng đạt 82đ), bấm "Lưu vào Talent Pool"
    UI->>APIGW: POST /api/v1/talent-pool { applicationId, notes: "Lưu cho dự án tương lai" }
    APIGW->>L_POOL: Invoke handler (addToTalentPool)
    activate L_POOL
    L_POOL->>DDB: GetItem APP#<applicationId> / METADATA
    DDB-->>L_POOL: App Data (aiScore: 82, candidateId, consents)

    L_POOL->>L_POOL: Kiểm tra điều kiện:<br/>1. aiScore >= 60 (BR-POOL-01: Strong/Potential Match)<br/>2. consents.talentPool == true (BR-POOL-02: Quyền riêng tư)
    
    alt Đủ điều kiện lưu kho
        L_POOL->>DDB: PutItem COMPANY#<companyId> / POOL#<candidateId>:<br/>GSI1PK = 'POOL#' + companyId, GSI1SK = 'SCORE#082#' + candidateId,<br/>primarySkills: ['Node.js', 'AWS', 'DynamoDB'], addedAt: <now>
        DDB-->>L_POOL: 200 OK
        L_POOL-->>APIGW: 201 Created { candidateId, addedAt }
        APIGW-->>UI: 201 Created
        UI-->>RCT: Thông báo xanh: "Đã lưu ứng viên vào Kho tài năng thành công."
    else Không đủ điều kiện (Điểm < 60 hoặc Ứng viên không đồng ý)
        L_POOL-->>APIGW: 400 Bad Request { code: "BAD_REQUEST", message: "Ứng viên không cấp quyền lưu trữ Talent Pool hoặc điểm đánh giá chưa đạt chuẩn." }
        APIGW-->>UI: 400 Bad Request
        UI-->>RCT: Hiển thị cảnh báo lỗi vi phạm quy định chính sách
    end
    deactivate L_POOL

    Note over RCT, BDR: GIAI ĐOẠN 2: TỰ ĐỘNG GỢI Ý ỨNG VIÊN TỪ KHO CHO TIN MỚI (REDISCOVERY)
    RCT->>UI: Mở tin tuyển dụng mới vừa tạo, bấm "Gợi ý ứng viên từ Talent Pool"
    UI->>APIGW: GET /api/v1/jobs/{newJobId}/talent-rediscovery
    APIGW->>L_POOL: Invoke handler (rediscoverTalent)
    activate L_POOL
    L_POOL->>DDB: GetItem JOB#<newJobId> / METADATA (Lấy kỹ năng yêu cầu của tin mới)
    DDB-->>L_POOL: Job Data (skillsRequired: ['Node.js', 'TypeScript', 'Serverless'])
    
    L_POOL->>DDB: Query GSI1PK = 'POOL#' + companyId (Lấy danh sách ứng viên trong kho xếp theo điểm)
    DDB-->>L_POOL: Danh sách ứng viên tiềm năng kèm kỹ năng đã trích xuất
    
    L_POOL->>BDR: Gửi batch đối soát nhanh mức độ tương đồng giữa Job mới và các ứng viên trong kho
    BDR-->>L_POOL: Danh sách xếp hạng tương đồng (Relevance Scores)
    
    L_POOL-->>APIGW: 200 OK { candidateList: [ { candidateName, relevanceScore: 88, matchingSkills } ] }
    deactivate L_POOL
    APIGW-->>UI: 200 OK
    UI-->>RCT: Hiển thị thẻ danh sách gợi ý ứng viên tiềm năng để HR chủ động liên hệ
```

---

## 7. SEQ-06: Quy trình Hủy Định danh Toàn diện theo Quyền DSR (Asynchronous DSR Pipeline)

Sơ đồ mô tả quy trình thực thi **Quyền được lãng quên (Right to be Forgotten - `BR-PRIV-02`, `UC-CDD-10`, `UC-AD-05`)**. Do khối lượng bản ghi cần xử lý trải dài qua nhiều bảng và tệp trên S3 có thể vượt quá giới hạn 100 items của `TransactWriteItems`, quy trình được thiết kế vận hành qua **Asynchronous DSR Pipeline Lambda** theo từng batch có kiểm soát, bảo đảm tính toàn vẹn và triệt tiêu toàn bộ thông tin cá nhân.

```mermaid
sequenceDiagram
    autonumber
    actor CDD as Ứng viên (Candidate)
    participant UI as Web Portal (Privacy Settings)
    participant APIGW as Amazon API Gateway
    participant L_DSR as Lambda (DSRInitiatorService)
    participant DDB as Amazon DynamoDB (Single-Table)
    participant SFN as Lambda Worker / Step Functions (DSR Pipeline)
    participant S3 as Amazon S3 (CV Storage Bucket)
    participant COG as Amazon Cognito User Pool

    CDD->>UI: Tại mục Quyền riêng tư, nhập "XAC NHAN XOA TAI KHOAN" & bấm Xóa
    UI->>APIGW: POST /api/v1/privacy/delete-account { confirmationText, reason }
    APIGW->>L_DSR: Invoke handler (requestAccountDeletion)
    activate L_DSR
    L_DSR->>DDB: UpdateItem USER#<candidateId> / PROFILE SET dsrStatus = 'PROCESSING'
    L_DSR->>SFN: Kích hoạt Asynchronous DSR Pipeline Execution (candidateId, email, traceId)
    L_DSR-->>APIGW: 202 Accepted { status: "PROCESSING", message: "Đang tiến hành khử định danh an toàn." }
    deactivate L_DSR
    APIGW-->>UI: 202 Accepted
    UI-->>CDD: Đăng xuất tài khoản và hiển thị thông điệp xác nhận đã tiếp nhận yêu cầu

    Note over SFN, S3: BATCH 1: XÓA VẬT LÝ TỆP CV TRÊN AMAZON S3
    activate SFN
    SFN->>S3: ListObjectsV2(Prefix: applications/.../candidateId, cvs/candidateId)
    S3-->>SFN: Danh sách S3 Keys tệp CV gốc
    SFN->>S3: DeleteObjectsCommand (Xóa vật lý vĩnh viễn toàn bộ tệp tài liệu và version)
    S3-->>SFN: 200 OK (Xóa S3 hoàn tất)

    Note over SFN, DDB: BATCH 2: XÓA CÁC SUB-ITEMS CỦA USER TRÊN DYNAMODB
    SFN->>DDB: Query PK = USER#<candidateId> (Lấy toàn bộ CV#, FAVORITE#, ALERT#, ACTIVE_APP#)
    DDB-->>SFN: Danh sách các sub-items cá nhân
    SFN->>DDB: BatchWriteItem (Xóa bỏ hoàn toàn các item CV cá nhân, việc yêu thích, alert và lock nộp đơn)
    
    Note over SFN, DDB: BATCH 3: XÓA HỒ SƠ KHỎI KHO TÀI NĂNG (TALENT POOL)
    SFN->>DDB: Query GSI2PK = USER#<candidateId> (Lấy các liên kết POOL công ty)
    DDB-->>SFN: Danh sách TalentPool items
    SFN->>DDB: DeleteItem COMPANY#<comp> / POOL#<candidateId> (Xóa sạch khỏi kho tài năng)

    Note over SFN, DDB: BATCH 4: KHỬ ĐỊNH DANH ĐƠN ỨNG TUYỂN & LÀM SẠCH VĂN BẢN AI
    SFN->>DDB: Query GSI2PK = USER#<candidateId> (Lấy toàn bộ Application items đã nộp)
    DDB-->>SFN: Danh sách các Applications
    loop Cho từng Application của Ứng viên
        SFN->>DDB: UpdateItem APP#<appId>:<br/>SET candidateId = 'ANONYMIZED_USER',<br/>candidateName = 'ANONYMIZED_USER',<br/>candidateEmail = null, coverLetter = null,<br/>cv.s3Key = null, extractedText = null,<br/>aiEvaluation.executiveSummary = null,<br/>aiEvaluation.keyStrengths = [],<br/>aiEvaluation.areasForImprovement = [],<br/>aiEvaluation.suggestedInterviewQuestions = []<br/>(BẢO TỒN: totalScore, matchLevel, criteriaScores, status cho doanh nghiệp)
    end

    Note over SFN, DDB: BATCH 5: XÓA EMAIL LOOKUP & KHỬ ĐỊNH DANH USER PROFILE
    SFN->>DDB: DeleteItem EMAIL#<email> / USER#<candidateId> (Giải phóng email)
    SFN->>DDB: UpdateItem USER#<candidateId> / PROFILE:<br/>SET candidateId = 'ANONYMIZED_USER',<br/>fullName = 'ANONYMIZED_USER',<br/>status = 'ANONYMIZED',<br/>REMOVE email, phone, bio, links, avatarUrl
    
    Note over SFN, COG: BATCH 6: GHI AUDIT BẢO LƯU & VÔ HIỆU HÓA COGNITO
    SFN->>DDB: PutItem USER#<candidateId> / CONSENT#<now>#ACCOUNT_DELETION:<br/>purpose: 'ACCOUNT_DELETION', status: 'REVOKED_ALL', ttl: <now + 90 days>
    SFN->>COG: AdminDisableUserCommand (Vô hiệu hóa tài khoản vĩnh viễn)
    COG-->>SFN: 200 OK
    deactivate SFN
```

---

## 8. Định nghĩa Hoàn thành & Kiểm chứng (Definition of Done)

- [x] Thiết kế đầy đủ **6 Sơ đồ Tuần tự Chi tiết (Mermaid Diagrams)** bao phủ 100% các nghiệp vụ trọng yếu nhất của hệ thống.
- [x] Mỗi sơ đồ đều thể hiện rõ: Đánh số bước tuần tự (`autonumber`), các tác nhân tham gia, khối phân nhánh `alt / else`, ghi chú lưu ý dữ liệu và cơ chế xử lý ngoại lệ.
- [x] Minh họa đầy đủ nguyên lý **Optimistic Concurrency Control (OCC)**, giao dịch phân tán DynamoDB `TransactWriteItems`, và cơ chế giải phóng khóa kháng trùng `ACTIVE_APP#<jobId>`.
- [x] Thể hiện chi tiết cơ chế phân luồng đa định dạng (PDF qua Textract, DOCX qua OpenXML native) và quy trình lọc PII trước khi gọi LLM.
- [x] Mô hình hóa rõ ràng quy trình **Asynchronous DSR Pipeline** xử lý theo từng batch có kiểm soát, bảo vệ quyền riêng tư người dùng triệt để.
