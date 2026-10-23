import type { NextConfig } from "next";
import fs from "node:fs";

const nextConfig: NextConfig = {
  turbopack: {
    root: fs.realpathSync.native(process.cwd()),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
