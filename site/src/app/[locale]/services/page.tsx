import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ServicesHero from "@/components/services/ServicesHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "我们的服务",
    subtitle: "连接企业家、产业场景、AI原生项目与全球市场",
    services: [
      {
        title: "企业家AI俱乐部",
        description:
          "企业家AI转型实战社群，30-50人精品闭门会，私享会、Workshop、企业参访，极致坦诚、共创共赢。",
        href: "/services/ai-club",
        icon: "🤝",
      },
      {
        title: "AI转型服务",
        description:
          "提供AI培训、咨询与FDE一体化落地服务，帮助企业识别高价值场景，跑出可衡量的业务结果。",
        href: "/services/ai-transformation",
        icon: "⚡",
      },
      {
        title: "创业加速",
        description:
          "面向OPC、AI原生企业与科技独角兽，连接产业场景、导师网络、资本与全球市场。",
        href: "/services/accelerator",
        icon: "🚀",
      },
      {
        title: "出海服务",
        description:
          "提供产业考察、海外市场拓展与全球人才服务，帮助中国企业连接国际资源和全球增长机会。",
        href: "/services/global-growth",
        icon: "🌍",
      },
    ],
  },
  en: {
    title: "Our Services",
    subtitle:
      "Connecting entrepreneurs, industry scenarios, AI-native ventures, and global markets",
    services: [
      {
        title: "Founders AI Club",
        description:
          "An exclusive AI transformation community for entrepreneurs. Intimate 30-50 person closed-door sessions featuring workshops, site visits, and candid knowledge sharing.",
        href: "/services/ai-club",
        icon: "🤝",
      },
      {
        title: "AI Transformation Services",
        description:
          "AI training, advisory, and FDE implementation services that help enterprises identify high-value scenarios and produce measurable outcomes.",
        href: "/services/ai-transformation",
        icon: "⚡",
      },
      {
        title: "Startup Acceleration",
        description:
          "For OPC founders, AI-native ventures, and tech unicorns, connecting industry scenarios, mentors, capital, and global markets.",
        href: "/services/accelerator",
        icon: "🚀",
      },
      {
        title: "Global Growth Services",
        description:
          "Industry visits, overseas GTM, and global talent services that help Chinese companies connect global growth opportunities.",
        href: "/services/global-growth",
        icon: "🌍",
      },
    ],
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] || content.zh;
  return {
    title: c.title,
    description: c.subtitle,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      <ServicesHero />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {locale === "zh" ? "了解更多" : "Learn more"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {locale === "zh"
              ? "准备好开启AI转型之旅？"
              : "Ready to Start Your AI Transformation?"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "zh"
              ? "联系我们，了解最适合您的AI转型方案"
              : "Contact us to discover the AI transformation solution that fits your needs"}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {locale === "zh" ? "联系我们" : "Contact Us"}
          </Link>
        </div>
      </section>
    </>
  );
}
