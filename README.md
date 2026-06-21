# AVA Bienes Raíces — Demo

Sitio estático (HTML/CSS/JS vainilla) para la inmobiliaria **AVA Bienes Raíces** (Xalapa, Veracruz).
Pensado para publicarse en **Cloudflare Pages** sin paso de build.

## Estructura
- `index.html` — home con hero scrollytelling (GSAP), categorías, destacadas, créditos, equipo y contacto.
- `propiedades.html` — listado con filtros y "cargar más".
- `propiedad.html?id=X` — detalle de propiedad con galería + lightbox.
- `vendedor.html?v=slug` — perfil tipo vCard por asesor.
- `_redirects` — rutas limpias por vendedor (`/raul`, `/carmen`, …).
- `css/`, `js/`, `img/` — estilos, lógica y assets.

## Desarrollo local
```bash
python -m http.server 8080
```
Abrir http://localhost:8080

## Publicar en Cloudflare Pages
1. Conectar este repositorio de GitHub en Cloudflare Pages.
2. Framework preset: **None**. Build command: *(vacío)*. Output directory: `/`.
3. Deploy.

> Datos, fotos y contactos son ilustrativos para la demo.
