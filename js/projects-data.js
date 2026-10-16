/* ============================================================
   projects-data.js — Base de datos de proyectos (ES / EN)
   La usan el CV (proyectos destacados + explorador del stack)
   y el portafolio. Para agregar un proyecto, copia un objeto.

   Campos:
     id        identificador único
     name      nombre del proyecto
     cat       "freelance" | "community" | "university" | "personal"
     sold      true si fue vendido a un cliente
     featured  true para mostrarlo en "Proyectos destacados" del CV
     client    { es, en }  quién lo encargó / para quién es
     desc      { es, en }  descripción corta
     tech      tecnologías (mismos nombres que data-skill en index.html)
     img       foto (ruta desde la raíz del sitio)
     video     video corto, opcional (usa img como portada)
     demo      sitio en vivo ("" si no hay)
     github    repo público ("" si es privado)
     build     "Cómo está hecho": filas [tipo, { es, en }]
               tipos: purpose | data | access | hosting | domain | libs
   Solo se escribe lo que está verificado en el código o el sitio.
   ============================================================ */

const PROJECTS = [

  /* ── FREELANCE (vendidos) ───────────────────────────── */
  {
    id: "los-skeepers",
    name: "Los Skeepers",
    cat: "freelance",
    sold: true,
    featured: true,
    client: { es: "Los Skeepers — banda", en: "Los Skeepers — band" },
    desc: {
      es: "Sitio oficial de la primera boy band de Guatemala: música, shows, merch, juegos con ranking mensual y un panel privado de administración con analíticas.",
      en: "Official website of Guatemala's first boy band: music, shows, merch, games with a monthly leaderboard and a private admin panel with analytics.",
    },
    tech: ["SQL", "PostgreSQL", "Recharts", "Excel", "Node.js", "Express", "React", "Vite", "JavaScript", "HTML5", "CSS3", "Docker", "Railway"],
    img: "img/proyectos/los-skeepers.jpg",
    video: "img/proyectos/los-skeepers.mp4",
    demo: "https://www.losskeepers.com/",
    github: "",
    build: [
      ["purpose", { es: "Interacción con los fans y recolección de datos: analíticas anónimas de visitas, puntajes de juegos, suscriptores y contenido editable sin tocar código.", en: "Fan interaction and data collection: anonymous visit analytics, game scores, subscribers and content editable without touching code." }],
      ["data",    { es: "PostgreSQL con 18 tablas: visitantes, eventos, ranking con validación anti-trampa, suscriptores, merch y fotos. Un proceso automático (cron) resume cada día los eventos crudos en totales diarios y purga el detalle de más de 90 días.", en: "PostgreSQL with 18 tables: visitors, events, leaderboard with anti-cheat validation, subscribers, merch and photos. An automatic job (cron) rolls raw events up into daily totals every day and purges detail older than 90 days." }],
      ["analytics", { es: "Dashboard con KPIs de visitas (activos, día, semana, mes), mapa de calor día × hora de 90 días, tiempo promedio por sección, elementos más clickeados, embudos de conversión (merch → carrito) y uso por dispositivo y navegador: 11 gráficas en Recharts sobre 35 consultas SQL con COUNT, AVG, GROUP BY y date_trunc. Reportes exportables a Excel.", en: "Dashboard with visit KPIs (active, day, week, month), a 90-day day × hour heatmap, average time per section, most-clicked elements, conversion funnels (merch → cart) and device/browser usage: 11 Recharts charts on top of 35 SQL queries with COUNT, AVG, GROUP BY and date_trunc. Reports exportable to Excel." }],
      ["access",  { es: "Panel de administración privado con login: contraseñas cifradas (bcrypt), sesiones guardadas en la base de datos y límite de intentos.", en: "Private admin panel with login: hashed passwords (bcrypt), sessions stored in the database and rate limiting." }],
      ["hosting", { es: "Contenedor Docker desplegado en Railway.", en: "Docker container deployed on Railway." }],
      ["domain",  { es: "Dominio propio: losskeepers.com", en: "Custom domain: losskeepers.com" }],
      ["libs",    { es: "Node.js + Express · React + Vite + Recharts (panel) · multer (subir fotos) · exceljs (exportar a Excel) · geoip-lite (país aproximado, sin guardar la IP) · node-cron.", en: "Node.js + Express · React + Vite + Recharts (panel) · multer (photo uploads) · exceljs (Excel export) · geoip-lite (approximate country, IP not stored) · node-cron." }],
    ],
  },
  {
    id: "fleetcontrol",
    name: "FleetControl",
    cat: "freelance",
    sold: true,
    featured: true,
    client: { es: "Llantas Ávila", en: "Llantas Ávila" },
    desc: {
      es: "Sistema web de gestión de flota entregado a Llantas Ávila. Resuelve un problema real: saber qué piloto manejaba cada camión el día de una multa. 9 pilotos registrados con foto, fecha e historial de mantenimiento por vehículo.",
      en: "Fleet management web system delivered to Llantas Ávila. It solves a real problem: knowing which driver had each truck on the day of a traffic fine. 9 registered drivers with photo, date and maintenance history per vehicle.",
    },
    tech: ["SQL", "PostgreSQL", "React", "Node.js", "Express", "Docker", "Railway", "Cloudflare R2"],
    img: "img/FleetControl.png",
    demo: "",
    github: "",
    build: [
      ["purpose", { es: "Control de flota: qué piloto tenía qué camión y cuándo, con evidencia fotográfica e historial de mantenimiento.", en: "Fleet control: which driver had which truck and when, with photo evidence and maintenance history." }],
      ["data",    { es: "Base de datos PostgreSQL con pilotos, vehículos, registros y mantenimientos. Las fotos se guardan en Cloudflare R2.", en: "PostgreSQL database with drivers, vehicles, logs and maintenance. Photos are stored on Cloudflare R2." }],
      ["access",  { es: "Login con usuario y contraseña para cada piloto; registro vinculado por código QR.", en: "Username and password login for each driver; QR-linked registration." }],
      ["hosting", { es: "En producción en Railway, empaquetado con Docker, con hosting anual activo.", en: "In production on Railway, packaged with Docker, with active yearly hosting." }],
      ["libs",    { es: "React (interfaz) · Node.js + Express (API).", en: "React (interface) · Node.js + Express (API)." }],
    ],
  },
  {
    id: "sunset-sessions",
    name: "The Sunset Sessions",
    cat: "freelance",
    sold: true,
    featured: true,
    client: { es: "Evento en Casa Tina, Guatemala", en: "Event at Casa Tina, Guatemala" },
    desc: {
      es: "Sitio del evento de música, arte y café: artistas por revelar, micrófono abierto, cuenta regresiva, marcas aliadas y venta de entradas.",
      en: "Website for a music, art and coffee event: artists to be revealed, open mic, countdown, partner brands and ticket sales.",
    },
    tech: ["React", "JavaScript", "HTML5", "CSS3", "GitHub Pages"],
    img: "img/proyectos/sunset-sessions.png",
    demo: "https://madco-py.github.io/The-Sunset-Sessions/",
    github: "https://github.com/MADCO-py/The-Sunset-Sessions",
    build: [
      ["purpose", { es: "Promocionar el evento y vender entradas.", en: "Promote the event and sell tickets." }],
      ["data",    { es: "Sin base de datos: el formulario arma la compra como mensaje de WhatsApp para confirmar el pago.", en: "No database: the form builds the purchase as a WhatsApp message to confirm payment." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "React + htm, sin paso de compilación: se edita y se publica directo.", en: "React + htm with no build step: edit and publish directly." }],
    ],
  },

  /* ── EMPRENDEDORES Y ARTISTAS ───────────────────────── */
  {
    id: "walter",
    name: "Walter Mazariegos",
    cat: "community",
    client: { es: "Músico y compositor", en: "Musician and composer" },
    desc: {
      es: "Portafolio digital para músico y compositor guatemalteco: galería, obras, contacto y presencia profesional en línea.",
      en: "Digital portfolio for a Guatemalan musician and composer: gallery, works, contact and a professional online presence.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/walter.jpg",
    video: "img/proyectos/walter.mp4",
    demo: "https://madco-py.github.io/WALTER_MUSIC/",
    github: "https://github.com/MADCO-py/WALTER_MUSIC",
    build: [
      ["purpose", { es: "Presencia profesional en línea para un artista.", en: "Professional online presence for an artist." }],
      ["data",    { es: "Sitio estático, sin base de datos.", en: "Static site, no database." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro · publicaciones de Instagram integradas.", en: "Plain HTML, CSS and JavaScript · embedded Instagram posts." }],
    ],
  },
  {
    id: "nalu",
    name: "Nalú Korean Food",
    cat: "community",
    client: { es: "Negocio de comida coreana", en: "Korean food business" },
    desc: {
      es: "Carta digital para un negocio de comida coreana: catálogo de productos con carrito, reseñas e identidad visual lista para compartir en redes.",
      en: "Digital menu for a Korean food business: product catalog with cart, reviews and a visual identity ready to share on social media.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/analu-ramen.jpg",
    video: "img/proyectos/analu-ramen.mp4",
    demo: "https://madco-py.github.io/Nalu-s-Korean-Food/",
    github: "https://github.com/MADCO-py/Nalu-s-Korean-Food",
    build: [
      ["purpose", { es: "Mostrar el menú y facilitar los pedidos.", en: "Show the menu and make ordering easier." }],
      ["data",    { es: "Productos y reseñas en archivos de datos de JavaScript, sin servidor.", en: "Products and reviews in JavaScript data files, no server." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro.", en: "Plain HTML, CSS and JavaScript." }],
    ],
  },
  {
    id: "march-jewelry",
    name: "March Jewelry",
    cat: "community",
    client: { es: "Negocio de joyería", en: "Jewelry business" },
    desc: {
      es: "Catálogo en línea de joyería: presentación de productos, identidad de marca, carrito y contacto directo con la clienta.",
      en: "Online jewelry catalog: product showcase, brand identity, shopping cart and direct contact with the customer.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/marce-joyas.jpg",
    video: "img/proyectos/marce-joyas.mp4",
    demo: "https://madco-py.github.io/MARCH_JEWELRY/index.html",
    github: "https://github.com/MADCO-py/MARCH_JEWELRY",
    build: [
      ["purpose", { es: "Vender joyería en línea con pedido directo.", en: "Sell jewelry online with direct ordering." }],
      ["data",    { es: "El carrito se guarda en el navegador (localStorage) y el pedido se envía por WhatsApp.", en: "The cart is saved in the browser (localStorage) and the order is sent through WhatsApp." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro.", en: "Plain HTML, CSS and JavaScript." }],
    ],
  },
  {
    id: "marce-juarez",
    name: "Marce Juárez",
    cat: "community",
    client: { es: "Artista", en: "Artist" },
    desc: {
      es: "Sitio de presentación personal: portafolio, servicios y punto de contacto, con su contenido de redes integrado.",
      en: "Personal presentation website: portfolio, services and point of contact, with her social media content embedded.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/marce.jpg",
    video: "img/proyectos/marce.mp4",
    demo: "https://madco-py.github.io/MARCE_JUAREZ/",
    github: "https://github.com/MADCO-py/MARCE_JUAREZ",
    build: [
      ["purpose", { es: "Presentación personal y contacto.", en: "Personal presentation and contact." }],
      ["data",    { es: "Sitio estático, sin base de datos.", en: "Static site, no database." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro · Instagram, TikTok, Spotify y YouTube integrados.", en: "Plain HTML, CSS and JavaScript · embedded Instagram, TikTok, Spotify and YouTube." }],
    ],
  },

  /* ── UNIVERSITARIO ──────────────────────────────────── */
  {
    id: "securegate",
    name: "SecureGate",
    cat: "university",
    client: { es: "Proyecto universitario", en: "University project" },
    desc: {
      es: "Sistema de control de accesos para garitas de residenciales y condominios: lee el DPI y la placa del vehículo con OCR, verifica si el residente está al día en sus pagos y deja registro de cada acceso. 5 participantes activos durante su implementación.",
      en: "Access control system for gatehouses in residential complexes: reads ID cards (DPI) and license plates with OCR, checks whether the resident's payments are up to date and logs every access. 5 active participants during implementation.",
    },
    tech: ["SQL", "PostgreSQL", "TypeScript", "React", "Node.js", "Express", "Docker"],
    img: "",
    demo: "",
    github: "",
    build: [
      ["purpose", { es: "Automatizar el registro de visitantes en la garita y eliminar errores manuales.", en: "Automate visitor registration at the gatehouse and remove manual errors." }],
      ["data",    { es: "PostgreSQL: residentes, visitantes, accesos, pagos y cargos por mora.", en: "PostgreSQL: residents, visitors, accesses, payments and late fees." }],
      ["access",  { es: "Login con tokens JWT, cabeceras de seguridad (helmet), validación de datos y límite de intentos.", en: "Login with JWT tokens, security headers (helmet), input validation and rate limiting." }],
      ["hosting", { es: "Docker Compose con Nginx.", en: "Docker Compose with Nginx." }],
      ["libs",    { es: "React · Node.js + Express · Google Cloud Vision API (lectura de DPI y placas).", en: "React · Node.js + Express · Google Cloud Vision API (ID and plate reading)." }],
    ],
  },
  {
    id: "cv-portafolio",
    name: "CV & Portafolio",
    cat: "university",
    client: { es: "Proyecto personal-académico", en: "Personal-academic project" },
    desc: {
      es: "Este mismo sitio: CV interactivo y portafolio bilingüe (español/inglés) con modo oscuro, explorador del stack y CV descargable en PDF hecho en LaTeX.",
      en: "This very website: interactive, bilingual (Spanish/English) CV and portfolio with dark mode, stack explorer and a downloadable LaTeX PDF résumé.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "Docker", "GitHub Pages"],
    img: "img/proyectos/cv-portafolio.jpg",
    video: "img/proyectos/cv-portafolio.mp4",
    demo: "https://madco-py.github.io/CV-MIGUEL_CARRANZA/",
    github: "https://github.com/MADCO-py/CV-MIGUEL_CARRANZA",
    build: [
      ["data",    { es: "Sin base de datos: los proyectos viven en un archivo de datos que alimenta el CV y el portafolio.", en: "No database: projects live in one data file that feeds both the CV and the portfolio." }],
      ["hosting", { es: "GitHub Pages; containerizado con Docker para un despliegue consistente.", en: "GitHub Pages; containerized with Docker for consistent deployment." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro · Font Awesome · LaTeX para el CV en PDF.", en: "Plain HTML, CSS and JavaScript · Font Awesome · LaTeX for the PDF résumé." }],
    ],
  },
  {
    id: "plataformas-moviles",
    name: "Plataformas Móviles",
    cat: "university",
    client: { es: "Proyecto en equipo", en: "Team project" },
    desc: {
      es: "Proyecto colaborativo de desarrollo de aplicaciones móviles. Trabajo en equipo con Docker para replicar los entornos de desarrollo de forma exacta entre colaboradores.",
      en: "Collaborative mobile app development project. Teamwork with Docker to replicate development environments exactly across collaborators.",
    },
    tech: ["Kotlin", "Jetpack Compose", "Android Studio", "Docker"],
    img: "img/Plats.png",
    demo: "",
    github: "https://github.com/YayaG2805/Proyectoplats",
    build: [
      ["libs",    { es: "Kotlin + Jetpack Compose (Android).", en: "Kotlin + Jetpack Compose (Android)." }],
      ["hosting", { es: "Docker para que todo el equipo tenga el mismo entorno.", en: "Docker so the whole team shares the same environment." }],
    ],
  },

  /* ── PERSONAL ───────────────────────────────────────── */
  {
    id: "mentorhub",
    name: "MentorHub",
    cat: "personal",
    client: { es: "Plataforma de tutorías", en: "Tutoring platform" },
    desc: {
      es: "Conecta 7 tutores universitarios con 20 estudiantes que buscan apoyo académico. Plataforma web para gestionar tutorías entre colegios y familias.",
      en: "Connects 7 university tutors with 20 students looking for academic support. Web platform to manage tutoring between schools and families.",
    },
    tech: ["React", "Vite", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/mentorhub.jpg",
    video: "img/proyectos/mentorhub.mp4",
    demo: "https://madco-py.github.io/MentorHub/",
    github: "https://github.com/MADCO-py/MentorHub",
    build: [
      ["purpose", { es: "Unir a quien necesita ayuda en una materia con quien ya la domina.", en: "Match students who need help in a subject with those who have mastered it." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "React, compilado con Vite.", en: "React, built with Vite." }],
    ],
  },
  {
    id: "madweb",
    name: "MADWEB",
    cat: "personal",
    client: { es: "Mi sitio de servicios", en: "My services website" },
    desc: {
      es: "Mi página de servicios web: clientes, proyectos y una página de demos interactivas (animaciones, formularios, APIs en vivo, cámara, micrófono y NFC). Bilingüe y con modo oscuro.",
      en: "My web services site: clients, projects and an interactive demos page (animations, forms, live APIs, camera, microphone and NFC). Bilingual with dark mode.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/proyectos/madweb.jpg",
    video: "img/proyectos/madweb.mp4",
    demo: "https://madco-py.github.io/MADWEB/",
    github: "https://github.com/MADCO-py/MADWEB",
    build: [
      ["purpose", { es: "Mostrar a futuros clientes lo que puede hacer su página.", en: "Show future clients what their website can do." }],
      ["data",    { es: "Consume APIs públicas en vivo (clima, tipo de cambio, Estación Espacial, GitHub); el registro de demo se guarda en el navegador.", en: "Uses live public APIs (weather, exchange rate, Space Station, GitHub); the demo sign-up is stored in the browser." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
      ["libs",    { es: "HTML, CSS y JavaScript puro, sin librerías de interfaz.", en: "Plain HTML, CSS and JavaScript, no UI libraries." }],
    ],
  },
  {
    id: "awa",
    name: "AwA",
    cat: "personal",
    client: { es: "App de hidratación", en: "Hydration app" },
    desc: {
      es: "App web de hidratación para botella Owala: registra cada sorbo con un tag NFC y gamifica el consumo de agua con racha de días, promedio semanal e historial.",
      en: "Hydration web app for an Owala bottle: logs every sip with an NFC tag and gamifies water intake with day streaks, weekly average and history.",
    },
    tech: ["JavaScript", "HTML5", "CSS3", "GitHub Pages"],
    img: "img/proyectos/awa.jpg",
    video: "img/proyectos/awa.mp4",
    demo: "https://madco-py.github.io/AwA/",
    github: "https://github.com/MADCO-py/AwA",
    build: [
      ["data",    { es: "Historial guardado en el navegador (localStorage).", en: "History saved in the browser (localStorage)." }],
      ["access",  { es: "Registro por tag NFC programable.", en: "Logging through a programmable NFC tag." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
    ],
  },
  {
    id: "mad-gains",
    name: "MAD Gains",
    cat: "personal",
    client: { es: "App de entrenamiento", en: "Training app" },
    desc: {
      es: "Aplicación web para seguimiento de entrenamiento y nutrición: rutinas de gym, historial de ejercicios y control de alimentación diaria.",
      en: "Web app for training and nutrition tracking: gym routines, exercise history and daily food tracking.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    img: "img/mad_gains.png",
    demo: "https://madco-py.github.io/mad-gains/",
    github: "https://github.com/MADCO-py/mad-gains",
    build: [
      ["data",    { es: "Datos guardados en el navegador (localStorage).", en: "Data saved in the browser (localStorage)." }],
      ["hosting", { es: "GitHub Pages.", en: "GitHub Pages." }],
    ],
  },
];

/* Categorías (orden en el portafolio) */
const CATEGORIES = {
  freelance:  { icon: "fa-solid fa-handshake",       es: "Clientes",                 en: "Clients" },
  community:  { icon: "fa-solid fa-store",           es: "Emprendedores y artistas", en: "Small businesses & artists" },
  university: { icon: "fa-solid fa-graduation-cap",  es: "Universitario",            en: "University" },
  personal:   { icon: "fa-solid fa-user",            es: "Personal",                 en: "Personal" },
};

/* Etiquetas de "Cómo está hecho" */
const BUILD_LABELS = {
  purpose: { icon: "fa-solid fa-bullseye",       es: "Función principal", en: "Main purpose" },
  data:    { icon: "fa-solid fa-database",       es: "Datos",             en: "Data" },
  analytics: { icon: "fa-solid fa-chart-line",   es: "Análisis de datos", en: "Data analysis" },
  access:  { icon: "fa-solid fa-lock",           es: "Acceso",            en: "Access" },
  hosting: { icon: "fa-solid fa-server",         es: "Hosting",           en: "Hosting" },
  domain:  { icon: "fa-solid fa-globe",          es: "Dominio",           en: "Domain" },
  libs:    { icon: "fa-solid fa-cubes",          es: "Librerías",         en: "Libraries" },
};

/* ── Ayudantes compartidos ─────────────────────────────── */
const SITE = {
  /* Prefijo de rutas: el portafolio vive en pages/ */
  base: location.pathname.includes("/pages/") ? "../" : "",
  lang() { return document.documentElement.getAttribute("data-lang") === "es" ? "es" : "en"; },
  t(v) { return v && typeof v === "object" ? (v[this.lang()] ?? v.es) : (v || ""); },
  url(p) { return p ? this.base + p : ""; },
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); },
};

/* Video liviano: muestra la portada y solo carga el video cuando
   la tarjeta está en pantalla (en compu, al pasar el mouse). */
const lazyVideoIO = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.play().catch(() => {});
    else e.target.pause();
  });
}, { threshold: 0.5 }) : null;

function mediaHTML(p, cls) {
  if (p.video) {
    return `<video class="${cls}" src="${SITE.url(p.video)}" poster="${SITE.url(p.img)}" preload="none" muted loop playsinline aria-hidden="true"></video>`;
  }
  if (p.img) return `<img class="${cls}" src="${SITE.url(p.img)}" alt="${SITE.esc(p.name)}" loading="lazy">`;
  return `<div class="${cls} media-ph"><i class="fa-solid fa-code"></i><span>${SITE.esc(p.name)}</span></div>`;
}

/* Activa los videos de un contenedor recién pintado */
function wireVideos(root) {
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.querySelectorAll("video[preload='none']").forEach(v => {
    const card = v.closest("[data-card]") || v.parentElement;
    if (canHover) {
      card.addEventListener("mouseenter", () => v.play().catch(() => {}));
      card.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
    } else if (lazyVideoIO) {
      lazyVideoIO.observe(v);
    }
  });
}

/* Bloque "Cómo está hecho" */
function buildHTML(p) {
  if (!p.build || !p.build.length) return "";
  return `<dl class="build">${p.build.map(([k, v]) => {
    const l = BUILD_LABELS[k];
    return `<div class="build-row"><dt><i class="${l.icon}"></i>${SITE.t(l)}</dt><dd>${SITE.esc(SITE.t(v))}</dd></div>`;
  }).join("")}</dl>`;
}
