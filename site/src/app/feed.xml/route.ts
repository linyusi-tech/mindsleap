import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const siteUrl = getSiteUrl();
  const posts = ["zh", "en"]
    .flatMap((locale) => getAllPosts(locale).map((post) => ({ ...post, locale })))
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1))
    .slice(0, 50);

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/${post.locale}/news/${post.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid>${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : "",
        `<category>${escapeXml(post.category)}</category>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    "<title>MindsLeap AI Insights</title>",
    `<link>${escapeXml(siteUrl)}</link>`,
    "<description>MindsLeap AI Insights, Founders Talk, events, and research updates.</description>",
    "<language>zh-CN</language>",
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

