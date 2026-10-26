"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  AiEmployeeSubmission,
  AiEmployeeSubmissionInput,
  ToolReadiness,
} from "@/lib/aiEmployeeTypes";

type Props = {
  editId?: string;
  editToken?: string;
};

type FormState = {
  name: string;
  company: string;
  title: string;
  intro: string;
  contact: string;
  consentPublic: boolean;
  operatingSystem: string;
  browser: ToolReadiness;
  codex: ToolReadiness;
  hermes: ToolReadiness;
  node: ToolReadiness;
  git: ToolReadiness;
  blockers: string;
  employeeName: string;
  businessScene: string;
  input: string;
  output: string;
  workflow: string;
  toolsText: string;
  successCriteria: string;
  soloResultUrl: string;
  teamGoal: string;
  rolesText: string;
  collaborationFlow: string;
  humanReviewPoints: string;
  milestones30Day: string;
  teamResultUrl: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  title: "",
  intro: "",
  contact: "",
  consentPublic: true,
  operatingSystem: "macOS",
  browser: "not-started",
  codex: "not-started",
  hermes: "not-started",
  node: "not-started",
  git: "not-started",
  blockers: "",
  employeeName: "",
  businessScene: "",
  input: "",
  output: "",
  workflow: "",
  toolsText: "",
  successCriteria: "",
  soloResultUrl: "",
  teamGoal: "",
  rolesText: "",
  collaborationFlow: "",
  humanReviewPoints: "",
  milestones30Day: "",
  teamResultUrl: "",
};

const readinessOptions: Array<{ value: ToolReadiness; label: string }> = [
  { value: "ready", label: "已准备好" },
  { value: "needs-help", label: "需要现场协助" },
  { value: "not-started", label: "还没开始" },
];

function toFormState(submission: AiEmployeeSubmission): FormState {
  return {
    name: submission.participant.name,
    company: submission.participant.company,
    title: submission.participant.title,
    intro: submission.participant.intro,
    contact: submission.participant.contact,
    consentPublic: submission.participant.consentPublic,
    operatingSystem: submission.readiness.operatingSystem,
    browser: submission.readiness.browser,
    codex: submission.readiness.codex,
    hermes: submission.readiness.hermes,
    node: submission.readiness.node,
    git: submission.readiness.git,
    blockers: submission.readiness.blockers,
    employeeName: submission.soloPlan.employeeName,
    businessScene: submission.soloPlan.businessScene,
    input: submission.soloPlan.input,
    output: submission.soloPlan.output,
    workflow: submission.soloPlan.workflow,
    toolsText: submission.soloPlan.tools.join("\n"),
    successCriteria: submission.soloPlan.successCriteria,
    soloResultUrl: submission.soloPlan.resultUrl,
    teamGoal: submission.teamPlan.teamGoal,
    rolesText: submission.teamPlan.roles.join("\n"),
    collaborationFlow: submission.teamPlan.collaborationFlow,
    humanReviewPoints: submission.teamPlan.humanReviewPoints,
    milestones30Day: submission.teamPlan.milestones30Day,
    teamResultUrl: submission.teamPlan.resultUrl,
  };
}

function Field({
  label,
  helper,
  required,
  children,
}: {
  label: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-slate-900">
        {label}
        {required && <span className="text-[#1e477c]"> *</span>}
      </span>
      {helper && <span className="mt-1 block text-xs leading-5 text-slate-500">{helper}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
    />
  );
}

function ReadinessSelect({
  value,
  onChange,
}: {
  value: ToolReadiness;
  onChange: (value: ToolReadiness) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as ToolReadiness)}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#1e477c] focus:ring-4 focus:ring-[#1e477c]/10"
    >
      {readinessOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function SubmissionForm({ editId, editToken }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(Boolean(editId && editToken));
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editUrl, setEditUrl] = useState("");

  const isEditing = Boolean(editId && editToken);
  const progress = useMemo(() => {
    const fields = [
      form.name,
      form.contact,
      form.employeeName || form.teamGoal,
      form.businessScene || form.collaborationFlow,
      form.successCriteria || form.milestones30Day,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  useEffect(() => {
    if (!editId || !editToken) return;
    const submissionId = editId;
    const submissionEditToken = editToken;

    async function loadSubmission() {
      setLoading(true);
      const response = await fetch(
        `/api/ai-employee/submissions?id=${encodeURIComponent(submissionId)}&editToken=${encodeURIComponent(submissionEditToken)}`
      );
      const payload = await response.json();
      if (!response.ok) {
        setErrors([payload.error || "编辑链接无效"]);
      } else {
        setForm(toFormState(payload.submission));
      }
      setLoading(false);
    }

    loadSubmission();
  }, [editId, editToken]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors([]);
    setEditUrl("");

    const payload: AiEmployeeSubmissionInput = {
      id: editId,
      editToken,
      participant: {
        name: form.name,
        company: form.company,
        title: form.title,
        intro: form.intro,
        contact: form.contact,
        consentPublic: form.consentPublic,
      },
      readiness: {
        operatingSystem: form.operatingSystem,
        browser: form.browser,
        codex: form.codex,
        hermes: form.hermes,
        node: form.node,
        git: form.git,
        blockers: form.blockers,
      },
      soloPlan: {
        employeeName: form.employeeName,
        businessScene: form.businessScene,
        input: form.input,
        output: form.output,
        workflow: form.workflow,
        toolsText: form.toolsText,
        successCriteria: form.successCriteria,
        resultUrl: form.soloResultUrl,
      },
      teamPlan: {
        teamGoal: form.teamGoal,
        rolesText: form.rolesText,
        collaborationFlow: form.collaborationFlow,
        humanReviewPoints: form.humanReviewPoints,
        milestones30Day: form.milestones30Day,
        resultUrl: form.teamResultUrl,
      },
    };

    const response = await fetch("/api/ai-employee/submissions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setErrors(result.errors || [result.error || "提交失败"]);
    } else {
      setEditUrl(result.editUrl);
      if (!isEditing) {
        window.history.replaceState(null, "", result.editUrl.replace(window.location.origin, ""));
      }
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-100" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-[#1e477c]">提交进度</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">把你的数字员工岗位说清楚</h2>
          </div>
          <div className="min-w-40 rounded-full bg-slate-100 p-1">
            <div
              className="rounded-full bg-[#1e477c] px-4 py-2 text-center text-sm font-bold text-white transition-all"
              style={{ width: `${Math.max(progress, 24)}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        {editUrl && (
          <div className="mt-6 rounded-2xl border border-[#1e477c]/20 bg-[#1e477c]/5 p-4">
            <p className="font-bold text-[#1e477c]">已保存，先进入审核队列。</p>
            <p className="mt-2 text-sm text-slate-600">请保存这个私密编辑链接，后续可以补成果链接或 30 天团队进展。</p>
            <input
              readOnly
              value={editUrl}
              className="mt-3 w-full rounded-xl border border-[#1e477c]/20 bg-white px-4 py-3 text-sm text-slate-700"
              onFocus={(event) => event.currentTarget.select()}
            />
          </div>
        )}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-950">自我介绍</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="姓名" required>
            <TextInput value={form.name} onChange={(event) => update("name", event.target.value)} />
          </Field>
          <Field label="联系方式" helper="手机号、微信或邮箱，仅后台可见。" required>
            <TextInput value={form.contact} onChange={(event) => update("contact", event.target.value)} />
          </Field>
          <Field label="公司">
            <TextInput value={form.company} onChange={(event) => update("company", event.target.value)} />
          </Field>
          <Field label="职位">
            <TextInput value={form.title} onChange={(event) => update("title", event.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="一句话介绍你和你的业务">
              <TextArea value={form.intro} onChange={(event) => update("intro", event.target.value)} />
            </Field>
          </div>
          <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 md:col-span-2">
            <input
              type="checkbox"
              checked={form.consentPublic}
              onChange={(event) => update("consentPublic", event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-[#1e477c]"
            />
            <span className="text-sm leading-6 text-slate-600">
              我同意在审核通过后公开展示姓名、公司、职位、自我介绍和数字员工计划。联系方式不会公开。
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-950">安装准备</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Field label="操作系统">
            <TextInput value={form.operatingSystem} onChange={(event) => update("operatingSystem", event.target.value)} />
          </Field>
          <Field label="浏览器">
            <ReadinessSelect value={form.browser} onChange={(value) => update("browser", value)} />
          </Field>
          <Field label="Codex">
            <ReadinessSelect value={form.codex} onChange={(value) => update("codex", value)} />
          </Field>
          <Field label="Hermes">
            <ReadinessSelect value={form.hermes} onChange={(value) => update("hermes", value)} />
          </Field>
          <Field label="Node.js">
            <ReadinessSelect value={form.node} onChange={(value) => update("node", value)} />
          </Field>
          <Field label="Git">
            <ReadinessSelect value={form.git} onChange={(value) => update("git", value)} />
          </Field>
          <div className="md:col-span-3">
            <Field label="当前卡点">
              <TextArea value={form.blockers} onChange={(event) => update("blockers", event.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-950">单个数字员工计划</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="数字员工名称" required>
            <TextInput value={form.employeeName} onChange={(event) => update("employeeName", event.target.value)} />
          </Field>
          <Field label="成果链接">
            <TextInput value={form.soloResultUrl} onChange={(event) => update("soloResultUrl", event.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="业务场景">
              <TextArea value={form.businessScene} onChange={(event) => update("businessScene", event.target.value)} />
            </Field>
          </div>
          <Field label="输入是什么">
            <TextArea value={form.input} onChange={(event) => update("input", event.target.value)} />
          </Field>
          <Field label="输出是什么">
            <TextArea value={form.output} onChange={(event) => update("output", event.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="工作流程">
              <TextArea value={form.workflow} onChange={(event) => update("workflow", event.target.value)} />
            </Field>
          </div>
          <Field label="工具清单" helper="一行一个，例如 Codex、Hermes、飞书、多维表格。">
            <TextArea value={form.toolsText} onChange={(event) => update("toolsText", event.target.value)} />
          </Field>
          <Field label="成功标准">
            <TextArea value={form.successCriteria} onChange={(event) => update("successCriteria", event.target.value)} />
          </Field>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-950">数字员工团队计划</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="30 天团队目标">
              <TextArea value={form.teamGoal} onChange={(event) => update("teamGoal", event.target.value)} />
            </Field>
          </div>
          <Field label="团队角色" helper="一行一个数字员工角色。">
            <TextArea value={form.rolesText} onChange={(event) => update("rolesText", event.target.value)} />
          </Field>
          <Field label="团队成果链接">
            <TextInput value={form.teamResultUrl} onChange={(event) => update("teamResultUrl", event.target.value)} />
          </Field>
          <div className="md:col-span-2">
            <Field label="协作链路">
              <TextArea value={form.collaborationFlow} onChange={(event) => update("collaborationFlow", event.target.value)} />
            </Field>
          </div>
          <Field label="人工验收点">
            <TextArea value={form.humanReviewPoints} onChange={(event) => update("humanReviewPoints", event.target.value)} />
          </Field>
          <Field label="30 天里程碑">
            <TextArea value={form.milestones30Day} onChange={(event) => update("milestones30Day", event.target.value)} />
          </Field>
        </div>
      </section>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur md:static md:z-auto md:bg-white md:shadow-sm">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-[#1e477c] px-6 py-4 text-base font-bold text-white transition hover:bg-[#152f54] disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {submitting ? "正在保存" : isEditing ? "保存修改" : "提交并生成编辑链接"}
        </button>
      </div>
    </form>
  );
}
