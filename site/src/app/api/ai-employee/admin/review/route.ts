import { NextResponse } from "next/server";
import {
  hasAiEmployeeAdminAccess,
  reviewAiEmployeeSubmission,
} from "@/lib/aiEmployeeStore";
import type { ModerationStatus } from "@/lib/aiEmployeeTypes";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasAiEmployeeAdminAccess(request)) {
    return NextResponse.json({ error: "后台链接无效或未配置后台口令" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      status?: ModerationStatus;
      tags?: unknown;
      featured?: unknown;
      adminNote?: unknown;
    };

    const result = await reviewAiEmployeeSubmission({
      id: String(body.id || ""),
      status: body.status || "submitted",
      tags: body.tags,
      featured: body.featured,
      adminNote: body.adminNote,
    });

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    return NextResponse.json({ submission: result.submission });
  } catch (error) {
    const message = error instanceof Error ? error.message : "审核失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
