import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAiEmployeePublicWorkBySlug } from "@/lib/aiEmployeeStore";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getAiEmployeePublicWorkBySlug(slug);
  if (!work) return { title: "作品不存在 | AI数字员工实战营" };

  return {
    title: `${work.soloPlan.employeeName || work.teamPlan.teamGoal} | AI数字员工实战营`,
    description: work.soloPlan.businessScene || work.teamPlan.teamGoal || work.participant.intro,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 text-slate-600">{children}</div>
    </section>
  );
}

function TextBlock({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">{value}</p>
    </div>
  );
}

export default async function AiEmployeeWorkPage({ params }: Props) {
  const { slug } = await params;
  const work = await getAiEmployeePublicWorkBySlug(slug);
  if (!work) notFound();

  const title = work.soloPlan.employeeName || work.teamPlan.teamGoal || "未命名数字员工";

  return (
    <div className="bg-[#f8fafc]">
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Link href="/event/ai-employee/gallery" className="text-sm font-bold text-[#1e477c]">
            返回作品广场
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.moderation.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#1e477c]/10 px-3 py-1 text-xs font-bold text-[#1e477c]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {work.participant.name}
            {work.participant.company ? ` / ${work.participant.company}` : ""}
            {work.participant.title ? ` / ${work.participant.title}` : ""}
          </p>
          {work.participant.intro && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{work.participant.intro}</p>
          )}
        </div>
      </section>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Section title="单个数字员工计划">
          <div className="grid gap-4 md:grid-cols-2">
            <TextBlock label="业务场景" value={work.soloPlan.businessScene} />
            <TextBlock label="成功标准" value={work.soloPlan.successCriteria} />
            <TextBlock label="输入" value={work.soloPlan.input} />
            <TextBlock label="输出" value={work.soloPlan.output} />
            <div className="md:col-span-2">
              <TextBlock label="工作流程" value={work.soloPlan.workflow} />
            </div>
          </div>
          {work.soloPlan.tools.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {work.soloPlan.tools.map((tool) => (
                <span key={tool} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {tool}
                </span>
              ))}
            </div>
          )}
          {work.soloPlan.resultUrl && (
            <a
              href={work.soloPlan.resultUrl}
              className="mt-6 inline-flex rounded-full bg-[#1e477c] px-6 py-3 font-bold text-white hover:bg-[#152f54]"
              target="_blank"
              rel="noreferrer"
            >
              打开单人成果
            </a>
          )}
        </Section>

        <Section title="数字员工团队计划">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <TextBlock label="团队目标" value={work.teamPlan.teamGoal} />
            </div>
            <TextBlock label="协作链路" value={work.teamPlan.collaborationFlow} />
            <TextBlock label="人工验收点" value={work.teamPlan.humanReviewPoints} />
            <div className="md:col-span-2">
              <TextBlock label="30 天里程碑" value={work.teamPlan.milestones30Day} />
            </div>
          </div>
          {work.teamPlan.roles.length > 0 && (
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {work.teamPlan.roles.map((role) => (
                <div key={role} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  {role}
                </div>
              ))}
            </div>
          )}
          {work.teamPlan.resultUrl && (
            <a
              href={work.teamPlan.resultUrl}
              className="mt-6 inline-flex rounded-full bg-[#1e477c] px-6 py-3 font-bold text-white hover:bg-[#152f54]"
              target="_blank"
              rel="noreferrer"
            >
              打开团队成果
            </a>
          )}
        </Section>
      </main>
    </div>
  );
}
