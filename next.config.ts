import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: no output: "standalone". It exists to emit a self-contained bundle
  // for containers, and Docker is gone — `next start` runs straight from this
  // checkout. It was also a live footgun: `next build` does not copy .next/static
  // or public/ into the bundle, and server.js does process.chdir(__dirname), so
  // data/sqlite.db would resolve inside the build output and silently open an
  // empty database. Add it back only if this is ever containerised again.
  allowedDevOrigins: ['192.168.2.15'],
  // ponytail: no Content-Security-Policy. next-themes, framer-motion and
  // tsparticles all emit inline styles, so a hand-written CSP breaks the page
  // silently instead of loudly. Upgrade path: add CSP with a nonce once those
  // inline styles are audited, and test it before shipping.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
