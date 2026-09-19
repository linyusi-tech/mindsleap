import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { acceptsMarkdown, isAgentContentPath } from "./lib/agent-routing";

const intlMiddleware = createMiddleware(routing);
const CASE_ACCESS_COOKIE = "mindsleap_case_access";
const CASE_ACCESS_VALUE = "mindsleapcase";

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isCasePath = pathname === "/case" || pathname.startsWith("/case/");

  if (isCasePath) {
    const hasAccess = request.cookies.get(CASE_ACCESS_COOKIE)?.value === CASE_ACCESS_VALUE;

    if (hasAccess) {
      return NextResponse.next();
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/case-login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/event/ai-employee" || pathname.startsWith("/event/ai-employee/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/zh${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (pathname === "/event/qinghuaemba" || pathname === "/event/qinghuaemba/") {
    const url = request.nextUrl.clone();
    url.pathname = "/event/qinghuaemba/index.html";
    return NextResponse.rewrite(url);
  }

  if (isAgentContentPath(pathname) && acceptsMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/agent-content${pathname.replace(/\/$/, "")}`;
    url.search = "";
    return NextResponse.rewrite(url);
  }

  const response = intlMiddleware(request);

  if (isAgentContentPath(pathname)) {
    const canonicalUrl = new URL(pathname, request.nextUrl.origin).toString();
    response.headers.set("Link", `<${canonicalUrl}>; rel="alternate"; type="text/markdown"`);
    response.headers.set("Vary", "Accept");
  }

  return response;
}

export const config = {
  matcher: [
    "/case/:path*",
    "/((?!api|_next|_vercel|design-system|decks|case-login|product|proposal|poster|manuals|office(?:/|$)|.*\\..*).*)",
  ],
};
