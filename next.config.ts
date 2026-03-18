import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages doesn't support some Next.js features
  trailingSlash: true,
};

export default nextConfig;
