# @freehold/design-tokens

Design tokens for the Freehold design system. Available as TypeScript/JavaScript objects or CSS custom properties.

## Installation

```bash
pnpm add @freehold/design-tokens
# or
npm install @freehold/design-tokens
```

## Usage

### CSS Custom Properties

Import the CSS file to get all tokens as `--fh-*` custom properties on `:root`:

```css
@import '@freehold/design-tokens/css';
```

Then use them in your styles:

```css
.card {
  background: var(--fh-color-background-elevated);
  color: var(--fh-color-text-primary);
  border-radius: var(--fh-radius-lg);
  box-shadow: var(--fh-shadow-default);
  padding: var(--fh-spacing-4);
}
```

### JavaScript / TypeScript

Import individual token groups:

```ts
import { colors, typography, spacing, shadows, radii, animations } from '@freehold/design-tokens'

// Use directly
const bg = colors.background.primary  // '#FAF9F6'
const font = typography.fonts.heading  // '"DM Serif Display", Georgia, serif'
```

### Tailwind CSS Preset

The package exports a `tailwindPreset` for extending your Tailwind config:

```ts
// tailwind.config.ts
import { tailwindPreset } from '@freehold/design-tokens'

export default {
  theme: {
    extend: {
      colors: tailwindPreset.colors,
      fontFamily: tailwindPreset.fontFamily,
      borderRadius: tailwindPreset.borderRadius,
    },
  },
}
```

## Token Reference

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `background.primary` | `#FAF9F6` | Page background |
| `background.secondary` | `#F5F3EF` | Section backgrounds |
| `background.elevated` | `#FFFFFF` | Elevated surfaces |
| `text.primary` | `#2C2824` | Primary text |
| `text.secondary` | `#5C574F` | Secondary text |
| `text.tertiary` | `#8A847A` | Muted text |
| `sand.500` | `#B8A48E` | Primary accent |
| `sand.600` | `#A08A6E` | Accent hover |

Full sand palette: 50-900.

### Status Colors

Each status has `background`, `text`, `border`, and `dot` values:

- `pending` — amber tones
- `approved` / `success` — green tones
- `paid` — blue tones
- `error` — red tones
- `warning` — amber tones

### Typography

| Token | Value |
|-------|-------|
| `fonts.heading` | DM Serif Display, Georgia, serif |
| `fonts.body` | DM Sans, system-ui, sans-serif |
| `fonts.mono` | JetBrains Mono, Consolas, monospace |

Font sizes: `xs` (12px) through `5xl` (48px).

### Spacing

8px grid system: `0.5` (2px), `1` (4px), `2` (8px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px), `24` (96px), `32` (128px).

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 8px | Buttons, sidebar items |
| `md` | 10px | Inputs, inner cards |
| `lg` | 14px | Outer cards |
| `xl` | 16px | Dashboard wrappers |
| `full` | 9999px | Pills, badges |

### Shadows

Warm-tinted dual-layer shadows: `sm`, `default`, `md`, `lg`, `xl`, `elevated`, `hover`, `button`, `card`, `inner`.

### Animations

- **Durations**: `fast` (150ms), `default` (200ms), `slow` (350ms), `slower` (500ms)
- **Easings**: `default`, `in`, `out`, `inOut`, `bounce`
- **Transitions**: Pre-composed `duration + easing` strings

## License

MIT
