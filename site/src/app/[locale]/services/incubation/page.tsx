import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import IncubationHero from "@/components/services/IncubationHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "独角兽孵化",
    subtitle: "AI创业加速 x 硅谷资源导入",
    heroDescription:
      "联合Founders Space全球网络，为AI创业者和科技企业提供从0到1的全方位孵化支持。",
    aboutTitle: "孵化服务概览",
    aboutDescription:
      "MindsLeap独角兽孵化项目依托Founders Space在全球50+合作伙伴的强大网络，为中国AI创业者和科技企业搭建通往全球市场的桥梁。我们不仅提供资金对接，更注重场景落地、技术验证和国际化战略的全流程赋能。",
    servicesTitle: "核心服务",
    services: [
      {
        title: "场景对接",
        description:
          "精准匹配AI技术与行业应用场景，帮助创业者找到最具商业价值的落地方向。",
      },
      {
        title: "投资对接",
        description:
          "链接国内外顶级投资机构，为优质项目提供多轮次融资支持与战略投资引荐。",
      },
      {
        title: "硅谷资源导入",
        description:
          "引入Founders Space全球导师网络、技术专家及产业资源，加速项目国际化发展。",
      },
      {
        title: "全球市场拓展",
        description:
          "借助Founders Space在50+国家和地区的合作伙伴网络，助力企业快速进入全球市场。",
      },
    ],
    portfolioTitle: "我们曾经孵化或投资过的企业",
    portfolioSubtitle: "以下为部分 Founders Space 孵化或投资过的代表性企业",
    portfolio: [
      { name: "Instagram", description: "全球知名图片社交平台" },
      { name: "Mashape / RapidAPI", description: "全球最大的API市场平台" },
      { name: "Vurb", description: "智能搜索引擎（被Snapchat收购）" },
      { name: "CardMunch", description: "名片识别工具（被LinkedIn收购）" },
      { name: "Alooma", description: "数据管道平台（被Google收购）" },
      { name: "Bossa Nova Robotics", description: "零售机器人自动化" },
    ],
    partnerTitle: "战略合作伙伴",
    partnerName: "Founders Space",
    partnerDescription:
      "被《福布斯》评为硅谷第一孵化器，在全球50+国家和地区拥有合作伙伴，培育了众多成功创业项目。MindsLeap作为Founders Space大中华区独家合作伙伴，为国内创业者带来原汁原味的硅谷孵化资源。",
    targetTitle: "目标客群",
    targets: [
      "AI领域创业者与初创团队",
      "寻求AI转型的科技企业",
      "希望进入中国市场的海外AI企业",
      "具有全球化愿景的技术创新者",
    ],
    ctaTitle: "开启您的孵化之旅",
    ctaDescription: "让我们一起，将您的AI创意变为商业现实。",
    ctaButton: "提交项目",
    backLink: "返回所有服务",
  },
  en: {
    title: "Unicorn Incubation",
    subtitle: "AI Startup Acceleration x Silicon Valley Resources",
    heroDescription:
      "Partnering with the global Founders Space network to provide comprehensive incubation support for AI entrepreneurs and tech companies.",
    aboutTitle: "Incubation Overview",
    aboutDescription:
      "The MindsLeap Unicorn Incubation program leverages Founders Space's powerful network of 50+ global branches to build a bridge for Chinese AI entrepreneurs and tech companies to reach global markets. We go beyond funding connections, focusing on scenario implementation, technology validation, and full-process empowerment for internationalization strategies.",
    servicesTitle: "Core Services",
    services: [
      {
        title: "Scenario Matching",
        description:
          "Precisely match AI technology with industry application scenarios, helping entrepreneurs find the most commercially viable directions.",
      },
      {
        title: "Investment Connections",
        description:
          "Connect with top domestic and international investment institutions, providing multi-round financing support and strategic investment referrals.",
      },
      {
        title: "Silicon Valley Resource Integration",
        description:
          "Access the Founders Space global mentor network, technical experts, and industry resources to accelerate international development.",
      },
      {
        title: "Global Market Expansion",
        description:
          "Leverage the Founders Space network across 50+ countries and regions to help companies quickly enter global markets.",
      },
    ],
    portfolioTitle: "Companies We Have Incubated or Invested In",
    portfolioSubtitle: "Selected companies incubated or invested by Founders Space",
    portfolio: [
      { name: "Instagram", description: "Global photo-sharing social platform" },
      { name: "Mashape / RapidAPI", description: "World's largest API marketplace" },
      { name: "Vurb", description: "Smart search engine (acquired by Snapchat)" },
      { name: "CardMunch", description: "Business card recognition (acquired by LinkedIn)" },
      { name: "Alooma", description: "Data pipeline platform (acquired by Google)" },
      { name: "Bossa Nova Robotics", description: "Retail robotics automation" },
    ],
    partnerTitle: "Strategic Partner",
    partnerName: "Founders Space",
    partnerDescription:
      "Ranked the #1 incubator in Silicon Valley by Forbes, with branches in 50+ countries. MindsLeap, as the exclusive Greater China partner of Founders Space, brings authentic Silicon Valley incubation resources to domestic entrepreneurs.",
    targetTitle: "Target Clients",
    targets: [
      "AI entrepreneurs and startup teams",
      "Tech companies seeking AI transformation",
      "Overseas AI companies looking to enter the Chinese market",
      "Technology innovators with a global vision",
    ],
    ctaTitle: "Start Your Incubation Journey",
    ctaDescription:
      "Let us help turn your AI idea into commercial reality.",
    ctaButton: "Submit Your Project",
    backLink: "Back to All Services",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] || content.zh;
  return {
    title: c.title,
    description: c.heroDescription,
  };
}

export default async function IncubationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      {/* Hero Section */}
      <IncubationHero />

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {c.aboutTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {c.aboutDescription}
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {c.partnerTitle}
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-6">
            {c.partnerName}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            {c.partnerDescription}
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {c.portfolioTitle}
          </h2>
          <p className="text-gray-500 text-center mb-12">
            {c.portfolioSubtitle}
          </p>
          <Image
            src="/images/portfolio-logowall-v2.png"
            alt={c.portfolioTitle}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {c.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {c.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
