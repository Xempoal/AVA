/* ===========================================================
   AVA — Listado de propiedades con filtros + "cargar más"
   =========================================================== */

const PAGE_SIZE = 6;
let visibles = PAGE_SIZE;

function leerFiltros() {
  const f = document.getElementById("filters");
  return {
    tipo: f.elements.tipo.value,
    ciudad: f.elements.ciudad.value,
    estatus: f.elements.estatus.value,
    precio: f.elements.precio.value ? Number(f.elements.precio.value) : null,
    recamaras: f.elements.recamaras.value ? Number(f.elements.recamaras.value) : null,
  };
}

function aplicarFiltros(p, f) {
  if (f.tipo && p.tipo !== f.tipo) return false;
  if (f.ciudad && p.ciudad !== f.ciudad) return false;
  if (f.estatus && p.estatus !== f.estatus) return false;
  if (f.precio && p.precio > f.precio) return false;
  if (f.recamaras && p.recamaras < f.recamaras) return false;
  return true;
}

function render() {
  const f = leerFiltros();
  const filtradas = PROPIEDADES.filter((p) => aplicarFiltros(p, f));
  const grid = document.getElementById("listado");
  const count = document.getElementById("count");
  const loadWrap = document.getElementById("loadmore-wrap");

  count.textContent = `${filtradas.length} propiedad${filtradas.length === 1 ? "" : "es"} encontrada${filtradas.length === 1 ? "" : "s"}`;

  if (filtradas.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>Sin resultados</h3><p>Prueba ajustando los filtros de búsqueda.</p></div>`;
    loadWrap.style.display = "none";
    return;
  }

  const mostrar = filtradas.slice(0, visibles);
  grid.innerHTML = mostrar.map(cardHTML).join("");
  loadWrap.style.display = visibles < filtradas.length ? "block" : "none";

  // re-activar reveal en nuevas tarjetas
  grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

function initListado() {
  const f = document.getElementById("filters");
  if (!f) return;

  // Prellenar desde query (?tipo=&ciudad=&precio=)
  const params = new URLSearchParams(location.search);
  ["tipo", "ciudad", "precio", "estatus", "recamaras"].forEach((k) => {
    if (params.get(k) && f.elements[k]) f.elements[k].value = params.get(k);
  });

  f.addEventListener("change", () => { visibles = PAGE_SIZE; render(); });
  f.addEventListener("submit", (e) => e.preventDefault());

  document.getElementById("reset-filtros").addEventListener("click", () => {
    f.reset();
    visibles = PAGE_SIZE;
    render();
  });

  document.getElementById("loadmore").addEventListener("click", () => {
    visibles += PAGE_SIZE;
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", initListado);
