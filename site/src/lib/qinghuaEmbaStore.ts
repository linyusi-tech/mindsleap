import "server-only";

import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import Database from "better-sqlite3";
import fs from "fs";
import os from "os";
import path from "path";

const SESSION_COOKIE = "mindsleap_qinghuaemba_sid";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const MAX_IMAGE_BYTES = 1_250_000;

type WorkKind = "website" | "assistant";

type SafeUser = {
  id: string;
  phone: string;
  displayName: string;
};

type PublicComment = {
  id: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type PublicWork = {
  id: string;
  kind: WorkKind;
  authorId: string;
  authorName: string;
  title: string;
  summary: string;
  url: string;
  imageData: string;
  publishedAt: string;
  comments: PublicComment[];
};

type EventState = {
  users: SafeUser[];
  sessionUserId: string | null;
  works: PublicWork[];
  secondBrainCompleteByUser: Record<string, boolean>;
  npsByUser: Record<string, { score: number; highlight: string; improve: string; submittedAt: string }>;
};

type UserRow = {
  id: string;
  phone: string;
  password_hash: string;
  display_name: string;
};

type WorkRow = {
  id: string;
  kind: WorkKind;
  author_id: string;
  author_name: string;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
};

type CommentRow = {
  id: string;
  work_id: string;
  author_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

type ProgressRow = {
  second_brain_complete: number;
  nps_score: number | null;
  nps_highlight: string | null;
  nps_improve: string | null;
  nps_submitted_at: string | null;
};

const SEED_WORKS = [
  {
    id: "seed-website-yusi",
    order: 1,
    authorName: "MindsLeap",
    title: "MindsLeap 心智悦动",
    summary: "企业 AI 转型与 AI 原生创业加速平台，连接企业家、产业场景与全球市场。",
    url: "https://www.mindsleap.cn/zh",
    imageUrl: "/event/qinghuaemba/assets/event/demo-mindsleap.svg",
    publishedAt: "2026-09-22T09:30:00.000Z",
  },
  {
    id: "seed-website-xiyoujikaorou",
    order: 2,
    authorName: "现场 Demo",
    title: "西游记烤肉",
    summary: "以西游记为主题，把品牌氛围与餐饮体验做成可直接浏览的互动网站。",
    url: "https://xiyoujikaorou.vercel.app/",
    imageUrl: "/event/qinghuaemba/assets/event/demo-xiyoujikaorou.svg",
    publishedAt: "2026-09-22T09:40:00.000Z",
  },
  {
    id: "seed-website-bobodada",
    order: 3,
    authorName: "AI雨丝",
    title: "波波 36 周岁生日惊喜",
    summary: "把生日祝福、互动吹蜡烛与共同记忆做成一份可以打开的网站礼物。",
    url: "https://www.bobodada.cn/",
    imageUrl: "/event/qinghuaemba/assets/event/demo-bobodada.svg",
    publishedAt: "2026-09-22T09:50:00.000Z",
  },
] as const;

let database: Database.Database | null = null;

function dataDirectory() {
  return process.env.QINGHUAEMBA_DATA_DIR || path.join(os.tmpdir(), "mindsleap-qinghuaemba");
}

function getDatabase() {
  if (database) return database;
  const directory = dataDirectory();
  fs.mkdirSync(directory, { recursive: true });
  database = new Database(path.join(directory, "qinghuaemba.sqlite"));
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      avatar_data TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS works (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL CHECK(kind IN ('website', 'assistant')),
      author_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      url TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL,
      image_mime TEXT,
      image_blob BLOB,
      published_at TEXT NOT NULL,
      is_seed INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      work_id TEXT NOT NULL REFERENCES works(id) ON DELETE CASCADE,
      author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      second_brain_complete INTEGER NOT NULL DEFAULT 0,
      nps_score INTEGER,
      nps_highlight TEXT,
      nps_improve TEXT,
      nps_submitted_at TEXT,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions(expires_at);
    CREATE INDEX IF NOT EXISTS comments_work_idx ON comments(work_id, created_at);
  `);

  const seed = database.prepare(`
    INSERT INTO works (
      id, kind, author_id, author_name, title, summary, url, image_url,
      published_at, is_seed, display_order
    ) VALUES (
      @id, 'website', 'seed-system', @authorName, @title, @summary, @url, @imageUrl,
      @publishedAt, 1, @order
    )
    ON CONFLICT(id) DO UPDATE SET
      author_name = excluded.author_name,
      title = excluded.title,
      summary = excluded.summary,
      url = excluded.url,
      image_url = excluded.image_url,
      published_at = excluded.published_at,
      is_seed = 1,
      display_order = excluded.display_order
  `);
  const seedAll = database.transaction(() => SEED_WORKS.forEach((work) => seed.run(work)));
  seedAll();
  return database;
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, maxLength);
}

function cleanPhone(value: unknown) {
  const phone = cleanText(value, 20);
  if (!/^1\d{10}$/.test(phone)) throw new EventInputError("请填写有效的手机号");
  return phone;
}

function hashPassword(passwordInput: unknown) {
  const password = cleanText(passwordInput, 128);
  if (password.length < 4) throw new EventInputError("密码至少需要 4 位");
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function matchesPassword(passwordInput: unknown, stored: string) {
  const password = cleanText(passwordInput, 128);
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function createSession(userId: string) {
  const db = getDatabase();
  const token = randomBytes(32).toString("base64url");
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(createdAt.toISOString());
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .run(hashToken(token), userId, expiresAt.toISOString(), createdAt.toISOString());
  return token;
}

function safeUser(user: UserRow): SafeUser {
  return { id: user.id, phone: user.phone, displayName: user.display_name };
}

function userForToken(token?: string | null) {
  if (!token) return null;
  const db = getDatabase();
  return db.prepare(`
    SELECT users.id, users.phone, users.password_hash, users.display_name
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?
  `).get(hashToken(token), new Date().toISOString()) as UserRow | undefined || null;
}

function parseImageData(value: unknown) {
  const input = String(value ?? "");
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(input);
  if (!match) throw new EventInputError("请上传 PNG、JPG 或 WebP 格式的作品截图");
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) {
    throw new EventInputError("作品截图过大，请压缩到 1.2MB 以内后重试");
  }
  return { mime: match[1], bytes };
}

function cleanUrl(value: unknown) {
  const input = cleanText(value, 600);
  if (!input) return "";
  try {
    const url = new URL(input);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    return url.toString();
  } catch {
    throw new EventInputError("请填写以 http:// 或 https:// 开头的有效链接");
  }
}

export class EventInputError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function registerUser(input: Record<string, unknown>) {
  const db = getDatabase();
  const phone = cleanPhone(input.phone);
  const displayName = cleanText(input.displayName, 80);
  if (!displayName) throw new EventInputError("请填写活动称呼");
  if (db.prepare("SELECT 1 FROM users WHERE phone = ?").get(phone)) {
    throw new EventInputError("该手机号已经注册，请直接登录", 409);
  }
  const user: UserRow = {
    id: `user-${randomUUID()}`,
    phone,
    password_hash: hashPassword(input.password),
    display_name: displayName,
  };
  db.prepare(`INSERT INTO users (id, phone, password_hash, display_name, created_at) VALUES (?, ?, ?, ?, ?)`)
    .run(user.id, user.phone, user.password_hash, user.display_name, new Date().toISOString());
  return { user: safeUser(user), token: createSession(user.id) };
}

export function loginUser(phoneInput: unknown, passwordInput: unknown) {
  const phone = cleanPhone(phoneInput);
  const user = getDatabase().prepare("SELECT id, phone, password_hash, display_name FROM users WHERE phone = ?")
    .get(phone) as UserRow | undefined;
  if (!user || !matchesPassword(passwordInput, user.password_hash)) {
    throw new EventInputError("手机号或密码不正确", 401);
  }
  return { user: safeUser(user), token: createSession(user.id) };
}

export function logoutUser(token?: string | null) {
  if (token) getDatabase().prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
}

export function requireUser(token?: string | null) {
  const user = userForToken(token);
  if (!user) throw new EventInputError("请先登录", 401);
  return user;
}

export function saveWork(token: string | null | undefined, input: Record<string, unknown>) {
  const user = requireUser(token);
  const db = getDatabase();
  const kind = input.kind === "assistant" ? "assistant" : input.kind === "website" ? "website" : null;
  if (!kind) throw new EventInputError("作品类型不正确");
  const title = cleanText(input.title, 140);
  if (!title) throw new EventInputError("请填写作品名称");
  const summary = cleanText(input.summary, 1200);
  const url = cleanUrl(input.url);
  const image = parseImageData(input.imageData);
  const id = `${kind}-${randomUUID()}`;
  const publishedAt = new Date().toISOString();
  const imageUrl = `/api/qinghuaemba/images/${encodeURIComponent(id)}`;
  db.prepare(`
    INSERT INTO works (
      id, kind, author_id, author_name, title, summary, url, image_url,
      image_mime, image_blob, published_at, is_seed, display_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)
  `).run(id, kind, user.id, user.display_name, title, summary, url, imageUrl, image.mime, image.bytes, publishedAt);
  return getPublicWork(id);
}

export function addComment(token: string | null | undefined, workIdInput: unknown, bodyInput: unknown) {
  const user = requireUser(token);
  const db = getDatabase();
  const workId = cleanText(workIdInput, 120);
  if (!db.prepare("SELECT 1 FROM works WHERE id = ?").get(workId)) throw new EventInputError("作品不存在", 404);
  const body = cleanText(bodyInput, 1200);
  if (!body) throw new EventInputError("请输入评论");
  db.prepare(`INSERT INTO comments (id, work_id, author_id, author_name, body, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(`comment-${randomUUID()}`, workId, user.id, user.display_name, body, new Date().toISOString());
  return getPublicWork(workId);
}

export function setSecondBrainComplete(token: string | null | undefined, complete: unknown) {
  const user = requireUser(token);
  const db = getDatabase();
  db.prepare(`
    INSERT INTO progress (user_id, second_brain_complete, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET second_brain_complete = excluded.second_brain_complete, updated_at = excluded.updated_at
  `).run(user.id, complete === true ? 1 : 0, new Date().toISOString());
}

export function saveNps(token: string | null | undefined, input: Record<string, unknown>) {
  const user = requireUser(token);
  const score = Number(input.score);
  if (!Number.isInteger(score) || score < 0 || score > 10) throw new EventInputError("请选择 0 到 10 分");
  const highlight = cleanText(input.highlight, 2000);
  const improve = cleanText(input.improve, 2000);
  const submittedAt = new Date().toISOString();
  getDatabase().prepare(`
    INSERT INTO progress (user_id, second_brain_complete, nps_score, nps_highlight, nps_improve, nps_submitted_at, updated_at)
    VALUES (?, 0, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      nps_score = excluded.nps_score,
      nps_highlight = excluded.nps_highlight,
      nps_improve = excluded.nps_improve,
      nps_submitted_at = excluded.nps_submitted_at,
      updated_at = excluded.updated_at
  `).run(user.id, score, highlight, improve, submittedAt, submittedAt);
}

function getPublicWork(id: string) {
  const db = getDatabase();
  const row = db.prepare(`
    SELECT id, kind, author_id, author_name, title, summary, url, image_url, published_at
    FROM works WHERE id = ?
  `).get(id) as WorkRow | undefined;
  if (!row) throw new EventInputError("作品不存在", 404);
  const comments = db.prepare(`
    SELECT id, work_id, author_id, author_name, body, created_at
    FROM comments WHERE work_id = ? ORDER BY created_at ASC
  `).all(id) as CommentRow[];
  return mapWork(row, comments);
}

function mapWork(row: WorkRow, comments: CommentRow[]): PublicWork {
  return {
    id: row.id,
    kind: row.kind,
    authorId: row.author_id,
    authorName: row.author_name,
    title: row.title,
    summary: row.summary,
    url: row.url,
    imageData: row.image_url,
    publishedAt: row.published_at,
    comments: comments.filter((comment) => comment.work_id === row.id).map((comment) => ({
      id: comment.id,
      authorId: comment.author_id,
      authorName: comment.author_name,
      body: comment.body,
      createdAt: comment.created_at,
    })),
  };
}

export function buildEventState(token?: string | null): EventState {
  const db = getDatabase();
  const user = userForToken(token);
  const workRows = db.prepare(`
    SELECT id, kind, author_id, author_name, title, summary, url, image_url, published_at
    FROM works
    ORDER BY is_seed ASC, CASE WHEN is_seed = 1 THEN display_order END ASC, published_at DESC
  `).all() as WorkRow[];
  const comments = db.prepare(`
    SELECT id, work_id, author_id, author_name, body, created_at
    FROM comments ORDER BY created_at ASC
  `).all() as CommentRow[];
  const state: EventState = {
    users: user ? [safeUser(user)] : [],
    sessionUserId: user?.id || null,
    works: workRows.map((work) => mapWork(work, comments)),
    secondBrainCompleteByUser: {},
    npsByUser: {},
  };
  if (!user) return state;

  const progress = db.prepare(`
    SELECT second_brain_complete, nps_score, nps_highlight, nps_improve, nps_submitted_at
    FROM progress WHERE user_id = ?
  `).get(user.id) as ProgressRow | undefined;
  if (progress?.second_brain_complete) state.secondBrainCompleteByUser[user.id] = true;
  if (progress?.nps_score !== null && progress?.nps_score !== undefined && progress.nps_submitted_at) {
    state.npsByUser[user.id] = {
      score: progress.nps_score,
      highlight: progress.nps_highlight || "",
      improve: progress.nps_improve || "",
      submittedAt: progress.nps_submitted_at,
    };
  }
  return state;
}

export function getWorkImage(idInput: string) {
  const id = cleanText(idInput, 120);
  return getDatabase().prepare("SELECT image_mime, image_blob FROM works WHERE id = ? AND image_blob IS NOT NULL")
    .get(id) as { image_mime: string; image_blob: Buffer } | undefined;
}

export function databaseHealth() {
  const db = getDatabase();
  const row = db.prepare("SELECT COUNT(*) AS count FROM works").get() as { count: number };
  return { ok: true, database: "sqlite", works: row.count };
}
