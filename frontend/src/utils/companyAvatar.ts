/**
 * Utility functions for generating deterministic company avatars and branding.
 * Cleanly handles Vietnamese business prefixes and generates cohesive color palettes.
 */

export interface CompanyTheme {
  displayText: string;
  gradient: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
}

const PRESET_BRANDS: Record<string, { displayText?: string; gradient: string; textColor?: string }> = {
  '9pay': {
    displayText: '9PAY',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    textColor: '#ffffff'
  },
  'oqr': {
    displayText: 'OQR',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
    textColor: '#ffffff'
  },
  'joyhub': {
    displayText: 'joyhub',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
    textColor: '#ffffff'
  },
  'vinsoc': {
    displayText: 'VINSOC',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
    textColor: '#ffffff'
  },
  'vinsmart': {
    displayText: 'VIN',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
    textColor: '#ffffff'
  },
  'vingroup': {
    displayText: 'VIN',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
    textColor: '#ffffff'
  },
  'kms': {
    displayText: 'KMS',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    textColor: '#ffffff'
  },
  'fpt': {
    displayText: 'FPT',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #2563eb 100%)',
    textColor: '#ffffff'
  },
  'authentic': {
    displayText: 'AE',
    gradient: 'linear-gradient(135deg, #095744 0%, #059669 100%)',
    textColor: '#ffffff'
  },
  'viettel': {
    displayText: 'VTL',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
    textColor: '#ffffff'
  },
  'vnpt': {
    displayText: 'VNPT',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    textColor: '#ffffff'
  },
  'vng': {
    displayText: 'VNG',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    textColor: '#ffffff'
  },
  'momo': {
    displayText: 'MOMO',
    gradient: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)',
    textColor: '#ffffff'
  },
  'zalopay': {
    displayText: 'ZALO',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
    textColor: '#ffffff'
  },
  'techcombank': {
    displayText: 'TCB',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    textColor: '#ffffff'
  },
  'vietcombank': {
    displayText: 'VCB',
    gradient: 'linear-gradient(135deg, #047857 0%, #15803d 100%)',
    textColor: '#ffffff'
  },
  'mbbank': {
    displayText: 'MB',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
    textColor: '#ffffff'
  }
};

const COLOR_PALETTES = [
  'linear-gradient(135deg, #095744 0%, #059669 100%)', // Brand Emerald
  'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)', // Royal Blue
  'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', // Ocean Cyan
  'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', // Indigo
  'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', // Violet
  'linear-gradient(135deg, #c026d3 0%, #e879f9 100%)', // Fuchsia
  'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)', // Rose
  'linear-gradient(135deg, #ea580c 0%, #f97316 100%)', // Tangerine
  'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', // Amber
  'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)', // Deep Teal
  'linear-gradient(135deg, #15803d 0%, #22c55e 100%)', // Forest Green
  'linear-gradient(135deg, #334155 0%, #64748b 100%)'  // Slate Steel
];

/**
 * Strips formal legal corporate prefixes in Vietnam
 */
export const cleanCompanyName = (rawName?: string): string => {
  if (!rawName) return 'TECH';
  let name = rawName.trim();

  // Strip Vietnamese business prefixes
  const prefixes = [
    /^công\s+ty\s+tnhh\s+mtv/i,
    /^công\s+ty\s+tnhh\s+một\s+thành\s+viên/i,
    /^công\s+ty\s+tnhh/i,
    /^công\s+ty\s+cổ\s+phần/i,
    /^công\s+ty\s+cp/i,
    /^công\s+ty\s+liên\s+doanh/i,
    /^tập\s+đoàn\s+công\s+nghệ/i,
    /^tập\s+đoàn/i,
    /^tổng\s+công\s+ty/i,
    /^ngân\s+hàng\s+tmcp/i,
    /^ngân\s+hàng/i,
    /^doanh\s+nghiệp\s+tư\s+nhân/i,
    /^doanh\s+nghiệp/i,
    /^chi\s+nhánh/i,
    /^ctcp/i,
    /^tnhh/i
  ];

  for (const prefix of prefixes) {
    if (prefix.test(name)) {
      name = name.replace(prefix, '').trim();
      break;
    }
  }

  // Strip common suffixes
  const suffixes = [
    /\s+việt\s+nam$/i,
    /\s+vietnam$/i,
    /\s+vn$/i,
    /\s+jsc$/i,
    /\s+llc$/i,
    /\s+corp$/i,
    /\s+corporation$/i,
    /\s+inc$/i,
    /\s+holdings$/i,
    /\s+group$/i,
    /\s+hub$/i
  ];

  for (const suffix of suffixes) {
    if (suffix.test(name)) {
      name = name.replace(suffix, '').trim();
      break;
    }
  }

  // Remove parenthesis content like "(MBBANK)" if present or extract it
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch && parenMatch[1] && parenMatch[1].length <= 6) {
    return parenMatch[1].trim();
  }
  name = name.replace(/\([^)]+\)/g, '').trim();

  return name || rawName.trim();
};

/**
 * Extracts 2-4 letter brand initials or acronym
 */
export const extractBrandInitials = (companyName?: string): string => {
  const clean = cleanCompanyName(companyName);
  if (!clean) return 'TECH';

  // Check known presets first
  const lower = clean.toLowerCase();
  for (const [key, preset] of Object.entries(PRESET_BRANDS)) {
    if (lower.includes(key) && preset.displayText) {
      return preset.displayText;
    }
  }

  const words = clean.split(/\s+/).filter(Boolean);

  // If single word:
  if (words.length === 1) {
    const single = words[0];
    if (single.length <= 5) return single.toUpperCase();
    return single.slice(0, 3).toUpperCase();
  }

  // If first word is an acronym (<= 4 chars like "9PAY", "KMS", "FPT", "VNG")
  if (words[0].length <= 4 && /^[A-Z0-9]+$/i.test(words[0])) {
    return words[0].toUpperCase();
  }

  // Multi-word: take first letter of each word (up to 3 words)
  if (words.length === 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
};

/**
 * Generates deterministic gradient and styling for a company
 */
export const getCompanyTheme = (companyName?: string): CompanyTheme => {
  const displayText = extractBrandInitials(companyName);
  const clean = cleanCompanyName(companyName).toLowerCase();

  // Check preset brands first
  for (const [key, preset] of Object.entries(PRESET_BRANDS)) {
    if (clean.includes(key)) {
      return {
        displayText: preset.displayText || displayText,
        gradient: preset.gradient,
        textColor: preset.textColor || '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: 'rgba(0, 0, 0, 0.08)'
      };
    }
  }

  // Deterministic DJB2 hash algorithm
  let hash = 5381;
  const nameToHash = (companyName || 'TECH').trim().toLowerCase();
  for (let i = 0; i < nameToHash.length; i++) {
    hash = (hash * 33) ^ nameToHash.charCodeAt(i);
  }

  const index = Math.abs(hash) % COLOR_PALETTES.length;
  const gradient = COLOR_PALETTES[index];

  return {
    displayText,
    gradient,
    textColor: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: 'rgba(0, 0, 0, 0.08)'
  };
};
