import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import StudyToursHero from "@/components/services/StudyToursHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "出海服务",
    subtitle: "产业考察 x 海外市场拓展 x 全球人才服务",
    heroDescription:
      "为中国AI公司、科技企业和产业客户提供产业考察、海外市场拓展与全球人才服务，连接全球增长机会。",
    aboutTitle: "出海服务概览",
    aboutDescription:
      "MindsLeap出海服务依托Founders Space全球网络、硅谷产业资源和专业服务伙伴，为中国企业提供从产业考察、市场判断、GTM设计到全球人才与本地化资源对接的一站式支持。我们不做走马观花的参访，而是帮助企业在真实市场中建立认知、连接资源并推进业务行动。",
    servicesTitle: "核心服务",
    services: [
      {
        title: "产业考察",
        description:
          "围绕AI、科技、制造、跨境电商等方向，定制硅谷、中东、东南亚等区域的深度产业考察与高层交流。",
      },
      {
        title: "海外市场拓展 / GTM",
        description:
          "帮助企业判断目标市场、设计定位、定价、渠道、BD和品牌策略，形成可执行的海外增长路径。",
      },
      {
        title: "全球人才服务",
        description:
          "联动全球人才服务伙伴，支持海外招聘、EOR、薪酬合规、签证与跨国团队搭建。",
      },
      {
        title: "本地伙伴与合规资源",
        description:
          "连接法律、税务、公司架构、投融资和当地产业伙伴，降低企业进入海外市场的不确定性。",
      },
    ],
    itineraryTitle: "产业考察方向",
    itinerary: [
      {
        title: "硅谷 / GTC 大会",
        description:
          "组织企业家深度参与NVIDIA GTC等全球AI技术盛会，近距离感受AI前沿突破与产业应用。",
      },
      {
        title: "斯坦福/伯克利AI Lab",
        description:
          "深入世界顶级AI实验室，与前沿研究者面对面交流，了解即将改变世界的技术趋势。",
      },
      {
        title: "科技巨头与AI企业参访",
        description:
          "走进Google、NVIDIA、Tesla等科技与AI企业生态，了解前沿产品、组织能力与商业化路径。",
      },
      {
        title: "海外产业与投资机构交流",
        description:
          "与产业伙伴、投资机构、创业生态和专业服务机构交流，寻找合作、投资与市场进入机会。",
      },
    ],
    valueTitle: "服务价值",
    values: [
      {
        title: "市场认知",
        description:
          "通过真实产业现场和一线专家交流，建立对海外市场、客户需求和竞争格局的第一手判断。",
      },
      {
        title: "资源连接",
        description:
          "依托Founders Space与全球伙伴网络，连接科技企业、投资机构、服务商和本地合作伙伴。",
      },
      {
        title: "GTM路径",
        description:
          "围绕产品定位、渠道、人才和交付方式，帮助企业形成可落地的海外市场拓展路径。",
      },
      {
        title: "长期陪跑",
        description:
          "从考察、诊断到伙伴匹配与项目管理，持续支持企业把出海机会转化为真实业务结果。",
      },
    ],
    featuresTitle: "服务特色",
    features: [
      "Founders Space全球合伙人身份背书",
      "产业考察与GTM咨询结合",
      "全球人才与专业服务伙伴支持",
      "高端小团与企业定制方案",
      "中英双语沟通与跨文化支持",
      "项目后持续资源对接与跟进",
    ],
    pricingNote: "出海服务可按企业需求定制，详情请咨询",
    ctaTitle: "开启您的全球市场",
    ctaDescription: "无论您正在规划产业考察、海外GTM还是全球团队搭建，我们都可以帮助您连接合适的市场、伙伴与资源。",
    ctaButton: "开启全球市场",
    backLink: "返回所有服务",
  },
  en: {
    title: "Global Growth Services",
    subtitle: "Industry Visits x Overseas GTM x Global Talent",
    heroDescription:
      "For Chinese AI companies, tech enterprises, and industrial clients, we provide industry visits, overseas GTM, and global talent services to connect global growth opportunities.",
    aboutTitle: "Global Growth Overview",
    aboutDescription:
      "MindsLeap Global Growth Services leverage the Founders Space global network, Silicon Valley industry resources, and professional service partners to support Chinese companies from industry visits and market judgment to GTM design, global talent, and localization resources. We go beyond surface-level tours to help companies build market insight, connect resources, and move toward business action.",
    servicesTitle: "Core Services",
    services: [
      {
        title: "Industry Visits",
        description:
          "Customized deep-dive visits and executive exchanges across Silicon Valley, the Middle East, Southeast Asia, and other regions around AI, technology, manufacturing, and cross-border commerce.",
      },
      {
        title: "Overseas GTM",
        description:
          "Support target-market selection, positioning, pricing, channels, business development, and brand strategy to build an executable global growth path.",
      },
      {
        title: "Global Talent Services",
        description:
          "Work with global talent partners to support overseas recruiting, EOR, compensation compliance, visas, and cross-border team setup.",
      },
      {
        title: "Local Partners & Compliance",
        description:
          "Connect legal, tax, corporate-structure, fundraising, and local industry partners to reduce uncertainty when entering overseas markets.",
      },
    ],
    itineraryTitle: "Industry Visit Themes",
    itinerary: [
      {
        title: "Silicon Valley / GTC Conference",
        description:
          "Bring entrepreneurs to global AI technology events such as NVIDIA GTC to experience frontier breakthroughs and industrial applications firsthand.",
      },
      {
        title: "Stanford/Berkeley AI Labs",
        description:
          "Deep dive into world-class AI laboratories, engaging face-to-face with frontier researchers on world-changing technology trends.",
      },
      {
        title: "Tech Giants & AI Company Visits",
        description:
          "Step into ecosystems around companies such as Google, NVIDIA, and Tesla to understand frontier products, organizational capabilities, and commercialization paths.",
      },
      {
        title: "Industry & Investor Exchanges",
        description:
          "Meet industry partners, investors, startup ecosystems, and professional service providers to explore collaboration, investment, and market-entry opportunities.",
      },
    ],
    valueTitle: "Service Value",
    values: [
      {
        title: "Market Insight",
        description:
          "Build first-hand judgment on overseas markets, customer needs, and competitive landscapes through real industry sites and expert exchanges.",
      },
      {
        title: "Resource Connections",
        description:
          "Leverage Founders Space and global partner networks to connect tech companies, investors, service providers, and local partners.",
      },
      {
        title: "GTM Path",
        description:
          "Shape an actionable global-market path around product positioning, channels, talent, and delivery models.",
      },
      {
        title: "Long-Term Support",
        description:
          "Support companies from visits and diagnosis to partner matching and project management, turning global opportunities into business outcomes.",
      },
    ],
    featuresTitle: "Service Highlights",
    features: [
      "Founders Space Global Partner endorsement",
      "Industry visits combined with GTM advisory",
      "Global talent and professional-service partner support",
      "Premium small groups and enterprise customization",
      "Bilingual communication and cross-cultural support",
      "Post-project resource follow-up and coordination",
    ],
    pricingNote: "Global growth services can be customized based on enterprise needs. Contact us for details.",
    ctaTitle: "Start Your Global Market Journey",
    ctaDescription:
      "Whether you are planning industry visits, overseas GTM, or global team setup, we can help connect the right markets, partners, and resources.",
    ctaButton: "Start Global Growth",
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

export default async function StudyToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      {/* Hero Section */}
      <StudyToursHero />

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {c.aboutTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {c.aboutDescription}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
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

      {/* Core Itinerary */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.itineraryTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.itinerary.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.valueTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.values.map((value) => (
              <div
                key={value.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {c.featuresTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {c.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic">{c.pricingNote}</p>
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
