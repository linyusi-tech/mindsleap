import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/shared/JsonLd";
import { asGeoLocale, getEntityGraphJsonLd } from "@/lib/geo";
import { getSiteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = getSiteUrl();

  return {
    title: {
      default: t("title"),
      template: `%s | MindsLeap`,
    },
    description: t("description"),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: "MindsLeap",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        zh: `${siteUrl}/zh`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const entityGraphJsonLd = getEntityGraphJsonLd(asGeoLocale(locale), getSiteUrl());

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <JsonLd data={entityGraphJsonLd} />
        <NextIntlClientProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
