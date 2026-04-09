import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ValueProposition from "@/components/home/ValueProposition";
import BusinessOverview from "@/components/home/BusinessOverview";
import EcosystemSection from "@/components/home/EcosystemSection";
import LatestEvents from "@/components/home/LatestEvents";
import JsonLd from "@/components/shared/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const siteUrl = getSiteUrl();

  const allPosts = getAllPosts(locale);
  const latestEvents = allPosts.filter((post) => post.category === "events").slice(0, 3);
  const latestInsights = allPosts.filter((post) => post.category === "insights").slice(0, 3);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MindsLeap",
    alternateName: "心智悦动",
    url: siteUrl,
    description:
      locale === "zh"
        ? "连接中国传统企业家与全球AI前沿技术的转型加速器"
        : "AI Transformation Accelerator bridging Chinese enterprises with global AI innovation",
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Lincoln",
      jobTitle: "CEO",
    },
    sameAs: [],
    knowsAbout: [
      "Artificial Intelligence",
      "AI Transformation",
      "Startup Incubation",
      "Executive Training",
      "Silicon Valley",
    ],
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <HeroSection />
      <ValueProposition />
      <BusinessOverview />
      <EcosystemSection />
      <LatestEvents
        posts={latestEvents}
        translationNamespace="latestEvents"
        emptyText={locale === "zh" ? "暂无活动，敬请期待" : "No events yet. Stay tuned."}
      />
      <LatestEvents
        posts={latestInsights}
        translationNamespace="latestInsights"
        emptyText={locale === "zh" ? "暂无洞察，敬请期待" : "No insights yet. Stay tuned."}
        backgroundClassName="bg-white"
      />
    </>
  );
}
