function ValueProp({ lang }) {
  const isEn = lang === "en";
  return (
    <section style={{ background: "#1e477c", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 32px", letterSpacing: "-0.01em" }}>
            {isEn ? "MindsLeap: Joyful Transformation" : "MindsLeap：心智悦动，愉悦转型"}
          </h2>
          <p style={{ color: "#dbeafe", fontSize: 18, lineHeight: 1.65, margin: "0 0 24px" }}>
            {isEn
              ? `Traditional entrepreneurs face an "anxiety gap" in the AI era — knowing AI matters but unable to find a clear path. Tech entrepreneurs are busy developing AI and robotics applications but lack real customers and scenarios.`
              : `传统企业家在 AI 时代面临"焦虑鸿沟"——知道 AI 重要，却找不到清晰路径。科技创业者忙着研发 AI 与机器人应用，却缺少真实客户与场景。`}
          </p>
          <p style={{ color: "#dbeafe", fontSize: 18, lineHeight: 1.65, margin: 0 }}>
            {isEn
              ? `MindsLeap partners with Founders Space to build an entrepreneur ecosystem connecting traditional and emerging industries, domestic and international capital, and the Silicon Valley tech community. We believe this journey should be joyful. Join us and "Leap" together.`
              : `MindsLeap 携手硅谷孵化器 Founders Space，搭建连接传统与新兴产业、国内外资本与硅谷生态的创业网络。我们相信这段旅程应当是愉快的。加入我们，一起"Leap"。`}
          </p>
          <img src="../../assets/logos/mindsleap-x-foundersspace-joint.png" alt="MindsLeap × Founders Space" style={{ height: 56, marginTop: 32 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <QuoteCard
            quote={isEn
              ? "Upgrade AI Mindsets for Global Success. Our mission is to accompany traditional enterprises in their AI transformation and help technology companies grow faster."
              : "升级 AI 思维，走向全球成功。我们的使命是陪伴传统企业完成 AI 转型，并帮助科技企业更快成长。"}
            name="Lincoln Wang"
            role={isEn ? "Founder & CEO, MindsLeap" : "MindsLeap 创始人兼 CEO"}
            role2={isEn ? "Founders Space Global Partner" : "Founders Space 全球合伙人"}
            initials="LW"
          />
          <QuoteCard
            quote={isEn
              ? "Founders Space and MindsLeap are coming together to help entrepreneurs and businesses transform with AI."
              : "Founders Space 与 MindsLeap 携手，帮助创业者与企业完成 AI 转型。"}
            name="Steve Hoffman"
            role={isEn ? "Founder & Chairman, Founders Space" : "Founders Space 创始人兼董事长"}
            initials="SH"
          />
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ quote, name, role, role2, initials }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 32 }}>
      <blockquote style={{ fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.55, margin: 0 }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 9999, background: "#fff", color: "#1e477c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
          <div style={{ fontSize: 13, color: "#bfdbfe", lineHeight: 1.45 }}>{role}</div>
          {role2 && <div style={{ fontSize: 13, color: "#bfdbfe", lineHeight: 1.45 }}>{role2}</div>}
        </div>
      </div>
    </div>
  );
}

window.ValueProp = ValueProp;
