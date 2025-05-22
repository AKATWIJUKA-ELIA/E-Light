import type { NextConfig } from "next";

const nextConfig: NextConfig = {
                images: {
                  remotePatterns: [
                        {
                      protocol: 'https',
                      hostname: 'cheery-cod-687.convex.cloud',
                      pathname: '/**',
                    },
                    {
                        protocol: 'https',
                        hostname: 'www.bootdey.com',
                        pathname: '/**',
                      },
                      {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com',
                        pathname: '/**',
                      },
                  ],
                },
              };

export default nextConfig;
