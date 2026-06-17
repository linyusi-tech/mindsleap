import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllLocalizedPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import NewsArticleClient from "@/components/news/NewsArticleClient";
import JsonLd from "@/components/shared/JsonLd";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllLocalizedPostSlugs();
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const siteUrl = getSiteUrl();
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Not Found" };
  }

  const articleUrl = `${siteUrl}/${locale}/news/${slug}`;
  const imageUrl = post.image ? new URL(post.image, siteUrl).toString() : undefined;
  const languages: Record<string, string> = {
    [locale]: articleUrl,
  };

  for (const alternateLocale of ["zh", "en"]) {
    if (alternateLocale !== locale && getPostBySlug(slug, alternateLocale)) {
      languages[alternateLocale] = `${siteUrl}/${alternateLocale}/news/${slug}`;
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: articleUrl,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: articleUrl,
      siteName: "MindsLeap",
      type: "article",
      publishedTime: post.date,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
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

  const articleUrl = `${siteUrl}/${locale}/news/${slug}`;
  const imageUrl = post.image ? new URL(post.image, siteUrl).toString() : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: articleUrl,
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
    image: imageUrl,
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
