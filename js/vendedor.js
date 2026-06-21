/* ===========================================================
   AVA — vCard individual del vendedor (vendedor.html?v=slug)
   Estilo tarjeta tipo "perfil/negocio", muestra las casas que
   maneja como tarjetas que enlazan a la publicación.
   Ruta limpia en producción: avabienesraices.com/raul (ver _redirects)
   =========================================================== */

const EXP = { raul: 8, carmen: 6, ana: 12, carlos: 9, sofia: 7 };

const VICONS = {
  call: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  wa: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12Z"/><path d="M9 9c0 4 2 6 6 6"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>',
};

function vcfDataUri(a, telPretty) {
  const vcf = [
    "BEGIN:VCARD", "VERSION:3.0",
    `FN:${a.nombre}`,
    `ORG:AVA Bienes Raíces`,
    `TITLE:${a.cargo}`,
    `TEL;TYPE=CELL:+${a.tel}`,
    `EMAIL:${a.email}`,
    `URL:https://avabienesraices.com/${a.slug}`,
    "END:VCARD",
  ].join("\n");
  return "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
}

function vcPropCard(p) {
  const esRenta = p.estatus === "renta";
  const precio = esRenta ? `${fmtMXN(p.precio)} <span style="font-size:.7rem;color:var(--muted)">/mes</span>` : fmtMXN(p.precio);
  return `
  <a class="vc-prop" href="propiedad.html?id=${p.id}">
    <div class="vc-prop__img">
      <img src="${p.fotos[0]}" alt="${p.titulo}" loading="lazy">
      <span class="badge badge--${p.estatus}">${ESTATUS_LABEL[p.estatus]}</span>
    </div>
    <div class="vc-prop__info">
      <div class="vc-prop__price">${precio}</div>
      <div class="vc-prop__title">${p.titulo}</div>
      <div class="vc-prop__loc">${p.colonia}, ${p.ciudad}</div>
    </div>
    <span class="vc-prop__arrow">&rarr;</span>
  </a>`;
}

function renderVendedor() {
  const slug = new URLSearchParams(location.search).get("v") || "raul";
  const a = AGENTES[slug] || AGENTES.raul;
  const props = propsDeAgente(a.slug);
  const exp = EXP[a.slug] || 6;

  document.title = `${a.nombre} — Asesor AVA Bienes Raíces`;

  const msg = `Hola ${a.nombre.split(" ")[0]}, vi tu perfil en AVA Bienes Raíces y me gustaría más información.`;
  const wa = waLink(a.tel, msg);
  const telPretty = a.tel.replace(/^52/, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

  const propsHTML = props.length
    ? props.map(vcPropCard).join("")
    : `<p style="color:var(--muted);font-size:.9rem">Sin propiedades activas por el momento.</p>`;

  document.getElementById("vc-root").innerHTML = `
  <article class="vc">
    <div class="vc__topbar">
      <img src="img/logo-color.png" alt="AVA Bienes Raíces">
      <a href="tel:+${a.tel}">Llamar</a>
    </div>

    <div class="vc__hero">
      <span class="vc__badge-live">Disponible</span>
      <img src="${a.foto}" alt="${a.nombre}">
      <div class="vc__hero-info">
        <p class="vc__eyebrow">${a.cargo}</p>
        <h1>${a.nombre}</h1>
      </div>
    </div>

    <div class="vc__body">
      <p class="vc__intro">${a.bio}</p>

      <div class="vc__cta">
        <a class="btn btn--blue btn--lg" href="tel:+${a.tel}">Llamar ahora</a>
        <a class="btn btn--wa btn--lg" href="${wa}">WhatsApp</a>
      </div>

      <div class="vc__trust">
        <div><b>${exp}+</b>años de exp.</div>
        <div><b>${props.length}</b>en venta</div>
        <div><b>✓</b>Verificado</div>
        <div><b>★</b>4.9 / 5</div>
      </div>

      <div class="vc__quick">
        <a href="tel:+${a.tel}"><span class="vc__ico vc__ico--call">${VICONS.call}</span>Llamar</a>
        <a href="${wa}"><span class="vc__ico vc__ico--wa">${VICONS.wa}</span>WhatsApp</a>
        <a href="mailto:${a.email}"><span class="vc__ico vc__ico--mail">${VICONS.mail}</span>Correo</a>
        <a href="${vcfDataUri(a, telPretty)}" download="${a.slug}-AVA.vcf"><span class="vc__ico vc__ico--save">${VICONS.save}</span>Guardar</a>
      </div>

      <div class="vc__stats">
        <div><b>${exp}+</b><span>años de oficio</span></div>
        <div><b>${props.length}</b><span>propiedades</span></div>
        <div><b>4.9★</b><span>calificación</span></div>
      </div>

      <p class="vc__section-label">Sobre mí</p>
      <h3 class="vc__h3">Asesoría honesta, de principio a fin.</h3>
      <div class="vc__about"><p>${a.bio} Con gusto te acompaño en cada paso: visitas, trámites de crédito y firma de escrituras.</p></div>

      <p class="vc__section-label">En venta</p>
      <h3 class="vc__h3">Propiedades que manejo (${props.length})</h3>
      <div class="vc__props">${propsHTML}</div>

      <div class="vc__footer">
        <a href="index.html">AVA Bienes Raíces</a> · Xalapa, Veracruz<br>
        <a href="propiedades.html">Ver todas las propiedades</a>
      </div>
    </div>
  </article>`;
}

document.addEventListener("DOMContentLoaded", renderVendedor);
