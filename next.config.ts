// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     images: {
          domains: [], // Adaugă domenii dacă folosești imagini externe
     },
     turbopack: {
          rules: {
               "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
               },
          }
     },
};

export default nextConfig;
