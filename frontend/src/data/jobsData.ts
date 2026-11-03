// Auto-generated from data.json (35 enterprise tech jobs)
// Generated at: 2026-11-03T05:46:50.810Z

export interface DetailedJob {
  id: string;
  title: string;
  companyName: string;
  companyScale: string;
  isVerified: boolean;
  matchScore?: number;
  badgeType?: 'match' | 'new' | 'hot';
  salaryText: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  experience: string;
  postedTime: string;
  workType: 'Toàn thời gian' | 'Bán thời gian' | 'Làm từ xa / Remote' | 'Hybrid linh hoạt';
  level: 'Intern' | 'Fresher / Junior' | 'Middle' | 'Senior Specialist' | 'Lead / Principal Architect';
  description: string;
  skills: string[];
  perks: string;
  perkType: 'star' | 'bolt' | 'award' | 'gift' | 'shield';
  logoGradient: string;
  logoType: 'cloud' | 'bank' | 'brain' | 'cart' | 'shield';
  isTopMatch?: boolean;
  rubricBreakdown?: {
    total: number;
    experience: number;
    skills: number;
    education: number;
    culture: number;
    summary: string;
    strengths: string[];
    improvements: string[];
  };
  companyId?: string;
  rawLocation?: {
    fullAddress?: string;
    province?: string;
    district?: string;
    ward?: string;
    isPostJuly2025?: boolean;
  };
  requirements?: string[];
  benefits?: string[];
  source?: {
    platform?: string;
    originalUrl?: string;
    crawledAt?: string;
  } | null;
  deadline?: string | null;
}

export const ALL_JOBS: DetailedJob[] = [
  {
    "id": "job_ED0363FBAE304D04",
    "title": "Senior DevOps Engineer (AWS & Azure Hybrid)",
    "companyName": "Authentic Education Hub",
    "companyScale": "100-250 nhân sự",
    "isVerified": true,
    "matchScore": 95,
    "badgeType": "match",
    "salaryText": "35 - 40 triệu / tháng",
    "salaryMin": 35,
    "salaryMax": 40,
    "location": "Cầu Giấy, Hà Nội • Phường Dịch Vọng Hậu (Cầu Giấy)",
    "experience": "5+ năm kinh nghiệm quản trị hệ thống và CI/CD",
    "postedTime": "Đăng 1 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Chịu trách nhiệm thiết kế, triển khai và tự động hóa hạ tầng đám mây Hybrid (AWS và Microsoft Azure), tối ưu hóa luồng CI/CD cho toàn bộ khối phát triển phần mềm giáo dục trực tuyến.",
    "skills": [
      "AWS",
      "Azure",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Linux",
      "Python",
      "Terraform"
    ],
    "perks": "Mức thu nhập hấp dẫn từ 35 - 40 triệu VNĐ/tháng, thưởng hiệu quả kinh doanh hàng quý • Chế độ làm việc Hybrid linh hoạt (2 ngày remote / tuần), cấp MacBook Pro M3 • Gói bảo hiểm sức khỏe PTI cao cấp cho nhân viên",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #095744 0%, #246955 100%)",
    "logoType": "cloud",
    "isTopMatch": true,
    "rubricBreakdown": {
      "total": 95,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 15,
      "summary": "Hồ sơ đạt độ tương thích 95% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Azure, CI/CD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Azure, CI/CD, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm quản trị hệ thống và CI/CD",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_06F758280AAA49D3",
    "rawLocation": {
      "fullAddress": "Tầng 5, Tòa nhà Detech, Duy Tân, Cầu Giấy, Hà Nội",
      "province": "Hà Nội",
      "district": "Cầu Giấy",
      "ward": "Phường Dịch Vọng Hậu (Cầu Giấy)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm làm việc ở vị trí DevOps Engineer hoặc Cloud Infrastructure Engineer",
      "Thành thạo quản trị và vận hành các dịch vụ cốt lõi trên AWS (EC2, S3, RDS, VPC) và Azure (AKS, Virtual Machines)",
      "Kinh nghiệm sâu với Infrastructure as Code (Terraform) và Container Orchestration (Docker, Kubernetes)",
      "Thành thạo viết script tự động hóa với Python hoặc Bash shell trên môi trường Linux",
      "Ưu tiên ứng viên có chứng chỉ AWS Certified Solutions Architect hoặc Azure Solutions Architect Expert"
    ],
    "benefits": [
      "Mức thu nhập hấp dẫn từ 35 - 40 triệu VNĐ/tháng, thưởng hiệu quả kinh doanh hàng quý",
      "Chế độ làm việc Hybrid linh hoạt (2 ngày remote / tuần), cấp MacBook Pro M3",
      "Gói bảo hiểm sức khỏe PTI cao cấp cho nhân viên",
      "Được tài trợ 100% kinh phí thi các chứng chỉ quốc tế AWS / Azure / CKA"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/senior-devops-engineer-aws-azure",
      "crawledAt": "2026-11-03T05:16:40.378084+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_2A5215739CD84DD0",
    "title": "Cloud Solutions Architect (AWS / Multi-Cloud)",
    "companyName": "CMC Technology & Solution",
    "companyScale": "1000+ nhân sự",
    "isVerified": true,
    "matchScore": 94,
    "badgeType": "match",
    "salaryText": "70 - 95 triệu / tháng",
    "salaryMin": 70,
    "salaryMax": 95,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "7+ năm kinh nghiệm kiến trúc giải pháp Cloud",
    "postedTime": "Đăng 2 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Tư vấn và thiết kế kiến trúc đám mây toàn diện cho các khách hàng doanh nghiệp khối Tài chính - Ngân hàng, xây dựng mô hình High Availability, Multi-Region và Disaster Recovery trên AWS và Azure.",
    "skills": [
      "AWS",
      "Azure",
      "FinOps",
      "GCP",
      "Kubernetes",
      "Microservices",
      "Serverless",
      "System Design",
      "Terraform"
    ],
    "perks": "Thu nhập thỏa thuận từ 70 - 95 triệu VNĐ/tháng kèm theo thưởng dự án lớn • Môi trường làm việc chuẩn quốc tế, cơ hội dẫn dắt các dự án quy mô quốc gia • Bảo hiểm sức khỏe VIP Bảo Việt toàn diện cho gia đình",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": true,
    "rubricBreakdown": {
      "total": 94,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 94% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Azure, FinOps và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Azure, FinOps, GCP",
        "Đáp ứng yêu cầu kinh nghiệm: 7+ năm kinh nghiệm kiến trúc giải pháp Cloud",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_FE52139B0B414A4C",
    "rawLocation": {
      "fullAddress": "Tòa nhà CMC Tower, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 7 năm kinh nghiệm trong ngành CNTT, trong đó ít nhất 3 năm ở vai trò Solutions Architect",
      "Hiểu biết chuyên sâu về kiến trúc Microservices, Event-driven, Serverless và bảo mật trên AWS/GCP/Azure",
      "Thành thạo thiết kế mạng đám mây, VPC Peering, Transit Gateway, Direct Connect",
      "Bắt buộc có chứng chỉ AWS Solutions Architect Professional hoặc Google Professional Cloud Architect",
      "Kỹ năng thuyết trình và tư vấn giải pháp kỹ thuật cấp C-Level xuất sắc"
    ],
    "benefits": [
      "Thu nhập thỏa thuận từ 70 - 95 triệu VNĐ/tháng kèm theo thưởng dự án lớn",
      "Môi trường làm việc chuẩn quốc tế, cơ hội dẫn dắt các dự án quy mô quốc gia",
      "Bảo hiểm sức khỏe VIP Bảo Việt toàn diện cho gia đình",
      "Phụ cấp công tác và trang thiết bị làm việc công nghệ cao"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/cloud-solutions-architect-cmc",
      "crawledAt": "2026-11-03T05:16:40.379090+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_376E30772E8F4B5A",
    "title": "DevOps & SRE Engineer (Kubernetes & CI/CD)",
    "companyName": "Công ty Cổ phần 9Pay",
    "companyScale": "150-300 nhân sự",
    "isVerified": true,
    "matchScore": 93,
    "badgeType": "match",
    "salaryText": "30 - 45 triệu / tháng",
    "salaryMin": 30,
    "salaryMax": 45,
    "location": "Nam Từ Liêm, Hà Nội • Phường Mỹ Đình 2 (Nam Từ Liêm)",
    "experience": "3-5 năm kinh nghiệm DevOps / SRE",
    "postedTime": "Đăng 3 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Middle",
    "description": "Đảm bảo tính sẵn sàng 99.99% cho hệ thống cổng thanh toán trực tuyến, quản lý cụm Kubernetes Production, triển khai hệ thống Observability và tối ưu hóa CI/CD pipelines.",
    "skills": [
      "AWS",
      "ArgoCD",
      "CI/CD",
      "Docker",
      "Git",
      "Grafana",
      "Kubernetes",
      "Linux",
      "Prometheus"
    ],
    "perks": "Mức lương cạnh tranh từ 30 - 45 triệu VNĐ/tháng, đánh giá tăng lương định kỳ 6 tháng/lần • Thưởng tháng 13 + thưởng KPI hiệu suất dự án thanh toán (2-4 tháng lương) • Cơm trưa miễn phí tại công ty, phụ cấp gửi xe và teambuilding hàng năm",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": true,
    "rubricBreakdown": {
      "total": 93,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 93% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, ArgoCD, CI/CD và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, ArgoCD, CI/CD, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 3-5 năm kinh nghiệm DevOps / SRE",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_9DB9FD9B147D43EF",
    "rawLocation": {
      "fullAddress": "Tầng 6, Tòa nhà D-Office, Nam Từ Liêm, Hà Nội",
      "province": "Hà Nội",
      "district": "Nam Từ Liêm",
      "ward": "Phường Mỹ Đình 2 (Nam Từ Liêm)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 3 năm kinh nghiệm thực chiến với hệ thống thanh toán hoặc thương mại điện tử chịu tải cao",
      "Thành thạo quản trị Kubernetes (K8s), Docker, Helm chart và ArgoCD (GitOps)",
      "Kinh nghiệm thiết lập hệ thống cảnh báo và giám sát với Prometheus, Grafana, Alertmanager, ELK Stack",
      "Thành thạo cấu hình CI/CD trên GitLab CI hoặc GitHub Actions",
      "Kinh nghiệm xử lý sự cố hệ thống Production (Incident Management & Post-mortem)"
    ],
    "benefits": [
      "Mức lương cạnh tranh từ 30 - 45 triệu VNĐ/tháng, đánh giá tăng lương định kỳ 6 tháng/lần",
      "Thưởng tháng 13 + thưởng KPI hiệu suất dự án thanh toán (2-4 tháng lương)",
      "Cơm trưa miễn phí tại công ty, phụ cấp gửi xe và teambuilding hàng năm",
      "Bảo hiểm sức khỏe PVI cao cấp"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/devops-sre-engineer-9pay",
      "crawledAt": "2026-11-03T05:16:40.380094+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_0A7EE98F3F114FEE",
    "title": "Cloud & DevOps Engineer (Azure & AWS)",
    "companyName": "Euroland Asia",
    "companyScale": "100-250 nhân sự",
    "isVerified": true,
    "matchScore": 92,
    "badgeType": "new",
    "salaryText": "35 - 50 triệu / tháng",
    "salaryMin": 35,
    "salaryMax": 50,
    "location": "Ba Đình, Hà Nội • Phường Kim Mã (Ba Đình)",
    "experience": "4+ năm kinh nghiệm quản trị hạ tầng Cloud",
    "postedTime": "Đăng 5 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Middle",
    "description": "Vận hành và phát triển hạ tầng đám mây phục vụ các khách hàng doanh nghiệp châu Âu, cấu hình bảo mật tuân thủ GDPR trên nền tảng Microsoft Azure và Amazon Web Services.",
    "skills": [
      "AWS",
      "Ansible",
      "Azure",
      "CI/CD",
      "Docker",
      "Linux",
      "PostgreSQL",
      "Terraform"
    ],
    "perks": "Thu nhập 35 - 50 triệu VNĐ/tháng, 15 ngày phép năm • Môi trường văn hóa Bắc Âu cởi mở, không OT • Chế độ bảo hiểm sức khỏe quốc tế Liberty",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 92,
      "experience": 32,
      "skills": 32,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 92% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Ansible, Azure và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Ansible, Azure, CI/CD",
        "Đáp ứng yêu cầu kinh nghiệm: 4+ năm kinh nghiệm quản trị hạ tầng Cloud",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_3F87FC59330A4111",
    "rawLocation": {
      "fullAddress": "Kim Mã, Ba Đình, Hà Nội",
      "province": "Hà Nội",
      "district": "Ba Đình",
      "ward": "Phường Kim Mã (Ba Đình)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 4 năm kinh nghiệm làm việc với hệ sinh thái Microsoft Azure và AWS",
      "Thành thạo thiết kế hạ tầng bằng Terraform và Ansible",
      "Có kiến thức vững chắc về bảo mật đám mây, Identity Access Management (IAM), SSO, SSL/TLS",
      "Tiếng Anh giao tiếp và làm việc tốt với đội ngũ kỹ sư Thụy Điển"
    ],
    "benefits": [
      "Thu nhập 35 - 50 triệu VNĐ/tháng, 15 ngày phép năm",
      "Môi trường văn hóa Bắc Âu cởi mở, không OT",
      "Chế độ bảo hiểm sức khỏe quốc tế Liberty",
      "Khóa đào tạo tiếng Anh và tài trợ chứng chỉ công nghệ hàng năm"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/cloud-devops-engineer-euroland",
      "crawledAt": "2026-11-03T05:16:40.381349+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_680515E803314724",
    "title": "Senior Cloud Infrastructure Engineer (AWS EKS & FinOps)",
    "companyName": "KMS Technology Vietnam",
    "companyScale": "1000+ nhân sự",
    "isVerified": true,
    "matchScore": 91,
    "badgeType": "hot",
    "salaryText": "45 - 65 triệu / tháng",
    "salaryMin": 45,
    "salaryMax": 65,
    "location": "Hải Châu, Đà Nẵng • Phường Thạch Thang (Hải Châu)",
    "experience": "5+ năm kinh nghiệm Cloud & Infrastructure",
    "postedTime": "Đăng hôm nay",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Chịu trách nhiệm kiến trúc cụm AWS EKS quy mô hàng nghìn Pods, thiết lập các giải pháp FinOps tự động giúp cắt giảm 30% chi phí hạ tầng điện toán đám mây cho sản phẩm SaaS.",
    "skills": [
      "AWS",
      "ArgoCD",
      "CI/CD",
      "FinOps",
      "Golang",
      "Kubernetes",
      "Python",
      "Terraform"
    ],
    "perks": "Lương từ 45 - 65 triệu VNĐ/tháng kèm gói thưởng Sign-on bonus hấp dẫn • Trang bị Laptop Dell XPS hoặc MacBook Pro M3 mới nhất • Bảo hiểm sức khỏe toàn diện PVI cho nhân viên và 01 người thân",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #095744 0%, #246955 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 91,
      "experience": 32,
      "skills": 32,
      "education": 14,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 91% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, ArgoCD, CI/CD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, ArgoCD, CI/CD, FinOps",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm Cloud & Infrastructure",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_6A893D919A774932",
    "rawLocation": {
      "fullAddress": "Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng",
      "province": "Đà Nẵng",
      "district": "Hải Châu",
      "ward": "Phường Thạch Thang (Hải Châu)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm quản trị hạ tầng đám mây AWS quy mô lớn",
      "Thành thạo Kubernetes, Service Mesh (Istio), Ingress Controller, HPA/KEDA",
      "Kinh nghiệm thực tiễn về AWS Cost Optimization, Savings Plans, Spot Instances và FinOps tools (Kubecost)",
      "Kỹ năng lập trình tự động hóa mạnh với Python hoặc Golang"
    ],
    "benefits": [
      "Lương từ 45 - 65 triệu VNĐ/tháng kèm gói thưởng Sign-on bonus hấp dẫn",
      "Trang bị Laptop Dell XPS hoặc MacBook Pro M3 mới nhất",
      "Bảo hiểm sức khỏe toàn diện PVI cho nhân viên và 01 người thân",
      "Câu lạc bộ thể thao, gym và ngân sách học tập cá nhân $1000/năm"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/senior-cloud-infrastructure-kms",
      "crawledAt": "2026-11-03T05:16:40.382345+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_8E434EE230534518",
    "title": "Principal Cloud Solutions Architect",
    "companyName": "VNG Corporation",
    "companyScale": "2000+ nhân sự",
    "isVerified": true,
    "matchScore": 90,
    "badgeType": "hot",
    "salaryText": "85 - 130 triệu / tháng",
    "salaryMin": 85,
    "salaryMax": 130,
    "location": "Quận 7, Hồ Chí Minh • Phường Tân Thuận Đông (Quận 7)",
    "experience": "8+ năm kinh nghiệm kiến trúc hệ thống phân tán",
    "postedTime": "Đăng hôm qua",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Định hướng chiến lược Cloud & Platform cho các sản phẩm phục vụ hàng chục triệu người dùng hoạt động đồng thời (Zalo, ZaloPay, Zing), giải quyết các bài toán độ trễ thấp và chịu tải siêu lớn.",
    "skills": [
      "AWS",
      "Cloud",
      "Kafka",
      "Kubernetes",
      "Microservices",
      "Redis",
      "Security",
      "System Design"
    ],
    "perks": "Mức thu nhập cạnh tranh hàng đầu thị trường từ 85 - 130 triệu VNĐ/tháng • Gói cổ phiếu thưởng ESOP giá trị cao theo thâm niên và đóng góp • Khu phức hợp VNG Campus đẳng cấp quốc tế với hồ bơi, phòng gym, cantin chuẩn 5 sao",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 90,
      "experience": 31,
      "skills": 31,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 90% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Cloud, Kafka và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Cloud, Kafka, Kubernetes",
        "Đáp ứng yêu cầu kinh nghiệm: 8+ năm kinh nghiệm kiến trúc hệ thống phân tán",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_5ED329196CD34D7A",
    "rawLocation": {
      "fullAddress": "VNG Campus, Khu chế xuất Tân Thuận, Quận 7, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 7",
      "ward": "Phường Tân Thuận Đông (Quận 7)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Ít nhất 8 năm kinh nghiệm thực chiến với các hệ thống phân tán quy mô lớn (High Traffic / Low Latency)",
      "Chuyên gia về kiến trúc Hybrid Cloud, Kubernetes, Multi-Data Center Replication",
      "Có khả năng định hình chiến lược công nghệ dài hạn và nâng cao năng lực cho đội ngũ kỹ sư trưởng",
      "Có uy tín và đóng góp trong cộng đồng công nghệ Cloud Native tại Việt Nam"
    ],
    "benefits": [
      "Mức thu nhập cạnh tranh hàng đầu thị trường từ 85 - 130 triệu VNĐ/tháng",
      "Gói cổ phiếu thưởng ESOP giá trị cao theo thâm niên và đóng góp",
      "Khu phức hợp VNG Campus đẳng cấp quốc tế với hồ bơi, phòng gym, cantin chuẩn 5 sao",
      "Gói bảo hiểm sức khỏe VIP toàn cầu"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/principal-cloud-solutions-architect-vng",
      "crawledAt": "2026-11-03T05:16:40.383343+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_A22949A86CF1450F",
    "title": "DevSecOps Engineer (AWS Security & Terraform)",
    "companyName": "VinSOC (Tập đoàn Vingroup)",
    "companyScale": "500-1000 nhân sự",
    "isVerified": true,
    "matchScore": 97,
    "badgeType": "new",
    "salaryText": "40 - 60 triệu / tháng",
    "salaryMin": 40,
    "salaryMax": 60,
    "location": "Long Biên, Hà Nội • Phường Phúc Đồng (Long Biên)",
    "experience": "4+ năm kinh nghiệm DevSecOps / Cloud Security",
    "postedTime": "Đăng 2 ngày trước",
    "workType": "Toàn thời gian",
    "level": "Middle",
    "description": "Xây dựng khung kiến trúc bảo mật tự động hóa trong luồng CI/CD (SAST/DAST/SCA), kiểm thử tuân thủ bảo mật hạ tầng AWS theo tiêu chuẩn ISO 27001 và PCI-DSS cho hệ sinh thái VinFast & Vingroup.",
    "skills": [
      "AWS",
      "CI/CD",
      "DevOps",
      "Docker",
      "Kubernetes",
      "Linux",
      "Terraform"
    ],
    "perks": "Thu nhập 40 - 60 triệu VNĐ/tháng, thưởng thành tích cuối năm 2-3 tháng lương • Chế độ ưu đãi khi mua xe VinFast và sử dụng dịch vụ trong hệ sinh thái Vingroup (Vinhomes, Vinmec, Vinpearl) • Bảo hiểm sức khỏe cao cấp Vinmec",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)",
    "logoType": "brain",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 97,
      "experience": 34,
      "skills": 34,
      "education": 15,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 97% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, DevOps và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, DevOps, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 4+ năm kinh nghiệm DevSecOps / Cloud Security",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_A7F89C9A9E514775",
    "rawLocation": {
      "fullAddress": "Tòa nhà Symphony, Chu Huy Mân, Long Biên, Hà Nội",
      "province": "Hà Nội",
      "district": "Long Biên",
      "ward": "Phường Phúc Đồng (Long Biên)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 4 năm kinh nghiệm làm việc chuyên sâu về Cloud Security hoặc DevSecOps",
      "Thành thạo tích hợp các công cụ quét mã nguồn và lỗ hổng (SonarQube, Snyk, Trivy, Aqua Security) vào CI/CD",
      "Hiểu biết sâu sắc về AWS Security Services: GuardDuty, Security Hub, WAF, AWS Shield, KMS, IAM Policies",
      "Ưu tiên ứng viên có chứng chỉ AWS Certified Security Specialty hoặc CISSP"
    ],
    "benefits": [
      "Thu nhập 40 - 60 triệu VNĐ/tháng, thưởng thành tích cuối năm 2-3 tháng lương",
      "Chế độ ưu đãi khi mua xe VinFast và sử dụng dịch vụ trong hệ sinh thái Vingroup (Vinhomes, Vinmec, Vinpearl)",
      "Bảo hiểm sức khỏe cao cấp Vinmec",
      "Cơ hội làm việc với các hệ thống hạ tầng kết nối IoT xe điện thông minh toàn cầu"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/devsecops-engineer-vinsoc",
      "crawledAt": "2026-11-03T05:16:40.384343+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_7029F287749A472F",
    "title": "Azure Cloud Infrastructure Engineer",
    "companyName": "CÔNG TY TNHH DE HEUS VIỆT NAM",
    "companyScale": "1000+ nhân sự",
    "isVerified": true,
    "matchScore": 85,
    "badgeType": "hot",
    "salaryText": "35 - 55 triệu / tháng",
    "salaryMin": 35,
    "salaryMax": 55,
    "location": "Bình Thạnh, Hồ Chí Minh • Phường 25 (Bình Thạnh)",
    "experience": "3-5 năm kinh nghiệm quản trị hạ tầng Azure",
    "postedTime": "Đăng 1 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Middle",
    "description": "Quản lý và mở rộng hạ tầng Cloud khu vực Châu Á trên nền tảng Microsoft Azure, triển khai giải pháp sao lưu, phục hồi thảm họa và giám sát tự động cho chuỗi nhà máy sản xuất.",
    "skills": [
      "Azure",
      "CI/CD",
      "Cloud",
      "Linux",
      "PowerShell",
      "Terraform",
      "Windows Server"
    ],
    "perks": "Mức lương 35 - 55 triệu VNĐ/tháng, trợ cấp điện thoại và ăn trưa • Thưởng tháng 13 + thưởng hiệu quả kinh doanh của tập đoàn Hà Lan • Bảo hiểm sức khỏe quốc tế cao cấp",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    "logoType": "cart",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 85,
      "experience": 30,
      "skills": 30,
      "education": 13,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 85% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Azure, CI/CD, Cloud và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Azure, CI/CD, Cloud, Linux",
        "Đáp ứng yêu cầu kinh nghiệm: 3-5 năm kinh nghiệm quản trị hạ tầng Azure",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Azure để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_212BC0E80E7A4947",
    "rawLocation": {
      "fullAddress": "Tòa nhà Pearl Plaza, Quận Bình Thạnh, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Bình Thạnh",
      "ward": "Phường 25 (Bình Thạnh)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 3 năm kinh nghiệm quản trị hệ thống hạ tầng Microsoft Azure (Azure IaaS & PaaS)",
      "Thành thạo viết kịch bản Infrastructure as Code với Terraform hoặc Bicep/ARM",
      "Kinh nghiệm quản trị mạng đám mây: Virtual Network, ExpressRoute, VPN Gateway, Azure Firewall",
      "Có chứng chỉ Microsoft Certified: Azure Administrator Associate (AZ-104) là lợi thế"
    ],
    "benefits": [
      "Mức lương 35 - 55 triệu VNĐ/tháng, trợ cấp điện thoại và ăn trưa",
      "Thưởng tháng 13 + thưởng hiệu quả kinh doanh của tập đoàn Hà Lan",
      "Bảo hiểm sức khỏe quốc tế cao cấp",
      "Môi trường đa quốc gia, cơ hội đào tạo và công tác tại trụ sở Hà Lan"
    ],
    "source": {
      "platform": "VietnamWorks",
      "originalUrl": "https://vietnamworks.com/azure-cloud-engineer-asia-de-heus",
      "crawledAt": "2026-11-03T05:16:40.385858+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_D5A005B489704007",
    "title": "Senior Platform & SRE Engineer (AWS Multi-Region)",
    "companyName": "Công ty TNHH Vexere",
    "companyScale": "250-500 nhân sự",
    "isVerified": true,
    "matchScore": 92,
    "badgeType": "hot",
    "salaryText": "45 - 70 triệu / tháng",
    "salaryMin": 45,
    "salaryMax": 70,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "5+ năm kinh nghiệm SRE / Platform Engineer",
    "postedTime": "Đăng 2 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Xây dựng Internal Developer Platform (IDP), vận hành kiến trúc Microservices phân tán trên AWS phục vụ hàng triệu giao dịch đặt vé tàu xe mỗi ngày vào các dịp cao điểm Tết.",
    "skills": [
      "AWS",
      "ArgoCD",
      "DevOps",
      "Golang",
      "Grafana",
      "Kubernetes",
      "Microservices",
      "OpenTelemetry",
      "Prometheus",
      "Terraform"
    ],
    "perks": "Thu nhập 45 - 70 triệu VNĐ/tháng, xét tăng lương 2 lần/năm • Chế độ làm việc Hybrid linh hoạt, tài trợ vé du lịch hàng năm • Bảo hiểm sức khỏe PVI toàn diện",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    "logoType": "cart",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 92,
      "experience": 32,
      "skills": 32,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 92% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, ArgoCD, DevOps và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, ArgoCD, DevOps, Golang",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm SRE / Platform Engineer",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_93EF303FFB40453E",
    "rawLocation": {
      "fullAddress": "Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm về SRE, Platform Engineering trên AWS",
      "Thành thạo Kubernetes, Chaos Engineering, Load Testing (k6, Locust) và Performance Tuning",
      "Thành thạo Terraform, GitOps (ArgoCD) và giám sát hệ thống bằng Grafana, OpenTelemetry",
      "Tư duy giải quyết bài toán tải cao (Peak Season Readiness) và giảm thời gian phục hồi sự cố (MTTR)"
    ],
    "benefits": [
      "Thu nhập 45 - 70 triệu VNĐ/tháng, xét tăng lương 2 lần/năm",
      "Chế độ làm việc Hybrid linh hoạt, tài trợ vé du lịch hàng năm",
      "Bảo hiểm sức khỏe PVI toàn diện",
      "Thưởng dự án và cổ phần ưu đãi ESOP cho nhân sự chủ chốt"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/senior-platform-sre-vexere",
      "crawledAt": "2026-11-03T05:16:40.386873+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_DE6D2361AD2349D9",
    "title": "AWS Cloud Solutions Architect (Serverless & Microservices)",
    "companyName": "MiTek Vietnam",
    "companyScale": "500-1000 nhân sự",
    "isVerified": true,
    "matchScore": 80,
    "badgeType": "new",
    "salaryText": "60 - 90 triệu / tháng",
    "salaryMin": 60,
    "salaryMax": 90,
    "location": "Thành phố Thủ Đức, Hồ Chí Minh • Phường Tăng Nhơn Phú B (Thành phố Thủ Đức)",
    "experience": "6+ năm kinh nghiệm kiến trúc AWS Cloud",
    "postedTime": "Đăng 3 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Chịu trách nhiệm thiết kế và dẫn dắt triển khai các hệ thống phần mềm kỹ thuật xây dựng quy mô lớn trên nền tảng AWS Serverless (Lambda, EventBridge, DynamoDB) phục vụ thị trường Mỹ, Úc và Châu Âu.",
    "skills": [
      "AWS",
      "DynamoDB",
      "EventBridge",
      "Lambda",
      "Microservices",
      "Serverless",
      "System Design",
      "Terraform"
    ],
    "perks": "Thu nhập từ 60 - 90 triệu VNĐ/tháng, thưởng tháng 13 và thưởng hiệu suất toàn cầu • Chế độ làm việc kết hợp Hybrid (2-3 ngày WFH) • Bảo hiểm sức khỏe Liberty hạng Diamond cho nhân viên và vợ/chồng/con cái",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 80,
      "experience": 28,
      "skills": 28,
      "education": 12,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 80% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, DynamoDB, EventBridge và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, DynamoDB, EventBridge, Lambda",
        "Đáp ứng yêu cầu kinh nghiệm: 6+ năm kinh nghiệm kiến trúc AWS Cloud",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_E712134A1AC04D83",
    "rawLocation": {
      "fullAddress": "Khu Công nghệ cao, TP. Thủ Đức, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Thành phố Thủ Đức",
      "ward": "Phường Tăng Nhơn Phú B (Thành phố Thủ Đức)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 6 năm kinh nghiệm thiết kế kiến trúc phần mềm, ít nhất 3 năm thực chiến chuyên sâu với AWS Serverless",
      "Thành thạo kiến trúc hướng sự kiện (Event-Driven Architecture), Microservices và DDD (Domain-Driven Design)",
      "Thành thạo Infrastructure as Code với Terraform hoặc AWS CDK",
      "Bắt buộc có chứng chỉ AWS Solutions Architect Professional"
    ],
    "benefits": [
      "Thu nhập từ 60 - 90 triệu VNĐ/tháng, thưởng tháng 13 và thưởng hiệu suất toàn cầu",
      "Chế độ làm việc kết hợp Hybrid (2-3 ngày WFH)",
      "Bảo hiểm sức khỏe Liberty hạng Diamond cho nhân viên và vợ/chồng/con cái",
      "Cơ hội đi công tác và tu nghiệp ngắn hạn tại Mỹ và Úc"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/aws-solutions-architect-mitek",
      "crawledAt": "2026-11-03T05:16:40.386873+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_8E5DB11B3727435B",
    "title": "Senior Solutions Architect (Cloud & Microservices)",
    "companyName": "Techcombank",
    "companyScale": "10000+ nhân sự",
    "isVerified": true,
    "matchScore": 87,
    "badgeType": "hot",
    "salaryText": "75 - 110 triệu / tháng",
    "salaryMin": 75,
    "salaryMax": 110,
    "location": "Quận Hoàn Kiếm, Hà Nội • Phường Cửa Nam (Quận Hoàn Kiếm)",
    "experience": "8+ năm kinh nghiệm kiến trúc hệ thống tài chính",
    "postedTime": "Đăng 5 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Chịu trách nhiệm thiết kế tổng thể kiến trúc hệ thống Core Banking và Open Banking trên nền tảng Cloud Native, đảm bảo tính sẵn sàng cao (High Availability), bảo mật cấp ngân hàng và tuân thủ chuẩn PCI-DSS.",
    "skills": [
      "AWS",
      "FinOps",
      "GCP",
      "Kafka",
      "Kubernetes",
      "Microservices",
      "Security",
      "System Design",
      "Terraform"
    ],
    "perks": "Mức thu nhập hàng đầu ngành ngân hàng từ 75 - 110 triệu VNĐ/tháng + thưởng hiệu suất năm 3-5 tháng lương • Chính sách vay ưu đãi lãi suất đặc biệt cho cán bộ nhân viên mua nhà và ô tô • Gói bảo hiểm sức khỏe Techcombank Care toàn diện cho gia đình",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 87,
      "experience": 30,
      "skills": 30,
      "education": 13,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 87% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, FinOps, GCP và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, FinOps, GCP, Kafka",
        "Đáp ứng yêu cầu kinh nghiệm: 8+ năm kinh nghiệm kiến trúc hệ thống tài chính",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_F1C7A667EDBB416B",
    "rawLocation": {
      "fullAddress": "Tòa nhà Techcombank, 6 Quang Trung, Hoàn Kiếm, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Hoàn Kiếm",
      "ward": "Phường Cửa Nam (Quận Hoàn Kiếm)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 8 năm kinh nghiệm trong ngành CNTT, trong đó ít nhất 4 năm ở vai trò Solutions Architect cho hệ thống ngân hàng hoặc tài chính",
      "Chuyên gia về kiến trúc đám mây AWS hoặc GCP, thành thạo thiết kế mạng đám mây an toàn, Zero Trust và Data Encryption",
      "Thành thạo Microservices, Event-Driven Architecture (Kafka), Container Orchestration (Kubernetes)",
      "Bắt buộc có chứng chỉ AWS Solutions Architect Professional hoặc Google Professional Cloud Architect"
    ],
    "benefits": [
      "Mức thu nhập hàng đầu ngành ngân hàng từ 75 - 110 triệu VNĐ/tháng + thưởng hiệu suất năm 3-5 tháng lương",
      "Chính sách vay ưu đãi lãi suất đặc biệt cho cán bộ nhân viên mua nhà và ô tô",
      "Gói bảo hiểm sức khỏe Techcombank Care toàn diện cho gia đình",
      "Môi trường Agile hiện đại tại trụ sở Landmark 6 Quang Trung"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/techcombank-cloud-solutions-architect",
      "crawledAt": "2026-11-03T05:16:40.387878+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_82158EE9E9D6436F",
    "title": "Lead Azure DevOps Engineer (Global Cloud Delivery)",
    "companyName": "FPT Software",
    "companyScale": "30000+ nhân sự",
    "isVerified": true,
    "matchScore": 94,
    "badgeType": "hot",
    "salaryText": "50 - 80 triệu / tháng",
    "salaryMin": 50,
    "salaryMax": 80,
    "location": "Thành phố Thủ Đức, Hồ Chí Minh • Phường Tân Phú (Thành phố Thủ Đức)",
    "experience": "6+ năm kinh nghiệm Azure DevOps & Cloud Delivery",
    "postedTime": "Đăng hôm nay",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Dẫn dắt đội ngũ kỹ sư Cloud DevOps trong các chương trình chuyển đổi đám mây quy mô lớn cho các khách hàng Fortune 500 tại thị trường Nhật Bản và Bắc Mỹ trên nền tảng Microsoft Azure.",
    "skills": [
      "ArgoCD",
      "Azure",
      "CI/CD",
      "DevOps",
      "Docker",
      "Kubernetes",
      "Linux",
      "Terraform"
    ],
    "perks": "Thu nhập cạnh tranh 50 - 80 triệu VNĐ/tháng kèm theo thưởng dự án toàn cầu • Chế độ làm việc Hybrid linh hoạt, khuôn viên F-Town chuẩn quốc tế với sân golf, hồ bơi • Gói bảo hiểm sức khỏe cao cấp FPT Care",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 94,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 94% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về ArgoCD, Azure, CI/CD và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: ArgoCD, Azure, CI/CD, DevOps",
        "Đáp ứng yêu cầu kinh nghiệm: 6+ năm kinh nghiệm Azure DevOps & Cloud Delivery",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về ArgoCD để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_B006450AB9314F6C",
    "rawLocation": {
      "fullAddress": "F-Town 3, Khu Công nghệ cao, TP. Thủ Đức, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Thành phố Thủ Đức",
      "ward": "Phường Tân Phú (Thành phố Thủ Đức)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 6 năm kinh nghiệm thực chiến về DevOps và quản trị đám mây Microsoft Azure",
      "Thành thạo Azure DevOps, GitHub Actions, Terraform, ARM/Bicep Templates",
      "Kinh nghiệm sâu về quản trị cụm Azure Kubernetes Service (AKS), Ingress Controller, Azure Monitor",
      "Có chứng chỉ Microsoft Certified: DevOps Engineer Expert hoặc Azure Solutions Architect",
      "Kỹ năng tiếng Anh lưu loát trong giao tiếp và làm việc với khách hàng toàn cầu"
    ],
    "benefits": [
      "Thu nhập cạnh tranh 50 - 80 triệu VNĐ/tháng kèm theo thưởng dự án toàn cầu",
      "Chế độ làm việc Hybrid linh hoạt, khuôn viên F-Town chuẩn quốc tế với sân golf, hồ bơi",
      "Gói bảo hiểm sức khỏe cao cấp FPT Care",
      "Cơ hội Onsite dài hạn và ngắn hạn tại Mỹ, Nhật Bản, Singapore, Châu Âu"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/lead-azure-devops-engineer-fpt",
      "crawledAt": "2026-11-03T05:16:40.388873+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_7FDDB6EDEDB84582",
    "title": "Senior System Platform & DevOps Engineer",
    "companyName": "One Mount Group",
    "companyScale": "2000+ nhân sự",
    "isVerified": true,
    "matchScore": 82,
    "badgeType": "new",
    "salaryText": "45 - 65 triệu / tháng",
    "salaryMin": 45,
    "salaryMax": 65,
    "location": "Quận Hai Bà Trưng, Hà Nội • Phường Vĩnh Tuy (Quận Hai Bà Trưng)",
    "experience": "5+ năm kinh nghiệm hạ tầng hệ thống lớn",
    "postedTime": "Đăng hôm qua",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Vận hành và tối ưu hóa hạ tầng đám mây phân tán đa nền tảng (AWS & GCP) phục vụ hệ sinh thái VinID và OneHousing với hàng triệu người dùng và hàng tỷ bản ghi dữ liệu.",
    "skills": [
      "AWS",
      "Ansible",
      "ArgoCD",
      "CI/CD",
      "Elasticsearch",
      "GCP",
      "Grafana",
      "Kafka",
      "Kubernetes",
      "Linux",
      "Prometheus",
      "Python",
      "Redis",
      "Terraform"
    ],
    "perks": "Lương từ 45 - 65 triệu VNĐ/tháng, xét tăng lương 2 lần/năm • Chính sách đãi ngộ hấp dẫn, thưởng cuối năm từ 2-4 tháng lương • Gói bảo hiểm sức khỏe cao cấp Bảo Việt cho nhân viên và người thân",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    "logoType": "cart",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 82,
      "experience": 29,
      "skills": 29,
      "education": 12,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 82% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Ansible, ArgoCD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Ansible, ArgoCD, CI/CD",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm hạ tầng hệ thống lớn",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_0588F8A6F7FC4248",
    "rawLocation": {
      "fullAddress": "Tòa nhà Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Hai Bà Trưng",
      "ward": "Phường Vĩnh Tuy (Quận Hai Bà Trưng)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm quản trị hệ thống Linux và hạ tầng đám mây lớn",
      "Thành thạo Kubernetes (EKS/GKE), xây dựng pipeline tự động hóa CI/CD với GitLab CI / ArgoCD",
      "Thành thạo Terraform, Ansible và ngôn ngữ script Python/Bash",
      "Hiểu biết chuyên sâu về hệ thống dữ liệu lớn và hàng đợi phân tán: Kafka, Elasticsearch, Redis",
      "Kinh nghiệm xây dựng hệ thống giám sát toàn diện với Prometheus, Grafana, VictoriaMetrics"
    ],
    "benefits": [
      "Lương từ 45 - 65 triệu VNĐ/tháng, xét tăng lương 2 lần/năm",
      "Chính sách đãi ngộ hấp dẫn, thưởng cuối năm từ 2-4 tháng lương",
      "Gói bảo hiểm sức khỏe cao cấp Bảo Việt cho nhân viên và người thân",
      "Trang bị thiết bị làm việc MacBook Pro cấu hình tối đa"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/senior-devops-platform-onemount",
      "crawledAt": "2026-11-03T05:16:40.390390+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_4CFF613701F84D71",
    "title": "Principal DevOps & Cloud Reliability Engineer",
    "companyName": "NAB Innovation Centre Vietnam",
    "companyScale": "1000-2500 nhân sự",
    "isVerified": true,
    "matchScore": 89,
    "badgeType": "hot",
    "salaryText": "90 - 140 triệu / tháng",
    "salaryMin": 90,
    "salaryMax": 140,
    "location": "Thành phố Thủ Đức, Hồ Chí Minh • Phường An Khánh (Thành phố Thủ Đức)",
    "experience": "8+ năm kinh nghiệm DevOps & SRE ngân hàng",
    "postedTime": "Đăng 2 ngày trước",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Dẫn dắt chiến lược Cloud Reliability và tự động hóa cho các nền tảng số trọng yếu của Ngân hàng Quốc gia Úc (NAB), đảm bảo các tiêu chuẩn Zero Downtime và quy chuẩn bảo mật ngân hàng quốc tế.",
    "skills": [
      "AWS",
      "CI/CD",
      "Docker",
      "FinOps",
      "Kubernetes",
      "Lambda",
      "Security",
      "System Design",
      "Terraform"
    ],
    "perks": "Mức thu nhập cạnh tranh hàng đầu thị trường từ 90 - 140 triệu VNĐ/tháng • Mô hình làm việc kết hợp Hybrid linh hoạt (lên văn phòng 2 ngày/tuần) • Cơ hội đi công tác và làm việc tại trụ sở chính của NAB tại Melbourne, Úc",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 89,
      "experience": 31,
      "skills": 31,
      "education": 13,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 89% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, Docker và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, Docker, FinOps",
        "Đáp ứng yêu cầu kinh nghiệm: 8+ năm kinh nghiệm DevOps & SRE ngân hàng",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_B1331813FD3F4824",
    "rawLocation": {
      "fullAddress": "Tòa nhà The Hallmark, Khu đô thị mới Thủ Thiêm, TP. Thủ Đức, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Thành phố Thủ Đức",
      "ward": "Phường An Khánh (Thành phố Thủ Đức)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 8 năm kinh nghiệm làm việc trong lĩnh vực DevOps, SRE và kiến trúc hạ tầng Cloud",
      "Chuyên gia thực chiến trên hạ tầng AWS (EKS, Lambda, Transit Gateway, KMS, GuardDuty)",
      "Thành thạo thiết kế Infrastructure as Code ở quy mô Enterprise với Terraform Cloud, Pulumi",
      "Kinh nghiệm sâu sắc về Chaos Engineering, Disaster Recovery và Observability (Splunk, Dynatrace)",
      "Khả năng lãnh đạo kỹ thuật và huấn luyện cho đội ngũ kỹ sư tại Việt Nam và Úc"
    ],
    "benefits": [
      "Mức thu nhập cạnh tranh hàng đầu thị trường từ 90 - 140 triệu VNĐ/tháng",
      "Mô hình làm việc kết hợp Hybrid linh hoạt (lên văn phòng 2 ngày/tuần)",
      "Cơ hội đi công tác và làm việc tại trụ sở chính của NAB tại Melbourne, Úc",
      "Bảo hiểm sức khỏe quốc tế toàn diện cho cả gia đình (vợ/chồng và con cái)",
      "Tài khoản học tập không giới hạn trên O'Reilly, Udemy, Cloud Academy"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/principal-devops-cloud-nab",
      "crawledAt": "2026-11-03T05:16:40.391389+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_9B4D1D3688BB40A5",
    "title": "Senior Cloud SRE & Infrastructure Engineer",
    "companyName": "Ví MoMo (Công ty Cổ phần Dịch vụ Di động Trực tuyến)",
    "companyScale": "2000+ nhân sự",
    "isVerified": true,
    "matchScore": 96,
    "badgeType": "hot",
    "salaryText": "45 - 70 triệu / tháng",
    "salaryMin": 45,
    "salaryMax": 70,
    "location": "Quận 7, Hồ Chí Minh • Phường Tân Phong (Quận 7)",
    "experience": "5+ năm kinh nghiệm SRE hệ thống tải lớn",
    "postedTime": "Đăng 1 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Senior Specialist",
    "description": "Đảm bảo tính sẵn sàng và khả năng tự phục hồi của hạ tầng siêu ứng dụng MoMo phục vụ hơn 30 triệu người dùng, tối ưu hóa cụm Kubernetes hàng trăm node và xử lý các đợt bùng nổ giao dịch hàng chục nghìn TPS.",
    "skills": [
      "AWS",
      "CI/CD",
      "Helm",
      "Kafka",
      "Kubernetes",
      "MongoDB",
      "PostgreSQL",
      "Prometheus",
      "Redis",
      "Terraform"
    ],
    "perks": "Thu nhập từ 45 - 70 triệu VNĐ/tháng, thưởng tháng 13 và thưởng hiệu suất cuối năm rất cao • 14 ngày nghỉ phép/năm, phụ cấp ăn trưa và gửi xe • Gói bảo hiểm sức khỏe VIP toàn diện",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 96,
      "experience": 34,
      "skills": 34,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 96% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, Helm và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, Helm, Kafka",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm SRE hệ thống tải lớn",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_A17C38CD3EA14102",
    "rawLocation": {
      "fullAddress": "Tòa nhà Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 7",
      "ward": "Phường Tân Phong (Quận 7)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm quản trị hạ tầng điện toán đám mây AWS và Google Cloud",
      "Thành thạo Kubernetes ở quy mô Production, viết Helm charts, Kubernetes Operators",
      "Kinh nghiệm xử lý các hệ thống chịu tải siêu lớn (High Traffic, Low Latency, High Concurrency)",
      "Thành thạo quản lý cơ sở dữ liệu phân tán: Redis Cluster, Kafka Cluster, MongoDB, PostgreSQL",
      "Khả năng on-call và phản ứng nhanh xử lý sự cố khẩn cấp (Incident Management)"
    ],
    "benefits": [
      "Thu nhập từ 45 - 70 triệu VNĐ/tháng, thưởng tháng 13 và thưởng hiệu suất cuối năm rất cao",
      "14 ngày nghỉ phép/năm, phụ cấp ăn trưa và gửi xe",
      "Gói bảo hiểm sức khỏe VIP toàn diện",
      "Môi trường công nghệ Fintech năng động, được tự do đề xuất và thử nghiệm giải pháp mới"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/senior-cloud-sre-momo",
      "crawledAt": "2026-11-03T05:16:40.392399+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_CC0E5E3B8AFB490A",
    "title": "Cloud Solutions Architect (Azure IoT & Embedded Platform)",
    "companyName": "Bosch Global Software Technologies Vietnam",
    "companyScale": "3000+ nhân sự",
    "isVerified": true,
    "matchScore": 84,
    "badgeType": "new",
    "salaryText": "70 - 100 triệu / tháng",
    "salaryMin": 70,
    "salaryMax": 100,
    "location": "Quận 4, Hồ Chí Minh • Phường 9 (Quận 4)",
    "experience": "7+ năm kinh nghiệm kiến trúc Cloud & IoT",
    "postedTime": "Đăng 2 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Thiết kế kiến trúc nền tảng Cloud IoT trên Microsoft Azure kết nối hàng triệu thiết bị phần cứng thông minh của tập đoàn Bosch trên toàn cầu trong các lĩnh vực Automotive và Smart Industry.",
    "skills": [
      "Azure",
      "Cloud",
      "Docker",
      "Kubernetes",
      "Linux",
      "Microservices",
      "Python",
      "System Design"
    ],
    "perks": "Thu nhập thỏa thuận từ 70 - 100 triệu VNĐ/tháng + thưởng hiệu quả kinh doanh hàng năm • Chính sách làm việc Hybrid linh hoạt, hỗ trợ chi phí thiết bị làm việc tại nhà • Bảo hiểm sức khỏe quốc tế cao cấp cho nhân viên và gia đình",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 84,
      "experience": 29,
      "skills": 29,
      "education": 13,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 84% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Azure, Cloud, Docker và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Azure, Cloud, Docker, Kubernetes",
        "Đáp ứng yêu cầu kinh nghiệm: 7+ năm kinh nghiệm kiến trúc Cloud & IoT",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Azure để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_3B708520E7DC41F5",
    "rawLocation": {
      "fullAddress": "Tòa nhà E-Town Central, 11 Đoàn Văn Bơ, Quận 4, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 4",
      "ward": "Phường 9 (Quận 4)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 7 năm kinh nghiệm thiết kế phần mềm và giải pháp đám mây",
      "Chuyên sâu về hệ sinh thái Microsoft Azure: Azure IoT Hub, Azure Event Hubs, Stream Analytics, Cosmos DB, AKS",
      "Kinh nghiệm thiết kế kiến trúc bảo mật thiết bị đầu cuối đến đám mây (End-to-End IoT Security)",
      "Bắt buộc có chứng chỉ Microsoft Certified: Azure Solutions Architect Expert",
      "Giao tiếp tiếng Anh thành thạo để làm việc với các chuyên gia kỹ thuật tại Đức và Ấn Độ"
    ],
    "benefits": [
      "Thu nhập thỏa thuận từ 70 - 100 triệu VNĐ/tháng + thưởng hiệu quả kinh doanh hàng năm",
      "Chính sách làm việc Hybrid linh hoạt, hỗ trợ chi phí thiết bị làm việc tại nhà",
      "Bảo hiểm sức khỏe quốc tế cao cấp cho nhân viên và gia đình",
      "Cơ hội đi đào tạo và công tác tại Đức, Nhật Bản và Singapore"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/bosch-cloud-solutions-architect",
      "crawledAt": "2026-11-03T05:16:40.393393+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_1B7F36D9EEC54C0D",
    "title": "Senior Site Reliability Engineer (Cloud Platform SRE)",
    "companyName": "Shopee / Sea Group Vietnam",
    "companyScale": "5000+ nhân sự",
    "isVerified": true,
    "matchScore": 91,
    "badgeType": "hot",
    "salaryText": "60 - 95 triệu / tháng",
    "salaryMin": 60,
    "salaryMax": 95,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "5+ năm kinh nghiệm SRE sàn thương mại điện tử",
    "postedTime": "Đăng 3 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Senior Specialist",
    "description": "Vận hành và tối ưu hóa hạ tầng Cloud Platform phục vụ các đợt siêu sale lớn nhất khu vực Đông Nam Á (9.9, 11.11, 12.12), đảm bảo hệ thống chịu được lưu lượng tải đột biến hàng trăm triệu request mỗi giây.",
    "skills": [
      "Cloud",
      "DevOps",
      "Docker",
      "Golang",
      "Grafana",
      "Kubernetes",
      "Linux",
      "OpenTelemetry",
      "Prometheus",
      "Python"
    ],
    "perks": "Mức lương cạnh tranh hàng đầu khu vực từ 60 - 95 triệu VNĐ/tháng kèm theo thưởng cuối năm cực kỳ hấp dẫn • Đồ ăn nhẹ, đồ uống và hoa quả miễn phí hàng ngày tại văn phòng Saigon Centre hiện đại • Gói bảo hiểm sức khỏe VIP toàn diện",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    "logoType": "cart",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 91,
      "experience": 32,
      "skills": 32,
      "education": 14,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 91% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Cloud, DevOps, Docker và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Cloud, DevOps, Docker, Golang",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm SRE sàn thương mại điện tử",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Cloud để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_2D0B7BD5B93947EF",
    "rawLocation": {
      "fullAddress": "Tòa nhà Saigon Centre, 65 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm làm việc ở vị trí SRE hoặc DevOps cho các hệ thống quy mô lớn",
      "Hiểu biết sâu sắc về Linux kernel, TCP/IP, Network Tuning, Storage I/O và Container runtime",
      "Thành thạo lập trình Go (Golang) hoặc Python để tự động hóa hạ tầng và công cụ nội bộ",
      "Kinh nghiệm quản lý cụm Kubernetes hàng nghìn node, Prometheus, Thanos, OpenTelemetry",
      "Tư duy phân tích và giải quyết sự cố dưới áp lực cao trong các chiến dịch lớn"
    ],
    "benefits": [
      "Mức lương cạnh tranh hàng đầu khu vực từ 60 - 95 triệu VNĐ/tháng kèm theo thưởng cuối năm cực kỳ hấp dẫn",
      "Đồ ăn nhẹ, đồ uống và hoa quả miễn phí hàng ngày tại văn phòng Saigon Centre hiện đại",
      "Gói bảo hiểm sức khỏe VIP toàn diện",
      "Ngân sách tài trợ phát triển kỹ năng cá nhân và chứng chỉ công nghệ quốc tế"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/shopee-cloud-platform-sre",
      "crawledAt": "2026-11-03T05:16:40.394392+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_66A5AF842FBD4D28",
    "title": "Kỹ Sư Trưởng Kiến Trúc Đám Mây (Cloud Platform Architect)",
    "companyName": "Tổng Công ty Giải pháp Doanh nghiệp Viettel (Viettel Solutions)",
    "companyScale": "5000+ nhân sự",
    "isVerified": true,
    "matchScore": 98,
    "badgeType": "hot",
    "salaryText": "65 - 90 triệu / tháng",
    "salaryMin": 65,
    "salaryMax": 90,
    "location": "Ba Đình, Hà Nội • Phường Kim Mã (Ba Đình)",
    "experience": "7+ năm kinh nghiệm kiến trúc hạ tầng Cloud viễn thông",
    "postedTime": "Đăng 5 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Lead / Principal Architect",
    "description": "Chủ trì thiết kế kiến trúc nền tảng Viettel Cloud phục vụ Chính phủ điện tử, Đô thị thông minh và các tập đoàn kinh tế trọng điểm quốc gia, làm chủ công nghệ hạ tầng đám mây Make in Vietnam.",
    "skills": [
      "AWS",
      "Azure",
      "Cloud",
      "Kubernetes",
      "Linux",
      "OpenStack",
      "Security",
      "System Design"
    ],
    "perks": "Thu nhập 65 - 90 triệu VNĐ/tháng, thu nhập bình quân cả năm lên đến 1.2 - 1.5 tỷ VNĐ/năm • Môi trường nghiên cứu và làm chủ công nghệ hạ tầng cốt lõi tầm cỡ quốc gia • Chế độ bảo hiểm sức khỏe cao cấp Viettel Care",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 98,
      "experience": 34,
      "skills": 34,
      "education": 15,
      "culture": 15,
      "summary": "Hồ sơ đạt độ tương thích 98% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Azure, Cloud và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Azure, Cloud, Kubernetes",
        "Đáp ứng yêu cầu kinh nghiệm: 7+ năm kinh nghiệm kiến trúc hạ tầng Cloud viễn thông",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_9E95E3A15B614647",
    "rawLocation": {
      "fullAddress": "Số 1 Giang Văn Minh, Ba Đình, Hà Nội",
      "province": "Hà Nội",
      "district": "Ba Đình",
      "ward": "Phường Kim Mã (Ba Đình)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 7 năm kinh nghiệm trong ngành CNTT, ít nhất 3 năm làm Kiến trúc sư trưởng hạ tầng Cloud",
      "Am hiểu sâu sắc về kiến trúc OpenStack, VMware, Kubernetes và Public Cloud (AWS, Azure)",
      "Có năng lực thiết kế hệ thống Trung tâm dữ liệu phân tán (Multi-Datacenter, Software-Defined Networking)",
      "Hiểu biết về các tiêu chuẩn an toàn thông tin cấp quốc gia, cấp độ 4-5 và Nghị định bảo vệ dữ liệu cá nhân",
      "Có chứng chỉ chuyên gia kiến trúc quốc tế (AWS SAP, CKA, OpenStack Administrator)"
    ],
    "benefits": [
      "Thu nhập 65 - 90 triệu VNĐ/tháng, thu nhập bình quân cả năm lên đến 1.2 - 1.5 tỷ VNĐ/năm",
      "Môi trường nghiên cứu và làm chủ công nghệ hạ tầng cốt lõi tầm cỡ quốc gia",
      "Chế độ bảo hiểm sức khỏe cao cấp Viettel Care",
      "Các chế độ phúc lợi nghỉ dưỡng và teambuilding thường niên tại các resort hàng đầu"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/truong-kien-truc-dam-may-viettel",
      "crawledAt": "2026-11-03T05:16:40.395896+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_A4CE2D3EC91D44D7",
    "title": "Kỹ Sư DevOps / DevSecOps (Hạ Tầng Cloud Quốc Gia)",
    "companyName": "Công ty Công nghệ Thông tin VNPT (VNPT-IT)",
    "companyScale": "3000+ nhân sự",
    "isVerified": true,
    "matchScore": 86,
    "badgeType": "new",
    "salaryText": "30 - 45 triệu / tháng",
    "salaryMin": 30,
    "salaryMax": 45,
    "location": "Quận Đống Đa, Hà Nội • Phường Láng Hạ (Quận Đống Đa)",
    "experience": "3-5 năm kinh nghiệm quản trị hạ tầng DevOps",
    "postedTime": "Đăng hôm nay",
    "workType": "Toàn thời gian",
    "level": "Middle",
    "description": "Vận hành hệ thống CI/CD tự động và triển khai hạ tầng Container cho các sản phẩm chuyển đổi số quốc gia của tập đoàn VNPT trong các lĩnh vực Y tế điện tử (VNPT-HIS), Giáo dục (VNPT-Edu) và Hóa đơn điện tử.",
    "skills": [
      "Ansible",
      "CI/CD",
      "Cloud",
      "DevOps",
      "Docker",
      "Git",
      "Jenkins",
      "Kubernetes",
      "Linux",
      "Terraform"
    ],
    "perks": "Thu nhập từ 30 - 45 triệu VNĐ/tháng, thưởng các ngày lễ Tết và hiệu quả công việc định kỳ • Môi trường làm việc ổn định, cơ hội thăng tiến rõ ràng trong tập đoàn viễn thông hàng đầu • Chế độ bảo hiểm theo quy định nhà nước và gói bảo hiểm sức khỏe nâng cao",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #047857 0%, #065f46 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 86,
      "experience": 30,
      "skills": 30,
      "education": 13,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 86% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Ansible, CI/CD, Cloud và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Ansible, CI/CD, Cloud, DevOps",
        "Đáp ứng yêu cầu kinh nghiệm: 3-5 năm kinh nghiệm quản trị hạ tầng DevOps",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Ansible để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_D01A299142F64F78",
    "rawLocation": {
      "fullAddress": "Tòa nhà VNPT, 57 Huỳnh Thúc Kháng, Đống Đa, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Đống Đa",
      "ward": "Phường Láng Hạ (Quận Đống Đa)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 3 năm kinh nghiệm thực tế về DevOps, System Admin hoặc Cloud Infrastructure",
      "Thành thạo công cụ tự động hóa: Ansible, Terraform, Jenkins, GitLab CI",
      "Kinh nghiệm quản trị hệ thống Linux (RHEL, Ubuntu), Docker container và cụm Kubernetes",
      "Có kiến thức về an toàn thông tin mạng, tích hợp các công cụ kiểm tra bảo mật (SonarQube, OWASP ZAP)",
      "Tinh thần kỷ luật cao, sẵn sàng tham gia trực vận hành hệ thống trọng yếu"
    ],
    "benefits": [
      "Thu nhập từ 30 - 45 triệu VNĐ/tháng, thưởng các ngày lễ Tết và hiệu quả công việc định kỳ",
      "Môi trường làm việc ổn định, cơ hội thăng tiến rõ ràng trong tập đoàn viễn thông hàng đầu",
      "Chế độ bảo hiểm theo quy định nhà nước và gói bảo hiểm sức khỏe nâng cao",
      "Hỗ trợ kinh phí đào tạo và thi các chứng chỉ quốc tế uy tín"
    ],
    "source": {
      "platform": "VietnamWorks",
      "originalUrl": "https://vietnamworks.com/ky-su-devops-vnpt-it",
      "crawledAt": "2026-11-03T05:16:40.396908+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_C41C2073DDDA42CC",
    "title": "Senior Cloud DevOps & Security Engineer",
    "companyName": "Axon Vietnam (Axon Enterprise)",
    "companyScale": "500-1000 nhân sự",
    "isVerified": true,
    "matchScore": 93,
    "badgeType": "hot",
    "salaryText": "55 - 85 triệu / tháng",
    "salaryMin": 55,
    "salaryMax": 85,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "5+ năm kinh nghiệm Cloud Security & DevOps",
    "postedTime": "Đăng hôm qua",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Thiết kế và duy trì hạ tầng đám mây công cộng đạt chuẩn an ninh nghiêm ngặt FedRAMP và CJIS của Hoa Kỳ phục vụ hệ sinh thái thiết bị cảnh sát và cơ quan an ninh công cộng toàn cầu.",
    "skills": [
      "AWS",
      "Azure",
      "CI/CD",
      "DevOps",
      "Docker",
      "Kubernetes",
      "Python",
      "Terraform"
    ],
    "perks": "Mức lương cạnh tranh 55 - 85 triệu VNĐ/tháng, gói thưởng cổ phiếu RSU của tập đoàn công nghệ Mỹ • Làm việc tại tòa nhà chuẩn xanh Deutsches Haus sang trọng tại trung tâm Quận 1 • Chế độ làm việc kết hợp linh hoạt, 20 ngày nghỉ phép hưởng lương mỗi năm",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #374151 0%, #111827 100%)",
    "logoType": "shield",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 93,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 93% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Azure, CI/CD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Azure, CI/CD, DevOps",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm Cloud Security & DevOps",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_184A13FFF3AF4412",
    "rawLocation": {
      "fullAddress": "Tòa nhà Deutsches Haus, 33 Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm làm việc về Cloud Engineering, DevOps hoặc DevSecOps",
      "Thành thạo hạ tầng AWS và Azure, kiến trúc mạng an toàn, VPN, Direct Connect, IAM",
      "Thành thạo Terraform, Docker, Kubernetes và tự động hóa CI/CD với GitHub Enterprise",
      "Hiểu biết thực tiễn về các tiêu chuẩn an ninh nghiêm ngặt (SOC 2, FedRAMP, ISO 27001)",
      "Giao tiếp tiếng Anh thành thạo như người bản ngữ để phối hợp cùng trụ sở tại Seattle, Mỹ"
    ],
    "benefits": [
      "Mức lương cạnh tranh 55 - 85 triệu VNĐ/tháng, gói thưởng cổ phiếu RSU của tập đoàn công nghệ Mỹ",
      "Làm việc tại tòa nhà chuẩn xanh Deutsches Haus sang trọng tại trung tâm Quận 1",
      "Chế độ làm việc kết hợp linh hoạt, 20 ngày nghỉ phép hưởng lương mỗi năm",
      "Gói bảo hiểm sức khỏe quốc tế cao cấp cho nhân viên và cả gia đình"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/senior-cloud-devops-security-axon",
      "crawledAt": "2026-11-03T05:16:40.397908+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_9317498E0B9E479F",
    "title": "Senior Cloud Platform & DevOps Engineer (AWS & OpenShift)",
    "companyName": "VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)",
    "companyScale": "10000+ nhân sự",
    "isVerified": true,
    "matchScore": 81,
    "badgeType": "hot",
    "salaryText": "45 - 70 triệu / tháng",
    "salaryMin": 45,
    "salaryMax": 70,
    "location": "Quận Đống Đa, Hà Nội • Phường Láng Hạ (Quận Đống Đa)",
    "experience": "5+ năm kinh nghiệm Cloud Platform ngân hàng",
    "postedTime": "Đăng 2 ngày trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Quản trị và tối ưu hóa hạ tầng đám mây lai (Hybrid Cloud với AWS và OpenShift On-premise) cho các ứng dụng ngân hàng số NEO, phục vụ hàng chục triệu giao dịch tài chính an toàn mỗi ngày.",
    "skills": [
      "AWS",
      "Ansible",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Linux",
      "Prometheus",
      "Security",
      "Terraform"
    ],
    "perks": "Mức lương cạnh tranh 45 - 70 triệu VNĐ/tháng kèm theo thưởng cuối năm từ 3-5 tháng lương • Chế độ vay ưu đãi dành riêng cho cán bộ nhân viên ngân hàng VPBank • Gói bảo hiểm sức khỏe VIP VPBank Care cho bản thân và người thân",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 81,
      "experience": 28,
      "skills": 28,
      "education": 12,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 81% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Ansible, CI/CD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Ansible, CI/CD, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm Cloud Platform ngân hàng",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_04AAB7F24C3E49A1",
    "rawLocation": {
      "fullAddress": "Tòa nhà VPBank Tower, 89 Láng Hạ, Đống Đa, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Đống Đa",
      "ward": "Phường Láng Hạ (Quận Đống Đa)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm quản trị hệ thống Linux, Cloud Infrastructure và DevOps",
      "Thành thạo AWS Cloud (EC2, VPC, EKS, RDS, IAM) và Red Hat OpenShift Container Platform",
      "Kinh nghiệm viết Infrastructure as Code bằng Terraform và tự động hóa với Ansible, GitLab CI",
      "Am hiểu sâu sắc về tiêu chuẩn an toàn bảo mật tài chính ngân hàng (PCI-DSS, ISO 27001)"
    ],
    "benefits": [
      "Mức lương cạnh tranh 45 - 70 triệu VNĐ/tháng kèm theo thưởng cuối năm từ 3-5 tháng lương",
      "Chế độ vay ưu đãi dành riêng cho cán bộ nhân viên ngân hàng VPBank",
      "Gói bảo hiểm sức khỏe VIP VPBank Care cho bản thân và người thân",
      "Môi trường chuyển đổi số năng động hàng đầu ngành tài chính"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/senior-cloud-devops-vpbank",
      "crawledAt": "2026-11-03T05:16:40.397908+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_CAD1C0F4EC18477D",
    "title": "Senior DevOps Engineer (E-commerce Cloud Infrastructure)",
    "companyName": "Tiki (Công ty Cổ phần Ti Ki)",
    "companyScale": "2000-5000 nhân sự",
    "isVerified": true,
    "matchScore": 88,
    "badgeType": "new",
    "salaryText": "40 - 65 triệu / tháng",
    "salaryMin": 40,
    "salaryMax": 65,
    "location": "Quận 10, Hồ Chí Minh • Phường 12 (Quận 10)",
    "experience": "4-6 năm kinh nghiệm DevOps sàn thương mại điện tử",
    "postedTime": "Đăng 1 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Vận hành và tự động hóa hạ tầng đám mây AWS & GCP chịu tải cao cho sàn TMĐT Tiki, xây dựng hệ thống tự động co giãn (Auto Scaling) cho các sự kiện flash sale hàng triệu người truy cập cùng lúc.",
    "skills": [
      "AWS",
      "Ansible",
      "CI/CD",
      "Docker",
      "GCP",
      "Kafka",
      "Kubernetes",
      "Linux",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Python",
      "Redis",
      "Terraform"
    ],
    "perks": "Lương từ 40 - 65 triệu VNĐ/tháng, xét tăng lương định kỳ hàng năm • Chế độ làm việc kết hợp linh hoạt Hybrid (2-3 ngày WFH) • Bảo hiểm sức khỏe cao cấp TikiCare và ưu đãi giảm giá khi mua hàng trên Tiki",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
    "logoType": "cart",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 88,
      "experience": 31,
      "skills": 31,
      "education": 13,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 88% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Ansible, CI/CD và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Ansible, CI/CD, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 4-6 năm kinh nghiệm DevOps sàn thương mại điện tử",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_80AD93D78C3144C7",
    "rawLocation": {
      "fullAddress": "Tòa nhà Viettel Complex, 285 Cách Mạng Tháng 8, Quận 10, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 10",
      "ward": "Phường 12 (Quận 10)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 4 năm kinh nghiệm làm việc ở vị trí DevOps, System Administrator trên nền tảng AWS hoặc GCP",
      "Thành thạo Kubernetes (EKS/GKE), Docker và các công cụ quản lý hạ tầng Terraform, Ansible",
      "Thành thạo lập trình scripting tự động hóa với Python hoặc Bash",
      "Kinh nghiệm quản lý hệ thống cơ sở dữ liệu lớn (MySQL, PostgreSQL, MongoDB, Redis, Kafka)"
    ],
    "benefits": [
      "Lương từ 40 - 65 triệu VNĐ/tháng, xét tăng lương định kỳ hàng năm",
      "Chế độ làm việc kết hợp linh hoạt Hybrid (2-3 ngày WFH)",
      "Bảo hiểm sức khỏe cao cấp TikiCare và ưu đãi giảm giá khi mua hàng trên Tiki",
      "Môi trường công nghệ thuần Product với văn hóa học hỏi cởi mở"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/senior-devops-engineer-tiki",
      "crawledAt": "2026-11-03T05:16:40.398901+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_91DB6A3264A54E96",
    "title": "Senior Site Reliability Engineer (Global Gaming Cloud)",
    "companyName": "Amanotes (Công ty Cổ phần Công nghệ Âm nhạc Amanotes)",
    "companyScale": "250-500 nhân sự",
    "isVerified": true,
    "matchScore": 95,
    "badgeType": "hot",
    "salaryText": "50 - 75 triệu / tháng",
    "salaryMin": 50,
    "salaryMax": 75,
    "location": "Quận 4, Hồ Chí Minh • Phường 9 (Quận 4)",
    "experience": "5+ năm kinh nghiệm SRE & Cloud Gaming",
    "postedTime": "Đăng 2 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Bảo đảm hiệu năng siêu mượt mà và tính sẵn sàng 99.99% cho hệ sinh thái game âm nhạc toàn cầu với hơn 3 tỷ lượt tải, thiết kế hạ tầng Multi-Region trên AWS có độ trễ cực thấp.",
    "skills": [
      "AWS",
      "Cloud",
      "DevOps",
      "FinOps",
      "Golang",
      "Grafana",
      "Kubernetes",
      "Prometheus",
      "Python",
      "Terraform"
    ],
    "perks": "Mức thu nhập cạnh tranh 50 - 75 triệu VNĐ/tháng + thưởng hiệu suất sản phẩm toàn cầu • Giờ làm việc linh hoạt không chấm công, chính sách WFH mở rộng • Bảo hiểm sức khỏe quốc tế cao cấp",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)",
    "logoType": "brain",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 95,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 15,
      "summary": "Hồ sơ đạt độ tương thích 95% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Cloud, DevOps và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Cloud, DevOps, FinOps",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm SRE & Cloud Gaming",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_96FF2D1250444CAF",
    "rawLocation": {
      "fullAddress": "Tòa nhà Bcons Tower, Đoàn Văn Bơ, Quận 4, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 4",
      "ward": "Phường 9 (Quận 4)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm về SRE, Platform Engineering trên hạ tầng AWS",
      "Thành thạo quản lý Kubernetes cụm đa vùng (Multi-Region EKS), Service Mesh, CloudFront CDN",
      "Thành thạo viết công cụ tự động hóa bằng Golang hoặc Python",
      "Kinh nghiệm xử lý bài toán tối ưu chi phí hạ tầng Cloud (FinOps) quy mô hàng triệu USD/năm"
    ],
    "benefits": [
      "Mức thu nhập cạnh tranh 50 - 75 triệu VNĐ/tháng + thưởng hiệu suất sản phẩm toàn cầu",
      "Giờ làm việc linh hoạt không chấm công, chính sách WFH mở rộng",
      "Bảo hiểm sức khỏe quốc tế cao cấp",
      "Ngân sách $1500/năm cho việc học tập và tham gia các hội thảo công nghệ quốc tế (AWS re:Invent)"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/senior-sre-amanotes",
      "crawledAt": "2026-11-03T05:16:40.400425+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_31ECADAAA86F45A5",
    "title": "Lead Cloud & DevSecOps Engineer (Digital Banking Platform)",
    "companyName": "MBBank (Ngân hàng TMCP Quân Đội)",
    "companyScale": "10000+ nhân sự",
    "isVerified": true,
    "matchScore": 83,
    "badgeType": "hot",
    "salaryText": "60 - 90 triệu / tháng",
    "salaryMin": 60,
    "salaryMax": 90,
    "location": "Cầu Giấy, Hà Nội • Phường Trung Hòa (Cầu Giấy)",
    "experience": "7+ năm kinh nghiệm DevSecOps & Cloud Security",
    "postedTime": "Đăng 3 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Lead / Principal Architect",
    "description": "Chỉ đạo chiến lược DevSecOps và tự động hóa hạ tầng đám mây cho toàn bộ ứng dụng MBBank App phục vụ hơn 25 triệu khách hàng, tích hợp các chuẩn an toàn thông tin quân đội nghiêm ngặt.",
    "skills": [
      "AWS",
      "Azure",
      "CI/CD",
      "DevOps",
      "Kubernetes",
      "Security",
      "System Design",
      "Terraform"
    ],
    "perks": "Thu nhập 60 - 90 triệu VNĐ/tháng + thưởng hiệu quả kinh doanh ngân hàng (4-6 tháng lương) • Chế độ đãi ngộ xuất sắc của tập đoàn Quân đội • Gói bảo hiểm sức khỏe MB Care cao cấp cho bản thân và gia đình",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 83,
      "experience": 29,
      "skills": 29,
      "education": 12,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 83% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Azure, CI/CD và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Azure, CI/CD, DevOps",
        "Đáp ứng yêu cầu kinh nghiệm: 7+ năm kinh nghiệm DevSecOps & Cloud Security",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_A12465026710404C",
    "rawLocation": {
      "fullAddress": "Tòa nhà MB Grand Tower, 63 Lê Văn Lương, Cầu Giấy, Hà Nội",
      "province": "Hà Nội",
      "district": "Cầu Giấy",
      "ward": "Phường Trung Hòa (Cầu Giấy)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 7 năm kinh nghiệm làm việc về kiến trúc hệ thống, DevOps và bảo mật an toàn thông tin",
      "Chuyên gia về kiến trúc đám mây AWS và Azure, thiết kế hạ tầng tuân thủ chuẩn an ninh cấp độ 4",
      "Thành thạo tích hợp quy trình DevSecOps (SAST/DAST/SCA), quản trị container bảo mật (Aqua/Prisma)",
      "Kỹ năng dẫn dắt và huấn luyện đội ngũ kỹ sư hạ tầng hơn 30 nhân sự"
    ],
    "benefits": [
      "Thu nhập 60 - 90 triệu VNĐ/tháng + thưởng hiệu quả kinh doanh ngân hàng (4-6 tháng lương)",
      "Chế độ đãi ngộ xuất sắc của tập đoàn Quân đội",
      "Gói bảo hiểm sức khỏe MB Care cao cấp cho bản thân và gia đình",
      "Cơ hội làm chủ các dự án hạ tầng số quy mô cấp quốc gia"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/lead-cloud-devsecops-mbbank",
      "crawledAt": "2026-11-03T05:16:40.400425+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_17F8B84522F94F12",
    "title": "Cloud DevOps & MLOps Platform Architect",
    "companyName": "VinBigData (Tập đoàn Vingroup)",
    "companyScale": "500-1000 nhân sự",
    "isVerified": true,
    "matchScore": 90,
    "badgeType": "new",
    "salaryText": "80 - 120 triệu / tháng",
    "salaryMin": 80,
    "salaryMax": 120,
    "location": "Quận Hai Bà Trưng, Hà Nội • Phường Vĩnh Tuy (Quận Hai Bà Trưng)",
    "experience": "8+ năm kinh nghiệm kiến trúc hạ tầng AI & Cloud",
    "postedTime": "Đăng 5 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Lead / Principal Architect",
    "description": "Thiết kế kiến trúc hạ tầng tính toán hiệu năng cao (HPC Cloud) và luồng MLOps tự động hóa phục vụ huấn luyện và triển khai mô hình ngôn ngữ lớn (ViGPT) và trợ lý ảo thông minh trên xe điện VinFast.",
    "skills": [
      "AWS",
      "ArgoCD",
      "Docker",
      "GCP",
      "Kubernetes",
      "Python",
      "System Design",
      "Terraform"
    ],
    "perks": "Mức thu nhập 80 - 120 triệu VNĐ/tháng, thưởng thành tích công nghệ đột phá • Chính sách ưu đãi mua nhà Vinhomes và xe điện VinFast đặc quyền • Bảo hiểm sức khỏe cao cấp Vinmec toàn diện",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)",
    "logoType": "brain",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 90,
      "experience": 31,
      "skills": 31,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 90% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, ArgoCD, Docker và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, ArgoCD, Docker, GCP",
        "Đáp ứng yêu cầu kinh nghiệm: 8+ năm kinh nghiệm kiến trúc hạ tầng AI & Cloud",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_9808045A3E3144E2",
    "rawLocation": {
      "fullAddress": "Tòa nhà Century Tower, Times City, Hai Bà Trưng, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Hai Bà Trưng",
      "ward": "Phường Vĩnh Tuy (Quận Hai Bà Trưng)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 8 năm kinh nghiệm kiến trúc hệ thống Cloud và hạ tầng AI/BigData",
      "Thành thạo quản lý cụm GPU quy mô lớn (NVIDIA H100/A100) trên Kubernetes (K8s) và AWS/GCP",
      "Kinh nghiệm triển khai pipeline MLOps với Kubeflow, MLflow, Triton Inference Server",
      "Thành thạo Infrastructure as Code (Terraform), GitOps (ArgoCD) và giám sát hạ tầng GPU"
    ],
    "benefits": [
      "Mức thu nhập 80 - 120 triệu VNĐ/tháng, thưởng thành tích công nghệ đột phá",
      "Chính sách ưu đãi mua nhà Vinhomes và xe điện VinFast đặc quyền",
      "Bảo hiểm sức khỏe cao cấp Vinmec toàn diện",
      "Môi trường nghiên cứu làm việc trực tiếp cùng các nhà khoa học dữ liệu hàng đầu thế giới"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/vinbigdata-cloud-mlops-architect",
      "crawledAt": "2026-11-03T05:16:40.401425+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_AA560822F8AD44A4",
    "title": "Cloud Solutions Architect (AWS & Azure Enterprise Migration)",
    "companyName": "TMA Solutions (TMA Tech Group)",
    "companyScale": "4000+ nhân sự",
    "isVerified": true,
    "matchScore": 97,
    "badgeType": "hot",
    "salaryText": "65 - 95 triệu / tháng",
    "salaryMin": 65,
    "salaryMax": 95,
    "location": "Quận 12, Hồ Chí Minh • Phường Tân Chánh Hiệp (Quận 12)",
    "experience": "7+ năm kinh nghiệm tư vấn di chuyển đám mây",
    "postedTime": "Đăng hôm nay",
    "workType": "Hybrid linh hoạt",
    "level": "Lead / Principal Architect",
    "description": "Lãnh đạo các dự án di chuyển hạ tầng từ On-premise lên nền tảng AWS và Azure (Cloud Migration) cho các khách hàng viễn thông và tài chính tại Bắc Mỹ, Nhật Bản và Úc.",
    "skills": [
      "AWS",
      "Architecture",
      "Azure",
      "Cloud",
      "Docker",
      "Microservices",
      "System Design",
      "Terraform"
    ],
    "perks": "Thu nhập thỏa thuận từ 65 - 95 triệu VNĐ/tháng + thưởng dự án xuất sắc • Khuôn viên TMA Innovation Park hiện đại với sân bóng đá, tennis, phòng gym • Gói bảo hiểm sức khỏe cao cấp TMA Care",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 97,
      "experience": 34,
      "skills": 34,
      "education": 15,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 97% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Architecture, Azure và kinh nghiệm phù hợp với cấp bậc Lead / Principal Architect.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Architecture, Azure, Cloud",
        "Đáp ứng yêu cầu kinh nghiệm: 7+ năm kinh nghiệm tư vấn di chuyển đám mây",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_A68AAD4DFC334773",
    "rawLocation": {
      "fullAddress": "Công viên Phần mềm Quang Trung, Quận 12, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 12",
      "ward": "Phường Tân Chánh Hiệp (Quận 12)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 7 năm kinh nghiệm thiết kế kiến trúc phần mềm và hạ tầng đám mây",
      "Kinh nghiệm thực chiến về các chiến lược di chuyển Cloud: Rehost, Replatform, Refactor (6 Rs)",
      "Thành thạo các công cụ Cloud Migration: AWS Migration Hub, Azure Migrate, Database Migration Service",
      "Bắt buộc có chứng chỉ AWS Certified Solutions Architect Professional hoặc Azure Solutions Architect",
      "Tiếng Anh giao tiếp thành thạo trong môi trường làm việc quốc tế"
    ],
    "benefits": [
      "Thu nhập thỏa thuận từ 65 - 95 triệu VNĐ/tháng + thưởng dự án xuất sắc",
      "Khuôn viên TMA Innovation Park hiện đại với sân bóng đá, tennis, phòng gym",
      "Gói bảo hiểm sức khỏe cao cấp TMA Care",
      "Cơ hội đi công tác và làm việc Onsite tại Canada, Mỹ, Úc"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/cloud-solutions-architect-tma",
      "crawledAt": "2026-11-03T05:16:40.402444+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_7D011E5340484317",
    "title": "Senior Cloud Infrastructure Engineer (FinOps & Kubernetes)",
    "companyName": "ZaloPay (Công ty Cổ phần Zion - Tập đoàn VNG)",
    "companyScale": "1000+ nhân sự",
    "isVerified": true,
    "matchScore": 85,
    "badgeType": "hot",
    "salaryText": "55 - 80 triệu / tháng",
    "salaryMin": 55,
    "salaryMax": 80,
    "location": "Quận 7, Hồ Chí Minh • Phường Tân Thuận Đông (Quận 7)",
    "experience": "5+ năm kinh nghiệm hạ tầng ví điện tử",
    "postedTime": "Đăng hôm qua",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Thiết kế và tối ưu hóa hạ tầng điện toán đám mây cho ví điện tử ZaloPay, xây dựng cơ chế quản lý chi phí đám mây (FinOps) tự động và đảm bảo hệ thống thanh toán tức thời không gián đoạn.",
    "skills": [
      "AWS",
      "FinOps",
      "Golang",
      "Grafana",
      "Kafka",
      "Kubernetes",
      "Prometheus",
      "Python",
      "Terraform"
    ],
    "perks": "Thu nhập cạnh tranh từ 55 - 80 triệu VNĐ/tháng + gói cổ phiếu thưởng ESOP VNG • Làm việc tại khu phức hợp hiện đại VNG Campus chuẩn Silicon Valley • Gói bảo hiểm sức khỏe VIP toàn diện",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 85,
      "experience": 30,
      "skills": 30,
      "education": 13,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 85% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, FinOps, Golang và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, FinOps, Golang, Grafana",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm hạ tầng ví điện tử",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_A205FD5447F04DAF",
    "rawLocation": {
      "fullAddress": "VNG Campus, Khu chế xuất Tân Thuận, Quận 7, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 7",
      "ward": "Phường Tân Thuận Đông (Quận 7)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm quản trị hạ tầng Cloud AWS và Kubernetes quy mô lớn",
      "Kinh nghiệm sâu về FinOps: Tối ưu chi phí Compute, Storage, Data Transfer và Reserved Instances",
      "Thành thạo lập trình Go (Golang) hoặc Python để phát triển công cụ tự động hóa nội bộ",
      "Hiểu biết về bảo mật hệ thống thanh toán quốc tế PCI-DSS Level 1"
    ],
    "benefits": [
      "Thu nhập cạnh tranh từ 55 - 80 triệu VNĐ/tháng + gói cổ phiếu thưởng ESOP VNG",
      "Làm việc tại khu phức hợp hiện đại VNG Campus chuẩn Silicon Valley",
      "Gói bảo hiểm sức khỏe VIP toàn diện",
      "Cơm trưa miễn phí chuẩn nhà hàng 5 sao và các hoạt động thể thao đa dạng"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/zalopay-cloud-infrastructure-engineer",
      "crawledAt": "2026-11-03T05:16:40.403431+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_1225FF9F958A44A1",
    "title": "Senior Platform DevOps Engineer (AWS Big Data Infrastructure)",
    "companyName": "Trusting Social (AI Fintech)",
    "companyScale": "250-500 nhân sự",
    "isVerified": true,
    "matchScore": 92,
    "badgeType": "new",
    "salaryText": "50 - 80 triệu / tháng",
    "salaryMin": 50,
    "salaryMax": 80,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "5+ năm kinh nghiệm DevOps dữ liệu lớn",
    "postedTime": "Đăng 2 ngày trước",
    "workType": "Hybrid linh hoạt",
    "level": "Senior Specialist",
    "description": "Quản trị hạ tầng phân tích dữ liệu lớn trên AWS (EMR, Spark, Kafka, Presto) phục vụ chấm điểm tín dụng AI cho hơn 1 tỷ người dùng tại các thị trường mới nổi Đông Nam Á và Ấn Độ.",
    "skills": [
      "AWS",
      "CI/CD",
      "Docker",
      "Kafka",
      "Kubernetes",
      "Linux",
      "Python",
      "Terraform"
    ],
    "perks": "Mức lương hấp dẫn 50 - 80 triệu VNĐ/tháng kèm theo thưởng cổ phần công ty AI giá trị cao • Văn phòng làm việc tại tầng cao Bitexco với view toàn cảnh TP. Hồ Chí Minh • Bảo hiểm sức khỏe cao cấp toàn diện",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 92,
      "experience": 32,
      "skills": 32,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 92% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, Docker và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, Docker, Kafka",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm DevOps dữ liệu lớn",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_C2D87BC7A58A460E",
    "rawLocation": {
      "fullAddress": "Tòa nhà Bitexco Financial Tower, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm về DevOps, Data Platform Engineering trên AWS",
      "Thành thạo quản lý hạ tầng Big Data: Apache Spark, Kafka, Presto, Hadoop, Airflow",
      "Thành thạo Terraform, Kubernetes (EKS), Docker và tự động hóa CI/CD",
      "Kỹ năng lập trình tốt với Python và am hiểu về quản trị an ninh dữ liệu nhạy cảm"
    ],
    "benefits": [
      "Mức lương hấp dẫn 50 - 80 triệu VNĐ/tháng kèm theo thưởng cổ phần công ty AI giá trị cao",
      "Văn phòng làm việc tại tầng cao Bitexco với view toàn cảnh TP. Hồ Chí Minh",
      "Bảo hiểm sức khỏe cao cấp toàn diện",
      "Văn hóa làm việc chuẩn công nghệ quốc tế với đồng nghiệp từ Singapore, Mỹ, Ấn Độ"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/trusting-social-platform-devops",
      "crawledAt": "2026-11-03T05:16:40.404430+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_D0D842599B424A06",
    "title": "Cloud Infrastructure & DevOps Specialist (Microsoft Azure)",
    "companyName": "Prudential Vietnam Assurance",
    "companyScale": "2000+ nhân sự",
    "isVerified": true,
    "matchScore": 80,
    "badgeType": "hot",
    "salaryText": "38 - 55 triệu / tháng",
    "salaryMin": 38,
    "salaryMax": 55,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "3-5 năm kinh nghiệm quản trị hạ tầng Azure",
    "postedTime": "Đăng 1 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Middle",
    "description": "Vận hành và chuẩn hóa hạ tầng đám mây Microsoft Azure cho hệ thống bảo hiểm nhân thọ cốt lõi, triển khai tự động hóa bằng Terraform và giám sát an toàn thông tin theo tiêu chuẩn tập đoàn Prudential Anh Quốc.",
    "skills": [
      "Azure",
      "CI/CD",
      "Cloud",
      "DevOps",
      "PowerShell",
      "Terraform",
      "Windows Server"
    ],
    "perks": "Thu nhập từ 38 - 55 triệu VNĐ/tháng + thưởng hiệu suất kinh doanh năm • 18 ngày nghỉ phép hưởng lương/năm, chế độ làm việc Hybrid linh hoạt • Bảo hiểm sức khỏe quốc tế cao cấp cho nhân viên và người thân",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #095744 0%, #246955 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 80,
      "experience": 28,
      "skills": 28,
      "education": 12,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 80% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Azure, CI/CD, Cloud và kinh nghiệm phù hợp với cấp bậc Middle.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Azure, CI/CD, Cloud, DevOps",
        "Đáp ứng yêu cầu kinh nghiệm: 3-5 năm kinh nghiệm quản trị hạ tầng Azure",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Azure để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_96DC5AEA91604C76",
    "rawLocation": {
      "fullAddress": "Tòa nhà M-Plaza, 39 Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Từ 3 năm kinh nghiệm quản trị hạ tầng đám mây Microsoft Azure",
      "Thành thạo tự động hóa hạ tầng với Terraform, Azure CLI và PowerShell",
      "Kinh nghiệm cấu hình luồng CI/CD với Azure DevOps và GitHub Actions",
      "Có chứng chỉ Microsoft Certified: Azure Administrator Associate (AZ-104)"
    ],
    "benefits": [
      "Thu nhập từ 38 - 55 triệu VNĐ/tháng + thưởng hiệu suất kinh doanh năm",
      "18 ngày nghỉ phép hưởng lương/năm, chế độ làm việc Hybrid linh hoạt",
      "Bảo hiểm sức khỏe quốc tế cao cấp cho nhân viên và người thân",
      "Gói bảo hiểm nhân thọ ưu đãi đặc quyền của Prudential"
    ],
    "source": {
      "platform": "VietnamWorks",
      "originalUrl": "https://vietnamworks.com/azure-devops-specialist-prudential",
      "crawledAt": "2026-11-03T05:16:40.404430+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_7C6DCAD567F14D93",
    "title": "Senior DevOps Engineer (Fintech High-Throughput Platform)",
    "companyName": "ShopeePay / SeaMoney Vietnam",
    "companyScale": "3000+ nhân sự",
    "isVerified": true,
    "matchScore": 87,
    "badgeType": "hot",
    "salaryText": "50 - 80 triệu / tháng",
    "salaryMin": 50,
    "salaryMax": 80,
    "location": "Quận 1, Hồ Chí Minh • Phường Bến Nghé (Quận 1)",
    "experience": "5+ năm kinh nghiệm DevOps dịch vụ thanh toán",
    "postedTime": "Đăng 2 giờ trước",
    "workType": "Toàn thời gian",
    "level": "Senior Specialist",
    "description": "Quản trị và nâng cao độ tin cậy của nền tảng thanh toán điện tử ShopeePay, xử lý lưu lượng hàng trăm nghìn giao dịch mỗi phút trong các đợt Siêu Sale của hệ sinh thái Shopee.",
    "skills": [
      "AWS",
      "CI/CD",
      "DevOps",
      "Docker",
      "Golang",
      "Grafana",
      "Kubernetes",
      "Linux",
      "OpenTelemetry",
      "Prometheus",
      "Python"
    ],
    "perks": "Thu nhập hấp dẫn từ 50 - 80 triệu VNĐ/tháng + thưởng cuối năm cực kỳ cạnh tranh • Ăn sáng, đồ ăn nhẹ và đồ uống miễn phí hàng ngày tại tòa nhà Saigon Centre sang trọng • Gói bảo hiểm sức khỏe VIP toàn diện",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 87,
      "experience": 30,
      "skills": 30,
      "education": 13,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 87% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, DevOps và kinh nghiệm phù hợp với cấp bậc Senior Specialist.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, DevOps, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: 5+ năm kinh nghiệm DevOps dịch vụ thanh toán",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_7B482D1073D54F8A",
    "rawLocation": {
      "fullAddress": "Tòa nhà Saigon Centre, 65 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 1",
      "ward": "Phường Bến Nghé (Quận 1)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Tối thiểu 5 năm kinh nghiệm làm việc về DevOps hoặc SRE cho hệ thống thanh toán hoặc thương mại điện tử",
      "Thành thạo quản lý hạ tầng đám mây AWS, cụm Kubernetes quy mô lớn",
      "Thành thạo CI/CD pipelines, công cụ giám sát Prometheus, Grafana, OpenTelemetry",
      "Thành thạo lập trình script với Golang hoặc Python và xử lý sự cố hệ thống Production tải cao"
    ],
    "benefits": [
      "Thu nhập hấp dẫn từ 50 - 80 triệu VNĐ/tháng + thưởng cuối năm cực kỳ cạnh tranh",
      "Ăn sáng, đồ ăn nhẹ và đồ uống miễn phí hàng ngày tại tòa nhà Saigon Centre sang trọng",
      "Gói bảo hiểm sức khỏe VIP toàn diện",
      "Môi trường công nghệ Fintech quy mô khu vực với cơ hội thăng tiến rộng mở"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/senior-devops-shopeepay",
      "crawledAt": "2026-11-03T05:16:40.405935+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_E1FCD99254D7473E",
    "title": "Thực Tập Sinh Kỹ Sư Đám Mây & DevOps (Cloud & DevOps Engineer Intern)",
    "companyName": "VNG Corporation",
    "companyScale": "2000+ nhân sự",
    "isVerified": true,
    "matchScore": 94,
    "badgeType": "new",
    "salaryText": "6 - 10 triệu / tháng",
    "salaryMin": 6,
    "salaryMax": 10,
    "location": "Quận 7, Hồ Chí Minh • Phường Tân Thuận Đông (Quận 7)",
    "experience": "Không yêu cầu kinh nghiệm, ưu tiên sinh viên năm cuối",
    "postedTime": "Đăng 3 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Intern",
    "description": "Tham gia hỗ trợ đội ngũ Cloud Platform vận hành và giám sát hạ tầng đám mây AWS, triển khai container hóa với Docker và xây dựng script tự động hóa CI/CD cho các sản phẩm công nghệ của VNG.",
    "skills": [
      "AWS",
      "CI/CD",
      "Cloud",
      "Docker",
      "Git",
      "Linux",
      "Python"
    ],
    "perks": "Trợ cấp thực tập hấp dẫn từ 6 - 10 triệu VNĐ/tháng kèm phụ cấp ăn trưa miễn phí tại VNG Campus • Được các Senior DevOps / Cloud Architect dày dạn kinh nghiệm trực tiếp kèm cặp (1-on-1 Mentorship) • Cơ hội chuyển tiếp lên nhân viên chính thức (Fresher/Junior) sau kỳ thực tập 3-6 tháng",
    "perkType": "star",
    "logoGradient": "linear-gradient(135deg, #047857 0%, #065f46 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 94,
      "experience": 33,
      "skills": 33,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 94% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, Cloud và kinh nghiệm phù hợp với cấp bậc Intern.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, Cloud, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: Không yêu cầu kinh nghiệm, ưu tiên sinh viên năm cuối",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_0D580A8B95374CAB",
    "rawLocation": {
      "fullAddress": "VNG Campus, Khu chế xuất Tân Thuận, Quận 7, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Quận 7",
      "ward": "Phường Tân Thuận Đông (Quận 7)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Sinh viên năm cuối hoặc mới tốt nghiệp chuyên ngành CNTT, Khoa học máy tính hoặc tương đương",
      "Có kiến thức nền tảng tốt về hệ điều hành Linux, mạng máy tính (TCP/IP, DNS) và kiến trúc máy chủ",
      "Hiểu biết cơ bản về dịch vụ đám mây (AWS EC2, S3, VPC) và công nghệ Container (Docker)",
      "Biết viết script cơ bản với Python hoặc Bash shell",
      "Có tinh thần học hỏi cao, yêu thích lĩnh vực Cloud & DevOps"
    ],
    "benefits": [
      "Trợ cấp thực tập hấp dẫn từ 6 - 10 triệu VNĐ/tháng kèm phụ cấp ăn trưa miễn phí tại VNG Campus",
      "Được các Senior DevOps / Cloud Architect dày dạn kinh nghiệm trực tiếp kèm cặp (1-on-1 Mentorship)",
      "Cơ hội chuyển tiếp lên nhân viên chính thức (Fresher/Junior) sau kỳ thực tập 3-6 tháng",
      "Trải nghiệm môi trường làm việc chuẩn quốc tế với phòng gym, hồ bơi và khu giải trí"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/cloud-devops-intern-vng",
      "crawledAt": "2026-11-03T05:23:44.130365+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_1364EFB3CAD04102",
    "title": "Thực Tập Sinh AWS Cloud & Infrastructure (Cloud Engineer Intern)",
    "companyName": "FPT Software",
    "companyScale": "30000+ nhân sự",
    "isVerified": true,
    "matchScore": 82,
    "badgeType": "hot",
    "salaryText": "5 - 8 triệu / tháng",
    "salaryMin": 5,
    "salaryMax": 8,
    "location": "Thành phố Thủ Đức, Hồ Chí Minh • Phường Tân Phú (Thành phố Thủ Đức)",
    "experience": "Dành cho sinh viên năm 3, năm 4 hoặc mới tốt nghiệp",
    "postedTime": "Đăng 5 giờ trước",
    "workType": "Hybrid linh hoạt",
    "level": "Intern",
    "description": "Tham gia hỗ trợ triển khai cấu hình hạ tầng đám mây Amazon Web Services (AWS), thực hành viết mã nguồn hạ tầng Infrastructure as Code (Terraform) và hỗ trợ quản trị hệ thống Linux cho các dự án khách hàng quốc tế.",
    "skills": [
      "AWS",
      "Bash",
      "Cloud",
      "Git",
      "Linux",
      "Terraform"
    ],
    "perks": "Mức hỗ trợ thực tập từ 5 - 8 triệu VNĐ/tháng, xét đánh giá năng lực định kỳ • Được tài trợ 100% lệ phí thi các chứng chỉ quốc tế của AWS (AWS Certified Cloud Practitioner / SAA) • Được tham gia các dự án thực tế quy mô lớn của FPT Software với đối tác nước ngoài",
    "perkType": "bolt",
    "logoGradient": "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 82,
      "experience": 29,
      "skills": 29,
      "education": 12,
      "culture": 12,
      "summary": "Hồ sơ đạt độ tương thích 82% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, Bash, Cloud và kinh nghiệm phù hợp với cấp bậc Intern.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, Bash, Cloud, Git",
        "Đáp ứng yêu cầu kinh nghiệm: Dành cho sinh viên năm 3, năm 4 hoặc mới tốt nghiệp",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_7D38F54A7C344F4E",
    "rawLocation": {
      "fullAddress": "F-Town 3, Khu Công nghệ cao, TP. Thủ Đức, TP. Hồ Chí Minh",
      "province": "Hồ Chí Minh",
      "district": "Thành phố Thủ Đức",
      "ward": "Phường Tân Phú (Thành phố Thủ Đức)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Sinh viên các trường Đại học kỹ thuật chuyên ngành Công nghệ thông tin, Viễn thông",
      "Có kiến thức căn bản về AWS (đã hoàn thành khóa học AWS Cloud Practitioner hoặc Solutions Architect Associate là điểm cộng)",
      "Quen thuộc với lệnh dòng lệnh Linux và quản lý mã nguồn Git/GitHub",
      "Tiếng Anh đọc hiểu tài liệu kỹ thuật tốt, giao tiếp cơ bản"
    ],
    "benefits": [
      "Mức hỗ trợ thực tập từ 5 - 8 triệu VNĐ/tháng, xét đánh giá năng lực định kỳ",
      "Được tài trợ 100% lệ phí thi các chứng chỉ quốc tế của AWS (AWS Certified Cloud Practitioner / SAA)",
      "Được tham gia các dự án thực tế quy mô lớn của FPT Software với đối tác nước ngoài",
      "Ký hợp đồng chính thức ngay sau khi kết thúc kỳ thực tập nếu đạt yêu cầu"
    ],
    "source": {
      "platform": "TopCV",
      "originalUrl": "https://topcv.vn/viec-lam/aws-cloud-intern-fpt",
      "crawledAt": "2026-11-03T05:23:44.131371+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_580F3651DE5D4C49",
    "title": "Thực Tập Sinh DevOps & Hạ Tầng Điện Toán Đám Mây (DevOps Intern)",
    "companyName": "Viettel Solutions (Tổng Công ty Giải pháp Doanh nghiệp Viettel)",
    "companyScale": "5000+ nhân sự",
    "isVerified": true,
    "matchScore": 89,
    "badgeType": "hot",
    "salaryText": "6 - 9 triệu / tháng",
    "salaryMin": 6,
    "salaryMax": 9,
    "location": "Ba Đình, Hà Nội • Phường Kim Mã (Ba Đình)",
    "experience": "Không yêu cầu kinh nghiệm",
    "postedTime": "Đăng hôm nay",
    "workType": "Toàn thời gian",
    "level": "Intern",
    "description": "Nghiên cứu và hỗ trợ tích hợp quy trình DevOps/DevSecOps trên nền tảng Viettel Cloud, đóng gói container hóa với Docker/Kubernetes và viết pipeline tự động hóa CI/CD cho các ứng dụng chuyển đổi số.",
    "skills": [
      "CI/CD",
      "Cloud",
      "DevOps",
      "Docker",
      "Git",
      "Kubernetes",
      "Linux"
    ],
    "perks": "Hỗ trợ thực tập từ 6 - 9 triệu VNĐ/tháng + trợ cấp ăn trưa tại cantin cơ quan • Được đào tạo bài bản từ lý thuyết đến thực hành trên hạ tầng Cloud Data Center quy mô lớn nhất Việt Nam • Cơ hội được tuyển dụng trực tiếp vào biên chế kỹ sư chính thức của Viettel",
    "perkType": "award",
    "logoGradient": "linear-gradient(135deg, #095744 0%, #246955 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 89,
      "experience": 31,
      "skills": 31,
      "education": 13,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 89% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về CI/CD, Cloud, DevOps và kinh nghiệm phù hợp với cấp bậc Intern.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: CI/CD, Cloud, DevOps, Docker",
        "Đáp ứng yêu cầu kinh nghiệm: Không yêu cầu kinh nghiệm",
        "Tương thích cao với mô hình làm việc Toàn thời gian"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về CI/CD để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_419A52BDED3945E5",
    "rawLocation": {
      "fullAddress": "Số 1 Giang Văn Minh, Ba Đình, Hà Nội",
      "province": "Hà Nội",
      "district": "Ba Đình",
      "ward": "Phường Kim Mã (Ba Đình)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Sinh viên năm 3, 4 hoặc mới tốt nghiệp Đại học Bách Khoa, Quốc Gia, Bưu chính Viễn thông,...",
      "Đam mê nghiên cứu công nghệ Cloud Native, Container, Kubernetes và DevOps",
      "Nắm vững kiến thức hệ điều hành Linux (CentOS/Ubuntu), mạng máy tính và bảo mật cơ bản",
      "Chủ động, có tinh thần trách nhiệm và khả năng làm việc nhóm tốt"
    ],
    "benefits": [
      "Hỗ trợ thực tập từ 6 - 9 triệu VNĐ/tháng + trợ cấp ăn trưa tại cantin cơ quan",
      "Được đào tạo bài bản từ lý thuyết đến thực hành trên hạ tầng Cloud Data Center quy mô lớn nhất Việt Nam",
      "Cơ hội được tuyển dụng trực tiếp vào biên chế kỹ sư chính thức của Viettel",
      "Môi trường kỷ luật, chuyên nghiệp và có chiều sâu công nghệ cao"
    ],
    "source": {
      "platform": "VietnamWorks",
      "originalUrl": "https://vietnamworks.com/devops-cloud-intern-viettel",
      "crawledAt": "2026-11-03T05:23:44.132370+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_E1EB483D07CE4ED6",
    "title": "Thực Tập Sinh Kiến Trúc Đám Mây & Microsoft Azure (Cloud Architecture Intern)",
    "companyName": "Techcombank (Ngân hàng TMCP Kỹ Thương Việt Nam)",
    "companyScale": "10000+ nhân sự",
    "isVerified": true,
    "matchScore": 96,
    "badgeType": "new",
    "salaryText": "7 - 10 triệu / tháng",
    "salaryMin": 7,
    "salaryMax": 10,
    "location": "Quận Hoàn Kiếm, Hà Nội • Phường Cửa Nam (Quận Hoàn Kiếm)",
    "experience": "Ưu tiên sinh viên có định hướng Cloud Architecture / DevOps",
    "postedTime": "Đăng hôm qua",
    "workType": "Hybrid linh hoạt",
    "level": "Intern",
    "description": "Hỗ trợ các Solution Architects của ngân hàng nghiên cứu, thiết kế và vẽ sơ đồ kiến trúc hệ thống đám mây Microsoft Azure, thử nghiệm triển khai các mô hình Proof of Concept (PoC) và kiểm tra tuân thủ kiến trúc ngân hàng số.",
    "skills": [
      "Architecture",
      "Azure",
      "Cloud",
      "PowerShell",
      "Python",
      "Security",
      "System Design"
    ],
    "perks": "Phụ cấp thực tập dẫn đầu ngành ngân hàng từ 7 - 10 triệu VNĐ/tháng • Làm việc tại trung tâm công nghệ Agile hiện đại của Techcombank tại trung tâm Hà Nội • Cơ hội tham gia chương trình Techcombank Talent Graduate Program danh giá",
    "perkType": "gift",
    "logoGradient": "linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)",
    "logoType": "bank",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 96,
      "experience": 34,
      "skills": 34,
      "education": 14,
      "culture": 14,
      "summary": "Hồ sơ đạt độ tương thích 96% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về Architecture, Azure, Cloud và kinh nghiệm phù hợp với cấp bậc Intern.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: Architecture, Azure, Cloud, PowerShell",
        "Đáp ứng yêu cầu kinh nghiệm: Ưu tiên sinh viên có định hướng Cloud Architecture / DevOps",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về Architecture để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_39A8679A840248CA",
    "rawLocation": {
      "fullAddress": "Tòa nhà Techcombank, 6 Quang Trung, Hoàn Kiếm, Hà Nội",
      "province": "Hà Nội",
      "district": "Quận Hoàn Kiếm",
      "ward": "Phường Cửa Nam (Quận Hoàn Kiếm)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Sinh viên năm cuối đại học các ngành CNTT, Phần mềm hoặc Hệ thống thông tin",
      "Có tư duy hệ thống (System Design), nắm vững các mô hình mạng và kiến trúc phân tán cơ bản",
      "Hiểu biết nền tảng về Microsoft Azure (Azure VM, VNet, Blob Storage, Entra ID)",
      "Kỹ năng tổng hợp tài liệu, vẽ sơ đồ kiến trúc và giao tiếp tiếng Anh tốt"
    ],
    "benefits": [
      "Phụ cấp thực tập dẫn đầu ngành ngân hàng từ 7 - 10 triệu VNĐ/tháng",
      "Làm việc tại trung tâm công nghệ Agile hiện đại của Techcombank tại trung tâm Hà Nội",
      "Cơ hội tham gia chương trình Techcombank Talent Graduate Program danh giá",
      "Được dẫn dắt bởi các Principal Cloud Solutions Architect hàng đầu thị trường"
    ],
    "source": {
      "platform": "LinkedIn",
      "originalUrl": "https://linkedin.com/jobs/view/techcombank-cloud-architecture-intern",
      "crawledAt": "2026-11-03T05:23:44.134373+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  },
  {
    "id": "job_AF895C84469E4783",
    "title": "Thực Tập Sinh DevOps & Cloud Automation (DevOps Engineer Intern)",
    "companyName": "KMS Technology Vietnam",
    "companyScale": "1000+ nhân sự",
    "isVerified": true,
    "matchScore": 84,
    "badgeType": "hot",
    "salaryText": "5 - 8 triệu / tháng",
    "salaryMin": 5,
    "salaryMax": 8,
    "location": "Hải Châu, Đà Nẵng • Phường Thạch Thang (Hải Châu)",
    "experience": "Không yêu cầu kinh nghiệm, có bài test đầu vào",
    "postedTime": "Đăng 2 ngày trước",
    "workType": "Hybrid linh hoạt",
    "level": "Intern",
    "description": "Tham gia xây dựng và tự động hóa các luồng CI/CD với GitLab CI / GitHub Actions, thực hành quản trị hạ tầng điện toán đám mây AWS và hỗ trợ giám sát sức khỏe hệ thống ứng dụng SaaS phục vụ thị trường Mỹ.",
    "skills": [
      "AWS",
      "CI/CD",
      "Docker",
      "Git",
      "Linux",
      "Node.js",
      "Python",
      "Terraform"
    ],
    "perks": "Trợ cấp thực tập từ 5 - 8 triệu VNĐ/tháng, xét tăng lương và thưởng theo tiến độ dự án • Chương trình đào tạo chuyên sâu KMS DevOps Bootcamp kéo dài 3 tháng • Được cung cấp Laptop phục vụ công việc và tham gia các hoạt động teambuilding, thể thao công ty",
    "perkType": "shield",
    "logoGradient": "linear-gradient(135deg, #047857 0%, #065f46 100%)",
    "logoType": "cloud",
    "isTopMatch": false,
    "rubricBreakdown": {
      "total": 84,
      "experience": 29,
      "skills": 29,
      "education": 13,
      "culture": 13,
      "summary": "Hồ sơ đạt độ tương thích 84% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về AWS, CI/CD, Docker và kinh nghiệm phù hợp với cấp bậc Intern.",
      "strengths": [
        "Kinh nghiệm thực hành tốt với các công nghệ lõi: AWS, CI/CD, Docker, Git",
        "Đáp ứng yêu cầu kinh nghiệm: Không yêu cầu kinh nghiệm, có bài test đầu vào",
        "Tương thích cao với mô hình làm việc Hybrid linh hoạt"
      ],
      "improvements": [
        "Bổ sung thêm các chứng chỉ chuyên sâu về AWS để gia tăng điểm thẩm định",
        "Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí"
      ]
    },
    "companyId": "comp_CA1BA627275B437A",
    "rawLocation": {
      "fullAddress": "Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng",
      "province": "Đà Nẵng",
      "district": "Hải Châu",
      "ward": "Phường Thạch Thang (Hải Châu)",
      "isPostJuly2025": true
    },
    "requirements": [
      "Sinh viên năm cuối các trường Đại học tại Đà Nẵng hoặc khu vực miền Trung ngành CNTT",
      "Đã từng tự tay cấu hình Linux, viết Dockerfile và đóng gói ứng dụng web cơ bản",
      "Hiểu biết cơ bản về quy trình CI/CD và các dịch vụ đám mây AWS cơ bản",
      "Kỹ năng lập trình cơ bản với Python, Node.js hoặc Bash script"
    ],
    "benefits": [
      "Trợ cấp thực tập từ 5 - 8 triệu VNĐ/tháng, xét tăng lương và thưởng theo tiến độ dự án",
      "Chương trình đào tạo chuyên sâu KMS DevOps Bootcamp kéo dài 3 tháng",
      "Được cung cấp Laptop phục vụ công việc và tham gia các hoạt động teambuilding, thể thao công ty",
      "Cam kết cơ hội ký hợp đồng kỹ sư chính thức sau khi tốt nghiệp"
    ],
    "source": {
      "platform": "ITviec",
      "originalUrl": "https://itviec.com/jobs/devops-intern-kms-technology",
      "crawledAt": "2026-11-03T05:23:44.134373+00:00"
    },
    "deadline": "2026-12-31T23:59:59.000Z"
  }
];

export const getJobById = (id: string): DetailedJob | undefined => {
  return ALL_JOBS.find(j => j.id === id);
};

export const getJobsByCompany = (companyNameOrId: string): DetailedJob[] => {
  const query = companyNameOrId.toLowerCase();
  return ALL_JOBS.filter(
    j => (j.companyId && j.companyId.toLowerCase() === query) ||
         j.companyName.toLowerCase().includes(query)
  );
};

export const getJobsByLevel = (level: string): DetailedJob[] => {
  return ALL_JOBS.filter(j => j.level === level);
};

export const getJobsByProvince = (province: string): DetailedJob[] => {
  const p = province.toLowerCase();
  return ALL_JOBS.filter(j => j.location.toLowerCase().includes(p));
};
