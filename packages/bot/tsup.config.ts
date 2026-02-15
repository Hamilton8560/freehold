import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/telegram.ts', 'src/discord.ts', 'src/slack.ts', 'src/whatsapp.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'grammy',
    'discord.js',
    '@slack/bolt',
    'ai',
    'zod',
    '@ai-sdk/openai',
    '@ai-sdk/anthropic',
    '@ai-sdk/google',
    '@ai-sdk/deepseek',
    'ollama-ai-provider',
    '@freehold/ai',
    '@freehold/ai/server',
  ],
  treeshake: true,
})
