import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth-forms.css';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-container">
      <div style={{ marginBottom: '32px' }}>
        <Link to="/" style={{ fontSize: '13px', color: 'var(--accent, #1b6e66)', textDecoration: 'none' }}>
          ← Quay lại Trang chủ việc làm
        </Link>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginTop: '16px', letterSpacing: '-0.02em', color: 'var(--color-primary, #0a483c)' }}>
          Chính Sách Bảo Vệ Dữ Liệu Cá Nhân
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--muted, #636361)', marginTop: '6px' }}>
          Cập nhật ngày 04/11/2026 • Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 &amp; Nghị định 356/2025/NĐ-CP
        </p>
      </div>

      <div style={{ fontSize: '14.5px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            1. Đơn vị kiểm soát dữ liệu cá nhân
          </h2>
          <p>
            Nền tảng <strong>CloudJob</strong> (sau đây gọi là "chúng tôi") là Bên kiểm soát và xử lý dữ liệu cá nhân được thu thập qua website và ứng dụng liên kết.
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>Đơn vị vận hành:</strong> Công ty Cổ phần Nền tảng Nhân tài Số CloudJob</li>
            <li><strong>Địa chỉ:</strong> Tòa nhà Cloud Center, Hà Nội &amp; TP. Hồ Chí Minh</li>
            <li><strong>Email chuyên trách bảo vệ dữ liệu (DPO):</strong> dpo@cloudjob.vn</li>
            <li><strong>Hotline hỗ trợ:</strong> 1900 6868</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            2. Loại dữ liệu thu thập và mục đích xử lý
          </h2>
          <div style={{ overflowX: 'auto', border: '1px solid var(--border, #eaeaea)', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border, #eaeaea)' }}>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Loại dữ liệu</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Thời điểm thu thập</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Mục đích sử dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border, #eaeaea)' }}>
                  <td style={{ padding: '10px 14px' }}>Họ tên, email, số điện thoại, mật khẩu mã hóa</td>
                  <td style={{ padding: '10px 14px' }}>Khi đăng ký tài khoản Ứng viên / Tuyển dụng</td>
                  <td style={{ padding: '10px 14px' }}>Xác thực danh tính, bảo mật tài khoản qua AWS Cognito và gửi thông báo</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border, #eaeaea)' }}>
                  <td style={{ padding: '10px 14px' }}>File CV (kinh nghiệm, kỹ năng, chứng chỉ, học vấn)</td>
                  <td style={{ padding: '10px 14px' }}>Khi nộp đơn ứng tuyển hoặc lưu hồ sơ</td>
                  <td style={{ padding: '10px 14px' }}>Trích xuất thông tin nghề nghiệp và hỗ trợ nhà tuyển dụng thẩm định</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 14px' }}>Hồ sơ doanh nghiệp, MST, thông tin đại diện tuyển dụng</td>
                  <td style={{ padding: '10px 14px' }}>Khi doanh nghiệp đăng ký tuyển dụng</td>
                  <td style={{ padding: '10px 14px' }}>Xác thực tư cách pháp nhân theo Luật Thương mại điện tử số 122/2025/QH15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            3. Xử lý tự động &amp; Minh bạch Trí tuệ nhân tạo (AI)
          </h2>
          <p>
            Hệ thống sử dụng các giải pháp trí tuệ nhân tạo (Amazon Textract OCR và Amazon Bedrock Foundation Models) để hỗ trợ đọc cấu trúc hồ sơ và gợi ý điểm phù hợp với bản mô tả công việc (JD).
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>Khử định danh trước xử lý:</strong> Hệ thống tự động che chắn các thông tin nhân khẩu học nhạy cảm (ảnh đại diện, giới tính, ngày sinh chi tiết) trước khi đưa vào pipeline đánh giá.</li>
            <li><strong>Giám sát bởi con người (Human-in-the-loop):</strong> Điểm số AI Rubric chỉ mang tính chất tham khảo, không có bất kỳ quyết định tuyển dụng hay loại trừ ứng viên nào được thực hiện hoàn toàn tự động mà không có sự đánh giá của chuyên viên tuyển dụng.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            4. Lưu trữ và chuyển dữ liệu xuyên biên giới
          </h2>
          <p>
            Dữ liệu của bạn được lưu trữ trên hạ tầng điện toán đám mây Amazon Web Services (AWS) tại các trung tâm dữ liệu khu vực Châu Á - Thái Bình Dương (Singapore) và Hoa Kỳ, được bảo vệ bằng mã hóa chuẩn AES-256 (AWS KMS) và tường lửa AWS WAF. Chúng tôi thực hiện đầy đủ nghĩa vụ lập hồ sơ đánh giá tác động chuyển dữ liệu ra nước ngoài theo Điều 20 Luật 91/2025/QH15 và Điều 18 Nghị định 356/2025/NĐ-CP.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            5. Quyền của Chủ thể dữ liệu (DSR)
          </h2>
          <p>
            Theo quy định tại Điều 4 Luật 91/2025/QH15 và Điều 5 Nghị định 356/2025/NĐ-CP, bạn có đầy đủ các quyền:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>Quyền được biết &amp; truy cập:</strong> Xem toàn bộ dữ liệu cá nhân đang được lưu trữ trên hệ thống.</li>
            <li><strong>Quyền chỉnh sửa:</strong> Tự cập nhật thông tin qua trang Quản lý hồ sơ cá nhân.</li>
            <li><strong>Quyền rút lại sự đồng ý &amp; yêu cầu xóa:</strong> Yêu cầu hủy bỏ lưu trữ hoặc xóa vĩnh viễn hồ sơ khỏi hệ thống. Yêu cầu sẽ được phản hồi trong vòng <strong>2 ngày làm việc</strong> và thực hiện xóa dữ liệu tối đa trong vòng <strong>20 ngày</strong>.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1f201d' }}>
            6. Cam kết bảo mật
          </h2>
          <p>
            Chúng tôi cam kết tuyệt đối <strong>không mua bán</strong> hoặc chia sẻ dữ liệu cá nhân của người dùng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo thương mại trái phép.
          </p>
        </section>
      </div>
    </div>
  );
};

