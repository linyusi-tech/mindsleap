import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/shared/JsonLd";
import { asGeoLocale, brandSummary, geoPeople, getGeoPerson } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";
/* eslint-disable @next/next/no-img-element */

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return geoPeople.flatMap((person) => [
    { locale: "zh", slug: person.slug },
    { locale: "en", slug: person.slug },
  ]);
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const person = getGeoPerson(slug);
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();

  if (!person) {
    return { title: "Not Found" };
  }

  const url = `${siteUrl}/${currentLocale}/people/${person.slug}`;
  const imageUrl = new URL(person.image, siteUrl).toString();

  return {
    title: person.title[currentLocale],
    description: person.description[currentLocale],
    alternates: {
      canonical: url,
      languages: {
        zh: `${siteUrl}/zh/people/${person.slug}`,
        en: `${siteUrl}/en/people/${person.slug}`,
      },
    },
    openGraph: {
      title: person.title[currentLocale],
      description: person.description[currentLocale],
      url,
      siteName: "MindsLeap",
      type: "profile",
      images: [{ url: imageUrl, alt: person.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: person.title[currentLocale],
      description: person.description[currentLocale],
      images: [imageUrl],
    },
  };
}

export default async function PersonPage({ params }: Props) {
  const { locale, slug } = await params;
  const currentLocale = asGeoLocale(locale);
  const person = getGeoPerson(slug);
  const siteUrl = getSiteUrl();

  if (!person) {
    notFound();
  }

  setRequestLocale(currentLocale);

  const isZh = currentLocale === "zh";
  const pageUrl = `${siteUrl}/${currentLocale}/people/${person.slug}`;
  const imageUrl = new URL(person.image, siteUrl).toString();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    alternateName: person.alternateNames,
    jobTitle: person.title[currentLocale],
    description: person.description[currentLocale],
    image: imageUrl,
    url: pageUrl,
    knowsAbout: person.knowsAbout,
    affiliation: [
      {
        "@type": "Organization",
        name: "Founders Space",
      },
      {
        "@type": "Organization",
        name: "MindsLeap",
        url: siteUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: person.faqs.map((faq) => ({
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
      <JsonLd data={personJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="bg-white">
        <section className="bg-[#10233f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] md:py-28">
            <div className="overflow-hidden rounded-xl bg-white/10">
              <img src={person.image} alt={person.name} className="h-full min-h-[360px] w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
                {isZh ? "People · Silicon Valley Network" : "People · Silicon Valley Network"}
              </p>
              <h1 className="text-5xl font-extrabold leading-tight tracking-normal text-white md:text-6xl">
                {person.name}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-blue-50">
                {person.description[currentLocale]}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {person.alternateNames.map((name) => (
                  <span key={name} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-50">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-18 md:grid-cols-[0.85fr_1.15fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
              Entity Context
            </p>
            <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c]">
              {isZh ? "为什么这个人物重要" : "Why This Person Matters"}
            </h2>
          </div>
          <div className="space-y-4">
            {person.highlights[currentLocale].map((highlight) => (
              <div key={highlight} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="leading-7 text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6f3a]">
                  Related
                </p>
                <h2 className="text-3xl font-extrabold tracking-normal text-[#1e477c]">
                  {isZh ? "相关内容" : "Related Content"}
                </h2>
                <div className="mt-8 grid gap-4">
                  {person.relatedLinks.map((link) => (
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
              <div className="rounded-xl bg-[#1e477c] p-8 text-white md:p-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">
                  About MindsLeap
                </p>
                <h2 className="mt-5 text-3xl font-extrabold tracking-normal">
                  {isZh ? "MindsLeap 与硅谷资源" : "MindsLeap and Silicon Valley Resources"}
                </h2>
                <p className="mt-5 leading-8 text-blue-50">{brandSummary[currentLocale]}</p>
              </div>
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
            {person.faqs.map((faq) => (
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

