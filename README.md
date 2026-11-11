# CV-MIGUEL_CARRANZA

Sitio web personal — CV y portafolio de Miguel Carranza.
Desplegado en: https://madco-py.github.io/CV-MIGUEL_CARRANZA/

---

## Estructura de archivos

```
CV-MIGUEL_CARRANZA/
├── index.html              ← CV (hero, stack, proyectos destacados, PDF)
├── pages/portafolio.html   ← Portafolio con búsqueda y filtros
├── css/
│   ├── variables.css       ← Colores, fuentes, espaciado
│   ├── components.css      ← Nav (y menú en celular), botones, "Cómo está hecho"
│   ├── index.css           ← Estilos del CV
│   ├── cv-extra.css        ← Explorador del stack, destacados, descarga del PDF
│   ├── showcase.css        ← Portada y laboratorio interactivo
│   └── portfolio.css       ← Estilos del portafolio
├── js/
│   ├── projects-data.js    ← TODOS los proyectos (ES/EN) — se edita aquí
│   ├── cv-sections.js      ← Destacados + explorador del stack
│   ├── portfolio.js        ← Búsqueda, filtros y tarjetas
│   ├── controls.js         ← Idioma, tema y menú en celular
│   ├── observer.js         ← Animaciones al hacer scroll
│   ├── showcase.js         ← Demos locales, ES/EN, teclado y movimiento reducido
│   └── cursor.js           ← Conserva el cursor nativo
├── cv/
│   ├── cv.tex              ← CV en LaTeX (fuente)
│   ├── foto.jpg            ← Foto del PDF
│   ├── Miguel_Carranza_CV.pdf  ← PDF que se descarga
│   └── preview.png         ← Vista previa del PDF en la página
└── img/proyectos/          ← Fotos y videos (comprimidos) de cada proyecto
```

---

## Cómo agregar un proyecto

1. Abre `js/projects-data.js` y copia un objeto del arreglo `PROJECTS`.
2. Cambia sus datos. Las rutas de `img` y `video` van desde la raíz (ej. `img/proyectos/mi-app.jpg`).
3. En `tech` usa los mismos nombres que los botones del stack en `index.html` (`data-skill`),
   así el explorador cuenta el proyecto en esa tecnología.
4. En `build` describe cómo está hecho: `purpose`, `data`, `access`, `hosting`, `domain`, `libs`.
   Escribe solo lo que sea cierto; si algo no aplica, no pongas esa fila.
5. `featured: true` lo muestra en "Proyectos destacados" del CV.

Aparece solo en el CV, el explorador del stack y el portafolio.

---

## Cómo actualizar el CV en PDF

1. Edita `cv/cv.tex`.
2. Compílalo con [Tectonic](https://tectonic-typesetting.github.io/) (o `xelatex`):
   ```bash
   cd cv && tectonic cv.tex && mv cv.pdf Miguel_Carranza_CV.pdf
   ```
3. Regenera la vista previa (`cv/preview.png`) con una captura de la primera página.

---

## Cómo cambiar colores o fuentes

Todo el design system está en `css/variables.css`.
Modifica las variables `:root { ... }` para cambiar el aspecto de todo el sitio.

---

## Despliegue en GitHub Pages

```bash
git add .
git commit -m "feat: actualizar portafolio"
git push origin main
```

GitHub Pages sirve automáticamente desde la raíz del repositorio.

## Laboratorio interactivo

La portada incorpora seis demos originales inspiradas en el playground de
[MADWEB](https://github.com/MADCO-py/MADWEB): personalización de interfaces,
gráficos con datos simulados, un pipeline de ejemplo, un tablero persistente,
una terminal con comandos predefinidos y una red de partículas en canvas.

No requieren backend. El tablero guarda hasta 12 tareas en `localStorage`
(`mc-lab-board-v1`); el botón Reiniciar restaura los ejemplos. Los datos del
gráfico son ficticios y están identificados como tales. Las pestañas funcionan
con flechas, Inicio y Fin. La animación se pausa fuera de pantalla y respeta
la preferencia de movimiento reducido. Los videos no se reproducen
automáticamente con esa preferencia.

Vista previa local: `python3 -m http.server 8765`, después abre
`http://localhost:8765/`. El sitio sigue siendo estático y compatible con
GitHub Pages. Los componentes JSX usan el build descrito al final de este archivo.

## Presentación para postulaciones

El tema Linux se define en `css/linux.css`, sobre los componentes existentes.
Incluye variante oscura por defecto y variante clara, con la selección del usuario
guardada en su navegador. El orden prioriza proyectos, perfil y experiencia; el
laboratorio conserva las demos y los detalles de datos se abren bajo demanda.

Los enlaces de descarga usan el PDF limpio de `cv/Miguel_Carranza_CV.pdf`.
Al reemplazar ese archivo, actualiza la clave `?v=` de los enlaces de `index.html`
y del comando `cv` en `js/showcase.js` con los primeros 12 caracteres de su SHA-256.
La vista previa también usa esa clave para evitar versiones anteriores en caché.

### Variante Ubuntu

Toda la web usa una sola familia: Ubuntu Mono (400 y 700), con respaldos
monoespaciados. La paleta combina berenjena, naranja y el marco gris oscuro
de la terminal de Ubuntu. Los iconos conservan su fuente para evitar perder
sus símbolos. El PDF conserva su tipografía formal y su archivo original.

### Cursos y experiencia visual

`css/experience.css` añade la composición bento, superficies de vidrio con
respaldo opaco y piezas con volumen. Mantiene Ubuntu Mono y la paleta Ubuntu.
`js/experience.js` contiene seis grupos de cursos UVG y enlaces a evidencia;
los cursos universitarios se presentan en Formación, separados de los
certificados. Ingeniería de Software 2 se identifica como en curso.

Los proyectos destacados resumen resultados y conservan los detalles técnicos
en el control Cómo está hecho. Las interacciones funcionan por teclado y
tacto; los efectos de movimiento respetan la preferencia del sistema.

### Presentación actual: estación CRT

`css/crt.css` define la presentación de fósforo verde y la fuente única IBM
Plex Mono, sobre la estructura existente. `js/crt.js` controla el menú de la
portada: flechas arriba/abajo, Inicio/Fin y Enter. La textura CRT es estática
y opcional; su preferencia se guarda localmente como `mc-crt`. El directorio
de proyectos respeta esa misma preferencia. No hay pantalla de arranque
obligatoria ni animaciones de parpadeo. Las capturas recuperan su color al
pasar el puntero o enfocar los controles de su tarjeta.

Los textos, cursos seleccionados, evidencias y el PDF descargable mantienen
su contenido profesional; el menú ofrece acceso directo a ellos.

## Interfaz actual en React / JSX

La ventana retro de la portada vive en `src/retro/RetroDesktop.jsx`; el globo
SVG original está en `src/retro/PixelGlobe.jsx` y el sistema visual en
`src/retro/retro-ui.css`. Usa React, React DOM e iconos Lucide. Las fuentes
VT323 e IBM Plex Mono se sirven desde el propio repositorio mediante Fontsource.
VT323 se reserva para títulos, menús y controles; el texto largo conserva IBM Plex Mono.

```bash
npm ci
npm run build
python3 -m http.server 8770
```

El build con esbuild genera `js/retro-ui.bundle.js`, su CSS y las fuentes
en `js/retro-fonts/`, incluidas sus licencias. Estos archivos se versionan
para conservar el despliegue estático actual de GitHub Pages. `node_modules/`
se excluye. Al editar JSX o estilos, ejecuta de nuevo `npm run build` y
recarga la página; `npm run dev` recompila al guardar.

Controles: minimizar, restaurar, cerrar, volver a abrir y ampliar. La ventana
ampliada mantiene el foco dentro del diálogo y se restaura con Escape. La
consola admite comandos predefinidos (`help`, `whoami`, `stack`, `projects`,
`education`, `experience`, `contact`, `cv`, `clear`) y teclado virtual. No
ejecuta comandos del sistema ni evalúa código del usuario. El reloj muestra
la hora real de Guatemala; pausa su intervalo cuando la pestaña está oculta.
La navegación estática de respaldo conserva los enlaces si el bundle no carga.
La consola obtiene la URL del PDF del botón de descarga de la página; así
comparte siempre la misma versión.

### Presentación para candidaturas

`src/retro/recruiting.css` (incluido en el build) ajusta la jerarquía y la
legibilidad del CV; está limitado a `.cv-page`. El directorio de proyectos
conserva su diseño. La portada prioriza rol, stack y disponibilidad; las
capturas de los proyectos se muestran en color y cada caso diferencia reto,
aporte y entrega. Los detalles de datos, otras herramientas y la experiencia
adicional se pueden desplegar sin perder información.

`js/recruiting.js` contiene los textos nuevos en español e inglés y el modo
lectura, guardado como `cv-reading`. Este modo cambia la tipografía de los
títulos y oculta la ventana decorativa de la portada, conservando los proyectos,
formación, contacto y PDF. El apartado de IA describe únicamente el uso declarado
de Codex y Claude para lógica de programación y la revisión detallada del autor.
El panel móvil del stack es un diálogo con control de foco y cierre con Escape.


## Presentación actual: grafito y vidrio

La presentación principal y el directorio de proyectos usan `src/site/site.css`.
La portada monta `src/site/SignatureScene.jsx`: una superficie vectorial original,
sin imagen de archivo ni dependencias WebGL. La tipografía Inter se sirve localmente
con su licencia. Los antiguos estilos CRT y el escritorio retro permanecen en el
repositorio, pero estas páginas ya no los cargan.

`npm run build` usa `scripts/build-site.mjs` y genera `js/site.bundle.js`,
`js/site.bundle.css` y `js/site-fonts/`. Se versionan para mantener el despliegue
estático en GitHub Pages. `npm run dev` observa cambios en los componentes y estilos.

`js/premium.js` traduce los nuevos textos y marca la sección actual en la navegación.
Las transiciones usan desplazamiento nativo y respetan movimiento reducido.
Se conservan ambos idiomas, temas claro y oscuro, modo lectura, laboratorio,
cursos, casos de proyectos y el mismo PDF descargable.
