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
     github    — URL del repositorio (dejar "" si es privado)
     demo      — URL de demo live (dejar "" si no existe)
     sold      — true si fue un proyecto vendido a cliente real
   ============================================================ */
const PROJECTS = [

  /* ── FREELANCE ─────────────────────────────────────── */
  {
    id:       "llantas-avila",
    name:     "Sistema de Control de Camiones — Llantas Ávila",
    category: "freelance",
    client:   "Llantas Ávila",
    desc:     "Sistema web para registro y control de la flota de camiones. Permite llevar historial de mantenimiento, fechas de revisión y alertas automáticas para evitar multas por documentación vencida.",
    tech:     ["JavaScript", "HTML", "CSS", "PostgreSQL", "Node.js"],
    /* 📸 COLOCA TU IMAGEN AQUÍ:
       Copia la imagen del proyecto a la carpeta img/
       y escribe el nombre del archivo abajo.
       Ejemplo: "img/llantas-avila-screenshot.png"
    */
    image:    "../img/FleetControl.png",
    github:   "",         /* privado — dejar vacío */
    demo:     "",
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
    desc:     "Plataforma web que conecta estudiantes que quieren dar tutorías con padres de familia que buscan apoyo académico para sus hijos. Pensada para ser compartida en colegios.",
    tech:     ["HTML", "CSS", "JavaScript"],
    image:    "../img/MentorHub.png",
    github:   "",
    demo:     "https://madco-py.github.io/MentorHub/",
    sold:     false,
  },
  {
    id:       "gvu",
    name:     "GVU",
    category: "personal",
    client:   "",
    desc:     "Aplicación web en JavaScript enfocada en interfaces dinámicas y manejo de lógica frontend. Proyecto activo que demuestra práctica constante en desarrollo web moderno.",
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
    image:    "../img/mad_gains.png", /* COLOCA TU IMAGEN AQUÍ */
    github:   "",
    demo:     "https://madco-py.github.io/mad-gains/",
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
  const imgHTML = project.image
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
