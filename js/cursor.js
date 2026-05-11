/* ============================================================
   cursor.js — Cursor personalizado animado
   Incluir en index.html y portafolio.html
   ============================================================ */

(function initCursor() {
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('cur-r');

  if (!cur || !curR) return; // seguridad si no existen los elementos

  let mx = window.innerWidth  / 2;
  let my = window.innerHeight / 2;
  let rx = mx, ry = my;

  /* Mueve el punto central directamente al mouse */
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = (mx - 4) + 'px';
    cur.style.top  = (my - 4) + 'px';
  });

  /* El anillo sigue con inercia (lerp) */
  function animateRing() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    curR.style.left = (rx - 16) + 'px';
    curR.style.top  = (ry - 16) + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Ocultar cursor nativo dentro de la ventana */
  document.addEventListener('mouseleave', () => {
    cur.style.opacity  = '0';
    curR.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cur.style.opacity  = '1';
    curR.style.opacity = '1';
  });
})();
