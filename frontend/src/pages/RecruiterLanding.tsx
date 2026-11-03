import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/recruiter-landing.css';
import {
  BrainIcon,
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  BuildingIcon,
  DocumentScannerIcon,
  TrendingUpIcon,
  LockIcon
} from '../components/common/Icons';

export const RecruiterLanding: React.FC = () => {
  return (
    <div className="rl-page">
      {/* 1. HERO SECTION WITH EMBEDDED CTA CARD */}
      <section className="rl-hero">
        <div className="rl-container">
          <div className="rl-hero-grid">
            {/* Left Content */}
            <div>
              <div className="rl-hero-badge">
                <SparklesIcon size={14} color="#acf1d7" />
                <span>NỀN TẢNG TUYỂN DỤNG &amp; SÀNG LỌC CV CLOUD/DEVOPS SỐ 1</span>
              </div>

              <h1 className="rl-hero-title">
                Tuyển dụng thông minh, Tiếp cận{' '}
                <span className="rl-hero-title-highlight">10,000+ Kỹ sư Cloud</span> &amp; DevOps
              </h1>

              <p className="rl-hero-desc">
                Rút ngắn 75% thời gian sàng lọc hồ sơ với công nghệ Generative AI AWS Bedrock Claude 3.5 Sonnet và
                Textract OCR. Báo cáo chấm điểm Rubric 100đ khách quan, loại bỏ thiên vị theo chuẩn Nghị định 13/2023/NĐ-CP.
              </p>

              <div className="rl-hero-metrics">
                <div>
                  <div className="rl-metric-num">75%</div>
                  <div className="rl-metric-label">Tiết kiệm thời gian sàng lọc sơ tuyển</div>
                </div>
                <div>
                  <div className="rl-metric-num">10.000+</div>
                  <div className="rl-metric-label">Kỹ sư AWS, Cloud &amp; DevOps sẵn sàng</div>
                </div>
                <div>
                  <div className="rl-metric-num">100đ</div>
                  <div className="rl-metric-label">Ma trận Rubric AI đánh giá minh bạch</div>
                </div>
              </div>
            </div>

            {/* Right Employer Registration CTA Card */}
            <div>
              <div className="rl-cta-card">
                <div className="rl-cta-card-header">
                  <span className="rl-cta-badge">DÀNH CHO DOANH NGHIỆP</span>
                  <h2 className="rl-cta-title">Đăng ký tài khoản Tuyển dụng</h2>
                  <p className="rl-cta-subtitle">
                    Tạo tài khoản Nhà tuyển dụng trong 1 phút để bắt đầu tiếp cận nhân tài công nghệ.
                  </p>
                </div>

                <ul className="rl-cta-benefits">
                  <li className="rl-cta-benefit-item">
                    <span className="rl-benefit-check">
                      <CheckIcon size={12} color="#095744" />
                    </span>
                    <span>Tặng ngay <strong>3 tin đăng tiêu chuẩn</strong> kích hoạt tức thì.</span>
                  </li>
                  <li className="rl-cta-benefit-item">
                    <span className="rl-benefit-check">
                      <CheckIcon size={12} color="#095744" />
                    </span>
                    <span><strong>50 lượt sàng lọc CV tự động</strong> bằng AWS Bedrock Claude 3.5.</span>
                  </li>
                  <li className="rl-cta-benefit-item">
                    <span className="rl-benefit-check">
                      <CheckIcon size={12} color="#095744" />
                    </span>
                    <span>Ẩn danh hóa PII, tuân thủ <strong>Nghị định 13/2023/NĐ-CP</strong> &amp; GDPR.</span>
                  </li>
                  <li className="rl-cta-benefit-item">
                    <span className="rl-benefit-check">
                      <CheckIcon size={12} color="#095744" />
                    </span>
                    <span>Báo cáo xếp hạng ứng viên chi tiết theo thang điểm kỹ năng.</span>
                  </li>
                </ul>

                <Link to="/register-recruiter" className="rl-cta-register-btn">
                  <span>ĐĂNG KÝ TÀI KHOẢN TUYỂN DỤNG</span>
                  <ArrowRightIcon size={16} />
                </Link>

                <div className="rl-cta-login-row">
                  Đã có tài khoản Doanh nghiệp?{' '}
                  <Link to="/login" className="rl-cta-login-link">
                    Đăng nhập ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SOLUTIONS & FEATURES */}
      <section className="rl-section">
        <div className="rl-container">
          <div className="rl-section-header">
            <div className="rl-section-tag">GIẢI PHÁP ĐỘT PHÁ</div>
            <h2 className="rl-section-title">Tại sao Doanh nghiệp chọn CloudJob?</h2>
            <p className="rl-section-desc">
              Hệ thống kết hợp sức mạnh mô hình nền tảng Generative AI của AWS với cơ sở dữ liệu chuyên biệt về hạ tầng
              Cloud và kỹ thuật phần mềm.
            </p>
          </div>

          <div className="rl-features-grid">
            {/* Feature 1 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <BrainIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">AI Rubric 100đ Chuẩn Xác</h3>
              <p className="rl-feature-text">
                Đối chiếu tiêu chí ma trận đánh giá tự động dựa trên Claude 3.5 Sonnet, xếp hạng ứng viên chuẩn xác từng
                kỹ năng: AWS Solutions, Terraform, Docker, Kubernetes, CI/CD.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <DocumentScannerIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">Trích Xuất OCR Đa Định Dạng</h3>
              <p className="rl-feature-text">
                Tự động quét và đọc hiểu cấu trúc hồ sơ định dạng PDF, DOCX, ảnh chụp qua Amazon Textract OCR, không bỏ sót
                kinh nghiệm và chứng chỉ quốc tế.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <ShieldIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">Khử Định Kiến &amp; Bảo Vệ PII</h3>
              <p className="rl-feature-text">
                Tự động ẩn danh các thông tin nhân khẩu học (giới tính, độ tuổi, hình ảnh) trước khi chấm điểm, đảm bảo quy
                trình tuyển dụng hoàn toàn công bằng và minh bạch.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <TrendingUpIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">Tiếp Cận Nhân Tài Đúng Mục Tiêu</h3>
              <p className="rl-feature-text">
                Mạng lưới hơn 10.000 hồ sơ kỹ sư Cloud, DevOps, Site Reliability Engineer (SRE) và Fullstack có chứng chỉ AWS
                Certified đang chủ động tìm kiếm cơ hội.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <LockIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">Bảo Mật Chuẩn Doanh Nghiệp</h3>
              <p className="rl-feature-text">
                Mã hóa toàn bộ dữ liệu ứng viên bằng AWS KMS Envelope Encryption và tuân thủ chặt chẽ Nghị định 13/2023/NĐ-CP
                về bảo vệ dữ liệu cá nhân tại Việt Nam.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rl-feature-card">
              <div className="rl-feature-icon-wrapper">
                <BuildingIcon size={22} color="#095744" />
              </div>
              <h3 className="rl-feature-title">Quản Lý Tuyển Dụng Tập Trung</h3>
              <p className="rl-feature-text">
                Giao diện quản lý quy trình trực quan từ tiếp nhận hồ sơ, đánh giá AI, mời phỏng vấn đến gửi offer, tích hợp
                phân quyền nhiều thành viên nhóm nhân sự.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW STEPS */}
      <section className="rl-workflow-section">
        <div className="rl-container">
          <div className="rl-section-header">
            <div className="rl-section-tag">QUY TRÌNH TINH GỌN</div>
            <h2 className="rl-section-title">3 bước tuyển dụng tinh gọn cùng AI</h2>
            <p className="rl-section-desc">
              Bắt đầu quy trình sàng lọc hồ sơ tự động hóa và tuyển chọn ứng viên phù hợp nhất chỉ trong vài phút.
            </p>
          </div>

          <div className="rl-steps-grid">
            <div className="rl-step-card">
              <span className="rl-step-number">1</span>
              <h3 className="rl-step-title">Tạo tài khoản Tuyển dụng</h3>
              <p className="rl-step-desc">
                Đăng ký tài khoản doanh nghiệp miễn phí, cập nhật hồ sơ công ty và nhận ngay 3 tin đăng tuyển dụng tiêu chuẩn.
              </p>
            </div>

            <div className="rl-step-card">
              <span className="rl-step-number">2</span>
              <h3 className="rl-step-title">Đăng tin &amp; Cấu hình AI Rubric</h3>
              <p className="rl-step-desc">
                Nhập bản mô tả công việc (JD), hệ thống tự động sinh ma trận tiêu chí đánh giá năng lực tương ứng.
              </p>
            </div>

            <div className="rl-step-card">
              <span className="rl-step-number">3</span>
              <h3 className="rl-step-title">Xem kết quả sàng lọc tức thì</h3>
              <p className="rl-step-desc">
                AI Bedrock tự động chấm điểm và xếp hạng hồ sơ ứng tuyển theo độ tương thích, giúp bạn ra quyết định phỏng vấn nhanh gấp 4 lần.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA BANNER */}
      <section className="rl-bottom-banner">
        <div className="rl-container">
          <h2 className="rl-bottom-title">
            Sẵn sàng cách mạng hóa quy trình tuyển dụng của doanh nghiệp bạn?
          </h2>
          <p className="rl-bottom-subtitle">
            Hàng trăm doanh nghiệp công nghệ hàng đầu đã tin tưởng áp dụng giải pháp sàng lọc AI của CloudJob.
          </p>

          <div className="rl-bottom-btns">
            <Link to="/register?role=recruiter" className="rl-btn-primary">
              <BuildingIcon size={18} color="#00271d" />
              <span>Đăng ký tài khoản Tuyển dụng ngay</span>
            </Link>
            <Link to="/login" className="rl-btn-outline">
              <span>Đăng nhập Doanh nghiệp</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruiterLanding;

