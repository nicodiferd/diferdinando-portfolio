import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for Cloudflare Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
