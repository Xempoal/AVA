/* ===========================================================
   AVA — Página de detalle de propiedad (propiedad.html?id=X)
   =========================================================== */

let galeriaActual = [];
let lbIndex = 0;

function getId() {
  return Number(new URLSearchParams(location.search).get("id"));
}

function specItem(valor, label) {
  return `<div class="spec"><b>${valor}</b><span>${label}</span></div>`;
}

function renderDetalle() {
  const id = getId();
  const p = PROPIEDADES.find((x) => x.id === id) || PROPIEDADES[0];
  const ag = AGENTES[p.agente];
  galeriaActual = p.fotos;

  document.title = `${p.titulo} | AVA Bienes Raíces`;

  const esRenta = p.estatus === "renta";
  const precioTxt = esRenta ? `${fmtMXN(p.precio)} / mes` : fmtMXN(p.precio);

  // Galería (1 grande + hasta 4 chicas)
  const g = p.fotos;
  document.getElementById("gallery").innerHTML = g
    .slice(0, 5)
    .map((src, i) => `<img src="${src}" alt="${p.titulo} foto ${i + 1}" loading="${i ? "lazy" : "eager"}" data-i="${i}">`)
    .join("");

  // Specs
  let specs = "";
  if (p.tipo === "terreno") {
    specs = specItem(p.terreno + " m²", "Terreno");
  } else {
    specs =
      specItem(p.recamaras, "Recámaras") +
      specItem(p.banos, "Baños") +
      specItem(p.estacionamientos, "Estacion.") +
      specItem(p.construccion + " m²", "Construcción") +
      (p.terreno ? specItem(p.terreno + " m²", "Terreno") : "");
  }

  const mensaje = `Hola, me interesa la propiedad: ${p.titulo} (${precioTxt}). ¿Podrían darme más información?`;
  const wa = waLink(ag.tel, mensaje);
  const waGeneral = waLink("522281234500", mensaje);

  document.getElementById("detail-main").innerHTML = `
    <div class="detail__head">
      <span class="badge badge--${p.estatus}" style="position:static; display:inline-block; margin-bottom:10px">${ESTATUS_LABEL[p.estatus]}</span>
      <span class="card__type" style="position:static; display:inline-block; margin-left:6px">${TIPO_LABEL[p.tipo]}</span>
      <h1>${p.titulo}</h1>
      <p class="card__loc" style="font-size:1rem">${ICONS.pin} ${p.colonia}, ${p.ciudad}, Veracruz</p>
      <div class="detail__price">${precioTxt}</div>
    </div>
    <div class="specbar">${specs}</div>
    <div class="detail__desc">
      <h3>Descripción</h3>
      <p>${p.descripcion}</p>
    </div>
    <div class="detail__desc">
      <h3>Ubicación</h3>
      <iframe class="detail-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=${encodeURIComponent(p.colonia + ", " + p.ciudad + ", Veracruz")}&output=embed"></iframe>
    </div>`;

  document.getElementById("sidebar").innerHTML = `
    <div class="sidebar-card">
      <div class="agent">
        <img src="${ag.foto}" alt="${ag.nombre}">
        <div>
          <b>${ag.nombre}</b>
          <span>${ag.cargo}</span>
        </div>
      </div>
      <a href="${wa}" class="btn btn--wa btn--block btn--lg">Contactar por WhatsApp</a>
      <a href="tel:+${ag.tel}" class="btn btn--ghost btn--block">Llamar al asesor</a>
      <hr style="border:0; border-top:1px solid var(--line); margin:18px 0">
      <h3 style="font-family:var(--font-body); font-size:1rem; margin-bottom:12px">Solicitar información</h3>
      <form id="lead-form">
        <div class="field" style="margin-bottom:10px"><input type="text" placeholder="Tu nombre" required></div>
        <div class="field" style="margin-bottom:10px"><input type="tel" placeholder="Teléfono" required></div>
        <button class="btn btn--primary btn--block" type="submit">Enviar solicitud</button>
        <div class="form-note" id="form-note">¡Gracias! Un asesor te contactará pronto. (Demo: no se envía información real.)</div>
      </form>
    </div>`;

  // Form simulado
  const form = document.getElementById("lead-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-note").classList.add("show");
    form.querySelectorAll("input").forEach((i) => (i.value = ""));
  });

  // Lightbox
  document.getElementById("gallery").addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (img) openLightbox(Number(img.dataset.i));
  });

  // Relacionadas
  const rel = PROPIEDADES.filter((x) => x.tipo === p.tipo && x.id !== p.id).slice(0, 3);
  const relWrap = document.getElementById("relacionadas");
  if (rel.length) {
    relWrap.innerHTML = rel.map(cardHTML).join("");
    relWrap.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  } else {
    relWrap.closest("section").style.display = "none";
  }
}

/* ---- Lightbox ---- */
function openLightbox(i) {
  lbIndex = i;
  const lb = document.getElementById("lightbox");
  lb.classList.add("open");
  updateLightbox();
}
function updateLightbox() {
  document.getElementById("lb-img").src = galeriaActual[lbIndex];
  document.getElementById("lb-count").textContent = `${lbIndex + 1} / ${galeriaActual.length}`;
}
function moveLightbox(d) {
  lbIndex = (lbIndex + d + galeriaActual.length) % galeriaActual.length;
  updateLightbox();
}
function initLightbox() {
  document.getElementById("lb-close").addEventListener("click", () =>
    document.getElementById("lightbox").classList.remove("open")
  );
  document.getElementById("lb-prev").addEventListener("click", () => moveLightbox(-1));
  document.getElementById("lb-next").addEventListener("click", () => moveLightbox(1));
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") e.currentTarget.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("open")) return;
    if (e.key === "Escape") document.getElementById("lightbox").classList.remove("open");
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDetalle();
  initLightbox();
});
