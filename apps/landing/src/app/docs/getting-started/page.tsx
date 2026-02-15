'use client'

import Link from 'next/link'
import { Icon, Badge, CodeCanvas, Card, CardContent, Button } from '@freehold/ui'

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-primary/95 backdrop-blur-sm border-b border-[rgba(184,164,142,0.15)]">
        <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="chevron-left" size="sm" color="inherit" />
              <span className="text-sm">Docs</span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-sm font-medium text-text-primary">Getting Started</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1080px] mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <Badge variant="accent" className="mb-3">Installation Guide</Badge>
          <h1 className="font-heading text-3xl text-text-primary mb-3">Getting Started</h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Get up and running with @freehold/ui in your React project. This guide covers installation,
            configuration, and your first component.
          </p>
        </div>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">Requirements</h2>
          <Card variant="outlined" padding="md" className="bg-white">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Required</h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <Icon name="check" size="sm" color="success" />
                      React 18.0+ or React 19.0+
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check" size="sm" color="success" />
                      Tailwind CSS 3.4+
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check" size="sm" color="success" />
                      TypeScript 5.0+ (recommended)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-2">Recommended</h3>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <Icon name="check" size="sm" color="muted" />
                      Next.js 14+ (App Router)
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check" size="sm" color="muted" />
                      Node.js 18+
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">1. Installation</h2>
          <p className="text-text-secondary mb-4">
            Install the package using your preferred package manager:
          </p>
          <div className="space-y-3">
            <CodeCanvas
              code="npm install @freehold/ui"
              title="npm"
              showLineNumbers={false}
            />
            <CodeCanvas
              code="pnpm add @freehold/ui"
              title="pnpm"
              showLineNumbers={false}
            />
            <CodeCanvas
              code="yarn add @freehold/ui"
              title="yarn"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Optional Dependencies */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">2. Optional Dependencies</h2>
          <p className="text-text-secondary mb-4">
            Some components require additional peer dependencies. Install only what you need:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                <Badge variant="default" size="sm">Charts</Badge>
                BarChart, LineChart, PieChart
              </h3>
              <CodeCanvas
                code="npm install recharts"
                showLineNumbers={false}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                <Badge variant="default" size="sm">Rich Text</Badge>
                RichTextEditor
              </h3>
              <CodeCanvas
                code="npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder"
                showLineNumbers={false}
              />
            </div>
          </div>
        </section>

        {/* Tailwind Configuration */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">3. Tailwind CSS Configuration</h2>
          <p className="text-text-secondary mb-4">
            Add the Freehold theme to your <code className="text-sm bg-background-secondary px-1.5 py-0.5 rounded">tailwind.config.ts</code>:
          </p>
          <CodeCanvas
            code={`import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include @freehold/ui components
    './node_modules/@freehold/ui/dist/**/*.{js,mjs}',
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

export default config`}
            title="tailwind.config.ts"
            language="tsx"
            maxHeight="400px"
          />
        </section>

        {/* Fonts */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">4. Font Setup</h2>
          <p className="text-text-secondary mb-4">
            Freehold uses three fonts. Add them to your project via Google Fonts or local files.
          </p>

          <h3 className="text-sm font-medium text-text-primary mb-2">Option A: Google Fonts (Next.js)</h3>
          <CodeCanvas
            code={`// app/layout.tsx
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html className={\`\${dmSerif.variable} \${dmSans.variable} \${jetbrains.variable}\`}>
      <body className="font-body">{children}</body>
    </html>
  )
}`}
            title="app/layout.tsx"
            language="tsx"
            maxHeight="350px"
          />

          <h3 className="text-sm font-medium text-text-primary mt-6 mb-2">Option B: CDN Link</h3>
          <CodeCanvas
            code={`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`}
            title="index.html"
            showLineNumbers={false}
          />
        </section>

        {/* Import Styles */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">5. Import Styles</h2>
          <p className="text-text-secondary mb-4">
            Import the component styles in your app entry point:
          </p>
          <CodeCanvas
            code={`// app/layout.tsx or _app.tsx
import '@freehold/ui/styles.css'
import './globals.css' // Your Tailwind styles`}
            title="app/layout.tsx"
            language="tsx"
            showLineNumbers={false}
          />
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">6. Quick Start</h2>
          <p className="text-text-secondary mb-4">
            You're ready! Import and use components:
          </p>
          <CodeCanvas
            code={`import { Button, Card, CardContent, Badge } from '@freehold/ui'

export default function MyPage() {
  return (
    <Card variant="elevated" padding="lg">
      <CardContent>
        <Badge variant="approved" className="mb-3">New</Badge>
        <h2 className="font-heading text-xl text-text-primary mb-2">
          Welcome to Freehold
        </h2>
        <p className="text-text-secondary mb-4">
          Your components are ready to use.
        </p>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  )
}`}
            title="app/page.tsx"
            language="tsx"
          />
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="font-heading text-xl text-text-primary mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs">
              <Card variant="outlined" padding="md" className="bg-white h-full hover:border-sand-500 transition-colors cursor-pointer">
                <CardContent>
                  <Icon name="dashboard" size="lg" className="mb-3" />
                  <h3 className="font-medium text-text-primary mb-1">Browse Components</h3>
                  <p className="text-sm text-text-secondary">Explore all 24 components with live examples.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/design-system">
              <Card variant="outlined" padding="md" className="bg-white h-full hover:border-sand-500 transition-colors cursor-pointer">
                <CardContent>
                  <Icon name="settings" size="lg" className="mb-3" />
                  <h3 className="font-medium text-text-primary mb-1">Design System</h3>
                  <p className="text-sm text-text-secondary">Colors, typography, spacing, and icons.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/showcase">
              <Card variant="outlined" padding="md" className="bg-white h-full hover:border-sand-500 transition-colors cursor-pointer">
                <CardContent>
                  <Icon name="growth" size="lg" className="mb-3" />
                  <h3 className="font-medium text-text-primary mb-1">Showcase</h3>
                  <p className="text-sm text-text-secondary">See full patterns like PayrollDashboard.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(184,164,142,0.15)] mt-16">
        <div className="max-w-[1080px] mx-auto px-6 py-8">
          <p className="text-sm text-text-tertiary text-center">
            @freehold/ui &middot; Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
