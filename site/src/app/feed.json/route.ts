import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const posts = ["zh", "en"]
    .flatMap((locale) => getAllPosts(locale).map((post) => ({ ...post, locale })))
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1))
    .slice(0, 50);

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "MindsLeap AI Insights",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: "MindsLeap AI Insights, Founders Talk, events, and research updates.",
    language: "zh-CN",
    items: posts.map((post) => {
      const url = `${siteUrl}/${post.locale}/news/${post.slug}`;
      return {
        id: url,
        url,
        title: post.title,
        summary: post.excerpt,
        date_published: post.date ? new Date(post.date).toISOString() : undefined,
        author: {
          name: post.author || "MindsLeap",
        },
        tags: [post.category, post.locale],
        image: post.image ? new URL(post.image, siteUrl).toString() : undefined,
      };
    }),
  };

  return Response.json(feed, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

