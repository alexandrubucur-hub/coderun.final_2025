// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     images: {
          domains: [], // Adaugă domenii dacă folosești imagini externe
          unoptimized: true, // image optimization api nu functioneaza cu 'output: "export"'
     },
     turbopack: {
          rules: {
               "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
               },
          }
     },
    output: "export" // pentru static export
};

export default nextConfig;
