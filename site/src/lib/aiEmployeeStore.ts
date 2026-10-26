import "server-only";

import { randomUUID } from "crypto";
import fs from "fs/promises";
import os from "os";
import path from "path";
import type {
  AiEmployeePublicWork,
  AiEmployeeReadiness,
  AiEmployeeSoloPlan,
  AiEmployeeStore,
  AiEmployeeSubmission,
  AiEmployeeSubmissionInput,
  AiEmployeeTeamPlan,
  ModerationStatus,
  ToolReadiness,
} from "@/lib/aiEmployeeTypes";

const STORE_FILE_NAME = "submissions.json";
const TOOL_READINESS: ToolReadiness[] = ["ready", "needs-help", "not-started"];
const MODERATION_STATUSES: ModerationStatus[] = ["submitted", "approved", "hidden"];
let mutationQueue = Promise.resolve();

function nowIso() {
  return new Date().toISOString();
}

function getDataDir() {
  return (
    process.env.AI_EMPLOYEE_DATA_DIR ||
    path.join(os.tmpdir(), "mindsleap-ai-employee-data")
  );
}

function getStorePath() {
  return path.join(getDataDir(), STORE_FILE_NAME);
}

async function ensureDataDir() {
  await fs.mkdir(getDataDir(), { recursive: true });
}

function cleanText(value: unknown, maxLength = 2000) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function cleanBoolean(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function cleanReadiness(value: unknown): ToolReadiness {
  return TOOL_READINESS.includes(value as ToolReadiness)
    ? (value as ToolReadiness)
    : "not-started";
}

function cleanStringList(value: unknown, maxItems = 12) {
  const rawItems = Array.isArray(value)
    ? value
    : String(value ?? "")
        .split(/\n|,|，|;|；/)
        .map((item) => item.trim());

  return Array.from(
    new Set(
      rawItems
        .map((item) => cleanText(item, 80))
        .filter(Boolean)
    )
  ).slice(0, maxItems);
}

function slugify(value: string) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return ascii || "work";
}

function toPublicWork(submission: AiEmployeeSubmission): AiEmployeePublicWork {
  return {
    id: submission.id,
    slug: submission.slug,
    participant: {
      name: submission.participant.name,
      company: submission.participant.company,
      title: submission.participant.title,
      intro: submission.participant.intro,
      consentPublic: submission.participant.consentPublic,
    },
    soloPlan: submission.soloPlan,
    teamPlan: submission.teamPlan,
    moderation: {
      status: submission.moderation.status,
      tags: submission.moderation.tags,
      featured: submission.moderation.featured,
      reviewedAt: submission.moderation.reviewedAt,
    },
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
    publishedAt: submission.publishedAt,
  };
}

async function readStore(): Promise<AiEmployeeStore> {
  try {
    const raw = await fs.readFile(getStorePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<AiEmployeeStore>;
    return {
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
      updatedAt: parsed.updatedAt || "",
    };
  } catch {
    return { submissions: [], updatedAt: "" };
  }
}

async function writeStore(store: AiEmployeeStore) {
  await ensureDataDir();
  const storePath = getStorePath();
  const tempPath = `${storePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(
    tempPath,
    JSON.stringify({ ...store, updatedAt: nowIso() }, null, 2)
  );
  await fs.rename(tempPath, storePath);
}

async function runMutation<T>(operation: () => Promise<T>) {
  const result = mutationQueue.then(operation, operation);
  mutationQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

function buildParticipant(input: AiEmployeeSubmissionInput, existing?: AiEmployeeSubmission) {
  const source = input.participant || {};
  return {
    name: cleanText(source.name ?? existing?.participant.name, 80),
    company: cleanText(source.company ?? existing?.participant.company, 120),
    title: cleanText(source.title ?? existing?.participant.title, 120),
    intro: cleanText(source.intro ?? existing?.participant.intro, 600),
    contact: cleanText(source.contact ?? existing?.participant.contact, 160),
    consentPublic: cleanBoolean(source.consentPublic ?? existing?.participant.consentPublic),
  };
}

function buildReadiness(input: AiEmployeeSubmissionInput, existing?: AiEmployeeSubmission): AiEmployeeReadiness {
  const source = input.readiness || {};
  return {
    operatingSystem: cleanText(source.operatingSystem ?? existing?.readiness.operatingSystem, 80),
    browser: cleanReadiness(source.browser ?? existing?.readiness.browser),
    codex: cleanReadiness(source.codex ?? existing?.readiness.codex),
    hermes: cleanReadiness(source.hermes ?? existing?.readiness.hermes),
    node: cleanReadiness(source.node ?? existing?.readiness.node),
    git: cleanReadiness(source.git ?? existing?.readiness.git),
    blockers: cleanText(source.blockers ?? existing?.readiness.blockers, 1000),
  };
}

function buildSoloPlan(input: AiEmployeeSubmissionInput, existing?: AiEmployeeSubmission): AiEmployeeSoloPlan {
  const source = input.soloPlan || {};
  return {
    employeeName: cleanText(source.employeeName ?? existing?.soloPlan.employeeName, 120),
    businessScene: cleanText(source.businessScene ?? existing?.soloPlan.businessScene, 600),
    input: cleanText(source.input ?? existing?.soloPlan.input, 600),
    output: cleanText(source.output ?? existing?.soloPlan.output, 600),
    workflow: cleanText(source.workflow ?? existing?.soloPlan.workflow, 1200),
    tools: cleanStringList(source.tools ?? source.toolsText ?? existing?.soloPlan.tools),
    successCriteria: cleanText(source.successCriteria ?? existing?.soloPlan.successCriteria, 800),
    resultUrl: cleanText(source.resultUrl ?? existing?.soloPlan.resultUrl, 300),
  };
}

function buildTeamPlan(input: AiEmployeeSubmissionInput, existing?: AiEmployeeSubmission): AiEmployeeTeamPlan {
  const source = input.teamPlan || {};
  return {
    teamGoal: cleanText(source.teamGoal ?? existing?.teamPlan.teamGoal, 800),
    roles: cleanStringList(source.roles ?? source.rolesText ?? existing?.teamPlan.roles, 16),
    collaborationFlow: cleanText(source.collaborationFlow ?? existing?.teamPlan.collaborationFlow, 1200),
    humanReviewPoints: cleanText(source.humanReviewPoints ?? existing?.teamPlan.humanReviewPoints, 800),
    milestones30Day: cleanText(source.milestones30Day ?? existing?.teamPlan.milestones30Day, 1000),
    resultUrl: cleanText(source.resultUrl ?? existing?.teamPlan.resultUrl, 300),
  };
}

function validateSubmission(submission: AiEmployeeSubmission) {
  const errors: string[] = [];

  if (!submission.participant.name) errors.push("请填写姓名");
  if (!submission.participant.contact) errors.push("请填写联系方式");
  if (!submission.soloPlan.employeeName && !submission.teamPlan.teamGoal) {
    errors.push("请至少填写单个数字员工名称或数字员工团队目标");
  }
  if (!submission.participant.consentPublic) {
    errors.push("请确认可在作品广场公开展示非联系方式信息");
  }

  return errors;
}

function buildUniqueSlug(
  submission: Pick<AiEmployeeSubmission, "id" | "participant" | "soloPlan" | "teamPlan">,
  existingSlugs: Set<string>,
  currentSlug?: string
) {
  if (currentSlug && !existingSlugs.has(currentSlug)) return currentSlug;
  const label =
    submission.soloPlan.employeeName ||
    submission.teamPlan.teamGoal ||
    submission.participant.name ||
    "work";
  const base = slugify(label);
  const suffix = submission.id.slice(0, 8);
  let candidate = `${base}-${suffix}`;
  let index = 2;

  while (existingSlugs.has(candidate)) {
    candidate = `${base}-${suffix}-${index}`;
    index += 1;
  }

  return candidate;
}

export function getAiEmployeeAdminToken() {
  if (process.env.AI_EMPLOYEE_ADMIN_TOKEN) return process.env.AI_EMPLOYEE_ADMIN_TOKEN;
  return process.env.NODE_ENV === "production" ? "" : "mindsleap-admin";
}

export function hasAiEmployeeAdminAccess(request: Request) {
  const expected = getAiEmployeeAdminToken();
  if (!expected) return false;

  const url = new URL(request.url);
  const token =
    request.headers.get("x-ai-employee-admin-token") ||
    url.searchParams.get("admin") ||
    "";

  return token === expected;
}

export async function listAiEmployeeSubmissions() {
  const store = await readStore();
  return [...store.submissions].sort((left, right) =>
    right.updatedAt.localeCompare(left.updatedAt)
  );
}

export async function listAiEmployeePublicWorks(limit?: number) {
  const submissions = await listAiEmployeeSubmissions();
  const works = submissions
    .filter(
      (submission) =>
        submission.moderation.status === "approved" &&
        submission.participant.consentPublic
    )
    .sort((left, right) => {
      if (left.moderation.featured !== right.moderation.featured) {
        return left.moderation.featured ? -1 : 1;
      }
      return right.publishedAt.localeCompare(left.publishedAt);
    })
    .map(toPublicWork);

  return typeof limit === "number" ? works.slice(0, limit) : works;
}

export async function getAiEmployeePublicWorkBySlug(slug: string) {
  const works = await listAiEmployeePublicWorks();
  return works.find((work) => work.slug === slug) || null;
}

export async function getAiEmployeeSubmissionForEdit(id: string, editToken: string) {
  const store = await readStore();
  const submission = store.submissions.find((item) => item.id === id);
  if (!submission || submission.editToken !== editToken) return null;
  return submission;
}

export async function saveAiEmployeeSubmission(input: AiEmployeeSubmissionInput) {
  return runMutation(async () => {
    const store = await readStore();
    const existing = input.id
      ? store.submissions.find((submission) => submission.id === input.id)
      : undefined;

    if (existing && existing.editToken !== input.editToken) {
      return { ok: false as const, errors: ["编辑链接无效或已过期"] };
    }

    const timestamp = nowIso();
    const id = existing?.id || randomUUID();
    const draft: AiEmployeeSubmission = {
      id,
      slug: existing?.slug || "",
      editToken: existing?.editToken || randomUUID(),
      participant: buildParticipant(input, existing),
      readiness: buildReadiness(input, existing),
      soloPlan: buildSoloPlan(input, existing),
      teamPlan: buildTeamPlan(input, existing),
      moderation: {
        status: "submitted",
        tags: existing?.moderation.tags || [],
        featured: existing?.moderation.featured || false,
        adminNote: existing?.moderation.adminNote || "",
        reviewedAt: "",
      },
      createdAt: existing?.createdAt || timestamp,
      updatedAt: timestamp,
      publishedAt: "",
    };

    const existingSlugs = new Set(
      store.submissions
        .filter((submission) => submission.id !== id)
        .map((submission) => submission.slug)
    );
    draft.slug = buildUniqueSlug(draft, existingSlugs, existing?.slug);

    const errors = validateSubmission(draft);
    if (errors.length) return { ok: false as const, errors };

    const nextSubmissions = existing
      ? store.submissions.map((submission) => (submission.id === id ? draft : submission))
      : [draft, ...store.submissions];

    await writeStore({ submissions: nextSubmissions, updatedAt: timestamp });

    return { ok: true as const, submission: draft };
  });
}

export async function reviewAiEmployeeSubmission(input: {
  id: string;
  status: ModerationStatus;
  tags?: unknown;
  featured?: unknown;
  adminNote?: unknown;
}) {
  return runMutation(async () => {
    if (!MODERATION_STATUSES.includes(input.status)) {
      return { ok: false as const, errors: ["不支持的审核状态"] };
    }

    const store = await readStore();
    const target = store.submissions.find((submission) => submission.id === input.id);
    if (!target) return { ok: false as const, errors: ["作品不存在"] };

    const timestamp = nowIso();
    const reviewed: AiEmployeeSubmission = {
      ...target,
      moderation: {
        status: input.status,
        tags: cleanStringList(input.tags ?? target.moderation.tags, 12),
        featured: cleanBoolean(input.featured ?? target.moderation.featured),
        adminNote: cleanText(input.adminNote ?? target.moderation.adminNote, 1000),
        reviewedAt: timestamp,
      },
      updatedAt: timestamp,
      publishedAt: input.status === "approved" ? target.publishedAt || timestamp : "",
    };

    await writeStore({
      submissions: store.submissions.map((submission) =>
        submission.id === reviewed.id ? reviewed : submission
      ),
      updatedAt: timestamp,
    });

    return { ok: true as const, submission: reviewed };
  });
}

function csvCell(value: unknown) {
  const text = Array.isArray(value) ? value.join(" / ") : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function buildAiEmployeeCsv(submissions: AiEmployeeSubmission[]) {
  const headers = [
    "状态",
    "姓名",
    "公司",
    "职位",
    "联系方式",
    "自我介绍",
    "系统",
    "Codex",
    "Hermes",
    "Node",
    "Git",
    "安装卡点",
    "单个数字员工",
    "业务场景",
    "输入",
    "输出",
    "流程",
    "工具",
    "成功标准",
    "单人成果链接",
    "团队目标",
    "团队角色",
    "协作链路",
    "人工验收点",
    "30天里程碑",
    "团队成果链接",
    "标签",
    "创建时间",
    "更新时间",
  ];

  const rows = submissions.map((submission) => [
    submission.moderation.status,
    submission.participant.name,
    submission.participant.company,
    submission.participant.title,
    submission.participant.contact,
    submission.participant.intro,
    submission.readiness.operatingSystem,
    submission.readiness.codex,
    submission.readiness.hermes,
    submission.readiness.node,
    submission.readiness.git,
    submission.readiness.blockers,
    submission.soloPlan.employeeName,
    submission.soloPlan.businessScene,
    submission.soloPlan.input,
    submission.soloPlan.output,
    submission.soloPlan.workflow,
    submission.soloPlan.tools,
    submission.soloPlan.successCriteria,
    submission.soloPlan.resultUrl,
    submission.teamPlan.teamGoal,
    submission.teamPlan.roles,
    submission.teamPlan.collaborationFlow,
    submission.teamPlan.humanReviewPoints,
    submission.teamPlan.milestones30Day,
    submission.teamPlan.resultUrl,
    submission.moderation.tags,
    submission.createdAt,
    submission.updatedAt,
  ]);

  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function buildAiEmployeeFeishuPayload(submissions: AiEmployeeSubmission[]) {
  return submissions.map((submission) => ({
    fields: {
      活动: "AI数字员工实战营",
      审核状态: submission.moderation.status,
      姓名: submission.participant.name,
      公司: submission.participant.company,
      职务: submission.participant.title,
      联系方式: submission.participant.contact,
      自我介绍: submission.participant.intro,
      操作系统: submission.readiness.operatingSystem,
      Codex安装状态: submission.readiness.codex,
      Hermes安装状态: submission.readiness.hermes,
      安装卡点: submission.readiness.blockers,
      单个数字员工: submission.soloPlan.employeeName,
      单个员工计划: submission.soloPlan.businessScene,
      单人成果链接: submission.soloPlan.resultUrl,
      团队目标: submission.teamPlan.teamGoal,
      团队角色: submission.teamPlan.roles.join("\n"),
      团队协作链路: submission.teamPlan.collaborationFlow,
      三十天里程碑: submission.teamPlan.milestones30Day,
      团队成果链接: submission.teamPlan.resultUrl,
      公开链接:
        submission.moderation.status === "approved" && submission.participant.consentPublic
          ? `/event/ai-employee/work/${submission.slug}`
          : "",
      标签: submission.moderation.tags.join(", "),
    },
  }));
}
