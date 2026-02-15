export const colors = {
  // Background colors
  background: {
    primary: '#FAF9F6',      // Warm white
    secondary: '#F5F3EF',    // Slightly darker warm white
    tertiary: '#EFECE6',     // Card backgrounds
    elevated: '#FFFFFF',     // Elevated surfaces
  },

  // Sand accent palette
  sand: {
    50: '#F9F7F4',
    100: '#F2EDE6',
    200: '#E5DDD1',
    300: '#D4C8B8',
    400: '#C4B49E',
    500: '#B8A48E',          // Primary sand accent
    600: '#A08A6E',
    700: '#86715A',
    800: '#6B5A48',
    900: '#544737',
  },

  // Text colors
  text: {
    primary: '#2C2824',      // Near-black warm
    secondary: '#5C574F',    // Muted for secondary text
    tertiary: '#8A847A',     // Even more muted
    inverse: '#FAF9F6',      // For dark backgrounds
  },

  // Status colors
  status: {
    pending: {
      background: '#FEF3C7',
      text: '#92400E',
      border: '#FCD34D',
      dot: '#D4B86A',
    },
    approved: {
      background: '#D1FAE5',
      text: '#065F46',
      border: '#6EE7B7',
      dot: '#8DB580',
    },
    paid: {
      background: '#DBEAFE',
      text: '#1E40AF',
      border: '#93C5FD',
      dot: '#60A5FA',
    },
    error: {
      background: '#FEE2E2',
      text: '#991B1B',
      border: '#FCA5A5',
      dot: '#C4796B',
    },
    success: {
      background: '#D1FAE5',
      text: '#065F46',
      border: '#6EE7B7',
      dot: '#8DB580',
    },
    warning: {
      background: '#FEF3C7',
      text: '#92400E',
      border: '#FCD34D',
      dot: '#D4B86A',
    },
  },

  // Semantic colors
  semantic: {
    success: '#8DB580',
    warning: '#D4B86A',
    error: '#C4796B',
    info: '#60A5FA',
  },

  // Border colors
  border: {
    subtle: 'rgba(184, 164, 142, 0.15)',
    default: 'rgba(184, 164, 142, 0.25)',
    strong: 'rgba(184, 164, 142, 0.4)',
  },
} as const

export type Colors = typeof colors
