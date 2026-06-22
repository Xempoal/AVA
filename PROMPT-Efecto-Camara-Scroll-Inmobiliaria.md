# Prompt para Claude Code — Efecto de cámara guiada por scroll (Demo Inmobiliaria)

Copia y pega **todo el bloque de abajo** en Claude Code, dentro del proyecto de tu sitio
de inmobiliaria. Ya incluye la explicación técnica completa del efecto, así que no tiene
que adivinar nada. Es un demo: construye la casa en 3D por código (no necesitas modelos
ni archivos externos).

---

```
Quiero agregar a mi sitio web de inmobiliaria un efecto de "cámara guiada por scroll":
un recorrido cinematográfico en 3D donde, conforme el usuario hace scroll, la cámara
viaja y va cambiando de ángulo, llevándolo de una habitación a otra de una casa.
Es un DEMO, así que construye TODO por código (no tengo modelos 3D ni archivos):
inventa una casa moderna en 3D y el recorrido.

== Stack ==
- Usa Three.js (puedes importarlo por CDN/importmap con three@0.160+ y OrbitControls
  NO necesario). Renderer WebGL normal (no WebGPU, para máxima compatibilidad).
- Una sola página HTML autocontenida para empezar (luego lo integramos).

== La casa (constrúyela por código) ==
- Una casa moderna de una planta vista en corte/dollhouse: piso, muros, y varias
  habitaciones separadas por paredes. Mínimo: entrada, sala, cocina, recámara y jardín/terraza.
- Usa BoxGeometry/PlaneGeometry para muros, pisos y muebles simples (sofá, cama, mesa,
  isla de cocina) hechos con cajas. Materiales MeshStandardMaterial en tonos cálidos/elegantes.
- Iluminación: una luz direccional (sol) + luz ambiental + alguna luz cálida interior.
  Activa sombras suaves. Cielo o fondo en degradado suave.
- Que se vea limpio y arquitectónico, tipo render inmobiliario.

== El efecto de cámara guiada por scroll (esto es lo clave) ==
Funciona así, replica esta técnica:
1. Define un arreglo de KEYFRAMES. Cada keyframe tiene: el progreso de scroll (0 a 1),
   la posición de la cámara (x,y,z) y el punto al que MIRA (lookAt x,y,z). Ejemplo:
     cameraPath = [
       { scroll: 0.00, pos:[x,y,z], look:[x,y,z] }, // vista exterior / fachada
       { scroll: 0.25, pos:[...],   look:[...] },    // entra a la sala
       { scroll: 0.50, pos:[...],   look:[...] },    // cocina
       { scroll: 0.75, pos:[...],   look:[...] },    // recámara
       { scroll: 1.00, pos:[...],   look:[...] },    // jardín/terraza
     ]
2. Al hacer scroll, calcula el progreso = scrollTop / (scrollHeight - innerHeight),
   un número de 0 a 1.
3. Encuentra entre qué dos keyframes cae ese progreso e INTERPOLA (lerp) tanto la
   posición como el lookAt. Aplica un easing suave (smoothstep: t*t*(3-2*t)).
4. SUAVIZA el valor de scroll en el loop de animación para que el movimiento se sienta
   fluido y con inercia: currentT += (targetT - currentT) * min(1, dt*6).
5. En cada frame: camera.position.set(posInterpolada); camera.lookAt(lookInterpolado).

== Contenido / UI encima del 3D ==
- El canvas va fijo de fondo (position:fixed, z-index 0). Encima, secciones HTML normales
  (position relative, z-index 1) que ocupan cada una ~100vh y hacen que la página tenga
  scroll. Cada sección coincide con un keyframe y lleva texto: nombre de la habitación,
  m², y una descripción corta (inventa datos de demo de una casa en venta).
- Sincroniza: el scroll de esas secciones es lo que mueve la cámara. Idealmente calcula
  el "scroll" de cada keyframe a partir de la posición real (offsetTop) de cada sección.
- Agrega una barra de progreso arriba y animaciones de aparición (fade-up) del texto
  al entrar cada sección (IntersectionObserver).
- Que sea responsivo y funcione en móvil (en móvil puedes simplificar sombras/calidad).

== Extra ==
- Suaviza también con prefers-reduced-motion (si está activo, transiciones más directas).
- Coméntame en el código dónde edito los KEYFRAMES y los textos para ajustar el recorrido.

Hazlo en un archivo index-demo-3d.html para no tocar mi sitio actual. Cuando termines,
dime cómo abrirlo y cómo cambiar las posiciones de cámara de cada habitación.
```

---

## Notas para ti (Emmanuel)

- **Dáselo tal cual.** No necesitas explicar nada más; el prompt ya trae la técnica completa.
- **Ajustar el recorrido** después es solo mover números en el arreglo `cameraPath`: la
  cámara "vuela" por donde tú le indiques. Pídele que te explique cómo afinar esos puntos.
- El demo con casa hecha por código se verá **estilizado/arquitectónico** (cajas elegantes),
  no fotorrealista. Sirve perfecto para mostrar **el efecto y la idea**.
- Cuando consigas un **modelo 3D real** (.glb/.gltf) o un **tour 360/Matterport**, se
  reemplaza la "casa inventada" por el modelo real y **el efecto de cámara queda idéntico**.

> Este efecto es el mismo que usamos en el sitio nuevo de Uriarte Salón (versión 3D),
> solo que ahí la escena es un campo de cabello y aquí sería el interior de una casa.
