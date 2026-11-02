import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    // Avoid duplicating the localized build in a persistent compiler cache.
    turbopackFileSystemCacheForBuild: false,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
