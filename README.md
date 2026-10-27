# AI CV Screening Portal — Website tuyển dụng có AI tự động sàng lọc CV

Workshop AWS (cá nhân, 2 tháng): nền tảng tuyển dụng serverless, tự động trích xuất nội dung CV (Amazon Textract) và chấm điểm mức độ phù hợp với JD (Amazon Bedrock).

> Trạng thái: **Khởi tạo cấu trúc dự án** — chưa chốt tech stack (IaC, frontend, ngôn ngữ Lambda).

## Cấu trúc thư mục

```text
workshop/
├── README.md                 # File này
├── .gitignore
├── docs/                     # Toàn bộ tài liệu (xem docs/README.md)
│   ├── references/           # Tài liệu tham khảo gốc: quy định workshop, proposal mẫu
│   ├── proposal/             # Bản đề xuất của đề tài (vi / en)
│   ├── plan/                 # Kế hoạch theo phase (27/10 – 31/12)
│   ├── software/             # Tài liệu phần mềm: SRS, use case, CSDL, API, test plan
│   ├── architecture/         # Kiến trúc hạ tầng AWS, data flow
│   │   └── diagrams/         # File sơ đồ (.drawio) và ảnh export (.png)
│   ├── workshop/             # Lab Guide 7 phần (vi / en)
│   └── cost/                 # Dự toán chi phí, link/export AWS Pricing Calculator
├── infra/                    # Infrastructure as Code (CDK hoặc Terraform)
├── backend/
│   ├── functions/            # Mỗi Lambda function một thư mục con
│   └── shared/               # Code dùng chung giữa các Lambda (model, utils)
├── frontend/                 # Web app (deploy bằng Amplify Hosting)
├── scripts/                  # Script tiện ích: seed dữ liệu, clean-up tài nguyên
├── samples/                  # CV và JD mẫu (dữ liệu giả) dùng để demo/test
│   ├── cvs/
│   └── jobs/
└── tests/                    # Kiểm thử tích hợp / end-to-end
```

## Dịch vụ AWS dự kiến

Amplify Hosting · Cognito · API Gateway · Lambda · S3 · SQS (+DLQ) · Textract · Bedrock · DynamoDB · SES · CloudWatch

Luồng xử lý CV: `S3 upload → S3 Event → SQS → Lambda → Textract → Bedrock → DynamoDB → SES`
