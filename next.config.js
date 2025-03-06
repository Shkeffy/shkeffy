/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig 