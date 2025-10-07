// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     experimental: {
          turbo: {
               rules: {
                    "*.svg": {
                         loaders: ["@svgr/webpack"],
                         as: "*.js",
                    },
               },
          },
     },
     images: {
          domains: [], // Adaugă domenii dacă folosești imagini externe
     },
};

export default nextConfig;
