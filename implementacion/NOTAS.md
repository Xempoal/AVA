# Implementación — Cambios solicitados (iteración 2)

Resumen de lo que se agregó a la demo de AVA Bienes Raíces y dónde quedó cada cosa.

## 1. Categorías de inmuebles
- Nueva sección en `index.html` ("¿Qué estás buscando?") con tarjetas para
  **Casas, Departamentos, Terrenos y Locales comerciales**.
- Cada tarjeta muestra una foto, el nombre y el número de propiedades de ese tipo,
  y al dar clic lleva al listado filtrado: `propiedades.html?tipo=casa`, etc.
- Datos en `js/data.js` → `CATEGORIAS`. Render en `js/main.js` → `renderCategorias()`.

## 2. Créditos (financiamiento)
- Nueva sección "Créditos que manejamos": **Infonavit, Fovissste, Crédito bancario
  y Cofinavit**, cada uno con descripción + botón "Quiero asesoría de crédito" (WhatsApp).
- Datos en `js/data.js` → `CREDITOS`. Render en `js/main.js` → `renderCreditos()`.
- Edita los textos ahí si el cliente maneja otros esquemas.

## 3. Contacto rediseñado (moderno y simple)
- Se reemplazó la banda vieja por una sección de 2 columnas:
  - Izquierda: accesos directos (WhatsApp destacado, llamada, correo).
  - Derecha: formulario corto (nombre, teléfono, qué busca) con confirmación
    visual simulada (no envía datos a ningún servidor).
- Todo en `index.html` (`#contacto`) + estilos `.contact-*` en `css/styles.css`.

## 4. Equipo + perfiles tipo vCard por vendedor (rutas /raul, /carmen…)
- Sección "Conoce a tus asesores" en `index.html` (`#equipo-sec`) con tarjeta por vendedor.
- Cada vendedor tiene su **página vCard**: foto, cargo, bio, contacto directo
  (WhatsApp, teléfono, correo, redes) y **sus propiedades activas**.
- Plantilla: `vendedor.html` + `js/vendedor.js`. Datos en `AGENTES` (`js/data.js`),
  cada uno con su `slug`.

### Rutas limpias tipo `avabienesraices.com/raul`
- En esta demo estática se logran con el archivo **`_redirects`** (Cloudflare Pages),
  que reescribe `/raul` → `/vendedor.html?v=raul` (status 200, sin cambiar la URL).
- Vendedores de ejemplo ya listos: `/raul`, `/carmen`, `/ana`, `/carlos`, `/sofia`.
- **En el WordPress real** esto se hace con páginas/usuarios de agente del tema
  (Houzez ya trae perfiles de agente con su propia URL), así que el concepto es
  exactamente trasladable.

## Responsive
- Prioridad móvil: categorías pasan a 2 columnas y luego a tarjetas cuadradas,
  créditos y equipo a 1 columna, contacto y vCard se apilan, y la vCard deja de
  ser "sticky" en móvil. Revisado en breakpoints 1000px y 760px.

## Cómo probar localmente
```
python -m http.server 8080
```
Abre `http://localhost:8080` y prueba también `http://localhost:8080/vendedor.html?v=raul`.
(Las rutas `/raul` solo funcionan ya publicado en Cloudflare Pages, por el `_redirects`.)

## Pendiente al pasar a producción
- Reemplazar teléfonos/correos ficticios de `AGENTES` y del footer.
- Sustituir fotos de Unsplash por fotos reales de los asesores y de los inmuebles.
