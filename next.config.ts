import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Content-Security-Policy. The site is static-first; scripts/styles use
// 'unsafe-inline' (Next's hydration bootstrap + inline JSON-LD + Tailwind's
// injected styles). Upgrade path: move to a nonce via middleware if the app
// ever needs stricter script policy (that would opt routes into dynamic).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Public machine surfaces are readable cross-origin by tools/agents.
const corsHeaders = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Content-Type" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  // In a Bun monorepo, pin the file-tracing root to the repo root.
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/mcp", headers: corsHeaders },
      { source: "/r/:path*", headers: corsHeaders },
      { source: "/llms.txt", headers: corsHeaders },
      { source: "/llms-full.txt", headers: corsHeaders },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
