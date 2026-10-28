# Rà soát Use Case và Database Design v2.0 (v2)

> **Phạm vi:** Đối chiếu [02-use-cases.md](./02-use-cases.md), [03-database-design.md](./03-database-design.md) phiên bản 2.0 và các yêu cầu liên quan trong [01-requirements.md](./01-requirements.md). Đây là rà soát tài liệu, chưa xác minh mã nguồn hay cấu hình AWS đang chạy.
> **Ngày rà soát:** 28/10/2026

## 1. Kết quả rà soát

Database v2.0 đã xử lý phần lớn các vấn đề thiết kế được nêu trong lần review trước. Tuy nhiên, **chưa nên xem Definition of Done là hoàn tất**: ma trận traceability vẫn gán sai một số Use Case; chính sách DSR chưa thống nhất với SRS; và một số access pattern/luồng vận hành chưa đủ chi tiết để triển khai, kiểm chứng.

## 2. Các góp ý đã được xử lý

- **Trạng thái và thuộc tính:** database thống nhất `status` (`SUBMITTED`, `UNDER_REVIEW`, `INVITED`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`) và `aiStatus` (`PENDING`, `EXTRACTING`, `SCORING`, `COMPLETED`, `FAILED`); có ma trận transition với điều kiện trạng thái hiện tại.
- **Nộp lại hợp lệ:** `ACTIVE_APP#<jobId>` thay khóa chống trùng cũ, được tạo/xóa đồng thời với Application khi nộp mới hoặc kết thúc ở `REJECTED`/`WITHDRAWN`; có ghi rõ cách xử lý `ACCEPTED`.
- **Mô hình nghiệp vụ mới:** đã bổ sung lookup item cho email, item review riêng theo reviewer, favorite/job alert, consent log, moderation log, CV access log và notification log.
- **Tham chiếu BR ở UC nộp hồ sơ:** đã điều chỉnh về các quy tắc hiện có.

## 3. Còn cần sửa — P1

### P1 — Ma trận traceability gán sai Use Case và Access Pattern

- **Vị trí:** Database mục 9, các dòng UC-RCT-03 đến UC-RCT-05 và UC-SYS-01 đến UC-SYS-03.
- UC-RCT-03 trong Use Case là bảng xếp hạng ứng viên, nhưng ma trận ghi quản lý tin tuyển dụng/AP10. UC-RCT-04 là side-by-side review, nhưng ma trận ghi leaderboard/AP23. UC-RCT-05 là đánh giá thủ công, nhưng dòng ma trận lại mô tả side-by-side.
- UC-SYS-01 là điều phối hàng đợi; UC-SYS-02 mới là trích xuất PDF/DOCX; UC-SYS-03 bao gồm khử PII và chấm AI. Ma trận hiện lần lượt ghi trích xuất, khử PII và chấm điểm, làm lệch phạm vi các UC.
- Tiêu đề “32 Use Cases → 32 APs” gây hiểu nhầm: nhiều UC dùng nhiều AP, nhiều UC dùng chung AP, và UC-AD-04 dùng dịch vụ ngoài; đây không phải ánh xạ 1:1.
- **Đề xuất:** Sửa tên/phạm vi và AP theo đúng mã UC từ tài liệu use case; đổi tiêu đề thành “Ma trận truy xuất 32 Use Cases tới Access Patterns/dịch vụ” và kiểm tra đủ 32 dòng với danh mục UC trước khi đánh dấu hoàn tất.

### P1 — DSR chưa thực hiện đầy đủ chính sách trong SRS và còn giữ định danh có thể liên kết

- **Đối chiếu:** SRS BR-PRIV-02 yêu cầu thay `CandidateId` trên các bản ghi giao dịch và Audit Trail thành `ANONYMIZED_USER`. Database mục 6.2 lại yêu cầu giữ `candidateId` trong Application và giữ nguyên AuditTrail. Hai yêu cầu mâu thuẫn trực tiếp.
- Database giữ `email` đã băm SHA-256 trong User; hash email không có khóa bí mật có thể bị dò bằng dictionary. ConsentLog được mô tả append-only và giữ `ipAddress`/`userAgent` không TTL, là dữ liệu có thể liên kết đến cá nhân. Mục DSR thêm `REVOKED_ALL` nhưng enum/khóa consent hiện chỉ mô tả `GRANTED`/`REVOKED` và `CONSENT#<timestamp>#<purpose>`, chưa định nghĩa trạng thái và khóa cho sự kiện này.
- Application giữ `aiEvaluation` nhưng chưa nêu rõ cách xóa/ẩn danh `executiveSummary`, strengths, gaps, interview questions, hoặc dữ liệu trích xuất ngoài `extractedText`; các nội dung này có thể chứa thông tin cá nhân được mô hình nhắc lại.
- **Đề xuất:** Đồng bộ SRS và Database trước: xác định trường nào được giữ và vì sao; thay/xóa ID ứng viên và GSI tham chiếu trên mọi bản ghi còn lưu, bao gồm cả audit nếu SRS yêu cầu. Xóa email khỏi User sau khi xóa email lookup thay vì giữ SHA-256 email thường. Quy định thời hạn/xóa hoặc khử định danh ConsentLog và access log; xử lý toàn bộ output AI, text trích xuất, CV, S3 versioning/replica/backup. Mô tả DSR bất đồng bộ có idempotency, retry, trạng thái tiến trình và báo lỗi. Nếu cần giữ audit theo căn cứ hợp lệ, cập nhật SRS để nói rõ ngoại lệ và loại bỏ khóa liên kết có thể nhận diện.

### P1 — Use Case vẫn dùng `ai_status` trong khi Database chốt `aiStatus`

- **Vị trí:** UC-CDD-06/07 và UC-SYS-01/03; Database mục 1 và 3.
- Database tuyên bố thuộc tính DB và DTO dùng camelCase (`aiStatus`), nhưng Use Case vẫn gọi `ai_status`. Đặc tả vì vậy chưa xác định rõ tên trường của hợp đồng API/response.
- **Đề xuất:** Sửa UC sang `aiStatus`, hoặc mô tả rõ snake_case là tên API còn DB dùng camelCase, kèm quy tắc mapping được kiểm thử.

## 4. Còn cần hoàn thiện — P2

### P2 — AP11 chưa đặc tả được tìm kiếm như UC yêu cầu

- AP11 chỉ partition theo `JOBS#STATUS#OPEN`, sort theo ngày tạo và ghi chung “kèm FilterExpression”. Chưa có giới hạn rõ cho keyword, kỹ năng, địa điểm, khoảng lương, phân trang hay quy tắc lọc. Filter sau khi đọc không làm giảm số item được đọc và không phải full-text search.
- **Đề xuất:** Liệt kê các bộ lọc được hỗ trợ và giới hạn vận hành; nếu cần tìm kiếm toàn văn/facet, chỉ rõ search service/index, đồng bộ dữ liệu, độ trễ và hành vi khi index lỗi. Không tuyên bố đáp ứng tìm kiếm tổng quát chỉ bằng FilterExpression trên GSI.

### P2 — AP05 không trả về được Recruiter theo vai trò

- Matrix gán Recruiter `GSI1PK = COMPANY#<companyId>` để liệt kê thành viên; AP05 lại truy vấn `GSI1PK = ROLE#<role>`. Vì vậy `ROLE#RECRUITER` không thể trả về các item Recruiter theo schema hiện tại. UC-AD-01 cũng cần số lượng tài khoản theo vai trò.
- **Đề xuất:** Dùng nguồn thống kê/aggregate riêng cho dashboard hoặc thêm item phụ theo role; nêu rõ cách duy trì và eventual consistency. Không thể gán đồng thời hai giá trị GSI1PK cho cùng User item.

### P2 — AP32 gộp ba luồng TTL nhưng chưa định nghĩa cách bảo đảm hành vi

- AP32 gom upload session, rescore rate limit và notification log thành một dòng `Put/Get` chung; chưa có key condition/transaction cụ thể cho từng entity. `RESCORE#<hourSlot>` chưa nói cách tăng bộ đếm nguyên tử và thực thi giới hạn 3 lần trong cửa sổ một giờ; `NOTIF#<idempotencyKey>` chưa định nghĩa trạng thái gửi, retry hay mapping SES event.
- TTL của DynamoDB xóa bản ghi theo tiến trình nền, không bảo đảm item biến mất đúng thời điểm hết hạn; không thể dùng TTL đơn lẻ để thực thi chính xác rate limit hoặc thời hạn bảo mật.
- **Đề xuất:** Tách AP cho từng entity, mô tả ConditionExpression/counter hoặc timestamp-window, idempotency và trạng thái notification. API cần tự kiểm tra `expiresAt`/thời hạn kể cả khi item TTL chưa bị xóa; chỉ coi TTL là cơ chế dọn dẹp cuối cùng.

### P2 — Access log chỉ ghi lúc cấp URL, chưa chứng minh tài liệu đã được mở/tải

- Database mục 7.1 ghi log khi Recruiter sinh presigned URL nhưng gọi đó là `CV_VIEW`/`CV_DOWNLOAD`. Việc cấp URL không xác nhận client đã truy cập S3; URL có thể được tái sử dụng trong thời hạn hiệu lực.
- **Đề xuất:** Định nghĩa sự kiện chính xác là “cấp quyền truy cập” hoặc bổ sung nguồn log xác nhận request S3 thực tế (ví dụ S3 data events/access logs). Lưu `traceId`/URL grant ID nếu cần đối soát; không ghi presigned URL hay token vào log.

### P2 — Thiếu schema cụ thể cho nhiều item mới và thao tác DSR

- Ma trận entity/AP có thêm `Email Lookup`, `Favorite Job`, `Job Alert`, `Active App Lock`, `Job Moderation`, `Rescore RateLimit` và `Notification Log`, nhưng schema chi tiết mới minh họa Application, Review, CV Access Log và ConsentLog. Chưa có transaction DSR có thể chạy qua các item và S3, hay cách xử lý vượt giới hạn giao dịch/batch.
- **Đề xuất:** Bổ sung schema/key conditions và ví dụ ghi/xóa cho các item này; mô tả service chịu trách nhiệm, retry, phân trang và tính idempotent. Với DSR nhiều item, trình bày quy trình orchestration theo từng batch và trạng thái hoàn tất thay vì gọi là một transaction duy nhất.

## 5. Kết luận

Database v2.0 đã giải quyết phần lớn các vấn đề cấu trúc được phát hiện trước đó, nhưng **chưa nên đánh dấu toàn bộ Definition of Done là hoàn tất**. Ưu tiên sửa các điểm P1 ở mục 3, sau đó hoàn thiện P2 và cập nhật DoD dựa trên bằng chứng kiểm thử/traceability.
