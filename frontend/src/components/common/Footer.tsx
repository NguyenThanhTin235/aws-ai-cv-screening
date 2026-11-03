import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid var(--color-outline-variant)',
        marginTop: 'auto',
        padding: '28px 24px',
        fontSize: '13px',
        color: 'var(--color-outline)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div>
          <p style={{ fontWeight: '600', color: 'var(--color-on-surface)' }}>
            AI CV Screening Portal &copy; 2026
          </p>
          <p style={{ fontSize: '12px', marginTop: '2px' }}>
            Kiến trúc AWS Pure Serverless v12.0 • Amazon Bedrock Claude Haiku &amp; Textract OCR
          </p>
        </div>

        {/* Compliance Mini Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container-low)',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              border: '1px solid var(--color-outline-variant)'
            }}
          >
            ISO/IEC 27001
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container-low)',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              border: '1px solid var(--color-outline-variant)'
            }}
          >
            GDPR Compliant
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container-low)',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              border: '1px solid var(--color-outline-variant)'
            }}
          >
            Nghị định 13/2023/NĐ-CP
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container-low)',
              fontSize: '11px',
              fontWeight: '500',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-outline-variant)'
            }}
          >
            ⚡ Pure Serverless ($0.00 Network Cost)
          </span>
        </div>
      </div>
    </footer>
  );
};

