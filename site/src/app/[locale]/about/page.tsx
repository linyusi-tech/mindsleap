import { setRequestLocale, getTranslations } from "next-intl/server";
import JsonLd from "@/components/shared/JsonLd";
import AboutContent from "@/components/about/AboutContent";
import { asGeoLocale, brandSummary } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("storyText"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();
  setRequestLocale(locale);

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "zh" ? "关于MindsLeap" : "About MindsLeap",
    description: brandSummary[currentLocale],
    url: `${siteUrl}/${currentLocale}/about`,
    mainEntity: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}
