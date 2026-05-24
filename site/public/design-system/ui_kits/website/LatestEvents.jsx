const POSTS = [
  {
    cat: { en: "Events", zh: "活动" },
    date: "Apr 20, 2026",
    title: { en: "AI Lobster Summit · Shanghai 2026", zh: "AI 龙虾峰会 · 上海站 2026" },
    excerpt: { en: "A field report on the Founders Space gathering, with takeaways from twelve speakers across enterprise AI, robotics, and capital.", zh: "Founders Space 上海聚会现场记录——来自企业 AI、机器人与资本一线的十二位嘉宾洞察。" },
    bg: "linear-gradient(135deg,#1e477c,#3b82f6)",
  },
  {
    cat: { en: "Founders Talk", zh: "Founders Talk" },
    date: "Apr 08, 2026",
    title: { en: "Andy Zhang: Hard-Tech Investor, AI Founder", zh: "张珣：硬科技投资人与 AI 创业者的双重身份" },
    excerpt: { en: "What changes when an investor steps onto the founder side of the table during the AI capital cycle.", zh: "当一名投资人在 AI 资本周期中走到创始人席位，会发生什么改变。" },
    bg: "linear-gradient(135deg,#152f54,#2a5a9e)",
  },
  {
    cat: { en: "AI Insights", zh: "AI 洞察" },
    date: "Apr 08, 2026",
    title: { en: "Token Economics: The Enterprise AI Calling-Capacity", zh: "Token 经济学：企业的智能调用能力" },
    excerpt: { en: "Why the strategic question for CEOs in 2026 isn't 'which model' but how much intelligence they can afford to call.", zh: "2026 年 CEO 的战略问题，不再是\"选哪个模型\"，而是企业能调用多少智能。" },
    bg: "linear-gradient(135deg,#0b1c33,#1e477c)",
  },
];

function LatestEvents({ lang, title, subtitle, background = "#f9fafb" }) {
  const isEn = lang === "en";
  return (
    <section style={{ background, padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: "#1e477c", margin: 0, letterSpacing: "-0.01em" }}>{title[lang]}</h2>
            <p style={{ color: "#6b7280", margin: "8px 0 0", fontSize: 15 }}>{subtitle[lang]}</p>
          </div>
          <a href="#news" style={{ color: "#3b82f6", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
            {isEn ? "View More" : "查看更多"} →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {POSTS.map((post) => (
            <a key={post.title.en} href="#news" style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)", transition: "box-shadow 250ms, transform 250ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.05)"; }}>
                <div style={{ height: 224, background: post.bg }} />
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase" }}>{post.cat[lang]}</span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1e477c", lineHeight: 1.3, margin: "0 0 16px" }}>{post.title[lang]}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: "#4b5563", margin: "0 0 20px" }}>{post.excerpt[lang]}</p>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1e477c", borderBottom: "2px solid #3b82f6", paddingBottom: 2 }}>
                    {isEn ? "Learn More" : "了解更多"}
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.LatestEvents = LatestEvents;
