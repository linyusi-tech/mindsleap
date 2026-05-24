// Auto-size iframes to their content height (same-origin only).
// Loaded by index pages that embed preview HTMLs.

function fitIframe(f) {
  try {
    const doc = f.contentDocument;
    if (!doc || !doc.documentElement) return;
    const measure = () => {
      const h = Math.max(
        doc.documentElement.scrollHeight,
        doc.body ? doc.body.scrollHeight : 0
      );
      if (h > 40) f.style.height = (h + 4) + "px";
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(doc.documentElement);
    if (doc.body) ro.observe(doc.body);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
    setTimeout(measure, 200);
  } catch (e) {
    // cross-origin or detached doc — keep the data-h default
  }
}

document.querySelectorAll("iframe[data-h]").forEach((f) => {
  const fallback = parseInt(f.getAttribute("data-h"), 10);
  if (fallback) f.style.height = fallback + "px";
  // Iframes that load content depending on viewport units (vh, vw) shouldn't
  // be auto-fitted — measuring grows the iframe, which grows the content,
  // which grows the iframe again. Opt out with data-no-fit.
  if (f.hasAttribute("data-no-fit")) return;
  f.addEventListener("load", () => fitIframe(f));
  try {
    if (f.contentDocument && f.contentDocument.readyState === "complete") {
      fitIframe(f);
    }
  } catch (e) {}
});
