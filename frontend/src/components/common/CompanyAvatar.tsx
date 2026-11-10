import React, { useState } from 'react';
import { getCompanyTheme } from '../../utils/companyAvatar';

export interface CompanyAvatarProps {
  name: string;
  logoUrl?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'circle' | 'square';
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP = {
  sm: 36,
  md: 48,
  lg: 64,
  xl: 76
};

export const CompanyAvatar: React.FC<CompanyAvatarProps> = ({
  name,
  logoUrl,
  size = 48,
  shape = 'rounded',
  className = '',
  style = {}
}) => {
  const [imageError, setImageError] = useState(false);

  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size] || 48;
  const theme = getCompanyTheme(name);
  const displayText = theme.displayText;

  // Calculate proportional font size according to number of characters
  let fontSizeRatio = 0.38;
  if (displayText.length >= 6) {
    fontSizeRatio = 0.22;
  } else if (displayText.length >= 4) {
    fontSizeRatio = 0.26;
  } else if (displayText.length === 3) {
    fontSizeRatio = 0.32;
  }
  const fontSize = Math.max(10, Math.round(numericSize * fontSizeRatio));

  let borderRadius = '10px';
  if (shape === 'circle') {
    borderRadius = '50%';
  } else if (shape === 'square') {
    borderRadius = '4px';
  } else {
    // Squircle radius based on size
    borderRadius = numericSize >= 64 ? '14px' : numericSize >= 48 ? '10px' : '8px';
  }

  const containerStyle: React.CSSProperties = {
    width: `${numericSize}px`,
    height: `${numericSize}px`,
    minWidth: `${numericSize}px`,
    minHeight: `${numericSize}px`,
    borderRadius,
    background: theme.gradient,
    color: theme.textColor,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: `${fontSize}px`,
    letterSpacing: displayText.length >= 4 ? '-0.5px' : '-0.2px',
    userSelect: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    ...style
  };

  if (logoUrl && !imageError) {
    return (
      <div className={`company-avatar ${className}`} style={containerStyle} aria-label={name}>
        <img
          src={logoUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`company-avatar ${className}`}
      style={containerStyle}
      role="img"
      aria-label={name}
      title={name}
    >
      <span style={{ lineHeight: 1, textTransform: displayText === 'joyhub' ? 'none' : 'uppercase' }}>
        {displayText}
      </span>
    </div>
  );
};
