import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "@/components/ai-employee/WorkCard";
import { listAiEmployeePublicWorks } from "@/lib/aiEmployeeStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "作品广场 | AI数字员工实战营",
  description: "查看学员公开的单个数字员工计划和数字员工团队成果。",
};

export default async function AiEmployeeGalleryPage() {
  const works = await listAiEmployeePublicWorks();

  return (
    <div className="bg-[#f8fafc]">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link href="/event/ai-employee" className="text-sm font-bold text-[#1e477c]">
            返回活动平台
          </Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-950 md:text-5xl">作品广场</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                这里只展示审核通过且授权公开的计划。你可以借鉴别人的岗位定义、流程设计和团队组合。
              </p>
            </div>
            <Link
              href="/event/ai-employee/submit"
              className="rounded-full bg-[#1e477c] px-7 py-4 text-center font-bold text-white hover:bg-[#152f54]"
            >
              提交我的计划
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        {!works.length && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-950">还没有公开作品</h2>
            <p className="mt-3 text-slate-600">第一批学员计划审核后会出现在这里。</p>
          </div>
        )}
      </main>
    </div>
  );
}
