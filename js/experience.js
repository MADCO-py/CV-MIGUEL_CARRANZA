/* Selected university coursework, clearly separated from certifications. */
(() => {
  'use strict';
  const grid = document.getElementById('courseGrid');
  const evidence = document.getElementById('courseEvidence');
  if (!grid || !evidence) return;
  const L = (es,en) => SITE.lang() === 'es' ? es : en;
  const E = SITE.esc;
  const texts = {
    craft:['De la interfaz al despliegue.','From interface to deployment.'], availability:['DISPONIBILIDAD','AVAILABILITY'], morning:['Medio tiempo · Mañanas','Part time · Mornings'], modes:['Remoto · Híbrido · Presencial','Remote · Hybrid · On-site'],
    courseEyebrow:['DE LA UNIVERSIDAD AL PRODUCTO','FROM UNIVERSITY TO PRODUCT'], courseTitle:['Lo que estudio. Lo que aplico.','What I study. What I build.'], courseIntro:['Una selección de mi formación en UVG. Elige un curso para ver su relación con mi trabajo.','Selected coursework at UVG. Choose a course to explore its connection with my work.']
  };
  const courses = [
    {code:'SQL',name:['Bases de Datos 1','Databases 1'],status:['Cursada · 2026','Taken · 2026'],heading:['De los modelos a los datos reales.','From models to real data.'],desc:['Formación en bases de datos relacionales. En Los Skeepers modelé 18 tablas en PostgreSQL y desarrollé consultas, analítica y reportes para el cliente.','Relational database coursework. For Los Skeepers I modeled 18 PostgreSQL tables and built queries, analytics and client reports.'],proof:['Los Skeepers · 18 tablas, 35 consultas SQL','Los Skeepers · 18 tables, 35 SQL queries'],link:'pages/portafolio.html#los-skeepers'},
    {code:'WEB',name:['Sistemas y Tecnologías Web','Web Systems and Technologies'],status:['Cursada · 2026','Taken · 2026'],heading:['De una interfaz a un sitio publicado.','From an interface to a published site.'],desc:['Formación universitaria en desarrollo web. En The Sunset Sessions construí una interfaz con React y publiqué el sitio en GitHub Pages.','University coursework in web development. For The Sunset Sessions I built a React interface and published the site on GitHub Pages.'],proof:['The Sunset Sessions · React + publicación','The Sunset Sessions · React + deployment'],link:'pages/portafolio.html#sunset-sessions'},
    {code:'ADS',name:['Algoritmos y Estructuras de Datos','Algorithms and Data Structures'],status:['Cursada · 2025','Taken · 2025'],heading:['Una base para resolver problemas.','A foundation for solving problems.'],desc:['Parte de mi formación en organización de datos y resolución de problemas mediante programación. Complementa mi experiencia práctica desarrollando aplicaciones.','Coursework in organizing data and solving problems through programming. It complements my practical experience developing applications.'],proof:['Explorar mis herramientas de desarrollo','Explore my development tools'],link:'#stack'},
    {code:'SWE',name:['Ingeniería de Software 1 y 2','Software Engineering 1 and 2'],status:['IS 1 cursada · IS 2 en curso','SE 1 taken · SE 2 in progress'],heading:['Construir también es organizar.','Building also means organizing.'],desc:['Ingeniería de Software 1 cursada; Ingeniería de Software 2 en curso. En mis proyectos trabajo por sprints con Jira, desde los requerimientos hasta la entrega.','Software Engineering 1 taken; Software Engineering 2 in progress. In my projects I work in sprints with Jira, from requirements through delivery.'],proof:['FleetControl · sistema entregado a un cliente','FleetControl · system delivered to a client'],link:'pages/portafolio.html#fleetcontrol'},
    {code:'OOP',name:['Programación Orientada a Objetos','Object-Oriented Programming'],status:['Cursada · 2024','Taken · 2024'],heading:['Estructura antes de complejidad.','Structure before complexity.'],desc:['Formación en programación orientada a objetos, dentro de mi preparación en ingeniería. Mi perfil también incluye Java, Kotlin y desarrollo de aplicaciones móviles.','Object-oriented programming coursework as part of my engineering studies. My background also includes Java, Kotlin and mobile application development.'],proof:['Explorar proyectos universitarios y personales','Explore university and personal projects'],link:'pages/portafolio.html'},
    {code:'HCI',name:['Interacción Humano-Computadora','Human–Computer Interaction'],status:['Cursada · 2026','Taken · 2026'],heading:['Una interfaz tiene que poder usarse.','An interface needs to be usable.'],desc:['Formación universitaria en interacción humano-computadora y usabilidad. Este portafolio permite explorar proyectos con teclado, en celular y con movimiento reducido.','University coursework in human–computer interaction and usability. This portfolio supports keyboard navigation, mobile screens and reduced motion.'],proof:['Probar el laboratorio interactivo','Try the interactive lab'],link:'#lab'}
  ];
  let selected=0;
  function renderEvidence() {
    const c=courses[selected];
    evidence.innerHTML=`<div><h4>${E(L(...c.heading))}</h4><p>${E(L(...c.desc))}</p></div><div class="evidence-link"><span>${L('EXPLORA LA RELACIÓN','EXPLORE THE CONNECTION')}</span><a href="${E(c.link)}">${E(L(...c.proof))} ↗</a></div>`;
    grid.querySelectorAll('[data-course]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.course)===selected)));
  }
  function render() {
    document.querySelectorAll('[data-experience]').forEach(el=>{const t=texts[el.dataset.experience];if(t)el.textContent=L(...t);});
    grid.innerHTML=courses.map((c,i)=>`<button type="button" class="course-button" data-course="${i}" aria-pressed="${i===selected}" aria-controls="courseEvidence"><span class="course-code" aria-hidden="true">${c.code}</span><span><strong>${E(L(...c.name))}</strong><small>${E(L(...c.status))}</small></span></button>`).join('');
    renderEvidence();
  }
  grid.addEventListener('click',e=>{const button=e.target.closest('[data-course]');if(!button)return;selected=Number(button.dataset.course);renderEvidence();});
  document.addEventListener('langchange',render);
  render();
})();
