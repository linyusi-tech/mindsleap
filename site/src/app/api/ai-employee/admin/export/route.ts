import { NextResponse } from "next/server";
import {
  buildAiEmployeeCsv,
  buildAiEmployeeFeishuPayload,
  hasAiEmployeeAdminAccess,
  listAiEmployeeSubmissions,
} from "@/lib/aiEmployeeStore";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasAiEmployeeAdminAccess(request)) {
    return NextResponse.json({ error: "后台链接无效或未配置后台口令" }, { status: 403 });
  }

  const url = new URL(request.url);
  const format = url.searchParams.get("format") || "json";
  const submissions = await listAiEmployeeSubmissions();

  if (format === "csv") {
    return new Response(`\uFEFF${buildAiEmployeeCsv(submissions)}`, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=ai-employee-submissions.csv",
      },
    });
  }

  if (format === "feishu") {
    return NextResponse.json({ updates: buildAiEmployeeFeishuPayload(submissions) });
  }

  return NextResponse.json({ submissions });
}
