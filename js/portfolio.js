/* ============================================================
   portfolio.js — Portafolio
   Los proyectos están en js/projects-data.js (compartido con el CV).
   Aquí solo: búsqueda, filtros por categoría y render de tarjetas.
   ============================================================ */
(function () {
  'use strict';
  const L = (es, en) => (SITE.lang() === 'es' ? es : en);
  const ORDER = ['freelance', 'community', 'university', 'personal'];

  let currentFilter = 'all';
  let currentSearch = '';

  /* Texto donde busca: nombre, cliente, descripción, tecnologías y "cómo está hecho" */
  function haystack(p) {
    const build = (p.build || []).map(([, v]) => `${v.es} ${v.en}`).join(' ');
    return [p.name, p.client.es, p.client.en, p.desc.es, p.desc.en, p.tech.join(' '), build].join(' ').toLowerCase();
  }

  /* ── Tarjeta ── */
  function renderCard(p) {
    const cat = CATEGORIES[p.cat];
    const links = [];
    if (p.demo) links.push(`<a href="${p.demo}" class="proj-link proj-link-accent" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${L('Ver sitio', 'Visit site')}</a>`);
    if (p.github) links.push(`<a href="${p.github}" class="proj-link" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> ${L('Código', 'Code')}</a>`);
    else links.push(`<span class="proj-link is-private"><i class="fa-solid fa-lock"></i> ${L('Código privado', 'Private code')}</span>`);

    return `
      <article class="proj-card reveal" id="${p.id}" data-card>
        <div class="proj-image">
          ${mediaHTML(p, 'proj-media')}
          <span class="proj-cat-badge"><i class="${cat.icon}"></i> ${SITE.t(cat)}</span>
          ${p.sold ? `<span class="proj-sold-badge"><i class="fa-solid fa-circle-check"></i> ${L('Vendido', 'Sold')}</span>` : ''}
        </div>
        <div class="proj-body">
          <h3 class="proj-name">${SITE.esc(p.name)}</h3>
          <div class="proj-client"><i class="fa-solid fa-building"></i>${SITE.esc(SITE.t(p.client))}</div>
          <p class="proj-desc">${SITE.esc(SITE.t(p.desc))}</p>
          <div class="proj-techs">${p.tech.map(t => `<span class="ptag">${SITE.esc(t)}</span>`).join('')}</div>
          ${p.build && p.build.length ? `
          <details class="proj-build">
            <summary><i class="fa-solid fa-gears"></i> ${L('Cómo está hecho', 'How it is built')}<i class="fa-solid fa-chevron-down proj-build-arrow"></i></summary>
            ${buildHTML(p)}
          </details>` : ''}
          <div class="proj-footer">${links.join('')}</div>
        </div>
      </article>`;
  }

  /* ── Lista agrupada por categoría ── */
  function renderAll() {
    const q = currentSearch.toLowerCase().trim();
    const filtered = PROJECTS.filter(p => (currentFilter === 'all' || p.cat === currentFilter) && (!q || haystack(p).includes(q)));

    const counter = document.getElementById('searchCount');
    if (counter) counter.textContent = filtered.length === 1 ? L('1 proyecto', '1 project') : L(`${filtered.length} proyectos`, `${filtered.length} projects`);

    const container = document.getElementById('pfContent');
    const noResults = document.getElementById('noResults');
    if (!container) return;
    if (!filtered.length) {
      container.innerHTML = '';
      noResults.classList.add('visible');
      return;
    }
    noResults.classList.remove('visible');

    container.innerHTML = ORDER.filter(k => filtered.some(p => p.cat === k)).map(k => {
      const cat = CATEGORIES[k];
      const items = filtered.filter(p => p.cat === k);
      const n = items.length === 1 ? L('1 proyecto', '1 project') : L(`${items.length} proyectos`, `${items.length} projects`);
      return `
        <section class="category-section" data-cat="${k}">
          <div class="category-header">
            <div class="category-icon"><i class="${cat.icon}"></i></div>
            <div>
              <h2 class="category-title">${SITE.t(cat)}</h2>
              <div class="category-count">${n}</div>
            </div>
          </div>
          <div class="proj-grid">${items.map(renderCard).join('')}</div>
        </section>`;
    }).join('');

    wireVideos(container);
    if (window.reObserve) window.reObserve();
  }

  /* ── Filtros ── */
  function renderFilters() {
    const row = document.getElementById('filterRow');
    if (!row) return;
    const counts = { all: PROJECTS.length };
    PROJECTS.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    const opts = [['all', { es: 'Todos', en: 'All' }], ...ORDER.map(k => [k, CATEGORIES[k]])];
    row.innerHTML = opts.map(([k, c]) => `
      <button class="filter-btn${k === currentFilter ? ' active' : ''}" data-filter="${k}" aria-pressed="${k === currentFilter}">
        ${SITE.t(c)} <span class="filter-count">${counts[k] || 0}</span>
      </button>`).join('');
    row.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderFilters();
      renderAll();
    }));
  }

  /* ── Búsqueda ── */
  function initSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => { currentSearch = input.value; renderAll(); }, 200);
    });
  }
  function translateSearch() {
    const input = document.getElementById('searchInput');
    if (input) input.placeholder = L('Buscar por nombre, tecnología, cliente o base de datos…', 'Search by name, technology, client or database…');
    const nr = document.querySelector('#noResults p');
    if (nr) nr.textContent = L('No se encontraron proyectos que coincidan con tu búsqueda.', 'No projects match your search.');
  }

  /* ── Llegar desde el CV con #proyecto: abre su "cómo está hecho" ── */
  function focusHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const card = id && document.getElementById(id);
    if (!card) return;
    card.classList.add('on', 'is-target');
    const d = card.querySelector('details');
    if (d) d.open = true;
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    initSearch();
    translateSearch();
    renderAll();
    focusHash();
  });
  window.addEventListener('hashchange', focusHash);
  document.addEventListener('langchange', () => { renderFilters(); translateSearch(); renderAll(); });
})();
