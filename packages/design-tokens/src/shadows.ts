// Warm-tinted dual-layer shadows
export const shadows = {
  none: 'none',

  sm: `
    0 1px 2px 0 rgba(184, 164, 142, 0.05),
    0 1px 3px 0 rgba(44, 40, 36, 0.04)
  `.trim().replace(/\s+/g, ' '),

  default: `
    0 2px 4px 0 rgba(184, 164, 142, 0.08),
    0 4px 8px 0 rgba(44, 40, 36, 0.04)
  `.trim().replace(/\s+/g, ' '),

  md: `
    0 4px 6px -1px rgba(184, 164, 142, 0.1),
    0 6px 12px -2px rgba(44, 40, 36, 0.05)
  `.trim().replace(/\s+/g, ' '),

  lg: `
    0 8px 16px -4px rgba(184, 164, 142, 0.12),
    0 12px 24px -6px rgba(44, 40, 36, 0.06)
  `.trim().replace(/\s+/g, ' '),

  xl: `
    0 16px 32px -8px rgba(184, 164, 142, 0.15),
    0 24px 48px -12px rgba(44, 40, 36, 0.08)
  `.trim().replace(/\s+/g, ' '),

  // Elevated card shadow
  elevated: `
    0 4px 8px 0 rgba(184, 164, 142, 0.08),
    0 8px 16px -4px rgba(44, 40, 36, 0.06)
  `.trim().replace(/\s+/g, ' '),

  // Hover state shadow
  hover: '0 2px 8px rgba(26,26,26,0.06), 0 8px 24px rgba(26,26,26,0.05)',

  // Button shadow
  button: '0 2px 8px rgba(26,26,26,0.12)',

  // Card wrapper shadow
  card: '0 4px 24px rgba(26,26,26,0.04), 0 12px 48px rgba(26,26,26,0.03)',

  // Inner shadow for inputs
  inner: 'inset 0 1px 2px 0 rgba(184, 164, 142, 0.06)',
} as const

export type Shadows = typeof shadows
