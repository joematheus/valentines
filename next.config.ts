import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/valentines",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static exports
  },
};

export default nextConfig;
