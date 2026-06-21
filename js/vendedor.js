/* ===========================================================
   AVA — Perfil de vendedor tipo vCard (vendedor.html?v=slug)
   En producción (WordPress / Cloudflare) la ruta limpia sería
   avabienesraices.com/raul  →  ver archivo _redirects
   =========================================================== */

function renderVendedor() {
  const slug = new URLSearchParams(location.search).get("v") || "raul";
  const a = AGENTES[slug] || AGENTES.raul;
  const props = propsDeAgente(a.slug);

  document.title = `${a.nombre} — Asesor AVA Bienes Raíces`;

  const msg = `Hola ${a.nombre.split(" ")[0]}, vi tu perfil en AVA Bienes Raíces y me gustaría más información.`;
  const wa = waLink(a.tel, msg);
  const telPretty = a.tel.replace(/^52/, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

  document.getElementById("vcard").innerHTML = `
    <div class="vcard__cover"></div>
    <div class="vcard__body">
      <div class="vcard__photo"><img src="${a.foto}" alt="${a.nombre}"></div>
      <h1>${a.nombre}</h1>
      <p class="vcard__role">${a.cargo}</p>
      <p class="vcard__bio">${a.bio}</p>

      <div class="vcard__actions">
        <a href="${wa}" class="btn btn--wa btn--lg">Contactar por WhatsApp</a>
        <a href="tel:+${a.tel}" class="btn btn--ghost btn--lg">Llamar</a>
      </div>

      <div class="vcard__contacts">
        <a href="tel:+${a.tel}" class="vc-row"><span>Teléfono</span><b>${telPretty}</b></a>
        <a href="mailto:${a.email}" class="vc-row"><span>Correo</span><b>${a.email}</b></a>
        <a href="https://instagram.com/${a.instagram}" target="_blank" rel="noopener" class="vc-row"><span>Instagram</span><b>@${a.instagram}</b></a>
        <a href="https://facebook.com/${a.facebook}" target="_blank" rel="noopener" class="vc-row"><span>Facebook</span><b>/${a.facebook}</b></a>
      </div>

      <a href="${wa}" class="vcard__save">Guardar contacto / Agendar cita</a>
    </div>`;

  // Propiedades del vendedor
  const titulo = document.getElementById("vendor-props-title");
  const grid = document.getElementById("vendor-props");
  titulo.textContent = `Propiedades de ${a.nombre.split(" ")[0]} (${props.length})`;
  if (props.length) {
    grid.innerHTML = props.map(cardHTML).join("");
    grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  } else {
    grid.innerHTML = `<p class="empty" style="grid-column:1/-1">Sin propiedades activas por el momento.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", renderVendedor);
