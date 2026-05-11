# CV-MIGUEL_CARRANZA

Sitio web personal — CV y portafolio de Miguel Carranza.
Desplegado en: https://madco-py.github.io/CV-MIGUEL_CARRANZA/

---

## Estructura de archivos

```
CV-MIGUEL_CARRANZA/
│
├── index.html              ← Página principal (CV)
│
├── pages/
│   └── portafolio.html     ← Portafolio con búsqueda y filtros
│
├── css/
│   ├── variables.css       ← Colores, fuentes, espaciado — editar aquí
│   ├── components.css      ← Nav, botones, cursor, footer (compartido)
│   ├── index.css           ← Estilos exclusivos del CV (index.html)
│   └── portfolio.css       ← Estilos exclusivos del portafolio
│
├── js/
│   ├── cursor.js           ← Cursor personalizado (compartido)
│   ├── observer.js         ← Scroll reveal + barras animadas (compartido)
│   └── portfolio.js        ← Datos de proyectos + búsqueda + filtros
│
└── img/
    ├── perfil.jpg           ← Foto de perfil (hero del CV)
    ├── LOGOUVG.png          ← Logo UVG (educación y certificados)
    ├── DBLOGO.png           ← Logo Don Bosco (educación)
    └── [proyecto]-screenshot.png   ← Capturas para las cards del portafolio
```

---

## Cómo agregar un proyecto nuevo al portafolio

1. Abre `js/portfolio.js`
2. Busca el arreglo `const PROJECTS = [...]`
3. Agrega un nuevo objeto siguiendo este formato:

```js
{
  id:       "nombre-unico",          // sin espacios ni tildes
  name:     "Nombre del Proyecto",
  category: "freelance",             // "freelance" | "university" | "personal"
  client:   "Nombre del cliente",    // dejar "" si no aplica
  desc:     "Descripción corta.",
  tech:     ["JavaScript", "Docker", "PostgreSQL"],
  image:    "img/mi-proyecto.png",   // dejar "" si no tienes imagen aún
  github:   "https://github.com/...",// dejar "" si es privado
  demo:     "https://...",           // dejar "" si no hay demo
  sold:     true,                    // true si fue vendido a un cliente real
},
```

4. Guarda el archivo — el portafolio se actualiza automáticamente.

---

## Cómo cambiar colores o fuentes

Todo el design system está en `css/variables.css`.
Modifica las variables `:root { ... }` para cambiar el aspecto de todo el sitio.

---

## Cómo agregar imágenes a los proyectos

1. Copia tu captura de pantalla a la carpeta `img/`
2. Nómbrala de forma descriptiva (ej: `llantas-avila-dashboard.png`)
3. En `js/portfolio.js`, actualiza el campo `image` del proyecto:
   ```js
   image: "img/llantas-avila-dashboard.png",
   ```
   > Nota: si estás desde `pages/portafolio.html` el path necesita `../`
   > portfolio.js ya maneja esto automáticamente.

---

## Despliegue en GitHub Pages

```bash
git add .
git commit -m "feat: actualizar portafolio"
git push origin main
```

GitHub Pages sirve automáticamente desde la raíz del repositorio.
