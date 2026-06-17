import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "Sogou web spider",
        allow: "/",
      },
      {
        userAgent: "360Spider",
        allow: "/",
      },
      {
        userAgent: "YisouSpider",
        allow: "/",
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
