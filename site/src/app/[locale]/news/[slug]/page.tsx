import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import NewsArticleClient from "@/components/news/NewsArticleClient";
import JsonLd from "@/components/shared/JsonLd";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const siteUrl = getSiteUrl();

  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author || "MindsLeap",
    },
    publisher: {
      "@type": "Organization",
      name: "MindsLeap",
      url: siteUrl,
    },
    description: post.excerpt,
    image: post.image,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <NewsArticleClient post={post}>
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </NewsArticleClient>
    </>
  );
}
