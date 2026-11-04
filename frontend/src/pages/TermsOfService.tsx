import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth-forms.css';

export const TermsOfService: React.FC = () => {
  return (
    <div className="legal-container">
      <div style={{ marginBottom: '32px' }}>
        <Link to="/" style={{ fontSize: '13px', color: 'var(--accent, #1b6e66)', textDecoration: 'none' }}>
          ← Quay lại Trang chủ việc làm
        </Link>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginTop: '16px', letterSpacing: '-0.02em', color: 'var(--color-primary, #0a483c)' }}>
          Điều Khoản Sử Dụng Dịch Vụ
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--muted, #636361)', marginTop: '6px' }}>
          Cập nhật ngày 04/11/2026 • Tuân thủ Luật Thương mại điện tử 122/2025/QH15 &amp; Luật Giao dịch điện tử 20/2023/QH15
        </p>
      </div>

      <div style={{ fontSize: '14.5px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            1. Phạm vi áp dụng &amp; Chấp thuận điều khoản
          </h2>
          <p>
            Chào mừng bạn đến với <strong>CloudJob</strong>. Bằng việc tạo tài khoản, nộp hồ sơ ứng tuyển hoặc đăng tin tuyển dụng trên nền tảng, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản được quy định dưới đây.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            2. Trách nhiệm của Ứng viên (Người tìm việc)
          </h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Cung cấp thông tin trung thực, chính xác về trình độ học vấn, kinh nghiệm làm việc và các chứng chỉ nghề nghiệp.</li>
            <li>Chịu trách nhiệm bảo mật thông tin tài khoản đăng nhập (mật khẩu, mã OTP xác thực).</li>
            <li>Không tải lên các tệp tin chứa mã độc, nội dung vi phạm bản quyền hoặc pháp luật Việt Nam.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            3. Trách nhiệm của Doanh nghiệp (Nhà tuyển dụng)
          </h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Cam kết là đại diện tuyển dụng hợp pháp của doanh nghiệp đã đăng ký kinh doanh.</li>
            <li>Không đăng tải tin tuyển dụng sai sự thật, lừa đảo, thu phí bất hợp pháp của ứng viên hoặc có tính chất phân biệt đối xử.</li>
            <li>Sử dụng thông tin hồ sơ của ứng viên đúng mục đích tuyển dụng theo cam kết bảo mật.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            4. Cơ chế giải quyết phản ánh và tranh chấp
          </h2>
          <p>
            CloudJob duy trì kênh tiếp nhận và xử lý phản ánh trực tuyến qua email <a href="mailto:support@cloudjob.vn">support@cloudjob.vn</a>. Mọi khiếu nại phát sinh trong quá trình sử dụng dịch vụ sẽ được giải quyết trên tinh thần thiện chí và phù hợp với quy định pháp luật Việt Nam hiện hành.
          </p>
        </section>
      </div>
    </div>
  );
};

