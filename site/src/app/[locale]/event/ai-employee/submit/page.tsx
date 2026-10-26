import type { Metadata } from "next";
import Link from "next/link";
import SubmissionForm from "@/components/ai-employee/SubmissionForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "提交数字员工计划 | AI数字员工实战营",
  description: "提交安装准备、单个数字员工计划和 30 天数字员工团队计划。",
};

type Props = {
  searchParams: Promise<{ id?: string; editToken?: string }>;
};

export default async function AiEmployeeSubmitPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/event/ai-employee" className="text-sm font-bold text-[#1e477c]">
            返回活动平台
          </Link>
          <h1 className="mt-5 text-4xl font-extrabold text-slate-950 md:text-5xl">
            提交你的数字员工计划
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            这不是普通问卷。它会成为现场实操的起点，也会在审核通过后变成作品广场里的可借鉴案例。
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <SubmissionForm editId={params.id} editToken={params.editToken} />
      </main>
    </div>
  );
}
