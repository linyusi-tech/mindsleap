import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteUrl } from "@/lib/site";
import { geoPeople, geoTopics } from "@/lib/geo";

type Props = {
  params: Promise<{ locale: string }>;
};

const upcomingReports = [
  {
    title: "AI Native Organization",
    titleZh: "AI 原生组织建设报告",
    theme: "Org Design",
    summaryZh: "企业如何从使用 AI 工具走向构建 AI 原生组织。",
    summaryEn: "How enterprises move from using AI tools to building AI-native organizations.",
  },
  {
    title: "Global AI GTM Map",
    titleZh: "AI 企业出海 GTM 研究",
    theme: "Global Growth",
    summaryZh: "面向中国 AI 原生企业的海外市场进入路径与生态地图。",
    summaryEn: "Market-entry paths and ecosystem maps for Chinese AI-native companies going global.",
  },
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const title = locale === "zh" ? "MindsLeap Research" : "MindsLeap Research";
  const description =
    locale === "zh"
      ? "MindsLeap 关于 AI 原生企业、FDE、全球商业化与企业 AI 转型的研究报告。"
      : "MindsLeap research on AI-native enterprises, FDE, global commercialization, and enterprise AI transformation.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/research`,
      languages: {
        zh: `${siteUrl}/zh/research`,
        en: `${siteUrl}/en/research`,
      },
    },
  };
}

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: "nav" });

  const isZh = locale === "zh";

  return (
    <div className="bg-[#f9fafb]">
      <section className="relative min-h-[520px] overflow-hidden bg-[#111]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-65"
          style={{ backgroundImage: "url('/images/hero/AI-Native-Conference.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white">
            MindsLeap · Research
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-normal text-white md:text-7xl">
            Research for the AI Native Enterprise.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
            {isZh
              ? "我们把 AI 原生企业、FDE、产业商业模式与硅谷趋势整理成可阅读、可分享、可复用的研究报告，帮助企业从认知升级走向业务落地。"
              : "We turn AI-native enterprise trends, FDE commercialization, and Silicon Valley operating patterns into readable, shareable, reusable research reports."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              Latest Reports
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c] md:text-4xl">
              {isZh ? "研究报告" : "Research Reports"}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              {isZh
                ? "持续发布 MindsLeap 对企业 AI 转型与全球 AI 商业化的研究。"
                : "Ongoing MindsLeap research on enterprise AI transformation and global AI commercialization."}
            </p>
          </div>
          <Link href="/research/fde-industry-report" className="text-sm font-extrabold text-[#1e477c] hover:text-blue-600">
            {isZh ? "查看最新报告 →" : "Read latest report →"}
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href="/research/fde-industry-report"
            className="group flex min-h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:shadow-2xl hover:shadow-[#1e477c]/15"
          >
            <div className="relative flex aspect-[4/3] min-h-[300px] flex-col justify-between overflow-hidden bg-[#1e477c] p-7 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:16px_16px] opacity-45" />
              <div className="relative">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/75">
                  Research Brief · 01
                </div>
                <div className="mt-6 max-w-[310px] text-3xl font-extrabold leading-tight tracking-normal md:text-4xl">
                  FDE<span className="text-blue-200">.</span>
                  <br />
                  {isZh ? "产业商业模式研究" : "Industry Business Model Research"}
                </div>
              </div>
              <div className="relative mt-8 max-w-[300px] text-xs leading-5 text-white/80">
                {isZh
                  ? "Forward Deployed Engineering 如何成为企业 AI 从演示走向生产的关键交付形态。"
                  : "How Forward Deployed Engineering helps enterprise AI move from demo to production."}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-5 flex flex-wrap gap-2">
                {['FDE', 'AI Transformation', '2026'].map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-[#1e477c]">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-extrabold leading-snug tracking-normal text-gray-950">
                {isZh ? "FDE 产业商业模式研究" : "FDE Industry Business Model Research"}
              </h3>
              <p className="mt-3 flex-1 text-base leading-7 text-gray-600">
                {isZh
                  ? "梳理海外收费方式、招聘画像、项目推进机制，以及中国市场可借鉴的产品化与交付路径。"
                  : "A review of overseas pricing, hiring profiles, delivery models, and commercialization paths that China can learn from."}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5 text-xs font-black uppercase tracking-[0.08em] text-[#1e477c]">
                <span>{isZh ? "阅读全文" : "Read report"}</span>
                <span>Research</span>
              </div>
            </div>
          </Link>

          {upcomingReports.map((report) => (
            <article key={report.title} className="flex min-h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white opacity-70 shadow-sm">
              <div className="relative flex aspect-[4/3] min-h-[300px] flex-col justify-between overflow-hidden bg-gray-50 p-7 text-gray-600">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-500">Upcoming</div>
                  <div className="mt-6 max-w-[300px] text-3xl font-extrabold leading-tight tracking-normal text-gray-600 md:text-4xl">
                    {report.title}
                  </div>
                </div>
                <div className="mt-8 max-w-[300px] text-xs leading-5 text-gray-500">
                  {isZh ? report.summaryZh : report.summaryEn}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-5">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-extrabold text-gray-500">{report.theme}</span>
                </div>
                <h3 className="text-2xl font-extrabold leading-snug tracking-normal text-gray-600">
                  {isZh ? report.titleZh : report.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-7 text-gray-500">
                  {isZh ? report.summaryZh : report.summaryEn}
                </p>
                <div className="mt-6 border-t border-gray-200 pt-5 text-xs font-black uppercase tracking-[0.08em] text-gray-500">
                  Coming soon
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              Topic Knowledge Base
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c] md:text-4xl">
              {isZh ? "主题知识库" : "Topic Knowledge Base"}
            </h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              {isZh
                ? "围绕企业 AI 转型、FDE、AI 原生企业和全球增长，把 MindsLeap 的定义、方法论、FAQ 与相关内容组织成可被搜索引擎和 AI 模型理解的主题网络。"
                : "A structured topic network that organizes MindsLeap definitions, methods, FAQs, and related content for search engines and AI models."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {geoTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:bg-white hover:shadow-xl hover:shadow-[#1e477c]/10"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">
                  {topic.eyebrow[locale === "en" ? "en" : "zh"]}
                </p>
                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-normal text-gray-950 group-hover:text-[#1e477c]">
                  {topic.title[locale === "en" ? "en" : "zh"]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {topic.description[locale === "en" ? "en" : "zh"]}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-start">
            <Link href="/topics" className="text-sm font-extrabold text-[#1e477c] hover:text-blue-600">
              {isZh ? "查看全部主题 →" : "View all topics →"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              People & Silicon Valley Network
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c] md:text-4xl">
              {isZh ? "人物与硅谷资源" : "People and Silicon Valley Network"}
            </h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              {isZh
                ? "沉淀 MindsLeap 与 Founders Space、Steve Hoffman、硅谷导师和全球创业生态之间的实体关系。"
                : "Entity pages that clarify MindsLeap's relationship with Founders Space, Steve Hoffman, Silicon Valley mentors, and the global startup ecosystem."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {geoPeople.map((person) => (
              <Link
                key={person.slug}
                href={`/people/${person.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:shadow-xl hover:shadow-[#1e477c]/10"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">
                  Silicon Valley Network
                </p>
                <h3 className="mt-3 text-xl font-extrabold tracking-normal text-gray-950">
                  {person.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {person.description[locale === "en" ? "en" : "zh"]}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-start">
            <Link href="/people" className="text-sm font-extrabold text-[#1e477c] hover:text-blue-600">
              {isZh ? "查看人物索引 →" : "View people index →"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
