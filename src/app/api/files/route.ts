import { readdir, unlink, stat } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/get-user";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const uploadDir = join(process.cwd(), "public", "uploads");

  let files: string[] = [];
  try {
    files = await readdir(uploadDir);
  } catch {
    files = [];
  }

  const imageExts = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
  const imageFiles = files.filter((f) => imageExts.test(f));

  const result = await Promise.all(
    imageFiles.map(async (name) => {
      const filePath = join(uploadDir, name);
      const info = await stat(filePath);
      return {
        name,
        url: `/uploads/${name}`,
        size: info.size,
        createdAt: info.birthtime.toISOString(),
      };
    })
  );

  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ files: result });
}

export async function DELETE(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { filename } = await req.json();
  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = join(process.cwd(), "public", "uploads", filename);
  try {
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
