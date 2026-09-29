import { getSiteUrl } from "@/lib/site";
import { EnterpriseAiServicesPage } from "../training/page";

type AiTransformationPageProps = {
  params: Promise<{ locale: string }>;
};

const metadataCopy = {
  zh: {
    title: "企业 AI 转型服务",
    description:
      "MindsLeap 通过 AI 培训、战略咨询、业务诊断与 FDE 落地，帮助企业识别高价值场景，把 AI 嵌入真实业务流程。",
  },
  en: {
    title: "Enterprise AI Transformation Services",
    description:
      "MindsLeap combines AI training, strategic advisory, business diagnostics, and FDE implementation to help enterprises embed AI into real workflows.",
  },
};

export async function generateMetadata({ params }: AiTransformationPageProps) {
  const { locale } = await params;
  const currentLocale = locale === "en" ? "en" : "zh";
  const copy = metadataCopy[currentLocale];
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${currentLocale}/services/ai-transformation`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {
        zh: `${siteUrl}/zh/services/ai-transformation`,
        en: `${siteUrl}/en/services/ai-transformation`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: "MindsLeap",
      type: "website",
    },
  };
}

export default async function AiTransformationPage({ params }: AiTransformationPageProps) {
  return EnterpriseAiServicesPage({ params, showCaseStudies: true });
}
