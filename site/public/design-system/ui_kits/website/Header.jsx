const { useState, useEffect } = React;

const NAV_LINKS = [
  { href: "ai-club", en: "AI Club", zh: "AI 俱乐部" },
  { href: "incubation", en: "Unicorn Incubation", zh: "独角兽孵化" },
  { href: "training", en: "AI Training & Consulting", zh: "AI 培训咨询" },
  { href: "study-tours", en: "Custom Study Tours", zh: "定制游学" },
  { href: "news", en: "News", zh: "新闻" },
  { href: "about", en: "About", zh: "关于" },
];

function Header({ lang, setLang }) {
  const isEn = lang === "en";
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: "1px solid #f3f4f6", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 80 }}>
        <a href="#" style={{ display: "flex", alignItems: "center" }}>
          <img src="../../assets/logos/mindsleap-logo-blue.png" alt="MindsLeap" style={{ height: 36 }} />
        </a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={`#${l.href}`} style={{ fontSize: 14, fontWeight: 600, color: "#1e477c", textDecoration: "none", letterSpacing: "-0.01em" }}>
              {isEn ? l.en : l.zh}
            </a>
          ))}
          <button onClick={() => setLang(isEn ? "zh" : "en")} style={{ background: "none", border: 0, fontSize: 14, color: "#9ca3af", fontWeight: 500, cursor: "pointer" }}>
            {isEn ? "中文" : "EN"}
          </button>
          <a href="#contact" style={{ background: "#1e477c", color: "#fff", padding: "10px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.10)" }}>
            {isEn ? "Join the Club" : "加入俱乐部"}
          </a>
        </div>
      </div>
    </nav>
  );
}

window.Header = Header;
