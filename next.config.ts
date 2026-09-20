import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(), payment=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** Canonical host; `www.` is redirected to it (evaluated by the router, so no middleware is needed). */
const CANONICAL_HOST = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaagazo.com").host;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Separate root rule: OpenNext leaves ":path*" unsubstituted when the path is empty.
      { source: "/", has: [{ type: "host", value: `www.${CANONICAL_HOST}` }], destination: `https://${CANONICAL_HOST}/`, permanent: true },
      { source: "/:path+", has: [{ type: "host", value: `www.${CANONICAL_HOST}` }], destination: `https://${CANONICAL_HOST}/:path+`, permanent: true },
    ];
  },
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts", deviceSizes: [640, 1200], imageSizes: [] },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/og/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800" }] },
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
