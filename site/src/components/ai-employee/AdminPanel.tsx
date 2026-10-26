"use client";

import { useEffect, useMemo, useState } from "react";
import type { AiEmployeeSubmission, ModerationStatus } from "@/lib/aiEmployeeTypes";

type Props = {
  initialToken?: string;
};

const statusLabels: Record<ModerationStatus, string> = {
  submitted: "待审核",
  approved: "已公开",
  hidden: "已隐藏",
};

function statusClass(status: ModerationStatus) {
  if (status === "approved") return "bg-emerald-50 text-emerald-700";
  if (status === "hidden") return "bg-slate-100 text-slate-600";
  return "bg-amber-50 text-amber-700";
}

function toTextarea(value: string[]) {
  return value.join("\n");
}

export default function AdminPanel({ initialToken = "" }: Props) {
  const [token, setToken] = useState(initialToken);
  const [items, setItems] = useState<AiEmployeeSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return items;
    return items.filter((item) =>
      [
        item.participant.name,
        item.participant.company,
        item.participant.title,
        item.soloPlan.employeeName,
        item.teamPlan.teamGoal,
        item.moderation.status,
        ...item.moderation.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(key)
    );
  }, [items, query]);

  async function loadItems(nextToken = token) {
    if (!nextToken) {
      setError("请输入后台口令");
      return;
    }

    setLoading(true);
    setError("");
    const response = await fetch("/api/ai-employee/admin/submissions", {
      headers: { "x-ai-employee-admin-token": nextToken },
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "读取失败");
    } else {
      setItems(payload.submissions || []);
      setMessage(`已载入 ${payload.submissions?.length || 0} 条提交`);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (initialToken) loadItems(initialToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialToken]);

  async function review(item: AiEmployeeSubmission, status: ModerationStatus, extra?: Partial<AiEmployeeSubmission["moderation"]>) {
    setMessage("");
    setError("");
    const response = await fetch("/api/ai-employee/admin/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-ai-employee-admin-token": token,
      },
      body: JSON.stringify({
        id: item.id,
        status,
        tags: extra?.tags ?? item.moderation.tags,
        featured: extra?.featured ?? item.moderation.featured,
        adminNote: extra?.adminNote ?? item.moderation.adminNote,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || payload.errors?.join(" / ") || "审核失败");
      return;
    }
    setItems((current) =>
      current.map((candidate) =>
        candidate.id === payload.submission.id ? payload.submission : candidate
      )
    );
    setMessage("已保存审核结果");
  }

  function exportUrl(format: "json" | "csv" | "feishu") {
    return `/api/ai-employee/admin/export?format=${format}&admin=${encodeURIComponent(token)}`;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
          <label className="block">
            <span className="text-sm font-bold text-slate-900">后台口令</span>
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
            />
          </label>
          <button
            onClick={() => loadItems()}
            disabled={loading}
            className="rounded-xl bg-[#1e477c] px-5 py-3 font-bold text-white hover:bg-[#152f54] disabled:bg-slate-400"
          >
            {loading ? "读取中" : "载入提交"}
          </button>
          <a className="rounded-xl border border-slate-200 px-5 py-3 text-center font-bold text-slate-700 hover:border-[#1e477c]" href={exportUrl("csv")}>
            导出 CSV
          </a>
          <a className="rounded-xl border border-slate-200 px-5 py-3 text-center font-bold text-slate-700 hover:border-[#1e477c]" href={exportUrl("feishu")}>
            飞书 payload
          </a>
        </div>
        {(message || error) && (
          <div className={`mt-4 rounded-2xl p-4 text-sm font-medium ${error ? "bg-red-50 text-red-700" : "bg-[#1e477c]/5 text-[#1e477c]"}`}>
            {error || message}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">提交审核</h2>
            <p className="mt-1 text-sm text-slate-500">联系方式只在后台显示，不进入作品广场。</p>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索姓名、公司、标签"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10 md:max-w-sm"
          />
        </div>

        <div className="mt-6 space-y-5">
          {filteredItems.map((item) => (
            <SubmissionReviewCard key={item.id} item={item} onReview={review} />
          ))}

          {!filteredItems.length && (
            <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
              暂无提交。载入口令后会在这里看到学员计划。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SubmissionReviewCard({
  item,
  onReview,
}: {
  item: AiEmployeeSubmission;
  onReview: (
    item: AiEmployeeSubmission,
    status: ModerationStatus,
    extra?: Partial<AiEmployeeSubmission["moderation"]>
  ) => void;
}) {
  const [tagsText, setTagsText] = useState(toTextarea(item.moderation.tags));
  const [adminNote, setAdminNote] = useState(item.moderation.adminNote);
  const [featured, setFeatured] = useState(item.moderation.featured);

  useEffect(() => {
    setTagsText(toTextarea(item.moderation.tags));
    setAdminNote(item.moderation.adminNote);
    setFeatured(item.moderation.featured);
  }, [item]);

  const tags = tagsText
    .split(/\n|,|，|;|；/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(item.moderation.status)}`}>
              {statusLabels[item.moderation.status]}
            </span>
            {item.moderation.featured && (
              <span className="rounded-full bg-[#1e477c] px-3 py-1 text-xs font-bold text-white">
                精选
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-bold text-slate-950">
            {item.soloPlan.employeeName || item.teamPlan.teamGoal || "未命名计划"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {item.participant.name} / {item.participant.company || "未填公司"} / {item.participant.title || "未填职位"}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">联系方式：{item.participant.contact}</p>
        </div>
        <a
          href={`/event/ai-employee/work/${item.slug}`}
          className="rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-bold text-[#1e477c] hover:border-[#1e477c]"
          target="_blank"
          rel="noreferrer"
        >
          预览公开页
        </a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-900">单个数字员工</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.soloPlan.businessScene || "未填写业务场景"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-900">团队目标</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.teamPlan.teamGoal || "未填写团队目标"}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="block md:col-span-1">
          <span className="text-sm font-bold text-slate-900">标签</span>
          <textarea
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-slate-900">后台备注</span>
          <textarea
            value={adminNote}
            onChange={(event) => setAdminNote(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
          />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => setFeatured(event.target.checked)}
          className="h-5 w-5 rounded border-slate-300 text-[#1e477c]"
        />
        设为精选作品
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => onReview(item, "approved", { tags, featured, adminNote })}
          className="rounded-xl bg-[#1e477c] px-5 py-3 text-sm font-bold text-white hover:bg-[#152f54]"
        >
          审核公开
        </button>
        <button
          onClick={() => onReview(item, "submitted", { tags, featured, adminNote })}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-[#1e477c]"
        >
          回到待审
        </button>
        <button
          onClick={() => onReview(item, "hidden", { tags, featured, adminNote })}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-[#1e477c]"
        >
          隐藏
        </button>
      </div>
    </article>
  );
}
