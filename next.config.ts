import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.txt$/i,
      type: 'asset/source',
    });
    return config;
  },

  images: {
    domains: ['example.com'], // Replace with your image domains
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      // Updated Turbopack rule for text files:
      '*.txt': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
