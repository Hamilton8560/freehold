import type { Appearance } from '@stripe/stripe-js'

/**
 * Freehold-branded Stripe Appearance API configuration.
 * Maps Freehold design tokens to Stripe's theming system.
 */
export const freeholdStripeAppearance: Appearance = {
  theme: 'flat',

  variables: {
    colorPrimary: '#B8A48E',
    colorBackground: '#FFFFFF',
    colorText: '#2C2824',
    colorTextSecondary: '#5C574F',
    colorTextPlaceholder: '#8A847A',
    colorDanger: '#C4796B',
    colorSuccess: '#8DB580',

    fontFamily: '"DM Sans", system-ui, sans-serif',
    fontSizeBase: '16px',
    fontSizeSm: '14px',
    fontSizeLg: '18px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
    fontLineHeight: '1.5',

    spacingUnit: '8px',
    spacingGridRow: '16px',
    spacingGridColumn: '16px',

    borderRadius: '10px',
    colorIconCardError: '#C4796B',

    focusBoxShadow: '0 0 0 2px rgba(184, 164, 142, 0.3)',
    focusOutline: 'none',
  },

  rules: {
    '.Label': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#2C2824',
      marginBottom: '6px',
    },
    '.Input': {
      border: '1px solid rgba(184, 164, 142, 0.25)',
      borderRadius: '10px',
      boxShadow: 'inset 0 1px 2px 0 rgba(184, 164, 142, 0.06)',
      padding: '10px 12px',
      fontSize: '14px',
      transition: 'border-color 200ms ease, box-shadow 200ms ease',
    },
    '.Input:focus': {
      borderColor: '#B8A48E',
      boxShadow: '0 0 0 2px rgba(184, 164, 142, 0.2)',
    },
    '.Input--invalid': {
      borderColor: '#C4796B',
      boxShadow: '0 0 0 2px rgba(196, 121, 107, 0.2)',
    },
    '.Tab': {
      border: '1px solid rgba(184, 164, 142, 0.25)',
      borderRadius: '10px',
      backgroundColor: '#FAF9F6',
      color: '#5C574F',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 200ms ease',
    },
    '.Tab:hover': {
      backgroundColor: '#F5F3EF',
      color: '#2C2824',
    },
    '.Tab--selected': {
      backgroundColor: '#FFFFFF',
      borderColor: '#B8A48E',
      color: '#2C2824',
      boxShadow:
        '0 2px 4px 0 rgba(184, 164, 142, 0.08), 0 4px 8px 0 rgba(44, 40, 36, 0.04)',
    },
    '.TabIcon--selected': {
      fill: '#2C2824',
    },
    '.Error': {
      color: '#991B1B',
      fontSize: '14px',
      marginTop: '6px',
    },
    '.Block': {
      borderRadius: '10px',
      border: '1px solid rgba(184, 164, 142, 0.15)',
      backgroundColor: '#FAF9F6',
    },
  },
}
