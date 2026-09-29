import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const tokenUrl = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";
const apiRoot = "https://open.feishu.cn/open-apis/bitable/v1";

function clean(value: unknown, max = 1000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}

async function createFeishuRecord(fields: Record<string, string | number>) {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  const base = process.env.COURSE_LEADS_BASE;
  const table = process.env.COURSE_LEADS_TABLE;
  if (!appId || !appSecret || !base || !table) return false;

  const tokenResponse = await fetch(tokenUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ app_id: appId, app_secret: appSecret }), cache: "no-store" });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || token.code !== 0) throw new Error(`Feishu token failed: ${token.code}`);
  const response = await fetch(`${apiRoot}/apps/${encodeURIComponent(base)}/tables/${encodeURIComponent(table)}/records`, { method: "POST", headers: { Authorization: `Bearer ${token.tenant_access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ fields }), cache: "no-store" });
  const result = await response.json();
  if (!response.ok || result.code !== 0) throw new Error(`Feishu record failed: ${result.code}`);
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 40);
    const company = clean(body.company, 100);
    const contact = clean(body.contact, 120);
    if (!name || !company || !contact) return NextResponse.json({ error: "请填写称呼、企业名称和联系方式" }, { status: 400 });
    if (clean(body.website, 100)) return NextResponse.json({ success: true });

    const fields = {
      姓名: name,
      企业名称: company,
      联系方式: contact,
      关注方向: clean(body.interest, 100),
      业务问题: clean(body.challenge, 1000),
      额外员工: Number(body.extraMembers) || 0,
      参考费用: Number(body.estimatedPrice) || 128000,
      来源: clean(body.source, 200),
      提交时间: new Date().toISOString(),
      状态: "新线索",
    };
    let savedToFeishu = false;
    try {
      savedToFeishu = await createFeishuRecord(fields);
    } catch (error) {
      console.error("Course lead Feishu error", error);
    }

    const rows = Object.entries(fields).map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(String(value)) || "未填写"}</td></tr>`).join("");
    const email = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "MindsLeap <contact@mindsleap.ai>",
      to: ["mindsleap@gmail.com", "Lincoln@mindsleap.group"],
      subject: `[课程线索] AI 原生组织跃迁实战营 · ${name} · ${company}`,
      html: `<div style="font-family:sans-serif"><h2>AI 原生组织跃迁实战营新咨询</h2><table style="border-collapse:collapse">${rows}</table><p style="color:#666">飞书入库：${savedToFeishu ? "成功" : "未配置或失败，请查看服务端日志"}</p></div>`,
      replyTo: contact.includes("@") ? contact : undefined,
    });
    if (email.error && !savedToFeishu) return NextResponse.json({ error: "线索暂时未能提交，请直接发邮件联系团队" }, { status: 502 });
    return NextResponse.json({ success: true, savedToFeishu, notified: !email.error });
  } catch (error) {
    console.error("Course lead API error", error);
    return NextResponse.json({ error: "线索提交失败，请稍后重试" }, { status: 500 });
  }
}
