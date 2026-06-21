/* ===========================================================
   AVA Bienes Raíces — "Base de datos" estática (demo)
   Estructura inspirada en el modelo de datos de Houzez.
   =========================================================== */

const IMG = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ===========================================================
   Vendedores / ejecutivos (ficticios)
   Cada uno tiene un "slug" que será su ruta propia: /raul, /carmen…
   Estructura tipo vCard: foto, contacto, bio, redes.
   =========================================================== */
const AGENTES = {
  raul: {
    slug: "raul",
    nombre: "Raúl Domínguez",
    cargo: "Asesor inmobiliario · Casas",
    tel: "522281234501",
    email: "raul@avabienesraices.com",
    foto: IMG("1560250097-0b93528c311a", 500),
    bio: "Especialista en vivienda residencial en Xalapa y Coatepec. Más de 8 años acompañando a familias a estrenar su primer hogar con crédito Infonavit y bancario.",
    instagram: "raul.ava",
    facebook: "raul.ava.bienesraices",
  },
  carmen: {
    slug: "carmen",
    nombre: "Carmen Ríos",
    cargo: "Asesora inmobiliaria · Departamentos",
    tel: "522281234502",
    email: "carmen@avabienesraices.com",
    foto: IMG("1573496359142-b8d87734a5a2", 500),
    bio: "Experta en departamentos y desarrollos verticales. Te ayuda a encontrar la mejor opción de inversión o tu primer espacio en la zona universitaria y Las Ánimas.",
    instagram: "carmen.ava",
    facebook: "carmen.ava.bienesraices",
  },
  ana: {
    slug: "ana",
    nombre: "Ana Valdés",
    cargo: "Asesora inmobiliaria senior",
    tel: "522281234503",
    email: "ana@avabienesraices.com",
    foto: IMG("1580489944761-15a19d654956", 500),
    bio: "Líder del equipo AVA. Especializada en residencias de alto valor y propiedades campestres en la región cafetalera de Coatepec.",
    instagram: "ana.ava",
    facebook: "ana.ava.bienesraices",
  },
  carlos: {
    slug: "carlos",
    nombre: "Carlos Mendoza",
    cargo: "Asesor inmobiliario · Comercial",
    tel: "522281234504",
    email: "carlos@avabienesraices.com",
    foto: IMG("1519085360753-af0119f7cbe7", 500),
    bio: "Enfocado en locales y propiedades comerciales. Conoce a fondo el potencial de inversión y plusvalía de cada zona de Xalapa.",
    instagram: "carlos.ava",
    facebook: "carlos.ava.bienesraices",
  },
  sofia: {
    slug: "sofia",
    nombre: "Sofía Herrera",
    cargo: "Especialista en terrenos",
    tel: "522281234505",
    email: "sofia@avabienesraices.com",
    foto: IMG("1438761681033-6461ffad8d80", 500),
    bio: "Asesora especializada en terrenos urbanos y campestres. Te orienta sobre uso de suelo, escrituración y oportunidades de inversión a futuro.",
    instagram: "sofia.ava",
    facebook: "sofia.ava.bienesraices",
  },
};

/* Imágenes reutilizables por categoría */
const FACHADAS = ["1568605114967-8130f3a36994","1570129477492-45c003edd2be","1605276374104-dee2a0ed3cd6","1564013799919-ab600027ffc6","1512917774080-9991f1c4c750","1600596542815-ffad4c1539a9","1600585154340-be6161a56a0c","1583608205776-bfd35f0d9f83"];
const SALAS = ["1586023492125-27b2c045efd7","1522708323590-d24dbb6b0267","1493809842364-78817add7ffb","1556909114-f6e7ad7d3136"];
const COCINAS = ["1556912173-3bb406ef7e77","1565182999561-18d7dc61c393"];
const RECAMARAS = ["1616594039964-ae9021a400a0","1505693416388-ac5ce068fe85","1631049307264-da0ec9d70304"];
const TERRENOS = ["1500382017468-9049fed747ef","1416879595882-3373a0480b5b","1441974231531-c6227db76b6e"];
const LOCALES = ["1441986300917-64674bd600d8","1582268611958-ebfd161ef9cf","1604328698692-f76ea9498e76"];

function galeria(base) {
  return [...base, SALAS[0], COCINAS[0], RECAMARAS[0]].map((id) => IMG(id));
}
function galeriaTerreno(base) {
  return base.map((id) => IMG(id));
}

/* === Propiedades === */
const PROPIEDADES = [
  {
    id: 1,
    titulo: "Casa en Coatepec con vista al volcán, 3 recámaras",
    tipo: "casa",
    estatus: "venta",
    precio: 4250000,
    ciudad: "Coatepec",
    colonia: "Briones",
    construccion: 220,
    terreno: 310,
    recamaras: 3,
    banos: 3,
    estacionamientos: 2,
    agente: "raul",
    descripcion:
      "Residencia de un nivel con acabados de lujo y amplios ventanales que enmarcan la vista al Cofre de Perote. Jardín privado, cocina integral y estudio.",
    fotos: galeria([FACHADAS[0], FACHADAS[2]]),
  },
  {
    id: 2,
    titulo: "Departamento moderno en zona Ánimas, Xalapa",
    tipo: "departamento",
    estatus: "venta",
    precio: 2350000,
    ciudad: "Xalapa",
    colonia: "Las Ánimas",
    construccion: 95,
    terreno: 0,
    recamaras: 2,
    banos: 2,
    estacionamientos: 1,
    agente: "carmen",
    descripcion:
      "Departamento en piso alto con excelente iluminación natural, dentro de desarrollo con seguridad 24/7, gimnasio y roof garden. A pasos de plazas comerciales.",
    fotos: galeria([SALAS[1], FACHADAS[5]]),
  },
  {
    id: 3,
    titulo: "Terreno campestre en Jilotepec, 800 m²",
    tipo: "terreno",
    estatus: "venta",
    precio: 980000,
    ciudad: "Jilotepec",
    colonia: "El Paraíso",
    construccion: 0,
    terreno: 800,
    recamaras: 0,
    banos: 0,
    estacionamientos: 0,
    agente: "sofia",
    descripcion:
      "Terreno plano con servicios a pie de lote, ideal para construir tu casa de campo. Entorno arbolado y clima templado, a 15 minutos de Xalapa.",
    fotos: galeriaTerreno([TERRENOS[0], TERRENOS[1], TERRENOS[2]]),
  },
  {
    id: 4,
    titulo: "Casa nueva en fraccionamiento privado, Banderilla",
    tipo: "casa",
    estatus: "venta",
    precio: 2890000,
    ciudad: "Banderilla",
    colonia: "Residencial del Bosque",
    construccion: 165,
    terreno: 200,
    recamaras: 3,
    banos: 2,
    estacionamientos: 2,
    agente: "raul",
    descripcion:
      "Casa de dos niveles lista para entrega inmediata, con sala de TV, patio de servicio y opción de crédito bancario. Fraccionamiento con caseta de vigilancia.",
    fotos: galeria([FACHADAS[1], FACHADAS[6]]),
  },
  {
    id: 5,
    titulo: "Local comercial sobre Av. Lázaro Cárdenas, Xalapa",
    tipo: "local",
    estatus: "venta",
    precio: 4600000,
    ciudad: "Xalapa",
    colonia: "Centro",
    construccion: 140,
    terreno: 140,
    recamaras: 0,
    banos: 2,
    estacionamientos: 3,
    agente: "carlos",
    descripcion:
      "Local en esquina con gran afluencia vehicular y peatonal, ideal para franquicia, banco o restaurante. Doble frente y estacionamiento propio.",
    fotos: [IMG(LOCALES[0]), IMG(LOCALES[1]), IMG(LOCALES[2]), IMG(SALAS[2])],
  },
  {
    id: 6,
    titulo: "Departamento en renta amueblado, Xalapa centro",
    tipo: "departamento",
    estatus: "renta",
    precio: 14500,
    ciudad: "Xalapa",
    colonia: "Centro Histórico",
    construccion: 70,
    terreno: 0,
    recamaras: 1,
    banos: 1,
    estacionamientos: 1,
    agente: "carmen",
    descripcion:
      "Acogedor departamento totalmente amueblado y equipado, a una cuadra del Parque Juárez. Incluye internet y mantenimiento. Ideal para profesionistas.",
    fotos: galeria([SALAS[2], FACHADAS[7]]),
  },
  {
    id: 7,
    titulo: "Residencia de lujo con alberca, Las Ánimas",
    tipo: "casa",
    estatus: "venta",
    precio: 6300000,
    ciudad: "Xalapa",
    colonia: "Las Ánimas",
    construccion: 380,
    terreno: 450,
    recamaras: 4,
    banos: 4,
    estacionamientos: 3,
    agente: "ana",
    descripcion:
      "Imponente residencia con alberca climatizada, jardín diseñado por paisajista, cocina de chef y suite principal con vestidor y terraza privada.",
    fotos: galeria([FACHADAS[3], FACHADAS[4]]),
  },
  {
    id: 8,
    titulo: "Casa familiar en Coatepec, ideal para crédito",
    tipo: "casa",
    estatus: "venta",
    precio: 1850000,
    ciudad: "Coatepec",
    colonia: "El Mirador",
    construccion: 120,
    terreno: 150,
    recamaras: 3,
    banos: 2,
    estacionamientos: 1,
    agente: "raul",
    descripcion:
      "Excelente opción de primera vivienda, escrituras en regla y acepta Infonavit/Fovissste. Patio trasero y zona tranquila cerca de escuelas.",
    fotos: galeria([FACHADAS[6], SALAS[3]]),
  },
  {
    id: 9,
    titulo: "Terreno urbano con uso de suelo mixto, Xalapa",
    tipo: "terreno",
    estatus: "venta",
    precio: 1750000,
    ciudad: "Xalapa",
    colonia: "Sumidero",
    construccion: 0,
    terreno: 420,
    recamaras: 0,
    banos: 0,
    estacionamientos: 0,
    agente: "sofia",
    descripcion:
      "Terreno con todos los servicios y uso de suelo mixto, apto para vivienda o comercio. Excelente plusvalía en zona en pleno crecimiento.",
    fotos: galeriaTerreno([TERRENOS[1], TERRENOS[2], TERRENOS[0]]),
  },
  {
    id: 10,
    titulo: "Departamento con roof garden, Banderilla",
    tipo: "departamento",
    estatus: "venta",
    precio: 1690000,
    ciudad: "Banderilla",
    colonia: "Bosques de Banderilla",
    construccion: 82,
    terreno: 0,
    recamaras: 2,
    banos: 1,
    estacionamientos: 1,
    agente: "carmen",
    descripcion:
      "Departamento de entrega inmediata con acceso a roof garden común y áreas verdes. Plan de financiamiento disponible con enganche accesible.",
    fotos: galeria([SALAS[0], FACHADAS[5]]),
  },
  {
    id: 11,
    titulo: "Local comercial en plaza, zona universitaria",
    tipo: "local",
    estatus: "renta",
    precio: 28000,
    ciudad: "Xalapa",
    colonia: "Zona UV",
    construccion: 90,
    terreno: 90,
    recamaras: 0,
    banos: 1,
    estacionamientos: 2,
    agente: "carlos",
    descripcion:
      "Local en planta baja dentro de plaza consolidada, alto flujo de estudiantes. Ideal para cafetería, papelería o servicios. Renta con contrato flexible.",
    fotos: [IMG(LOCALES[2]), IMG(LOCALES[0]), IMG(LOCALES[1]), IMG(COCINAS[1])],
  },
  {
    id: 12,
    titulo: "Casa de campo en Coatepec con huerto, 5,000 m²",
    tipo: "casa",
    estatus: "venta",
    precio: 5400000,
    ciudad: "Coatepec",
    colonia: "Tuzamapan",
    construccion: 240,
    terreno: 5000,
    recamaras: 4,
    banos: 3,
    estacionamientos: 4,
    agente: "sofia",
    descripcion:
      "Finca cafetalera con casa principal de estilo rústico-moderno, huerto productivo, palapa y arroyo. El refugio perfecto rodeado de naturaleza.",
    fotos: galeria([FACHADAS[2], FACHADAS[0]]),
  },
];

/* Helpers globales */
const fmtMXN = (n) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

const TIPO_LABEL = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  local: "Local comercial",
};

const ESTATUS_LABEL = { venta: "En venta", renta: "En renta" };

function waLink(tel, mensaje) {
  return `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`;
}

/* Propiedades asignadas a un vendedor (por slug) */
function propsDeAgente(slug) {
  return PROPIEDADES.filter((p) => p.agente === slug);
}

/* Conteo de propiedades por tipo (para las categorías) */
function conteoTipo(tipo) {
  return PROPIEDADES.filter((p) => p.tipo === tipo).length;
}

/* Categorías de inmuebles (con imagen representativa) */
const CATEGORIAS = [
  { tipo: "casa", label: "Casas", img: IMG(FACHADAS[3]) },
  { tipo: "departamento", label: "Departamentos", img: IMG(SALAS[1]) },
  { tipo: "terreno", label: "Terrenos", img: IMG(TERRENOS[0]) },
  { tipo: "local", label: "Locales comerciales", img: IMG(LOCALES[0]) },
];

/* Tipos de crédito que maneja la inmobiliaria */
const CREDITOS = [
  { nombre: "Infonavit", desc: "Usa tu crédito Infonavit para adquirir tu vivienda. Te ayudamos con todo el trámite y precalificación." },
  { nombre: "Fovissste", desc: "Si trabajas en el sector público, aprovecha tu crédito Fovissste con asesoría completa de inicio a fin." },
  { nombre: "Crédito bancario", desc: "Trabajamos con los principales bancos del país para conseguirte la mejor tasa hipotecaria." },
  { nombre: "Cofinavit", desc: "Combina tu Infonavit con un crédito bancario y amplía tu poder de compra para una mejor propiedad." },
];
