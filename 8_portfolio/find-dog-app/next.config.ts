import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio/finddog",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
