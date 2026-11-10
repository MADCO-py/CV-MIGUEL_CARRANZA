import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Square, X, Terminal, FolderCode, FileDown, GraduationCap, CornerDownLeft, Keyboard, CircleHelp, ArrowUpRight } from 'lucide-react';
import { PixelGlobe } from './PixelGlobe.jsx';

const PDF = document.querySelector('#download a[download]')?.getAttribute('href') || 'cv/Miguel_Carranza_CV.pdf';
function useLanguage() {
  const read=()=>document.documentElement.dataset.lang==='en'?'en':'es';
  const [lang,setLang]=useState(read);
  useEffect(()=>{const changed=()=>setLang(read());document.addEventListener('langchange',changed);return()=>document.removeEventListener('langchange',changed);},[]);
  return (es,en)=>lang==='es'?es:en;
}
function SystemClock(){
  const [now,setNow]=useState(()=>new Date());
  useEffect(()=>{let id;const sync=()=>{clearInterval(id);if(!document.hidden){setNow(new Date());id=setInterval(()=>setNow(new Date()),1000);}};sync();document.addEventListener('visibilitychange',sync);return()=>{clearInterval(id);document.removeEventListener('visibilitychange',sync);};},[]);
  return <time dateTime={now.toISOString()}>{new Intl.DateTimeFormat('en-GB',{timeZone:'America/Guatemala',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now)} <span>GTM</span></time>;
}
function VirtualKeyboard({onKey,L}){
  return <div className="pc-keyboard" aria-label={L('Teclado virtual','Virtual keyboard')}>
    {['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'].map(row=><div className="pc-key-row" key={row}>{[...row].map(key=><button key={key} type="button" onClick={()=>onKey(key.toLowerCase())}>{key}</button>)}</div>)}
    <div className="pc-key-row"><button type="button" onClick={()=>onKey('Backspace')} aria-label={L('Borrar carácter','Delete character')}>⌫</button><button className="space-key" type="button" onClick={()=>onKey(' ')} aria-label={L('Espacio','Space')}>SPACE</button><button type="button" onClick={()=>onKey('Enter')}>↵</button></div>
  </div>;
}
export function RetroDesktop(){
  const L=useLanguage();
  const [view,setView]=useState('explore');
  const [minimized,setMinimized]=useState(false);
  const [closed,setClosed]=useState(false);
  const [maximized,setMaximized]=useState(false);
  const [help,setHelp]=useState(false);
  const [selected,setSelected]=useState(0);
  const [command,setCommand]=useState('');
  const [lines,setLines]=useState([]);
  const [keyboard,setKeyboard]=useState(false);
  const [crt,setCrt]=useState(()=>{try{return localStorage.getItem('mc-crt')!=='off';}catch{return true;}});
  const menuRef=useRef(null), modalRef=useRef(null), maximizeRef=useRef(null), openRef=useRef(null), inputRef=useRef(null), logRef=useRef(null);
  const items=[
    {href:'#featured',es:'PROYECTOS',en:'PROJECTS',icon:FolderCode},
    {href:'#experience',es:'EXPERIENCIA',en:'EXPERIENCE',icon:Terminal},
    {href:'#education',es:'FORMACIÓN Y CURSOS',en:'EDUCATION & COURSES',icon:GraduationCap},
    {href:'#lab',es:'LABORATORIO',en:'LAB',icon:Terminal},
    {href:PDF,es:'DESCARGAR CV.PDF',en:'DOWNLOAD CV.PDF',icon:FileDown,download:true},
    {href:'#contact',es:'CONTACTO',en:'CONTACT',icon:ArrowUpRight}
  ];
  useEffect(()=>{document.documentElement.dataset.crt=crt?'on':'off';try{localStorage.setItem('mc-crt',crt?'on':'off');}catch{}},[crt]);
  useEffect(()=>{if(logRef.current)logRef.current.scrollTop=logRef.current.scrollHeight;},[lines]);
  useEffect(()=>{if(closed)openRef.current?.focus();},[closed]);
  useEffect(()=>{
    if(!maximized)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    maximizeRef.current?.focus();
    const key=e=>{
      if(e.key==='Escape'){e.preventDefault();setMaximized(false);requestAnimationFrame(()=>maximizeRef.current?.focus());}
      if(e.key!=='Tab')return;
      const nodes=[...modalRef.current.querySelectorAll('a[href],button:not([disabled]),input')].filter(n=>n.getClientRects().length);
      const first=nodes[0],last=nodes.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    };
    document.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',key);};
  },[maximized]);
  const restore=()=>{setClosed(false);setMinimized(false);};
  const toggleMax=()=>{setMaximized(v=>!v);setMinimized(false);requestAnimationFrame(()=>maximizeRef.current?.focus());};
  const navigate=href=>{setMaximized(false);location.hash=href;};
  function append(text,href){setLines(old=>[...old,{text,href}].slice(-24));}
  function run(value){
    const cmd=value.trim().toLowerCase();if(!cmd)return;
    setCommand('');
    if(cmd==='clear'){setLines([]);return;}
    append(`miguel@portfolio:~$ ${value}`);
    switch(cmd){
      case 'help':append('help · whoami · stack · projects · education · experience · contact · cv · clear');break;
      case 'whoami':append(L('Miguel Carranza / Full Stack Junior / cierre de tercer año en UVG. Medio tiempo por las mañanas.','Miguel Carranza / Junior Full Stack / finishing year three at UVG. Part-time mornings.'));break;
      case 'stack':append('React · Node.js · PostgreSQL · Docker · Git');break;
      case 'ls':case 'projects':append('Los Skeepers · FleetControl · The Sunset Sessions','#featured');break;
      case 'education':append(L('UVG / bases de datos, web, algoritmos, POO e ingeniería de software.','UVG / databases, web, algorithms, OOP and software engineering.'),'#education');break;
      case 'experience':append(L('Proyectos freelance y experiencia profesional.','Freelance projects and professional experience.'),'#experience');break;
      case 'contact':append('madcarranzaosorio@gmail.com','#contact');break;
      case 'cv':append(L('Abrir el CV actualizado en PDF.','Open the current PDF résumé.'),PDF);break;
      default:append(L('Comando no disponible. Escribe help.','Command unavailable. Type help.'));
    }
  }
  function menuKey(e){
    if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
    e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:(selected+(e.key==='ArrowDown'?1:items.length-1))%items.length;
    setSelected(next);menuRef.current?.querySelectorAll('a')[next]?.focus({preventScroll:true});
  }
  const keyInput=key=>{if(key==='Enter')run(command);else if(key==='Backspace')setCommand(c=>c.slice(0,-1));else setCommand(c=>(c+key).slice(0,80));};
  const close=()=>{setClosed(true);setMaximized(false);};
  const windowContent=<div className={`pc-window ${minimized?'is-minimized':''}`}>
    <div className="pc-titlebar"><span className="pc-title"><Terminal size={15} aria-hidden="true"/><span id="workstationTitle">MIGUEL_CARRANZA.EXE</span></span><div className="pc-window-actions">
      <button type="button" aria-label={L(minimized?'Restaurar ventana':'Minimizar ventana',minimized?'Restore window':'Minimize window')} aria-expanded={!minimized} onClick={()=>{setMinimized(v=>!v);setMaximized(false);}}><Minus size={18}/></button>
      <button type="button" ref={maximizeRef} aria-label={L(maximized?'Restaurar tamaño':'Ampliar ventana',maximized?'Restore size':'Expand window')} aria-pressed={maximized} onClick={toggleMax}><Square size={15}/></button>
      <button type="button" aria-label={L('Cerrar ventana','Close window')} onClick={close}><X size={18}/></button>
    </div></div>
    <div className="pc-body" hidden={minimized}>
      <div className="pc-menubar"><button type="button" aria-pressed={view==='explore'} onClick={()=>setView('explore')}>{L('Explorar','Explore')}</button><button type="button" aria-pressed={view==='console'} onClick={()=>{setView('console');requestAnimationFrame(()=>inputRef.current?.focus());}}>{L('Consola','Console')}</button><button type="button" aria-expanded={help} onClick={()=>setHelp(v=>!v)}>{L('Ayuda','Help')}</button><button type="button" id="crtToggle" aria-pressed={crt} aria-label={L('Textura de pantalla CRT','CRT screen texture')} onClick={()=>setCrt(v=>!v)}>CRT {crt?'ON':'OFF'}</button></div>
      {help&&<div className="pc-help" role="status"><CircleHelp size={17} aria-hidden="true"/><p>{L('Explorar: usa ↑ ↓ y Enter. Consola: escribe help. Escape restaura una ventana ampliada.','Explore: use ↑ ↓ and Enter. Console: type help. Escape restores an expanded window.')}</p></div>}
      <div className="pc-screen">
        <div className="pc-system-line"><span>SYS_TIME / <SystemClock/></span><span className="pc-ready">● {L('DISPONIBLE','AVAILABLE')}</span></div>
        {view==='explore'?<>
          <div className="pc-identity"><div><span className="pc-eyebrow">&gt; WHOAMI</span><h2>MIGUEL<br/>CARRANZA<span className="pixel-cursor" aria-hidden="true">_</span></h2><p>{L('FULL STACK JUNIOR / UVG','JUNIOR FULL STACK / UVG')}</p><small>{L('MEDIO TIEMPO · MAÑANAS','PART TIME · MORNINGS')}</small></div><PixelGlobe/></div>
          <div className="pc-directory-label"><span>~/PORTFOLIO</span><span>{L('SELECCIONA UN ARCHIVO','SELECT A FILE')}</span></div>
          <nav ref={menuRef} id="terminalMenu" className="pc-file-list" aria-label={L('Menú de terminal','Terminal menu')} onKeyDown={menuKey}>{items.map((item,i)=>{const Icon=item.icon;return <a key={item.href} href={item.href} download={item.download?'Miguel_Carranza_CV.pdf':undefined} className={selected===i?'selected':''} onFocus={()=>setSelected(i)} onPointerEnter={()=>setSelected(i)} onClick={e=>{if(maximized&&!item.download){e.preventDefault();navigate(item.href);}}}><span className="pc-file-index">0{i+1}</span><Icon size={17} aria-hidden="true"/><strong>{L(item.es,item.en)}</strong><CornerDownLeft size={13} aria-hidden="true"/></a>;})}</nav>
        </>:<div className="pc-console"><p className="pc-console-welcome">{L('PORTFOLIO SHELL / Escribe help para empezar.','PORTFOLIO SHELL / Type help to start.')}</p><div className="pc-command-log" ref={logRef} role="log" aria-live="polite">{lines.map((line,i)=><p key={i}>{line.text}{line.href&&<a href={line.href} download={line.href===PDF?'Miguel_Carranza_CV.pdf':undefined} onClick={e=>{if(maximized&&line.href.startsWith('#')){e.preventDefault();navigate(line.href);}}}> ↗</a>}</p>)}</div><form className="pc-command" onSubmit={e=>{e.preventDefault();run(command);}}><label htmlFor="pcCommand">&gt;</label><input id="pcCommand" ref={inputRef} value={command} onChange={e=>setCommand(e.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={80} aria-label={L('Comando de la consola','Console command')}/><button type="submit" aria-label={L('Ejecutar comando','Run command')}><CornerDownLeft size={17}/></button></form><div className="pc-command-shortcuts">{['help','projects','stack','cv'].map(c=><button key={c} type="button" onClick={()=>run(c)}>{c}</button>)}<button type="button" aria-label={L('Mostrar teclado virtual','Show virtual keyboard')} aria-expanded={keyboard} onClick={()=>setKeyboard(v=>!v)}><Keyboard size={16}/></button></div>{keyboard&&<VirtualKeyboard onKey={keyInput} L={L}/>}</div>}
      </div>
      <div className="pc-statusbar"><span>{L('↑ ↓ ELEGIR / ENTER ABRIR','↑ ↓ SELECT / ENTER OPEN')}</span><span>PORTFOLIO / 2026</span></div>
    </div>
  </div>;
  return <div className="react-desktop">
    {closed?<div className="pc-closed"><Terminal size={28}/><h2>{L('VENTANA CERRADA','WINDOW CLOSED')}</h2><button type="button" ref={openRef} onClick={restore}>{L('VOLVER A ABRIR PORTFOLIO.EXE','REOPEN PORTFOLIO.EXE')}</button></div>:maximized?createPortal(<div className="pc-modal" role="dialog" aria-modal="true" aria-label={L('Terminal ampliada','Expanded terminal')} ref={modalRef}>{windowContent}</div>,document.body):windowContent}
    <div className="pc-taskbar"><button type="button" onClick={restore}><Terminal size={13} aria-hidden="true"/>PORTFOLIO.EXE</button><span>GUATEMALA / GTM</span></div>
  </div>;
}
