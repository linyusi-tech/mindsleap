"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Post } from "@/lib/posts";
import PageHero from "@/components/shared/PageHero";

type Props = {
  posts: Post[];
};

const categories = ["all", "events", "insights"] as const;

export default function NewsListClient({ posts }: Props) {
  const t = useTranslations("news");
  const h = useTranslations("newsHero");
  const [filter, setFilter] = useState<string>("events");

  const filteredPosts = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  const heroSlides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/slide-2.jpg",
    },
    {
      title: h("slide2Title"),
      heading: h("slide2Heading"),
      subtitle: h("slide2Subtitle"),
      image: "/images/hero/slide-7.jpg",
    },
  ];

  return (
    <>
      <PageHero slides={heroSlides} />

      {/* Filter & List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? t("allPosts") : cat === "events" ? t("events") : t("insights")}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">
                {t("allPosts")} — 暂无内容，敬请期待
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="card-hover group"
                >
                  <Link href={`/news/${post.slug}`} scroll>
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                      {/* Image */}
                      {post.image && (
                        <div className="relative h-48 bg-gray-200">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category & Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 text-xs font-medium text-primary bg-blue-50 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-400">{post.date}</span>
                          <span className="text-xs text-gray-400">{post.readingTime}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-500 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
