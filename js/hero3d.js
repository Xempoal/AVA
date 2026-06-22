/* ===========================================================
   HERO 3D — Recorrido de cámara guiado por scroll (Three.js)
   Casa moderna construida 100% por código (sin modelos externos).
   =========================================================== */
(function () {
  const canvas = document.getElementById("hero3d-canvas");
  const heroSection = document.getElementById("hero3d");
  if (!canvas || !heroSection || typeof THREE === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 720;

  /* -----------------------------------------------------------
     EDITA AQUÍ los puntos de cámara del recorrido (cameraPath).
     Cada paso: scroll (0 a 1), pos = posición de la cámara,
     look = punto al que mira. El recorrido interpola entre ellos.
  ----------------------------------------------------------- */
  const cameraPath = [
    { scroll: 0.0, pos: [9.5, 4.6, 11], look: [0, 1.2, 0] }, // fachada
    { scroll: 0.2, pos: [3.2, 2.6, 6.2], look: [0.5, 1.4, -0.5] }, // entrada
    { scroll: 0.4, pos: [-1.6, 2.0, 3.4], look: [-2.6, 1.2, -1.2] }, // sala
    { scroll: 0.6, pos: [-4.0, 2.2, -0.6], look: [-3.0, 1.1, -3.4] }, // cocina
    { scroll: 0.8, pos: [2.6, 2.1, -2.4], look: [4.6, 1.1, -3.6] }, // recámara
    { scroll: 1.0, pos: [7.5, 2.8, 4.0], look: [7.6, 0.6, 0.2] }, // jardín / terraza
  ];

  /* EDITA AQUÍ los textos de cada habitación (deben coincidir con .hero__caption[data-step] en index.html) */
  const captions = Array.from(document.querySelectorAll(".hero__caption[data-step]"));
  const progressBar = document.getElementById("hero3d-progress-bar");

  /* ---------------- Escena ---------------- */
  const scene = new THREE.Scene();
  const bgTexture = makeSkyGradient();
  scene.background = bgTexture;
  scene.fog = new THREE.Fog(0xcfd8e6, 18, 42);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(...cameraPath[0].pos);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  function makeSkyGradient() {
    const c = document.createElement("canvas");
    c.width = 16;
    c.height = 256;
    const ctx = c.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#bcd2ea");
    grad.addColorStop(0.55, "#dfe6ee");
    grad.addColorStop(1, "#f3ede1");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace || tex.colorSpace;
    return tex;
  }

  /* ---------------- Materiales ---------------- */
  const mat = {
    floor: new THREE.MeshStandardMaterial({ color: 0xd9c9ab, roughness: 0.85 }),
    floorDark: new THREE.MeshStandardMaterial({ color: 0xb7a586, roughness: 0.8 }),
    wall: new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.95 }),
    wallAccent: new THREE.MeshStandardMaterial({ color: 0x6f8aa8, roughness: 0.8 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x33363d, roughness: 0.6 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x8a6442, roughness: 0.7 }),
    sofa: new THREE.MeshStandardMaterial({ color: 0x5c7088, roughness: 0.9 }),
    bed: new THREE.MeshStandardMaterial({ color: 0xe8e1d4, roughness: 0.9 }),
    counter: new THREE.MeshStandardMaterial({ color: 0x2f3540, roughness: 0.4, metalness: 0.1 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x9fd0e8, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.35 }),
    grass: new THREE.MeshStandardMaterial({ color: 0x7f9b5e, roughness: 1 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xc9a24b, roughness: 0.4, metalness: 0.3 }),
  };

  function box(w, h, d, material, x, y, z, ry) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    if (ry) m.rotation.y = ry;
    m.castShadow = m.receiveShadow = !isMobile;
    scene.add(m);
    return m;
  }

  const house = new THREE.Group();
  scene.add(house);

  function addTo(group, mesh) {
    scene.remove(mesh);
    group.add(mesh);
    return mesh;
  }

  /* ---------------- Terreno y jardín ---------------- */
  addTo(house, box(40, 0.2, 40, mat.grass, 0, -0.1, 0));
  addTo(house, box(16, 0.05, 12, mat.floorDark, 8, 0.02, 1)); // terraza

  /* ---------------- Piso interior ---------------- */
  addTo(house, box(13, 0.2, 11, mat.floor, -1, 0, -1));

  /* ---------------- Muros exteriores (en corte/dollhouse) ---------------- */
  const wallH = 3;
  addTo(house, box(13, wallH, 0.2, mat.wall, -1, wallH / 2, -6.5)); // muro trasero
  addTo(house, box(0.2, wallH, 11, mat.wall, -7.5, wallH / 2, -1)); // muro izquierdo
  addTo(house, box(0.2, wallH, 5, mat.wall, 4.5, wallH / 2, -4)); // muro derecho (parcial, frente abierto)
  addTo(house, box(0.2, wallH, 4, mat.wallAccent, 4.5, wallH / 2, 1.5));

  /* Fachada frontal con vano de entrada */
  addTo(house, box(5, wallH, 0.2, mat.wall, -4.4, wallH / 2, 4.5));
  addTo(house, box(2.5, 0.6, 0.2, mat.wall, -0.15, wallH - 0.3, 4.5));
  addTo(house, box(0.2, wallH, 0.2, mat.gold, -1.4, wallH / 2, 4.5));

  /* Techo plano moderno con volado */
  addTo(house, box(14.5, 0.3, 12.5, mat.roof, -1, wallH + 0.15, -1));

  /* ---------------- Muros divisorios interiores ---------------- */
  addTo(house, box(0.15, wallH, 5.5, mat.wallAccent, -4.0, wallH / 2, -2.2)); // separa entrada/sala de cocina
  addTo(house, box(4.5, wallH, 0.15, mat.wallAccent, -3.6, wallH / 2, 0.4));
  addTo(house, box(0.15, wallH, 4, mat.wallAccent, 0.8, wallH / 2, -3.8)); // separa sala/recámara

  /* ---------------- Ventanales (vidrio) ---------------- */
  addTo(house, box(3.6, 1.8, 0.08, mat.glass, -2.0, 1.6, -6.46));
  addTo(house, box(0.08, 1.8, 3.6, mat.glass, 4.46, 1.6, -2.5));
  addTo(house, box(3.0, 2.2, 0.08, mat.glass, 4, 1.4, 1.46));

  /* ---------------- Sala (entrada) ---------------- */
  addTo(house, box(2.6, 0.65, 1.0, mat.sofa, -1.6, 0.32, 2.4)); // sofá
  addTo(house, box(2.6, 0.5, 0.4, mat.sofa, -1.6, 0.6, 2.9));
  addTo(house, box(1.0, 0.32, 1.0, mat.wood, -1.6, 0.16, 0.9)); // mesa centro
  addTo(house, box(0.8, 0.06, 1.2, mat.wood, -3.3, 0.55, 1.4, 0.2)); // consola

  /* Luz cálida de sala */
  const lampSala = new THREE.PointLight(0xffcf9e, 6, 6, 2);
  lampSala.position.set(-1.6, 2.4, 1.0);
  house.add(lampSala);

  /* ---------------- Cocina ---------------- */
  addTo(house, box(3.6, 0.95, 1.0, mat.counter, -5.6, 0.48, -3.6)); // barra/isla
  addTo(house, box(3.6, 0.06, 1.4, mat.wood, -5.6, 0.98, -3.6));
  addTo(house, box(0.9, 1.3, 0.9, mat.counter, -6.7, 0.65, -1.4)); // refri
  addTo(house, box(4.6, 0.9, 0.55, mat.counter, -6.8, 0.45, -5.8)); // alacena baja
  addTo(house, box(4.6, 0.6, 0.3, mat.wall, -6.8, 1.9, -5.95)); // alacena alta

  const lampCocina = new THREE.PointLight(0xfff0d6, 5, 6, 2);
  lampCocina.position.set(-5.6, 2.3, -3.0);
  house.add(lampCocina);

  /* ---------------- Recámara ---------------- */
  addTo(house, box(2.2, 0.55, 2.6, mat.bed, 3.6, 0.28, -4.0)); // cama
  addTo(house, box(2.2, 0.5, 0.25, mat.wood, 3.6, 0.55, -5.25)); // cabecera
  addTo(house, box(0.6, 0.45, 0.5, mat.wood, 2.2, 0.22, -5.0)); // buró
  addTo(house, box(1.6, 1.7, 0.5, mat.wood, 1.2, 0.85, -1.9, 0.3)); // closet

  const lampRecamara = new THREE.PointLight(0xffd9b0, 4.5, 5.5, 2);
  lampRecamara.position.set(3.6, 2.2, -3.8);
  house.add(lampRecamara);

  /* ---------------- Terraza / jardín ---------------- */
  addTo(house, box(1.3, 0.45, 1.3, mat.wood, 8.5, 0.22, 1.5));
  addTo(house, box(1.3, 0.45, 1.3, mat.wood, 10.3, 0.22, 1.5));
  addTo(house, box(2.6, 0.06, 1.6, mat.wood, 9.4, 0.46, 1.5));
  for (let i = 0; i < 4; i++) {
    addTo(house, box(0.35, 1.6 + Math.random() * 0.6, 0.35, mat.grass, 6 + i * 1.6, 0.8, -1.2 - (i % 2) * 0.6));
  }

  /* ---------------- Iluminación general ---------------- */
  const sun = new THREE.DirectionalLight(0xfff3df, 2.1);
  sun.position.set(14, 16, 10);
  sun.castShadow = !isMobile;
  if (sun.shadow) {
    sun.shadow.mapSize.set(isMobile ? 512 : 1536, isMobile ? 512 : 1536);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.far = 60;
    sun.shadow.bias = -0.0015;
  }
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0xcfd9e8, 0.55));
  scene.add(new THREE.HemisphereLight(0xdfe8f5, 0x9b8a6c, 0.4));

  /* ---------------- Resize ---------------- */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------------- Interpolación de cámara guiada por scroll ---------------- */
  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function lerp3(a, b, t, out) {
    out.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
    return out;
  }

  function sampleCameraPath(progress) {
    let i = 0;
    while (i < cameraPath.length - 2 && progress > cameraPath[i + 1].scroll) i++;
    const a = cameraPath[i];
    const b = cameraPath[i + 1];
    const span = b.scroll - a.scroll || 1;
    let t = (progress - a.scroll) / span;
    t = Math.min(1, Math.max(0, t));
    t = smoothstep(t);
    lerp3(a.pos, b.pos, t, tmpPos);
    lerp3(a.look, b.look, t, tmpLook);
  }

  function getScrollProgress() {
    const rect = heroSection.getBoundingClientRect();
    const total = heroSection.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const scrolled = -rect.top;
    return Math.min(1, Math.max(0, scrolled / total));
  }

  let targetT = 0;
  let currentT = 0;

  function onScroll() {
    targetT = getScrollProgress();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Captions sincronizados ---------------- */
  function updateCaptions(progress) {
    if (!captions.length) return;
    const stepCount = captions.length;
    const activeIndex = Math.min(stepCount - 1, Math.round(progress * (stepCount - 1)));
    captions.forEach((cap, i) => cap.classList.toggle("is-active", i === activeIndex));
  }

  function updateProgressBar(progress) {
    if (progressBar) progressBar.style.width = progress * 100 + "%";
  }

  /* ---------------- Loop de animación ---------------- */
  const clock = new THREE.Clock();
  let lastVisible = true;

  function isHeroInView() {
    const rect = heroSection.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(0.1, clock.getDelta());

    lastVisible = isHeroInView();
    if (!lastVisible) return;

    if (prefersReducedMotion) {
      currentT = targetT;
    } else {
      currentT += (targetT - currentT) * Math.min(1, dt * 6);
    }

    sampleCameraPath(currentT);
    camera.position.copy(tmpPos);
    camera.lookAt(tmpLook);

    updateCaptions(currentT);
    updateProgressBar(currentT);

    renderer.render(scene, camera);
  }

  updateCaptions(0);
  updateProgressBar(0);
  animate();
})();
