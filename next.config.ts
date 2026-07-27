import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.meesho.com",
        pathname: "/images/products/**",
      },
    ],
  },
};

export default nextConfig;
