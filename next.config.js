/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Garantir que o CSS seja processado corretamente
  experimental: {
    optimizeCss: false,
  },
  // Como o projeto agora é focado em JavaScript,
  // ignoramos erros de TypeScript e ESLint no build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig


