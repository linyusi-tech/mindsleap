import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ServicesHero from "@/components/services/ServicesHero";
import ProgramHighlight from "@/components/program/ProgramHighlight";
import JsonLd from "@/components/shared/JsonLd";
import { getServicesHubContent } from "@/lib/services-hub";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-primary md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-gray-600 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale === "en" ? "en" : "zh";
  const content = getServicesHubContent(currentLocale);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${currentLocale}/services`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: url,
      languages: {
        zh: `${siteUrl}/zh/services`,
        en: `${siteUrl}/en/services`,
      },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url,
      siteName: "MindsLeap",
      type: "website",
      images: [
        {
          url: `${siteUrl}/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg`,
          width: 2560,
          height: 1707,
          alt: "MindsLeap AI Native Enterprise Conference",
        },
      ],
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale === "en" ? "en" : "zh";
  setRequestLocale(currentLocale);

  const content = getServicesHubContent(currentLocale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${currentLocale}/services`;
  const absolute = (href: string) =>
    new URL(`/${currentLocale}${href}`, siteUrl).toString();

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.hero.title,
    description: content.hero.description,
    url: pageUrl,
    inLanguage: currentLocale === "zh" ? "zh-CN" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: "MindsLeap",
      url: siteUrl,
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: currentLocale === "zh" ? "首页" : "Home",
        item: `${siteUrl}/${currentLocale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.metadata.title,
        item: pageUrl,
      },
    ],
  };

  const servicesList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.families.title,
    itemListElement: content.families.items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: `${service.problem} ${service.delivery}`,
        audience: service.audience,
        url: absolute(service.href),
        provider: { "@type": "Organization", name: "MindsLeap", url: siteUrl },
      },
    })),
  };

  const casesList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.cases.title,
    itemListElement: content.cases.items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: project.title,
        description: project.summary,
        datePublished: project.publishedDate,
        image: new URL(project.image, siteUrl).toString(),
        url: absolute(`/news/${project.slug}`),
        about: project.organization,
      },
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={collectionPage} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={servicesList} />
      <JsonLd data={casesList} />
      <JsonLd data={faqPage} />

      <ServicesHero {...content.hero} />

      <section id="service-paths" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeading {...content.paths} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {content.paths.items.map((path) => (
              <article
                key={path.number}
                className="border-t-4 border-blue-500 bg-gray-50 p-6 md:p-7"
              >
                <p className="text-sm font-bold text-gray-500">{path.number}</p>
                <h3 className="mt-5 text-2xl font-bold text-gray-950">{path.title}</h3>
                <p className="mt-4 leading-7 text-gray-600">{path.description}</p>
                <div className="mt-6 flex flex-col items-start gap-3">
                  {path.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-semibold text-blue-500 hover:text-primary"
                    >
                      {link.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeading {...content.families} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.families.items.map((service) => (
              <article key={service.href} className="rounded-lg border border-gray-200 bg-white p-6 md:p-8">
                <div className="flex items-start justify-between gap-5 border-b border-gray-200 pb-5">
                  <h3 className="text-2xl font-bold text-gray-950">{service.name}</h3>
                  <span className="text-sm font-bold text-blue-500">{service.number}</span>
                </div>
                <dl className="mt-6 grid gap-5">
                  <div>
                    <dt className="text-sm font-semibold text-primary">{content.families.targetLabel}</dt>
                    <dd className="mt-1 leading-7 text-gray-600">{service.audience}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-primary">{content.families.problemLabel}</dt>
                    <dd className="mt-1 leading-7 text-gray-600">{service.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-primary">{content.families.deliveryLabel}</dt>
                    <dd className="mt-1 leading-7 text-gray-600">{service.delivery}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <Link href={service.href} className="font-semibold text-blue-500 hover:text-primary">
                    {content.families.detailLabel} <span aria-hidden="true">→</span>
                  </Link>
                  {service.evidenceHref ? (
                    <Link href={service.evidenceHref} className="font-semibold text-blue-500 hover:text-primary">
                      {content.families.evidenceLabel} <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProgramHighlight locale={currentLocale} compact />

      <section className="bg-primary-dark py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300">{content.delivery.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{content.delivery.title}</h2>
            <p className="mt-4 text-base leading-8 text-gray-200 md:text-lg">{content.delivery.description}</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/20 md:grid-cols-4">
            {content.delivery.stages.map((stage) => (
              <li key={stage.number} className="bg-primary-dark p-6 md:min-h-64 md:p-7">
                <p className="text-sm font-bold text-blue-300">{stage.number}</p>
                <h3 className="mt-8 text-xl font-bold">{stage.title}</h3>
                <p className="mt-4 leading-7 text-gray-200">{stage.description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-7 max-w-4xl border-l-2 border-blue-300 pl-5 leading-7 text-gray-200">
            {content.delivery.note}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeading {...content.cases} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.cases.items.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={`${project.organization}: ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: project.imagePosition }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-gray-500">
                    <span className="text-primary">{project.organization}</span>
                    <span aria-hidden="true">|</span>
                    <time dateTime={project.publishedDate}>{project.date}</time>
                  </div>
                  <h3 className="mt-4 text-xl font-bold leading-8 text-gray-950">{project.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-blue-500">{project.services}</p>
                  <p className="mt-4 leading-7 text-gray-600">{project.summary}</p>
                  <Link
                    href={`/news/${project.slug}`}
                    className="mt-6 inline-flex font-semibold text-blue-500 hover:text-primary"
                  >
                    {content.cases.linkLabel} <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <SectionHeading {...content.platform} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.platform.items.map((item) => (
              <article
                key={item.title}
                className="border-l-4 border-blue-500 bg-white p-6 md:p-7"
              >
                <h3 className="text-xl font-bold text-gray-950">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
                <Link href={item.href} className="mt-5 inline-flex font-semibold text-blue-500 hover:text-primary">
                  {item.linkLabel} <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
          <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} />
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {content.faq.items.map((faq, index) => (
              <details key={faq.question} className="group py-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold leading-7 text-gray-950">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="mt-1 text-xl text-blue-500 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 pr-10 leading-7 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-gradient py-14 text-white md:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">{content.cta.title}</h2>
            <p className="mt-4 text-base leading-8 text-white/85 md:text-lg">{content.cta.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-primary hover:bg-gray-100">
              {content.cta.primaryLabel}
            </Link>
            <Link href="/services/ai-transformation" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10">
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
