import type { NextConfig } from 'next'
import { resolve } from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['@freehold/ui', '@freehold/ai'],
  outputFileTracingRoot: resolve(__dirname, '../../'),
}

export default nextConfig
