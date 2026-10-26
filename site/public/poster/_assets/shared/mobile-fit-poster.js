(function () {
  var canvas = document.querySelector("[data-mobile-fit]");
  if (!canvas) {
    canvas = document.querySelector(".poster") || document.querySelector(".page");
  }
  if (!canvas) return;

  var baseWidth = Number(canvas.getAttribute("data-fit-width")) || Math.ceil(canvas.getBoundingClientRect().width || canvas.scrollWidth);
  if (!baseWidth) return;

  function fitPoster() {
    var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    if (!viewportWidth) return;

    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.minWidth = "0";

    if (viewportWidth >= baseWidth) {
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
      canvas.style.marginLeft = "";
      canvas.style.marginRight = "";
      document.body.style.width = "";
      document.body.style.height = "";
      return;
    }

    var scale = viewportWidth / baseWidth;
    canvas.style.transform = "scale(" + scale + ")";
    canvas.style.transformOrigin = "top left";
    canvas.style.marginLeft = "0";
    canvas.style.marginRight = "0";
    document.body.style.width = viewportWidth + "px";
    document.body.style.height = Math.ceil(canvas.scrollHeight * scale) + "px";
  }

  window.addEventListener("resize", fitPoster, { passive: true });
  window.addEventListener("orientationchange", fitPoster, { passive: true });
  window.addEventListener("load", fitPoster);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitPoster).catch(function () {});
  }
  requestAnimationFrame(fitPoster);
})();
