import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import IncubationHero from "@/components/services/IncubationHero";

type Props = {
  params: Promise<{ locale: string }>;
};

function VentureIcon({ type }: { type: "opc" | "aiNative" | "unicorn" }) {
  const className = "h-7 w-7";
  if (type === "opc") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "aiNative") {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 6v12M6 12h12M7.5 7.5l9 9M16.5 7.5l-9 9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="20.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="20.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="3.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M5 19c4.5-.5 8-2.5 10.5-6L19 8.5 15.5 5C12 7.5 10 11 9.5 15.5L5 19z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15.5 5H20v4.5M8 16l-3 3M10 19l-2 2M5 14l-2 2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const content = {
  zh: {
    title: "创业加速",
    subtitle: "OPC x AI原生企业 x 科技独角兽",
    heroDescription:
      "面向OPC、AI原生企业与科技独角兽，连接产业场景、导师网络、资本与全球市场。",
    aboutTitle: "创业加速服务概览",
    aboutDescription:
      "MindsLeap创业加速服务依托Founders Space在全球50+合作伙伴的强大网络，为OPC、AI原生企业和科技企业搭建从真实产业场景到全球市场的桥梁。我们不仅提供导师辅导和投资对接，更注重客户场景、技术验证、商业化路径和国际化战略的全流程赋能。",
    ventureTypesTitle: "我们加速的三类项目",
    ventureTypes: [
      {
        title: "OPC 一人公司",
        icon: "opc" as const,
        description:
          "面向AI时代的超级个体和一人公司创业者，帮助他们用AI Agent、自动化工具和内容/软件能力服务真实产业客户。",
      },
      {
        title: "AI原生企业",
        icon: "aiNative" as const,
        description:
          "面向从第一天就基于AI构建产品、运营和组织的创业公司，帮助团队找到真实场景、客户验证和增长路径。",
      },
      {
        title: "科技独角兽",
        icon: "unicorn" as const,
        description:
          "面向已有技术、产品或融资基础的科技企业，提供硅谷导师、资本对接、产业资源与全球市场拓展支持。",
      },
    ],
    accelerationModelTitle: "产业命题驱动的加速机制",
    accelerationModelDescription:
      "我们相信，AI创业不能只停留在概念和Demo，而要从真实客户和真实场景出发。MindsLeap将产业需求、创业者、导师、资本和政府/园区资源组织成一个可持续的加速闭环。",
    accelerationSteps: [
      "产业命题",
      "项目招募",
      "AI导师辅导",
      "入驻孵化",
      "采购/投资对接",
      "Demo Day",
    ],
    servicesTitle: "核心服务",
    services: [
      {
        title: "产业场景对接",
        description:
          "精准匹配AI技术、OPC能力与行业应用场景，帮助创业者找到最具商业价值的落地方向。",
      },
      {
        title: "创业辅导与商业化",
        description:
          "通过硅谷导师、产业专家和MindsLeap方法论，帮助项目打磨定位、商业模式、客户验证和增长路径。",
      },
      {
        title: "投资与Demo Day",
        description:
          "链接国内外天使、VC、PE和产业资本，为优质项目提供路演、融资支持与战略投资引荐。",
      },
      {
        title: "硅谷与全球资源导入",
        description:
          "引入Founders Space全球导师网络、技术专家及产业资源，加速项目国际化发展。",
      },
      {
        title: "全球市场拓展",
        description:
          "借助Founders Space在50+国家和地区的合作伙伴网络，助力企业快速进入全球市场。",
      },
      {
        title: "OPC大会 / AI原生企业大会",
        description:
          "通过主题大会、项目路演和产业闭门会，集中连接创业者、企业客户、投资人、政府园区与全球资源。",
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
    targetTitle: "目标项目",
    targets: [
      "OPC、一人公司与超级个体创业者",
      "AI原生企业与AI Agent项目",
      "具有产业落地需求的科技创业团队",
      "具有全球化愿景的科技独角兽",
    ],
    ctaTitle: "申请加入MindsLeap创业加速",
    ctaDescription: "无论您是OPC、AI原生企业，还是正在走向全球市场的科技创业团队，我们都期待了解您的项目。",
    ctaButton: "提交项目",
    backLink: "返回所有服务",
  },
  en: {
    title: "Startup Acceleration",
    subtitle: "OPC x AI-Native Ventures x Tech Unicorns",
    heroDescription:
      "For OPC founders, AI-native ventures, and emerging tech unicorns, we connect industry scenarios, mentors, capital, and global markets.",
    aboutTitle: "Acceleration Overview",
    aboutDescription:
      "MindsLeap Startup Acceleration leverages Founders Space's powerful network of 50+ global partners to help OPC founders, AI-native companies, and tech startups move from real industry scenarios to global markets. We go beyond mentor and investor access, focusing on customer scenarios, technical validation, commercialization paths, and internationalization strategy.",
    ventureTypesTitle: "Three Types of Ventures We Accelerate",
    ventureTypes: [
      {
        title: "OPC / One-Person Companies",
        icon: "opc" as const,
        description:
          "For AI-era solo founders and super individuals using AI agents, automation tools, and software/content capabilities to serve real industry customers.",
      },
      {
        title: "AI-Native Ventures",
        icon: "aiNative" as const,
        description:
          "For startups built around AI from day one across product, operations, and organization, helping teams validate real scenarios and growth paths.",
      },
      {
        title: "Emerging Tech Unicorns",
        icon: "unicorn" as const,
        description:
          "For tech companies with strong products, technology, or funding foundations, providing Silicon Valley mentors, capital access, industry resources, and global expansion support.",
      },
    ],
    accelerationModelTitle: "Industry-Challenge Driven Acceleration",
    accelerationModelDescription:
      "AI startups cannot stop at concepts and demos. We start from real customers and real scenarios, organizing industry demand, founders, mentors, capital, and government/park resources into a sustainable acceleration loop.",
    accelerationSteps: [
      "Industry challenge",
      "Project scouting",
      "AI mentor coaching",
      "Incubation",
      "Procurement / investment matching",
      "Demo Day",
    ],
    servicesTitle: "Core Services",
    services: [
      {
        title: "Industry Scenario Matching",
        description:
          "Match AI technology and OPC capabilities with industry application scenarios, helping entrepreneurs find commercially viable directions.",
      },
      {
        title: "Founder Coaching & Commercialization",
        description:
          "Work with Silicon Valley mentors, industry experts, and MindsLeap frameworks to refine positioning, business models, customer validation, and growth paths.",
      },
      {
        title: "Investment & Demo Day",
        description:
          "Connect with domestic and global angels, VCs, PEs, and strategic capital through roadshows, financing support, and investment referrals.",
      },
      {
        title: "Silicon Valley & Global Resources",
        description:
          "Access the Founders Space global mentor network, technical experts, and industry resources to accelerate international development.",
      },
      {
        title: "Global Market Expansion",
        description:
          "Leverage the Founders Space network across 50+ countries and regions to help companies quickly enter global markets.",
      },
      {
        title: "OPC Summit / AI Native Enterprise Summit",
        description:
          "Use summits, project roadshows, and industry closed-door sessions to connect founders, enterprise customers, investors, government parks, and global resources.",
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
      "Ranked the #1 incubator in Silicon Valley by Forbes, with branches in 50+ countries. MindsLeap, as the exclusive Greater China partner of Founders Space, brings authentic Silicon Valley acceleration resources to domestic entrepreneurs.",
    targetTitle: "Target Ventures",
    targets: [
      "OPC founders, one-person companies, and super individuals",
      "AI-native ventures and AI agent projects",
      "Tech startup teams seeking industry implementation",
      "Emerging tech unicorns with global ambitions",
    ],
    ctaTitle: "Apply for MindsLeap Startup Acceleration",
    ctaDescription:
      "Whether you are an OPC founder, an AI-native venture, or a tech startup going global, we would love to learn about your project.",
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

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.ventureTypesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.ventureTypes.map((type, index) => (
              <div
                key={type.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <VentureIcon type={type.icon} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-left">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {c.accelerationModelTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {c.accelerationModelDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {c.accelerationSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl bg-primary text-white p-5 text-center shadow-sm"
              >
                <div className="text-sm text-white/60 mb-2">0{index + 1}</div>
                <div className="font-semibold leading-snug">{step}</div>
              </div>
            ))}
          </div>
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
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {c.targetTitle}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              {c.targets.map((target) => (
                <div
                  key={target}
                  className="rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4 text-gray-700"
                >
                  {target}
                </div>
              ))}
            </div>
          </div>
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
