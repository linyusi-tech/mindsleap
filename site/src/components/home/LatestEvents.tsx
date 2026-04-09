"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Post } from "@/lib/posts";

type Props = {
  posts: Post[];
  translationNamespace: "latestEvents" | "latestInsights";
  emptyText: string;
  backgroundClassName?: string;
};

export default function LatestEvents({
  posts,
  translationNamespace,
  emptyText,
  backgroundClassName = "bg-gray-50",
}: Props) {
  const t = useTranslations(translationNamespace);
  const newsT = useTranslations("news");

  return (
    <section className={`py-24 ${backgroundClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#1e477c]">{t("title")}</h2>
            <p className="text-gray-500 mt-2">{t("subtitle")}</p>
          </div>
          <Link href="/news" className="text-blue-500 font-bold hover:underline hidden sm:block">
            {t("viewMore")} &rarr;
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">{emptyText}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} scroll className="block">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={224}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-[#1e477c] to-blue-400 flex items-center justify-center">
                      <span className="text-white/60 text-6xl">📰</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">
                        {post.category === "events"
                          ? newsT("events")
                          : post.category === "insights"
                            ? newsT("insights")
                            : post.category}
                      </p>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1e477c] mb-4 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="text-[#1e477c] text-sm font-bold border-b-2 border-blue-500">
                      {t("learnMore")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="text-blue-500 font-bold hover:underline">
            {t("viewMore")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
