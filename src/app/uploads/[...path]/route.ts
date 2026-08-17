import { readFile, realpath } from "node:fs/promises";
import { basename, extname, join, sep } from "node:path";
import { NextRequest, NextResponse } from "next/server";

// ponytail: this map is both the extension allowlist and the Content-Type source —
// one object, so a type can't be served for an extension we don't allow. The set is
// exactly what src/app/api/upload/route.ts can write (its extByType); nothing else can
// appear here after boot, so nothing else needs an entry. Keep them in step by hand.
const typeByExt: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const uploadDir = join(process.cwd(), "public", "uploads");

// Always 404 on rejection — never leak why, so this isn't a filesystem probe.
const notFound = () => new NextResponse(null, { status: 404 });

// ponytail: only files written AFTER server start reach this handler. In production
// Next enumerates public/ exactly once at boot into publicFolderItems and checks that
// set before app routes, so runtime uploads 404 until restart without this route.
// Corollary — the allowlist above gates ONLY files written during this process: anything
// already in public/uploads at boot is served by Next's static handler and never reaches
// this code (a pre-boot notes.txt is 200 text/plain), as public/ has always behaved.
// Same /uploads/<name> URL either way, so no stored imageUrl needs changing.
// Upgrade path: object storage + CDN, at which point this file goes away.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  if (!path?.length) return notFound();

  // Catch-all: every segment must be a plain filename, not just the last one.
  for (const seg of path) {
    if (!seg || seg === "." || seg === ".." || basename(seg) !== seg) return notFound();
  }

  const type = typeByExt[extname(path[path.length - 1]).toLowerCase()];
  if (!type) return notFound();

  let file: Buffer;
  try {
    // realpath, not resolve: readFile follows symlinks, so containment has to be checked
    // on the link target or a planted link serves any file the server user can read.
    // Both sides get resolved (public/uploads may itself legitimately be a symlink).
    // A path that doesn't exist throws ENOENT here and lands in the same 404 below.
    const real = await realpath(join(uploadDir, ...path));
    if (!real.startsWith((await realpath(uploadDir)) + sep)) return notFound();
    file = await readFile(real);
  } catch {
    return notFound();
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": type,
      // Filenames are Date.now()-prefixed, so they're effectively content-addressed.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
