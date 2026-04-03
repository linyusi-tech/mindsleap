"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  children: React.ReactNode;
};

export default function NewsArticleClient({ post, children }: Props) {
  const t = useTranslations("news");

  return (
    <>
      {/* Title Section */}
      <section className="pt-2 pb-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center text-gray-400 hover:text-primary mb-6 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToList")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-400">{post.readingTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative h-48 md:h-72 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              style={{ objectPosition: post.imagePosition ?? "center" }}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MDX Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:text-xl prose-p:text-gray-600 prose-a:text-primary prose-hr:hidden">
            {children}
          </div>

          {/* Share & Back */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <Link
              href="/news"
              className="text-primary font-medium hover:underline"
            >
              ← {t("backToList")}
            </Link>
            <div className="text-sm text-gray-400">
              {post.author} · {post.date}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
