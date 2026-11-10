(() => {
  const fit = () => document.documentElement.style.setProperty('--poster-zoom', Math.min(1, document.documentElement.clientWidth / 1080));
  fit();
  window.addEventListener('resize', fit, {passive: true});
  window.addEventListener('pageshow', fit, {passive: true});
})();
