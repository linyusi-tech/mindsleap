import { NextResponse } from "next/server";
import { getWorkImage } from "@/lib/qinghuaEmbaStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const image = getWorkImage(id);
  if (!image) return NextResponse.json({ error: "图片不存在" }, { status: 404 });
  return new NextResponse(new Uint8Array(image.image_blob), {
    headers: {
      "content-type": image.image_mime,
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    },
  });
}
