import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages doesn't support some Next.js features
  trailingSlash: true,
  outputFileTracingRoot: "/Volumes/SSD-PGU3/code/pigrepresentative",
};

export default nextConfig;
