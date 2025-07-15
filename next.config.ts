import type { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const baseConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  experimental: {
    // ppr: true,
    reactCompiler: true, // need babel-plugin-react-compiler
  },
  transpilePackages: ['jotai-devtools'],
  allowedDevOrigins: process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(','),
};

let configWithPlugins = baseConfig;

configWithPlugins = createNextIntlPlugin({
  requestConfig: './src/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: `./messages/@target/${process.env.NEXT_PUBLIC_I18N_DEFAULT}.json`,
  },
})(configWithPlugins);

if (process.env.ANALYZE === 'true')
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);

const nextConfig = configWithPlugins;
export default nextConfig;
