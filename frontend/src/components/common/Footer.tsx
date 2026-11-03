import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, BrainIcon } from './Icons';
import '../../styles/footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          {/* Cột 1: Thương hiệu CloudJob & Sứ mệnh AI */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary-container)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <BrainIcon size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                Cloud<span style={{ color: 'var(--color-primary-container)', fontWeight: '600' }}>Job</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-on-surface-variant)', marginBottom: '16px' }}>
              Nền tảng tuyển dụng và sàng lọc hồ sơ nhân tài Cloud &amp; DevOps thông minh. Vận hành trên AWS Bedrock và Textract OCR, mang đến giải pháp đánh giá minh bạch, chuẩn xác và bảo mật.
            </p>

            <div className="site-footer-pii-badge">
              <ShieldIcon size={14} color="var(--color-primary-container)" />
              <span>Bảo vệ PII theo Nghị định 13/2023/NĐ-CP &amp; GDPR</span>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--color-outline)', margin: 0, lineHeight: 1.4 }}>
              Hạ tầng 100% AWS Serverless &amp; Data Center Singapore (ap-southeast-1).
            </p>
          </div>

          {/* Cột 2: Dành cho Ứng viên */}
          <div>
            <h4 className="site-footer-col-title">Dành Cho Ứng Viên</h4>
            <ul className="site-footer-nav-list">
              <li>
                <Link to="/" className="site-footer-link">
                  Việc làm Cloud &amp; DevOps
                </Link>
              </li>
              <li>
                <Link to="/candidate" className="site-footer-link">
                  Phân tích &amp; Chẩn đoán CV tức thì
                </Link>
              </li>
              <li>
                <a href="#cam-nang-cv" className="site-footer-link">
                  Hướng dẫn chuẩn ATS Bedrock
                </a>
              </li>
              <li>
                <a href="#khao-sat-luong" className="site-footer-link">
                  Báo cáo mức lương Cloud 2026
                </a>
              </li>
              <li>
                <a href="#cam-nang-aws" className="site-footer-link">
                  Cẩm nang phỏng vấn AWS Certified
                </a>
              </li>
              <li>
                <Link to="/candidate" className="site-footer-link">
                  Quản lý hồ sơ ứng tuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Dành cho Doanh nghiệp */}
          <div>
            <h4 className="site-footer-col-title">Dành Cho Doanh Nghiệp</h4>
            <ul className="site-footer-nav-list">
              <li>
                <Link to="/tuyen-dung" className="site-footer-link">
                  Đăng tin tuyển dụng Cloud
                </Link>
              </li>
              <li>
                <Link to="/register?role=recruiter" className="site-footer-link">
                  Đăng ký tài khoản Nhà tuyển dụng
                </Link>
              </li>
              <li>
                <Link to="/tuyen-dung" className="site-footer-link">
                  Sàng lọc hồ sơ tự động bằng AI Bedrock
                </Link>
              </li>
              <li>
                <a href="#danh-gia-ky-thuat" className="site-footer-link">
                  Đánh giá kỹ năng thực chiến
                </a>
              </li>
              <li>
                <a href="#bao-cao-it" className="site-footer-link">
                  Báo cáo xu hướng thị trường IT
                </a>
              </li>
              <li>
                <a href="#lien-he-dn" className="site-footer-link">
                  Liên hệ tư vấn giải pháp tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Tuân Thủ & Liên Hệ */}
          <div>
            <h4 className="site-footer-col-title">Tuân Thủ &amp; Liên Hệ</h4>
            <ul className="site-footer-nav-list">
              <li className="site-footer-info-item">
                <strong style={{ color: 'var(--color-on-surface)' }}>Hotline:</strong> 1900 6868 (8:30 - 18:00)
              </li>
              <li className="site-footer-info-item">
                <strong style={{ color: 'var(--color-on-surface)' }}>Email:</strong> support@cloudjob.vn
              </li>
              <li className="site-footer-info-item" style={{ marginBottom: '4px' }}>
                <strong style={{ color: 'var(--color-on-surface)' }}>Văn phòng:</strong> Tòa nhà Cloud Center, Hà Nội &amp; TP. HCM
              </li>
              <li style={{ paddingTop: '4px', borderTop: '1px solid var(--color-surface-container)' }}>
                <a href="#chinh-sach-bao-mat-pii" className="site-footer-link">
                  Chính sách bảo mật dữ liệu PII
                </a>
              </li>
              <li>
                <a href="#tieu-chuan-ai" className="site-footer-link">
                  Nguyên tắc AI Đạo đức &amp; Minh bạch
                </a>
              </li>
              <li>
                <a href="#dieu-khoan-su-dung" className="site-footer-link">
                  Điều khoản sử dụng dịch vụ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="site-footer-bottom">
          <p style={{ margin: 0 }}>
            © 2026 CloudJob. Nền tảng tuyển dụng Cloud-Native trên AWS. Toàn bộ bản quyền được bảo lưu.
          </p>

          <div className="site-footer-status-group">
            <div className="site-footer-status-pill">
              <span className="site-footer-status-dot" />
              <span>Hệ thống máy chủ AWS AP-Southeast-1</span>
            </div>

            <div className="site-footer-status-pill">
              <span>Mã hóa AWS KMS &amp; TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
