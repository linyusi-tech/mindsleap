const PILLARS = [
  {
    key: "aiClub",
    title: { en: "AI Founders Club", zh: "AI 创始人俱乐部" },
    desc: { en: "Exclusive community for entrepreneurs. Closed-door workshops, site visits, and elite networking for AI implementation.", zh: "面向创业者的高端社群。闭门工作坊、企业参访与精英人脉，专注 AI 落地。" },
    icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  },
  {
    key: "incubation",
    title: { en: "Unicorn Incubation", zh: "独角兽孵化" },
    desc: { en: "Connecting AI startups with traditional industry scenarios and Silicon Valley resources via Founders Space.", zh: "通过 Founders Space，连接 AI 创业团队、传统行业场景与硅谷资源。" },
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    key: "training",
    title: { en: "Training & Consulting", zh: "培训与咨询" },
    desc: { en: "From GTC insights to AI strategy workshops. We help companies like Lenovo and Alibaba navigate the AI revolution.", zh: "从 GTC 洞察到 AI 战略工作坊。我们协助联想、阿里等企业穿越 AI 浪潮。" },
    icon: <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  },
  {
    key: "studyTours",
    title: { en: "Silicon Valley Study", zh: "硅谷游学" },
    desc: { en: "Direct access to Stanford AI Lab, NVIDIA GTC, and top tech campuses. Real-world insights, premium networking.", zh: "直达斯坦福 AI Lab、NVIDIA GTC 与一线科技园区。真实洞察，高端人脉。" },
    icon: <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-5 1h1.5a1.5 1.5 0 011.5 1.5v1.5m-6 0h.5a1.5 1.5 0 001.5-1.5V19a2 2 0 00-2-2h-1" />,
  },
];

function BusinessOverview({ lang }) {
  const isEn = lang === "en";
  const [hover, setHover] = React.useState(null);
  return (
    <section id="business" style={{ background: "#f9fafb", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#1e477c", margin: 0, letterSpacing: "-0.01em" }}>
            {isEn ? "MindsLeap Core Services" : "MindsLeap 核心服务"}
          </h2>
          <div style={{ width: 80, height: 4, background: "#3b82f6", margin: "16px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {PILLARS.map((p) => {
            const isHov = hover === p.key;
            return (
              <a key={p.key} href={`#${p.key}`} onMouseEnter={() => setHover(p.key)} onMouseLeave={() => setHover(null)} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: isHov ? "0 20px 25px -5px rgba(0,0,0,0.10)" : "0 1px 2px 0 rgba(0,0,0,0.05)", height: "100%", textAlign: "center", transition: "box-shadow 250ms, transform 250ms", transform: isHov ? "translateY(-2px)" : "none", boxSizing: "border-box" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 8, background: isHov ? "#1e477c" : "#eff6ff", color: isHov ? "#fff" : "#1e477c", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", transition: "all 500ms" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {p.icon}
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 12px" }}>{p.title[lang]}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "#4b5563", margin: 0 }}>{p.desc[lang]}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.BusinessOverview = BusinessOverview;
