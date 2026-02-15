export { colors, type Colors } from './colors'
export { typography, type Typography } from './typography'
export { spacing, radii, radiiPx, type Spacing, type Radii, type RadiiPx } from './spacing'
export { shadows, type Shadows } from './shadows'
export { animations, type Animations } from './animations'

// Tailwind plugin helper
export const tailwindPreset = {
  colors: {
    background: {
      primary: '#FAF9F6',
      secondary: '#F5F3EF',
      tertiary: '#EFECE6',
      elevated: '#FFFFFF',
    },
    sand: {
      50: '#F9F7F4',
      100: '#F2EDE6',
      200: '#E5DDD1',
      300: '#D4C8B8',
      400: '#C4B49E',
      500: '#B8A48E',
      600: '#A08A6E',
      700: '#86715A',
      800: '#6B5A48',
      900: '#544737',
    },
    text: {
      primary: '#2C2824',
      secondary: '#5C574F',
      tertiary: '#8A847A',
      inverse: '#FAF9F6',
    },
    status: {
      pending: '#FEF3C7',
      approved: '#D1FAE5',
      paid: '#DBEAFE',
      error: '#FEE2E2',
    },
  },
  fontFamily: {
    heading: ['"DM Serif Display"', 'Georgia', 'serif'],
    body: ['"DM Sans"', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
  },
  borderRadius: {
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.625rem',
    lg: '0.875rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
}
