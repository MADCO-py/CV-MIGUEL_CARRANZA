/* ============================================================
   cv-sections.js — Secciones del CV que salen de projects-data.js
   · Proyectos destacados (los vendidos a clientes)
   · Explorador del stack: cada tecnología muestra en qué
     proyectos se usó (en celular se abre como panel inferior)
   · Total de proyectos en el hero
   ============================================================ */
(function () {
  'use strict';
  const L = (es, en) => (SITE.lang() === 'es' ? es : en);

  /* ── Total de proyectos ─────────────────────────────────── */
  document.querySelectorAll('[data-count="projects"]').forEach(el => { el.textContent = PROJECTS.length; });

  /* ── Proyectos destacados ───────────────────────────────── */
  const featuredList = document.getElementById('featuredList');

  function linksHTML(p) {
    const out = [];
    if (p.demo) out.push(`<a class="btn btn-dark btn-visit" href="${p.demo}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${L('Ver sitio', 'Visit site')}</a>`);
    if (p.github) out.push(`<a class="btn btn-outline btn-sm" href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> ${L('Código', 'Code')}</a>`);
    else out.push(`<span class="btn btn-outline btn-sm is-disabled"><i class="fa-solid fa-lock"></i> ${L('Código privado', 'Private code')}</span>`);
    if (!p.demo) out.push(`<span class="featured-note"><i class="fa-solid fa-shield-halved"></i> ${L('Sistema interno del cliente', "Client's internal system")}</span>`);
    return out.join('');
  }

  function renderFeatured() {
    if (!featuredList) return;
    featuredList.innerHTML = PROJECTS.filter(p => p.featured).map((p, i) => `
      <article class="featured-card reveal" data-card id="f-${p.id}">
        <div class="featured-media">
          ${mediaHTML(p, 'featured-img')}
          <span class="featured-badge"><i class="fa-solid fa-circle-check"></i> ${L('Vendido', 'Sold')}</span>
        </div>
        <div class="featured-body">
          <div class="featured-num">0${i + 1}</div>
          <h3 class="featured-name">${SITE.esc(p.name)}</h3>
          <div class="featured-client"><i class="fa-solid fa-building"></i> ${SITE.esc(SITE.t(p.client))}</div>
          <p class="featured-desc">${SITE.esc(SITE.t(p.desc))}</p>
          <div class="featured-tech">${p.tech.map(t => `<span>${SITE.esc(t)}</span>`).join('')}</div>
          <div class="featured-build-title">${L('Cómo está hecho', 'How it is built')}</div>
          ${buildHTML(p)}
          <div class="featured-links">${linksHTML(p)}</div>
        </div>
      </article>`).join('');
    wireVideos(featuredList);
    if (window.reObserve) window.reObserve();
    else featuredList.querySelectorAll('.reveal').forEach(el => el.classList.add('on'));
  }

  /* ── Explorador del stack ───────────────────────────────── */
  const pills = [...document.querySelectorAll('.skill[data-skill]')];
  const panel = document.getElementById('skillPanel');
  const panelBody = document.getElementById('skillPanelBody');
  const closeBtn = document.getElementById('skillPanelClose');
  const isSheet = () => matchMedia('(max-width: 960px)').matches;
  let current = null;

  const usedIn = skill => PROJECTS.filter(p => p.tech.includes(skill));

  // Cada tecnología muestra cuántos proyectos la usan
  pills.forEach(btn => {
    const n = usedIn(btn.dataset.skill).length;
    btn.insertAdjacentHTML('beforeend', `<span class="skill-count${n ? '' : ' is-zero'}">${n}</span>`);
    btn.setAttribute('aria-pressed', 'false');
  });

  function renderPanel() {
    if (!current || !panelBody) return;
    const btn = pills.find(b => b.dataset.skill === current);
    const icon = btn ? btn.querySelector('i').className : 'fa-solid fa-code';
    const list = usedIn(current);
    const count = list.length === 1 ? L('1 proyecto', '1 project') : L(`${list.length} proyectos`, `${list.length} projects`);
    panelBody.innerHTML = `
      <div class="skill-head">
        <div class="skill-icon"><i class="${icon}"></i></div>
        <div>
          <div class="skill-name">${SITE.esc(current)}</div>
          <div class="skill-sub">${list.length ? L('Usado en ', 'Used in ') + count : L('Sin proyecto público todavía', 'No public project yet')}</div>
        </div>
      </div>
      ${list.length ? `<ul class="skill-projects">${list.map(p => `
        <li>
          <a href="${SITE.base}pages/portafolio.html#${p.id}" class="skill-proj">
            <span class="skill-thumb">${p.img ? `<img src="${SITE.url(p.img)}" alt="" loading="lazy">` : '<i class="fa-solid fa-code"></i>'}</span>
            <span class="skill-proj-text">
              <strong>${SITE.esc(p.name)}${p.sold ? ` <em>${L('Vendido', 'Sold')}</em>` : ''}</strong>
              <small>${SITE.esc(SITE.t(p.client))}</small>
            </span>
            <i class="fa-solid fa-arrow-right skill-go"></i>
          </a>
        </li>`).join('')}</ul>`
      : `<p class="skill-empty">${L('Todavía no hay un proyecto público con esta tecnología en el portafolio.', 'There is no public project with this technology in the portfolio yet.')}</p>`}`;
  }

  function select(skill, fromUser) {
    current = skill;
    pills.forEach(b => {
      const on = b.dataset.skill === skill;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    renderPanel();
    if (fromUser && isSheet()) openSheet();
  }

  function openSheet() {
    panel.classList.add('open');
    document.documentElement.classList.add('sheet-open');
  }
  function closeSheet() {
    panel.classList.remove('open');
    document.documentElement.classList.remove('sheet-open');
  }

  pills.forEach(b => b.addEventListener('click', e => { e.stopPropagation(); select(b.dataset.skill, true); }));
  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  document.addEventListener('click', e => {
    if (panel && panel.classList.contains('open') && !panel.contains(e.target)) closeSheet();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  window.addEventListener('resize', () => { if (!isSheet()) closeSheet(); }, { passive: true });

  // En compu arranca mostrando la tecnología más usada
  if (pills.length) {
    const top = pills.slice().sort((a, b) => usedIn(b.dataset.skill).length - usedIn(a.dataset.skill).length)[0];
    select(top.dataset.skill, false);
  }

  /* ── Idioma ─────────────────────────────────────────────── */
  renderFeatured();
  document.addEventListener('langchange', () => { renderFeatured(); renderPanel(); });
})();
