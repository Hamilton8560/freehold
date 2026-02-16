import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/stripe.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@stripe/stripe-js',
    '@stripe/react-stripe-js',
    '@freehold/design-tokens',
  ],
  treeshake: true,
})
