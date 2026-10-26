import { NextResponse } from "next/server";
import {
  hasAiEmployeeAdminAccess,
  listAiEmployeeSubmissions,
} from "@/lib/aiEmployeeStore";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasAiEmployeeAdminAccess(request)) {
    return NextResponse.json({ error: "后台链接无效或未配置后台口令" }, { status: 403 });
  }

  const submissions = await listAiEmployeeSubmissions();
  return NextResponse.json({ submissions });
}
