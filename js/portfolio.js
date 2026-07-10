/* ============================================================
   portfolio.js — Lógica del portafolio
   - Base de datos de proyectos (editar aquí para agregar nuevos)
   - Búsqueda en tiempo real
   - Filtros por categoría
   - Render dinámico de cards
   ============================================================ */


/* ============================================================
   PROYECTOS — Edita este arreglo para agregar / modificar
   Campos disponibles:
     id        — identificador único (string)
     name      — nombre del proyecto
     category  — "freelance" | "university" | "personal"
     client    — nombre del cliente (solo freelance, opcional)
     desc      — descripción corta (~2 líneas)
     tech      — arreglo de tecnologías usadas
     image     — ruta a imagen en img/ (dejar "" para placeholder)
     video     — ruta a video en img/ (opcional, tiene prioridad sobre image;
                 se reproduce en loop, muteado y autoplay como preview)
     github    — URL del repositorio (dejar "" si es privado)
     demo      — URL de demo live (dejar "" si no existe)
     sold      — true si fue un proyecto vendido a cliente real
   ============================================================ */
const PROJECTS = [

  /* ── FREELANCE ─────────────────────────────────────── */
  {
    id:       "llantas-avila",
    name:     "FleetControl — Llantas Ávila",
    category: "freelance",
    client:   "Llantas Ávila",
    desc:     "Resuelve el caos de identificar qué piloto fue multado en un día dado. 9 pilotos registrados con foto, fecha e historial de mantenimiento por vehículo. Acceso por usuario/contraseña con registro vinculado por QR.",
    tech:     ["Python", "PostgreSQL", "Docker", "JavaScript", "QR"],
    image:    "../img/FleetControl.png",
    github:   "",
    demo:     "#",
    sold:     true,
  },

  /* ── UNIVERSITARIO ──────────────────────────────────── */
  {
    id:       "cv-portafolio",
    name:     "CV & Portafolio Personal",
    category: "university",
    client:   "",
    desc:     "Sitio web personal con CV interactivo y portafolio de proyectos. Desarrollado con HTML, CSS y JS puro, containerizado con Docker y desplegado en GitHub Pages.",
    tech:     ["HTML", "CSS", "JavaScript", "Docker"],
    image:    "../img/FotoCV.png",
    video:    "../img/VIDEOS/CVMIGUEL.mp4",
    github:   "https://github.com/MADCO-py/CV-MIGUEL_CARRANZA",
    demo:     "https://madco-py.github.io/CV-MIGUEL_CARRANZA/index.html",
    sold:     false,
  },
  {
    id:       "plataformas-moviles",
    name:     "Proyecto Plataformas Móviles",
    category: "university",
    client:   "",
    desc:     "Proyecto colaborativo de desarrollo de aplicaciones móviles. Trabajo en equipo con Docker para replicar entornos de desarrollo de forma exacta entre colaboradores.",
    tech:     ["Kotlin", "Android", "Docker", "Jetpack Compose"],
    image:    "../img/Plats.png",
    github:   "https://github.com/YayaG2805/Proyectoplats",
    demo:     "",
    sold:     false,
  },

  /* ── PERSONAL ───────────────────────────────────────── */
  {
    id:       "mentorhub",
    name:     "MentorHub",
    category: "personal",
    client:   "",
    desc:     "Conecta 7 tutores universitarios con 20 estudiantes que buscan apoyo académico. Plataforma web completa para gestión de tutorías entre colegios y familias.",
    tech:     ["HTML", "CSS", "JavaScript"],
    image:    "../img/MentorHub.png",
    video:    "../img/VIDEOS/MENTORHUB.mp4",
    github:   "#",
    demo:     "https://madco-py.github.io/MentorHub/",
    sold:     false,
  },
  {
    id:       "madweb",
    name:     "MADWEB",
    category: "personal",
    client:   "",
    desc:     "Mi página personal, donde comparto mi trabajo, proyectos y forma de contacto. Construida con HTML, CSS y JavaScript puro, desplegada en GitHub Pages.",
    tech:     ["HTML", "CSS", "JavaScript"],
    image:    "",
    video:    "../img/VIDEOS/MADWEB.mp4",
    github:   "https://github.com/MADCO-py/MADWEB",
    demo:     "https://madco-py.github.io/MADWEB/",
    sold:     false,
  },
  {
    id:       "gvu",
    name:     "GVU",
    category: "personal",
    client:   "",
    desc:     "Intento de red social universitaria construida en JavaScript. Enfocada en interfaces dinámicas y lógica frontend moderna. Proyecto de exploración técnica sin usuarios activos.",
    tech:     ["JavaScript", "HTML", "CSS", "Docker"],
    image:    "../img/GVU.png",
    github:   "https://github.com/MADCO-py/GVU",
    demo:     "",
    sold:     false,
  },
  {
    id:       "mad-gains",
    name:     "MAD Gains",
    category: "personal",
    client:   "",
    desc:     "Aplicación web para seguimiento de entrenamiento y nutrición. Permite registrar rutinas de gym, ver historial de ejercicios y llevar control de alimentación diaria.",
    tech:     ["HTML", "CSS", "JavaScript"],
    image:    "../img/mad_gains.png",
    github:   "#",
    demo:     "https://madco-py.github.io/mad-gains/",
    sold:     false,
  },
  {
    id:       "awa",
    name:     "AwA",
    category: "personal",
    client:   "",
    desc:     "Aplicación web para el seguimiento de hidratación diaria. Gamifica el consumo de agua con racha de días consecutivos, promedio semanal, historial acumulado y registro por botella.",
    tech:     ["JavaScript", "HTML", "CSS"],
    image:    "",
    video:    "../img/VIDEOS/AWAVIDEO.mp4",
    github:   "https://github.com/MADCO-py/AwA",
    demo:     "https://madco-py.github.io/AwA/",
    sold:     false,
  },

  /* ── UNIVERSITARIO ──────────────────────────────────── */
  {
    id:       "securegate",
    name:     "SecureGate",
    category: "university",
    client:   "",
    desc:     "Sistema de control de acceso para garita universitaria. Registra y gestiona quién entra y sale en tiempo real. 5 participantes activos durante su implementación, actualmente en fase de escalado.",
    tech:     ["TypeScript", "CSS"],
    image:    "",
    github:   "#",
    demo:     "",
    sold:     false,
  },

];


/* ============================================================
   CATEGORÍAS — Configuración de labels e íconos
   ============================================================ */
const CATEGORIES = {
  all:        { label: "Todos",       icon: "fa-solid fa-border-all"   },
  freelance:  { label: "Freelance",   icon: "fa-solid fa-handshake"    },
  university: { label: "Universitario", icon: "fa-solid fa-graduation-cap" },
  personal:   { label: "Personal",    icon: "fa-solid fa-user"         },
};


/* ============================================================
   ESTADO DE LA UI
   ============================================================ */
let currentFilter = "all";
let currentSearch = "";


/* ============================================================
   RENDER — Genera el HTML de una card de proyecto
   ============================================================ */
function renderCard(project) {
  const cat     = CATEGORIES[project.category] || CATEGORIES.all;
  const imgHTML = project.video
    ? `<video src="${project.video}" ${project.image ? `poster="${project.image}"` : ''} autoplay muted loop playsinline></video>`
    : project.image
    ? `<img src="${project.image}" alt="${project.name}" loading="lazy">`
    : `<div class="proj-image-ph">
         <i class="fa-regular fa-image"></i>
         <span>Agregar imagen</span>
       </div>`;

  const soldBadge = project.sold
    ? `<span class="proj-sold-badge"><i class="fa-solid fa-circle-check"></i> Vendido</span>`
    : "";

  const clientHTML = project.client
    ? `<div class="proj-client"><i class="fa-solid fa-building"></i>${project.client}</div>`
    : "";

  const techHTML = project.tech
    .map(t => `<span class="ptag">${t}</span>`)
    .join("");

  const githubBtn = project.github
    ? `<a href="${project.github}" class="proj-link" target="_blank">
         <i class="fa-brands fa-github"></i> Código
       </a>`
    : `<span class="proj-link" style="opacity:0.4;cursor:default;pointer-events:none">
         <i class="fa-solid fa-lock"></i> Privado
       </span>`;

  const demoBtn = project.demo
    ? `<a href="${project.demo}" class="proj-link proj-link-accent" target="_blank">
         <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
       </a>`
    : "";

  const cardLink = project.demo || '';

  return `
    <div class="proj-card reveal${cardLink ? ' proj-card-clickable' : ''}"
         data-id="${project.id}"
         data-category="${project.category}"
         data-name="${project.name.toLowerCase()}"
         data-tech="${project.tech.join(" ").toLowerCase()}"
         data-desc="${project.desc.toLowerCase()}"
         ${cardLink ? `data-link="${cardLink}"` : ''}>
      <div class="proj-image">
        ${imgHTML}
        <span class="proj-cat-badge"><i class="${cat.icon}"></i> ${cat.label}</span>
        ${soldBadge}
      </div>
      <div class="proj-body">
        <div class="proj-name">${project.name}</div>
        ${clientHTML}
        <div class="proj-desc">${project.desc}</div>
        <div class="proj-techs">${techHTML}</div>
        <div class="proj-footer">
          ${githubBtn}
          ${demoBtn}
        </div>
      </div>
    </div>
  `;
}


/* ============================================================
   RENDER CATEGORÍAS — Agrupa los proyectos filtrados por sección
   ============================================================ */
function renderAll() {
  const query    = currentSearch.toLowerCase().trim();
  const catKey   = currentFilter;

  /* Filtrar proyectos según búsqueda y categoría activa */
  const filtered = PROJECTS.filter((p) => {
    const matchCat = catKey === "all" || p.category === catKey;
    const matchQ   = !query
      || p.name.toLowerCase().includes(query)
      || p.tech.join(" ").toLowerCase().includes(query)
      || p.desc.toLowerCase().includes(query)
      || (p.client && p.client.toLowerCase().includes(query));
    return matchCat && matchQ;
  });

  /* Actualizar contador */
  const counter = document.getElementById('searchCount');
  if (counter) {
    counter.textContent = filtered.length === 1
      ? "1 proyecto"
      : `${filtered.length} proyectos`;
  }

  const container  = document.getElementById('pfContent');
  const noResults  = document.getElementById('noResults');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = "";
    noResults.classList.add('visible');
    return;
  }
  noResults.classList.remove('visible');

  /* Agrupar por categoría */
  const groups = {};
  filtered.forEach((p) => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });

  /* Orden de categorías */
  const order = ["freelance", "university", "personal"];

  container.innerHTML = order
    .filter(k => groups[k])
    .map(k => {
      const cat   = CATEGORIES[k];
      const cards = groups[k].map(renderCard).join("");
      return `
        <div class="category-section" data-cat="${k}">
          <div class="category-header">
            <div class="category-icon"><i class="${cat.icon}"></i></div>
            <div>
              <div class="category-title">${cat.label}</div>
              <div class="category-count">${groups[k].length} proyecto${groups[k].length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <div class="proj-grid">
            ${cards}
          </div>
        </div>
      `;
    })
    .join("");

  /* Re-activar observer para las cards recién renderizadas */
  if (window.reObserve) window.reObserve();
}


/* ============================================================
   FILTROS — Botones de categoría
   ============================================================ */
function initFilters() {
  const row = document.getElementById('filterRow');
  if (!row) return;

  /* Calcular conteos por categoría */
  const counts = { all: PROJECTS.length };
  PROJECTS.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  /* Renderizar botones */
  row.innerHTML = Object.entries(CATEGORIES)
    .map(([key, cat]) => `
      <button class="filter-btn ${key === 'all' ? 'active' : ''}"
              data-filter="${key}">
        ${cat.label}
        <span class="filter-count">${counts[key] || 0}</span>
      </button>
    `)
    .join("");

  /* Listeners de click */
  row.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      row.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAll();
    });
  });
}


/* ============================================================
   BÚSQUEDA — Input con debounce
   ============================================================ */
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      currentSearch = input.value;
      renderAll();
    }, 200);
  });
}


/* ============================================================
   INIT — Arranca todo cuando el DOM esté listo
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSearch();
  renderAll();

  /* Card-wide click: navigate to demo URL if card has data-link */
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.proj-card[data-link]');
    if (!card) return;
    if (e.target.closest('a')) return;
    window.open(card.dataset.link, '_blank');
  });
});
