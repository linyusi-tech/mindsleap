/* ─────────────────────────────────────────────────────────────
   MindsLeap Deck — Tweaks (vanilla JS)
   Floating panel, bottom-right. Implements the host edit-mode
   protocol so the toolbar toggle controls visibility, and the
   EDITMODE-BEGIN/END defaults block persists to disk.
   ───────────────────────────────────────────────────────────── */

(function () {
  // Defaults — wrap in EDITMODE markers so the host can persist edits.
  // The HTML's data-theme / data-heading-font / data-density attributes
  // win if present, so different deck files can ship different defaults
  // without forking this file.
  const DEFAULTS = /*EDITMODE-BEGIN*/ {
    "theme": "light",
    "headingFont": "brand",
    "density": "standard"
  } /*EDITMODE-END*/;

  const html = document.documentElement;
  const params = new URLSearchParams(window.location.search);
  const validTheme   = (v) => ["light", "brand", "dark", "magazine"].includes(v) ? v : null;
  const validHeading = (v) => ["brand", "inter", "noto"].includes(v) ? v : null;
  const validDensity = (v) => ["spacious", "standard", "compact"].includes(v) ? v : null;
  const STATE = {
    theme:       validTheme(params.get("theme"))     || html.getAttribute("data-theme")        || DEFAULTS.theme,
    headingFont: validHeading(params.get("heading")) || html.getAttribute("data-heading-font") || DEFAULTS.headingFont,
    density:     validDensity(params.get("density")) || html.getAttribute("data-density")      || DEFAULTS.density,
  };

  function apply() {
    const html = document.documentElement;
    html.setAttribute("data-theme", STATE.theme);
    html.setAttribute("data-heading-font", STATE.headingFont);
    html.setAttribute("data-density", STATE.density);
  }

  function persist(key, value) {
    STATE[key] = value;
    apply();
    try {
      window.parent.postMessage(
        { type: "__edit_mode_set_keys", edits: { [key]: value } },
        "*"
      );
    } catch (e) {}
    syncUI();
  }

  // ── panel chrome ───────────────────────────────────────────
  let panel;
  function buildPanel() {
    panel = document.createElement("div");
    panel.id = "ml-tweaks";
    panel.innerHTML = `
      <style>
        #ml-tweaks {
          position: fixed; right: 20px; bottom: 20px;
          width: 280px;
          background: rgba(20, 24, 32, 0.92);
          color: #f5f5f5;
          border-radius: 14px;
          padding: 18px 18px 16px;
          font: 500 13px/1.4 -apple-system, "SF Pro Text", "Inter", system-ui, sans-serif;
          letter-spacing: -0.005em;
          z-index: 2147483646;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 18px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06);
          display: none;
        }
        #ml-tweaks[data-open="1"] { display: block; }
        #ml-tweaks .head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        #ml-tweaks .head .title {
          font: 600 12px/1 -apple-system, sans-serif;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        #ml-tweaks .head .x {
          width: 24px; height: 24px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          cursor: pointer; user-select: none;
          font-size: 16px; line-height: 1;
        }
        #ml-tweaks .head .x:hover { background: rgba(255,255,255,0.08); color: #fff; }
        #ml-tweaks section { margin-bottom: 16px; }
        #ml-tweaks section:last-child { margin-bottom: 0; }
        #ml-tweaks label.sec {
          display: block;
          font: 600 11px/1 -apple-system, sans-serif;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 8px;
        }
        #ml-tweaks .seg {
          display: flex; gap: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 8px; padding: 3px;
        }
        #ml-tweaks .seg button {
          flex: 1;
          background: transparent;
          color: rgba(255,255,255,0.72);
          border: 0; outline: 0;
          padding: 7px 6px;
          border-radius: 6px;
          font: 500 12px/1 inherit; letter-spacing: 0;
          cursor: pointer;
        }
        #ml-tweaks .seg button:hover { color: #fff; }
        #ml-tweaks .seg button[data-on="1"] {
          background: rgba(255,255,255,0.14);
          color: #fff;
        }
        #ml-tweaks .swatches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        #ml-tweaks .swatch {
          aspect-ratio: 1.6/1;
          border-radius: 7px;
          cursor: pointer;
          position: relative;
          border: 1.5px solid transparent;
          overflow: hidden;
        }
        #ml-tweaks .swatch[data-on="1"] {
          border-color: #fff;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.18);
        }
        #ml-tweaks .swatch .name {
          position: absolute; bottom: 4px; left: 0; right: 0;
          text-align: center;
          font: 600 10px/1 -apple-system, sans-serif;
          letter-spacing: 0.05em;
          color: rgba(0,0,0,0.7);
          background: rgba(255,255,255,0.92);
          padding: 3px 0;
        }
        #ml-tweaks .swatch[data-theme="brand"] .name,
        #ml-tweaks .swatch[data-theme="dark"] .name { color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.65); }
      </style>
      <div class="head">
        <div class="title">Tweaks</div>
        <div class="x" data-act="close">×</div>
      </div>

      <section>
        <label class="sec">主题 · Theme</label>
        <div class="swatches" data-tweak="theme">
          <div class="swatch" data-theme="light"
               style="background:linear-gradient(180deg,#ffffff 0%,#ffffff 70%,#f9fafb 70%);">
            <span class="name">浅</span>
          </div>
          <div class="swatch" data-theme="brand"
               style="background:#1e477c;">
            <span class="name">品牌</span>
          </div>
          <div class="swatch" data-theme="dark"
               style="background:#0b1c33;">
            <span class="name">深</span>
          </div>
          <div class="swatch" data-theme="magazine"
               style="background:linear-gradient(180deg,#f3eee5 0%,#f3eee5 70%,#ebe4d6 70%);">
            <span class="name">杂志</span>
          </div>
        </div>
      </section>

      <section>
        <label class="sec">标题字体 · Heading</label>
        <div class="seg" data-tweak="headingFont">
          <button data-val="brand">Brand</button>
          <button data-val="inter">Inter</button>
          <button data-val="noto">Noto</button>
        </div>
      </section>

      <section>
        <label class="sec">页面密度 · Density</label>
        <div class="seg" data-tweak="density">
          <button data-val="spacious">松散</button>
          <button data-val="standard">标准</button>
          <button data-val="compact">紧凑</button>
        </div>
      </section>
    `;
    document.body.appendChild(panel);

    panel.addEventListener("click", (e) => {
      const t = e.target;
      if (t.dataset && t.dataset.act === "close") return close();

      // segmented buttons
      const segBtn = t.closest && t.closest(".seg button");
      if (segBtn) {
        const group = segBtn.closest("[data-tweak]");
        persist(group.dataset.tweak, segBtn.dataset.val);
        return;
      }

      // swatches
      const sw = t.closest && t.closest(".swatch");
      if (sw && sw.parentElement.dataset.tweak === "theme") {
        persist("theme", sw.dataset.theme);
      }
    });
  }

  function syncUI() {
    if (!panel) return;
    panel.querySelectorAll("[data-tweak]").forEach((group) => {
      const key = group.dataset.tweak;
      const cur = STATE[key];
      group.querySelectorAll(".swatch, .seg button").forEach((el) => {
        const v = el.dataset.val || el.dataset.theme;
        el.dataset.on = v === cur ? "1" : "0";
      });
    });
  }

  function open() {
    if (!panel) buildPanel();
    panel.dataset.open = "1";
    syncUI();
  }
  function close() {
    if (!panel) return;
    panel.dataset.open = "0";
    try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
  }

  // Wire up host edit-mode protocol BEFORE announcing availability.
  window.addEventListener("message", (e) => {
    const d = e.data || {};
    if (d.type === "__activate_edit_mode") open();
    else if (d.type === "__deactivate_edit_mode") close();
  });

  // Apply defaults on load
  apply();

  // Announce availability
  try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
})();
