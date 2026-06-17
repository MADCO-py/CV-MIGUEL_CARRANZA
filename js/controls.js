/* ============================================================
   controls.js — Theme toggle (dark/light) + Language toggle (EN/ES)
   ============================================================ */

(function initControls() {

  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const langSlider = document.getElementById('langSlider');

  /* ── TRANSLATIONS ──────────────────────────────────────────── */
  const i18n = {
    en: {
      // Nav
      'nav.about':      'About',
      'nav.stack':      'Stack',
      'nav.education':  'Education',
      'nav.portfolio':  'Portfolio',
      'nav.contact':    'Contact',

      // Hero
      'hero.eyebrow':       'Available · Guatemala',
      'hero.role.suffix':   'Engineering Student',
      'hero.desc':          'I build functional, optimized and maintainable software. Focused on web development, backend systems, mobile apps and IoT.',
      'hero.cta.contact':   'Contact',
      'hero.cta.portfolio': 'View portfolio',
      'hero.stat.age':      'Years',
      'hero.stat.langs':    'Languages',
      'hero.stat.year':     'Year @ UVG',

      // About
      'about.eyebrow': 'Who I am',
      'about.title':   'About Me',
      'about.p1': 'I am a <strong>Computer Science Engineering</strong> student at Universidad del Valle de Guatemala, currently in my third year. I specialize in creating clean, scalable and visually appealing solutions.',
      'about.p2': 'My focus is <strong>Full Stack</strong> development: from modern interfaces to robust backend systems, relational and graph databases, Docker containers and microcontroller programming.',
      'about.p3': 'I am deeply interested in <strong>cybersecurity</strong>, artificial intelligence and systems architecture. I work in a structured way using sprints and Jira management, prioritizing clean and maintainable code.',
      'about.lang.es':              'Spanish',
      'about.lang.en':              'English',
      'about.card.age.label':       'Age',
      'about.card.age.value':       '20 years',
      'about.card.location.label':  'Location',
      'about.card.location.value':  'Zone 10, Guatemala',
      'about.card.university.label':'University',
      'about.card.university.value':'UVG — CS Eng.',
      'about.card.transport.label': 'Transport',
      'about.card.transport.value': 'Own vehicle',
      'about.card.billing.label':   'Billing',
      'about.card.billing.value':   'Active NIT',
      'about.card.method.label':    'Methodology',
      'about.card.method.value':    'Agile · Jira',

      // Stack
      'stack.eyebrow':        'Tools',
      'stack.title':          'Tech Stack',
      'stack.cat.frontend':   'Frontend',
      'stack.cat.backend':    'Backend &amp; Languages',
      'stack.cat.db':         'Databases',
      'stack.cat.devops':     'DevOps &amp; Tools',
      'stack.cat.iot':        'Hardware &amp; IoT',
      'stack.docker.title':   'Docker — Deployed Projects',
      'stack.docker.sub':     'Containers in production and development',
      'stack.docker.proj1.desc': 'Containerized web portfolio for consistent deployment',
      'stack.docker.proj2.desc': 'Web app with Docker environment for uniform development',
      'stack.docker.proj3.desc': 'Docker to replicate team environments exactly',

      // Skills
      'skills.eyebrow': 'Technical Level',
      'skills.title':   'Skills',
      'skills.db':      'Databases',

      // Education
      'edu.eyebrow':    'Training',
      'edu.title':      'Education',
      'edu.uvg.degree': 'Computer Science and IT Engineering',
      'edu.uvg.date':   '2023 – Present',
      'edu.uvg.desc':   'Currently in third year. Algorithms, data structures, databases, operating systems and software development.',
      'edu.db.degree':  'Bachelor in Sciences and Letters — Computing',
      'edu.db.desc':    'Computer fundamentals and introduction to programming.',
      'edu.db.badge':   'Graduated CUM LAUDE',

      // Experience
      'exp.eyebrow':      'Background',
      'exp.title':        'Professional Experience',
      'exp.museo.date':   'Apr 2025 – Oct 2025',
      'exp.museo.role':   'Educational Guide',
      'exp.museo.desc':   'Attention to children and parents, effective communication, creation of digital educational content and dynamic activities. Development of presentation and pedagogy skills.',
      'exp.museo.tag1':   'Communication',
      'exp.museo.tag2':   'Digital Content',
      'exp.museo.tag3':   'Education',
      'exp.bershka.date': 'Nov 2022 – Jan 2023',
      'exp.bershka.role': 'Store Clerk',
      'exp.bershka.desc': 'Customer service, cashier support during high traffic, basic inventory control and store organization.',
      'exp.bershka.tag1': 'Customer Service',
      'exp.bershka.tag2': 'Inventory',

      // Certifications
      'certs.eyebrow': 'Certifications',
      'certs.title':   'Courses &amp; Certificates',
      'cert1.name':    'Ethics in Research with Human Subjects',
      'cert1.issuer':  'Universidad del Valle de Guatemala — CCSS',
      'cert1.date':    'May 7, 2026 · Code CECCSSS 0343',
      'cert1.desc':    '8-hour online course organized by the Research Ethics Committee of the Faculty of Social Sciences.',
      'cert2.name':    'HCI — Human-Computer Interaction',
      'cert2.date':    'UVG · University course',
      'cert2.desc':    'Usability principles, user-centered design, interface evaluation and digital experience prototyping.',
      'cert3.name':    'Web Page Creation — HTML, CSS, JavaScript',
      'cert3.issuer':  'INTECAP — Intermediate Level',
      'cert3.date':    'Official certification',
      'cert3.desc':    'Certification after successfully completing the web development training program. Applied in this portfolio.',

      // Interests
      'int.eyebrow':        'Direction',
      'int.title':          'Areas of Interest',
      'int.cyber.title':    'Cybersecurity',
      'int.cyber.desc':     'Offensive and defensive security, vulnerability analysis',
      'int.ai.title':       'Artificial Intelligence',
      'int.ai.desc':        'Machine learning, language models, automation',
      'int.web.title':      'Web Development',
      'int.web.desc':       'Modern full stack, robust APIs, high performance',
      'int.mobile.title':   'Mobile Apps',
      'int.mobile.desc':    'Native Android with Kotlin, Jetpack Compose, MVVM',
      'int.hw.title':       'Systems &amp; Hardware',
      'int.hw.desc':        'Arduino, ESP32, IoT, C/C++ low level',
      'int.backend.title':  'Backend &amp; APIs',
      'int.backend.desc':   'Systems architecture, REST, databases',

      // Contact
      'contact.eyebrow':   "Let's Talk",
      'contact.title':     'Contact',
      'contact.subtitle':  'Available for freelance projects, academic collaborations or professional internships. Write to me.',
      'contact.portfolio': 'View projects',

      // Portfolio page
      'pf.eyebrow':     'Work',
      'pf.title':       'Portfolio',
      'pf.sub':         'Freelance, university and personal projects. Real code, real clients, real technologies.',
      'pf.footer.note': 'Do you have a project in mind? I am available for freelance, collaborations and professional internships.',
      'pf.footer.cta':  'Contact',
    },

    es: {
      // Nav
      'nav.about':      'Sobre mí',
      'nav.stack':      'Stack',
      'nav.education':  'Formación',
      'nav.portfolio':  'Portafolio',
      'nav.contact':    'Contacto',

      // Hero
      'hero.eyebrow':       'Disponible · Guatemala',
      'hero.role.suffix':   'Estudiante de Ingeniería',
      'hero.desc':          'Construyo software funcional, optimizado y mantenible. Enfocado en desarrollo web, sistemas backend, apps móviles e IoT.',
      'hero.cta.contact':   'Contactar',
      'hero.cta.portfolio': 'Ver portafolio',
      'hero.stat.age':      'Años',
      'hero.stat.langs':    'Lenguajes',
      'hero.stat.year':     'Año UVG',

      // About
      'about.eyebrow': 'Quién soy',
      'about.title':   'Sobre mí',
      'about.p1': 'Soy estudiante de <strong>Ingeniería en Ciencia de la Computación</strong> en la Universidad del Valle de Guatemala, actualmente en tercer año. Me especializo en crear soluciones limpias, escalables y visualmente atractivas.',
      'about.p2': 'Mi enfoque es el desarrollo <strong>Full Stack</strong>: desde interfaces modernas hasta sistemas backend robustos, bases de datos relacionales y de grafos, contenedores Docker y programación de microcontroladores.',
      'about.p3': 'Me interesa profundamente la <strong>ciberseguridad</strong>, la inteligencia artificial y la arquitectura de sistemas. Trabajo de forma estructurada en sprints con gestión Jira, priorizando código limpio y mantenible.',
      'about.lang.es':              'Español',
      'about.lang.en':              'Inglés',
      'about.card.age.label':       'Edad',
      'about.card.age.value':       '20 años',
      'about.card.location.label':  'Ubicación',
      'about.card.location.value':  'Zona 10, Guatemala',
      'about.card.university.label':'Universidad',
      'about.card.university.value':'UVG — Ing. CS',
      'about.card.transport.label': 'Transporte',
      'about.card.transport.value': 'Vehículo propio',
      'about.card.billing.label':   'Facturación',
      'about.card.billing.value':   'NIT activo',
      'about.card.method.label':    'Metodología',
      'about.card.method.value':    'Agile · Jira',

      // Stack
      'stack.eyebrow':        'Herramientas',
      'stack.title':          'Tech Stack',
      'stack.cat.frontend':   'Frontend',
      'stack.cat.backend':    'Backend &amp; Lenguajes',
      'stack.cat.db':         'Bases de Datos',
      'stack.cat.devops':     'DevOps &amp; Herramientas',
      'stack.cat.iot':        'Hardware &amp; IoT',
      'stack.docker.title':   'Docker — Proyectos desplegados',
      'stack.docker.sub':     'Contenedores en producción y desarrollo',
      'stack.docker.proj1.desc': 'Portafolio web containerizado para despliegue consistente',
      'stack.docker.proj2.desc': 'App web con entorno Docker para desarrollo uniforme',
      'stack.docker.proj3.desc': 'Docker para replicar entornos de equipo de forma exacta',

      // Skills
      'skills.eyebrow': 'Nivel técnico',
      'skills.title':   'Habilidades',
      'skills.db':      'Bases de Datos',

      // Education
      'edu.eyebrow':    'Formación',
      'edu.title':      'Educación',
      'edu.uvg.degree': 'Ingeniería en Ciencia de la Computación y TI',
      'edu.uvg.date':   '2023 – Presente',
      'edu.uvg.desc':   'Actualmente en tercer año. Algoritmos, estructuras de datos, bases de datos, sistemas operativos y desarrollo de software.',
      'edu.db.degree':  'Bachiller en Ciencias y Letras — Computación',
      'edu.db.desc':    'Fundamentos de computación e introducción a la programación.',
      'edu.db.badge':   'Graduado CUM LAUDE',

      // Experience
      'exp.eyebrow':      'Trayectoria',
      'exp.title':        'Experiencia Profesional',
      'exp.museo.date':   'Abr 2025 – Oct 2025',
      'exp.museo.role':   'Guía Educativo',
      'exp.museo.desc':   'Atención a niños y padres, comunicación efectiva, creación de contenido educativo digital y actividades dinámicas. Desarrollo de habilidades de presentación y pedagogía.',
      'exp.museo.tag1':   'Comunicación',
      'exp.museo.tag2':   'Contenido Digital',
      'exp.museo.tag3':   'Educación',
      'exp.bershka.date': 'Nov 2022 – Ene 2023',
      'exp.bershka.role': 'Dependiente de Tienda',
      'exp.bershka.desc': 'Atención al cliente, apoyo en caja durante alta afluencia, control básico de inventario y organización de tienda.',
      'exp.bershka.tag1': 'Atención al cliente',
      'exp.bershka.tag2': 'Inventario',

      // Certifications
      'certs.eyebrow': 'Certificaciones',
      'certs.title':   'Cursos &amp; Certificados',
      'cert1.name':    'Ética en Investigación con Sujetos Humanos',
      'cert1.issuer':  'Universidad del Valle de Guatemala — CCSS',
      'cert1.date':    '7 de mayo de 2026 · Cód. CECCSSS 0343',
      'cert1.desc':    'Curso en línea de 8 horas organizado por el Comité de Ética de Investigación de la Facultad de Ciencias Sociales.',
      'cert2.name':    'HCI — Interacción Humano-Computadora',
      'cert2.date':    'UVG · Curso universitario',
      'cert2.desc':    'Principios de usabilidad, diseño centrado en el usuario, evaluación de interfaces y prototipado de experiencias digitales.',
      'cert3.name':    'Creación de Páginas Web — HTML, CSS, JavaScript',
      'cert3.issuer':  'INTECAP — Nivel Intermedio',
      'cert3.date':    'Certificación oficial',
      'cert3.desc':    'Certificación tras completar satisfactoriamente el programa de formación en desarrollo web. Aplicada en este portafolio.',

      // Interests
      'int.eyebrow':        'Dirección',
      'int.title':          'Áreas de interés',
      'int.cyber.title':    'Ciberseguridad',
      'int.cyber.desc':     'Seguridad ofensiva y defensiva, análisis de vulnerabilidades',
      'int.ai.title':       'Inteligencia Artificial',
      'int.ai.desc':        'Machine learning, modelos de lenguaje, automatización',
      'int.web.title':      'Desarrollo Web',
      'int.web.desc':       'Full stack moderno, APIs robustas, alta performance',
      'int.mobile.title':   'Apps Móviles',
      'int.mobile.desc':    'Android nativo con Kotlin, Jetpack Compose, MVVM',
      'int.hw.title':       'Sistemas &amp; Hardware',
      'int.hw.desc':        'Arduino, ESP32, IoT, C/C++ de bajo nivel',
      'int.backend.title':  'Backend &amp; APIs',
      'int.backend.desc':   'Arquitectura de sistemas, REST, bases de datos',

      // Contact
      'contact.eyebrow':   'Hablemos',
      'contact.title':     'Contacto',
      'contact.subtitle':  'Disponible para proyectos freelance, colaboraciones académicas o prácticas profesionales. Escríbeme.',
      'contact.portfolio': 'Ver proyectos',

      // Portfolio page
      'pf.eyebrow':     'Trabajo',
      'pf.title':       'Portafolio',
      'pf.sub':         'Proyectos freelance, universitarios y personales. Código real, clientes reales, tecnologías reales.',
      'pf.footer.note': '¿Tienes un proyecto en mente? Estoy disponible para freelance, colaboraciones y prácticas profesionales.',
      'pf.footer.cta':  'Contactar',
    }
  };

  /* ── LANGUAGE ───────────────────────────────────────────────── */

  function updateLangSlider(lang) {
    if (!langToggle || !langSlider) return;
    const activeOpt = langToggle.querySelector('.lang-opt.' + lang);
    if (!activeOpt) return;
    langSlider.style.left  = activeOpt.offsetLeft + 'px';
    langSlider.style.width = activeOpt.offsetWidth + 'px';
  }

  function applyLang(lang) {
    const dict = i18n[lang];
    if (!dict) return;

    html.setAttribute('data-lang', lang);
    html.lang = lang;
    localStorage.setItem('lang', lang);

    /* Swap text / innerHTML for every tagged element */
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key  = el.getAttribute('data-i18n');
      var text = dict[key];
      if (text === undefined) return;
      /* Use innerHTML to support <strong> in paragraph translations */
      el.innerHTML = text;
    });

    /* Update active class on lang options */
    langToggle && langToggle.querySelectorAll('.lang-opt').forEach(function(opt) {
      opt.classList.toggle('active', opt.classList.contains(lang));
    });

    /* Animate slider after a micro-tick so offsetLeft is accurate */
    requestAnimationFrame(function() { updateLangSlider(lang); });
  }

  /* Init lang from localStorage (default EN) */
  var savedLang = localStorage.getItem('lang') || 'en';
  applyLang(savedLang);

  /* Reposition slider on resize */
  window.addEventListener('resize', function() {
    updateLangSlider(html.getAttribute('data-lang') || 'en');
  }, { passive: true });

  /* Click: toggle between EN and ES */
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      var current = html.getAttribute('data-lang') || 'en';
      applyLang(current === 'en' ? 'es' : 'en');
    });
    langToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        langToggle.click();
      }
    });
  }

  /* ── THEME ───────────────────────────────────────────────────── */

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  /* Init theme from localStorage (default light) */
  var savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var current = html.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

})();
