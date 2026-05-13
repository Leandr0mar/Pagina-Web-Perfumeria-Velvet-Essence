# ✨ Velvet Essence | Perfumería de Autor (Version 1.5)

> **Sitio Web + Backend Spring Boot / Thymeleaf**

Integrantes:
  - Candia Falcón Leandro Omar
  - Evaristo Ramos Hilder
  - Tirado Pauccar Pamela Mayra

---

## 📌 Descripción del Proyecto

**Velvet Essence** es un proyecto híbrido que combina un landing page responsivo mediante Bootstrap con una aplicación Java Spring Boot.

La versión actual incluye:
- Landing page principal con Bootstrap 5 y diseño responsivo.
- Vista dinámica de detalle de producto con Thymeleaf en `perfumeria/src/main/resources/templates/productos/productoDetalle.html`.
- Servicio `productoService` que entrega datos desde una lista en memoria.
- Controlador `DetalleController` para la ruta `/inicio/producto/detalle/{id}`.
- Mensaje estilizado de producto no encontrado.
- Footer fijo al final de la página y carrito que respeta el encabezado.

---

## 🚀 Cómo Ejecutar el Proyecto

### ⚡ Opción 1: Abrir Directamente en Navegador

1. Descargar/descomprimir el proyecto
2. Hacer doble click en `index.html`

### 🔧 Opción 2: Ejecutar la aplicación Spring Boot localmente

1. Abrir terminal en la carpeta `perfumeria`
2. Ejecutar `./mvnw.cmd spring-boot:run`
3. Abrir en el navegador `http://localhost:8081/inicio`
4. Ver el detalle de un producto en `http://localhost:8081/inicio/producto/detalle/1`

> Nota: el backend se encuentra en `perfumeria/src/main/java/com/example/perfumeria`, y las plantillas Thymeleaf en `perfumeria/src/main/resources/templates`. 

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

## ✅ Checklist de Componentes

### 🏗️ Estructura Base

- [x] Sitio estático de 1 landing page completa
- [x] HTML5 semántico y bien estructurado
- [x] Responsive design (mobile-first)
- [x] Aplicación Spring Boot integrada en `perfumeria`

### 🎯 Componentes Bootstrap Obligatorios

#### Navegación
- [x] **Navbar responsive** con collapse toggle (hamburguesa en móviles)
- [x] Logo personalizado con imagen
- [x] Menú colapsable en dispositivos pequeños
- [x] Iconos de búsqueda y carrito

#### Layout y Grid
- [x] **Grid Layout** con `container` + `row` + `col-*`
  - Grid de productos: `col-sm-6 col-lg-3`

#### Componentes Visuales
- [x] **Cards** - 8 tarjetas de productos (4 hombres, 4 mujeres)
  - Imágenes responsivas
  - Información del producto
  - Botones de acción
- [x] **Página de detalle** con contenido dinámico de producto y notificación de no encontrado

#### Contenido Multimedia
- [x] **Imágenes responsive** con `img-fluid`

#### Formularios
- [x] **Formulario de contacto** con validación JavaScript
- [x] **Formulario de suscripción** en el footer con validación de email

---

## 🧠 Back-end y MVC

- `perfumeria/src/main/java/com/example/perfumeria/Controller/DetalleController.java`
- `perfumeria/src/main/java/com/example/perfumeria/Services/productoService.java`
- `perfumeria/src/main/resources/templates/productos/productoDetalle.html`

---

## 📁 Estructura del Proyecto

```
Pagina-Web-Perfumeria-Velvet-Essence/
├── README.md
├── index.html
├── css/
├── js/
├── assets/
└── perfumeria/
    ├── pom.xml
    ├── mvnw
    ├── mvnw.cmd
    ├── src/
        ├── main/
            ├── java/com/example/perfumeria/
            ├── resources/
                ├── static/
                └── templates/
```

---

## 🎨 Características de Estilo

- **Playfair Display** para títulos
- **Montserrat** para contenido
- Paleta minimalista con acentos dorados
- Animaciones suaves y botones estilizados
- Mensajes y formularios con feedback visual claro

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|----------|
| Bootstrap 5.3.0 | Framework responsive |
| Spring Boot | Backend Java |
| Thymeleaf | Plantillas dinámicas |
| Java | Lógica del servidor |
| HTML5/CSS3 | Estructura y estilos |
| JavaScript | Interactividad |
| Google Fonts | Tipografía |
| Bootstrap Icons | Iconos vectoriales |