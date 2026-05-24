const { useState: useStateHero, useEffect: useEffectHero } = React;

const HERO_SLIDES = [
  { eyebrow: { en: "AI Founders Club", zh: "AI 创始人俱乐部" }, heading: { en: ["Upgrade AI Mindsets", "for Global Success"], zh: ["升级 AI 思维", "走向全球成功"] }, sub: { en: "Upgrade cutting-edge AI thinking, refuse to fall behind.", zh: "升级前沿 AI 思维，拒绝掉队。" }, cta: { en: "Join the Club", zh: "加入俱乐部" }, bg: "linear-gradient(135deg,#2a5a9e 0%,#152f54 60%,#0b1c33 100%)" },
  { eyebrow: { en: "Unicorn Incubation", zh: "独角兽孵化" }, heading: { en: ["Scaling Tomorrow's", "Tech Giants"], zh: ["孵化明日的", "科技巨头"] }, sub: { en: "Empowering global growth, accelerating unicorn success.", zh: "助力全球扩张，加速独角兽诞生。" }, cta: { en: "Become a Unicorn", zh: "成为独角兽" }, bg: "linear-gradient(135deg,#1e477c 0%,#0b1c33 100%)" },
  { eyebrow: { en: "AI Consulting & Training", zh: "AI 培训与咨询" }, heading: { en: ["Mastering and Implementing", "AI Strategy"], zh: ["掌握并落地", "AI 战略"] }, sub: { en: "Crafting AI strategy and delivering real AI projects.", zh: "制定 AI 战略，交付真实 AI 项目。" }, cta: { en: "Start AI Transformation", zh: "开启 AI 转型" }, bg: "linear-gradient(135deg,#152f54 0%,#2a5a9e 100%)" },
  { eyebrow: { en: "Global Study Tours", zh: "全球游学" }, heading: { en: ["Global Vision,", "Local Implementation"], zh: ["全球视野，", "本地落地"] }, sub: { en: "Deep dive into frontier ecosystems, expanding global perspective.", zh: "深入前沿生态系统，拓展全球视野。" }, cta: { en: "Explore the World", zh: "探索世界" }, bg: "linear-gradient(135deg,#3b82f6 0%,#1e477c 60%,#0b1c33 100%)" },
];

function Hero({ lang }) {
  const [i, setI] = useStateHero(0);
  useEffectHero(() => {
    const t = setInterval(() => setI((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ position: "relative", height: "80vh", minHeight: 560, overflow: "hidden" }}>
      {HERO_SLIDES.map((s, idx) => (
        <div key={idx} style={{ position: "absolute", inset: 0, transition: "opacity 700ms", opacity: idx === i ? 1 : 0, zIndex: idx === i ? 1 : 0 }}>
          <div style={{ position: "absolute", inset: 0, background: s.bg }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.40)" }} />
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ animation: idx === i ? "fadeIn 800ms ease-out forwards" : "none" }}>
              <div style={{ color: "#fff", fontSize: 24, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16 }}>
                {s.eyebrow[lang]}
              </div>
              <h1 style={{ color: "#fff", fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.015em", margin: "0 0 20px" }}>
                {s.heading[lang][0]}<br />{s.heading[lang][1]}
              </h1>
              <p style={{ color: "#e5e7eb", fontSize: 18, maxWidth: 640, margin: "0 auto 28px" }}>{s.sub[lang]}</p>
              <a href="#" style={{ background: "#fff", color: "#1e477c", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                {s.cta[lang]}
              </a>
            </div>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 32, left: 0, right: 0, zIndex: 20, display: "flex", justifyContent: "center", gap: 12 }}>
        {HERO_SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`slide ${idx + 1}`} style={{ width: 10, height: 10, borderRadius: 9999, background: idx === i ? "#fff" : "rgba(255,255,255,0.3)", border: 0, cursor: "pointer", padding: 0 }} />
        ))}
      </div>
    </section>
  );
}

window.Hero = Hero;
