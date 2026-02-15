import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@freehold/ui', '@freehold/ai'],
}

export default nextConfig
