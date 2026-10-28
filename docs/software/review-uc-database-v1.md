# Rà soát Use Case và Database Design — v1

> **Phạm vi:** Đối chiếu [02-use-cases.md](./02-use-cases.md), [03-database-design.md](./03-database-design.md) phiên bản 1.0 và các yêu cầu liên quan trong [01-requirements.md](./01-requirements.md). Đây là bản review ban đầu ngày 28/10/2026; các nhận xét phản ánh phiên bản tài liệu tại thời điểm đó, không phải kết luận hiện hành về database v2.0.

## 1. Kết luận

Use Case có cấu trúc theo actor, nêu luồng chính và ngoại lệ; database đã xác định entity, key, access pattern, state machine, OCC và transaction chống nộp trùng. Tuy nhiên, bản thiết kế ban đầu còn một số sai lệch giữa SRS, UC và Database, đồng thời chưa có access pattern/schema cho một số luồng nghiệp vụ.

## 2. Nhận xét và đề xuất tại lần review ban đầu

### P1 — State machine và tên thuộc tính chưa thống nhất

- SRS và UC dùng `INVITED`, `ACCEPTED`, trong khi database dùng `SHORTLISTED`, `INTERVIEWING`, `OFFERED`; không rõ các trạng thái có tương đương hay cần bổ sung vào yêu cầu.
- Trạng thái AI được ghi `PENDING` ở SRS/UC nhưng `QUEUED` trong database. Tên trường cũng chưa thống nhất giữa `aiStatus` và `ai_status`.
- **Đề xuất:** Chốt enum và tên thuộc tính chuẩn trong SRS; đồng bộ sơ đồ, transition, condition expression, JSON và API. Mọi chuyển trạng thái cần điều kiện dựa trên trạng thái hiện tại.

### P1 — Khóa chống nộp trùng không hỗ trợ nộp lại

- SRS BR-DOC-02 cho phép nộp lại sau `REJECTED` hoặc `WITHDRAWN`, nhưng khóa `APPLIED_JOB#<jobId>` trong database không có vòng đời giải phóng; khóa có thể chặn vĩnh viễn lần nộp mới.
- UC-CDD-06 viện dẫn sai `BR-DOC-03` cho kiểm tra nộp trùng và nhắc `BR-DOC-04` chưa được định nghĩa; BR-DOC-03 thực tế quy định thời hạn presigned URL.
- **Đề xuất:** Dùng active lock, tạo cùng Application trong transaction và giải phóng nguyên tử khi đơn chuyển tới trạng thái được phép nộp lại. Sửa tham chiếu BR và xác định rõ `ACCEPTED` có khóa nộp tiếp hay không.

### P1 — Consent và DSR chưa có mô hình lưu trữ/khử định danh đầy đủ

- UC yêu cầu consent AI theo từng đơn, consent Talent Pool tùy chọn và khả năng thu hồi. Database có `ConsentLog` nhưng chưa có schema/access pattern đầy đủ để lưu scope, phiên bản điều khoản và grant/revoke.
- PII được sao chép trong Application, TalentPool, CV/text trích xuất và audit; quy trình DSR chưa định nghĩa xử lý toàn bộ các bản sao, dữ liệu S3, khóa chống trùng và audit bất biến.
- **Đề xuất:** Bổ sung data lineage và quy trình xóa/ẩn danh cho từng bản sao; xác định consent scope, hiệu lực khi revoke, retention và cơ chế DSR có retry/idempotency. Phối hợp chính sách audit với yêu cầu loại bỏ PII.

### P1 — Thiếu access pattern cho tìm kiếm, favorite và job alert

- UC-CDD-04 yêu cầu tìm/khám phá việc làm; UC-CDD-05 yêu cầu lưu việc yêu thích và đăng ký nhận tin. Database ban đầu chỉ có truy vấn việc `OPEN`, chưa mô hình hóa favorite/alert, tiêu chí tìm kiếm và phân trang.
- **Đề xuất:** Thêm entity/AP cho favorites và subscriptions; mô tả bộ lọc, phân trang và giới hạn. Nếu cần full-text/facet search, xác định search service/index thay vì dựa vào FilterExpression trên DynamoDB.

### P1 — GSI1 không đáp ứng đồng thời tra cứu email và thành viên theo công ty

- AP tra User theo email và AP liệt kê recruiter theo Company cùng dùng GSI1, nhưng User item chỉ có một giá trị `GSI1PK`. Ví dụ recruiter dùng `COMPANY#...`, nên không thể đồng thời tra bằng `EMAIL#...`.
- **Đề xuất:** Chọn Cognito làm nguồn tra email authoritative hoặc tạo email lookup item riêng có conditional write/đảm bảo uniqueness và xử lý đổi email.

### P1 — Đánh giá HR bị ghi đè khi có nhiều reviewer

- UC-RCT-05 yêu cầu nhiều thành viên HR Team ghi và xem lịch sử đánh giá. Schema ban đầu lưu một object `recruiterReview` trên Application nên reviewer sau có thể ghi đè reviewer trước.
- **Đề xuất:** Tách review thành item riêng theo application và reviewer; định nghĩa AP đọc/ghi review. Giữ audit trail riêng cho quyết định và lịch sử thay đổi.

### P2 — Thiếu nhật ký truy cập CV và lịch sử kiểm duyệt

- UC-RCT-12/NFR-SEC-05 cần log tải CV; UC-AD-03 cần lý do và lịch sử khóa tin. Các entity/AP ban đầu chưa mô tả rõ các sự kiện này.
- **Đề xuất:** Phân biệt audit nghiệp vụ, access log bảo mật và moderation log; định nghĩa schema, quyền truy cập, nguồn phát sinh và retention, tránh ghi URL presigned/token.

### P2 — Rate-limit, TTL và email chưa đủ đặc tả

- Mẫu truy cập ban đầu gộp upload session và rescore rate limit, nhưng chưa mô tả cách đếm nguyên tử giới hạn 3 lần/giờ. Theo dõi email gửi/retry/bounce cũng chưa được mô hình hóa.
- **Đề xuất:** Tách access pattern theo entity; nêu điều kiện cập nhật, idempotency, trạng thái gửi và kiểm tra thời hạn ở tầng ứng dụng. TTL chỉ nên dùng để dọn dữ liệu quá hạn, không thay thế kiểm tra thời hạn chính xác.

### P2 — Tuyên bố bao phủ access pattern chưa có traceability đầy đủ

- Database tuyên bố bao phủ toàn bộ Use Case, nhưng chưa chỉ rõ nguồn dữ liệu/truy vấn cho analytics, dashboard, moderation, DLQ và một số luồng hệ thống.
- **Đề xuất:** Tạo ma trận `UC -> thao tác đọc/ghi -> AP hoặc dịch vụ ngoài -> key/index -> quyền truy cập`; chỉ xác nhận DoD sau khi từng UC có đường đọc/ghi và cách vận hành cụ thể.

## 3. Kết quả sau rà soát

Các nhận xét này là snapshot của review v1. Những mục đã được khắc phục hoặc còn tồn tại trong phiên bản database tiếp theo được ghi riêng trong [review-uc-database-v2.md](./review-uc-database-v2.md).
