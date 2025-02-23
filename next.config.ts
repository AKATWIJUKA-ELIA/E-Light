import type { NextConfig } from "next";

const nextConfig: NextConfig = {
                images: {
                  remotePatterns: [
                        {
                      protocol: 'https',
                      hostname: 'cheery-cod-687.convex.cloud',
                      pathname: '/**',
                    },
                  ],
                },
              };

export default nextConfig;
