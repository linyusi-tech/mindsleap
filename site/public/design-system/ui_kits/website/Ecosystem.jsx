function Ecosystem({ lang }) {
  const isEn = lang === "en";
  const items = [
    isEn ? "Founders Space Global Network" : "Founders Space 全球网络",
    isEn ? "Top University AI Labs (Stanford / Berkeley)" : "顶尖高校 AI 实验室（斯坦福 / 伯克利）",
    isEn ? "Corporate Giants (Google / NVIDIA / Lenovo)" : "全球科技巨头（Google / NVIDIA / 联想）",
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "2fr 3fr", gap: 48, alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "#1e477c", margin: "0 0 24px", letterSpacing: "-0.01em" }}>
            {isEn ? "Global Eco-system" : "全球生态系统"}
          </h2>
          <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.65, margin: "0 0 32px" }}>
            {isEn
              ? "MindsLeap builds a global AI-powered resource network, sitting at the center of the ecosystem, connecting traditional enterprises with AI innovators, capital, and the Silicon Valley ecosystem."
              : "MindsLeap 搭建一张以 AI 为核心的全球资源网络，连接传统企业、AI 创业者、资本与硅谷生态。"}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {items.map((label) => (
              <li key={label} style={{ display: "flex", alignItems: "center", gap: 12, color: "#1e477c", fontWeight: 600, fontSize: 15 }}>
                <span style={{ width: 24, height: 24, borderRadius: 9999, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>✓</span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <EcosystemChartPlaceholder lang={lang} />
      </div>
    </section>
  );
}

function EcosystemChartPlaceholder({ lang }) {
  const isEn = lang === "en";
  const nodes = [
    { label: isEn ? "Traditional Industry Founders" : "传统行业创始人", x: 12, y: 22 },
    { label: isEn ? "AI & Robotics Founders" : "AI 与机器人创始人", x: 70, y: 18 },
    { label: isEn ? "Silicon Valley AI Ecosystem" : "硅谷 AI 生态", x: 72, y: 70 },
    { label: isEn ? "Angel / VC / PE Investors" : "天使 / VC / PE 投资人", x: 10, y: 72 },
  ];
  return (
    <div style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.18)", background: "linear-gradient(180deg, #f9fafb, #eff6ff)", position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {nodes.map((n, i) => (
          <line key={i} x1={50} y1={30} x2={n.x + 8} y2={n.y + 4} stroke="#bfdbfe" strokeWidth="0.4" />
        ))}
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 130, height: 130, borderRadius: 9999, background: "#1e477c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontWeight: 700, fontSize: 14, padding: 12, boxSizing: "border-box", lineHeight: 1.3 }}>
        MindsLeap<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>{isEn ? "心智悦动" : "Joyful Transformation"}</span>
      </div>
      {nodes.map((n) => (
        <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, background: "#fff", padding: "8px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 600, color: "#1e477c", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.08)" }}>
          {n.label}
        </div>
      ))}
    </div>
  );
}

window.Ecosystem = Ecosystem;
