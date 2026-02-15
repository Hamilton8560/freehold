import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.875rem',
      },
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgba(184, 164, 142, 0.05), 0 1px 3px 0 rgba(44, 40, 36, 0.04)',
        warm: '0 2px 4px 0 rgba(184, 164, 142, 0.08), 0 4px 8px 0 rgba(44, 40, 36, 0.04)',
        'warm-md': '0 4px 6px -1px rgba(184, 164, 142, 0.1), 0 6px 12px -2px rgba(44, 40, 36, 0.05)',
        'warm-lg': '0 8px 16px -4px rgba(184, 164, 142, 0.12), 0 12px 24px -6px rgba(44, 40, 36, 0.06)',
        elevated: '0 4px 8px 0 rgba(184, 164, 142, 0.08), 0 8px 16px -4px rgba(44, 40, 36, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
