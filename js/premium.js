/* Shared presentation controls, with no scroll interception or mandatory animation. */
(() => {
  const copy={explore:['Explora mi trabajo','Explore my work'],spotlight:['Proyecto destacado','Selected project']};
  function translate(){
    const en=document.documentElement.lang==='en';
    document.querySelectorAll('[data-premium]').forEach(el=>{const text=copy[el.dataset.premium];if(text)el.textContent=text[en?1:0];});
  }
  translate();document.addEventListener('langchange',translate);
  const links=[...document.querySelectorAll('#mainNavLinks a[href^="#"]')];
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting){
      for(const link of links){if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
    }
  },{rootMargin:'-15% 0px -55% 0px',threshold:0});
  for(const link of links){const target=document.getElementById(link.hash.slice(1));if(target)observer.observe(target);}
})();
