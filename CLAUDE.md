# Freehold Monorepo

## Structure

pnpm + Turborepo monorepo. All packages scoped under `@freehold` (npm org owned by `hamilton8560`).

```
apps/
  landing/          # Private Next.js 15 app (React 19) — not published
packages/
  ai/               # @freehold/ai — tool system, hooks, server helpers (Vercel AI SDK)
  bot/              # @freehold/bot — multi-platform chatbot adapters (Telegram, Discord, Slack, WhatsApp)
  design-tokens/    # @freehold/design-tokens — CSS variables and theme tokens
  payments/         # @freehold/payments — branded checkout UI for Stripe
  ui/               # @freehold/ui — component library (Radix UI, Tailwind, CVA)
```

All packages are at **v0.0.1** and published publicly to npm.

## Getting Started

```sh
pnpm install        # install all deps (requires Node >=20, pnpm 9.15)
pnpm build          # build packages in dependency order
pnpm dev            # start all packages + landing app (http://localhost:3000)
```

No `.env` files are required. AI provider API keys are entered in the landing app UI at runtime.

## Commands

| Command | Scope | Description |
|---------|-------|-------------|
| `pnpm dev` | root | Run all packages/apps in dev mode (turbo) |
| `pnpm build` | root | Build everything (turbo, respects dependency order) |
| `pnpm lint` | root | Lint all packages |
| `pnpm clean` | root | Clean dist/.next output |
| `pnpm publish-packages` | root | Build then publish all public packages to npm |
| `pnpm storybook` | packages/ui | Storybook on port 6006 |

Individual packages use `tsup` for builds (`tsup` / `tsup --watch`).

## Package Details

### @freehold/ui
- Radix UI primitives (Dialog, Popover, Select, Slider, Toast, RadioGroup)
- Styled with Tailwind CSS + CVA (`class-variance-authority`) + `clsx` + `tailwind-merge`
- Exports `@freehold/ui/styles.css` for consumers
- Post-build script adds `"use client"` directive
- Optional peer deps: `@dnd-kit/*`, `@tiptap/*`, `recharts`
- Has Storybook

### @freehold/ai
- Built on Vercel AI SDK (`ai` package)
- Exports: `.` (main), `./client`, `./server`
- Peer deps for provider choice: `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google`, `@ai-sdk/deepseek`, `ollama-ai-provider`

### @freehold/bot
- Depends on `@freehold/ai` (workspace link)
- Exports: `.`, `./telegram`, `./discord`, `./slack`, `./whatsapp`
- Platform peer deps: `grammy`, `discord.js`, `@slack/bolt`

### @freehold/payments
- Depends on `@freehold/design-tokens` (workspace link)
- Stripe checkout UI components (CVA + Tailwind)
- Exports: `.`, `./stripe`
- Peer deps: `@stripe/stripe-js`, `@stripe/react-stripe-js`

### @freehold/design-tokens
- Zero runtime deps — pure token definitions
- Build generates CSS (`tokens.css`) via `scripts/generate-css.mjs`
- Exports: `.`, `./css`

## Apps

### landing (private)
- Next.js 15 / React 19
- Consumes `@freehold/ai`, `@freehold/ui`, `@freehold/payments` via workspace links
- Includes TipTap rich text editor, recharts, Radix Toast
- Multi-provider AI (Anthropic, OpenAI, Google, DeepSeek, Ollama)

## Starter Kit / External Consumers

The freehold starter kit installs `@freehold/ui` **from npm** (not a workspace link). It is a separate repo, not part of this monorepo.

## Conventions

- **Styling:** Tailwind CSS everywhere; CVA for component variants; `cn()` helper using `clsx` + `tailwind-merge`
- **Build:** tsup for all packages; Next.js for apps
- **TypeScript:** Strict mode, `ES2022` target, `bundler` module resolution (see `tsconfig.base.json`)
- **Node:** >=20
- **Package manager:** pnpm 9.15
