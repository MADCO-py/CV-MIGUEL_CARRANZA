/* Recruiter-focused copy and a readable alternative to the CRT presentation. */
(() => {
  const page = document.querySelector('.cv-page');
  if (!page) return;
  const copy = {
    heroRole:['Desarrollador<br>Full Stack <span>Junior.</span>','Full Stack<br>Developer <span>Junior.</span>'],
    heroDesc:['Construyo aplicaciones web para clientes reales: interfaces con React, backend con Node.js y datos con PostgreSQL.','I build web applications for real clients: React interfaces, Node.js backends and PostgreSQL databases.'],
    viewWork:['Ver proyectos','View projects'], interview:['Hablemos de una oportunidad ↗','Let’s discuss an opportunity ↗'], heroFit:['UVG · Cierre de tercer año','UVG · Completing my third year'],heroModes:['Remoto · Híbrido · Presencial','Remote · Hybrid · On-site'],
    summaryProjects:['Proyectos entregados a clientes','Projects delivered to clients'],summaryEducation:['Ingeniería en Computación y TI','Computer Science & IT Engineering'],summaryMorning:['Mañanas','Mornings'],summaryTime:['Disponibilidad de medio tiempo','Part-time availability'],summaryEnglish:['Inglés','English'],summaryLanguage:['Conversacional · Español nativo','Conversational · Native Spanish'],
    readingHint:['Conoce mi trabajo. Explora los detalles a tu ritmo.','Get to know my work. Explore the details at your pace.'],readingMode:['Modo lectura','Reading mode'], previousExperience:['Experiencia adicional · Comunicación y atención al cliente','Additional experience · Communication and customer service'],additionalStack:['Más herramientas y formación técnica','More tools and technical coursework'],
    catfront:['Frontend','Frontend'],catback:['Backend y datos','Backend & data'],catdeploy:['Despliegue','Deployment'],catwork:['Entorno y organización','Environment & workflow'],technicalDive:['Caso técnico · Analítica y datos en Los Skeepers','Technical case · Analytics and data at Los Skeepers'],
    aiLink:['Cómo trabajo con Codex y Claude ↗','How I work with Codex and Claude ↗'],aiEyebrow:['Forma de trabajar','How I work'],aiTitle:['IA como apoyo.<br>Criterio propio.','AI as support.<br>My own judgment.'],aiIntro:['Uso Codex y Claude como apoyo para desarrollar lógica de programación y reviso detalladamente lo que generan.','I use Codex and Claude to support programming logic development and carefully review what they generate.'],aiLogic:['Lógica primero','Logic first'],aiLogicDesc:['Trabajo sobre el problema y la lógica que necesita la solución.','I work through the problem and the logic the solution needs.'],aiAssist:['Apoyo con IA','AI assistance'],aiAssistDesc:['Me apoyo en Codex y Claude durante el desarrollo.','I use Codex and Claude as support during development.'],aiReview:['Revisión detallada','Detailed review'],aiReviewDesc:['Reviso lo generado y compruebo que responda a la lógica del proyecto.','I review generated output and check it against the project’s logic.']
  };
  const button = document.getElementById('readingToggle');
  let reading = false;
  try { reading = localStorage.getItem('cv-reading') === 'true'; } catch {}
  const applyReading = () => {
    page.dataset.reading = String(reading);
    button?.setAttribute('aria-pressed',String(reading));
  };
  button?.addEventListener('click',()=>{
    reading = !reading;
    try { localStorage.setItem('cv-reading', String(reading)); } catch {}
    applyReading();
  });
  function translate() {
    const en = document.documentElement.lang === 'en';
    document.querySelectorAll('[data-recruit]').forEach(el=>{
      const pair=copy[el.dataset.recruit];
      if(pair) el.innerHTML=pair[en?1:0];
    });
    document.title = en ? 'Miguel Carranza — Junior Full Stack Developer' : 'Miguel Carranza — Desarrollador Full Stack Junior';
    button?.setAttribute('aria-label',en?'Reading mode':'Modo lectura');
  }
  // Native disclosure keeps supplementary work available. Deep links open its ancestors.
  function revealHash() {
    const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    for (let el=target.parentElement;el;el=el.parentElement) if(el.tagName==='DETAILS') el.open=true;
  }
  window.addEventListener('hashchange',revealHash);
  document.addEventListener('langchange',translate);
  applyReading();translate();revealHash();
})();
