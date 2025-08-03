import type { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const baseConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // ppr: true,
    reactCompiler: true, // need babel-plugin-react-compiler
  },
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  transpilePackages: ['jotai-devtools'],
  devIndicators: false,
  allowedDevOrigins: process.env.NEXT_PUBLIC_APP_HOST?.split(','),
};

let configWithPlugins = baseConfig;

configWithPlugins = createNextIntlPlugin({
  requestConfig: './src/lib/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: `./messages/@target/${process.env.NEXT_I18N_DEFAULT}.json`,
  },
})(configWithPlugins);

if (process.env.ANALYZE === 'true')
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);

const nextConfig = configWithPlugins;
export default nextConfig;
