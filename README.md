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
GitHub Pages, sin un paso de compilación.

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
