// 8px base unit system
export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px (base unit)
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px (2 units)
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px (3 units)
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px (4 units)
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px (5 units)
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px (6 units)
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px (8 units)
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const

export const radii = {
  none: '0',
  sm: '0.5rem',     // 8px (buttons, sidebar items)
  default: '0.5rem', // 8px (buttons)
  md: '0.625rem',   // 10px (inner cards, inputs, icon containers)
  lg: '0.875rem',   // 14px (outer cards, feature cards)
  xl: '1rem',       // 16px (dashboard wrapper)
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // Pills, badges, avatars
} as const

// Pixel values for CSS-in-JS
export const radiiPx = {
  none: 0,
  sm: 8,
  default: 8,
  md: 10,
  lg: 14,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

export type Spacing = typeof spacing
export type Radii = typeof radii
export type RadiiPx = typeof radiiPx
