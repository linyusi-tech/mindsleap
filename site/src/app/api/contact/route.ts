import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getContactEmail } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL || "MindsLeap <contact@mindsleap.cn>";

const INTEREST_LABELS: Record<string, string> = {
  "ai-club": "AI俱乐部",
  "ai-transformation": "AI转型服务",
  accelerator: "创业加速",
  "global-growth": "出海服务",
  "media-research": "动态 / 媒体 / 研究合作",
  "government-park": "政府 / 园区合作",
  incubation: "创业加速",
  training: "AI转型服务",
  "study-tours": "出海服务",
  other: "其他合作",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const interestLabel = INTEREST_LABELS[interest] || interest || "未选择";

    const { error } = await resend.emails.send({
      from: contactFromEmail,
      to: [process.env.CONTACT_EMAIL || getContactEmail()],
      replyTo: email,
      subject: `[MindsLeap] 新咨询 - ${name} | ${interestLabel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e477c; border-bottom: 2px solid #1e477c; padding-bottom: 10px;">
            MindsLeap 新客户咨询
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #333;">姓名</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">邮箱</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">
                <a href="mailto:${email}" style="color: #1e477c;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">公司</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${company || "未填写"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">职位</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${role || "未填写"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">感兴趣业务</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${interestLabel}</td>
            </tr>
          </table>
          ${
            message
              ? `<div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
                   <p style="font-weight: bold; color: #333; margin: 0 0 8px 0;">留言内容：</p>
                   <p style="color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
                 </div>`
              : ""
          }
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            此邮件由 MindsLeap 官网联系表单自动发送
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
