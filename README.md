# ✨ Velvet Essence | Perfumería de Autor (Version 1.0)

> **Sitio Web Estático Responsivo con Bootstrap 5.3.0**  
> Proyecto ATF1 - Marcos de Desarrollo Web

---

## 📌 Descripción del Proyecto

**Velvet Essence** es un landing page completo que presenta una colección de perfumes exclusivos y de autor. El sitio es completamente responsivo e interactivo mediante el uso del framework Bootstrap.

---

## 🚀 Cómo Ejecutar el Proyecto

### ⚡ Opción 1: Abrir Directamente en Navegador

1. Descargar/descomprimir el proyecto
2. Hacer doble click en `index.html`

### 🔧 Opción 2: Abrir el siguente Link: https://leandr0mar.github.io/Pagina-Web-Perfumeria-Velvet-Essence/ 

---

## 🔗 CDN Utilizados

```html
<!-- Bootstrap CSS 5.3.0 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS Bundle 5.3.0 (con Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Google Fonts: Montserrat y Playfair Display -->
<link href="https://googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<!-- Bootstrap Icons 1.13.1 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
```

---

## ✅ Checklist de Componentes (ATF1)

### 🏗️ Estructura Base

- [x] Sitio estático de 1 landing page completa
- [x] HTML5 semántico y bien estructurado
- [x] Responsive design (mobile-first)

### 🎯 Componentes Bootstrap Obligatorios

#### Navegación
- [x] **Navbar responsive** con collapse toggle (hamburguesa en móviles)
- [x] Logo personalizado con imagen
- [x] Menú colapsable en dispositivos pequeños
- [x] Iconos de búsqueda y carrito

#### Layout y Grid
- [x] **Grid Layout** con `container` + `row` + `col-*`
  - Grid de productos: `col-sm-6 col-lg-3`
  - Secciones con imágenes: `col-lg-7` / `col-lg-5`

#### Componentes Visuales
- [x] **Cards** - 8 tarjetas de productos (4 hombres, 4 mujeres)
  - Imágenes responsivas
  - Información del producto
  - Botones de acción
- [x] **Tabla estilizada** - Tabla minimalista con 2 colecciones
  - Encabezados claros
  - Bordes suaves
  - Información de intensidad, fijación y ocasión

#### Contenido Multimedia
- [x] **Imágenes responsive** - 6+ imágenes con `img-fluid`
  - Hero section
  - Productos
  - Secciones informativas

#### Formularios
- [x] **Formulario de contacto** con 5 campos:
  - Nombre (text input)
  - Email (email input)
  - Asunto (select dropdown)
  - Mensaje (textarea)
  - Términos y condiciones (checkbox)
  - Validación JavaScript en tiempo real

- [x] **Formulario de suscripción** en footer:
  - Email con validación regex
  - Feedback visual de errores

#### Modales
- [x] **Modal de confirmación de envío** - Feedback al enviar contacto
- [x] **Modal de términos y condiciones** - Muestra T&C completos
- [x] **Modal de suscripción** - Confirmación de suscripción exitosa

#### Utilities Bootstrap (15+ utilizados)
```
Spacing        | p-*, m-*, mt-*, mb-*, py-*, px-*
Text           | text-*, text-uppercase, text-center, fw-bold, text-muted
Display        | d-flex, d-none, d-block, d-sm-block
Background     | bg-*, bg-light, bg-dark
Border         | border-*, border-0, border-bottom, rounded, rounded-0
Shadow         | shadow-sm
Grid           | container, row, col-*, justify-content-*, align-items-*
```

### ⚡ Interactividad y Validación

- [x] **Validación de formulario contacto**
  - Previene envío sin campos completos
  - Marca campos inválidos con borde rojo (`.is-invalid`)
  - Muestra mensaje de error dinámico
  - Abre modal de confirmación al enviar
  - Auto-reset después de 2 segundos

- [x] **Validación de suscripción**
  - Regex de email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Feedback visual en tiempo real
  - Modal de confirmación

- [x] **Efectos interactivos**
  - Fade-in animation al cargar página
  - Zoom en imágenes de productos al pasar cursor
  - Navbar color change al hacer scroll
  - Hover effects en cards y botones

---

## 📁 Estructura del Proyecto

```
Proyecto Pagina Web de Perfumeria con Bootstrap/
│
├── 📄 index.html                    # Página principal
├── 📄 README.md                     # Documentación (este archivo)
│
├── 📁 css/
│   └── style.css                    # Estilos personalizados
│
├── 📁 js/
│   └── script.js                    # Lógica JavaScript
│
├── 📁 assets/
│   ├── 📁 logo/
│   │   └── logo-dorado.png
│   ├── 📁 portada/
│   │   ├── hero2.jpg               # Imagen hero
│   │   ├── 4.jpg                   # Sección "Por qué elegir"
│   │   └── 5.jpg                   # Sección "Familias olfativas"
│   ├── 📁 hombre/                  # 4 imágenes de productos
│   │   ├── Loci-n-para-hombre-black-gravitation-100ml-Miniso-1-26444.webp
│   │   ├── Perfume Homem 1.webp
│   │   ├── Perfume-Essencial-Clasico-Masculino-100ml-Natura-1.webp
│   │   └── perfume-masculino-temptation-yanbal-100-ml.webp
│   └── 📁 mujer/                   # 4 imágenes de productos
│       ├── Dolce Gabbana.webp
│       ├── Imagenes Esika.webp
│       ├── Miss L'Bel.webp
│       └── Pasion Yanbal.webp
│
└── 📁 capturas/
    ├── mobile-375px.png             # Screenshot responsivo móvil
    └── desktop-1200px.png           # Screenshot responsivo desktop
```

---

## 📱 Responsive Design Validado

### 📲 Mobile (375px)
✅ Navbar colapsado con hamburguesa  
✅ Grid de productos: 1 columna  
✅ Tabla oculta en móviles (`d-none d-sm-block`)  
✅ Imágenes adaptadas con `img-fluid`  
✅ Formularios full-width y legibles  

### 💻 Tablet (768px)
✅ Navbar expandido (`navbar-expand-lg`)  
✅ Grid de productos: 2 columnas (`col-sm-6`)  

### 🖥️ Desktop (≥1200px)
✅ Navbar completo con todos los enlaces  
✅ Grid de productos: 4 columnas (`col-lg-3`)   

**📸 Evidencia:** Ver carpeta `capturas/` con capturas reales

---

## 🎨 Características de Estilo

### 🎭 Diseño Visual
- **Tipografía**
  - Playfair Display para títulos
  - Montserrat para cuerpo
- **Paleta minimalista:**
  - Negro: `#1a1a1a`
  - Dorado: `#C5A059`
  - Blanco: `#ffffff`

### 💫 Interactividad
- Formularios con validación
- Animaciones suaves en transiciones
- Efectos hover en elementos interactivos
- Modales centrados y accesibles
- Feedback visual clara para el usuario

### ♿ Accesibilidad
- Labels en todos los campos de formulario
- Alt text en todas las imágenes
- HTML semántico
- Contraste de colores adecuado
- Navegación clara y coherente

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Bootstrap** | 5.3.0 | Framework responsive |
| **HTML5** | - | Estructura semántica |
| **CSS3** | - | Estilos personalizados |
| **JavaScript** | ES6+ | Validación e interactividad |
| **Google Fonts** | - | Tipografía personalizada |
| **Bootstrap Icons** | 1.13.1 | Iconos vectoriales |
