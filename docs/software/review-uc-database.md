# Nhận xét đặc tả Use Case và thiết kế Database

> **Phạm vi:** Đọc đối chiếu [02-use-cases.md](./02-use-cases.md), [03-database-design.md](./03-database-design.md) và tham chiếu các quy tắc liên quan trong [01-requirements.md](./01-requirements.md). Đây là review tài liệu, chưa xác minh mã nguồn hay cấu hình AWS đang chạy.
>
> **Ngày review:** 28/10/2026

## 1. Kết luận chung

Hai tài liệu có cấu trúc tốt: UC được nhóm theo actor, nêu luồng chính và ngoại lệ; thiết kế dữ liệu đã lập danh mục entity, access pattern, khóa DynamoDB, trạng thái kép, OCC và transaction chống nộp trùng. Tuy nhiên, hiện chưa nên coi database design là baseline triển khai đã hoàn tất: một số enum và quy tắc nghiệp vụ không khớp SRS/UC, còn các UC quan trọng chưa được ánh xạ thành access pattern hoặc dữ liệu lưu trữ tương ứng.

**Ưu tiên trước khi triển khai:** thống nhất state machine và tên thuộc tính; sửa cơ chế chống nộp trùng để hỗ trợ nộp lại hợp lệ; xác định mô hình consent/DSR và review nhiều recruiter; lập access pattern cho tìm kiếm, yêu thích/thông báo và nhật ký truy cập.

## 2. Các điểm cần sửa

### P1 — Đồng bộ enum và chuyển trạng thái giữa SRS, UC và Database

- **Đối chiếu:** SRS mục 5.3 và 6.1 dùng `INVITED`, `ACCEPTED`; UC-CDD-07/09 và UC-RCT-06 cũng dùng `INVITED`; database mục 5 lại dùng `SHORTLISTED`, `INTERVIEWING`, `OFFERED`. UC/DB vì vậy mô tả các hợp đồng khác nhau cho cùng một `status`.
- Pipeline AI cũng không thống nhất: SRS và UC khởi tạo bằng `PENDING`, database state machine khởi tạo bằng `QUEUED`; ví dụ Application dùng `aiStatus`, trong khi mô tả và UC dùng `ai_status`, còn ma trận chuyển đổi có cả hai cách viết.
- Database có chuyển trạng thái `UNDER_REVIEW -> SHORTLISTED -> INTERVIEWING`, nhưng SRS quy định `UNDER_REVIEW -> INVITED`; `ACCEPTED` của SRS tương ứng chưa rõ có phải `OFFERED` hay không. `SHORTLISTED` cũng không xuất hiện trong state machine của SRS.
- **Đề xuất:** Chốt một bộ enum duy nhất trong SRS làm hợp đồng chuẩn; cập nhật sơ đồ, bảng transition, điều kiện DynamoDB, ví dụ JSON, API và UC theo hợp đồng đó. Nên dùng cùng cách viết thuộc tính xuyên suốt (ví dụ `aiStatus` theo kiểu camelCase trong JSON, hoặc `ai_status` nếu đó là chuẩn API) và ghi rõ mapping nếu API khác DB. Chỉ giữ `SHORTLISTED`/`INTERVIEWING` nếu bổ sung định nghĩa, transition, actor và thông báo tương ứng vào SRS/UC.
- **Thêm kiểm tra:** trạng thái mới phải được xác thực bằng condition expression trên trạng thái hiện tại; không dùng điều kiện `ANY` chung chung.

### P1 — Cơ chế chống nộp trùng hiện ngăn cả việc nộp lại được phép

- **Đối chiếu:** SRS mục BR-DOC-02 cho phép nộp lại sau `REJECTED` hoặc `WITHDRAWN`. Database AP16–AP17 tạo khóa `USER#<candidateId> / APPLIED_JOB#<jobId>` và transaction yêu cầu khóa chưa tồn tại, nhưng không mô tả cập nhật/xóa khóa khi đơn kết thúc. Khóa này vì vậy có thể chặn vĩnh viễn lần nộp tiếp theo.
- UC-CDD-06 bước 2 trỏ tới `BR-DOC-03` để kiểm tra đơn trùng, trong khi SRS định nghĩa kiểm tra đơn trùng ở `BR-DOC-02`; `BR-DOC-03` là thời hạn presigned URL. Bảng UC cũng viện dẫn `BR-DOC-04`, nhưng SRS hiện chỉ liệt kê BR-DOC-01 đến BR-DOC-03.
- **Đề xuất:** Sửa tham chiếu BR ở UC; định nghĩa rõ vòng đời của “active application lock”. Tạo khóa và Application trong cùng transaction; gỡ khóa atomically khi đơn chuyển sang trạng thái cho phép nộp lại (`REJECTED`/`WITHDRAWN`) và chỉ cấp khóa lại nếu transition hiện tại hợp lệ. Không xóa khóa theo kiểu không điều kiện hoặc dựa vào lần đọc trước. Làm rõ thêm `ACCEPTED` có được xem là trạng thái kết thúc không cho nộp lại.
- **Acceptance criteria:** cùng candidate/job không thể có hai đơn hoạt động; sau `REJECTED` hoặc `WITHDRAWN`, ứng viên có thể nộp lại đúng một lần; request retry/idempotent không sinh đơn hoặc message trùng.

### P1 — Mô hình consent và yêu cầu DSR chưa bao phủ các bản sao dữ liệu

- **Đối chiếu:** UC-CDD-06 yêu cầu consent AI theo từng đơn và consent Talent Pool tùy chọn; UC-CDD-10 cho phép thu hồi consent. Database User chỉ có `privacyConsent` dạng boolean/ngày; Application có `consent`; `ConsentLog` được liệt kê nhưng không có access pattern hay ví dụ schema. Chưa xác định thời điểm hiệu lực, phiên bản điều khoản, mục đích, chủ thể nhận dữ liệu, thu hồi và phạm vi các đơn đã nộp.
- Dữ liệu định danh được sao chép trong Application (`candidateName`, `candidateEmail`, CV), TalentPool (`candidateName`, `candidateEmail`) và AuditTrail (`actorEmail`, IP). DSR ở UC yêu cầu xóa hồ sơ, CV và PII trong lịch sử; database mục 7 mới mô tả khử định danh User và xóa S3 CV, chưa nêu cách xử lý các bản sao, nội dung trích xuất CV, TalentPool, ConsentLog, khóa chống trùng và bản ghi audit bất biến. Mục tiêu “audit bất biến” và “loại bỏ hoàn toàn PII” cần có quy tắc phối hợp rõ ràng.
- **Đề xuất:** Bổ sung entity/access patterns cho ConsentLog: ghi append-only mỗi lần grant/revoke, purpose, scope (tài khoản/đơn/công ty), phiên bản nội dung, thời điểm, nguồn và bằng chứng cần thiết. Chốt consent nào bắt buộc để nộp đơn, consent Talent Pool có thể thu hồi ra sao, và thu hồi có xóa bản ghi TalentPool hiện có hay không.
- **Đề xuất DSR:** Lập bảng data lineage theo từng bản sao PII và hành động tương ứng (xóa, ẩn danh, giữ theo căn cứ hợp lệ); bao gồm S3, text trích xuất, Application, TalentPool, User, ConsentLog và audit metadata. Nêu cách bảo toàn audit mà không giữ PII không cần thiết, cách xử lý yêu cầu đang chờ/xử lý nền, retry và tính idempotent của quy trình. Tránh lưu IP/email trong audit nếu không có mục đích, quyền truy cập và thời hạn lưu rõ ràng.

### P1 — UC tìm việc, yêu thích và thông báo chưa có access pattern đầy đủ

- **Đối chiếu:** UC-CDD-04 là tìm kiếm/khám phá việc làm; UC-CDD-05 là lưu việc yêu thích và đăng ký nhận tin. Trong AP chỉ có AP11 để truy vấn Job `OPEN` theo thời gian; không có entity/khóa/AP cho favorite, alert/subscription hoặc danh sách tin đã lưu. AP11 cũng không mô tả lọc theo kỹ năng, địa điểm, lương hay từ khóa.
- **Đề xuất:** Bổ sung các truy vấn cần phục vụ (liệt kê favorite theo candidate, thêm/xóa favorite, quản lý tiêu chí alert, tìm việc theo điều kiện và phân trang) cùng khóa/index, phạm vi lọc, giới hạn và consistency mong muốn. Nếu tìm kiếm từ khóa/facet cần vượt khả năng truy vấn hiệu quả của DynamoDB, xác định rõ search index/service riêng, đồng bộ dữ liệu, độ trễ cập nhật và hành vi fallback; không coi `FilterExpression` trên tập dữ liệu lớn là full-text search.

### P1 — GSI1 không thể vừa tra email vừa liệt kê recruiter theo Company trên cùng User item

- **Đối chiếu:** AP02 yêu cầu tìm User theo email qua `GSI1PK = EMAIL#...`; AP04 yêu cầu liệt kê recruiter theo Company cũng qua GSI1. Matrix và ví dụ User cho recruiter lại đặt `GSI1PK = COMPANY#...`, nên recruiter không thể được truy vấn qua email theo AP02. GSI chỉ có một giá trị partition key trên mỗi item; hai mẫu này không thể đồng thời dùng cùng User item theo mô tả hiện tại.
- **Đề xuất:** Chọn nguồn xác thực/tra email duy nhất (ví dụ Cognito nếu nó là nguồn authoritative) và nêu rõ AP02 không tra DynamoDB; hoặc tạo item phụ tra cứu email có điều kiện tạo duy nhất, được ghi/xóa đồng bộ với User. Nếu chọn item phụ, mô tả giao dịch/compensation và xử lý đổi email. Không dựa vào GSI để đảm bảo uniqueness.

### P1 — Review của HR Team đang là một trường ghi đè, không phải lịch sử nhiều người

- **Đối chiếu:** UC-RCT-05 yêu cầu các reviewer trong HR Team cùng ghi nhận và xem đánh giá; hậu điều kiện yêu cầu lịch sử đánh giá. Schema Application chỉ có một object `recruiterReview` gồm `rating`, `manualNotes`, `reviewedBy`, `reviewedAt`. Cập nhật object này sẽ ghi đè đánh giá trước của thành viên khác; AuditTrail có thể lưu sự kiện nhưng chưa được định nghĩa là nguồn đọc danh sách review hiện tại.
- **Đề xuất:** Tách review thành item riêng theo application và reviewer (ví dụ `PK=APP#<id>`, `SK=REVIEW#<reviewerId>`), kèm version/updatedAt; hoặc lưu từng review dạng append-only với quy tắc rõ ràng về chỉnh sửa và truy vấn. Giữ AuditTrail riêng cho các quyết định/thay đổi cần kiểm toán. Bổ sung AP ghi/đọc danh sách review của một Application.

### P2 — Nhật ký tải CV và kiểm duyệt chưa được mô hình hóa

- **Đối chiếu:** UC-RCT-12 và NFR-SEC-05 yêu cầu access log khi tải CV; AP22–AP23 chỉ mô tả audit hoạt động trên Application, chưa định nghĩa sự kiện đọc/tải CV, actor, purpose, thời điểm, kết quả và truy vấn log. UC-AD-03 yêu cầu lưu lý do khóa Job; Job schema/AP12 không xác định trường moderation reason hoặc audit item tương ứng.
- **Đề xuất:** Phân biệt audit nghiệp vụ (status/review) với security access log (đọc/tải tài liệu) và moderation event. Bổ sung schema, writer, quyền truy cập, retention, truy vấn điều tra và quy tắc tránh ghi URL presigned/token hay PII dư thừa. Nếu log được chuyển sang CloudWatch/S3 thay vì DynamoDB, ghi rõ nguồn dữ liệu, retention và cách UC-AD/UC-RCT truy cập.

### P2 — Rate-limit rescore, upload session và thông báo chưa có cấu trúc đọc/ghi nhất quán

- **Đối chiếu:** AP26 gộp Upload Session và RateLimit trong một pattern, nhưng ví dụ truy vấn dùng `SK=SESSION` cho cả hai, trong khi matrix định nghĩa rate-limit là `SK=ACTION#RESCORE`. UC-RCT-07 yêu cầu tối đa 3 lần/giờ; chưa nêu cách lưu các lần gọi hoặc bộ đếm trong cửa sổ trượt, cập nhật nguyên tử và TTL phù hợp. UC-CDD-11/UC-RCT-11 gửi nhiều loại email nhưng không có mô hình theo dõi sự kiện gửi, retry hoặc bounce.
- **Đề xuất:** Tách AP26 thành AP riêng cho upload session và rescore rate limit, thống nhất key format với matrix/schema, mô tả điều kiện cập nhật nguyên tử và TTL. Định nghĩa riêng việc theo dõi email (nếu cần audit/retry/bounce): idempotency key, trạng thái gửi, số lần thử và dữ liệu được giữ; không đồng nhất việc gọi SES thành đảm bảo email đã tới inbox.

### P2 — Access pattern và tuyên bố bao phủ hiện chưa kiểm chứng được

- **Đối chiếu:** Database khẳng định 26 AP bao phủ 32 UC, nhưng thiếu AP cho các luồng nêu trên; AP26 còn gộp hai dạng dữ liệu khác nhau. UC-AD-01 (KPI), UC-RCT-08 (skill gap analytics), UC-AD-04 (DLQ), UC-AD-02 (khóa user) và UC-AD-03 (khóa job) chưa có mô tả truy vấn/nguồn dữ liệu tương ứng.
- **Đề xuất:** Thêm ma trận traceability `UC -> thao tác đọc/ghi -> AP -> PK/SK/GSI hoặc dịch vụ ngoài -> dữ liệu trả về -> quyền truy cập`. Với dashboard/analytics, nêu rõ dùng truy vấn online, aggregate counter, stream hay kho phân tích; nếu dùng counter như `applicationCount`/`activeJobCount`, quy định cập nhật transactionally, cách sửa lệch và khả năng eventual consistency. Sau đó mới chốt số lượng AP/GSI và DoD.

## 3. Danh sách hiệu chỉnh tài liệu theo thứ tự

1. **SRS:** chốt enum và transition cho `status`/`ai_status`, chính sách nộp lại, consent scope và DSR; loại bỏ thuật ngữ trạng thái chưa dùng hoặc bổ sung định nghĩa.
2. **Use Cases:** sửa tham chiếu BR sai/không tồn tại; bổ sung điều kiện lỗi, quy tắc quyền truy cập và kết quả dữ liệu cho search, favorites/alerts, multi-review, audit log, moderation và DSR.
3. **Database:** cập nhật entity/schema/key/AP từ các quyết định đã chốt; phân tách AP26; chỉ tuyên bố bao phủ khi mỗi luồng UC đã có truy vấn/ghi và cơ chế lưu trữ cụ thể.
4. **Kiểm chứng:** thêm bảng kiểm thử tính nhất quán cho transition/conditional writes, nộp lại sau trạng thái kết thúc, consent revoke/DSR, recruiter thuộc nhiều công ty (nếu được hỗ trợ), pagination/search, OCC và retry/idempotency.

## 4. Điểm tốt nên giữ

- Có danh mục entity và access pattern cụ thể thay vì chỉ mô tả ERD khái quát.
- Đã nhận diện nhu cầu idempotency, OCC, TTL và quyền truy cập CV có thời hạn.
- Phân biệt trạng thái xét tuyển với trạng thái pipeline AI là hướng đúng; cần thống nhất enum và cách lưu để giữ được lợi ích này.
- Có đề cập consent Talent Pool, audit trail và quyền DSR; nên hoàn thiện thành luồng dữ liệu có thể kiểm thử thay vì chỉ dừng ở mô tả.
