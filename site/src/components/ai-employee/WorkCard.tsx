import Link from "next/link";
import type { AiEmployeePublicWork } from "@/lib/aiEmployeeTypes";

type Props = {
  work: AiEmployeePublicWork;
  compact?: boolean;
};

export default function WorkCard({ work, compact = false }: Props) {
  const title = work.soloPlan.employeeName || work.teamPlan.teamGoal || "未命名数字员工";
  const summary = work.soloPlan.businessScene || work.teamPlan.teamGoal || work.participant.intro;
  const tags = work.moderation.tags.length ? work.moderation.tags : work.soloPlan.tools.slice(0, 3);

  return (
    <Link
      href={`/event/ai-employee/work/${work.slug}`}
      className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1e477c]/30 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1e477c]">
            {work.participant.name}
            {work.participant.company ? ` · ${work.participant.company}` : ""}
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-950">
            {title}
          </h3>
        </div>
        {work.moderation.featured && (
          <span className="shrink-0 rounded-full bg-[#1e477c] px-3 py-1 text-xs font-semibold text-white">
            精选
          </span>
        )}
      </div>

      <p className={`mt-4 text-slate-600 ${compact ? "line-clamp-3" : ""}`}>
        {summary || "这位学员还在完善业务场景。"}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center text-sm font-bold text-[#1e477c]">
        查看计划
        <span className="ml-2 transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
