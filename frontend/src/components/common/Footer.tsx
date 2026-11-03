import React from 'react';
import { ShieldIcon, BrainIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid var(--color-surface-container-high)',
        boxShadow: '0 -1px 6px rgba(0, 0, 0, 0.03)',
        marginTop: 'auto',
        fontSize: '13px',
        color: 'var(--color-on-surface-variant)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '40px 24px 24px 24px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--color-surface-container)'
          }}
        >
          {/* Brand & Mission */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-primary-container)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BrainIcon size={16} color="#ffffff" />
              </div>
              <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>
                CloudTalent<span style={{ color: 'var(--color-primary-container)', fontWeight: '500' }}>.AI</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.55', color: 'var(--color-on-surface-variant)', marginBottom: '16px' }}>
              Nền tảng sàng lọc và đánh giá hồ sơ tuyển dụng thông minh vận hành trên AWS Bedrock và Textract OCR, trao quyền định hướng nghề nghiệp minh bạch và bảo mật cho ứng viên.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-container)',
                color: 'var(--color-primary-container)',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              <ShieldIcon size={14} color="var(--color-primary-container)" />
              <span>Mã hóa bảo vệ PII theo Nghị định 13/2023/NĐ-CP &amp; chuẩn GDPR</span>
            </div>
          </div>

          {/* Candidates Column */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--color-on-surface)',
                marginBottom: '12px'
              }}
            >
              Dành Cho Ứng Viên
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <a href="/" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Khám phá việc làm AI
                </a>
              </li>
              <li>
                <a href="/candidate" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Phân tích độ tương thích
                </a>
              </li>
              <li>
                <a href="#cam-nang-cv-ai" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Hướng dẫn chuẩn ATS Bedrock
                </a>
              </li>
              <li>
                <a href="/candidate" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Chẩn đoán CV tức thì
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--color-on-surface)',
                marginBottom: '12px'
              }}
            >
              Tuân Thủ &amp; Bảo Mật
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <a href="#chinh-sach-bao-mat-pii" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Chính sách bảo mật PII
                </a>
              </li>
              <li>
                <a href="#tieu-chuan-ai" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Nguyên tắc AI Đạo đức &amp; Minh bạch
                </a>
              </li>
              <li>
                <a href="#dieu-khoan-su-dung" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#trung-tam-ho-tro" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
                  Trung tâm hỗ trợ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--color-on-surface-variant)'
          }}
        >
          <p>© 2025 CloudTalent.AI. Được phát triển trên nền tảng AWS Cloud-Native. Toàn bộ bản quyền được bảo lưu.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-container)'
              }}
            />
            <span>Hệ thống máy chủ AWS AP-Southeast-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
