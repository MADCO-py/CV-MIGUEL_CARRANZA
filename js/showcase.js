/* A working portfolio: six small, local demonstrations. No dependencies. */
(() => {
  'use strict';
  const panel = document.getElementById('labPanel');
  if (!panel) return;
  const $ = s => panel.querySelector(s);
  const L = (es, en) => SITE.lang() === 'es' ? es : en;
  const esc = SITE.esc;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const words = {
    nav:['Laboratorio','Lab'], manifesto:['De una idea a algo que funciona.','From an idea to something that works.'],
    tryLab:['Pruébalo en vivo','Try it live'], buildLabel:['DE LA IDEA AL PRODUCTO','FROM IDEA TO PRODUCT'],
    buildPerson:['Desarrollo de principio a fin.','Development from start to finish.'], buildNote:['Interactúa con las capas. Esto también es código.','Explore the layers. This is code, too.'],
    labEyebrow:['EL CV TAMBIÉN PUEDE SER UNA EXPERIENCIA','A RÉSUMÉ CAN BE AN EXPERIENCE, TOO'],
    labTitle:['No solo lo cuento.<br><span>También lo construyo.</span>','More than words.<br><span>Working software.</span>'],
    labIntro:['«Todo lo que te imagines puede llegar a ser programado». La idea de MADWEB, convertida en seis demos que puedes probar aquí mismo.','“Anything you can imagine can be programmed.” The idea behind MADWEB, turned into six demos you can try right here.'],
    local:['EN TU NAVEGADOR','IN YOUR BROWSER'], labFooter:['Demos locales. Sin registros ni datos enviados.','Local demos. No sign-up or data sent.'],
    madwebLink:['Explora más experimentos en MADWEB','Explore more experiments in MADWEB'], native:['Nativo','Native'], conversational:['Conversacional','Conversational']
  };
  const titles = [['Interfaces','Interfaces'],['Datos','Data'],['Automatización','Automation'],['Tablero','Board'],['Terminal','Terminal'],['Interacción','Interaction']];
  const copies = [
    [['Diseñar. Ajustar. Sentir.','Design. Adjust. Feel.'],['Una interfaz cambia la forma de usar un producto. Personaliza esta tarjeta: cada ajuste se refleja al instante.','An interface changes how a product feels. Customize this card: every adjustment appears instantly.'],'los-skeepers'],
    [['Los datos cuentan algo.','Data tells a story.'],['Cambia el período y explora cada barra. Una pequeña muestra de cómo convierto números en una interfaz útil.','Change the period and explore each bar. A small example of turning numbers into a useful interface.'],'los-skeepers'],
    [['Menos pasos manuales.','Fewer manual steps.'],['Un flujo ordenado convierte eventos en información. Ejecuta esta simulación y sigue cada paso del proceso.','A structured workflow turns events into information. Run this simulation and follow each step.'],'fleetcontrol'],
    [['El estado importa.','State matters.'],['Agrega una tarea, muévela y vuelve después. El tablero recuerda los cambios en este navegador. Arrastra o usa las flechas.','Add a task, move it and return later. This board remembers changes in this browser. Drag cards or use the arrows.'],'fleetcontrol'],
    [['Una entrada. Varias rutas.','One input. Many routes.'],['Explora mi perfil con comandos. Es una interfaz de demostración: solo reconoce las opciones de ayuda.','Explore my profile with commands. This is a demo interface: it only recognizes the commands in help.'],null],
    [['Código que responde.','Code that responds.'],['Mueve el cursor o toca el lienzo. Las partículas reaccionan y se conectan. También puedes pausar la animación.','Move your cursor or touch the canvas. Particles respond and connect. You can also pause the animation.'],'madweb']
  ];
  let active = 0;
  let layer = 0;
  let dispose = () => {};
  function copy(i, stage) {
    const c = copies[i];
    const project = PROJECTS.find(p => p.id === c[2]);
    return `<div class="demo-layout"><div class="demo-copy"><span class="mono-label">0${i+1} / ${L('PRUEBA EN VIVO','LIVE DEMO')}</span><h3>${L(...c[0])}</h3><p>${L(...c[1])}</p>${project ? `<a class="demo-evidence" href="pages/portafolio.html#${esc(project.id)}">${L('Del experimento al proyecto','From experiment to project')}: ${esc(project.name)} ↗</a>` : ''}</div><div class="demo-stage ${i === 4 ? 'terminal-demo' : i === 5 ? 'canvas-stage' : ''}">${stage}</div></div>`;
  }
  function interfaceDemo() {
    panel.innerHTML = copy(0, `<div class="ui-preview"><small>COMPONENT / 001</small><h4>${L('Una idea, tu estilo.','An idea, your style.')}</h4><p>${L('Una interfaz simple. Un sistema de diseño flexible.','A simple interface. A flexible design system.')}</p><button type="button" id="previewAction">${L('Probar interacción','Try interaction')} ↗</button></div><span class="demo-label">${L('Color de acento','Accent color')}</span><div class="demo-colors">${['#1863ec','#6441a5','#18734c','#aa3d46'].map((c,i)=>`<button type="button" style="--swatch:${c}" data-color="${c}" aria-label="${L('Color','Color')} ${['azul / blue','violeta / purple','verde / green','rojo / red'][i]}" aria-pressed="${i===0}"></button>`).join('')}</div><label class="demo-label" for="radiusControl">${L('Radio de las esquinas','Corner radius')} <output id="radiusOutput">12 px</output></label><input id="radiusControl" class="demo-range" type="range" min="0" max="30" value="12"><div class="ui-code" aria-live="polite">border-radius: <span id="radiusCode">12px</span>;</div>`);
    $('#radiusControl').oninput = e => {
      $('.ui-preview').style.setProperty('--demo-radius', `${e.target.value}px`);
      $('#radiusOutput').textContent = `${e.target.value} px`;
      $('#radiusCode').textContent = `${e.target.value}px`;
    };
    panel.querySelectorAll('[data-color]').forEach(b => b.onclick = () => {
      $('.ui-preview').style.setProperty('--demo-accent', b.dataset.color);
      panel.querySelectorAll('[data-color]').forEach(s=>s.setAttribute('aria-pressed',String(s===b)));
    });
    let clicks = 0;
    $('#previewAction').onclick = e => { e.target.textContent = `${L('Interacciones','Interactions')}: ${++clicks} ✓`; };
  }
  function dataDemo() {
    panel.innerHTML = copy(1, `<div class="chart-toolbar"><strong>${L('Visitas de ejemplo','Sample visits')}</strong><select id="periodControl" aria-label="${L('Período','Period')}"><option value="1">${L('Esta semana','This week')}</option><option value="4">${L('Este mes','This month')}</option><option value="12">${L('Este trimestre','This quarter')}</option></select></div><div class="chart-total" id="chartTotal"></div><div class="chart-caption">${L('Datos simulados · no son métricas de clientes','Simulated data · not client metrics')}</div><div class="demo-chart" id="demoChart"></div><p class="chart-detail" id="chartDetail" aria-live="polite">${L('Selecciona una barra para explorar.','Select a bar to explore.')}</p>`);
    const days = L(['L','M','X','J','V','S','D'],['M','T','W','T','F','S','S']);
    function draw() {
      const values = [38,65,52,91,73,122,104].map((v,i) => v * Number($('#periodControl').value) + i * (Number($('#periodControl').value)-1));
      $('#chartTotal').textContent = values.reduce((a,b)=>a+b,0).toLocaleString(SITE.lang());
      $('#demoChart').innerHTML = values.map((v,i)=>`<button type="button" style="--bar:${v/Math.max(...values)*100}%" data-day="${days[i]}" aria-label="${L('Día','Day')} ${i+1}: ${v} ${L('visitas','visits')}" data-value="${v}" data-index="${i}"></button>`).join('');
      $('#chartDetail').textContent = L('Selecciona una barra para explorar.','Select a bar to explore.');
      panel.querySelectorAll('[data-value]').forEach(b => b.onclick = () => { $('#chartDetail').textContent = `${L('Día','Day')} ${Number(b.dataset.index)+1} → ${b.dataset.value} ${L('visitas de ejemplo','sample visits')}`; });
    }
    $('#periodControl').onchange = draw;
    draw();
  }
  function automationDemo() {
    const steps = L(['Recibir','Validar','Agrupar','Reportar'],['Receive','Validate','Aggregate','Report']);
    panel.innerHTML = copy(2, `<span class="mono-label">PIPELINE / LOCAL SIMULATION</span><div class="flow-nodes">${steps.map((s,i)=>`${i?'<span class="flow-arrow" aria-hidden="true">→</span>':''}<div class="flow-node"><b>0${i+1}</b>${s}</div>`).join('')}</div><div class="flow-log" role="status">${L('Listo para procesar 120 eventos de ejemplo.','Ready to process 120 sample events.')}</div><div class="demo-controls"><button type="button" class="demo-btn" id="runFlow">${L('Ejecutar flujo','Run workflow')} ↗</button><span class="demo-note">${L('Simulación, sin conexión a un servidor.','Simulation, no server connection.')}</span></div>`);
    const timers = [];
    $('#runFlow').onclick = () => {
      const nodes = [...panel.querySelectorAll('.flow-node')];
      nodes.forEach(n=>n.className='flow-node');
      $('#runFlow').disabled = true;
      const lines = L(['120 eventos recibidos.','120 eventos válidos.','7 grupos diarios calculados.','Reporte preparado. 4 pasos completados.'],['120 events received.','120 valid events.','7 daily groups calculated.','Report ready. 4 steps completed.']);
      const next = i => {
        if(i===4) { $('#runFlow').disabled=false; return; }
        nodes[i].classList.add('running');
        $('.flow-log').textContent = `${steps[i]}…`;
        timers.push(setTimeout(()=>{ nodes[i].classList.replace('running','done'); $('.flow-log').textContent=lines.slice(0,i+1).map((s,j)=>`0${j+1} ✓ ${s}`).join('\n'); if(i<3) timers.push(setTimeout(()=>next(i+1),250)); else $('#runFlow').disabled=false; }, reduced.matches?100:650));
      };
      next(0);
    };
    dispose = () => timers.forEach(clearTimeout);
  }
  const boardKey = 'mc-lab-board-v1';
  const initialTasks = () => [{id:'a',text:L('Diseñar interfaz','Design interface'),column:0},{id:'b',text:L('Conectar datos','Connect data'),column:1},{id:'c',text:L('Definir alcance','Define scope'),column:2}];
  function boardDemo() {
    let tasks;
    try { tasks = JSON.parse(localStorage.getItem(boardKey)); } catch (_) { /* Private storage or invalid JSON: use defaults. */ }
    if(!Array.isArray(tasks) || tasks.length>12 || !tasks.every(t=>t && typeof t.id==='string' && typeof t.text==='string' && t.text.length<=80 && Number.isInteger(t.column) && t.column>=0 && t.column<3)) tasks=initialTasks();
    panel.innerHTML = copy(3, `<div class="demo-board" id="demoBoard"></div><form class="task-form"><input id="newTask" maxlength="80" required placeholder="${L('Una nueva tarea…','A new task…')}" aria-label="${L('Nueva tarea','New task')}"><button type="submit" class="demo-btn">+</button></form><div class="demo-controls"><button type="button" id="resetBoard" class="demo-btn secondary">${L('Reiniciar','Reset')}</button><span class="demo-note" role="status" id="boardStatus">${L('Guardado solo en este navegador.','Saved only in this browser.')}</span></div>`);
    $('.task-form button').setAttribute('aria-label',L('Agregar tarea','Add task'));
    const columns = L(['Pendiente','En curso','Listo'],['To do','In progress','Done']);
    function save() { try { localStorage.setItem(boardKey,JSON.stringify(tasks)); } catch (_) { $('#boardStatus').textContent=L('Almacenamiento no disponible; cambios solo en esta sesión.','Storage unavailable; changes last for this session.'); } }
    function move(id,column) {
      const task=tasks.find(t=>t.id===id);
      if(!task) return;
      task.column=column; save(); draw();
      $('#boardStatus').textContent=`${task.text} → ${columns[column]}`;
      const moved=[...panel.querySelectorAll('.task button')].find(b=>b.dataset.id===id);
      if(moved) moved.focus();
    }
    function draw() {
      $('#demoBoard').innerHTML=columns.map((name,column)=>`<div class="board-column" data-column="${column}"><h4>${name} <span>${tasks.filter(t=>t.column===column).length}</span></h4>${tasks.filter(t=>t.column===column).map(t=>`<div class="task" draggable="true" data-task="${esc(t.id)}"><span>${esc(t.text)}</span><button type="button" data-id="${esc(t.id)}" data-next="${(column+1)%3}" aria-label="${esc(t.text)}: ${L('mover a','move to')} ${columns[(column+1)%3]}">→</button></div>`).join('')}</div>`).join('');
      panel.querySelectorAll('.task button').forEach(b=>b.onclick=()=>move(b.dataset.id,Number(b.dataset.next)));
      panel.querySelectorAll('[data-task]').forEach(t=>t.ondragstart=e=>{e.dataTransfer.setData('text/plain',t.dataset.task); e.dataTransfer.effectAllowed='move';});
      panel.querySelectorAll('[data-column]').forEach(c=>{
        c.ondragover=e=>e.preventDefault();
        c.ondrop=e=>{e.preventDefault();move(e.dataTransfer.getData('text/plain'),Number(c.dataset.column));};
      });
    }
    $('.task-form').onsubmit=e=>{
      e.preventDefault();
      const text=$('#newTask').value.trim();
      if(!text) return;
      if(tasks.length>=12) { $('#boardStatus').textContent=L('Máximo 12 tareas en esta demo.','Maximum 12 tasks in this demo.'); return; }
      tasks.push({id:`t${Date.now()}${Math.random().toString(36).slice(2,6)}`,text,column:0}); save(); draw(); $('#newTask').value=''; $('#boardStatus').textContent=L('Tarea agregada.','Task added.');
    };
    $('#resetBoard').onclick=()=>{tasks=initialTasks();save();draw();$('#boardStatus').textContent=L('Tablero reiniciado.','Board reset.');};
    draw();
  }
  function terminalDemo() {
    panel.innerHTML=copy(4, `<div class="terminal-top">miguel@ubuntu:~</div><div class="terminal-output" role="log" aria-live="polite"></div><form class="terminal-line"><span aria-hidden="true">❯</span><input aria-label="${L('Comando de terminal','Terminal command')}" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="help" maxlength="80"></form><div class="terminal-commands">${['help','about','stack','projects','cv'].map(c=>`<button type="button" data-command="${c}">${c}</button>`).join('')}</div>`);
    const output=$('.terminal-output');
    function line(text, link) {
      const p=document.createElement('p'); p.textContent=text;
      if(link) { const a=document.createElement('a'); a.href=link; a.textContent=' ↗'; a.style.textDecoration='underline'; p.append(a); }
      output.append(p); while(output.children.length>24) output.firstElementChild.remove(); output.scrollTop=output.scrollHeight;
    }
    function run(command) {
      const cmd=command.trim().toLowerCase(); if(!cmd)return;
      line(`❯ ${command}`);
      switch(cmd) {
        case 'help':line('help · about · stack · projects · cv · contact · clear');break;
        case 'about':line(L('Miguel Carranza / Full Stack Junior / UVG, cierre de tercer año. Medio tiempo por las mañanas.','Miguel Carranza / Junior Full Stack / UVG, finishing year three. Part-time mornings.'));break;
        case 'stack':line('React · Node.js · Express · PostgreSQL · Docker · Git');break;
        case 'projects':line('Los Skeepers · FleetControl · The Sunset Sessions','pages/portafolio.html');break;
        case 'cv':line(L('Abrir CV en PDF','Open PDF résumé'),'cv/Miguel_Carranza_CV.pdf?v=a45138de0c13');break;
        case 'contact':line('madcarranzaosorio@gmail.com','mailto:madcarranzaosorio@gmail.com');break;
        case 'clear':output.replaceChildren();break;
        default:line(L('Comando no disponible. Escribe help.','Command unavailable. Type help.'));
      }
    }
    line(L('Bienvenido. Escribe help para explorar.','Welcome. Type help to explore.'));
    $('.terminal-line').onsubmit=e=>{e.preventDefault();run($('.terminal-line input').value);$('.terminal-line input').value='';};
    panel.querySelectorAll('[data-command]').forEach(b=>b.onclick=()=>run(b.dataset.command));
  }
  function canvasDemo() {
    panel.innerHTML=copy(5, `<canvas aria-label="${L('Red de partículas interactiva. Efecto visual decorativo.','Interactive particle network. Decorative visual effect.')}">${L('Red de puntos conectados que responde al movimiento.','A connected network of points that responds to movement.')}</canvas><span class="canvas-label">CANVAS / GENERATIVE NETWORK</span><button type="button" class="canvas-toggle"></button>`);
    const canvas=$('canvas'), stage=$('.canvas-stage'), button=$('.canvas-toggle'), ctx=canvas.getContext('2d');
    if(!ctx)return;
    let width=1,height=320,points=[],frame=0,visible=false,paused=reduced.matches,dead=false;
    const pointer={x:-1000,y:-1000};
    const label=()=>{button.textContent=paused?L('Reproducir','Play'):L('Pausar','Pause');button.setAttribute('aria-pressed',String(!paused));};
    function paint() {
      ctx.clearRect(0,0,width,height);
      const dark=document.documentElement.dataset.theme==='dark';
      const color=dark?'255,173,139':'238,134,91';
      for(const p of points) {
        if(!paused) {
          p.x+=p.vx;p.y+=p.vy;
          const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);
          if(d<95&&d>0){p.x+=dx/d*1.7;p.y+=dy/d*1.7;}
          if(p.x<8||p.x>width-8)p.vx*=-1;
          if(p.y<8||p.y>height-8)p.vy*=-1;
          p.x=Math.max(8,Math.min(width-8,p.x));p.y=Math.max(8,Math.min(height-8,p.y));
        }
        ctx.beginPath();ctx.arc(p.x,p.y,2.3,0,Math.PI*2);ctx.fillStyle=`rgba(${color},.85)`;ctx.fill();
      }
      points.forEach((p,i)=>points.slice(i+1).forEach(q=>{
        const d=Math.hypot(p.x-q.x,p.y-q.y);if(d>100)return;
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(${color},${(1-d/100)*.3})`;ctx.stroke();
      }));
    }
    function loop(){frame=0;if(dead||paused||!visible||document.hidden)return;paint();frame=requestAnimationFrame(loop);}
    function sync(){cancelAnimationFrame(frame);frame=0;paint();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(loop);}
    function resize(){width=Math.max(1,stage.clientWidth);height=320;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:width<400?28:42},()=>({x:8+Math.random()*(width-16),y:8+Math.random()*(height-16),vx:(Math.random()-.5)*.55,vy:(Math.random()-.5)*.55}));paint();}
    const ro=new ResizeObserver(resize);ro.observe(stage);
    const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();});io.observe(canvas);
    const onPointer=e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;};
    canvas.addEventListener('pointermove',onPointer);canvas.addEventListener('pointerdown',onPointer);
    canvas.onpointerleave=()=>{pointer.x=pointer.y=-1000;};
    button.onclick=()=>{paused=!paused;label();sync();};
    document.addEventListener('visibilitychange',sync);
    const themeObserver=new MutationObserver(()=>paint());themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    const motion=()=>{if(reduced.matches){paused=true;label();sync();}};reduced.addEventListener('change',motion);
    label();resize();
    dispose=()=>{dead=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();themeObserver.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',motion);};
  }
  const demos=[interfaceDemo,dataDemo,automationDemo,boardDemo,terminalDemo,canvasDemo];
  function render() {
    dispose();dispose=()=>{};
    document.querySelectorAll('[data-demo-text]').forEach(el=>{const pair=words[el.dataset.demoText];if(pair)el.innerHTML=L(...pair);});
    const tabs=document.getElementById('labTabs');
    tabs.innerHTML=titles.map((t,i)=>`<button type="button" role="tab" id="demoTab${i}" aria-controls="labPanel" aria-selected="${i===active}" tabindex="${i===active?0:-1}" data-demo="${i}"><span>0${i+1}</span>${L(...t)}</button>`).join('');
    panel.setAttribute('aria-labelledby',`demoTab${active}`);
    document.getElementById('labPath').textContent=['interface','data','pipeline','state','terminal','canvas'][active];
    document.getElementById('demoCount').textContent=`0${active+1} / 06`;
    demos[active]();updateLayer();
  }
  document.getElementById('labTabs').onclick=e=>{const b=e.target.closest('[data-demo]');if(!b)return;active=Number(b.dataset.demo);render();document.getElementById(`demoTab${active}`).focus({preventScroll:true});};
  document.getElementById('labTabs').onkeydown=e=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
    e.preventDefault();active=e.key==='Home'?0:e.key==='End'?5:(active+(e.key==='ArrowRight'?1:5))%6;render();document.getElementById(`demoTab${active}`).focus({preventScroll:true});
  };
  function updateLayer(){
    const explanations=[
      ['La interfaz: componentes, estados y una experiencia que funciona en cualquier pantalla.','The interface: components, states and an experience that works on every screen.'],
      ['La lógica: reglas de negocio, APIs y procesos que conectan el producto.','The logic: business rules, APIs and processes that connect a product.'],
      ['Los datos: modelos relacionales, consultas y reportes para tomar decisiones.','The data: relational models, queries and reports that support decisions.']
    ];
    document.querySelectorAll('[data-layer]').forEach(b=>{b.classList.toggle('is-active',Number(b.dataset.layer)===layer);b.setAttribute('aria-pressed',String(Number(b.dataset.layer)===layer));});
    document.getElementById('buildExplanation').textContent=L(...explanations[layer]);
    document.querySelector('.build-counter').textContent=`0${layer+1} — 03`;
  }
  document.querySelectorAll('[data-layer]').forEach(b=>b.onclick=()=>{layer=Number(b.dataset.layer);updateLayer();});
  document.getElementById('featuredList').addEventListener('click',e=>{
    const button=e.target.closest('.featured-build-title');if(!button)return;
    const card=button.closest('.featured-card');card.classList.toggle('expanded');button.setAttribute('aria-expanded',String(card.classList.contains('expanded')));
  });
  let scrollFrame=0;
  function progress(){scrollFrame=0;const total=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--read',`${total>0?Math.min(100,scrollY/total*100):0}%`);}
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(progress);},{passive:true});
  addEventListener('resize',progress,{passive:true});
  document.addEventListener('langchange',render);
  render();progress();
})();
