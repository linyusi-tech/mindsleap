export const newsFilterCategories = ["all", "events", "founders-talk", "ai-insights"] as const;

export type NewsFilterCategory = (typeof newsFilterCategories)[number];
export type NewsContentCategory = Exclude<NewsFilterCategory, "all"> | "news";
export type NewsCategoryMessageKey = "events" | "foundersTalk" | "aiInsight";

export function normalizeNewsTab(tab?: string): NewsFilterCategory {
  if (tab === "all" || tab === "events" || tab === "founders-talk" || tab === "ai-insights") {
    return tab;
  }

  if (tab === "insights" || tab === "ai-insight") {
    return "ai-insights";
  }

  return "events";
}

export function normalizePostCategory(
  category?: string,
  title = "",
  excerpt = ""
): NewsContentCategory {
  const normalized = (category || "news").trim().toLowerCase().replaceAll("_", "-");

  if (normalized === "event" || normalized === "events") {
    return "events";
  }

  if (
    normalized === "founders-talk" ||
    normalized === "founder-talk" ||
    normalized === "founders-talks" ||
    normalized === "founder-talks"
  ) {
    return "founders-talk";
  }

  if (normalized === "ai-insight" || normalized === "ai-insights") {
    return "ai-insights";
  }

  if (normalized === "insight" || normalized === "insights") {
    return looksLikeFoundersTalk(title, excerpt) ? "founders-talk" : "ai-insights";
  }

  return "news";
}

export function getNewsCategoryMessageKey(category: string): NewsCategoryMessageKey | null {
  const normalized = normalizePostCategory(category);

  if (normalized === "events") {
    return "events";
  }

  if (normalized === "founders-talk") {
    return "foundersTalk";
  }

  if (normalized === "ai-insights") {
    return "aiInsight";
  }

  return null;
}

function looksLikeFoundersTalk(title: string, excerpt: string): boolean {
  const text = `${title}\n${excerpt}`.toLowerCase();

  return (
    text.includes("founders talk") ||
    text.includes("conversation with") ||
    text.includes("对话")
  );
}
