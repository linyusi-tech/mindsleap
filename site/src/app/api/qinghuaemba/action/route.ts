import { NextRequest, NextResponse } from "next/server";
import {
  EventInputError,
  addComment,
  buildEventState,
  loginUser,
  logoutUser,
  registerUser,
  saveNps,
  saveWork,
  sessionCookieName,
  sessionCookieOptions,
  setSecondBrainComplete,
} from "@/lib/qinghuaEmbaStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ActionBody = {
  action?: string;
  input?: Record<string, unknown>;
  phone?: unknown;
  password?: unknown;
  workId?: unknown;
  body?: unknown;
  complete?: unknown;
};

export async function POST(request: NextRequest) {
  let activeToken = request.cookies.get(sessionCookieName())?.value || null;
  try {
    const payload = await request.json() as ActionBody;
    let result: unknown;
    let clearCookie = false;

    switch (payload.action) {
      case "register": {
        const created = registerUser(payload.input || {});
        activeToken = created.token;
        result = created.user;
        break;
      }
      case "login": {
        const loggedIn = loginUser(payload.phone, payload.password);
        activeToken = loggedIn.token;
        result = loggedIn.user;
        break;
      }
      case "logout":
        logoutUser(activeToken);
        activeToken = null;
        clearCookie = true;
        break;
      case "saveWork":
        result = saveWork(activeToken, payload.input || {});
        break;
      case "addComment":
        result = addComment(activeToken, payload.workId, payload.body);
        break;
      case "setSecondBrainComplete":
        setSecondBrainComplete(activeToken, payload.complete);
        break;
      case "saveNps":
        saveNps(activeToken, payload.input || {});
        break;
      default:
        throw new EventInputError("不支持的操作");
    }

    const response = NextResponse.json(
      { state: buildEventState(activeToken), result },
      { headers: { "cache-control": "no-store" } },
    );
    if (activeToken && (payload.action === "register" || payload.action === "login")) {
      response.cookies.set(sessionCookieName(), activeToken, sessionCookieOptions());
    }
    if (clearCookie) response.cookies.delete(sessionCookieName());
    return response;
  } catch (error) {
    const status = error instanceof EventInputError ? error.status : 500;
    const message = error instanceof Error ? error.message : "操作失败，请稍后重试";
    return NextResponse.json(
      { error: status === 500 ? "操作失败，请稍后重试" : message },
      { status, headers: { "cache-control": "no-store" } },
    );
  }
}
