/* Keyboard-friendly workstation navigation. No simulated security claims or boot gate. */
(() => {
  'use strict';
  const menu = document.getElementById('terminalMenu');
  const toggle = document.getElementById('crtToggle');
  const L = (es,en) => SITE.lang() === 'es' ? es : en;
  const text = {
    profile:['Full Stack Junior / UVG','Junior Full Stack / UVG'],ready:['DISPONIBLE · MAÑANAS','AVAILABLE · MORNINGS'],projects:['EXPLORAR PROYECTOS','EXPLORE PROJECTS'],experience:['VER EXPERIENCIA','VIEW EXPERIENCE'],education:['FORMACIÓN Y CURSOS','EDUCATION & COURSES'],lab:['ABRIR LABORATORIO','OPEN LAB'],cv:['DESCARGAR CV.PDF','DOWNLOAD CV.PDF'],contact:['INICIAR CONTACTO','GET IN TOUCH'],keys:['↑ ↓ ELEGIR · ENTER ABRIR · TAB NAVEGAR','↑ ↓ SELECT · ENTER OPEN · TAB NAVIGATE'],mode:['REMOTO / HÍBRIDO / PRESENCIAL','REMOTE / HYBRID / ON-SITE'],system:['SISTEMA LISTO','SYSTEM READY']
  };
  let crt = true;
  try { crt=localStorage.getItem('mc-crt')!=='off'; } catch (_) { /* Preference is optional. */ }
  document.documentElement.dataset.crt=crt?'on':'off';
  if (!menu || !toggle) return;
  const links=[...menu.querySelectorAll('a')];
  let selected=0;
  function select(i) { selected=i;links.forEach((a,j)=>a.classList.toggle('selected',j===i)); }
  links.forEach((a,i)=>{
    a.addEventListener('focus',()=>select(i));
    a.addEventListener('pointerenter',()=>select(i));
  });
  menu.addEventListener('keydown',e=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
    e.preventDefault();
    const i=e.key==='Home'?0:e.key==='End'?links.length-1:(selected+(e.key==='ArrowDown'?1:links.length-1))%links.length;
    select(i);links[i].focus({preventScroll:true});
  });
  function render() {
    document.querySelectorAll('[data-retro]').forEach(el=>{const t=text[el.dataset.retro];if(t)el.textContent=L(...t);});
    toggle.textContent=`CRT: ${crt?'ON':'OFF'}`;
    toggle.setAttribute('aria-pressed',String(crt));
    toggle.setAttribute('aria-label',L('Textura de pantalla CRT','CRT screen texture'));
    document.documentElement.dataset.crt=crt?'on':'off';
    menu.setAttribute('aria-label',L('Menú de terminal','Terminal menu'));
  }
  toggle.addEventListener('click',()=>{crt=!crt;try{localStorage.setItem('mc-crt',crt?'on':'off');}catch(_){}render();});
  document.addEventListener('langchange',render);
  select(0);render();
})();
