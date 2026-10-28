# Tài liệu dự án

| Thư mục | Nội dung |
| :--- | :--- |
| [references/](references/) | Tài liệu gốc: [rule-workshop.md](references/rule-workshop.md), [proposal_template.md](references/proposal_template.md) (kèm ảnh minh họa) |
| [proposal/](proposal/) | Bản đề xuất của đề tài |
| [plan/](plan/) | Kế hoạch end-to-end theo phase (27/10 – 31/12), milestone, checklist |
| [software/](software/) | Tài liệu phân tích – thiết kế phần mềm: yêu cầu, use case, CSDL, API, kiểm thử |
| [architecture/](architecture/) | Kiến trúc hạ tầng AWS, quy chuẩn công nghệ ([tech-stack.md](architecture/tech-stack.md)) & data flow; sơ đồ trong `diagrams/` |
| [workshop/](workshop/) | Lab Guide: Overview, Prerequisites, Architecture, Step-by-step, Testing, Clean-up, Demo |
| [cost/](cost/) | Dự toán chi phí (AWS Pricing Calculator) & chiến lược tối ưu |

## Quy ước

- **Song ngữ:** mỗi tài liệu chính có 2 bản, đặt hậu tố ngôn ngữ: `proposal.vi.md`, `proposal.en.md`.
- **Lab Guide:** đánh số theo thứ tự đọc, ví dụ `01-overview.vi.md`, `02-prerequisites.vi.md`, ...
- **Tài liệu phần mềm (`software/`):** đánh số theo trình tự phân tích → thiết kế → kiểm thử:
  - `01-requirements.md` — Đặc tả yêu cầu (SRS): actor, yêu cầu chức năng / phi chức năng
  - `02-use-cases.md` — Use case diagram + đặc tả từng use case
  - `03-database-design.md` — Thiết kế bảng DynamoDB (access patterns, PK/SK, GSI)
  - `04-api-spec.md` — Danh sách endpoint, request/response (có thể kèm `openapi.yaml`)
  - `05-sequence-diagrams.md` — Luồng tương tác (nộp CV, chấm điểm, mời phỏng vấn)
  - `06-test-plan.md` — Test case chức năng & kịch bản lỗi
  - `diagrams/` — File nguồn và ảnh của use case / sequence / ERD
- **Sơ đồ:** lưu cả file nguồn (`.drawio`) và ảnh export (`.png`) cùng tên trong `architecture/diagrams/`.
- **Ảnh chụp màn hình Lab Guide:** đặt trong `workshop/images/<số-bước>/`.
