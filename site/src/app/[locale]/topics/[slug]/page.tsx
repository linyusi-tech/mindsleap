import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/shared/JsonLd";
import { asGeoLocale, brandSummary, geoTopics, getGeoTopic } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return geoTopics.flatMap((topic) => [
    { locale: "zh", slug: topic.slug },
    { locale: "en", slug: topic.slug },
  ]);
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const topic = getGeoTopic(slug);
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();

  if (!topic) {
    return { title: "Not Found" };
  }

  const url = `${siteUrl}/${currentLocale}/topics/${topic.slug}`;

  return {
    title: topic.title[currentLocale],
    description: topic.description[currentLocale],
    alternates: {
      canonical: url,
      languages: {
        zh: `${siteUrl}/zh/topics/${topic.slug}`,
        en: `${siteUrl}/en/topics/${topic.slug}`,
      },
    },
    openGraph: {
      title: topic.title[currentLocale],
      description: topic.description[currentLocale],
      url,
      siteName: "MindsLeap",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: topic.title[currentLocale],
      description: topic.description[currentLocale],
    },
  };
}

export default async function GeoTopicPage({ params }: Props) {
  const { locale, slug } = await params;
  const currentLocale = asGeoLocale(locale);
  const topic = getGeoTopic(slug);
  const siteUrl = getSiteUrl();

  if (!topic) {
    notFound();
  }

  setRequestLocale(currentLocale);

  const pageUrl = `${siteUrl}/${currentLocale}/topics/${topic.slug}`;
  const isZh = currentLocale === "zh";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MindsLeap",
        item: `${siteUrl}/${currentLocale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isZh ? "主题" : "Topics",
        item: `${siteUrl}/${currentLocale}/topics`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topic.title[currentLocale],
        item: pageUrl,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: topic.serviceType[currentLocale],
    description: topic.description[currentLocale],
    provider: {
      "@type": "Organization",
      name: "MindsLeap",
      url: siteUrl,
      alternateName: "心智悦动",
    },
    areaServed: ["China", "United States", "Global"],
    url: pageUrl,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[currentLocale],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[currentLocale],
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="bg-white">
        <section className="relative overflow-hidden bg-[#10233f]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/hero/AI-Native-Conference.jpg')" }}
          />
          <div className="absolute inset-0 bg-[#10233f]/70" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
              {topic.eyebrow[currentLocale]}
            </p>
            <h1 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-normal text-white md:text-6xl">
              {topic.title[currentLocale]}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-50 md:text-xl">
              {topic.summary[currentLocale]}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-extrabold text-[#1e477c] transition hover:bg-gray-100"
              >
                {isZh ? "预约沟通" : "Book a conversation"}
              </Link>
              <Link
                href="/services/ai-transformation"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                {isZh ? "查看 AI 转型服务" : "View AI transformation services"}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-18 md:grid-cols-[0.85fr_1.15fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              {isZh ? "Best For" : "Best For"}
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c]">
              {isZh ? "适合哪些团队" : "Who This Is For"}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {topic.audience[currentLocale].map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="leading-7 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
                MindsLeap Method
              </p>
              <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c] md:text-4xl">
                {topic.methodTitle[currentLocale]}
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {topic.methodIntro[currentLocale]}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {topic.methodSteps.map((step, index) => (
                <div key={step.title[currentLocale]} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 text-sm font-black text-[#1e477c]">0{index + 1}</div>
                  <h3 className="text-xl font-extrabold tracking-normal text-gray-950">
                    {step.title[currentLocale]}
                  </h3>
                  <p className="mt-4 leading-7 text-gray-600">{step.body[currentLocale]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-18 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              Deliverables
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c]">
              {isZh ? "典型交付物" : "Typical Deliverables"}
            </h2>
            <ul className="mt-8 space-y-4">
              {topic.deliverables[currentLocale].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e477c] text-[11px] font-black text-white">
                    ✓
                  </span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-[#1e477c] p-8 text-white md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">
              About MindsLeap
            </p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-normal">
              {isZh ? "为什么由 MindsLeap 推进" : "Why MindsLeap"}
            </h2>
            <p className="mt-5 leading-8 text-blue-50">{brandSummary[currentLocale]}</p>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
                  Related
                </p>
                <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c]">
                  {isZh ? "继续阅读" : "Read Next"}
                </h2>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {topic.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-lg font-extrabold leading-snug text-gray-950 shadow-sm transition hover:-translate-y-1 hover:border-[#1e477c]/40 hover:text-[#1e477c]"
                >
                  {link.label[currentLocale]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-18 md:py-24">
          <p className="mb-3 text-center text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
            FAQ
          </p>
          <h2 className="text-center text-3xl font-extrabold tracking-normal text-[#1e477c]">
            {isZh ? "常见问题" : "Frequently Asked Questions"}
          </h2>
          <div className="mt-10 space-y-4">
            {topic.faqs.map((faq) => (
              <section key={faq.question[currentLocale]} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-extrabold tracking-normal text-gray-950">
                  {faq.question[currentLocale]}
                </h3>
                <p className="mt-3 leading-8 text-gray-600">{faq.answer[currentLocale]}</p>
              </section>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}

