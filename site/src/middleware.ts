import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/event/qinghuaemba" || request.nextUrl.pathname === "/event/qinghuaemba/") {
    const url = request.nextUrl.clone();
    url.pathname = "/event/qinghuaemba/index.html";
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|design-system|decks|case|product|proposal|poster|menu|manuals|codex-installation|.*\\..*).*)"],
};
