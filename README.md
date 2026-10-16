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
│   └── portfolio.css       ← Estilos del portafolio
├── js/
│   ├── projects-data.js    ← TODOS los proyectos (ES/EN) — se edita aquí
│   ├── cv-sections.js      ← Destacados + explorador del stack
│   ├── portfolio.js        ← Búsqueda, filtros y tarjetas
│   ├── controls.js         ← Idioma, tema y menú en celular
│   ├── observer.js         ← Animaciones al hacer scroll
│   └── cursor.js           ← Cursor personalizado
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
