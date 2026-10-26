import { NextResponse } from "next/server";
import {
  getAiEmployeeSubmissionForEdit,
  saveAiEmployeeSubmission,
} from "@/lib/aiEmployeeStore";
import type { AiEmployeeSubmissionInput } from "@/lib/aiEmployeeTypes";

export const runtime = "nodejs";

function buildEditUrl(request: Request, id: string, editToken: string) {
  const url = new URL(request.url);
  return `${url.origin}/event/ai-employee/submit?id=${encodeURIComponent(id)}&editToken=${encodeURIComponent(editToken)}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  const editToken = url.searchParams.get("editToken") || "";

  if (!id || !editToken) {
    return NextResponse.json({ error: "缺少编辑链接参数" }, { status: 400 });
  }

  const submission = await getAiEmployeeSubmissionForEdit(id, editToken);
  if (!submission) {
    return NextResponse.json({ error: "编辑链接无效或已过期" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as AiEmployeeSubmissionInput;
    const result = await saveAiEmployeeSubmission(input);

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    return NextResponse.json({
      submission: result.submission,
      editUrl: buildEditUrl(request, result.submission.id, result.submission.editToken),
      publicUrl: `/event/ai-employee/work/${result.submission.slug}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "提交失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
