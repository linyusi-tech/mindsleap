function Footer({ lang }) {
  const isEn = lang === "en";
  const links = [
    { en: "AI Club", zh: "AI 俱乐部" },
    { en: "Unicorn Incubation", zh: "独角兽孵化" },
    { en: "AI Training & Consulting", zh: "AI 培训咨询" },
    { en: "Custom Study Tours", zh: "定制游学" },
    { en: "News", zh: "新闻" },
    { en: "About", zh: "关于" },
  ];
  return (
    <footer style={{ background: "#1e477c", color: "#fff", padding: "80px 0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
          <div>
            <img src="../../assets/logos/mindsleap-logo-white.png" alt="MindsLeap" style={{ height: 40, marginBottom: 32 }} />
            <p style={{ fontStyle: "italic", color: "#dbeafe", fontSize: 18, maxWidth: 360, margin: 0 }}>
              &ldquo;Upgrade AI Mindsets for Global Success&rdquo;
            </p>
            <p style={{ color: "rgba(147,197,253,0.6)", fontSize: 13, marginTop: 16 }}>
              © 2026 MindsLeap. All Rights Reserved.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, margin: "0 0 24px" }}>{isEn ? "Our Services" : "我们的服务"}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {links.map((l) => (
                <li key={l.en}><a href="#" style={{ color: "#bfdbfe", textDecoration: "none", fontSize: 14 }}>{l[lang]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, margin: "0 0 24px" }}>{isEn ? "Contact Us" : "联系我们"}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, color: "#bfdbfe", fontSize: 14 }}>
              <li>Email: mindsleap@gmail.com</li>
              <li>Office: Silicon Valley / Shanghai</li>
            </ul>
            <div style={{ marginTop: 24 }}>
              <a href="#" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.10)", borderRadius: 9999, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#bfdbfe" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.20)", paddingTop: 32, display: "flex", justifyContent: "space-between", color: "rgba(147,197,253,0.6)", fontSize: 12 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a>
          </div>
          <span>Managed by Founders Space Partners</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
