import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AIClubHero from "@/components/services/AIClubHero";
import { getAllPosts } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "MindsLeap 企业家 AI 俱乐部",
    subtitle: "企业家AI转型实战社群",
    heroDescription:
      "30-50人精品闭门社群，汇聚最具前瞻性的企业家，共同探索AI时代的转型之路。",
    stats: [
      { value: "37+", label: "付费会员" },
      { value: "9,800", label: "人均年费(元)" },
      { value: "30-50", label: "精品闭门规模" },
    ],
    aboutTitle: "关于 MindsLeap 企业家 AI 俱乐部",
    aboutDescription:
      "MindsLeap 企业家 AI 俱乐部是一个专注于 AI 转型的高端企业家社群。我们相信，在 AI 时代，企业家之间的深度交流与资源共享是实现成功转型的关键。通过邀请硅谷 AI 专家闭门交流、前沿科技企业参访、企业 AI 应用分享和工作坊，以及会员之间的交流共创，我们为会员打造一个极致坦诚、持续进化、共创共赢且具有全球连接的多元社区。",
    activitiesTitle: "活动形式",
    activities: [
      {
        title: "大咖私享会",
        description: "硅谷AI专家与企业家面对面深度交流，分享前沿科技投资、AI趋势与实战经验。",
        image: "/images/news/ai-native-enterprise-conference-shanghai-2026-hoffman.jpg",
        imageAlt: "Steve Hoffman 在 AI 原生企业大会上分享",
      },
      {
        title: "Workshop工作坊",
        description: "动手实践AI工具与方法论，让企业家亲身体验AI的力量。",
        image: "/images/news/ai-lobster-shanghai-2026-audience.jpg",
        imageAlt: "企业家在 AI 龙虾大会 Workshop 中学习",
      },
      {
        title: "企业参访",
        description: "走进AI标杆企业，近距离观察AI落地的真实场景与最佳实践。",
        image: "/images/news/zhipu-ai-founders-ai-club-visit-2026-sharing.jpg",
        imageAlt: "MindsLeap 企业家 AI 俱乐部参访智谱 AI",
      },
      {
        title: "企业家共创流",
        description: "通过设定开放心态、彼此平等、话语平权的氛围，让企业家会员们\"群智涌现\"。",
        image: "/images/news/tsinghua-emba-hangzhou-ai-study-tour-2026-second-brain.jpg",
        imageAlt: "企业家在杭州 AI 研学活动中交流共创",
      },
    ],
    valuesTitle: "核心价值观",
    values: [
      {
        title: "极致坦诚",
        description: "真诚分享，不设壁垒，在信任中实现共同成长。",
      },
      {
        title: "共创共赢",
        description: "汇聚集体智慧，打造协作生态，实现多方共赢。",
      },
      {
        title: "终身进化",
        description: "保持学习心态，持续迭代认知，与AI时代同步进化。",
      },
      {
        title: "全球视野",
        description: "链接硅谷与全球AI前沿，培养国际化战略思维。",
      },
    ],
    ctaTitle: "加入 MindsLeap 企业家 AI 俱乐部",
    ctaDescription: "与志同道合的企业家一起，开启AI转型之旅。",
    ctaButton: "申请加入",
    backLink: "返回所有服务",
  },
  en: {
    title: "MindsLeap Founders AI Club",
    subtitle: "AI Transformation Community for Entrepreneurs",
    heroDescription:
      "An exclusive 30-50 person closed-door community bringing together the most forward-thinking entrepreneurs to explore AI transformation.",
    stats: [
      { value: "37+", label: "Paid Members" },
      { value: "9,800", label: "Annual Fee (CNY)" },
      { value: "30-50", label: "Exclusive Group Size" },
    ],
    aboutTitle: "About the MindsLeap Founders AI Club",
    aboutDescription:
      "The MindsLeap Founders AI Club is a premium entrepreneur community focused on AI transformation. We believe that deep exchange and resource sharing among entrepreneurs is the key to successful transformation in the AI era. Through our intimate closed-door format, we create a platform for candid, efficient, and meaningful dialogue.",
    activitiesTitle: "Activity Formats",
    activities: [
      {
        title: "Private Salons",
        description:
          "Face-to-face deep discussions with top AI experts and entrepreneurs, sharing cutting-edge trends and practical insights.",
        image: "/images/news/ai-native-enterprise-conference-shanghai-2026-hoffman.jpg",
        imageAlt: "Steve Hoffman speaking at the AI Native Enterprise Conference",
      },
      {
        title: "Workshops",
        description:
          "Hands-on practice with AI tools and methodologies, giving entrepreneurs first-hand experience with AI capabilities.",
        image: "/images/news/ai-lobster-shanghai-2026-audience.jpg",
        imageAlt: "Entrepreneurs learning at an AI Lobster workshop",
      },
      {
        title: "Enterprise Visits",
        description:
          "On-site visits to AI-leading companies, observing real-world AI deployment scenarios and best practices.",
        image: "/images/news/zhipu-ai-founders-ai-club-visit-2026-sharing.jpg",
        imageAlt: "MindsLeap Founders AI Club visiting Zhipu AI",
      },
      {
        title: "Lobster Summit",
        description:
          "Deep exchanges in relaxed social settings, sparking ideas and connections over fine dining.",
        image: "/images/news/tsinghua-emba-hangzhou-ai-study-tour-2026-second-brain.jpg",
        imageAlt: "Entrepreneurs exchanging ideas during a Hangzhou AI study session",
      },
    ],
    valuesTitle: "Core Values",
    values: [
      {
        title: "Radical Candor",
        description:
          "Share openly without barriers, achieving mutual growth through trust.",
      },
      {
        title: "Co-creation & Win-Win",
        description:
          "Harness collective wisdom, build collaborative ecosystems, achieve shared success.",
      },
      {
        title: "Lifelong Evolution",
        description:
          "Maintain a learning mindset, continuously iterate understanding, evolve with the AI era.",
      },
      {
        title: "Global Perspective",
        description:
          "Connect with Silicon Valley and global AI frontiers, cultivate international strategic thinking.",
      },
    ],
    ctaTitle: "Join the MindsLeap Founders AI Club",
    ctaDescription:
      "Start your AI transformation journey with like-minded entrepreneurs.",
    ctaButton: "Apply to Join",
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

export default async function AIClubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      {/* Hero Section */}
      <AIClubHero />

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

      {/* Activities Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.activitiesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.activities.map((activity) => (
              <div
                key={activity.title}
                className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      {(() => {
        const allPosts = getAllPosts(locale);
        const clubEventSlugs = new Set([
          "ai-lobster-shanghai-2026",
          "ai-digital-employee-workshop-shanghai-2026",
          "ai-native-enterprise-conference-shanghai-2026",
          "ai-marketing-workshop-2025",
          "cui-jian-ai-native-enterprise-sharing-recap-2026",
          "hangzhou-retreat-2026",
          "jeff-qian-ai-native-enterprise-sharing-recap-2026",
          "hoffman-shanghai-2025",
          "lincoln-opc-chongqing-ai-transformation-2026",
          "lincoln-ai-native-organization-sharing-recap-2026",
          "nanchang-ai-digital-employee-bootcamp-2026",
          "zhipu-ai-founders-ai-club-visit-2026",
          "suzhou-ai-growth-exchange-digital-employees-2026",
          "steve-hoffman-ai-native-enterprise-sharing-recap-2026",
        ]);
        const eventPosts = allPosts
          .filter((p) => p.category === "events" && clubEventSlugs.has(p.slug))
          .slice(0, 3);
        const sectionTitle = locale === "zh" ? "往期精彩回顾" : "Past Event Highlights";
        if (eventPosts.length === 0) return null;
        return (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {sectionTitle}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {eventPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}` as never}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.valuesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.values.map((value) => (
              <div key={value.title} className="text-center p-6">
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
