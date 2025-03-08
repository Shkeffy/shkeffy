/** @type {import('next').NextConfig} */
// Force clean rebuild - v2
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [],
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
  output: 'standalone',
  reactStrictMode: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = nextConfig 