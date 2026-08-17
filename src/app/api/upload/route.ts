import { writeFile, mkdir } from "fs/promises";
import { join, parse } from "path";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";

// ponytail: single source of truth — the stored extension comes from the validated
// MIME type, never from the client-supplied filename. svg is deliberately excluded:
// an SVG served from our own origin can execute scripts and nothing here sanitises it.
// Upgrade path: sanitise with DOMPurify if svg upload is ever actually needed.
const extByType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
};

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // formData() rejects (not resolves) when the body isn't parseable multipart.
  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data" }, { status: 400 });

  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = extByType[file.type];
  if (!ext) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", "uploads");

  const safeName = parse(file.name).name.replace(/[^a-zA-Z0-9._-]/g, "_") || "file";
  const filename = `${Date.now()}-${safeName}${ext}`;

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), buffer);
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url: `/uploads/${filename}`, name: filename });
}
