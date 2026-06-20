/* ============================================================
   skills-wheel.js — Anillo 3D giratorio | Liquid Glass
   Geometría real de anillo:
   · Ítem activo al frente/abajo del anillo
   · Los 19 ítems siempre visibles en el anillo
   · Parte trasera pequeña, difuminada y subida (profundidad real)
   · El usuario controla con scroll — sin auto-spin
   ============================================================ */

(function () {
  'use strict';

  var SKILLS = [
    { name: 'HTML5',          icon: 'fa-brands fa-html5',        color: '#e34f26' },
    { name: 'CSS3',           icon: 'fa-brands fa-css3-alt',     color: '#1572b6' },
    { name: 'JavaScript',     icon: 'fa-brands fa-js',           color: '#f7df1e' },
    { name: 'TypeScript',     icon: 'fa-solid fa-code',          color: '#3178c6' },
    { name: 'React',          icon: 'fa-brands fa-react',        color: '#61dafb' },
    { name: 'Python',         icon: 'fa-brands fa-python',       color: '#3776ab' },
    { name: 'Java',           icon: 'fa-brands fa-java',         color: '#ed8b00' },
    { name: 'Kotlin',         icon: 'fa-solid fa-k',             color: '#7f52ff' },
    { name: 'C / C++',        icon: 'fa-solid fa-c',             color: '#00599c' },
    { name: 'PostgreSQL',     icon: 'fa-solid fa-database',      color: '#336791' },
    { name: 'Neo4J',          icon: 'fa-solid fa-circle-nodes',  color: '#008cc1' },
    { name: 'Docker',         icon: 'fa-brands fa-docker',       color: '#2496ed' },
    { name: 'Git',            icon: 'fa-brands fa-git-alt',      color: '#f05032' },
    { name: 'Linux',          icon: 'fa-brands fa-linux',        color: '#fcc624' },
    { name: 'VS Code',        icon: 'fa-solid fa-laptop-code',   color: '#007acc' },
    { name: 'Android Studio', icon: 'fa-brands fa-android',      color: '#3ddc84' },
    { name: 'Jira',           icon: 'fa-brands fa-jira',         color: '#0052cc' },
    { name: 'Arduino',        icon: 'fa-solid fa-bolt',          color: '#00979d' },
    { name: 'ESP32',          icon: 'fa-solid fa-wifi',          color: '#e8251f' },
  ];

  var N           = SKILLS.length;
  var activeIndex = 0;

  var scene = document.getElementById('cflowScene');
  var lIcon = document.getElementById('cflowLabelIcon');
  var lName = document.getElementById('cflowLabelName');
  if (!scene) return;

  /* ── Construir ítems ── */
  var items = SKILLS.map(function (skill) {
    var el = document.createElement('div');
    el.className = 'cflow-item';
    el.innerHTML =
      '<div class="cflow-item-inner">' +
        '<i class="' + skill.icon + '" style="color:' + skill.color + '"></i>' +
        '<span>' + skill.name + '</span>' +
      '</div>';
    el.style.pointerEvents = 'none';
    scene.appendChild(el);
    return el;
  });

  /* ── Geometría de anillo ──────────────────────────────────
     El anillo está inclinado ~30° hacia el espectador:
     – Ítem activo (offset=0): al frente y abajo → escala 1.0
     – Ítems laterales (offset=±5): a los lados → escala ~0.45
     – Ítems traseros (offset=±9): arriba y al centro → escala ~0.22, blur 9px

     Variables clave:
     · R          — radio del anillo en px
     · V_OFFSET   — cuánto baja el ítem activo desde el centro de la escena
     · V_RISE     — factor de cuánto suben los ítems hacia la parte trasera
  ─────────────────────────────────────────────────────────── */
  function updatePositions() {
    var vw       = window.innerWidth;
    var isMobile = vw < 640;

    /* Radio vertical (controla el "alzado" de los ítems traseros) */
    var R  = isMobile ? 185 : 295;

    /* Radio horizontal: anillo más ancho que alto, limitado por el viewport */
    var RH = Math.min(R * 1.45, vw * 0.40);

    var V_OFFSET = isMobile ? 55 : 75;   /* px que baja el frente */
    var V_RISE   = 0.28;                  /* cuánto suben los traseros */

    items.forEach(function (el, i) {
      /* Offset circular: distancia al ítem activo */
      var offset = i - activeIndex;
      while (offset >  N / 2) offset -= N;
      while (offset < -N / 2) offset += N;

      var angle = (2 * Math.PI / N) * offset;
      var sinA  = Math.sin(angle);
      var cosA  = Math.cos(angle);

      /* Posición en pantalla — anillo elíptico (más ancho que alto) */
      var x = RH * sinA;                        /* usa radio horizontal ampliado */
      var y = -R * V_RISE * (1 - cosA) + V_OFFSET;
      /*
         offset=0  → y =  V_OFFSET          (ítem al frente, abajo)
         offset=±9 → y = -R*V_RISE*2+V_OFFSET (parte trasera, arriba)
         Ejemplo R=270: y_back = -270*0.32*2+70 = -173+70 = -103px
      */

      /* Profundidad normalizada: 1=frente, 0=fondo */
      var norm = (cosA + 1) / 2;

      /* Propiedades visuales basadas en la profundidad */
      var scale   = 0.22 + norm * 0.78;   /* 0.22 → 1.00 */
      var opacity = 0.08 + norm * 0.92;   /* 0.08 → 1.00 */
      var blur    = (1 - norm) * 9;       /* 9px → 0px   */
      var ry      = -sinA * 44;           /* rotación Y para dar sensación de curvatura */
      var zIdx    = Math.round(20 + cosA * 19); /* 1 → 39 */

      el.style.transform =
        'translateX(calc(-50% + ' + x.toFixed(1) + 'px)) ' +
        'translateY(calc(-50% + ' + y.toFixed(1) + 'px)) ' +
        'rotateY('   + ry.toFixed(1)    + 'deg) '  +
        'scale('     + scale.toFixed(3) + ')';

      el.style.opacity = opacity.toFixed(3);
      el.style.filter  = blur > 0.3
        ? 'blur(' + blur.toFixed(1) + 'px)'
        : '';
      el.style.zIndex  = String(zIdx);
      el.classList.toggle('cf-active', offset === 0);
    });
  }

  /* ── Label ── */
  function updateLabel() {
    var s             = SKILLS[activeIndex];
    lIcon.className   = s.icon;
    lIcon.style.color = s.color;
    lName.textContent = s.name;
  }

  function setActive(idx) {
    activeIndex = ((idx % N) + N) % N;
    updatePositions();
    if (lIcon && lName) updateLabel();
  }

  /* Render inicial */
  updatePositions();
  if (lIcon && lName) updateLabel();

  /* ── Scroll hijack — velocidad proporcional al scroll ──────
     Velocidad del scroll → velocidad del carrusel:
     · Lento (eventos separados >150 ms): 1 ítem, transición 330 ms
     · Medio  (60-150 ms entre eventos):  hasta 4 ítems, 200 ms c/u
     · Rápido (<60 ms o deltaY grande):   hasta 10 ítems, 100 ms c/u
     La cola se va vaciando: más ítems pendientes = más rápido.
     Al final desacelera solo (inercia natural).
  ─────────────────────────────────────────────────────────── */
  var centered  = false;
  var queue     = 0;       /* ítems pendientes (+adelante / -atrás) */
  var animating = false;
  var lastEvMs  = 0;       /* timestamp del último evento de rueda   */

  var sec = document.getElementById('skills');

  if (sec) {
    new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) {
        centered  = false;
        queue     = 0;
        animating = false;
      }
    }, { threshold: 0.05 }).observe(sec);
  }

  function sectionInView() {
    if (!sec) return false;
    var r = sec.getBoundingClientRect();
    return r.top < window.innerHeight * 0.70 && r.bottom > window.innerHeight * 0.30;
  }

  function centerSection() {
    if (!sec || centered) return;
    centered = true;
    var r     = sec.getBoundingClientRect();
    var delta = (r.top + r.height / 2) - window.innerHeight / 2;
    if (Math.abs(delta) > 20) window.scrollBy({ top: delta, behavior: 'smooth' });
  }

  /* Ajusta duración de todas las transiciones en tiempo real */
  function applyMs(ms) {
    var s  = (ms / 1000).toFixed(3) + 's';
    var sb = (ms * 0.65 / 1000).toFixed(3) + 's';
    items.forEach(function (el) {
      el.style.transition =
        'transform '  + s  + ' cubic-bezier(0.22, 1, 0.36, 1), ' +
        'opacity '    + s  + ' ease-out, '   +
        'filter '     + s  + ' ease-out, '   +
        'box-shadow ' + sb + ' ease-out, '   +
        'background 0.4s ease, border-color 0.4s ease';
    });
  }

  /* Procesa la cola: avanza 1 ítem y espera su transición */
  function processQueue() {
    if (animating || queue === 0) return;

    var dir  = queue > 0 ? 1 : -1;
    var next = activeIndex + dir;
    if (next < 0 || next >= N) { queue = 0; return; }

    /* Velocidad según ítems pendientes — desacelera al vaciarse */
    var pending = Math.abs(queue);
    var ms = pending >= 6 ? 95
           : pending >= 4 ? 145
           : pending >= 2 ? 210
           : 330;

    queue    -= dir;
    animating = true;
    applyMs(ms);
    setActive(next);

    setTimeout(function () {
      animating = false;
      processQueue();
    }, ms);
  }

  document.addEventListener('wheel', function (ev) {
    if (!sectionInView()) return;

    var dir       = ev.deltaY > 0 ? 1 : -1;
    var effective = activeIndex + queue;   /* posición final tras vaciar cola */

    /* Fronteras: deja pasar la página */
    if (dir < 0 && effective <= 0)     return;
    if (dir > 0 && effective >= N - 1) return;

    centerSection();
    ev.preventDefault();

    /* Detectar velocidad por tiempo entre eventos + magnitud del delta */
    var now = Date.now();
    var dt  = now - lastEvMs;
    lastEvMs = now;

    var isFast = (dt > 0 && dt < 65)  || Math.abs(ev.deltaY) > 180;
    var isMed  = !isFast && ((dt > 0 && dt < 160) || Math.abs(ev.deltaY) > 60);
    var maxQ   = isFast ? 10 : isMed ? 4 : 1;

    if (dir > 0 && queue <  maxQ) queue++;
    if (dir < 0 && queue > -maxQ) queue--;

    processQueue();
  }, { passive: false });

  /* Recalcular posiciones si cambia el tamaño de ventana */
  window.addEventListener('resize', function () { updatePositions(); }, { passive: true });

})();
