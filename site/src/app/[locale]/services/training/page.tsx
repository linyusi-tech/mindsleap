import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import TrainingHero from "@/components/services/TrainingHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "企业 AI 转型服务",
    heroDescription:
      "面向企业家、高管与创新团队，提供结合硅谷前沿洞察、真实业务场景与 FDE 落地能力的 AI 培训、咨询与转型服务。",
    whyTitle: "为什么选择 MindsLeap",
    whyDescription:
      "我们不是传统的培训和咨询机构，而是面向企业决策层的转型合作伙伴。依托 Founders Space 全球创新网络与多年企业项目经验，我们将硅谷一线的 AI 趋势、方法论与案例，转化为适合中国企业落地的培训、咨询、FDE 与战略共创方案。",
    credibility: [
      { value: "15+ 年", label: "创新与创业教育经验" },
      { value: "350+", label: "教育项目与企业活动" },
      { value: "50+", label: "全球战略合作伙伴" },
    ],
    whyPoints: [
      "Founders Space 全球创新网络支持",
      "服务企业、政府、高校与创业生态",
      "兼具硅谷视野与中国企业落地经验",
      "从培训、咨询到 FDE 可一体化落地",
    ],
    serviceModelTitle: "AI 培训、咨询、FDE 一体化落地",
    serviceModelDescription:
      "企业 AI 转型不能停留在听懂趋势和写出路线图。MindsLeap 将管理层认知、战略共创和现场落地结合起来，帮助企业从关键场景切入，跑出可验证的业务结果。",
    serviceModel: [
      {
        title: "AI 培训",
        description:
          "帮助管理层和核心团队建立统一的 AI 认知框架，理解 AI 原生组织、Agent、Token ROI 与新一代生产力。",
      },
      {
        title: "AI 咨询",
        description:
          "围绕企业真实业务，识别高价值 AI 场景，完成优先级排序、路线图设计和组织推进机制设计。",
      },
      {
        title: "FDE 落地",
        description:
          "由 Forward Deployed Engineer（现场部署工程师）进入业务现场，协同客户团队搭建 AI 工作流、Agent 原型和可复盘的试点项目。",
      },
    ],
    sprintTitle: "AI Native Transformation Sprint",
    sprintDescription:
      "以 30/60/90 天为周期，从诊断到试点再到复盘，帮助企业把 AI 转型从概念推进到真实业务成果。",
    sprintSteps: ["AI 成熟度诊断", "场景识别与优先级排序", "AI 工作流 / Agent 试点", "FDE 现场落地", "ROI 复盘与案例沉淀"],
    flagshipTitle: "旗舰工作坊",
    flagshipPrograms: [
      {
        title: "AI 战略与转型工作坊",
        description:
          "帮助企业管理层建立清晰的 AI 认知框架，识别高优先级场景，制定适合组织现阶段的 AI 战略与行动路线图。",
        audienceTitle: "适合对象",
        audience: "企业家、董事会成员、CXO、高级管理团队",
        modulesTitle: "核心内容",
        modules: [
          "AI 转型的关键原则与组织成熟度判断",
          "企业真实案例拆解与可借鉴路径",
          "AI 场景识别、优先级排序与风险意识",
          "AI 战略共创工作坊与路线图设计",
          "硅谷 AI 趋势、工具与生态观察",
        ],
        outcomesTitle: "预期成果",
        outcomes: [
          "明确 AI 转型优先级",
          "梳理适合企业的重点场景",
          "输出初步 AI 路线图",
          "形成管理层共识与推进方向",
        ],
      },
      {
        title: "AI 商业模式创新工作坊",
        description:
          "帮助组织在 AI 时代重新审视业务模式、客户价值与增长路径，发现新的产品机会与收入来源。",
        audienceTitle: "适合对象",
        audience: "创新团队、业务负责人、产品负责人、战略团队",
        modulesTitle: "核心内容",
        modules: [
          "AI 时代的商业模式重构与价值创造",
          "Agentic business model 机会识别",
          "跨部门协同应用设计与用例分析",
          "小组共创、案例讨论与创新练习",
          "创新文化与 AI 领导力建设",
        ],
        outcomesTitle: "预期成果",
        outcomes: [
          "梳理新的业务增长机会",
          "识别潜在 AI 产品与服务方向",
          "输出初步创新行动计划",
          "形成可继续推进的试点方向",
        ],
      },
    ],
    topicsTitle: "专题课程矩阵",
    topicCategories: [
      {
        title: "AI 战略与应用",
        topics: [
          "AI 如何驱动业务增长",
          "企业如何制定 AI 战略",
          "AI 应用如何重塑销售、营销、HR 与客服",
          "如何选择当下可用的 AI 工具与平台",
        ],
      },
      {
        title: "硅谷 AI 与科技趋势",
        topics: [
          "2025 / 2026 硅谷 AI 趋势",
          "AI Agent 与新一代生产力",
          "机器人与具身智能的商业机会",
          "未来技术如何影响企业竞争力",
        ],
      },
      {
        title: "创新与领导力",
        topics: [
          "创新型组织如何形成",
          "管理层如何推动 AI 变革",
          "如何建立创新文化与跨部门协作机制",
          "如何从概念讨论走向组织执行",
        ],
      },
      {
        title: "行业与职能专题",
        topics: [
          "AI 赋能营销与内容团队",
          "AI 与未来金融",
          "AI 与创意生产力",
          "AI 与企业运营效率提升",
        ],
      },
    ],
    formatsTitle: "灵活的交付方式",
    formats: [
      {
        title: "企业内训",
        description: "面向管理层或核心团队的定制课程，匹配企业发展阶段与团队背景。",
      },
      {
        title: "闭门研讨",
        description: "围绕关键战略问题进行高密度讨论，帮助管理层快速形成判断。",
      },
      {
        title: "两天工作坊",
        description: "结合输入、讨论、共创与输出，适合推动组织级别的 AI 议题。",
      },
      {
        title: "专题演讲",
        description: "适合峰会、客户大会、企业年会或内部创新日等场景。",
      },
      {
        title: "战略共创项目",
        description: "培训与咨询结合，帮助组织形成可落地的行动方案。",
      },
      {
        title: "线上/线下混合交付",
        description: "兼顾区域协同与团队节奏，适配多地团队与跨国组织需求。",
      },
    ],
    outcomesTitle: "组织将获得的收益",
    outcomes: [
      "一套适合管理层的 AI 认知框架",
      "一份明确的 AI 机会与优先级清单",
      "对组织能力与资源缺口的真实判断",
      "若干可快速启动的试点方向",
      "一个可进入 FDE 落地的高价值场景",
      "更一致的管理层共识与推进节奏",
    ],
    casesTitle: "客户与实践经验",
    casesDescription:
      "我们曾为不同类型组织提供 AI 创新培训、战略工作坊与创新咨询，帮助管理团队识别 AI 机会、推动产品创新，并建立更具前瞻性的增长思路。",
    cases: [
      { name: "发那科 (FANUC)", industry: "智能制造" },
      { name: "联想 (Lenovo)", industry: "科技企业" },
      { name: "恒安集团", industry: "消费品" },
      { name: "阿里巴巴", industry: "互联网科技" },
    ],
    ctaTitle: "为您的团队设计 AI 转型落地方案",
    ctaDescription:
      "无论您是希望提升管理层 AI 认知、寻找业务增长机会，还是让 FDE 团队进入真实场景推动试点，我们都可以根据企业现状与目标定制相应的 AI 转型方案。",
    ctaPrimary: "预约沟通",
    ctaSecondary: "查看全部服务",
  },
  en: {
    title: "Enterprise AI Transformation Services",
    heroDescription:
      "Designed for founders, executives, and innovation teams, our services combine Silicon Valley insight, real business scenarios, and FDE execution to help organizations turn AI ambition into action.",
    whyTitle: "Why MindsLeap",
    whyDescription:
      "We are not a traditional training or consulting firm. We are a transformation partner for decision-makers. Backed by the global Founders Space innovation network and years of enterprise program experience, we translate Silicon Valley AI trends, frameworks, and case studies into training, advisory, FDE, and strategic co-creation programs that teams can actually apply.",
    credibility: [
      { value: "15+ Years", label: "of innovation and entrepreneurship education" },
      { value: "350+", label: "programs and enterprise engagements" },
      { value: "50+", label: "global strategic partners" },
    ],
    whyPoints: [
      "Supported by the Founders Space global innovation network",
      "Experience across corporates, governments, universities, and startup ecosystems",
      "Combines Silicon Valley perspective with China market execution",
      "Can be delivered across training, advisory, and FDE implementation",
    ],
    serviceModelTitle: "Training, Advisory, and FDE Implementation",
    serviceModelDescription:
      "Enterprise AI transformation cannot stop at trend briefings or strategy decks. MindsLeap connects executive alignment, strategic co-creation, and field execution so teams can start from priority scenarios and produce measurable business outcomes.",
    serviceModel: [
      {
        title: "AI Training",
        description:
          "Builds a shared AI framework for leadership and core teams, covering AI-native organizations, agents, Token ROI, and the next generation of productivity.",
      },
      {
        title: "AI Advisory",
        description:
          "Identifies high-value AI scenarios around real business needs, prioritizes opportunities, and designs roadmaps and governance mechanisms.",
      },
      {
        title: "FDE Implementation",
        description:
          "Forward Deployed Engineers work with client teams in the field to build AI workflows, agent prototypes, and pilots that can be reviewed and scaled.",
      },
    ],
    sprintTitle: "AI Native Transformation Sprint",
    sprintDescription:
      "A 30/60/90-day path from diagnosis to pilot and review, helping enterprises move AI transformation from concept to real business outcomes.",
    sprintSteps: ["AI maturity diagnosis", "Use-case mapping and prioritization", "AI workflow / agent pilot", "FDE field implementation", "ROI review and case capture"],
    flagshipTitle: "Flagship Workshops",
    flagshipPrograms: [
      {
        title: "AI Strategy & Transformation Workshop",
        description:
          "Helps executive teams build a clear AI framework, identify priority scenarios, and develop an action-oriented strategy that fits the current stage of the organization.",
        audienceTitle: "Best for",
        audience: "Founders, board members, CXOs, and senior leadership teams",
        modulesTitle: "Core modules",
        modules: [
          "Principles of AI transformation and organizational maturity",
          "Real-world enterprise case studies and decision patterns",
          "AI opportunity mapping, prioritization, and risk awareness",
          "AI strategy co-creation and roadmap design",
          "Silicon Valley AI trends, tools, and ecosystem signals",
        ],
        outcomesTitle: "Expected outcomes",
        outcomes: [
          "Clarity on AI priorities",
          "A shortlist of high-value use cases",
          "An initial AI roadmap",
          "Alignment across the leadership team",
        ],
      },
      {
        title: "AI Business Model Innovation Workshop",
        description:
          "Helps teams rethink business models, customer value, and growth paths in the age of AI, while identifying new product opportunities and revenue streams.",
        audienceTitle: "Best for",
        audience: "Innovation teams, business unit leaders, product leaders, and strategy teams",
        modulesTitle: "Core modules",
        modules: [
          "Reframing value creation in the age of AI",
          "Identifying opportunities for agentic business models",
          "Cross-functional application design and use-case analysis",
          "Group co-creation exercises and case discussions",
          "Building a culture of AI leadership and innovation",
        ],
        outcomesTitle: "Expected outcomes",
        outcomes: [
          "New growth opportunities mapped",
          "Potential AI product and service directions identified",
          "An initial innovation action plan",
          "Pilot ideas ready for follow-up",
        ],
      },
    ],
    topicsTitle: "Topic Matrix",
    topicCategories: [
      {
        title: "AI Strategy & Applications",
        topics: [
          "How AI can drive business growth",
          "How enterprises build an AI strategy",
          "How AI reshapes sales, marketing, HR, and customer support",
          "How to choose practical AI tools and platforms today",
        ],
      },
      {
        title: "Silicon Valley AI & Tech Trends",
        topics: [
          "Silicon Valley AI trends for 2025 / 2026",
          "AI agents and the next generation of productivity",
          "Commercial opportunities in robotics and embodied AI",
          "How frontier technology will reshape competition",
        ],
      },
      {
        title: "Innovation & Leadership",
        topics: [
          "How innovative organizations are built",
          "How leadership teams drive AI transformation",
          "How to create innovation culture and cross-functional collaboration",
          "How to move from discussion to execution",
        ],
      },
      {
        title: "Industry & Functional Modules",
        topics: [
          "AI for marketing and content teams",
          "AI and the future of finance",
          "AI and creative productivity",
          "AI for operational efficiency",
        ],
      },
    ],
    formatsTitle: "Flexible Delivery Formats",
    formats: [
      {
        title: "In-house Training",
        description: "Customized programs for leadership teams or core business units based on company stage and capability.",
      },
      {
        title: "Closed-Door Executive Sessions",
        description: "High-density strategic discussions designed to help decision-makers form judgment quickly.",
      },
      {
        title: "Two-Day Workshops",
        description: "Combines expert input, discussion, co-creation, and outputs for organization-level AI topics.",
      },
      {
        title: "Keynotes & Seminars",
        description: "Ideal for summits, client events, annual meetings, and internal innovation days.",
      },
      {
        title: "Strategy Co-Creation Projects",
        description: "Blends training and advisory work to turn ideas into practical action plans.",
      },
      {
        title: "Hybrid Delivery",
        description: "Supports distributed teams, cross-border organizations, and flexible scheduling needs.",
      },
    ],
    outcomesTitle: "What Your Organization Walks Away With",
    outcomes: [
      "A leadership-ready AI framework",
      "A prioritized list of AI opportunities",
      "An actionable first-stage roadmap",
      "Pilot directions that can launch quickly",
      "One high-value scenario ready for FDE implementation",
      "An initial view of capability and resource gaps",
      "Stronger leadership alignment and momentum",
    ],
    casesTitle: "Clients & Practical Experience",
    casesDescription:
      "We have supported a wide range of organizations with AI innovation training, strategic workshops, and innovation advisory engagements, helping teams identify AI opportunities, rethink products, and build more forward-looking growth strategies.",
    cases: [
      { name: "FANUC", industry: "Smart Manufacturing" },
      { name: "Lenovo", industry: "Technology" },
      { name: "Hengan Group", industry: "Consumer Goods" },
      { name: "Alibaba", industry: "Internet Technology" },
    ],
    ctaTitle: "Design an AI Transformation Plan for Your Team",
    ctaDescription:
      "Whether you want to raise executive AI literacy, identify growth opportunities, or bring FDE support into real business scenarios, we can tailor an AI transformation plan around your team's goals and current reality.",
    ctaPrimary: "Book a Conversation",
    ctaSecondary: "Explore All Services",
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

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      <TrainingHero />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {c.whyTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {c.whyDescription}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {c.whyPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                        ✓
                      </span>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {c.credibility.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-gray-50 border border-gray-100 p-6"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="text-sm text-gray-600 leading-relaxed">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {c.serviceModelTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {c.serviceModelDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {c.serviceModel.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white border border-gray-100 p-7 shadow-sm"
              >
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] bg-primary text-white p-8 md:p-10 shadow-xl">
            <div className="grid lg:grid-cols-[0.9fr_1.3fr] gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{c.sprintTitle}</h3>
                <p className="text-white/85 leading-relaxed">{c.sprintDescription}</p>
              </div>
              <div className="grid sm:grid-cols-5 gap-3">
                {c.sprintSteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl bg-white/10 border border-white/15 p-4 text-center"
                  >
                    <div className="text-sm text-white/60 mb-2">0{index + 1}</div>
                    <div className="text-sm font-semibold leading-snug">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {c.flagshipTitle}
          </h2>
          <div className="grid xl:grid-cols-2 gap-8">
            {c.flagshipPrograms.map((program) => (
              <div
                key={program.title}
                className="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{program.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-primary uppercase mb-2">
                      {program.audienceTitle}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{program.audience}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-primary uppercase mb-3">
                      {program.modulesTitle}
                    </h4>
                    <ul className="space-y-3">
                      {program.modules.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-700">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-primary uppercase mb-3">
                      {program.outcomesTitle}
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {program.outcomes.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl bg-primary/5 px-4 py-3 text-sm text-gray-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {c.topicsTitle}
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {c.topicCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-3xl border border-gray-100 p-6 bg-white shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-5">{category.title}</h3>
                <ul className="space-y-3">
                  {category.topics.map((topic) => (
                    <li key={topic} className="text-gray-600 leading-relaxed">
                      • {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {c.formatsTitle}
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {c.formats.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white border border-gray-100 p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            {c.outcomesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.outcomes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex items-start gap-3"
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {c.casesTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{c.casesDescription}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.cases.map((client) => (
              <div
                key={client.name}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[32px] bg-primary text-white px-8 py-12 md:px-12 md:py-16 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.ctaTitle}</h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              {c.ctaDescription}
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-primary hover:bg-white/90 transition-colors"
              >
                {c.ctaPrimary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
