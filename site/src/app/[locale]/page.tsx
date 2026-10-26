import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ValueProposition from "@/components/home/ValueProposition";
import BusinessOverview from "@/components/home/BusinessOverview";
import EcosystemSection from "@/components/home/EcosystemSection";
import LatestEvents from "@/components/home/LatestEvents";
import ProgramHighlight from "@/components/program/ProgramHighlight";
import { getAllPosts } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allPosts = getAllPosts(locale);
  const latestEvents = allPosts.filter((post) => post.category === "events").slice(0, 3);
  const latestFoundersTalk = allPosts.filter((post) => post.category === "founders-talk").slice(0, 3);
  const latestAIInsights = allPosts.filter((post) => post.category === "ai-insights").slice(0, 3);

  return (
    <>
      <HeroSection />
      <ValueProposition />
      <BusinessOverview />
      <ProgramHighlight locale={locale} />
      <EcosystemSection />
      <LatestEvents
        posts={latestEvents}
        translationNamespace="latestEvents"
        emptyText={locale === "zh" ? "暂无活动，敬请期待" : "No events yet. Stay tuned."}
      />
      <LatestEvents
        posts={latestFoundersTalk}
        translationNamespace="latestFoundersTalk"
        emptyText={locale === "zh" ? "暂无 Founders Talk，敬请期待" : "No Founders Talk posts yet. Stay tuned."}
        backgroundClassName="bg-white"
        viewMoreHref="/news?tab=founders-talk"
      />
      <LatestEvents
        posts={latestAIInsights}
        translationNamespace="latestAIInsight"
        emptyText={locale === "zh" ? "暂无 AI Insights，敬请期待" : "No AI Insights posts yet. Stay tuned."}
        viewMoreHref="/news?tab=ai-insights"
      />
    </>
  );
}
