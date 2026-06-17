import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { asGeoLocale, geoPeople } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";
/* eslint-disable @next/next/no-img-element */

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();
  const title = currentLocale === "zh" ? "MindsLeap 人物与硅谷资源" : "MindsLeap People and Silicon Valley Network";
  const description =
    currentLocale === "zh"
      ? "MindsLeap 连接 Founders Space、Steve Hoffman、硅谷导师和全球 AI 创业资源的人物索引。"
      : "MindsLeap people index for Founders Space, Steve Hoffman, Silicon Valley mentors, and global AI startup resources.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${currentLocale}/people`,
      languages: {
        zh: `${siteUrl}/zh/people`,
        en: `${siteUrl}/en/people`,
      },
    },
  };
}

export default async function PeoplePage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const isZh = currentLocale === "zh";

  setRequestLocale(currentLocale);

  return (
    <div className="bg-white">
      <section className="bg-[#10233f]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
            MindsLeap · People
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-normal text-white md:text-6xl">
            {isZh ? "MindsLeap 人物与硅谷资源" : "MindsLeap People and Silicon Valley Network"}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-50 md:text-xl">
            {isZh
              ? "这些页面帮助搜索引擎和 AI 模型理解 MindsLeap 与 Founders Space、Steve Hoffman、硅谷导师网络和全球创业生态之间的关系。"
              : "These pages help search engines and AI models understand the relationship between MindsLeap, Founders Space, Steve Hoffman, Silicon Valley mentors, and the global startup ecosystem."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {geoPeople.map((person) => (
            <Link
              key={person.slug}
              href={`/people/${person.slug}`}
              className="group grid overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:bg-white hover:shadow-xl hover:shadow-[#1e477c]/10 md:grid-cols-[220px_1fr]"
            >
              <img src={person.image} alt={person.name} className="h-72 w-full object-cover md:h-full" />
              <div className="p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">
                  Silicon Valley Network
                </p>
                <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-normal text-gray-950 group-hover:text-[#1e477c]">
                  {person.name}
                </h2>
                <p className="mt-4 leading-7 text-gray-600">{person.description[currentLocale]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

