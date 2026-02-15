import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/client.ts', 'src/server.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'ai',
    'ai/react',
    'zod',
    '@ai-sdk/openai',
    '@ai-sdk/anthropic',
    '@ai-sdk/google',
    '@ai-sdk/deepseek',
    'ollama-ai-provider',
  ],
  treeshake: true,
})
