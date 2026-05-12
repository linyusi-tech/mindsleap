import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/posts";
import NewsListClient from "@/components/news/NewsListClient";
import JsonLd from "@/components/shared/JsonLd";
import { normalizeNewsTab } from "@/lib/newsCategories";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
};

// The news index is content-driven and should reflect new posts immediately
// after deployment instead of serving a long-lived prerendered snapshot.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);
  const initialFilter = normalizeNewsTab(tab);

  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "zh" ? "最新动态" : "Latest News",
    description:
      locale === "zh"
        ? "MindsLeap活动资讯、Founders Talk 与 AI Insights"
        : "MindsLeap events, Founders Talk, and AI Insights",
    publisher: {
      "@type": "Organization",
      name: "MindsLeap",
    },
  };

  return (
    <>
      <JsonLd data={newsJsonLd} />
      <NewsListClient posts={posts} initialFilter={initialFilter} />
    </>
  );
}
