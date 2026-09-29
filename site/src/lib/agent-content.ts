import {
  brandSummary,
  clubName,
  entityStatements,
  geoPeople,
  geoTopics,
  getGeoPerson,
  getGeoTopic,
  type GeoLocale,
} from "@/lib/geo";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getServicesHubContent } from "@/lib/services-hub";
import { getSiteUrl } from "@/lib/site";

type AgentDocument = {
  body: string;
  canonicalUrl: string;
};

const localeNames: Record<GeoLocale, string> = {
  zh: "zh-CN",
  en: "en",
};

function absoluteUrl(href: string, locale: GeoLocale) {
  const siteUrl = getSiteUrl();
  const localizedHref = href.startsWith("/") && !href.startsWith("/zh/") && !href.startsWith("/en/")
    ? `/${locale}${href}`
    : href;

  return new URL(localizedHref, siteUrl).toString();
}

function frontmatter(values: Record<string, string>) {
  return [
    "---",
    ...Object.entries(values).map(([key, value]) => `${key}: ${JSON.stringify(value)}`),
    "---",
    "",
  ];
}

function renderHome(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: isZh ? "MindsLeap 心智悦动" : "MindsLeap",
      description: brandSummary[locale],
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "organization-overview",
    }),
    `# ${isZh ? "MindsLeap 心智悦动" : "MindsLeap"}`,
    "",
    brandSummary[locale],
    "",
    `## ${isZh ? "关键实体" : "Key Entities"}`,
    "",
    `- ${clubName[locale]}`,
    `- ${entityStatements.partnership[locale]}`,
    `- ${entityStatements.lincoln[locale]}`,
    "",
    `## ${isZh ? "核心内容" : "Core Content"}`,
    "",
    `- [${isZh ? "服务总览与项目证据" : "Services and Project Evidence"}](${siteUrl}/${locale}/services)`,
    `- [${isZh ? "主题知识库" : "Topic Knowledge Base"}](${siteUrl}/${locale}/topics)`,
    `- [${isZh ? "人物与硅谷资源" : "People and Silicon Valley Network"}](${siteUrl}/${locale}/people)`,
    `- [AI Insights](${siteUrl}/${locale}/news)`,
    `- [${isZh ? "研究" : "Research"}](${siteUrl}/${locale}/research)`,
    `- [${isZh ? "企业 AI 转型服务" : "Enterprise AI Transformation"}](${siteUrl}/${locale}/services/ai-transformation)`,
    `- [Agent Index](${siteUrl}/${locale}/ai)`,
    "",
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderAgentIndex(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/ai`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: isZh ? "MindsLeap AI / Agent 内容索引" : "MindsLeap AI / Agent Content Index",
      description: isZh
        ? "MindsLeap 面向 AI Agent 的权威内容入口。"
        : "Authoritative MindsLeap content entry points for AI agents.",
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "agent-index",
    }),
    `# ${isZh ? "MindsLeap AI / Agent 内容索引" : "MindsLeap AI / Agent Content Index"}`,
    "",
    brandSummary[locale],
    "",
    `## ${isZh ? "关键实体" : "Key Entities"}`,
    "",
    `- ${clubName[locale]}`,
    `- ${entityStatements.partnership[locale]}`,
    `- ${entityStatements.lincoln[locale]}`,
    "",
    `## ${isZh ? "机器可读入口" : "Machine-readable Entry Points"}`,
    "",
    `- [llms.txt](${siteUrl}/llms.txt)`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    `- [RSS](${siteUrl}/feed.xml)`,
    `- [JSON Feed](${siteUrl}/feed.json)`,
    "",
    `## ${isZh ? "服务" : "Services"}`,
    "",
    `- [${isZh ? "服务总览与项目证据" : "Services and Project Evidence"}](${siteUrl}/${locale}/services)`,
    `- [${isZh ? "企业 AI 转型服务" : "Enterprise AI Transformation"}](${siteUrl}/${locale}/services/ai-transformation)`,
    `- [${clubName[locale]}](${siteUrl}/${locale}/services/ai-club)`,
    `- [${isZh ? "AI 原生创业加速" : "AI-Native Venture Acceleration"}](${siteUrl}/${locale}/services/accelerator)`,
    `- [${isZh ? "全球增长服务" : "Global Growth Services"}](${siteUrl}/${locale}/services/global-growth)`,
    "",
    `## ${isZh ? "主题" : "Topics"}`,
    "",
    ...geoTopics.map((topic) => `- [${topic.title[locale]}](${siteUrl}/${locale}/topics/${topic.slug}) — ${topic.description[locale]}`),
    "",
    `## ${isZh ? "人物" : "People"}`,
    "",
    ...geoPeople.map((person) => `- [${person.name}](${siteUrl}/${locale}/people/${person.slug}) — ${person.description[locale]}`),
    "",
    `## ${isZh ? "最新 AI Insights" : "Latest AI Insights"}`,
    "",
    ...getAllPosts(locale).slice(0, 20).map((post) => `- [${post.title}](${siteUrl}/${locale}/news/${post.slug}) — ${post.excerpt}`),
    "",
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderServicesHub(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/services`;
  const content = getServicesHubContent(locale);
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: content.metadata.title,
      description: content.metadata.description,
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "services-hub",
      organization: "MindsLeap",
    }),
    `# ${content.hero.title}`,
    "",
    content.hero.description,
    "",
    `## ${content.paths.title}`,
    "",
    content.paths.description,
    "",
    ...content.paths.items.flatMap((path) => [
      `### ${path.number}. ${path.title}`,
      "",
      path.description,
      "",
      ...path.links.map((link) => `- [${link.label}](${absoluteUrl(link.href, locale)})`),
      "",
    ]),
    `## ${content.families.title}`,
    "",
    content.families.description,
    "",
    ...content.families.items.flatMap((service) => [
      `### ${service.name}`,
      "",
      `- ${content.families.targetLabel}: ${service.audience}`,
      `- ${content.families.problemLabel}: ${service.problem}`,
      `- ${content.families.deliveryLabel}: ${service.delivery}`,
      `- [${content.families.detailLabel}](${absoluteUrl(service.href, locale)})`,
      ...(service.evidenceHref
        ? [`- [${content.families.evidenceLabel}](${absoluteUrl(service.evidenceHref, locale)})`]
        : []),
      "",
    ]),
    `## ${content.delivery.title}`,
    "",
    content.delivery.description,
    "",
    ...content.delivery.stages.flatMap((stage) => [
      `### ${stage.number}. ${stage.title}`,
      "",
      stage.description,
      "",
    ]),
    `> ${content.delivery.note}`,
    "",
    `## ${content.cases.title}`,
    "",
    content.cases.description,
    "",
    ...content.cases.items.flatMap((project) => [
      `### [${project.organization}: ${project.title}](${siteUrl}/${locale}/news/${project.slug})`,
      "",
      `- ${isZh ? "日期" : "Date"}: ${project.date}`,
      `- ${isZh ? "服务" : "Services"}: ${project.services}`,
      "",
      project.summary,
      "",
    ]),
    `## ${content.platform.title}`,
    "",
    content.platform.description,
    "",
    ...content.platform.items.flatMap((item) => [
      `### [${item.title}](${absoluteUrl(item.href, locale)})`,
      "",
      item.description,
      "",
    ]),
    `## ${content.faq.title}`,
    "",
    ...content.faq.items.flatMap((faq) => [
      `### ${faq.question}`,
      "",
      faq.answer,
      "",
    ]),
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderTopicIndex(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/topics`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: isZh ? "MindsLeap 主题知识库" : "MindsLeap Topic Knowledge Base",
      description: isZh
        ? "企业 AI 转型、FDE、AI 原生企业与全球增长主题索引。"
        : "Topic index for enterprise AI transformation, FDE, AI-native companies, and global growth.",
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "topic-index",
    }),
    `# ${isZh ? "MindsLeap 主题知识库" : "MindsLeap Topic Knowledge Base"}`,
    "",
    ...geoTopics.flatMap((topic) => [
      `## [${topic.title[locale]}](${siteUrl}/${locale}/topics/${topic.slug})`,
      "",
      topic.description[locale],
      "",
    ]),
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderTopic(locale: GeoLocale, slug: string): AgentDocument | null {
  const topic = getGeoTopic(slug);
  if (!topic) return null;

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/topics/${topic.slug}`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: topic.title[locale],
      description: topic.description[locale],
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "service-topic",
      organization: "MindsLeap",
    }),
    `# ${topic.title[locale]}`,
    "",
    `> ${topic.summary[locale]}`,
    "",
    `## ${isZh ? "适合哪些团队" : "Who This Is For"}`,
    "",
    ...topic.audience[locale].map((item) => `- ${item}`),
    "",
    `## ${topic.methodTitle[locale]}`,
    "",
    topic.methodIntro[locale],
    "",
    ...topic.methodSteps.flatMap((step, index) => [
      `### ${index + 1}. ${step.title[locale]}`,
      "",
      step.body[locale],
      "",
    ]),
    `## ${isZh ? "典型交付物" : "Typical Deliverables"}`,
    "",
    ...topic.deliverables[locale].map((item) => `- ${item}`),
    "",
    `## ${isZh ? "关于 MindsLeap" : "About MindsLeap"}`,
    "",
    brandSummary[locale],
    "",
    `## ${isZh ? "常见问题" : "Frequently Asked Questions"}`,
    "",
    ...topic.faqs.flatMap((faq) => [
      `### ${faq.question[locale]}`,
      "",
      faq.answer[locale],
      "",
    ]),
    `## ${isZh ? "相关内容" : "Related Content"}`,
    "",
    ...topic.relatedLinks.map((link) => `- [${link.label[locale]}](${absoluteUrl(link.href, locale)})`),
    "",
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderPeopleIndex(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/people`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: isZh ? "MindsLeap 人物与硅谷资源" : "MindsLeap People and Silicon Valley Network",
      description: isZh
        ? "MindsLeap 与 Founders Space、硅谷导师和全球创业生态相关的人物索引。"
        : "People connected to MindsLeap, Founders Space, Silicon Valley mentors, and the global startup ecosystem.",
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "people-index",
    }),
    `# ${isZh ? "MindsLeap 人物与硅谷资源" : "MindsLeap People and Silicon Valley Network"}`,
    "",
    ...geoPeople.flatMap((person) => [
      `## [${person.name}](${siteUrl}/${locale}/people/${person.slug})`,
      "",
      `Alternate names: ${person.alternateNames.join(", ")}`,
      "",
      person.description[locale],
      "",
    ]),
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderPerson(locale: GeoLocale, slug: string): AgentDocument | null {
  const person = getGeoPerson(slug);
  if (!person) return null;

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/people/${person.slug}`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: person.title[locale],
      description: person.description[locale],
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "person",
      name: person.name,
    }),
    `# ${person.name}`,
    "",
    `Alternate names: ${person.alternateNames.join(", ")}`,
    "",
    person.description[locale],
    "",
    `## ${isZh ? "为什么这个人物重要" : "Why This Person Matters"}`,
    "",
    ...person.highlights[locale].map((highlight) => `- ${highlight}`),
    "",
    `## ${isZh ? "相关领域" : "Areas of Knowledge"}`,
    "",
    ...person.knowsAbout.map((item) => `- ${item}`),
    "",
    `## ${isZh ? "常见问题" : "Frequently Asked Questions"}`,
    "",
    ...person.faqs.flatMap((faq) => [
      `### ${faq.question[locale]}`,
      "",
      faq.answer[locale],
      "",
    ]),
    `## ${isZh ? "相关内容" : "Related Content"}`,
    "",
    ...person.relatedLinks.map((link) => `- [${link.label[locale]}](${absoluteUrl(link.href, locale)})`),
    "",
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderNewsIndex(locale: GeoLocale): AgentDocument {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/news`;
  const isZh = locale === "zh";

  const lines = [
    ...frontmatter({
      title: isZh ? "MindsLeap AI Insights" : "MindsLeap AI Insights",
      description: isZh ? "MindsLeap 最新 AI 洞察与活动内容。" : "Latest AI insights and event coverage from MindsLeap.",
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "article-index",
    }),
    "# MindsLeap AI Insights",
    "",
    ...getAllPosts(locale).slice(0, 50).map((post) =>
      `- [${post.title}](${siteUrl}/${locale}/news/${post.slug}) — ${post.date} — ${post.excerpt}`
    ),
    "",
    `Source: ${canonicalUrl}`,
  ];

  return { body: lines.join("\n"), canonicalUrl };
}

function renderPost(locale: GeoLocale, slug: string): AgentDocument | null {
  const post = getPostBySlug(slug, locale);
  if (!post) return null;

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/news/${post.slug}`;
  const body = [
    ...frontmatter({
      title: post.title,
      description: post.excerpt,
      canonical: canonicalUrl,
      language: localeNames[locale],
      content_type: "article",
      author: post.author || "MindsLeap",
      date_published: post.date,
    }),
    `# ${post.title}`,
    "",
    `Published: ${post.date}`,
    "",
    `Author: ${post.author || "MindsLeap"}`,
    "",
    post.content.trim(),
    "",
    `Source: ${canonicalUrl}`,
  ].join("\n");

  return { body, canonicalUrl };
}

export function getAgentDocument(pathname: string): AgentDocument | null {
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const locale = segments[0] === "en" ? "en" : segments[0] === "zh" ? "zh" : null;
  if (!locale) return null;

  if (segments.length === 1) return renderHome(locale);
  if (segments[1] === "ai" && segments.length === 2) return renderAgentIndex(locale);
  if (segments[1] === "services" && segments.length === 2) return renderServicesHub(locale);
  if (segments[1] === "topics" && segments.length === 2) return renderTopicIndex(locale);
  if (segments[1] === "topics" && segments.length === 3) return renderTopic(locale, segments[2]);
  if (segments[1] === "people" && segments.length === 2) return renderPeopleIndex(locale);
  if (segments[1] === "people" && segments.length === 3) return renderPerson(locale, segments[2]);
  if (segments[1] === "news" && segments.length === 2) return renderNewsIndex(locale);
  if (segments[1] === "news" && segments.length === 3) return renderPost(locale, segments[2]);

  return null;
}
