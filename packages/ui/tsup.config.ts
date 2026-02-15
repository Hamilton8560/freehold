import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@tiptap/react', '@tiptap/pm', '@tiptap/starter-kit', '@tiptap/extension-link', '@tiptap/extension-placeholder'],
  treeshake: true,
  esbuildOptions(options) {
    options.loader = { ...options.loader, '.webp': 'dataurl', '.png': 'dataurl' }
  },
})
