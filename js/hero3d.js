/* ===========================================================
   HERO — "Cámara" guiada por scroll a través de fotos reales
   de la casa, usando perspectiva 3D nativa de CSS (sin WebGL).
   Cada .hero__frame es una foto real colocada a una profundidad
   fija en el eje Z; al hacer scroll desplazamos el mundo en Z,
   así la cámara "vuela" de una habitación a otra.
   =========================================================== */
(function () {
  const heroSection = document.getElementById("hero3d");
  const world = document.getElementById("hero3d-world");
  if (!heroSection || !world) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const frames = Array.from(world.querySelectorAll(".hero__frame"));
  const captions = Array.from(document.querySelectorAll(".hero__caption[data-step]"));
  const progressBar = document.getElementById("hero3d-progress-bar");

  /* -----------------------------------------------------------
     EDITA AQUÍ la separación entre habitaciones (profundidad en
     px). Más DEPTH_STEP = más "vuelo"/zoom dentro de cada foto
     antes de pasar a la siguiente; perspective en .hero__tunnel
     (CSS) controla qué tan fuerte se siente el túnel 3D.
  ----------------------------------------------------------- */
  const DEPTH_STEP = 2200; // distancia en Z entre cada habitación

  const totalDepth = (frames.length - 1) * DEPTH_STEP;

  function getScrollProgress() {
    const rect = heroSection.getBoundingClientRect();
    const total = heroSection.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / total));
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  let targetT = 0;
  let currentT = 0;
  function onScroll() {
    targetT = getScrollProgress();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function updateCaptions(activeIndex) {
    captions.forEach((cap, i) => cap.classList.toggle("is-active", i === activeIndex));
  }
  function updateProgressBar(progress) {
    if (progressBar) progressBar.style.width = progress * 100 + "%";
  }

  function render(t) {
    const cameraZ = t * totalDepth;

    // Siempre hay exactamente dos fotos activas (la actual y la siguiente) y
    // su opacidad suma 1: así nunca hay un instante en que ambas estén casi
    // apagadas a la vez (lo que se veía como un "hueco" negro al cruzar).
    const rawIndex = t * (frames.length - 1);
    const activeIndex = Math.min(frames.length - 2, Math.floor(rawIndex));
    const localT = smoothstep(Math.min(1, Math.max(0, rawIndex - activeIndex)));

    frames.forEach((frame, i) => {
      const depth = -i * DEPTH_STEP;
      let opacity = 0;
      if (i === activeIndex) opacity = 1 - localT;
      else if (i === activeIndex + 1) opacity = localT;

      frame.style.opacity = opacity.toFixed(3);
      frame.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
      frame.style.transform = `translateZ(${depth}px)`;
    });

    world.style.transform = `translateZ(${cameraZ}px)`;
    updateCaptions(localT < 0.5 ? activeIndex : activeIndex + 1);
    updateProgressBar(t);
  }

  function isHeroInView() {
    const rect = heroSection.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  let raf = null;
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!isHeroInView()) return;

    currentT = prefersReducedMotion ? targetT : currentT + (targetT - currentT) * 0.12;
    render(currentT);
  }

  render(0);
  loop();
})();
