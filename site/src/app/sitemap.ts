import type { MetadataRoute } from "next";
import { getAllLocalizedPostSlugs } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const locales = ["zh", "en"];

  const staticPages = [
    "",
    "/about",
    "/services",
    "/services/ai-club",
    "/services/incubation",
    "/services/training",
    "/services/study-tours",
    "/news",
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

  return [...staticEntries, ...postEntries];
}
