import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { normalizePostCategory, type NewsContentCategory } from "@/lib/newsCategories";

const postsRootDirectory = path.join(process.cwd(), "content/news");
const postLocales = ["zh", "en"] as const;
type PostLocale = (typeof postLocales)[number];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: NewsContentCategory;
  image?: string;
  imagePosition?: string;
  imageLayout?: string;
  locale: string;
  content: string;
  readingTime: string;
  author?: string;
  showOnHomepage?: boolean;
};

function normalizeLocale(locale: string): PostLocale {
  return postLocales.includes(locale as PostLocale) ? (locale as PostLocale) : "zh";
}

function getPostsDirectory(locale: string): string {
  return path.join(postsRootDirectory, normalizeLocale(locale));
}

function getPostFilePath(slug: string, locale: string): string | null {
  const postsDirectory = getPostsDirectory(locale);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);

  if (fs.existsSync(mdxPath)) return mdxPath;
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

export function getAllPosts(locale: string = "zh"): Post[] {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      return getPostBySlug(slug, locale);
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string, locale: string = "zh"): Post | null {
  try {
    const fullPath = getPostFilePath(slug, locale);

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    const title = data.title || slug;
    const excerpt = data.excerpt || content.slice(0, 160) + "...";

    return {
      slug,
      title,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      excerpt,
      category: normalizePostCategory(data.category, title, excerpt),
      image: data.image || null,
      imagePosition: data.imagePosition || undefined,
      imageLayout: data.imageLayout || undefined,
      locale: data.locale || normalizeLocale(locale),
      content,
      readingTime: stats.text,
      author: data.author || "MindsLeap",
      showOnHomepage: data.showOnHomepage === true,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  return Array.from(new Set(postLocales.flatMap((locale) => getAllPostSlugsByLocale(locale))));
}

export function getAllPostSlugsByLocale(locale: string = "zh"): string[] {
  const postsDirectory = getPostsDirectory(locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getAllLocalizedPostSlugs(): Array<{ locale: PostLocale; slug: string }> {
  return postLocales.flatMap((locale) =>
    getAllPostSlugsByLocale(locale).map((slug) => ({ locale, slug }))
  );
}
