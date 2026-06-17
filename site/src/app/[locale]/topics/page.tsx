import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { asGeoLocale, geoTopics } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();
  const title = currentLocale === "zh" ? "MindsLeap GEO 主题" : "MindsLeap GEO Topics";
  const description =
    currentLocale === "zh"
      ? "围绕企业 AI 转型、AI 培训、AI 咨询、FDE 服务、AI 原生企业和出海服务的 MindsLeap 主题索引。"
      : "MindsLeap topic index for enterprise AI transformation, AI training, advisory, FDE services, AI-native enterprises, and global growth.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${currentLocale}/topics`,
      languages: {
        zh: `${siteUrl}/zh/topics`,
        en: `${siteUrl}/en/topics`,
      },
    },
  };
}

export default async function TopicsPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const isZh = currentLocale === "zh";

  setRequestLocale(currentLocale);

  return (
    <div className="bg-white">
      <section className="bg-[#10233f]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
            MindsLeap · GEO Topics
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-normal text-white md:text-6xl">
            {isZh ? "面向 AI 答案时代的主题知识库" : "A Topic Knowledge Base for the AI Answer Era"}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-50 md:text-xl">
            {isZh
              ? "这些页面用于沉淀 MindsLeap 在企业 AI 转型、FDE、AI 原生企业和全球增长方向上的定义、方法论、FAQ 与相关内容。"
              : "These pages organize MindsLeap definitions, methods, FAQs, and related content around enterprise AI transformation, FDE, AI-native companies, and global growth."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {geoTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group rounded-xl border border-gray-200 bg-gray-50 p-7 transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:bg-white hover:shadow-xl hover:shadow-[#1e477c]/10"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">
                {topic.eyebrow[currentLocale]}
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-normal text-gray-950 group-hover:text-[#1e477c]">
                {topic.title[currentLocale]}
              </h2>
              <p className="mt-4 leading-7 text-gray-600">{topic.description[currentLocale]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

