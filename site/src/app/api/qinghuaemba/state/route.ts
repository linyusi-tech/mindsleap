import { NextRequest, NextResponse } from "next/server";
import { buildEventState, databaseHealth, sessionCookieName } from "@/lib/qinghuaEmbaStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(sessionCookieName())?.value || null;
  return NextResponse.json(
    { state: buildEventState(token), health: databaseHealth() },
    { headers: { "cache-control": "no-store" } },
  );
}
