import { getAgentDocument } from "@/lib/agent-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { path } = await params;
  const pathname = `/${path.join("/")}`;
  const document = getAgentDocument(pathname);

  if (!document) {
    return new Response("Agent-readable content not found.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return new Response(`${document.body}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Location": document.canonicalUrl,
      "Link": `<${document.canonicalUrl}>; rel="canonical", <${document.canonicalUrl}>; rel="alternate"; type="text/html"`,
      "Vary": "Accept",
      "X-Content-Type-Options": "nosniff",
      "X-MindsLeap-Agent-Content": "markdown-v1",
    },
  });
}
