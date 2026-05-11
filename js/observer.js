/* ============================================================
   observer.js — Scroll reveal + animación de barras
   Incluir en index.html y portafolio.html
   ============================================================ */

(function initObserver() {

  /* ── Intersection Observer principal ──
     Activa la clase .on en elementos .reveal, .t-item
     cuando entran al viewport con 15% de visibilidad.
  */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      /* Reveal genérico */
      el.classList.add('on');

      /* Animar barras de idiomas y habilidades dentro del elemento */
      el.querySelectorAll('.lang-bar, .skill-fill').forEach((bar) => {
        bar.classList.add('on');
      });

      /* Timeline items */
      el.querySelectorAll('.t-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('on'), i * 120);
      });

      /* Dejar de observar una vez animado (performance) */
      io.unobserve(el);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  /* Observar todos los elementos reveal y timeline */
  document.querySelectorAll('.reveal, .t-item').forEach((el) => {
    io.observe(el);
  });

  /* ── Nav: compacta al hacer scroll ── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

})();
