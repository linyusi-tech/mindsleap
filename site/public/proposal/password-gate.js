(function () {
  var PASSWORD = "Proposals";
  var SESSION_KEY = "mindsleap:proposal:access";

  var style = document.createElement("style");
  style.textContent = [
    "html.proposal-locked, html.proposal-locked body { min-height: 100%; overflow: hidden !important; }",
    "html.proposal-locked body > :not(.proposal-gate) { visibility: hidden !important; pointer-events: none !important; }",
    ".proposal-gate { position: fixed; inset: 0; z-index: 2147483647; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at 20% 15%, rgba(59,130,246,.18), transparent 32%), linear-gradient(135deg, #f8fbff 0%, #eef4ff 48%, #ffffff 100%); color: #10213a; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', sans-serif; }",
    ".proposal-gate__card { width: min(440px, 100%); padding: 34px; border: 1px solid rgba(30,71,124,.16); border-radius: 28px; background: rgba(255,255,255,.92); box-shadow: 0 28px 80px rgba(30,71,124,.18); backdrop-filter: blur(16px); }",
    ".proposal-gate__eyebrow { margin: 0 0 14px; color: #3b82f6; font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }",
    ".proposal-gate__title { margin: 0; color: #1e477c; font-size: 32px; line-height: 1.12; letter-spacing: -.03em; }",
    ".proposal-gate__copy { margin: 16px 0 24px; color: #4b5563; font-size: 15px; line-height: 1.7; }",
    ".proposal-gate__row { display: flex; gap: 12px; }",
    ".proposal-gate__input { min-width: 0; flex: 1; height: 50px; padding: 0 16px; border: 1px solid #cbd5e1; border-radius: 16px; color: #111827; background: #fff; font-size: 16px; outline: none; }",
    ".proposal-gate__input:focus { border-color: #1e477c; box-shadow: 0 0 0 4px rgba(30,71,124,.12); }",
    ".proposal-gate__button { height: 50px; padding: 0 20px; border: 0; border-radius: 16px; background: #1e477c; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; }",
    ".proposal-gate__error { min-height: 20px; margin: 12px 0 0; color: #dc2626; font-size: 13px; font-weight: 700; }",
    "@media (max-width: 520px) { .proposal-gate__card { padding: 26px; border-radius: 24px; } .proposal-gate__row { flex-direction: column; } .proposal-gate__button { width: 100%; } }"
  ].join("\n");
  document.head.appendChild(style);

  function hasAccess() {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function saveAccess() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch (error) {
      // If storage is unavailable, unlocking the current page is still fine.
    }
  }

  function unlock(gate) {
    saveAccess();
    document.documentElement.classList.remove("proposal-locked");
    if (gate && gate.parentNode) gate.parentNode.removeChild(gate);
  }

  function mountGate() {
    if (hasAccess()) {
      document.documentElement.classList.remove("proposal-locked");
      return;
    }

    var gate = document.createElement("div");
    gate.className = "proposal-gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.innerHTML = [
      '<form class="proposal-gate__card">',
      '<p class="proposal-gate__eyebrow">MindsLeap Proposal</p>',
      '<h1 class="proposal-gate__title">请输入密码查看 Proposal</h1>',
      '<p class="proposal-gate__copy">这部分内容仅限内部预览和客户沟通使用。请输入密码后继续浏览。</p>',
      '<div class="proposal-gate__row">',
      '<input class="proposal-gate__input" type="password" autocomplete="current-password" placeholder="Password" aria-label="Proposal password" />',
      '<button class="proposal-gate__button" type="submit">进入</button>',
      "</div>",
      '<p class="proposal-gate__error" aria-live="polite"></p>',
      "</form>"
    ].join("");

    var form = gate.querySelector("form");
    var input = gate.querySelector("input");
    var error = gate.querySelector(".proposal-gate__error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (input.value === PASSWORD) {
        unlock(gate);
        return;
      }
      error.textContent = "密码不正确，请重新输入。";
      input.value = "";
      input.focus();
    });

    document.body.prepend(gate);
    window.setTimeout(function () {
      input.focus();
    }, 0);
  }

  document.documentElement.classList.add("proposal-locked");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountGate);
  } else {
    mountGate();
  }
})();
