import { NextResponse } from "next/server";
import { listAiEmployeePublicWorks } from "@/lib/aiEmployeeStore";

export const runtime = "nodejs";

export async function GET() {
  const works = await listAiEmployeePublicWorks();
  return NextResponse.json({ works });
}
