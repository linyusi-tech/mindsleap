export type ServicesHubLocale = "zh" | "en";

export type ServiceLink = {
  label: string;
  href: string;
};

export type ServicePath = {
  number: string;
  title: string;
  description: string;
  links: ServiceLink[];
};

export type ServiceFamily = {
  number: string;
  name: string;
  audience: string;
  problem: string;
  delivery: string;
  href: string;
  evidenceHref?: string;
};

export type DeliveryStage = {
  number: string;
  title: string;
  description: string;
};

export type VerifiedCase = {
  slug: string;
  organization: string;
  date: string;
  publishedDate: string;
  title: string;
  services: string;
  summary: string;
  image: string;
  imagePosition: string;
};

export type PlatformEvidence = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type ServicesHubFaq = {
  question: string;
  answer: string;
};

export type ServicesHubContent = {
  metadata: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  paths: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServicePath[];
  };
  families: {
    eyebrow: string;
    title: string;
    description: string;
    targetLabel: string;
    problemLabel: string;
    deliveryLabel: string;
    detailLabel: string;
    evidenceLabel: string;
    items: ServiceFamily[];
  };
  delivery: {
    eyebrow: string;
    title: string;
    description: string;
    stages: DeliveryStage[];
    note: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    items: VerifiedCase[];
  };
  platform: {
    eyebrow: string;
    title: string;
    description: string;
    items: PlatformEvidence[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: ServicesHubFaq[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const serviceLinks = {
  club: "/services/ai-club",
  transformation: "/services/ai-transformation",
  accelerator: "/services/accelerator",
  growth: "/services/global-growth",
} as const;

export const verifiedServicesCases: Record<ServicesHubLocale, VerifiedCase[]> = {
  zh: [
    {
      slug: "goger-office-ai-training-consulting-2026",
      organization: "高格办公空间",
      date: "2026-07-17 / 18",
      publishedDate: "2026-07-18",
      title: "从管理层访谈、AI 培训到转型诊断",
      services: "AI 培训 · AI 咨询 · 转型诊断",
      summary:
        "结合核心管理人员访谈、现场培训和业务材料，梳理客户、销售、运营与知识沉淀环节中的 AI 场景和试点条件。",
      image: "/images/news/goger-office-ai-training-consulting-2026-card.jpg",
      imagePosition: "center 44%",
    },
    {
      slug: "ceibs-marketing-ai-agent-workflow-training-2026",
      organization: "中欧商学院市场团队",
      date: "2026-06-10",
      publishedDate: "2026-06-10",
      title: "AI Agent 工作流训练营",
      services: "AI 培训 · Agent 工作流 · 市场场景",
      summary:
        "围绕品牌内容记忆、官网 AI 与 GEO、市场监测、内容与视频生产四类真实场景，训练团队设计可复用的 AI Agent 工作流。",
      image: "/images/news/ceibs-marketing-ai-agent-workflow-training-2026-cover.jpg",
      imagePosition: "center 52%",
    },
    {
      slug: "pudong-ecommerce-ai-native-organization-training-2026",
      organization: "浦东电商协会",
      date: "2026-06-24",
      publishedDate: "2026-06-24",
      title: "电商组织如何转型为 AI 原生组织",
      services: "行业培训 · AI 原生组织 · 电商",
      summary:
        "面向协会会员企业和电商行业管理者，拆解 Skill、Memory、Workflow 与 Agent 如何沉淀为可持续积累的组织资产。",
      image: "/images/news/pudong-ecommerce-ai-native-organization-training-2026-cover.jpg",
      imagePosition: "center 50%",
    },
  ],
  en: [
    {
      slug: "goger-office-ai-training-consulting-2026",
      organization: "Goger Office Space",
      date: "July 17-18, 2026",
      publishedDate: "2026-07-18",
      title: "From Management Interviews and AI Training to Transformation Diagnosis",
      services: "AI Training · AI Advisory · Transformation Diagnosis",
      summary:
        "Management interviews, on-site training, and business materials were used to identify AI opportunities and pilot conditions across customer, sales, operations, and knowledge workflows.",
      image: "/images/news/goger-office-ai-training-consulting-2026-card.jpg",
      imagePosition: "center 44%",
    },
    {
      slug: "ceibs-marketing-ai-agent-workflow-training-2026",
      organization: "CEIBS Marketing Team",
      date: "June 10, 2026",
      publishedDate: "2026-06-10",
      title: "AI Agent Workflow Bootcamp",
      services: "AI Training · Agent Workflows · Marketing Use Cases",
      summary:
        "The team designed reusable AI Agent workflows around brand memory, website AI and GEO, market monitoring, and content and video production.",
      image: "/images/news/ceibs-marketing-ai-agent-workflow-training-2026-cover.jpg",
      imagePosition: "center 52%",
    },
    {
      slug: "pudong-ecommerce-ai-native-organization-training-2026",
      organization: "Pudong E-commerce Association",
      date: "June 24, 2026",
      publishedDate: "2026-06-24",
      title: "How E-commerce Organizations Can Become AI-Native",
      services: "Industry Training · AI-Native Organization · E-commerce",
      summary:
        "The session showed association members and e-commerce leaders how Skills, Memory, Workflows, and Agents can become compounding organizational assets.",
      image: "/images/news/pudong-ecommerce-ai-native-organization-training-2026-cover.jpg",
      imagePosition: "center 50%",
    },
  ],
};

export const servicesHubContent: Record<ServicesHubLocale, ServicesHubContent> = {
  zh: {
    metadata: {
      title: "企业 AI 转型与 AI 原生创业加速服务",
      description:
        "MindsLeap 提供企业家 AI 俱乐部、AI 培训与战略咨询、FDE 落地、AI 原生创业加速和全球增长服务，并以公开项目案例呈现实际交付边界。",
    },
    hero: {
      eyebrow: "MindsLeap Services",
      title: "MindsLeap 企业 AI 转型与 AI 原生创业加速服务",
      description:
        "通过企业家 AI 俱乐部、AI 培训与战略咨询、FDE 落地、创业加速和全球增长服务，帮助传统企业把 AI 进入真实业务，也帮助 AI 原生项目连接产业场景与全球市场。",
      primaryLabel: "选择服务路径",
      secondaryLabel: "联系我们",
    },
    paths: {
      eyebrow: "从问题开始",
      title: "你现在希望解决什么？",
      description: "选择最接近当前阶段的问题，再进入对应的服务和公开案例。",
      items: [
        {
          number: "01",
          title: "推动企业 AI 转型",
          description: "让管理层与业务团队建立共同语言，识别高价值场景，并把验证后的 AI 能力进入真实流程。",
          links: [
            { label: "企业 AI 转型服务", href: serviceLinks.transformation },
            { label: "MindsLeap 企业家 AI 俱乐部", href: serviceLinks.club },
          ],
        },
        {
          number: "02",
          title: "加速 AI 原生创业",
          description: "帮助 OPC 与 AI 原生项目验证产业场景，连接导师、企业客户、资本与全球创业生态。",
          links: [{ label: "AI 原生创业加速", href: serviceLinks.accelerator }],
        },
        {
          number: "03",
          title: "连接全球市场",
          description: "通过硅谷资源、产业考察、海外市场拓展与全球人才连接，建立跨境增长路径。",
          links: [{ label: "全球增长服务", href: serviceLinks.growth }],
        },
      ],
    },
    families: {
      eyebrow: "核心服务",
      title: "服务不是孤立产品，而是可组合的路径",
      description: "根据组织阶段和业务问题，MindsLeap 可以从一个入口开始，并组合后续的诊断、验证、落地与增长服务。",
      targetLabel: "适合对象",
      problemLabel: "解决问题",
      deliveryLabel: "交付方式",
      detailLabel: "查看服务",
      evidenceLabel: "查看证据",
      items: [
        {
          number: "01",
          name: "MindsLeap 企业家 AI 俱乐部",
          audience: "企业家、董事会成员、CXO 与创新负责人",
          problem: "持续更新 AI 认知，连接可信同行，并把外部趋势转化为企业行动。",
          delivery: "闭门交流、主题 Workshop、企业参访与长期社群连接。",
          href: serviceLinks.club,
        },
        {
          number: "02",
          name: "企业 AI 转型服务",
          audience: "需要把 AI 从工具试用推进到真实业务的传统企业与管理团队",
          problem: "建立共同语言、识别场景、验证试点，并在条件成熟时进入生产落地。",
          delivery: "AI 培训、管理层访谈、战略咨询、转型诊断与 FDE 实施。",
          href: serviceLinks.transformation,
          evidenceHref: "/news/goger-office-ai-training-consulting-2026",
        },
        {
          number: "03",
          name: "AI 原生创业加速",
          audience: "OPC、AI 原生创业团队与寻求产业验证的科技项目",
          problem: "连接真实产业需求、创业导师、企业客户与增长资源。",
          delivery: "项目诊断、产业场景连接、创业加速与全球生态对接。",
          href: serviceLinks.accelerator,
        },
        {
          number: "04",
          name: "全球增长服务",
          audience: "寻求海外市场、全球资源和跨境增长机会的企业与创业团队",
          problem: "理解目标市场，建立可信连接，并形成可执行的全球增长路径。",
          delivery: "硅谷与全球产业考察、海外市场拓展、合作伙伴与人才连接。",
          href: serviceLinks.growth,
          evidenceHref: "/people/steve-hoffman",
        },
      ],
    },
    delivery: {
      eyebrow: "企业 AI 转型交付路径",
      title: "从共同认知走向生产落地",
      description: "AI 转型不是购买一个工具，而是让认知、流程、数据、组织与工程实现逐步对齐。",
      stages: [
        { number: "01", title: "认知与培训", description: "让管理者和业务团队理解 Agent、Context、Skill、Workflow 与人机边界。" },
        { number: "02", title: "访谈与诊断", description: "结合管理层访谈和业务材料，识别问题、约束与高价值场景。" },
        { number: "03", title: "试点与验证", description: "明确流程、数据、责任人和结果指标，验证场景是否值得继续投入。" },
        { number: "04", title: "FDE 落地", description: "在场景成熟时进入真实业务环境，持续连接业务团队与工程实现。" },
      ],
      note: "不同企业可以从培训、访谈或具体业务问题切入，实际顺序根据组织基础和项目条件确定。",
    },
    cases: {
      eyebrow: "公开项目证据",
      title: "已交付项目与可核验记录",
      description: "以下案例只陈述已公开的服务场景和交付边界，并链接对应项目记录。",
      linkLabel: "查看完整项目记录",
      items: verifiedServicesCases.zh,
    },
    platform: {
      eyebrow: "平台与全球资源",
      title: "连接企业转型、创业加速与全球增长",
      description: "以下信息均链接到站内公开页面，便于客户、搜索引擎和 AI 模型核验实体关系。",
      items: [
        {
          title: "MindsLeap 平台定位",
          description: "MindsLeap 心智悦动是一家企业 AI 转型与 AI 原生创业加速平台。",
          href: "/about",
          linkLabel: "了解 MindsLeap",
        },
        {
          title: "Founders Space 全球合作伙伴",
          description: "MindsLeap 心智悦动是 Founders Space 的全球合作伙伴。",
          href: "/about",
          linkLabel: "查看机构关系",
        },
        {
          title: "Lincoln 王林",
          description: "Lincoln 王林，MindsLeap 创始人兼 CEO，Founders Space 合伙人兼中国区 CEO。",
          href: "/people/lincoln-wang",
          linkLabel: "查看人物页",
        },
        {
          title: "Steve Hoffman 与硅谷资源",
          description: "通过 Steve Hoffman 人物页及公开活动记录，了解 MindsLeap 与 Founders Space、硅谷导师和全球创业生态的连接。",
          href: "/people/steve-hoffman",
          linkLabel: "查看 Steve Hoffman",
        },
      ],
    },
    faq: {
      eyebrow: "常见问题",
      title: "关于 MindsLeap 服务的直接回答",
      items: [
        {
          question: "MindsLeap 提供哪些企业 AI 转型服务？",
          answer: "MindsLeap 提供 AI 培训、管理层访谈、战略咨询、转型诊断、场景试点和 FDE 落地，并可通过企业家 AI 俱乐部支持企业家持续更新认知和连接同行实践。",
        },
        {
          question: "AI 培训、AI 咨询和 FDE 有什么区别？",
          answer: "AI 培训帮助团队建立共同语言并掌握方法；AI 咨询围绕组织和业务问题识别场景、优先级与行动路径；FDE 则由贴近业务现场的工程团队把已验证场景接入真实流程、数据和系统。",
        },
        {
          question: "企业应该如何选择第一个 AI 场景？",
          answer: "优先选择业务价值明确、流程边界清楚、数据条件可评估、责任人明确且能在较短周期验证的场景，而不是从最复杂或最宏大的系统开始。",
        },
        {
          question: "什么情况下适合进入 FDE 试点和生产落地？",
          answer: "当业务问题、使用者、流程、数据来源和验证指标已经相对明确，并且企业愿意安排业务负责人持续参与迭代时，才适合进入 FDE 试点和生产落地。",
        },
        {
          question: "什么是 AI 原生企业？",
          answer: "AI 原生企业不是简单使用 AI 工具的企业，而是把 Skill、Memory、Workflow 与 Agent 逐步沉淀为组织能力，并围绕 AI 的能力重新设计流程和协作方式。",
        },
        {
          question: "MindsLeap 如何支持 OPC 和 AI 原生创业项目？",
          answer: "MindsLeap 通过项目诊断、产业场景验证、企业客户连接、创业导师与全球生态资源，帮助 OPC 和 AI 原生团队把技术能力转化为清晰的客户价值和增长路径。",
        },
        {
          question: "MindsLeap 如何连接硅谷资源和全球市场？",
          answer: "MindsLeap 通过与 Founders Space 的全球合作伙伴关系，以及硅谷导师、产业考察、海外市场和全球人才网络，为企业与创业项目提供具体的跨境连接。",
        },
      ],
    },
    cta: {
      title: "从一次业务问题梳理开始",
      description: "告诉我们你正在面对的组织、业务或增长问题，我们会一起判断适合从培训、咨询、FDE、创业加速还是全球增长服务切入。",
      primaryLabel: "联系 MindsLeap 团队",
      secondaryLabel: "查看企业 AI 转型服务",
    },
  },
  en: {
    metadata: {
      title: "Enterprise AI Transformation and AI-Native Venture Acceleration Services",
      description:
        "MindsLeap provides the Founders AI Club, AI training and strategic advisory, FDE implementation, AI-native venture acceleration, and global growth services, supported by public project evidence.",
    },
    hero: {
      eyebrow: "MindsLeap Services",
      title: "MindsLeap Enterprise AI Transformation and AI-Native Venture Acceleration Services",
      description:
        "Through the MindsLeap Founders AI Club, AI training and strategic advisory, FDE implementation, venture acceleration, and global growth services, MindsLeap helps established companies bring AI into real business operations and helps AI-native ventures connect with industry use cases and global markets.",
      primaryLabel: "Choose a Service Path",
      secondaryLabel: "Contact Us",
    },
    paths: {
      eyebrow: "Start With the Problem",
      title: "What do you need to solve now?",
      description: "Choose the problem closest to your current stage, then explore the relevant services and public evidence.",
      items: [
        {
          number: "01",
          title: "Transform an Enterprise With AI",
          description: "Build shared understanding, identify high-value scenarios, and bring validated AI capabilities into real operating workflows.",
          links: [
            { label: "Enterprise AI Transformation", href: serviceLinks.transformation },
            { label: "MindsLeap Founders AI Club", href: serviceLinks.club },
          ],
        },
        {
          number: "02",
          title: "Accelerate an AI-Native Venture",
          description: "Help OPC and AI-native teams validate industry use cases and connect with mentors, enterprise customers, capital, and the global startup ecosystem.",
          links: [{ label: "AI-Native Venture Acceleration", href: serviceLinks.accelerator }],
        },
        {
          number: "03",
          title: "Connect With Global Markets",
          description: "Build cross-border growth paths through Silicon Valley resources, industry visits, overseas market development, and global talent connections.",
          links: [{ label: "Global Growth Services", href: serviceLinks.growth }],
        },
      ],
    },
    families: {
      eyebrow: "Core Services",
      title: "Composable paths, not isolated products",
      description: "MindsLeap can begin from one entry point and combine diagnosis, validation, implementation, and growth support around the organization's actual stage.",
      targetLabel: "Who It Is For",
      problemLabel: "Problem Addressed",
      deliveryLabel: "Delivery",
      detailLabel: "View Service",
      evidenceLabel: "View Evidence",
      items: [
        {
          number: "01",
          name: "MindsLeap Founders AI Club",
          audience: "Entrepreneurs, board members, CXOs, and innovation leaders",
          problem: "Keep AI understanding current, connect with trusted peers, and turn external change into organizational action.",
          delivery: "Closed-door sessions, themed workshops, company visits, and ongoing community connections.",
          href: serviceLinks.club,
        },
        {
          number: "02",
          name: "Enterprise AI Transformation Services",
          audience: "Established companies and management teams moving AI from tool experimentation into real operations",
          problem: "Build shared understanding, identify scenarios, validate pilots, and move into production when conditions are ready.",
          delivery: "AI training, management interviews, strategic advisory, transformation diagnosis, and FDE implementation.",
          href: serviceLinks.transformation,
          evidenceHref: "/news/goger-office-ai-training-consulting-2026",
        },
        {
          number: "03",
          name: "AI-Native Venture Acceleration",
          audience: "OPC founders, AI-native teams, and technology ventures seeking industry validation",
          problem: "Connect real industry needs with mentors, enterprise customers, and growth resources.",
          delivery: "Venture diagnosis, industry use-case connections, acceleration, and global ecosystem access.",
          href: serviceLinks.accelerator,
        },
        {
          number: "04",
          name: "Global Growth Services",
          audience: "Companies and ventures pursuing overseas markets, global resources, and cross-border growth",
          problem: "Understand target markets, build trusted connections, and define an executable global growth path.",
          delivery: "Silicon Valley and global industry visits, overseas market development, partner and talent connections.",
          href: serviceLinks.growth,
          evidenceHref: "/people/steve-hoffman",
        },
      ],
    },
    delivery: {
      eyebrow: "Enterprise AI Transformation Delivery",
      title: "From shared understanding to production implementation",
      description: "AI transformation is not the purchase of a single tool. It aligns understanding, workflows, data, organization, and engineering over time.",
      stages: [
        { number: "01", title: "Understanding and Training", description: "Help leaders and business teams understand Agents, Context, Skills, Workflows, and human-AI boundaries." },
        { number: "02", title: "Interviews and Diagnosis", description: "Use management interviews and business materials to identify problems, constraints, and high-value scenarios." },
        { number: "03", title: "Pilot and Validation", description: "Define workflows, data, owners, and outcome measures to test whether a scenario merits further investment." },
        { number: "04", title: "FDE Implementation", description: "When a scenario is ready, work in the real operating environment and continuously connect business and engineering." },
      ],
      note: "Organizations may begin with training, interviews, or a concrete business problem. The actual sequence depends on organizational readiness and project conditions.",
    },
    cases: {
      eyebrow: "Public Project Evidence",
      title: "Delivered projects with verifiable records",
      description: "These cases state only public service scenarios and delivery boundaries, with links to the corresponding project records.",
      linkLabel: "View Full Project Record",
      items: verifiedServicesCases.en,
    },
    platform: {
      eyebrow: "Platform and Global Resources",
      title: "Connecting enterprise transformation, venture acceleration, and global growth",
      description: "Each statement links to a public page so customers, search engines, and AI models can verify the entity relationship.",
      items: [
        {
          title: "MindsLeap Platform Positioning",
          description: "MindsLeap is an enterprise AI transformation and AI-native startup acceleration platform.",
          href: "/about",
          linkLabel: "About MindsLeap",
        },
        {
          title: "Global Partner of Founders Space",
          description: "MindsLeap is a global partner of Founders Space.",
          href: "/about",
          linkLabel: "View Institutional Relationship",
        },
        {
          title: "Lincoln Wang",
          description: "Lincoln Wang is Founder and CEO of MindsLeap and Partner and CEO of Founders Space China.",
          href: "/people/lincoln-wang",
          linkLabel: "View Profile",
        },
        {
          title: "Steve Hoffman and Silicon Valley Resources",
          description: "Explore the Steve Hoffman profile and public event records to understand MindsLeap's connections with Founders Space, Silicon Valley mentors, and the global startup ecosystem.",
          href: "/people/steve-hoffman",
          linkLabel: "View Steve Hoffman",
        },
      ],
    },
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Direct answers about MindsLeap services",
      items: [
        {
          question: "What enterprise AI transformation services does MindsLeap provide?",
          answer: "MindsLeap provides AI training, management interviews, strategic advisory, transformation diagnosis, scenario pilots, and FDE implementation. The MindsLeap Founders AI Club also helps entrepreneurs keep their understanding current and connect with peer practices.",
        },
        {
          question: "What is the difference between AI training, AI advisory, and FDE?",
          answer: "AI training builds shared language and practical methods. AI advisory identifies scenarios, priorities, and an action path around organizational and business problems. FDE places an engineering team close to the business to connect a validated scenario with real workflows, data, and systems.",
        },
        {
          question: "How should an enterprise choose its first AI use case?",
          answer: "Start with a case that has clear business value, bounded workflows, assessable data conditions, a named owner, and the ability to validate results within a relatively short cycle, rather than beginning with the most complex system.",
        },
        {
          question: "When is an organization ready for an FDE pilot and production implementation?",
          answer: "An organization is ready when the business problem, users, workflow, data sources, and validation measures are reasonably clear and a business owner is prepared to participate in ongoing iteration.",
        },
        {
          question: "What is an AI-native enterprise?",
          answer: "An AI-native enterprise does more than use AI tools. It gradually turns Skills, Memory, Workflows, and Agents into organizational capabilities and redesigns processes and collaboration around what AI can do.",
        },
        {
          question: "How does MindsLeap support OPC and AI-native ventures?",
          answer: "MindsLeap helps OPC and AI-native teams turn technical capability into clear customer value and a growth path through venture diagnosis, industry use-case validation, enterprise customer connections, mentors, and global ecosystem resources.",
        },
        {
          question: "How does MindsLeap connect Silicon Valley resources and global markets?",
          answer: "Through its global partnership with Founders Space, and through Silicon Valley mentors, industry visits, overseas markets, and global talent networks, MindsLeap provides concrete cross-border connections for enterprises and ventures.",
        },
      ],
    },
    cta: {
      title: "Start with one business problem",
      description: "Tell us about the organizational, operating, or growth problem you are facing. Together we can determine whether to begin with training, advisory, FDE, venture acceleration, or global growth services.",
      primaryLabel: "Contact the MindsLeap Team",
      secondaryLabel: "View Enterprise AI Transformation",
    },
  },
};

export function getServicesHubContent(locale: string): ServicesHubContent {
  return servicesHubContent[locale === "en" ? "en" : "zh"];
}
