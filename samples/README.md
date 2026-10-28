# Dữ liệu mẫu (Sample Dataset)

Thư mục này chứa bộ dữ liệu mẫu phục vụ kiểm thử toàn bộ pipeline: Textract (PDF), Mammoth (DOCX), Khử PII (Regex), và Amazon Bedrock Rubric Scoring.

> ⚠️ **Lưu ý bảo mật:** Toàn bộ dữ liệu dưới đây là **dữ liệu giả lập (Synthetic/Mock Data)**, không chứa thông tin cá nhân thật của bất kỳ ai.

---

## 1. Danh sách Tin tuyển dụng mẫu (`samples/jobs/`)

| File | Vị trí | Cấp bậc | Trọng số Rubric |
| :--- | :--- | :--- | :--- |
| [`01-frontend-react-engineer.md`](jobs/01-frontend-react-engineer.md) | Senior Frontend React Engineer | 2–4 năm | Kỹ năng 40%, Kinh nghiệm 30%, Học vấn 15%, Trình bày 15% |
| [`02-backend-nodejs-engineer.md`](jobs/02-backend-nodejs-engineer.md) | Backend Serverless Node.js Engineer | 2–5 năm | Kỹ năng 40%, Kinh nghiệm 30%, Học vấn 15%, Trình bày 15% |
| [`03-devops-cloud-engineer.md`](jobs/03-devops-cloud-engineer.md) | DevOps & Cloud Infrastructure Engineer | 2–5 năm | Kỹ năng 40%, Kinh nghiệm 30%, Học vấn 15%, Trình bày 15% |

---

## 2. Danh sách Hồ sơ CV mẫu (`samples/cvs/`)

| File | Ứng viên giả lập | Vị trí nộp đơn | Kịch bản kiểm thử | Điểm kỳ vọng |
| :--- | :--- | :--- | :--- | :--- |
| [`01-high-match-backend.md`](cvs/01-high-match-backend.md) | Nguyễn Văn An | Backend Node.js | **High Match**: Khớp hoàn toàn kỹ năng Node.js, TypeScript, AWS Lambda, DynamoDB Single-Table | **90 – 95** |
| [`02-medium-match-backend-skillgap.md`](cvs/02-medium-match-backend-skillgap.md) | Trần Thị Bích | Backend Node.js | **Skill Gap & Talent Pool**: Ứng viên Java/Spring Boot muốn chuyển ngành, thiếu AWS Serverless → Dùng test báo cáo khoảng trống kỹ năng và lưu vào Talent Pool | **65 – 72** |
| [`03-high-match-frontend.md`](cvs/03-high-match-frontend.md) | Lê Văn Cường | Frontend React | **High Match**: Chuyên sâu React 18/19, TypeScript, Vanilla CSS Tokens, Vite, Performance Lighthouse 96 | **90 – 95** |
| [`04-low-match-sales.md`](cvs/04-low-match-sales.md) | Phạm Văn Dũng | Backend / Frontend | **Low Match / Reject**: Ứng viên trái ngành kinh doanh (Sales B2B) nộp nhầm sang kỹ thuật → Test bộ lọc từ chối tự động | **< 30** |
| [`05-pii-heavy-candidate.md`](cvs/05-pii-heavy-candidate.md) | Hoàng Thị Hương | DevOps AWS | **PII & Bias Redaction**: Hồ sơ chứa nhiều SĐT, Email, CCCD, Ngày sinh, Địa chỉ nhà → Test module Regex khử định danh trước khi gửi vào LLM | **85 – 90** |

