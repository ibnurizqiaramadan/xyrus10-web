// pm2 config. Run: pm2 start ecosystem.config.js
//
// script is the Next binary, NOT `npm`. Measured: `pm2 start npm -- start -i N` forks
// npm -> sh -> next-server, so only the wrapper's socket is shared; worker 2 dies with
// EADDRINUSE and crash-loops while `pm2 list` still reports "online" and the error log
// stays 0 bytes. Pointing at the binary makes pm2 own the real server process, so
// pm2 restart/reload act on the thing actually listening.
module.exports = {
  apps: [
    {
      name: "xyrus10",
      script: "./node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      cwd: __dirname,

      // instances > 1 REQUIRES REDIS_ENABLED=true below. Without Redis the login rate
      // limiter falls back to a per-process Map, handing an attacker instances *
      // MAX_ATTEMPTS guesses per window (measured: 5/10/20 at 1/2/4 workers).
      //
      // Scaling measured with ISR on 8 pinned cores, 60 concurrent:
      //   1 worker  206 req/s  253 MB      4 workers  321 req/s   779 MB
      //   2 workers 310 req/s  421 MB      6 workers  326 req/s  1145 MB
      // The knee is at 2 — past it throughput is flat because ISR serves from cache, so
      // rendering is no longer the bottleneck, while RAM keeps climbing. 4 buys ~4% over
      // 2 for ~360 MB, and leaves 4 of 8 cores for the OS, redis and burst.
      // Budget ~200 MB per worker and check the VM has headroom before raising it.
      instances: 4,
      exec_mode: "cluster",

      env: {
        NODE_ENV: "production",
        // Public origin for metadataBase, robots.txt and sitemap.xml. MUST include the
        // scheme — a schemeless value silently makes every sitemap URL relative.
        SITE_URL: "https://www.xyrus10.dev",
        // Shared rate-limit counter (and read cache). Required before instances > 1.
        REDIS_ENABLED: "true",
        REDIS_URL: "redis://localhost:6379",
        // Only true when HAProxy OVERWRITES x-forwarded-for:
        //   http-request set-header X-Forwarded-For %[src]
        // `option forwardfor` APPENDS instead, which is still fine here because the app
        // reads the rightmost entry — but overwriting removes the ambiguity entirely.
        // Left false, every client shares one bucket per username, so anyone can lock the
        // admin out for 60s with 6 requests.
        TRUST_PROXY: "true",
        // ./data/sqlite.db relative to cwd is the default; set it here to be explicit.
        DATABASE_PATH: "data/sqlite.db",
      },
    },
  ],
};
