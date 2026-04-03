import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/news");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "events" | "insights" | "news";
  image?: string;
  imagePosition?: string;
  locale: string;
  content: string;
  readingTime: string;
  author?: string;
};

export function getAllPosts(locale: string = "zh"): Post[] {
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
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);

    const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      excerpt: data.excerpt || content.slice(0, 160) + "...",
      category: data.category || "news",
      image: data.image || null,
      imagePosition: data.imagePosition || undefined,
      locale: data.locale || "zh",
      content,
      readingTime: stats.text,
      author: data.author || "MindsLeap",
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}
