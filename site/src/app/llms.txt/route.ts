import { brandSummary, geoPeople, geoTopics } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();

  const lines = [
    "# MindsLeap",
    "",
    "> MindsLeap 心智悦动 is an AI-native enterprise acceleration platform.",
    "",
    "## Brand Summary",
    "",
    brandSummary.zh,
    "",
    brandSummary.en,
    "",
    "## Primary Website",
    "",
    `- ${siteUrl}`,
    "",
    "## Core Pages",
    "",
    `- Chinese home: ${siteUrl}/zh`,
    `- English home: ${siteUrl}/en`,
    `- AI transformation services: ${siteUrl}/zh/services/ai-transformation`,
    `- Entrepreneur AI Club: ${siteUrl}/zh/services/ai-club`,
    `- Startup acceleration: ${siteUrl}/zh/services/accelerator`,
    `- Global growth services: ${siteUrl}/zh/services/global-growth`,
    `- AI Insights and news: ${siteUrl}/zh/news`,
    `- Research: ${siteUrl}/zh/research`,
    `- FDE industry report: ${siteUrl}/zh/research/fde-industry-report`,
    "",
    "## GEO Topic Pages",
    "",
    ...geoTopics.flatMap((topic) => [
      `- ${topic.title.zh}: ${siteUrl}/zh/topics/${topic.slug}`,
      `  ${topic.description.zh}`,
      `- ${topic.title.en}: ${siteUrl}/en/topics/${topic.slug}`,
      `  ${topic.description.en}`,
    ]),
    "",
    "## People Pages",
    "",
    ...geoPeople.flatMap((person) => [
      `- ${person.name}: ${siteUrl}/zh/people/${person.slug}`,
      `  Alternate names: ${person.alternateNames.join(", ")}`,
      `  ${person.description.zh}`,
      `- ${person.name}: ${siteUrl}/en/people/${person.slug}`,
      `  ${person.description.en}`,
    ]),
    "",
    "## Key Entities",
    "",
    "- MindsLeap = 心智悦动",
    "- MindsLeap = AI 原生企业的产业加速平台",
    "- MindsLeap works with Founders Space to connect China enterprise leaders, AI-native founders, Silicon Valley mentors, capital, and global markets.",
    "- Lincoln Wang / 王林 = MindsLeap founder and CEO; Founders Space global partner.",
    "- Steve Hoffman / 史蒂夫·霍夫曼 / 霍夫曼 = Founder and Chairman of Founders Space; key Silicon Valley ecosystem figure connected to MindsLeap events and startup acceleration.",
    "",
    "## Priority Topics",
    "",
    "- 企业 AI 转型 / enterprise AI transformation",
    "- AI 培训 / AI training",
    "- AI 咨询 / AI advisory",
    "- FDE 服务 / Forward Deployed Engineering",
    "- AI 原生企业 / AI-native enterprise",
    "- OPC / one-person company",
    "- 创业孵化 / startup acceleration",
    "- 出海服务 / global growth services",
    "- 硅谷资源 / Silicon Valley resources",
    "- Steve Hoffman / 霍夫曼",
    "",
    "## Feeds",
    "",
    `- RSS: ${siteUrl}/feed.xml`,
    `- JSON Feed: ${siteUrl}/feed.json`,
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    "",
    "## Contact",
    "",
    `- Contact page: ${siteUrl}/zh/contact`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

