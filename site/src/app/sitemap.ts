import type { MetadataRoute } from "next";
import { getAllLocalizedPostSlugs } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";
import { geoPeople, geoTopics } from "@/lib/geo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const locales = ["zh", "en"];

  const staticPages = [
    "",
    "/about",
    "/services",
    "/services/ai-club",
    "/services/ai-transformation",
    "/services/accelerator",
    "/services/global-growth",
    "/news",
    "/research",
    "/research/fde-industry-report",
    "/topics",
    "/people",
    "/contact",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const postEntries = getAllLocalizedPostSlugs().map(({ locale, slug }) => ({
    url: `${baseUrl}/${locale}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const topicEntries = locales.flatMap((locale) =>
    geoTopics.map((topic) => ({
      url: `${baseUrl}/${locale}/topics/${topic.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  const peopleEntries = locales.flatMap((locale) =>
    geoPeople.map((person) => ({
      url: `${baseUrl}/${locale}/people/${person.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticEntries, ...topicEntries, ...peopleEntries, ...postEntries];
}
