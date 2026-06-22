/* ===========================================================
   AVA Bienes Raíces — JS compartido (header, cards, hero, search)
   =========================================================== */

/* ---- SVG iconos ---- */
const ICONS = {
  cama: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 7v11M3 13h18M21 13v5M3 13a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3"/></svg>',
  bano: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM7 12V6a2 2 0 0 1 4 0M19 19l1 2M5 19l-1 2"/></svg>',
  area: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM3 9h18M9 21V9"/></svg>',
  auto: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14v4H5zM7 17v2M17 17v2"/></svg>',
  pin: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};

/* ---- Tarjeta de propiedad ---- */
function cardHTML(p) {
  const esRenta = p.estatus === "renta";
  const precio = esRenta
    ? `${fmtMXN(p.precio)} <small>/ mes</small>`
    : fmtMXN(p.precio);

  let specs = "";
  if (p.tipo === "terreno") {
    specs = `<span>${ICONS.area} ${p.terreno} m²</span>`;
  } else {
    specs = `
      <span>${ICONS.cama} ${p.recamaras}</span>
      <span>${ICONS.bano} ${p.banos}</span>
      <span>${ICONS.area} ${p.construccion} m²</span>`;
  }

  return `
  <article class="card reveal">
    <a href="propiedad.html?id=${p.id}" class="card__media">
      <img src="${p.fotos[0]}" alt="${p.titulo}" loading="lazy">
      <span class="badge badge--${p.estatus}">${ESTATUS_LABEL[p.estatus]}</span>
      <span class="card__type">${TIPO_LABEL[p.tipo]}</span>
    </a>
    <div class="card__body">
      <div class="card__price">${precio}</div>
      <h3 class="card__title">${p.titulo}</h3>
      <p class="card__loc">${ICONS.pin} ${p.colonia}, ${p.ciudad}</p>
      <div class="card__specs">${specs}</div>
      <a href="propiedad.html?id=${p.id}" class="btn btn--ghost card__link" style="margin-top:16px">Ver detalles</a>
    </div>
  </article>`;
}

/* ---- Header scroll + menú móvil ---- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const hasHero = document.querySelector(".hero");
  // En páginas sin hero oscuro el header permanece siempre sólido
  if (!hasHero) { header.classList.add("scrolled"); }
  else {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle) toggle.addEventListener("click", () => links.classList.toggle("open"));
}

/* ---- Reveal on scroll ---- */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* ---- Buscador rápido: redirige a propiedades.html con query ---- */
function initQuickSearch() {
  const form = document.getElementById("quick-search");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    ["tipo", "ciudad", "precio"].forEach((k) => {
      const v = form.elements[k]?.value;
      if (v) params.set(k, v);
    });
    window.location.href = "propiedades.html?" + params.toString();
  });
}

/* ---- Propiedades destacadas (home) ---- */
function renderDestacadas() {
  const wrap = document.getElementById("destacadas");
  if (!wrap) return;
  const destacadas = PROPIEDADES.filter((p) =>
    [1, 7, 2, 12, 4, 5].includes(p.id)
  );
  wrap.innerHTML = destacadas.map(cardHTML).join("");
}

/* ---- Categorías de inmuebles (home) ---- */
function renderCategorias() {
  const wrap = document.getElementById("categorias");
  if (!wrap || typeof CATEGORIAS === "undefined") return;
  wrap.innerHTML = CATEGORIAS.map((c) => {
    const n = conteoTipo(c.tipo);
    return `
    <a href="propiedades.html?tipo=${c.tipo}" class="cat-card reveal">
      <img src="${c.img}" alt="${c.label}" loading="lazy">
      <div class="cat-card__overlay">
        <h3>${c.label}</h3>
        <span>${n} propiedad${n === 1 ? "" : "es"}</span>
      </div>
    </a>`;
  }).join("");
}

/* ---- Créditos ---- */
function renderCreditos() {
  const wrap = document.getElementById("creditos");
  if (!wrap || typeof CREDITOS === "undefined") return;
  wrap.innerHTML = CREDITOS.map((c, i) => `
    <div class="credit-card reveal" style="transition-delay:${i * 80}ms">
      <span class="credit-card__num">0${i + 1}</span>
      <h3>${c.nombre}</h3>
      <p>${c.desc}</p>
    </div>`).join("");
}

/* ---- Equipo (home) ---- */
function renderEquipo() {
  const wrap = document.getElementById("equipo");
  if (!wrap) return;
  wrap.innerHTML = Object.values(AGENTES).map((a) => {
    const n = propsDeAgente(a.slug).length;
    return `
    <a href="vendedor.html?v=${a.slug}" class="team-card">
      <div class="team-card__photo"><img src="${a.foto}" alt="${a.nombre}" loading="lazy"></div>
      <div class="team-card__info">
        <h3>${a.nombre}</h3>
        <span class="team-card__role">${a.cargo}</span>
        <span class="team-card__count">${ICONS.pin} ${n} propiedad${n === 1 ? "" : "es"} activa${n === 1 ? "" : "s"}</span>
        <span class="team-card__link">Ver perfil &rarr;</span>
      </div>
    </a>`;
  }).join("");
}

/* ---- Form de contacto por pasos (vender / comprar) ---- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const intentInput = document.getElementById("intent");
  const tipoInput = document.getElementById("tipo-inmueble");
  const stepTipo = document.getElementById("step-tipo");
  const stepDatos = document.getElementById("step-datos");
  const tipoLabel = document.getElementById("tipo-label");

  // Selección de intención (vender / comprar)
  document.querySelectorAll("#choice-intent .choice__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#choice-intent .choice__btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      intentInput.value = btn.dataset.val;
      tipoLabel.textContent =
        btn.dataset.val === "vender"
          ? "¿Qué tipo de inmueble quieres vender?"
          : "¿Qué tipo de inmueble buscas comprar?";
      stepTipo.classList.add("show");
    });
  });

  // Selección de tipo de inmueble
  document.querySelectorAll("#choice-tipo .choice__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#choice-tipo .choice__btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      tipoInput.value = btn.dataset.val;
      stepDatos.classList.add("show");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!intentInput.value) return;
    document.getElementById("contact-note").classList.add("show");
    form.querySelectorAll("input[type=text], input[type=tel]").forEach((i) => (i.value = ""));
  });
}

/* ---- init ---- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initQuickSearch();
  renderCategorias();
  renderDestacadas();
  renderCreditos();
  renderEquipo();
  initContactForm();
  initReveal();
});
